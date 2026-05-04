const fs = require('fs'), path = require('path');
const root = 'D:\\tmp\\ModulePembelajaran';

// Build lookup of actual files in repo
const actualFiles = new Set();
function walk(dir, prefix, depth) {
    if (depth <= 0 || !fs.existsSync(dir)) return;
    fs.readdirSync(dir, {withFileTypes: true}).forEach(e => {
        const fp = path.join(dir, e.name);
        const rp = prefix ? prefix + '/' + e.name : e.name;
        if (e.isDirectory() && !e.name.startsWith('.')) walk(fp, rp, depth - 1);
        else actualFiles.add(rp);
    });
}
walk(path.join(root, 'template'), 'template', 5);
walk(path.join(root, 'figures'), 'figures', 3);
actualFiles.add('README.md');

// Shortcuts: shorthand -> actual repo path
const shortcut = {};
['train.py','losses.py','models.py','utils.py','data.py','__init__.py','augment.py'].forEach(f => {
    shortcut['src/'+f] = 'template/src/'+f;
});
['baseline.yaml','focal_freeze.yaml','mlp_mnist.yaml','mlp_tabular.yaml',
 'lstm_timeseries.yaml','transformer_mini.yaml','ae_cifar.yaml'].forEach(f => {
    shortcut['configs/'+f] = 'template/configs/'+f;
});
['prereg_template.md','experiment_log_template.md'].forEach(f => {
    shortcut['docs/'+f] = 'template/docs/'+f;
});
shortcut['pyproject.toml'] = 'template/pyproject.toml';
['aggregate.py','download_data.py'].forEach(f => {
    shortcut['scripts/'+f] = 'template/scripts/'+f;
});
shortcut['notebooks/portofolio_mandiri.ipynb'] = 'template/notebooks/portofolio_mandiri.ipynb';

const gitBase = 'https://github.com/muhammad-zainal-muttaqin/Module-DS/blob/master';

// Skip inline code that's inside existing markdown links or YAML blocks
function isInsideLink(content, idx) {
    const before = content.substring(Math.max(0, idx - 2000), idx);
    // Check if within [text](...)  - find last [ and check if ]( follows
    const lastBracket = before.lastIndexOf('[');
    if (lastBracket >= 0) {
        const afterBracket = before.substring(lastBracket);
        // If there's a `](url)` after the bracket, we're inside a link
        if (/^\[[^\]]*\]\(https?:/.test(afterBracket)) return true;
        if (/^\[[^\]]*\]\([^)]+\)/.test(afterBracket)) return true;
    }
    return false;
}

function isInsideYamlBlock(content, idx) {
    const before = content.substring(0, idx);
    const yamlStarts = before.split('```yaml').length - 1;
    const fenceStarts = before.split('```').length - 1;
    if (yamlStarts > 0 && (fenceStarts % 2 === 1)) return true;
    return false;
}

let total = 0;
fs.readdirSync(path.join(root, 'chapters')).filter(f => f.endsWith('.md')).forEach(file => {
    const fp = path.join(root, 'chapters', file);
    let content = fs.readFileSync(fp, 'utf-8');
    let modified = false;

    // Match: backtick + path-like string (contains /, ends with extension) + backtick
    // But NOT if already inside [text](...)
    const re = /`([^`]+?\/(?:[^`]+?)\.(?:py|md|yaml|toml|ipynb))`/g;
    let m;
    while ((m = re.exec(content)) !== null) {
        const ref = m[1].trim();
        
        // Skip if inside YAML code block or already linked
        if (isInsideYamlBlock(content, m.index)) continue;
        if (isInsideLink(content, m.index)) continue;
        
        // Find actual repo path
        let realPath = null;
        if (actualFiles.has(ref)) realPath = ref;
        else if (shortcut[ref]) realPath = shortcut[ref];
        
        if (realPath) {
            const url = gitBase + '/' + realPath;
            const mdLink = '[`' + ref + '`](' + url + ')';
            content = content.substring(0, m.index) + mdLink + content.substring(m.index + m[0].length);
            modified = true;
            total++;
            console.log('  ' + file + ': ' + ref + ' -> ' + url);
            re.lastIndex = m.index + mdLink.length;
        }
    }
    if (modified) fs.writeFileSync(fp, content, 'utf-8');
});

console.log('Total links added: ' + total);

import { useMemo } from "react";
import { CONFIGS } from "../../lib/content";
import { downloadFile } from "../../lib/storage";

type DiffLine = {
  kind: "same" | "changed" | "add" | "remove";
  left: string;
  right: string;
};

// Diff sederhana line-by-line berbasis index.
// Untuk YAML config kecil yang strukturnya mirip, ini sudah cukup informatif.
function diffLines(a: string, b: string): DiffLine[] {
  const la = a.split(/\r?\n/);
  const lb = b.split(/\r?\n/);
  const n = Math.max(la.length, lb.length);
  const out: DiffLine[] = [];
  for (let i = 0; i < n; i++) {
    const left = la[i] ?? "";
    const right = lb[i] ?? "";
    if (i >= la.length) {
      out.push({ kind: "add", left: "", right });
    } else if (i >= lb.length) {
      out.push({ kind: "remove", left, right: "" });
    } else if (left === right) {
      out.push({ kind: "same", left, right });
    } else {
      out.push({ kind: "changed", left, right });
    }
  }
  return out;
}

const KIND_STYLE: Record<DiffLine["kind"], string> = {
  same: "bg-transparent",
  changed: "bg-curiosity/15 dark:bg-curiosity/20",
  add: "bg-ownership/15 dark:bg-ownership/20",
  remove: "bg-skepticism/15 dark:bg-skepticism/20",
};

export default function ConfigDiff() {
  const diff = useMemo(() => diffLines(CONFIGS.baseline, CONFIGS.focal_freeze), []);
  const changedCount = diff.filter((d) => d.kind !== "same").length;

  return (
    <div className="page">
      <header className="page-header">
        <div className="eyebrow">Bab 03 · Rigor</div>
        <h1 className="page-title">Diff Config YAML</h1>
        <p className="page-lead">
          Bandingkan <code className="font-mono">baseline.yaml</code> dengan <code className="font-mono">focal_freeze.yaml</code>. Baris berbeda di-highlight. Ini contoh config untuk satu run ablation.
        </p>
        <div className="mt-3 text-sm text-ink/70 dark:text-parchment/60">
          {changedCount} baris berbeda dari {diff.length} total.
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button
          type="button"
          onClick={() => downloadFile("baseline.yaml", CONFIGS.baseline, "text/yaml")}
          className="btn-secondary text-sm"
        >
          Unduh baseline.yaml
        </button>
        <button
          type="button"
          onClick={() => downloadFile("focal_freeze.yaml", CONFIGS.focal_freeze, "text/yaml")}
          className="btn-secondary text-sm"
        >
          Unduh focal_freeze.yaml
        </button>
        <div className="ml-auto flex gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-curiosity/60" aria-hidden="true" /> Berubah
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-ownership/60" aria-hidden="true" /> Ditambah
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-skepticism/60" aria-hidden="true" /> Dihapus
          </span>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="grid grid-cols-2 text-xs font-mono bg-parchment/60 dark:bg-white/[0.06] border-b border-black/10 dark:border-white/10">
          <div className="px-4 py-2 border-r border-black/10 dark:border-white/10">baseline.yaml</div>
          <div className="px-4 py-2">focal_freeze.yaml</div>
        </div>
        <div className="overflow-x-auto scrollbar-hidden">
          <div className="grid grid-cols-2 font-mono text-xs leading-relaxed">
            <div className="border-r border-black/10 dark:border-white/10">
              {diff.map((d, i) => (
                <div key={`l-${i}`} className={`flex ${KIND_STYLE[d.kind]} min-h-[1.5rem]`}>
                  <span className="px-2 py-0.5 text-ink/55 dark:text-parchment/40 select-none border-r border-black/5 dark:border-white/5 w-10 text-right shrink-0">
                    {i + 1}
                  </span>
                  <pre className="px-3 py-0.5 whitespace-pre-wrap break-all flex-1">{d.left || "\u00a0"}</pre>
                </div>
              ))}
            </div>
            <div>
              {diff.map((d, i) => (
                <div key={`r-${i}`} className={`flex ${KIND_STYLE[d.kind]} min-h-[1.5rem]`}>
                  <span className="px-2 py-0.5 text-ink/55 dark:text-parchment/40 select-none border-r border-black/5 dark:border-white/5 w-10 text-right shrink-0">
                    {i + 1}
                  </span>
                  <pre className="px-3 py-0.5 whitespace-pre-wrap break-all flex-1">{d.right || "\u00a0"}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <aside className="mt-10 rounded-xl border border-rigor/30 bg-rigor-soft/40 dark:bg-rigor/10 p-6 text-sm">
        <div className="font-semibold mb-2">Satu variabel berubah per run</div>
        <p className="text-ink/80 dark:text-parchment/85">
          Aturan Rigor: satu ablation mengubah satu hal saja. Jika Anda ganti loss <em>dan</em> freeze di satu config, sulit menisbahkan perubahan ke penyebab. <code className="font-mono">focal_freeze.yaml</code> di sini sengaja mengubah dua variabel sebagai contoh pedagogis; dalam praktik, pisahkan menjadi <code className="font-mono">focal_only.yaml</code> dan <code className="font-mono">freeze_only.yaml</code>.
        </p>
      </aside>
    </div>
  );
}

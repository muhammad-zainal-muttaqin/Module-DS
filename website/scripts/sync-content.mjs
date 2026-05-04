// Sync sumber modul (.md) + template configs (.yaml) dari folder induk ke src/content/
// Jalan otomatis via `npm run dev` dan `npm run build`.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.resolve(ROOT, "..");
const OUT = path.resolve(ROOT, "src", "content");

const CHAPTERS = [
  "00_Pendahuluan.md",
  "00a_Prasyarat.md",
  "01_W1_Tabular_Output_Heads.md",
  "02_W2_Images_CNN_Smoke_Test.md",
  "03_W3_Loss_Optimizer_Evaluasi.md",
  "04_W4_Reproducibility_Experiment_Matrix.md",
  "05_W5_Sequences_RNN_LSTM.md",
  "06_W6_Representations_Temporal_Leakage.md",
  "07_W7_Text_Transformers_Repo_Adoption.md",
  "08_W8_Foundation_Models.md",
  "09_W9_Multimodal_Reasoning.md",
  "10_W10_Paper_Reading.md",
  "11_W11_Research_Framing.md",
  "12_Capstone.md",
  "13_Rubrik_Penilaian.md",
  "14_Lampiran.md",
  "15_Panduan_Instruktur.md",
];

const CONFIGS = [
  ["template/configs/baseline.yaml", "baseline.yaml"],
  ["template/configs/focal_freeze.yaml", "focal_freeze.yaml"],
  ["template/configs/mlp_mnist.yaml", "mlp_mnist.yaml"],
  ["template/configs/mlp_tabular.yaml", "mlp_tabular.yaml"],
  ["template/configs/lstm_timeseries.yaml", "lstm_timeseries.yaml"],
  ["template/configs/transformer_mini.yaml", "transformer_mini.yaml"],
  ["template/configs/ae_cifar.yaml", "ae_cifar.yaml"],
];

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function copyFile(src, dest) {
  try {
    const data = await fs.readFile(src, "utf8");
    await fs.writeFile(dest, data, "utf8");
    return data;
  } catch (err) {
    if (err.code === "ENOENT") {
      console.warn(`[sync] missing: ${src}`);
      return null;
    }
    throw err;
  }
}

// Parse tabel ID<->EN dari 14_Lampiran.md untuk glossary.
function parseGlossary(md) {
  const entries = [];
  const lines = md.split(/\r?\n/);
  let inTable = false;
  let headerSeen = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = trimmed
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      if (!headerSeen) {
        const isHeader = cells.some((c) => /indonesia/i.test(c)) && cells.some((c) => /inggris|english/i.test(c));
        if (isHeader) {
          headerSeen = true;
          inTable = true;
        }
        continue;
      }
      if (inTable) {
        if (cells.every((c) => /^-+$/.test(c))) continue;
        if (cells.length >= 2 && cells[0] && cells[1] && !/^-+$/.test(cells[0])) {
          const id = cells[0];
          const en = cells[1];
          const note = cells[2] || "";
          const usage = cells[3] || "";
          entries.push({ id, en, note, usage });
        }
      }
    } else if (inTable && trimmed === "") {
      inTable = false;
      headerSeen = false;
    }
  }
  return entries;
}

async function copyDir(srcDir, destDir) {
  await ensureDir(destDir);
  let entries;
  try {
    entries = await fs.readdir(srcDir, { withFileTypes: true });
  } catch (err) {
    if (err.code === "ENOENT") return;
    throw err;
  }
  for (const entry of entries) {
    if (entry.isFile()) {
      await fs.copyFile(path.join(srcDir, entry.name), path.join(destDir, entry.name));
    }
  }
}

async function main() {
  await ensureDir(path.join(OUT, "chapters"));
  await ensureDir(path.join(OUT, "configs"));

  let appendixMd = null;
  for (const name of CHAPTERS) {
    const src = path.join(SOURCE, "chapters", name);
    const dest = path.join(OUT, "chapters", name);
    const data = await copyFile(src, dest);
    if (name === "14_Lampiran.md") appendixMd = data;
  }

  for (const [rel, out] of CONFIGS) {
    const src = path.join(SOURCE, rel);
    const dest = path.join(OUT, "configs", out);
    await copyFile(src, dest);
  }

  if (appendixMd) {
    const glossary = parseGlossary(appendixMd);
    await fs.writeFile(path.join(OUT, "glossary.json"), JSON.stringify(glossary, null, 2), "utf8");
    console.log(`[sync] glossary: ${glossary.length} entries`);
  }

  const figSrc = path.join(SOURCE, "figures");
  const figDest = path.join(ROOT, "public", "figures");
  await copyDir(figSrc, figDest);

  console.log(`[sync] chapters: ${CHAPTERS.length}, configs: ${CONFIGS.length}`);
}

main().catch((err) => {
  console.error("[sync] failed:", err);
  process.exit(1);
});

import { useState } from "react";
import { downloadFile } from "../../lib/storage";

type Form = {
  title: string;
  goal: string;
  baseline: string;
  variables: string;
  hypothesis: string;
  metrics: string;
  expected: string;
  stopCriteria: string;
  seeds: string;
  notes: string;
};

const INITIAL: Form = {
  title: "",
  goal: "",
  baseline: "baseline.yaml (cross-entropy, lr=3e-4, AdamW, seed=42)",
  variables: "",
  hypothesis: "",
  metrics: "",
  expected: "",
  stopCriteria: "5 epoch tanpa perbaikan val_loss",
  seeds: "42, 43, 44",
  notes: "",
};

const FIELDS: { key: keyof Form; label: string; placeholder: string; rows: number; help?: string }[] = [
  { key: "title", label: "Judul eksperimen", placeholder: "focal-loss-vs-ce-pada-cifar10-imbalanced", rows: 1, help: "Slug pendek; akan jadi nama folder run." },
  { key: "goal", label: "1. Tujuan (apa pertanyaan yang dijawab?)", placeholder: "Menguji apakah focal loss meningkatkan F1 kelas minor dibanding cross-entropy pada dataset CIFAR-10 yang di-imbalanced 10:1.", rows: 3 },
  { key: "baseline", label: "2. Baseline (titik banding)", placeholder: "baseline.yaml - cross-entropy, lr=3e-4, AdamW, seed=42, 30 epoch.", rows: 2 },
  { key: "variables", label: "3. Variabel yang berubah (satu per baris)", placeholder: "loss: cross-entropy -> focal (gamma=2, alpha=0.25)\nfreeze: [] -> [conv1]", rows: 3, help: "Satu variabel berubah per run ablation." },
  { key: "hypothesis", label: "4. Hipotesis yang dapat dipalsukan", placeholder: "F1 kelas minor akan naik >=2% dengan focal loss; jika hanya <0.5% atau variansi antar-seed >1%, hipotesis ditolak.", rows: 3 },
  { key: "metrics", label: "5. Metrik sukses", placeholder: "Primer: F1 macro dan F1 per-kelas.\nSekunder: val_loss, val_acc, training time.", rows: 3 },
  { key: "expected", label: "6. Hasil yang diharapkan (prediksi sebelum run)", placeholder: "F1 minor 0.58 -> 0.61. Akurasi global stabil (+/- 0.5%). Training 10-20% lebih lambat karena focal.", rows: 3 },
  { key: "stopCriteria", label: "7. Kriteria berhenti", placeholder: "5 epoch tanpa perbaikan val_loss; atau maks 30 epoch.", rows: 2 },
  { key: "seeds", label: "8. Daftar seed", placeholder: "42, 43, 44", rows: 1, help: "Minimal 3 seed agar variansi bisa diukur." },
  { key: "notes", label: "9. Catatan tambahan", placeholder: "Dataset dibuat dari CIFAR-10 dengan subsample kelas 0-4 ke 500 sampel; kelas 5-9 tetap.", rows: 3 },
];

function buildMarkdown(f: Form): string {
  const slug = f.title.trim() || "eksperimen-tanpa-judul";
  const lines: string[] = [];
  lines.push(`# Protokol Eksperimen: ${slug}`);
  lines.push("");
  lines.push(`> Dibuat: ${new Date().toLocaleString("id-ID")}`);
  lines.push("");
  lines.push("## 1. Tujuan");
  lines.push("");
  lines.push(f.goal.trim() || "_(kosong)_");
  lines.push("");
  lines.push("## 2. Baseline");
  lines.push("");
  lines.push(f.baseline.trim() || "_(kosong)_");
  lines.push("");
  lines.push("## 3. Variabel yang Berubah");
  lines.push("");
  const vars = f.variables.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  if (vars.length === 0) {
    lines.push("_(kosong)_");
  } else {
    vars.forEach((v) => lines.push(`- ${v}`));
  }
  lines.push("");
  lines.push("## 4. Hipotesis (dapat dipalsukan)");
  lines.push("");
  lines.push(f.hypothesis.trim() || "_(kosong)_");
  lines.push("");
  lines.push("## 5. Metrik Sukses");
  lines.push("");
  lines.push(f.metrics.trim() || "_(kosong)_");
  lines.push("");
  lines.push("## 6. Hasil yang Diharapkan");
  lines.push("");
  lines.push(f.expected.trim() || "_(kosong)_");
  lines.push("");
  lines.push("## 7. Kriteria Berhenti");
  lines.push("");
  lines.push(f.stopCriteria.trim() || "_(kosong)_");
  lines.push("");
  lines.push("## 8. Seed");
  lines.push("");
  lines.push(`- Daftar seed: ${f.seeds.trim() || "_(kosong)_"}`);
  lines.push("");
  if (f.notes.trim()) {
    lines.push("## 9. Catatan");
    lines.push("");
    lines.push(f.notes.trim());
    lines.push("");
  }
  lines.push("---");
  lines.push("");
  lines.push("_Pre-registration: commit berkas ini sebelum menjalankan run pertama._");
  lines.push("");
  return lines.join("\n");
}

export default function ProtocolGenerator() {
  const [form, setForm] = useState<Form>(INITIAL);
  const [copied, setCopied] = useState(false);

  const update = (key: keyof Form, value: string) => setForm((f) => ({ ...f, [key]: value }));
  const md = buildMarkdown(form);
  const slug = (form.title.trim() || "protokol-eksperimen").replace(/\s+/g, "-").toLowerCase();

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent
    }
  };

  const onDownload = () => {
    downloadFile(`${slug}.md`, md, "text/markdown");
  };

  return (
    <div className="page">
      <header className="page-header">
        <div className="eyebrow">Bab 02 · Rigor</div>
        <h1 className="page-title">Generator Protokol Eksperimen</h1>
        <p className="page-lead">
          Isi 9 bagian di bawah. Preview berkas .md muncul di kanan secara live. Unduh, commit ke repo eksperimen Anda sebelum run pertama.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium mb-1.5">{f.label}</label>
              {f.rows > 1 ? (
                <textarea
                  rows={f.rows}
                  value={form[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-white/5 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-rigor focus:border-transparent"
                />
              ) : (
                <input
                  type="text"
                  value={form[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-white/5 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rigor focus:border-transparent"
                />
              )}
              {f.help && <div className="text-xs text-ink/70 dark:text-parchment/55 mt-1">{f.help}</div>}
            </div>
          ))}
        </form>

        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10 bg-parchment/50 dark:bg-white/[0.04]">
              <div className="text-xs font-mono text-ink/70 dark:text-parchment/60">{slug}.md</div>
              <div className="flex gap-2">
                <button type="button" onClick={onCopy} className="btn-ghost text-xs">
                  {copied ? "Tersalin" : "Salin"}
                </button>
                <button type="button" onClick={onDownload} className="btn-primary text-xs">
                  Unduh .md
                </button>
              </div>
            </div>
            <pre className="p-4 text-xs font-mono overflow-auto scrollbar-hidden max-h-[70vh] leading-relaxed bg-white dark:bg-transparent">
              {md}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

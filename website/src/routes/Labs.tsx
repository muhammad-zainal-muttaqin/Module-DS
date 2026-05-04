import { CHAPTERS } from "../lib/chapters";

const REPO_BASE = "https://github.com/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/";
const NBVIEWER_BASE = "https://nbviewer.org/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/";
const COLAB_BASE = "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/";

type NotebookEntry = { file: string; label: string };

const NOTEBOOKS: Record<string, NotebookEntry[]> = {
  "01": [
    { file: "lab_w1_tabular_heads.ipynb", label: "Lab W1 - Tabular Output Heads" },
    { file: "lab_w1_mlp_numpy.ipynb", label: "Lab W1 - MLP Numpy (breadth)" },
  ],
  "02": [
    { file: "lab_w2_cnn_baseline.ipynb", label: "Lab W2 - Baseline CNN" },
  ],
  "03": [
    { file: "lab_w3_loss_ablation.ipynb", label: "Lab W3 - Loss + Freeze Ablation" },
  ],
  "04": [
    { file: "lab_w4_experiment_tracking.ipynb", label: "Lab W4 - Config + Logging" },
  ],
  "05": [
    { file: "lab_w5_lstm_sequence.ipynb", label: "Lab W5 - RNN vs LSTM" },
  ],
  "06": [
    { file: "lab_w6_eda_leakage.ipynb", label: "Lab W6 - EDA + Leakage Audit" },
    { file: "lab_w6_feature_representation.ipynb", label: "Lab W6 - Representasi Fitur" },
    { file: "lab_w6_temporal_leakage.ipynb", label: "Lab W6 - Temporal Leakage Demo" },
  ],
  "07": [
    { file: "lab_w7_llm_assisted.ipynb", label: "Lab W7 - LLM-Assisted Loop" },
    { file: "lab_w7_text_classification.ipynb", label: "Lab W7 - Klasifikasi Teks IndoNLU" },
    { file: "lab_w7_repo_adoption.ipynb", label: "Lab W7 - Adopsi Repo Eksternal" },
    { file: "lab_w7_transformer_mini.ipynb", label: "Lab W7 - Transformer-mini (breadth)" },
  ],
  "08": [
    { file: "lab_w8_remote_training.ipynb", label: "Lab W8 - RunPod Remote Training" },
  ],
  "09": [
    { file: "lab_w9_multimodal_ablation.ipynb", label: "Lab W9 - Multimodal Ablation" },
  ],
  "10": [
    { file: "lab_w10_paper_to_code.ipynb", label: "Lab W10 - Paper to Code" },
  ],
  "12": [
    { file: "lab_w12_demo_app.ipynb", label: "Lab W12 - Streamlit Demo + Gradio" },
    { file: "lab_breadth_autoencoder.ipynb", label: "Lab Breadth - Autoencoder + t-SNE" },
    { file: "portofolio_mandiri.ipynb", label: "Portofolio Mandiri - running log Pekan 4-12" },
  ],
};

export default function Labs() {
  const labs = CHAPTERS.filter((c) => NOTEBOOKS[c.id]);
  const totalNotebooks = Object.values(NOTEBOOKS).reduce((n, arr) => n + arr.length, 0);

  return (
    <div className="page-narrow">
      <header className="page-header">
        <h1 className="page-title">Lab Notebook</h1>
        <p className="page-lead">
          {totalNotebooks} Jupyter notebook pendamping bab (termasuk lab breadth dan portofolio mandiri). Jalankan di Google Colab, inspeksi di nbviewer, atau clone repo dan jalankan lokal.
        </p>
      </header>

      <ul className="grid gap-4">
        {labs.map((c) => {
          const entries = NOTEBOOKS[c.id];
          return (
            <li key={c.id} className="card p-6">
              <div>
                <div className="text-xs font-mono text-ink/70 dark:text-parchment/60">
                  Bab {c.id} · Minggu {c.weeks}
                </div>
                <div className="font-serif text-xl font-semibold mt-1">{c.title}</div>
                <div className="text-sm text-ink/70 dark:text-parchment/70 mt-1">{c.subtitle}</div>
              </div>

              <ul className="mt-4 space-y-3">
                {entries.map((nb) => (
                  <li key={nb.file} className="flex flex-wrap items-start justify-between gap-3 border-t border-ink/10 dark:border-parchment/10 pt-3 first:border-t-0 first:pt-0">
                    <div className="min-w-0">
                      <div className="font-medium text-sm">{nb.label}</div>
                      <div className="mt-1 text-xs font-mono text-ink/70 dark:text-parchment/50 break-all">
                        {nb.file}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`${COLAB_BASE}${nb.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary text-sm"
                      >
                        Buka di Colab
                      </a>
                      <a
                        href={`${NBVIEWER_BASE}${nb.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary text-sm"
                      >
                        nbviewer
                      </a>
                      <a
                        href={`${REPO_BASE}${nb.file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ghost text-sm"
                      >
                        GitHub
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

      <aside className="mt-10 rounded-xl border border-curiosity/30 bg-curiosity-soft/30 dark:bg-curiosity/10 p-6 text-sm">
        <div className="font-semibold mb-2">Catatan setup lokal</div>
        <p className="mb-2">
          Clone repo, masuk ke <code className="font-mono bg-white/60 dark:bg-white/10 px-1 py-0.5 rounded">template/</code>, aktifkan venv, dan install paket editable:
        </p>
        <pre className="bg-ink/90 text-parchment font-mono text-xs p-3 rounded overflow-x-auto scrollbar-hidden">
{`python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -e ".[dev]"`}
        </pre>
      </aside>
    </div>
  );
}

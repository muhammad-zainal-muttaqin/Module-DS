# Template Repo Riset - Modul Pembelajaran Asisten Dosen AI

Template minimal untuk eksperimen klasifikasi gambar (CIFAR-10 → domain shift medis PathMNIST). Struktur ini dirancang *educational-grade*: seluruh repo dapat dibaca dalam satu jam, setiap modul bertanggung jawab atas satu peran, dan setiap keputusan desain diulas di salah satu bab modul.

## Struktur

```
template/
├── README.md
├── pyproject.toml              # dependencies + metadata proyek
├── configs/
│   ├── baseline.yaml           # SimpleCNN + CrossEntropy, baseline
│   ├── focal_freeze.yaml       # FocalLoss + freeze layer, varian
│   ├── mlp_mnist.yaml          # MLP pada MNIST (tabular/flatten)
│   ├── mlp_tabular.yaml        # MLP pada dataset tabular sintetis (W1)
│   ├── lstm_timeseries.yaml    # LSTM pada deret waktu (W5)
│   ├── transformer_mini.yaml   # TransformerMini pada sequence pendek (W7)
│   └── ae_cifar.yaml           # Autoencoder pada CIFAR-10 (breadth)
├── src/
│   ├── __init__.py
│   ├── data.py                 # dataset + transforms
│   ├── models.py               # SimpleCNN + factory
│   ├── losses.py               # CrossEntropy + FocalLoss
│   ├── train.py                # training loop + logging + checkpoint
│   └── utils.py                # seed, save_cfg, git hash
├── experiments/                # output per run (tidak di-commit isinya)
│   └── .gitkeep
├── notebooks/
│   ├── lab_w1_tabular_heads.ipynb        # W1: task formulation + mismatch
│   ├── lab_w1_mlp_numpy.ipynb            # W1: MLP from-scratch (breadth)
│   ├── lab_w2_cnn_baseline.ipynb         # W2: smoke test + baseline CNN
│   ├── lab_w3_loss_ablation.ipynb        # W3: loss ablation + freeze
│   ├── lab_w4_experiment_tracking.ipynb  # W4: reproducibility + logging
│   ├── lab_w5_lstm_sequence.ipynb        # W5: RNN vs LSTM gradient flow
│   ├── lab_w6_eda_leakage.ipynb          # W6: EDA + leakage audit
│   ├── lab_w6_feature_representation.ipynb  # W6: 3 strategi representasi
│   ├── lab_w6_temporal_leakage.ipynb     # W6: temporal leakage demo
│   ├── lab_w7_llm_assisted.ipynb         # W7: LLM-assisted dev loop
│   ├── lab_w7_repo_adoption.ipynb        # W7: repo adoption walkthrough
│   ├── lab_w7_text_classification.ipynb  # W7: BERT IndoNLU fine-tune
│   ├── lab_w7_transformer_mini.ipynb     # W7: attention from-scratch (breadth)
│   ├── lab_w8_remote_training.ipynb      # W8: RunPod remote training
│   ├── lab_w9_multimodal_ablation.ipynb  # W9: per-modality ablation
│   ├── lab_w10_paper_to_code.ipynb       # W10: paper-to-code
│   ├── lab_w12_demo_app.ipynb            # W12: demo app
│   ├── lab_breadth_autoencoder.ipynb     # breadth: AE + t-SNE (opsional)
│   └── portofolio_mandiri.ipynb          # portofolio log W4-W10
└── docs/
    ├── experiment_log_template.md
    └── prereg_template.md
```

## Setup (dengan `bun`-free Python; `uv` direkomendasikan)

```bash
# Python 3.10+; bisa pakai venv atau uv
python -m venv .venv
source .venv/bin/activate           # Windows: .venv\Scripts\activate
pip install -e .
```

Bila ingin lebih cepat:

```bash
uv venv
source .venv/bin/activate
uv pip install -e .
```

## Smoke Test

Pastikan dependensi terpasang dengan benar dan loop training jalan tanpa download dataset penuh:

```bash
python -m src.train --config configs/baseline.yaml --dry-run
```

Output harus menunjukkan: satu epoch pelatihan pada ~100 sampel, loss turun, checkpoint tersimpan di `experiments/baseline_dryrun/ckpt_last.pt`. Butuh < 1 menit di laptop CPU.

## Menjalankan Baseline Penuh

```bash
python -m src.train --config configs/baseline.yaml --seed 42
```

Hasil masuk ke `experiments/baseline_seed42/` berisi: `config.yaml`, `train.log`, `ckpt_best.pt`, `results.csv`, `tb/` (TensorBoard).

## Filosofi Desain

- **Satu file = satu peran.** `data.py` hanya tentang data, `models.py` hanya tentang arsitektur. Tidak ada yang campur.
- **Config di YAML, bukan di kode.** Mengubah hyperparameter tidak mengubah commit.
- **Seed dikunci lengkap.** Lihat `utils.set_seed` - Python, NumPy, Torch, CUDA.
- **Checkpoint menyertakan git hash.** Hasil tidak bisa lepas dari kode yang menghasilkannya.
- **Minimal, bukan lengkap.** Template ini bukan produk; ia adalah titik awal yang dapat kamu kembangkan.

## Konvensi Nama Eksperimen

Setiap run menghasilkan folder `experiments/<config_name>_seed<N>/`. Jika kamu mengubah sesuatu yang tidak di config (mis. augmentasi baru), tambahkan suffix: `experiments/baseline_seed42_aug_hflip/`. Kontrak: folder yang lengkap harus dapat direproduksi persis dari `config.yaml` + `commit_hash` di dalamnya.

## Rujukan ke Bab Modul

- Struktur config + logging: W4 (Reproducibility).
- Ablation pattern (loss × freeze): W3 (Loss, Optimizer & Evaluasi).
- Audit leakage sebelum eksperimen: W6 (Representations & Temporal Leakage).
- Adopsi repo eksternal: W7 (Text, Transformers & Repo Adoption).
- Demo dari checkpoint: W12 (Capstone).
- Remote training: W8 (Foundation Models).

## Lisensi

MIT untuk struktur repo template. Dataset (CIFAR-10, PathMNIST) mengikuti lisensi masing-masing sumber.

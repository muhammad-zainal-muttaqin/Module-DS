# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tujuan Proyek

Modul pembelajaran **11 minggu bootcamp + 4 minggu capstone** untuk mahasiswa S1 (semester 4–6) yang menjadi **asisten dosen riset ML/DL**. Target outcome: 3 pilar (Ketajaman Teknis, Diagnosis & Kemandirian, Perancangan Riset). Fokus bukan pada framework, tetapi pada empat sikap riset: **Curiosity, Rigor, Skepticism, Ownership**. Referensi utama: `EXPECTED_OUTCOME.txt` (9 outcome), `TODO.txt` (konteks dan pesan dosen).

## Struktur Konten (Post-Revisi April 2026)

```
ModulePembelajaran/
├── chapters/
│   ├── 00_Pendahuluan.md              (17 file .md bab)
│   ├── 00a_Prasyarat.md
│   ├── 01_W1_Tabular_Output_Heads.md
│   ├── ... (through 15_Panduan_Instruktur.md)
│   └── 15_Panduan_Instruktur.md
├── figures/                         Diagram dan ilustrasi
├── template/                        Skeleton repo riset
├── website/                         SPA React + Vite
├── Notes - <tanggal>/               Catatan sumber (referensi)
├── _archive/                        File lama (tidak dirender)
├── CLAUDE.md
├── README.md
└── .gitignore
```

**File sumber catatan (sudah terintegrasi; file asli disimpan sebagai referensi):**

- `Notes - 17 April 2026/petabesar.md` → konten dasar tensor/arsitektur masuk ke W1-W2
- `Notes - 17 April 2026/representasifitur.md` → konten representasi fitur masuk ke W3 + W6
- `Notes - 27 April 2026/revisi_bootcamp.md` → blueprint overhaul 11 minggu bootcamp + 3 minggu capstone (struktur awal)
- `Notes - 30 April 2026/11_W11_Research_Framing new.md` → overhaul W11: framework Input→Middle→Output + framing menu + literature triage (terintegrasi 30 April 2026)
- `Notes - 30 April 2026/12_Capstone new.md` → overhaul capstone: 3 → 4 minggu, struktur filter/rethink/communicate/submit (terintegrasi 30 April 2026)
- `Notes - 2 Mei 2026/attention_primer.md` → §1.3 baru di W7: cara kerja attention (QKV, Transformer block, positional encoding, freeze vs fine-tune) (terintegrasi 2 Mei 2026)
- `Notes - 2 Mei 2026/analisis gap.md` → 4 gap konten: gradient clipping mechanism (W5 §4), LSTM gate → vanishing gradient bridge (W5 §1.5.2), residual connection principle (W5 §1.5.2), pretraining rationale (W7 §1.1) (terintegrasi 2 Mei 2026)
- `Notes - 2 Mei 2026/scaleddotproductattention.png` → `figures/fig06a_attention_sdp.png` (dipakai di W7 §1.3)
- `Notes - 2 Mei 2026/temporalalignment.png` → `figures/fig08c_temporal_alignment.png` (referensi W9)
- `Notes - 2 Mei 2026/Note2.txt` → revisi `00_Pendahuluan.md`: §0.5 prasyarat → `00a_Prasyarat.md` (file baru), §2 Target Hasil diganti 3-pilar Bu Fatma (hapus 60-70%), §3 baru "Cara Membaca Modul Ini" (gabungan §0+§5+§8+§9), §6 Ritme Sesi → `15_Panduan_Instruktur.md`, §10 Pitfalls → absorb ke §6 Kontrak Belajar (terintegrasi 2 Mei 2026)
- `Notes - 04 Mei 2026/satu dataset tiga tugas.png` → `figures/fig01g_tiga_tugas.png` (W1 §2.1.2, diagram body-head tiga tugas)
- `Notes - 04 Mei 2026/pasangan output head dan loss.png` → `figures/fig01h_output_head_loss.png` (W1 §2.2.4, setelah tabel ringkasan)
- `Notes - 04 Mei 2026/sigmoid dan softmax.png` → `figures/fig01i_sigmoid_softmax.png` (W1 §2.2.4, antara IMPORTANT callout dan tabel)
- `Notes - 04 Mei 2026/siklus training pytorch.png` → `figures/fig03c_training_cycle.png` (W3 §1 Motivasi, setelah penjelasan 3 skenario)
- `Notes - 04 Mei 2026/train-val-test dan leakage.png` → `figures/fig06c_train_val_leakage.png` (W6 §0.6, setelah kode "Solusi yang benar")
- `Notes - 04 Mei 2026/Note.txt` → bug fix `lab_w1_tabular_heads.ipynb` (eval binary block: `(logits.squeeze() > 0).long()` → `logits.argmax(dim=1)`; band-aid di §4 dan §6 dihapus) + `lab_w1_mlp_numpy.ipynb` (cell §7 PyTorch parity check dipindahkan sebelum §8 Refleksi) (terintegrasi 4 Mei 2026)

**Perubahan struktural besar:**
- **(27 April 2026)** Modul lama 10-bab format-topik → 11-minggu bootcamp (W1-W11) + 3-minggu capstone (W12-W14), format weekly
- **(30 April 2026)** Overhaul W11: framework 5-Whys diganti Input→Middle→Output + framing menu + literature triage + live demo dataset placeholder; file capstone di-rename `12_Capstone_3_Minggu.md` → `12_Capstone.md`; capstone diperpanjang 3 → 4 minggu (W12-W15); W15 = submission week tanpa sesi tatap muka
- **(2 Mei 2026 - Sesi 1)** Integrasi 4 gap konten di W5 (gradient clipping, LSTM-vanishing bridge, residual principle) + W7 (pretraining rationale, §1.3 attention primer baru); pemetaan K1-K9 diperbarui di website (`chapters.ts`), `CompetencyGrid.tsx`, dan `14_Lampiran.md §D.2` mengikuti struktur 11+4 minggu; 2 gambar baru (`fig06a_attention_sdp.png`, `fig08c_temporal_alignment.png`) ditambahkan ke `figures/`; halaman gate kompetensi `/kompetensi/:id` ditambahkan ke website
- **(2 Mei 2026 - Sesi 2)** Revisi `00_Pendahuluan.md` atas permintaan Bu Fatma: prasyarat dipindahkan ke `00a_Prasyarat.md` (file baru), Target Hasil diganti format 3-pilar (Ketajaman Teknis, Diagnosis & Kemandirian, Perancangan Riset), teks "60-70%" dihapus dari semua file mahasiswa, Ritme Sesi dipindahkan ke `15_Panduan_Instruktur.md`, Pitfalls diintegrasikan ke Kontrak Belajar; website pipeline diperbarui untuk `00a`
- **(4 Mei 2026)** Integrasi Notes 04 Mei: 5 gambar diagram baru ditambahkan ke `figures/` (fig01g-fig01i di W1, fig03c di W3, fig06c di W6); bug fix `lab_w1_tabular_heads.ipynb` (eval binary block + 2 band-aid cells); bug fix `lab_w1_mlp_numpy.ipynb` (reorder cell §7 sebelum §8 Refleksi)
- File-file lama diarsipkan ke `_archive/` (tidak dirender website)
- Konvensi penomoran konten: gunakan **W-numbering** (W1-W14) di teks bab; gunakan nama file (mis. `13_Rubrik_Penilaian.md`) saat me-link

**Konten utama per minggu (state saat ini):**

- **W1** (`01_W1_Tabular_Output_Heads.md`): tabular MLP, output heads + loss matching, observation before conclusion
- **W2** (`02_W2_Images_CNN_Smoke_Test.md`): tensor citra, CNN, ritual three-level smoke test
- **W3** (`03_W3_Loss_Optimizer_Evaluasi.md`): example-first galeri 5 run → loss/optimizer/evaluasi theory; representasi fitur 3 strategi
- **W4** (`04_W4_Reproducibility_Experiment_Matrix.md`): experiment matrix + YAML/seed/checkpoint; §3.5 Komunikasi Efektif (SQRC, matriks saluran); §2.6 Ketika Hipotesis Tidak Terkonfirmasi; Git workflow eksperimental
- **W5** (`05_W5_Sequences_RNN_LSTM.md`): RNN vs LSTM, gradient flow, Lab 3b mandatory; **§1.5.2**: bridge sentence LSTM cell state → vanishing gradient + residual connection principle; **§4**: gradient clipping mechanism diperluas (norma global, mengapa 1.0, clip_grad_norm_ vs clip_grad_value_)
- **W6** (`06_W6_Representations_Temporal_Leakage.md`): representasi recap + temporal leakage demo (delta dramatic 0.92 → 0.63 di §0.6); §2.6.3 negative results sebagai kewajiban etis; Lab 6c peer code review
- **W7** (`07_W7_Text_Transformers_Repo_Adoption.md`): text + Transformers + AI tools + repo adoption (file dual-section: Part 1 ringkas + Part 2 "Pendalaman" deep dive D1-D7); **§1.1**: 2 paragraf baru mengapa pretraining efektif (transfer learning hierarchy); **§1.3 BARU**: cara kerja attention (QKV formula, kode Python, Transformer block, multi-head, positional encoding, freeze vs fine-tune); §1.3 lama → §1.4, §1.4 lama → §1.5
- **W8** (`08_W8_Foundation_Models.md`): taxonomy modality×family×adaptation, model card literacy (§2.3), pohon keputusan adaptasi (§2.4)
- **W9** (`09_W9_Multimodal_Reasoning.md`): fusion strategies, per-modality ablation, missing modality, peta keluarga generatif
- **W10** (`10_W10_Paper_Reading.md`): 3-pass paper reading + paper-to-code workflow; templates A-E (termasuk LSTM/Transformer dan Autoencoder breadth)
- **W11** (`11_W11_Research_Framing.md`): framework Input→Middle→Output (3 pertanyaan: entitas/output/input, peta Middle+gap, validasi gap); framing menu (4-6 framing kandidat); literature triage loop; placeholder live demo dataset (Bu Fatma fasilitasi); workshop 3 sesi; deliverable: dokumen dekomposisi + tabel triage + daftar pendek framing untuk W12
- **W12-W15** (`12_Capstone.md`): timeline 4-minggu capstone - W12 filter+framing defense+Eks1 pre-reg, W13 rethink+Eks2 pre-reg, W14 final research talks (20 mnt), W15 pengumpulan tanpa sesi kelas
- **Rubrik** (`13_Rubrik_Penilaian.md`): 4-level mastery + Kompetensi 10 (Eksplorasi Mandiri & Komunikasi); bobot Kompetensi 1: 14%, Kompetensi 7: 4%; **Breadth Check Policy** callout di Kompetensi 1 (mana lab wajib vs opsional; Lab 6b = `lab_w7_transformer_mini` wajib untuk breadth; Pendalaman collapsible tidak masuk syarat minimum)
- **Lampiran** (`14_Lampiran.md`): glosarium ID↔EN; A.1 backprop derivasi 7-langkah; **A.11 Indeks First-Use per Bab** (28 istilah Tier-1 → chapter pertama dipakai + link); **A.12 Worked Examples Istilah Prioritas** (28 istilah dengan contoh angka konkret); C.6-C.11 (entri portofolio, presentasi, lab breadth, Komponen Mandiri, weekly log, weekly update PI); §G Self-Checklist Mingguan
- **Panduan Instruktur** (`15_Panduan_Instruktur.md`): pacing 11+4 + emphasis per-W + **peta Pendalaman opsional vs wajib per bab** + skenario kelas (termasuk Skenario 5 "Kelas Berjuang di W5 LSTM")

**Breadth Arsitektur NN (lima keluarga: MLP, CNN, RNN/LSTM, Transformer, Autoencoder):**

Modul melatih breadth lima keluarga, bukan hanya CNN. Pemetaan ke W-numbering:

- W1 (Pendahuluan + 01): MLP forward pass tabular
- W2 (02): CNN + tensor citra + smoke test
- W5 (05) + lab_w5_lstm_sequence: RNN/LSTM gradient flow (wajib)
- W7 (07) + lab_w7_text_classification + lab_w7_transformer_mini: Transformer (BERT-family fine-tune) + Transformer-mini dari nol (breadth opsional)
- lab_breadth_autoencoder: Autoencoder + denoising AE + t-SNE (breadth opsional, dapat dikerjakan kapan saja)
- W9 §2.7: peta keluarga model generatif (VAE/GAN/Diffusion/Normalizing Flow), peta mental saja tanpa implementasi
- W10 Template D dan E: LSTM vs Transformer sequence forecasting + Autoencoder representation learning
- Pendahuluan (00): Kontrak Belajar klausul Keenam - Breadth Check (forward pass 4 dari 5 keluarga)
- Rubrik Kompetensi 1: deskriptor breadth lintas 4 level (bobot 14%)
- Lampiran A.1 entri glosarium: MLP, LSTM cell, GRU, attention, multi-head attention, positional encoding, encoder/decoder, autoencoder, bottleneck, reconstruction loss, latent space, VAE, GAN, diffusion model
- Lampiran C.8: Template Lab Replikasi Arsitektur untuk Komponen Mandiri Jalur D (Arsitektur Baru)

**Lab baru di `template/notebooks/`:**
- `notebooks/lab_w1_tabular_heads.ipynb`: 3 task formulation (regression/binary/multiclass), mismatch experiment, observation vs interpretation writeup
- `notebooks/lab_w1_mlp_numpy.ipynb`: MLP 2-layer dari nol dengan numpy (forward, backward manual 7-langkah, finite-difference gradient check, SGD), parity check dengan `SimpleMLP` PyTorch
- `lab_w5_lstm_sequence.ipynb`: sine+noise one-step-ahead regression, RNN vanilla vs LSTM gradient flow (log-plot vanishing gradient), training dengan grad clipping, visualisasi prediksi
- `lab_w6_temporal_leakage.ipynb`: temporal leakage demo (causal vs leaky pipeline, leakage inflation, chronological vs random split)
- `lab_w7_transformer_mini.ipynb`: `scaled_dot_product_attention` dari nol, `SingleHeadAttention`, `TinyBlock` (pre-norm LN + GELU FFN), parity check vs `nn.TransformerEncoderLayer`, toy sequence classifier
- `lab_w9_multimodal_ablation.ipynb`: late fusion, 7-condition per-modality ablation, ignored-modality detection, modality dropout
- `lab_breadth_autoencoder.ipynb`: convolutional AE CIFAR-10 unsupervised, rekonstruksi visual, t-SNE bottleneck 32-dim, denoising AE variant, peta ke VAE/GAN/Diffusion

**Arsitektur baru di `template/src/models.py`:**
- `SimpleMLP(input_dim, hidden_sizes, num_classes, dropout, activation)` - support Lab W1 dan tabular
- `SimpleLSTM(input_size, hidden_size, num_layers, num_classes, dropout, readout)` - support Lab W5, readout "last" atau "all"
- `TransformerMini(vocab_size, d_model, nhead, num_layers, dim_feedforward, max_len, num_classes, dropout)` - support Lab W7, pakai `nn.TransformerEncoder` + `_PositionalEncoding`
- `SimpleAutoencoder(image_channels, bottleneck_dim)` - support lab_breadth_autoencoder, method `encode`/`decode`/`forward`
- `build_model(cfg)` extended: `simple_cnn`, `simple_mlp`, `simple_lstm`, `transformer_mini`, `simple_ae`
- `apply_freeze` raises ValueError untuk non-SimpleCNN

**Config baru di `template/configs/`:** `mlp_mnist.yaml`, `lstm_timeseries.yaml`, `transformer_mini.yaml`, `ae_cifar.yaml`.

**Loader baru di `template/src/data.py`:**
- `mnist` (flattened untuk MLP)
- `sine_sequence` (sintetis sine + noise untuk RNN/LSTM/Transformer sequence)
- `cifar10_unlabeled` (CIFAR-10 untuk AE unsupervised, label masih dikeluarkan loader hanya untuk t-SNE coloring)

**Template repo perubahan:**
- `src/train.py`: bug `warmup_epochs` diperbaiki - sekarang menggunakan `SequentialLR` dengan `LinearLR` warmup sebelum scheduler utama
- `docs/prereg_template.md`: file baru, template pre-registration lengkap
- `notebooks/lab_w2_cnn_baseline.ipynb`: diisi penuh (smoke test, forward pass, log parser, confusion matrix, error analysis)
- `notebooks/lab_w3_loss_ablation.ipynb`: diisi penuh (FocalLoss test, 2×2 grid ablation, bar chart dengan error bars)
- `notebooks/lab_w4_experiment_tracking.ipynb`: diisi penuh (reproducibility verification, checkpoint inspection, resume dari checkpoint, multi-seed plot)
- `notebooks/lab_w6_eda_leakage.ipynb`: diisi penuh (5-layer EDA, MD5 overlap detection, leakage audit)
- `notebooks/lab_w7_llm_assisted.ipynb`: diisi penuh (mixup implementation, 4 sanity tests, comparison training)
- `notebooks/lab_w12_demo_app.ipynb`: diisi penuh (aggregation plot, Streamlit template, Gradio annotation template)
- `notebooks/lab_w6_feature_representation.ipynb`: representasi fitur 3 strategi (CIFAR-10)
- `notebooks/lab_w7_text_classification.ipynb`: klasifikasi sentimen teks IndoNLU SmSA
- `notebooks/portofolio_mandiri.ipynb`: portofolio log berjalan entri W4-W10 + refleksi akhir bootcamp; template entri per-bab dengan bagian Setup/Temuan/Kejutan/Yang-Akan-Diubah/Koneksi

## Template Repo (`template/`)

Skeleton educational untuk klasifikasi gambar (CIFAR-10 → PathMNIST). Filosofi: **satu file = satu peran**, config di YAML bukan kode, seed dikunci penuh, checkpoint menyertakan git hash.

### Setup

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -e .
# atau lebih cepat:
uv venv && source .venv/bin/activate && uv pip install -e .
```

Optional extras: `pip install -e ".[demo]"` (Streamlit/Gradio), `pip install -e ".[medical]"` (PathMNIST), `pip install -e ".[dev]"` (Jupyter, ruff).

### Menjalankan Eksperimen

```bash
# Smoke test (dry-run, <1 menit CPU)
python -m src.train --config configs/baseline.yaml --dry-run

# Baseline penuh
python -m src.train --config configs/baseline.yaml --seed 42

# Varian ablation
python -m src.train --config configs/focal_freeze.yaml --seed 42
```

Output per-run masuk ke `experiments/<config_name>_seed<N>/` berisi `config.yaml`, `train.log`, `ckpt_best.pt`, `ckpt_last.pt`, `summary.json`, `tb/`.

### Linting

```bash
ruff check src/
ruff format src/
```

## Konvensi Penulisan Bab

Setiap bab mengikuti urutan tetap: Peta Bab → Motivasi → Konsep Inti → Worked Example → Pitfalls & Miskonsepsi → Lab Hands-on → Refleksi (3 pertanyaan terbuka) → Bacaan Lanjutan. Jangan ubah urutan ini.

Bahasa Indonesia. Istilah teknis ML/DL dipertahankan dalam bahasa Inggris (loss, checkpoint, seed, freeze, ablation, dll.) - tidak diterjemahkan paksa. Glosarium lengkap ada di `14_Lampiran.md`.

Sikap (Curiosity, Rigor, Skepticism, Ownership) **tidak** dibahas dalam bab khusus; ditanamkan melalui cerita pembuka, pitfall, dan pertanyaan refleksi.

## Gaya Penulisan (Style Guide)

Aturan wajib saat menambah atau mengedit konten `.md` dan sel markdown notebook:

**Tanda baca:**

- **JANGAN pakai em dash (`—`, U+2014).** Ganti dengan hyphen biasa dengan spasi `-` (pola yang dipakai seluruh modul), koma, titik dua, atau tanda kurung sesuai konteks. Em dash tidak konsisten dengan PUEBI dan gaya modul lama.
- En dash (`–`, U+2013) hanya dipakai untuk rentang numerik/minggu (mis. `2–3`, `13–14`).
- Tanda kutip pakai `"..."` lurus (ASCII), bukan `"..."` smart quotes.
- Untuk interupsi/apposisi pakai `, ... ,` atau `( ... )` atau `- ... -`.

**Bahasa:**

- Ikuti PUEBI. Istilah asing yang belum diserap di-*italicize* (mis. *hidden states*, *baseline*, *fine-tune*).
- Passive prefix `di-` pada kata asing pakai hyphen: `di-fine-tune`, `di-pretrain`, `di-freeze`.
- Kata "apapun", "siapapun" ditulis menyatu (gaya yang konsisten di seluruh modul).

**Diksi Natural (hindari rasa "terjemahan literal"):**

Penulis modul adalah penutur asli Indonesia. Prosa harus terasa ditulis langsung dalam Indonesia, bukan diterjemahkan dari English academic prose. Jangan hanya mengandalkan regex; baca ulang kalimatnya dan tanyakan: "apakah penutur Indonesia akan menulis kalimat ini dari nol?"

Prinsip audit:

1. **Utamakan maksud, bukan padanan kata.** Jika kalimat terasa seperti struktur Inggris yang diberi kata Indonesia, restrukturisasi kalimatnya.
2. **Jangan memaksa metafora.** Jika maksudnya urutan, pakai `urutan`, `alur`, `bertahap`, atau `melanjutkan dari`; jangan pakai metafora seperti tangga, jalan, atau "di atas" kecuali benar-benar membantu.
3. **Jangan personifikasi abstrak.** Modul, dokumen, protokol, dan sistem boleh "memuat", "menjelaskan", atau "merekam"; jangan dibuat seperti pihak yang menyepakati, bergerak, atau berpikir.
4. **Hindari future auxiliary sebagai default.** `Anda akan ...` boleh untuk kejadian masa depan yang nyata, tetapi pembuka section deskriptif lebih natural dengan present/impersonal.
5. **Pertahankan istilah teknis Inggris yang memang teknis.** `loss`, `gradient`, `checkpoint`, `seed`, `freeze`, `ablation`, `fine-tune` tetap boleh. Untuk frasa umum non-teknis, pakai Indonesia: `sumber belajar`, `glosarium singkat`, `opsional`, `tercakup`, `secara mandiri`.
6. **Jika menemukan pola baru, update tabel ini.** Jangan biarkan perbaikan hanya hidup di diff.

Katalog pola di bawah adalah contoh yang pernah ditemukan di modul. Kaku di kiri, natural di kanan:

| Kaku / calque (hindari) | Natural (pakai) | Catatan |
|---|---|---|
| `secara praktis` | `dalam praktiknya` | |
| `bekerja ampuh / bekerja kuat` | `sangat efektif` / `sangat ampuh` | |
| `ada untuk` (= "exists to") | `dirancang untuk` | |
| `menunjuk ke` (= "points to" abstrak) | `mengacu pada` | Kecuali makna spasial/matematis literal (mis. "gradien menunjuk ke arah") |
| `Ketika Anda` (awal kalimat) | `Saat Anda` | "Ketika" boleh dipertahankan jika konteks butuh formalitas tinggi |
| `yang asing` | `yang belum dikenal` | |
| `Aturan jempol` | `Aturan praktisnya` | |
| `kerangka mental` | `kerangka berpikir` | |
| `menemui` (= "encounter") | `menjumpai` | |
| `mengintimidasi` | `membuat gentar` | |
| `berada X% menuju Y` | `X% siap untuk Y` / `mencapai X% kesiapan` | Spasial-metaforis "be X% of the way to Y" tidak natural di ID |
| `kerja independen` | `kerja mandiri` / `secara mandiri` | "Independen" cocok untuk politik/organisasi, bukan kemampuan kerja |
| `topik X nyata` (= "real X") | `topik X` / `topik X sebenarnya` | "Nyata" sebagai post-nominal calque "real" jarang natural; sering bisa dihapus |
| `diharapkan datang dari` | `berasal dari` / `terbentuk dari` | "Datang" untuk hal abstrak adalah calque "come from" |
| `Anda akan + V` sebagai pembuka section deskriptif | bentuk impersonal atau present (`Anda mengerjakan...`, `Bab ini memperkenalkan...`) | "Anda akan" valid untuk future asli (rujukan ke minggu depan / capstone), tetapi jangan jadikan default opener bab |
| `dengan X` (= possessive "with X") | `saat memakai X` / `pada X` | "Sumber bug dengan pretrained model" calque "bug with X"; pakai "saat memakai" |
| `menemukan` untuk informasi/konsep abstrak | `melihat` / `mendapatkan` / restrukturisasi | "Anda akan menemukan filosofi" calque "you'll find"; informasi tidak ditemukan, melainkan dibaca |
| `bekerja baik` (= "works well") | `efektif` / `berfungsi dengan baik` | "Bekerja" sebagai metafora kinerja calque "to work" |
| `menemukan diri sendiri` (= "find yourself") | hapus "diri sendiri" / restrukturisasi | Calque "you'll find yourself doing X"; cukup "Anda tergoda..." / "Anda cenderung..." |
| `mini-glosarium` | `glosarium singkat` | "Mini-" sebagai prefix bahasa Inggris tidak natural di ID |
| `bahasa dan bekal minimum` / `bekal modul` | `kosakata dasar` / `prasyarat modul` | Konstruksi "bekal minimum" calque "minimum prerequisites" |
| `Apa yang Anda akan [V]` | `Apa yang akan Anda [V]` | Urutan kata baku ID: interogatif → `akan` → subjek → verba |
| `dengan asumsi minimum` (= "with minimal assumptions") | `dengan prasyarat seminimal mungkin` / `tanpa banyak asumsi` | Nomina "asumsi" tidak berjodoh dengan "minimum" sebagai modifier langsung |
| `ubah loss jadi focal`, `loss-nya jadi focal`, `freeze conv1 pada backbone` sebagai instruksi naratif | `uji focal loss dan freeze blok awal pada backbone`; jika konteks SimpleCNN: `freeze block1` | Jangan mencampur frasa kasual `jadi focal` dengan istilah kode spesifik `conv1` kecuali sedang membahas implementasi konkret. Untuk instruksi PI, tulis natural dulu; detail layer dikunci di protokol |
| `intuisi` (= abstrak "intuition/concept") | `pemahaman` / `gambaran` / `cara kerja` / `prinsip` | "Intuisi" dalam ID bermakna naluri/insting; untuk "understanding of a concept" pilih kata sesuai konteks: gambaran (umum), pemahaman (konsep), cara kerja (mekanisme), prinsip (aturan). Pengecualian: "kejujuran intuisi" / "memvalidasi intuisi" — di sini "intuisi" berarti dugaan/tebakan, sah dipakai |
| `secara umum` sebagai penanda tren pada data tunggal | `cenderung` / `pada umumnya` / hapus | "Secara umum" valid untuk generalisasi multi-data; untuk tren kurva tunggal pakai "cenderung" |
| `X bukan berarti Y` sebagai kalimat mandiri setelah kalimat sebelumnya | gabungkan: `..., tetapi bukan berarti Y` | Pola dua kalimat "A. Tetapi A bukan berarti B." adalah konstruksi khas terjemahan; lebih natural digabung |
| metafora campuran seperti `urutan tangga` / `tangga linier` | `urutan bertahap` / `urutan linier` / `disusun bertahap` | Jangan memaksa metafora spasial jika maksudnya hanya urutan pedagogis |
| `modul ini ada` (= "why this module exists") | `modul ini disusun` / `tujuan modul ini` | `Ada` untuk tujuan abstrak terasa seperti calque "exists" |
| frasa Inggris tempelan seperti `by design`, `density terlalu cepat` | `memang disengaja`, `terlalu padat dalam waktu singkat` | Jangan campur fragmen Inggris jika ada padanan Indonesia yang jelas |
| `Bacanya setelah...` sebagai instruksi | `Baca setelah...` | Hindari nominalisasi lisan yang kaku di instruksi modul |
| `menurunkan backprop` | `menerapkan backprop` / `menjabarkan backprop` | `Menurunkan` hanya natural untuk derivasi formal; untuk lab praktik pakai `menerapkan` |
| `Anda dan modul menyepakati` | `Anda mengikuti kesepakatan` / `kontrak belajar berikut` | Modul bukan pihak yang menyepakati; personifikasi ini terdengar janggal |
| `kompetensi teknis tidak akan bertahan lama tanpa sikap yang benar` | `kompetensi teknis cepat tumpul kalau tidak dibiasakan bersama sikap riset yang tepat` | Hindari `bertahan lama` untuk kemampuan dan `sikap yang benar` yang terdengar moralistik/terjemahan |
| `X muncul berulang sepanjang modul` | `X ditanamkan sepanjang modul` / `X dibahas berulang` | Untuk sikap/nilai, `ditanamkan` lebih natural daripada `muncul berulang` |
| `dengan bacanya` | `dengan membacanya` / restrukturisasi | Hindari bentuk nominal lisan yang kaku dalam instruksi tertulis |
| `Ia adalah versi Anda sebelum hasil keluar` | `Dokumen ini merekam rencana sebelum hasil keluar` | Hindari personifikasi abstrak yang terasa seperti "it is your version..." |
| `sistem yang berputar sendiri` | `alur kerja yang mulai mandiri` / `kebiasaan riset yang berjalan mandiri` | Metafora mekanis ini janggal untuk proses belajar/riset |
| `kerja nyata dimulai` | `pelaksanaan dimulai` / `fase kerja dimulai` | `Nyata` sebagai penegas abstrak sering bisa diganti dengan kata yang lebih konkret |
| `ini mengalahkan tujuan` (= "defeats the purpose") | `ini merusak tujuan` / `ini bertentangan dengan tujuan` | Idiom "mengalahkan tujuan" tidak natural dalam Indonesia |
| `bukti mengalahkan kesan` | `bukti lebih penting daripada kesan` | Hindari slogan hasil terjemahan "X beats Y" |
| `tanggal lebih tua dari commit` | `tanggal lebih awal dari commit` | Untuk urutan waktu dokumen/commit, `lebih awal` lebih jelas daripada `lebih tua` |
| `prasyarat dijaga serendah mungkin` | `prasyarat dibuat seringan mungkin` / `prasyarat ditetapkan seminimal mungkin` | `Dijaga` untuk prasyarat terasa seperti calque "kept low" |
| `di atas X` (= "on top of X" abstrak) | `berbasis X` / `bertumpu pada X` / `melanjutkan dari X` | Hindari metafora vertikal untuk relasi kurikulum/kode kecuali benar-benar spasial |
| `Resource eksternal` | `sumber belajar` / `sumber rujukan` | Pakai istilah Indonesia untuk frasa umum non-teknis |
| `di-cover` | `tercakup` / `dibahas` | Hindari campuran Inggris-Indonesia jika padanan Indonesia jelas |
| `optional` | `opsional` | Gunakan bentuk serapan Indonesia |
| `kerjakan secara independen` | `kerjakan secara mandiri` | Sesuai aturan `kerja independen` di atas |
| `train MLP` | `latih MLP` | Untuk verba umum, pakai Indonesia |
| `shared dataset` | `dataset bersama` | |
| `curve interpretation` | `interpretasi kurva` | |
| `capstone project` | `proyek capstone` | |
| `portfolio` | `portofolio` | Gunakan bentuk serapan Indonesia |
| `trajektori belajar` | `perjalanan belajar` | `Trajektori` terlalu teknis untuk refleksi belajar |
| `Big Map row` | `Baris Big Map` | Label metadata jangan dibiarkan Inggris jika padanan Indonesia jelas |
| `shape transformer` | `pengubah bentuk tensor` | Hindari istilah tempelan jika konsepnya bisa dijelaskan natural |
| `loss-head mismatch` | `ketidakcocokan loss dan head` | Untuk judul/pitfall, utamakan frasa Indonesia yang langsung terbaca |
| `task formulation` | `perumusan tugas` / `tiga tugas` | Jangan pakai noun phrase Inggris untuk konsep umum |
| `run yang sehat` / `galeri runs` | `training yang sehat` / `galeri training` / `contoh training` | `Run` boleh sebagai entitas eksperimen, tetapi untuk narasi pembaca sering lebih natural diganti |
| `three-level smoke test ritual` | `smoke test tiga level` | Hindari `ritual` jika maksudnya prosedur/debugging habit |
| `experiment matrix` | `matriks eksperimen` | Untuk frasa umum yang sudah punya padanan langsung |
| `seed locking` | `penguncian seed` | Terjemahkan struktur umum; `seed` tetap istilah teknis |
| `peta navigasi cepat` untuk diagnosis | `peta diagnosis cepat` | Jangan memaksakan metafora navigasi jika maksudnya diagnosis |
| `data inspection` | `pemeriksaan data` | Hindari label Inggris untuk aktivitas umum |
| `deliverable(s)` | `luaran` | Untuk bagian tugas/rubrik, `luaran` lebih natural daripada `deliverable` |
| `skope minimal` | `cakupan minimal` | Pakai bentuk Indonesia baku, bukan ejaan campuran |
| `modality` dalam prosa umum | `modalitas` | Istilah teknis boleh di tabel/glosarium, tetapi narasi Indonesia lebih natural dengan `modalitas` |
| `workflow discipline` | `disiplin alur kerja` | Jangan biarkan noun phrase Inggris menempel di metadata |
| `ritual` untuk prosedur | `formalitas` / `prosedur` / nama prosedurnya langsung | `Ritual` terdengar janggal jika maksudnya kebiasaan teknis/debugging |
| `sum to 1` | `jumlahnya 1` / `jumlah probabilitasnya 1` | Hindari klausa Inggris pendek di tengah penjelasan Indonesia |
| `di-cover` / `sudah di-cover` | `dibahas` / `tercakup` | Hindari campuran imbuhan Indonesia + verba Inggris |
| `representasi yang informatif` / `representasi yang kaya` / `interaksi yang lebih kaya` | hapus adjective; atau restrukturisasi | Menyematkan adjective pada nomina abstrak untuk mengkomunikasikan "kualitas" adalah calque ("rich/informative representations/interactions"). Untuk "representasi", biarkan konteks ("dari jutaan data") yang membawa makna kualitas. Untuk "interaksi", jelaskan secara konkret ("...pada level yang lebih halus", "...langsung antar token"). |
| `kritis` sebagai penguat generik (= "important/vital/critical") | ganti sesuai konteks: `penting`, `menentukan`, `vital` | Jangan pakai `kritis` sebagai default intensifier. Pilih kata yang lebih spesifik: `penting` (important), `vital` (vital), `menentukan` (decisive), `esensial` (essential), `utama` (primary). |
| `membaca/mengevaluasi secara kritis` | `membaca dengan cermat` / `mengevaluasi` / `menganalisis` | Kecuali konteks "skeptisisme" (sikap riset). Untuk instruksi teknis: `dengan cermat` lebih natural. |
| `pertanyaan kritis` | `pertanyaan teknis` / `pertanyaan evaluasi` | "Kritis" pada pertanyaan jarang berarti "critical questions"; biasanya maksudnya pertanyaan teknis yang perlu dijawab. |
| `analisis kritis` / `bacaan kritis` | `analisis mendalam` / `analisis kritis hanya untuk konteks skeptisisme` | `Analisis kritis` valid untuk peer-review/skeptisisme; untuk paper reading atau evaluasi model, `analisis mendalam` lebih natural. |
| `poin kritis` / `hal kritis` | `poin penting` / `hal penting` | `Poin kritis` adalah calque "critical point" (non-matematis). Pengecualian: `titik kritis` dalam konteks matematis/dinamika sistem sah dipakai. |
| `kebiasaan paling kritis` / `sistem yang kritis` | `kebiasaan paling penting` / `sistem yang vital` | Untuk urgensi/seriousness, `vital`, `penting`, `krusial` lebih natural daripada `kritis`. |
| `mengejutkan` sebagai generic intensifier (calque "surprisingly") | `sangat`, `di luar dugaan`, `tak terduga`, `mencolok`, atau restrukturisasi | "Mengejutkan" dalam ID berarti causing surprise; untuk "surprisingly good/strong" lebih natural pakai `sangat baik`, `sangat kuat`, atau restrukturisasi: `ternyata` / `di luar dugaan`. Untuk refleksi/template, `hal paling mengejutkan` bisa diganti `hal paling menarik` / `hal tak terduga`. |

**Pola yang sering luput dan wajib dihindari:** konstruksi spasial-metaforis ("berada X menuju Y", "di jalur untuk Z", "di atas Lab 3b"), post-nominal kata sifat hasil terjemahan kata-per-kata ("topik lab nyata" = "real lab topics", "data sintetis nyata"), adjective calque yang disematkan ke nomina abstrak ("representasi yang kaya/informatif", "interaksi yang lebih kaya"), personifikasi abstrak ("modul menyepakati", "sistem berputar sendiri"), frasa Inggris tempelan untuk hal umum ("by design", "shared dataset", "shape transformer", "task formulation", "data inspection", "deliverables"), label metadata Inggris yang sebenarnya mudah diterjemahkan ("Big Map row"), future auxiliary "Anda akan + V" sebagai pembuka section deskriptif, **overuse `kritis` sebagai generic intensifier**, dan **overuse `mengejutkan` sebagai generic intensifier** (ganti dengan `sangat`, `di luar dugaan`, `tak terduga`, `mencolok`, atau restrukturisasi - lihat tabel di atas). Pola-pola ini harus diubah walaupun kata per katanya ada di kamus PUEBI.

Pola pembuka section pengantar yang melibatkan pembaca: pakai "kita" sebagai penanda inklusif (mis. "Sebelum **kita** membahas..."), terutama saat menjembatani konsep baru.

Hindari konstruksi bertingkat khas English ("there is one X that Y, which Z, so that W..."). Pecah jadi 2-3 kalimat pendek dengan penanda kohesi natural ("justru", "memang", "sebaliknya", "nah"). Reduplikasi untuk jamak emphasis ("kompetensi-kompetensi", "pertanyaan-pertanyaan") lebih natural daripada artikel kuantitatif ("berbagai kompetensi").

**Format Markdown:**

- Inline code di dalam bold: `**\`Conv2d(...)`**, bukan ``` **Conv2d(...)**` `` (backtick di luar bold).
- Checklist pakai `- [ ]` (GitHub task list), bukan bullet polos.
- Navigasi modul pakai `<details><summary>📂 Navigasi Modul (klik untuk buka)</summary>...</details>` (konsisten di semua 17 file modul aktif).
- Tabel boleh tanpa padding alignment, tetapi header-separator wajib ada (`| --- |`).
- File `.md` wajib diakhiri dengan satu newline.

**Tipografi & Ritme Visual (untuk pembaca website):**

Modul juga di-render di website (`website/src/components/MarkdownRenderer.tsx`) dengan styling editorial di `.prose-modul`. Pola berikut wajib diikuti supaya pembaca tidak melihat dinding teks datar:

1. **Inline enumerasi prosedural pakai list bernomor, bukan paragraf.** Pola `(1) ... (2) ... (3) ...` di tengah paragraf yang isinya benar-benar langkah → pecah jadi `1. ... 2. ... 3. ...`. Pengecualian: jika hanya 2 item pendek dan tidak prosedural (sekadar listing keterangan), boleh tetap inline.
2. **Struktur paralel besar (3+ item dengan format identik) → pecah jadi `####` heading atau list bernomor.** Contoh: "Skenario A/B/C", "Kategori 1/2/3/4", "Aturan 1/2/3/4". `####` muncul di Table of Contents, jadi pembaca bisa melompat. List bernomor dengan **bold lead-in** cukup jika section sudah ramai heading.
3. **Catatan/peringatan/tips → admonition GFM, bukan paragraf bold.** Sintaks: `> [!NOTE]` / `> [!TIP]` / `> [!WARNING]` / `> [!IMPORTANT]` / `> [!CAUTION]`, lalu newline, lalu isi blockquote. Renderer otomatis kasih ikon, label, dan warna theme. Pakai untuk: catatan reproducibility, peringatan biaya, tips workflow. Jangan pakai untuk konten utama yang panjang.
4. **Lead paragraph (kalimat pembuka section) otomatis dapat treatment editorial.** Tidak perlu markup khusus - `h2 + p`, `h3 + p`, `h4 + p` di-style dengan size sedikit lebih besar, weight lebih tegas, warna lebih pekat. Maka paragraf pembuka section harus **bisa berdiri sendiri sebagai pengantar** - jangan langsung lompat ke detail teknis.

**Singkatnya:** kalau menulis 3 item paralel dengan format identik atau menulis `(1)(2)(3)` di paragraf, tanyakan: ini sebenarnya list, kan? Kalau ya, format sebagai list. Kalau menulis "**Catatan**:" atau "**Penting**:" sebagai paragraf, tanyakan: ini sebenarnya admonition, kan? Kalau ya, pakai `> [!NOTE]` atau `> [!IMPORTANT]`.

**Workflow konten baru:**

- Ketika mengintegrasikan catatan dari folder `Notes - <tanggal>/`, ganti em dash di file asli SEBELUM menyalin ke bab utama. File asli tetap disimpan sebagai referensi (jangan dihapus).
- Setelah menambah section baru, update juga: (1) tabel of contents di awal bab, (2) rubrik penilaian terkait di `13_Rubrik_Penilaian.md`, (3) catatan integrasi di CLAUDE.md.

## Website (`website/`)

SPA React + Vite yang me-render 17 bab modul sebagai hash-router app. Deploy via GitHub Pages (branch `gh-pages`).

### Commands

```bash
cd website
npm run dev      # sync konten lalu jalankan dev server (port 5173)
npm run build    # sync konten lalu build ke dist/
npm run sync     # hanya sync .md → src/content/ (tanpa build)
npm run lint     # TypeScript type check
```

### Pipeline Konten

`npm run sync` menjalankan `scripts/sync-content.mjs` yang:
1. Menyalin 17 file `.md` dari `chapters/` → `website/src/content/chapters/`
2. Menyalin 6 config YAML dari `template/configs/` → `website/src/content/configs/`
3. Mem-parse tabel glosarium di `14_Lampiran.md` → `website/src/content/glossary.json`
4. Menyalin figures dari `figures/` → `website/public/figures/`

**Penting:** file di `src/content/` adalah hasil generate - jangan edit manual. Edit selalu di `chapters/*.md` lalu jalankan sync.

Setiap kali file `.md` baru ditambah atau di-rename, update dua tempat:
- `scripts/sync-content.mjs` array `CHAPTERS`
- `src/lib/content.ts` import `?raw` dan object `RAW`

### Arsitektur Website

**Content loading:** Markdown di-import saat build via Vite `?raw` - semua konten masuk bundle JavaScript, tidak ada fetch runtime. `src/lib/content.ts` melakukan tiga transformasi sebelum render: strip nav `<details>`, rewrite link antar-bab ke hash route (`01_W1.md` → `#/modul/01`), rewrite path gambar ke `/figures/`.

**Routing:** HashRouter (`/#/modul/01`, `/#/glosarium`, dst.) - diperlukan untuk GitHub Pages tanpa server-side routing.

**Markdown rendering:** `src/components/MarkdownRenderer.tsx` memakai `react-markdown` dengan plugin remark-gfm, rehype-slug, rehype-autolink-headings, dan Shiki untuk syntax highlighting. Admonition GFM (`> [!NOTE]` dll.) di-handle oleh plugin custom di renderer yang sama.

**State:** Zustand untuk progres belajar (progress tracking per bab) dan preferensi UI.

**Styling:** Tailwind + kelas `.prose-modul` di `MarkdownRenderer.tsx` yang memberi treatment editorial khusus (lead paragraph lebih besar, admonition berikon, dll.).

## Slide Deck Instruktur (`website/src/routes/SlideDeck.tsx`)

Slide ringkasan per bab menggunakan **Reveal.js** yang terintegrasi ke website. Slide ini adalah **trailer** (bukan pengganti modul) - maksimal 8-10 slide yang mempercepat orientasi sebelum membaca modul penuh.

### Aesthetic Assessment (Status Saat Ini)

**Sudah match design system:** warna cream/ink, font Fraunces/Inter, dark mode, layout variatif (title/section/bullets/split/grid/quote/code/cta). Namun ada area penyempurnaan jika diperlukan:

1. **Background terlalu flat** - bisa ditambah subtle gradient atau texture untuk kedalaman visual.
2. **Transisi masih default Reveal.js** - bisa custom dengan CSS transition lebih halus.
3. **Code block belum ada syntax highlighting** - saat ini plain monospace; Shiki bisa di-integrasikan.
4. **Bullet shapes masih default** - bisa custom dengan ikon tematis per bab (mis. neural node untuk W1, gambar untuk W2).
5. **Tidak ada slide cover dengan ilustrasi** - title slide masih teks-centric.

Semua di atas adalah **enhancement opsional**. Slide saat ini sudah fungsional dan konsisten dengan website.

### Panduan Menambah Slide Baru

**Tiga file yang wajib diedit:**

1. **`website/src/lib/slides.ts`** - Data slide (TypeScript array). Contoh struktur per slide:

```typescript
const slides02: SlideSection[] = [
  {
    layout: "title",           // title | section | bullets | split | grid | quote | code | cta
    title: "W2 - Images & CNN",
    subtitle: "Tensor citra & three-level smoke test",
    body: "Bab 02 - Minggu 2",
    footnote: "Lab: Baseline CNN + forward pass inspection",
  },
  {
    layout: "bullets",
    title: "Poin Kunci",
    bullets: [
      "**Tensor citra:** (N, C, H, W) untuk batch RGB",
      "**Conv2d:** filter lokal, parameter sharing",
      "**Pooling:** downsampling spatial",
    ],
    footnote: "Smoke test 3 level: forward → backward → data",
  },
  // ... minimal 6-8 slide total
];
```

2. **Register di registry akhir file:**

```typescript
export const SLIDE_DECKS: Record<string, SlideDeckData> = {
  "00": { chapterId: "00", slides: slides00 },
  "00a": { chapterId: "00a", slides: slides00a },
  "01": { chapterId: "01", slides: slides01 },
  "02": { chapterId: "02", slides: slides02 },  // tambahkan di sini
};
```

3. **`website/src/styles/reveal-custom.css`** - Tambah styling khusus jika perlu (jarang diperlukan).

**Konvensi konten slide:**
- Maksimal **10 slide** per bab (ideal: 6-8).
- Slide 1 selalu `layout: "title"` dengan footnote chapter.
- Slide terakhir selalu `layout: "cta"` dengan link ke modul penuh (`ctaTarget: "02"`).
- Gunakan **bold lead-in** di bullet points untuk scanning cepat.
- Gunakan `layout: "grid"` untuk 3-6 item paralel (konsep, task, klausul).
- Gunakan `layout: "split"` untuk perbandingan 2 kolom.
- Gunakan `layout: "code"` untuk snippet pendek (maksimal 8-10 baris).
- Gunakan `footnote` untuk catatan konteks, bukan konten utama.

**Build & test:**

```bash
cd ModulePembelajaran/website
npm run dev      # test slide di browser
npm run build    # pastikan tidak error
```

Slide akan otomatis muncul di halaman modul sebagai chip "▶ Slide Ringkasan" karena `ModuleReader.tsx` membaca `hasSlideDeck(id)`.

## Konvensi Eksperimen (untuk konten lab)

- Nama folder: `<config_name>_<modifier>_seed<N>/` - jika ada perubahan di luar config, tambah suffix deskriptif.
- Kontrak reproduksibilitas: folder eksperimen harus dapat direproduksi dari `config.yaml` + `commit_hash` di dalamnya.
- Satu variabel berubah per run ablation (kecuali eksplisit multi-factor).


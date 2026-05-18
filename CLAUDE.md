# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tujuan Proyek

**11 minggu bootcamp + 4 minggu capstone** untuk mahasiswa S1 (sem 4–6) jadi asisten dosen riset ML/DL. 3 pilar: Ketajaman Teknis, Diagnosis & Kemandirian, Perancangan Riset. Fokus: 4 sikap riset: **Curiosity, Rigor, Skepticism, Ownership**. Ref: `EXPECTED_OUTCOME.txt` (9 outcome), `TODO.txt`.

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
├── notes/                           Catatan sumber (referensi, tidak dirender)
├── _archive/                        File lama (tidak dirender website)
├── CLAUDE.md
├── README.md
└── .gitignore
```

**File sumber catatan (terintegrasi; asli disimpan sebagai referensi):**

- `notes/Notes - 17 April 2026/petabesar.md` → tensor/arsitektur → W1-W2
- `notes/Notes - 17 April 2026/representasifitur.md` → representasi fitur → W3+W6
- `notes/Notes - 27 April 2026/revisi_bootcamp.md` → blueprint 11 minggu bootcamp+3 minggu capstone
- `notes/Notes - 30 April 2026/11_W11_Research_Framing new.md` → W11: Input→Middle→Output + framing menu + literature triage (30 Apr)
- `notes/Notes - 30 April 2026/12_Capstone new.md` → capstone 3→4 minggu, filter/rethink/communicate/submit (30 Apr)
- `notes/Notes - 2 Mei 2026/attention_primer.md` → W7 §1.3: attention QKV, Transformer block, positional encoding, freeze vs fine-tune (2 Mei)
- `notes/Notes - 2 Mei 2026/analisis gap.md` → 4 gap: gradient clipping W5§4, LSTM-vanishing bridge W5§1.5.2, residual W5§1.5.2, pretraining rationale W7§1.1 (2 Mei)
- `notes/Notes - 2 Mei 2026/scaleddotproductattention.png` → `figures/fig06a_attention_sdp.png` (W7 §1.3)
- `notes/Notes - 2 Mei 2026/temporalalignment.png` → `figures/fig08c_temporal_alignment.png` (W9)
- `notes/Notes - 2 Mei 2026/Note2.txt` → revisi `00_Pendahuluan.md`: prasyarat→`00a_Prasyarat.md`, Target Hasil→3-pilar, hapus "60-70%", Ritme Sesi→`15_Panduan_Instruktur.md`, Pitfalls→Kontrak Belajar (2 Mei)
- `notes/Notes - 04 Mei 2026/satu dataset tiga tugas.png` → `figures/fig01g_tiga_tugas.png` (W1 §2.1.2)
- `notes/Notes - 04 Mei 2026/pasangan output head dan loss.png` → `figures/fig01h_output_head_loss.png` (W1 §2.2.4)
- `notes/Notes - 04 Mei 2026/sigmoid dan softmax.png` → `figures/fig01i_sigmoid_softmax.png` (W1 §2.2.4)
- `notes/Notes - 04 Mei 2026/siklus training pytorch.png` → `figures/fig03c_training_cycle.png` (W3 §1)
- `notes/Notes - 04 Mei 2026/train-val-test dan leakage.png` → `figures/fig06c_train_val_leakage.png` (W6 §0.6)
- `notes/Notes - 04 Mei 2026/Note.txt` → bug fix `lab_w1_tabular_heads.ipynb` (eval binary: `(logits.squeeze() > 0).long()` → `logits.argmax(dim=1)`; band-aid §4+§6 dihapus) + `lab_w1_mlp_numpy.ipynb` (§7 dipindah sebelum §8) (4 Mei)
- (5 Mei 2026) Sumber gambar slide 00a: `website/public/figures/fig00a_tensor_nchw.jpeg` dari Stanford CS231n (`cs231n.github.io/assets/cnn/cnn.jpeg`) untuk visualisasi tensor (C,H,W); `website/public/figures/fig00a_chain_rule.svg` dari d2l-en Apache 2.0 (`raw.githubusercontent.com/d2l-ai/d2l-en/master/img/computegraph.svg`) untuk computation graph chain rule. Hanya dipakai di slide deck Bab 00a, bukan chapter `.md`.

**Perubahan struktural besar:**
- **(27 Apr 2026)** 10-bab format-topik → 11-minggu bootcamp W1-W11 + 3-minggu capstone W12-W14
- **(30 Apr 2026)** W11: 5-Whys → Input→Middle→Output + framing menu + triage; capstone rename→`12_Capstone.md`; 3→4 minggu W12-W15; W15=submission tanpa tatap muka
- **(2 Mei 2026 S1)** 4 gap konten W5+W7; K1-K9 diperbarui website+lampiran; `fig06a_attention_sdp.png`+`fig08c_temporal_alignment.png` ditambah; halaman `/kompetensi/:id` ditambah ke website
- **(2 Mei 2026 S2)** Revisi `00_Pendahuluan.md`: prasyarat→`00a_Prasyarat.md`, 3-pilar, hapus "60-70%", Ritme Sesi→`15_Panduan_Instruktur.md`; website pipeline diperbarui
- **(4 Mei 2026)** 5 gambar baru (fig01g–fig01i di W1, fig03c di W3, fig06c di W6); bug fix 2 lab W1
- File lama → `_archive/`; **W-numbering** di teks bab, nama file saat link

**Konten utama per minggu:**

- **W1** (`01_W1_Tabular_Output_Heads.md`): tabular MLP, output heads+loss matching, observation before conclusion
- **W2** (`02_W2_Images_CNN_Smoke_Test.md`): tensor citra, CNN, smoke test tiga level
- **W3** (`03_W3_Loss_Optimizer_Evaluasi.md`): galeri 5 training → loss/optimizer/evaluasi; representasi fitur 3 strategi
- **W4** (`04_W4_Reproducibility_Experiment_Matrix.md`): matriks eksperimen+YAML/seed/checkpoint; §3.5 SQRC; §2.6 hipotesis tidak terkonfirmasi; Git workflow
- **W5** (`05_W5_Sequences_RNN_LSTM.md`): RNN vs LSTM, gradient flow; **§1.5.2**: bridge LSTM cell→vanishing gradient+residual; **§4**: gradient clipping (norma global, clip_grad_norm_ vs clip_grad_value_)
- **W6** (`06_W6_Representations_Temporal_Leakage.md`): representasi recap + temporal leakage demo (0.92→0.63 §0.6); §2.6.3 negative results; Lab 6c peer review
- **W7** (`07_W7_Text_Transformers_Repo_Adoption.md`): text+Transformers+AI tools+repo adoption (Part 1 ringkas + Part 2 Pendalaman D1-D7); **§1.1**: pretraining rationale; **§1.3 BARU**: QKV, Transformer block, multi-head, positional encoding, freeze vs fine-tune
- **W8** (`08_W8_Foundation_Models.md`): taxonomy modality×family×adaptation, model card literacy §2.3, pohon keputusan adaptasi §2.4
- **W9** (`09_W9_Multimodal_Reasoning.md`): fusion strategies, per-modality ablation, missing modality, peta generatif
- **W10** (`10_W10_Paper_Reading.md`): 3-pass reading+paper-to-code; templates A-E (LSTM/Transformer+Autoencoder)
- **W11** (`11_W11_Research_Framing.md`): Input→Middle→Output (3 pertanyaan); framing menu (4-6 kandidat); literature triage; live demo dataset; workshop 3 sesi; luaran: dekomposisi+triage+framing pendek
- **W12-W15** (`12_Capstone.md`): W12 filter+defense+Eks1 pre-reg, W13 rethink+Eks2 pre-reg, W14 research talks (20 mnt), W15 pengumpulan tanpa kelas
- **Rubrik** (`13_Rubrik_Penilaian.md`): 4-level mastery+K10; K1: 14%, K7: 4%; Breadth Check Policy (Lab 6b=`lab_w7_transformer_mini` wajib breadth; Pendalaman tidak masuk syarat minimum)
- **Lampiran** (`14_Lampiran.md`): glosarium ID↔EN; A.1 backprop 7-langkah; A.11 Indeks First-Use (28 istilah); A.12 Worked Examples; C.6-C.11; §G Self-Checklist
- **Panduan Instruktur** (`15_Panduan_Instruktur.md`): pacing 11+4 + peta Pendalaman opsional/wajib + skenario kelas (Skenario 5: W5 LSTM)

**Breadth Arsitektur NN (5 keluarga: MLP, CNN, RNN/LSTM, Transformer, Autoencoder):**

- W1: MLP forward pass tabular
- W2: CNN + tensor citra + smoke test
- W5 + `lab_w5_lstm_sequence`: RNN/LSTM gradient flow (wajib)
- W7 + `lab_w7_text_classification` + `lab_w7_transformer_mini`: Transformer fine-tune + mini dari nol (breadth opsional)
- `lab_breadth_autoencoder`: Autoencoder + denoising AE + t-SNE (opsional, kapan saja)
- W9 §2.7: peta VAE/GAN/Diffusion/Normalizing Flow (mental map, no impl)
- W10 Template D+E: LSTM vs Transformer + Autoencoder
- `00_Pendahuluan.md`: Kontrak Belajar klausul Keenam - Breadth Check (4 dari 5 keluarga)
- Rubrik K1: breadth 4 level (14%); Lampiran C.8: Template Lab Replikasi Arsitektur

**Lab di `template/notebooks/`:**
- `lab_w1_tabular_heads.ipynb`: 3 tugas (regression/binary/multiclass), mismatch, observation writeup
- `lab_w1_mlp_numpy.ipynb`: MLP 2-layer numpy (forward, backward 7-langkah, finite-diff, SGD), parity PyTorch
- `lab_w5_lstm_sequence.ipynb`: sine+noise regression, RNN vs LSTM gradient flow (log-plot), grad clipping, visualisasi
- `lab_w6_temporal_leakage.ipynb`: causal vs leaky pipeline, leakage inflation, chronological vs random split
- `lab_w7_transformer_mini.ipynb`: `scaled_dot_product_attention` dari nol, `SingleHeadAttention`, `TinyBlock` (pre-norm LN+GELU), parity vs `nn.TransformerEncoderLayer`
- `lab_w9_multimodal_ablation.ipynb`: late fusion, 7-condition ablation, modality dropout
- `lab_breadth_autoencoder.ipynb`: conv AE CIFAR-10, rekonstruksi, t-SNE 32-dim, denoising AE, peta VAE/GAN/Diffusion

**Arsitektur di `template/src/models.py`:**
- `SimpleMLP(input_dim, hidden_sizes, num_classes, dropout, activation)` - W1+tabular
- `SimpleLSTM(input_size, hidden_size, num_layers, num_classes, dropout, readout)` - W5, readout "last"/"all"
- `TransformerMini(vocab_size, d_model, nhead, num_layers, dim_feedforward, max_len, num_classes, dropout)` - W7
- `SimpleAutoencoder(image_channels, bottleneck_dim)` - breadth AE, method `encode`/`decode`/`forward`
- `build_model(cfg)`: `simple_cnn`, `simple_mlp`, `simple_lstm`, `transformer_mini`, `simple_ae`
- `apply_freeze` raises ValueError untuk non-SimpleCNN

**Config di `template/configs/`:** `mlp_mnist.yaml`, `lstm_timeseries.yaml`, `transformer_mini.yaml`, `ae_cifar.yaml`.

**Loader di `template/src/data.py`:**
- `mnist` (flattened untuk MLP)
- `sine_sequence` (sintetis sine+noise untuk RNN/LSTM/Transformer)
- `cifar10_unlabeled` (CIFAR-10 untuk AE; label keluar hanya untuk t-SNE coloring)

**Template repo perubahan:**
- `src/train.py`: bug `warmup_epochs` fix - `SequentialLR` dengan `LinearLR` warmup
- `docs/prereg_template.md`: template pre-registration lengkap
- `notebooks/lab_w2_cnn_baseline.ipynb`: smoke test, forward pass, log parser, confusion matrix, error analysis
- `notebooks/lab_w3_loss_ablation.ipynb`: FocalLoss, 2×2 ablation, bar chart dengan error bars
- `notebooks/lab_w4_experiment_tracking.ipynb`: reproducibility, checkpoint, resume, multi-seed plot
- `notebooks/lab_w6_eda_leakage.ipynb`: 5-layer EDA, MD5 overlap, leakage audit
- `notebooks/lab_w7_llm_assisted.ipynb`: mixup, 4 sanity tests, comparison training
- `notebooks/lab_w12_demo_app.ipynb`: aggregation plot, Streamlit, Gradio annotation
- `notebooks/lab_w6_feature_representation.ipynb`: representasi 3 strategi CIFAR-10
- `notebooks/lab_w7_text_classification.ipynb`: sentimen IndoNLU SmSA
- `notebooks/portofolio_mandiri.ipynb`: log W4-W10+refleksi; template Setup/Temuan/Kejutan/Yang-Akan-Diubah/Koneksi

## Template Repo (`template/`)

Skeleton educational CIFAR-10→PathMNIST. Filosofi: **satu file = satu peran**, config YAML, seed dikunci, checkpoint menyertakan git hash.

### Setup

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -e .
# atau lebih cepat:
uv venv && source .venv/bin/activate && uv pip install -e .
```

Extras: `pip install -e ".[demo]"` (Streamlit/Gradio), `pip install -e ".[medical]"` (PathMNIST), `pip install -e ".[dev]"` (Jupyter, ruff).

### Menjalankan Eksperimen

```bash
# Smoke test (dry-run, <1 menit CPU)
python -m src.train --config configs/baseline.yaml --dry-run

# Baseline penuh
python -m src.train --config configs/baseline.yaml --seed 42

# Varian ablation
python -m src.train --config configs/focal_freeze.yaml --seed 42
```

Output per-run ke `experiments/<config_name>_seed<N>/`: `config.yaml`, `train.log`, `ckpt_best.pt`, `ckpt_last.pt`, `summary.json`, `tb/`.

### Linting

```bash
ruff check src/
ruff format src/
```

## Konvensi Penulisan Bab

Urutan tetap: Peta Bab → Motivasi → Konsep Inti → Worked Example → Pitfalls & Miskonsepsi → Lab Hands-on → Refleksi (3 pertanyaan) → Bacaan Lanjutan. Jangan ubah urutan.

Bahasa Indonesia. Istilah teknis ML/DL tetap Inggris (loss, checkpoint, seed, freeze, ablation). Glosarium di `14_Lampiran.md`.

Sikap (Curiosity, Rigor, Skepticism, Ownership) ditanamkan via cerita pembuka, pitfall, refleksi - bukan bab khusus.

## Gaya Penulisan (Style Guide)

**Tanda baca:**

- **JANGAN pakai em dash (`—`, U+2014).** Ganti dengan hyphen ` - `, koma, titik dua, atau kurung.
- En dash (`–`) hanya untuk rentang numerik (`2–3`, `13–14`).
- Tanda kutip: `"..."` ASCII lurus.
- Interupsi/apposisi: `, ... ,` atau `( ... )` atau `- ... -`.

**Bahasa:**

- Ikuti PUEBI. Istilah asing belum diserap: *italicize* (*hidden states*, *baseline*, *fine-tune*).
- Prefix `di-` pada kata asing: `di-fine-tune`, `di-pretrain`, `di-freeze`.
- "apapun", "siapapun" tulis menyatu.

**Diksi Natural:**

Prosa ditulis langsung dalam Indonesia, bukan terjemahan dari English academic prose. Audit: "apakah penutur asli menulis kalimat ini?"

Prinsip:
1. Utamakan maksud, bukan padanan kata. Struktur Inggris → restrukturisasi.
2. Jangan pakai kiasan atau metafora untuk hal teknis. Sebut nama atau operasi teknisnya secara langsung. Contoh: layer bukan "meja kerja", model bukan "pabrik", data bukan "bahan baku", gradient bukan "sinyal error yang mengalir", fungsi aktivasi bukan "gerbang". Kalau ragu: tanya "apakah istilah ini nama teknis yang dipakai di paper/dokumentasi?" - kalau tidak, ganti dengan nama teknisnya.
3. Jangan personifikasi abstrak. Modul boleh "memuat"/"menjelaskan", bukan "menyepakati".
4. Hindari `Anda akan + V` sebagai pembuka section deskriptif.
5. Pertahankan istilah teknis Inggris. Frasa umum non-teknis → Indonesia.
6. Pola baru ditemukan → update tabel ini.

| Kaku / calque (hindari) | Natural (pakai) | Catatan |
|---|---|---|
| `secara praktis` | `dalam praktiknya` | |
| `bekerja ampuh / bekerja kuat` | `sangat efektif` / `sangat ampuh` | |
| `ada untuk` | `dirancang untuk` | |
| `adil` untuk perbandingan eksperimen | `setara`, `seimbang` | Eksperimen tidak punya rasa keadilan |
| `baseline yang adil` | `perbandingan yang setara` | Varian khusus `adil` untuk eksperimen |
| `menunjuk ke` | `mengacu pada` | Kecuali spasial/matematis literal |
| `Ketika Anda` (awal kalimat) | `Saat Anda` | "Ketika" boleh jika butuh formalitas tinggi |
| `yang asing` | `yang belum dikenal` | |
| `Aturan jempol` | `Aturan praktisnya` | |
| `kerangka mental` | `kerangka berpikir` | |
| `menemui` | `menjumpai` | |
| `mengintimidasi` | `membuat gentar` | |
| `berada X% menuju Y` | `X% siap untuk Y` / `mencapai X% kesiapan` | |
| `kerja independen` | `kerja mandiri` / `secara mandiri` | |
| `topik X nyata` | `topik X` / `topik X sebenarnya` | |
| `diharapkan datang dari` | `berasal dari` / `terbentuk dari` | |
| `Anda akan + V` sebagai pembuka section | bentuk impersonal/present | Valid untuk future asli |
| `dengan X` (possessive) | `saat memakai X` / `pada X` | |
| `menemukan` untuk info abstrak | `melihat` / `mendapatkan` / restrukturisasi | |
| `bekerja baik` | `efektif` / `berfungsi dengan baik` | |
| `menemukan diri sendiri` | hapus / restrukturisasi | |
| `mini-glosarium` | `glosarium singkat` | |
| `bahasa dan bekal minimum` | `kosakata dasar` / `prasyarat modul` | |
| `Apa yang Anda akan [V]` | `Apa yang akan Anda [V]` | Urutan baku ID |
| `dengan asumsi minimum` | `dengan prasyarat seminimal mungkin` | |
| `ubah loss jadi focal`, `freeze conv1` sbg instruksi naratif | `uji focal loss dan freeze blok awal` | Detail layer di protokol |
| `kabur` untuk konsep abstrak | `belum jelas`, `belum dikuasai` | `kabur` hanya untuk foto/penglihatan, bukan pemahaman |
| `langkah-per-langkah` | `langkah demi langkah` | Hyphen calque dari Inggris |
| `mengalami` untuk benda mati | `berubah`, `ditransformasi`, `mengandung` | Personifikasi abstrak: tensor tidak "mengalami transformasi" |
| `mengurus` untuk teknis | `menangani` | "mengurus" terlalu administratif |
| `nyaman` untuk kompetensi | `paham`, `lancar`, `terbiasa`, `dikuasai` | Calque "comfortable with" |
| `hafal` untuk pemahaman | `paham`, `lancar` | hafal = rote/memorized, bukan mengerti |
| `intuitif` untuk penjelasan | `mudah dipahami` | Calque "intuitive explanation", bukan insting bawaan |
| `intuisi` (= abstrak concept) | `pemahaman` / `gambaran` / `cara kerja` / `prinsip` | Pengecualian: "validasi intuisi" (dugaan/tebakan) |
| `secara umum` pada data tunggal | `cenderung` / `pada umumnya` / hapus | |
| `X bukan berarti Y` kalimat mandiri | gabung: `..., tetapi bukan berarti Y` | |
| `urutan tangga` / `tangga linier` | `urutan bertahap` / `urutan linier` | |
| `modul ini ada` | `modul ini disusun` / `tujuan modul ini` | |
| `by design`, `density terlalu cepat` | `memang disengaja`, `terlalu padat` | |
| `campur` untuk data/komponen | `tercampur`, `dicampur` | "tidak campur" ambigu, perlu bentuk pasif |
| `Bacanya setelah...` | `Baca setelah...` | |
| `menurunkan backprop` | `menerapkan backprop` / `menjabarkan backprop` | |
| `Anda dan modul menyepakati` | `Anda mengikuti kesepakatan` / `kontrak belajar` | |
| `kompetensi tidak akan bertahan lama` | `kompetensi cepat tumpul kalau tidak dibiasakan` | |
| `X muncul berulang` | `X ditanamkan` / `X dibahas berulang` | |
| `dengan bacanya` | `dengan membacanya` / restrukturisasi | |
| `Ia adalah versi Anda sebelum hasil` | `Dokumen ini merekam rencana sebelum hasil` | |
| `sistem yang berputar sendiri` | `alur kerja yang mulai mandiri` | |
| `kerja nyata dimulai` | `pelaksanaan dimulai` / `fase kerja dimulai` | |
| `Stack Overflow` sebagai solusi debugging | `internet`, `LLM`, `sumber lain` | Nama platform usang; ganti ke metode generik |
| `ini mengalahkan tujuan` | `ini merusak tujuan` / `bertentangan dengan tujuan` | |
| `bukti mengalahkan kesan` | `bukti lebih penting daripada kesan` | |
| `tanggal lebih tua dari commit` | `tanggal lebih awal dari commit` | |
| `prasyarat dijaga serendah mungkin` | `prasyarat dibuat seringan mungkin` | |
| `di atas X` (abstrak) | `berbasis X` / `bertumpu pada X` / `melanjutkan dari X` | |
| `Resource eksternal` | `sumber belajar` / `sumber rujukan` | |
| `di-cover` | `tercakup` / `dibahas` | |
| `optional` | `opsional` | |
| `kerjakan secara independen` | `kerjakan secara mandiri` | |
| `train MLP` | `latih MLP` | |
| `shared dataset` | `dataset bersama` | |
| `curve interpretation` | `interpretasi kurva` | |
| `capstone project` | `proyek capstone` | |
| `portfolio` | `portofolio` | |
| `panduan tangan` | `bimbingan`, `arahan` | Calque "hand guide" / "hand-holding" |
| `trajektori belajar` | `perjalanan belajar` | |
| `Big Map row` | `Baris Big Map` | |
| `shape transformer` | `pengubah bentuk tensor` | |
| `loss-head mismatch` | `ketidakcocokan loss dan head` | |
| `task formulation` | `perumusan tugas` / `tiga tugas` | |
| `run yang sehat` / `galeri runs` | `training yang sehat` / `galeri training` | |
| `three-level smoke test ritual` | `smoke test tiga level` | |
| `experiment matrix` | `matriks eksperimen` | |
| `seed locking` | `penguncian seed` | |
| `peta navigasi cepat` untuk diagnosis | `peta diagnosis cepat` | |
| `data inspection` | `pemeriksaan data` | |
| `deliverable(s)` | `luaran` | |
| `distraksi domain` | `domain baru`, `kompleksitas domain` | Calque "domain distraction" |
| `dobel` sebagai kata kerja | `dua kali` | "jangan dobel" informal, "jangan dua kali" baku |
| `skope minimal` | `cakupan minimal` | |
| `modality` dalam prosa umum | `modalitas` | |
| `workflow discipline` | `disiplin alur kerja` | |
| `ritual` untuk prosedur | `formalitas` / `prosedur` | |
| `sum to 1` | `jumlahnya 1` | |
| `di-cover` / `sudah di-cover` | `dibahas` / `tercakup` | |
| `representasi yang informatif` / `yang kaya` | hapus adjective / restrukturisasi | Calque "rich/informative representations" |
| `kritis` sebagai intensifier generik | `penting`, `menentukan`, `vital` | Pilih spesifik sesuai konteks |
| `membaca secara kritis` | `membaca dengan cermat` / `menganalisis` | Kecuali konteks skeptisisme |
| `pertanyaan kritis` | `pertanyaan teknis` / `pertanyaan evaluasi` | |
| `analisis kritis` / `bacaan kritis` | `analisis mendalam` | `Analisis kritis` valid untuk skeptisisme/peer-review |
| `poin kritis` / `hal kritis` | `poin penting` / `hal penting` | Kecuali `titik kritis` matematis |
| `kebiasaan paling kritis` | `kebiasaan paling penting` | |
| `mengejutkan` sebagai intensifier generik | `sangat`, `di luar dugaan`, `tak terduga`, `mencolok` / restrukturisasi | Untuk refleksi: `hal paling menarik` / `hal tak terduga` |
| `bahan baku` untuk data/input | nama teknis langsung: `data`, `dataset`, `input` | Kiasan fisik untuk konsep abstrak |
| `meja kerja` untuk layer/modul | nama teknis langsung: `layer`, `nn.Linear`, `nn.Module` | Kiasan fisik untuk konsep abstrak |
| `pabrik` untuk model/arsitektur | nama teknis langsung: `model`, `MLP`, `nn.Sequential` | Kiasan fisik untuk konsep abstrak |
| `gerbang` untuk fungsi aktivasi | nama teknis langsung: `ReLU`, `fungsi aktivasi` | Kiasan fisik untuk konsep abstrak |
| `sinyal error mengalir / merambat` | `gradient dihitung` / `backward pass` / nama operasi langsung | Kiasan fisik untuk operasi matematika |
| `data mengalir ke depan / ke kiri / ke kanan` | `forward pass menghitung output dari input` / nama operasi langsung | Arah spasial untuk operasi non-spasial |
| `misi X` untuk eksperimen atau latihan | `eksperimen X` / `percobaan X` / `latihan X` | Dramatisasi tidak perlu |
| `mengekspos mesin` / `X sakti` / `X ajaib` | nama langsung sesuai isi section | Kiasan dramatis tidak deskriptif |
| `berkenalan dengan X` sebagai judul section | `Memuat X` / `Memeriksa X` / tindakan langsung | Kiasan sosial untuk operasi teknis |
| `merangkai X` untuk "membuat/mendefinisikan X" | `Membuat X` / `Mendefinisikan X` | Kecuali benar-benar ada perakitan komponen |

Pola wajib dihindari: kiasan fisik/sosial untuk konsep teknis ("bahan baku", "meja kerja", "pabrik", "gerbang"), arah spasial untuk operasi matematika ("mengalir ke depan/kiri/kanan"), dramatisasi tidak perlu ("misi sabotase", "sakti", "ajaib"), spasial-metaforis ("berada X menuju Y", "di jalur untuk Z"), post-nominal calque ("topik lab nyata"), adjective calque pada abstrak ("representasi yang kaya/informatif"), personifikasi abstrak, frasa Inggris untuk hal umum ("by design", "shared dataset", "shape transformer", "task formulation"), label metadata Inggris, `Anda akan + V` sebagai default opener, overuse `kritis`, overuse `mengejutkan`.

Pembuka section inklusif: pakai "kita" ("Sebelum **kita** membahas...").

Hindari konstruksi bertingkat English. Pecah jadi 2-3 kalimat dengan penanda kohesi ("justru", "memang", "sebaliknya", "nah"). Reduplikasi jamak lebih natural ("kompetensi-kompetensi").

**Struktur Kalimat dalam Penjelasan Materi (SPOK wajib):**

Setiap kalimat dalam prosa bab harus lolos empat cek:

1. Ada **subjek eksplisit** - bukan tersirat atau hilang.
2. Ada **predikat** - "adalah", "berfungsi", "bekerja dengan", "menentukan", "terdiri dari", dst.
3. Bisa **dibaca lantang** dan terdengar natural dalam bahasa Indonesia.
4. **Tidak bisa disalahpahami** karena subjeknya ambigu.

**Pola terlarang dan penggantinya:**

| Pola terlarang | Contoh buruk | Contoh benar |
|---|---|---|
| Fragment tanpa predikat | `"Lapisan linear berturut-turut dengan non-linearitas di antaranya."` | `"FFN adalah rangkaian lapisan linear yang diselingi non-linearitas."` |
| `"Label: fragmen"` untuk deskripsi | `"Asumsi: tidak ada struktur khusus..."` | `"Arsitektur ini tidak mengasumsikan struktur khusus..."` |
| `"Kekuatan:"` / `"Kelemahan:"` sebagai label | `"Kekuatan: sangat efisien parameter untuk gambar."` | `"Arsitektur ini sangat efisien secara parameter untuk gambar dan data grid."` |
| `"**Term.** Definisi."` | `"**Augmentation.** Transformasi acak yang diterapkan..."` | `"**Augmentation** adalah kumpulan transformasi acak yang diterapkan..."` |
| `"**X** - definisi singkat"` di bullet | `"**Kernel size** - ukuran filter. 3×3 paling umum."` | `"**Kernel size** adalah ukuran satu filter. Filter 3×3 paling umum dipakai."` |
| Template identik diulang per item | Empat arsitektur semua pakai Asumsi:/Kekuatan:/Kelemahan: | Setiap item ditulis sebagai paragraf unik dengan struktur kalimat berbeda |

**Variasi antar item:**

Saat mendeskripsikan beberapa item sejenis (arsitektur, teknik, metrik), setiap item harus punya paragraf dengan struktur kalimat yang berbeda. Dilarang mengulang template yang persis sama ("Asumsi → Kekuatan → Kelemahan") untuk setiap item.

**Transisi antar sub-konsep:**

Saat satu section membahas beberapa sub-konsep berbeda (misal: inisialisasi bobot → normalisasi → aktivasi), wajib ada kalimat jembatan di antaranya. Contoh: *"Di samping inisialisasi, cara model menormalkan aktivasi antar layer juga menentukan stabilitas training."*

**Format Markdown:**

- Inline code dalam bold: `**\`Conv2d(...)`**, bukan ``` **Conv2d(...)**` ```.
- Checklist: `- [ ]` (GitHub task list).
- Navigasi modul: `<details><summary>📂 Navigasi Modul (klik untuk buka)</summary>...</details>` (konsisten 17 file).
- Tabel: header-separator wajib (`| --- |`).
- File `.md` diakhiri satu newline.

**Tipografi & Ritme Visual:**

1. Inline enumerasi prosedural → list bernomor. Pengecualian: 2 item pendek non-prosedural.
2. Struktur paralel ≥3 item identik → `####` heading atau list bernomor dengan **bold lead-in**.
3. Catatan/peringatan → admonition GFM (`> [!NOTE]` / `> [!TIP]` / `> [!WARNING]` / `> [!IMPORTANT]` / `> [!CAUTION]`).
4. Lead paragraph (`h2+p`, `h3+p`, `h4+p`) dapat treatment editorial otomatis - harus bisa berdiri sendiri.

**Workflow konten baru:**

- Integrasi catatan dari `notes/Notes - <tanggal>/`: ganti em dash di file asli SEBELUM salin ke bab. File asli jangan dihapus.
- Setelah tambah section: update (1) TOC bab, (2) `13_Rubrik_Penilaian.md`, (3) catatan integrasi di CLAUDE.md.

## Website (`website/`)

SPA React + Vite, 17 bab sebagai hash-router. Deploy via GitHub Pages (branch `gh-pages`).

### Commands

```bash
cd website
npm run dev      # sync konten lalu jalankan dev server (port 5173)
npm run build    # sync konten lalu build ke dist/
npm run sync     # hanya sync .md → src/content/ (tanpa build)
npm run lint     # TypeScript type check
```

### Pipeline Konten

`npm run sync` jalankan `scripts/sync-content.mjs`:
1. Salin 17 `.md` dari `chapters/` → `website/src/content/chapters/`
2. Salin 6 config YAML dari `template/configs/` → `website/src/content/configs/`
3. Parse glosarium `14_Lampiran.md` → `website/src/content/glossary.json`
4. Salin figures dari `figures/` → `website/public/figures/`

File di `src/content/` = hasil generate - jangan edit manual. Edit di `chapters/*.md` lalu sync.

Tiap `.md` baru/rename, update:
- `scripts/sync-content.mjs` array `CHAPTERS`
- `src/lib/content.ts` import `?raw` + object `RAW`

### Arsitektur Website

**Content:** Markdown di-import via Vite `?raw` - semua masuk bundle JS, no fetch runtime. `src/lib/content.ts`: strip nav `<details>`, rewrite link antar-bab ke hash route (`01_W1.md` → `#/modul/01`), rewrite path gambar ke `/figures/`.

**Routing:** HashRouter (`/#/modul/01`, `/#/glosarium`) - diperlukan untuk GitHub Pages.

**Rendering:** `src/components/MarkdownRenderer.tsx` pakai `react-markdown` + remark-gfm, rehype-slug, rehype-autolink-headings, Shiki. Admonition GFM di-handle plugin custom di renderer yang sama.

**State:** Zustand untuk progress per bab + preferensi UI.

**Styling:** Tailwind + `.prose-modul` di `MarkdownRenderer.tsx` (lead paragraph lebih besar, admonition berikon).

## Slide Deck Instruktur (`website/src/routes/SlideDeck.tsx`)

Slide ringkasan per bab via **Reveal.js**. Trailer (bukan pengganti modul) - max 8-10 slide.

### Design System

**Tipografi:**
- Body/UI: `Outfit` (Google Fonts, `wght@300;400;500;600;700`) - hanya di slide, bukan main website
- Heading: `Fraunces` (serif, editorial) - konsisten dengan brand modul
- Code/mono: `JetBrains Mono`
- Main website tetap `Inter` - jangan ubah

**Warna:**
- Accent light mode: `#059669` (emerald = warna `ownership` di tailwind config)
- Accent dark mode: `#F59E0B` (amber = warna `curiosity`)
- Latar: `#FAF8F3` light / `#0F1115` dark
- Jangan pakai `#4338CA` (indigo/rigor) sebagai accent slide - terlalu "AI purple"

**Layout rules:**
- Title slide: left-aligned (`text-align: left`), bukan centered. Ada accent rule `::before` (lebar 2.5rem, tinggi 3px, warna emerald) di atas eyebrow text.
- Grid heading: center-aligned (pengecualian). Grid items: 3 kolom, spotlight hover.
- CTA layout: center-aligned.

**Animasi:**
- Stagger in: `@keyframes slide-stagger-in` (opacity 0→1, translateY 14px→0, easing `cubic-bezier(0.16,1,0.3,1)`)
- Trigger: `.reveal .slides > section.present .slide-stagger`
- Delay: `calc(var(--frag-index, 0) * 85ms + 60ms)` - cascade per item, delay awal 60ms
- `--frag-index` diset via `staggerStyle()` di `SlideDeck.tsx` → tidak perlu ubah TSX

**Spotlight grid cards:**
- JS di `SlideDeck.tsx` sudah track `--mouse-x`/`--mouse-y` via `rAF` pada `.slide-grid-item`
- CSS `::before` pakai `radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), rgba(5,150,105,0.1), transparent 70%)`
- `opacity: 0` default → `opacity: 1` on `:hover`
- `::after` inner refraction: `box-shadow: inset 0 1px 0 rgba(255,255,255,0.1)`

**CTA button:**
- `border-radius: 100px` (pill)
- 3-layer shadow: ambient + elevation + inner refraction
- Arrow (`.slide-cta-arrow`) slide `translateX(3px)` on hover
- Warna emerald light / amber dark

**Progress bar:** `linear-gradient(90deg, #059669, #10B981)` light / `#D97706→#F59E0B` dark

### Panduan Menambah Slide Baru

**3 file wajib:**

1. **`website/src/lib/slides.ts`** - data slide:

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

2. **Register di registry:**

```typescript
export const SLIDE_DECKS: Record<string, SlideDeckData> = {
  "00": { chapterId: "00", slides: slides00 },
  "00a": { chapterId: "00a", slides: slides00a },
  "01": { chapterId: "01", slides: slides01 },
  "02": { chapterId: "02", slides: slides02 },  // tambahkan di sini
};
```

3. **`website/src/styles/reveal-custom.css`** - styling khusus (jarang diperlukan).

**Konvensi:**
- Max 10 slide (ideal 6-8).
- Slide 1: `layout: "title"` + footnote chapter.
- Slide terakhir: `layout: "cta"` + `ctaTarget`.
- **Bold lead-in** di bullets untuk scanning cepat.
- `layout: "grid"` untuk 3-6 item paralel.
- `layout: "split"` untuk perbandingan 2 kolom.
- `layout: "code"` untuk snippet max 8-10 baris.
- `footnote` untuk konteks, bukan konten utama.

### Gaya Penulisan Slide Deck

Slide deck adalah **trailer**, bukan pengganti modul. Setiap slide harus bisa dibaca sebagai prosa utuh dengan SPOK lengkap. Pembaca slide tidak boleh merasa seperti membaca fragment atau daftar tanpa konteks.

**Lead sentence wajib (setiap slide non-title):**

Setiap slide dengan `layout` selain `"title"` wajib memiliki `body` sebagai lead sentence yang memberikan konteks sebelum bullet points, grid items, atau kode muncul.

Contoh:
- **Salah (fragment):** bullets langsung tanpa pengantar.
- **Benar:** `"Ada empat alasan praktis mengapa kita memulai dari tabular: pertama..."` → baru bullets.

**Bullet points = kalimat utuh:**

Setiap bullet harus memiliki subjek dan predikat yang jelas, bukan definisi kamus atau label.

- **Salah:** `"**(D,)** - vektor satu dimensi"` (definisi kamus, tidak ada kata kerja)
- **Benar:** `"Bentuk (D,) adalah vektor satu dimensi yang berisi satu baris fitur."` (ada subjek "Bentuk (D,)", predikat "adalah", dan keterangan)

**Grid items = narasi, bukan label:**

Setiap `gridItem.body` harus kalimat narasi yang menjelaskan apa yang dilakukan kompetensi/sikap/thread tersebut.

- **Salah:** `"Forward pass 4 dari 5 keluarga: MLP, CNN, RNN/LSTM, Transformer, Autoencoder."` (tidak ada subjek/predikat)
- **Benar:** `"Kamu menguasai forward pass 4 dari 5 keluarga arsitektur: MLP, CNN, RNN/LSTM, Transformer, dan Autoencoder. Fokusnya adalah breadth, bukan depth."`

**Caption gambar/video = kalimat utuh:**

`caption` pada `layout: "image"` atau `layout: "video"` harus berupa kalimat lengkap, bukan frasa deskriptif.

- **Salah:** `"Input → Middle → Output. Kerangka berpikir ini dipakai dari W1 sampai capstone."` (fragment di awal)
- **Benar:** `"Gambar ini menunjukkan kerangka berpikir Input → Middle → Output yang dipakai dari W1 sampai capstone."`

**Contoh Before / After lengkap:**

```typescript
// SALAH - fragment, tanpa lead sentence, bullets tanpa subjek
{
  layout: "bullets",
  title: "Shape Tensor",
  bullets: [
    "**(D,)** - vektor satu dimensi",
    "**(B, D)** - batch data tabular",
  ],
}

// BENAR - lead sentence + bullets kalimat utuh
{
  layout: "bullets",
  title: "Shape Tensor: 4 Pola Paling Sering Muncul",
  body: "Berikut adalah empat pola shape tensor yang paling sering muncul:",
  bullets: [
    "**(D,)** adalah vektor satu dimensi yang berisi satu baris fitur.",
    "**(B, D)** adalah batch data tabular yang terdiri dari B sampel dengan D fitur.",
  ],
}
```

**Build & test:**

```bash
cd ModulePembelajaran/website
npm run dev      # test slide di browser
npm run build    # pastikan tidak error
```

Slide otomatis muncul sebagai chip "▶ Slide Ringkasan" karena `ModuleReader.tsx` baca `hasSlideDeck(id)`.

## Konvensi Eksperimen

- Nama folder: `<config_name>_<modifier>_seed<N>/` - perubahan di luar config tambah suffix deskriptif.
- Reproduksibilitas: folder eksperimen direproduksi dari `config.yaml` + `commit_hash`.
- Satu variabel per run ablation (kecuali multi-factor eksplisit).

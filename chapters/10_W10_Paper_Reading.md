<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 00a | [Prasyarat Modul](00a_Prasyarat.md) | – |
| 01 | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) | 1 |
| 02 | [W2 - Images, CNN & Smoke Test](02_W2_Images_CNN_Smoke_Test.md) | 2 |
| 03 | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) | 3 |
| 04 | [W4 - Reproducibility & Matriks Eksperimen](04_W4_Reproducibility_Experiment_Matrix.md) | 4 |
| 05 | [W5 - Sequences: RNN & LSTM](05_W5_Sequences_RNN_LSTM.md) | 5 |
| 06 | [W6 - Representations & Temporal Leakage](06_W6_Representations_Temporal_Leakage.md) | 6 |
| 07 | [W7 - Text, Transformers & Repo Adoption](07_W7_Text_Transformers_Repo_Adoption.md) | 7 |
| 08 | [W8 - Foundation Models](08_W8_Foundation_Models.md) | 8 |
| 09 | [W9 - Multimodal Reasoning](09_W9_Multimodal_Reasoning.md) | 9 |
| ▶ 10 | W10 - Paper Reading & Implementation | 10 |
| 11 | [W11 - Research Framing](11_W11_Research_Framing.md) | 11 |
| 12 | [Capstone - Proyek Riset](12_Capstone.md) | 12-15 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | – |
| 14 | [Lampiran](14_Lampiran.md) | – |
| 15 | [Panduan Instruktur](15_Panduan_Instruktur.md) | – |

</details>

---

# 10 · W10 - Paper Reading & Implementasi Paper

Kali ini kita akan membahas:

1. **Kurasi Paper** - menyaring ratusan paper arXiv jadi satu sampai dua yang layak dibaca penuh.
2. **Membaca Tiga Putaran** - membaca paper dengan tiga lapis kedalaman, dari skim sampai kritik.
3. **Paper-to-Code** - mengekstrak satu kontribusi inti dan mengimplementasikannya jadi kode minimal yang bisa diuji.
4. **Ablation Kecil** - menjalankan satu perubahan terkontrol untuk menguji klaim paper.
5. **Peta Model Generatif** - kosakata untuk membaca paper VAE, GAN, Diffusion, dan Normalizing Flow.

Di pertemuan sebelumnya (W9) kita sudah belajar menggabungkan beberapa modalitas dengan strategi fusion, menjalankan ablation per modalitas, dan menangani modalitas hilang. Output W9 yang dipakai minggu ini adalah kebiasaan menguji satu komponen sambil mengunci sisanya. Minggu ini kebiasaan itu diarahkan ke paper orang lain: membaca klaimnya, mengisolasi satu komponen inti, lalu mengujinya dengan ablation. Disiplin eksperimen terkontrol dan trace result dari [W4 §2-§3](04_W4_Reproducibility_Experiment_Matrix.md) dipakai saat menjalankan ablation paper.

---

## 1. Kurasi Paper

arXiv menerbitkan ratusan paper ML per hari, sehingga membaca semuanya mustahil. Tujuan kurasi adalah menyaring jadi 5-10 paper per minggu yang layak 30 menit waktu Anda, lalu menyaringnya sekali lagi jadi satu sampai dua yang dibaca penuh.

![Funnel seleksi paper dari sekitar 500 judul di arXiv menyusut jadi 1-2 paper yang dibaca penuh, lewat empat filter berurutan dari kasar ke halus](../figures/fig09a_paper_funnel.svg)

Gambar di atas menunjukkan empat filter berurutan, dari yang paling murah waktunya ke yang paling mahal:

1. **Filter kategori dan kata kunci.** Berlangganan kategori arXiv yang spesifik: `cs.LG` (Machine Learning), `cs.CV` (Computer Vision), `cs.CL` (NLP/LLM), dan `eess.IV` untuk medical imaging. Tambahkan kata kunci dari minat Anda. Google Scholar Alerts dan Papers With Code RSS mempercepat langkah ini.
2. **Filter judul.** Sekitar 80% paper bisa ditolak dari judulnya saja karena bukan bidang Anda atau bukan tipe pertanyaan yang Anda cari. Proses 50 judul dalam 5 menit, sisanya kira-kira 10.
3. **Filter abstrak.** Baca 10 abstrak dan tanya apakah klaimnya menarik dan metodenya memberi sesuatu untuk dipelajari. Pilih 5 teratas.
4. **Filter baca cepat.** Baca introduction, figure pertama, dan tabel hasil dari 5 paper. Sekarang Anda tahu mana yang layak dibaca mendalam dan mana yang cukup diingat keberadaannya.

Rasio akhirnya sekitar 1 banding 250. Awalnya terasa membuang, tetapi penyaringan inilah yang membuat waktu baca terpakai pada paper yang tepat.

Saat menyimpan paper arXiv, catat status publikasinya. arXiv adalah alat akses, bukan sumber otoritas: banyak paper penting muncul di sini sebelum atau bersamaan dengan versi konferensi, tetapi tidak ada peer-review di titik unggah, sehingga paper lemah dan klaim yang terlalu besar juga masuk. Catat keraguan Anda secara eksplisit supaya otoritas paper tidak dilebih-lebihkan:

```markdown
Status publikasi: arXiv preprint v2; belum menemukan versi peer-reviewed.
Catatan skeptis: klaim utama bergantung pada satu dataset; belum ada ablation untuk komponen X.
```

Simpan ID paper seperti `2312.01234`, bukan judulnya, karena ID lebih stabil untuk dirujuk ulang. Saat mengutip, sebut versi yang Anda baca (`v1`, `v2`) karena dua versi bisa berbeda substansial. Tabel lengkap kanal publikasi (preprint, workshop, conference, journal) beserta kekuatan dan keterbatasan masing-masing ada di [Lampiran D.9](14_Lampiran.md#d9-peta-kanal-publikasi-ml).

---

## 2. Membaca Tiga Putaran

Paper akademik tidak dirancang untuk dibaca linear dari depan ke belakang. Metode tiga putaran (Keshav 2007) membagi pembacaan jadi tiga lapis kedalaman, dan di akhir tiap putaran Anda memutuskan lanjut atau berhenti.

```mermaid
flowchart TB
    A[Putaran 1 - Skim\n10 menit\nJudul + abstrak + figure 1\n+ tabel utama + conclusion] --> B{Lanjut?}
    B -- Ya --> C[Putaran 2 - Close-read\n30-45 menit\nMethod + setup + ablation\nCatat 3-5 pertanyaan teknis]
    B -- Tidak --> D[Pilih paper lain]
    C --> E{Penting untuk implementasi?}
    E -- Ya --> F[Putaran 3 - Mendalam\n30-60 menit\nApa yang hilang? Klaim berlebihan?\nDraft satu paragraf critique]
    E -- Tidak --> G[Simpan catatan TL;DR\n+ alasan tidak diimplementasikan]
```

Diagram di atas memetakan tiga putaran dengan tujuan dan target waktu masing-masing:

- **Putaran 1 - Peta (10 menit).** Baca judul, abstrak, paragraf pertama introduction, headings, figure 1, tabel hasil utama, dan conclusion. Targetnya menjawab tiga hal: apa yang paper klaim mereka lakukan, apa yang mereka ukur, dan apakah hasilnya meyakinkan dari tabel saja. Kalau setelah 10 menit Anda tidak bisa menjawab ketiganya, paper itu mungkin ditulis kurang baik atau bidangnya terlalu jauh, dan Anda boleh berhenti.
- **Putaran 2 - Detail (30-45 menit).** Baca method dan experimental setup secara aktif: catat pertanyaan di margin, fokus pada cara mereka melakukannya dan setup eksperimennya (dataset, baseline, metrik, ablation). Lewati related work kecuali bidangnya baru bagi Anda. Hasil putaran ini adalah 3-5 pertanyaan teknis yang langsung mengarahkan implementasi: detail yang tidak jelas, baseline yang kurang, atau asumsi yang tidak diuji.
- **Putaran 3 - Mendalam (30-60 menit, opsional).** Hanya untuk paper yang penting. Cari apa yang paper tidak bahas, apakah klaimnya melampaui data, dan apa yang Anda minta untuk rebuttal andai mereview paper ini. Hasilnya satu paragraf critique yang bisa dikirim ke rekan satu grup riset.

Catatan paper yang tidak pernah dibuka lagi tidak ada gunanya. Empat bagian berikut cukup untuk setiap paper yang Anda baca sampai putaran dua, dan bentuknya bisa disalin langsung:

```markdown
# <judul ringkas> (authors, venue, year)

## TL;DR (1-2 kalimat)
Apa yang paper ini klaim, dalam kalimat Anda sendiri.

## Metode (3-5 kalimat)
Bagaimana mereka melakukannya. Sisipkan sketsa atau rumus penting.

## Bukti (2-3 kalimat)
Dataset + metrik + hasil utama. Sebut angka konkret.

## Pertanyaan / Kritik Teknis (3-5 poin)
Detail implementasi yang tidak jelas, baseline yang kurang, ablation yang hilang, atau klaim yang perlu dicek ulang.

## Rencana Implementasi Minimal
Komponen mana yang akan diimplementasikan, input/output tensor-nya, dan ablation kecil yang akan dijalankan.
```

Simpan di `docs/papers/<short_title>.md`. Setelah 20 paper, Anda punya literatur pribadi yang bisa dicari dengan `grep` atau `rg`.

---

## 3. Paper-to-Code

Menerjemahkan paper jadi kode berarti mengisolasi satu kontribusi inti lalu mengimplementasikannya, tidak menyalin seluruh arsitektur. Enam langkah membawa Anda dari abstrak ke kode minimal yang bisa dijalankan:

1. **Identifikasi kontribusi inti.** Tentukan satu inovasi terpenting paper, tulis dalam satu kalimat. Targetnya satu komponen kunci, bukan seluruh arsitektur.
2. **Cari input/output shape.** Tentukan tensor yang masuk ke metode baru dan yang keluar. Kalau tidak eksplisit di paper, cek pseudocode atau codebase resmi.
3. **Pisahkan inti dari detail rekayasa.** Banyak paper punya banyak trik tambahan. Tentukan mana yang inti untuk kontribusi utama dan mana yang optimisasi sekunder.
4. **Buat versi minimal yang bisa dijalankan.** Implementasikan hanya kontribusi inti pada dataset kecil, lalu smoke test dulu.
5. **Verifikasi kecocokan angka.** Reproduksi satu angka paper pada konfigurasi yang sama. Kalau paper punya kode resmi, bandingkan.
6. **Jalankan satu ablation.** Hapus atau modifikasi satu komponen kontribusi inti, lalu lihat apakah performa turun seperti yang diklaim paper.

Kalau Anda belum bisa menjelaskan satu kontribusi inti dalam satu kalimat, jangan mulai menulis kode. Smoke test tiga level dari [W2 §2.3](02_W2_Images_CNN_Smoke_Test.md) tetap dipakai sebelum run penuh, dan detail penting sering tersembunyi di appendix atau code repository, jadi cek keduanya.

Sebagai patokan apakah pipeline Anda terlalu lambat, berikut estimasi waktu training beberapa arsitektur yang dipakai di modul ini:

| Arsitektur | Dataset | GPU (RTX 3060) | CPU (laptop) |
|---|---|---|---|
| ResNet-18 / SimpleCNN | CIFAR-10, 50 epoch | ~20-30 menit | ~3-4 jam |
| MLP 3-layer | MNIST / Tabular | ~5 menit | ~15-30 menit |
| SimpleLSTM, 100 epoch | sine sequence (10k) | ~5-10 menit | ~20-40 menit |
| BERT-tiny fine-tune | SST-2, 3 epoch | ~15-25 menit | tidak praktis |
| IndoBERT-base fine-tune | SmSA, 3 epoch | ~30-45 menit | tidak praktis |
| Autoencoder CIFAR-10 | 30 epoch | ~15-20 menit | ~1-2 jam |

Kalau training Anda 10x lebih lambat dari tabel, periksa bottleneck data loading, batch size yang terlalu kecil, atau model yang tidak sengaja jalan di CPU. Pakai `nvidia-smi` untuk memastikan GPU benar-benar dipakai.

Alur enam langkah ini terlihat utuh pada satu contoh. Rani ingin belajar focal loss dari paper Lin et al. (2017) dan menjalankan seluruh alur dalam satu minggu:

- **Kurasi.** Rani mencari paper dengan kata kunci "class imbalance", "dense detection", dan "loss function". Ia menemukan Focal Loss di arXiv, mengecek statusnya, dan melihat ada versi ICCV 2017, jadi arXiv dipakai sebagai akses PDF saja.
- **Tiga putaran.** Putaran 1 menemukan klaim utamanya: cross-entropy terlalu didominasi contoh mudah pada deteksi objek yang sangat imbalanced. Putaran 2 mengambil bentuk inti loss-nya, `FL(p_t) = -(1 - p_t)^γ log(p_t)`. Putaran 3 fokus ke ablation `γ` saja, tidak ke seluruh RetinaNet.
- **Paper-to-code.** Rani mencatat input/output: input loss adalah logits dan target class, output adalah scalar loss. Ia memisahkan inti dari detail rekayasa, jadi tidak perlu implement RetinaNet, anchor matching, atau FPN. Cukup focal loss pada classifier kecil dengan dataset imbalanced.
- **Implementasi.** Rani menambahkan `FocalLoss` di [`src/losses.py`](https://github.com/muhammad-zainal-muttaqin/Module-DS/blob/master/template/src/losses.py) lalu membuat smoke test:

```python
gamma = 0.0  # should match cross-entropy
gamma = 2.0  # focal loss setting from the paper
```

Kalau `gamma=0` tidak identik dengan cross-entropy dalam toleransi numerik, implementasinya belum boleh dipakai untuk training.

---

## 4. Ablation Kecil

Ablation untuk W10 bukan eksperimen besar. Ablation berarti satu perubahan terkontrol yang menjawab satu pertanyaan: apakah komponen yang diklaim penting memang berdampak. Aturan satu variabel berubah dan trace result mengikuti [W4 §2-§3](04_W4_Reproducibility_Experiment_Matrix.md).

Beberapa ablation kecil yang realistis, masing-masing dengan satu variabel berubah:

| Paper/metode | Kontribusi inti | Ablation kecil |
| --- | --- | --- |
| Focal Loss | Faktor `(1 - p_t)^γ` menurunkan bobot contoh mudah | Bandingkan `γ=0` (cross-entropy) dengan `γ=2` pada dataset kecil |
| DropBlock | Dropout blok spasial untuk CNN | Bandingkan dropout biasa dengan DropBlock pada keep_prob sama |
| Mixup | Interpolasi input dan label | Bandingkan `alpha=0` dengan `alpha=0.2` pada seed sama |
| Label smoothing | Target tidak one-hot penuh | Bandingkan smoothing `0.0` dengan `0.1` |

Ablation yang baik punya baseline jelas, satu variabel berubah, metrik sama, dan log yang cukup untuk diulang orang lain. Kalau hasil ablation tidak cocok dengan klaim paper, itu belum tentu kegagalan. Catat gap-nya: dataset berbeda, skala model berbeda, hyperparameter belum sama, atau implementasi belum parity dengan kode resmi.

Inilah yang Rani lakukan di akhir minggunya. Ia menjalankan baseline `γ=0` dan focal loss `γ=2` pada dataset kecil yang sengaja dibuat imbalanced, dengan seed, model, augmentasi, dan metrik yang sama. Hasil focal loss sedikit lebih baik pada kelas minoritas, tetapi akurasi total turun tipis. Saat melapor ke dosen, Rani menyebut gap-nya secara eksplisit: paper asli mengevaluasi object detection dengan extreme foreground/background imbalance, sedangkan labnya memakai klasifikasi kecil. Laporannya menyebut batas klaim itu, bukan menyajikan satu angka tanpa konteks. Hasil ini cukup untuk memahami mekanisme loss dan batas transfer klaimnya, meski bukan reproduksi penuh.

---

## 5. Peta Model Generatif

Modul ini membahas arsitektur diskriminatif secara hands-on: MLP, CNN, RNN/LSTM, Transformer encoder, dan Autoencoder. Satu keluarga besar yang tidak masuk jadwal hands-on adalah model generatif, yaitu model yang belajar menghasilkan sampel baru dari distribusi data. Alasannya praktis: model generatif yang stabil butuh compute, dataset, dan keterampilan diagnostik yang melebihi cakupan satu semester. Padahal sekitar sepertiga paper ML modern melibatkan komponen generatif, jadi bagian ini memberi peta mental supaya Anda bisa membaca paper generatif dengan struktur.

| Keluarga | Ide inti | Training signal | Kapan dipakai | Failure mode khas | Paper pembuka |
| --- | --- | --- | --- | --- | --- |
| VAE | Encoder ke distribusi Gaussian, decoder dari sampel | Rekonstruksi + KL terhadap prior | Saat butuh representasi kontinu yang bisa di-sampel; *conditional generation* | *Posterior collapse*: decoder mengabaikan z saat KL term terlalu mendominasi loss, sehingga latent tidak membawa informasi berguna | Kingma & Welling 2013 (*Auto-Encoding Variational Bayes*) |
| GAN | Generator melawan discriminator, permainan minimax | Discriminator mengklasifikasi real/fake | Generasi gambar tajam, *style transfer*, *image-to-image* | *Mode collapse*: generator hanya menghasilkan subset kecil distribusi data meski training loss terlihat stabil | Goodfellow et al. 2014 (*Generative Adversarial Nets*) |
| Diffusion | Tambah noise bertahap, belajar membaliknya | Prediksi noise di setiap langkah | State-of-the-art image/video generation, kontrol *conditioning* | Inference lambat karena banyak step, butuh compute besar | Ho et al. 2020 (*Denoising Diffusion Probabilistic Models*) |
| Normalizing Flow | Transformasi bijeksi yang dibalik dari noise ke data | Likelihood eksak | Saat butuh likelihood eksak (deteksi anomali, kompresi) | Arsitektur terbatas karena harus invertible, kapasitasnya lebih kecil | Rezende & Mohamed 2015 (*Variational Inference with Normalizing Flows*) |

Autoencoder di [`lab_breadth_autoencoder`](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_breadth_autoencoder.ipynb) adalah langkah pertama menuju VAE: encoder, decoder, bottleneck, dan reconstruction loss sudah ada. VAE hanya menambah tiga hal, yaitu encoder mengeluarkan `(μ, σ)` bukan `z` langsung, sampling dengan *reparameterization trick*, dan loss KL terhadap prior. Jalur fork lab autoencoder lalu menambah tiga modifikasi itu cocok untuk Komponen Mandiri Jalur 4 (Arsitektur Baru). Empat paper pembuka di tabel juga kandidat kuat untuk slot bacaan paper di rutinitas mingguan Anda.

---

## Daftar Paket Latihan W10

Pilih satu paket untuk latihan paper-to-code. Setiap paket berisi satu paper utama, dataset untuk reproduksi kecil, parity check, dan satu ablasi unik. Rincian di bawah disalin dari lembar informasi tiap paket, dan versi `.docx` lengkapnya bisa diunduh di akhir tiap paket.

Untuk tiap paket, diskusikan lebih dulu: klaim apa yang diuji, baseline apa yang dipakai, dataset mana yang paling realistis, hasil paper mana yang akan dijadikan pembanding, dan bagian eksperimen mana yang sulit disamakan.

### W10-01 - Image: Colorful Cutout

Paper: [Colorful Cutout: Enhancing Image Data Augmentation with Curriculum Learning](https://arxiv.org/abs/2403.20012)

Venue: ICLR 2024 Tiny Papers / arXiv (2024). Dataset di paper: CIFAR-10 / CIFAR-100 / Tiny ImageNet.

Paper ini menguji variasi Cutout: bagian gambar ditutup dengan warna acak, lalu tingkat gangguannya dinaikkan bertahap dengan curriculum. Klaim utama: augmentasi sederhana ini bisa memperbaiki akurasi dibanding Cutout biasa.

Rencana eksperimen (titik awal, boleh direvisi dengan alasan):

| No | Eksperimen | Yang berubah | Untuk mengecek |
|---|---|---|---|
| 1 | Baseline | Cutout biasa / augmentasi standar | Pembanding utama |
| 2 | Reproduksi paper | Colorful Cutout | Apakah arah hasil mengikuti paper? |
| 3 | Ablasi curriculum | Colorful Cutout tanpa curriculum | Apakah curriculum memang berpengaruh? |
| 4 | Ablasi unik | jumlah warna / jadwal curriculum / warm-up / pilihan kelompok | Batas klaim yang ingin diuji |

Parameter yang dibuat tetap:

| Parameter | Nilai |
|---|---|
| Dataset reproduksi | CIFAR-10 |
| Model | ResNet-18 |
| Epoch | 20 |
| Optimizer | SGD |
| Learning rate | 0.1 |
| Batch size | 128 |
| Seed | 42 |
| Split | train 45k / validation 5k / test 10k |
| Metrik | akurasi validasi dan test |

Parity check: bandingkan hasil reproduksi dengan paper, apakah Colorful Cutout mengalahkan Cutout pada setup kalian? Jika tidak, jelaskan kemungkinan penyebabnya.

Ablasi unik: pilih satu ablasi yang tidak ada di paper, lalu jelaskan batas klaim yang ingin diuji. Beberapa opsi: jumlah warna / jadwal curriculum / Colorful Cutout hanya setelah warm-up / [tentukan sendiri].

Lembar informasi lengkap: [unduh .docx](../template/notebooks/information_sheet/01_Image_ColorfulCutout_info_sample.docx)

### W10-02 - NLP: Adverb Deletion

Paper: [Adverb Is the Key: Simple Text Data Augmentation with Adverb Deletion](https://arxiv.org/abs/2403.20015)

Venue: ICLR 2024 Tiny Papers / arXiv (2024). Dataset di paper: SST-2 / SST-5 / CoLA / TREC / RTE / MNLI / QNLI.

Paper ini menguji augmentasi teks yang sangat sederhana: hapus adverb dari kalimat. Klaim utama: penghapusan adverb cenderung menjaga makna, sehingga bisa membantu klasifikasi teks dan NLI.

Rencana eksperimen (titik awal, boleh direvisi dengan alasan):

| No | Eksperimen | Yang berubah | Untuk mengecek |
|---|---|---|---|
| 1 | Baseline | tanpa augmentasi | Pembanding utama |
| 2 | Reproduksi paper | adverb deletion | Apakah arah hasil mengikuti paper? |
| 3 | Ablasi rule | hapus satu adverb vs semua adverb | Apakah agresivitas penghapusan berpengaruh? |
| 4 | Ablasi unik | threshold POS / discourse marker / pilihan kelompok | Batas klaim yang ingin diuji |

Parameter yang dibuat tetap:

| Parameter | Nilai |
|---|---|
| Dataset reproduksi | SST-2 |
| Model | bert-base-uncased |
| Epoch | 3 |
| Optimizer | AdamW |
| Learning rate | 2e-5 |
| Batch size | 16 |
| Seed | 42 |
| Split | train / validation GLUE |
| Metrik | validation accuracy |

Parity check: bandingkan hasil reproduksi dengan paper, apakah adverb deletion mengalahkan baseline tanpa augmentasi pada setup kalian? Jika tidak, jelaskan kemungkinan penyebabnya.

Ablasi unik: pilih satu ablasi yang tidak ada di paper, lalu jelaskan batas klaim yang ingin diuji. Beberapa opsi: hapus satu adverb saja / hapus semua adverb / batasi pada adverb tertentu / [tentukan sendiri].

Lembar informasi lengkap: [unduh .docx](../template/notebooks/information_sheet/02_NLP_AdverbDeletion_info.docx)

### W10-03 - Tabular: TabM

Paper: [TabM: Advancing Tabular Deep Learning with Parameter-Efficient Ensembling](https://arxiv.org/abs/2410.24210)

Venue: ICLR 2025 / arXiv (2024). Dataset di paper: tabular benchmark datasets / OpenML.

Paper ini menguji ide bahwa MLP tabular bisa menjadi lebih kuat dengan parameter-efficient ensembling. Klaim utama: TabM memberi baseline tabular deep learning yang sederhana, kuat, dan praktis.

Rencana eksperimen (titik awal, boleh direvisi dengan alasan):

| No | Eksperimen | Yang berubah | Untuk mengecek |
|---|---|---|---|
| 1 | Baseline | MLP biasa | Pembanding neural sederhana |
| 2 | Reproduksi paper | TabM dengan backbone sama | Apakah ensemble efisien membantu MLP? |
| 3 | Ablasi jumlah prediksi | 4 prediksi vs 8 prediksi | Apakah manfaat datang dari ensemble? |
| 4 | Ablasi unik | single head / shared layer / pilihan kelompok | Batas klaim yang ingin diuji |

Parameter yang dibuat tetap:

| Parameter | Nilai |
|---|---|
| Dataset reproduksi | Adult Income |
| Task | binary classification |
| Backbone | MLP 2 layer, hidden 256 |
| Epoch | 50 |
| Optimizer | AdamW |
| Learning rate | 1e-3 |
| Batch size | 512 |
| Seed | 42 |
| Split | 70% train / 15% validation / 15% test |
| Metrik | ROC-AUC dan accuracy |

Parity check: bandingkan hasil reproduksi dengan paper, apakah TabM mengalahkan MLP biasa pada dataset pilihan? Jika tidak, jelaskan apakah masalahnya dataset, tuning, atau implementasi.

Ablasi unik: pilih satu ablasi yang tidak ada di paper, lalu jelaskan batas klaim yang ingin diuji. Beberapa opsi: jumlah prediksi / single head saat test / shared vs partially shared layer / [tentukan sendiri].

Lembar informasi lengkap: [unduh .docx](../template/notebooks/information_sheet/03_Tabular_TabM_info.docx)

### W10-04 - Tabular: GRANDE

Paper: [GRANDE: Gradient-Based Decision Tree Ensembles for Tabular Data](https://arxiv.org/abs/2309.17130)

Venue: ICLR 2024 / arXiv (2023). Dataset di paper: 19 tabular classification datasets.

Paper ini melatih ensemble decision tree dengan gradient descent. Klaim utama: struktur tree tetap berguna untuk tabular, tetapi bisa digabung dengan fleksibilitas training neural.

Rencana eksperimen (titik awal, boleh direvisi dengan alasan):

| No | Eksperimen | Yang berubah | Untuk mengecek |
|---|---|---|---|
| 1 | Baseline tree | XGBoost | Pembanding tree-based |
| 2 | Baseline neural | MLP biasa | Pembanding deep learning sederhana |
| 3 | Reproduksi paper | GRANDE | Apakah GRANDE kompetitif pada tabular? |
| 4 | Ablasi unik | depth / embeddings / instance weighting / pilihan kelompok | Batas klaim yang ingin diuji |

Parameter yang dibuat tetap:

| Parameter | Nilai |
|---|---|
| Dataset reproduksi | OpenML 46915 |
| Task | binary classification |
| Split | 64% train / 16% validation / 20% test |
| Epoch | 100 |
| Batch size | 256 |
| Seed | 42 |
| GRANDE depth | 5 |
| GRANDE estimators | 256 |
| Metrik | ROC-AUC dan F1 |

Parity check: bandingkan hasil reproduksi dengan paper, apakah GRANDE mengalahkan MLP dan mendekati baseline tree pada setup kalian? Jika tidak, jelaskan kemungkinan penyebabnya.

Ablasi unik: pilih satu ablasi yang tidak ada di paper, lalu jelaskan batas klaim yang ingin diuji. Beberapa opsi: depth tree / jumlah estimator / numeric embedding on-off / [tentukan sendiri].

Lembar informasi lengkap: [unduh .docx](../template/notebooks/information_sheet/04_Tabular_GRANDE_info.docx)

### W10-05 - Time Series: SOFTS

Paper: [SOFTS: Efficient Multivariate Time Series Forecasting with Series-Core Fusion](https://arxiv.org/abs/2404.14197)

Venue: NeurIPS 2024 / arXiv (2024). Dataset di paper: ETT / Traffic / Weather / ECL.

Paper ini mengusulkan STAR: semua series diringkas menjadi core bersama, lalu informasi core dikembalikan ke tiap series. Klaim utama: channel interaction bisa dipelajari efisien tanpa attention yang berat.

Rencana eksperimen (titik awal, boleh direvisi dengan alasan):

| No | Eksperimen | Yang berubah | Untuk mengecek |
|---|---|---|---|
| 1 | Baseline | DLinear | Pembanding forecasting sederhana |
| 2 | Reproduksi paper | SOFTS dengan STAR | Apakah fusion antar-series membantu? |
| 3 | Ablasi STAR | mean pooling + broadcast | Apakah STAR lebih dari pooling biasa? |
| 4 | Ablasi unik | jumlah core / stop gradient / pilihan kelompok | Batas klaim yang ingin diuji |

Parameter yang dibuat tetap:

| Parameter | Nilai |
|---|---|
| Dataset reproduksi | ETTh1 |
| Task | multivariate forecasting |
| Lookback | 96 |
| Horizon | 96 |
| Epoch | 10 |
| Optimizer | Adam |
| Learning rate | 1e-3 |
| Batch size | 32 |
| Seed | 42 |
| Metrik | MSE dan MAE |

Parity check: bandingkan hasil reproduksi dengan paper, apakah SOFTS memberi MSE/MAE lebih baik daripada baseline pada horizon yang sama? Jika tidak, jelaskan kemungkinan penyebabnya.

Ablasi unik: pilih satu ablasi yang tidak ada di paper, lalu jelaskan batas klaim yang ingin diuji. Beberapa opsi: jumlah core / STAR vs mean pooling / stop gradient pada core / [tentukan sendiri].

Lembar informasi lengkap: [unduh .docx](../template/notebooks/information_sheet/05_TimeSeries_SOFTS_info.docx)

### W10-06 - Time Series: ModernTCN

Paper: [ModernTCN: A Modern Pure Convolution Structure for General Time Series Analysis](https://openreview.net/forum?id=vpJMJerXHU)

Venue: ICLR 2024 Spotlight / OpenReview (2024). Dataset di paper: ETT / M4 / SWaT / classification benchmarks.

Paper ini membawa convolution kembali ke time series dengan large-kernel temporal convolution dan mixing antar-variabel. Klaim utama: model convolution murni bisa kuat untuk beberapa task time series.

Rencana eksperimen (titik awal, boleh direvisi dengan alasan):

| No | Eksperimen | Yang berubah | Untuk mengecek |
|---|---|---|---|
| 1 | Baseline | DLinear | Pembanding forecasting sederhana |
| 2 | Reproduksi paper | ModernTCN | Apakah convolution modern membantu? |
| 3 | Ablasi kernel | large kernel diganti kernel kecil | Apakah receptive field besar penting? |
| 4 | Ablasi unik | depth / channel grouping / lookback / pilihan kelompok | Batas klaim yang ingin diuji |

Parameter yang dibuat tetap:

| Parameter | Nilai |
|---|---|
| Dataset reproduksi | ETTh2 |
| Task | long-term forecasting |
| Lookback | 96 |
| Horizon | 96 |
| Epoch | 10 |
| Optimizer | Adam |
| Learning rate | 1e-3 |
| Batch size | 32 |
| Seed | 42 |
| Metrik | MSE dan MAE |

Parity check: bandingkan hasil reproduksi dengan paper, apakah ModernTCN mengalahkan baseline pada dataset dan horizon yang sama? Jika tidak, jelaskan kemungkinan penyebabnya.

Ablasi unik: pilih satu ablasi yang tidak ada di paper, lalu jelaskan batas klaim yang ingin diuji. Beberapa opsi: ukuran kernel / jumlah block / channel grouping / [tentukan sendiri].

Lembar informasi lengkap: [unduh .docx](../template/notebooks/information_sheet/06_TimeSeries_ModernTCN_info.docx)

### W10-07 - Time Series: TimeMixer

Paper: [TimeMixer: Decomposable Multiscale Mixing for Time Series Forecasting](https://arxiv.org/abs/2405.14616)

Venue: ICLR 2024 / arXiv (2024). Dataset di paper: ETT / Weather / Traffic / Electricity.

Paper ini memecah time series ke beberapa skala, lalu mencampur informasi trend dan seasonal dari skala berbeda. Klaim utama: multiscale mixing membantu forecasting tanpa Transformer.

Rencana eksperimen (titik awal, boleh direvisi dengan alasan):

| No | Eksperimen | Yang berubah | Untuk mengecek |
|---|---|---|---|
| 1 | Baseline | DLinear | Pembanding forecasting sederhana |
| 2 | Reproduksi paper | TimeMixer | Apakah multiscale mixing membantu? |
| 3 | Ablasi decomposition | tanpa decomposition trend-seasonal | Apakah decomposition penting? |
| 4 | Ablasi unik | fine-to-coarse / coarse-to-fine / predictor sharing | Batas klaim yang ingin diuji |

Parameter yang dibuat tetap:

| Parameter | Nilai |
|---|---|
| Dataset reproduksi | Weather |
| Task | multivariate forecasting |
| Lookback | 96 |
| Horizon | 96 |
| Epoch | 10 |
| Optimizer | Adam |
| Learning rate | 1e-3 |
| Batch size | 32 |
| Seed | 42 |
| Metrik | MSE dan MAE |

Parity check: bandingkan hasil reproduksi dengan paper, apakah TimeMixer memberi MSE/MAE lebih baik daripada baseline pada horizon yang sama? Jika tidak, jelaskan kemungkinan penyebabnya.

Ablasi unik: pilih satu ablasi yang tidak ada di paper, lalu jelaskan batas klaim yang ingin diuji. Beberapa opsi: tanpa decomposition / satu arah mixing saja / shared predictor / [tentukan sendiri].

Lembar informasi lengkap: [unduh .docx](../template/notebooks/information_sheet/07_TimeSeries_TimeMixer_info.docx)

### W10-08 - Time Series: iTransformer

Paper: [iTransformer: Inverted Transformers Are Effective for Time Series Forecasting](https://arxiv.org/abs/2310.06625)

Venue: ICLR 2024 Spotlight / arXiv (2023). Dataset di paper: ETT / ECL / Traffic / Weather / Exchange / PEMS.

Paper ini membalik cara Transformer membaca time series: attention dipakai antar-variabel, bukan antar-waktu. Klaim utama: tokenisasi terbalik ini membuat Transformer lebih cocok untuk multivariate forecasting.

Rencana eksperimen (titik awal, boleh direvisi dengan alasan):

| No | Eksperimen | Yang berubah | Untuk mengecek |
|---|---|---|---|
| 1 | Baseline | Transformer temporal-token | Pembanding transformer biasa |
| 2 | Reproduksi paper | iTransformer | Apakah inverted tokenization membantu? |
| 3 | Ablasi tokenisasi | attention inverted, FFN standar | Bagian mana yang paling berpengaruh? |
| 4 | Ablasi unik | lookback / jumlah variate / pilihan kelompok | Batas klaim yang ingin diuji |

Parameter yang dibuat tetap:

| Parameter | Nilai |
|---|---|
| Dataset reproduksi | ECL |
| Task | multivariate forecasting |
| Lookback | 96 |
| Horizon | 96 |
| Epoch | 10 |
| Optimizer | Adam |
| Learning rate | 1e-4 |
| Batch size | 32 |
| Seed | 42 |
| Metrik | MSE dan MAE |

Parity check: bandingkan hasil reproduksi dengan paper, apakah iTransformer mengalahkan Transformer biasa pada dataset dan horizon yang sama? Jika tidak, jelaskan kemungkinan penyebabnya.

Ablasi unik: pilih satu ablasi yang tidak ada di paper, lalu jelaskan batas klaim yang ingin diuji. Beberapa opsi: lookback 48 vs 96 / batasi jumlah variate / attention inverted saja / [tentukan sendiri].

Lembar informasi lengkap: [unduh .docx](../template/notebooks/information_sheet/08_TimeSeries_iTransformer_info.docx)

---

## Lab

Buka [lab_w10_paper_to_code.ipynb](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w10_paper_to_code.ipynb). Notebook ini berupa submission notebook: pilih satu paket dari [Daftar Paket Latihan W10](#daftar-paket-latihan-w10) di atas, lalu isi seluruh rencana, hasil, dan laporan langsung di tabel notebook. Opsi memilih paper arXiv sendiri tersedia di bagian akhir notebook sebagai latihan lanjut. Kerjakan mengikuti urutan bagian di dalam notebook.

1. Isi bagian Packet yang Dipilih dan Klaim Paper, dengan membaca paper tiga putaran (template §2) untuk mengisinya.
2. Susun rencana eksperimen dan kunci parameter di tabel Rencana Eksperimen dan Parameter yang Dibuat Tetap.
3. Implementasikan metode inti dari langkah paper-to-code §3, lalu smoke test pada dataset kecil.
4. Isi tabel Hasil Reproduksi dan Parity Check: apakah arah hasil mengikuti paper, dan berapa selisihnya.
5. Jalankan satu ablasi unik yang tidak ada di paper, dengan satu variabel berubah, lalu catat hasilnya.
6. Tulis Kesimpulan Pendek: apakah hasil mendukung klaim paper, bagian yang paling sulit direproduksi, dan detail yang paling berpengaruh.

Checklist:

- [ ] Bagian Packet, Klaim, Rencana, dan Parameter yang Dibuat Tetap di notebook terisi.
- [ ] Metode inti terimplementasi dan smoke test lulus.
- [ ] Satu angka dari paper terproduksi, atau selisihnya dijelaskan di Parity Check.
- [ ] Ablasi unik menunjukkan dampak satu komponen dengan satu variabel berubah.
- [ ] Kesimpulan Pendek menilai klaim paper dan batas hasilnya.

Target waktu: 6-8 jam.

---

## Komponen Mandiri

Pilih satu pertanyaan dari materi W10 yang ingin Anda dalami. Ini entri portofolio terakhir sebelum capstone. Setelah mengisinya, kerjakan sel "Refleksi Portofolio" di notebook: lihat kembali semua entri dan tulis satu paragraf perjalanan belajar.

Beberapa pertanyaan pemantik (tidak wajib salah satunya):

- Bisakah Anda mengimplementasikan satu teknik dari paper Lab W10 yang belum ada di `template`, dan apakah hasilnya sesuai klaim?
- Dari satu paper yang klaimnya terasa terlalu bagus, apa yang ditunjukkan dan apa yang tidak ditunjukkan?
- Berapa besar gap reproduksi saat menjalankan konfigurasi terkecil paper dengan kode resmi, dan apa penyebab paling mungkin?
- Ada arsitektur dari paper yang belum dibahas di modul yang menarik untuk diimplementasikan forward pass-nya?

Kerjakan, dokumentasikan di [`notebooks/portofolio_mandiri.ipynb`](https://github.com/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/portofolio_mandiri.ipynb), dan presentasikan sorotan portofolio 10 menit di awal W11. Format dan kriteria: [Lampiran C.9](14_Lampiran.md#c9-template-komponen-mandiri).

---

## Lanjut ke W11

Semua keterampilan teknis bootcamp sudah dibangun. W11 menggabungkannya untuk satu tujuan: menyusun framing riset yang siap dipertahankan di W12, lewat kerangka Input → Middle → Output, menu framing, dan triage literatur. Keterampilan membaca tiga putaran dan kurasi paper dari minggu ini langsung dipakai untuk triage literatur W11.

Buka [W11 - Research Framing](11_W11_Research_Framing.md) ketika siap.

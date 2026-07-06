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
| 10 | [W10 - Paper Reading & Implementation](10_W10_Paper_Reading.md) | 10 |
| 11 | [W11 - Research Framing](11_W11_Research_Framing.md) | 11 |
| 12 | [Capstone - Proyek Riset](12_Capstone.md) | 12-15 |
| ▶ 12a | Brief Capstone 100 Jam | 12-15 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | – |
| 14 | [Lampiran](14_Lampiran.md) | – |
| 15 | [Panduan Instruktur](15_Panduan_Instruktur.md) | – |

</details>

---

# 12a · Brief Capstone 100 Jam

**Minggu:** 12-15  
**Pendamping:** [12 - Capstone](12_Capstone.md), [11 - Research Framing](11_W11_Research_Framing.md), dan [13 - Rubrik Penilaian](13_Rubrik_Penilaian.md)

Capstone dikerjakan per kelompok. Targetnya sekitar **100 jam kerja kelompok**. Waktu itu dipakai untuk memilih masalah, memeriksa data, membuat baseline, menjalankan dua eksperimen, menulis hasil, dan membuat demo.

Setiap kelompok harus menghasilkan proyek yang berbeda. Perbedaan bisa datang dari dataset, stakeholder, bentuk output, split evaluasi, slice error, atau eksperimen kedua.

---

## 0. Aturan Dasar

1. Pilih **satu masalah utama**. Jangan menggabungkan beberapa ide dalam satu proyek.
2. Pakai dataset publik yang rilis atau benchmark utamanya berada di **2021-2026**.
3. Tulis pre-registration sebelum training utama.
4. Jalankan baseline dan metode utama dengan minimal 3 seed.
5. Pakai split yang sesuai. Jika ada subjek, pasien, lokasi, waktu, atau produk, jangan memakai split acak tanpa alasan.
6. Eksperimen 2 harus mengikuti hasil Eksperimen 1.
7. Demo harus menampilkan contoh sukses dan contoh gagal.
8. Laporan harus menyebut batas klaim.

---

## 1. Cara Memilih Proyek

Gunakan urutan ini sebelum menulis kode.

| Langkah | Pertanyaan |
|---|---|
| Stakeholder | Siapa yang memakai hasil model? |
| Keputusan | Keputusan apa yang dibantu model? |
| Risiko salah | Mana yang lebih mahal: false positive atau false negative? |
| Output | Perlu kelas, skor risiko, ranking, heatmap, retrieval, atau segmentasi? |
| Data | Dataset apa yang cukup dekat dengan skenario itu? |
| Split | Split apa yang paling jujur untuk skenario itu? |
| Baseline | Model sederhana apa yang harus dikalahkan? |
| Eksperimen 1 | Satu hipotesis apa yang akan diuji lebih dulu? |
| Eksperimen 2 | Jika hasil pertama terbalik, apa yang berubah? |

---

## 2. Dataset yang Disarankan

| Dataset | Tahun | Cocok untuk | Catatan |
|---|---:|---|---|
| [Paddy Doctor](https://paddydoc.github.io/) | 2023 | Penyakit dan hama padi dari foto lapangan | Visual, dekat dengan pertanian Indonesia. Audit duplikat dan imbalance. |
| [NusaX-Senti](https://github.com/IndoNLP/nusax) | 2022/2023 | Sentimen bahasa daerah Indonesia | Cocok untuk transfer antarbahasa, low-resource, dan data efficiency. |
| [CAPTURE-24](https://www.nature.com/articles/s41597-024-03960-3) | 2024 | Aktivitas manusia dari akselerometer | Data aktivitas sehari-hari di luar lab. Wajib subject-wise atau time-wise split. |
| [Child Mind Institute PIU](https://www.kaggle.com/competitions/child-mind-institute-problematic-internet-use) | 2024 | Tabular, actigraphy, dan risiko perilaku digital | Data sensitif. Fokus pada metodologi, missingness, dan fairness. |
| [BigEarthNet v2.0](https://bigearth.net/) | 2025 | Klasifikasi lahan multimodal Sentinel-1 dan Sentinel-2 | Besar. Pilih subset kecil dan evaluasi cloud/snow atau wilayah. |
| [DynamicEarthNet](https://arxiv.org/abs/2203.12560) | 2022 | Segmentasi perubahan lahan dari citra harian | Berat. Cocok untuk kelompok kuat yang paham segmentasi. |
| [EuroCropsML](https://www.nature.com/articles/s41597-025-04952-7) | 2025 | Crop type classification dari time series Sentinel-2 | Cocok untuk few-shot lintas negara dan class imbalance. |
| [GeoLifeCLEF 2025](https://www.kaggle.com/competitions/geolifeclef-2025) | 2025 | Prediksi sebaran spesies dari lokasi dan lingkungan | Audit spatial leakage dan long-tail species. |
| [BirdCLEF+ 2026](https://www.kaggle.com/competitions/birdclef-2026) | 2026 | Identifikasi spesies dari audio alam | Cocok untuk audio, noise, dan inference budget. |
| [ISIC 2024 / SLICE-3D](https://challenge.isic-archive.com/data/) | 2024 | Citra lesi kulit dari 3D total body photography | Data medis. Jangan menulis klaim klinis. |
| [VisA](https://registry.opendata.aws/visa/) | 2022 | Deteksi anomali visual industri | Ada label image-level dan pixel-level. Cocok untuk AUROC/AUPR. |
| [MVTec LOCO AD](https://www.mvtec.com/research-teaching/datasets/mvtec-loco-ad) | 2022 | Anomali struktural dan logis | Cocok untuk membandingkan cacat permukaan dan kesalahan susunan. |
| [ClimateSet](https://climateset.github.io/) | 2023 | Emulasi dan downscaling model iklim | Berat. Gunakan subset kecil dan klaim terbatas. |
| [BigCodeBench](https://bigcode-bench.github.io/) | 2024 | Evaluasi LLM untuk tugas coding realistis | Cocok untuk audit prompt, unit test, dan repair loop. |

---

## 3. Tema Proyek

### 3.1 Pertanian dan Lingkungan

**Dataset:** Paddy Doctor, BigEarthNet v2.0, DynamicEarthNet, EuroCropsML.

**Pertanyaan yang layak:**

- Apakah backbone pretrained lebih tahan terhadap foto daun dengan pencahayaan buruk?
- Apakah label penyakit perlu digabung menjadi level triase yang lebih stabil?
- Apakah model lahan tetap kuat saat diuji di negara atau wilayah yang tidak muncul di train?
- Apakah Sentinel-1 membantu saat Sentinel-2 terganggu awan atau salju?

**Eksperimen 1:** bandingkan baseline sederhana dengan satu metode utama.  
**Eksperimen 2:** ubah split, output, atau slice evaluasi berdasarkan error Eksperimen 1.  
**Demo:** prediksi, confidence, contoh mirip, dan contoh gagal.

### 3.2 Bahasa Daerah Indonesia

**Dataset:** NusaX-Senti atau task NusaCrowd/SEACrowd yang relevan.

**Pertanyaan yang layak:**

- Berapa banyak label bahasa daerah yang dibutuhkan agar fine-tuning mengalahkan zero-shot?
- Apakah translate-then-classify lebih stabil daripada fine-tuning langsung?
- Kelas sentimen mana yang paling sering salah?
- Apakah LoRA cukup baik dibanding full fine-tune pada data kecil?

**Eksperimen 1:** zero-shot vs fine-tune pada satu bahasa daerah.  
**Eksperimen 2:** data efficiency curve, misalnya 50, 100, 200, dan semua label.  
**Demo:** input teks, prediksi, confidence, dan contoh salah per kelas.

### 3.3 Sensor dan Perilaku

**Dataset:** CAPTURE-24 atau Child Mind Institute PIU.

**Pertanyaan yang layak:**

- Berapa besar skor naik jika window data bocor antar subjek?
- Apakah model time-series membantu setelah missingness ditangani dengan benar?
- Apakah fitur aktivitas memperbaiki prediksi risiko dibanding tabular biasa?
- Apakah hasil stabil pada kelompok umur atau pola aktivitas tertentu?

**Eksperimen 1:** split acak vs subject-wise atau time-wise split.  
**Eksperimen 2:** window length, imputation, model ringan, atau fairness slice.  
**Demo:** grafik sinyal, prediksi, dan perbandingan skor split bocor vs split bersih.

### 3.4 Anomali Visual dan Citra Medis

**Dataset:** VisA, MVTec LOCO AD, ISIC 2024 / SLICE-3D.

**Pertanyaan yang layak:**

- Apakah fitur pretrained + kNN/Mahalanobis mengalahkan autoencoder reconstruction error?
- Apakah model kuat pada anomali struktural tetapi gagal pada anomali logis?
- Berapa banyak kontaminasi anomali di train normal yang merusak AUROC?
- Apakah metadata membantu model citra atau menambah bias?

**Eksperimen 1:** autoencoder atau CNN baseline vs fitur pretrained.  
**Eksperimen 2:** contamination sweep, logical-vs-structural slice, calibration, atau patient/group split.  
**Demo:** skor anomali, heatmap, threshold, contoh normal terdekat, dan kasus gagal.

### 3.5 Biodiversitas

**Dataset:** BirdCLEF+ 2026 atau GeoLifeCLEF 2025.

**Pertanyaan yang layak:**

- Apakah metadata lokasi membantu spesies langka atau hanya menghafal lokasi observasi?
- Apakah audio foundation features lebih hemat daripada spectrogram CNN?
- Apakah hierarchical loss mengurangi salah prediksi pada spesies yang mirip?
- Apakah model tetap kuat pada rekaman alam yang noisy?

**Eksperimen 1:** audio atau lokasi saja vs gabungan modalitas.  
**Eksperimen 2:** long-tail reweighting, taxonomy-aware loss, atau spatial holdout.  
**Demo:** audio atau lokasi, kandidat spesies, confidence, dan peringatan saat model tidak yakin.

### 3.6 Audit AI Coding Tools

**Dataset:** BigCodeBench atau subset tugas coding dengan unit test sendiri.

**Pertanyaan yang layak:**

- Apakah prompt terstruktur menaikkan pass@1 pada tugas dengan banyak library?
- Apakah repair loop setelah unit test benar-benar memperbaiki bug?
- Apakah retrieval contoh lokal membantu model kecil?
- Apakah unit test cukup untuk menilai jawaban, atau perlu cek maintainability?

**Eksperimen 1:** prompt biasa vs prompt terstruktur.  
**Eksperimen 2:** repair loop, retrieval, hidden tests, atau cost-quality curve.  
**Demo:** prompt, jawaban model, hasil test, diff per iterasi, dan biaya inference.

---

## 4. Alur 100 Jam

| Jam | Pekerjaan | Luaran |
|---:|---|---|
| 0-10 | Pilih masalah dan stakeholder | Problem statement satu paragraf |
| 10-20 | Pilih dataset dan baca sumbernya | Catatan lisensi, ukuran, label, dan risiko data |
| 20-30 | EDA dan audit split | Distribusi label, contoh data, duplikat, missingness |
| 30-40 | Siapkan pipeline | Loader, smoke test, overfit satu batch |
| 40-55 | Jalankan baseline | Hasil baseline 3 seed |
| 55-65 | Jalankan Eksperimen 1 | Tabel mean, std, dan kasus gagal |
| 65-75 | Tulis rethink memo | Keputusan arah Eksperimen 2 |
| 75-90 | Jalankan Eksperimen 2 | Hasil final dan analisis slice |
| 90-100 | Selesaikan demo dan laporan | Repo siap clone, laporan, tag `v1.0` |

---

## 5. Format Pre-registration

Tulis ini sebelum training utama.

```md
## Pertanyaan
Apa hipotesis yang diuji?

## Data
Dataset, versi, lisensi, split, dan potensi leakage.

## Kondisi
Baseline, metode utama, dan kontrol yang dibuat sama.

## Metrik
Primary metric, secondary metric, dan slice evaluasi.

## Kriteria Gagal
Angka atau kondisi yang membuat hipotesis tidak didukung.

## Rencana Jika Hasil Terbalik
Apa yang akan berubah pada Eksperimen 2?
```

---

## 6. Checklist Selesai

- [ ] Dataset rilis atau benchmark utamanya berada di 2021-2026.
- [ ] Lisensi dan batas penggunaan ditulis.
- [ ] Split sesuai dengan subjek, pasien, lokasi, waktu, atau produk.
- [ ] Ada EDA ringkas dan audit duplikat atau leakage.
- [ ] Ada smoke test dan overfit satu batch.
- [ ] Baseline berjalan minimal 3 seed.
- [ ] Eksperimen 1 punya pre-registration.
- [ ] Eksperimen 2 berubah karena hasil Eksperimen 1.
- [ ] Hasil dilaporkan dengan mean dan standar deviasi.
- [ ] Ada contoh prediksi salah.
- [ ] Demo bisa dijalankan.
- [ ] Laporan menyebut klaim yang didukung dan klaim yang tidak boleh dibuat.
- [ ] Repo bisa di-clone dan dijalankan dari instruksi.
- [ ] Final disimpan dengan tag `v1.0`.

---

## Bacaan Lanjutan

- [12 - Capstone](12_Capstone.md) untuk jadwal W12-W15.
- [11 - Research Framing](11_W11_Research_Framing.md) untuk Input, Middle, dan Output.
- [13 - Rubrik Penilaian](13_Rubrik_Penilaian.md) untuk kriteria penilaian.
- `template/docs/prereg_template.md` untuk format pre-registration.

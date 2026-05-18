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
| ▶ 11 | W11 - Research Framing | 11 |
| 12 | [Capstone - Proyek Riset](12_Capstone.md) | 12-15 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | – |
| 14 | [Lampiran](14_Lampiran.md) | – |
| 15 | [Panduan Instruktur](15_Panduan_Instruktur.md) | – |

</details>

---

# 11 · W11 - Research Framing

> *Pertanyaan riset bukan sesuatu yang Anda temukan di dalam dataset. Ia adalah sesuatu yang Anda bawa ke sana.*

**Minggu:** 11
**Format:** Sesi kelas (120 menit) + kerja mandiri antarsesi
**Penanggung jawab:** Bu Fatma + RA

**Baris peta besar:** konsolidasi - memetakan arah riset ke Big Map yang sudah dibangun
**Kebiasaan riset:** framing sebelum eksekusi, filter literatur, pertahanan framing

---

## 0. Peta Bab

W11 adalah transisi dari bootcamp ke capstone. Keterampilan teknis sudah ada. Minggu ini tentang belajar menggunakannya untuk menjawab pertanyaan riset yang sungguh - pertanyaan yang Anda rumuskan sendiri, bisa Anda pertahankan, dan punya gap yang sesungguhnya ada, meskipun kecil, yang belum diisi.

**Rencana minggu ini:**

| Fase | Kapan | Isi |
|---|---|---|
| Sesi kelas | Sesi W11 | Demo langsung dekomposisi + penjelasan langkah demi langkah kerangka + penugasan dataset |
| Antarsesi | W11 → W12 | Curah gagasan dekomposisi (3-5 framing) + pemeriksaan literatur + daftar pendek |
| Sesi kelas | Sesi W12 | Presentasi framing + bukti literatur + pertahankan pilihan utama + persetujuan |

Kerja minggu ini langsung menjadi input W12. Anda tiba di W12 dengan menu 3-5 framing kandidat, hasil pemeriksaan literatur untuk masing-masing, dan satu framing utama yang siap dipertahankan.

**Isi bab:**

- **§1** Paruh depan riset
- **§2** Konteks lab kita
- **§3** Kerangka: Input → Middle → Output
- **§3.1** Pertanyaan 1: Apa yang diprediksi, tentang apa, dari apa?
- **§3.2** Pertanyaan 2: Seperti apa Middle-nya, dan di mana letak gap-nya?
- **§3.3** Pertanyaan 3: Apakah gap-nya benar-benar ada dan layak diisi?
- **§4** Dua fase yang harus terpisah
- **§5** Tentang keahlian dan pemeriksaan literatur
- **§6** Sesi kelas: demo langsung + tiga lokakarya
- **§7** Dataset kelas (Problem A dan B)
- **§8** Bank dataset tambahan untuk latihan mandiri
- **§9** Pitfalls & Miskonsepsi
- **§10** Antara W11 dan W12
- **§11** Luaran W11
- **§12** Checklist: sebelum presentasi di W12
- **§13** Template dekomposisi
- **§14** Refleksi

---

## 1. Paruh Depan Riset

W1-W10 mengajarkan **paruh belakang** riset: diberi masalah yang sudah didefinisikan, dataset yang sudah ditentukan, dan tugas yang sudah dirumuskan - bagaimana membangun model, melatihnya dengan benar, mengevaluasinya secara jujur, dan melaporkan hasilnya dengan reproduksibilitas? Ini keterampilan yang sesungguhnya diperlukan dan wajib ada. Tanpa ini, Anda tidak bisa melakukan riset sama sekali.

Tapi ini bukan satu-satunya bagian dari riset. Ini adalah separuh eksekusi.

W11 memulai **paruh depan**: diberi situasi yang terbuka - bisa berupa domain yang menarik bagi Anda, atau dataset yang dapat Anda akses - bagaimana Anda sampai pada pertanyaan riset yang layak ditanyakan? Bagaimana Anda mendefinisikan output, memilih input, membuat sketsa pipeline, mengidentifikasi di mana letak gap-nya, dan memverifikasi bahwa gap itu benar-benar ada dan layak diisi?

Banyak program studi berhenti di paruh belakang dan mengasumsikan paruh depan akan terserap sendiri: dengan mengamati dosen pembimbing, dengan membaca cukup banyak paper sampai insting itu berkembang. Terkadang berhasil. Sering kali tidak - dan mahasiswa menghabiskan bertahun-tahun mengeksekusi dengan kompeten pertanyaan-pertanyaan yang sejak awal sudah salah framing.

Di minggu ini, paruh depan dieksplisitkan. Kerangka dekomposisi, menu framing, dan filter literatur bukan latihan akademik. Ini adalah proses yang sesungguhnya dipakai saat sebuah proyek riset dimulai.

---

## 2. Konteks Lab Kita

Penting untuk jujur tentang kondisi yang kita hadapi, karena metodologi minggu ini dirancang spesifik untuk konteks semacam ini.

Kita adalah lab kecil di universitas di Kalimantan. Pendanaan terbatas. Tim riset kecil. Akses ke kluster GPU besar, dataset berlabel besar, dan kolaborator domain yang dalam - semuanya terbatas. Kita bukan lab dengan lima puluh orang di institusi papan atas dengan kluster GPU khusus dan tim postdoc.

Ini bukan permintaan maaf. Ini adalah batasan perancangan.

Metodologi dekomposisi - menghasilkan beberapa framing, memeriksanya ke literatur, mengidentifikasi gap yang sesungguhnya ada, dan menyesuaikan cakupan dengan apa yang bisa dieksekusi - dikembangkan justru untuk konteks seperti ini. Ketika sumber daya terbatas, aktivitas dengan dampak tertinggi adalah memilih pertanyaan yang tepat sebelum menghabiskan waktu untuk eksekusi. Pertanyaan yang framing-nya baik pada dataset kecil menghasilkan riset yang bisa dipublikasikan. Pertanyaan yang framing-nya buruk pada dataset besar tidak menghasilkan sesuatu yang layak dipublikasikan, terlepas dari seberapa hati-hati training loop-nya ditulis.

Keunggulan spesifik konteks kita betul-betul ada: data bahasa lokal (Banjar, dialek Indonesia lainnya), masalah pertanian dan kesehatan yang relevan secara lokal, domain-domain yang belum banyak dieksplorasi di mana gap literaturnya memang ada, bukan dibuat-buat. Ini bukan hadiah hiburan. Ini peluang riset yang lab-lab berdana besar di Jakarta atau Singapura tidak sedang kejar, karena masalah-masalah itu tidak terlihat dari sana.

Metodologi minggu ini adalah cara Anda menemukan dan mengklaim peluang-peluang itu.

---

## 3. Kerangka: Input → Middle → Output

![Kerangka Dekomposisi: Input → Middle → Output - tiga pertanyaan untuk membedah setiap masalah ML](../figures/fig10a_input_middle_output.svg)

Setiap masalah ML supervised bisa digambarkan sebagai transformasi:

```
INPUT  ──────────────────────────────────────▶  OUTPUT
       │                                    │
       │              MIDDLE                │
       │   (komponen yang melakukan         │
       │    pemetaan; bisa punya beberapa   │
       │    langkah; bisa punya gap)        │
       └────────────────────────────────────┘
```

**Input** adalah apa yang diterima model saat prediksi. Berupa tensor, atau beberapa tensor, dengan bentuk yang spesifik.

**Output** adalah apa yang dihasilkan model. Juga berupa tensor, dengan bentuk dan semantik yang sesuai dengan pertanyaan riset.

**Middle** adalah yang memetakan Input ke Output. Sebagian langkah Middle sudah dipahami dengan baik dan punya implementasi standar - ini sesuai dengan baris-baris di Big Map. Sebagian lagi tidak punya jawaban standar. Inilah **gap**, dan gap adalah tempat kontribusi riset hidup.

---

### 3.0 Sebelum Mulai: Apakah Anda Punya Pertanyaan Riset?

Banyak mahasiswa memulai proyek tanpa pertanyaan riset. Mereka punya dataset dan ingin "melakukan machine learning pada dataset tersebut." Ini bukan pertanyaan riset. Ini adalah prasyarat untuk satu pertanyaan.

Pertanyaan riset punya tiga bagian:

| Bagian | Apa yang ditentukan |
|---|---|
| **Subjek** | Entitas atau fenomena apa yang sedang dipelajari? |
| **Predikat** | Apa yang ingin kita ketahui atau prediksi tentangnya? |
| **Tipe jawaban** | Seperti apa jawaban yang memuaskan itu? |

Yang sering dimiliki mahasiswa di awal adalah sesuatu seperti ini:

> "Saya punya gambar penyakit padi dan ingin mengklasifikasikannya."

Ini menyebutkan dataset dan tugas generik. Belum menyebutkan pertanyaan spesifik apa yang sedang ditanyakan, perbandingan apa yang penting, atau di mana kontribusinya bisa berada.

Perhatikan topik yang sama, dipertajam dengan tiga cara berbeda:

**Framing A: desain output**

> "Pada gambar daun padi yang diambil di lapangan, apakah prediksi kelompok penyakit kasar `(jamur / bakteri / virus / hama / sehat)` lebih andal daripada klasifikasi 13 kelas untuk triase awal di lapangan?"

Ini mengubah **Output**. Pertanyaannya bukan lagi sekadar "bisakah kita klasifikasikan?" tapi "framing output mana yang lebih berguna dan andal untuk keputusan yang dimaksud?"

**Framing B: desain input**

> "Pada gambar daun padi yang diambil di lapangan, apakah menambahkan input inframerah mengurangi kebingungan antara kelas penyakit yang tampak serupa dibanding klasifikasi RGB saja?"

Ini mengubah **Input**. Pertanyaannya kini tentang apakah modalitas tambahan memberikan informasi yang bermakna.

**Framing C: desain yang dibatasi deployment**

> "Bisakah pengetahuan dari model pengenalan penyakit yang lebih besar ditransfer ke model ringan yang bisa di-deploy di lapangan tanpa kehilangan terlalu banyak performa di bawah variasi pencahayaan dan latar belakang?"

Ini mengubah **Middle**. Pertanyaannya tentang prediksi di bawah batasan yang benar-benar membentuk metode.

Perbedaannya bukan kosmetik. Ini bukan tiga cara menyampaikan hal yang sama. Ini tiga pertanyaan riset berbeda - dengan output berbeda, Middle berbeda, baseline berbeda, kontrol berbeda, dan berpotensi paper yang berbeda.

**Satu dataset tidak berarti satu paper.** Dataset yang sama bisa di-framing melalui berbagai sudut yang sah:

- Ubah **Output** dan Anda mungkin mendapat masalah keputusan yang berbeda
- Ubah **Input** dan Anda mungkin mendapat pertanyaan representasi yang berbeda
- Ubah **Middle** dan Anda mungkin mendapat gap metodologis yang berbeda
- Pertahankan tugasnya tapi ubah **batasan** dan Anda mungkin mendapat kontribusi yang berbeda

**Cek:** sebelum memulai proyek apa pun, tulis satu kalimat yang memuat:

1. entitas yang diprediksi
2. apa tepatnya yang diprediksi
3. perbandingan, batasan, atau keputusan apa yang membuat pertanyaan itu menarik

Kalau Anda tidak bisa menulis kalimat itu dengan jelas, Anda belum punya pertanyaan riset.

---

### 3.1 Pertanyaan 1: Apa yang Diprediksi, tentang Apa, dari Apa?

Pertanyaan ini meminta Anda mendefinisikan **entitas**, **Output**, dan **Input**.

#### Entitas: unit prediksi

Entitas adalah apa yang satu sampel itu wakili. Anda menghasilkan satu prediksi per entitas.

Salah memilih entitas adalah salah satu kesalahan framing yang paling umum. Kesalahan ini tidak gagal dengan berisik; ia gagal secara diam-diam - menghasilkan hasil yang tampak masuk akal tapi mengukur hal yang salah.

| Domain | Entitas yang mungkin |
|---|---|
| Deteksi penyakit | Satu gambar daun, satu tanaman, satu kunjungan lahan |
| Pengenalan aktivitas | Satu jendela waktu, satu sesi aktivitas, satu hari penuh |
| Pemantauan satwa liar | Satu frame video, satu tracklet hewan, satu klip camera trap |
| Analisis sentimen | Satu kalimat, satu ulasan, satu sesi pengguna |
| Pengenalan makanan | Satu gambar hidangan, satu makan, satu hari makan |

Memilih entitas menentukan apa arti "satu sampel", apa unit evaluasinya, dan siapa yang mendapat manfaat dari hasilnya.

#### Output: properti entitas apa yang diprediksi?

Output adalah tensor. Bentuknya mengodekan pertanyaan riset.

| Bentuk output | Makna | Contoh |
|---|---|---|
| `(1,)` | Satu nilai kontinu | Kandungan nutrisi, skor keparahan |
| `(K,)` | K nilai kontinu | Beberapa nutrisi sekaligus |
| `(N,)` | Skor kelas untuk N kelas | Jenis penyakit, identitas spesies |
| `(H, W)` | Peta piksel | Segmentation mask |
| `(T, N)` | Skor kelas per timestep | Pelabelan level token |
| `(T', 1)` | Sequence masa depan | Kurva prediksi glukosa |

**Poin penting:** pilihan Output adalah keputusan desain riset. Entitas dan Input yang sama sering mendukung beberapa pilihan Output, masing-masing mengarah ke masalah riset yang berbeda.

#### Input: informasi apa yang tersedia, dan dalam representasi apa?

Input juga merupakan keputusan desain. Beberapa representasi dari data dunia nyata yang sama biasanya tersedia.

| Entitas | Representasi input yang mungkin |
|---|---|
| Satu daun padi | Gambar RGB (ponsel), gambar inframerah, gambar hiperspektral |
| Satu hari gerakan pergelangan tangan | Akselerometer mentah `(T, 3)`, fitur turunan `(K,)`, spektrogram `(F, T)` |
| Satu postingan media sosial | Token teks mentah `(T,)`, encoding level karakter, teks + metadata |
| Satu hidangan | Gambar RGB, gambar + estimasi porsi, gambar + deskripsi teks |

Setiap representasi punya biaya perolehan berbeda, kandungan informasi berbeda, dan kompatibilitas berbeda dengan arsitektur Middle.

#### Cek koherensi temporal dan kausal

Sebelum melanjutkan: **apakah versi yang di-deploy dari model ini akan punya akses ke input pada saat perlu membuat prediksi?**

Ini adalah cek validitas terpenting. Kalau jawabannya tidak, framing-nya rusak. Ini bukan masalah tuning atau evaluasi. Ini masalah framing, dan tidak bisa diperbaiki tanpa melakukan framing ulang.

**Contoh kegagalan:**

| Framing | Mengapa gagal |
|---|---|
| Prediksi hasil pertandingan dari statistik pertandingan lengkap | Statistik dihitung dari pertandingan yang sudah selesai |
| Prediksi rawat inap ulang dari catatan pemulangan yang memuat "risiko rawat inap ulang tinggi" | Label tertanam di dalam input |
| Prediksi promosi karyawan dari rekaman masa kerja saat kebijakan promosi memberi hadiah masa kerja | Kebocoran definitional |
| Prediksi hasil panen dari pengukuran akhir musim | Musim sudah selesai sebelum prediksi dibuat |

**Perbaikannya biasanya framing ulang, bukan lebih banyak data.** Masalah sepak bola diselesaikan dengan hanya memakai statistik babak pertama. Masalah rawat inap ulang diselesaikan dengan hanya memakai informasi yang tersedia saat keputusan pemulangan. Entitas dan output tetap sama; jendela input yang berubah.

---

### 3.2 Pertanyaan 2: Seperti Apa Middle-nya, dan Di Mana Letak Gap-nya?

Setelah Input dan Output terdefinisi, buat sketsa pipeline yang menghubungkannya.

#### Mengurai Middle

Setiap langkah di Middle mengubah satu tensor menjadi tensor lain. Petakan setiap langkah ke Big Map. Empat kasus muncul:

#### Kasus A: Satu baris cocok sepenuhnya

Seluruh Middle adalah satu komponen standar. Misalnya: gambar RGB daun padi → CNN → kelas penyakit. Pertanyaan risetnya valid; kontribusinya sederhana (jika tugas dan dataset sudah standar). Masih bisa dipublikasikan kalau pertanyaannya sendiri baru (domain baru, bahasa baru, konteks baru).

#### Kasus B: Rangkaian baris yang sudah dikenal

Middle punya beberapa langkah yang sudah dikenal secara berurutan. Setiap langkah standar; pipeline secara keseluruhan mungkin belum pernah diterapkan pada kombinasi Input/Output spesifik ini. Kontribusinya adalah kombinasi itu beserta validasi empirisnya.

#### Kasus C: Langkah yang sudah dikenal plus satu gap

Sebagian langkah Middle standar; satu atau lebih tidak punya baris yang cocok. Gap adalah tempat riset baru berada.

#### Kasus D: Tidak ada baris yang cocok

Pasangan Input/Output tidak punya solusi ML yang ada di level manapun. Ini jarang. Lebih sering, Kasus D berarti pasangan Input/Output tidak terdefinisi dengan baik dan perlu direvisi.

#### Contoh konkret per kasus

| Kasus | Contoh | Mengapa masuk kategori ini |
|---|---|---|
| **A: Satu baris** | Satu kalimat Banjar → IndoBERT yang di-fine-tune → label sentimen | Klasifikasi teks standar. Metodenya sendiri bukan kontribusi. |
| **B: Rangkaian baris** | Foto menu restoran + profil diet → OCR → terjemahan mesin → text ranker → rekomendasi hidangan | Setiap langkah standar; kontribusinya adalah pipeline yang terakit dan validasinya. |
| **C: Baris yang dikenal plus gap** | Empat gambar satu pohon kelapa → YOLO per gambar → pencocokan lintas sudut pandang / deduplikasi → hitungan tandan per kelas | Deteksi standar, tapi agregasi lintas sudut pandang tidak punya jawaban standar tunggal. |
| **D: Tidak ada baris yang cocok** | Video camera trap → "kesehatan ekosistem hutan" | Bermakna secara ilmiah, tapi belum menjadi tugas ML yang terdefinisi dengan jelas - belum ada entitas, output tensor, dan evaluasi yang jelas. |

Perhatikan bahwa batas antara B dan C sering menjadi yang paling penting dalam desain riset. Banyak proyek mahasiswa tampak seperti Kasus C pada awalnya, tapi setelah diperiksa lebih teliti ternyata Kasus B: pipeline yang valid yang dirangkai dari komponen standar, dengan sedikit gap metodologis yang sesungguhnya. Itu bukan riset yang buruk, tapi berbeda dari mengklaim metode baru.

#### Mengidentifikasi gap secara tepat

Gap bukan sekadar "kami memakai metode yang berbeda." Gap adalah pilihan desain spesifik yang tidak punya jawaban yang sudah mapan di literatur. Bisa berupa:

- Cara mengagregasi informasi dari beberapa sudut pandang entitas yang sama
- Cara menyelaraskan dua modalitas dengan resolusi temporal yang berbeda
- Cara menyuntikkan pengetahuan dari model besar berbiaya inferensi tinggi ke model kecil yang lebih hemat inferensi
- Cara membangun representasi yang tahan terhadap domain shift tertentu
- Cara mengadaptasi model ke bahasa baru dengan sangat sedikit contoh berlabel

**Menamakan gap secara tepat adalah keterampilan terpenting dalam desain riset.** Gap yang dinamai samar-samar ("kami mengusulkan metode yang lebih baik") bukan kontribusi riset. Gap yang dinamai tepat ("kami mengusulkan metode untuk mengagregasi deteksi YOLO per gambar dari pengambilan gambar multi-sudut-pandang tanpa memerlukan kalibrasi kamera") adalah.

---

### 3.3 Pertanyaan 3: Apakah Gap-nya Benar-benar Ada dan Layak Diisi?

#### Apakah gap-nya benar-benar ada? Literatur sebagai filter, bukan titik awal

Pemeriksaan literatur harus dilakukan **setelah** Anda menghasilkan beberapa framing yang masuk akal dari dekomposisi, bukan sebelumnya.

Kalau mencari terlalu dini, Anda mencari kata kunci yang samar dan terjangkar pada paper apa pun yang kebetulan ditemukan. Kalau mencari terlalu lambat, Anda sudah terlanjur melekat pada framing yang mungkin sudah jenuh atau tidak koheren. Urutan yang tepat:

1. Uraikan dataset menjadi beberapa framing yang masuk akal
2. Tulis masing-masing framing dalam satu kalimat
3. Jalankan filter literatur cepat pada setiap framing
4. Hapus framing yang jenuh, ubah arah yang sebagian terjawab, pertahankan kandidat terkuat

Tahap dekomposisi yang baik **tidak** langsung menghasilkan satu proyek final. Tahap ini menghasilkan **menu framing**.

#### Menu framing

Untuk satu dataset, targetkan **3-5 framing kandidat**. Tiga adalah minimum yang berguna; lebih banyak didorong jika benar-benar berbeda.

Untuk setiap framing kandidat, tulis cukup detail untuk membuatnya bisa dicari dan dibandingkan:

- Entitas
- Input
- Output
- Cek temporal/kausal: LULUS / GAGAL
- Middle kasar
- Gap yang diperkirakan

Pada tahap ini, framing hanya perlu cukup jelas untuk dicari.

#### Loop filter literatur

Setelah punya menu, jalankan loop berikut:

```
Untuk setiap framing kandidat:
  Buat 2-4 query pencarian
  Skim maksimal 5-10 abstrak
  Klasifikasikan:
    BARU           → pertahankan
    SEBAGIAN TERJAWAB  → ubah arah
    JENUH          → hapus
```

Ini bukan tinjauan literatur lengkap. Ini adalah **filter**.

**Alat pencarian:** Google Scholar, Semantic Scholar, Connected Papers, Papers with Code.

**Sinyal kejenuhan:**

| Sinyal | Interpretasi |
|---|---|
| 5+ paper terbaru tentang (Input, Output, domain) yang persis sama | Kemungkinan jenuh → hapus |
| 1-2 paper fundamental, tindak lanjut terbaru terbatas | Ada ruang |
| Tidak ada hasil langsung, beberapa area berdekatan | Kemungkinan gap; verifikasi hati-hati |
| Metode yang sama tapi populasi/bahasa/batasan berbeda | Sudut pandang Anda mungkin masih berbeda |

**Gerakan ubah arah saat sebagian terjawab:** kalau literatur sudah melakukan sesuatu yang dekat, arahkan ke apa yang belum dilakukan.

| Kalau literatur menunjukkan | Ubah arah ke |
|---|---|
| Metode berhasil dalam bahasa Inggris | Versi bahasa dengan sumber daya rendah |
| Metode divalidasi pada benchmark standar | Setting dengan batasan deployment |
| Metode mengasumsikan label melimpah | Versi label rendah atau self-supervised |
| Dua metode ada secara terpisah | Perbandingan sistematis atau kombinasi |
| Studi populasi umum | Subkelompok spesifik (regional, demografis) |
| Metode dipublikasikan 2020 | Versi berbasis foundation model modern |

**Menghapus itu sehat.** Kalau framing jelas jenuh, hapus dan lanjut ke kandidat berikutnya. Sunk cost adalah musuhnya.

#### Apa yang harus dihasilkan tahap literatur

Luaran tahap literatur:

- **1 framing utama:** kandidat terkuat saat ini
- **1 framing cadangan:** layak jika framing utama melemah setelah bacaan lebih dalam
- **Framing yang dihapus:** dihapus secara eksplisit, beserta alasannya (jenuh / tidak koheren / tidak layak)

Penghapusan berarti filternya bekerja.

#### Apakah gap-nya layak diisi? Jenis-jenis kebaruan

Tidak semua gap sama menariknya.

**Kebaruan yang lebih kuat:**

| Jenis | Artinya |
|---|---|
| Tugas baru | Memprediksi sesuatu yang benar-benar belum diprediksi sebelumnya pada jenis data ini |
| Domain baru | Menerapkan metode yang sudah mapan pada domain yang belum pernah diterapkan |
| Rakitan baru | Menggabungkan komponen dengan cara yang bermotivasi baik dan belum pernah dicoba |
| Batasan deployment | Metode yang ada didesain ulang untuk bekerja di bawah batasan dunia nyata yang benar-benar membentuk arsitektur |
| Definisi Output baru | Melakukan framing ulang dataset yang ada dengan Output baru yang menciptakan masalah yang berbeda dan lebih berguna |

**Kebaruan yang lemah - hindari:**

| Klaim kebaruan | Mengapa gagal |
|---|---|
| Tuning hyperparameter | Diharapkan; bukan kontribusi |
| Menerapkan metode yang jarang tanpa motivasi | Bidangnya sudah tahu; penemuan Anda tidak mengubah itu |
| "Studi pertama di Indonesia" untuk masalah yang sudah diselesaikan secara global | Konteks lokal saja tidak cukup |
| Akurasi lebih baik pada benchmark yang sudah mapan lewat metode standar | Akurasi lebih baik adalah tujuan; metodenya harus menjadi kontribusi |
| Menggabungkan dua metode secara acak | Kombinasi harus bermotivasi: mengapa ini, apa yang memungkinkannya yang tidak bisa dilakukan masing-masing? |
| Mereproduksi paper dengan variasi kecil | Hanya valid jika di-framing secara eksplisit sebagai studi reproduksi |

**Jebakan "baru bagi saya".** Metode standar tampak baru bagi mahasiswa yang baru mempelajarinya. Metode itu tidak baru bagi bidang ini. Fine-tuning CNN alih-alih training dari nol mungkin masuk akal sebagai baseline, tapi dengan sendirinya bukan kontribusi riset. Setelah menyelesaikan bootcamp, Anda harus bisa membedakan "ini baru bagi saya" dari "ini baru bagi bidang ini." Pemeriksaan literatur menegakkan perbedaan ini.

**Kalimat cek kebaruan.** Untuk riset apa pun yang diusulkan, lengkapi kalimat ini sebelum melanjutkan:

> *"Literatur yang ada sudah melakukan X. Karya kami melakukan Y, yang berbeda karena Z, dan ini penting karena W."*

Kalau Anda tidak bisa mengisi keempat slot dengan jelas, Anda belum punya klaim kebaruan yang valid.

#### Kontrol: bagaimana Anda akan membuktikan gap-nya terisi?

Pipeline yang berfungsi membuktikan bahwa sebuah metode berhasil. Tidak membuktikan *mengapa* ia berhasil. Kontrol membuat "mengapa" itu terlihat.

Setiap kontribusi yang diusulkan butuh setidaknya satu kontrol yang bisa memfalsifikasinya.

| Klaim kontribusi | Kontrol yang diperlukan |
|---|---|
| "Metode fusion baru kami membantu" | Baseline late-fusion tanpa metode ini |
| "Sinyal pengawasan tambahan mengandung konten semantik" | Sinyal acak dengan dimensi yang sama |
| "Fitur yang dibuat tangan kompetitif dengan encoder yang dipelajari" | Keduanya pada tugas, data, dan evaluasi yang sama |
| "Foundation model meningkatkan kinerja di atas baseline non-pretrained" | Baseline random-init dengan jumlah parameter yang setara |
| "Metode kami bekerja dalam setting label rendah" | Metode yang sama dengan label penuh |
| "Transfer lintas bahasa mengungguli model lokal" | Model lokal yang dilatih dengan semua data yang tersedia |

**Rancang kontrol sebelum menjalankan eksperimen.** Kalau kontrol baru dirancang setelah melihat hasil, Anda sedang membangun cerita di sekitar hasil Anda - bukan menguji hipotesis.

*Catatan: pemilihan baseline spesifik dan desain matriks eksperimen terjadi di W12, setelah framing disetujui. Kontrol diidentifikasi di sini pada tahap framing supaya Anda tahu klaim Anda bisa diuji. Desain eksperimen persis datang setelahnya.*

---

## 4. Dua Fase yang Harus Terpisah

Minggu ini punya dua fase yang tidak boleh dicampurkan:

**Fase 1: Dekomposisi (curah gagasan).** Hasilkan beberapa framing kandidat. Jadilah kreatif. Buat 3-5 kandidat yang berbeda. Jangan filter dulu. Curah gagasan sambil memeriksa literatur menghasilkan framing yang aman dan jelas: hal pertama yang terlintas di pikiran, hampir tanpa diperiksa. Hasilkan dulu, filter kemudian.

**Fase 2: Pemeriksaan literatur (filtering).** Bawa kandidat ke literatur. Cari tahu mana yang jenuh, mana yang perlu ubah arah, dan mana yang punya gap yang sesungguhnya ada. 2-4 jam filter literatur bisa menghemat berminggu-minggu eksekusi yang terbuang.

---

## 5. Tentang Keahlian dan Pemeriksaan Literatur

Anda akan menyadari, seiring bertambahnya pengalaman dalam beberapa tahun ke depan, bahwa peneliti senior bergerak melalui proses dekomposisi lebih cepat dari Anda sekarang. Peneliti berpengalaman melihat dataset dan dengan cepat menghasilkan beberapa framing yang menjanjikan. Mereka juga dengan cepat menolak yang lain sebagai jelas jenuh atau jelas sepele, tanpa memeriksa literatur untuk masing-masing. Pemeriksaan literatur, bagi mereka, lebih cepat dan lebih terarah karena bacaan sebelumnya sudah membangun peta tentang apa yang sudah diketahui.

Anda belum punya peta itu. Itu bukan kritikan. Itu hanya posisi Anda pada tahap karier ini, dan itu adalah titik awal yang normal.

Pemeriksaan literatur paling penting justru karena Anda masih awal dalam karier riset. Saat membaca literatur tentang framing kandidat Anda, Anda akan terkadang melihat bahwa apa yang tampak sebagai ide baru ternyata sudah menjadi masalah yang dipelajari dengan baik - dengan dua puluh paper terbaru. Anda juga akan terkadang menemukan bahwa framing yang Anda ragukan ternyata punya gap yang sesungguhnya ada dan belum ditangani. Kedua penemuan ini tidak akan terjadi tanpa pemeriksaan.

Kepekaan itu berkembang melalui latihan: membaca banyak paper, menjalankan banyak eksperimen, melihat framing mana yang menghasilkan sesuatu dan mana yang tidak, membangun pengetahuan domain dari waktu ke waktu. Mereka yang melakukan pemeriksaan literatur dengan sungguh-sungguh pada setiap framing - bukan hanya pada yang sudah diputuskan untuk dikejar - merekalah yang mengembangkan kepekaan itu lebih cepat. Melewati pemeriksaan tidak mempercepat perkembangan Anda; justru memperlambatnya.

Jalankan pada setiap framing, bahkan yang tampak jelas menjanjikan. Terutama yang seperti itu.

---

## 6. Sesi Kelas

### 6.1 Demo Langsung: Dekomposisi Dataset

**[Placeholder: sesi live dipimpin Bu Fatma di kelas]**

Dataset yang digunakan akan ditentukan sebelum W11. Sesi ini bekerja bersama satu dataset 2025 yang sebenarnya. Bu Fatma memfasilitasi. Mahasiswa menghasilkan framing, Bu Fatma memeriksa dan mengoreksi. Tidak ada jawaban yang sudah terisi; sesi ini bersifat generatif.

**Template papan tulis sesi live (diisi saat sesi berlangsung):**

| | |
|---|---|
| Dataset yang dipilih hari ini | |
| Tugas instingtif awal dari ruangan | |
| Entitas kandidat | |
| Output kandidat | |
| Input / representasi kandidat | |
| Jebakan temporal atau kausal yang ditemukan | |
| Framing 1 | |
| Framing 2 | |
| Framing 3 | |
| Framing utama (setelah filter cepat) | |
| Framing cadangan | |
| Framing yang dihapus + alasan | |

---

### 6.2 Lokakarya 1: Buat Menu Framing

**Format:** Dua kelompok: Kelompok A (2 orang), Kelompok B (3 orang). Diskusi 20 menit.

Setiap kelompok mengerjakan dataset yang berbeda. Dataset ini dipilih karena hampir tidak memerlukan latar belakang domain. Anda bisa memahami data dan mulai menghasilkan framing segera.

- **Kelompok A → Paddy Doctor** (lihat Problem A di §7)
- **Kelompok B → NusaX** (lihat Problem B di §7)

Tujuan Anda **bukan** langsung berkomitmen pada satu proyek final. Tujuan Anda adalah menghasilkan **menu 3 framing kandidat** dari dataset kelompok Anda.

Untuk setiap framing kandidat, tulis cukup detail untuk membuatnya bisa dicari dan dibandingkan:

```
Framing #N
- Pertanyaan riset (1 kalimat)
- Entitas
- Input
- Output
- Cek temporal/kausal: LULUS / GAGAL
- Middle kasar
- Gap yang diperkirakan
```

Menu framing yang baik berisi kandidat yang berbeda secara bermakna. Ubah setidaknya satu dari berikut ini di antara framing-framing Anda:

- entitas
- output
- representasi input
- batasan deployment
- gap di Middle

**Jangan mulai coding. Jangan terkunci pada satu framing dulu.**

Setelah Lokakarya 1, masing-masing kelompok mempresentasikan tiga framingnya kepada ruangan secara singkat (5 menit masing-masing). Ini bukan pertahanan, hanya berbagi cepat supaya kedua kelompok melihat gaya framing satu sama lain dan berbagai kemungkinan yang satu dataset bisa dukung.

---

### 6.3 Lokakarya 2: Filter Literatur

**Format:** Individual atau berpasangan, 15 menit.

Ambil **3 framing kandidat** yang dihasilkan di Lokakarya 1. Jalankan filter literatur cepat pada masing-masing.

Untuk setiap framing:

1. Buat 2-4 query pencarian dari framing
2. Skim maksimal 5-10 abstrak
3. Klasifikasikan framing sebagai **BARU / SEBAGIAN TERJAWAB / JENUH**
4. Kalau sebagian terjawab, tulis satu ubah arah
5. Kalau jenuh, hapus secara eksplisit

Gunakan tabel ini:

| Framing | 2-4 query pencarian | Klasifikasi | 1-2 paper atau bukti | Alasan ubah arah / hapus |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

Tujuannya bukan tinjauan yang lengkap. Tujuannya adalah melatih cara memfilter.

---

### 6.4 Lokakarya 3: Seleksi dan Komitmen

**Format:** Individual, 10 menit.

Ubah menu framing beserta hasil filter literatur menjadi sebuah keputusan.

Luaran Anda harus berupa:

- **1 framing utama**
- **1 framing cadangan**
- **Framing yang dihapus**, beserta alasan masing-masing

Kemudian tulis satu paragraf pendek untuk framing utama Anda:

```
Untuk [entitas], kami memprediksi [output] dari [input].
Ini lulus cek temporal karena [...].
Gap yang diperkirakan adalah [...].
Karya terkait terdekat sudah melakukan [...].
Framing kami berbeda karena [...].
```

Kalau Anda tidak bisa menulis paragraf itu dengan jelas, framing-nya belum siap.

---

## 7. Dataset Kelas (Lokakarya 1)

Dua dataset, satu per kelompok. Dipilih untuk aksesibilitas langsung; tidak perlu pengetahuan domain spesialis. Lokakarya 2 dan 3 beroperasi pada framing yang kelompok Anda hasilkan dari dataset ini.

### 7.1 Problem A: Paddy Doctor (ACM 2023) [Kelompok A]

**Dataset:** 16.225 gambar daun padi yang dianotasi dalam 13 kelas (12 penyakit dan daun sehat), dikumpulkan dari ladang padi sebenarnya menggunakan kamera ponsel. Gambar diambil di bawah pencahayaan dan latar belakang lapangan yang alami, bukan kondisi lab. Mencakup set tambahan gambar inframerah (sedang dalam rilis). Tanaman Asia Tenggara; kondisi sebanding dengan pertanian padi Indonesia.

**Situasi:** Seorang mahasiswa mengusulkan: "Saya akan menggunakan dataset ini untuk mengklasifikasikan penyakit padi menggunakan CNN."

**Pertanyaan untuk dijawab kelompok Anda:**

1. Apa entitasnya? (Daun? Tanaman? Lahan? Kunjungan petani?) Apa yang berubah bergantung pada pilihan Anda?

2. Output yang diusulkan mahasiswa adalah "kelas penyakit." Tapi perhatikan 12 kelas penyakit: mencakup penyakit jamur (Blast, Brown spot, Downy Mildew), penyakit bakteri (Bacterial Leaf Blight, Bacterial Leaf Streak), terkait hama (Hispa, Leaf Roller, berbagai penggerek), dan terkait virus (Tungro). Pilihan Output lain apa yang mungkin pada dataset yang sama? Sebutkan setidaknya tiga alternatif. Apakah salah satunya menciptakan pertanyaan riset yang lebih menarik atau lebih berguna?

3. Mahasiswa mengusulkan klasifikasi CNN. Apakah ada gap di Middle, atau apakah Middle-nya sepenuhnya standar? Kalau standar, apakah masih ada pertanyaan riset yang valid? Apa yang akan Anda ubah untuk menghadirkan gap yang sesungguhnya ada?

4. Apakah framing yang diusulkan lulus cek temporal/kausal? Kapan model ini akan di-deploy, dan apa yang perlu dilakukan pengguna untuk menggunakannya?

5. Sebelum mencari, apakah Anda menduga "klasifikasi penyakit padi dengan CNN" sudah jenuh? Kalau literatur kemudian mengkonfirmasi bahwa itu jenuh, ubah arah apa yang akan menciptakan framing yang lebih menarik?

---

### 7.2 Problem B: NusaX (EACL 2023, Outstanding Paper) [Kelompok B]

**Dataset:** Korpus paralel berkualitas tinggi yang mencakup analisis sentimen dan terjemahan mesin dalam 12 bahasa: Indonesia, Inggris, dan 10 bahasa lokal Indonesia: Aceh, Bali, **Banjar**, Bugis, Madura, Minangkabau, Jawa, Ngaju, Sunda, dan Batak Toba. Diterjemahkan oleh penutur asli dan diverifikasi oleh penutur asli. Dua tugas: (1) analisis sentimen (positif / negatif / netral) per teks, (2) terjemahan mesin antar pasangan bahasa. Tersedia di GitHub di bawah CC-BY-SA.

**Situasi:** Seorang mahasiswa berkata: "Saya ingin melakukan analisis sentimen pada teks Banjar menggunakan IndoBERT."

**Pertanyaan untuk dijawab kelompok Anda:**

1. Definisikan entitas dengan teliti. Apakah satu kalimat? Satu ulasan? Satu paragraf? Apakah dataset asli membatasi pilihan Anda?

2. Mahasiswa mengusulkan klasifikasi sentimen (3 kelas). Pilihan Output lain apa yang mungkin pada dataset yang sama? Pertimbangkan: estimasi kualitas terjemahan, perbandingan transfer lintas bahasa, perbandingan berbasis leksikon vs. berbasis model, generalisasi few-shot ke bahasa yang tidak terlihat.

3. Middle yang diusulkan mahasiswa: "fine-tune IndoBERT pada contoh Banjar." Apakah ada gap? Apakah framing ini baru? Usulkan Middle alternatif yang punya gap yang sesungguhnya ada.

4. Dataset ini dibuat dengan menerjemahkan dari bahasa Indonesia. Apa implikasinya bagi hubungan antara contoh Banjar dalam dataset dan teks Banjar yang terjadi secara alami? Apakah ada potensi masalah validitas? Bagaimana Anda bisa mengatasinya atau mempelajarinya?

5. NusaX mencakup 10 bahasa lokal. Sebagian besar paper tentang dataset ini mempelajari bahasa Indonesia atau bahasa lokal yang paling kaya sumber daya. Sudut framing apa yang dibuka oleh data **khusus Banjar** yang akan relevan secara lokal dan kurang jenuh? (Catatan: Banjar terutama dituturkan di Kalimantan.)

---

## 8. Bank Dataset Tambahan untuk Latihan Mandiri

Dataset di bawah ini untuk tugas di rumah, atau untuk putaran latihan kedua setelah sesi. Masing-masing dijelaskan secara ringkas. Untuk setiap dataset, Anda harus bisa menghasilkan dekomposisi lengkap secara mandiri.

---

### Dataset 1: CAPTURE-24 (Scientific Data, 2024)

**Deskripsi:** 3.883 jam data akselerometer pergelangan tangan dari 151 peserta yang memakai perangkat secara terus-menerus setidaknya 24 jam masing-masing dalam kondisi kehidupan sehari-hari. Lebih dari 200 anotasi aktivitas per peserta, mencakup aktivitas waktu luang, olahraga, dan aktivitas pekerjaan. Dirilis 2024; dataset aktivitas bebas pergelangan tangan terbesar yang tersedia saat ini.

**Pertanyaan dekomposisi:**

- Entitasnya tidak jelas. Akselerometer merekam sinyal kontinu sepanjang hari penuh. Usulkan setidaknya empat pilihan entitas yang berbeda dan jelaskan apa yang berubah dengan masing-masing.
- Sebutkan setidaknya lima pilihan Output yang berbeda pada dataset ini. Untuk masing-masing, gambarkan bentuk tensor output. Mana yang regresi? Klasifikasi? Output sequence?
- Pendekatan umum: ekstrak fitur buatan tangan dari setiap jendela 30 detik, klasifikasikan dengan random forest. Gambarkan Middle ini. Apakah ada gap? Usulkan Middle alternatif yang punya gap yang sesungguhnya ada.
- Seorang mahasiswa mengusulkan: "Prediksi apakah peserta akan mengembangkan kondisi kesehatan dari pola aktivitas mereka." Apakah lulus cek temporal/kausal? Informasi spesifik apa yang perlu Anda ketahui untuk menyatakannya valid atau tidak valid?
- Dataset ini punya label untuk 200+ kategori aktivitas. Dokter mungkin hanya peduli dengan 4 kelas kasar. Terapis rehabilitasi peduli apakah latihan yang diresepkan secara spesifik sudah dilakukan. Masing-masing adalah framing yang berbeda. Pilih satu dan tentukan sepenuhnya: entitas, representasi input, bentuk output, dan di mana letak gap-nya.

---

### Dataset 2: CDDM - Crop Disease Domain Multimodal (ECCV 2024)

**Deskripsi:** 137.000 gambar penyakit tanaman yang dipasangkan dengan 1 juta pasangan tanya-jawab yang mencakup identifikasi penyakit, deskripsi gejala, penilaian keparahan, dan rekomendasi penanganan. Dirancang untuk visual question answering (VQA) dan pembelajaran multimodal dalam setting pertanian. VLM yang di-fine-tune (menggunakan LoRA) adalah pendekatan baseline. Tersedia di GitHub.

**Pertanyaan dekomposisi:**

- Paper asli menyusun ini sebagai masalah VQA (gambar + pertanyaan → jawaban teks bebas). Apakah itu satu-satunya framing? Pasangan (Input, Output) lain apa yang ada pada data ini?
- Seorang mahasiswa berkata "Saya ingin mengklasifikasikan jenis penyakit dari gambar, mengabaikan teks." Apa yang sudah dilepaskan oleh mahasiswa ini? Apa yang sudah didapat?
- Pasangan gambar + tanya-jawab menciptakan input multimodal. Gambarkan Middle untuk memprediksi keparahan penyakit sebagai output ordinal 4-level dari (gambar + pertanyaan terstruktur). Di mana letak gap-nya?
- Cek temporal/kausal: kalau Anda adalah petani di lapangan, informasi apa yang benar-benar Anda punya, dan apa yang ingin Anda ketahui?
- Fine-tuning LoRA dari VLM digunakan sebagai baseline. Middle alternatif apa yang lebih ringan untuk deployment dan masih berguna?

---

### Dataset 3: FastMRI Prostate (Scientific Data, 2024)

**Deskripsi:** 312 pasien kanker prostat, MRI biparametrik (T2-weighted + diffusion-weighted), dengan anotasi untuk kemungkinan kanker prostat pada tingkat irisan, volume, dan pemeriksaan. Mencakup data k-space mentah (jarang; sebagian besar dataset medis hanya merilis DICOM). 47.468 irisan yang dianotasi dari 1.560 volume.

**Pertanyaan dekomposisi:**

- Tiga tingkat anotasi ada: tingkat irisan, volume, pemeriksaan. Masing-masing mendefinisikan entitas yang berbeda. Apa yang berubah dengan setiap pilihan? Entitas mana yang paling masuk akal secara klinis untuk skrining, dan mengapa?
- Output "kemungkinan kanker prostat" sudah dinyatakan. Tapi apakah itu biner (kanker / tidak ada kanker), ordinal (skala PI-RADS 1-5), atau probabilitas kontinu? Masing-masing adalah pertanyaan riset yang berbeda. Apa yang berubah di Middle untuk setiap pilihan Output?
- Sebagian besar dataset gambar medis hanya merilis gambar yang sudah direkonstruksi. Dataset ini menyertakan data k-space mentah. Representasi Input baru apa yang dimungkinkan oleh k-space mentah yang tidak bisa dilakukan gambar DICOM? Komponen Middle baru apa yang diperlukan?
- Seorang mahasiswa mengusulkan: "Saya akan melatih CNN pada gambar MRI untuk mengklasifikasikan kanker." Cek temporal/kausal: pada titik mana dalam alur kerja klinis prediksi dibutuhkan, dan informasi apa yang tersedia? Apakah framing lulus?
- Biparametrik berarti dua urutan MRI (T2 + diffusion). Apa tiga kemungkinan pilihan Input mengenai dua urutan ini? Gap Middle apa yang terbuka saat Anda memilih untuk memakai keduanya?

---

### Dataset 4: SA-FARI (arXiv 2024)

**Deskripsi:** 11.609 video camera trap dari 741 lokasi di 4 benua, mencakup 99 kategori spesies dan sekitar 10 tahun (2014-2024). Dianotasi secara padat dengan bounding box, segmentation mask, label spesies, dan tracklet identitas hewan (16.224 identitas hewan unik). Dirancang sebagai benchmark untuk multi-animal tracking (MAT). Distribusi spesies long-tail: banyak spesies muncul jarang. Dirilis open-source oleh Conservation X Labs.

**Pertanyaan dekomposisi:**

- Dataset ini dirancang untuk multi-animal tracking. Tapi tracking bukan satu-satunya tugas yang mungkin. Sebutkan setidaknya lima pasangan (Input, Output) lain pada data ini. Untuk masing-masing, tentukan entitas, bentuk output, dan untuk apa hasilnya berguna.
- Peneliti konservasi peduli tentang estimasi populasi, kesehatan spesies, pola perilaku, dan indikator perburuan liar. Petakan masing-masing kebutuhan dunia nyata ini ke (bentuk Output, pilihan entitas) yang spesifik. Apakah semuanya layak dari video camera trap?
- Seorang mahasiswa berkata: "Saya akan menghitung hewan per spesies per video." Ini terdengar sederhana. Apa sub-masalah di Middle? Gambarkan pipeline langkah demi langkah. Langkah mana yang ada di Big Map, dan mana yang mewakili gap?
- Distribusi long-tail berarti beberapa spesies muncul dalam ratusan video, yang lain hanya satu atau dua. Ini bukan sekadar masalah ketidakseimbangan kelas. Ini adalah tantangan mendasar untuk generalisasi. Bagaimana ini membentuk pertanyaan riset? Framing Output seperti apa yang secara langsung mengatasi tantangan long-tail?
- Video camera trap punya proporsi besar frame kosong (tidak ada hewan). "Apakah ada hewan?" adalah masalah klasifikasi biner. "Jika ada, spesies apa?" adalah masalah multikelas. "Jika ada, berapa banyak?" adalah masalah penghitungan/regresi. Ketiganya bisa dirangkai atau diselesaikan bersama. Gambarkan setidaknya dua desain Middle berbeda untuk masalah gabungan dan identifikasi di mana letak gap setiap desain berada.

---

### Dataset 5: Transkrip Stand-Up Comedy Indonesia dengan Anotasi Tawa (Data in Brief, 2025)

**Deskripsi:** 3.934 transkrip video stand-up comedy Indonesia dari saluran YouTube Kompas TV, berisi 2,8 juta kata dan 17.394 peristiwa tawa penonton yang dianotasi. Setiap entri mencakup metadata video, transkrip asli, transkrip bersih, jumlah tawa, dan timestamp. Hanya teks (tanpa audio). Bahasa Indonesia. Dirilis di Mendeley Data di bawah CC-BY. Dataset multibahasa terpisah (StandUp4AI, EMNLP 2025) mencakup beberapa bahasa termasuk Indonesia dengan anotasi audio dan multimodal.

**Pertanyaan dekomposisi:**

- Anotasi memberikan peristiwa tawa per video. Apa setidaknya empat pilihan Output yang berbeda dengan anotasi ini? Untuk masing-masing, tentukan bentuk dan entitasnya.
- Seorang mahasiswa mengusulkan: "Saya akan melatih classifier untuk memprediksi apakah sebuah kalimat lucu." Ini terdengar seperti deteksi humor. Apakah lulus cek temporal/kausal? Apa yang sebenarnya akan dilakukan sistem yang di-deploy, dan siapa yang akan menggunakannya?
- Dataset ini hanya berisi transkrip. Video asli ada di YouTube dan mencakup informasi audio, visual, dan gestur performer. Framing (Input, Output) baru apa yang menjadi mungkin jika Anda memasukkan audio atau video? Komponen Middle baru apa yang diperlukan?
- "Prediksi tawa" adalah masalah sequence-to-token: memprediksi momen mana dalam pertunjukan komedi yang akan memancing tawa. Definisikan tugas ini secara formal: entitas, bentuk Input, bentuk Output. Apa Middle-nya? Apakah ada gap?
- Humor bersifat spesifik budaya. Dataset ini adalah stand-up comedy Indonesia dari saluran televisi nasional. Keterbatasan apa yang ini terapkan pada validitas model yang dipelajari apa pun? Apakah kekhususan budaya membuatnya lebih atau kurang baru sebagai sudut riset?

---

### Dataset 6: AI4Food-NutritionDB (Multimedia Tools and Applications, 2024)

**Deskripsi:** 500.000+ gambar makanan yang diorganisir ke dalam taksonomi hierarkis 4-level yang berasal dari rekomendasi otoritas kesehatan nasional dan internasional: 6 tingkat nutrisi → 19 kategori utama (mis. "Daging") → 73 subkategori (mis. "Daging Putih") → 893 produk makanan spesifik (mis. "Ayam"). Dibuat dengan mengagregasi 7 dataset gambar makanan yang sudah ada (UECFood-256, Food-101, Food-11, FruitVeg-81, MAFood-121, ISIA Food-500, VIPER-FoodNet) di bawah taksonomi terpadu. Tiga tugas klasifikasi yang di-benchmark: tingkat kategori (19 kelas), subkategori (73 kelas), produk (893 kelas).

**Pertanyaan dekomposisi:**

- Dataset mendukung tiga granularitas klasifikasi (19 / 73 / 893 kelas). Ini bukan sekadar tiga versi masalah yang sama. Mereka mewakili pertanyaan riset yang berbeda tentang aspek pengenalan makanan yang berbeda. Apa kasus penggunaan hilir yang realistis untuk setiap granularitas? Apakah kasus penggunaan menentukan entitasnya?
- Taksonomi punya 6 tingkat nutrisi yang mengodekan informasi relevansi kesehatan (mis. "makan setiap hari" vs. "makan jarang"). Tingkat nutrisi ini bukan label klasifikasi dalam benchmark asli, tapi ada dalam data. Framing Output baru apa yang dimungkinkan ini? Apa entitas, bentuk output, dan Middle-nya?
- Dataset dibuat dengan menyusun ulang 7 dataset yang sudah ada di bawah taksonomi bersama. Apa artinya ini untuk distribusi data? Apakah semua 893 kelas terwakili secara setara? Sudut riset apa yang diciptakan oleh komposisi ulang itu sendiri (petunjuk: domain shift antar dataset sumber)?
- Seorang mahasiswa ingin memprediksi apakah makanan "sehat" (biner). Ini terdengar sederhana. Apakah lulus cek temporal/kausal? Apa masalah definitional dengan Output ini? Bagaimana Anda akan merumuskannya lebih tepat?
- Gambar dalam dataset adalah gambar produk makanan (item yang terisolasi), bukan makanan yang tersaji atau hidangan. Pelacak diet yang sebenarnya perlu menangani foto sepiring makanan campuran. Apa yang diciptakan oleh gap antara dataset dan penggunaan dunia nyata ini sebagai sudut riset?

---

## 9. Pitfalls & Miskonsepsi

**"Saya tidak perlu memeriksa literatur - idenya jelas baru."** Metode standar tampak baru bagi yang baru mempelajarinya. Jebakan "baru bagi saya" adalah salah satu penyebab paling umum framing yang lemah. Jalankan pemeriksaan literatur pada setiap framing, terutama yang tampak jelas menjanjikan.

**"5 Whys cukup sebagai kerangka framing."** 5 Whys berguna untuk mempertajam topik yang luas menjadi pertanyaan yang lebih konkret. Tapi ia tidak membantu Anda mengidentifikasi entitas, mendefinisikan bentuk Output, menguraikan Middle, atau mengidentifikasi di mana letak gap-nya. Gunakan 5 Whys sebagai alat pemanasan, bukan sebagai kerangka utama.

**"Satu dataset, satu proyek."** Ini adalah salah satu miskonsepsi paling umum. Seperti yang ditunjukkan oleh contoh Paddy Doctor dan NusaX, satu dataset mendukung banyak pertanyaan riset yang sah. Menghasilkan menu framing - bukan terjun langsung ke satu framing - adalah cara untuk mendapatkan yang paling menarik.

**"Saya akan mulai menulis kode dan menyusun framing sambil jalan."** Framing yang buruk tidak menjadi lebih baik dengan eksekusi lebih banyak. Tiga minggu capstone dengan framing yang salah menghasilkan tiga minggu kerja yang tidak bisa dipublikasikan. Waktu yang dihabiskan untuk framing di W11 adalah investasi dengan imbal hasil tertinggi.

**"Framing saya lulus cek temporal karena saya tidak melihat ada masalah."** Cek temporal memerlukan pertanyaan eksplisit: apakah versi yang di-deploy dari model ini akan punya akses ke setiap elemen input pada saat perlu membuat prediksi? Tidak melihat masalah tidak sama dengan lulus. Periksa secara sistematis.

**"Gap saya di Middle berarti saya perlu metode yang benar-benar baru."** Anggapan ini tidak tepat. Kasus B (rangkaian langkah yang sudah dikenal) sudah cukup sebagai kontribusi jika kombinasinya belum pernah diterapkan pada Input/Output ini. Banyak riset yang dipublikasikan adalah Kasus B. Yang penting adalah bisa mengidentifikasi dengan tepat apa kontribusinya - rangkaian itu sendiri dan validasinya - bukan mengklaim lebih dari itu.

---

## 10. Antara W11 dan W12

Ini adalah **kerja mandiri**. Setiap orang bekerja sendiri, meskipun berada dalam kelompok yang sama saat kelas.

### Memilih Dataset

Anda punya tiga pilihan. Pilih satu:

**Pilihan 1: Lanjutkan dari dataset kelas.**
Jika framing Lokakarya 1 kelompok Anda tampak menjanjikan, kembangkan lebih lanjut secara mandiri. Anda tidak mulai dari awal. Anda menambahkan apa yang dibangun kelompok. Hasilkan setidaknya 2 framing baru sendiri (di luar yang dihasilkan kelompok), lalu lakukan pemeriksaan literatur menyeluruh pada keseluruhan set. Daftar pendek individual Anda boleh tumpang tindih dengan kerja kelompok, tapi harus menggunakan penalaran yang mandiri.

**Pilihan 2: Pilih dataset dari bank tambahan.**
Pilih dataset apa pun dari bank di §8. Mulai segar: hasilkan 3-5 framing Anda sendiri, jalankan filter literatur lengkap, hasilkan daftar pendek Anda.

**Pilihan 3: Bawa dataset sendiri.**
Jika Anda sudah tahu proyek mana yang ingin dikejar (mis. dari menu proyek Bu Fatma yang didanai), Anda bisa langsung mengerjakan dataset itu. Persyaratan yang sama: 3-5 framing, filter literatur, daftar pendek.

Apa pun pilihannya, luarannya sama: satu set framing kandidat dan daftar pendek untuk dipresentasikan di W12.

---

### Fase 1: Curah Gagasan Dekomposisi (3-4 jam)

Hasilkan 3-5 framing kandidat. Jadilah kreatif. Buat framing yang benar-benar berbeda - entitas berbeda, output berbeda, Middle berbeda, batasan berbeda. Jangan konsultasikan literatur selama fase ini.

Gunakan template dekomposisi (§13) untuk setiap framing.

### Fase 2: Pemeriksaan Literatur (3-4 jam)

Jalankan loop filter pada setiap framing. Klasifikasikan, ubah arah, hapus. Gunakan alat pencarian dan sinyal kejenuhan dari §3.3.

---

## 11. Luaran W11

Kirim ke RA sebelum W12:

1. **Dokumen dekomposisi** (semua 3-5 framing menggunakan template)
2. **Tabel pemeriksaan literatur** (satu baris per framing)
3. **Paragraf daftar pendek:**
   - **Framing utama** (dengan kalimat cek kebaruan yang dilengkapi)
   - **Framing cadangan**
   - **Framing yang dihapus** beserta alasan masing-masing

RA memeriksa kelengkapan. Bu Fatma memeriksa kualitas riset di pertemuan W12. Datang siap mempresentasikan dan mempertahankan framing utama Anda.

---

## 12. Checklist: Sebelum Presentasi di W12

**Definisi masalah:**

- [ ] Pertanyaan riset dinyatakan (entitas + predikat + tipe jawaban)
- [ ] Entitas dipilih dan dijustifikasi secara eksplisit
- [ ] Representasi input dipilih secara eksplisit dari beberapa opsi
- [ ] Bentuk dan semantik output ditentukan
- [ ] Cek temporal/kausal lulus

**Kebaruan:**

- [ ] Pemeriksaan literatur dijalankan pada semua framing kandidat
- [ ] Setiap framing diklasifikasikan (baru / sebagian terjawab / jenuh)
- [ ] Jenis kebaruan dinamai untuk framing utama
- [ ] Kalimat cek kebaruan dilengkapi

**Middle:**

- [ ] Middle diurai langkah demi langkah
- [ ] Gap dilokasikan secara tepat
- [ ] Tipe kasus diidentifikasi (A / B / C / D)

**Menu framing:**

- [ ] 3-5 framing kandidat dihasilkan (benar-benar berbeda)
- [ ] Framing utama diidentifikasi dengan bukti literatur
- [ ] Framing cadangan diidentifikasi
- [ ] Framing yang dihapus dicatat beserta alasannya

**Jika tiga atau lebih kotak belum dicentang, framing belum siap dipresentasikan.**

---

## 13. Template Dekomposisi (simpan sebagai referensi)

```
PERTANYAAN RISET (satu kalimat: entitas + predikat + tipe jawaban):

-- INPUT ----------------------------------------------------------
Entitas:
Representasi input (opsi yang dipertimbangkan):
Input yang dipilih + justifikasi:
Bentuk tensor:
Cek temporal/kausal: LULUS / GAGAL
  Jika gagal: framing yang direvisi:

-- OUTPUT ---------------------------------------------------------
Semantik output:
Bentuk tensor:
Alternatif yang dipertimbangkan:

-- MIDDLE ---------------------------------------------------------
Langkah 1: [nama]  →  Baris peta besar: YA / TIDAK
Langkah 2: [nama]  →  Baris peta besar: YA / TIDAK
Langkah 3: [nama]  →  Baris peta besar: YA / TIDAK
Lokasi gap: [langkah mana yang tidak punya jawaban standar?]
Deskripsi gap: [apa tepatnya yang belum terselesaikan?]

-- NOVELTY -------------------------------------------------------
Jenis kebaruan:
Karya terkait terdekat:
Yang membuat framing ini berbeda:
Cek kebaruan: "Literatur yang ada sudah melakukan ___.
              Karya kami melakukan ___, yang berbeda karena ___.
              Ini penting karena ___."

-- LITERATUR -----------------------------------------------------
Klasifikasi: BARU / SEBAGIAN TERJAWAB / JENUH
Bukti (1-2 paper yang ditemukan, atau ketiadaannya):
Jika sebagian terjawab: ubah arah ke:
```

---

## 14. Refleksi

1. **Latihan dekomposisi.** Ambil topik: "Saya ingin mendeteksi emosi dari audio." Jalankan kerangka Input → Middle → Output. Gambarkan setidaknya tiga framing yang berbeda dengan entitas, input, output, dan lokasi gap yang berbeda. Mana yang tampak paling menarik, dan mengapa?

2. **Kejenuhan vs. gap yang terverifikasi.** Pilih satu dari enam dataset di §8. Tanpa mencari literatur dulu, hasilkan tiga framing. Kemudian jalankan filter literatur cepat. Apakah ada yang jenuh? Apakah ada yang mengarah ke gap yang tampaknya ada?

3. **Mengapa cek temporal itu penting.** Cari contoh paper yang kemungkinan punya masalah cek temporal. Apa yang salah dengan framing-nya? Bagaimana Anda akan memperbaikinya?

---

## 15. Bacaan Lanjutan

- **Template dekomposisi** (§13 bab ini) tersedia sebagai referensi untuk dipakai saat membaca setiap paper baru.
- **Checklist sebelum W12** (§12 bab ini) berguna untuk memverifikasi kesiapan framing sebelum presentasi.
- **[`template/docs/prereg_template.md`](https://github.com/muhammad-zainal-muttaqin/Module-DS/blob/master/template/docs/prereg_template.md)** adalah template pre-registration yang akan diisi setelah framing disetujui di W12.
- **Schwartz - *The Importance of Stupidity in Scientific Research*** (2008, 2 halaman). Tulisan ini membahas mengapa merasa "bingung" di depan pertanyaan yang sulit adalah tanda kemajuan, bukan kegagalan.

---

## Lanjut ke Capstone

Menu framing sudah siap. Daftar pendek sudah ditulis. Datang ke W12 dengan dokumen dekomposisi, tabel pemeriksaan literatur, dan paragraf daftar pendek.

Di W12, Anda mempresentasikan dan mempertahankan framing utama Anda. Setelah disetujui, fase eksekusi dimulai.

Buka [Capstone - Proyek Riset](12_Capstone.md) ketika siap.

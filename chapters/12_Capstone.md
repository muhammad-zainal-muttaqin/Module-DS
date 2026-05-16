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
| ▶ 12 | Capstone - Proyek Riset | 12-15 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | – |
| 14 | [Lampiran](14_Lampiran.md) | – |
| 15 | [Panduan Instruktur](15_Panduan_Instruktur.md) | – |

</details>

---

# 12 · Capstone - Proyek Riset

> *Capstone bukan ujian terakhir. Ini adalah pertama kalinya Anda memiliki pertanyaan riset dari awal framing hingga komunikasi, dan bertanggung jawab atas setiap keputusan di antara keduanya.*

**Minggu:** 12-15
**Penanggung jawab:** Bu Fatma + RA
**Format:** Presentasi tatap muka mingguan + kerja mandiri antarsesi

---

## 0. Apa Itu Capstone

Capstone adalah proyek riset yang terbatas dan berbasis hipotesis. Anda masuk dengan framing yang sudah disetujui. Anda keluar dengan laporan riset, repositori yang dapat direproduksi, demo yang berfungsi, dan presentasi final.

Sepuluh minggu bootcamp mengajarkan cara mengeksekusi: diberi masalah yang terdefinisi dan dataset yang terdefinisi, bangun model, latih dengan benar, dan evaluasi secara jujur. Capstone meminta Anda melakukan sesuatu yang lebih sulit: memiliki pertanyaan riset dari awal hingga akhir - merumuskannya, mengujinya, merevisinya saat bukti mendorong balik, dan mengomunikasikan apa yang benar-benar ditemukan.

Prosesnya tidak akan berjalan persis seperti yang direncanakan. Itu bukan tanda ada yang salah. Proyek riset yang berjalan persis seperti yang direncanakan kemungkinan tidak menanyakan pertanyaan yang sesungguhnya. Momen meninjau ulang - ketika hasil Eksperimen 1 memaksa Anda merevisi hipotesis dan desain - adalah pusat capstone, bukan jalan menyimpang darinya.

Capstone yang baik punya:
- Gap yang sesungguhnya di Middle. Sesuatu yang tidak bisa diselesaikan oleh pipeline standar yang diterapkan apa adanya
- Cakupan yang bisa ditutup dalam 3 minggu kerja yang fokus
- Artefak publik: repositori yang bisa di-clone dan dijalankan orang lain, laporan yang bisa dibaca orang lain secara mandiri, demo yang bisa dicoba orang lain

Cakupannya boleh sederhana. Proyek kecil yang dieksekusi dengan baik lebih berharga daripada proyek ambisius yang setengah selesai.

---

## 1. Alur Empat Minggu

![Timeline Capstone 4 Minggu: Filter, Rethink, Communicate, Submit](../figures/fig10a_capstone_timeline.svg)

Capstone berjalan empat minggu. W11 adalah framing (dibahas di dokumen Research Framing). W12-W15 adalah capstone yang sebenarnya.

| Minggu | Tema | Yang sedang dikerjakan |
|---|---|---|
| 12 | Filter dan komitmen | Presentasikan framing, dapatkan persetujuan, jalankan Eksperimen 1 |
| 13 | Tinjau ulang dan iterasi | Presentasikan hasil, tinjau ulang, rancang dan jalankan Eksperimen 2 |
| 14 | Komunikasikan | Presentasikan Eksperimen 2, selesaikan penulisan, finalisasi demo, presentasi final |
| 15 | Kumpulkan | Poles luaran berdasarkan umpan balik W14; kumpulkan laporan, repo, demo |

Setiap minggu punya satu pertemuan tatap muka dan satu periode kerja antarsesi. Pertemuan tatap muka berbasis presentasi: Anda menunjukkan apa yang Anda punya, kelompok mempertanyakannya, Bu Fatma memberi arahan. Tidak ada ceramah. Bu Fatma dan RA hadir untuk membimbing, bukan mengajar.

---

## 2. W12: Filter dan Komitmen

### 2.1 Sesi Kelas (90 menit)

**Format:** Presentasi individual, 15 menit masing-masing. Pusat pertemuan ini adalah pertahanan framing, bukan desain eksperimen.

Setiap peserta mempresentasikan:
- Framing kandidat dari W11 (singkat, 2 menit masing-masing): entitas, output, input, gap
- Temuan literatur: framing mana yang bertahan, mana yang dibuang, dan mengapa
- Framing utama yang diusulkan dan cadangan, dengan Middle yang digambar di papan (kotak, panah, gap ditandai)

Kelompok dan Bu Fatma memberikan tanggapan terhadap framing:
- "Pemeriksaan literatur menemukan paper X. Apakah paper itu mengisi gap yang Anda identifikasi?"
- "Middle Anda tidak punya gap. Seluruh pipeline-nya standar. Apa yang akan Anda ubah?"
- "Framing ini lulus cek temporal, tapi apakah input-nya benar-benar ada pada saat prediksi dalam skenario deployment yang realistis?"
- "Mengapa framing ini daripada cadangan? Apa yang membuat gap ini lebih menarik?"

**Bu Fatma menyetujui atau mengembalikan setiap framing.** Framing yang dikembalikan harus direvisi. Peserta tidak memulai desain eksperimen sebelum framing disetujui. Perkirakan 1-2 peserta perlu diskusi di hari yang sama dengan Bu Fatma atau RA sebelum framing-nya diloloskan.

Setelah framing disetujui, peserta bisa membuat sketsa kasar arah eksperimen (baseline apa, intervensi apa, metrik apa). Tapi ini hanya sketsa verbal singkat di akhir slot mereka, bukan pre-registration formal. Pre-registration lengkap dibuat antara pertemuan ini dan W13, setelah peserta punya waktu untuk memikirkan desain dengan benar.

### 2.2 Antara W12 dan W13

**Pre-registration Eksperimen 1:** ditulis dan di-commit ke repositori sebelum ada kode yang dijalankan. Ambil framing yang sudah disetujui dan pikirkan desain eksperimen dengan cermat. Pre-registration menentukan:

```
Hipotesis: [apa yang diprediksi, dalam satu kalimat]
Kondisi:
  - Baseline: [spesifikasi eksak: arsitektur, setup training, evaluasi]
  - Metode: [spesifikasi eksak: apa yang berbeda dari baseline]
  - Kontrol: [kondisi tambahan yang mengisolasi klaim spesifik]
Metrik: [metrik utama + metrik sekunder]
Kriteria falsifikasi: [hipotesis dinyatakan gugur jika ...]
Seeds: [seed mana, berapa banyak]
Hasil yang diharapkan: [apa yang diharapkan terjadi jika hipotesis benar]
```

Commit file ini sebelum menjalankan eksperimen apa pun. Kalau perlu menyimpang dari pre-registration selama eksekusi, dokumentasikan penyimpangan dan alasannya. Penyimpangan itu sendiri bukan masalah, tapi penyimpangan yang tidak terdokumentasi adalah.

**Eksperimen 1: mulai dijalankan.** Minimal: baseline dan kondisi utama, keduanya dengan 3 seed, semua run dicatat, hasil disimpan. Tidak masalah jika eksperimen masih berjalan saat W13 tiba. Bawa apa pun yang sudah ada.

**Dokumen tinjauan ulang:** mulai dibuat segera setelah ada hasil apa pun, bahkan yang parsial. Tidak perlu menunggu semuanya selesai. Format:

```
Pengamatan (bukan kesimpulan):
  - Apa yang sudah diukur sejauh ini
  - Apa yang ditunjukkan angka-angka
  - Di mana hasil berbeda dari ekspektasi

Keyakinan yang diperbarui:
  - Apa yang sekarang dicurigai, berdasarkan apa yang diamati
  - Mengapa hasilnya berbeda dari yang diharapkan (jika berbeda)

Dua paper baru:
  - Paper 1: [sitasi + satu kalimat kontribusinya]
  - Paper 2: [sitasi + satu kalimat]
  (Ditemukan setelah melihat hasil, bukan dari tinjauan literatur W12)

Arah Eksperimen 2:
  - Apa yang ingin diuji selanjutnya, dan mengapa
  - Bagaimana hubungannya dengan apa yang Eksperimen 1 tunjukkan
```

Bawa dokumen tinjauan ulang ke W13. Tidak perlu lengkap. Harus jujur tentang apa yang sudah dilihat sejauh ini.

---

## 3. W13: Pikirkan Ulang dan Iterasi

### 3.1 Sesi Kelas (90 menit)

**Format:** Presentasi individual, 15 menit masing-masing. Fokusnya adalah tinjauan ulang, bukan hasil. Bawa apa pun yang ada.

Hasil Eksperimen 1 mungkin parsial atau masih awal. Itu tidak masalah. Riset jarang tiba tepat waktu. Yang penting adalah Anda sudah melihat hasil apa pun yang ada dan benar-benar memikirkan artinya.

Setiap peserta mempresentasikan:
- Hasil Eksperimen 1 (5 menit): apa yang dijalankan, apa yang terlihat sejauh ini, meskipun tidak lengkap - satu plot atau tabel
- Tinjauan ulang (5 menit): apa yang diajarkan ini, apa yang sekarang dicurigai, apa yang ingin diuji selanjutnya
- Arah Eksperimen 2 (3 menit): hipotesis kasar, kondisi kasar, mengapa ini mengikuti dari apa yang dilihat
- Tanggapan kelompok + Bu Fatma (2 menit)

Pertanyaan yang mungkin diajukan kelompok dan Bu Fatma:
- "Penjelasan alternatif apa yang bisa menghasilkan hasil yang sama ini tanpa metode Anda berkontribusi apa pun?"
- "Apa dari hasil itu yang benar-benar memaksa perubahan dalam tinjauan Anda? Bisakah Anda menunjuk angka spesifik?"
- "Dua paper baru Anda. Apakah Anda menemukannya sebelum atau setelah memutuskan arah Eksperimen 2?"
- "Kalau Eksperimen 1 menghasilkan arah yang berlawanan, seperti apa Eksperimen 2 Anda?"
- "Kalau Eksperimen 2 juga menghasilkan hasil yang tidak meyakinkan, apa rencana cadangan Anda?"

Dua pertanyaan terakhir adalah yang paling diagnostik. Peserta yang tidak bisa menjawab "kalau Eksperimen 1 hasilnya terbalik" berarti belum benar-benar terlibat dengan hasilnya. Mereka menulis tinjauan ulang yang sudah direncanakan sebelumnya.

Tinjauan ulang adalah luaran terpenting dari capstone. Tinjauan ulang yang berkata "hasil berjalan sesuai ekspektasi, saya sekarang akan menjalankan yang sudah saya rencanakan dari awal" bukan tinjauan ulang. Tinjauan ulang yang sesungguhnya mengubah sesuatu: hipotesis, kondisi, metrik, atau framing output. Perubahan itu bisa dilacak ke sesuatu yang spesifik yang diamati.

**Pre-registration Eksperimen 2:** pada akhir pertemuan atau segera setelahnya, setiap peserta meng-commit pre-registration untuk Eksperimen 2. Bu Fatma mengkonfirmasi arahnya masuk akal sebelum komputasi besar dijalankan.

### 3.2 Antara W13 dan W14

**Eksperimen 2: jalankan.** Disiplin yang sama seperti Eksperimen 1: kondisi yang sudah di-pre-register, 3 seed, dicatat, hasil disimpan.

**Mulai menulis.** Mulai membuat draft selama minggu ini. Jangan menunggu W15. Bahkan draft kasar dari bagian metode dan hasil membuat penulisan final jauh lebih mudah. Pendahuluan dan karya terkait bisa menyusul kemudian, saat kontribusinya sudah jelas.

**Draf demo.** Demo Streamlit atau Gradio yang berfungsi. Tidak harus dipoles. Harus bisa dijalankan. Buat mudah untuk menemukan kasus di mana model gagal, bukan hanya kasus di mana berhasil. Gunakan [lab_w12_demo_app.ipynb](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w12_demo_app.ipynb) sebagai template awal (Streamlit classifier + Gradio annotation).

---

## 4. W14: Presentasi Final

### 4.1 Sesi Kelas (120 menit, diperpanjang)

**Format:** Presentasi riset final, 20 menit masing-masing (15 menit presentasi + 5 menit tanya jawab).

Ini adalah pertemuan tatap muka terakhir. Semua hal diselesaikan di sini.

Struktur presentasi:
1. Apa pertanyaannya dan mengapa itu penting (2 menit)
2. Seperti apa Middle-nya dan di mana letak gap-nya (2 menit)
3. Eksperimen 1: apa yang dijalankan, apa yang terjadi, apa yang diajarkan (3 menit)
4. Tinjauan ulang: mengapa Eksperimen 2 berbeda dari Eksperimen 1 (2 menit)
5. Eksperimen 2: hasil, interpretasi, apa yang bisa diklaim (3 menit)
6. Kontribusi: apa yang ditunjukkan oleh karya ini, dan apa yang tidak (2 menit)
7. Keterbatasan dan kerja ke depan (1 menit)

Tanya jawab harus punya setidaknya satu pertanyaan tajam per presentasi yang menyasar bagian argumen yang paling lemah - dari Bu Fatma, RA, atau peserta lain.

**Fokus Bu Fatma saat tanya jawab:**
- "Pendahuluan Anda mengklaim X. Apakah hasil Anda benar-benar mendukung X, atau hanya sesuatu yang lebih lemah?"
- "Karya terkait Anda tidak menyebutkan paper Y. Itu adalah karya terkait terdekat. Mengapa absen?"
- "Anda bilang metodenya lebih robust. Robust dalam kondisi apa, dibanding apa? Tulis ulang untuk sesuai dengan cakupan eksperimen Anda yang sebenarnya."
- "Demo hanya menampilkan prediksi yang berhasil. Tunjukkan kasus kegagalan."

**Masalah umum yang perlu dimunculkan saat tanya jawab, bukan dibiarkan ke laporan:**
- Mengklaim berlebihan dalam kesimpulan ("metode kami membuktikan bahwa...")
- Baseline terpenting yang terlewat
- Karya terkait yang mendaftar paper tanpa menjelaskan apa yang ditemukannya
- Hasil tanpa error bar atau variansi seed

### 4.2 Antara W14 dan W15

**Tidak ada lagi eksperimen.** Semua kerja eksperimental sudah selesai.

**Selesaikan semua penulisan** berdasarkan umpan balik dari presentasi W14:
- Abstrak, pendahuluan, karya terkait, metode, hasil, diskusi, keterbatasan, kesimpulan
- 6-8 halaman, tidak termasuk gambar dan referensi
- Setiap angka dalam laporan harus bisa dilacak ke eksperimen yang sudah dicatat dengan seed dan config

**Finalisasi demo.** Demo berjalan bersih dari lingkungan yang baru. README menjelaskan apa yang dilakukan dalam 2-3 kalimat.

**Cek reproduksibilitas.** Clone repositori ke lingkungan yang baru dan ikuti README dari awal. Bisakah mereproduksi hasil utama dalam 30 menit? Kalau tidak, perbaiki sebelum pengumpulan.

---

## 5. W15: Pengumpulan Final

Tidak ada pertemuan tatap muka. W14 adalah presentasi final. W15 adalah tenggat untuk luaran yang sudah dipoles.

**Kumpulkan sebelum akhir W15:**

| Luaran | Persyaratan |
|---|---|
| Laporan final | 6-8 halaman, semua bagian lengkap dan dipoles |
| Repositori | Dapat direproduksi dari clone hingga hasil; README mencakup setup dalam waktu kurang dari 30 menit |
| Demo | Streamlit atau Gradio, berjalan dari lingkungan yang baru |
| Git tag | `v1.0` pada commit final |

Gunakan minggu antara W14 dan tenggat pengumpulan untuk:
- Merevisi berdasarkan umpan balik yang diterima saat presentasi W14
- Memoles penulisan: perketat klaim, perbaiki bagian keterbatasan, pastikan setiap angka dalam laporan bisa dilacak ke eksperimen yang sudah dicatat
- Verifikasi reproduksibilitas dari awal (clone repositori ke lingkungan yang baru dan ikuti README)
- Finalisasi demo

---

## 6. Format Sesi Kelas W12-W14

Setiap pertemuan tatap muka dalam capstone mengikuti struktur yang sama: setiap peserta mempresentasikan kerja saat ini kepada kelompok, dan kelompok - termasuk Bu Fatma dan RA - menanggapi.

Format ini membantu mencapai beberapa tujuan yang lebih sulit dicapai dalam pembimbingan satu-satu. Saat tinjauan ulang satu peserta dikenali sebagai "ini hanya eksperimen berikut yang sudah Anda rencanakan, bukan respons yang sesungguhnya terhadap data," semua peserta di ruangan menyetel ulang pemikiran mereka sendiri. Saat Bu Fatma menangkap masalah framing di W12, koreksinya terlihat oleh semua orang, bukan hanya satu orang yang framing-nya dikembalikan.

Presentasi juga memberi Bu Fatma gambaran jelas tentang posisi setiap peserta dibanding yang lain. Siapa yang benar-benar stuck? Siapa yang punya momentum? Siapa yang mengeksekusi dengan baik tapi menanyakan pertanyaan yang ternyata sudah terjawab dalam literatur? Pola-pola ini lebih mudah dilihat saat semua kerja ada di ruangan yang sama.

Pertanyaan yang diajukan saat presentasi ("apa yang akan memfalsifikasi ini?", "kalau Eksperimen 1 hasilnya terbalik, apa yang berubah?", "apakah pendahuluan Anda benar-benar sesuai dengan apa yang ditunjukkan hasil Anda?") adalah pertanyaan yang perlu Anda pelajari untuk diajukan kepada diri sendiri sebelum pertemuan. Tujuannya bukan untuk menyudutkan siapa pun. Tujuannya adalah membangun kebiasaan mengantisipasi kritik sebelum datang - yang persis itulah yang membuat peneliti menjadi lebih baik seiring waktu.

---

## 7. Peran Bu Fatma dan RA

**Bu Fatma:**
- W12: memimpin persetujuan framing, aktivitas dengan dampak tertinggi dari capstone; menangkap framing yang buruk di sini menghemat berminggu-minggu kerja
- W13: memimpin diskusi dokumen tinjauan ulang; membantu peserta melihat apa yang sebenarnya ditunjukkan hasilnya
- W14: memimpin tanya jawab pada presentasi final; fokus pada apakah klaim sesuai dengan bukti
- Antarsesi: tersedia untuk eskalasi saat peserta benar-benar stuck; meninjau pre-registration sebelum eksperimen dijalankan

**RA:**
- Memeriksa bahwa kerja antarsesi siap untuk didiskusikan sebelum pertemuan dimulai
- Mengelola waktu dan logistik selama pertemuan tatap muka
- Tetap tersedia setelah W12 untuk peserta yang framing-nya dikembalikan dan perlu merevisi
- Menandai peserta yang stuck kepada Bu Fatma lebih awal. Peserta yang masih menyiapkan pipeline data di W13 butuh percakapan, bukan kesabaran

---

## 8. Ringkasan Luaran

| Luaran | Kapan | Catatan |
|---|---|---|
| Dokumen dekomposisi (3-5 framing) | Dibawa ke W12 | Tertulis, siap dipresentasikan dan didiskusikan |
| Dokumen pemeriksaan literatur | Dibawa ke W12 | Satu tabel filter per framing |
| Pre-registration Eksperimen 1 | Setelah framing disetujui (W12) | Di-commit sebelum eksperimen pertama dijalankan |
| Dokumen tinjauan ulang + 2 paper baru | Dibawa ke W13 | Hasil parsial boleh; refleksi jujur diperlukan |
| Pre-registration Eksperimen 2 | Disepakati di atau setelah W13 | Di-commit sebelum Eksperimen 2 dijalankan |
| Presentasi final | Sesi kelas W14 | Presentasi riset (15 menit + 5 menit tanya jawab) |
| Laporan final | Tenggat W15 | 6-8 halaman, semua bagian |
| Repositori final | Tenggat W15 | Dapat direproduksi, diberi tag `v1.0` |
| Demo final | Tenggat W15 | Berjalan dari lingkungan yang baru |

---

## 9. Hal-hal yang Sering Bermasalah

Ini adalah cara paling umum proyek capstone mengalami kesulitan. Mengetahuinya lebih awal membuatnya lebih mudah ditangkap lebih awal.

**Tinjauan ulang yang bukan tinjauan ulang.** Hasil Eksperimen 1 tiba, dan peserta menulis "tinjauan ulang" yang menyatakan ulang apa yang sudah direncanakan dari awal. Eksperimen 2 terlihat identik dengan apa yang akan dijalankan terlepas dari apa yang ditunjukkan Eksperimen 1. Pertanyaan diagnostiknya: kalau Eksperimen 1 menghasilkan arah yang berlawanan, apakah Eksperimen 2 akan berbeda? Kalau tidak, tinjauan ulang ditulis sebelum hasil dibaca, bukan setelahnya.

**Ekspansi cakupan di akhir.** "Saya ingin menambahkan satu eksperimen lagi." Setiap eksperimen yang tidak ada dalam pre-registration adalah tambahan, bukan kewajiban. Tulis di bagian keterbatasan sebagai kerja ke depan. Laporan tidak akan lebih baik dengan eksperimen ketiga yang terburu-buru. Laporan akan lebih baik dengan eksperimen kedua yang dianalisis lebih hati-hati.

**Penulisan yang dimulai di minggu terakhir.** Kalau laporan ditulis dari awal di W15, hasilnya akan dangkal dan terburu-buru. Tulis bagian metode selama Eksperimen 1. Tulis bagian hasil saat eksperimen selesai. Tulis pendahuluan saat kontribusinya sudah jelas. W15 untuk memoles, bukan memulai.

**Hasil tanpa variansi.** Satu hasil dengan satu seed yang dilaporkan sebagai "89,2%" tidak memberi pembaca informasi apa pun tentang keandalan. Setiap hasil utama perlu standar deviasi dari setidaknya 3 seed. Kalau perbedaan antar kondisi lebih kecil dari standar deviasi, hasilnya tidak meyakinkan. Katakan demikian.

**Demo yang hanya menampilkan keberhasilan.** Demo yang dirancang hanya untuk menampilkan prediksi yang benar adalah artefak pemasaran, bukan alat riset. Buat mudah untuk menemukan kasus di mana model gagal. Ini adalah tanda kejujuran, dan sering mengungkap hal yang lebih menarik daripada keberhasilannya.

**Mengklaim berlebihan.** "Metode kami membuktikan bahwa X berlaku secara universal." Satu proyek dengan satu dataset dalam kondisi tertentu menunjukkan sesuatu tentang kondisi tersebut, bukan tentang dunia secara umum. Ganti "membuktikan" dengan "mengindikasikan" atau "menunjukkan, pada dataset ini dan dalam kondisi ini." Ini bukan kerendahan hati yang berlebihan; ini adalah ketepatan.

**Menyembunyikan masalah.** Peserta yang menemukan masalah data serius di W12 dan menyebutkannya pertama kali di W14 sudah kehilangan dua minggu potensi bantuan. Bawa masalah ke pertemuan segera setelah muncul. Itulah gunanya pertemuan-pertemuan ini.

---

## Refleksi

1. **Tinjauan ulang yang sesungguhnya.** Bayangkan Eksperimen 1 menunjukkan bahwa intervensi Anda tidak membantu. Tulis satu paragraf tinjauan ulang yang jujur. Apa yang akan diubah untuk Eksperimen 2? Bagaimana cara membedakan "hasil ini mengajarkan sesuatu" dari "hasil ini mengecewakan dan saya akan abaikan"?

2. **Klaim vs. bukti.** Ambil satu kesimpulan dari sebuah paper yang dibaca di W10. Tulis ulang kesimpulan itu agar sesuai dengan cakupan eksperimen yang sebenarnya - bukan yang ambisius, tapi yang akurat. Seperti apa kalimatnya?

3. **Demo sebagai alat riset.** Bayangkan Anda membangun demo untuk capstone Anda. Bagaimana cara membuatnya mudah bagi pengguna untuk menemukan kasus kegagalan? Apa tiga tipe kegagalan yang paling ingin Anda ungkap?

---

## Bacaan Lanjutan

- **[W11 - Research Framing](11_W11_Research_Framing.md)** - kerangka dekomposisi dan template, untuk referensi saat mempersiapkan pertahanan framing W12.
- **`template/docs/prereg_template.md`** - template pre-registration yang sudah ada di repo; gunakan untuk Eksperimen 1 dan 2.
- **[Rubrik Penilaian](13_Rubrik_Penilaian.md)** - rubrik capstone, untuk memahami bagaimana setiap fase dievaluasi.

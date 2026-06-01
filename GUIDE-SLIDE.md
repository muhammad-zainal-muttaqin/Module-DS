# GUIDE-SLIDE.md - Panduan Merancang Slide Pembelajaran

Panduan ini dipakai saat membuat atau merevisi slide deck instruktur di
`website/src/lib/slides/slides-XX.ts`. Tujuannya: slide yang benar-benar
mengajar, bukan slide yang hanya mendaftar definisi.

Konteks audiens: mahasiswa Ilmu Komputer semester 6 yang sudah pernah belajar
ML/DL dasar tetapi belum terbiasa berpikir seperti asisten riset. Mereka tidak
perlu diajari dari nol, tetapi tetap butuh alur penjelasan yang bertahap,
konkret, dan tidak melompat terlalu jauh.

> [!IMPORTANT]
> Panduan ini tunduk pada `CLAUDE.md` (gaya bahasa, larangan em dash, larangan
> kiasan fisik untuk konsep teknis) dan `SWEEPER.md` (anti AI-slop). Kalau ada
> yang bertabrakan, `CLAUDE.md` menang. Khususnya: jangan pakai metafora
> kotak/rak/pabrik untuk konsep teknis - lihat bagian "Objek literal, bukan
> metafora" di bawah.

---

## 1. Dua pola pengajaran - pilih sesuai jenis materi

GUIDE versi lama hanya punya satu pola (diagnostik) dan memaksakannya ke semua
materi. Itu salah. Ada dua jenis materi dan masing-masing butuh pola sendiri.

### Pola A - Diagnostik (untuk konsep yang punya gejala)

Dipakai saat konsep muncul dari sesuatu yang **bermasalah dan bisa diamati**:
loss tidak turun, shape tidak cocok, validation accuracy terlalu bagus, hasil
berubah setelah seed diganti, training divergen.

Urutan tujuh langkah (boleh dipecah ke beberapa slide):

1. Situasi riset yang memicu kebutuhan terhadap konsep.
2. Observasi awal yang bisa dilihat mahasiswa.
3. Penjelasan teknis dengan contoh kecil yang konkret.
4. Konsekuensi terhadap eksperimen.
5. Kesalahan umum atau miskonsepsi.
6. Pertanyaan diagnosis untuk diskusi kelas.
7. Kalimat kunci penutup busur konsep (lihat aturan frekuensi di bagian 4).

### Pola B - Membangun notasi/representasi dari objek konkret

Dipakai untuk **materi fondasi/notasi** yang tidak punya gejala: apa itu shape
tensor, channel, batch, embedding, dimensi, indeks. Memaksakan Pola A ke sini
("situasi riset yang bermasalah") terasa dibuat-buat. Pakai pola ini:

1. **Mulai dari satu objek konkret yang sudah dikenal mahasiswa**, bukan dari
   istilah. Contoh: "satu gambar RGB 32x32", bukan "tensor 4D".
2. **Tambah satu sumbu/satu komponen per langkah.** Tunjukkan shape berubah di
   tiap langkah. Contoh tangga yang terbukti efektif:
   - `(32, 32)` - satu gambar grayscale, tinggi x lebar
   - `(3, 32, 32)` - tambah channel warna R, G, B
   - `(64, 3, 32, 32)` - tambah batch, banyak gambar sekaligus
3. **Beri kalimat-baca yang bisa diulang** untuk notasi apa pun, bukan hanya
   contoh ini. Lihat field "Kalimat-baca" di bagian 4.
4. **Tambatkan ke operasi konkret** supaya tiap dimensi punya arti operasional:
   - `x[0]` -> `(3, 32, 32)` = gambar pertama
   - `x[0][0]` -> `(32, 32)` = channel pertama gambar pertama
   - `x[0][0][10][20]` = satu nilai piksel: gambar 0, channel 0, baris 10, kolom 20
5. **Tunda istilah formal sampai objeknya terbentuk.** Sebut "tensor 4D" atau
   "format B, C, H, W" sebagai *nama* dari sesuatu yang sudah dibangun, bukan
   sebagai pembuka.

Aturan emas Pola B: kalau sebuah slide membuka dengan istilah abstrak sebelum
mahasiswa melihat objek konkretnya, urutannya salah. Balik.

---

## 2. Satu gagasan per slide

Setiap slide hanya boleh membawa satu gagasan utama. Kalau satu topik punya tiga
lapisan, pecah jadi tiga slide: gejala, mekanisme, tindakan.

Untuk Pola B, "satu gagasan per slide" berarti **satu langkah pembangunan per
slide** - tambah satu sumbu, tunjukkan shape baru, baru lanjut.

---

## 3. Objek literal, bukan metafora

Ini titik paling rawan dan paling sering salah.

Yang membuat penjelasan konkret terasa "klik" adalah **objek literalnya**, bukan
metafora. "Satu gambar RGB 32x32" itu objek literal - itulah benda yang
sesungguhnya. "Kotak berisi 64 foto" atau "rak buku" itu metafora, dan
`CLAUDE.md` melarangnya.

| Boleh (objek literal)                          | Hindari (metafora)                    |
| ---------------------------------------------- | ------------------------------------- |
| satu gambar RGB 32x32, nilai piksel sungguhan  | "kotak foto", "rak buku"              |
| satu baris tabel dengan D fitur                | "bahan baku", "lembar"                |
| layer `nn.Linear`, output head                 | "meja kerja", "pabrik", "gerbang"     |
| `x[0][0][10][20]` = satu nilai piksel          | "lapisan warna seperti tumpukan kaca" |

Cara dapat efek konkret tanpa metafora: pakai benda nyata + tunjukkan shape +
tunjukkan indeks. Itu sudah cukup konkret tanpa perlu analogi.

---

## 4. Field per konsep (catatan untuk perancang, bukan teks slide)

Saat merancang, pikirkan field-field ini. Tidak semua jadi teks di slide -
sebagian masuk narasi pengajar atau speaker notes.

- **Judul slide** - spesifik, menggambarkan isi.
- **Isi slide** - maksimal 3-4 poin. Sisanya ke narasi.
- **Visual** - diagram alur, contoh tensor, loss curve, confusion matrix, tabel
  kecil, atau potongan kode pendek.
- **Narasi pengajar** - naskah yang mengalir, lengkap, tidak seperti daftar.
  Tidak ditumpuk di slide.
- **Pertanyaan kelas** - satu pertanyaan yang memaksa berpikir, bukan mengulang
  definisi.
- **Kalimat kunci** - satu kalimat penutup yang dirangkum. Lihat aturan frekuensi.
- **Kalimat-baca/operasional** (khusus Pola B) - kalimat yang bisa mahasiswa
  ulang untuk membaca notasi apa pun. Beda fungsi dari kalimat kunci: kalimat
  kunci untuk *mengingat*, kalimat-baca untuk *mengoperasikan*. Contoh:
  "Di dalam satu batch ada N gambar; tiap gambar punya C channel; tiap channel
  berukuran H piksel tinggi dan W piksel lebar."

### Aturan frekuensi "kalimat kunci" (PENTING)

Kalimat kunci adalah **penutup satu busur konsep**, bukan field wajib tiap slide.

- Maksimal **satu kalimat kunci per topik**, ditaruh di slide penutup topik itu.
- Jangan beri kalimat kunci di setiap slide. Kalau kalimat kunci bertebaran di
  hampir semua slide, itu terlalu banyak - hapus mayoritasnya dan sisakan satu
  per busur konsep.

(Catatan riwayat: pelanggaran aturan ini - kalimat kunci di hampir tiap slide -
pernah ditolak keras. Jangan ulangi.)

---

## 5. Aturan isi dan bahasa

- Bahasa Indonesia natural, jelas, lengkap. Ikuti `CLAUDE.md` dan `SWEEPER.md`.
- Jangan frasa kosong: "pemahaman mendalam", "eksplorasi komprehensif", "konsep
  penting" tanpa isi konkret.
- Jangan slide terlalu padat. Poin inti, diagram, tabel kecil, atau kode pendek.
  Penjelasan lengkap ke narasi pengajar / speaker notes.
- Untuk bab teknis, jangan hanya "apa itu". Tampilkan juga: kapan dipakai, kapan
  menyesatkan, bagaimana mendeteksinya, apa langkah pertama yang harus diuji.
- Setiap slide mengandung salah satu dari empat sikap (curiosity, rigor,
  skepticism, ownership) secara implisit - lewat pertanyaan dan aktivitas, bukan
  slogan.

---

## 6. Lab dan checklist

Kalau materi mengandung eksperimen atau lab, akhiri dengan checklist verifikasi.
Checklist memastikan notebook, plot, log, config, dan interpretasi hasil bisa
diperiksa ulang oleh orang lain.

---

## 7. Selaras dengan sistem slide yang ada

Panduan ini menentukan *isi dan urutan pedagogis*. Aturan teknis penulisan slide
(layout, jumlah bullet, lead sentence, urutan gambar-sebelum-teks, design system)
tetap di `CLAUDE.md` bagian "Slide Deck Instruktur". Singkatnya:

- Setiap slide non-title wajib punya `body` sebagai lead sentence.
- Bullet = kalimat utuh (SPOK), bukan definisi kamus.
- Slide gambar (`layout: "image"`) muncul **sebelum** slide teks yang
  menjelaskan konsep yang sama (bottom-up).
- Max 3 bullet per slide.

---

## Ringkasan satu paragraf untuk future-me

Kalau materinya punya gejala (loss, shape mismatch, overfit), pakai **Pola A**
diagnostik. Kalau materinya notasi/fondasi tanpa gejala (shape, channel, batch,
embedding), pakai **Pola B**: mulai dari objek literal yang dikenal, tambah satu
sumbu per langkah, beri kalimat-baca yang bisa diulang, tambatkan ke indeks
konkret, dan tunda istilah formal sampai objeknya terbentuk. Pakai objek
literal, bukan metafora. Kalimat kunci satu per topik, bukan satu per slide.

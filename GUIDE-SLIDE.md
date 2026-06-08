# GUIDE-SLIDE.md - Panduan Slide Pembelajaran

Panduan ini dipakai saat membuat atau merevisi slide deck di `website/src/lib/slides/slides-XX.ts`.

**Slide diturunkan dari bab.** Polanya sama dengan `chapter-style-guide.md`, hanya dipadatkan jadi bentuk slide: ambil objektif dan materi bab yang sudah ditulis, lalu render tiap materi jadi beberapa slide yang ringkas dan padat. Slide tidak menambah materi baru di luar bab, dan tidak menyalin prosa bab utuh.

Panduan ini tunduk pada `CLAUDE.md` (gaya bahasa, larangan em dash, larangan kiasan fisik) dan `SWEEPER.md` (anti AI-slop). Aturan teknis layout slide (jumlah bullet, lead sentence, image-before-text, design system) ada di `CLAUDE.md` bagian "Slide Deck Instruktur".

Audiens: mahasiswa Ilmu Komputer semester 6 yang sudah belajar ML/DL dasar tetapi belum terbiasa berpikir seperti asisten riset.

## Mulai dari sini (alur cold-start)

1. Pastikan bab minggu itu sudah direvisi mengikuti `chapter-style-guide.md`. Slide diturunkan dari bab, jadi bab dulu, baru slide.
2. Baca contoh acuan yang sudah disetujui: `website/src/lib/slides/slides-04.ts`. Samakan bar-nya.
3. Render tiap materi bab jadi slide (bagian 2 dan 3 di bawah).
4. Jalankan Checklist audit-diri di bawah pada deck Anda sendiri, perbaiki temuannya, sebelum selesai.
5. Verifikasi di `website/`: `npm run lint` (cek slide kompilasi). Kalau chapter ikut diedit, **wajib `npm run sync`** supaya tersalin ke folder yang dirender, lalu `npm run build`.

## 1. Prinsip (sama dengan bab)

Slide bahan ajar. Tulis ringkas dan padat.

- Tanpa pembuka bernarasi ("bayangkan Anda", "situasi riset yang memicu"), tanpa dramatisasi.
- Tanpa penegasan retoris yang mengontraskan untuk efek ("bukan sekadar X", "X bukan Y" atau "bukan X, melainkan Y" sebagai pemanis) dan tanpa frasa kosong ("pemahaman mendalam", "konsep penting") tanpa isi.
- Satu gagasan per slide. Kalau satu topik punya tiga lapisan, pecah jadi tiga slide.
- Pakai objek literal, hindari metafora (bagian 4).
- Penjelasan panjang masuk speaker notes. Slide cukup poin inti.

## 2. Struktur deck = struktur bab, dipadatkan

Deck mengikuti kerangka bab (`chapter-style-guide.md`), diturunkan lewat Langkah 0 yang sama.

- **Slide agenda:** judul + daftar materi minggu ini. Sejajar dengan "Kali ini kita akan membahas:" di bab.
- **Slide recap:** satu slide "Di pertemuan sebelumnya" berisi inti minggu lalu dan output yang dibawa. Boleh rujuk minggu lebih awal.
- **Klaster per materi:** tiap materi bab dirender jadi slide secukupnya. Ambil kalimat inti materi dan artefaknya (kode, tabel, contoh), lalu padatkan. Urutan materi sama dengan bab. **Jumlah slide per materi adaptif:** sebanyak yang dibutuhkan supaya materi itu jelas, tergantung banyaknya isi dan seberapa penting dijelaskan detail. Tidak ada batas minimal atau maksimal per materi. Materi padat dan penting dapat banyak slide; materi ringkas cukup sedikit. Yang dibatasi adalah isi tiap slide (satu gagasan, maksimal 3 bullet), bukan jumlah slidenya.
- **Slide penutup:** minggu depan membahas apa, dan materi minggu ini yang masih dipakai. Pakai `layout: "cta"`.

Panjang total deck mengikuti jenisnya (trailer, kelas mingguan, standalone) di `CLAUDE.md` sebagai target kasar. Yang menentukan jumlah slide tetap kebutuhan materi, bukan angka yang dipaksakan.

## 3. Dua pola merender materi jadi slide

Tergantung jenis materi, satu materi dirender dengan salah satu pola.

### Pola A - dari artefak yang teramati (materi yang punya gejala)

Untuk konsep yang muncul dari sesuatu yang bermasalah dan bisa dilihat: loss tidak turun, shape tidak cocok, validation accuracy terlalu bagus, hasil berubah setelah seed diganti.

Mulai dari **artefak yang teramati**. Tunjukkan loss curve atau pesan error dulu, baru jelaskan. Jangan buka dengan skenario yang dinarasikan.

Urutan (boleh dipecah ke beberapa slide):

1. Artefak atau gejala yang bisa dilihat.
2. Penjelasan teknis dengan contoh kecil konkret.
3. Konsekuensi terhadap eksperimen.
4. Kesalahan umum atau miskonsepsi.
5. Pertanyaan diagnosis untuk diskusi kelas.
6. Kalimat kunci penutup busur konsep (sekali per topik, bagian 5).

### Pola B - membangun notasi dari objek konkret (fondasi tanpa gejala)

Untuk materi fondasi atau notasi yang tidak punya gejala: shape tensor, channel, batch, embedding, dimensi, indeks.

1. **Mulai dari satu objek konkret yang sudah dikenal mahasiswa.** Jangan buka dengan istilah. Pakai "satu gambar RGB 32x32", tunda "tensor 4D".
2. **Tambah satu sumbu per langkah.** Tunjukkan shape berubah di tiap langkah:
   - `(32, 32)` - satu gambar grayscale, tinggi x lebar
   - `(3, 32, 32)` - tambah channel warna R, G, B
   - `(64, 3, 32, 32)` - tambah batch, banyak gambar sekaligus
3. **Beri kalimat-baca yang bisa diulang** untuk notasi apa pun. Contoh: "Di dalam satu batch ada N gambar; tiap gambar punya C channel; tiap channel berukuran H piksel tinggi dan W piksel lebar."
4. **Tambatkan ke indeks konkret:**
   - `x[0]` -> `(3, 32, 32)` = gambar pertama
   - `x[0][0]` -> `(32, 32)` = channel pertama gambar pertama
   - `x[0][0][10][20]` = satu nilai piksel: gambar 0, channel 0, baris 10, kolom 20
5. **Tunda istilah formal sampai objeknya terbentuk.** Sebut "tensor 4D" atau "format B, C, H, W" sebagai nama dari sesuatu yang sudah dibangun.

Aturan emas Pola B: kalau sebuah slide membuka dengan istilah abstrak sebelum mahasiswa melihat objek konkretnya, balik urutannya.

## 4. Objek literal, hindari metafora

Yang membuat penjelasan "klik" adalah objek literalnya. "Satu gambar RGB 32x32" itu objek literal - benda yang sesungguhnya. "Kotak berisi 64 foto" atau "rak buku" itu metafora, dan `CLAUDE.md` melarangnya.

| Boleh (objek literal) | Hindari (metafora) |
| --- | --- |
| satu gambar RGB 32x32, nilai piksel sungguhan | "kotak foto", "rak buku" |
| satu baris tabel dengan D fitur | "bahan baku", "lembar" |
| layer `nn.Linear`, output head | "meja kerja", "pabrik", "gerbang" |
| `x[0][0][10][20]` = satu nilai piksel | "lapisan warna seperti tumpukan kaca" |

Cara dapat efek konkret tanpa metafora: benda nyata + tunjukkan shape + tunjukkan indeks.

## 5. Kalimat kunci - sekali per topik

Kalimat kunci adalah penutup satu busur konsep.

- Maksimal satu kalimat kunci per topik, di slide penutup topik itu.
- Jangan beri kalimat kunci di tiap slide. Kalau kalimat kunci bertebaran di hampir semua slide, hapus mayoritasnya dan sisakan satu per busur konsep.

(Catatan riwayat: kalimat kunci di hampir tiap slide pernah ditolak keras. Jangan ulangi.)

## 6. Rujukan antar-minggu dan thread

Sama seperti bab. Konsep yang sudah dibahas tidak diulang di slide; cukup recap singkat di slide pembuka atau sebut "sudah dibahas di W2" dengan link bab. Thread lintas-bab (empat sikap, lapor ke dosen) diselipkan di slide materi lewat pertanyaan atau aktivitas. Jangan buat slide "Sikap Riset" tersendiri.

## 7. Lab dan checklist

Kalau materi mengandung lab, akhiri dengan checklist verifikasi: notebook, plot, log, config, dan interpretasi hasil bisa diperiksa ulang orang lain.

## Ringkasan

Slide diturunkan dari bab, pola sama, dipadatkan. Buka dengan agenda dan recap, render tiap materi bab jadi slide secukupnya - adaptif sesuai banyak dan pentingnya materi, tanpa batas jumlah - lalu tutup dengan bridge ke minggu depan. Materi bergejala pakai Pola A (mulai dari artefak teramati); materi notasi pakai Pola B (objek literal, tambah satu sumbu per langkah, kalimat-baca, indeks konkret, tunda istilah). Pakai objek literal, hindari metafora. Kalimat kunci sekali per topik.

## Checklist audit-diri

Baca ulang deck sebagai reviewer yang menolak slide bertele-tele. Perbaiki kalau menemukan:

- [ ] Slide membuka dengan narasi, bukan dari isi atau artefak.
- [ ] Lebih dari satu gagasan dalam satu slide, atau lebih dari 3 bullet.
- [ ] Bullet, caption, atau grid item berupa fragmen, bukan kalimat SPOK utuh.
- [ ] Jumlah slide per materi dipaksa ke angka, bukan disesuaikan kebutuhan materi.
- [ ] Slide gambar muncul setelah slide teks yang menjelaskannya, padahal harus sebelum.
- [ ] Kalimat kunci muncul di banyak slide, bukan sekali per topik.
- [ ] Slide "Sikap Riset" atau "Komunikasi" yang berdiri sendiri.
- [ ] Materi baru yang tidak ada di bab; slide harus diturunkan dari bab.

Kalau satu pun tercentang, perbaiki sebelum selesai.

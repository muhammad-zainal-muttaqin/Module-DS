# Chapter Style Guide - Struktur Materi

Panduan ini mengatur **struktur penyampaian materi** bab mingguan. Aturan diksi dan tanda baca (no em dash, SPOK, Indonesia natural) tetap mengikuti `CLAUDE.md` bagian Gaya Penulisan. Panduan ini **menggantikan** urutan bab lama (Peta Bab -> Motivasi -> Konsep Inti -> Worked Example -> Pitfalls -> Lab -> Refleksi -> Bacaan Lanjutan).

Panduan ini mengajarkan cara menurunkan struktur tiap bab dari isinya. Jumlah dan judul materi berbeda-beda mengikuti isi tiap minggu. Menyalin bentuk W4 ke minggu lain tanpa menurunkannya dari isi minggu itu menghasilkan bab yang dipaksakan dan slop.

Bab non-materi (Pendahuluan, Lampiran, Rubrik, Panduan Instruktur) tidak terikat kerangka ini.

## Mulai dari sini (alur cold-start)

Kalau Anda membuka sesi baru tanpa konteks percakapan sebelumnya, ikuti urutan ini supaya hasilnya setara dengan revisi yang sudah disetujui:

1. Baca `CLAUDE.md` (bagian Gaya Penulisan), panduan ini, dan `SWEEPER.md`.
2. Baca contoh acuan yang sudah disetujui: `chapters/04_W4_Reproducibility_Experiment_Matrix.md` dan `website/src/lib/slides/slides-04.ts`. Samakan kualitasnya: kepadatan, nada datar, jumlah materi adaptif, dan cara merujuk antar-minggu. Ini standar yang harus dicapai.
3. Kerjakan Langkah 0 untuk minggu target.
4. Tulis draf mengikuti kerangka.
5. Jalankan Checklist audit-diri di bawah pada draf Anda sendiri, perbaiki temuannya, sebelum menyatakan selesai.
6. Sapu bahasa mengikuti `SWEEPER.md`.
7. **Setelah mengedit chapter, WAJIB jalankan `npm run sync` di `website/`.** Editan `chapters/*.md` tidak dirender sampai disalin ke `website/src/content/chapters/` lewat sync; tanpa sync, browser dan build tetap memakai chapter lama. Lalu jalankan `npm run lint` (cek slide kompilasi) dan `npm run build` (cek tidak ada error).

## Prinsip

Modul ini bahan belajar. Tulis kaku, padat, dan langsung.

- Tanpa kalimat pembawa suasana, anekdot pembuka, atau dramatisasi.
- Tanpa penegasan retoris yang mengontraskan untuk efek: "bukan sekadar X", "ini bukan formalitas", "bukan X, melainkan Y", "bayangkan Anda", atau "X bukan Y" sebagai pemanis. Kata "bukan" boleh untuk pengecualian teknis yang menambah informasi (mis. "logit mentah, bukan probabilitas").
- Tanpa metafora untuk konsep teknis.
- Tiap kalimat SPOK dan bisa dibaca lantang.
- Angka dilaporkan datar, tanpa kata penambah suasana ("melonjak", "mengejutkan", "luar biasa").
- Kalau bisa lebih pendek, potong.

## Langkah 0: turunkan garis besar sebelum menulis

Sebelum menulis satu baris bab, kerjakan tiga langkah ini. Inilah yang menjaga bab tetap pas dan tidak slop.

1. **Tulis satu kalimat objektif minggu ini.** Apa yang sebenarnya minggu ini ajarkan? Contoh W4: "mengubah satu instruksi atau diagnosis jadi eksperimen yang terkontrol dan bisa dicek ulang."
2. **Pecah objektif jadi urutan materi yang natural.** Ikuti alur kerja atau logika minggu itu. Jangan paksakan jumlah tetap: satu minggu bisa jadi 2 materi, minggu lain 5. W4 jadi 4 karena alurnya rancang -> jalankan terkontrol -> rekam -> laporkan.
3. **Untuk tiap materi tentukan tiga hal:** konsep intinya, artefak yang bisa disalin kalau memang ada (kode, tabel, protokol), dan konsep minggu lalu yang cukup dirujuk tanpa ditulis ulang.

Kalau sebuah materi tidak punya artefak yang wajar untuk disalin, jangan dibuat-buat. Artefak menyesuaikan isi.

## Kerangka tetap tiap bab

Hanya kerangka luar yang tetap. Isi dan jumlah materi mengikuti hasil Langkah 0.

### Pembuka

1. Judul bab dan blok navigasi modul (`<details>`), sama seperti bab lain.
2. `Kali ini kita akan membahas:` lalu daftar bernomor materi minggu ini.
3. `Di pertemuan sebelumnya kita sudah membahas:` inti minggu lalu dan output yang dibawa ke minggu ini. Boleh merujuk minggu lebih awal kalau konsepnya masih dipakai, dengan link ke section spesifik.

### Tiap materi

Judul singkat, diturunkan dari isi (Langkah 0). Boleh campur Inggris-Indonesia; pilih yang paling jelas. Jangan paksakan lokalisasi ke Indonesia kalau hasilnya janggal; pakai "Trace Result", jangan "ikat hasil ke jejak".

Pola isi:

1. Satu sampai dua kalimat inti, langsung ke definisi atau tujuan.
2. Artefak yang bisa disalin **kalau ada**: blok kode markdown, tabel, atau quote.
3. Contoh benar, dengan penjelasan singkat kenapa formatnya begitu.
4. Link ke section minggu lain saat konsep sudah pernah dibahas. Jangan jelaskan ulang.

### Lab

Daftar tugas bernomor yang sejajar dengan urutan materi, lalu checklist verifikasi. Tanpa narasi.

### Penutup

Satu paragraf: minggu depan membahas apa, dan materi minggu ini mana yang masih dipakai.

## Rujukan antar-minggu

Konsep yang sudah dibahas di minggu sebelumnya tidak ditulis ulang. Sebut singkat lalu link ke section asalnya. Ada dua tempat memakainya:

1. **Pengingat di awal materi.** Saat sebuah materi bertumpu pada konsep minggu lalu, buka dengan satu kalimat pengingat plus link. Contoh: "Smoke test tiga level dari [W2 §2.3](02_W2_Images_CNN_Smoke_Test.md) dipakai sebelum setiap run penuh."
2. **Rujukan di tengah materi.** Saat di tengah penjelasan muncul konsep yang sudah pernah dibahas, sebut singkat lalu link, jangan jelaskan ulang. Contoh: "Pemilihan loss dan optimizer mengikuti [W3 §2.1-§2.2](03_W3_Loss_Optimizer_Evaluasi.md)."

Tidak ada batas minggu. Boleh merujuk dari W0 sampai minggu mana pun sebelum bab ini, selama konsepnya memang dipakai. Tujuannya: tiap bab tetap ringkas, dan pembaca tahu di mana konsep lengkapnya. Link memakai nama file `.md` dan sebut nomor section di teks.

## Thread lintas-bab

Beberapa hal berjalan di banyak minggu: kebiasaan riset, empat sikap (Curiosity, Rigor, Skepticism, Ownership), dan cara melapor ke dosen pembimbing. Ini **tidak** ditulis sebagai section tersendiri. Selipkan di materi tempat ia muncul secara wajar.

Contoh: cara melapor hasil ke dosen ditaruh di materi pelaporan hasil; skeptisisme terhadap angka yang terlalu bagus ditaruh di materi yang membahas hasil. Membuat section "Sikap Riset" atau "Komunikasi" tersendiri menghasilkan slop.

## Yang dibuang dari gaya lama

- Section "Motivasi" berisi cerita pembuka.
- Daftar "Pitfalls & Miskonsepsi" panjang. Poin penting dipindah jadi catatan singkat di materi terkait.
- Epigraph atau quote pembuka bab yang hanya membangun suasana.
- Label metadata bergaya ("Baris peta besar:", "Kebiasaan riset:"). Lebur ke pembuka.
- Penjelasan bertele-tele yang mengulang konsep minggu sebelumnya. Ganti dengan link ke section.
- Section khusus untuk sikap riset atau komunikasi. Selipkan ke materi (lihat Thread lintas-bab).

## Contoh penerapan: garis besar W4

Objektif W4: mengubah satu instruksi atau diagnosis jadi eksperimen terkontrol yang bisa dicek ulang. Alur naturalnya menghasilkan empat materi:

1. **Rancangan Penelitian** - protokol sebelum kode.
2. **Training Terkontrol** - satu variabel berubah, seed untuk replikasi.
3. **Trace Result** - rekam YAML, seed, checkpoint, git hash supaya reproducible.
4. **Hasil Research** - laporkan mean ± std dan simpulkan terhadap hipotesis.

Minggu lain berbentuk beda karena isinya beda. Misal W6 (representations + temporal leakage) kemungkinan beralur recap representasi -> demo leakage -> audit data. Jumlah dan judul materinya ditentukan saat menggarap W6 lewat Langkah 0. Jangan disalin dari W4.

## Checklist audit-diri

Sebelum menyatakan selesai, baca ulang draf Anda sebagai reviewer yang menolak AI slop. Perbaiki kalau menemukan:

- [ ] Pembuka bernarasi atau anekdot (cerita pembuka, "bayangkan Anda", dramatisasi).
- [ ] Kontras retoris untuk efek ("X bukan Y" atau "bukan X, melainkan Y" sebagai pemanis, "bukan sekadar", "ini bukan formalitas").
- [ ] Kalimat tanpa predikat utama (fragmen). Baca tiap kalimat lantang; kalau tidak ada kata kerja utama atau terasa janggal, perbaiki.
- [ ] Label inline diikuti fragmen ("Deteksi:", "Contoh:", "Kekuatan:" lalu frasa tanpa predikat). Tulis ulang jadi kalimat utuh.
- [ ] Jumlah materi yang dipaksa ke angka tertentu, bukan diturunkan dari isi minggu.
- [ ] Sikap riset atau cara lapor ke dosen ditulis sebagai section sendiri.
- [ ] Konsep minggu lalu dijelaskan ulang panjang, bukan dirujuk dengan link.
- [ ] Sisa gaya lama: section "Motivasi", epigraph, atau label metadata ("Baris peta besar:").
- [ ] Materi yang punya artefak wajar (kode, tabel, protokol) tapi artefaknya tidak ditampilkan.

Kalau satu pun tercentang, perbaiki sebelum selesai. Asumsikan ada reviewer ketat yang akan menolak seluruh draf kalau ada satu saja yang lolos. Centang hanya setelah membaca ulang teks final baris demi baris, bukan dari ingatan saat menulis; kalau perlu, grep pola yang dilarang untuk memastikan tidak ada sisa.

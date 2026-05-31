# SWEEPER.md

Panduan ini untuk agent yang menyapu bahasa materi W1-W11 agar terasa natural bagi penutur asli Bahasa Indonesia. Tugas utama bukan mencari kata tertentu saja, tetapi membaca setiap chapter dan slide secara penuh, lalu memperbaiki kalimat yang masih terasa seperti terjemahan literal, bahasa administratif, atau ringkasan AI.

## Target

Perbaiki bahasa di file berikut:

- `chapters/01_W1_Tabular_Output_Heads.md` sampai `chapters/11_W11_Research_Framing.md`
- `website/src/lib/slides/slides-01.ts` sampai `website/src/lib/slides/slides-11.ts`

File hasil sync di `website/src/content/chapters/` jangan diedit langsung. Edit sumber di `chapters/`, lalu jalankan `npm run sync`.

## Prinsip Utama

1. Baca setiap file, jangan hanya grep.
2. Perbaiki kalimat yang secara tata bahasa benar tetapi terdengar seperti terjemahan Inggris.
3. Jangan mengganti kalimat kaku menjadi kalimat formal-administratif.
4. Buat kalimat lebih sederhana, lebih konkret, dan lebih enak dibaca.
5. Pertahankan istilah teknis ML/DL yang memang lazim: `loss`, `optimizer`, `training`, `fine-tuning`, `checkpoint`, `ablation`, `baseline`, `head`, `backbone`, `embedding`, `attention`.
6. Jangan mengubah makna teknis, struktur materi, urutan bab, kode, rumus, link, path, atau nama file.
7. Jangan generate image.

## Contoh Pola Yang Diinginkan

Buruk:

```text
Membaca loss curve sebagai sinyal diagnostik, memilih loss dan optimizer dengan alasan, dan mengukur model dengan jujur.
```

Baik:

```text
Belajar membaca loss curve untuk mendiagnosis hasil training, menentukan loss dan optimizer yang sesuai, lalu mengevaluasi model dengan metrik yang sesuai.
```

Perhatikan perubahan penting:

- `sebagai sinyal diagnostik` menjadi `untuk mendiagnosis hasil training`
- `memilih ... dengan alasan` menjadi `menentukan ... yang sesuai`
- `mengukur model dengan jujur` menjadi `mengevaluasi model dengan metrik yang sesuai`
- Tidak memakai kata formal seperti `dipertanggungjawabkan`

## Pola Bahasa Yang Harus Dicari Saat Membaca

### 1. Kalimat objektif belajar yang terasa seperti daftar verba

Hindari:

- `Membaca X sebagai Y, memilih A dengan B, dan mengukur C dengan D`
- `Memahami X secara konkret, membaca Y, dan memilih Z berdasarkan ...`
- `Merancang X, mengontrol Y, dan mengikat Z pada ...`

Gunakan bentuk:

- `Belajar membaca X untuk ...`
- `Belajar menentukan X yang sesuai ...`
- `Belajar memeriksa apakah ...`
- `Belajar menyusun ... agar ...`

### 2. `sebagai ...` yang menggantikan verba

Hindari jika terasa kaku:

- `MLP sebagai pengubah bentuk tensor`
- `loss sebagai pilihan`
- `optimizer sebagai mekanisme langkah`
- `reproducibility sebagai syarat`
- `seed sebagai replikasi`
- `gate sebagai solusi`

Ubah menjadi kalimat kerja:

- `MLP mengubah bentuk tensor`
- `loss perlu dipilih sesuai tugas`
- `optimizer memperbarui parameter`
- `reproducibility menjadi syarat utama`
- `seed dipakai untuk replikasi`
- `gate membantu LSTM memilih informasi yang disimpan`

### 3. Bahasa moral/administratif untuk konsep teknis

Hindari:

- `jujur` jika maksudnya teknis
- `dipertanggungjawabkan`
- `dengan alasan`
- `bisa diaudit`
- `klaim yang accountable`
- `ekspresi ketidakpastian yang jujur`

Gunakan:

- `sesuai`
- `bisa dicek ulang`
- `punya catatan yang jelas`
- `tidak menutupi kelemahan model`
- `menyebut keterbatasan`
- `menjelaskan alasan memilih ...`

Contoh:

- Buruk: `Evaluasi yang jujur memilih metrik sesuai kondisi data.`
- Baik: `Pilih metrik yang sesuai dengan kondisi data.`

- Buruk: `hasil bisa dipertanggungjawabkan`
- Baik: `hasil bisa dicek ulang`

### 4. Kata sifat abstrak yang tidak perlu

Hindari jika tidak menambah makna:

- `informatif`
- `kaya`
- `kuat` untuk semua hal
- `kritis` sebagai intensifier umum
- `nyaman` untuk kompetensi
- `intuitif` untuk penjelasan

Ubah menjadi makna konkret:

- `lebih berguna`
- `lebih sesuai`
- `lebih mudah diperiksa`
- `lebih stabil`
- `lebih jelas`
- `membantu diagnosis`

### 5. Metafora teknis yang tidak perlu

Hindari:

- `melatih mata sebelum otak punya kosakata teknis`
- `gradient mengalir`
- `aliran informasi`
- `memori utama`
- `gerbang keputusan`
- `pintu masuk` jika terlalu sering
- `misi`, `ritual`, `sakti`, `ajaib`

Gunakan istilah langsung:

- `mencoba mendiagnosis dari bentuk kurva`
- `gradient dihitung`
- `informasi yang dipertahankan, ditulis, atau dikeluarkan`
- `nilai internal`
- `titik keputusan`
- `langkah awal`

### 6. Struktur Inggris yang tersisa

Waspadai pola:

- Post-nominal: `topik lab nyata`, `strategi representasi kaya`
- Frasa umum Inggris: `by design`, `shared dataset`, `shape transformer`
- Terjemahan literal: `ada untuk`, `hadir untuk`, `berada di jalur`, `mengalahkan tujuan`
- Pembuka monoton: `Anda akan ...`

Ubah menjadi Bahasa Indonesia langsung:

- `dataset bersama`
- `memang disengaja`
- `dirancang untuk`
- `bertentangan dengan tujuan`
- `minggu ini kita belajar ...`

## Cara Kerja Wajib

Kerjakan per minggu agar perubahan mudah dicek.

Untuk setiap minggu:

1. Baca chapter lengkap.
2. Baca slide lengkap.
3. Catat 5-15 kalimat yang terasa kaku.
4. Patch chapter dan slide pada minggu yang sama.
5. Pastikan istilah, link, kode, rumus, dan struktur tidak berubah.
6. Lanjut ke minggu berikutnya.

Urutan:

1. W1-W3: fondasi gaya bahasa; banyak pola objektif dan `sebagai`.
2. W4-W6: banyak bahasa reproduksibilitas, leakage, dan evaluasi yang rawan terlalu formal.
3. W7-W9: banyak istilah teknis Transformer, repo adoption, foundation model, dan multimodal; jangan mengorbankan presisi teknis.
4. W10-W11: banyak kalimat riset/framing yang mudah menjadi akademik dan abstrak.

## Cara Membaca Slide

Di file `website/src/lib/slides/slides-XX.ts`, baca semua teks human-facing:

- `title`
- `subtitle`
- `body`
- `caption`
- `footnote`
- `bullets`
- `gridItems[].body`
- `left.body`
- `right.body`

Jangan hanya melihat `subtitle`. Banyak kalimat kaku ada di `footnote`, `caption`, dan `gridItems`.

Slide harus terasa seperti penjelasan dosen, bukan ringkasan AI. Setiap slide tetap boleh ringkas, tetapi kalimatnya harus natural.

## Cara Membaca Chapter

Di file `chapters/*.md`, prioritaskan:

- paragraf pembuka setelah judul
- `Peta Bab`
- awal setiap section besar
- transisi `Lanjut ke W...`
- `Pitfalls & Miskonsepsi`
- `Refleksi`
- admonition `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`

Jangan mengubah:

- navigasi `<details>`
- kode
- rumus
- tabel teknis kecuali teksnya jelas kaku
- link dan anchor
- path gambar

## Contoh Rewrite

```text
Buruk:
W3 adalah minggu berbasis contoh. Kita mulai dari mengamati lima training konkret, baru menarik teorinya: loss sebagai pilihan, cara optimizer memutuskan langkah, evaluasi yang tidak bisa diringkas satu angka, tiga strategi representasi, dan kerangka diagnosis loss curve.

Baik:
W3 dimulai dari lima contoh training. Dari contoh itu, kita belajar kapan sebuah loss cocok dipakai, bagaimana optimizer memperbarui parameter, mengapa satu angka akurasi sering belum cukup, dan bagaimana loss curve membantu diagnosis.
```

```text
Buruk:
Reproduksibilitas diperlakukan sebagai syarat, bukan tambahan - hasil yang tidak bisa diulang oleh orang lain dianggap belum selesai.

Baik:
Reproduksibilitas adalah syarat utama. Hasil yang tidak bisa diulang oleh orang lain belum dianggap selesai.
```

```text
Buruk:
Saat training multimodal, optimizer menemukan jalur gradient yang paling mudah. Jika satu modalitas lebih informatif atau lebih bersih, model belajar mengabaikan modalitas lain sambil loss tetap turun.

Baik:
Saat training multimodal, optimizer mengikuti jalur yang paling mudah. Jika satu modalitas lebih bersih atau lebih mudah dipakai, model bisa mengabaikan modalitas lain sambil loss tetap turun.
```

```text
Buruk:
Setiap putaran punya gerbang keputusan: lanjut ke putaran berikutnya, atau berhenti dan pilih paper lain.

Baik:
Di akhir setiap putaran, Anda memilih: lanjut ke putaran berikutnya, atau berhenti dan memilih paper lain.
```

## Larangan

- Jangan memperluas materi.
- Jangan menghapus quiz, refleksi, atau struktur pedagogis.
- Jangan mengubah istilah teknis menjadi terjemahan aneh.
- Jangan membuat bahasa lebih formal.
- Jangan pakai `dipertanggungjawabkan` kecuali konteksnya benar-benar dokumen audit formal.
- Jangan pakai metafora lucu atau dramatis.
- Jangan ubah generated content di `website/src/content/chapters/` secara manual.

## Verifikasi Akhir

Setelah patch:

```powershell
cd website
npm run lint
npm run sync
npm run build
```

Lalu dari root repo jalankan grep verifikasi untuk memastikan frasa target tidak tersisa di W1-W11 sumber:

```powershell
rg -n -i "dipertanggungjawabkan|dengan alasan|sebagai sinyal|sinyal diagnostik|mengukur model dengan jujur|evaluasi yang jujur|melatih mata|otak punya|memori utama|aliran informasi|gradient mengalir|gerbang keputusan|lebih informatif|representasi yang kaya|representasi yang informatif|nyaman|intuitif|misi|ritual|sakti|ajaib" chapters/0*_W*.md chapters/10_W10_Paper_Reading.md chapters/11_W11_Research_Framing.md website/src/lib/slides/slides-*.ts
```

Grep bersih bukan bukti cukup, tetapi grep yang masih berisi frasa target perlu diperiksa manual. Jika frasa muncul di `CLAUDE.md` atau `SWEEPER.md` sebagai contoh larangan, itu boleh.

## Laporan Akhir

Laporkan:

- minggu yang sudah dibaca penuh
- file yang diubah
- 5 contoh before/after paling penting
- hasil `npm run lint`, `npm run sync`, dan `npm run build`
- sisa risiko, jika ada

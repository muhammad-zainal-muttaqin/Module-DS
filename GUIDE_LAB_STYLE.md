# GUIDE_LAB_STYLE.md

Panduan struktur dan gaya untuk notebook lab di `template/notebooks/`. Tujuannya satu: semua lab terbaca konsisten, bisa langsung dijalankan, dan teksnya tidak terasa seperti fragmen atau terjemahan AI.

Panduan ini melengkapi, bukan menggantikan:

- `CLAUDE.md` bagian **Gaya Penulisan** - aturan diksi, tanda baca, SPOK, tabel kata calque. Berlaku penuh untuk teks di dalam notebook.
- `SWEEPER.md` - pola sapu bahasa anti AI-slop. Jalankan setelah menulis teks lab.
- `chapter-style-guide.md` - acuan untuk bab `.md`, bukan notebook.

Kalau ada konflik, `CLAUDE.md` menang untuk urusan bahasa; dokumen ini menang untuk urusan struktur notebook.

> [!IMPORTANT]
> **Prinsip nomor satu: sel teks notebook ditujukan ke mahasiswa, bukan ke penulis.** Panduan ini berisi aturan untuk penulis lab. Aturan itu tidak boleh ditulis ulang di dalam notebook. Mahasiswa tidak perlu membaca "lab ini dibangun bottom-up", "jangan impor dari `src/`", atau "semua fungsi didefinisikan inline" - itu keputusan penulis, bukan materi belajar. Sel teks lab harus singkat dan langsung ke isi: apa yang dilakukan sel kode berikutnya dan kenapa. Kalau sebuah kalimat menjelaskan aturan penyusunan lab, bukan materi, hapus.

---

## 1. Dua Aturan Inti Lab (tidak bisa ditawar)

Kedua aturan di §1.1 dan §1.2 adalah aturan **untuk penulis**. Terapkan saat menyusun notebook, tapi jangan menuliskannya sebagai teks di dalam notebook.

### 1.1 Self-contained: semuanya di dalam notebook

Notebook lab harus bisa dijalankan dan dimodifikasi sepenuhnya dari dalam notebook itu sendiri.

- **Dilarang `import` dari `src/`** atau modul repo lain. Tidak ada `from src.models import ...`, tidak ada `sys.path.insert(...)`, tidak ada `import src`.
- **Semua kelas dan fungsi didefinisikan langsung di notebook.** Kalau lab butuh `SimpleLSTM`, tulis ulang kelasnya di sel notebook, jangan impor dari `src/models.py`. Mahasiswa harus bisa membaca, mengubah, dan memahami setiap baris tanpa membuka file lain.
- **Import hanya pustaka pihak ketiga:** `numpy`, `torch`, `matplotlib`, `transformers`, dan pustaka standar Python. Itu saja.
- **Tidak ada dead code sisa pola lama.** Jangan tinggalkan `_root = os.path.abspath("..")`, `import os` yang tak terpakai, atau `sys.path` yang sudah tidak dipakai. Kalau sebuah baris tidak dipakai, hapus.
- **Jangan jelaskan aturan ini di sel teks.** Cukup terapkan. Tidak perlu menulis "semua fungsi didefinisikan inline tanpa impor dari `src/`" di notebook; itu catatan untuk penulis, bukan untuk mahasiswa.

> [!IMPORTANT]
> Cek cepat sebelum selesai: `grep -n "from src\|import src\|sys.path" notebook.ipynb` harus kosong. Setiap nama yang dipakai sel harus didefinisikan di sel sebelumnya dalam notebook yang sama.

### 1.2 Bottom-up: urutan sel, bukan teks

Susun sel dari satu objek konkret menuju eksperimen lengkap: satu sampel -> satu batch -> satu model -> grid perbandingan -> ringkasan + refleksi. Smoke test (overfit satu batch) muncul **sebelum** training penuh, bukan sesudah.

Bottom-up adalah cara menyusun urutan sel, bukan sesuatu yang dijelaskan ke mahasiswa. **Notebook tidak butuh sel yang menyebut atau menjelaskan istilah "bottom-up".** Jangan menulis "lab ini dibangun dari unit kecil ke perbandingan penuh"; cukup urutkan selnya begitu.

Agenda singkat di awal lab boleh ada (opsional). Kalau dipakai, beri judul biasa seperti `## Alur Lab`, isi dengan daftar langkah konkret, tanpa label "(bottom-up)" dan tanpa kalimat rasional pedagogis. Daftar langkah yang baik menyebut apa yang dikerjakan tiap tahap, misalnya "Bandingkan RNN, LSTM, dan GRU pada sequence pendek", bukan "kita naik dari unit kecil ke besar".

---

## 2. Struktur Sel Kanonik

Setiap lab mengikuti urutan ini. Nomori section dengan `## N.` (mulai dari `## 0. Setup` atau `## 1. Setup`).

| Urutan | Sel | Isi |
| --- | --- | --- |
| 1 | Title + Pre-flight Checklist (markdown) | judul `# Lab WX: ...`, lalu checklist (lihat §3) |
| 2 | Alur Lab (markdown, **opsional**) | `## Alur Lab` + daftar langkah konkret, tanpa framing "bottom-up" |
| 3 | Setup (markdown + code) | heading `## Setup` + lead 1 kalimat soal isi sel, lalu code: import + definisi inline + seed |
| 4 | Section materi (markdown + code) | tiap `## N. Judul` punya lead sentence sebelum code |
| 5 | Analisis / justifikasi (markdown) | pertanyaan tertarget + sel jawaban kosong |
| 6 | Refleksi + Self-Check Quick (markdown) | pertanyaan refleksi + checklist `- [ ]` |

---

## 3. Pre-flight Checklist (sel pertama)

Format baku. Empat blok, label persis seperti di bawah, tanpa ekor tambahan.

```markdown
# Lab WX: Judul Ringkas

## Pre-flight Checklist

> [!IMPORTANT]
> Lab ini <status: wajib / utama / opsional> untuk WX. Konsep yang ditandai (§) merujuk ke `0X_WX_Nama_Bab.md`.

**Yang Anda butuhkan sebelum mulai:**
- Bab WX sudah dibaca, terutama §... (sebutkan section konkret).
- Familiar dengan ... (prasyarat teknis konkret).

**Yang Anda hasilkan di akhir lab:**
- ... (luaran konkret yang bisa dicek, satu bullet per artefak).

**Kebutuhan teknis:**
- **Hardware:** ... (CPU cukup / GPU dianjurkan, dengan alasan).
- **Estimasi waktu:** X-Y jam termasuk membaca, eksekusi, dan refleksi.
```

Aturan:

- Pakai label **"Yang Anda hasilkan di akhir lab:"** (bukan "Yang akan Anda hasilkan" - hindari `Anda akan + V`).
- Pakai **"Kebutuhan teknis:"** bukan "Resource:" (calque, lihat tabel CLAUDE.md).
- **Jangan** tambahkan ekor "Pendamping:" dan "Tujuan pedagogis:" di akhir. Keduanya mengulang isi admonition dan blok "Yang Anda hasilkan". Buang.
- Status lab (wajib/opsional, Breadth Check) ditulis di dalam admonition `> [!IMPORTANT]`, sekali saja.

---

## 4. Aturan Teks per Sel

Semua aturan bahasa di `CLAUDE.md` berlaku. Yang paling sering dilanggar di notebook lama:

### 4.1 Setiap heading section diikuti lead sentence utuh

Sebuah `## N. Judul` tidak boleh langsung disusul kode. Selalu ada 1-3 kalimat lead yang menjelaskan apa yang terjadi di sel berikutnya dan mengapa. Lead harus SPOK lengkap, bukan fragmen atau label.

| Buruk (fragmen / label) | Baik (SPOK utuh) |
| --- | --- |
| `Fungsi bantu untuk tokenisasi batch dan DataLoader.` | `Dua fungsi berikut menangani tokenisasi batch dan membungkus data menjadi DataLoader.` |
| `Fungsi generik untuk train 5 epoch + evaluasi macro-F1.` | `Satu fungsi training melatih model selama 5 epoch lalu mengevaluasi macro-F1 pada validation set.` |
| `6 sampel validasi per arsitektur - prediksi vs ground truth.` | `Plot berikut membandingkan prediksi dan ground truth pada 6 sampel validasi untuk tiap arsitektur.` |

### 4.2 Tidak ada em dash

Dilarang `-` em dash (U+2014). Ganti dengan ` - ` (spasi-hyphen-spasi), koma, titik dua, atau kurung. Berlaku juga di **komentar kode, judul plot, dan string `print`**, karena semuanya tampil ke mahasiswa.

### 4.3 Tidak ada kiasan untuk konsep teknis

Sebut nama operasinya. "gradient mengalir" -> "gradient dihitung lewat backward pass". "sinyal error merambat" -> "gradient di-backpropagate". Lihat tabel kiasan terlarang di `CLAUDE.md`.

### 4.4 Bullet di checklist/luaran = item konkret yang bisa dicek

Bullet pada "Yang Anda hasilkan" dan "Self-Check Quick" boleh berupa frasa benda konkret (artefak), karena ini daftar centang, bukan prosa. Tapi tetap spesifik: "Plot gradient norm log-scale" bukan "visualisasi yang bagus".

### 4.5 Ringkas, buang yang redundan

Kalau sebuah kalimat mengulang yang sudah ditulis di checklist atau di Alur Lab, hapus. Lab bukan tempat menumpuk paragraf motivasi; itu tugas bab `.md`. Lead sentence cukup 1 kalimat di mayoritas section; 2-3 kalimat hanya kalau memang perlu konteks.

### 4.6 Jangan tulis aturan penyusunan lab di sel teks

Sel teks menjelaskan **materi dan langkah**, bukan keputusan penyusunan notebook. Kalimat yang menjelaskan aturan di panduan ini tidak boleh muncul di notebook.

| Jangan tulis di notebook | Alasan |
| --- | --- |
| "Lab ini dibangun bottom-up dari unit kecil ke besar." | Bottom-up adalah cara penulis menyusun sel, bukan materi. |
| "Semua fungsi didefinisikan inline, tanpa impor dari `src/`." | Aturan self-contained untuk penulis, bukan informasi belajar. |
| "Sesuai panduan gaya lab, setiap section punya lead sentence." | Mahasiswa tidak peduli soal panduan gaya. |

Kalau ragu: tanya "apakah kalimat ini membantu mahasiswa mengerjakan lab, atau hanya menjelaskan kenapa lab disusun begini?" Kalau yang kedua, hapus.

---

## 5. Section Refleksi dan Self-Check

Akhiri lab dengan dua hal:

1. **Pertanyaan tertarget** yang memaksa mahasiswa membaca datanya sendiri (bukan opini). Format: nomor + **bold lead-in** + instruksi konkret yang menyebut sel/angka tertentu.
2. **Self-Check Quick** berupa GitHub task list `- [ ]`, satu baris per luaran yang harus ada. Baris terakhir biasanya menautkan lab wajib lain atau Breadth Check bila relevan.

Sel jawaban dikosongkan dengan placeholder `> *[tulis di sini]*` di bawah tiap sub-pertanyaan, supaya mahasiswa mengisi langsung di notebook.

---

## 6. Checklist Audit-Diri (jalankan sebelum lab dinyatakan selesai)

- [ ] Tidak ada `import` dari `src/`, tidak ada `sys.path`, tidak ada dead code (`grep` bersih).
- [ ] Semua kelas/fungsi yang dipakai didefinisikan inline di notebook.
- [ ] Urutan sel mengikuti pola kecil-ke-besar; smoke test muncul sebelum training penuh.
- [ ] Tidak ada sel teks yang menjelaskan aturan penyusunan lab (framing "bottom-up", catatan "tanpa impor dari `src/`", dll).
- [ ] Agenda awal (kalau ada) berjudul `## Alur Lab` tanpa label "(bottom-up)" dan tanpa kalimat rasional pedagogis.
- [ ] Pre-flight Checklist memakai label baku, tanpa ekor "Pendamping/Tujuan pedagogis", tanpa "Resource".
- [ ] Setiap `## N.` punya lead sentence SPOK utuh dan ringkas, bukan fragmen atau label.
- [ ] Tidak ada em dash di teks, komentar, judul plot, maupun string print.
- [ ] Tidak ada kiasan untuk konsep teknis.
- [ ] Ada section refleksi + Self-Check Quick `- [ ]`.
- [ ] Notebook valid JSON, dijalankan dari atas ke bawah tanpa error.

---

## 7. Contoh Acuan

`lab_w5_lstm_sequence.ipynb` dipakai sebagai contoh acuan struktur dan gaya. Saat ragu soal format checklist, lead sentence, atau agenda lab, lihat lab itu lebih dulu.

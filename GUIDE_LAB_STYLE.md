# GUIDE_LAB_STYLE.md

Panduan struktur dan gaya untuk notebook lab di `template/notebooks/`. Tujuannya satu: semua lab terbaca konsisten, bisa langsung dijalankan, dan teksnya tidak terasa seperti fragmen atau terjemahan AI.

Panduan ini melengkapi, bukan menggantikan:

- `CLAUDE.md` bagian **Gaya Penulisan** - aturan diksi, tanda baca, SPOK, tabel kata calque. Berlaku penuh untuk teks di dalam notebook.
- `SWEEPER.md` - pola sapu bahasa anti AI-slop. Jalankan setelah menulis teks lab.
- `GUIDE_CHAPTER_STYLE.md` - acuan untuk bab `.md`, bukan notebook.

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

`## Alur Lab` adalah konten pembuka **wajib** (lihat §3): daftar langkah konkret yang jadi hal pertama dilihat mahasiswa setelah kalimat tugas. Beri judul biasa `## Alur Lab`, isi dengan langkah konkret, tanpa label "(bottom-up)" dan tanpa kalimat rasional pedagogis. Daftar langkah yang baik menyebut apa yang dikerjakan tiap tahap, misalnya "Bandingkan RNN, LSTM, dan GRU pada sequence pendek", bukan "kita naik dari unit kecil ke besar".

---

## 2. Struktur Sel Kanonik

Setiap lab mengikuti urutan ini. Nomori section dengan `## N.` (mulai dari `## 0. Setup` atau `## 1. Setup`).

| Urutan | Sel | Isi |
| --- | --- | --- |
| 1 | Title + kalimat tugas (markdown) | judul `# Lab WX: ...`, lalu 1-2 kalimat "apa yang dikerjakan dan kenapa" + 1 baris prasyarat/hardware (lihat §3) |
| 2 | Alur Lab (markdown, **wajib**, konten pertama) | `## Alur Lab` + daftar langkah konkret, tanpa framing "bottom-up" |
| 3 | Setup (markdown + code) | heading `## Setup` + lead 1 kalimat soal isi sel, lalu code: import + definisi inline + seed |
| 4 | Section materi (markdown + code) | tiap `## N. Judul` punya lead sentence sebelum code |
| 5 | Analisis / justifikasi (markdown) | pertanyaan tertarget + sel jawaban kosong |
| 6 | Refleksi + Self-Check Quick (markdown) | pertanyaan refleksi + checklist `- [ ]` yang juga menampung daftar luaran |

---

## 3. Pembuka lab: langsung ke tugas

Lab dibuka dengan **tugasnya**, bukan dengan seremoni. Mahasiswa harus tahu apa yang dikerjakan dalam tiga detik pertama. Format baku:

```markdown
# Lab WX: Judul Ringkas

Satu sampai dua kalimat SPOK: apa yang dikerjakan mahasiswa dan kenapa. Boleh menyebut § bab rujukan di sini.

**Prasyarat:** Bab WX §... sudah dibaca, Lab W... selesai, familiar dengan ... (konkret, 1 baris). **Hardware & waktu:** CPU cukup / GPU dianjurkan, ~X-Y jam.

## Alur Lab

1. **Lead-in:** langkah konkret yang dikerjakan.
2. **Lead-in:** langkah berikutnya.
3. ...
```

Aturan:

- **Tidak ada heading "Pre-flight Checklist".** Tidak ada blok "Yang Anda hasilkan" atau "Kebutuhan teknis" multi-bullet di atas. Itu seremoni yang menunda mahasiswa melihat tugas.
- **Kalimat tugas wajib SPOK utuh** dan langsung menyebut apa yang dibuat: "Kamu mengimplementasi `mixup_batch` lewat protokol 5-tahap LLM lalu menguji dengan sanity test", bukan "Lab ini membahas mixup".
- **Prasyarat, hardware, dan estimasi waktu dipadatkan jadi satu baris** dengan lead-in bold (`**Prasyarat:**`, `**Hardware & waktu:**`). Detail storage hanya ditulis kalau memang besar dan relevan.
- **Status lab** (wajib / utama / opsional / Breadth Check) masuk ke **judul** atau kalimat tugas, bukan admonition block tersendiri. Contoh: `# Lab W7b (WAJIB - Breadth Check Transformer): Transformer-Mini dari Nol`.
- **Rujukan § bab** cukup satu klausa di kalimat tugas atau baris prasyarat, bukan admonition `> [!IMPORTANT]`.
- **Daftar luaran pindah ke akhir** sebagai `## Self-Check Quick` (§5). Jangan duplikat di atas.
- **`## Alur Lab` adalah konten pertama setelah baris prasyarat** dan wajib ada (lihat §1.2).
- Admonition `> [!TIP]` / `> [!WARNING]` yang berisi peringatan teknis nyata (mis. "jangan skip `repo_map.md`, itu produk utama lab") tetap dipertahankan, tapi diletakkan di **section tempat konsepnya dibahas**, bukan di pembuka.

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
2. **Self-Check Quick** berupa GitHub task list `- [ ]`, satu baris per luaran yang harus ada. Section ini menampung daftar luaran yang bisa dicek (artefak yang dulu ditulis di blok "Yang Anda hasilkan" di atas) - jadi tempat memeriksa luaran ada di akhir, bukan di pembuka. Baris terakhir biasanya menautkan lab wajib lain atau Breadth Check bila relevan.

Sel jawaban dikosongkan dengan placeholder `> *[tulis di sini]*` di bawah tiap sub-pertanyaan, supaya mahasiswa mengisi langsung di notebook.

---

## 6. Checklist Audit-Diri (jalankan sebelum lab dinyatakan selesai)

- [ ] Tidak ada `import` dari `src/`, tidak ada `sys.path`, tidak ada dead code (`grep` bersih).
- [ ] Semua kelas/fungsi yang dipakai didefinisikan inline di notebook.
- [ ] Urutan sel mengikuti pola kecil-ke-besar; smoke test muncul sebelum training penuh.
- [ ] Tidak ada sel teks yang menjelaskan aturan penyusunan lab (framing "bottom-up", catatan "tanpa impor dari `src/`", dll).
- [ ] `## Alur Lab` ada sebagai konten pertama, tanpa label "(bottom-up)" dan tanpa kalimat rasional pedagogis.
- [ ] Pembuka langsung ke tugas: tidak ada heading "Pre-flight Checklist", tidak ada blok "Yang Anda hasilkan"/"Kebutuhan teknis" di atas. Tugas tampil di 1-2 kalimat pembuka, prasyarat+hardware+waktu jadi 1 baris, status lab di judul/kalimat tugas, luaran pindah ke Self-Check Quick di akhir.
- [ ] Setiap `## N.` punya lead sentence SPOK utuh dan ringkas, bukan fragmen atau label.
- [ ] Tidak ada em dash di teks, komentar, judul plot, maupun string print.
- [ ] Tidak ada kiasan untuk konsep teknis.
- [ ] Ada section refleksi + Self-Check Quick `- [ ]`.
- [ ] Notebook valid JSON, dijalankan dari atas ke bawah tanpa error.

---

## 7. Contoh Acuan

`lab_w7_llm_assisted.ipynb` dipakai sebagai contoh acuan struktur dan gaya pembuka "langsung ke tugas". Saat ragu soal format kalimat tugas, baris prasyarat, Alur Lab, atau Self-Check Quick, lihat lab itu lebih dulu. Lab W1-W6 dan W12 masih memakai pola lama (Pre-flight Checklist) dan akan menyusul.

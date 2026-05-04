# Modul Pembelajaran Asisten Dosen AI

Modul ini dirancang untuk mahasiswa S1 yang ingin belajar *riset* machine learning dan deep learning - bukan sekadar menjalankan model, tetapi memahami mengapa eksperimen dirancang seperti itu, bagaimana hasilnya dipercaya, dan apa yang harus dilakukan ketika instruksi dari dosen pembimbing masih terbuka.

**Versi web interaktif:** [muhammad-zainal-muttaqin.github.io/Module-DS](https://muhammad-zainal-muttaqin.github.io/Module-DS/) - SPA untuk membaca 15 bab (termasuk Panduan Instruktur), mengisi jurnal refleksi, melacak progres 14 minggu, self-assess 10 kompetensi, dan menghasilkan protokol eksperimen. Sumber website di [`website/`](website/).

Satu semester berjalan **11 minggu bootcamp + 4 minggu capstone**. Setiap minggu membawa satu *rigor habit* baru yang dibangun di atas yang sebelumnya, satu atau lebih lab, dan satu thread yang menghubungkan ke Big Map keseluruhan. Di akhir bootcamp, mahasiswa mempertahankan framing riset di W12 sebelum 4 minggu eksekusi capstone dimulai.

---

## Untuk Siapa Modul Ini

Modul ini menyasar mahasiswa semester 4–6 yang sudah:

- Menulis program Python tingkat menengah (fungsi, kelas, modul, virtual environment).
- Mengenal dasar kalkulus turunan dan aljabar linear (perkalian matriks, gradien).
- Pernah setidaknya sekali menjalankan model ML (regresi atau klasifikasi scikit-learn).

Jika dua prasyarat pertama belum solid, kerjakan lebih dulu *primer* pada [Lampiran F - Prasyarat](chapters/14_Lampiran.md#f-prasyarat). Modul tidak mengulang dasar Python atau kalkulus di dalam bab utama.

---

## Peta 11+4 Minggu

### Bootcamp (Minggu 1-11)

| Minggu | Topik | Bab | Lab utama | Rigor Habit |
|---|---|---|---|
| 1 | Tabular, output heads, observasi pertama | [01](chapters/01_W1_Tabular_Output_Heads.md) | Lab 0 | Observation before conclusion |
| 2 | Images, CNN, smoke test tiga level | [02](chapters/02_W2_Images_CNN_Smoke_Test.md) | Lab 1 | Three-level smoke test |
| 3 | Loss, optimizer, galeri run (example-first) | [03](chapters/03_W3_Loss_Optimizer_Evaluasi.md) | Lab 1 + Lab 2 | Change one thing at a time |
| 4 | Reproducibility + experiment matrix | [04](chapters/04_W4_Reproducibility_Experiment_Matrix.md) | Lab 3 | Experiment matrix before coding |
| 5 | Sequences: RNN vs LSTM, gradient flow | [05](chapters/05_W5_Sequences_RNN_LSTM.md) | Lab 3b (wajib) | Long-sequence diagnosis |
| 6 | Representations + temporal leakage demo | [06](chapters/06_W6_Representations_Temporal_Leakage.md) | Lab 6 (leakage) | Validate preprocessing |
| 7 | Text, Transformers, repo adoption | [07](chapters/07_W7_Text_Transformers_Repo_Adoption.md) | Lab 5b + Lab 6 | Verify AI code + repo map |
| 8 | Foundation models taxonomy + adaptation choice | [08](chapters/08_W8_Foundation_Models.md) | FM Map | Model-card literacy |
| 9 | Multimodal reasoning + per-modality ablation | [09](chapters/09_W9_Multimodal_Reasoning.md) | Lab 8 | Per-modality ablation |
| 10 | Paper reading 3-pass + paper-to-code | [10](chapters/10_W10_Paper_Reading.md) | Lab 9 | Three-pass reading |
| 11 | Research framing (Input → Middle → Output) + komitmen framing | [11](chapters/11_W11_Research_Framing.md) | Workshop framing | Dekomposisi Input → Middle → Output + triage literatur |

### Capstone (Minggu 12-15)

| Minggu | Fase | Bab | Required outputs |
|---|---|---|---|
| 12 | Filter dan komitmen framing; Eksperimen 1 | [12](chapters/12_Capstone.md) | Framing disetujui; pre-reg Eks 1 di-commit; Eks 1 mulai |
| 13 | Rethink dan iterasi; Eksperimen 2 | [12](chapters/12_Capstone.md) | Dokumen rethink; pre-reg Eks 2 di-commit |
| 14 | Presentasi final (research talks 20 mnt) | [12](chapters/12_Capstone.md) | Laporan draft; demo; feedback Q&A |
| 15 | Pengumpulan final (tanpa sesi kelas) | [12](chapters/12_Capstone.md) | Laporan final + repo tag `v1.0` + demo |

---

## Cara Memakai Modul

Modul dimaksudkan dibaca **berurutan** pertama kali, karena bab-bab awal membangun kosakata dan kebiasaan yang dipakai bab-bab berikutnya. Setelah sekali menamatkan, setiap bab berdiri sendiri sebagai rujukan.

Setiap bab mengikuti ritme tetap:

1. **Peta Bab** - gambaran isi dalam tiga kalimat.
2. **Motivasi** - satu skenario riset yang menciptakan kebutuhan terhadap konsep.
3. **Konsep Inti** - penjelasan pedagogis dengan contoh konkret.
4. **Worked Example** - satu kasus yang dituntaskan penuh.
5. **Pitfalls & Miskonsepsi** - kesalahan umum dan cara mendeteksinya.
6. **Lab Hands-on** - notebook yang harus diselesaikan.
7. **Refleksi** - tiga pertanyaan terbuka untuk menguji pemahaman.
8. **Bacaan Lanjutan** - kurasi singkat, masing-masing dengan alasan.

Kerjakan lab pada minggu yang sama dengan membaca materinya. Menunda lab membuat konsep berikutnya terasa seperti deretan istilah tanpa pijakan.

---

## Filosofi Singkat

Modul ini dibangun bertumpu pada empat sikap yang dianggap lebih penting daripada penguasaan framework apapun:

- **Curiosity** - bertanya "mengapa model berperilaku seperti ini?" sebelum menerima hasil.
- **Rigor** - mengubah satu variabel pada satu waktu, mencatat apa yang diubah, menyimpan cukup informasi agar orang lain dapat mengulangi.
- **Skepticism** - tidak percaya pada angka akurasi sebelum memeriksa dari mana angka itu berasal.
- **Ownership** - memikul tanggung jawab atas hasil akhir, termasuk ketika sebagian kode ditulis oleh LLM atau disalin dari repositori orang lain.

Keempat sikap ini tidak dibahas dalam bab khusus, tetapi dirangkai ke dalam cerita pembuka, pitfall, dan pertanyaan refleksi di setiap bab. Tujuannya sederhana: sikap dipelajari melalui pembiasaan, bukan ceramah.

---

## Struktur Folder

```
ModulePembelajaran/
├── README.md
├── chapters/                                 (17 file .md bab)
│   ├── 00_Pendahuluan.md
│   ├── 00a_Prasyarat.md
│   ├── ... (through 15_Panduan_Instruktur.md)
│   └── 15_Panduan_Instruktur.md
├── figures/                                  Diagram dan ilustrasi
├── template/                                 Skeleton repo riset
├── website/                                  SPA React + Vite
├── Notes - <tanggal>/                        Catatan sumber (referensi)
└── _archive/                                 File lama (tidak dirender)
```

---

## Untuk Dosen Pengampu

Baca [15_Panduan_Instruktur.md](chapters/15_Panduan_Instruktur.md) untuk panduan operasional lengkap: filosofi modul, pacing 11+4 minggu, emphasis per-bab, cara membaca rubrik, cara menilai portofolio, dan skenario kelas yang umum. Rubrik evaluasi ada di [13_Rubrik_Penilaian.md](chapters/13_Rubrik_Penilaian.md).

---

## Langkah Selanjutnya

Mulai dari [00 - Pendahuluan](00_Pendahuluan.md). Bab tersebut menjelaskan mengapa sepuluh kompetensi ini dipilih, dan kontrak kecil yang perlu dipahami sebelum masuk ke materi teknis.

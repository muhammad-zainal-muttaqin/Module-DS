import type { SlideSection } from "./index";

export const slides04: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W4: Reproducibility & Matriks Eksperimen",
    subtitle: "Mengubah satu instruksi atau diagnosis jadi eksperimen yang terkontrol dan bisa dicek ulang orang lain.",
    footnote: "Bab 04 - Minggu 4",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Empat materi minggu ini mengikuti alur kerja satu eksperimen, dari rancangan sampai laporan:",
    gridItems: [
      {
        title: "1. Rancangan Penelitian",
        body: "Kita menulis protokol sebelum kode: variabel yang diuji, baseline, hipotesis, dan metrik penentu sukses.",
      },
      {
        title: "2. Training Terkontrol",
        body: "Kita menjalankan eksperimen dengan satu variabel berubah, lalu mengulangnya beberapa seed.",
      },
      {
        title: "3. Trace Result",
        body: "Kita merekam tiap run lewat YAML, seed, checkpoint, dan git hash supaya bisa direproduksi di komputer lain.",
      },
      {
        title: "4. Hasil Research",
        body: "Kita melaporkan angka sebagai tabel mean ± std lalu menyimpulkannya terhadap hipotesis.",
      },
    ],
  },

  // -- 3: Recap W3 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W3)",
    body: "W3 mengajarkan cara membaca dan menilai hasil training. Outputnya menjadi bahan mentah W4:",
    bullets: [
      "Kita belajar membaca loss curve untuk mendiagnosis training, lalu memilih loss dan optimizer dengan alasan.",
      "Kita mengevaluasi model dengan metrik yang sesuai untuk kondisi kelas yang tidak seimbang.",
      "Output yang dibawa: satu diagnosis baseline CIFAR-10 berisi gejala, usulan ablation, dan hipotesis.",
    ],
    footnote: "Smoke test tiga level dari W2 tetap dipakai sebelum setiap run penuh.",
  },

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Rancangan Penelitian",
    body: "Rancangan penelitian ditulis sebelum kode. Isinya empat hal: variabel yang diuji, baseline pembanding, hipotesis, dan metrik yang menentukan sukses atau gagal.",
    footnote: "Rancangan disimpan sebagai protocol.md, dan tanggal file menjadi bukti rencana ditulis sebelum hasil keluar.",
  },

  // -- 5: Protokol --
  {
    layout: "code",
    title: "Protokol: contoh yang bisa disalin",
    body: "Berikut contoh protocol.md untuk eksperimen focal loss dan freeze pada CIFAR-10:",
    lang: "markdown",
    code: `# Protokol: Focal Loss + Freeze pada CIFAR-10

Variabel uji : CrossEntropy -> FocalLoss(gamma=2.0), block1 di-freeze
Baseline     : SimpleCNN, CrossEntropy, semua layer trainable
Konstan      : AdamW lr=3e-4, batch 128, 20 epoch, seed {42, 43, 44}
Hipotesis    : F1 kelas minor naik >= 3 poin, akurasi total turun <= 1 poin
Metrik       : utama F1 kelas minor; pengaman akurasi total, train/val gap`,
    footnote: "Tiap baris menutup satu ambiguitas, sehingga orang lain bisa menjalankan ulang tanpa menebak.",
  },

  // -- 6: Lima pertanyaan --
  {
    layout: "grid",
    title: "Lima pertanyaan sebelum kode",
    body: "Protokol yang baik menjawab lima pertanyaan ini, semuanya ditetapkan sebelum melihat hasil:",
    gridItems: [
      {
        title: "1. Variabel apa yang berubah?",
        body: "Jawablah spesifik, misalnya CrossEntropyLoss menjadi FocalLoss(gamma=2.0), satu eksperimen per variabel.",
      },
      {
        title: "2. Apa baseline yang setara?",
        body: "Baseline identik pada semua variabel lain: arsitektur, data, optimizer, lr, seed, dan epoch.",
      },
      {
        title: "3. Apa hipotesisnya?",
        body: "Hipotesis berbentuk pernyataan yang bisa salah, misalnya F1 kelas minor naik minimal 3 poin.",
      },
      {
        title: "4. Metrik sukses apa?",
        body: "Urutkan metrik utama, sekunder, dan pengaman yang tidak boleh memburuk.",
      },
      {
        title: "5. Bentuk hasil apa yang diharapkan?",
        body: "Bayangkan tampilan log saat hipotesis benar dan saat salah, sebelum run berjalan.",
      },
    ],
    footnote: "Jawaban yang ditulis di awal menahan godaan mengubah cerita setelah melihat data.",
  },

  // -- 7: Matriks eksperimen --
  {
    layout: "table",
    title: "Matriks eksperimen",
    body: "Satu hipotesis dipecah jadi baris-baris run, masing-masing dengan satu variabel berubah:",
    tableHead: ["Run ID", "Variabel berubah", "Nilai", "Seed", "Status"],
    tableRows: [
      ["baseline_s42", "- (kontrol)", "-", "42", "planned"],
      ["focal_s42", "loss", "FocalLoss(gamma=2.0)", "42", "planned"],
      ["freeze_s42", "freeze_until", "block1", "42", "planned"],
    ],
    footnote: "Protokol dan matriks ini dikirim ke dosen untuk konfirmasi asumsi sebelum training berjalan.",
  },

  // -- 8: Materi 2 --
  {
    layout: "section",
    title: "2. Training Terkontrol",
    body: "Aturan utamanya: ubah satu variabel, kunci sisanya. Kalau loss dan learning rate diganti bersamaan lalu akurasi naik, kontribusi masing-masing tidak bisa dipisahkan.",
    footnote: "Seed divariasikan untuk replikasi, terpisah dari variabel yang diuji.",
  },

  // -- 9: Apa yang boleh diubah --
  {
    layout: "code",
    title: "Apa yang diubah, dikunci, divariasikan",
    body: "Daftar berikut bisa disalin sebagai acuan satu ablation. Pilih satu baris di kelompok atas untuk diubah, kunci sisanya:",
    lang: "text",
    code: `Diubah (satu per eksperimen):
  loss          CrossEntropy / FocalLoss / label smoothing
  optimizer     SGD / AdamW
  learning rate nilai lr
  freeze_until  layer mana yang dibekukan
  augmentasi    crop / flip / colorjitter

Dikunci (sama di semua run):
  arsitektur, dataset, jumlah epoch, batch size

Divariasikan untuk replikasi:
  seed`,
    footnote: "Pemilihan loss dan optimizer mengikuti pembahasan W3.",
  },

  // -- 10: Ablation image --
  {
    layout: "image",
    title: "Desain ablation: satu variabel per kondisi",
    imageUrl: "/figures/fig02a_ablation_design.svg",
    caption: "Gambar ini menunjukkan satu baseline dan tiga varian, di mana tiap varian hanya mengubah satu variabel dari baseline. Susunan ini membuat setiap selisih performa bisa diatribusikan ke satu perubahan yang jelas.",
    footnote: "Tanpa kontrol seperti ini, kenaikan akurasi tidak bisa dikaitkan ke satu penyebab.",
  },

  // -- 11: Tabel konfigurasi --
  {
    layout: "table",
    title: "Membaca tabel konfigurasi secara vertikal",
    body: "Telusuri tiap kolom dari atas ke bawah: kolom yang seragam adalah kontrol, kolom yang berubah adalah yang diuji.",
    tableHead: ["Run", "Loss", "gamma", "Freeze", "LR", "Seed"],
    tableRows: [
      ["baseline_s42", "CE", "-", "none", "3e-4", "42"],
      ["baseline_s43", "CE", "-", "none", "3e-4", "43"],
      ["focal_s42", "Focal", "2.0", "block1", "3e-4", "42"],
      ["focal_s43", "Focal", "2.0", "block1", "3e-4", "43"],
    ],
    footnote: "Batch size dan learning rate saling terkait: kalau batch naik k kali, lr umumnya naik k kali (linear scaling rule).",
  },

  // -- 12: Seed variance --
  {
    layout: "bullets",
    title: "Satu run tidak cukup: seed variance",
    body: "Model dengan seed berbeda menghasilkan akurasi yang berbeda beberapa poin tanpa perubahan lain. Tiga aturan menjaga kesimpulan tetap jujur:",
    bullets: [
      "Seed variance pada CIFAR-10 baseline sekitar ±0.5-1.5%, sehingga klaim naik 1.7% bisa tertelan noise.",
      "Jalankan minimal tiga seed per kondisi, lalu laporkan rata-rata dan standar deviasi.",
      "Selisih bermakna kalau lebih besar dari 2× std gabungan (aturan 2σ) atau melewati ambang efek yang ditetapkan di protokol.",
    ],
    footnote: "Selisih di bawah 0.5 poin dengan tiga seed hampir selalu noise.",
  },

  // -- 13: Materi 3 --
  {
    layout: "section",
    title: "3. Trace Result",
    body: "Hasil harus bisa direproduksi di komputer lain. Untuk itu tiap run merekam empat hal: config YAML, seed, checkpoint metadata, dan git hash.",
    footnote: "Folder eksperimen direproduksi dari config.yaml dan commit hash.",
  },

  // -- 14: Empat pilar (image) --
  {
    layout: "image",
    title: "Empat hal yang direkam tiap run",
    imageUrl: "/figures/fig03a_reproducibility_sources.svg",
    caption: "Gambar ini menunjukkan empat hal yang saling mengunci: config YAML menyimpan seluruh hyperparameter, seed dikunci di awal training, checkpoint membawa metadata lengkap, dan git hash mengikat run ke commit penghasilnya.",
    footnote: "Bersama-sama, keempatnya membuat satu hasil bisa ditelusuri balik ke kondisi persis yang menghasilkannya.",
  },

  // -- 15: Apa yang dilakukan tiap rekaman --
  {
    layout: "grid",
    title: "Apa yang dilakukan tiap rekaman",
    body: "Dari gambar tersebut, keempat rekaman membagi tugas menjaga hasil tetap bisa diulang:",
    gridItems: [
      {
        title: "Config YAML",
        body: "Seluruh hyperparameter dideklarasikan di satu file, lalu disimpan bersama checkpoint.",
      },
      {
        title: "Seed",
        body: "set_seed(cfg['seed']) dipanggil sebelum operasi apa pun, satu seed per run.",
      },
      {
        title: "Checkpoint metadata",
        body: "Selain model.state_dict(), checkpoint menyimpan config, git_hash, epoch, metrics, dan timestamp.",
      },
      {
        title: "Git hash",
        body: "Tiap run terikat ke commit penghasilnya, dan flag dirty menandai perubahan yang belum di-commit.",
      },
    ],
    footnote: "Implementasi keempatnya ada di template/src/utils.py.",
  },

  // -- 16: YAML config --
  {
    layout: "code",
    title: "Bentuk config YAML",
    body: "Setiap hyperparameter dideklarasikan di satu file. Untuk ablation, salin file ini dan ubah hanya bagian yang relevan:",
    lang: "yaml",
    code: `experiment_name: baseline
seed: 42                    # dikunci satu seed per run

model:
  name: simple_cnn
  freeze_until: null        # tidak ada yang di-freeze

loss:
  name: cross_entropy

optim:
  name: sgd
  lr: 0.05
  weight_decay: 5.0e-4`,
    footnote: "Dengan begitu, dua run berbeda persis pada satu variabel dan sisanya identik.",
  },

  // -- 17: Struktur folder --
  {
    layout: "image",
    title: "Struktur folder satu run",
    imageUrl: "/figures/fig03b_experiment_folder.svg",
    caption: "Gambar ini menunjukkan isi satu folder eksperimen: config.yaml, train.log, checkpoint bermetadata, summary.json, dan folder TensorBoard. Struktur yang seragam membuat tiap run punya bentuk yang sama dan mudah dibandingkan.",
    footnote: "Lab W4 membangun folder ini langkah demi langkah.",
  },

  // -- 18: Materi 4 --
  {
    layout: "section",
    title: "4. Hasil Research",
    body: "Hasil dilaporkan sebagai tabel mean ± std, diikuti interpretasi singkat terhadap hipotesis.",
    footnote: "Hipotesis yang meleset tetap dicatat sebagai temuan.",
  },

  // -- 19: Tabel hasil --
  {
    layout: "table",
    title: "Tabel hasil: mean ± std",
    body: "Enam run (dua kondisi × tiga seed) menghasilkan tabel agregat berikut:",
    tableHead: ["Kondisi", "F1 minor (mean ± std)", "Akurasi total", "Train/val gap"],
    tableRows: [
      ["Baseline (CE)", "0.612 ± 0.018", "0.781 ± 0.007", "0.09"],
      ["Focal + Freeze", "0.672 ± 0.014", "0.774 ± 0.011", "0.11"],
    ],
    footnote: "Angka tunggal tanpa std dan tanpa interpretasi tidak cukup untuk diklaim.",
  },

  // -- 20: Interpretasi + lapor ke dosen --
  {
    layout: "bullets",
    title: "Interpretasi dan laporan ke dosen",
    body: "Tabel saja tidak cukup; tulis interpretasi terhadap tiap hipotesis sebelum dosen bertanya:",
    bullets: [
      "H1 terkonfirmasi: F1 minor naik 6 poin, melewati ambang 3 poin, dengan std kecil di tiga seed.",
      "H2 terkonfirmasi: akurasi total turun 0.7 poin, masih di bawah ambang 1 poin.",
      "Catatan pengaman: train/val gap naik dari 0.09 ke 0.11, sinyal awal overfitting yang perlu dipantau.",
    ],
    footnote: "Laporkan ke dosen sebagai tabel plus interpretasi dan batasannya: berapa seed, dataset apa, dan apa yang belum diuji.",
  },

  // -- 21: Tiga skenario hipotesis meleset --
  {
    layout: "grid",
    title: "Saat hipotesis meleset: tiga skenario",
    body: "Hipotesis sering meleset, dan itu data. Tiap skenario menuntut verifikasi berbeda sebelum menyimpulkan:",
    gridItems: [
      {
        title: "A. Mendekati ambang",
        body: "Hasil hampir sampai, misalnya selisih 1.8 poin dari target 3. Tambah dua seed; kalau tetap, catat sebagai temuan negatif tanpa klaim terkonfirmasi sebagian.",
      },
      {
        title: "B. Berlawanan arah",
        body: "F1 justru turun. Audit implementasi (gamma=0 harus identik dengan CE) dan pastikan baseline setara sebelum menyimpulkan.",
      },
      {
        title: "C. Terlalu bagus",
        body: "Naik jauh di atas prediksi, misalnya 12 poin. Curigai bug atau leakage: cek test set tidak menyentuh training dan tidak ada variabel lain yang berubah.",
      },
    ],
    footnote: "Hasil negatif yang terdokumentasi mencegah orang lain mengulang eksperimen yang sama.",
  },

  // -- 22: Lab W4 --
  {
    layout: "bullets",
    title: "Lab W4",
    body: "Lab membangun infrastruktur reproduksibilitas, mengikuti urutan empat materi di atas:",
    bullets: [
      "Tulis protocol.md dan matriks dari satu hipotesis bridge W3 sebelum menyentuh kode.",
      "Jalankan dua dry-run seed sama, lalu bandingkan val accuracy untuk menguji reproduksibilitas.",
      "Periksa metadata checkpoint, uji dirty flag, dan verifikasi resume melanjutkan epoch.",
    ],
    footnote: "Checklist: protokol ditulis lebih dulu, config dan checkpoint tersimpan bersama, git hash tercatat, resume melanjutkan epoch, dan mean ± std diringkas kalau ada beberapa seed.",
  },

  // -- 23: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Tiga pertanyaan untuk dibawa ke portofolio mandiri:",
    bullets: [
      "Baseline repo memakai lr=1e-3, tetapi pengalaman Anda 3e-4 lebih stabil. Tulis dua rencana eksperimen dan kapan masing-masing lebih tepat.",
      "Hipotesis gagal: F1 minor tidak naik, akurasi total turun. Tulis tiga pertanyaan berikutnya, urut dari yang tidak perlu training baru.",
      "Untuk satu topik kandidat Capstone, tulis draft tiga bagian protokol (tujuan, variabel, hipotesis) dalam satu paragraf.",
    ],
  },

  // -- 24: Lanjut ke W5 --
  {
    layout: "bullets",
    title: "Lanjut ke W5",
    body: "W5 memperluas Big Map ke domain sequence, dengan disiplin W4 tetap berlaku:",
    bullets: [
      "Tensor sequence (T, F) masuk sebagai input, dan arsitektur recurrent (RNN, LSTM) memproses urutan satu langkah waktu demi satu.",
      "Diagnosis gradient flow menjadi kebiasaan baru minggu depan.",
      "Rancangan penelitian, kontrol satu variabel, dan trace result dari W4 dipakai di setiap eksperimen berikutnya.",
    ],
  },

  // -- 25: CTA --
  {
    layout: "cta",
    title: "Mulai Lab W4",
    body: "Semua konsep deck ini ada di lab notebook: protocol dan matriks, penguncian seed, dry-run reproducibility, checkpoint bermetadata, dirty flag, dan resume state.\n\nEstimasi waktu 3-4 jam termasuk inspeksi checkpoint dan refleksi.",
    ctaText: "Buka Lab W4 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w4_experiment_tracking.ipynb",
  },
];

import type { SlideSection } from "./index";

export const slides01: SlideSection[] = [
  // ── Slide 1: Title ──
  {
    layout: "title",
    title: "W1: Tabular, Output Heads & Loss Matching",
    subtitle: "MLP sebagai pengubah bentuk tensor. Task menentukan head, head menentukan loss.",
    body: "Lab 1a: 3 perumusan tugas + eksperimen mismatch. Lab 1b: MLP dari nol dengan NumPy.",
    footnote: "Bab 01 - Minggu 1",
  },

  // ── Slide 1b: Kuis Pembuka ──
  {
    layout: "bullets",
    title: "Kuis Pembuka: Sebelum Kita Mulai",
    bullets: [
      "**Soal 1:** Dataset harga rumah (angka kontinu). Task apa? Loss apa?",
      "**Soal 2:** Deteksi email spam. Output head: `Linear(D,1)` atau `Linear(D,2)`?",
      "**Soal 3:** Prediksi 3 kategori cuaca. Target y bertipe `int` atau `float`?",
    ],
    footnote: "Tiga soal, 3 menit. Tidak dinilai - untuk memetakan titik awal sebelum masuk materi.",
  },

  // ── Slide 1c: Jawaban Kuis Pembuka ──
  {
    layout: "grid",
    title: "Jawaban Kuis Pembuka",
    gridItems: [
      {
        title: "Soal 1: Regresi + MSELoss",
        body: "Nilai kontinu → regresi. MSELoss untuk rata-rata kuadrat selisih. Head: Linear(D,1) tanpa aktivasi.",
      },
      {
        title: "Soal 2: Dua pilihan valid",
        body: "Linear(D,1)+BCEWithLogitsLoss atau Linear(D,2)+CrossEntropyLoss. Pilih satu dan konsisten di seluruh eksperimen.",
      },
      {
        title: "Soal 3: int64",
        body: "CrossEntropyLoss butuh target integer 0..N-1, bukan one-hot float. `y = torch.tensor([0,1,2], dtype=torch.long)`.",
      },
    ],
    footnote: "Jika ketiga jawaban langsung benar - slide berikutnya adalah konfirmasi. Jika ada yang ragu - W1 menjelaskan semuanya.",
  },

  // ── Slide 2: Mengapa tabular lebih dulu ──
  {
    layout: "section",
    title: "Mengapa Tabular Lebih Dulu?",
    body: "Empat alasan praktis: pipeline paling pendek (tidak ada augmentasi, tidak ada tokenizer), tiga perumusan tugas bisa diuji pada dataset yang sama, bug loss-head terlihat jelas dari output shape, dan tidak ada domain baru yang perlu dipelajari.",
    footnote: "Mulai dari tabular karena kompleksitasnya paling rendah, bukan karena tabular lebih penting dari domain lain.",
  },

  // ── Slide 3: Gambar satu dataset tiga tugas ──
  {
    layout: "image",
    title: "Satu Dataset, Tiga Tugas",
    imageUrl: "/figures/fig01g_tiga_tugas.png",
    caption: "Badan MLP bersama menghasilkan representasi, lalu tiga head berbeda menyesuaikan task",
    footnote: "Badan (body) sama - hanya head yang berbeda. Ini yang memungkinkan perbandingan yang setara.",
  },

  // ── Slide 4: MLP sebagai pengubah bentuk ──
  {
    layout: "split",
    title: "MLP sebagai Pengubah Bentuk Tensor",
    left: {
      title: "Alur Shape",
      bullets: [
        "Input: **(B, F)** - B sampel tabular, F fitur",
        "Layer 1: (B,F) → (B,64) dengan Linear+ReLU",
        "Layer 2: (B,64) → (B,32) dengan Linear+ReLU",
        "Head: (B,32) → **(B, 1 atau 2 atau K)** sesuai task",
      ],
    },
    right: {
      title: "Mengapa Butuh Non-Linearitas?",
      body: "Dua layer Linear tanpa aktivasi secara matematika setara dengan satu Linear saja - gabungannya tetap fungsi linier.\n\nReLU menyisipkan tikungan di antara lapisan, sehingga decision boundary bisa melengkung dan mengikuti data yang tidak linier.",
    },
    footnote: "Fakta ini (non-linearitas wajib) akan muncul lagi di W2 (CNN) dan W5 (RNN).",
  },

  // ── Slide 5: Linear Layer mekanik ──
  {
    layout: "bullets",
    title: "Linear Layer: Mekanik",
    bullets: [
      "Formula: **y = W × x + b** - satu perkalian matriks ditambah bias",
      "Contoh `nn.Linear(10, 64)`: W berukuran (64, 10) = 640 parameter, b berukuran (64,) = 64 parameter",
      "Total layer ini: **704 parameter** - semuanya akan menerima gradient saat backward",
      "Shape berubah: **(B, 10) → (B, 64)** - dimensi fitur berubah, ukuran batch tetap",
      "ReLU setelahnya: `max(0, x)` - nilai negatif jadi nol, positif tetap",
    ],
    footnote: "Parameter = weight + bias. Semakin dalam jaringan, semakin banyak parameter yang perlu diupdate.",
  },

  // ── Slide 6: nn.Linear kode ──
  {
    layout: "code",
    title: "nn.Linear: Forward Pass",
    body: "Cara paling langsung melihat transformasi shape di PyTorch.",
    code: `import torch.nn as nn

# Definisi layer
layer = nn.Linear(10, 64)

# Forward pass
x = torch.randn(32, 10)
y = layer(x)
print(y.shape)                # torch.Size([32, 64])

# Tambah ReLU
z = nn.ReLU()(y)
print(z.shape)                # torch.Size([32, 64])`,
    lang: "python",
    footnote: "Shape output (B, 64) - dimensi batch tidak berubah. Hanya dimensi fitur yang berubah.",
  },

  // ── Slide 7: Body vs Head ──
  {
    layout: "split",
    title: "Body dan Head: Struktur Dua Bagian",
    left: {
      title: "Badan Bersama (Shared Body)",
      body: "Rangkaian Linear+ReLU yang mengekstrak representasi dari data mentah. Sama untuk semua task.\n\nOutput badan: tensor **(B, H)** dengan H sebagai ukuran hidden layer terakhir.",
    },
    right: {
      title: "Head Berbeda per Task",
      bullets: [
        "**Regresi:** `Linear(H, 1)` tanpa aktivasi",
        "**Biner:** `Linear(H, 2)` + CrossEntropyLoss",
        "**Multikelas:** `Linear(H, K)` + CrossEntropyLoss",
        "Head yang salah = loss tidak bisa turun dengan benar",
      ],
    },
    footnote: "Badan = representasi umum. Head = spesialisasi per task. Kesalahan di head lebih mudah didiagnosis.",
  },

  // ── Slide 8: Harus dipasangkan ──
  {
    layout: "section",
    title: "Output Head + Loss: Harus Dipasangkan",
    body: "Ini bukan pilihan bebas. Task menentukan head, head menentukan loss. Menukar pasangan ini menghasilkan bug yang sulit didiagnosis - loss masih bisa turun, tapi model tidak belajar yang benar.",
    footnote: "Tiga perempat bug di W1 berasal dari loss-head mismatch. Lab W1 meminta untuk mengalaminya secara sengaja.",
  },

  // ── Slide 9: Regresi ──
  {
    layout: "split",
    title: "Regresi: MSE + Linear Head",
    left: {
      title: "Arsitektur",
      body: "Output head: `nn.Linear(H, 1)` tanpa aktivasi apapun. Output shape: **(B, 1)** - satu nilai kontinu per sampel.\n\nTarget y adalah bilangan real, bukan indeks kelas.",
    },
    right: {
      title: "Loss: MSELoss",
      body: "`MSELoss` menghitung rata-rata kuadrat selisih:\n\n(1/N) × Σ (ŷ - y)²\n\nSensitif terhadap outlier karena dikuadratkan. Untuk data dengan outlier banyak, pertimbangkan `L1Loss` (MAE) sebagai alternatif.",
    },
    footnote: "MSE selalu positif dan nol hanya jika prediksi sempurna. Unitnya dikuadratkan - perhatikan hal ini saat membaca hasil.",
  },

  // ── Slide 10: Binary ──
  {
    layout: "split",
    title: "Klasifikasi Biner: CrossEntropy + 2 Output",
    left: {
      title: "Arsitektur",
      body: "Output head: `nn.Linear(H, 2)` - dua logit, satu per kelas (kelas 0 dan kelas 1).\n\nEval: `logits.argmax(dim=1)` menghasilkan prediksi kelas dengan shape **(B,)**.",
    },
    right: {
      title: "Loss: CrossEntropyLoss",
      body: "`CrossEntropyLoss` sudah memasukkan softmax di dalamnya - masukkan **logit mentah**.\n\nJangan tambahkan Softmax atau Sigmoid sebelum loss. Jika memakai BCEWithLogitsLoss, output head harus `Linear(H, 1)` bukan `Linear(H, 2)`.",
    },
    footnote: "Dua pendekatan biner (2 output + CE vs 1 output + BCE) keduanya valid - pilih satu dan konsisten.",
  },

  // ── Slide 11: Multiclass ──
  {
    layout: "split",
    title: "Klasifikasi Multikelas: CrossEntropy + K Output",
    left: {
      title: "Arsitektur",
      body: "Output head: `nn.Linear(H, K)` - K logit untuk K kelas. Untuk 3 kelas: output shape **(B, 3)**.\n\nEval: `logits.argmax(dim=1)` menghasilkan indeks kelas prediksi.",
    },
    right: {
      title: "Loss: CrossEntropyLoss",
      body: "Sama dengan biner tapi K > 2. Log-softmax sudah ada di dalam loss.\n\nTarget: tensor integer dengan nilai 0 sampai K-1. Bukan one-hot. Jangan masukkan probabilitas ke loss ini.",
    },
    footnote: "CrossEntropyLoss = log-softmax + negative log likelihood. Dua langkah digabung untuk stabilitas numerik.",
  },

  // ── Slide 12: Gambar 5 konfigurasi ──
  {
    layout: "image",
    title: "5 Konfigurasi Head-Loss Resmi",
    imageUrl: "/figures/fig01h_output_head_loss.png",
    caption: "Dari kiri: regresi skalar, biner dua varian (2 output vs 1 output), multikelas, multilabel",
    footnote: "Tabel ini juga ada di Lampiran. Tempel di samping layar saat Lab W1.",
  },

  // ── Slide 13: Gambar sigmoid vs softmax ──
  {
    layout: "image",
    title: "Sigmoid vs Softmax: Perbedaan Fundamental",
    imageUrl: "/figures/fig01i_sigmoid_softmax.png",
    caption: "Sigmoid: setiap output independen - total bisa > 1. Softmax: distribusi probabilitas - total selalu = 1.",
    footnote: "Gunakan sigmoid untuk multilabel (setiap kelas independen). Gunakan softmax untuk multiclass (saling eksklusif).",
  },

  // ── Slide 14: Video StatQuest CrossEntropy ──
  {
    layout: "video",
    title: "Cross-Entropy Loss: Tonton ~15 Menit",
    videoUrl: "https://www.youtube.com/embed/6ArSys5qHAU",
    caption: "StatQuest - \"Neural Networks Part 6: Cross Entropy\" - penjelasan yang mudah dipahami dari Josh Starmer",
    footnote: "Dianjurkan setelah melihat tabel 5 konfigurasi. StatQuest terkenal karena penjelasannya yang sabar dan langkah demi langkah.",
  },

  // ── Slide 15: Backpropagation overview ──
  {
    layout: "bullets",
    title: "Backpropagation: Gambaran Umum",
    bullets: [
      "Backprop = **chain rule yang berjalan mundur** dari loss menuju layer pertama",
      "Setiap parameter menerima satu nilai gradient: kalau parameter ini naik sedikit, loss naik atau turun berapa?",
      "Optimizer memakai gradient itu untuk update: `θ ← θ - lr × ∂L/∂θ`",
      "PyTorch menangani semua gradient lewat Autograd - cukup panggil `loss.backward()`",
      "Detail 7-langkah derivasi manual ada di Lampiran A.1 - baca setelah Lab W1 selesai",
    ],
    footnote: "Lab 1b meminta mengerjakan backprop manual 7-langkah. Slide ini hanya gambaran sebelum masuk ke lab.",
  },

  // ── Slide 16: Video 3Blue1Brown backprop ──
  {
    layout: "video",
    title: "Backpropagation: Visualisasi (Tonton ~20 Menit)",
    videoUrl: "https://www.youtube.com/embed/Ilg3gGewQ5U",
    caption: "3Blue1Brown - \"What is backpropagation really doing?\" - visualisasi chain rule yang mengalir mundur",
    footnote: "Video ini menjelaskan konsep yang sama dengan Lampiran A.1 - pilih cara yang cocok dengan gaya belajar Anda.",
  },

  // ── Slide 17: Training loop 8 baris ──
  {
    layout: "code",
    title: "Training Loop: 5 Langkah Inti",
    body: "Urutan ini tidak bisa ditukar. zero_grad() harus sebelum backward().",
    code: `model = SimpleMLP(input_dim=10, hidden=[64, 32], num_classes=3)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
criterion = nn.CrossEntropyLoss()

for batch_x, batch_y in dataloader:
    logits = model(batch_x)           # 1. Forward pass
    loss = criterion(logits, batch_y) # 2. Hitung loss
    optimizer.zero_grad()              # 3. Reset gradient lama
    loss.backward()                    # 4. Hitung gradient baru
    optimizer.step()                   # 5. Update semua parameter`,
    lang: "python",
    footnote: "Jika zero_grad() dilewati, gradient terakumulasi dari batch sebelumnya - hasilnya tidak terduga.",
  },

  // ── Slide 17b: Gambar siklus training ──
  {
    layout: "image",
    title: "Siklus Training PyTorch",
    imageUrl: "/figures/fig03c_training_cycle.png",
    caption: "Lima langkah dalam satu iterasi: forward → loss → zero_grad → backward → step. Urutan tidak bisa ditukar.",
    footnote: "zero_grad() sebelum backward() - selalu. Jika dilewati, gradient terakumulasi dari batch sebelumnya.",
  },

  // ── Slide 18: Pipeline praktis ──
  {
    layout: "bullets",
    title: "Pipeline Praktis: Batch, DataLoader, Split",
    bullets: [
      "**DataLoader** mengambil data dalam batch acak tiap epoch - tidak perlu shuffle manual",
      "**Train/val/test split:** train untuk update parameter, val untuk early stopping, test untuk laporan akhir (hanya dibuka sekali)",
      "**Aturan paling penting:** statistik normalisasi (mean, std) dihitung dari **train saja** - terapkan nilai yang sama ke val dan test",
      "Melanggar aturan ini = data leakage - topik utama W6 dengan demo delta dramatik (0.92 → 0.63)",
    ],
    footnote: "Test set yang pernah dilihat selama development tidak bisa lagi disebut test set - itu sudah menjadi val set.",
  },

  // ── Slide 18b: Gambar train/val/test ──
  {
    layout: "image",
    title: "Train / Val / Test: Tidak Boleh Bocor",
    imageUrl: "/figures/fig06c_train_val_leakage.png",
    caption: "Statistik normalisasi (mean, std) dihitung dari train saja. Diterapkan ke val dan test. Melanggar ini = data leakage.",
    footnote: "Demo leakage di W6: akurasi turun dari 0.92 ke 0.63 saat split diperbaiki.",
  },

  // ── Slide 19: Pitfalls ──
  {
    layout: "bullets",
    title: "4 Pitfalls Paling Sering di W1",
    bullets: [
      "**Loss-head mismatch:** MSE untuk multikelas, atau Softmax+CrossEntropy - loss masih turun tapi hasil tidak bermakna",
      "**Softmax sebelum CrossEntropyLoss:** CrossEntropyLoss sudah memasukkan log-softmax - jangan dua kali, distribusi jadi salah",
      "**Accuracy stuck di 1/K:** model tidak belajar lebih baik dari tebakan acak - cek loss-head, cek learning rate, cek data",
      "**Kesimpulan sebelum observasi:** angka akurasi bagus → langsung klaim model berhasil, padahal confusion matrix belum dilihat",
    ],
    footnote: "Lab W1 langkah 5 meminta menjalankan mismatch secara sengaja dan mendokumentasikan apa yang terjadi.",
  },

  // ── Slide 20: Lab W1 ──
  {
    layout: "bullets",
    title: "Lab W1: 6 Langkah",
    bullets: [
      "**Langkah 1:** Smoke test dengan `--dry-run` - pastikan pipeline berjalan < 1 menit tanpa error",
      "**Langkah 2:** Regresi (task=regression, loss=mse, num_classes=1) - catat loss dan kurva",
      "**Langkah 3:** Biner (task=binary, loss=cross_entropy, num_classes=2) - cek confusion matrix",
      "**Langkah 4:** Multikelas (task=multiclass, loss=cross_entropy, num_classes=3) - bandingkan ketiga kurva",
      "**Langkah 5:** Eksperimen mismatch yang disengaja - dokumentasikan perilaku loss dan akurasi",
      "**Langkah 6:** Tulis observasi vs interpretasi di notebook (dua bagian terpisah, jangan dicampur)",
    ],
    footnote: "Lab 1b (MLP numpy) dikerjakan paralel atau setelah Lab 1a. Estimasi total: 3-4 jam.",
  },

  // ── Slide 21: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W1",
    body: "Slide ini hanya peta. Contoh angka, worked example, dan pitfall lengkap ada di modul penuh.\n\nEstimasi baca modul: 45 menit. Lab: 3-4 jam.",
    ctaText: "Baca Modul W1 Penuh",
    ctaTarget: "01",
  },
];

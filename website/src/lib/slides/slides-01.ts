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
    title: "Cek Siap: Sebelum Masuk W1",
    body: "Jawab tiga pertanyaan berikut untuk memastikan prasyaratmu sudah cukup kuat:",
    bullets: [
      "**Soal 1:** Harga rumah (angka kontinu). Pakai loss apa: MSE atau CrossEntropy?",
      "**Soal 2:** Deteksi spam (ya/tidak). Output head pakai `Linear(D,1)` atau `Linear(D,2)`?",
      "**Soal 3:** 3 kategori cuaca. Target `y` bertipe `int` (0,1,2) atau `float` (0.0, 1.0, 2.0)?",
    ],
    footnote: "Tiga soal, 2 menit. Bukan ujian - cuma cek apakah prasyarat sudah nyantol.",
  },

  // ── Slide 1c: Jawaban Kuis Pembuka ──
  {
    layout: "grid",
    title: "Jawaban: Cek Siap W1",
    body: "Berikut adalah penjelasan untuk jawaban setiap soal:",
    gridItems: [
      {
        title: "Soal 1: MSELoss",
        body: "Soal 1 meminta prediksi angka kontinu, sehingga task-nya adalah regresi dan loss yang dipakai adalah MSELoss. Head-nya adalah Linear(D,1) dan target-nya adalah float biasa, bukan kelas.",
      },
      {
        title: "Soal 2: Dua-duanya boleh",
        body: "Kamu boleh memakai Linear(D,1)+BCEWithLogitsLoss ATAU Linear(D,2)+CrossEntropyLoss. Pilih salah satu dan pakai secara konsisten sampai akhir.",
      },
      {
        title: "Soal 3: int (0,1,2)",
        body: "CrossEntropyLoss membutuhkan target integer, bukan float. Contohnya: `y = torch.tensor([0,1,2], dtype=torch.long)`.",
      },
    ],
    footnote: "Kalau ketiganya benar: kamu siap masuk W1. Kalau ada yang ragu: baca ulang bab 00a dulu, cukup 15 menit.",
  },

  // ── Slide 2: Mengapa tabular lebih dulu ──
  {
    layout: "section",
    title: "Mengapa Tabular Lebih Dulu?",
    body: "Ada empat alasan praktis mengapa kita memulai dari tabular: pertama, pipeline-nya paling pendek karena tidak ada augmentasi dan tidak ada tokenizer; kedua, tiga perumusan tugas bisa diuji pada dataset yang sama; ketiga, bug loss-head terlihat jelas dari output shape; dan keempat, tidak ada domain baru yang perlu dipelajari.",
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
        "Input berbentuk **(B, F)**, yang berarti B sampel tabular dengan F fitur.",
        "Layer 1 mengubah (B,F) → (B,64) dengan Linear+ReLU.",
        "Layer 2 mengubah (B,64) → (B,32) dengan Linear+ReLU.",
        "Head mengubah (B,32) → **(B, 1 atau 2 atau K)** sesuai dengan task.",
      ],
    },
    right: {
      title: "Mengapa Butuh Non-Linearitas?",
      body: "Dua layer Linear tanpa aktivasi secara matematika setara dengan satu Linear saja, karena gabungannya tetap fungsi linier.\n\nReLU menyisipkan tikungan di antara lapisan, sehingga decision boundary bisa melengkung dan mengikuti data yang tidak linier.",
    },
    footnote: "Fakta ini (non-linearitas wajib) akan muncul lagi di W2 (CNN) dan W5 (RNN).",
  },

  // ── Slide 5: Linear Layer mekanik ──
  {
    layout: "bullets",
    title: "Linear Layer: Mekanik",
    body: "Linear layer adalah blok dasar MLP yang bekerja dengan cara berikut:",
    bullets: [
      "Formula-nya adalah **y = W × x + b**, yaitu satu perkalian matriks ditambah bias.",
      "Contoh `nn.Linear(10, 64)` menghasilkan W berukuran (64, 10) = 640 parameter, dan b berukuran (64,) = 64 parameter.",
      "Total layer ini memiliki **704 parameter** - semuanya akan menerima gradient saat backward.",
      "Shape berubah dari **(B, 10) → (B, 64)**: dimensi fitur berubah, sementara ukuran batch tetap.",
      "ReLU yang mengikutinya menggunakan rumus `max(0, x)`: nilai negatif menjadi nol, sementara nilai positif tetap.",
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
      body: "Badan bersama adalah rangkaian Linear+ReLU yang mengekstrak representasi dari data mentah. Struktur ini sama untuk semua task.\n\nOutput badan menghasilkan tensor **(B, H)** dengan H sebagai ukuran hidden layer terakhir.",
    },
    right: {
      title: "Head Berbeda per Task",
      bullets: [
        "**Regresi** memakai head `Linear(H, 1)` tanpa aktivasi.",
        "**Biner** memakai head `Linear(H, 2)` dengan CrossEntropyLoss.",
        "**Multikelas** memakai head `Linear(H, K)` dengan CrossEntropyLoss.",
        "Head yang salah menyebabkan loss tidak bisa turun dengan benar.",
      ],
    },
    footnote: "Badan = representasi umum. Head = spesialisasi per task. Kesalahan di head lebih mudah didiagnosis.",
  },

  // ── Slide 8: Harus dipasangkan ──
  {
    layout: "section",
    title: "Output Head + Loss: Harus Dipasangkan",
    body: "Pasangan output head dan loss bukan pilihan bebas. Task menentukan bentuk head, dan head menentukan fungsi loss yang dipakai. Menukar pasangan ini menghasilkan bug yang sulit didiagnosis: loss masih bisa turun, tapi model tidak belajar hal yang benar.",
    footnote: "Tiga perempat bug di W1 berasal dari loss-head mismatch. Lab W1 meminta untuk mengalaminya secara sengaja.",
  },

  // ── Slide 9: Regresi ──
  {
    layout: "split",
    title: "Regresi: MSE + Linear Head",
    body: "Task regresi memerlukan pasangan head dan loss yang spesifik:",
    left: {
      title: "Arsitektur",
      body: "Untuk regresi, output head-nya adalah `nn.Linear(H, 1)` tanpa aktivasi apapun. Output shape-nya adalah **(B, 1)**, yang berarti satu nilai kontinu per sampel.\n\nTarget y harus berupa bilangan real, bukan indeks kelas.",
    },
    right: {
      title: "Loss: MSELoss",
      body: "`MSELoss` menghitung rata-rata kuadrat selisih dengan rumus (1/N) × Σ (ŷ - y)².\n\nLoss ini sensitif terhadap outlier karena selisihnya dikuadratkan. Untuk data dengan outlier banyak, pertimbangkan `L1Loss` (MAE) sebagai alternatif.",
    },
    footnote: "MSE selalu positif dan nol hanya jika prediksi sempurna. Unitnya dikuadratkan - perhatikan hal ini saat membaca hasil.",
  },

  // ── Slide 10: Binary ──
  {
    layout: "split",
    title: "Klasifikasi Biner: CrossEntropy + 2 Output",
    body: "Task klasifikasi biner juga memiliki pasangan head dan loss yang harus diperhatikan:",
    left: {
      title: "Arsitektur",
      body: "Untuk klasifikasi biner, output head-nya adalah `nn.Linear(H, 2)` yang menghasilkan dua logit (satu per kelas 0 dan kelas 1).\n\nSaat evaluasi, `logits.argmax(dim=1)` menghasilkan prediksi kelas dengan shape **(B,)**.",
    },
    right: {
      title: "Loss: CrossEntropyLoss",
      body: "`CrossEntropyLoss` sudah memasukkan softmax di dalamnya, sehingga kamu cukup memasukkan **logit mentah**.\n\nJangan tambahkan Softmax atau Sigmoid sebelum loss. Jika kamu memakai BCEWithLogitsLoss, output head harus berbentuk `Linear(H, 1)` bukan `Linear(H, 2)`.",
    },
    footnote: "Dua pendekatan biner (2 output + CE vs 1 output + BCE) keduanya valid - pilih satu dan konsisten.",
  },

  // ── Slide 11: Multiclass ──
  {
    layout: "split",
    title: "Klasifikasi Multikelas: CrossEntropy + K Output",
    body: "Task klasifikasi multikelas mengikuti pola yang sama dengan biner, tapi dengan jumlah kelas lebih dari dua:",
    left: {
      title: "Arsitektur",
      body: "Untuk klasifikasi multikelas, output head-nya adalah `nn.Linear(H, K)` yang menghasilkan K logit untuk K kelas. Untuk 3 kelas, output shape-nya adalah **(B, 3)**.\n\nSaat evaluasi, `logits.argmax(dim=1)` menghasilkan indeks kelas prediksi.",
    },
    right: {
      title: "Loss: CrossEntropyLoss",
      body: "Penggunaannya sama dengan biner, tapi dengan K > 2. Log-softmax sudah ada di dalam loss.\n\nTarget-nya adalah tensor integer dengan nilai 0 sampai K-1, bukan one-hot. Jangan masukkan probabilitas ke loss ini.",
    },
    footnote: "CrossEntropyLoss = log-softmax + negative log likelihood. Dua langkah digabung untuk stabilitas numerik.",
  },

  // ── Slide 12: Gambar 5 konfigurasi ──
  {
    layout: "image",
    title: "5 Konfigurasi Head-Loss Resmi",
    imageUrl: "/figures/fig01h_output_head_loss.png",
    caption: "Gambar ini menunjukkan lima konfigurasi resmi: dari kiri adalah regresi skalar, biner dalam dua varian (2 output vs 1 output), multikelas, dan multilabel.",
    footnote: "Tabel ini juga ada di Lampiran. Tempel di samping layar saat Lab W1.",
  },

  // ── Slide 13: Gambar sigmoid vs softmax ──
  {
    layout: "image",
    title: "Sigmoid vs Softmax: Perbedaan Fundamental",
    imageUrl: "/figures/fig01i_sigmoid_softmax.png",
    caption: "Gambar ini menunjukkan perbedaan fundamental: sigmoid membuat setiap output independen sehingga total bisa lebih dari 1, sementara softmax menghasilkan distribusi probabilitas yang totalnya selalu = 1.",
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
    body: "Backpropagation adalah proses inti dalam training neural network. Berikut adalah gambaran umumnya:",
    bullets: [
      "Backpropagation adalah **chain rule yang berjalan mundur** dari loss menuju layer pertama.",
      "Setiap parameter menerima satu nilai gradient yang menjawab pertanyaan: kalau parameter ini naik sedikit, loss naik atau turun berapa?",
      "Optimizer memakai gradient tersebut untuk update parameter dengan rumus `θ ← θ - lr × ∂L/∂θ`.",
      "PyTorch menangani semua gradient lewat Autograd, sehingga kamu cukup memanggil `loss.backward()`.",
      "Detail 7-langkah derivasi manual ada di Lampiran A.1 - baca setelah Lab W1 selesai.",
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
    caption: "Gambar ini menunjukkan lima langkah dalam satu iterasi: forward → loss → zero_grad → backward → step. Urutan langkah ini tidak bisa ditukar.",
    footnote: "zero_grad() harus dipanggil sebelum backward() - selalu. Jika dilewati, gradient terakumulasi dari batch sebelumnya.",
  },

  // ── Slide 18: Pipeline praktis ──
  {
    layout: "bullets",
    title: "Pipeline Praktis: Batch, DataLoader, Split",
    body: "Berikut adalah praktik penting dalam pipeline training:",
    bullets: [
      "**DataLoader** mengambil data dalam batch acak tiap epoch, sehingga kamu tidak perlu melakukan shuffle manual.",
      "**Train/val/test split:** train dipakai untuk update parameter, val dipakai untuk early stopping, dan test dipakai untuk laporan akhir yang hanya dibuka sekali.",
      "**Aturan paling penting:** statistik normalisasi (mean, std) dihitung dari **train saja**, lalu diterapkan ke val dan test dengan nilai yang sama.",
      "Melanggar aturan ini berarti melakukan data leakage - topik utama W6 yang akan menunjukkan demo delta dramatik (0.92 → 0.63).",
    ],
    footnote: "Test set yang pernah dilihat selama development tidak bisa lagi disebut test set - itu sudah menjadi val set.",
  },

  // ── Slide 18b: Gambar train/val/test ──
  {
    layout: "image",
    title: "Train / Val / Test: Tidak Boleh Bocor",
    imageUrl: "/figures/fig06c_train_val_leakage.png",
    caption: "Gambar ini mengingatkan bahwa statistik normalisasi (mean, std) dihitung dari train saja, lalu diterapkan ke val dan test. Melanggar prinsip ini berarti melakukan data leakage.",
    footnote: "Demo leakage di W6: akurasi turun dari 0.92 ke 0.63 saat split diperbaiki.",
  },

  // ── Slide 19: Pitfalls ──
  {
    layout: "bullets",
    title: "4 Pitfalls Paling Sering di W1",
    body: "Ada empat kesalahan yang paling sering terjadi di W1. Hindari pitfalls berikut:",
    bullets: [
      "**Loss-head mismatch:** Memakai MSE untuk multikelas, atau Softmax+CrossEntropy, menyebabkan loss masih turun tapi hasilnya tidak bermakna.",
      "**Softmax sebelum CrossEntropyLoss:** CrossEntropyLoss sudah memasukkan log-softmax di dalamnya, sehingga menambahkan softmax lagi membuat distribusi menjadi salah.",
      "**Accuracy stuck di 1/K:** Model tidak belajar lebih baik dari tebakan acak. Cek kembali pasangan loss-head, learning rate, dan kualitas data.",
      "**Kesimpulan sebelum observasi:** Angka akurasi yang bagus membuat kamu langsung mengklaim model berhasil, padahal confusion matrix belum dilihat.",
    ],
    footnote: "Lab W1 langkah 5 meminta menjalankan mismatch secara sengaja dan mendokumentasikan apa yang terjadi.",
  },

  // ── Slide 20: Lab W1 ──
  {
    layout: "bullets",
    title: "Lab W1: 6 Langkah",
    body: "Lab W1 terdiri dari enam langkah yang harus kamu kerjakan secara berurutan:",
    bullets: [
      "**Langkah 1:** Jalankan smoke test dengan `--dry-run` untuk memastikan pipeline berjalan kurang dari 1 menit tanpa error.",
      "**Langkah 2:** Latih model regresi (task=regression, loss=mse, num_classes=1) dan catat loss serta kurvanya.",
      "**Langkah 3:** Latih model biner (task=binary, loss=cross_entropy, num_classes=2) dan periksa confusion matrix-nya.",
      "**Langkah 4:** Latih model multikelas (task=multiclass, loss=cross_entropy, num_classes=3) dan bandingkan ketiga kurva.",
      "**Langkah 5:** Jalankan eksperimen mismatch yang disengaja, lalu dokumentasikan perilaku loss dan akurasi.",
      "**Langkah 6:** Tulis observasi dan interpretasi di notebook sebagai dua bagian terpisah - jangan dicampur.",
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

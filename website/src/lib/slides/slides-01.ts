import type { SlideSection } from "./index";

export const slides01: SlideSection[] = [
  // ── Slide 1: Title ──
  {
    layout: "title",
    title: "W1: Tabular, Output Heads & Pencocokan Loss",
    subtitle: "MLP mengubah bentuk tensor. Tugas menentukan head, dan head menentukan loss.",
    body: "Lab 1a mencakup tiga perumusan tugas dan eksperimen ketidakcocokan head dan loss. Lab 1b membangun MLP dari nol menggunakan NumPy.",
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
    footnote: "Tiga soal ini memakan waktu sekitar 2 menit. Ini bukan ujian, melainkan cara untuk memeriksa apakah prasyarat sudah dikuasai sebelum masuk W1.",
  },

  // ── Slide 1c: Jawaban Kuis Pembuka ──
  {
    layout: "grid",
    title: "Jawaban: Cek Siap W1",
    body: "Berikut adalah penjelasan untuk jawaban setiap soal:",
    gridItems: [
      {
        title: "Soal 1: MSELoss",
        body: "Soal 1 meminta prediksi angka kontinu, sehingga tugasnya adalah regresi dan loss yang dipakai adalah MSELoss. Head-nya adalah Linear(D,1) dan target-nya adalah float biasa, bukan kelas.",
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

  // ── Slide 1d: Materi Bab Ini ──
  {
    layout: "bullets",
    title: "Materi Bab Ini",
    body: "Minggu pertama membahas lima ide fondasi yang menjadi dasar seluruh bootcamp:",
    bullets: [
      "**MLP mengubah bentuk tensor:** Rangkaian Linear dan ReLU memetakan input (F,) menjadi output (D_out,) melalui transformasi bertahap.",
      "**Body dan Head:** Badan model bersama dipakai untuk semua tugas, sementara head berubah sesuai bentuk output yang dibutuhkan.",
      "**Pasangan output head dan loss:** Regresi cocok dengan MSE, biner cocok dengan BCE atau CrossEntropy, dan multikelas cocok dengan CrossEntropy.",
      "**Pipeline training PyTorch:** Lima langkah kunci berjalan berurutan setiap iterasi: forward, loss, zero_grad, backward, dan step.",
      "**Kebiasaan riset W1:** Menulis observasi sebelum kesimpulan adalah kebiasaan inti yang ditanamkan sejak W1 dan dipakai sepanjang modul.",
    ],
    footnote: "Lima ide ini menjadi rujukan yang akan dipakai berulang di W2 sampai W11.",
  },

  // ── Slide 1e: Objektif Belajar ──
  {
    layout: "bullets",
    title: "Objektif Belajar",
    body: "W1 ini mencakup empat capaian yang harus dikerjakan:",
    bullets: [
      "Kamu **menerapkan tiga tugas berbeda** (regresi, biner, multikelas) pada satu dataset tabular yang sama.",
      "Kamu **memilih output head dan loss** yang cocok dari tabel rujukan §2.2.4 di modul.",
      "Kamu **sengaja salah-pasangkan loss dan head,** lalu mengamati bagaimana training gagal. Pengalaman ini jauh lebih jelas daripada penjelasan teori saja.",
      "Kamu **menulis observasi dan interpretasi** dalam dua paragraf terpisah di catatan lab.",
    ],
    footnote: "Lab W1 mencakup dua pelaksanaan: Lab 1a (3 tugas plus ketidakcocokan loss dan head) dan Lab 1b (MLP from scratch dengan NumPy).",
  },

  // ── Slide 1f: Setelah Bab Ini Kamu Paham ──
  {
    layout: "grid",
    title: "Setelah Bab Ini Kamu Paham",
    body: "Setelah Lab W1 selesai, kamu diharapkan mampu:",
    gridItems: [
      {
        title: "Menjawab 'Tugas X Butuh Head dan Loss Apa'",
        body: "Saat menerima tugas baru, kamu memiliki refleks otomatis untuk membaca shape input dan tipe output, lalu memilih pasangan head dan loss yang sesuai dari lima konfigurasi resmi.",
      },
      {
        title: "Mengidentifikasi Ketidakcocokan Loss dan Head",
        body: "Saat loss konstan dari epoch pertama atau berubah dengan cara yang aneh, kamu memeriksa pasangan loss, head, dan target lebih dulu sebelum mendebug arsitektur atau hyperparameter.",
      },
      {
        title: "Memisahkan Observasi dan Interpretasi",
        body: "Kamu terbiasa menulis dua paragraf terpisah: satu murni angka dan bentuk kurva yang dilihat, satu lagi tafsiran tentang apa yang terjadi - kebiasaan ini akan dipakai sepanjang modul.",
      },
    ],
    footnote: "Tiga capaian W1 menjadi pondasi yang tidak boleh dilewati - W2 dan setelahnya bertumpu di sini.",
  },

  // ── Slide 2: Mengapa tabular lebih dulu ──
  {
    layout: "section",
    title: "Mengapa Tabular Lebih Dulu?",
    body: "Ada empat alasan mengapa kita memulai dari tabular: pertama, pipeline-nya paling pendek karena tidak ada augmentasi dan tidak ada tokenizer; kedua, tiga perumusan tugas bisa diuji pada dataset yang sama; ketiga, ketidakcocokan loss dan head terlihat jelas dari output shape; dan keempat, tidak ada domain baru yang perlu dipelajari.",
    footnote: "Kita memulai dari tabular karena kompleksitasnya paling rendah, bukan karena tabular lebih penting dari domain lain.",
  },

  // ── Slide 3: Gambar satu dataset tiga tugas ──
  {
    layout: "image",
    title: "Satu Dataset, Tiga Tugas",
    imageUrl: "/figures/fig01g_tiga_tugas.png",
    caption: "Gambar ini menunjukkan satu badan MLP bersama menghasilkan representasi, lalu tiga head berbeda menyesuaikan kebutuhan setiap tugas.",
    footnote: "Badan (body) sama - hanya head yang berbeda. Ini yang memungkinkan perbandingan yang setara.",
  },

  // ── Slide 4: MLP mengubah bentuk ──
  {
    layout: "split",
    title: "MLP Mengubah Bentuk Tensor",
    left: {
      title: "Alur Shape",
      bullets: [
        "Input berbentuk **(B, F)**, yang berarti B sampel tabular dengan F fitur.",
        "Layer 1 mengubah (B,F) → (B,64) dengan Linear+ReLU.",
        "Layer 2 mengubah (B,64) → (B,32) dengan Linear+ReLU.",
        "Head mengubah (B,32) → **(B, 1 atau 2 atau K)** sesuai dengan tugas.",
      ],
    },
    right: {
      title: "Mengapa Butuh Non-Linearitas?",
      body: "Dua layer Linear tanpa aktivasi secara matematika setara dengan satu Linear saja, karena gabungannya tetap fungsi linier.\n\nReLU menambahkan titik patah di antara lapisan, sehingga decision boundary bisa melengkung dan mengikuti data yang tidak linier.",
    },
    footnote: "Fakta ini (non-linearitas wajib) akan muncul lagi di W2 (CNN) dan W5 (RNN).",
  },

  // ── Slide 4b: MLP 2 Layer - alur shape (image) ──
  {
    layout: "image",
    title: "MLP 2 Layer: Alur Shape dari Input ke Representasi",
    imageUrl: "/figures/mlp_shape_flow.png",
    caption: "Gambar ini menunjukkan bagaimana shape tensor berubah dari (B,F) ke (B,64) lalu ke (B,32) saat melewati dua layer Linear+ReLU. Dimensi batch B tidak pernah berubah sepanjang seluruh forward pass.",
    footnote: "Semua layer yang berada sebelum head secara kolektif disebut BODY. Representasi berukuran (B,32) yang dihasilkan BODY dipakai bersama oleh semua head, sehingga tidak ada operasi yang perlu dijalankan dua kali.",
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
    footnote: "Parameter terdiri dari weight dan bias. Semakin dalam jaringan, semakin banyak parameter yang perlu diperbarui setiap iterasi.",
  },

  // ── Slide 5b: Linear Layer - tiap input ke semua neuron (image) ──
  {
    layout: "image",
    title: "Linear Layer: Tiap Input Terhubung ke Semua Neuron",
    imageUrl: "/figures/mlp_fully_connected.png",
    caption: "Gambar ini menunjukkan bagaimana setiap fitur input (x1, x2, x3) terhubung ke setiap neuron di hidden layer (h1-h4), dan setiap hidden neuron terhubung ke output y. Inilah yang membuat lapisan ini disebut fully connected.",
    footnote: "Badge 'ReLU' dalam gambar ditempelkan di h1 sebagai penanda untuk seluruh lapisan. Aktivasi ReLU sebenarnya berlaku untuk semua neuron di hidden layer secara bersamaan, bukan hanya h1.",
  },

  // ── Slide 6: nn.Linear kode ──
  {
    layout: "code",
    title: "nn.Linear: Forward Pass",
    body: "Cara paling langsung untuk melihat transformasi shape adalah dengan menjalankan kode berikut dan memeriksa output `.shape` di tiap langkah.",
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
    footnote: "Output berukuran (B,64) memperlihatkan bahwa dimensi batch tidak berubah. Hanya dimensi fitur yang berubah, dari 10 menjadi 64.",
  },

  // ── Slide 7: Body vs Head ──
  {
    layout: "split",
    title: "Body dan Head: Struktur Dua Bagian",
    left: {
      title: "Badan Bersama",
      body: "Badan bersama adalah rangkaian Linear+ReLU yang mengekstrak fitur dari input. Struktur ini sama untuk semua tugas.\n\nOutput badan menghasilkan tensor **(B, H)** dengan H sebagai ukuran hidden layer terakhir.",
    },
    right: {
      title: "Head Berbeda per Tugas",
      bullets: [
        "**Regresi** memakai head `Linear(H, 1)` tanpa aktivasi.",
        "**Biner** memakai head `Linear(H, 2)` dengan CrossEntropyLoss.",
        "**Multikelas** memakai head `Linear(H, K)` dengan CrossEntropyLoss.",
        "Head yang salah menyebabkan loss tidak bisa turun dengan benar.",
      ],
    },
    footnote: "Badan mengekstrak fitur umum dari semua sampel. Head mengkhususkan representasi tersebut untuk setiap tugas. Kesalahan di head lebih mudah didiagnosis karena cakupannya lebih terbatas.",
  },

  // ── Slide 7a: Body + Head fork (image) ──
  {
    layout: "image",
    title: "Body + Head: Satu Representasi, Tiga Tugas",
    imageUrl: "/figures/body_head_fork.png",
    caption: "Gambar ini menunjukkan bagaimana satu BODY bersama menghasilkan representasi (B,32), lalu tiga head berbeda mengubah representasi tersebut ke bentuk output yang sesuai dengan masing-masing tugas.",
    footnote: "Pola body-head ini sama persis dengan cara kerja pretrained model yang akan dipelajari di W7 dan W8. Di sana, backbone bersama menghasilkan representasi, lalu setiap head menyesuaikannya ke tugas yang spesifik.",
  },

  // ── Slide 7b: Body + 3 Head dalam PyTorch ──
  {
    layout: "code",
    title: "Body + 3 Head dalam PyTorch",
    body: "Diagram body-head dapat ditulis langsung dalam PyTorch: satu badan bersama diikuti tiga head paralel, sehingga satu forward pass menghasilkan tiga output sekaligus.",
    code: `class ArsitekturMultiTugas(nn.Module):
    def __init__(self, jumlah_fitur=10, jumlah_kelas=3):
        super().__init__()
        self.badan_mlp = nn.Sequential(
            nn.Linear(jumlah_fitur, 64), nn.ReLU(),
            nn.Linear(64, 32), nn.ReLU(),
        )
        self.kepala_regresi = nn.Linear(32, 1)
        self.kepala_biner = nn.Linear(32, 1)
        self.kepala_multikelas = nn.Linear(32, jumlah_kelas)

    def forward(self, x):
        fitur = self.badan_mlp(x)
        return (self.kepala_regresi(fitur),
                self.kepala_biner(fitur),
                self.kepala_multikelas(fitur))`,
    lang: "python",
    footnote: "Tiga head berbagi badan yang sama. Pretrained model di W7-W8 memakai pola yang identik: satu backbone bersama dengan head yang berbeda untuk setiap tugas.",
  },

  // ── Slide 8: Harus dipasangkan ──
  {
    layout: "section",
    title: "Output Head + Loss: Harus Dipasangkan",
    body: "Pasangan output head dan loss bukan pilihan bebas. Tugas menentukan bentuk head, dan head menentukan fungsi loss yang dipakai. Menukar pasangan ini menghasilkan bug yang sulit didiagnosis: loss masih bisa turun, tapi model tidak belajar hal yang benar.",
    footnote: "Tiga perempat bug di W1 berasal dari ketidakcocokan loss dan head. Lab W1 meminta kamu mengalaminya secara sengaja agar efeknya bisa dirasakan langsung.",
  },

  // ── Slide 9: Regresi ──
  {
    layout: "split",
    title: "Regresi: MSE + Linear Head",
    body: "Tugas regresi memerlukan pasangan head dan loss yang spesifik:",
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
    body: "Tugas klasifikasi biner juga memiliki pasangan head dan loss yang harus diperhatikan:",
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
    body: "Tugas klasifikasi multikelas mengikuti pola yang sama dengan biner, tapi dengan jumlah kelas lebih dari dua:",
    left: {
      title: "Arsitektur",
      body: "Untuk klasifikasi multikelas, output head-nya adalah `nn.Linear(H, K)` yang menghasilkan K logit untuk K kelas. Untuk 3 kelas, output shape-nya adalah **(B, 3)**.\n\nSaat evaluasi, `logits.argmax(dim=1)` menghasilkan indeks kelas prediksi.",
    },
    right: {
      title: "Loss: CrossEntropyLoss",
      body: "Penggunaannya sama dengan biner, tapi dengan K > 2. Log-softmax sudah ada di dalam loss.\n\nTarget-nya adalah tensor integer dengan nilai 0 sampai K-1, bukan one-hot. Jangan masukkan probabilitas ke loss ini.",
    },
    footnote: "CrossEntropyLoss menggabungkan log-softmax dan negative log likelihood menjadi satu operasi untuk stabilitas numerik.",
  },

  // ── Slide 12: Gambar 5 konfigurasi ──
  {
    layout: "image",
    title: "5 Konfigurasi Head dan Loss Resmi",
    imageUrl: "/figures/fig01h_output_head_loss.png",
    caption: "Gambar ini menunjukkan lima konfigurasi resmi: dari kiri adalah regresi skalar, biner dalam dua varian (2 output vs 1 output), multikelas, dan multilabel.",
    footnote: "Tabel ini juga ada di Lampiran. Tempel di samping layar saat Lab W1.",
  },

  // ── Slide 12b: Ketidakcocokan loss dan head - benar vs salah (image) ──
  {
    layout: "image",
    title: "Pasangan Head dan Loss: Benar vs Bug Umum",
    imageUrl: "/figures/loss_head_matching.png",
    caption: "Gambar ini membandingkan tiga pasangan head dan loss yang benar (kiri) dengan tiga bug yang paling sering terjadi (kanan). Kolom kanan menunjukkan bahwa ketidakcocokan ini tidak selalu menghasilkan error - kadang training berjalan tapi model tidak belajar hal yang benar.",
    footnote: "Bug paling berbahaya adalah baris ketiga kolom kanan: Linear(H,K) + MSELoss tidak menghasilkan error, loss bahkan bisa turun, tapi model tidak belajar distribusi kelas yang benar karena MSE tidak dirancang untuk output kategoris.",
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
    caption: "Video ini adalah StatQuest berjudul \"Neural Networks Part 6: Cross Entropy\", yang menyajikan penjelasan mudah dipahami tentang cross-entropy loss oleh Josh Starmer.",
    footnote: "Video ini dianjurkan ditonton setelah melihat tabel 5 konfigurasi. StatQuest terkenal karena penjelasannya yang sabar dan langkah demi langkah.",
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
    footnote: "Lab 1b meminta kamu mengerjakan backprop manual 7-langkah. Slide ini hanya memberikan gambaran sebelum masuk ke lab.",
  },

  // ── Slide 16: Video 3Blue1Brown backprop ──
  {
    layout: "video",
    title: "Backpropagation: Visualisasi (Tonton ~20 Menit)",
    videoUrl: "https://www.youtube.com/embed/Ilg3gGewQ5U",
    caption: "Video ini adalah karya 3Blue1Brown berjudul \"What is backpropagation really doing?\", yang menampilkan visualisasi chain rule yang dihitung mundur dari loss menuju setiap parameter.",
    footnote: "Video ini menjelaskan konsep yang sama dengan Lampiran A.1 - pilih cara yang cocok dengan gaya belajar Anda.",
  },

  // ── Slide 16b: Training Loop - operasi tiap iterasi (image) ──
  {
    layout: "image",
    title: "Training Loop: Lima Langkah yang Berulang",
    imageUrl: "/figures/training_loop_cycle.png",
    caption: "Gambar ini menunjukkan lima langkah training yang berjalan berulang untuk setiap batch. Node zero_grad() diberi penekanan merah karena paling sering dilupakan dan menyebabkan bug yang sulit didiagnosis.",
    footnote: "Jika zero_grad() tidak dipanggil sebelum backward(), gradient dari batch sebelumnya akan menumpuk di atas gradient yang baru dihitung. Akibatnya, parameter model diperbarui berdasarkan campuran dua batch yang berbeda, dan hasilnya tidak dapat diprediksi.",
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

  // ── Slide 17c: Cue Live Coding ──
  {
    layout: "cta",
    title: "Sesi Live Coding (Mulai 20 Menit)",
    body: "Tutup slide ini. Buka Google Colab kosong. Kita akan menulis 15 baris kode PyTorch dari nol bersama-sama sebelum masuk ke Lab utama. Mahasiswa ikut mengetik.",
    ctaText: "Buka Google Colab",
    ctaTarget: "https://colab.new/",
    footnote: "Ini adalah sesi interaktif. Jangan lanjut ke slide berikutnya sampai loop 5 baris sudah dicoba mahasiswa.",
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
    footnote: "Demo di W6 menunjukkan akurasi yang turun dari 0.92 ke 0.63 saat split diperbaiki.",
  },

  // ── Slide 19: Pitfalls ──
  {
    layout: "bullets",
    title: "4 Pitfalls Paling Sering di W1",
    body: "Ada empat kesalahan yang paling sering terjadi di W1. Hindari pitfalls berikut:",
    bullets: [
      "**Ketidakcocokan loss dan head:** Memakai MSE untuk multikelas, atau Softmax+CrossEntropy, menyebabkan loss masih turun tapi hasilnya tidak bermakna.",
      "**Softmax sebelum CrossEntropyLoss:** CrossEntropyLoss sudah memasukkan log-softmax di dalamnya, sehingga menambahkan softmax lagi membuat distribusi menjadi salah.",
      "**Accuracy stuck di 1/K:** Model tidak belajar lebih baik dari tebakan acak. Cek kembali pasangan loss dan head, learning rate, dan kualitas data.",
      "**Kesimpulan sebelum observasi:** Angka akurasi yang bagus membuat kamu langsung mengklaim model berhasil, padahal confusion matrix belum dilihat.",
    ],
    footnote: "Lab W1 langkah 5 meminta kamu menjalankan ketidakcocokan loss dan head secara sengaja dan mendokumentasikan apa yang terjadi.",
  },

  // ── Slide 20: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W1",
    body: "Slide ini hanya peta dari keseluruhan W1. Contoh angka, worked example, dan pitfall lengkap tersedia di modul penuh.\n\nWaktu yang dibutuhkan untuk membaca modul adalah sekitar 45 menit, sementara pengerjaan lab membutuhkan 3 sampai 4 jam.",
    ctaText: "Baca Modul W1 Penuh",
    ctaTarget: "01",
  },
];

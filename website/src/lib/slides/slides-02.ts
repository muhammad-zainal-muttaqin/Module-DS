import type { SlideSection } from "./index";

export const slides02: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W2: Images, CNN & Smoke Test",
    subtitle: "Tensor citra, filter lokal yang berbagi bobot, dan tiga kebiasaan debugging yang dipakai sepanjang bootcamp.",
    body: "Presentasi ini dirancang sebagai sumber mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 02 - Minggu 2",
  },

  // ── 2: Peta W2 ──
  {
    layout: "section",
    title: "Peta W2",
    body: "W2 mencakup delapan topik yang membangun satu sama lain: tensor citra, MLP & backpropagation, smoke test, galeri training, Conv2d, empat keluarga arsitektur, layer transformasi, dan SimpleCNN pada CIFAR-10.",
    footnote: "Ikuti urutan - setiap topik mengandalkan pemahaman dari topik sebelumnya.",
  },

  // ── 3: Motivasi ──
  {
    layout: "bullets",
    title: "Arsitektur adalah Keputusan Desain, bukan Pilihan Acak",
    body: "Setiap keluarga arsitektur dibangun dengan asumsi tertentu tentang struktur data. Memilih arsitektur yang salah berarti memilih asumsi yang tidak sesuai:",
    bullets: [
      "**Dataset A** berupa tabel medis dengan 20 kolom hasil lab darah - feed-forward network masuk akal karena tidak ada struktur spasial di antara kolom.",
      "**Dataset B** berupa 10.000 gambar daun sawit 224×224 - CNN masuk akal karena pola penyakit muncul sebagai tekstur lokal yang dapat muncul di lokasi manapun.",
      "**Dataset C** berupa 30.000 review produk bahasa Indonesia - Transformer masuk akal karena makna kata bergantung pada kata-kata lain dalam kalimat.",
    ],
    footnote: "Pertanyaan arsitektur dimulai dari: data saya punya struktur apa, dan keluarga mana yang paling cocok mengeksploitasi struktur itu?",
  },

  // ── 4: Peta Besar ──
  {
    layout: "bullets",
    title: "Peta Besar: Tentukan Tensor Masuk dan Tensor Keluar",
    body: "Satu kerangka yang menyederhanakan hampir semua keputusan arsitektur: tentukan shape tensor input dan output terlebih dahulu, lalu pilih arsitektur yang menghubungkan keduanya:",
    bullets: [
      "**Tabular:** input **(F,)** vektor fitur satu baris → output **(N,)** logit kelas, atau **(1,)** untuk regresi.",
      "**Gambar:** input **(C, H, W)** → output **(N,)** untuk klasifikasi, atau **(G, G, 5+N)** untuk deteksi objek.",
      "**Teks dan urutan:** input **(T,)** token → output **(N,)** untuk sentimen, atau **(T, N)** untuk labeling setiap token.",
    ],
    footnote: "Latihan: tulis pasangan tensor masuk-keluar untuk dataset proyek Anda sebelum menulis satu baris kode.",
  },

  // ── 5: Section Tensor Citra ──
  {
    layout: "section",
    title: "Tensor Citra: dari Pixel ke (B, C, H, W)",
    body: "Sebelum membahas Conv2d, kita pastikan titik awalnya: bagaimana sebuah foto menjadi tensor empat dimensi yang bisa diterima nn.Conv2d?",
    footnote: "Seluruh section ini bisa diverifikasi dengan satu baris: print(x.shape) setelah next(iter(loader)).",
  },

  // ── 6: Pixel, RGB, Channel ──
  {
    layout: "bullets",
    title: "Pixel, RGB, dan Channel: Tiga Lapisan Representasi",
    body: "Foto berwarna direpresentasikan dalam tiga lapisan sebelum menjadi tensor yang siap diproses model:",
    bullets: [
      "Foto grayscale adalah matriks **(H, W)** berisi nilai pixel 0..255 - setiap angka merepresentasikan intensitas cahaya di satu titik.",
      "Foto RGB terdiri dari tiga matriks (R, G, B) yang ditumpuk menjadi shape **(C, H, W)** dengan C = 3 - ini adalah konvensi channel-first PyTorch.",
      "PyTorch memakai channel-first **(C, H, W)**; TensorFlow default memakai channel-last **(H, W, C)**. Selalu periksa konvensi saat porting kode antar library.",
    ],
    footnote: "print(x.shape) setelah next(iter(loader)) menampilkan empat angka: (B, C, H, W). Empat angka ini adalah cara tercepat memverifikasi format data sudah benar.",
  },

  // ── 7: Code (B,C,H,W) ──
  {
    layout: "code",
    title: "Batch: Satu Tensor 4D untuk Banyak Gambar Sekaligus",
    body: "DataLoader menggabungkan B foto menjadi satu batch sehingga GPU dapat memprosesnya secara paralel:",
    code: `# Satu foto RGB 32×32 → shape (C, H, W) = (3, 32, 32)

# DataLoader menggabungkan B foto menjadi satu batch
x, y = next(iter(trainloader))
print(x.shape)   # torch.Size([32, 3, 32, 32])
                 # B=32, C=3, H=32, W=32

print(y.shape)   # torch.Size([32])
                 # satu label integer per gambar

# CIFAR-10: 32 foto RGB 32×32 → (32, 3, 32, 32)
# PathMNIST: 32 foto RGB 28×28 → (32, 3, 28, 28)`,
    lang: "python",
    footnote: "Sumbu (B, C, H, W) selalu berurutan: batch, channel, tinggi, lebar.",
  },

  // ── 8: Image NCHW ──
  {
    layout: "image",
    title: "Visualisasi Tensor (N, C, H, W) pada Data Gambar",
    imageUrl: "/figures/fig00a_tensor_nchw.jpeg",
    caption: "Gambar ini menunjukkan bagaimana foto-foto RGB tersusun dalam tensor empat dimensi: N adalah jumlah gambar dalam batch, C adalah tiga channel warna (R, G, B), H adalah tinggi gambar dalam pixel, dan W adalah lebar gambar.",
    footnote: "Sumber: Stanford CS231n. Konvensi ini berlaku untuk semua arsitektur berbasis CNN di PyTorch.",
  },

  // ── 9: Section MLP & Backprop ──
  {
    layout: "section",
    title: "MLP dan Backpropagation: Fondasi Bersama",
    body: "Semua arsitektur modern - CNN, RNN, Transformer - memiliki satu fondasi yang sama: MLP yang belajar lewat backpropagation.",
    footnote: "Pemahaman backpropagation adalah prasyarat untuk mendiagnosis masalah training di semua arsitektur.",
  },

  // ── 10: Tiga Keluarga = MLP + Batasan ──
  {
    layout: "bullets",
    title: "CNN, RNN, dan Transformer: Semuanya MLP dengan Batasan Tambahan",
    body: "Tiga keluarga arsitektur utama dapat dipahami sebagai MLP yang diberi batasan khusus sesuai struktur data yang diproses:",
    bullets: [
      "**CNN** adalah MLP yang dipaksa berbagi bobot yang sama di semua lokasi spasial - inilah *parameter sharing* yang membuat CNN sangat efisien untuk gambar.",
      "**RNN/LSTM** adalah MLP yang dipanggil berulang di setiap langkah waktu dengan bobot yang sama - memungkinkan model memproses urutan dengan panjang berapapun.",
      "**Transformer** menggantikan rekursi dengan self-attention: setiap posisi dalam urutan melihat semua posisi lain secara langsung dalam satu operasi paralel.",
    ],
    footnote: "Implikasi: backpropagation bekerja dengan cara yang sama di semua arsitektur ini - chain rule berjalan mundur dari loss ke setiap parameter.",
  },

  // ── 11: Image MLP Foundation ──
  {
    layout: "image",
    title: "MLP sebagai Fondasi Tiga Keluarga Arsitektur",
    imageUrl: "/figures/fig02b_mlp_foundation.png",
    caption: "Diagram ini menunjukkan MLP sebagai arsitektur dasar di tengah, dengan tiga anak panah menuju CNN (batasan: parameter sharing spasial), RNN/LSTM (batasan: parameter sharing temporal), dan Transformer (batasan: self-attention menggantikan rekursi). Semua keluarga mewarisi mekanisme backpropagation yang sama.",
    footnote: "Semua arsitektur pada akhirnya belajar dengan cara yang sama: hitung loss, jalankan backward, perbarui bobot.",
  },

  // ── 12: Image Backpropagation ──
  {
    layout: "image",
    title: "Backpropagation: Forward Pass dan Backward Pass",
    imageUrl: "/figures/fig01b_mlp_forward_backward.svg",
    caption: "Gambar ini menunjukkan dua fase komputasi neural network: forward pass menghitung output dari input melewati setiap layer secara berurutan dari kiri ke kanan, dan backward pass menggunakan chain rule untuk menghitung gradient dari loss terhadap setiap parameter dari layer terakhir mundur ke layer pertama.",
    footnote: "Derivasi 7-langkah tersedia di Lampiran A.1. Lab 1c mengimplementasikan backprop manual dalam numpy.",
  },

  // ── 13: Vanishing vs Exploding Gradient ──
  {
    layout: "split",
    title: "Vanishing dan Exploding Gradient: Dua Masalah, Dua Solusi",
    body: "Dua masalah gradient yang paling sering muncul saat melatih jaringan dalam - kenali cirinya dan solusinya:",
    left: {
      title: "Vanishing Gradient",
      body: "Gradient mengecil saat backward pass melewati banyak layer - layer awal hampir tidak belajar karena gradientnya mendekati nol.\n\n**Ciri:** Loss tidak bergerak; parameter layer awal tidak berubah antara epoch.\n\n**Solusi:** ReLU (menggantikan Sigmoid/Tanh), BatchNorm, residual connection.",
    },
    right: {
      title: "Exploding Gradient",
      body: "Gradient tumbuh eksponensial saat backward pass - bobot tiba-tiba melompat ke nilai sangat besar, loss meledak ke NaN.\n\n**Ciri:** Loss tiba-tiba NaN; model tidak bisa dilatih sama sekali.\n\n**Solusi:** Gradient clipping (`clip_grad_norm_`), learning rate lebih kecil, inisialisasi bobot yang tepat.",
    },
    footnote: "Kedua masalah ini dibahas mendalam di W5 (RNN/LSTM). Di W2, cukup kenali ciri dan solusi standarnya.",
  },

  // ── 14: Section Smoke Test ──
  {
    layout: "section",
    title: "Smoke Test Tiga Level: Debugging Sebelum Training",
    body: "Tiga level smoke test menargetkan tiga jenis bug yang berbeda. Urutan ini dipakai sepanjang bootcamp dari W2 sampai capstone.",
    footnote: "Jangan lewati level apapun - setiap level yang dilewati memperpanjang waktu debugging.",
  },

  // ── 15: Tiga Level ──
  {
    layout: "bullets",
    title: "Tiga Level, Tiga Jenis Bug yang Berbeda",
    body: "Setiap level menargetkan jenis bug yang spesifik dan dapat dijalankan jauh sebelum training dimulai:",
    bullets: [
      "**Level 1 (import test)** menangkap typo, missing dependency, dan shape mismatch di definisi layer - cukup jalankan `from src.models import SimpleCNN; SimpleCNN()` tanpa data.",
      "**Level 2 (dummy forward)** menangkap shape mismatch antar layer menggunakan tensor random - tidak butuh data dari dataset, cukup `torch.randn(B, C, H, W)`.",
      "**Level 3 (overfit one batch)** menangkap bug algoritma seperti gradient yang mati atau loss yang tidak turun - butuh 4-8 sampel nyata dan 100 iterasi.",
    ],
    footnote: "Jika Level 3 gagal (loss tidak mendekati nol dalam 100 iterasi), ada bug di kode - bukan masalah hyperparameter.",
  },

  // ── 16: Code Level 2+3 ──
  {
    layout: "code",
    title: "Level 2 dan Level 3 dalam Kode",
    body: "Level 2 memakai tensor random; Level 3 memakai sampel nyata dari DataLoader:",
    code: `# Level 2 - Dummy forward pass (tensor random)
x = torch.randn(2, 3, 32, 32)   # bukan data asli
logits = model(x)
assert logits.shape == (2, 10), f"got {logits.shape}"

# Level 3 - Overfit one batch (data nyata)
x, y = next(iter(train_loader))  # 4-8 sampel nyata
for i in range(100):
    optimizer.zero_grad()
    loss = criterion(model(x), y)
    loss.backward()
    optimizer.step()
    if i % 20 == 0:
        print(f"iter {i}: loss={loss.item():.4f}")
# Ekspektasi: loss turun dari ~2.3 menuju ~0.0`,
    lang: "python",
    footnote: "Loss awal ~2.3 adalah -log(1/10) = log(10): nilai yang diharapkan untuk prediksi acak dari 10 kelas.",
  },

  // ── 17: Section Galeri Training ──
  {
    layout: "section",
    title: "Galeri Training: Empat Pola Loss yang Wajib Dikenali",
    body: "Sebelum mendalami Conv2d, kenali empat pola loss yang paling sering muncul di lab dan di paper.",
    footnote: "W3 menuntaskan kerangka diagnosis ini - termasuk kapan turunkan learning rate dan kapan tambah regularisasi.",
  },

  // ── 18: Image Loss Curves ──
  {
    layout: "image",
    title: "Empat Pola Loss: Diagnosis Visual",
    imageUrl: "/figures/fig01c_loss_curves_diagnostic.svg",
    caption: "Gambar ini menunjukkan empat pola kurva loss yang paling sering muncul: Run A adalah training sehat dengan loss train dan val turun sejajar; Run B adalah overfitting dengan loss train turun tetapi val stagnan; Run C adalah loss yang tidak bergerak akibat bug atau learning rate terlalu kecil; Run D adalah loss yang meledak ke NaN akibat gradient exploding.",
    footnote: "Perhatikan pola di setiap run sebelum melihat diagnosis di slide berikutnya.",
  },

  // ── 19: Diagnosis Empat Pola ──
  {
    layout: "bullets",
    title: "Cara Membaca Pola Loss",
    body: "Diagnosis awal dari empat pola yang muncul di galeri training - setiap pola mengarah ke tindakan yang berbeda:",
    bullets: [
      "**Run A (train dan val turun sejajar)** adalah training yang berjalan baik - model belajar pola yang general, bukan menghafal training set.",
      "**Run B (train turun, val stagnan)** adalah overfitting klasik. Solusi: augmentasi lebih agresif, dropout lebih besar, atau kurangi kapasitas model.",
      "**Run C (loss tidak bergerak) dan Run D (loss ke NaN)** adalah tanda bug atau konfigurasi yang salah - tidak bisa diselesaikan dengan hyperparameter tuning.",
    ],
    footnote: "W3 menyelesaikan kerangka ini: kapan turunkan lr, kapan tambah regularisasi, kapan periksa data, kapan periksa arsitektur.",
  },

  // ── 20: Section Conv2d ──
  {
    layout: "section",
    title: "Conv2d: Filter Lokal yang Berbagi Bobot",
    body: "nn.Conv2d adalah komponen utama CNN. Kita pahami cara kerjanya secara mekanis - dari satu filter tunggal sampai receptive field yang tumbuh seiring kedalaman.",
    footnote: "Pemahaman mekanik Conv2d membuat debugging shape mismatch di Level 2 jauh lebih cepat.",
  },

  // ── 21: Filter yang Geser ──
  {
    layout: "bullets",
    title: "Cara Kerja Filter: Tempel, Kalikan, Jumlahkan, Geser",
    body: "Satu filter kecil berisi bobot yang dipelajari, lalu digeser ke seluruh gambar untuk menghasilkan satu feature map:",
    bullets: [
      "Satu filter 3×3 berisi 9 angka bobot yang dipelajari saat training - bukan nilai tetap yang dirancang manusia seperti filter Sobel atau Canny.",
      "Filter ditempatkan di satu lokasi gambar, dikalikan element-wise dengan patch di bawahnya, lalu hasilnya dijumlahkan menjadi satu angka di feature map.",
      "Semua posisi memakai bobot filter yang sama - inilah **parameter sharing** yang membuat CNN jauh lebih efisien dari MLP penuh untuk data gambar.",
    ],
    footnote: "Satu nn.Conv2d(3, 64, ...) memiliki 64 filter berbeda, sehingga menghasilkan 64 feature map untuk satu gambar input.",
  },

  // ── 22: Image Filter Sliding ──
  {
    layout: "image",
    title: "Filter 3×3 Bergeser Melewati Gambar",
    imageUrl: "/figures/fig02c_conv_filter.png",
    caption: "Gambar ini menunjukkan operasi konvolusi 2D: filter 3×3 ditempatkan di satu lokasi gambar, dikalikan element-wise dengan patch di bawahnya, lalu semua hasil perkalian dijumlahkan menjadi satu nilai di feature map. Filter kemudian bergeser satu pixel ke kanan dan operasi diulang sampai seluruh gambar terpindai.",
    footnote: "Perhatikan bahwa bobot filter (9 angka) tidak berubah saat filter bergeser - itulah parameter sharing.",
  },

  // ── 23: Tiga Parameter Conv2d ──
  {
    layout: "split",
    title: "Tiga Parameter Conv2d dan Rumus Output Shape",
    body: "Tiga parameter menentukan cara filter beroperasi, dan satu rumus menghitung dimensi output di setiap layer:",
    left: {
      title: "Tiga Parameter Kunci",
      bullets: [
        "**Kernel size** adalah ukuran satu filter. Filter 3×3 paling umum; filter 1×1 memproyeksikan channel tanpa menyentuh dimensi spasial.",
        "**Stride** menentukan berapa pixel filter bergeser per langkah. Stride=2 menghasilkan output setengah lebih kecil - sering dipakai sebagai pengganti MaxPool.",
        "**Padding** adalah nol yang ditambah di tepi gambar. Padding=1 dengan kernel 3×3 mempertahankan dimensi spasial output.",
      ],
    },
    right: {
      title: "Rumus Output Shape",
      body: "Untuk input spasial `in`, kernel `k`, padding `p`, stride `s`:\n\n**`out = (in - k + 2p) / s + 1`**\n\nContoh Conv2d(k=3, p=1, s=1) pada 32×32:\n`(32 - 3 + 2) / 1 + 1 = 32` ✓\n\nContoh MaxPool2d(2) pada 32×32:\n`(32 - 2) / 2 + 1 = 16`",
    },
    footnote: "Rumus ini adalah alat utama saat debugging Level 2: hitung shape yang diharapkan di setiap layer, bandingkan dengan error message.",
  },

  // ── 24: Receptive Field ──
  {
    layout: "bullets",
    title: "Receptive Field: Satu Pixel Output Melihat Berapa Besar Area Input?",
    body: "Satu pixel di feature map tidak hanya melihat satu pixel input - receptive field tumbuh semakin besar seiring bertambahnya kedalaman layer:",
    bullets: [
      "Layer Conv2d pertama (kernel 3×3): satu pixel output melihat patch 3×3 di input asli - receptive field = 3×3.",
      "Setelah layer Conv2d kedua (kernel 3×3, tanpa pooling): receptive field bertambah menjadi 5×5 di input asli karena setiap pixel layer 1 sudah melihat 3×3.",
      "MaxPool2d(2) melipatgandakan receptive field dua kali - layer Conv2d setelah MaxPool melihat area dua kali lebih besar di input asli.",
    ],
    footnote: "Di layer dalam CNN, receptive field bisa mencakup seluruh gambar - CNN belajar konsep global dari operasi lokal kecil yang berlapis.",
  },

  // ── 25: Image Receptive Field ──
  {
    layout: "image",
    title: "Receptive Field Tumbuh Seiring Kedalaman Layer",
    imageUrl: "/figures/fig02d_receptive_field.png",
    caption: "Gambar ini menunjukkan bagaimana receptive field satu pixel output bertumbuh seiring bertambahnya layer: layer pertama melihat patch 3×3 dari input, layer kedua melihat 5×5, dan layer ketiga melihat 7×7. Setiap layer Conv2d dengan kernel 3×3 menambahkan 2 pixel di setiap sisi receptive field.",
    footnote: "Inilah cara CNN menangkap tepi di layer awal dan objek utuh di layer dalam, tanpa mengorbankan efisiensi parameter.",
  },

  // ── 26: Section Arsitektur ──
  {
    layout: "section",
    title: "Empat Keluarga Arsitektur: Empat Asumsi tentang Data",
    body: "Setiap keluarga arsitektur mengandung asumsi yang berbeda tentang struktur data. Memilih arsitektur yang tepat berarti memilih asumsi yang paling sesuai.",
    footnote: "Transformer (W7) dan Autoencoder (Lab Breadth) melengkapi lima keluarga yang menjadi target Breadth Check.",
  },

  // ── 27: Grid 3 Keluarga ──
  {
    layout: "grid",
    title: "FFN, CNN, dan RNN/LSTM: Tiga Asumsi yang Berbeda",
    body: "Tiga keluarga pertama ini mencakup sebagian besar tugas supervised learning yang dijumpai di riset ML:",
    gridItems: [
      {
        title: "FFN/MLP: Tanpa Struktur Khusus",
        body: "FFN tidak mengasumsikan urutan atau lokalitas pada fitur - urutan kolom tidak bermakna. Arsitektur ini cocok untuk data tabular dan embedding yang sudah diproses, tetapi boros parameter untuk data berstruktur.",
      },
      {
        title: "CNN: Pola Lokal yang Dapat Bergeser",
        body: "CNN mengasumsikan pola relevan bersifat lokal dan dapat muncul di lokasi manapun dalam gambar (translation invariance). Arsitektur ini sangat efisien secara parameter untuk gambar, data grid, dan sinyal 1D.",
      },
      {
        title: "RNN/LSTM: Urutan dan Konteks Masa Lalu",
        body: "RNN mengasumsikan urutan penting dan konteks masa lalu membantu prediksi langkah berikutnya. LSTM menambahkan mekanisme gate untuk mengatasi vanishing gradient pada sekuens panjang.",
      },
    ],
    footnote: "Transformer (W7) menggantikan rekursi dengan self-attention: setiap elemen langsung melihat semua elemen lain dalam satu operasi paralel.",
  },

  // ── 28: Image Lima Keluarga ──
  {
    layout: "image",
    title: "Lima Keluarga Arsitektur Neural Network",
    imageUrl: "/figures/fig01a_nn_families.svg",
    caption: "Gambar ini menunjukkan lima keluarga arsitektur neural network dengan inductive bias masing-masing: MLP tidak mengasumsikan struktur apapun, CNN mengasumsikan lokalitas spasial, RNN/LSTM mengasumsikan urutan waktu, Transformer menggantikan rekursi dengan self-attention global, dan Autoencoder mengasumsikan representasi yang dapat dikompres dan direkonstruksi.",
    footnote: "W2 fokus pada CNN. RNN/LSTM dibahas di W5, Transformer di W7, Autoencoder di Lab Breadth.",
  },

  // ── 29: Section Layer Transformasi ──
  {
    layout: "section",
    title: "Layer sebagai Transformasi Representasi",
    body: "Setiap layer mengubah representasi data menjadi bentuk yang lebih berguna bagi layer berikutnya. Tiga komponen menentukan stabilitas training: inisialisasi bobot, normalisasi, dan fungsi aktivasi.",
    footnote: "Memilih ketiga komponen ini sembarangan adalah sumber bug yang sering tidak terdeteksi di smoke test.",
  },

  // ── 30: Inisialisasi Bobot ──
  {
    layout: "split",
    title: "Inisialisasi Bobot: Kaiming vs Xavier",
    body: "Memilih nol atau nilai terlalu besar menghancurkan aliran gradient sejak iterasi pertama. Dua skema standar menyelesaikan masalah ini:",
    left: {
      title: "Kaiming (He) Initialization",
      body: "Dipakai untuk layer dengan aktivasi **ReLU**: `σ² = 2/fan_in`.\n\nAlasan faktor 2: ReLU mematikan sekitar separuh aktivasi (nilai negatif → 0), sehingga variansi menyusut separuh. Faktor 2 mengompensasi agar sinyal tetap stabil.\n\nPyTorch menerapkannya otomatis untuk `nn.Conv2d` dan `nn.Linear`.",
    },
    right: {
      title: "Xavier (Glorot) Initialization",
      body: "Dipakai untuk aktivasi **simetris** (Tanh, Sigmoid): `σ² = 2/(fan_in + fan_out)`.\n\nSkema ini sering dipakai di Transformer yang memakai LayerNorm + GELU.\n\nfan_in = jumlah input ke satu neuron. Untuk Conv2d(C_in=32, kernel=3): fan_in = 32 × 3 × 3 = 288.",
    },
    footnote: "Jarang perlu menginisialisasi secara manual - kecuali saat mendefinisikan layer kustom atau mendebug model yang tidak belajar dari epoch pertama.",
  },

  // ── 31: Image Normalisasi ──
  {
    layout: "image",
    title: "BatchNorm, LayerNorm, GroupNorm: Perbedaan Sumbu Normalisasi",
    imageUrl: "/figures/fig01f_normalization.svg",
    caption: "Gambar ini menunjukkan perbedaan tiga jenis normalisasi pada tensor (N, C, H, W): BatchNorm menormalkan melewati seluruh batch di tiap channel sehingga butuh batch besar; LayerNorm menormalkan per sampel di seluruh fitur sehingga tidak bergantung batch size; GroupNorm menormalkan per grup channel per sampel dan cocok untuk batch kecil.",
    footnote: "Aturan praktis: BatchNorm untuk CNN, LayerNorm untuk Transformer dan RNN, GroupNorm untuk CNN dengan batch kecil.",
  },

  // ── 32: Image Fungsi Aktivasi ──
  {
    layout: "image",
    title: "Fungsi Aktivasi: ReLU, GELU, dan SiLU",
    imageUrl: "/figures/fig01e_activation_functions.svg",
    caption: "Gambar ini menunjukkan kurva tiga fungsi aktivasi paling umum pada rentang [-3, 3]: ReLU memotong nilai negatif secara tajam dan menjadi default untuk CNN dan MLP; GELU memiliki kurva halus di sekitar nol dan menjadi default Transformer modern seperti BERT dan GPT; SiLU dipakai di MobileNet dan EfficientNet.",
    footnote: "Aturan praktis: pakai aktivasi yang disebut paper yang Anda replikasi. Mengganti aktivasi tanpa alasan kuat adalah variabel tambahan yang harus dijelaskan.",
  },

  // ── 33: Section Augmentation ──
  {
    layout: "section",
    title: "Augmentation, Dropout, dan Regularization",
    body: "Tiga teknik ini bekerja sama untuk mencegah overfitting - ketiganya paling efektif dipakai bersamaan.",
    footnote: "Titik awal: mulai dari default di paper yang Anda replikasi, lalu sesuaikan jika ada bukti overfitting (train acc >> val acc).",
  },

  // ── 34: Augmentation dan Dropout ──
  {
    layout: "bullets",
    title: "Augmentation dan Dropout: Aktif saat Training, Nonaktif saat Evaluasi",
    body: "Augmentation dan Dropout mencegah overfitting dari sudut yang berbeda - keduanya aktif hanya saat training, bukan saat evaluasi:",
    bullets: [
      "**Augmentation** adalah kumpulan transformasi acak yang diterapkan pada batch training saja: `RandomCrop`, `RandomHorizontalFlip`, `ColorJitter`. Data val/test tidak diaugmentasi - dievaluasi apa adanya.",
      "**Dropout** menonaktifkan secara acak fraksi `p` aktivasi di setiap forward pass saat training. Saat evaluasi, `model.eval()` menonaktifkan Dropout otomatis sehingga semua neuron aktif.",
    ],
    footnote: "Lupa model.eval() sebelum evaluasi adalah bug klasik - akurasi val akan terlihat lebih buruk dari seharusnya karena Dropout masih aktif.",
  },

  // ── 35: Regularization ──
  {
    layout: "bullets",
    title: "Regularization: Semua Teknik yang Mengurangi Overfitting",
    body: "Regularization adalah istilah payung yang mencakup semua teknik untuk mengurangi gap antara performa training dan test:",
    bullets: [
      "**Weight decay (L2)** menambahkan penalti proporsional dengan magnitude bobot ke fungsi loss - mendorong bobot tetap kecil dan mencegah model terlalu bergantung pada fitur tunggal.",
      "**Early stopping** menghentikan training saat val loss mulai naik kembali - mencegah model terus menghafal training set setelah titik optimal terlewati.",
    ],
    footnote: "Jika train acc >> val acc: coba augmentasi lebih agresif atau Dropout lebih besar. Jika belum membantu, kurangi kapasitas model.",
  },

  // ── 36: Section SimpleCNN ──
  {
    layout: "section",
    title: "SimpleCNN: Worked Example pada CIFAR-10",
    body: "Seluruh konsep W2 - Conv2d, BatchNorm, ReLU, MaxPool, Dropout - bersatu dalam satu model konkret yang bisa dilatih penuh pada CIFAR-10.",
    footnote: "SimpleCNN adalah titik awal Lab W2. Setelah memahami setiap keputusan desain, kamu akan membandingkannya dengan ResNet-18 yang di-pretrain.",
  },

  // ── 37: Code SimpleCNN Definisi ──
  {
    layout: "code",
    title: "SimpleCNN: Definisi Model",
    body: "Setiap komponen SimpleCNN dipilih karena alasan teknis - tidak ada angka yang dipilih sembarangan:",
    code: `class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        # Blok 1: 3→32→64 channel, resolusi 32→16
        self.block1 = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(32), nn.ReLU(inplace=True),
            nn.Conv2d(32, 64, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(64), nn.ReLU(inplace=True),
            nn.MaxPool2d(2),          # 32×32 → 16×16
        )
        # Blok 2: 64→128→128 channel, resolusi 16→8
        self.block2 = ...             # pola identik
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),  # (B, 128, 8, 8) → (B, 128, 1, 1)
            nn.Flatten(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes))`,
    lang: "python",
    footnote: "bias=False pada Conv karena BatchNorm sudah punya parameter bias sendiri. AdaptiveAvgPool2d(1) membuat classifier fleksibel terhadap resolusi input apapun.",
  },

  // ── 38: Alasan Desain ──
  {
    layout: "bullets",
    title: "Alasan di Balik Setiap Pilihan Desain SimpleCNN",
    body: "Setiap komponen SimpleCNN dipilih bukan karena konvensi, melainkan karena alasan teknis yang bisa dijelaskan:",
    bullets: [
      "**padding=1 pada Conv2d kernel 3×3** mempertahankan dimensi spasial: dari rumus `(32 - 3 + 2) / 1 + 1 = 32`. Resolusi tidak menyusut sebelum pooling.",
      "**bias=False pada Conv2d** karena BatchNorm yang mengikutinya sudah memiliki parameter bias (β) sendiri - menyimpan dua bias sekaligus adalah redundan.",
      "**AdaptiveAvgPool2d(1)** meringkas setiap feature map menjadi satu angka per channel - membuat classifier tidak bergantung pada resolusi input apapun.",
    ],
    footnote: "Pertanyaan desain yang produktif: 'mengapa komponen ini ada di sini?' bukan 'apakah ini konvensi yang umum?'",
  },

  // ── 39: Code Setup Training ──
  {
    layout: "code",
    title: "Setup Training Minimal: Transform, DataLoader, Loss, Optimizer",
    body: "Setup training SimpleCNN mengikuti pola standar yang berlaku untuk hampir semua CNN:",
    code: `transform_train = transforms.Compose([
    transforms.RandomCrop(32, padding=4),    # augmentasi
    transforms.RandomHorizontalFlip(),       # augmentasi
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465),
                         (0.2470, 0.2435, 0.2616)),
])
trainloader = DataLoader(trainset, batch_size=128,
                         shuffle=True, num_workers=2)

device = 'cuda' if torch.cuda.is_available() else 'cpu'
model     = SimpleCNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(),
                               lr=3e-4, weight_decay=1e-4)`,
    lang: "python",
    footnote: "Mean (0.4914, 0.4822, 0.4465) dan std (0.2470, 0.2435, 0.2616) adalah statistik CIFAR-10. Dataset baru perlu menghitung statistiknya sendiri.",
  },

  // ── 40: Pitfalls ──
  {
    layout: "bullets",
    title: "Tiga Miskonsepsi yang Paling Sering Menghabiskan Waktu",
    body: "Tiga miskonsepsi berikut paling sering muncul di Lab W2 - kenali sebelum terjebak:",
    bullets: [
      "**'Arsitektur lebih dalam selalu lebih baik.'** Klaim ini tidak tepat: tanpa data yang cukup, model dalam cenderung overfitting. Mulai dari arsitektur sederhana yang konvergen, tingkatkan kedalaman hanya jika bottleneck terbukti adalah kapasitas.",
      "**'Adam selalu lebih baik dari SGD.'** Pada banyak tugas, Adam konvergen lebih cepat di epoch awal tetapi SGD dengan momentum dan schedule yang tepat sering menang di akhir.",
      "**'Accuracy 99% berarti model hebat.'** Selalu periksa baseline naif: dummy classifier yang memprediksi kelas mayoritas. Jika akurasi baseline juga tinggi, yang diukur adalah distribusi kelas, bukan kualitas model.",
    ],
    footnote: "Miskonsepsi pertama paling sering terjadi di W2. Miskonsepsi kedua dan ketiga menjadi semakin relevan saat mengerjakan W4 dan capstone.",
  },

  // ── 41: Lab Checklist ──
  {
    layout: "bullets",
    title: "Lab W2: Tiga Target Utama",
    body: "Lab W2 berfokus pada membangun kebiasaan smoke test dan memahami SimpleCNN sebelum melanjutkan ke evaluasi lanjutan di W3:",
    bullets: [
      "**Smoke test tiga level lulus:** import + dummy forward + overfit one batch. Level 3 selesai jika loss turun ke < 0.1 dalam 100 iterasi.",
      "**SimpleCNN terlatih 30 epoch** pada CIFAR-10 dengan val_acc > 0.70. Kurva loss diplot dan gap train-val di-flag.",
      "**Dokumentasi dan analisis selesai:** tabel error-level smoke test terisi, confusion matrix diinterpretasi, dan 10 prediksi confident-salah dianalisis polanya.",
    ],
    footnote: "Setelah W2 selesai, lanjutkan ke Lab W3. Lab 1c (backprop numpy) tersedia kapan saja sebagai breadth opsional.",
  },

  // ── 42: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W2",
    body: "Semua konsep yang dibahas di presentasi ini ada dalam lab notebook lengkap dengan kode siap pakai, panduan analisis, dan pertanyaan refleksi.\n\nEstimasi waktu: 3-5 jam termasuk training, analisis, dan refleksi.",
    ctaText: "Buka Lab W2 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w2_cnn_baseline.ipynb",
  },
];

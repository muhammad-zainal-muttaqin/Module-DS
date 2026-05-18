import type { SlideSection } from "./index";

export const slides02: SlideSection[] = [
  // ── Slide 1: Title ──
  {
    layout: "title",
    title: "W2: Images, CNN & Smoke Test",
    subtitle: "Tensor citra, filter lokal yang berbagi bobot, dan tiga kebiasaan debugging yang dipakai sepanjang bootcamp.",
    body: "Presentasi ini mencakup semua materi W2: tensor citra, smoke test, Conv2d, empat keluarga arsitektur, layer transformasi, augmentation, dan SimpleCNN pada CIFAR-10.",
    footnote: "Bab 02 - Minggu 2",
  },

  // ── Slide 2: Peta W2 ──
  {
    layout: "section",
    title: "Peta W2",
    body: "W2 mencakup delapan topik yang saling terhubung: motivasi arsitektur, tensor citra, smoke test tiga level, galeri training, Conv2d, empat keluarga arsitektur, layer transformasi, dan SimpleCNN pada CIFAR-10.",
    footnote: "Setiap topik membangun di atas topik sebelumnya - ikuti urutan untuk mendapatkan gambaran yang utuh.",
  },

  // ── Slide 3: Motivasi ──
  {
    layout: "bullets",
    title: "Motivasi: Arsitektur adalah Keputusan Desain",
    body: "Setiap keluarga arsitektur dibangun dengan asumsi tertentu tentang bentuk data. Memilih arsitektur berarti memilih asumsi mana yang paling tepat:",
    bullets: [
      "**Dataset A** berupa tabel medis dengan 20 kolom hasil lab darah - feed-forward network masuk akal karena tidak ada struktur spasial.",
      "**Dataset B** berupa 10.000 gambar daun sawit 224×224 - CNN masuk akal karena pola penyakit muncul sebagai tekstur lokal di gambar.",
      "**Dataset C** berupa 30.000 review produk bahasa Indonesia - Transformer atau RNN masuk akal karena kata-kata punya ketergantungan urutan.",
      "Arsitektur yang tepat memanfaatkan struktur data yang ada; arsitektur yang salah mengabaikan struktur itu dan boros parameter.",
    ],
    footnote: "Pertanyaan arsitektur selalu dimulai dari: data saya punya struktur apa, dan keluarga mana yang paling cocok mengeksploitasi struktur itu?",
  },

  // ── Slide 4: Peta Besar ──
  {
    layout: "bullets",
    title: "Peta Besar: Tensor Masuk dan Tensor Keluar",
    body: "Satu kerangka berpikir menyederhanakan hampir setiap keputusan arsitektur: tentukan bentuk tensor yang masuk dan bentuk yang keluar - segala sesuatu di antaranya adalah fungsi yang mengubah satu bentuk ke bentuk lain.",
    bullets: [
      "Tabular: input **(F,)** vektor fitur → output **(N,)** logit kelas, atau **(1,)** untuk regresi.",
      "Gambar: input **(C, H, W)** → output **(N,)** untuk klasifikasi, atau **(G, G, 5+N)** untuk deteksi objek.",
      "Teks: input **(T,)** urutan token → output **(N,)** untuk sentimen, atau **(T, N)** untuk token classification.",
      "Deret waktu: input **(T, F)** → output **(1,)** satu nilai prediksi, atau **(T', 1)** untuk prediksi urutan.",
      "Saat membaca repositori baru: cari shape batch di DataLoader dan shape tensor sebelum loss - dari dua informasi itu, pilihan arsitektur sudah menyempit.",
    ],
    footnote: "Latihan: tulis pasangan tensor masuk-keluar untuk dataset di proyek Anda sebelum menulis satu baris kode apapun.",
  },

  // ── Slide 5: Section - Tensor Citra ──
  {
    layout: "section",
    title: "Tensor Citra: dari Pixel ke (B, C, H, W)",
    body: "Sebelum membahas Conv2d, kita pastikan titik awalnya: bagaimana sebuah foto berubah menjadi tensor empat dimensi yang bisa diterima nn.Conv2d?",
    footnote: "Seluruh section ini bisa diverifikasi dengan print(x.shape) setelah next(iter(loader)).",
  },

  // ── Slide 6: Pixel, RGB, Channel ──
  {
    layout: "bullets",
    title: "Pixel, RGB, dan Channel: Tiga Lapisan Representasi",
    body: "Foto berwarna direpresentasikan dalam tiga lapisan sebelum menjadi tensor yang siap diproses model:",
    bullets: [
      "Foto grayscale adalah matriks **(H, W)** berisi nilai pixel 0..255 - setiap angka merepresentasikan intensitas cahaya satu titik.",
      "Foto RGB adalah tiga matriks channel (R, G, B) yang ditumpuk - satu channel untuk merah, satu untuk hijau, satu untuk biru.",
      "Saat tiga channel ditumpuk, shape menjadi **(C, H, W)** dengan C = 3 - ini adalah konvensi channel-first PyTorch.",
      "PyTorch memakai channel-first (C, H, W); TensorFlow default memakai channel-last (H, W, C). Periksa konvensi saat porting kode antar library.",
    ],
    footnote: "print(x.shape) setelah next(iter(loader)) selalu menampilkan empat angka: (B, C, H, W). Empat angka ini adalah cara memverifikasi format data sudah benar.",
  },

  // ── Slide 7: Batch dan (B,C,H,W) ──
  {
    layout: "code",
    title: "Batch: Satu Tensor 4D untuk Banyak Gambar Sekaligus",
    body: "Training tidak memproses satu foto per langkah - sekumpulan B foto digabung dalam satu batch untuk efisiensi komputasi GPU:",
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
    footnote: "Sumbu (B, C, H, W) selalu urut: batch, channel, tinggi, lebar. Angka pertama berubah sesuai batch size; tiga sisanya tetap sesuai dataset.",
  },

  // ── Slide 8: MLP dan Backpropagation ──
  {
    layout: "bullets",
    title: "MLP dan Backpropagation: Fondasi Semua Arsitektur",
    body: "Semua keluarga arsitektur neural network adalah MLP dengan batasan tambahan - dan semua belajar lewat backpropagation yang sama:",
    bullets: [
      "**CNN** adalah MLP yang dipaksa berbagi bobot antar lokasi spasial - itulah yang disebut parameter sharing.",
      "**Transformer** adalah MLP yang memproses setiap posisi dengan bobot yang sama, ditambah self-attention.",
      "**RNN** adalah MLP yang dipanggil berulang sepanjang urutan waktu dengan bobot yang sama.",
      "**Vanishing gradient** terjadi ketika gradient mengecil saat backward pass melewati banyak layer - ReLU adalah solusi paling umum.",
      "**Exploding gradient** terjadi ketika gradient meledak akibat bobot yang terlalu besar - gradient clipping adalah solusinya.",
    ],
    footnote: "Derivasi 7-langkah chain rule tersedia di Lampiran A.1. Lab 1c mengimplementasikan backprop manual dalam numpy untuk memastikan pemahaman mekanis.",
  },

  // ── Slide 9: Section - Smoke Test ──
  {
    layout: "section",
    title: "Smoke Test Tiga Level: Debugging Sebelum Training",
    body: "Tiga level smoke test menargetkan tiga jenis bug yang berbeda. Jalankan berurutan dan jangan lompat ke level berikutnya sebelum level saat ini lulus.",
    footnote: "Kebiasaan smoke test ini dipakai sepanjang bootcamp - dari W2 sampai capstone.",
  },

  // ── Slide 10: Tiga Level, Tiga Jenis Bug ──
  {
    layout: "bullets",
    title: "Smoke Test: Tiga Level, Tiga Jenis Bug yang Berbeda",
    body: "Setiap level menargetkan jenis bug yang berbeda dan membutuhkan konteks yang berbeda pula:",
    bullets: [
      "**Level 1 (import test)** menangkap typo, missing dependency, dan shape mismatch di definisi layer - tidak butuh dataset, tidak butuh forward pass.",
      "**Level 2 (dummy forward)** menangkap shape mismatch antar layer menggunakan tensor random - butuh model dimuat, tidak butuh data dari dataset.",
      "**Level 3 (overfit one batch)** menangkap bug algoritma seperti gradient yang mati, loss yang tidak turun, atau target yang salah-bentuk - butuh 4-8 sampel nyata.",
      "Jangan mulai training 30 epoch sebelum ketiga level lulus - setiap level yang dilewati memperpanjang waktu debugging.",
    ],
    footnote: "Jika Level 3 gagal (loss tidak mendekati nol dalam 100 iterasi), ada bug di kode - bukan masalah hyperparameter. Perbaiki kode dulu sebelum mengubah apapun.",
  },

  // ── Slide 11: Code Level 2 dan Level 3 ──
  {
    layout: "code",
    title: "Smoke Test Level 2 dan Level 3 dalam Kode",
    body: "Level 2 memakai tensor random berisi angka acak; Level 3 memakai sampel nyata dari DataLoader:",
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
    footnote: "Loss awal ~2.3 adalah log(10) - nilai acak dari 10 kelas yang sama. Jika loss tidak bergerak dari angka ini, gradient tidak mengalir ke parameter dengan benar.",
  },

  // ── Slide 12: Section - Galeri Training ──
  {
    layout: "section",
    title: "Galeri Training: Empat Contoh Sebelum Teori",
    body: "Sebelum mendalami arsitektur, lihat empat contoh training konkret. Tulis hipotesis Anda untuk setiap pola sebelum melihat jawabannya.",
    footnote: "W3 menuntaskan kerangka diagnosis loss curve ini - termasuk kapan turunkan learning rate dan kapan tambah regularisasi.",
  },

  // ── Slide 13: Empat Pola Loss ──
  {
    layout: "bullets",
    title: "Empat Pola Loss: Diagnosis Awal",
    body: "Empat pola ini adalah yang paling sering muncul di lab dan paper. Kenali polanya dan diagnosis yang sesuai:",
    bullets: [
      "**Run A:** Loss training dan val turun sejajar ke angka rendah di epoch 20 - ini adalah training yang berjalan baik.",
      "**Run B:** Loss training turun mulus tetapi loss val stagnan sejak epoch 4 - ini adalah overfitting: model menghafal training set, bukan belajar pola yang general.",
      "**Run C:** Loss training tidak bergerak sama sekali dari epoch pertama - ini bisa disebabkan learning rate terlalu kecil, bug di training loop, atau gradient yang mati.",
      "**Run D:** Loss meledak ke NaN di epoch ke-8 setelah awalnya turun - ini adalah tanda exploding gradient atau learning rate yang terlalu besar.",
    ],
    footnote: "W3 menyelesaikan kerangka diagnosis ini: kapan turunkan learning rate, kapan tambah regularisasi, kapan periksa data, dan kapan periksa arsitektur.",
  },

  // ── Slide 14: Section - Conv2d ──
  {
    layout: "section",
    title: "Conv2d: Filter Lokal yang Berbagi Bobot",
    body: "nn.Conv2d adalah komponen utama CNN. Sebelum melihat SimpleCNN, kita pahami dulu apa yang dilakukan Conv2d secara mekanis - dari filter tunggal sampai receptive field yang tumbuh.",
    footnote: "Pemahaman mekanik Conv2d membuat debugging shape mismatch jauh lebih cepat.",
  },

  // ── Slide 15: Filter yang Geser ──
  {
    layout: "bullets",
    title: "Conv2d: Filter yang Geser ke Seluruh Gambar",
    body: "Satu filter kecil berisi bobot yang dipelajari, lalu digeser ke seluruh gambar untuk menghasilkan satu feature map:",
    bullets: [
      "Satu filter 3×3 berisi 9 angka bobot yang dipelajari saat training - bukan nilai tetap yang dirancang manusia.",
      "Filter ditempel di satu lokasi gambar, dikalikan element-wise dengan patch 3×3 di bawahnya, lalu dijumlahkan: hasilnya satu angka di feature map.",
      "Filter digeser satu pixel ke kanan dan operasi diulang - sampai seluruh gambar terpindai dari kiri-atas ke kanan-bawah.",
      "Semua posisi memakai bobot filter yang sama - inilah **parameter sharing** yang membuat CNN jauh lebih efisien dari MLP penuh.",
      "Satu `nn.Conv2d(3, 64, ...)` memiliki 64 filter berbeda, sehingga menghasilkan 64 feature map untuk satu gambar input.",
    ],
    footnote: "Filter yang dipelajari dari data akan mendeteksi tepi, tekstur, dan pola - bukan hanya fitur yang dirancang manusia seperti pada filter Sobel atau Canny.",
  },

  // ── Slide 16: Kernel, Stride, Padding + Rumus ──
  {
    layout: "split",
    title: "Tiga Parameter Conv2d dan Rumus Output Shape",
    body: "Tiga parameter menentukan bagaimana filter beroperasi, dan satu rumus menghitung dimensi output di setiap layer:",
    left: {
      title: "Tiga Parameter Kunci",
      bullets: [
        "**Kernel size** adalah ukuran satu filter. Filter 3×3 paling umum; filter 1×1 memproyeksikan channel tanpa menyentuh dimensi spasial.",
        "**Stride** menentukan berapa pixel filter bergeser per langkah. Stride=2 menghasilkan output setengah lebih kecil dan sering dipakai sebagai pengganti MaxPool.",
        "**Padding** adalah nol yang ditambah di tepi gambar. Padding=1 dengan kernel 3×3 mempertahankan dimensi spasial output.",
      ],
    },
    right: {
      title: "Rumus Output Shape",
      body: "Untuk input spasial `in`, kernel `k`, padding `p`, stride `s`:\n\n**`out = (in - k + 2p) / s + 1`**\n\nContoh Conv2d(3, 32, k=3, p=1) pada 32×32:\n`out = (32 - 3 + 2) / 1 + 1 = 32` ✓\n\nContoh MaxPool2d(2) pada 32×32:\n`out = (32 - 2) / 2 + 1 = 16`",
    },
    footnote: "Hafalkan rumus ini - saat debugging Level 2 smoke test, rumus ini adalah alat pertama untuk menghitung shape yang diharapkan di setiap layer.",
  },

  // ── Slide 17: Receptive Field ──
  {
    layout: "bullets",
    title: "Receptive Field: Berapa Besar Area Gambar yang Dilihat Satu Pixel?",
    body: "Satu pixel di feature map tidak hanya melihat satu pixel input. Semakin dalam layer, semakin besar area gambar yang menjadi konteks satu pixel output:",
    bullets: [
      "Layer Conv2d pertama (kernel 3×3): satu pixel output melihat patch 3×3 di input - receptive field = 3×3.",
      "Layer Conv2d kedua (kernel 3×3, tanpa pooling): satu pixel melihat 3×3 di layer 1, yang masing-masing melihat 3×3 di input - receptive field = 5×5.",
      "Setiap layer Conv menambahkan (k-1) pixel ke setiap sisi receptive field - tumbuh kira-kira `1 + L × (k-1)` untuk L layer.",
      "MaxPool2d(2) memperluas receptive field dua kali karena layer berikutnya melihat area yang dua kali lebih besar.",
      "Di layer CNN yang dalam, receptive field bisa mencakup seluruh gambar - CNN belajar konsep global dari operasi lokal kecil.",
    ],
    footnote: "Inilah cara CNN menangkap tepi di layer awal dan objek di layer dalam, dengan biaya parameter yang jauh lebih rendah dari MLP penuh.",
  },

  // ── Slide 18: Section - Arsitektur ──
  {
    layout: "section",
    title: "Empat Keluarga Arsitektur: Empat Asumsi tentang Data",
    body: "Setiap keluarga arsitektur mengandung asumsi yang berbeda tentang struktur data. Memilih arsitektur yang tepat berarti memilih asumsi yang paling sesuai dengan data Anda.",
    footnote: "Transformer (W7) dan Autoencoder (Lab Breadth) melengkapi lima keluarga yang menjadi target Breadth Check.",
  },

  // ── Slide 19: Grid 3 Keluarga Utama ──
  {
    layout: "grid",
    title: "FFN, CNN, dan RNN/LSTM: Tiga Asumsi yang Berbeda",
    body: "Tiga keluarga pertama mencakup sebagian besar tugas supervised learning yang dijumpai di riset ML:",
    gridItems: [
      {
        title: "FFN/MLP: Tanpa Struktur Khusus",
        body: "FFN tidak mengasumsikan urutan atau lokalitas pada fitur - urutan kolom tidak bermakna. Arsitektur ini cocok untuk data tabular dan embedding yang sudah diproses, tetapi boros parameter untuk data yang memiliki struktur spasial atau temporal.",
      },
      {
        title: "CNN: Pola Lokal yang Dapat Bergeser",
        body: "CNN mengasumsikan pola relevan bersifat lokal dan dapat muncul di lokasi manapun (translation invariance). Arsitektur ini sangat efisien secara parameter untuk gambar, data grid, dan sinyal 1D.",
      },
      {
        title: "RNN/LSTM: Urutan dan Konteks Masa Lalu",
        body: "RNN mengasumsikan urutan penting dan konteks masa lalu membantu prediksi langkah berikutnya. LSTM menambahkan mekanisme gate untuk mengatasi vanishing gradient pada sekuens panjang.",
      },
    ],
    footnote: "Transformer (W7) menggantikan rekursi dengan self-attention: setiap elemen langsung melihat semua elemen lain dalam satu operasi paralel.",
  },

  // ── Slide 20: Image Lima Keluarga ──
  {
    layout: "image",
    title: "Lima Keluarga Arsitektur Neural Network",
    imageUrl: "/figures/fig01a_nn_families.svg",
    caption: "Gambar ini menunjukkan lima keluarga arsitektur neural network dengan inductive bias masing-masing: MLP tidak mengasumsikan struktur apapun, CNN mengasumsikan lokalitas spasial dan translation invariance, RNN/LSTM mengasumsikan urutan waktu, Transformer menggantikan rekursi dengan self-attention global, dan Autoencoder mengasumsikan representasi yang dapat dikompres dan direkonstruksi.",
    footnote: "W2 fokus pada CNN. RNN/LSTM dibahas di W5, Transformer di W7, Autoencoder di Lab Breadth.",
  },

  // ── Slide 21: Section - Layer Transformasi ──
  {
    layout: "section",
    title: "Layer sebagai Transformasi Representasi",
    body: "Setiap layer mengubah representasi data menjadi bentuk yang lebih berguna bagi layer berikutnya. Tiga komponen menentukan stabilitas training: inisialisasi bobot, normalisasi, dan fungsi aktivasi.",
    footnote: "Layer awal CNN belajar detail kecil (tepi, tekstur); layer dalam menggabungkannya menjadi konsep lebih tinggi (objek, wajah).",
  },

  // ── Slide 22: Inisialisasi Bobot ──
  {
    layout: "split",
    title: "Inisialisasi Bobot: Kaiming vs Xavier",
    body: "Memilih nol atau nilai terlalu besar menghancurkan aliran gradient sejak iterasi pertama. Dua skema inisialisasi standar menyelesaikan masalah ini:",
    left: {
      title: "Kaiming (He) Initialization",
      body: "Dipakai untuk layer dengan aktivasi **ReLU**: `σ² = 2/fan_in`.\n\nAlasan faktor 2: ReLU mematikan sekitar separuh aktivasi (nilai negatif → 0), sehingga variansi menyusut separuh. Mengompensasi dengan faktor 2 menjaga aliran sinyal stabil lewat banyak layer ReLU.\n\nPyTorch menerapkannya otomatis untuk `nn.Conv2d` dan `nn.Linear`.",
    },
    right: {
      title: "Xavier (Glorot) Initialization",
      body: "Dipakai untuk aktivasi **simetris** (Tanh, Sigmoid): `σ² = 2/(fan_in + fan_out)`.\n\nSkema ini sering dipakai di Transformer yang banyak memakai LayerNorm + GELU.\n\nfan_in = jumlah input ke satu neuron. Untuk Conv2d(C_in=32, kernel=3): fan_in = 32 × 3 × 3 = 288.",
    },
    footnote: "Jarang perlu menginisialisasi secara manual. Kecuali saat mendefinisikan layer kustom atau mendebug model yang tidak mau belajar dari epoch pertama.",
  },

  // ── Slide 23: Image Normalisasi ──
  {
    layout: "image",
    title: "BatchNorm, LayerNorm, GroupNorm: Perbedaan Sumbu Normalisasi",
    imageUrl: "/figures/fig01f_normalization.svg",
    caption: "Gambar ini menunjukkan perbedaan ketiga normalisasi pada tensor (N, C, H, W): BatchNorm menormalkan melewati seluruh batch di tiap channel sehingga butuh batch besar; LayerNorm menormalkan per sampel di seluruh fitur sehingga tidak bergantung batch size; GroupNorm menormalkan per grup channel per sampel dan cocok untuk CNN dengan batch kecil.",
    footnote: "Aturan praktis: BatchNorm untuk CNN, LayerNorm untuk Transformer dan RNN, GroupNorm untuk CNN dengan batch kecil (seperti segmentasi 3D).",
  },

  // ── Slide 24: Fungsi Aktivasi ──
  {
    layout: "image",
    title: "Fungsi Aktivasi: ReLU, GELU, dan SiLU",
    imageUrl: "/figures/fig01e_activation_functions.svg",
    caption: "Gambar ini menunjukkan kurva tiga fungsi aktivasi paling umum pada rentang [-3, 3]: ReLU memotong nilai negatif secara tajam dan menjadi default untuk CNN dan MLP; GELU memiliki kurva halus di sekitar nol dan menjadi default untuk Transformer modern seperti BERT dan GPT; SiLU dipakai di MobileNet dan EfficientNet dengan kinerja mirip GELU tetapi lebih ringan dihitung.",
    footnote: "Aturan praktis: pakai aktivasi yang disebut paper yang Anda replikasi. Mengganti aktivasi tanpa alasan kuat adalah variabel tambahan yang harus dijelaskan di laporan.",
  },

  // ── Slide 25: Section - Augmentation ──
  {
    layout: "section",
    title: "Augmentation, Dropout, dan Regularization",
    body: "Tiga teknik ini bekerja sama untuk mencegah overfitting. Ketiganya paling efektif dipakai bersamaan, bukan satu per satu.",
    footnote: "Titik awal yang masuk akal: mulai dari default di paper yang Anda replikasi, lalu sesuaikan jika ada bukti overfitting (train acc >> val acc).",
  },

  // ── Slide 26: Augmentation, Dropout, Regularization ──
  {
    layout: "bullets",
    title: "Augmentation, Dropout, dan Regularization: Cara Kerja Masing-masing",
    body: "Tiga teknik ini menargetkan overfitting dari sudut yang berbeda dan saling melengkapi:",
    bullets: [
      "**Augmentation** adalah kumpulan transformasi acak yang hanya diterapkan pada batch training: `RandomCrop`, `RandomHorizontalFlip`, `ColorJitter`. Augmentasi tidak diterapkan di val/test - di sana data dievaluasi apa adanya.",
      "**Dropout** menonaktifkan secara acak fraksi `p` aktivasi di setiap forward pass saat training (mis. `p=0.3` mematikan 30% neuron). Saat evaluasi, `model.eval()` menonaktifkan dropout otomatis.",
      "**Regularization** adalah istilah payung: dropout, augmentation, weight decay (penalti L2 pada bobot di optimizer), early stopping, dan label smoothing semuanya termasuk di dalamnya.",
      "Dropout berguna karena memaksa model tidak bergantung pada satu jalur jaringan tertentu - setiap subjaringan harus kompeten secara mandiri, efeknya mirip ensembling.",
    ],
    footnote: "Jika train acc >> val acc: pertama coba augmentation lebih agresif atau Dropout lebih besar. Jika belum membantu, kurangi kapasitas model.",
  },

  // ── Slide 27: Section - SimpleCNN ──
  {
    layout: "section",
    title: "SimpleCNN: Worked Example pada CIFAR-10",
    body: "Seluruh konsep W2 - Conv2d, BatchNorm, ReLU, MaxPool, Dropout - bersatu dalam satu model konkret yang bisa dilatih penuh pada CIFAR-10.",
    footnote: "SimpleCNN adalah titik awal Lab W2. Setelah memahami setiap keputusan desain, kamu akan membandingkannya dengan fine-tuning ResNet-18.",
  },

  // ── Slide 28: Code SimpleCNN Definisi ──
  {
    layout: "code",
    title: "SimpleCNN: Definisi Model",
    body: "Setiap keputusan desain di SimpleCNN punya alasan yang bisa dipertahankan - tidak ada angka ajaib:",
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
    footnote: "bias=False pada Conv karena BatchNorm sudah punya bias sendiri. AdaptiveAvgPool2d(1) membuat classifier fleksibel terhadap resolusi input apapun.",
  },

  // ── Slide 29: Alasan Desain SimpleCNN ──
  {
    layout: "bullets",
    title: "Alasan di Balik Setiap Pilihan Desain SimpleCNN",
    body: "Setiap komponen SimpleCNN dipilih bukan karena konvensi, melainkan karena alasan teknis yang bisa dijelaskan:",
    bullets: [
      "**padding=1 pada Conv2d kernel 3×3** mempertahankan dimensi spasial (32-3+2)/1+1 = 32 - resolusi tidak menyusut sebelum pooling.",
      "**bias=False pada Conv2d** karena BatchNorm yang mengikutinya sudah memiliki parameter bias (β) sendiri - menyimpan dua bias sekaligus adalah redundan.",
      "**AdaptiveAvgPool2d(1)** melakukan global average pooling: meringkas setiap feature map menjadi satu angka per channel - membuat classifier tidak bergantung pada resolusi input.",
      "**Dropout(0.3)** pada classifier mencegah model mengandalkan satu fitur tunggal - memaksa representasi yang lebih tersebar dan general.",
    ],
    footnote: "Pertanyaan desain yang baik: 'mengapa komponen ini ada di sini?' - bukan 'apakah ini konvensi yang umum?'",
  },

  // ── Slide 30: Code Setup Training ──
  {
    layout: "code",
    title: "Setup Training Minimal: Transform, DataLoader, Loss, Optimizer",
    body: "Setup training SimpleCNN mengikuti pola standar yang berlaku untuk hampir semua CNN - setiap baris punya alasan yang bisa dijelaskan:",
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
    footnote: "Mean (0.4914, 0.4822, 0.4465) dan std (0.2470, 0.2435, 0.2616) adalah statistik CIFAR-10 per channel. Dataset baru perlu menghitung statistiknya sendiri - jangan pakai angka ini untuk PathMNIST atau ImageNet.",
  },

  // ── Slide 31: Pitfalls ──
  {
    layout: "bullets",
    title: "Pitfalls & Miskonsepsi: Tiga yang Paling Sering Muncul",
    body: "Tiga miskonsepsi berikut paling sering menghabiskan waktu di Lab W2 - kenali sebelum terjebak:",
    bullets: [
      "**'Arsitektur lebih dalam selalu lebih baik.'** Klaim ini tidak tepat. Tanpa data cukup banyak, model dalam cenderung overfitting. Mulai dari arsitektur sederhana yang konvergen, tingkatkan kedalaman hanya jika bottleneck terbukti adalah kapasitas model.",
      "**'Adam selalu lebih baik dari SGD.'** Pada banyak tugas, Adam konvergen lebih cepat di epoch awal tetapi SGD dengan momentum dan schedule yang tepat sering menang di akhir. Pilihan tergantung pada tugas dan konfigurasi eksperimen.",
      "**'Accuracy 99% berarti model hebat.'** Selalu periksa baseline naif: dummy classifier yang memprediksi kelas mayoritas. Jika akurasi baseline juga tinggi, Anda sedang mengukur distribusi kelas, bukan kualitas model.",
    ],
    footnote: "Pitfall pertama paling sering terjadi di W2. Pitfall kedua dan ketiga akan terasa semakin relevan saat mengerjakan W4 dan capstone.",
  },

  // ── Slide 32: Lab Checklist ──
  {
    layout: "bullets",
    title: "Lab W2: Checklist dan Urutan Pengerjaan",
    body: "Lab W2 dikerjakan dalam dua bagian - bagian pertama di W2 sekarang, bagian evaluasi setelah membaca W3:",
    bullets: [
      "**Bagian W2 (sekarang):** Jalankan tiga level smoke test dan dokumentasikan di level mana setiap jenis error tertangkap.",
      "**Bagian W2 (sekarang):** Pastikan SimpleCNN forward pass berjalan dengan shape yang benar.",
      "**Bagian W2 (sekarang):** Overfit one batch harus berhasil - loss turun ke kurang dari 0.1 dalam 100 iterasi.",
      "**Bagian W2 (sekarang):** Training loop berjalan 5 epoch penuh tanpa error.",
      "**Setelah W3:** Selesaikan evaluasi, error analysis, dan perbandingan SimpleCNN vs ResNet-18 fine-tuning.",
    ],
    footnote: "Lab 1c (MLP numpy from-scratch) tersedia sebagai breadth lab opsional kapan saja - implementasi backprop manual 7-langkah + parity check vs PyTorch.",
  },

  // ── Slide 33: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W2",
    body: "Presentasi ini mencakup semua konsep W2. Detail kode, angka konkret, dan contoh debugging tersedia di lab notebook.\n\nWaktu yang dibutuhkan: 3-4 jam untuk Lab 1 (baseline CNN + smoke test) dan 1-2 jam untuk Lab 1c (breadth opsional).",
    ctaText: "Buka Lab W2 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w2_cnn_baseline.ipynb",
  },
];

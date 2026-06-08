import type { SlideSection } from "./index";

export const slides02: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W2: Images, CNN & Smoke Test",
    subtitle: "Mengubah satu citra menjadi tensor (B, C, H, W), membangun CNN yang memprosesnya, dan menjalankan smoke test tiga level sebelum training penuh.",
    footnote: "Bab 02 - Minggu 2",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Tiga materi minggu ini mengikuti alur kerja satu CNN, dari bentuk data sampai pengecekan sebelum training:",
    gridItems: [
      {
        title: "1. Citra sebagai Tensor",
        body: "Kita mengubah satu foto menjadi tensor empat dimensi (B, C, H, W) yang bisa diterima nn.Conv2d.",
      },
      {
        title: "2. CNN dan Conv2d",
        body: "Kita memahami filter lokal yang berbagi bobot, lalu merakit komponennya menjadi SimpleCNN.",
      },
      {
        title: "3. Smoke Test Tiga Level",
        body: "Kita menjalankan tiga tes berurutan supaya bug tertangkap sebelum training berjalan berjam-jam.",
      },
    ],
  },

  // -- 3: Recap W1 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W1)",
    body: "W1 menanamkan refleks memetakan tugas ke pasangan tensor. Refleks itu dipakai lagi minggu ini dengan input yang naik tingkat:",
    bullets: [
      "Kita belajar melihat shape yang masuk dan shape yang harus keluar, lalu memilih keluarga model yang memetakan keduanya.",
      "W1 memakai vektor tabular (F,); minggu ini inputnya naik ke citra (C, H, W) dan keluarga modelnya adalah CNN.",
      "Output yang dibawa: kebiasaan menulis pasangan tensor input dan output sebelum menyentuh kode.",
    ],
    footnote: "Pasangan tensor W2 adalah (C, H, W) menjadi (N,): citra masuk, vektor logit kelas keluar.",
  },

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Citra sebagai Tensor",
    body: "Sebelum membahas Conv2d, kita pastikan titik awalnya: bagaimana satu foto menjadi tensor empat dimensi yang bisa diterima nn.Conv2d.",
    footnote: "Seluruh section ini bisa diverifikasi dengan satu baris: print(x.shape) setelah next(iter(loader)).",
  },

  // -- 5: Pixel, RGB, Channel --
  {
    layout: "bullets",
    title: "Pixel, RGB, dan channel",
    body: "Foto berwarna melewati tiga lapisan representasi sebelum menjadi tensor yang siap diproses model:",
    bullets: [
      "Foto grayscale adalah matriks (H, W) berisi nilai pixel 0..255, dan tiap angka adalah intensitas cahaya di satu titik.",
      "Foto RGB adalah tiga matriks (R, G, B) yang ditumpuk menjadi shape (C, H, W) dengan C = 3.",
      "PyTorch memakai channel-first (C, H, W), sedangkan TensorFlow default memakai channel-last (H, W, C), jadi periksa konvensi saat porting kode.",
    ],
    footnote: "CIFAR-10 memberi contoh konkret: 32 foto RGB 32×32 dalam satu batch berbentuk (32, 3, 32, 32).",
  },

  // -- 6: Code (B,C,H,W) --
  {
    layout: "code",
    title: "Batch: satu tensor 4D untuk banyak gambar",
    body: "DataLoader menggabungkan B foto menjadi satu batch sehingga GPU bisa memprosesnya secara paralel:",
    code: `# Satu foto RGB 32×32 → shape (C, H, W) = (3, 32, 32)

# DataLoader menggabungkan B foto menjadi satu batch
x, y = next(iter(trainloader))
print(x.shape)   # torch.Size([32, 3, 32, 32])
                 # B=32, C=3, H=32, W=32

print(y.shape)   # torch.Size([32])
                 # satu label integer per gambar`,
    lang: "python",
    footnote: "Sumbu (B, C, H, W) selalu berurutan: batch, channel, tinggi, lebar.",
  },

  // -- 7: Image NCHW (before the text that explains it) --
  {
    layout: "image",
    title: "Visualisasi tensor (N, C, H, W)",
    imageUrl: "/figures/fig00a_tensor_nchw.jpeg",
    caption: "Gambar ini menunjukkan bagaimana foto-foto RGB tersusun dalam tensor empat dimensi: N adalah jumlah gambar dalam batch, C adalah tiga channel warna (R, G, B), H adalah tinggi gambar dalam pixel, dan W adalah lebar gambar.",
    footnote: "Konvensi ini berlaku untuk semua arsitektur berbasis CNN di PyTorch.",
  },

  // -- 8: Teks setelah gambar NCHW --
  {
    layout: "bullets",
    title: "Memverifikasi format data",
    body: "Dari gambar tersebut, cara tercepat memastikan format data benar adalah memeriksa shape satu batch langsung:",
    bullets: [
      "Panggil print(x.shape) setelah next(iter(loader)) untuk membaca empat angka shape sekaligus.",
      "Tensor dengan empat angka di shape adalah 4D dengan urutan (B, C, H, W) di PyTorch.",
      "Disiplin menulis pasangan tensor input dan output sebelum menulis kode tetap berlaku saat masuk domain baru.",
    ],
    footnote: "Pasangan tensor W2 (C, H, W) menjadi (N,) diturunkan dari tugas dengan refleks yang sama seperti W1.",
  },

  // -- 9: Materi 2 --
  {
    layout: "section",
    title: "2. CNN dan Conv2d",
    body: "nn.Conv2d adalah komponen utama CNN. Kita pahami cara kerjanya secara mekanis, dari satu filter sampai receptive field yang tumbuh seiring kedalaman.",
    footnote: "Pemahaman mekanik Conv2d membuat debugging shape mismatch di Level 2 jauh lebih cepat.",
  },

  // -- 10: Image filter sliding (before its text) --
  {
    layout: "image",
    title: "Filter 3×3 bergeser melewati gambar",
    imageUrl: "/figures/fig02c_conv_filter.png",
    caption: "Gambar ini menunjukkan operasi konvolusi 2D: filter 3×3 ditempatkan di satu lokasi, dikalikan element-wise dengan patch di bawahnya, lalu semua hasil perkalian dijumlahkan menjadi satu nilai di feature map. Filter kemudian bergeser satu pixel ke kanan dan operasi diulang sampai seluruh gambar terpindai.",
    footnote: "Bobot filter (9 angka) tidak berubah saat filter bergeser, dan itulah parameter sharing.",
  },

  // -- 11: Teks cara kerja filter --
  {
    layout: "bullets",
    title: "Cara kerja filter dan parameter sharing",
    body: "Diagram di atas menunjukkan satu siklus operasi filter. Tiga prinsip berlaku di tiap posisi:",
    bullets: [
      "Satu filter 3×3 berisi 9 angka bobot yang dipelajari saat training, jadi CNN menemukan sendiri filter yang berguna untuk tugasnya.",
      "Filter ditempel di satu lokasi, dikalikan element-wise dengan patch di bawahnya, lalu dijumlahkan menjadi satu angka di feature map.",
      "Semua posisi memakai bobot filter yang sama, dan parameter sharing inilah yang membuat CNN jauh lebih hemat parameter dari MLP penuh untuk gambar.",
    ],
    footnote: "Asumsi yang tertanam: pola relevan bersifat lokal dan bisa muncul di lokasi mana pun (translation invariance).",
  },

  // -- 12: Tiga parameter + rumus --
  {
    layout: "split",
    title: "Tiga parameter Conv2d dan rumus output shape",
    body: "Tiga parameter menentukan cara filter beroperasi, dan satu rumus menghitung dimensi output di tiap layer:",
    left: {
      title: "Tiga parameter kunci",
      bullets: [
        "Kernel size adalah ukuran satu filter. Filter 3×3 paling umum; filter 1×1 mengubah jumlah channel tanpa menyentuh dimensi spasial.",
        "Stride menentukan berapa pixel filter bergeser per langkah. Stride 2 menghasilkan output setengah lebih kecil, sering jadi pengganti MaxPool.",
        "Padding adalah nol yang ditambah di tepi gambar. Padding 1 dengan kernel 3×3 mempertahankan dimensi spasial output.",
      ],
    },
    right: {
      title: "Rumus output shape",
      body: "Untuk input spasial in, kernel k, padding p, stride s, dimensi output dihitung sebagai:\n\nout = (in - k + 2p) / s + 1\n\nConv2d(k=3, p=1, s=1) pada 32×32 menghasilkan (32 - 3 + 2)/1 + 1 = 32.\n\nMaxPool2d(2) pada 32×32 menghasilkan (32 - 2)/2 + 1 = 16.",
    },
    footnote: "Rumus ini adalah alat pertama saat debugging Level 2: hitung shape yang diharapkan, lalu bandingkan dengan error message.",
  },

  // -- 13: Image receptive field (before its text) --
  {
    layout: "image",
    title: "Receptive field tumbuh seiring kedalaman layer",
    imageUrl: "/figures/fig02d_receptive_field.png",
    caption: "Gambar ini menunjukkan bagaimana receptive field satu pixel output bertumbuh seiring bertambahnya layer: layer pertama melihat patch 3×3 dari input, layer kedua melihat 5×5, dan layer ketiga melihat 7×7. Tiap layer Conv2d kernel 3×3 menambah 2 pixel di setiap sisi.",
    footnote: "Inilah cara CNN menangkap tepi di layer awal dan objek utuh di layer dalam tanpa boros parameter.",
  },

  // -- 14: Teks receptive field --
  {
    layout: "bullets",
    title: "Mengapa CNN bisa menangkap pola besar",
    body: "Dari gambar tersebut, tiga aturan menjelaskan pertumbuhan receptive field:",
    bullets: [
      "Layer Conv2d pertama dengan kernel 3×3 menghasilkan receptive field 3×3, jadi satu pixel output hanya melihat patch 3×3 di input.",
      "Layer Conv2d kedua memperluasnya menjadi 5×5 di input asli, karena tiap pixel layer pertama sudah melihat 3×3.",
      "MaxPool2d(2) melipatgandakan receptive field, sehingga layer setelah pooling melihat area dua kali lebih besar di input asli.",
    ],
    footnote: "Di layer dalam, receptive field bisa mencakup seluruh gambar: CNN menangkap pola besar dari operasi lokal kecil yang berlapis.",
  },

  // -- 15: Code SimpleCNN --
  {
    layout: "code",
    title: "SimpleCNN: merakit komponen menjadi satu model",
    body: "Komponen di atas dirakit menjadi CNN minimal yang bisa dilatih penuh pada CIFAR-10:",
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
        self.block2 = ...             # pola identik, 64→128→128
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),  # (B, 128, 8, 8) → (B, 128, 1, 1)
            nn.Flatten(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes))`,
    lang: "python",
    footnote: "Pemilihan loss dan optimizer dibahas penuh di W3.",
  },

  // -- 16: Alasan desain --
  {
    layout: "bullets",
    title: "Alasan di balik tiap pilihan desain",
    body: "Tiap komponen SimpleCNN dipilih karena alasan teknis yang bisa dijelaskan:",
    bullets: [
      "padding=1 pada Conv2d kernel 3×3 mempertahankan dimensi spasial, sesuai rumus (32 - 3 + 2)/1 + 1 = 32.",
      "bias=False dipakai karena BatchNorm yang mengikutinya sudah punya parameter bias sendiri, sehingga dua bias jadi redundan.",
      "AdaptiveAvgPool2d(1) meringkas tiap feature map menjadi satu angka per channel, sehingga classifier tidak bergantung pada resolusi input.",
    ],
    footnote: "Classifier tidak memakai Softmax karena CrossEntropyLoss PyTorch sudah melakukan log-softmax secara numerik stabil.",
  },

  // -- 17: Skeptisisme dua klaim --
  {
    layout: "bullets",
    title: "Dua klaim yang perlu dicek skeptis",
    body: "Dua klaim umum tentang CNN sering menyesatkan, dan keduanya bisa diperiksa dengan eksperimen sederhana:",
    bullets: [
      "Arsitektur lebih dalam tidak selalu lebih baik: tanpa data cukup, model dalam cenderung overfitting, jadi mulai dari yang sederhana dan tambah kedalaman hanya kalau kapasitas terbukti jadi penyebab.",
      "Accuracy 99% belum tentu berarti model hebat: bandingkan dulu dengan baseline naif yang memprediksi kelas mayoritas.",
      "Kalau akurasi baseline naif juga tinggi, yang terukur adalah distribusi kelas, bukan kualitas model.",
    ],
    footnote: "Kebiasaan memeriksa klaim dengan baseline ini terbawa sampai W4 dan capstone.",
  },

  // -- 18: Materi 3 --
  {
    layout: "section",
    title: "3. Smoke Test Tiga Level",
    body: "Sebelum training berjam-jam, jalankan tiga tes berurutan yang menargetkan tiga jenis bug berbeda. Tiap level butuh waktu debugging lebih banyak dari level sebelumnya.",
    footnote: "Kalau satu tes gagal, hentikan dan perbaiki sebelum lanjut ke level berikutnya.",
  },

  // -- 19: Tabel tiga level --
  {
    layout: "table",
    title: "Tiga level, tiga jenis bug",
    body: "Tiap level menangkap jenis bug yang berbeda dan menambah kebutuhan data secara bertahap:",
    tableHead: ["Level", "Tes", "Menangkap", "Butuh"],
    tableRows: [
      ["1", "Import test", "Typo, dependency, shape di definisi layer", "Tanpa data"],
      ["2", "Dummy forward", "Shape mismatch antar layer", "Tensor random"],
      ["3", "Overfit one batch", "Bug algoritma: gradient mati, loss diam", "4-8 sampel nyata"],
    ],
    footnote: "Jangan lompat ke Level 3 sebelum Level 1 dan 2 lulus, dan jangan mulai training 30 epoch sebelum Level 3 lulus.",
  },

  // -- 20: Code Level 2+3 --
  {
    layout: "code",
    title: "Level 2 dan Level 3 dalam kode",
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
# Ekspektasi: loss turun dari ~2.3 menuju ~0.0`,
    lang: "python",
    footnote: "Loss awal ~2.3 adalah -log(1/10) = log(10), nilai yang diharapkan untuk prediksi acak dari 10 kelas.",
  },

  // -- 21: Overfit one batch diagnostik + lapor ke dosen --
  {
    layout: "bullets",
    title: "Overfit one batch: tes paling diagnostik",
    body: "Hasil Level 3 memisahkan dua kemungkinan penyebab sebelum Anda melapor ke dosen:",
    bullets: [
      "Kalau Level 3 gagal (loss tidak mendekati nol dalam 100 iterasi), ada bug di kode, bukan di hyperparameter.",
      "Kalau Level 3 berhasil, model berfungsi dengan benar, dan masalah performa berasal dari data, augmentasi, atau regularisasi.",
      "Laporkan ke dosen dengan penyebab yang sudah dipersempit, misalnya 'loss tidak turun di overfit one batch', bukan kalimat umum 'model tidak belajar'.",
    ],
    footnote: "Smoke test tiga level ini dipakai sebelum tiap run penuh, termasuk sebelum setiap eksperimen terkontrol di W4.",
  },

  // -- 22: Lab W2 --
  {
    layout: "bullets",
    title: "Lab W2",
    body: "Lab membangun kebiasaan smoke test dan memahami SimpleCNN, mengikuti urutan tiga materi di atas:",
    bullets: [
      "Periksa shape satu batch, jalankan tiga level smoke test, lalu bangun dan latih SimpleCNN dari scratch.",
      "Bangun baseline fine-tuning pretrained (ResNet-18 dengan backbone frozen), lalu catat pada level mana tiap error tertangkap.",
      "Selesaikan evaluasi dan error analysis setelah membaca W3.",
    ],
    footnote: "Checklist: shape batch (B, C, H, W) terverifikasi, tiga level smoke test lulus, overfit one batch turun ke < 0.1, dan training 5 epoch jalan tanpa error.",
  },

  // -- 23: CTA --
  {
    layout: "cta",
    title: "Mulai Lab W2",
    body: "Semua konsep deck ini ada di lab notebook: verifikasi shape batch, tiga level smoke test, SimpleCNN dari scratch, dan baseline fine-tuning pretrained.\n\nEstimasi waktu 3-5 jam termasuk training, analisis, dan refleksi.",
    ctaText: "Buka Lab W2 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w2_cnn_baseline.ipynb",
  },
];

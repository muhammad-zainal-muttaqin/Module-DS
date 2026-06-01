import type { SlideSection } from "./index";

export const slides03: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W3: Loss, Optimizer & Evaluasi",
    subtitle: "Belajar membaca loss curve untuk mendiagnosis hasil training, menentukan loss dan optimizer yang sesuai, lalu mengevaluasi model dengan metrik yang sesuai.",
    body: "Presentasi ini bisa dipakai mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 03 - Minggu 3",
  },

  // ── 2: Kilas Balik (DIVIDER 1) ──
  {
    layout: "section",
    title: "Kilas Balik: W0, W1, W2",
    body: "Sebelum masuk ke loss, optimizer, dan evaluasi, kita lihat lagi dua contoh konkret dari minggu-minggu pertama. Kedua bekal ini dipakai langsung di sepanjang W3, jadi pengingat ini bukan formalitas.",
    footnote: "Tiap gambar berikut diambil dari deck W0 dan W1 - buka deck minggu terkait untuk penjelasan penuh.",
  },

  // ── 3: W0 - membaca shape tensor (Pola B) ──
  {
    layout: "image",
    title: "W0 - Membaca Shape Tensor: dari Satu Gambar ke Satu Batch",
    imageUrl: "/figures/fig00a_tensor_nchw.jpeg",
    caption: "Kita mulai dari objek yang sudah dikenal. Satu citra RGB berukuran 32x32 piksel tersimpan sebagai tiga lapisan angka untuk warna merah, hijau, dan biru, sehingga shape-nya adalah (3, 32, 32). Ketika 64 citra dilatih sekaligus sebagai satu batch, shape-nya bertambah satu sumbu di depan menjadi (64, 3, 32, 32). Cara membacanya berlaku untuk shape apa pun: dalam satu batch ada 64 gambar, tiap gambar punya 3 channel, dan tiap channel berukuran 32 piksel tinggi dan 32 piksel lebar. Nama B, C, H, W hanyalah label untuk keempat sumbu itu.",
    footnote: "Indeks mengikuti urutan sumbu yang sama: x[0] mengambil gambar pertama dengan shape (3, 32, 32), lalu x[0][0] mengambil channel pertamanya dengan shape (32, 32).",
  },

  // ── 4: W1 - menentukan output head dan loss ──
  {
    layout: "image",
    title: "W1 - Menentukan Output Head dan Loss-nya",
    imageUrl: "/figures/fig01h_output_head_loss.png",
    caption: "Contoh dari W1: regresi memakai 1 output linear dengan MSE, klasifikasi biner memakai 1-2 output dengan BCE atau cross-entropy, dan multikelas memakai K output dengan cross-entropy. Tugas menentukan head, dan head menentukan loss - salah memasangkan keduanya membuat model belajar hal yang keliru meski loss tetap turun.",
    footnote: "Pencocokan head dan loss inilah titik awal saat W3 membahas kapan focal loss atau label smoothing layak dipakai.",
  },

  // ── 5: Jembatan kilas balik ke W3 ──
  {
    layout: "bullets",
    title: "Tiga Bekal W0-W2 yang Dipakai di W3",
    body: "Tiga hal dari minggu-minggu sebelumnya langsung dipakai begitu W3 dimulai, bukan sekadar materi lama yang sudah lewat:",
    bullets: [
      "**Kebiasaan observasi sebelum kesimpulan** dari W1 menjadi cara kita membaca galeri lima loss curve di awal W3 tanpa langsung menebak penyebabnya.",
      "**Galeri empat pola loss** yang dikenalkan di W2 dilengkapi minggu ini menjadi peta diagnosis lima pola dengan hipotesis dan langkah tes yang spesifik.",
      "**Pencocokan head dan loss** dari W1 menjadi titik awal saat W3 membahas kapan focal loss atau label smoothing layak menggantikan cross-entropy.",
    ],
    footnote: "Setelah kilas balik singkat ini, kita masuk ke peta W3 dan galeri lima training.",
  },

  // ── 6: Peta W3 + geser fokus (gabungan) ──
  {
    layout: "bullets",
    title: "Peta W3: Geser Fokus ke Alur Kerja",
    body: "W3 dimulai dari lima contoh training, lalu menarik kapan sebuah loss cocok dipakai, bagaimana optimizer memperbarui parameter, kenapa satu angka akurasi sering belum cukup, dan bagaimana loss curve membantu diagnosis. Bedanya dengan W2: fokus bergeser dari membangun model ke membaca apa yang model lakukan saat dilatih.",
    bullets: [
      "**Kebiasaan riset** yang ditanamkan minggu ini adalah mengubah satu hal pada satu waktu, sehingga setiap perubahan performa bisa dijelaskan penyebabnya.",
      "**Dataset konsep** tetap mengacu pada CIFAR-10 dari W2, sedangkan lab utama memakai dataset toy agar ablation cepat dijalankan di Colab.",
      "**Loss curve** dibaca untuk mendiagnosis hasil training, bukan hanya dilihat sekilas apakah naik atau turun.",
    ],
    footnote: "Baris peta besar minggu ini adalah (C, H, W) -> (N,). Lab utama: Lab W3 Loss + Freeze Ablation.",
  },

  // ── 7: Amati Dulu (DIVIDER 2) ──
  {
    layout: "section",
    title: "Amati Dulu, Teori Belakangan",
    body: "Sebelum menyentuh teori loss dan optimizer, kita amati dulu. Loss yang stagnan, meledak ke NaN, atau tidak bergerak sama sekali bukan kejadian langka, melainkan rutinitas riset sehari-hari. Lima contoh berikut melatih mata Anda membaca gejalanya sebelum tahu namanya.",
    footnote: "Kelima pola ini kembali dengan kerangka diagnosis lengkap di bagian akhir presentasi.",
  },

  // ── 8: Grid lima run ──
  {
    layout: "grid",
    title: "Lima Loss Curve, Lima Situasi Berbeda",
    body: "Tiap kurva di bawah menampilkan train loss dan val loss selama 20 epoch. Baca tiap pola dan tebak apa yang terjadi sebelum melihat penjelasannya di bagian diagnosis:",
    gridItems: [
      {
        title: "Run 1 - Konvergensi Normal",
        body: "Train loss dan val loss turun sejajar dan keduanya mencapai angka rendah. Val sedikit di atas train dengan gap yang stabil sepanjang training.",
      },
      {
        title: "Run 2 - Overfitting",
        body: "Train loss terus turun mulus, tetapi val loss turun sampai epoch 6 lalu naik perlahan. Jarak kedua kurva makin lebar seiring epoch bertambah.",
      },
      {
        title: "Run 3 - Tidak Belajar",
        body: "Train loss tidak bergerak sejak epoch pertama dan val ikut stagnan. Kedua kurva terlihat datar tanpa penurunan sama sekali.",
      },
      {
        title: "Run 4 - Training Tidak Stabil",
        body: "Train loss turun sampai epoch 12, lalu tiba-tiba meledak ke NaN. Val loss ikut hilang begitu angka menjadi tidak terdefinisi.",
      },
      {
        title: "Run 5 - Bising tetapi Membaik",
        body: "Train loss turun tetapi sangat bising, naik-turun di tiap epoch. Val loss cenderung turun meski fluktuatif dari epoch ke epoch.",
      },
    ],
    footnote: "Kelima pola ini kembali dibahas dengan kerangka diagnosis lengkap, hipotesis, dan langkah tes di bagian akhir.",
  },

  // ── 9: Pertanyaan diagnostik ──
  {
    layout: "bullets",
    title: "Tiga Pertanyaan Diagnostik untuk Galeri",
    body: "Sebelum lanjut, jawab tiga pertanyaan ini secara tertulis. Tujuannya melatih penilaian, bukan mencari jawaban yang sempurna:",
    bullets: [
      "Run mana yang paling mengkhawatirkan, dan apa alasan teknis di baliknya?",
      "Untuk Run 3 yang tidak belajar sama sekali, apa hipotesis pertama yang akan Anda uji?",
      "Untuk Run 5 yang bising, kapan sebenarnya noise di loss curve mulai menjadi masalah nyata?",
    ],
    footnote: "Tuliskan jawaban singkat sekarang; kita bandingkan dengan kerangka diagnosis di bagian diagnosis.",
  },

  // ── 10: Image siklus training ──
  {
    layout: "image",
    title: "Siklus Training PyTorch: Enam Langkah yang Berulang",
    imageUrl: "/figures/fig03c_training_cycle.png",
    caption: "Gambar ini menunjukkan enam langkah yang berulang di setiap batch selama training: memuat data, menjalankan forward pass, menghitung loss, mereset gradient ke nol, menjalankan backward pass, dan memperbarui parameter dengan optimizer. Loss curve yang kita baca adalah rekaman nilai loss dari langkah ketiga di sepanjang ribuan iterasi ini.",
    footnote: "Setiap bug training pada akhirnya bisa dilacak ke salah satu dari enam langkah ini.",
  },

  // ── 11: Enam langkah teks ──
  {
    layout: "bullets",
    title: "Membaca Siklus: dari Data sampai Update Parameter",
    body: "Dari gambar tersebut, tiga titik paling sering menjadi sumber kesalahan saat training terasa aneh:",
    bullets: [
      "**Reset gradient** yang terlupa membuat gradient batch lama menumpuk, sehingga update parameter menjadi salah arah - panggil `optimizer.zero_grad()` di awal tiap iterasi.",
      "**Forward pass** yang keliru, misalnya shape atau loss function yang salah, membuat loss tidak turun meski seluruh pipeline berjalan tanpa error.",
      "**Update parameter** bergantung pada learning rate; nilai yang terlalu besar membuat loss meledak, terlalu kecil membuat loss seolah tidak bergerak.",
    ],
    footnote: "Loss curve adalah cara tercepat membaca gejala dari keenam langkah ini tanpa membuka kode satu per satu.",
  },

  // ── 12: Tiga Keputusan (DIVIDER 3) ──
  {
    layout: "section",
    title: "Tiga Keputusan: Loss, Optimizer, Evaluasi",
    body: "Setelah bisa membaca gejala dari loss curve, kita masuk ke tiga keputusan yang membentuk training. Loss menentukan apa yang dianggap salah, optimizer menentukan bagaimana parameter digeser, dan evaluasi menentukan apakah angka akhir bisa dipercaya. Pilihan representasi fitur menutup bagian ini.",
    footnote: "Tiap keputusan dibuka dari satu situasi nyata, bukan dari definisi.",
  },

  // ── 13: Loss klasifikasi (situasi penyakit langka di pembuka) ──
  {
    layout: "bullets",
    title: "Tiga Loss untuk Klasifikasi",
    body: "Bayangkan model deteksi penyakit langka: akurasinya 97 persen, tetapi model tidak pernah menandai satu pasien sakit pun. Loss-lah yang menentukan jenis kesalahan mana yang paling ditekan selama training. Untuk klasifikasi, tiga loss berikut mencakup hampir semua kebutuhan, dari kasus standar sampai kelas yang sangat tidak seimbang:",
    bullets: [
      "**Cross-entropy** adalah pilihan default yang mengukur jarak antara distribusi probabilitas prediksi dan label - pakai `CrossEntropyLoss` yang otomatis menggabungkan softmax dan log-likelihood.",
      "**Focal loss** adalah modifikasi cross-entropy yang menurunkan bobot sampel mudah dan menaikkan bobot sampel sulit, sehingga berguna saat satu kelas jauh lebih jarang dari yang lain.",
      "**Label smoothing** mengganti label one-hot dengan distribusi yang dilembutkan, sehingga model dicegah terlalu percaya diri dan kalibrasi probabilitasnya sering membaik.",
    ],
    footnote: "Focal loss dan label smoothing adalah varian lanjutan - cross-entropy tetap titik awal yang benar untuk kebanyakan kasus.",
  },

  // ── 14: Focal loss numeric ──
  {
    layout: "split",
    title: "Focal Loss: Mengapa Sampel Mudah Diberi Bobot Kecil",
    body: "Focal loss mengalikan cross-entropy dengan faktor (1 - p_t)^γ. Dengan γ = 2, faktor ini menyusut drastis untuk sampel yang sudah diprediksi benar dan yakin:",
    left: {
      title: "Sampel Sulit (kelas minor)",
      body: "Prediksi `p_t = 0.2` berarti model salah-yakin.\n\nFaktor pembobotan: `(1 - 0.2)² = 0.64`.\n\nLoss hampir tidak diredam, sehingga model dipaksa memperhatikan sampel ini.",
    },
    right: {
      title: "Sampel Mudah (kelas mayor)",
      body: "Prediksi `p_t = 0.95` berarti model benar-yakin.\n\nFaktor pembobotan: `(1 - 0.95)² = 0.0025`.\n\nLoss diredam hampir habis, sehingga sampel mudah berhenti mendominasi gradient.",
    },
    footnote: "Selisihnya 256×: sampel sulit memberi kontribusi gradient 256 kali lebih besar dari sampel mudah di iterasi yang sama.",
  },

  // ── 15: Loss regresi ──
  {
    layout: "bullets",
    title: "Tiga Loss untuk Regresi",
    body: "Untuk regresi, pilihan loss menentukan seberapa keras outlier dihukum dan seberapa cepat training konvergen:",
    bullets: [
      "**MSE** menerapkan penalti kuadratik pada residu, sehingga sangat sensitif terhadap outlier - residu meleset 5 menyumbang loss 25× - dan cocok saat residu kecil pun sudah bermasalah.",
      "**MAE** mengukur residu secara linear sehingga lebih robust terhadap outlier, tetapi gradientnya konstan di sekitar nol sehingga konvergensi sering lebih lambat.",
      "**Huber loss** menggabungkan keduanya: kuadratik untuk residu kecil dan linear untuk residu besar, dengan ambang δ yang berdefault 1.0 di PyTorch.",
    ],
    footnote: "Tidak ada loss yang unggul universal - pilihan bergantung pada seberapa berbahaya outlier di data Anda.",
  },

  // ── 16: Pertanyaan sebelum ganti loss ──
  {
    layout: "bullets",
    title: "Pertanyaan Sebelum Mengganti Loss",
    body: "Mengganti loss tanpa alasan yang jelas hanya menambah variabel baru di eksperimen. Satu pertanyaan membantu menyaring keputusan ini:",
    bullets: [
      "Apa jenis kesalahan dengan konsekuensi terbesar di aplikasi Anda - false negative pada kelas langka, atau prediksi yang meleset jauh?",
      "Jika false negative pada kelas minor paling mahal, focal loss atau pembobotan kelas langsung adalah kandidat yang masuk akal dicoba.",
      "Jika tidak ada alasan kuat, pertahankan cross-entropy atau MSE sebagai baseline dan ubah hal lain terlebih dahulu.",
    ],
    footnote: "Aturan ini menjaga setiap perbandingan tetap punya satu variabel yang berubah.",
  },

  // ── 17: Tiga optimizer (situasi 10 vs 60 epoch di pembuka) ──
  {
    layout: "bullets",
    title: "SGD, AdamW, dan LAMB: Tiga Titik di Spektrum",
    body: "Dua orang melatih model yang sama dengan loss dan data yang sama: satu konvergen dalam 10 epoch, satu lagi butuh 60 epoch dengan tuning yang melelahkan. Bedanya ada di optimizer, yang memutuskan dari gradient yang sama seberapa besar dan ke arah mana tiap parameter digeser. Ketiga optimizer ini berbeda pada cara menyesuaikan learning rate per parameter dan pada skala data yang mereka tuju:",
    bullets: [
      "**SGD dengan momentum** adalah optimizer paling sederhana yang sering menang setelah tuning tekun, tetapi membutuhkan learning rate schedule yang dirancang hati-hati - banyak paper visi state-of-the-art tetap memakainya.",
      "**Adam dan AdamW** bersifat adaptif sehingga setiap parameter mendapat learning rate sendiri dan konvergen cepat di epoch awal, dengan AdamW memisahkan weight decay dari momentum gradient.",
      "**LAMB** adalah varian untuk batch size sangat besar yang relevan di pre-training BERT atau GPT, dan jarang diperlukan di proyek kuliah.",
    ],
    footnote: "Default modern untuk training dari nol adalah AdamW; SGD menjadi pilihan saat Anda punya anggaran tuning yang besar.",
  },

  // ── 18: weight decay AdamW (situasi salah-salin di pembuka) ──
  {
    layout: "split",
    title: "weight_decay di AdamW Bukan L2 Regularisasi",
    body: "Anda menyalin weight_decay yang berhasil di SGD ke Adam, berharap efek regularisasi yang sama, tetapi hasilnya justru tidak konsisten antar parameter. Penyebabnya: pada SGD, menambahkan L2 ke loss setara dengan mengurangi λw dari tiap parameter, sedangkan pada Adam kesetaraan itu tidak berlaku. Di sinilah AdamW memperbaiki keadaan:",
    left: {
      title: "Masalah pada Adam",
      body: "Adam membagi gradient dengan estimasi variansi tiap parameter.\n\nAkibatnya, penalti L2 yang ditambahkan ke loss mendapat efek yang tidak proporsional antar parameter.\n\nRegularisasi menjadi tidak konsisten dan sulit ditebak.",
    },
    right: {
      title: "Perbaikan AdamW",
      body: "AdamW menerapkan weight decay langsung ke parameter, bukan lewat gradient.\n\nEfek regularisasi menjadi konsisten antar parameter.\n\n`weight_decay=0.01` di AdamW lebih dapat diandalkan daripada nilai yang sama di Adam biasa.",
    },
    footnote: "Hindari pola Adam + L2 manual yang ditambahkan ke loss - itu sumber regularisasi yang tidak konsisten.",
  },

  // ── 19: scheduler + aturan praktis ──
  {
    layout: "bullets",
    title: "Scheduler dan Aturan Praktis Learning Rate",
    body: "Optimizer dipasangkan dengan scheduler, yaitu mekanisme yang menurunkan learning rate selama training. Beberapa angka awal menghemat banyak waktu tuning:",
    bullets: [
      "**Tiga scheduler** yang paling sering dijumpai adalah `OneCycleLR`, `CosineAnnealingLR`, dan `ReduceLROnPlateau` - ketiganya baru relevan di W4 saat run mulai banyak.",
      "**Titik awal AdamW** yang masuk akal adalah `lr=3e-4` dengan `weight_decay` antara `1e-4` dan `1e-2` untuk training dari nol.",
      "**Untuk fine-tuning** model pretrained, pakai learning rate sekitar 10× lebih kecil dari training-dari-nol agar bobot yang sudah baik tidak rusak.",
    ],
    footnote: "Di W3, learning rate konstan sudah cukup untuk Lab W3; scheduler dan warmup dibahas di W4.",
  },

  // ── 20: Metrik (situasi akurasi 95% di pembuka) ──
  {
    layout: "bullets",
    title: "Memilih Metrik Sesuai Kondisi Data",
    body: "Akurasi 95 persen terdengar hebat sampai Anda sadar kelas positif hanya 5 persen, dan model yang selalu menebak negatif pun mencapai angka itu. Tidak ada metrik tunggal yang benar untuk semua kasus. Pilih berdasarkan keseimbangan kelas dan apa yang ingin dijamin:",
    bullets: [
      "**Accuracy** layak dipakai hanya saat kelas seimbang, karena ia menyesatkan begitu satu kelas mendominasi data.",
      "**Precision, recall, dan F1** dipakai saat kelas tidak seimbang dan fokusnya pada satu kelas tertentu, dengan konsekuensi harus memilih ambang batas.",
      "**ROC-AUC dan PR-AUC** mengevaluasi kualitas probabilistik; PR-AUC lebih sesuai daripada ROC-AUC pada imbalance ekstrem.",
    ],
    footnote: "Perplexity adalah metrik khusus model bahasa dan hanya bermakna relatif antar model.",
  },

  // ── 21: Strategi validasi ──
  {
    layout: "bullets",
    title: "Tiga Strategi Validasi",
    body: "Selain metrik, cara membagi data menentukan seberapa dipercaya angka evaluasi Anda:",
    bullets: [
      "**Hold-out split** memisahkan data menjadi train, val, dan test satu kali - cepat, tetapi sensitif terhadap keberuntungan pembagian.",
      "**K-fold cross-validation** menjalankan training k kali dengan tiap bagian bergantian jadi validasi, sehingga estimasinya lebih stabil dengan biaya k kali training.",
      "**Stratified split atau fold** menjaga distribusi kelas tetap sama di setiap bagian, dan wajib dipakai untuk klasifikasi dengan imbalance.",
    ],
    footnote: "Untuk dataset kecil yang tidak seimbang, stratified k-fold adalah kombinasi yang paling sering tepat.",
  },

  // ── 22: Image tiga strategi ──
  {
    layout: "image",
    title: "Engineered, Extracted, Learned: Tiga Jalur Representasi",
    imageUrl: "/figures/fig01d_feature_representation.svg",
    caption: "Gambar ini menunjukkan tiga strategi membentuk representasi fitur dari data mentah: Engineered dirancang manual oleh manusia dengan pengetahuan domain, Extracted diambil dari hidden layer model pretrained yang di-freeze, dan Learned dipelajari langsung dari data melalui training end-to-end. Ketiganya berbeda pada seberapa banyak data dan biaya komputasi yang dibutuhkan.",
    footnote: "Ketiga jalur ini menjadi sumbu utama saat Anda merumuskan variabel eksperimen di capstone.",
  },

  // ── 23: Grid tiga strategi (situasi dua tim di pembuka) ──
  {
    layout: "grid",
    title: "Membandingkan Tiga Strategi Representasi",
    body: "Dua tim mengerjakan dataset yang sama: satu mencoba berganti-ganti arsitektur selama dua minggu dan akurasinya nyaris diam, satu lagi mengubah cara data dijadikan angka dan akurasinya naik tajam. Pada modalitas dan tugas yang sama, pilihan representasi sering lebih menentukan daripada arsitektur. Dari gambar sebelumnya, ketiga strategi menempati posisi berbeda pada trade-off antara kebutuhan data dan biaya komputasi:",
    gridItems: [
      {
        title: "Engineered: Dirancang Manusia",
        body: "Strategi ini memakai fitur klasik seperti histogram warna, HOG, atau statistik sinyal. Biaya komputasinya rendah, mudah diinterpretasi, dan sering menjadi baseline kuat ketika data latih terbatas.",
      },
      {
        title: "Extracted: dari Model Pretrained",
        body: "Strategi ini mengambil hidden states dari CNN, ViT, atau BERT yang di-freeze. Anda mendapat representasi model besar tanpa biaya training penuh, dengan syarat domain target dekat dengan domain pretraining.",
      },
      {
        title: "Learned: End-to-End",
        body: "Strategi ini mempelajari representasi langsung dari data lewat fine-tuning atau training dari nol. Ia biasanya paling kuat saat data memadai, tetapi paling haus data dan paling mahal dilatih.",
      },
    ],
    footnote: "Membandingkan BERT frozen + head kecil dengan BERT fine-tune penuh berarti membandingkan dua strategi representasi, bukan sekadar dua model.",
  },

  // ── 24: Mendiagnosis (DIVIDER 4) ──
  {
    layout: "section",
    title: "Mendiagnosis Hasil Training dari Loss Curve",
    body: "Kini kita kembali ke galeri lima training dengan peta diagnosis lengkap. Setiap pola punya hipotesis dan langkah tes yang spesifik, sehingga Anda berhenti menebak dan mulai menguji.",
    footnote: "Pemeriksaan paling penting di bagian ini adalah overfit satu batch.",
  },

  // ── 25: Image lima pola ──
  {
    layout: "image",
    title: "Lima Pola Loss Curve untuk Diagnosis",
    imageUrl: "/figures/fig01c_loss_curves_diagnostic.svg",
    caption: "Gambar ini menunjukkan lima pola loss curve yang paling sering ditemui: underfitting saat loss train stagnan tinggi, overfitting saat val menjauh dari train, early divergence saat val tidak pernah turun, kondisi val lebih rendah dari train, dan konvergensi normal saat keduanya turun sejajar. Setiap pola mengarah ke tindakan perbaikan yang berbeda.",
    footnote: "Salah mendiagnosis pola berarti membuang waktu training pada perbaikan yang tidak relevan.",
  },

  // ── 26: Pola 1-2 ──
  {
    layout: "split",
    title: "Pola 1 dan Pola 2: Tidak Belajar vs Overfit Cepat",
    body: "Dari gambar tersebut, dua pola pertama membutuhkan langkah tes yang sangat berbeda meski sama-sama mengkhawatirkan:",
    left: {
      title: "Pola 1 - Loss train stagnan tinggi",
      body: "Model tidak belajar sama sekali sejak epoch pertama.\n\nHipotesis: learning rate terlalu kecil, atau ada bug di forward pass.\n\nLangkah tes: jalankan overfit satu batch. Jika loss tidak turun mendekati nol, ada bug di arsitektur atau loss function.",
    },
    right: {
      title: "Pola 2 - Val stagnan sejak awal",
      body: "Train loss turun tetapi val loss stagnan atau lebih tinggi sejak awal.\n\nHipotesis: dataset terlalu kecil relatif terhadap kapasitas, atau ada data leakage.\n\nLangkah tes: kurangi kapasitas atau tambah regularisasi; jika val tak membaik sama sekali, curigai leakage.",
    },
    footnote: "Pola 1 memisahkan bug kode dari masalah hiperparameter; Pola 2 mengarahkan Anda ke data atau kapasitas.",
  },

  // ── 27: Pola 3-4-5 ──
  {
    layout: "bullets",
    title: "Pola 3, 4, dan 5: Overfit Klasik, Underfit, dan Ledakan",
    body: "Tiga pola sisanya melengkapi peta diagnosis dari overfitting bertahap sampai gradient yang meledak:",
    bullets: [
      "**Pola 3 (overfitting klasik)** muncul saat train dan val turun sejajar tetapi val jauh di atas train di akhir - gunakan early stopping pada epoch dengan val loss terbaik.",
      "**Pola 4 (underfitting)** muncul saat val turun tetapi train stagnan tinggi - model terlalu kecil, learning rate terlalu rendah, atau augmentasi terlalu agresif.",
      "**Pola 5 (loss meledak)** muncul saat loss menjadi NaN atau naik tajam - turunkan learning rate 10× atau tambahkan gradient clipping `clip=1.0`.",
    ],
    footnote: "Untuk RNN dan Transformer di minggu-minggu berikutnya, gradient clipping hampir selalu diperlukan.",
  },

  // ── 28: Overfit one batch ──
  {
    layout: "bullets",
    title: "Overfit Satu Batch: Pemeriksaan Terpenting",
    body: "Jika loss curve Anda tidak cocok dengan kelima pola, jangan menebak. Kembali ke titik awal peta diagnosis dan jalankan overfit satu batch:",
    bullets: [
      "Ambil 4-8 sampel saja, lalu jalankan ratusan iterasi hanya pada sampel itu tanpa augmentasi.",
      "Jika loss turun mendekati nol, model dan pipeline sehat - masalahnya ada di data, learning rate, atau regularisasi.",
      "Jika loss tidak turun, ada bug di arsitektur atau loss function - perbaiki kode sebelum menyentuh hiperparameter apapun.",
    ],
    footnote: "Karpathy menyebut overfit satu batch sebagai pemeriksaan debugging terpenting dalam melatih neural network.",
  },

  // ── 29: Tiga pemeriksaan (situasi worked example di pembuka) ──
  {
    layout: "bullets",
    title: "Tiga Pemeriksaan Sebelum Menulis Angka",
    body: "Setelah melatih SimpleCNN dari W2, jangan langsung menulis angka di laporan, karena angka tanpa pemeriksaan mudah menyesatkan. Ketiga pemeriksaan ini mengubah satu angka akurasi menjadi laporan yang menunjukkan kekuatan dan kelemahan model:",
    bullets: [
      "**Periksa overfitting** dengan membandingkan train accuracy dan val accuracy; selisih lebih dari 10% biasanya menjadi sinyal model menghafal, bukan belajar.",
      "**Periksa akurasi per kelas** secara terpisah lewat confusion matrix; pada CIFAR-10, pasangan `cat` dan `dog` biasanya paling sering tertukar.",
      "**Periksa sampel yang salah** dengan memvisualisasikan 10 gambar yang paling confident tetapi keliru - sering kali ada pola kesalahan yang bisa dijelaskan.",
    ],
    footnote: "Ketiga pemeriksaan ini tetap menjadi bekal evaluasi W3, sedangkan lab utama minggu ini berfokus pada ablation loss dan freeze."
  },

  // ── 30: Tiga miskonsepsi (framing pitfalls di pembuka) ──
  {
    layout: "bullets",
    title: "Tiga Keyakinan yang Perlu Diluruskan",
    body: "Tiga keyakinan berikut terdengar masuk akal dan justru paling sering menyesatkan pemula. Ketiganya benar dalam kondisi sempit, tetapi berbahaya jika dianggap berlaku universal:",
    bullets: [
      "**\"Loss turun berarti model membaik\"** keliru tanpa memantau validasi - turunnya train loss saja bisa berarti model menghafal, bukan belajar.",
      "**\"Mengganti loss pasti meningkatkan performa\"** tidak benar - focal loss membantu pada imbalance ekstrem tetapi bisa memperburuk performa pada kelas seimbang.",
      "**\"Val sedikit di atas train itu normal\"** benar hanya untuk gap kecil - jika val tak pernah turun atau mulai naik sementara train terus turun, itu sinyal yang perlu ditangani.",
    ],
    footnote: "Pola umum: sebuah pernyataan benar dalam konteks tertentu menjadi salah saat dipakai sebagai aturan mutlak.",
  },

  // ── 31: Lab W3 ──
  {
    layout: "bullets",
    title: "Lab W3: Toy Ablation Loss + Freeze",
    body: "Lab minggu ini menjalankan ablation mandiri yang kecil tetapi lengkap, sehingga fokusnya berada pada metode eksperimen dan interpretasi hasil:",
    bullets: [
      "**Sanity check FocalLoss** memastikan `gamma=0` setara dengan cross-entropy sebelum loss dipakai di ablation.",
      "**Ablation 2×2** menguji pilihan loss dan status freeze dengan beberapa seed, lalu merangkum mean/std dalam bar chart ber-error bar.",
      "**Interpretasi hasil** membahas main effect, interaksi, dan batas klaim karena dataset yang dipakai adalah dataset toy.",
    ],
    footnote: "Lab penunjang representasi fitur pada CIFAR-10 tetap tersedia sebagai latihan opsional, bukan syarat utama Lab W3.",
  },

  // ── 32: Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum lanjut ke W4, renungkan tiga pertanyaan yang menghubungkan minggu ini dengan riset Anda nanti:",
    bullets: [
      "Saat mengganti cross-entropy menjadi focal loss, variabel apa saja yang ikut berubah secara implisit walau tidak Anda sentuh - learning rate efektif, tekanan pada kelas minor, stabilitas awal?",
      "Dengan hanya 300 gambar per kelas untuk empat kelas, strategi representasi mana yang paling masuk akal dicoba lebih dulu, dan kapan strategi perlu diganti?",
      "Saat membaca repo capstone nanti, pertanyaan pertama apa yang akan Anda ajukan ke diri sendiri tentang tensor input, arsitektur, dan representasi?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - ketiganya kembali relevan saat capstone.",
  },

  // ── 33: Bridge assignment W3 ke W4 ──
  {
    layout: "bullets",
    title: "Bridge ke W4: Diagnosis CIFAR-10",
    body: "Lab W3 memakai dataset toy agar siklus ablation bisa selesai cepat. Sebelum W4, terapkan bahasa W3 ke baseline CIFAR-10 dari W2 dan siapkan satu slide ringkas:",
    bullets: [
      "**Baca loss curve** dari baseline CIFAR-10: apakah train dan validation turun bersama, overfit, stagnan, atau tidak stabil?",
      "**Periksa evaluasi** lewat akurasi per kelas, confusion matrix, atau contoh prediksi confident tetapi salah.",
      "**Bawa satu hipotesis ablation** ke W4, misalnya focal loss, dropout, augmentasi, AdamW vs SGD, atau freeze blok awal.",
    ],
    footnote: "Di awal W4, diagnosis ini dipresentasikan singkat lalu diubah menjadi matriks eksperimen yang reproducible.",
  },

  // ── 34: Lanjut ke W4 ──
  {
    layout: "bullets",
    title: "Lanjut ke W4: dari Memahami ke Merancang",
    body: "Setelah W3, Anda sudah punya alur dari tensor input sampai diagnosis loss curve. W4 melanjutkannya ke perancangan eksperimen yang bisa diulang:",
    bullets: [
      "**YAML config dan penguncian seed** membuat setiap run bisa diulang persis oleh orang lain.",
      "**Struktur folder run dan checkpoint** menyimpan config, log, dan git hash agar hasil bisa dilacak balik.",
      "**Matriks eksperimen** menyusun banyak run dengan satu variabel berubah per baris, melanjutkan kebiasaan ubah-satu-hal dari minggu ini.",
    ],
    footnote: "Kebiasaan mengubah satu hal pada satu waktu di W3 menjadi fondasi disiplin eksperimen di W4.",
  },

  // ── 35: CTA ──
  {
    layout: "cta",
    title: "Siapkan Bridge ke W4",
    body: "Setelah menyelesaikan Lab W3, kembali ke baseline CIFAR-10 dari W2. Siapkan satu slide ringkas berisi loss curve, satu bukti evaluasi tambahan, diagnosis 3-5 kalimat, satu usulan ablation, dan satu hipotesis pendek.\n\nEstimasi waktu: 20-30 menit jika output W2 sudah tersedia.",
    ctaText: "Buka W4: Matriks Eksperimen",
    ctaTarget: "#/modul/04",
  },
];

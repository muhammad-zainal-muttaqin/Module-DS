import type { SlideSection } from "./index";

export const slides03: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W3: Loss, Optimizer & Evaluasi",
    subtitle: "Membaca loss curve sebagai sinyal diagnostik, memilih loss dan optimizer dengan alasan, dan mengukur model dengan jujur.",
    body: "Presentasi ini dirancang sebagai sumber mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 03 - Minggu 3",
  },

  // ── 2: Peta W3 ──
  {
    layout: "section",
    title: "Peta W3",
    body: "W3 adalah minggu berbasis contoh. Kita mulai dari mengamati lima training konkret, baru menarik teorinya: loss sebagai pilihan, cara optimizer memutuskan langkah, evaluasi yang tidak bisa diringkas satu angka, tiga strategi representasi, dan kerangka diagnosis loss curve.",
    footnote: "Baris peta besar minggu ini adalah (C, H, W) -> (N,), melanjutkan W2 dengan fokus pada alur kerja.",
  },

  // ── 3: Apa yang berubah dari W2 ──
  {
    layout: "bullets",
    title: "Dari W2 ke W3: Geser Fokus ke Alur Kerja",
    body: "W2 membangun model dan smoke test; W3 mengajarkan cara membaca apa yang model lakukan saat dilatih. Tiga hal menjadi fokus minggu ini:",
    bullets: [
      "**Kebiasaan riset** yang ditanamkan minggu ini adalah mengubah satu hal pada satu waktu, sehingga setiap perubahan performa bisa dijelaskan penyebabnya.",
      "**Dataset** yang dipakai tetap CIFAR-10 dari W2, sehingga kita bisa fokus pada loss, optimizer, dan evaluasi tanpa terganggu domain baru.",
      "**Loss curve** diperlakukan sebagai alat diagnosis, bukan sekadar indikator naik-turun yang dilihat sekilas.",
    ],
    footnote: "Lab minggu ini: Lab 1 (baseline CNN) diselesaikan, lalu Lab 2 (ablation loss).",
  },

  // ── 4: Section Galeri ──
  {
    layout: "section",
    title: "Galeri Lima Training: Amati Sebelum Teori",
    body: "Sebelum membaca teori loss dan optimizer, kita melihat lima loss curve konkret dan mendiagnosisnya sendiri. Latihan observasi ini melatih mata sebelum otak punya kosakata teknis.",
    footnote: "Masing-masing menampilkan train loss dan val loss selama 20 epoch.",
  },

  // ── 5: Grid lima run ──
  {
    layout: "grid",
    title: "Lima Loss Curve, Lima Cerita Berbeda",
    body: "Berikut lima pola training yang paling sering muncul. Bacalah tiap pola dan tebak apa yang terjadi sebelum melihat penjelasannya di bagian diagnosis:",
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
    footnote: "Kelima pola ini kembali dibahas dengan kerangka diagnosis lengkap di bagian akhir presentasi.",
  },

  // ── 6: Pertanyaan diagnostik ──
  {
    layout: "bullets",
    title: "Empat Pertanyaan Diagnostik untuk Galeri",
    body: "Sebelum lanjut, jawab empat pertanyaan ini secara tertulis. Tujuannya melatih penilaian, bukan mencari jawaban yang sempurna:",
    bullets: [
      "Run mana yang paling mengkhawatirkan, dan apa alasan teknis di baliknya?",
      "Untuk Run 3 yang tidak belajar sama sekali, apa hipotesis pertama yang akan Anda uji?",
      "Untuk Run 5 yang bising, kapan sebenarnya noise di loss curve mulai menjadi masalah nyata?",
    ],
    footnote: "Tuliskan jawaban singkat sekarang; kita bandingkan dengan kerangka diagnosis di bagian §2.5.",
  },

  // ── 7: Section Motivasi ──
  {
    layout: "section",
    title: "Motivasi: Saat Training Terasa Aneh",
    body: "Loss yang stagnan, loss yang meledak ke NaN, atau loss yang tidak bergerak sama sekali bukan pengecualian langka. Ketiganya adalah rutinitas riset sehari-hari yang perlu nama dan langkah penanganan.",
    footnote: "Bab ini memberi bahasa untuk menamai masalah tersebut dan prosedur sistematis untuk menanganinya.",
  },

  // ── 8: Image siklus training ──
  {
    layout: "image",
    title: "Siklus Training PyTorch: Enam Langkah yang Berulang",
    imageUrl: "/figures/fig03c_training_cycle.png",
    caption: "Gambar ini menunjukkan enam langkah yang berulang di setiap batch selama training: memuat data, menjalankan forward pass, menghitung loss, mereset gradient ke nol, menjalankan backward pass, dan memperbarui parameter dengan optimizer. Loss curve yang kita baca adalah rekaman nilai loss dari langkah ketiga di sepanjang ribuan iterasi ini.",
    footnote: "Setiap bug training pada akhirnya bisa dilacak ke salah satu dari enam langkah ini.",
  },

  // ── 9: Enam langkah teks ──
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

  // ── 10: Section Loss ──
  {
    layout: "section",
    title: "Loss: Memilih Apa yang Dianggap Salah",
    body: "Loss menentukan apa yang dianggap salah oleh model, sehingga mengganti loss berarti mengubah arah yang dibaca model sebagai perbaikan. Loss adalah pilihan desain, bukan bawaan default.",
    footnote: "Rekap rumus MSE, BCE, dan CrossEntropy dengan contoh angka kecil ada di W1 §2.2.",
  },

  // ── 11: Loss klasifikasi ──
  {
    layout: "bullets",
    title: "Tiga Loss untuk Klasifikasi",
    body: "Untuk tugas klasifikasi, tiga loss berikut mencakup hampir semua kebutuhan dari kasus standar sampai kelas yang sangat tidak seimbang:",
    bullets: [
      "**Cross-entropy** adalah pilihan default yang mengukur jarak antara distribusi probabilitas prediksi dan label - pakai `CrossEntropyLoss` yang otomatis menggabungkan softmax dan log-likelihood.",
      "**Focal loss** adalah modifikasi cross-entropy yang menurunkan bobot sampel mudah dan menaikkan bobot sampel sulit, sehingga berguna saat satu kelas jauh lebih jarang dari yang lain.",
      "**Label smoothing** mengganti label one-hot dengan distribusi yang dilembutkan, sehingga model dicegah terlalu percaya diri dan kalibrasi probabilitasnya sering membaik.",
    ],
    footnote: "Focal loss dan label smoothing adalah varian lanjutan - cross-entropy tetap titik awal yang benar untuk kebanyakan kasus.",
  },

  // ── 12: Focal loss numeric ──
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

  // ── 13: Loss regresi ──
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

  // ── 14: Pertanyaan sebelum ganti loss ──
  {
    layout: "bullets",
    title: "Pertanyaan Sebelum Mengganti Loss",
    body: "Mengganti loss tanpa alasan jelas hanya menambah satu variabel yang harus dijelaskan di laporan. Satu pertanyaan menyaring keputusan ini:",
    bullets: [
      "Apa jenis kesalahan dengan konsekuensi terbesar di aplikasi Anda - false negative pada kelas langka, atau prediksi yang meleset jauh?",
      "Jika false negative pada kelas minor paling mahal, focal loss atau pembobotan kelas langsung adalah kandidat yang masuk akal dicoba.",
      "Jika tidak ada alasan kuat, pertahankan cross-entropy atau MSE sebagai baseline dan ubah hal lain terlebih dahulu.",
    ],
    footnote: "Aturan ini menjaga setiap perbandingan tetap punya satu variabel yang berubah.",
  },

  // ── 15: Section Optimizer ──
  {
    layout: "section",
    title: "Optimizer: Bagaimana Langkah Diputuskan",
    body: "Optimizer mengubah gradient menjadi langkah pembaruan pada parameter. Pilihan optimizer menentukan seberapa cepat training konvergen dan seberapa banyak tuning yang dibutuhkan.",
    footnote: "Tiga pilihan mencakup hampir semua kebutuhan: SGD, AdamW, dan LAMB.",
  },

  // ── 16: Tiga optimizer ──
  {
    layout: "bullets",
    title: "SGD, AdamW, dan LAMB: Tiga Titik di Spektrum",
    body: "Ketiga optimizer ini berbeda pada cara menyesuaikan learning rate per parameter dan pada skala data yang mereka tuju:",
    bullets: [
      "**SGD dengan momentum** adalah optimizer paling sederhana yang sering menang setelah tuning tekun, tetapi membutuhkan learning rate schedule yang dirancang hati-hati - banyak paper visi state-of-the-art tetap memakainya.",
      "**Adam dan AdamW** bersifat adaptif sehingga setiap parameter mendapat learning rate sendiri dan konvergen cepat di epoch awal, dengan AdamW memisahkan weight decay dari momentum gradient.",
      "**LAMB** adalah varian untuk batch size sangat besar yang relevan di pre-training BERT atau GPT, dan jarang diperlukan di proyek kuliah.",
    ],
    footnote: "Default modern untuk training dari nol adalah AdamW; SGD menjadi pilihan saat Anda punya anggaran tuning yang besar.",
  },

  // ── 17: weight decay AdamW ──
  {
    layout: "split",
    title: "weight_decay di AdamW Bukan L2 Regularisasi",
    body: "Pada SGD, menambahkan L2 ke loss ekuivalen dengan mengurangi λw dari setiap parameter. Pada Adam, kesetaraan ini tidak berlaku, dan di sinilah AdamW memperbaiki keadaan:",
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

  // ── 18: scheduler + aturan praktis ──
  {
    layout: "bullets",
    title: "Scheduler dan Aturan Praktis Learning Rate",
    body: "Optimizer dipasangkan dengan scheduler, yaitu mekanisme yang menurunkan learning rate selama training. Beberapa angka awal menghemat banyak waktu tuning:",
    bullets: [
      "**Tiga scheduler** yang paling sering dijumpai adalah `OneCycleLR`, `CosineAnnealingLR`, dan `ReduceLROnPlateau` - ketiganya baru relevan di W4 saat run mulai banyak.",
      "**Titik awal AdamW** yang masuk akal adalah `lr=3e-4` dengan `weight_decay` antara `1e-4` dan `1e-2` untuk training dari nol.",
      "**Untuk fine-tuning** model pretrained, pakai learning rate sekitar 10× lebih kecil dari training-dari-nol agar bobot yang sudah baik tidak rusak.",
    ],
    footnote: "Di W3, learning rate konstan sudah cukup untuk Lab 2; scheduler dan warmup dibahas di W4.",
  },

  // ── 19: Section Evaluasi ──
  {
    layout: "section",
    title: "Evaluasi: Bukan Satu Angka",
    body: "Membanggakan akurasi 95% tanpa menyadari kelas positif hanya 5% adalah kesalahan klasik. Dalam kondisi itu, dummy classifier yang selalu memprediksi negatif juga mencapai 95%.",
    footnote: "Evaluasi yang jujur memilih metrik sesuai kondisi data, bukan metrik yang paling enak dilihat.",
  },

  // ── 20: Metrik ──
  {
    layout: "bullets",
    title: "Memilih Metrik Sesuai Kondisi Data",
    body: "Tidak ada metrik tunggal yang benar untuk semua kasus. Pilih berdasarkan keseimbangan kelas dan apa yang ingin dijamin:",
    bullets: [
      "**Accuracy** layak dipakai hanya saat kelas seimbang, karena ia menyesatkan begitu satu kelas mendominasi data.",
      "**Precision, recall, dan F1** dipakai saat kelas tidak seimbang dan fokusnya pada satu kelas tertentu, dengan konsekuensi harus memilih ambang batas.",
      "**ROC-AUC dan PR-AUC** mengevaluasi kualitas probabilistik; PR-AUC lebih informatif daripada ROC-AUC pada imbalance ekstrem.",
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

  // ── 22: Section Representasi ──
  {
    layout: "section",
    title: "Representasi Fitur: Tiga Pilihan Desain",
    body: "Keputusan yang paling sering menentukan performa bukan pilihan arsitektur, melainkan pilihan representasi - dan keputusan itu diambil jauh sebelum training dimulai.",
    footnote: "Pada modalitas dan tugas yang sama, perbedaan representasi kerap berdampak lebih besar daripada pergantian arsitektur.",
  },

  // ── 23: Image tiga strategi ──
  {
    layout: "image",
    title: "Engineered, Extracted, Learned: Tiga Jalur Representasi",
    imageUrl: "/figures/fig01d_feature_representation.svg",
    caption: "Gambar ini menunjukkan tiga strategi membentuk representasi fitur dari data mentah: Engineered dirancang manual oleh manusia dengan pengetahuan domain, Extracted diambil dari hidden layer model pretrained yang di-freeze, dan Learned dipelajari langsung dari data melalui training end-to-end. Ketiganya berbeda pada seberapa banyak data dan biaya komputasi yang dibutuhkan.",
    footnote: "Ketiga jalur ini menjadi sumbu utama saat Anda merumuskan variabel eksperimen di capstone.",
  },

  // ── 24: Grid tiga strategi ──
  {
    layout: "grid",
    title: "Membandingkan Tiga Strategi Representasi",
    body: "Dari gambar tersebut, ketiga strategi menempati posisi berbeda pada trade-off antara kebutuhan data dan biaya komputasi:",
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

  // ── 25: Section Diagnosis ──
  {
    layout: "section",
    title: "Membaca Sinyal: Diagnosis dari Loss Curve",
    body: "Kini kita kembali ke galeri lima training dengan kerangka diagnosis lengkap. Setiap pola punya hipotesis dan langkah tes yang spesifik, sehingga Anda berhenti menebak dan mulai menguji.",
    footnote: "Alat paling penting di bagian ini adalah overfit satu batch.",
  },

  // ── 26: Image lima pola ──
  {
    layout: "image",
    title: "Lima Pola Loss Curve untuk Diagnosis",
    imageUrl: "/figures/fig01c_loss_curves_diagnostic.svg",
    caption: "Gambar ini menunjukkan lima pola loss curve yang paling sering ditemui: underfitting saat loss train stagnan tinggi, overfitting saat val menjauh dari train, early divergence saat val tidak pernah turun, kondisi val lebih rendah dari train, dan konvergensi normal saat keduanya turun sejajar. Setiap pola mengarah ke tindakan perbaikan yang berbeda.",
    footnote: "Salah mendiagnosis pola berarti membuang waktu training pada perbaikan yang tidak relevan.",
  },

  // ── 27: Pola 1-2 ──
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

  // ── 28: Pola 3-4-5 ──
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

  // ── 29: Overfit one batch ──
  {
    layout: "bullets",
    title: "Overfit Satu Batch: Alat Diagnosis Terpenting",
    body: "Jika loss curve Anda tidak cocok dengan kelima pola, jangan menebak. Kembali ke simpul paling atas peta diagnosis dan jalankan overfit satu batch:",
    bullets: [
      "Ambil 4-8 sampel saja, lalu jalankan ratusan iterasi hanya pada sampel itu tanpa augmentasi.",
      "Jika loss turun mendekati nol, model dan pipeline sehat - masalahnya ada di data, learning rate, atau regularisasi.",
      "Jika loss tidak turun, ada bug di arsitektur atau loss function - perbaiki kode sebelum menyentuh hiperparameter apapun.",
    ],
    footnote: "Karpathy menyebut overfit satu batch sebagai alat debugging terpenting dalam melatih neural network.",
  },

  // ── 30: Section Worked Example ──
  {
    layout: "section",
    title: "Worked Example: Evaluasi yang Jujur",
    body: "Setelah training SimpleCNN dari W2, ada tiga pemeriksaan yang perlu selesai sebelum satu angka pun ditulis di laporan. Angka tanpa pemeriksaan ini mudah menyesatkan.",
    footnote: "Tujuannya bukan angka yang bagus, melainkan angka yang bisa dipertanggungjawabkan.",
  },

  // ── 31: Tiga pemeriksaan ──
  {
    layout: "bullets",
    title: "Tiga Pemeriksaan Sebelum Menulis Angka",
    body: "Ketiga pemeriksaan ini mengubah satu angka akurasi menjadi laporan yang jujur tentang kekuatan dan kelemahan model:",
    bullets: [
      "**Periksa overfitting** dengan membandingkan train accuracy dan val accuracy; selisih lebih dari 10% biasanya menjadi sinyal model menghafal, bukan belajar.",
      "**Periksa akurasi per kelas** secara terpisah lewat confusion matrix; pada CIFAR-10, pasangan `cat` dan `dog` biasanya paling sering tertukar.",
      "**Periksa sampel yang salah** dengan memvisualisasikan 10 gambar yang paling confident tetapi keliru - sering kali ada pola kesalahan yang bisa dijelaskan.",
    ],
    footnote: "Ketiga pemeriksaan ini adalah inti Lab 1 yang diselesaikan minggu ini.",
  },

  // ── 32: Section Pitfalls ──
  {
    layout: "section",
    title: "Pitfalls & Miskonsepsi",
    body: "Tiga keyakinan yang terdengar masuk akal justru paling sering menyesatkan pemula saat membaca hasil training. Mengenalinya lebih awal menghemat banyak waktu.",
    footnote: "Setiap pitfall di sini punya akar yang sama: menyimpulkan terlalu cepat dari satu angka.",
  },

  // ── 33: Tiga miskonsepsi ──
  {
    layout: "bullets",
    title: "Tiga Keyakinan yang Perlu Diluruskan",
    body: "Ketiga pernyataan berikut benar dalam kondisi sempit, tetapi berbahaya jika dianggap berlaku universal:",
    bullets: [
      "**\"Loss turun berarti model membaik\"** keliru tanpa memantau validasi - turunnya train loss saja bisa berarti model menghafal, bukan belajar.",
      "**\"Mengganti loss pasti meningkatkan performa\"** tidak benar - focal loss membantu pada imbalance ekstrem tetapi bisa memperburuk performa pada kelas seimbang.",
      "**\"Val sedikit di atas train itu normal\"** benar hanya untuk gap kecil - jika val tak pernah turun atau mulai naik sementara train terus turun, itu sinyal yang perlu ditangani.",
    ],
    footnote: "Pola umum: sebuah pernyataan benar dalam konteks tertentu menjadi salah saat dipakai sebagai aturan mutlak.",
  },

  // ── 34: Lab W3 ──
  {
    layout: "bullets",
    title: "Lab W3: Baseline Selesai dan Ablation Loss",
    body: "Lab minggu ini menutup baseline CNN dari W2 lalu menjalankan ablation loss yang terkontrol:",
    bullets: [
      "**Lab 1** menuntaskan training loop dengan evaluasi per epoch, plot loss curve, confusion matrix, dan analisis 10 prediksi confident-salah.",
      "**Lab 2** menjalankan ablation 2×2 antara cross-entropy dan focal loss, lengkap dengan bar chart yang menyertakan error bar dari beberapa seed.",
      "**Lab 1b (opsional)** membandingkan tiga strategi representasi pada CIFAR-10 yang sama untuk melihat mana yang menang pada data terbatas.",
    ],
    footnote: "Checklist Lab 1: train acc ≥ 75%, val acc ≥ 70%, dan notebook bisa dijalankan ulang dari atas ke bawah tanpa error.",
  },

  // ── 35: Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum lanjut ke W4, renungkan tiga pertanyaan yang menghubungkan minggu ini dengan riset Anda nanti:",
    bullets: [
      "Saat mengganti cross-entropy menjadi focal loss, variabel apa saja yang ikut berubah secara implisit walau tidak Anda sentuh - learning rate efektif, tekanan pada kelas minor, stabilitas awal?",
      "Dengan hanya 300 gambar per kelas untuk empat kelas, strategi representasi mana yang paling masuk akal dicoba lebih dulu, dan kapan Anda akan berpindah strategi?",
      "Saat membaca repo capstone nanti, pertanyaan pertama apa yang akan Anda ajukan ke diri sendiri tentang tensor input, arsitektur, dan representasi?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - ketiganya kembali relevan saat capstone.",
  },

  // ── 36: Lanjut ke W4 ──
  {
    layout: "bullets",
    title: "Lanjut ke W4: dari Memahami ke Merancang",
    body: "Dengan W3 selesai, Anda punya kerangka lengkap dari tensor input sampai diagnosis loss curve. W4 menggeser fokus dari memahami sistem ke merancang eksperimen yang reproduksibel:",
    bullets: [
      "**YAML config dan penguncian seed** membuat setiap run bisa diulang persis oleh orang lain.",
      "**Struktur folder run dan checkpoint** menyimpan config, log, dan git hash agar hasil bisa dilacak balik.",
      "**Matriks eksperimen** menyusun banyak run dengan satu variabel berubah per baris, melanjutkan kebiasaan ubah-satu-hal dari minggu ini.",
    ],
    footnote: "Kebiasaan mengubah satu hal pada satu waktu di W3 menjadi fondasi disiplin eksperimen di W4.",
  },

  // ── 37: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W3",
    body: "Semua konsep di presentasi ini ada dalam lab notebook lengkap dengan kode siap pakai, ablation loss yang terkontrol, dan panduan analisis.\n\nEstimasi waktu: 3-5 jam termasuk training, ablation, dan refleksi.",
    ctaText: "Buka Lab W3 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w3_loss_ablation.ipynb",
  },
];

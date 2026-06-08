import type { SlideSection } from "./index";

export const slides03: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W3: Loss, Optimizer & Evaluasi",
    subtitle: "Membaca loss curve untuk mendiagnosis hasil training, lalu menentukan loss, optimizer, dan metrik evaluasi yang sesuai dengan tugasnya.",
    footnote: "Bab 03 - Minggu 3",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Enam materi minggu ini mengikuti alur amati, diagnosis, lalu tiga keputusan yang membentuk training:",
    gridItems: [
      {
        title: "1. Galeri Lima Training",
        body: "Kita mengamati lima loss curve dan menamai gejalanya sebelum tahu nama tekniknya.",
      },
      {
        title: "2. Diagnosis Loss Curve",
        body: "Kita mengubah gejala jadi hipotesis dan langkah tes lewat satu peta diagnosis.",
      },
      {
        title: "3. Memilih Loss",
        body: "Kita menentukan loss sesuai jenis kesalahan yang paling ingin ditekan selama training.",
      },
      {
        title: "4. Optimizer dan LR",
        body: "Kita memahami bagaimana parameter diperbarui dan apa peran learning rate.",
      },
      {
        title: "5. Evaluasi",
        body: "Kita menilai model dengan metrik yang sesuai kondisi kelas, bukan satu angka akurasi.",
      },
      {
        title: "6. Representasi Fitur",
        body: "Kita membandingkan tiga strategi membentuk fitur dari data mentah.",
      },
    ],
  },

  // -- 3: Recap W2 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W2)",
    body: "W2 membangun model dan menjalankan smoke test. Outputnya menjadi bahan yang kita baca minggu ini:",
    bullets: [
      "Kita membangun SimpleCNN, memahami tensor citra (N, C, H, W), dan menjalankan smoke test tiga level.",
      "Output yang dibawa ke W3 adalah satu baseline CIFAR-10 yang sudah dilatih beserta loss curve-nya.",
      "Pencocokan output head dan loss dari W1 dipakai lagi saat kita membahas kapan focal loss atau label smoothing menggantikan cross-entropy.",
    ],
    footnote: "W3 menggeser fokus dari membangun model ke membaca apa yang model lakukan saat dilatih.",
  },

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Galeri Lima Training",
    body: "Bagian ini latihan observasi, bukan soal dengan jawaban tunggal. Loss yang stagnan, meledak ke NaN, atau tidak bergerak adalah kejadian rutin dalam riset, dan langkah pertama menanganinya adalah mengenali gejalanya dari bentuk kurva.",
    footnote: "Kita kembali ke lima run ini di materi diagnosis dengan peta lengkap.",
  },

  // -- 5: Tabel lima run --
  {
    layout: "table",
    title: "Lima loss curve, lima situasi",
    body: "Tiap baris menampilkan train loss dan val loss selama 20 epoch. Baca polanya dan tebak apa yang terjadi sebelum melihat penjelasannya:",
    tableHead: ["Run", "Pola yang terlihat"],
    tableRows: [
      ["1 - Konvergensi normal", "Train dan val turun sejajar sampai keduanya rendah; val sedikit di atas train dengan gap stabil."],
      ["2 - Overfitting", "Train terus turun mulus, val turun sampai epoch 6 lalu naik perlahan; jarak kedua kurva makin lebar."],
      ["3 - Tidak belajar", "Train tidak bergerak sejak epoch pertama dan val ikut stagnan; kedua kurva datar."],
      ["4 - Training tidak stabil", "Train turun sampai epoch 12 lalu tiba-tiba meledak ke NaN; val loss ikut hilang."],
      ["5 - Bising tetapi membaik", "Train turun tetapi sangat bising naik-turun tiap epoch; val cenderung turun meski fluktuatif."],
    ],
    footnote: "Lima run ini menjadi benang merah untuk seluruh W3.",
  },

  // -- 6: Pertanyaan diagnostik --
  {
    layout: "bullets",
    title: "Empat pertanyaan untuk galeri",
    body: "Sebelum lanjut, jawab empat pertanyaan ini secara tertulis untuk melatih penilaian, bukan mencari jawaban sempurna:",
    bullets: [
      "Run mana yang paling mengkhawatirkan, dan apa alasan teknis di baliknya?",
      "Untuk Run 3 yang tidak belajar, apa hipotesis pertama yang akan Anda uji?",
      "Untuk Run 5 yang bising, kapan noise di loss curve mulai menjadi masalah?",
    ],
    footnote: "Tuliskan jawaban singkat sekarang; materi berikutnya membandingkan tebakan ini dengan peta diagnosis.",
  },

  // -- 7: Materi 2 --
  {
    layout: "section",
    title: "2. Diagnosis Loss Curve",
    body: "Loss curve adalah rekaman nilai loss di sepanjang ribuan iterasi training. Setiap batch melewati siklus enam langkah yang sama, dan saat training terasa aneh, gejalanya hampir selalu bisa dilacak ke salah satu langkah itu.",
    footnote: "Pemeriksaan paling penting di bagian ini adalah overfit satu batch.",
  },

  // -- 8: Image siklus training --
  {
    layout: "image",
    title: "Siklus training PyTorch: enam langkah yang berulang",
    imageUrl: "/figures/fig03c_training_cycle.png",
    caption: "Gambar ini menunjukkan enam langkah yang berulang di setiap batch selama training: memuat data, menjalankan forward pass, menghitung loss, mereset gradient ke nol, menjalankan backward pass, dan memperbarui parameter dengan optimizer. Loss curve yang kita baca adalah rekaman nilai loss dari langkah ketiga di sepanjang ribuan iterasi ini.",
    footnote: "Setiap bug training pada akhirnya bisa dilacak ke salah satu dari enam langkah ini.",
  },

  // -- 9: Tiga titik kesalahan --
  {
    layout: "bullets",
    title: "Tiga titik yang paling sering keliru",
    body: "Dari gambar tersebut, tiga langkah paling sering menjadi sumber kesalahan saat training terasa aneh:",
    bullets: [
      "**Reset gradient** yang terlupa membuat gradient batch lama menumpuk, sehingga update salah arah; panggil `optimizer.zero_grad()` di awal tiap iterasi.",
      "**Forward pass** yang keliru, misalnya shape atau loss function yang salah, membuat loss tidak turun meski pipeline berjalan tanpa error.",
      "**Update parameter** bergantung pada learning rate: terlalu besar membuat loss meledak, terlalu kecil membuat loss seolah tidak bergerak.",
    ],
    footnote: "Loss curve adalah cara tercepat membaca gejala dari keenam langkah ini tanpa membuka kode satu per satu.",
  },

  // -- 10: Image lima pola --
  {
    layout: "image",
    title: "Lima pola loss curve untuk diagnosis",
    imageUrl: "/figures/fig01c_loss_curves_diagnostic.svg",
    caption: "Gambar ini menunjukkan lima pola loss curve yang paling sering ditemui: underfitting saat train stagnan tinggi, overfitting saat val menjauh dari train, early divergence saat val tidak pernah turun, kondisi val lebih rendah dari train, dan konvergensi normal saat keduanya turun sejajar. Setiap pola mengarah ke tindakan perbaikan yang berbeda.",
    footnote: "Salah mendiagnosis pola berarti membuang waktu training pada perbaikan yang tidak relevan.",
  },

  // -- 11: Pola 1-2 --
  {
    layout: "split",
    title: "Pola 1 dan 2: tidak belajar vs overfit cepat",
    body: "Dari gambar tersebut, dua pola pertama menuntut langkah tes yang sangat berbeda meski sama-sama mengkhawatirkan:",
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

  // -- 12: Pola 3-4-5 --
  {
    layout: "bullets",
    title: "Pola 3, 4, dan 5: overfit klasik, underfit, ledakan",
    body: "Tiga pola sisanya melengkapi peta diagnosis dari overfitting bertahap sampai gradient yang meledak:",
    bullets: [
      "**Pola 3 (overfitting klasik)** muncul saat train dan val turun sejajar tetapi val jauh di atas train di akhir; gunakan early stopping pada epoch dengan val loss terbaik.",
      "**Pola 4 (underfitting)** muncul saat val turun tetapi train stagnan tinggi; model terlalu kecil, learning rate terlalu rendah, atau augmentasi terlalu agresif.",
      "**Pola 5 (loss meledak)** muncul saat loss menjadi NaN atau naik tajam; turunkan learning rate 10× atau tambahkan gradient clipping `clip=1.0`.",
    ],
    footnote: "Untuk RNN dan Transformer di minggu berikutnya, gradient clipping hampir selalu diperlukan.",
  },

  // -- 13: Overfit one batch --
  {
    layout: "bullets",
    title: "Overfit satu batch: pemeriksaan terpenting",
    body: "Kalau loss curve Anda tidak cocok dengan kelima pola, jangan menebak. Kembali ke titik awal peta diagnosis dan jalankan overfit satu batch:",
    bullets: [
      "Ambil 4-8 sampel saja, lalu jalankan ratusan iterasi hanya pada sampel itu tanpa augmentasi.",
      "Jika loss turun mendekati nol, model dan pipeline sehat; masalahnya ada di data, learning rate, atau regularisasi.",
      "Jika loss tidak turun, ada bug di arsitektur atau loss function; perbaiki kode sebelum menyentuh hiperparameter apa pun.",
    ],
    footnote: "Karpathy menyebut overfit satu batch sebagai pemeriksaan debugging terpenting dalam melatih neural network.",
  },

  // -- 14: Materi 3 --
  {
    layout: "section",
    title: "3. Memilih Loss",
    body: "Loss menentukan apa yang dianggap salah oleh model. Mengganti loss berarti mengubah jenis kesalahan yang paling ditekan selama training.",
    footnote: "Rekap rumus MSE, BCE, dan CrossEntropy ada di W1; di sini kita bahas kapan tiap loss dipakai.",
  },

  // -- 15: Loss klasifikasi --
  {
    layout: "bullets",
    title: "Loss klasifikasi: apa yang dianggap salah?",
    body: "Untuk klasifikasi, pertanyaannya adalah jenis kesalahan mana yang paling ingin ditekan model:",
    bullets: [
      "**Cross-entropy** adalah pilihan default yang mengukur jarak antara distribusi probabilitas prediksi dan label; pakai `CrossEntropyLoss` yang menggabungkan softmax dan log-likelihood.",
      "**Focal loss** masuk akal saat kelas sangat tidak seimbang, karena ia menurunkan bobot sampel mudah dan memaksa model memperhatikan kelas minor.",
      "**Label smoothing** mengganti label one-hot dengan distribusi yang dilembutkan, mencegah model terlalu percaya diri dan memperbaiki kalibrasi.",
    ],
    footnote: "Kalau tidak ada alasan kuat, pertahankan cross-entropy sebagai baseline dan ubah hal lain dulu.",
  },

  // -- 16: Focal loss numeric --
  {
    layout: "split",
    title: "Focal loss: mengapa sampel mudah diberi bobot kecil",
    body: "Focal loss mengalikan cross-entropy dengan faktor (1 - p_t)^γ. Dengan γ = 2, faktor ini menyusut drastis untuk sampel yang sudah diprediksi benar dan yakin:",
    left: {
      title: "Sampel sulit (kelas minor)",
      body: "Prediksi `p_t = 0.2` berarti model salah-yakin.\n\nFaktor pembobotan: `(1 - 0.2)² = 0.64`.\n\nLoss hampir tidak diredam, sehingga model dipaksa memperhatikan sampel ini.",
    },
    right: {
      title: "Sampel mudah (kelas mayor)",
      body: "Prediksi `p_t = 0.95` berarti model benar-yakin.\n\nFaktor pembobotan: `(1 - 0.95)² = 0.0025`.\n\nLoss diredam hampir habis, sehingga sampel mudah berhenti mendominasi gradient.",
    },
    footnote: "Selisihnya 256×: sampel sulit memberi kontribusi gradient 256 kali lebih besar dari sampel mudah di iterasi yang sama.",
  },

  // -- 17: Loss regresi --
  {
    layout: "bullets",
    title: "Tiga loss untuk regresi",
    body: "Untuk regresi, pilihan loss menentukan seberapa keras outlier dihukum dan seberapa cepat training konvergen:",
    bullets: [
      "**MSE** menerapkan penalti kuadratik pada residu, sangat sensitif terhadap outlier (residu meleset 5 menyumbang loss 25×), dan cocok saat residu kecil pun sudah bermasalah.",
      "**MAE** mengukur residu secara linear sehingga lebih robust terhadap outlier, tetapi gradientnya konstan di sekitar nol sehingga konvergensi sering lebih lambat.",
      "**Huber loss** menggabungkan keduanya: kuadratik untuk residu kecil dan linear untuk residu besar, dengan ambang δ yang berdefault 1.0 di PyTorch.",
    ],
    footnote: "Tidak ada loss yang unggul universal; pilihan bergantung pada seberapa berbahaya outlier di data Anda.",
  },

  // -- 18: Materi 4 --
  {
    layout: "section",
    title: "4. Optimizer dan Learning Rate",
    body: "Optimizer mengubah gradient menjadi langkah pembaruan pada parameter, dan learning rate menentukan seberapa besar tiap langkah itu.",
    footnote: "Di W3 learning rate konstan sudah cukup; scheduler dan warmup dibahas lebih serius di W4.",
  },

  // -- 19: SGD vs AdamW --
  {
    layout: "bullets",
    title: "SGD, AdamW, dan ukuran langkah",
    body: "Optimizer menentukan cara gradient diterjemahkan jadi langkah, dan learning rate menentukan besarnya:",
    bullets: [
      "**SGD (+ momentum)** sederhana dan sering sangat efektif setelah tuning yang tekun, tetapi butuh learning rate schedule yang dirancang hati-hati.",
      "**AdamW** bersifat adaptif sehingga cepat konvergen di epoch awal, dan menjadi default modern yang masuk akal untuk training dari nol.",
      "**Learning rate** yang terlalu besar membuat loss meledak atau menjadi NaN, sedangkan yang terlalu kecil membuat loss seolah tidak bergerak.",
    ],
    footnote: "Range praktis untuk mulai: lr=3e-4 (Karpathy constant), weight_decay 1e-4 sampai 1e-2.",
  },

  // -- 20: weight_decay AdamW --
  {
    layout: "split",
    title: "weight_decay di AdamW bukan L2 regularisasi",
    body: "Pada SGD, menambahkan L2 ke loss setara dengan mengurangi λw dari tiap parameter; pada Adam kesetaraan itu tidak berlaku. Di sinilah AdamW memperbaiki keadaan:",
    left: {
      title: "Masalah pada Adam",
      body: "Adam membagi gradient dengan estimasi variansi tiap parameter.\n\nAkibatnya, penalti L2 yang ditambahkan ke loss mendapat efek yang tidak proporsional antar parameter.\n\nRegularisasi menjadi tidak konsisten dan sulit ditebak.",
    },
    right: {
      title: "Perbaikan AdamW",
      body: "AdamW menerapkan weight decay langsung ke parameter, bukan lewat gradient.\n\nEfek regularisasi menjadi konsisten antar parameter.\n\n`weight_decay=0.01` di AdamW lebih dapat diandalkan daripada nilai yang sama di Adam biasa.",
    },
    footnote: "Pakai AdamW sebagai default, dan hindari menambahkan L2 manual ke loss pada Adam.",
  },

  // -- 21: Materi 5 --
  {
    layout: "section",
    title: "5. Evaluasi",
    body: "Satu angka akurasi sering belum cukup. Akurasi 95% terdengar bagus sampai Anda sadar kelas positif hanya 5% dari data, dan model yang selalu menebak negatif pun mencapai angka itu.",
    footnote: "Kebiasaan minggu ini: curiga pada angka yang terlalu bagus, lalu periksa dengan metrik yang sesuai.",
  },

  // -- 22: Tabel metrik per kasus --
  {
    layout: "table",
    title: "Enam metrik pada satu kasus: deteksi orang sakit",
    body: "Tabel berikut memakai satu kasus yang sama agar perbedaan tiap metrik terlihat konkret. Baca kolom \"Dipakai kapan\" dulu, lalu contohnya:",
    tableHead: ["Metrik", "Dipakai kapan", "Contoh pada deteksi orang sakit"],
    tableRows: [
      ["Accuracy", "Orang sakit dan sehat relatif seimbang.", "Data berisi 500 orang sakit dan 500 sehat. Jika model banyak menebak benar secara keseluruhan, accuracy masih layak."],
      ["Precision", "Prediksi \"sakit\" harus benar-benar akurat.", "Model memprediksi 100 orang sakit. Precision menjawab: dari 100 itu, berapa yang benar-benar sakit? Penting jika pemeriksaan lanjutan mahal."],
      ["Recall", "Sebanyak mungkin orang sakit harus ditemukan.", "Ada 100 orang yang benar-benar sakit. Recall menjawab: dari 100 itu, berapa yang berhasil dideteksi? Penting jika penyakit berbahaya."],
      ["F1-score", "Precision dan recall sama-sama penting.", "Kita ingin banyak orang sakit terdeteksi tanpa terlalu banyak orang sehat salah ditandai. F1 menyeimbangkan keduanya."],
      ["ROC-AUC", "Menilai daya pisah sakit vs sehat di berbagai ambang.", "Model memberi skor risiko 0-1. ROC-AUC melihat apakah skor orang sakit cenderung lebih tinggi daripada orang sehat."],
      ["PR-AUC", "Jumlah orang sakit sangat sedikit dibanding sehat.", "Dari 10.000 orang, hanya 50 yang sakit. PR-AUC lebih cocok karena fokus pada kualitas prediksi kelas \"sakit\" yang langka."],
    ],
    footnote: "Metrik dipilih dari keseimbangan kelas dan jenis kesalahan yang paling ingin dihindari, bukan dari kebiasaan memakai satu angka.",
  },

  // -- 23: Tiga pemeriksaan --
  {
    layout: "bullets",
    title: "Tiga pemeriksaan sebelum menulis angka",
    body: "Setelah melatih SimpleCNN dari W2, ketiga pemeriksaan ini mengubah satu angka akurasi jadi laporan yang menunjukkan kekuatan dan kelemahan model:",
    bullets: [
      "**Periksa overfitting** dengan membandingkan train accuracy dan val accuracy; selisih lebih dari 10% biasanya sinyal model menghafal.",
      "**Periksa akurasi per kelas** lewat confusion matrix; pada CIFAR-10, pasangan `cat` dan `dog` biasanya paling sering tertukar.",
      "**Periksa sampel yang salah** dengan memvisualisasikan 10 gambar paling confident tetapi keliru; sering ada pola kesalahan yang bisa dijelaskan.",
    ],
    footnote: "Saat melapor ke dosen, sebutkan metrik dan kondisi kelasnya (\"akurasi 95%, recall kelas minor 0.4\"), bukan satu angka tunggal.",
  },

  // -- 24: Materi 6 --
  {
    layout: "section",
    title: "6. Representasi Fitur",
    body: "Salah satu keputusan yang paling sering menentukan performa adalah pilihan representasi, dan keputusan ini diambil jauh sebelum training dimulai.",
    footnote: "Pada modalitas dan tugas yang sama, representasi kerap lebih menentukan daripada pergantian arsitektur.",
  },

  // -- 25: Image tiga strategi --
  {
    layout: "image",
    title: "Engineered, Extracted, Learned: tiga jalur representasi",
    imageUrl: "/figures/fig01d_feature_representation.svg",
    caption: "Gambar ini menunjukkan tiga strategi membentuk representasi fitur dari data mentah: Engineered dirancang manual oleh manusia dengan pengetahuan domain, Extracted diambil dari hidden layer model pretrained yang di-freeze, dan Learned dipelajari langsung dari data lewat training end-to-end. Ketiganya berbeda pada seberapa banyak data dan biaya komputasi yang dibutuhkan.",
    footnote: "Ketiga jalur ini menjadi sumbu utama saat Anda merumuskan variabel eksperimen di capstone.",
  },

  // -- 26: Grid tiga strategi --
  {
    layout: "grid",
    title: "Membandingkan tiga strategi representasi",
    body: "Dari gambar sebelumnya, ketiga strategi menempati posisi berbeda pada trade-off antara kebutuhan data dan biaya komputasi:",
    gridItems: [
      {
        title: "Engineered: dirancang manusia",
        body: "Strategi ini memakai fitur klasik seperti histogram warna, HOG, atau statistik sinyal. Biayanya rendah, mudah diinterpretasi, dan sering menjadi baseline kuat ketika data latih terbatas.",
      },
      {
        title: "Extracted: dari model pretrained",
        body: "Strategi ini mengambil hidden states dari CNN, ViT, atau BERT yang di-freeze. Anda mendapat representasi model besar tanpa biaya training penuh, dengan syarat domain target dekat dengan domain pretraining.",
      },
      {
        title: "Learned: end-to-end",
        body: "Strategi ini mempelajari representasi langsung dari data lewat fine-tuning atau training dari nol. Ia biasanya paling kuat saat data memadai, tetapi paling haus data dan paling mahal dilatih.",
      },
    ],
    footnote: "Membandingkan BERT frozen + head kecil dengan BERT fine-tune penuh berarti membandingkan dua strategi representasi, bukan dua model yang setara.",
  },

  // -- 27: Lab W3 --
  {
    layout: "bullets",
    title: "Lab W3: Toy Ablation Loss + Freeze",
    body: "Lab minggu ini menjalankan ablation kecil tetapi lengkap di dataset toy, sehingga fokusnya pada metode eksperimen dan interpretasi hasil:",
    bullets: [
      "**Sanity check FocalLoss** memastikan `gamma=0` setara dengan cross-entropy sebelum loss dipakai di ablation.",
      "**Ablation 2×2** menguji pilihan loss dan status freeze dengan beberapa seed, lalu merangkum mean/std dalam bar chart ber-error bar.",
      "**Interpretasi hasil** membahas main effect, interaksi, dan batas klaim karena dataset yang dipakai adalah dataset toy.",
    ],
    footnote: "Lab penunjang representasi fitur pada CIFAR-10 tersedia sebagai latihan opsional. Di W4, kebiasaan ini dilanjutkan menjadi config, seed, checkpoint, dan matriks eksperimen.",
  },

  // -- 28: Bridge assignment W3 ke W4 --
  {
    layout: "bullets",
    title: "Tugas jembatan: diagnosis CIFAR-10 untuk awal W4",
    body: "Lab W3 memakai dataset toy; tugas jembatan ini memakai baseline CIFAR-10 dari W2 untuk bahan presentasi singkat di awal W4:",
    bullets: [
      "**Baca loss curve** dari baseline CIFAR-10: apakah train dan val turun bersama, overfit, stagnan, atau tidak stabil?",
      "**Periksa evaluasi** lewat akurasi per kelas, confusion matrix, atau contoh prediksi confident tetapi salah.",
      "**Bawa satu hipotesis ablation** ke W4, misalnya focal loss, dropout, augmentasi, AdamW vs SGD, atau freeze blok awal.",
    ],
    footnote: "Siapkan satu slide ringkas; slide ini dipresentasikan di awal W4 sebelum materi matriks eksperimen dimulai.",
  },

  // -- 29: CTA Lab W3 --
  {
    layout: "cta",
    title: "Mulai Lab W3",
    body: "Semua konsep di presentasi ini ada dalam lab notebook Colab mandiri dengan kode siap pakai: sanity check focal loss, ablation 2×2, beberapa seed, dan panduan analisis.\n\nEstimasi waktu 30-60 menit termasuk menjalankan ablation dan menulis refleksi.",
    ctaText: "Buka Lab W3 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w3_loss_ablation.ipynb",
  },
];

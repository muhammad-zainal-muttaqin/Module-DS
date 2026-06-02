import type { SlideSection } from "./index";

export const slides03: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W3: Loss, Optimizer & Evaluasi",
    subtitle: "Belajar membaca loss curve untuk mendiagnosis hasil training, menentukan loss dan optimizer yang sesuai, lalu mengevaluasi model dengan metrik yang sesuai.",
    body: "Alur utama presentasi ini dipakai untuk kelas W3. Detail tambahan disimpan di lampiran opsional agar fokus kelas tetap pada diagnosis training dan transisi ke Lab W3.",
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
    body: "W3 dimulai dari lima contoh training, langsung membaca gejalanya, lalu memakai loss, optimizer, dan evaluasi sebagai alat diagnosis. Bedanya dengan W2: fokus bergeser dari membangun model ke membaca apa yang model lakukan saat dilatih.",
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
    body: "Sebelum menyentuh teori loss dan optimizer, kita amati dulu. Loss yang stagnan, meledak ke NaN, atau tidak bergerak sama sekali bukan kejadian langka, melainkan rutinitas riset sehari-hari. Lewat lima contoh berikut, Anda berlatih mengenali gejalanya dari bentuk kurva sebelum tahu nama tekniknya.",
    footnote: "Setelah galeri ini, kita langsung masuk ke diagnosis agar alur amati -> tafsir -> tindakan tetap utuh.",
  },

  // ── 8: Grid lima run ──
  {
    layout: "grid",
    title: "Lima Loss Curve, Lima Situasi Berbeda",
    body: "Tiap kurva di bawah menampilkan train loss dan val loss selama 20 epoch. Baca tiap pola dan tebak apa yang terjadi sebelum melihat penjelasannya:",
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
    footnote: "Kita pakai lima run ini sebagai benang merah untuk seluruh W3.",
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
    footnote: "Tuliskan jawaban singkat sekarang; slide berikutnya langsung membandingkan tebakan ini dengan kerangka diagnosis.",
  },

  // ── 10: Mendiagnosis (DIVIDER 3) ──
  {
    layout: "section",
    title: "Mendiagnosis Hasil Training dari Loss Curve",
    body: "Kini kita kembali ke galeri lima training dengan peta diagnosis lengkap. Setiap pola punya hipotesis dan langkah tes yang spesifik, sehingga Anda berhenti menebak dan mulai menguji.",
    footnote: "Pemeriksaan paling penting di bagian ini adalah overfit satu batch.",
  },

  // ── 11: Image lima pola ──
  {
    layout: "image",
    title: "Lima Pola Loss Curve untuk Diagnosis",
    imageUrl: "/figures/fig01c_loss_curves_diagnostic.svg",
    caption: "Gambar ini menunjukkan lima pola loss curve yang paling sering ditemui: underfitting saat loss train stagnan tinggi, overfitting saat val menjauh dari train, early divergence saat val tidak pernah turun, kondisi val lebih rendah dari train, dan konvergensi normal saat keduanya turun sejajar. Setiap pola mengarah ke tindakan perbaikan yang berbeda.",
    footnote: "Salah mendiagnosis pola berarti membuang waktu training pada perbaikan yang tidak relevan.",
  },

  // ── 12: Pola 1-2 ──
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

  // ── 13: Pola 3-4-5 ──
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

  // ── 14: Overfit one batch ──
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

  // ── 15: Image siklus training ──
  {
    layout: "image",
    title: "Siklus Training PyTorch: Enam Langkah yang Berulang",
    imageUrl: "/figures/fig03c_training_cycle.png",
    caption: "Gambar ini menunjukkan enam langkah yang berulang di setiap batch selama training: memuat data, menjalankan forward pass, menghitung loss, mereset gradient ke nol, menjalankan backward pass, dan memperbarui parameter dengan optimizer. Loss curve yang kita baca adalah rekaman nilai loss dari langkah ketiga di sepanjang ribuan iterasi ini.",
    footnote: "Setiap bug training pada akhirnya bisa dilacak ke salah satu dari enam langkah ini.",
  },

  // ── 16: Enam langkah teks ──
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

  // ── 17: Tiga Keputusan (DIVIDER 4) ──
  {
    layout: "section",
    title: "Tiga Keputusan: Loss, Optimizer, Evaluasi",
    body: "Setelah gejala terbaca, baru kita masuk ke tiga keputusan yang membentuk training. Loss menentukan apa yang dianggap salah, optimizer menentukan bagaimana parameter digeser, dan evaluasi menentukan apakah angka akhir bisa dipercaya.",
    footnote: "Bagian ini sengaja ringkas: cukup untuk membaca hasil training dan masuk ke Lab W3.",
  },

  // ── 18: Loss ringkas ──
  {
    layout: "bullets",
    title: "Memilih Loss: Apa yang Dianggap Salah?",
    body: "Bayangkan model deteksi penyakit langka: akurasinya 97 persen, tetapi model tidak pernah menandai satu pasien sakit pun. Loss-lah yang menentukan jenis kesalahan mana yang paling ditekan selama training.",
    bullets: [
      "**Cross-entropy** adalah pilihan default yang mengukur jarak antara distribusi probabilitas prediksi dan label - pakai `CrossEntropyLoss` yang otomatis menggabungkan softmax dan log-likelihood.",
      "**Focal loss atau pembobotan kelas** masuk akal saat false negative pada kelas minor adalah kesalahan yang paling merugikan.",
      "**MSE, MAE, dan Huber** dipilih pada regresi berdasarkan seberapa keras outlier perlu dihukum.",
    ],
    footnote: "Jika tidak ada alasan kuat, pertahankan cross-entropy atau MSE sebagai baseline dan ubah hal lain terlebih dahulu.",
  },

  // ── 19: Optimizer ringkas ──
  {
    layout: "bullets",
    title: "Optimizer dan Learning Rate: Seberapa Besar Langkahnya?",
    body: "Dua orang melatih model yang sama dengan loss dan data yang sama: satu konvergen dalam 10 epoch, satu lagi butuh 60 epoch dengan tuning yang melelahkan. Bedanya ada di optimizer dan learning rate.",
    bullets: [
      "**Learning rate terlalu kecil** membuat loss seolah tidak bergerak; ini mirip gejala model tidak belajar.",
      "**Learning rate terlalu besar** membuat loss melonjak, bising ekstrem, atau menjadi NaN.",
      "**AdamW** adalah default modern yang masuk akal untuk mulai dari nol; scheduler dan optimizer lanjutan cukup dicatat sebagai lampiran.",
    ],
    footnote: "Di W3, learning rate konstan sudah cukup untuk Lab W3; scheduler dan warmup dibahas lebih serius di W4.",
  },

  // ── 20: Evaluasi ringkas ──
  {
    layout: "bullets",
    title: "Evaluasi: Satu Angka Akurasi Tidak Cukup",
    body: "Akurasi 95 persen terdengar hebat sampai Anda sadar kelas positif hanya 5 persen, dan model yang selalu menebak negatif pun mencapai angka itu. Tidak ada metrik tunggal yang benar untuk semua kasus. Pilih berdasarkan keseimbangan kelas dan apa yang ingin dijamin:",
    bullets: [
      "**Accuracy** layak dipakai hanya saat kelas seimbang, karena ia menyesatkan begitu satu kelas mendominasi data.",
      "**Precision, recall, dan F1** dipakai saat kelas tidak seimbang dan fokusnya pada satu kelas tertentu, dengan konsekuensi harus memilih ambang batas.",
      "**ROC-AUC dan PR-AUC** mengevaluasi kualitas probabilistik; PR-AUC lebih sesuai daripada ROC-AUC pada imbalance ekstrem.",
    ],
    footnote: "Perplexity adalah metrik khusus model bahasa dan hanya bermakna relatif antar model.",
  },

  // ── 21: Tiga pemeriksaan ──
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

  // ── 22: Lab W3 ──
  {
    layout: "bullets",
    title: "Lab W3: Toy Ablation Loss + Freeze",
    body: "Lab minggu ini menjalankan ablation mandiri yang kecil tetapi lengkap, sehingga fokusnya berada pada metode eksperimen dan interpretasi hasil. Setelah slide ini, mahasiswa masuk ke notebook dengan bekal utama W3: baca gejala training dulu, lalu ubah satu hal pada satu waktu.",
    bullets: [
      "**Sanity check FocalLoss** memastikan `gamma=0` setara dengan cross-entropy sebelum loss dipakai di ablation.",
      "**Ablation 2×2** menguji pilihan loss dan status freeze dengan beberapa seed, lalu merangkum mean/std dalam bar chart ber-error bar.",
      "**Interpretasi hasil** membahas main effect, interaksi, dan batas klaim karena dataset yang dipakai adalah dataset toy.",
    ],
    footnote: "Lab penunjang representasi fitur pada CIFAR-10 tetap tersedia sebagai latihan opsional, bukan syarat utama Lab W3. Di W4, kebiasaan ini dilanjutkan menjadi config, seed, checkpoint, dan matriks eksperimen.",
  },

  // ── 23: Lampiran opsional ──
  {
    layout: "section",
    title: "Lampiran Opsional",
    body: "Slide berikutnya menyimpan detail yang berguna sebagai referensi, tetapi tidak perlu memutus alur utama kelas W3. Pakai jika waktu cukup atau saat ada pertanyaan dari mahasiswa.",
    footnote: "Alur utama W3 selesai di slide Lab dan refleksi; lampiran ini bersifat pendalaman.",
  },

  // ── 24: Miskonsepsi ──
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

  // ── 25: Focal loss numeric ──
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

  // ── 26: Loss regresi ──
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

  // ── 27: Optimizer lanjutan ──
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
    footnote: "LAMB adalah varian untuk batch size sangat besar di pre-training BERT atau GPT, dan jarang diperlukan di proyek kuliah.",
  },

  // ── 28: Scheduler dan validasi ──
  {
    layout: "bullets",
    title: "Scheduler dan Validasi: Catatan Lanjutan",
    body: "Dua hal berikut sering muncul setelah mahasiswa mulai menjalankan banyak eksperimen, tetapi cukup dipakai sebagai catatan lanjut di W3:",
    bullets: [
      "**Scheduler** seperti `OneCycleLR`, `CosineAnnealingLR`, dan `ReduceLROnPlateau` menurunkan learning rate selama training dan baru relevan saat run mulai banyak.",
      "**Hold-out split** cepat, tetapi sensitif terhadap keberuntungan pembagian data.",
      "**K-fold dan stratified split** memberi estimasi lebih stabil, terutama saat dataset kecil atau kelas tidak seimbang.",
    ],
    footnote: "Untuk Lab W3, split sederhana dan learning rate konstan sudah cukup agar fokus tetap pada ablation dan interpretasi.",
  },

  // ── 29: Tabel metrik pada kasus deteksi orang sakit ──
  {
    layout: "table",
    title: "Enam Metrik pada Satu Kasus: Deteksi Orang Sakit",
    body: "Tabel berikut memakai satu kasus yang sama, yaitu deteksi orang sakit, agar perbedaan tiap metrik terlihat konkret. Baca kolom \"Dipakai kapan\" dulu, lalu contohnya:",
    tableHead: ["Metrik", "Dipakai kapan", "Contoh pada kasus deteksi orang sakit"],
    tableRows: [
      [
        "Accuracy",
        "Jumlah orang sakit dan sehat relatif seimbang.",
        "Data berisi 500 orang sakit dan 500 orang sehat. Jika model banyak menebak benar secara keseluruhan, accuracy masih layak dipakai.",
      ],
      [
        "Precision",
        "Prediksi \"sakit\" harus benar-benar akurat.",
        "Model memprediksi 100 orang sakit. Precision menjawab: dari 100 orang itu, berapa yang benar-benar sakit? Penting jika pemeriksaan lanjutan mahal atau berisiko.",
      ],
      [
        "Recall",
        "Sebanyak mungkin orang sakit harus ditemukan.",
        "Ada 100 orang yang benar-benar sakit. Recall menjawab: dari 100 orang itu, berapa yang berhasil dideteksi model? Penting jika penyakit berbahaya dan tidak boleh terlewat.",
      ],
      [
        "F1-score",
        "Precision dan recall sama-sama penting.",
        "Kita ingin banyak orang sakit terdeteksi, tetapi tidak ingin terlalu banyak orang sehat salah ditandai sakit. F1 menyeimbangkan precision dan recall.",
      ],
      [
        "ROC-AUC",
        "Menilai kemampuan membedakan sakit dan sehat di berbagai ambang batas.",
        "Model memberi skor risiko 0 sampai 1. ROC-AUC melihat apakah skor orang sakit cenderung lebih tinggi daripada orang sehat.",
      ],
      [
        "PR-AUC",
        "Jumlah orang sakit sangat sedikit dibanding orang sehat.",
        "Dari 10.000 orang, hanya 50 yang sakit. PR-AUC lebih cocok karena fokus pada kualitas prediksi kelas \"sakit\" yang jumlahnya langka.",
      ],
    ],
    footnote: "Inti tabel: metrik dipilih dari keseimbangan kelas dan jenis kesalahan yang paling ingin dihindari, bukan dari kebiasaan memakai satu angka.",
  },

  // ── 30: Image tiga strategi ──
  {
    layout: "image",
    title: "Engineered, Extracted, Learned: Tiga Jalur Representasi",
    imageUrl: "/figures/fig01d_feature_representation.svg",
    caption: "Gambar ini menunjukkan tiga strategi membentuk representasi fitur dari data mentah: Engineered dirancang manual oleh manusia dengan pengetahuan domain, Extracted diambil dari hidden layer model pretrained yang di-freeze, dan Learned dipelajari langsung dari data melalui training end-to-end. Ketiganya berbeda pada seberapa banyak data dan biaya komputasi yang dibutuhkan.",
    footnote: "Ketiga jalur ini menjadi sumbu utama saat Anda merumuskan variabel eksperimen di capstone.",
  },

  // ── 31: Grid tiga strategi ──
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

  // ── 32: CTA Lab W3 ──
  {
    layout: "cta",
    title: "Mulai Lab W3",
    body: "Semua konsep di presentasi ini ada dalam lab notebook Colab mandiri dengan kode siap pakai, sanity check focal loss, ablation 2×2, beberapa seed, dan panduan analisis.\n\nEstimasi waktu: 30-60 menit termasuk menjalankan ablation dan menulis refleksi.",
    ctaText: "Buka Lab W3 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w3_loss_ablation.ipynb",
  },

  // ── 33: Bridge assignment W3 ke W4 ──
  {
    layout: "bullets",
    title: "Tugas Setelah Lab W3: Diagnosis CIFAR-10 untuk Awal W4",
    body: "Setelah tombol Lab W3 ini, ada satu tugas jembatan sebelum masuk W4. Lab W3 tetap memakai dataset toy; tugas tambahan ini memakai baseline CIFAR-10 dari W2 untuk bahan presentasi singkat di awal W4:",
    bullets: [
      "**Baca loss curve** dari baseline CIFAR-10: apakah train dan validation turun bersama, overfit, stagnan, atau tidak stabil?",
      "**Periksa evaluasi** lewat akurasi per kelas, confusion matrix, atau contoh prediksi confident tetapi salah.",
      "**Bawa satu hipotesis ablation** ke W4, misalnya focal loss, dropout, augmentasi, AdamW vs SGD, atau freeze blok awal.",
    ],
    footnote: "Siapkan satu slide ringkas. Slide ini dipresentasikan di awal W4 sebelum materi matriks eksperimen dimulai.",
  },

];

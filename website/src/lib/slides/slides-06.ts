import type { SlideSection } from "./index";

export const slides06: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W6: Representations & Temporal Leakage",
    subtitle: "Memeriksa data sebelum mempercayai angka, mengenali lima jenis leakage, dan menjaga pipeline tetap valid secara temporal.",
    body: "Presentasi ini bisa dipakai mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 06 - Minggu 6",
  },

  // ── 2: Peta W6 ──
  {
    layout: "section",
    title: "Peta W6",
    body: "Akurasi 99% bukan prestasi, melainkan alarm. W6 menggabungkan dua tema yang saling terkait: memilih representasi fitur dalam konteks temporal, dan mencegah leakage yang menghasilkan angka bagus tetapi tidak valid.",
    footnote: "Skeptisisme terhadap angka sendiri adalah sikap yang memisahkan peneliti dari operator model.",
  },

  // ── 3: Dari W5 ke W6 ──
  {
    layout: "bullets",
    title: "Dari W5 ke W6: dari Arsitektur ke Validitas Data",
    body: "W5 membangun dan mendiagnosis arsitektur recurrent; W6 memastikan data yang masuk ke arsitektur itu tidak membocorkan informasi masa depan. Tiga hal menjadi fokus minggu ini:",
    bullets: [
      "**Kebiasaan riset** yang dilatih minggu ini adalah memvalidasi preprocessing dan mencegah temporal leakage sebelum mempercayai metrik apapun.",
      "**Representasi fitur** dari W3 kini punya dimensi baru, karena pilihan representasi pada time series menentukan validitas temporal, bukan hanya performa.",
      "**Pertanyaan inti W6** adalah apakah ada informasi masa depan yang bocor ke training pada setiap pipeline preprocessing.",
    ],
    footnote: "Lab utama minggu ini adalah lab_w6_temporal_leakage.ipynb dan lab_w6_eda_leakage.ipynb.",
  },

  // ── 4: Section Representasi ──
  {
    layout: "section",
    title: "Representasi Fitur dalam Konteks Sensor",
    body: "Tiga strategi representasi dari W3 - engineered, extracted, dan learned - muncul lagi pada domain sensor dan time series. Di sini pilihannya jauh lebih menentukan karena ada dimensi temporal yang perlu dijaga.",
    footnote: "Engineered features yang tampak netral bisa membawa informasi dari masa depan tanpa disadari.",
  },

  // ── 5: Grid 3 strategi ──
  {
    layout: "grid",
    title: "Tiga Strategi Representasi dan Risiko Leakage-nya",
    body: "Pada time series, setiap strategi punya kekuatan berbeda sekaligus risiko leakage yang berbeda:",
    gridItems: [
      {
        title: "Engineered",
        body: "Strategi ini memakai mean, variance, atau spektrum FFT dari window. Ia interpretable dan ringan, tetapi risiko leakage-nya tinggi jika window melampaui batas temporal antara train dan test.",
      },
      {
        title: "Extracted",
        body: "Strategi ini mengambil hidden states dari model time series pretrained yang di-freeze. Ia tidak butuh label, tetapi perlu dicek apakah model pretrained dilatih pada data yang overlap dengan data Anda.",
      },
      {
        title: "Learned",
        body: "Strategi ini melatih LSTM end-to-end dari sinyal mentah. Ia paling fleksibel dan risiko leakage-nya rendah, asalkan split temporal diimplementasikan dengan benar.",
      },
    ],
    footnote: "Thread Representation Choice dari W3 kini menentukan apakah hasil Anda valid secara temporal.",
  },

  // ── 6: Section Temporal Leakage ──
  {
    layout: "section",
    title: "Temporal Leakage: Contoh Konkret yang Menipu",
    body: "Bayangkan data sensor suhu mesin industri dengan label failure. Anda membuat fitur rolling mean 24 jam lalu membagi data secara acak. Dua masalah sekaligus muncul di sini.",
    footnote: "Hasilnya adalah angka yang terlihat bagus tetapi runtuh saat dipakai di produksi.",
  },

  // ── 7: Code wrong split ──
  {
    layout: "code",
    title: "Pipeline yang Tampak Wajar tetapi Bocor",
    body: "Kode berikut terlihat seperti praktik standar, tetapi kombinasi rolling feature dan random split membocorkan informasi masa depan:",
    lang: "python",
    code: `# Fitur rolling 24 jam
df['rolling_mean_24h'] = df['temperature'].rolling(24).mean()

# SALAH - split acak, bukan temporal
X_train, X_test = train_test_split(df, test_size=0.2,
                                   shuffle=True)`,
    footnote: "Dua keputusan ini bersama-sama membuat data setelah titik test ikut terlihat saat training.",
  },

  // ── 8: Bullets dua masalah ──
  {
    layout: "bullets",
    title: "Dua Sumber Kebocoran dalam Satu Pipeline",
    body: "Kode tadi mengandung dua masalah yang masing-masing cukup untuk membuat metrik menipu:",
    bullets: [
      "**Random split** membuat sampel jam 14:00 masuk train sementara sampel jam 13:00 hari yang sama masuk test, sehingga model melihat data setelah titik test saat training.",
      "**Rolling feature melampaui batas** karena nilai pada titik T dihitung dari T-23 hingga T, sehingga fitur training bisa mengandung titik yang ada di test set.",
      "**Akibatnya** model mencapai F1 0.92 saat evaluasi, tetapi hanya 0.63 saat dipakai di produksi.",
    ],
    footnote: "Solusi yang benar adalah split berdasarkan waktu dan menghitung rolling feature secara causal.",
  },

  // ── 9: Image fig06c ──
  {
    layout: "image",
    title: "Split Temporal yang Benar vs Data Leakage",
    imageUrl: "/figures/fig06c_train_val_leakage.png",
    caption: "Gambar ini membandingkan pembagian train-val-test yang benar dengan yang bocor. Pada split temporal yang benar, data lama dipakai untuk training dan data baru untuk test sesuai urutan waktu. Pada random split, sampel dari periode waktu yang sama tersebar ke train dan test sekaligus, sehingga informasi temporal bocor ke training.",
    footnote: "Cutoff berbasis quantile timestamp menjaga seluruh data train berada sebelum seluruh data test.",
  },

  // ── 10: Bullets inflasi ──
  {
    layout: "bullets",
    title: "Mengapa Angka Bocor Justru Berbahaya",
    body: "Dari gambar tersebut, bahaya leakage bukan pada angka yang jelas mencurigakan, melainkan pada angka yang tampak masuk akal:",
    bullets: [
      "**Leakage jarang menghasilkan F1 1.0** yang langsung mencurigakan, melainkan angka seperti 0.88 yang cukup meyakinkan untuk lolos review.",
      "**Yang salah bukan angkanya** melainkan cara mendapatkannya, sehingga pipeline yang bocor menghasilkan metrik yang tidak bisa direproduksi di produksi.",
      "**Lab 6 menunjukkan delta ini** secara eksplisit dengan membandingkan F1 dengan dan tanpa leakage pada dataset yang sama.",
    ],
    footnote: "Selisih F1 0.92 ke 0.63 adalah harga yang dibayar saat leakage baru ketahuan di produksi.",
  },

  // ── 11: Section Motivasi ──
  {
    layout: "section",
    title: "Motivasi: Data yang Terlihat Baik Bisa Menipu",
    body: "Seorang mahasiswa melatih model deteksi penyakit paru dari rontgen dada dan mencapai akurasi 97%. Saat review, seorang kolega bertanya apakah model belajar mengenali penyakit, atau mengenali rumah sakitnya.",
    footnote: "Kewaspadaan terhadap data bukan tugas tambahan, melainkan dasar yang menopang seluruh eksperimen.",
  },

  // ── 12: Bullets X-ray ──
  {
    layout: "bullets",
    title: "Model yang Mengklasifikasi Sumber, Bukan Penyakit",
    body: "Investigasi kasus rontgen tadi mengungkap mengapa akurasi 97% justru menjadi alarm:",
    bullets: [
      "**Setiap rumah sakit memakai mesin rontgen berbeda** dengan ciri visual khas di sudut gambar, sehingga sumber gambar bisa ditebak dari artefak teknis.",
      "**Data positif dan negatif berasal dari sumber berbeda**, sehingga model bisa mencapai akurasi tinggi hanya dengan mengenali rumah sakit asal.",
      "**Model tidak pernah melihat paru-paru** dalam arti yang dimaksud, dan enam bulan kerja terpaksa diulang setelah kebocoran ini disadari.",
    ],
    footnote: "Pertanyaan \"apa sebenarnya yang dipelajari model?\" adalah kebiasaan skeptisisme yang menyelamatkan waktu.",
  },

  // ── 13: Section EDA ──
  {
    layout: "section",
    title: "EDA untuk Investigasi, Bukan Daftar",
    body: "Exploratory Data Analysis sering diajarkan seperti daftar langkah, padahal praktik yang benar dipandu oleh pertanyaan. Setiap angka atau plot yang Anda lihat harus memicu pertanyaan baru, bukan tanda centang.",
    footnote: "Kerangka yang produktif menyusun pertanyaan dalam tiga lapis berurutan.",
  },

  // ── 14: Grid 3 lapis EDA ──
  {
    layout: "grid",
    title: "Tiga Lapis Pertanyaan dalam EDA",
    body: "Ketiga lapis disusun dari integritas dasar menuju hubungan tersembunyi, sehingga setiap lapis membangun di atas temuan lapis sebelumnya:",
    gridItems: [
      {
        title: "Lapis 1 - Bentuk & Integritas",
        body: "Lapis ini memeriksa jumlah baris dan kolom, nilai hilang, tipe data, dan duplikasi. Untuk data gambar atau audio, ia memastikan semua file terbaca dan dimensinya seragam.",
      },
      {
        title: "Lapis 2 - Distribusi & Anomali",
        body: "Lapis ini memeriksa distribusi kolom numerik dan kategorikal, tingkat imbalance target, serta nilai yang tidak masuk akal seperti umur negatif atau tanggal di masa depan.",
      },
      {
        title: "Lapis 3 - Hubungan & Hal Tak Terduga",
        body: "Lapis ini memeriksa korelasi antar fitur dan dengan target, perbedaan distribusi train vs test, dan pola temporal yang tidak diharapkan. Korelasi di atas 0.95 dengan target sering menandakan leakage.",
      },
    ],
    footnote: "Laporan otomatis seperti ydata-profiling menunjukkan apa; Anda yang bertanya mengapa.",
  },

  // ── 15: Section Jenis leakage ──
  {
    layout: "section",
    title: "Lima Jenis Data Leakage",
    body: "Data leakage adalah masuknya informasi ke training yang seharusnya tidak tersedia pada waktu prediksi. Lima jenis berikut mencakup hampir semua kasus yang akan Anda temui.",
    footnote: "Mengenali jenisnya membantu memilih tes deteksi dan solusi yang tepat.",
  },

  // ── 16: Image fig04a ──
  {
    layout: "image",
    title: "Lima Jenis Leakage dan Cara Mendeteksinya",
    imageUrl: "/figures/fig04a_data_leakage.svg",
    caption: "Gambar ini merangkum lima jenis data leakage beserta tanda-tanda awal dan cara deteksinya: target leakage, train-test contamination, temporal leakage, group leakage, dan preprocessing leakage. Setiap jenis punya penyebab dan tes cepat yang berbeda, sehingga diagnosis yang tepat menentukan solusi yang tepat.",
    footnote: "Tanda umum semua leakage adalah akurasi yang terlalu bagus dibanding ekspektasi wajar.",
  },

  // ── 17: Bullets leakage 1-3 ──
  {
    layout: "bullets",
    title: "Leakage 1 sampai 3: Target, Contamination, Temporal",
    body: "Dari gambar tersebut, tiga jenis pertama menyangkut fitur yang berasal dari target dan baris yang tercampur antar split:",
    bullets: [
      "**Target leakage** terjadi saat fitur dihitung dari atau setelah target, misalnya total_payments untuk prediksi default kredit yang baru tersedia setelah pinjaman berakhir.",
      "**Train-test contamination** terjadi saat baris yang sama ada di train dan test, sering karena split dilakukan setelah proses yang menciptakan duplikasi.",
      "**Temporal leakage** terjadi saat data masa depan masuk ke prediksi masa lalu, dan solusinya adalah split berdasarkan waktu, bukan acak.",
    ],
    footnote: "Tes cepat target leakage: latih model dengan satu fitur itu saja - jika akurasi sudah tinggi, curigai.",
  },

  // ── 18: Bullets leakage 4-5 ──
  {
    layout: "bullets",
    title: "Leakage 4 dan 5: Group dan Preprocessing",
    body: "Dua jenis terakhir menyangkut subjek yang sama di kedua split dan statistik preprocessing yang dihitung dari seluruh data:",
    bullets: [
      "**Group leakage** terjadi saat data dari subjek yang sama, misalnya pasien dengan beberapa rontgen, tersebar ke train dan test - solusinya split berdasarkan grup.",
      "**Preprocessing leakage** terjadi saat mean dan std untuk normalisasi dihitung dari seluruh dataset termasuk test, sehingga distribusi fitur test bocor ke training.",
      "**Solusi preprocessing leakage** adalah fit hanya pada train lalu transform train dan test memakai parameter yang sudah di-fit.",
    ],
    footnote: "Group leakage membuat val acc tinggi tetapi performa pada subjek baru rendah.",
  },

  // ── 19: Section Pipeline aman ──
  {
    layout: "section",
    title: "Verifikasi Pipeline: Fit Hanya pada Train",
    body: "Pipeline preprocessing harus fit pada training set saja, lalu transform train, val, dan test dengan parameter yang sudah di-fit. Aturan ini mencegah statistik test bocor ke training.",
    footnote: "Efeknya kecil di dataset besar yang stabil, tetapi nyata di dataset kecil atau heterogen.",
  },

  // ── 20: Split salah vs benar ──
  {
    layout: "split",
    title: "Salah vs Benar: Urutan Fit dan Split",
    body: "Perbedaan satu urutan operasi menentukan apakah pipeline Anda bocor atau bersih. Bandingkan kedua urutan ini:",
    left: {
      title: "Salah - Fit Sebelum Split",
      body: "scaler.fit_transform(X_all) dipanggil sebelum split.\n\nMean dan std dihitung dari seluruh data termasuk test.\n\nModel menerima input yang dinormalisasi memakai informasi agregat test, sehingga distribusi test bocor.",
    },
    right: {
      title: "Benar - Split lalu Fit Train",
      body: "X_train dan X_test dipisah lebih dulu.\n\nscaler.fit_transform(X_train) hanya melihat data train.\n\nscaler.transform(X_test) memakai parameter train, sehingga test tidak pernah memengaruhi statistik normalisasi.",
    },
    footnote: "sklearn.pipeline.Pipeline dan ColumnTransformer memastikan urutan fit/transform ini terjaga otomatis.",
  },

  // ── 21: Section Domain shift ──
  {
    layout: "section",
    title: "Domain Shift: Saat Distribusi Berubah",
    body: "Data di dunia nyata sering berbeda dari data training. Mengenali bentuk perubahannya penting karena tiga bentuk shift menuntut solusi yang berbeda.",
    footnote: "Diagnosis awal selalu sama: bandingkan histogram tiap fitur antara train dan produksi.",
  },

  // ── 22: Grid 3 shift ──
  {
    layout: "grid",
    title: "Tiga Bentuk Perubahan Distribusi",
    body: "Ketiga shift berbeda pada bagian distribusi mana yang berubah dan seberapa sulit ditangani:",
    gridItems: [
      {
        title: "Covariate Shift",
        body: "Distribusi fitur P(x) berubah tetapi hubungan P(y|x) tetap. Contohnya model daun penyakit dilatih di musim kemarau lalu dipakai di musim hujan dengan warna pixel bergeser.",
      },
      {
        title: "Label Shift",
        body: "Distribusi target P(y) berubah tetapi P(x|y) tetap. Contohnya detektor spam dilatih saat spam 5% lalu dipakai saat campaign membuat spam 30%, sehingga threshold default menghasilkan banyak false negative.",
      },
      {
        title: "Concept Drift",
        body: "Hubungan P(y|x) itu sendiri berubah, sehingga fitur input identik bisa berlabel berbeda. Ini paling sulit ditangani dan biasanya butuh re-training periodik.",
      },
    ],
    footnote: "Uji Kolmogorov-Smirnov dapat membuat deteksi perbedaan distribusi menjadi lebih formal.",
  },

  // ── 23: Section Etika ──
  {
    layout: "section",
    title: "Negative Results Wajib Dicatat",
    body: "Data yang valid secara teknis belum tentu adil secara etis, dan ada satu kewajiban yang langsung terkait reproducibility: melaporkan hasil negatif. Krisis reproduksibilitas di ML sebagian dipicu oleh publication bias.",
    footnote: "Hasil positif dipublikasikan, hasil negatif tidak, sehingga banyak tim membuang waktu di arah yang sama.",
  },

  // ── 24: Bullets negative results ──
  {
    layout: "bullets",
    title: "Mendokumentasikan yang Gagal di Lab Sendiri",
    body: "Dalam lingkup lab Anda, melaporkan hasil negatif adalah praktik sederhana yang melindungi reputasi riset:",
    bullets: [
      "**Setiap folder eksperimen punya catatan** berupa README atau notes, bahkan ketika eksperimennya gagal mencapai hipotesis.",
      "**Hasil seperti \"focal loss tidak membantu\"** tetap bernilai karena menjadi satu titik data tentang batas efektivitas sebuah teknik.",
      "**Portofolio yang sehat berisi campuran** hasil positif dan negatif - jika semuanya positif, kemungkinan Anda hanya melaporkan yang berhasil.",
    ],
    footnote: "PI lebih percaya pada asisten yang berkata \"tiga arah dicoba, dua gagal\" daripada yang hanya menampilkan keberhasilan.",
  },

  // ── 25: Section Worked Example ──
  {
    layout: "section",
    title: "Worked Example: Audit Dataset PathMNIST",
    body: "PathMNIST adalah dataset histopatologi kolon dengan sembilan kelas dan resolusi 28x28. Sebelum melatih model apapun, kita mengaudit dataset ini lewat enam pemeriksaan berurutan.",
    footnote: "Audit ditulis ke experiments/lab4/audit.md dan dibaca bersama protokol eksperimen.",
  },

  // ── 26: Bullets audit steps ──
  {
    layout: "bullets",
    title: "Tiga Pemeriksaan Awal Audit Dataset",
    body: "Audit dimulai dari struktur dasar lalu naik ke distribusi dan kebocoran antar split:",
    bullets: [
      "**Struktur dan ukuran** diperiksa dengan menghitung jumlah sampel per split dan memeriksa bentuk satu sampel, misalnya 90 ribu train dengan gambar 28x28.",
      "**Distribusi kelas** dihitung per split, lalu rasio kelas terbanyak terhadap terkecil menentukan apakah imbalance moderat di atas 5x atau ekstrem di atas 10x.",
      "**Visualisasi sampel** menampilkan beberapa gambar per kelas untuk menilai kewajaran tugas dan menangkap anomali seperti gambar hitam atau kosong.",
    ],
    footnote: "Inspeksi visual sering menangkap masalah yang tidak terlihat dari statistik ringkas.",
  },

  // ── 27: Code MD5 overlap ──
  {
    layout: "code",
    title: "Cek Leakage: Overlap Hash Antar Split",
    body: "Untuk mendeteksi train-test contamination, hitung hash MD5 setiap gambar lalu cari irisan antar split:",
    lang: "python",
    code: `def image_hash(img):
    return hashlib.md5(np.array(img).tobytes()).hexdigest()

train_h = {image_hash(x) for x, _ in train_ds}
test_h  = {image_hash(x) for x, _ in test_ds}

print('Train-test overlap:', len(train_h & test_h))`,
    footnote: "Untuk dataset publik matang overlap biasanya 0, tetapi periksa selalu - jangan percaya begitu saja.",
  },

  // ── 28: Bullets laporan audit ──
  {
    layout: "bullets",
    title: "Audit Berakhir dengan Keputusan, Bukan Hanya Temuan",
    body: "Laporan audit yang berguna menerjemahkan temuan menjadi keputusan eksperimen yang konkret:",
    bullets: [
      "**Temuan distribusi dan overlap** dicatat apa adanya, misalnya imbalance sekitar 4x dan overlap antar split nol.",
      "**Keputusan preprocessing** mengikuti temuan, misalnya normalisasi per channel dengan statistik training dan augmentasi ringan rotasi 15 derajat.",
      "**Pilihan metrik** dibenarkan oleh data, misalnya F1 macro dipilih karena imbalance moderat antar sembilan kelas.",
    ],
    footnote: "Audit yang berhenti di temuan tanpa keputusan belum menyelesaikan tugasnya.",
  },

  // ── 29: Section Pitfalls ──
  {
    layout: "section",
    title: "Pitfalls & Miskonsepsi",
    body: "Beberapa keyakinan yang terasa aman justru menunda pemeriksaan data yang penting. Mengenalinya lebih awal mencegah eksperimen turunan yang bergantung pada metrik palsu.",
    footnote: "Sebagian besar berakar pada anggapan bahwa data sudah bersih dan tidak perlu diperiksa ulang.",
  },

  // ── 30: Pitfalls 1-3 ──
  {
    layout: "bullets",
    title: "Tiga Keyakinan tentang Data yang Perlu Diluruskan",
    body: "Ketiga keyakinan berikut terdengar wajar tetapi sering menyesatkan saat bekerja dengan data nyata:",
    bullets: [
      "**\"EDA cukup sekali di awal\"** keliru karena setiap kali Anda mengubah subset atau menambah sumber, distribusi bisa bergeser dan EDA perlu diulang.",
      "**\"Periksa leakage nanti\"** biasanya berarti tidak pernah - leakage harus diperiksa sebelum run training pertama.",
      "**\"Dataset publik sudah bersih\"** hampir tidak pernah benar, karena ImageNet punya label salah dan dataset medis sering punya patient leakage.",
    ],
    footnote: "Akurasi tinggi akibat leakage membuat seluruh eksperimen turunan bergantung pada metrik palsu.",
  },

  // ── 31: Pitfalls 4-6 ──
  {
    layout: "bullets",
    title: "Tiga Keyakinan tentang Penanganan yang Perlu Diluruskan",
    body: "Tiga keyakinan berikutnya menyangkut imbalance, normalisasi, dan inspeksi test set:",
    bullets: [
      "**\"Imbalance berarti harus SMOTE\"** tidak selalu - imbalance yang sesuai realita adalah informasi valid, dan oversampling bisa menurunkan performa di distribusi sebenarnya.",
      "**\"Normalisasi di awal sudah aman\"** perlu dicek - jika fit_transform dipanggil pada seluruh data sebelum split, Anda punya preprocessing leakage.",
      "**\"Test set tidak perlu diinspeksi\"** salah, karena test set yang distribusinya menyimpang dari produksi membuat hasil tidak bisa diekstrapolasi.",
    ],
    footnote: "Sebelum mengurangi parameter karena overfitting, periksa dulu apakah training set bersih dari label salah.",
  },

  // ── 32: Bullets Lab W6 ──
  {
    layout: "bullets",
    title: "Lab W6: Audit EDA dan Demonstrasi Temporal Leakage",
    body: "Dua lab minggu ini melatih audit data menyeluruh sekaligus mengukur dampak leakage secara langsung:",
    bullets: [
      "**Lab EDA** menjalankan tiga lapis EDA pada PathMNIST, cek overlap antar split dengan hashing, dan membangun pipeline fit-only-on-train.",
      "**Lab temporal leakage** membandingkan pipeline causal dan leaky pada data sensor, lalu menghitung leakage inflation sebagai F1 leaky dikurangi F1 causal.",
      "**Threshold peringatan** modul ini adalah inflation 0.05 absolut atau 10% relatif sebagai leakage signifikan yang wajib dilaporkan eksplisit.",
    ],
    footnote: "Luaran utama adalah audit.md satu halaman dan tabel perbandingan F1 causal vs leaky.",
  },

  // ── 33: Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum lanjut ke W7, renungkan tiga pertanyaan yang menguji kewaspadaan data Anda:",
    bullets: [
      "Saat mewarisi proyek dengan akurasi test terlaporkan 91%, tiga pemeriksaan apa yang Anda lakukan sebelum memakai ulang angka itu di laporan sendiri?",
      "Saat model mencapai 99% akurasi di hari pertama, lima hipotesis apa yang paling mungkin, diurutkan dari yang paling membosankan ke yang paling tak terduga?",
      "Jika dataset punya ID pasien dengan beberapa slide per pasien, protokol split apa yang benar dan mengapa random split biasa akan gagal?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - ketiganya kembali relevan saat memilih dataset capstone.",
  },

  // ── 34: Lanjut W7 ──
  {
    layout: "bullets",
    title: "Lanjut ke W7: Teks, Transformer, dan Repo Adoption",
    body: "Dengan W6 selesai, Anda punya kewaspadaan data yang solid. W7 memperluas Big Map ke domain teks dan memperkenalkan alat baru:",
    bullets: [
      "**Pretrained Transformer** masuk sebagai alat, dan W7 membahas mekanisme attention beserta cara memilih antara freeze dan fine-tune.",
      "**Repo adoption** melatih cara membaca dan memodifikasi repo riset yang belum dikenal, termasuk memverifikasi kode yang ditulis AI.",
      "**Disiplin validasi data** dari W6 tetap berlaku, karena teks juga rawan leakage lewat duplikasi dokumen dan kontaminasi pretraining.",
    ],
    footnote: "Kewaspadaan terhadap kontaminasi pretraining menjadi tema baru saat memakai model pretrained di W7.",
  },

  // ── 35: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W6",
    body: "Semua konsep di presentasi ini ada dalam lab notebook lengkap: audit EDA tiga lapis, cek overlap hashing, pipeline fit-only-on-train, dan demonstrasi inflasi leakage temporal.\n\nEstimasi waktu: 4-6 jam termasuk audit dataset dan perbandingan pipeline causal vs leaky.",
    ctaText: "Buka Lab W6 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w6_temporal_leakage.ipynb",
  },
];

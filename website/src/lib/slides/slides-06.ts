import type { SlideSection } from "./index";

export const slides06: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W6: Representations & Temporal Leakage",
    subtitle: "Memeriksa data sebelum mempercayai metrik: memilih representasi yang valid secara temporal, dan menemukan kebocoran yang membuat angka bagus tetapi salah.",
    footnote: "Bab 06 - Minggu 6",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Enam materi minggu ini mengikuti alur kerja memeriksa data, dari pilihan representasi sampai laporan audit:",
    gridItems: [
      {
        title: "1. Representasi untuk Sequence",
        body: "Kita memakai lagi tiga strategi representasi W3 pada sensor, kini dengan dimensi temporal yang harus dijaga.",
      },
      {
        title: "2. Temporal Leakage",
        body: "Kita membedah satu pipeline yang tampak wajar tetapi membocorkan informasi masa depan ke training.",
      },
      {
        title: "3. EDA sebagai Investigasi",
        body: "Kita memeriksa data lewat tiga lapis pertanyaan, bukan daftar langkah yang dicentang.",
      },
      {
        title: "4. Lima Jenis Leakage",
        body: "Kita mengenali lima jenis leakage beserta tanda awal dan tes cepat untuk mendeteksinya.",
      },
      {
        title: "5. Pipeline yang Aman",
        body: "Kita membangun pipeline yang fit hanya pada train, lalu mengenali tiga bentuk domain shift.",
      },
      {
        title: "6. Audit dan Pelaporan",
        body: "Kita mengaudit PathMNIST lalu menulis laporan yang berisi keputusan eksperimen, termasuk hasil negatif.",
      },
    ],
  },

  // -- 3: Recap W5 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W5)",
    body: "W5 membangun dan mendiagnosis arsitektur recurrent. Outputnya menjadi kebiasaan yang dipakai minggu ini:",
    bullets: [
      "Kita membangun RNN dan LSTM untuk data sequence (T, F) dan mendiagnosis gradient flow-nya.",
      "Output yang dibawa: kebiasaan mencurigai angka evaluasi yang terlalu bagus dan menelusuri dari mana angka itu berasal.",
      "W5 sudah menyebut temporal leakage sebagai salah satu bug; minggu ini bug itu dibahas penuh.",
    ],
    footnote: "Disiplin trace result dari W4 tetap dipakai: tiap audit ditulis ke folder dengan catatan yang bisa dicek ulang.",
  },

  // ============ MATERI 1: Representasi untuk Sequence ============

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Representasi Fitur untuk Sequence dan Sensor",
    body: "Materi pertama memeriksa dari mana fitur model berasal. Sebelum representasi dipilih, deret sensor dipotong dulu menjadi window, lalu tiga strategi dari W3 - engineered, extracted, learned - dipakai lagi dengan dimensi temporal yang harus dijaga.",
    footnote: "Definisi lengkap ketiga strategi ada di W3 dan tidak diulang minggu ini.",
  },

  // -- 5: Image windowing (image-before-text) --
  {
    layout: "image",
    title: "Window: memotong deret jadi unit temporal",
    imageUrl: "/figures/fig06e_windowing.png",
    caption: "Gambar ini menunjukkan satu deret time series panjang yang dipotong menjadi window berukuran tetap. Window size W menentukan panjang tiap potongan, dan stride S menentukan jarak geser antar window. Saat stride lebih kecil dari window size, window berurutan saling tumpang tindih.",
    footnote: "Tiap window menjadi satu unit temporal: satu sampel dengan satu label yang diambil dari timestamp terakhir window.",
  },

  // -- 6: Penjelasan window --
  {
    layout: "bullets",
    title: "Window: satu unit temporal",
    body: "Dari gambar tadi, deret sensor yang panjang tidak dipakai utuh, melainkan dipotong dulu menjadi window sebelum representasi apa pun dipilih:",
    bullets: [
      "**Window size (W)** menentukan berapa timestamp berurutan masuk ke satu potongan, dan **stride (S)** menentukan jarak geser ke window berikutnya.",
      "**Sliding window** terjadi saat S < W sehingga window saling tumpang tindih, sedangkan **tumbling window** terjadi saat S = W sehingga tidak ada tumpang tindih.",
      "**Window punya rentang waktu**, jadi satu window tidak boleh melewati batas train-test, karena isinya akan mencampur kedua sisi dan memicu leakage.",
    ],
    footnote: "Contoh: sinyal 100 Hz dengan W=200 dan S=100 menghasilkan sekitar 59 window per menit, masing-masing berbentuk (200, channel).",
  },

  // -- 7: Tabel tiga strategi + risiko leakage --
  {
    layout: "table",
    title: "Tiga strategi, satu kolom baru",
    body: "Yang baru di sensor adalah kolom risiko leakage, karena fitur bisa membawa nilai dari masa depan tanpa disadari:",
    tableHead: ["Strategi", "Contoh di sensor", "Risiko leakage"],
    tableRows: [
      ["Engineered", "Mean, variance, FFT dari window", "Tinggi jika window lewat batas temporal"],
      ["Extracted", "Hidden states model pretrained (freeze)", "Sedang; cek overlap data pretraining"],
      ["Learned", "LSTM end-to-end dari sinyal mentah", "Rendah jika split temporal benar"],
    ],
    footnote: "Fitur engineered seperti rolling mean dihitung dari window yang membentang ke belakang dalam waktu.",
  },

  // ============ MATERI 2: Temporal Leakage (Pola A) ============

  // -- 8: Materi 2 --
  {
    layout: "section",
    title: "2. Temporal Leakage",
    body: "Temporal leakage terjadi ketika informasi dari masa depan masuk ke prediksi masa lalu. Kita mulai dari satu pipeline yang sering ditulis dan tampak wajar.",
    footnote: "Datanya sensor suhu mesin industri dengan label failure, fitur rolling mean 24 jam, lalu split acak.",
  },

  // -- 9: Pipeline yang bocor (code) --
  {
    layout: "code",
    title: "Pipeline yang tampak wajar tetapi bocor",
    body: "Kode berikut terlihat seperti praktik standar, tetapi kombinasi rolling feature dan random split membocorkan informasi masa depan:",
    lang: "python",
    code: `df['rolling_mean_24h'] = df['temperature'].rolling(24).mean()

# SALAH - split acak, bukan temporal
X_train, X_test = train_test_split(df, test_size=0.2,
                                   shuffle=True)`,
    footnote: "Dua keputusan ini bersama-sama membuat data setelah titik test ikut terlihat saat training.",
  },

  // -- 10: Dua sumber kebocoran --
  {
    layout: "bullets",
    title: "Dua sumber kebocoran dalam satu pipeline",
    body: "Kode tadi mengandung dua masalah, dan masing-masing cukup untuk membuat metrik menipu:",
    bullets: [
      "Random split membuat sampel jam 14:00 masuk train sementara sampel jam 13:00 hari yang sama masuk test, sehingga model melihat data setelah titik test.",
      "Rolling feature melampaui batas, karena nilai pada titik T dihitung dari T-23 hingga T, sehingga fitur training bisa memuat nilai yang ada di test set.",
      "Akibatnya model mencapai F1 = 0.92 saat evaluasi, tetapi hanya F1 = 0.63 saat dipakai di produksi.",
    ],
    footnote: "Selisih 0.29 inilah harga temporal leakage, dan baru terlihat setelah model dipakai.",
  },

  // -- 11: Image split (image-before-text) --
  {
    layout: "image",
    title: "Split temporal yang benar vs data leakage",
    imageUrl: "/figures/fig06c_train_val_leakage.png",
    caption: "Gambar ini membandingkan pembagian train-val-test yang benar dengan yang bocor. Pada split temporal yang benar, data lama dipakai untuk training dan data baru untuk test sesuai urutan waktu. Pada random split, sampel dari periode waktu yang sama tersebar ke train dan test, sehingga informasi temporal bocor ke training.",
    footnote: "Cutoff berbasis quantile timestamp menjaga seluruh data train berada sebelum seluruh data test.",
  },

  // -- 12: Solusi causal (code) --
  {
    layout: "code",
    title: "Pipeline yang benar: split berbasis waktu",
    body: "Dari gambar tersebut, solusinya membagi data berdasarkan waktu dan menghitung rolling feature secara causal:",
    lang: "python",
    code: `cutoff = df['timestamp'].quantile(0.8)  # 80% awal untuk train
train = df[df['timestamp'] <= cutoff]
test  = df[df['timestamp'] > cutoff]

# Rolling feature causal:
# - tidak ada data masa depan dalam window
# - window tidak melampaui batas cutoff`,
    footnote: "Lab 6 menampilkan selisih ini eksplisit: F1 dengan leakage vs tanpa leakage pada dataset yang sama.",
  },

  // -- 13: Kenapa angka bocor berbahaya (kalimat kunci topik) --
  {
    layout: "bullets",
    title: "Mengapa angka bocor berbahaya",
    body: "Bahaya leakage bukan pada angka yang jelas mencurigakan, tetapi pada angka yang tampak masuk akal:",
    bullets: [
      "Leakage jarang menghasilkan F1 = 1.0 yang langsung mencurigakan, tetapi angka seperti 0.88 yang masuk akal dan lolos review.",
      "Yang salah bukan angkanya, tetapi cara mendapatkannya, sehingga pipeline yang bocor menghasilkan metrik yang tidak bisa direproduksi di produksi.",
      "Skeptisisme terhadap angka sendiri adalah kebiasaan riset minggu ini, dan menelusuri asal angka mencegah kerja sia-sia.",
    ],
    footnote: "Angka bocor selalu terlihat lebih menarik, dan itulah persis bahayanya.",
  },

  // ============ MATERI 3: EDA sebagai Investigasi ============

  // -- 14: Materi 3 --
  {
    layout: "section",
    title: "3. EDA sebagai Investigasi",
    body: "EDA sering diajarkan sebagai daftar langkah yang dicentang, padahal praktik yang benar dipandu pertanyaan. Setiap angka atau plot yang muncul memicu pertanyaan baru.",
    footnote: "Kerangka yang produktif menyusun pertanyaan dalam tiga lapis berurutan.",
  },

  // -- 15: Tiga lapis EDA --
  {
    layout: "grid",
    title: "Tiga lapis pertanyaan dalam EDA",
    body: "Ketiga lapis disusun dari integritas dasar menuju hubungan tersembunyi, dan tiap lapis membangun di atas temuan sebelumnya:",
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
        body: "Lapis ini memeriksa korelasi antar fitur dan dengan target, perbedaan distribusi train vs test, dan pola temporal. Korelasi di atas 0.95 dengan target sering menandakan leakage.",
      },
    ],
    footnote: "Laporan otomatis seperti ydata-profiling menunjukkan apa; Anda yang bertanya mengapa.",
  },

  // ============ MATERI 4: Lima Jenis Data Leakage (Pola A) ============

  // -- 16: Materi 4 --
  {
    layout: "section",
    title: "4. Lima Jenis Data Leakage",
    body: "Data leakage adalah masuknya informasi ke training yang seharusnya tidak tersedia pada waktu prediksi. Lima jenis berikut mencakup hampir semua kasus.",
    footnote: "Mengenali jenisnya menentukan tes deteksi dan solusi yang tepat.",
  },

  // -- 17: Image lima jenis leakage (image-before-text) --
  {
    layout: "image",
    title: "Lima jenis leakage dan cara mendeteksinya",
    imageUrl: "/figures/fig04a_data_leakage.svg",
    caption: "Gambar ini merangkum lima jenis data leakage beserta tanda awal dan cara deteksinya: target leakage, train-test contamination, temporal leakage, group leakage, dan preprocessing leakage. Setiap jenis punya penyebab dan tes cepat yang berbeda.",
    footnote: "Tanda umum semua leakage adalah akurasi yang terlalu bagus dibanding ekspektasi wajar.",
  },

  // -- 18: Leakage 1-3 --
  {
    layout: "bullets",
    title: "Leakage 1 sampai 3: target, contamination, temporal",
    body: "Dari gambar tersebut, tiga jenis pertama menyangkut fitur yang berasal dari target dan baris yang tercampur antar split:",
    bullets: [
      "Target leakage terjadi saat fitur dihitung dari atau setelah target, misalnya total_payments untuk prediksi default kredit yang baru tersedia setelah pinjaman berakhir.",
      "Train-test contamination terjadi saat baris yang sama ada di train dan test, sering karena split dilakukan setelah proses yang menciptakan duplikasi.",
      "Temporal leakage terjadi saat data masa depan masuk ke prediksi masa lalu, dan solusinya adalah split berdasarkan waktu, bukan acak.",
    ],
    footnote: "Tes cepat target leakage: latih model dengan satu fitur itu saja - kalau akurasi sudah tinggi, curigai.",
  },

  // -- 19: Leakage 4-5 --
  {
    layout: "bullets",
    title: "Leakage 4 dan 5: group dan preprocessing",
    body: "Dua jenis terakhir menyangkut subjek yang sama di kedua split dan statistik yang dihitung dari seluruh data:",
    bullets: [
      "Group leakage terjadi saat data dari subjek yang sama, misalnya pasien dengan beberapa rontgen, tersebar ke train dan test - solusinya split berdasarkan grup.",
      "Preprocessing leakage terjadi saat mean dan std normalisasi dihitung dari seluruh dataset termasuk test, sehingga distribusi fitur test bocor ke training.",
      "Solusi preprocessing leakage adalah fit hanya pada train lalu transform train dan test memakai parameter yang sudah di-fit.",
    ],
    footnote: "Group leakage membuat val acc tinggi tetapi performa pada subjek baru rendah.",
  },

  // ============ MATERI 5: Pipeline yang Aman ============

  // -- 20: Materi 5 --
  {
    layout: "section",
    title: "5. Pipeline Pra-pemrosesan yang Aman",
    body: "Pipeline pra-pemrosesan harus fit pada training set saja, lalu transform train, val, dan test dengan parameter yang sudah di-fit. Aturan ini menutup preprocessing leakage.",
    footnote: "Label test memang tidak bocor, tetapi distribusi fitur test bisa bocor lewat statistik normalisasi.",
  },

  // -- 21: Salah vs benar (split) --
  {
    layout: "split",
    title: "Salah vs benar: urutan fit dan split",
    body: "Perbedaan satu urutan operasi menentukan apakah pipeline bocor atau bersih. Bandingkan kedua urutan ini:",
    left: {
      title: "Salah - fit sebelum split",
      body: "scaler.fit_transform(X_all) dipanggil sebelum split.\n\nMean dan std dihitung dari seluruh data termasuk test.\n\nModel menerima input yang dinormalisasi memakai informasi agregat test, sehingga distribusi test bocor.",
    },
    right: {
      title: "Benar - split lalu fit train",
      body: "X_train dan X_test dipisah lebih dulu.\n\nscaler.fit_transform(X_train) hanya melihat data train.\n\nscaler.transform(X_test) memakai parameter train, sehingga test tidak pernah memengaruhi statistik normalisasi.",
    },
    footnote: "sklearn.pipeline.Pipeline dan ColumnTransformer menjaga urutan fit/transform ini secara otomatis.",
  },

  // -- 22: Image tiga bentuk domain shift (image-before-text) --
  {
    layout: "image",
    title: "Tiga bentuk domain shift",
    imageUrl: "/figures/fig06d_domain_shift.png",
    caption: "Gambar ini membandingkan tiga bentuk domain shift lewat distribusi yang berubah. Pada covariate shift, distribusi fitur P(x) bergeser sementara batas keputusan tetap. Pada label shift, proporsi kelas P(y) berubah sementara tampilan tiap kelas tetap. Pada concept drift, input identik bisa berlabel berbeda karena aturan fitur ke target P(y|x) berubah.",
    footnote: "Diagnosis awal ketiganya sama: bandingkan histogram tiap fitur antara train dan produksi, lalu uji KS untuk lebih formal.",
  },

  // -- 23: Domain shift --
  {
    layout: "grid",
    title: "Tiga bentuk domain shift",
    body: "Dari gambar tersebut, ketiga shift menuntut solusi berbeda meski pipeline sudah bersih:",
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
    footnote: "Diagnosis awal ketiganya sama: bandingkan histogram tiap fitur antara train dan produksi, lalu uji KS untuk lebih formal.",
  },

  // ============ MATERI 6: Audit dan Pelaporan ============

  // -- 24: Materi 6 --
  {
    layout: "section",
    title: "6. Audit Dataset dan Pelaporan",
    body: "Audit menjalankan EDA tiga lapis dan cek leakage pada satu dataset nyata, lalu menutupnya dengan laporan berisi keputusan. Worked example memakai PathMNIST: histopatologi kolon, sembilan kelas, resolusi 28x28.",
    footnote: "Audit ditulis ke experiments/lab4/audit.md dan dibaca bersama protokol eksperimen W4.",
  },

  // -- 25: Empat pemeriksaan audit --
  {
    layout: "bullets",
    title: "Empat pemeriksaan audit dataset",
    body: "Audit naik bertahap dari struktur dasar ke kebocoran antar split:",
    bullets: [
      "Struktur dan distribusi diperiksa lebih dulu: jumlah sampel per split, bentuk satu sampel, dan rasio kelas terbanyak terhadap terkecil untuk menilai imbalance.",
      "Visualisasi beberapa gambar per kelas menilai kewajaran tugas dan menangkap anomali seperti gambar hitam atau kosong yang tidak terlihat dari statistik.",
      "Cek overlap antar split dengan image hashing mendeteksi train-test contamination, dan cek near-duplicate berlabel beda mendeteksi label tidak konsisten.",
    ],
    footnote: "Untuk dataset publik matang overlap biasanya 0, tetapi periksa selalu - jangan percaya begitu saja.",
  },

  // -- 26: Cek overlap (code) --
  {
    layout: "code",
    title: "Cek leakage: overlap hash antar split",
    body: "Untuk mendeteksi train-test contamination, hitung hash MD5 tiap gambar lalu cari irisan antar split:",
    lang: "python",
    code: `def image_hash(img):
    return hashlib.md5(np.array(img).tobytes()).hexdigest()

train_h = {image_hash(x) for x, _ in train_ds}
test_h  = {image_hash(x) for x, _ in test_ds}

print('Train-test overlap:', len(train_h & test_h))`,
    footnote: "Overlap > 0 dicatat, dilaporkan, dan dipertimbangkan untuk difilter sebelum training.",
  },

  // -- 27: Audit berakhir dengan keputusan --
  {
    layout: "bullets",
    title: "Audit berakhir dengan keputusan, bukan hanya temuan",
    body: "Laporan audit yang berguna menerjemahkan tiap temuan menjadi keputusan eksperimen yang konkret:",
    bullets: [
      "Temuan distribusi dan overlap dicatat apa adanya, misalnya imbalance sekitar 4x dan overlap antar split nol.",
      "Keputusan preprocessing mengikuti temuan, misalnya normalisasi per channel dengan statistik training dan augmentasi ringan rotasi 15 derajat.",
      "Pilihan metrik dibenarkan oleh data, misalnya F1 macro dipilih karena imbalance moderat antar sembilan kelas.",
    ],
    footnote: "Audit yang berhenti di temuan tanpa keputusan belum menyelesaikan tugasnya.",
  },

  // -- 28: Catat yang gagal (ethics thread woven in) --
  {
    layout: "bullets",
    title: "Catat juga yang gagal",
    body: "Audit dan eksperimen yang gagal tetap ditulis, dan di sini sudut pandangnya etika riset:",
    bullets: [
      "Krisis reproduksibilitas di ML sebagian dipicu publication bias: hasil positif dilaporkan, hasil negatif tidak, sehingga banyak tim membuang waktu di arah yang sama.",
      "Setiap folder eksperimen punya README atau notes bahkan saat gagal, dan hasil seperti \"focal loss tidak membantu\" tetap bernilai sebagai satu titik data.",
      "Portofolio yang sehat berisi campuran hasil positif dan negatif; kalau semuanya positif, kemungkinan Anda hanya melaporkan yang berhasil.",
    ],
    footnote: "PI lebih percaya pada asisten yang berkata \"tiga arah dicoba, dua gagal\" daripada yang hanya menampilkan keberhasilan.",
  },

  // ============ LAB + REFLEKSI + BRIDGE ============

  // -- 29: Lab W6 --
  {
    layout: "bullets",
    title: "Lab W6",
    body: "Dua lab minggu ini melatih audit data menyeluruh sekaligus mengukur dampak leakage secara langsung:",
    bullets: [
      "Lab 6a menjalankan EDA tiga lapis pada PathMNIST, cek overlap antar split dengan hashing, dan membangun pipeline fit-only-on-train.",
      "Lab 6b membandingkan pipeline causal dan leaky pada data sensor, lalu menghitung leakage inflation = F1_leaky - F1_causal.",
      "Ambang modul ini: inflation >= 0.05 absolut atau >= 10% relatif dianggap signifikan dan wajib dilaporkan eksplisit.",
    ],
    footnote: "Luaran utama: audit.md satu halaman, tabel F1 causal vs leaky, dan paragraf mengapa angka bocor terlihat meyakinkan.",
  },

  // -- 30: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Tiga pertanyaan untuk dibawa ke portofolio mandiri:",
    bullets: [
      "Saat mewarisi proyek dengan akurasi test terlaporkan 91%, tiga pemeriksaan apa yang Anda lakukan sebelum memakai ulang angka itu di laporan sendiri?",
      "Saat model mencapai 99% akurasi di hari pertama, lima hipotesis apa yang paling mungkin, diurutkan dari yang paling membosankan ke yang paling tak terduga?",
      "Kalau dataset punya ID pasien dengan beberapa slide per pasien, protokol split apa yang benar dan mengapa random split biasa akan gagal?",
    ],
    footnote: "Ketiga pertanyaan kembali relevan saat memilih dataset capstone.",
  },

  // -- 31: Lanjut ke W7 --
  {
    layout: "bullets",
    title: "Lanjut ke W7",
    body: "Dengan W6 selesai, Anda punya kewaspadaan data yang solid. W7 memperluas Big Map ke domain teks:",
    bullets: [
      "Pretrained Transformer masuk sebagai alat, dan W7 membahas mekanisme attention serta cara memilih antara freeze dan fine-tune.",
      "Repo adoption melatih cara membaca dan memodifikasi repo riset yang belum dikenal, termasuk memverifikasi kode yang ditulis AI.",
      "Disiplin validasi data dari W6 tetap berlaku, karena teks juga rawan leakage lewat duplikasi dokumen dan kontaminasi pretraining.",
    ],
  },

  // -- 32: CTA --
  {
    layout: "cta",
    title: "Mulai Lab W6",
    body: "Semua konsep deck ini ada di lab notebook: audit EDA tiga lapis, cek overlap hashing, pipeline fit-only-on-train, dan demonstrasi inflasi leakage temporal.\n\nEstimasi waktu 4-6 jam termasuk audit dataset dan perbandingan pipeline causal vs leaky.",
    ctaText: "Buka Lab W6 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w6_temporal_leakage.ipynb",
  },
];

import type { SlideSection } from "./index";

export const slides05: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W5: Sequences - RNN & LSTM",
    subtitle: "Memahami vanishing gradient secara konkret, membaca mekanisme gate LSTM, dan memilih arsitektur recurrent berdasarkan panjang dependensi.",
    body: "Presentasi ini dirancang sebagai sumber mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 05 - Minggu 5",
  },

  // ── 2: Peta W5 ──
  {
    layout: "section",
    title: "Peta W5",
    body: "W5 memperluas Big Map ke domain sequence. Minggu ini Anda memahami tiga keluarga output head untuk sequence, membangun RNN dan LSTM, melihat vanishing gradient dalam satu perbandingan konkret, lalu memilih arsitektur berdasarkan panjang dependensi.",
    footnote: "Baris peta besar minggu ini adalah (T, F) -> (1,), (N,), (T'', 1).",
  },

  // ── 3: Dari W4 ke W5 ──
  {
    layout: "bullets",
    title: "Dari W4 ke W5: Masuk ke Domain Sequence",
    body: "W4 membangun disiplin alur kerja eksperimen; W5 memakai disiplin itu pada arsitektur baru yang memperlakukan urutan sebagai informasi. Tiga hal menjadi fokus minggu ini:",
    bullets: [
      "**Tensor sequence** berbentuk (T, F) masuk sebagai input, dengan T sebagai panjang waktu dan F jumlah fitur per timestep.",
      "**Kebiasaan riset** yang dilatih minggu ini adalah diagnosis sequence panjang dan menulis justifikasi pilihan arsitektur secara konkret.",
      "**Lab 3b wajib** di W5 karena sekaligus memenuhi Breadth Check untuk keluarga RNN/LSTM, salah satu dari lima keluarga arsitektur.",
    ],
    footnote: "Lab utama minggu ini adalah lab_w5_lstm_sequence.ipynb.",
  },

  // ── 4: Section Motivasi ──
  {
    layout: "section",
    title: "Motivasi: Data yang Urutannya Penting",
    body: "Nilai glukosa sensor pasien jam 14:00 tidak berdiri sendiri - ia dipengaruhi makanan jam 12:00, aktivitas jam 13:00, dan tidur kemarin malam. Model yang memperlakukan setiap timestep independen kehilangan informasi ini.",
    footnote: "Arsitektur recurrent hadir karena apa yang terjadi sebelumnya mengubah makna apa yang terjadi sekarang.",
  },

  // ── 5: Tiga pertanyaan diagnostik ──
  {
    layout: "bullets",
    title: "Tiga Pertanyaan untuk Setiap Dataset Sequence",
    body: "Sebelum memilih arsitektur, jawab tiga pertanyaan ini karena jawabannya menentukan keluarga arsitektur yang tepat:",
    bullets: [
      "**Dependensi seberapa jauh?** Tanyakan apakah prediksi berikutnya butuh konteks 5 langkah atau 500 langkah, karena jarak ini menentukan apakah RNN vanilla cukup.",
      "**Output apa yang diinginkan?** Tentukan apakah Anda butuh satu angka di akhir, satu kelas, atau seluruh sequence masa depan.",
      "**Apakah urutan benar-benar bermakna?** Periksa apakah data sungguh berurutan secara kausal, atau hanya tersusun tetapi sebenarnya bisa diacak.",
    ],
    footnote: "Data yang \"berurutan\" tetapi bisa diacak tanpa kehilangan makna tidak membutuhkan arsitektur recurrent.",
  },

  // ── 6: Section BPTT ──
  {
    layout: "section",
    title: "BPTT dan Vanishing Gradient",
    body: "W5 adalah bab paling padat secara teknis sejauh ini. Sebelum menulis rumus, kita kuatkan dulu pijakannya: apa yang membuat training sequence model berbeda, dan kenapa vanishing gradient menjadi masalah serius di sini.",
    footnote: "Backpropagation Through Time adalah chain rule yang dirantai sepanjang waktu, bukan hanya antar layer.",
  },

  // ── 7: BPTT dua sumbu ──
  {
    layout: "bullets",
    title: "BPTT: Chain Rule pada Dua Sumbu",
    body: "Pada MLP, backpropagation adalah chain rule yang dirantai mundur lewat layer. Pada RNN, ada dua sumbu tempat chain rule berjalan sekaligus:",
    bullets: [
      "**Mundur ke layer dalam** berjalan sama seperti MLP, yaitu dari output ke hidden ke input pada satu timestep.",
      "**Mundur ke timestep sebelumnya** adalah hal baru di sequence model, yaitu dari h_t ke h_{t-1}, lalu ke h_{t-2}, dan seterusnya.",
      "**Backpropagation Through Time** adalah nama untuk chain rule yang dirantai sepanjang T timestep, dan jalur terpanjangnya melewati T-1 langkah.",
    ],
    footnote: "Namanya tampak menakutkan, tetapi intinya hanya chain rule yang dirantai pada sumbu waktu.",
  },

  // ── 8: Code BPTT ──
  {
    layout: "code",
    title: "BPTT untuk Sequence Tiga Timestep",
    body: "Untuk sequence 3 timestep dengan loss L, gradient terhadap W_h adalah jumlah tiga jalur, dan jalur terpanjang melewati seluruh timestep:",
    lang: "text",
    code: `dL/dW_h = dL/dh_3 · dh_3/dW_h
        + dL/dh_3 · dh_3/dh_2 · dh_2/dW_h
        + dL/dh_3 · dh_3/dh_2 · dh_2/dh_1 · dh_1/dW_h`,
    footnote: "Setiap suku adalah satu jalur perhitungan; gradient harus melewati beberapa timestep sebelum mencapai W_h.",
  },

  // ── 9: Section Vanishing ──
  {
    layout: "section",
    title: "Vanishing Gradient dalam Angka",
    body: "Setiap kali gradient melewati satu langkah mundur, ia dikalikan dengan turunan dh_t/dh_{t-1}, yang untuk RNN vanilla kira-kira sebanding dengan W_h. Setelah T langkah, gradient awal dikalikan w_h pangkat T.",
    footnote: "Vanishing gradient bukan masalah teori abstrak, melainkan konsekuensi langsung perkalian berulang di chain rule.",
  },

  // ── 10: Code tabel angka ──
  {
    layout: "code",
    title: "Apa yang Terjadi Setelah T Langkah Mundur",
    body: "Anggap w_h adalah skalar. Tabel berikut menunjukkan nilai w_h pangkat T untuk tiga nilai w_h yang berbeda:",
    lang: "text",
    code: `T (langkah)  | w_h=0.5   | w_h=0.9  | w_h=1.1
-------------|-----------|----------|--------
1            | 0.5       | 0.9      | 1.1
10           | 0.001     | 0.35     | 2.59
50           | ~9e-16    | 0.005    | 117
100          | ~8e-31    | 2.6e-5   | 13780`,
    footnote: "Dengan w_h=0.5, gradient setelah 50 langkah praktis nol; dengan w_h=1.1, ia meledak menjadi ribuan.",
  },

  // ── 11: Tiga rezim ──
  {
    layout: "bullets",
    title: "Tiga Rezim Gradient pada RNN Vanilla",
    body: "Dari tabel tersebut, besar w_h menentukan nasib gradient ketika sequence menjadi panjang:",
    bullets: [
      "**Saat |w_h| < 1**, gradient menyusut (*vanishing*) sehingga setelah 50-100 langkah gradient praktis nol dan model tidak bisa belajar dependensi panjang.",
      "**Saat |w_h| > 1**, gradient meledak (*exploding*) sehingga loss tiba-tiba menjadi NaN, dan solusinya adalah gradient clipping.",
      "**Saat |w_h| mendekati 1**, model berada di titik kritis yang stabil hanya di pinggiran dan sulit dipertahankan tanpa intervensi seperti gate LSTM atau residual connection.",
    ],
    footnote: "LSTM dirancang khusus untuk memutus rantai perkalian berulang yang menyebabkan vanishing ini.",
  },

  // ── 12: Update aditif ──
  {
    layout: "bullets",
    title: "Satu Prinsip: Pembaruan Aditif Mengurangi Perkalian Berulang",
    body: "Cara LSTM, ResNet, dan Transformer mengatasi vanishing gradient adalah prinsip yang sama, yaitu menambah jalur aditif bagi gradient:",
    bullets: [
      "**Cell state LSTM** mengikuti c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t, sehingga turunan dc_t/dc_{t-1} = f_t adalah hasil element-wise dengan forget gate, bukan perkalian matriks penuh.",
      "**Residual connection** mempelajari F(x) = H(x) - x lalu menghasilkan F(x) + x, dan penambahan x menciptakan jalur langsung bagi gradient ke layer sebelumnya.",
      "**Skip connection di Transformer** memakai bentuk aditif yang sama, sehingga memahami prinsip ini sekali cukup untuk mengenalinya di W7 dan W8.",
    ],
    footnote: "Untuk matriks W_h, ukuran yang relevan adalah eigenvalue terbesar (spectral radius), tetapi prinsipnya sama.",
  },

  // ── 13: Section RNN ──
  {
    layout: "section",
    title: "RNN Vanilla: Arsitektur Recurrent Dasar",
    body: "RNN vanilla memproses sequence satu langkah waktu demi satu. Di setiap timestep, ia menggabungkan input baru dengan hidden state sebelumnya lewat h_t = tanh(W_x x_t + W_h h_{t-1} + b).",
    footnote: "Hidden state h_t berperan sebagai memori yang diperbarui setiap langkah.",
  },

  // ── 14: Image fig05a ──
  {
    layout: "image",
    title: "RNN Vanilla vs LSTM Cell",
    imageUrl: "/figures/fig05a_rnn_vs_lstm.svg",
    caption: "Gambar ini membandingkan dua arsitektur recurrent: RNN vanilla yang di-unroll sepanjang timestep di bagian atas, dan detail mekanisme gate di dalam satu sel LSTM di bagian bawah. RNN vanilla hanya memiliki satu jalur hidden state, sedangkan LSTM menambahkan cell state terpisah beserta tiga gate yang mengatur aliran informasi.",
    footnote: "Warna amber dipakai konsisten untuk keluarga RNN/LSTM di seluruh modul.",
  },

  // ── 15: Bullets RNN ──
  {
    layout: "bullets",
    title: "Membaca Persamaan RNN Vanilla",
    body: "Dari gambar tersebut, persamaan h_t = tanh(W_x x_t + W_h h_{t-1} + b) menggabungkan tiga komponen di setiap timestep:",
    bullets: [
      "**W_x x_t** memproyeksikan input baru pada timestep t ke ruang hidden, dengan W_x berukuran (d_h, F).",
      "**W_h h_{t-1}** adalah perkalian matriks hidden-to-hidden yang membawa memori dari langkah sebelumnya, dan inilah sumber perkalian berulang penyebab vanishing.",
      "**tanh** menjaga h_t berada di rentang (-1, 1), sehingga hidden state tidak meledak ke nilai besar.",
    ],
    footnote: "Untuk sequence classification, output diambil dari h_T; untuk forecasting, output dihitung di setiap timestep.",
  },

  // ── 16: Section LSTM ──
  {
    layout: "section",
    title: "LSTM: Gate sebagai Solusi",
    body: "LSTM memperkenalkan cell state c_t yang terpisah dari hidden state, beserta tiga gate yang menentukan informasi mana yang dipertahankan atau ditulis. Sebuah gate adalah vektor bernilai 0 sampai 1 yang dikalikan element-wise sebagai masker numerik.",
    footnote: "Gate dihasilkan oleh sigmoid, sehingga setiap komponen vektor bisa disaring secara mandiri.",
  },

  // ── 17: Code LSTM ──
  {
    layout: "code",
    title: "Enam Persamaan LSTM yang Saling Terkait",
    body: "Berikut rumus lengkap satu sel LSTM, dari forget gate sampai hidden state, dengan bentuk shape di tiap baris:",
    lang: "text",
    code: `f_t = σ(W_f [h_{t-1}, x_t] + b_f)    # forget gate, [0,1]
i_t = σ(W_i [h_{t-1}, x_t] + b_i)    # input gate,  [0,1]
g_t = tanh(W_g [h_{t-1}, x_t] + b_g) # cell update, (-1,1)
c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t      # cell state
o_t = σ(W_o [h_{t-1}, x_t] + b_o)    # output gate, [0,1]
h_t = o_t ⊙ tanh(c_t)                # hidden state`,
    footnote: "Notasi [h_{t-1}, x_t] adalah konkatenasi vektor, sehingga W_f berukuran (d_h, d_h + F).",
  },

  // ── 18: Tiga gate ──
  {
    layout: "bullets",
    title: "Apa yang Diputuskan Tiap Gate",
    body: "Ketiga gate menjawab tiga pertanyaan berbeda tentang aliran informasi di dalam sel:",
    bullets: [
      "**Forget gate f_t** menjawab berapa banyak cell state lama yang dipertahankan - nilai 0.9 berarti pertahankan 90% komponen itu, nilai 0.1 berarti hampir lupa.",
      "**Input gate i_t** menjawab berapa banyak informasi baru g_t yang ditulis ke cell state, mengontrol penulisan alih-alih retensi.",
      "**Output gate o_t** menjawab berapa banyak cell state yang diekspos sebagai hidden state output ke timestep berikutnya.",
    ],
    footnote: "Cell state c_t adalah memori utama yang diperbarui dari campuran yang dipertahankan dan yang ditulis.",
  },

  // ── 19: Image fig05b ──
  {
    layout: "image",
    title: "Vanishing Gradient: RNN vs LSTM",
    imageUrl: "/figures/fig05b_gradient_flow.svg",
    caption: "Gambar ini menunjukkan norma gradient per timestep saat backpropagation pada RNN vanilla dibandingkan LSTM. Kurva RNN turun secara eksponensial sehingga gradient di timestep awal nyaris hilang, sedangkan kurva LSTM tetap relatif datar sehingga gradient dari timestep awal masih dapat dihitung.",
    footnote: "Lab 3b memvisualisasikan gejala ini dengan plot log-scale gradient norm per timestep.",
  },

  // ── 20: Kenapa LSTM memutus ──
  {
    layout: "bullets",
    title: "Mengapa Cell State Memutus Vanishing Gradient",
    body: "Dari gambar tersebut, perbedaan kurva berasal dari cara gradient mengalir di cell state versus di hidden state RNN:",
    bullets: [
      "**Turunan dc_t/dc_{t-1} = f_t** hanya melibatkan forget gate, bukan perkalian matriks W_h yang berulang, sehingga tidak ada rantai perkalian matriks di cell state.",
      "**Saat forget gate mendekati 1** di sepanjang sequence, gradient pada cell state tetap stabil tanpa cepat menyusut.",
      "**RNN vanilla mengalikan gradient dengan W_h** di setiap langkah mundur, sehingga setelah 100 langkah gradient mendekati nol seperti terlihat pada kurva.",
    ],
    footnote: "Gate bisa belajar ke nilai 1 untuk mempertahankan kontribusi informasi lama secara selektif.",
  },

  // ── 21: Hidden vs cell ──
  {
    layout: "split",
    title: "Hidden State vs Cell State: Dua Memori yang Berbeda",
    body: "Dua memori di LSTM sering membingungkan pemula. Keduanya berbentuk (d_h,) per timestep tetapi punya peran yang berbeda:",
    left: {
      title: "Cell state c_t",
      body: "Berperan sebagai memori jangka panjang berbasis update aditif.\n\nDiperbarui lewat dua gate (forget dan input) dengan jalur additive, sehingga gradientnya lebih stabil.\n\nSifatnya internal dan tidak diekspos langsung ke layer berikutnya.",
    },
    right: {
      title: "Hidden state h_t",
      body: "Berperan sebagai output sekaligus input ke timestep berikut.\n\nDiperbarui lewat satu gate (output) dari tanh(c_t), sehingga lebih dipengaruhi perkalian matriks.\n\nDiekspos sebagai input ke Linear head atau LSTM layer berikutnya.",
    },
    footnote: "Di PyTorch, nn.LSTM mengembalikan out, (h_n, c_n): out adalah h_t seluruh timestep, h_n dan c_n adalah keadaan terakhir.",
  },

  // ── 22: Forget gate konkret ──
  {
    layout: "bullets",
    title: "Forget Gate dalam Gambaran Konkret",
    body: "Bayangkan sequence sensor glukosa pasien setiap 5 menit selama 24 jam, dan cell state menyimpan gambaran kondisi stabil terakhir. Forget gate memutuskan kapan kondisi lama masih relevan:",
    bullets: [
      "**Saat data tetap normal**, forget gate mendekati 1.0 sehingga cell state hampir tidak berubah dan gambaran kondisi stabil dipertahankan.",
      "**Saat terjadi anomali** seperti lonjakan glukosa akibat makan berat, forget gate turun ke sekitar 0.3 untuk komponen terkait dan cell state diperbarui dengan informasi baru.",
      "**Saat pasien tidur** dan sinyal sangat lambat, forget gate kembali mendekati 1.0 sehingga noise kecil tidak mengganggu gambaran kondisi tidur.",
    ],
    footnote: "Forget gate mempelajari kapan informasi lama harus dilupakan melalui backward pass sepanjang sequence.",
  },

  // ── 23: Section GRU ──
  {
    layout: "section",
    title: "GRU: Alternatif Lebih Ringkas",
    body: "GRU adalah varian LSTM yang lebih sederhana. Ia menggabungkan forget gate dan input gate menjadi satu update gate, dan menghilangkan cell state yang terpisah.",
    footnote: "Cho et al. memperkenalkan GRU pada 2014 sebagai alternatif yang lebih ringan.",
  },

  // ── 24: GRU disederhanakan ──
  {
    layout: "bullets",
    title: "Apa yang Disederhanakan GRU",
    body: "GRU memangkas tiga hal dari LSTM tanpa banyak kehilangan kemampuan pada banyak kasus:",
    bullets: [
      "**GRU hanya punya dua gate**, bukan tiga, karena fungsi forget gate diserap oleh update gate z_t.",
      "**GRU tidak punya cell state terpisah**, sehingga hanya hidden state h_t yang dipertahankan tanpa memori yang berbeda dari output.",
      "**Jumlah parameter GRU sekitar 25% lebih sedikit** daripada LSTM karena satu gate dihapus seluruhnya.",
    ],
    footnote: "Lebih sedikit parameter berarti risiko overfitting yang lebih rendah pada dataset kecil.",
  },

  // ── 25: Kapan GRU vs LSTM ──
  {
    layout: "split",
    title: "Kapan Memilih GRU dan Kapan LSTM",
    body: "Tidak ada pemenang universal; pilihan bergantung pada ukuran data dan panjang sequence. Aturan praktisnya adalah mencoba LSTM dulu sebagai default:",
    left: {
      title: "Cenderung GRU",
      body: "Dataset kecil di bawah 10 ribu sampel cocok karena parameter lebih sedikit.\n\nSequence pendek sampai sedang di bawah 200 timestep sering memberi performa sebanding.\n\nAnggaran parameter ketat terbantu oleh bobot yang sekitar 25% lebih ringan.",
    },
    right: {
      title: "Cenderung LSTM",
      body: "Sequence sangat panjang di atas 200 timestep terbantu oleh gating terpisah untuk dependensi jauh.\n\nSaat tidak yakin, coba keduanya karena bedanya sering di bawah 2% pada banyak benchmark.\n\nLSTM menjadi default sebelum tuning anggaran training.",
    },
    footnote: "Di lab minggu ini, Anda membandingkan RNN vs LSTM vs GRU pada sequence sintetis.",
  },

  // ── 26: Section Big Map ──
  {
    layout: "section",
    title: "Big Map untuk Sequence: Empat Output Head",
    body: "Bentuk output yang diinginkan menentukan head architecture dan loss. Empat formulasi mencakup hampir semua tugas sequence yang akan Anda temui.",
    footnote: "Di W5 kita fokus pada tiga yang pertama; token classification dibahas di W7.",
  },

  // ── 27: Grid output head ──
  {
    layout: "grid",
    title: "Empat Formulasi Output Sequence",
    body: "Setiap formulasi memetakan bentuk input ke bentuk output yang berbeda dengan loss yang sesuai:",
    gridItems: [
      {
        title: "Regression Scalar Akhir",
        body: "Tugas ini memetakan (T, F) ke (1,) dengan Linear(hidden, 1) pada h_T dan loss MSE atau MAE. Contohnya memprediksi nilai berikutnya dari time series.",
      },
      {
        title: "Klasifikasi Akhir",
        body: "Tugas ini memetakan (T, F) ke (N,) dengan Linear(hidden, N) pada h_T dan loss CrossEntropy. Contohnya klasifikasi aktivitas dari sensor IMU.",
      },
      {
        title: "Forecast Sequence",
        body: "Tugas ini memetakan (T, F) ke (T'', 1) dengan Linear(hidden, 1) pada h_t di setiap timestep. Contohnya memprediksi 12 jam ke depan dari sinyal CGM.",
      },
      {
        title: "Token Classification",
        body: "Tugas ini memetakan (T,) ke (T, N) dengan Linear(hidden, N) pada h_t setiap timestep dan CrossEntropy per token. Contohnya NER dan POS tagging.",
      },
    ],
    footnote: "Memilih head yang tepat adalah keputusan pertama setelah memahami bentuk output yang diinginkan.",
  },

  // ── 28: Code SequenceClassifier ──
  {
    layout: "code",
    title: "Sequence Classifier dalam PyTorch",
    body: "Berikut implementasi minimal sequence classifier yang mengambil hidden state timestep terakhir lalu meneruskannya ke head:",
    lang: "python",
    code: `class SequenceClassifier(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size,
                            batch_first=True)
        self.head = nn.Linear(hidden_size, num_classes)

    def forward(self, x):              # x: (B, T, F)
        out, (h_n, _) = self.lstm(x)
        return self.head(h_n[-1])      # h_n[-1]: timestep akhir`,
    footnote: "batch_first=True membuat dimensi pertama adalah batch, sehingga input berbentuk (B, T, F).",
  },

  // ── 29: Section Justifikasi ──
  {
    layout: "section",
    title: "Justifikasi Arsitektur: Kebiasaan Menjelaskan Pilihan",
    body: "Setiap pemilihan arsitektur harus bisa dijelaskan dalam satu kalimat yang konkret. Mulai W5, biasakan menulis justifikasi untuk setiap pilihan arsitektur yang Anda buat.",
    footnote: "Template ini dipakai kembali di W7 untuk Transformer dan W9 untuk multimodal.",
  },

  // ── 30: Bullets template justifikasi ──
  {
    layout: "bullets",
    title: "Tiga Bagian dalam Satu Pernyataan Justifikasi",
    body: "Pernyataan justifikasi yang baik menyebut arsitektur, sifat tugas, dan bukti empiris secara eksplisit:",
    bullets: [
      "**Pilihan dan alasan tugas** menyatakan arsitektur yang dipilih beserta sifat tugas yang menuntutnya, misalnya memori jangka panjang atau kebutuhan paralelisasi.",
      "**Karakter dataset** menyebut panjang sequence T yang sebenarnya, sehingga pilihan terikat pada properti data, bukan kebiasaan.",
      "**Bukti empiris pembanding** menjelaskan mengapa arsitektur ini lebih baik daripada alternatif pada kondisi tersebut, misalnya RNN vanilla gagal akibat vanishing gradient.",
    ],
    footnote: "Justifikasi yang konkret membedakan keputusan riset dari pilihan default yang tidak dipikirkan.",
  },

  // ── 31: Section Diagnosis ──
  {
    layout: "section",
    title: "Long-Sequence Diagnosis",
    body: "Ketika model sequence tidak belajar dengan baik, ada lima hipotesis yang paling mungkin. Memeriksanya secara berurutan menghemat waktu sebelum mengganti arsitektur.",
    footnote: "Diagnosis sequence panjang adalah kebiasaan riset utama yang dilatih minggu ini.",
  },

  // ── 32: Diagnosis 1-3 ──
  {
    layout: "bullets",
    title: "Hipotesis 1 sampai 3: Gradient, Panjang, Shuffle",
    body: "Tiga hipotesis pertama menyangkut dinamika training dan cara data disusun:",
    bullets: [
      "**Vanishing gradient** diperiksa lewat gradient norm per timestep; jika turun eksponensial, beralih ke LSTM atau GRU.",
      "**Sequence terlalu panjang** diuji dengan memotong sequence menjadi lebih pendek; jika performa membaik, dependensi lokal sudah cukup.",
      "**Shuffle yang salah** terjadi pada time series; hanya urutan antar sequence yang boleh diacak di DataLoader, bukan urutan timestep di dalam sequence.",
    ],
    footnote: "Urutan pemeriksaan dari yang termurah ke yang termahal menghemat waktu diagnosis.",
  },

  // ── 33: Diagnosis 4-5 ──
  {
    layout: "bullets",
    title: "Hipotesis 4 dan 5: Leakage dan Clipping",
    body: "Dua hipotesis terakhir menyangkut kebocoran informasi dan pengaturan gradient clipping:",
    bullets: [
      "**Leakage temporal** terjadi saat fitur yang dibuat dari masa depan bocor ke training, dan ini dibahas mendalam di W6.",
      "**Gradient clipping terlalu ketat** menghambat pembelajaran, padahal RNN dan LSTM sering tetap membutuhkan clipping yang wajar.",
      "**Memeriksa kelima hipotesis** secara berurutan lebih efisien daripada langsung mengganti arsitektur saat hasil mengecewakan.",
    ],
    footnote: "Leakage temporal adalah salah satu bug paling berbahaya karena menghasilkan angka bagus yang tidak valid.",
  },

  // ── 34: Section Pitfalls ──
  {
    layout: "section",
    title: "Pitfalls & Miskonsepsi",
    body: "Beberapa keyakinan yang terdengar masuk akal justru menyesatkan saat bekerja dengan sequence model. Mengenalinya lebih awal mencegah pilihan arsitektur dan training yang keliru.",
    footnote: "Sebagian besar berakar pada anggapan bahwa data berurutan selalu butuh penanganan recurrent yang berat.",
  },

  // ── 35: Pitfalls 1-3 ──
  {
    layout: "bullets",
    title: "Tiga Keyakinan yang Perlu Diluruskan",
    body: "Ketiga pernyataan berikut benar dalam kondisi sempit tetapi berbahaya jika dianggap berlaku universal:",
    bullets: [
      "**\"Sequence selalu butuh RNN/LSTM\"** keliru - jika dependensi hanya 5-10 langkah, CNN 1D atau MLP dengan windowed features kadang lebih efisien.",
      "**\"LSTM selalu lebih baik dari GRU\"** tidak benar karena GRU lebih cepat dilatih dan sering sebanding, sehingga keduanya layak dicoba.",
      "**\"Hidden state terakhir mewakili seluruh sequence\"** gagal pada sequence sangat panjang; solusinya bidirectional LSTM atau attention pada semua hidden state.",
    ],
    footnote: "Shuffle bebas pada time series juga berbahaya karena menyebabkan leakage yang dibahas di W6.",
  },

  // ── 36: Code gradient clipping ──
  {
    layout: "split",
    title: "Gradient Clipping: clip_grad_norm_ vs clip_grad_value_",
    body: "RNN dan LSTM tanpa gradient clipping sering mengalami exploding gradient. Dua fungsi clipping bekerja sangat berbeda, dan untuk recurrent yang berbasis norma hampir selalu lebih tepat:",
    left: {
      title: "clip_grad_norm_",
      body: "Fungsi ini menghitung norma global seluruh gradient model, lalu menurunkan skalanya proporsional jika melewati max_norm.\n\nArah relatif antar parameter dipertahankan, hanya besarannya yang disesuaikan.\n\nMulai dari max_norm=1.0, naikkan ke 5.0 jika loss masih tidak stabil.",
    },
    right: {
      title: "clip_grad_value_",
      body: "Fungsi ini memotong setiap elemen gradient secara independen ke rentang [-v, v].\n\nIa tidak memperhatikan arah keseluruhan, sehingga bisa mengubah arah update secara tak terduga.\n\nPerubahan arah ini jarang diinginkan untuk RNN dan LSTM.",
    },
    footnote: "Panggil clip_grad_norm_(model.parameters(), max_norm=1.0) tepat sebelum optimizer.step().",
  },

  // ── 37: Bullets Lab 3b ──
  {
    layout: "bullets",
    title: "Lab 3b: RNN vs LSTM Gradient Flow (Wajib)",
    body: "Lab wajib minggu ini membandingkan tiga arsitektur recurrent dan memvisualisasikan vanishing gradient secara langsung:",
    bullets: [
      "**Latih RNN vs LSTM** pada seq_len=50 lalu seq_len=200, dan amati selisih performa membesar saat sequence memanjang.",
      "**Plot gradient norm per timestep** untuk keduanya, sehingga kurva vanishing pada RNN terlihat jelas dibanding LSTM yang datar.",
      "**Tulis pernyataan justifikasi** arsitektur dengan template §2.6, lalu coba GRU sebagai alternatif ketiga.",
    ],
    footnote: "Lab 3b memenuhi Breadth Check keluarga RNN/LSTM dengan smoke test dan gradient clipping aktif di semua model.",
  },

  // ── 38: Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum lanjut ke W6, renungkan tiga pertanyaan yang menghubungkan minggu ini dengan keputusan riset Anda nanti:",
    bullets: [
      "Untuk dataset EKG 5000 titik per sampel dengan target 4 kelas aritmia, apakah LSTM arsitektur pertama Anda, dan dua alternatif apa beserta trade-off-nya?",
      "Setelah melihat plot gradient flow di Lab 3b, pada panjang berapa RNN vanilla mulai kehilangan sinyal, dan bagaimana angka itu mengubah keputusan Anda?",
      "Bagaimana strategi engineered, extracted, dan learned features muncul dalam konteks sequence, dengan satu contoh konkret untuk masing-masing di domain sensor?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - ketiganya kembali relevan saat memilih arsitektur capstone.",
  },

  // ── 39: Lanjut W6 ──
  {
    layout: "bullets",
    title: "Lanjut ke W6: Representasi dan Temporal Leakage",
    body: "Dengan W5 selesai, Anda bisa membangun dan mendiagnosis arsitektur recurrent. W6 menggabungkan dua tema yang menentukan validitas hasil:",
    bullets: [
      "**Representasi fitur** dalam konteks sequence melanjutkan tema engineered, extracted, dan learned dari minggu-minggu awal.",
      "**Temporal leakage** dibahas sebagai salah satu bug paling berbahaya yang menghasilkan angka bagus tetapi hasil yang tidak valid.",
      "**Disiplin diagnosis** dari W5 menjadi bekal untuk menelusuri dari mana angka evaluasi yang terlalu bagus sebenarnya berasal.",
    ],
    footnote: "Leakage temporal yang disinggung di diagnosis W5 menjadi fokus utama W6.",
  },

  // ── 40: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W5",
    body: "Semua konsep di presentasi ini ada dalam lab notebook lengkap: perbandingan RNN vs LSTM vs GRU, plot gradient flow, dan pernyataan justifikasi arsitektur.\n\nEstimasi waktu: 4-6 jam termasuk training dua panjang sequence dan analisis gradient.",
    ctaText: "Buka Lab W5 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w5_lstm_sequence.ipynb",
  },
];

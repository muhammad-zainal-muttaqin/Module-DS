import type { SlideSection } from "./index";

export const slides05: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W5: Sequences - RNN & LSTM",
    subtitle: "Membangun RNN untuk data berurutan, melihat kenapa RNN gagal di sequence panjang, dan memilih antara RNN, LSTM, dan GRU.",
    footnote: "Bab 05 - Minggu 5",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Lima materi minggu ini berurutan dari bawah ke atas. Kita pilih bentuk output dulu, bangun RNN, lihat kenapa RNN gagal di sequence panjang, lalu perbaiki dengan LSTM.",
    gridItems: [
      {
        title: "1. Output Head untuk Sequence",
        body: "Kita tentukan bentuk output yang kita mau dari input (T, F), lalu pilih head dan loss yang cocok.",
      },
      {
        title: "2. RNN Vanilla dan BPTT",
        body: "Kita proses sequence satu langkah waktu demi satu. Lalu kita hitung gradient mundur sepanjang waktu, dan cara ini disebut BPTT, singkatan dari Backpropagation Through Time.",
      },
      {
        title: "3. Vanishing Gradient",
        body: "Kita lihat gradient menyusut sampai nol di sequence panjang, dan satu cara sederhana mengatasinya: penjumlahan.",
      },
      {
        title: "4. LSTM: Gate dan Cell State",
        body: "Kita lihat cara gate dan cell state menghentikan perkalian berulang yang bikin gradient hilang. GRU dibahas sebagai versi yang lebih ringan.",
      },
      {
        title: "5. Memilih dan Mendiagnosis",
        body: "Kita latih menulis alasan memilih arsitektur, dan mendiagnosis training sequence yang gagal.",
      },
    ],
  },

  // -- 3: Recap W4 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W4)",
    body: "W4 melatih alur kerja eksperimen yang rapi. Minggu ini alur itu dipakai lagi pada arsitektur baru:",
    bullets: [
      "Kita menulis protokol sebelum menulis kode, mengubah satu variabel per run, dan mencatat tiap run supaya bisa diulang.",
      "Perbandingan RNN, LSTM, dan GRU minggu ini dijalankan dengan seed yang dikunci, supaya hasilnya bisa dibandingkan secara setara.",
      "Tiga jenis output head dari W1 dipakai lagi, kali ini pada input berbentuk sequence.",
    ],
    footnote: "W5 paling padat secara teknis sejauh ini, jadi materinya disusun bertahap dari bawah.",
  },

  // ============ MATERI 1: Output Head untuk Sequence ============

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Output Head untuk Sequence",
    body: "Langkah pertama di tugas sequence: tentukan dulu bentuk output yang kita mau. Bentuk output inilah yang menentukan head dan loss.",
    footnote: "Input tugas sequence umumnya berbentuk (T, F): T langkah waktu, masing-masing dengan F fitur.",
  },

  // -- image fig05j: bentuk input sequence --
  {
    layout: "image",
    title: "Bentuk Input Sequence: dari mana F berasal",
    imageUrl: "/figures/fig05j_bentuk_input_sequence.png",
    caption: "Gambar ini menunjukkan beberapa bentuk input sequence. Pada data univariat, tiap langkah waktu cuma punya satu angka, sehingga bentuknya (B, T, 1). Pada data multivariat, tiap langkah waktu punya vektor fitur, sehingga bentuknya (B, T, F). Dua kasus lain, yaitu data spasio-temporal dan format hibrida, menambah dimensi tapi tetap diringkas jadi (B, T, F) sebelum masuk ke RNN.",
    footnote: "Fokus W5 ada di dua kasus pertama, univariat dan multivariat. Dua kasus terakhir cukup dikenali polanya sekarang.",
  },

  // -- 5: Empat formulasi (table) --
  {
    layout: "table",
    title: "Empat formulasi output sequence",
    body: "Empat bentuk output berikut menutup hampir semua tugas sequence. Tiap baris punya head dan loss yang cocok:",
    tableHead: ["Tugas", "Output", "Head", "Loss"],
    tableRows: [
      ["Regression scalar akhir", "(1,)", "Linear pada h_T", "MSE/MAE"],
      ["Klasifikasi akhir", "(N,)", "Linear pada h_T", "CrossEntropy"],
      ["Forecast sequence", "(T'', 1)", "Linear pada tiap h_t", "MSE/MAE"],
      ["Token classification", "(T, N)", "Linear pada tiap h_t", "CrossEntropy/token"],
    ],
    footnote: "Di W5 kita fokus pada tiga yang pertama; token classification dibahas di W7.",
  },

  // -- image fig05i: formulasi output sequence --
  {
    layout: "image",
    title: "Empat Formulasi Output dalam Gambar",
    imageUrl: "/figures/fig05i_formulasi_output_sequence.png",
    caption: "Gambar ini menggambarkan empat formulasi tadi. Di kelompok seq-to-1, seluruh sequence diringkas jadi satu jawaban, baik satu angka untuk regresi maupun satu kelas untuk klasifikasi. Di kelompok seq-to-seq, tiap langkah menghasilkan jawabannya sendiri, baik berupa peramalan langkah ke depan maupun label untuk tiap langkah.",
    footnote: "Pelabelan sekuens (contoh B-PER, I-PER) adalah token classification yang detailnya dibahas di W7.",
  },

  // -- image fig05e: output tapping --
  {
    layout: "image",
    title: "Dari Titik Mana Hidden State Diambil",
    imageUrl: "/figures/fig05e_output_tapping.png",
    caption: "Gambar ini membandingkan dua pola pengambilan output. Pola many-to-one hanya mengambil hidden state langkah terakhir h_T, cocok untuk klasifikasi atau regression akhir. Pola many-to-many mengambil hidden state tiap langkah h_t, cocok untuk forecast atau token classification.",
    footnote: "Bentuk output yang dibutuhkan menentukan pola mana yang dipakai, dan dari situ head serta loss ditentukan.",
  },

  // -- 6: Dari mana h_t diambil --
  {
    layout: "bullets",
    title: "Yang baru di sequence: dari mana h_t diambil",
    body: "Dari gambar di atas, yang baru di sequence adalah dari titik mana hidden state diambil. Pemilihan loss tetap mengikuti head, sama seperti W1:",
    bullets: [
      "Tugas yang butuh satu jawaban di akhir, seperti klasifikasi atau regression scalar, ambil hidden state langkah terakhir saja, yaitu h_T.",
      "Tugas yang butuh jawaban di tiap langkah, seperti forecast atau token classification, ambil hidden state semua langkah, yaitu h_t untuk tiap t.",
      "Sebelum memilih head, jawab tiga pertanyaan dulu: seberapa jauh jarak ketergantungan antar langkah, output apa yang dibutuhkan, dan apakah urutannya memang bermakna.",
    ],
    footnote: "Jawaban pertama menentukan apakah RNN vanilla cukup. Jawaban ketiga menentukan apakah model recurrent memang perlu dipakai.",
  },

  // -- 7: Sequence Classifier code --
  {
    layout: "code",
    title: "Sequence classifier dalam PyTorch",
    body: "Versi paling sederhana: ambil hidden state timestep terakhir, lalu kirim ke head.",
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

  // ============ MATERI 2: RNN Vanilla dan BPTT ============

  // -- 8: Materi 2 --
  {
    layout: "section",
    title: "2. RNN Vanilla dan BPTT",
    body: "RNN vanilla membaca sequence satu langkah demi satu. Di tiap langkah, ia menggabungkan input baru x_t dengan hidden state langkah sebelumnya h_{t-1}, lewat rumus h_t = tanh(W_x x_t + W_h h_{t-1} + b).",
    footnote: "Hidden state h_t menyimpan nilai internal yang diperbarui setiap langkah.",
  },

  // -- 9: image fig05a --
  {
    layout: "image",
    title: "RNN Vanilla vs LSTM Cell",
    imageUrl: "/figures/fig05a_rnn_vs_lstm.jpg",
    caption: "Gambar ini membandingkan dua arsitektur recurrent. Bagian atas adalah RNN vanilla yang dibentangkan sepanjang langkah waktu. Bagian bawah adalah isi satu sel LSTM. RNN vanilla cuma punya satu jalur, yaitu hidden state. LSTM menambah satu jalur lagi, cell state, plus tiga gate yang mengatur informasi mana yang disimpan, ditulis, dan dikeluarkan.",
    footnote: "Warna amber dipakai konsisten untuk keluarga RNN/LSTM di seluruh modul.",
  },

  // -- 10: Membaca persamaan RNN --
  {
    layout: "bullets",
    title: "Membaca persamaan RNN vanilla",
    body: "Dari gambar tersebut, persamaan h_t = tanh(W_x x_t + W_h h_{t-1} + b) menggabungkan tiga bagian di tiap langkah:",
    bullets: [
      "W_x x_t mengubah input baru x_t jadi ukuran hidden state. Di sini W_x berukuran (d_h, F).",
      "W_h h_{t-1} membawa hidden state dari langkah sebelumnya. Perkalian dengan W_h inilah yang terjadi berulang di tiap langkah, dan jadi penyebab vanishing gradient.",
      "tanh menahan nilai h_t di rentang (-1, 1), supaya hidden state tidak membesar tak terkendali.",
    ],
    footnote: "Untuk klasifikasi, output diambil dari h_T. Untuk forecasting, output dihitung di tiap langkah.",
  },

  // -- image fig05d: BPTT dua arah --
  {
    layout: "image",
    title: "BPTT: Gradient Dihitung Mundur ke Dua Arah",
    imageUrl: "/figures/fig05d_bptt_unrolled.jpg",
    caption: "Gambar ini menunjukkan RNN yang dibentangkan sepanjang langkah waktu. Arah 1 adalah gradient yang mundur dalam satu langkah, dari loss ke output ke input, sama seperti MLP. Arah 2 adalah gradient yang mundur antar langkah waktu, dari h_t ke h_{t-1}, dan di tiap langkah ia dikalikan W_h.",
    footnote: "Jalur terpanjang (Arah 2) mengalikan W_h sebanyak T kali, dan di sinilah vanishing gradient muncul.",
  },

  // -- 11: BPTT dua sumbu --
  {
    layout: "bullets",
    title: "BPTT: chain rule pada dua arah",
    body: "Dari gambar di atas, di RNN backprop berjalan ke dua arah sekaligus, tidak seperti MLP yang cuma mundur lewat layer:",
    bullets: [
      "Arah pertama sama seperti MLP: mundur dari output ke hidden ke input, di dalam satu langkah waktu.",
      "Arah kedua mundur ke langkah waktu sebelumnya, dari h_t ke h_{t-1} ke h_{t-2}. Arah inilah yang baru di model sequence.",
      "Backpropagation Through Time (BPTT) adalah nama untuk backprop yang dirantai sepanjang T langkah waktu. Jalur terpanjangnya melewati T-1 langkah.",
    ],
    footnote: "Arah kedua inilah tempat vanishing gradient muncul.",
  },

  // -- 12: BPTT 3 timestep code --
  {
    layout: "code",
    title: "BPTT untuk sequence tiga timestep",
    body: "Untuk sequence 3 langkah dengan loss L, gradient terhadap W_h adalah jumlah dari tiga jalur. Jalur terakhir melewati seluruh langkah:",
    lang: "text",
    code: `dL/dW_h = dL/dh_3 · dh_3/dW_h
        + dL/dh_3 · dh_3/dh_2 · dh_2/dW_h
        + dL/dh_3 · dh_3/dh_2 · dh_2/dh_1 · dh_1/dW_h`,
    footnote: "Tiap baris adalah satu jalur. Makin panjang jalur, makin banyak langkah yang harus dilewati gradient.",
  },

  // ============ MATERI 3: Vanishing Gradient ============

  // -- 13: Materi 3 --
  {
    layout: "section",
    title: "3. Vanishing Gradient",
    body: "Saat gradient mundur satu langkah waktu, nilainya dikalikan W_h. Mundur dua langkah, dikalikan W_h dua kali. Mundur T langkah, dikalikan W_h sebanyak T kali. Kalau W_h lebih kecil dari 1, hasil perkalian berulang ini menyusut cepat ke nol.",
    footnote: "Vanishing gradient muncul langsung dari perkalian berulang ini.",
  },

  // -- 14: tabel w_h^T --
  {
    layout: "table",
    title: "Apa yang terjadi setelah T langkah mundur",
    body: "Anggap w_h cuma satu angka. Tabel ini menunjukkan w_h dikalikan dirinya sendiri sebanyak T kali, untuk tiga nilai w_h:",
    tableHead: ["T (langkah)", "w_h=0.5", "w_h=0.9", "w_h=1.1"],
    tableRows: [
      ["1", "0.5", "0.9", "1.1"],
      ["10", "0.001", "0.35", "2.59"],
      ["50", "~9e-16", "0.005", "117"],
      ["100", "~8e-31", "2.6e-5", "13780"],
    ],
    footnote: "Dengan w_h=0.5, setelah 50 langkah gradient praktis nol. Dengan w_h=1.1, gradient malah membengkak jadi ribuan.",
  },

  // -- 15: tiga rezim --
  {
    layout: "bullets",
    title: "Tiga rezim gradient pada RNN vanilla",
    body: "Dari tabel tersebut, besar kecilnya w_h menentukan nasib gradient saat sequence memanjang:",
    bullets: [
      "Saat |w_h| < 1, gradient menyusut (*vanishing*). Setelah 50-100 langkah nilainya praktis nol, jadi model tidak bisa belajar ketergantungan yang jauh.",
      "Saat |w_h| > 1, gradient membengkak (*exploding*). Loss bisa tiba-tiba jadi NaN. Solusinya gradient clipping.",
      "Saat |w_h| dekat 1, gradient relatif stabil. Tapi kondisi ini sempit dan sulit dijaga tanpa pengaturan tambahan.",
    ],
    footnote: "Di sini W_h dianggap satu angka biar mudah. Untuk W_h berbentuk matriks penuh, ukuran yang dipakai lebih teknis (eigenvalue terbesar), tapi prinsipnya sama. Detail di Lampiran.",
  },

  // -- image fig05g: kontras gradien --
  {
    layout: "image",
    title: "Perkalian Berulang vs Jalur Aditif",
    imageUrl: "/figures/fig05g_gradient_contrast.png",
    caption: "Gambar ini menunjukkan kenapa gradient RNN dan LSTM berbeda nasib. Di RNN (kiri), gradient dikalikan faktor yang sama di tiap langkah, jadi setelah beberapa langkah menyusut cepat dari 1.0 ke sekitar 0.24. Di LSTM (kanan), cell state memakai jalur penjumlahan, jadi gradient tetap dekat 1.0 dari langkah awal sampai akhir.",
    footnote: "Inti perbaikan LSTM ada di sini: ganti perkalian berulang dengan penjumlahan supaya gradient tidak menyusut.",
  },

  // -- 16: prinsip aditif --
  {
    layout: "bullets",
    title: "Satu prinsip: ganti perkalian berulang dengan penjumlahan",
    body: "Dari gambar di atas, inti masalahnya satu: gradient rusak karena dikalikan berulang, sedangkan jalur penjumlahan tidak. Solusinya pun satu: ganti perkalian dengan penjumlahan. Beberapa arsitektur memakai ide yang sama:",
    bullets: [
      "Cell state LSTM memakai c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t. Tanda + di tengah rumus itu adalah jalur penjumlahan yang tidak ikut menyusut.",
      "Saat gradient lewat jalur penjumlahan ini, ia diteruskan apa adanya, tidak dikalikan berulang. Jadi nilainya tidak jatuh ke nol meski sequence panjang.",
      "Ide \"ganti perkalian dengan penjumlahan\" yang sama dipakai ResNet dan Transformer. Cukup kenali polanya sekarang, detailnya di W7 dan W8.",
    ],
    footnote: "Simbol ⊙ adalah perkalian element-wise: tiap posisi dikali pasangannya, bentuk tetap. Beda dari @ (perkalian matriks) yang mengubah bentuk.",
  },

  // ============ MATERI 4: LSTM: Gate dan Cell State ============

  // -- 17: Materi 4 --
  {
    layout: "section",
    title: "4. LSTM: Gate dan Cell State",
    body: "LSTM menambah satu jalur baru, cell state c_t, terpisah dari hidden state. Ia juga punya tiga gate yang mengatur informasi mana yang disimpan dan mana yang ditulis. Gate adalah vektor berisi angka 0 sampai 1, dan tiap angka mengatur seberapa banyak satu komponen diloloskan.",
    footnote: "Gate dihasilkan fungsi sigmoid, yang selalu memberi nilai antara 0 dan 1.",
  },

  // -- image fig05c: sel LSTM detail --
  {
    layout: "image",
    title: "Sel LSTM: Tiga Gate dan Jalur Cell State",
    imageUrl: "/figures/fig05c_lstm_cell_detail.jpg",
    caption: "Gambar ini menunjukkan isi satu sel LSTM. Jalur cell state membentang di atas dengan operasi penjumlahan di tengahnya, dan jalur inilah yang membuat gradient tidak menyusut. Tiga gate di bawah, yaitu forget, input, dan output, menyuplai jalur itu lewat konkatenasi [h_{t-1}, x_t].",
    footnote: "Tanda + di jalur cell state adalah jalur penjumlahan, beda dari perkalian W_h yang berulang di RNN vanilla.",
  },

  // -- 18: enam persamaan --
  {
    layout: "code",
    title: "Enam persamaan LSTM yang saling terkait",
    body: "Berikut enam rumus satu sel LSTM, urut dari forget gate sampai hidden state, dengan bentuk shape di tiap baris:",
    lang: "text",
    code: `f_t = σ(W_f [h_{t-1}, x_t] + b_f)    # forget gate, [0,1]
i_t = σ(W_i [h_{t-1}, x_t] + b_i)    # input gate,  [0,1]
g_t = tanh(W_g [h_{t-1}, x_t] + b_g) # cell update, (-1,1)
c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t      # cell state
o_t = σ(W_o [h_{t-1}, x_t] + b_o)    # output gate, [0,1]
h_t = o_t ⊙ tanh(c_t)                # hidden state`,
    footnote: "Notasi [h_{t-1}, x_t] berarti dua vektor disambung jadi satu. Karena itu W_f berukuran (d_h, d_h + F).",
  },

  // -- 19: apa yang diputuskan tiap gate --
  {
    layout: "bullets",
    title: "Apa yang diatur tiap gate",
    body: "Ketiga gate mengatur tiga hal berbeda: informasi yang disimpan, yang ditulis, dan yang dikeluarkan:",
    bullets: [
      "Forget gate f_t mengatur berapa banyak cell state lama yang disimpan. Nilai 0.9 berarti 90% disimpan, nilai 0.1 berarti hampir semua dibuang.",
      "Input gate i_t mengatur berapa banyak informasi baru g_t yang ditulis ke cell state.",
      "Output gate o_t mengatur berapa banyak isi cell state yang dikeluarkan jadi hidden state untuk langkah berikutnya.",
    ],
    footnote: "Cell state baru adalah bagian lama yang disimpan (f_t ⊙ c_{t-1}) ditambah bagian baru yang ditulis (i_t ⊙ g_t).",
  },

  // -- 20: image fig05b --
  {
    layout: "image",
    title: "Vanishing Gradient: RNN vs LSTM",
    imageUrl: "/figures/fig05b_gradient_flow.jpg",
    caption: "Gambar ini menunjukkan besar gradient di tiap langkah waktu saat backprop, untuk RNN vanilla dibanding LSTM. Kurva RNN turun tajam, jadi gradient di langkah-langkah awal nyaris hilang. Kurva LSTM tetap relatif datar, jadi gradient dari langkah awal masih terbaca.",
    footnote: "Lab W5 memvisualisasikan gejala ini dengan plot log-scale gradient norm per timestep.",
  },

  // -- 21: mengapa cell state memutus vanishing --
  {
    layout: "bullets",
    title: "Mengapa cell state memutus vanishing gradient",
    body: "Dari gambar tersebut, dua kurva berbeda karena gradient di cell state LSTM lewat jalur yang lain dari hidden state RNN:",
    bullets: [
      "Turunan dc_t/dc_{t-1} = f_t cuma melibatkan forget gate, bukan perkalian matriks W_h yang berulang.",
      "Saat forget gate dekat 1 sepanjang sequence, gradient di cell state tetap stabil dan tidak cepat menyusut.",
      "RNN vanilla mengalikan gradient dengan W_h tiap langkah mundur. Setelah 100 langkah, nilainya mendekati nol, persis seperti kurva RNN di gambar.",
    ],
    footnote: "Forget gate bisa belajar mendekati 1 untuk menyimpan informasi lama yang masih penting.",
  },

  // -- image fig05f: forget gate glukosa --
  {
    layout: "image",
    title: "Forget Gate pada Sinyal Glukosa",
    imageUrl: "/figures/fig05f_forget_gate_timeline.jpg",
    caption: "Gambar ini menyandingkan sinyal sensor glukosa selama 24 jam dengan nilai forget gate di bawahnya. Saat sinyal stabil, forget gate mendekati 1 sehingga kondisi lama tetap tersimpan. Saat ada lonjakan sehabis makan, forget gate turun ke sekitar 0.3 sehingga cell state diperbarui dengan informasi baru.",
    footnote: "Nilai forget gate ini dipelajari saat training, bukan diatur manual.",
  },

  // -- 22: forget gate konkret --
  {
    layout: "bullets",
    title: "Forget gate dalam gambaran konkret",
    body: "Dari gambar di atas, contohnya sequence sensor glukosa pasien tiap 5 menit selama 24 jam. Cell state menyimpan kondisi terakhir yang stabil, dan forget gate menentukan kapan kondisi lama itu masih relevan:",
    bullets: [
      "Saat data normal, forget gate dekat 1.0. Cell state hampir tidak berubah, jadi kondisi stabil tetap tersimpan.",
      "Saat ada lonjakan glukosa, misalnya sehabis makan berat, forget gate turun ke sekitar 0.3 untuk bagian terkait. Cell state pun diperbarui.",
      "Saat pasien tidur dan sinyal berubah lambat, forget gate naik lagi dekat 1.0. Noise kecil tidak mengganggu kondisi yang tersimpan.",
    ],
    footnote: "Forget gate belajar kapan harus melupakan informasi lama lewat training, bukan diatur manual.",
  },

  // -- 23: cell vs hidden state --
  {
    layout: "split",
    title: "Cell state vs hidden state: dua nilai internal yang berbeda",
    body: "LSTM punya dua nilai internal yang sering tertukar. Keduanya berbentuk (d_h,) per langkah, tapi tugasnya beda:",
    left: {
      title: "Cell state c_t",
      body: "Menyimpan informasi jangka panjang lewat penjumlahan.\n\nDiatur dua gate, forget dan input. Karena memakai jalur penjumlahan, gradientnya lebih stabil.\n\nDipakai di dalam sel saja, tidak dikirim langsung ke layer berikutnya.",
    },
    right: {
      title: "Hidden state h_t",
      body: "Jadi output sekaligus input untuk langkah berikutnya.\n\nDiatur satu gate, output, dari tanh(c_t). Lebih terpengaruh perkalian matriks, jadi lebih rawan vanish.\n\nDikirim ke Linear head atau ke LSTM layer berikutnya.",
    },
    footnote: "Di PyTorch, nn.LSTM mengembalikan out, (h_n, c_n): out adalah h_t seluruh timestep, h_n dan c_n adalah keadaan terakhir.",
  },

  // -- 24: GRU simplifikasi --
  {
    layout: "bullets",
    title: "GRU: alternatif lebih ringan",
    body: "GRU (Cho dkk. 2014) menyederhanakan LSTM. Ia menyatukan forget gate dan input gate jadi satu update gate, dan membuang cell state terpisah:",
    bullets: [
      "GRU cuma punya dua gate, bukan tiga. Tugas forget gate diambil alih update gate z_t.",
      "GRU tidak punya cell state terpisah, jadi hanya hidden state h_t yang dipertahankan.",
      "Jumlah parameter GRU sekitar 25% lebih sedikit daripada LSTM karena satu gate dihapus.",
    ],
    footnote: "Lebih sedikit parameter berarti risiko overfitting yang lebih rendah pada dataset kecil.",
  },

  // -- 25: kapan GRU kapan LSTM --
  {
    layout: "split",
    title: "Kapan memilih GRU dan kapan LSTM",
    body: "Tidak ada yang selalu menang. Pilihan tergantung ukuran data dan panjang sequence. Aturan praktisnya: pakai LSTM dulu sebagai default.",
    left: {
      title: "Cenderung GRU",
      body: "Cocok untuk dataset kecil di bawah 10 ribu sampel, karena parameternya sedikit.\n\nUntuk sequence pendek sampai sedang, di bawah 200 langkah, performanya sering setara LSTM.\n\nBerguna saat jumlah parameter harus ditekan, karena bobotnya sekitar 25% lebih ringan.",
    },
    right: {
      title: "Cenderung LSTM",
      body: "Cocok untuk sequence sangat panjang di atas 200 langkah, karena gate-nya terpisah untuk ketergantungan jauh.\n\nKalau ragu, coba keduanya. Selisihnya sering di bawah 2% di banyak benchmark.\n\nPakai LSTM sebagai titik awal sebelum mengatur anggaran training.",
    },
    footnote: "Di lab minggu ini, kita membandingkan RNN, LSTM, dan GRU pada sequence sintetis.",
  },

  // ============ MATERI 5: Memilih dan Mendiagnosis ============

  // -- 26: Materi 5 --
  {
    layout: "section",
    title: "5. Memilih dan Mendiagnosis Arsitektur Sequence",
    body: "Setiap pilihan arsitektur harus bisa dijelaskan dalam satu kalimat yang konkret. Dan setiap training sequence yang gagal punya daftar dugaan yang bisa dicek satu per satu.",
    footnote: "Diagnosis sequence panjang adalah kebiasaan riset utama yang dilatih minggu ini.",
  },

  // -- 27: template justifikasi --
  {
    layout: "bullets",
    title: "Tiga bagian dalam satu pernyataan justifikasi",
    body: "Alasan yang baik menyebut tiga hal dengan jelas: arsitektur yang dipilih, sifat tugasnya, dan bukti dari percobaan:",
    bullets: [
      "Sebutkan arsitektur yang dipilih dan sifat tugas yang menuntutnya, misalnya butuh memori jangka panjang atau butuh paralelisasi.",
      "Sebutkan panjang sequence T yang sebenarnya, supaya pilihan didasarkan pada data, bukan kebiasaan.",
      "Jelaskan kenapa arsitektur ini lebih baik dari pilihan lain, misalnya RNN vanilla gagal karena vanishing gradient.",
    ],
    footnote: "Satu kalimat alasan inilah yang dikirim ke dosen saat memilih arsitektur capstone, sebelum training panjang dimulai.",
  },

  // -- 28: lima hipotesis diagnosis --
  {
    layout: "bullets",
    title: "Lima dugaan saat sequence model gagal belajar",
    body: "Periksa lima dugaan berikut berurutan, dari yang paling murah dicek dulu, sebelum buru-buru ganti arsitektur:",
    bullets: [
      "Cek vanishing gradient lewat besar gradient per langkah. Kalau turun tajam, pindah ke LSTM atau GRU. Cek juga apakah sequence terlalu panjang dengan memotongnya lebih pendek.",
      "Cek shuffle yang salah pada time series. Yang boleh diacak hanya urutan antar sequence, bukan urutan langkah di dalam satu sequence.",
      "Cek juga leakage temporal dan gradient clipping yang terlalu ketat. Keduanya bisa memberi gejala yang menyesatkan kalau terlewat.",
    ],
    footnote: "Leakage temporal dibahas mendalam di W6 sebagai salah satu bug paling berbahaya.",
  },

  // -- 29: gradient clipping --
  {
    layout: "split",
    title: "Gradient clipping: clip_grad_norm_ vs clip_grad_value_",
    body: "RNN dan LSTM tanpa clipping sering kena exploding gradient. Ada dua fungsi clipping yang cara kerjanya beda jauh. Untuk recurrent, yang berbasis norma hampir selalu lebih tepat:",
    left: {
      title: "clip_grad_norm_",
      body: "Fungsi ini mengukur besar total seluruh gradient model. Kalau melewati max_norm, semuanya dikecilkan dengan proporsi yang sama.\n\nArah update tidak berubah, cuma besarnya yang disesuaikan.\n\nMulai dari max_norm=1.0. Naikkan ke 5.0 kalau loss masih goyang.",
    },
    right: {
      title: "clip_grad_value_",
      body: "Fungsi ini memotong tiap elemen gradient sendiri-sendiri ke rentang [-v, v].\n\nIa tidak melihat arah keseluruhan, jadi arah update bisa berubah tak terduga.\n\nPerubahan arah ini jarang diinginkan untuk RNN dan LSTM.",
    },
    footnote: "Panggil clip_grad_norm_(model.parameters(), max_norm=1.0) tepat sebelum optimizer.step().",
  },

  // -- 30: keyakinan keliru --
  {
    layout: "bullets",
    title: "Tiga keyakinan yang perlu diluruskan",
    body: "Tiga pernyataan berikut benar di kondisi tertentu, tapi menyesatkan kalau dianggap selalu berlaku:",
    bullets: [
      "\"Sequence selalu butuh RNN/LSTM\" keliru. Kalau ketergantungan cuma 5-10 langkah, CNN 1D atau MLP dengan fitur jendela kadang lebih hemat.",
      "\"LSTM selalu lebih baik dari GRU\" tidak benar. GRU lebih cepat dilatih dan sering setara, jadi keduanya layak dicoba.",
      "\"Hidden state terakhir mewakili seluruh sequence\" gagal di sequence sangat panjang. Solusinya bidirectional LSTM atau attention pada semua hidden state.",
    ],
    footnote: "Angka evaluasi yang terlalu bagus juga perlu dicurigai: shuffle bebas pada time series menyebabkan leakage yang dibahas di W6.",
  },

  // ============ LAB + REFLEKSI + CTA ============

  // -- 31: Lab W5 --
  {
    layout: "bullets",
    title: "Lab W5: RNN vs LSTM gradient flow (wajib)",
    body: "Lab memakai dataset sine_sequence dan mengikuti urutan materi di atas. Lab ini juga memenuhi Breadth Check keluarga RNN/LSTM:",
    bullets: [
      "Latih RNN dan LSTM di seq_len=50, lalu seq_len=200. Amati selisihnya membesar saat sequence makin panjang.",
      "Plot besar gradient per langkah untuk keduanya. Kurva vanishing RNN akan terlihat jelas dibanding LSTM yang datar.",
      "Tulis alasan pemilihan arsitektur pakai pola di materi 5. Lalu coba GRU sebagai pilihan ketiga.",
    ],
    footnote: "Checklist: smoke test lulus, plot gradient flow menunjukkan vanishing, tabel MAE tiga arsitektur, justifikasi tertulis, dan clipping aktif di semua model.",
  },

  // -- 32: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Tiga pertanyaan untuk dibawa ke portofolio mandiri dan dipakai lagi saat menentukan arsitektur capstone:",
    bullets: [
      "Untuk dataset EKG 5000 titik per sampel dengan 4 kelas aritmia, apakah LSTM pilihan pertama Anda? Sebutkan dua alternatif lain beserta untung-ruginya.",
      "Setelah melihat plot gradient flow di lab, pada panjang berapa RNN vanilla mulai kehilangan sinyal? Bagaimana angka itu mengubah keputusan Anda?",
      "Bagaimana fitur engineered, extracted, dan learned muncul pada data sequence? Beri satu contoh konkret untuk masing-masing di data sensor.",
    ],
  },

  // -- 33: Tugas jembatan W5 ke W6 --
  {
    layout: "bullets",
    title: "Tugas jembatan: random vs chronological split untuk awal W6",
    body: "Lab W5 melatih LSTM pada sequence sintetis. Tugas jembatan ini memakai dataset [Air Passengers](https://www.kaggle.com/datasets/rakannimer/air-passengers) (deret bulanan penumpang pesawat, 1949-1960) untuk menyiapkan bahan diskusi di awal W6:",
    bullets: [
      "**Tebak dulu, baru latih.** Sebelum menjalankan, tulis skema mana yang menurut Anda errornya lebih rendah dan alasannya. Lalu latih `lab_w5_lstm_sequence` pada Air Passengers dengan random split dan chronological split (bulan-bulan terakhir jadi test).",
      "**Bandingkan dengan satu baseline.** Catat MAE atau RMSE tiap skema pada test set-nya masing-masing, dan bandingkan keduanya dengan tebakan musiman sederhana (nilai bulan ini sama dengan 12 bulan lalu).",
      "**Bawa satu hipotesis ke W6.** Kenapa random split bisa terlihat lebih bagus padahal di praktiknya kita selalu meramal masa depan? Bawa satu dugaan, sebelum materi temporal leakage dibuka.",
    ],
    footnote: "Siapkan satu slide ringkas berisi angka metrik dan satu paragraf dugaan; slide ini dipresentasikan di awal W6 sebelum materi leakage dimulai.",
  },

  // -- 34: Lanjut ke W6 --
  {
    layout: "bullets",
    title: "Lanjut ke W6",
    body: "Dengan W5 selesai, Anda bisa membangun dan mendiagnosis arsitektur recurrent. W6 menyatukan dua tema yang menentukan benar-tidaknya hasil:",
    bullets: [
      "Representasi fitur dalam konteks sequence melanjutkan tema engineered, extracted, dan learned dari minggu-minggu awal.",
      "Temporal leakage dibahas sebagai salah satu bug paling berbahaya: angkanya bagus, tapi hasilnya tidak sah.",
      "Diagnosis sequence dan sikap curiga pada angka yang terlalu bagus dari W5 jadi bekal menelusuri dari mana angka evaluasi berasal.",
    ],
  },

  // -- 35: CTA --
  {
    layout: "cta",
    title: "Mulai Lab W5",
    body: "Semua konsep deck ini dipraktikkan di lab notebook: bandingkan RNN, LSTM, dan GRU, plot gradient flow, dan tulis alasan pemilihan arsitektur.\n\nPerkiraan waktu 4-6 jam, termasuk training dua panjang sequence dan analisis gradient.",
    ctaText: "Buka Lab W5 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w5_lstm_sequence.ipynb",
  },
];

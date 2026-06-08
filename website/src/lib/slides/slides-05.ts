import type { SlideSection } from "./index";

export const slides05: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W5: Sequences - RNN & LSTM",
    subtitle: "Membangun model recurrent untuk data sequence, mendiagnosis vanishing gradient, dan memilih arsitektur sesuai panjang dependensi.",
    footnote: "Bab 05 - Minggu 5",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Lima materi minggu ini disusun bottom-up: pilih bentuk output, bangun RNN, lihat kenapa ia gagal, lalu perbaiki dengan LSTM.",
    gridItems: [
      {
        title: "1. Output Head untuk Sequence",
        body: "Kita memetakan bentuk input (T, F) ke bentuk output yang diinginkan beserta head dan loss-nya.",
      },
      {
        title: "2. RNN Vanilla dan BPTT",
        body: "Kita memproses urutan satu langkah waktu demi satu, lalu menghitung gradient sepanjang waktu.",
      },
      {
        title: "3. Vanishing Gradient",
        body: "Kita mengukur gradient yang menyusut di sequence panjang, dan prinsip aditif yang mengatasinya.",
      },
      {
        title: "4. LSTM: Gate dan Cell State",
        body: "Kita melihat cara gate dan cell state memutus rantai perkalian penyebab vanishing, plus GRU sebagai alternatif ringan.",
      },
      {
        title: "5. Memilih dan Mendiagnosis",
        body: "Kita menulis alasan pemilihan arsitektur dan mendiagnosis training sequence yang gagal.",
      },
    ],
  },

  // -- 3: Recap W4 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W4)",
    body: "W4 membangun disiplin alur kerja eksperimen, dan minggu ini disiplin itu dipakai utuh pada arsitektur baru:",
    bullets: [
      "Kita menulis protokol sebelum kode, menjalankan training terkontrol satu variabel, dan merekam tiap run supaya bisa direproduksi.",
      "Tiap perbandingan RNN, LSTM, dan GRU minggu ini dijalankan sebagai eksperimen terkontrol dengan seed dikunci.",
      "Tiga keluarga output head dari W1 muncul lagi, kali ini pada input berbentuk sequence.",
    ],
    footnote: "W5 adalah bab paling padat secara teknis sejauh ini, jadi materi disusun bottom-up.",
  },

  // ============ MATERI 1: Output Head untuk Sequence ============

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Output Head untuk Sequence",
    body: "Keputusan pertama pada tugas sequence adalah bentuk output yang diinginkan, karena bentuk output menentukan head architecture dan loss.",
    footnote: "Input tugas sequence umumnya berbentuk (T, F): T langkah waktu, masing-masing dengan F fitur.",
  },

  // -- 5: Empat formulasi (table) --
  {
    layout: "table",
    title: "Empat formulasi output sequence",
    body: "Keempat formulasi berikut mencakup hampir semua tugas sequence, masing-masing dengan head dan loss yang sesuai:",
    tableHead: ["Tugas", "Output", "Head", "Loss"],
    tableRows: [
      ["Regression scalar akhir", "(1,)", "Linear pada h_T", "MSE/MAE"],
      ["Klasifikasi akhir", "(N,)", "Linear pada h_T", "CrossEntropy"],
      ["Forecast sequence", "(T'', 1)", "Linear pada tiap h_t", "MSE/MAE"],
      ["Token classification", "(T, N)", "Linear pada tiap h_t", "CrossEntropy/token"],
    ],
    footnote: "Di W5 kita fokus pada tiga yang pertama; token classification dibahas di W7.",
  },

  // -- 6: Dari mana h_t diambil --
  {
    layout: "bullets",
    title: "Yang baru di sequence: dari mana h_t diambil",
    body: "Pemilihan loss mengikuti head persis seperti W1. Yang baru adalah dari titik mana hidden state diambil:",
    bullets: [
      "Tugas akhir seperti klasifikasi atau regression scalar mengambil satu nilai di langkah terakhir, yaitu h_T.",
      "Tugas per-langkah seperti forecast atau token classification mengambil seluruh langkah, yaitu h_t di tiap t.",
      "Sebelum memilih head, jawab dulu tiga pertanyaan: seberapa jauh dependensinya, output apa yang diinginkan, dan apakah urutan benar-benar bermakna.",
    ],
    footnote: "Jawaban pertama menentukan apakah RNN vanilla cukup; jawaban ketiga menentukan apakah arsitektur recurrent memang diperlukan.",
  },

  // -- 7: Sequence Classifier code --
  {
    layout: "code",
    title: "Sequence classifier dalam PyTorch",
    body: "Implementasi minimal mengambil hidden state timestep terakhir lalu meneruskannya ke head:",
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
    body: "RNN vanilla memproses sequence satu langkah waktu demi satu. Di tiap timestep ia menggabungkan input baru x_t dengan hidden state sebelumnya h_{t-1} lewat h_t = tanh(W_x x_t + W_h h_{t-1} + b).",
    footnote: "Hidden state h_t menyimpan nilai internal yang diperbarui setiap langkah.",
  },

  // -- 9: image fig05a --
  {
    layout: "image",
    title: "RNN Vanilla vs LSTM Cell",
    imageUrl: "/figures/fig05a_rnn_vs_lstm.svg",
    caption: "Gambar ini membandingkan dua arsitektur recurrent: RNN vanilla yang di-unroll sepanjang timestep di bagian atas, dan detail mekanisme gate di dalam satu sel LSTM di bagian bawah. RNN vanilla hanya memiliki satu jalur hidden state, sedangkan LSTM menambahkan cell state terpisah beserta tiga gate yang mengatur informasi yang dipertahankan, ditulis, dan dikeluarkan.",
    footnote: "Warna amber dipakai konsisten untuk keluarga RNN/LSTM di seluruh modul.",
  },

  // -- 10: Membaca persamaan RNN --
  {
    layout: "bullets",
    title: "Membaca persamaan RNN vanilla",
    body: "Dari gambar tersebut, persamaan h_t = tanh(W_x x_t + W_h h_{t-1} + b) menggabungkan tiga komponen di tiap timestep:",
    bullets: [
      "W_x x_t memproyeksikan input baru pada timestep t ke ruang hidden, dengan W_x berukuran (d_h, F).",
      "W_h h_{t-1} adalah perkalian matriks hidden-to-hidden yang membawa nilai internal dari langkah sebelumnya, dan inilah sumber perkalian berulang penyebab vanishing.",
      "tanh menjaga h_t berada di rentang (-1, 1), sehingga hidden state tidak meledak ke nilai besar.",
    ],
    footnote: "Untuk sequence classification output diambil dari h_T; untuk forecasting output dihitung di tiap timestep.",
  },

  // -- 11: BPTT dua sumbu --
  {
    layout: "bullets",
    title: "BPTT: chain rule pada dua sumbu",
    body: "Pada MLP, backpropagation adalah chain rule yang dirantai mundur lewat layer. Pada RNN, chain rule berjalan di dua sumbu sekaligus:",
    bullets: [
      "Sumbu pertama mundur ke layer dalam, sama seperti MLP, dari output ke hidden ke input pada satu timestep.",
      "Sumbu kedua mundur ke timestep sebelumnya, dari h_t ke h_{t-1} lalu ke h_{t-2}, dan sumbu ini baru di sequence model.",
      "Backpropagation Through Time adalah nama untuk chain rule yang dirantai sepanjang T timestep, dengan jalur terpanjang melewati T-1 langkah.",
    ],
    footnote: "Sumbu kedua inilah tempat vanishing gradient muncul.",
  },

  // -- 12: BPTT 3 timestep code --
  {
    layout: "code",
    title: "BPTT untuk sequence tiga timestep",
    body: "Untuk sequence 3 timestep dengan loss L, gradient terhadap W_h adalah jumlah tiga jalur, dan jalur terpanjang melewati seluruh timestep:",
    lang: "text",
    code: `dL/dW_h = dL/dh_3 · dh_3/dW_h
        + dL/dh_3 · dh_3/dh_2 · dh_2/dW_h
        + dL/dh_3 · dh_3/dh_2 · dh_2/dh_1 · dh_1/dW_h`,
    footnote: "Setiap suku adalah satu jalur perhitungan; gradient harus melewati beberapa timestep sebelum mencapai W_h.",
  },

  // ============ MATERI 3: Vanishing Gradient ============

  // -- 13: Materi 3 --
  {
    layout: "section",
    title: "3. Vanishing Gradient",
    body: "Setiap kali gradient melewati satu langkah mundur, ia dikalikan dengan turunan dh_t/dh_{t-1}, yang untuk RNN vanilla kira-kira sebanding dengan W_h. Setelah T langkah, gradient awal dikalikan w_h pangkat T.",
    footnote: "Vanishing gradient adalah konsekuensi langsung dari perkalian berulang di chain rule.",
  },

  // -- 14: tabel w_h^T --
  {
    layout: "table",
    title: "Apa yang terjadi setelah T langkah mundur",
    body: "Anggap w_h adalah skalar. Tabel berikut menunjukkan nilai w_h pangkat T untuk tiga nilai w_h yang berbeda:",
    tableHead: ["T (langkah)", "w_h=0.5", "w_h=0.9", "w_h=1.1"],
    tableRows: [
      ["1", "0.5", "0.9", "1.1"],
      ["10", "0.001", "0.35", "2.59"],
      ["50", "~9e-16", "0.005", "117"],
      ["100", "~8e-31", "2.6e-5", "13780"],
    ],
    footnote: "Dengan w_h=0.5 gradient setelah 50 langkah praktis nol; dengan w_h=1.1 ia meledak menjadi ribuan.",
  },

  // -- 15: tiga rezim --
  {
    layout: "bullets",
    title: "Tiga rezim gradient pada RNN vanilla",
    body: "Dari tabel tersebut, besar w_h menentukan nasib gradient ketika sequence menjadi panjang:",
    bullets: [
      "Saat |w_h| < 1, gradient menyusut (*vanishing*) sehingga setelah 50-100 langkah gradient praktis nol dan model tidak bisa belajar dependensi panjang.",
      "Saat |w_h| > 1, gradient meledak (*exploding*) sehingga loss tiba-tiba menjadi NaN, dan solusinya gradient clipping.",
      "Saat |w_h| mendekati 1, model berada di titik kritis yang stabil hanya di pinggiran dan sulit dipertahankan tanpa intervensi.",
    ],
    footnote: "Untuk W_h berbentuk matriks, ukuran yang relevan adalah eigenvalue terbesar (spectral radius), tetapi prinsipnya sama.",
  },

  // -- 16: prinsip aditif --
  {
    layout: "bullets",
    title: "Satu prinsip: pembaruan aditif mengurangi perkalian berulang",
    body: "Cara LSTM, ResNet, dan Transformer mengatasi vanishing adalah prinsip yang sama, yaitu menambah jalur aditif bagi gradient:",
    bullets: [
      "Cell state LSTM mengikuti c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t, sehingga turunan dc_t/dc_{t-1} = f_t adalah hasil element-wise dengan forget gate, bukan perkalian matriks penuh.",
      "Residual connection mempelajari F(x) = H(x) - x lalu menghasilkan F(x) + x, dan penambahan x menciptakan jalur langsung bagi gradient ke layer sebelumnya.",
      "Skip connection di Transformer memakai bentuk aditif yang sama, sehingga memahami prinsip ini sekali cukup untuk mengenalinya di W7 dan W8.",
    ],
    footnote: "Simbol ⊙ adalah element-wise multiplication yang menjaga bentuk, berbeda dengan @ yang mengontraksi sumbu.",
  },

  // ============ MATERI 4: LSTM: Gate dan Cell State ============

  // -- 17: Materi 4 --
  {
    layout: "section",
    title: "4. LSTM: Gate dan Cell State",
    body: "LSTM memperkenalkan cell state c_t yang terpisah dari hidden state, beserta tiga gate yang menentukan informasi mana yang dipertahankan atau ditulis. Sebuah gate adalah vektor bernilai 0 sampai 1 yang dikalikan element-wise untuk menyaring tiap komponen secara mandiri.",
    footnote: "Gate dihasilkan oleh sigmoid, sehingga setiap komponen vektor bisa disaring secara terpisah.",
  },

  // -- 18: enam persamaan --
  {
    layout: "code",
    title: "Enam persamaan LSTM yang saling terkait",
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

  // -- 19: apa yang diputuskan tiap gate --
  {
    layout: "bullets",
    title: "Apa yang diputuskan tiap gate",
    body: "Ketiga gate menjawab tiga pertanyaan berbeda tentang informasi yang dipertahankan, ditulis, dan dikeluarkan:",
    bullets: [
      "Forget gate f_t menjawab berapa banyak cell state lama yang dipertahankan; nilai 0.9 berarti pertahankan 90% komponen itu, nilai 0.1 berarti hampir lupa.",
      "Input gate i_t menjawab berapa banyak informasi baru g_t yang ditulis ke cell state, mengontrol penulisan alih-alih retensi.",
      "Output gate o_t menjawab berapa banyak cell state yang dikeluarkan sebagai hidden state output ke timestep berikutnya.",
    ],
    footnote: "Cell state c_t menggabungkan f_t ⊙ c_{t-1} yang dipertahankan dengan i_t ⊙ g_t yang ditulis.",
  },

  // -- 20: image fig05b --
  {
    layout: "image",
    title: "Vanishing Gradient: RNN vs LSTM",
    imageUrl: "/figures/fig05b_gradient_flow.svg",
    caption: "Gambar ini menunjukkan norma gradient per timestep saat backpropagation pada RNN vanilla dibandingkan LSTM. Kurva RNN turun secara eksponensial sehingga gradient di timestep awal nyaris hilang, sedangkan kurva LSTM tetap relatif datar sehingga gradient dari timestep awal masih dapat dihitung.",
    footnote: "Lab W5 memvisualisasikan gejala ini dengan plot log-scale gradient norm per timestep.",
  },

  // -- 21: mengapa cell state memutus vanishing --
  {
    layout: "bullets",
    title: "Mengapa cell state memutus vanishing gradient",
    body: "Dari gambar tersebut, perbedaan kurva muncul karena gradient pada cell state LSTM dihitung lewat jalur yang berbeda dari hidden state RNN:",
    bullets: [
      "Turunan dc_t/dc_{t-1} = f_t hanya melibatkan forget gate, bukan perkalian matriks W_h yang berulang.",
      "Saat forget gate mendekati 1 di sepanjang sequence, gradient pada cell state tetap stabil tanpa cepat menyusut.",
      "RNN vanilla mengalikan gradient dengan W_h di setiap langkah mundur, sehingga setelah 100 langkah gradient mendekati nol seperti pada kurva.",
    ],
    footnote: "Gate bisa belajar ke nilai 1 untuk mempertahankan kontribusi informasi lama secara selektif.",
  },

  // -- 22: forget gate konkret --
  {
    layout: "bullets",
    title: "Forget gate dalam gambaran konkret",
    body: "Ambil sequence sensor glukosa pasien setiap 5 menit selama 24 jam. Cell state menyimpan kondisi stabil terakhir, lalu forget gate menentukan kapan kondisi lama masih relevan:",
    bullets: [
      "Saat data tetap normal, forget gate mendekati 1.0 sehingga cell state hampir tidak berubah dan gambaran kondisi stabil dipertahankan.",
      "Saat terjadi anomali seperti lonjakan glukosa akibat makan berat, forget gate turun ke sekitar 0.3 untuk komponen terkait dan cell state diperbarui.",
      "Saat pasien tidur dan sinyal sangat lambat, forget gate kembali mendekati 1.0 sehingga noise kecil tidak mengganggu gambaran kondisi tidur.",
    ],
    footnote: "Forget gate mempelajari kapan informasi lama harus dilupakan melalui backward pass sepanjang sequence.",
  },

  // -- 23: cell vs hidden state --
  {
    layout: "split",
    title: "Cell state vs hidden state: dua nilai internal yang berbeda",
    body: "Dua nilai internal di LSTM sering membingungkan pemula. Keduanya berbentuk (d_h,) per timestep tetapi punya peran yang berbeda:",
    left: {
      title: "Cell state c_t",
      body: "Menyimpan nilai internal jangka panjang berbasis update aditif.\n\nDiperbarui lewat dua gate (forget dan input) dengan jalur aditif, sehingga gradientnya lebih stabil.\n\nSifatnya internal dan tidak diekspos langsung ke layer berikutnya.",
    },
    right: {
      title: "Hidden state h_t",
      body: "Menjadi output sekaligus input ke timestep berikut.\n\nDiperbarui lewat satu gate (output) dari tanh(c_t), sehingga lebih dipengaruhi perkalian matriks dan riskan vanish.\n\nDiekspos sebagai input ke Linear head atau LSTM layer berikutnya.",
    },
    footnote: "Di PyTorch, nn.LSTM mengembalikan out, (h_n, c_n): out adalah h_t seluruh timestep, h_n dan c_n adalah keadaan terakhir.",
  },

  // -- 24: GRU simplifikasi --
  {
    layout: "bullets",
    title: "GRU: alternatif lebih ringan",
    body: "GRU (Cho et al. 2014) menggabungkan forget gate dan input gate menjadi satu update gate, dan menghilangkan cell state terpisah:",
    bullets: [
      "GRU hanya punya dua gate, bukan tiga, karena fungsi forget gate diserap oleh update gate z_t.",
      "GRU tidak punya cell state terpisah, sehingga hanya hidden state h_t yang dipertahankan.",
      "Jumlah parameter GRU sekitar 25% lebih sedikit daripada LSTM karena satu gate dihapus.",
    ],
    footnote: "Lebih sedikit parameter berarti risiko overfitting yang lebih rendah pada dataset kecil.",
  },

  // -- 25: kapan GRU kapan LSTM --
  {
    layout: "split",
    title: "Kapan memilih GRU dan kapan LSTM",
    body: "Tidak ada pemenang universal; pilihan bergantung pada ukuran data dan panjang sequence. Aturan praktisnya mencoba LSTM dulu sebagai default:",
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

  // ============ MATERI 5: Memilih dan Mendiagnosis ============

  // -- 26: Materi 5 --
  {
    layout: "section",
    title: "5. Memilih dan Mendiagnosis Arsitektur Sequence",
    body: "Setiap pemilihan arsitektur harus bisa dijelaskan dalam satu kalimat yang konkret, dan setiap training sequence yang gagal punya daftar hipotesis yang bisa diperiksa berurutan.",
    footnote: "Diagnosis sequence panjang adalah kebiasaan riset utama yang dilatih minggu ini.",
  },

  // -- 27: template justifikasi --
  {
    layout: "bullets",
    title: "Tiga bagian dalam satu pernyataan justifikasi",
    body: "Pernyataan justifikasi yang baik menyebut arsitektur, sifat tugas, dan bukti empiris secara eksplisit:",
    bullets: [
      "Pilihan dan alasan tugas menyatakan arsitektur yang dipilih beserta sifat tugas yang menuntutnya, misalnya memori jangka panjang atau kebutuhan paralelisasi.",
      "Karakter dataset menyebut panjang sequence T yang sebenarnya, sehingga pilihan terikat pada properti data, bukan kebiasaan.",
      "Bukti empiris pembanding menjelaskan mengapa arsitektur ini lebih baik daripada alternatif, misalnya RNN vanilla gagal akibat vanishing gradient.",
    ],
    footnote: "Satu kalimat justifikasi inilah yang dikirim ke dosen saat memilih arsitektur capstone, sebelum training berjalan lama.",
  },

  // -- 28: lima hipotesis diagnosis --
  {
    layout: "bullets",
    title: "Lima hipotesis saat sequence model gagal belajar",
    body: "Periksa lima hipotesis berikut secara berurutan, dari yang termurah ke yang termahal sebelum mengganti arsitektur:",
    bullets: [
      "Vanishing gradient dicek lewat gradient norm per timestep; kalau turun eksponensial, beralih ke LSTM atau GRU. Sequence terlalu panjang diuji dengan memotongnya lebih pendek.",
      "Shuffle yang salah terjadi pada time series: hanya urutan antar sequence yang boleh diacak, bukan urutan timestep di dalam sequence.",
      "Leakage temporal dan gradient clipping yang terlalu ketat melengkapi daftar; keduanya menghasilkan gejala yang menyesatkan kalau tidak diperiksa.",
    ],
    footnote: "Leakage temporal dibahas mendalam di W6 sebagai salah satu bug paling berbahaya.",
  },

  // -- 29: gradient clipping --
  {
    layout: "split",
    title: "Gradient clipping: clip_grad_norm_ vs clip_grad_value_",
    body: "RNN dan LSTM tanpa clipping sering mengalami exploding gradient. Dua fungsi clipping bekerja sangat berbeda, dan untuk recurrent yang berbasis norma hampir selalu lebih tepat:",
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

  // -- 30: keyakinan keliru --
  {
    layout: "bullets",
    title: "Tiga keyakinan yang perlu diluruskan",
    body: "Ketiga pernyataan berikut benar dalam kondisi sempit tetapi menyesatkan jika dianggap berlaku universal:",
    bullets: [
      "\"Sequence selalu butuh RNN/LSTM\" keliru: kalau dependensi hanya 5-10 langkah, CNN 1D atau MLP dengan windowed features kadang lebih efisien.",
      "\"LSTM selalu lebih baik dari GRU\" tidak benar karena GRU lebih cepat dilatih dan sering sebanding, sehingga keduanya layak dicoba.",
      "\"Hidden state terakhir mewakili seluruh sequence\" gagal pada sequence sangat panjang; solusinya bidirectional LSTM atau attention pada semua hidden state.",
    ],
    footnote: "Angka evaluasi yang terlalu bagus juga perlu dicurigai: shuffle bebas pada time series menyebabkan leakage yang dibahas di W6.",
  },

  // ============ LAB + REFLEKSI + CTA ============

  // -- 31: Lab W5 --
  {
    layout: "bullets",
    title: "Lab W5: RNN vs LSTM gradient flow (wajib)",
    body: "Lab memakai sine_sequence dataset dan mengikuti urutan materi di atas, sekaligus memenuhi Breadth Check keluarga RNN/LSTM:",
    bullets: [
      "Latih RNN vs LSTM pada seq_len=50 lalu seq_len=200, dan amati selisih performa membesar saat sequence memanjang.",
      "Plot gradient norm per timestep untuk keduanya, sehingga kurva vanishing pada RNN terlihat jelas dibanding LSTM yang datar.",
      "Tulis pernyataan justifikasi arsitektur dengan template materi 5, lalu coba GRU sebagai alternatif ketiga.",
    ],
    footnote: "Checklist: smoke test lulus, plot gradient flow menunjukkan vanishing, tabel MAE tiga arsitektur, justifikasi tertulis, dan clipping aktif di semua model.",
  },

  // -- 32: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Tiga pertanyaan untuk dibawa ke portofolio mandiri dan dipakai lagi saat menentukan arsitektur capstone:",
    bullets: [
      "Untuk dataset EKG 5000 titik per sampel dengan target 4 kelas aritmia, apakah LSTM arsitektur pertama Anda, dan dua alternatif apa beserta trade-off-nya?",
      "Setelah melihat plot gradient flow di lab, pada panjang berapa RNN vanilla mulai kehilangan sinyal, dan bagaimana angka itu mengubah keputusan Anda?",
      "Bagaimana strategi engineered, extracted, dan learned features muncul dalam konteks sequence, dengan satu contoh konkret untuk masing-masing di domain sensor?",
    ],
  },

  // -- 33: Lanjut ke W6 --
  {
    layout: "bullets",
    title: "Lanjut ke W6",
    body: "Dengan W5 selesai, Anda bisa membangun dan mendiagnosis arsitektur recurrent. W6 menggabungkan dua tema yang menentukan validitas hasil:",
    bullets: [
      "Representasi fitur dalam konteks sequence melanjutkan tema engineered, extracted, dan learned dari minggu-minggu awal.",
      "Temporal leakage dibahas sebagai salah satu bug paling berbahaya yang menghasilkan angka bagus tetapi hasil yang tidak valid.",
      "Diagnosis sequence dan kecurigaan terhadap angka yang terlalu bagus dari W5 menjadi bekal untuk menelusuri dari mana angka evaluasi berasal.",
    ],
  },

  // -- 34: CTA --
  {
    layout: "cta",
    title: "Mulai Lab W5",
    body: "Semua konsep deck ini ada di lab notebook: perbandingan RNN vs LSTM vs GRU, plot gradient flow, dan pernyataan justifikasi arsitektur.\n\nEstimasi waktu 4-6 jam termasuk training dua panjang sequence dan analisis gradient.",
    ctaText: "Buka Lab W5 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w5_lstm_sequence.ipynb",
  },
];

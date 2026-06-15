import type { SlideSection } from "./index";

export const slides01: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W1: Tabular & Output Heads",
    subtitle: "Memetakan satu tugas tabular ke pasangan output head dan loss yang cocok, lalu menjalankan satu training MLP end-to-end.",
    footnote: "Bab 01 - Minggu 1",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Empat materi minggu ini mengikuti alur dari melihat tugas sampai membaca hasilnya:",
    gridItems: [
      {
        title: "1. MLP Mengubah Bentuk Tensor",
        body: "Kita memisahkan body yang mengekstrak fitur dari head yang berubah mengikuti tugas.",
      },
      {
        title: "2. Pencocokan Output Head dan Loss",
        body: "Kita mencocokkan tiga pasangan kanonik untuk regression, binary, dan multiclass.",
      },
      {
        title: "3. Training Loop PyTorch",
        body: "Kita menjalankan lima langkah yang berulang dari W1 sampai capstone, plus pipeline data di sekitarnya.",
      },
      {
        title: "4. Observasi Sebelum Kesimpulan",
        body: "Kita memisahkan apa yang teramati dari apa yang disimpulkan saat membaca hasil.",
      },
    ],
  },

  // -- 3: Recap prasyarat --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (Prasyarat)",
    body: "Prasyarat modul menyiapkan bekal yang langsung dipakai minggu ini. Kalau salah satu masih asing, baca ulang sebelum lanjut:",
    bullets: [
      "Kita sudah belajar membaca shape tensor sebagai tuple, misalnya (F,) untuk satu sampel dan (B, F) untuk satu batch.",
      "Kita sudah melihat satu langkah training PyTorch dan dasar kalkulus untuk chain rule.",
      "Refleks W1 yang dibangun: lihat shape input dan shape output, lalu pilih keluarga model yang memetakan keduanya.",
    ],
    footnote: "W1 memakai tabular karena kompleksitas domainnya paling rendah: satu vektor masuk, satu prediksi keluar, tanpa augmentasi atau tokenisasi.",
  },

  // -- 4: Materi 1 section --
  {
    layout: "section",
    title: "1. MLP Mengubah Bentuk Tensor",
    body: "MLP mengambil vektor fitur (F,) dan menghasilkan vektor output (D_{out},) lewat rangkaian Linear dan ReLU. D_{out} ditentukan oleh tugas, bukan oleh data.",
    footnote: "Regression memakai D_{out} = 1, binary memakai 1 atau 2, dan multiclass dengan N kelas memakai N.",
  },

  // -- 5: Body-head image (bottom-up: gambar dulu) --
  {
    layout: "image",
    title: "Satu Body Bersama, Tiga Head",
    imageUrl: "/figures/fig01g_tiga_tugas.png",
    caption: "Gambar ini menunjukkan satu badan MLP bersama yang mengekstrak fitur, lalu tiga head berbeda yang mengubah fitur itu ke bentuk output untuk regresi, klasifikasi biner, dan multikelas.",
    footnote: "Body sama untuk semua tugas; hanya head yang berubah. Inilah yang membuat tiga tugas bisa dibandingkan pada data yang sama.",
  },

  // -- 6: Body-head text (mengacu ke gambar) --
  {
    layout: "split",
    title: "Body dan Head: Struktur Dua Bagian",
    body: "Dari gambar tersebut, model terbagi dua bagian dengan peran yang berbeda:",
    left: {
      title: "Body (bersama)",
      body: "Body adalah rangkaian Linear dan ReLU yang mengekstrak fitur generik dari input. Struktur ini sama untuk semua tugas pada data yang sama.\n\nOutput body berbentuk (B, H) dengan H sebagai ukuran hidden layer terakhir.",
    },
    right: {
      title: "Head (per-tugas)",
      bullets: [
        "Regression memakai head Linear(H, 1) tanpa aktivasi apa pun.",
        "Multiclass dengan K kelas memakai head Linear(H, K) yang menghasilkan K logit.",
        "Head yang salah membuat loss tidak bisa turun dengan benar, dan bug ini lebih mudah didiagnosis karena cakupannya terbatas.",
      ],
    },
    footnote: "Pola body-head ini sama dengan model pretrained di W7-W8: backbone bersama di-freeze, lalu head kecil dilatih untuk tugas baru.",
  },

  // -- 7: Linear layer mekanik --
  {
    layout: "bullets",
    title: "Linear Layer: Mekanik dengan Angka Kecil",
    body: "Satu Linear layer menjalankan transformasi affine y = W x + b. Berikut tiga hal yang perlu dikenali dari setiap layer:",
    bullets: [
      "Rumusnya adalah y = W x + b, yaitu satu perkalian matriks ditambah bias, dengan W dan b yang dipelajari otomatis lewat training.",
      "Contoh nn.Linear(10, 64) memiliki W berukuran (64, 10) dan b berukuran (64,), total 704 parameter yang menerima gradient saat backward.",
      "Shape berubah dari (B, 10) ke (B, 64): dimensi fitur berubah, sedangkan ukuran batch B tetap.",
    ],
    footnote: "ReLU(x) = max(0, x) yang mengikuti Linear mengubah nilai negatif menjadi nol dan melewatkan nilai positif apa adanya.",
  },

  // -- 8: Kenapa butuh non-linearitas --
  {
    layout: "split",
    title: "Kenapa Butuh ReLU?",
    body: "ReLU diperlukan agar kedalaman model benar-benar menambah kapasitas. Tanpa aktivasi non-linear, dua layer setara dengan satu:",
    left: {
      title: "Dua Linear = satu Linear",
      body: "Menumpuk dua Linear tanpa aktivasi setara dengan satu Linear, karena W₂(W₁ x + b₁) + b₂ tetap fungsi linier.\n\nWalaupun lebih dalam secara struktur, kapasitas representasi tidak naik.",
    },
    right: {
      title: "ReLU menambah titik patah",
      body: "ReLU menambahkan titik patah di antara layer, sehingga komposisi dua layer bisa membentuk decision boundary yang melengkung.\n\nKombinasi Linear → ReLU → Linear → ReLU adalah resep MLP standar.",
    },
    footnote: "Fakta ini, bahwa non-linearitas wajib ada, muncul lagi di W2 (CNN) dan W5 (RNN dan LSTM).",
  },

  // -- 9: Body + 3 head dalam PyTorch --
  {
    layout: "code",
    title: "Body + 3 Head dalam PyTorch",
    body: "Diagram body-head ditulis langsung sebagai satu badan bersama diikuti tiga head paralel, sehingga satu forward pass menghasilkan tiga output sekaligus:",
    code: `class ArsitekturMultiTugas(nn.Module):
    def __init__(self, jumlah_fitur=10, jumlah_kelas=3):
        super().__init__()
        self.badan_mlp = nn.Sequential(
            nn.Linear(jumlah_fitur, 64), nn.ReLU(),
            nn.Linear(64, 32), nn.ReLU(),
        )
        self.kepala_regresi = nn.Linear(32, 1)
        self.kepala_biner = nn.Linear(32, 1)
        self.kepala_multikelas = nn.Linear(32, jumlah_kelas)

    def forward(self, x):
        fitur = self.badan_mlp(x)
        return (self.kepala_regresi(fitur),
                self.kepala_biner(fitur),
                self.kepala_multikelas(fitur))`,
    lang: "python",
    footnote: "Tiga head berbagi badan yang sama, sehingga representasi (B, 32) tidak perlu dihitung dua kali.",
  },

  // -- 10: Materi 2 section --
  {
    layout: "section",
    title: "2. Pencocokan Output Head dan Loss",
    body: "Pasangan output head dan loss tidak bebas dipilih. Tugas menentukan bentuk head, dan head menentukan loss yang dipakai.",
    footnote: "Menukar pasangan ini menghasilkan bug yang sulit didiagnosis: loss kadang tetap turun, tapi model tidak belajar hal yang benar.",
  },

  // -- 11: Regression --
  {
    layout: "split",
    title: "Regression: Linear Head + MSE",
    body: "Tugas regression memprediksi angka kontinu seperti harga rumah atau suhu besok:",
    left: {
      title: "Head",
      body: "Output head-nya adalah Linear(D, 1) tanpa aktivasi, dengan output shape (B, 1) berisi satu nilai kontinu per sampel.\n\nTarget y berupa bilangan real, bukan indeks kelas.",
    },
    right: {
      title: "Loss: MSE",
      body: "MSE menghitung rata-rata kuadrat selisih, (1/N) Σ (ŷ - y)².\n\nPenalti naik kuadratis, sehingga meleset 1.0 menyumbang loss empat kali lebih besar daripada meleset 0.5. Untuk data dengan banyak outlier, MAE sering lebih stabil.",
    },
    footnote: "MSE selalu positif dan bernilai nol hanya saat prediksi sempurna.",
  },

  // -- 12: Binary --
  {
    layout: "split",
    title: "Binary: Logit + BCE atau CrossEntropy",
    body: "Tugas binary memprediksi ya atau tidak, dan punya dua bentuk head yang sama-sama valid:",
    left: {
      title: "Dua varian head",
      body: "Varian pertama memakai Linear(D, 1) yang menghasilkan satu logit, dipasangkan dengan BCEWithLogitsLoss.\n\nVarian kedua memakai Linear(D, 2) yang menghasilkan dua logit, dipasangkan dengan CrossEntropyLoss. Pilih satu dan pakai konsisten.",
    },
    right: {
      title: "Sigmoid menghukum yang yakin tapi salah",
      body: "Sigmoid memetakan logit z=0 ke 0.5, z=2 ke 0.88, dan z=-2 ke 0.12.\n\nSaat target 1 tapi model output z=-2 (yakin salah), loss melonjak ≈ 2.13. Penalti naik tajam saat prediksi makin yakin di sisi yang salah.",
    },
    footnote: "Pakai BCEWithLogitsLoss yang menggabung sigmoid dan log dalam satu langkah stabil, bukan Sigmoid lalu BCELoss terpisah.",
  },

  // -- 13: Multiclass --
  {
    layout: "split",
    title: "Multiclass: K Logit + CrossEntropy",
    body: "Tugas multiclass dengan N kelas memprediksi salah satu dari N kategori:",
    left: {
      title: "Head",
      body: "Output head-nya adalah Linear(D, N) yang menghasilkan vektor logit panjang N. Untuk 3 kelas, output shape-nya (B, 3).\n\nSaat evaluasi, logits.argmax(dim=1) menghasilkan indeks kelas prediksi.",
    },
    right: {
      title: "Loss: CrossEntropy",
      body: "Softmax memetakan logit ke distribusi probabilitas yang jumlahnya 1. Misal logit [2.0, 1.0, 0.5] menjadi sekitar [0.62, 0.23, 0.15].\n\nTarget-nya tensor integer 0 sampai N-1, bukan one-hot dan bukan probabilitas.",
    },
    footnote: "CrossEntropyLoss menggabung LogSoftmax dan NLLLoss, dan menerima logit mentah tanpa softmax tambahan.",
  },

  // -- 14: Logit mentah penting --
  {
    layout: "bullets",
    title: "Logit Mentah: Aturan yang Sering Dilanggar",
    body: "Kesalahan paling umum pemula adalah menambahkan softmax atau sigmoid sebelum loss. Tiga hal yang perlu diingat:",
    bullets: [
      "Logit mentah adalah output Linear terakhir tanpa aktivasi apa pun.",
      "BCEWithLogitsLoss dan CrossEntropyLoss keduanya mengharapkan logit mentah, karena sigmoid dan softmax dilakukan di dalam loss untuk stabilitas numerik.",
      "Menambahkan softmax lalu mengirimnya ke CrossEntropyLoss membuat gradient mengecil tidak wajar dan training tidak konvergen.",
    ],
    footnote: "Cek pasangan loss, head, dan target lebih dulu sebelum mendebug arsitektur.",
  },

  // -- 15: Sigmoid vs softmax image --
  {
    layout: "image",
    title: "Sigmoid vs Softmax",
    imageUrl: "/figures/fig01i_sigmoid_softmax.png",
    caption: "Gambar ini membandingkan sigmoid yang membuat tiap output independen dengan softmax yang menghasilkan distribusi probabilitas yang totalnya selalu 1.",
    footnote: "Sigmoid dipakai untuk multilabel karena tiap kelas independen, sementara softmax dipakai untuk multiclass karena kelasnya saling eksklusif.",
  },

  // -- 16: Tabel 5 konfigurasi --
  {
    layout: "table",
    title: "5 Konfigurasi Head dan Loss",
    body: "Tabel berikut adalah rujukan cepat. Cetak dan tempel di samping monitor saat Lab:",
    tableHead: ["Tugas", "Output head", "Loss", "Bentuk target"],
    tableRows: [
      ["Regression scalar", "Linear(D, 1)", "MSE atau MAE", "float"],
      ["Binary", "Linear(D, 1)", "BCEWithLogitsLoss", "float 0/1"],
      ["Binary (alt)", "Linear(D, 2)", "CrossEntropyLoss", "int64 0/1"],
      ["Multiclass (N)", "Linear(D, N)", "CrossEntropyLoss", "int64 0..N-1"],
      ["Multilabel", "Linear(D, N)", "BCEWithLogitsLoss", "float vektor 0/1"],
    ],
    footnote: "Tabel ini juga ada di Lampiran dan menjadi rujukan utama untuk Lab langkah 2-4.",
  },

  // -- 17: Bug umum image --
  {
    layout: "image",
    title: "Pasangan Benar vs Bug Umum",
    imageUrl: "/figures/loss_head_matching.png",
    caption: "Gambar ini membandingkan tiga pasangan head dan loss yang benar dengan tiga bug yang paling sering terjadi. Sebagian bug tidak menghasilkan error, tapi membuat model tidak belajar hal yang benar.",
    footnote: "Bug paling berbahaya adalah Linear(H, K) dengan MSELoss: tidak ada error, loss bahkan bisa turun, tapi model tidak belajar distribusi kelas yang benar.",
  },

  // -- 18: Materi 3 section --
  {
    layout: "section",
    title: "3. Training Loop PyTorch",
    body: "MLP belajar lewat backpropagation: setelah loss dihitung, gradient terhadap tiap parameter dihitung mundur lewat chain rule, lalu optimizer memperbarui parameter ke arah penurunan loss.",
    footnote: "Chain rule tidak perlu diturunkan manual minggu ini. Derivasi 7-langkah ada di Lampiran A.13 untuk dibaca setelah ada beberapa run sukses.",
  },

  // -- 19: Training loop image (bottom-up) --
  {
    layout: "image",
    title: "Lima Langkah yang Berulang",
    imageUrl: "/figures/fig03c_training_cycle.png",
    caption: "Gambar ini menunjukkan lima langkah dalam satu iterasi training: forward, hitung loss, zero_grad, backward, lalu step. Urutan ini tidak bisa ditukar.",
    footnote: "zero_grad() harus dipanggil sebelum backward(). Kalau dilewati, gradient batch sebelumnya menumpuk dan parameter diperbarui dari campuran dua batch.",
  },

  // -- 20: Training loop kode --
  {
    layout: "code",
    title: "Training Loop: 5 Langkah Inti",
    body: "Dari gambar tersebut, lima langkah ini berulang sepanjang modul, dari W1 sampai capstone:",
    code: `criterion = nn.CrossEntropyLoss()                # logit mentah, target int
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4)

for epoch in range(10):
    for x, y in train_loader:        # x: (B, 10), y: (B,) int64
        logits = model(x)            # 1. forward pass
        loss = criterion(logits, y)  # 2. hitung loss
        optimizer.zero_grad()        # 3. reset gradient lama
        loss.backward()              # 4. chain rule mundur
        optimizer.step()             # 5. geser parameter`,
    lang: "python",
    footnote: "Yang berubah antar minggu hanya definisi model, pilihan criterion, dan cara train_loader dibangun.",
  },

  // -- 21: Pipeline data --
  {
    layout: "bullets",
    title: "Pipeline Data di Sekitar Loop",
    body: "Di sekitar training loop ada pipeline data yang menyiapkan batch dan menjaga evaluasi tetap bersih:",
    bullets: [
      "Sampel (F,) dikelompokkan jadi batch (B, F) untuk efisiensi, dan loss dihitung sebagai rata-rata atas seluruh batch.",
      "Data dibagi tiga: train melatih parameter, val untuk early stopping dan tuning, dan test disentuh sekali di akhir untuk angka final.",
      "Statistik preprocessing (mean, std) dihitung dari train saja, lalu diterapkan ke val dan test dengan nilai yang sama.",
    ],
    footnote: "Melanggar aturan statistik train-saja disebut preprocessing leakage, dan dibahas mendalam di W6 dengan demo akurasi yang turun dari 0.92 ke 0.63.",
  },

  // -- 22: Materi 4 section --
  {
    layout: "section",
    title: "4. Observasi Sebelum Kesimpulan",
    body: "Lab menjalankan tiga tugas pada satu dataset tabular sintetis: input identik, sedangkan output head dan loss berubah. Untuk tiap run, catat train loss, val loss, dan satu metrik yang sesuai.",
    footnote: "MAE untuk regression, accuracy untuk binary, dan accuracy plus macro-F1 untuk multiclass.",
  },

  // -- 23: Observasi vs kesimpulan --
  {
    layout: "split",
    title: "Memisahkan Observasi dari Kesimpulan",
    body: "Kebiasaan inti W1 adalah menulis observasi murni dulu, baru tafsiran. Pemisahan ini menahan overclaiming sepanjang semester:",
    left: {
      title: "Observasi",
      body: "Observasi adalah angka dan bentuk kurva yang terlihat, ditulis tanpa tafsiran.\n\nContoh: val accuracy berhenti di sekitar 0.33 untuk tiga kelas, dan loss train turun sedikit lalu datar.",
    },
    right: {
      title: "Kesimpulan",
      body: "Kesimpulan adalah interpretasi dan hipotesis yang ditarik dari observasi.\n\nSebelum menyimpulkan model berhasil, cek apakah accuracy hanya mendekati 1/K, apakah loss benar-benar turun, dan apakah pasangan loss dan head sudah benar.",
    },
    footnote: "Kebiasaan ini menjadi dasar pelaporan hasil ke dosen yang dilatih penuh mulai W4.",
  },

  // -- 24: Lab --
  {
    layout: "bullets",
    title: "Lab W1",
    body: "Lab mengikuti urutan empat materi di atas, dengan estimasi waktu 3-4 jam:",
    bullets: [
      "Jalankan smoke test (--dry-run), lalu tiga run terpisah untuk regression, binary, dan multiclass dengan pasangan head dan loss yang benar.",
      "Jalankan satu run dengan pasangan loss dan head yang sengaja salah, amati kegagalannya, lalu tulis 2 kalimat tentang apa yang gagal.",
      "Tulis satu paragraf observasi murni dan satu paragraf interpretasi, terpisah, di observasi_vs_interpretasi.md.",
    ],
    footnote: "Lab 1b (MLP numpy from-scratch) bersifat opsional dan menerapkan backprop 7-langkah secara konkret pada MNIST.",
  },

  // -- 25: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Tiga pertanyaan untuk dibawa ke portofolio mandiri sebagai entri pra-W4:",
    bullets: [
      "Binary bisa dijalankan dengan Linear(D, 1) + BCE atau Linear(D, 2) + CrossEntropy. Apa konsekuensi praktis tiap pilihan, dan mana yang Anda pakai?",
      "Sebutkan satu pengamatan dari Lab yang tergoda Anda interpretasikan terlalu cepat, dan pertanyaan apa yang seharusnya diajukan dulu.",
      "Tulis dua baris peta besar untuk regression dan multiclass Lab: apa bentuk input, bentuk output, dan keluarga modelnya?",
    ],
  },

  // -- 26: Lanjut ke W2 --
  {
    layout: "bullets",
    title: "Lanjut ke W2",
    body: "W2 masuk ke domain citra, dengan fondasi W1 tetap berlaku:",
    bullets: [
      "Tensor citra (C, H, W) masuk sebagai input, dan CNN bekerja sebagai pendeteksi pola lokal.",
      "Smoke test tiga level menjadi kebiasaan debugging utama minggu depan.",
      "Pola body-head, pencocokan head dan loss, training loop lima langkah, dan kebiasaan observasi sebelum kesimpulan dari W1 dipakai di setiap minggu berikutnya.",
    ],
  },

  // -- 27: CTA --
  {
    layout: "cta",
    title: "Mulai Lab W1",
    body: "Semua konsep deck ini ada di lab notebook: tiga tugas pada satu dataset, eksperimen pasangan loss dan head yang sengaja salah, dan tulisan observasi versus interpretasi.\n\nEstimasi waktu 3-4 jam termasuk refleksi.",
    ctaText: "Buka Lab W1 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w1_tabular_heads.ipynb",
  },
];

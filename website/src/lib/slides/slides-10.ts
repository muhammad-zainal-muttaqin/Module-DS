import type { SlideSection } from "./index";

export const slides10: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W10: Paper Reading & Implementasi Paper",
    subtitle: "Menyaring banyak paper jadi sedikit yang relevan, membacanya dengan tiga putaran, lalu menerjemahkan satu kontribusi inti jadi kode yang bisa diuji.",
    footnote: "Bab 10 - Minggu 10",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Lima materi minggu ini mengikuti perjalanan satu paper, dari menyaringnya sampai mengujinya:",
    gridItems: [
      {
        title: "1. Kurasi Paper",
        body: "Kita menyaring ratusan paper arXiv jadi satu sampai dua yang layak dibaca penuh lewat empat filter.",
      },
      {
        title: "2. Membaca Tiga Putaran",
        body: "Kita membaca paper dengan tiga lapis kedalaman, dari skim 10 menit sampai kritik mendalam.",
      },
      {
        title: "3. Paper-to-Code",
        body: "Kita mengekstrak satu kontribusi inti dan mengimplementasikannya jadi kode minimal yang bisa diuji.",
      },
      {
        title: "4. Ablation Kecil",
        body: "Kita menjalankan satu perubahan terkontrol untuk menguji apakah komponen yang diklaim penting memang berdampak.",
      },
      {
        title: "5. Peta Model Generatif",
        body: "Kita menyiapkan kosakata untuk membaca paper VAE, GAN, Diffusion, dan Normalizing Flow.",
      },
    ],
  },

  // -- 3: Recap W9 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W9)",
    body: "W9 mengajarkan cara menggabungkan beberapa modalitas dan menguji kontribusi tiap modalitas. Kebiasaan itu dibawa ke W10:",
    bullets: [
      "Kita menggabungkan beberapa modalitas dengan strategi fusion dan menangani modalitas hilang.",
      "Kita menjalankan ablation per modalitas: menguji satu komponen sambil mengunci sisanya.",
      "Output yang dibawa: kebiasaan mengisolasi satu komponen lalu mengujinya, kini diarahkan ke paper orang lain.",
    ],
    footnote: "Disiplin eksperimen terkontrol dan trace result dari W4 dipakai saat menjalankan ablation paper.",
  },

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Kurasi Paper",
    body: "arXiv menerbitkan ratusan paper ML per hari, sehingga membaca semuanya mustahil. Tujuan kurasi adalah menyaring jadi 5-10 paper per minggu yang layak waktu Anda, lalu menyaringnya lagi jadi satu sampai dua yang dibaca penuh.",
    footnote: "Rasio akhirnya sekitar 1 banding 250: penyaringan inilah yang membuat waktu baca terpakai pada paper yang tepat.",
  },

  // -- 5: Funnel image --
  {
    layout: "image",
    title: "Funnel seleksi paper",
    imageUrl: "/figures/fig09a_paper_funnel.svg",
    caption: "Gambar ini menunjukkan funnel seleksi paper dari sekitar 500 judul di arXiv menyusut jadi 1-2 paper yang dibaca penuh. Setiap tingkat menyaring lebih ketat: kategori dan kata kunci, lalu judul, lalu abstrak, lalu baca cepat, sampai hanya paper paling bernilai yang menembus ke pembacaan mendalam.",
    footnote: "Empat filter berurutan dari kasar ke halus membuat penyaringan ratusan paper terasa terkendali.",
  },

  // -- 6: Empat filter --
  {
    layout: "grid",
    title: "Empat filter dari kasar ke halus",
    body: "Dari gambar tersebut, keempat filter naik biaya waktunya secara bertahap dan memangkas paper di tiap tingkat:",
    gridItems: [
      {
        title: "1. Kategori dan kata kunci",
        body: "Kita berlangganan kategori spesifik seperti cs.CV atau cs.LG, ditambah kata kunci dari minat Anda.",
      },
      {
        title: "2. Judul",
        body: "Kita menolak sekitar 80% paper hanya dari judul, dan memproses 50 judul dalam 5 menit.",
      },
      {
        title: "3. Abstrak",
        body: "Kita membaca 10 abstrak, menanyakan apakah klaimnya menarik dan metodenya memberi sesuatu, lalu memilih 5 teratas.",
      },
      {
        title: "4. Baca cepat",
        body: "Kita membaca introduction, figure pertama, dan tabel hasil dari 5 paper untuk menentukan mana yang layak dibaca mendalam.",
      },
    ],
    footnote: "Simpan ID paper seperti 2312.01234, bukan judul, karena ID lebih stabil untuk dirujuk ulang.",
  },

  // -- 7: arXiv skeptisisme --
  {
    layout: "code",
    title: "arXiv adalah alat akses, bukan sumber otoritas",
    body: "Tidak ada peer-review di titik unggah, sehingga paper lemah dan klaim berlebihan juga masuk. Catat status dan keraguan Anda saat menyimpan paper:",
    lang: "markdown",
    code: `Status publikasi: arXiv preprint v2; belum menemukan versi peer-reviewed.
Catatan skeptis: klaim utama bergantung pada satu dataset;
                 belum ada ablation untuk komponen X.`,
    footnote: "Otoritas paper datang dari bukti, bukan dari keberadaan PDF di arXiv.",
  },

  // -- 8: Materi 2 --
  {
    layout: "section",
    title: "2. Membaca Tiga Putaran",
    body: "Paper akademik tidak dirancang untuk dibaca linear dari depan ke belakang. Metode tiga putaran (Keshav 2007) membagi pembacaan jadi tiga lapis kedalaman.",
    footnote: "Di akhir tiap putaran Anda memutuskan: lanjut ke putaran berikutnya, atau berhenti dan pilih paper lain.",
  },

  // -- 9: Tiga putaran grid --
  {
    layout: "grid",
    title: "Tiga putaran, tiga tujuan",
    body: "Ketiga putaran naik dari peta menyeluruh ke kritik mendalam, masing-masing dengan target waktu dan output sendiri:",
    gridItems: [
      {
        title: "Putaran 1 - Peta (10 menit)",
        body: "Kita membaca judul, abstrak, figure pertama, tabel hasil, dan conclusion untuk menjawab apa yang diklaim, apa yang diukur, dan apakah hasilnya meyakinkan dari tabel saja.",
      },
      {
        title: "Putaran 2 - Detail (30-45 menit)",
        body: "Kita membaca method dan experimental setup secara aktif sambil mencatat 3-5 pertanyaan teknis yang langsung mengarahkan implementasi.",
      },
      {
        title: "Putaran 3 - Mendalam (30-60 menit)",
        body: "Hanya untuk paper penting. Kita mencari apa yang tidak dibahas dan apakah klaim melampaui data, lalu menulis satu paragraf critique.",
      },
    ],
    footnote: "Kalau setelah putaran 1 Anda tidak bisa menjawab tiga pertanyaan dasar, paper mungkin ditulis kurang baik atau terlalu jauh dari Anda.",
  },

  // -- 10: Template catatan --
  {
    layout: "code",
    title: "Catatan paper empat bagian",
    body: "Catatan yang tidak pernah dibuka lagi tidak ada gunanya. Empat bagian berikut cukup untuk tiap paper yang dibaca sampai putaran dua, dan bisa disalin langsung:",
    lang: "markdown",
    code: `# Judul (authors, venue, year)

## TL;DR        # 1-2 kalimat, klaim paper dalam kata Anda
## Metode       # 3-5 kalimat, sisipkan rumus penting
## Bukti        # dataset + metrik + angka konkret
## Pertanyaan   # 3-5 detail tak jelas / baseline kurang
## Rencana      # komponen yang diimplementasikan + ablation`,
    footnote: "Simpan di docs/papers/; setelah 20 paper, Anda punya literatur pribadi yang bisa dicari dengan grep.",
  },

  // -- 11: Materi 3 --
  {
    layout: "section",
    title: "3. Paper-to-Code",
    body: "Menerjemahkan paper jadi kode berarti mengisolasi satu kontribusi inti lalu mengimplementasikannya, tidak menyalin seluruh arsitektur. Enam langkah membawa Anda dari abstrak ke kode minimal yang bisa dijalankan.",
    footnote: "Kalau Anda belum bisa menjelaskan satu kontribusi inti dalam satu kalimat, jangan mulai menulis kode.",
  },

  // -- 12: Langkah 1-3 --
  {
    layout: "bullets",
    title: "Langkah 1 sampai 3: isolasi kontribusi inti",
    body: "Tiga langkah pertama memastikan Anda tahu persis apa yang akan diimplementasikan sebelum menulis kode:",
    bullets: [
      "**Identifikasi kontribusi inti** sebagai satu inovasi terpenting paper, ditulis dalam satu kalimat.",
      "**Cari input dan output shape** dari metode baru, dan cek pseudocode atau codebase resmi kalau tidak eksplisit di paper.",
      "**Pisahkan inti dari detail rekayasa**, membedakan komponen kunci dari optimisasi sekunder yang bisa diabaikan dulu.",
    ],
    footnote: "Banyak paper punya banyak trik tambahan; hanya kontribusi inti yang diimplementasikan dulu.",
  },

  // -- 13: Langkah 4-6 --
  {
    layout: "bullets",
    title: "Langkah 4 sampai 6: bangun, verifikasi, ablation",
    body: "Tiga langkah berikutnya membangun versi minimal lalu mengujinya terhadap klaim paper:",
    bullets: [
      "**Buat versi minimal yang bisa dijalankan** dengan hanya kontribusi inti pada dataset kecil, lalu smoke test dulu.",
      "**Verifikasi kecocokan angka** dengan mereproduksi satu angka paper pada konfigurasi yang sama, bandingkan dengan kode resmi kalau ada.",
      "**Jalankan satu ablation** dengan menghapus atau memodifikasi komponen inti untuk melihat apakah performa turun seperti yang diklaim.",
    ],
    footnote: "Detail penting sering tersembunyi di appendix atau code repository, jadi cek keduanya.",
  },

  // -- 14: Worked example Rani --
  {
    layout: "split",
    title: "Worked example: satu minggu Rani",
    body: "Rani menjalankan seluruh alur paper-to-code pada focal loss (Lin et al. 2017) dalam satu minggu, dari kurasi sampai ablation:",
    left: {
      title: "Kurasi dan baca",
      body: "Rani mencari paper dengan kata kunci class imbalance dan loss function, lalu mengecek statusnya di ICCV 2017.\n\nTiga putaran mengambil klaim utama dan bentuk inti loss-nya, FL(p_t) = -(1 - p_t)^γ log(p_t).",
    },
    right: {
      title: "Kode dan uji",
      body: "Rani memisahkan inti dari RetinaNet, jadi tidak perlu anchor matching atau FPN, hanya focal loss pada classifier kecil.\n\nIa menambahkan FocalLoss di src/losses.py dan menguji bahwa gamma=0 identik dengan cross-entropy.",
    },
    footnote: "Kalau gamma=0 tidak identik dengan cross-entropy dalam toleransi numerik, implementasinya belum boleh dipakai untuk training.",
  },

  // -- 15: Materi 4 --
  {
    layout: "section",
    title: "4. Ablation Kecil",
    body: "Ablation untuk W10 bukan eksperimen besar. Ablation berarti satu perubahan terkontrol yang menjawab apakah komponen yang diklaim penting memang berdampak.",
    footnote: "Aturan satu variabel berubah dan trace result mengikuti pembahasan W4.",
  },

  // -- 16: Tabel ablation --
  {
    layout: "table",
    title: "Contoh ablation kecil",
    body: "Tiap ablation menyentuh satu kontribusi inti dengan satu variabel berubah dan metrik yang sama:",
    tableHead: ["Paper/metode", "Kontribusi inti", "Ablation kecil"],
    tableRows: [
      ["Focal Loss", "Faktor (1-p_t)^γ menurunkan bobot contoh mudah", "γ=0 (cross-entropy) vs γ=2 pada dataset kecil"],
      ["DropBlock", "Dropout blok spasial untuk CNN", "Dropout biasa vs DropBlock pada keep_prob sama"],
      ["Mixup", "Interpolasi input dan label", "alpha=0 vs alpha=0.2 pada seed sama"],
      ["Label smoothing", "Target tidak one-hot penuh", "smoothing 0.0 vs 0.1"],
    ],
    footnote: "Ablation yang baik punya baseline jelas, satu variabel berubah, metrik sama, dan log yang cukup untuk diulang.",
  },

  // -- 17: Lapor gap ke dosen --
  {
    layout: "bullets",
    title: "Saat hasil tidak cocok dengan klaim paper",
    body: "Hasil yang berbeda dari paper belum tentu kegagalan. Catat gap-nya dan laporkan ke dosen dengan batas klaim yang jelas:",
    bullets: [
      "Rani menjalankan γ=0 dan γ=2 pada dataset imbalanced kecil dengan seed, model, dan metrik yang sama.",
      "Focal loss sedikit lebih baik pada kelas minoritas, tetapi akurasi total turun tipis.",
      "Saat melapor, Rani menyebut gap-nya: paper asli memakai object detection extreme imbalance, labnya memakai klasifikasi kecil.",
    ],
    footnote: "Gap bisa berasal dari dataset berbeda, skala model berbeda, hyperparameter belum sama, atau implementasi belum parity.",
  },

  // -- 18: Materi 5 --
  {
    layout: "section",
    title: "5. Peta Model Generatif",
    body: "Modul ini membahas arsitektur diskriminatif secara hands-on, tetapi model generatif tidak masuk jadwal praktik karena ongkos training dan tuning-nya. Bagian ini memberi peta mental untuk membaca paper generatif dengan struktur.",
    footnote: "Sekitar sepertiga paper ML modern melibatkan komponen generatif, jadi kosakatanya penting.",
  },

  // -- 19: Empat keluarga generatif --
  {
    layout: "grid",
    title: "Empat keluarga model generatif",
    body: "Keempat keluarga berbeda pada ide inti dan failure mode khasnya, dan mengenalinya cukup untuk percakapan pertama dengan PI:",
    gridItems: [
      {
        title: "VAE",
        body: "Encoder memetakan ke distribusi Gaussian dan decoder mengambil sampel darinya, dilatih dengan rekonstruksi plus KL. Failure mode khasnya adalah posterior collapse saat decoder mengabaikan latent z.",
      },
      {
        title: "GAN",
        body: "Generator melawan discriminator dalam permainan minimax untuk menghasilkan gambar tajam. Failure mode khasnya adalah mode collapse saat generator hanya menghasilkan subset kecil distribusi data.",
      },
      {
        title: "Diffusion",
        body: "Model menambah noise bertahap lalu belajar membaliknya, menjadi state-of-the-art untuk generasi gambar dan video. Kelemahannya adalah inference lambat karena banyak langkah dan butuh compute besar.",
      },
      {
        title: "Normalizing Flow",
        body: "Transformasi bijeksi yang bisa dibalik dari noise ke data memberi likelihood eksak, berguna untuk deteksi anomali. Kelemahannya adalah arsitektur terbatas karena harus invertible.",
      },
    ],
    footnote: "Autoencoder dari lab breadth autoencoder adalah langkah pertama menuju VAE: tinggal menambah (μ, σ), reparameterization, dan loss KL.",
  },

  // -- 20: Lab W10 --
  {
    layout: "bullets",
    title: "Lab W10",
    body: "Lab menjalankan seluruh alur pada satu paper pilihan (Focal Loss, DropBlock, atau paper area Anda), mengikuti urutan lima materi:",
    bullets: [
      "Kurasi paper, baca tiga putaran, lalu tulis catatan empat bagian di docs/papers/.",
      "Implementasikan metode inti, smoke test pada dataset kecil, lalu parity check terhadap satu angka paper.",
      "Jalankan satu ablation, lalu tulis experiment_report.md yang mencatat apa yang lebih sulit dari yang tampak dan batas klaim hasil.",
    ],
    footnote: "Target waktu 6-8 jam; checklist menuntut satu angka paper terproduksi atau selisih di bawah 2% disertai penjelasan.",
  },

  // -- 21: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Tiga pertanyaan untuk dibawa ke portofolio mandiri, entri terakhir sebelum capstone:",
    bullets: [
      "Bagian paper mana yang paling sulit diterjemahkan jadi kode: notasi matematika, detail implementasi, hyperparameter, atau setup eksperimen?",
      "Apa satu klaim paper yang menjadi lebih jelas setelah Anda menjalankan ablation, dan satu klaim yang terasa lebih lemah?",
      "Setelah kelas berakhir, apa rutinitas mingguan paling kecil yang realistis untuk menjaga keterampilan paper-to-code tetap hidup?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri lalu presentasikan sorotannya 10 menit di awal W11.",
  },

  // -- 22: Lanjut ke W11 --
  {
    layout: "bullets",
    title: "Lanjut ke W11",
    body: "Semua keterampilan teknis bootcamp sudah dibangun. W11 menggabungkannya untuk menyusun framing riset yang siap dipertahankan di W12:",
    bullets: [
      "**Kerangka Input, Middle, Output** memecah ide riset jadi tiga pertanyaan konkret yang bisa dijawab.",
      "**Menu framing** menghasilkan 4-6 kandidat arah riset sebelum memilih satu untuk diperdalam.",
      "**Triage literatur** memakai keterampilan tiga putaran dan kurasi paper dari W10 untuk menilai mana yang relevan.",
    ],
    footnote: "Keterampilan membaca paper W10 langsung dipakai untuk triage literatur W11.",
  },

  // -- 23: CTA --
  {
    layout: "cta",
    title: "Mulai Lab W10",
    body: "Semua konsep deck ini ada di lab notebook: kurasi paper, membaca tiga putaran, alur paper-to-code enam langkah, implementasi metode inti, parity check, dan satu ablation.\n\nEstimasi waktu 6-8 jam termasuk membaca paper dan mengimplementasikan kontribusi intinya.",
    ctaText: "Buka Lab W10 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w10_paper_to_code.ipynb",
  },
];

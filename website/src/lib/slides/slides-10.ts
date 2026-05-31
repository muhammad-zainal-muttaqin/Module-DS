import type { SlideSection } from "./index";

export const slides10: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W10: Paper Reading & Implementation",
    subtitle: "Menyaring banjir paper menjadi aliran kecil, membaca dengan metode tiga putaran, dan menerjemahkan klaim paper menjadi kode yang bisa diuji.",
    body: "Presentasi ini bisa dipakai mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 10 - Minggu 10",
  },

  // ── 2: Peta W10 ──
  {
    layout: "section",
    title: "Peta W10",
    body: "Riset tidak berakhir saat semester selesai. W10 melatih satu keterampilan besar yang sering diasumsikan ada tetapi jarang diajarkan: membaca paper ML secara teknis dan menerjemahkannya menjadi implementasi kecil yang bisa diuji.",
    footnote: "Setelah W10, Anda bisa mengambil paper dari arXiv dan menjalankan metode intinya dalam satu minggu.",
  },

  // ── 3: Dari W9 ke W10 ──
  {
    layout: "bullets",
    title: "Dari W9 ke W10: Mengikat Semua Keterampilan",
    body: "W9 menutup penjelajahan Big Map dari tabular sampai multimodal; W10 mengikat semuanya lewat membaca dan mengimplementasikan paper. Tiga hal menjadi fokus minggu ini:",
    bullets: [
      "**Kebiasaan riset** yang dilatih minggu ini adalah membaca paper tiga putaran dan menerjemahkan paper menjadi kode.",
      "**Disiplin ablation dan reproduksibilitas** dari W4 dan W9 menjadi alat untuk menguji klaim paper, bukan menerimanya begitu saja.",
      "**Skeptisisme** terhadap angka diasah pada arXiv, tempat ide segar beredar sebelum melewati peer-review.",
    ],
    footnote: "Lab utama minggu ini adalah lab_w10_paper_to_code.ipynb.",
  },

  // ── 4: Section Motivasi ──
  {
    layout: "section",
    title: "Motivasi: Satu Tahun Setelah Kelas",
    body: "Bayangkan setahun dari sekarang, tanpa silabus dan tanpa dosen yang mengirim tugas mingguan. Anda tertarik pada satu bidang dan ingin menjadi kompeten di dalamnya. Dua mahasiswa menghadapi situasi ini dengan dua strategi.",
    footnote: "Perbedaan keduanya bukan bakat, melainkan sistem membaca dan membangun.",
  },

  // ── 5: Split two students ──
  {
    layout: "split",
    title: "Mengonsumsi vs Membangun",
    body: "Kedua mahasiswa membaca jumlah paper yang serupa, tetapi hasil setelah tiga bulan sangat berbeda:",
    left: {
      title: "Mahasiswa Pertama",
      body: "Membuka arXiv, kewalahan oleh 50 paper baru, lalu memilih yang judulnya paling menarik.\n\nMembaca dari depan ke belakang tanpa sepenuhnya paham, lalu pindah ke paper lain.\n\nSetelah tiga bulan, tahu banyak istilah tetapi belum pernah mengubah satu metode menjadi kode.",
    },
    right: {
      title: "Mahasiswa Kedua",
      body: "Menyiapkan rutinitas: Senin kurasi, Selasa-Jumat baca tiga putaran, Sabtu implementasi.\n\nSetiap pekan menulis versi minimal satu komponen di template repo.\n\nSetelah tiga bulan, sudah mengimplementasikan beberapa loss, layer, dan trik training dari paper.",
    },
    footnote: "Perbedaannya adalah sistem: filter paper, metode membaca, catatan reusable, dan kebiasaan mengubah klaim menjadi kode.",
  },

  // ── 6: Section Channels ──
  {
    layout: "section",
    title: "arXiv: Alat Akses, Bukan Sumber Otoritas",
    body: "Di ML modern, ide sering beredar lebih cepat daripada peer-review. Ini bagus untuk belajar cepat, tetapi berbahaya jika semua PDF diperlakukan seolah punya otoritas yang sama.",
    footnote: "W10 memakai arXiv sebagai tempat latihan skeptisisme: cepat menemukan ide, lambat menilai bukti.",
  },

  // ── 7: Bullets arXiv ──
  {
    layout: "bullets",
    title: "Membaca arXiv dengan Skeptisisme Terjaga",
    body: "Karena tidak ada peer-review di titik unggah, membaca arXiv menuntut kebiasaan mencatat status dan keraguan:",
    bullets: [
      "**Tulis status publikasi** setiap paper, misalnya preprint v2 yang belum punya versi peer-reviewed, agar otoritasnya tidak dilebih-lebihkan.",
      "**Catat keraguan eksplisit**, misalnya klaim utama yang bergantung pada satu dataset atau komponen yang belum di-ablation.",
      "**Simpan ID dan versi** yang Anda baca, karena v1 dan v2 bisa berbeda substansial saat dikutip nanti.",
    ],
    footnote: "Paper lemah dan klaim berlebihan juga masuk arXiv, jadi otoritas datang dari bukti, bukan dari keberadaan PDF.",
  },

  // ── 8: Section Kurasi ──
  {
    layout: "section",
    title: "Kurasi Paper: Dari Banjir ke Aliran Kecil",
    body: "arXiv menerbitkan ratusan paper ML per hari, sehingga membaca semuanya mustahil. Tujuan kurasi adalah menyaring menjadi 5-10 paper per minggu yang layak 30 menit waktu Anda.",
    footnote: "Rasio akhirnya sekitar 1 banding 250: awalnya terasa membuang, sebenarnya itu efisiensi.",
  },

  // ── 9: Image funnel ──
  {
    layout: "image",
    title: "Funnel Seleksi Paper",
    imageUrl: "/figures/fig09a_paper_funnel.svg",
    caption: "Gambar ini menunjukkan funnel seleksi paper dari sekitar 500 judul di arXiv menyusut menjadi 1-2 paper yang dibaca penuh. Setiap tingkat menyaring lebih ketat: kategori dan kata kunci, lalu judul, lalu abstrak, lalu baca cepat, sampai hanya paper paling bernilai yang menembus ke pembacaan mendalam.",
    footnote: "Empat filter berurutan dari kasar ke halus membuat penyaringan ratusan paper terasa terkendali.",
  },

  // ── 10: Bullets filter 1-2 ──
  {
    layout: "bullets",
    title: "Filter 1 dan 2: Kategori dan Judul",
    body: "Dari gambar tersebut, dua filter pertama memangkas mayoritas paper dengan biaya waktu paling rendah:",
    bullets: [
      "**Filter kategori dan kata kunci** berlangganan kategori spesifik seperti cs.CV atau cs.LG, ditambah kata kunci dari minat Anda.",
      "**Filter judul** menolak sekitar 80% paper hanya dari judul, dan memproses 50 judul dalam 5 menit.",
      "**Alat bantu** seperti Google Scholar Alerts dan Papers with Code mempercepat dua filter pertama ini.",
    ],
    footnote: "Simpan ID paper seperti 2312.01234, bukan judul, karena ID lebih stabil untuk dirujuk ulang.",
  },

  // ── 11: Bullets filter 3-4 ──
  {
    layout: "bullets",
    title: "Filter 3 dan 4: Abstrak dan Baca Cepat",
    body: "Dua filter berikutnya menilai isi pada paper yang lolos, dengan biaya waktu yang naik bertahap:",
    bullets: [
      "**Filter abstrak** membaca 10 abstrak dan bertanya apakah klaimnya menarik dan metodenya memberi sesuatu untuk dipelajari, lalu memilih 5 teratas.",
      "**Filter baca cepat** membaca introduction, figure pertama, dan tabel hasil dari 5 paper untuk menentukan mana yang layak dibaca mendalam.",
      "**Hasil akhir** menyaring 500 paper menjadi 5 dibaca cepat lalu 1-2 dibaca penuh setiap minggu.",
    ],
    footnote: "Papers With Code menghubungkan paper ke kode resmi dan benchmark untuk verifikasi lebih lanjut.",
  },

  // ── 12: Section Three-pass ──
  {
    layout: "section",
    title: "Membaca Paper dalam Tiga Putaran",
    body: "Paper akademik tidak dirancang untuk dibaca linear. Metode tiga putaran dari Keshav 2007 membantu menyerap isinya dengan energi yang masuk akal, dari survei cepat sampai pemahaman mendalam.",
    footnote: "Di akhir setiap putaran, pilih: lanjut ke putaran berikutnya, atau berhenti dan pilih paper lain.",
  },

  // ── 13: Grid 3 passes ──
  {
    layout: "grid",
    title: "Tiga Putaran dengan Tujuan Berbeda",
    body: "Ketiga putaran naik dari peta menyeluruh ke kritik mendalam, masing-masing dengan target waktu dan output sendiri:",
    gridItems: [
      {
        title: "Putaran 1 - Peta (10 menit)",
        body: "Membaca judul, abstrak, figure pertama, tabel hasil, dan conclusion. Targetnya menjawab apa yang diklaim, apa yang diukur, dan apakah hasilnya meyakinkan dari tabel saja.",
      },
      {
        title: "Putaran 2 - Detail (30-45 menit)",
        body: "Membaca method dan experimental setup secara aktif sambil mencatat 3-5 pertanyaan teknis. Pertanyaan ini bernilai lebih dari ringkasan karena langsung mengarahkan implementasi.",
      },
      {
        title: "Putaran 3 - Mendalam (30-60 menit)",
        body: "Hanya untuk paper penting. Mencari apa yang tidak dibahas, apakah klaim melampaui data, dan menghasilkan satu paragraf critique yang bisa dibagikan ke rekan.",
      },
    ],
    footnote: "Jika setelah putaran 1 Anda tidak bisa menjawab tiga pertanyaan dasar, paper mungkin ditulis buruk atau terlalu jauh dari Anda.",
  },

  // ── 14: Code catatan ──
  {
    layout: "code",
    title: "Catatan Paper yang Bisa Dipakai Ulang",
    body: "Catatan yang tidak pernah dibuka lagi tidak berguna. Empat bagian berikut cukup untuk setiap paper yang Anda baca putaran dua:",
    lang: "markdown",
    code: `# Judul (authors, venue, year)

## TL;DR        # 1-2 kalimat, klaim paper dalam kata Anda
## Metode       # 3-5 kalimat, sisipkan rumus penting
## Bukti        # dataset + metrik + angka konkret
## Pertanyaan   # 3-5 detail tak jelas / baseline kurang
## Rencana      # komponen yang diimplementasikan + ablation`,
    footnote: "Simpan di docs/papers/; setelah 20 paper, Anda punya literatur pribadi yang bisa dicari dengan grep.",
  },

  // ── 15: Section Paper-to-code ──
  {
    layout: "section",
    title: "Alur Paper-to-Code",
    body: "Menerjemahkan paper menjadi kode bukan menyalin seluruh arsitektur, melainkan mengisolasi satu kontribusi inti lalu mengujinya. Enam langkah membawa Anda dari abstrak ke kode minimal yang bisa dijalankan.",
    footnote: "Kunci utamanya adalah memisahkan kontribusi inti dari detail rekayasa sekunder.",
  },

  // ── 16: Bullets paper-to-code 1-3 ──
  {
    layout: "bullets",
    title: "Langkah 1 sampai 3: Isolasi Kontribusi Inti",
    body: "Tiga langkah pertama memastikan Anda tahu persis apa yang akan diimplementasikan sebelum menulis kode:",
    bullets: [
      "**Identifikasi kontribusi inti** sebagai satu inovasi terpenting paper, ditulis dalam satu kalimat, bukan seluruh arsitektur.",
      "**Cari input dan output shape** dari metode baru, dan jika tidak eksplisit di paper, cek pseudocode atau codebase resmi.",
      "**Pisahkan inti dari detail rekayasa**, membedakan komponen kunci dari optimisasi sekunder yang bisa diabaikan dulu.",
    ],
    footnote: "Jika Anda belum bisa menjelaskan satu kontribusi inti dalam satu kalimat, jangan mulai menulis kode.",
  },

  // ── 17: Bullets paper-to-code 4-6 ──
  {
    layout: "bullets",
    title: "Langkah 4 sampai 6: Bangun, Verifikasi, Ablation",
    body: "Tiga langkah berikutnya membangun versi minimal lalu mengujinya terhadap klaim paper:",
    bullets: [
      "**Buat versi minimal yang bisa dijalankan** dengan hanya kontribusi inti pada dataset kecil, dan smoke test dulu.",
      "**Verifikasi kecocokan angka** dengan mereproduksi satu angka paper pada konfigurasi yang sama, bandingkan dengan kode resmi jika ada.",
      "**Jalankan satu ablation** dengan menghapus atau memodifikasi komponen inti untuk melihat apakah performa turun seperti yang diklaim.",
    ],
    footnote: "Detail penting sering tersembunyi di appendix atau code repository, jadi selalu cek keduanya.",
  },

  // ── 18: Bullets ablation kecil ──
  {
    layout: "bullets",
    title: "Ablation Kecil: Menguji Satu Klaim",
    body: "Ablation untuk W10 bukan eksperimen besar, melainkan satu perubahan terkontrol yang menjawab apakah komponen yang diklaim penting memang berdampak:",
    bullets: [
      "**Focal Loss** diuji dengan membandingkan gamma=0 yang setara cross-entropy melawan gamma=2 pada dataset kecil.",
      "**Mixup** diuji dengan membandingkan alpha=0 melawan alpha=0.2 memakai seed yang sama.",
      "**Ablation yang baik** punya baseline jelas, satu variabel berubah, metrik sama, dan log yang cukup untuk diulang.",
    ],
    footnote: "Jika hasil tidak cocok dengan klaim paper, catat gap-nya: dataset, skala model, atau hyperparameter yang berbeda.",
  },

  // ── 19: Section Rutinitas ──
  {
    layout: "section",
    title: "Rutinitas Mingguan yang Tahan Lama",
    body: "Rutinitas ini dirancang sebagai bekal mandiri setelah modul berakhir, bukan kewajiban tambahan di tengah semester. Sekitar 6 jam per minggu cukup untuk menjaga keterampilan paper-to-code tetap hidup.",
    footnote: "Rutinitas yang sederhana bertahan; yang rumit ditinggalkan dalam dua minggu.",
  },

  // ── 20: Bullets rutinitas ──
  {
    layout: "bullets",
    title: "Sekitar Enam Jam per Minggu",
    body: "Rutinitas praktis membagi waktu antara kurasi, membaca, dan eksekusi sepanjang minggu:",
    bullets: [
      "**Senin** dipakai untuk kurasi arXiv dari 50 judul menjadi 5 abstrak teratas dalam 30 menit.",
      "**Selasa sampai Jumat** dipakai membaca paper putaran 1 dan 2, lalu satu sesi eksekusi implementasi atau ablation kecil.",
      "**Sabtu** dipakai merapikan catatan dan commit kode, sementara Minggu dipakai istirahat yang sungguh-sungguh.",
    ],
    footnote: "Dalam setahun, ini berarti sekitar 40 paper dibaca dalam dan 40 implementasi kecil - cukup untuk kompeten di satu sub-bidang.",
  },

  // ── 21: Section Generatif ──
  {
    layout: "section",
    title: "Peta Keluarga Model Generatif",
    body: "Modul ini membahas arsitektur diskriminatif secara hands-on, tetapi model generatif tidak masuk jadwal praktik karena ongkos training dan tuning-nya. Bagian ini memberi peta mental untuk membaca paper generatif dengan struktur.",
    footnote: "Sekitar sepertiga paper ML modern melibatkan komponen generatif, jadi kosakatanya penting.",
  },

  // ── 22: Grid generatif ──
  {
    layout: "grid",
    title: "Empat Keluarga Model Generatif",
    body: "Keempat keluarga berbeda pada ide inti dan failure mode khasnya, dan mengenalinya cukup untuk percakapan pertama dengan PI:",
    gridItems: [
      {
        title: "VAE",
        body: "Encoder memetakan ke distribusi Gaussian dan decoder mengambil sampel darinya, dilatih dengan rekonstruksi plus KL. Failure mode khasnya adalah posterior collapse saat decoder mengabaikan latent z.",
      },
      {
        title: "GAN",
        body: "Generator melawan discriminator dalam permainan minimax untuk menghasilkan gambar tajam. Failure mode khasnya adalah mode collapse saat generator hanya menghasilkan subset kecil dari distribusi data.",
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
    footnote: "Autoencoder dari Lab 7b adalah langkah pertama menuju VAE: tinggal menambah (mu, sigma), reparameterization, dan loss KL.",
  },

  // ── 23: Section Worked Example ──
  {
    layout: "section",
    title: "Worked Example: Dari Paper ke Kode dalam Satu Minggu",
    body: "Rani ingin belajar focal loss dari paper Lin et al. 2017. Ia menjalankan seluruh alur W10 dalam satu minggu, dari kurasi sampai laporan yang jelas tentang batas klaim.",
    footnote: "Tujuannya bukan reproduksi penuh RetinaNet, melainkan memahami mekanisme loss intinya.",
  },

  // ── 24: Bullets Rani ──
  {
    layout: "bullets",
    title: "Satu Minggu Rani: Kurasi sampai Laporan",
    body: "Rani memecah pekerjaan menjadi sesi harian yang kecil dan terfokus sepanjang minggu:",
    bullets: [
      "**Senin sampai Selasa** Rani mengkurasi paper, mengecek statusnya di ICCV 2017, lalu membaca tiga putaran dan mengekstrak rumus inti focal loss.",
      "**Rabu sampai Kamis** Rani memisahkan inti dari detail RetinaNet, mengimplementasikan FocalLoss, dan memverifikasi gamma=0 identik dengan cross-entropy.",
      "**Jumat sampai Sabtu** Rani menjalankan ablation gamma=0 melawan gamma=2 pada dataset imbalanced, lalu menulis gap antara setup-nya dan paper asli.",
    ],
    footnote: "Rani melakukan seluruh keterampilan W10: memilih, membaca, mengekstrak, mengimplementasikan, ablation, dan menulis batas klaim.",
  },

  // ── 25: Section Pitfalls ──
  {
    layout: "section",
    title: "Pitfalls & Miskonsepsi",
    body: "Beberapa kebiasaan membaca paper terasa produktif tetapi sebenarnya menghambat. Mengenalinya menjaga membaca tetap mengarah pada membangun, bukan sekadar mengonsumsi.",
    footnote: "Setiap pitfall punya cara deteksi yang konkret, bukan sekadar peringatan.",
  },

  // ── 26: Bullets pitfalls 1-3 ──
  {
    layout: "bullets",
    title: "Tiga Pitfall Pertama saat Membaca Paper",
    body: "Tiga pitfall pertama menyangkut otoritas, konsumsi pasif, dan mengabaikan paper fondasi:",
    bullets: [
      "**Menganggap arXiv sebagai cap otoritas** keliru - status \"ada di arXiv\" tidak berarti klaimnya benar, jadi catat venue dan ablation yang hilang.",
      "**Membaca untuk merasa pintar** terjadi saat Anda mengonsumsi 5 paper seminggu tanpa pernah menjalankan kode dari satu pun.",
      "**Mengejar paper baru, melewat paper fondasi** membuat Anda kehilangan dasar - sisakan satu slot per bulan untuk paper 2015-2018.",
    ],
    footnote: "Cara deteksi pitfall kedua: buka folder src - jika tidak ada implementasi kecil, Anda sedang mengonsumsi.",
  },

  // ── 27: Bullets pitfalls 4-5 ──
  {
    layout: "bullets",
    title: "Dua Pitfall Berikutnya tentang Eksekusi",
    body: "Dua pitfall terakhir menyangkut lingkup implementasi dan keberlanjutan rutinitas:",
    bullets: [
      "**Mengimplementasikan seluruh paper sekaligus** membuat Anda kewalahan - jika belum bisa menjelaskan satu kontribusi inti dalam satu kalimat, jangan mulai menulis kode.",
      "**Rutinitas yang tidak proporsional** akan terhenti dalam sebulan - jika itu terjadi, pangkas target 50% alih-alih menyalahkan kemalasan.",
      "**Apa yang bertahan** lebih berharga daripada rencana sempurna di atas kertas yang ditinggalkan setelah dua minggu.",
    ],
    footnote: "Enam jam per minggu adalah rekomendasi untuk beban kuliah normal; pekerja full-time mungkin hanya tiga jam.",
  },

  // ── 28: Bullets Lab W10 ──
  {
    layout: "bullets",
    title: "Lab W10: Implementasi Paper",
    body: "Lab minggu ini menjalankan seluruh alur paper-to-code pada satu paper pilihan, dari membaca sampai ablation:",
    bullets: [
      "**Pilih satu paper** seperti Focal Loss atau DropBlock, lalu baca tiga putaran dan tulis catatan dengan template empat bagian.",
      "**Implementasikan metode inti** dalam src atau notebook, jalankan smoke test, dan lakukan parity check terhadap angka paper.",
      "**Jalankan satu ablation** lalu tulis experiment_report.md yang mencatat apa yang lebih sulit dari yang tampak di paper.",
    ],
    footnote: "Target waktu 6-8 jam; checklist menuntut satu angka paper terproduksi atau selisih di bawah 2% disertai penjelasan.",
  },

  // ── 29: Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum lanjut ke W11, renungkan tiga pertanyaan yang menghubungkan minggu ini dengan kebiasaan riset jangka panjang:",
    bullets: [
      "Bagian paper mana yang paling sulit diterjemahkan menjadi kode: notasi matematika, detail implementasi, hyperparameter, atau setup eksperimen?",
      "Apa satu klaim paper yang menjadi lebih jelas setelah Anda menjalankan ablation, dan satu klaim yang justru terasa lebih lemah?",
      "Setelah kelas berakhir, apa rutinitas mingguan paling kecil yang realistis untuk menjaga keterampilan paper-to-code tetap hidup?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - ini adalah entri portofolio terakhir sebelum capstone.",
  },

  // ── 30: Lanjut W11 ──
  {
    layout: "bullets",
    title: "Lanjut ke W11: Research Framing",
    body: "Dengan W10 selesai, semua keterampilan bootcamp sudah terbangun. W11 menggabungkan semuanya untuk satu tujuan: menyusun framing riset yang siap dipertahankan di W12:",
    bullets: [
      "**Kerangka Input, Middle, Output** memecah ide riset menjadi tiga pertanyaan yang konkret dan bisa dijawab.",
      "**Menu framing** menghasilkan 4-6 kandidat arah riset sebelum memilih satu untuk diperdalam.",
      "**Triage literatur** memakai keterampilan membaca paper dari W10 untuk menilai mana yang relevan dengan framing Anda.",
    ],
    footnote: "Keterampilan tiga putaran dan paper-to-code dari W10 langsung dipakai untuk triage literatur di W11.",
  },

  // ── 31: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W10",
    body: "Semua konsep di presentasi ini ada dalam lab notebook lengkap: membaca tiga putaran, alur paper-to-code enam langkah, implementasi metode inti, parity check, dan satu ablation.\n\nEstimasi waktu: 6-8 jam termasuk membaca paper dan mengimplementasikan kontribusi intinya.",
    ctaText: "Buka Lab W10 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w10_paper_to_code.ipynb",
  },
];

import type { SlideSection } from "./index";

export const slides11: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W11: Research Framing",
    subtitle: "Merumuskan pertanyaan riset sendiri lewat kerangka Input, Middle, Output, lalu memfilternya dengan literatur sebelum eksekusi capstone.",
    body: "Presentasi ini bisa dipakai mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 11 - Minggu 11",
  },

  // ── 2: Peta W11 ──
  {
    layout: "section",
    title: "Peta W11",
    body: "Pertanyaan riset bukan sesuatu yang Anda temukan di dalam dataset, melainkan sesuatu yang Anda bawa ke sana. W11 adalah transisi dari bootcamp ke capstone: belajar memakai keterampilan teknis untuk menjawab pertanyaan yang Anda rumuskan sendiri.",
    footnote: "Anda tiba di W12 dengan menu 3-5 framing kandidat dan satu framing utama yang siap dipertahankan.",
  },

  // ── 3: Dari W10 ke W11 ──
  {
    layout: "bullets",
    title: "Dari W10 ke W11: dari Eksekusi ke Framing",
    body: "W1-W10 mengajarkan cara mengeksekusi riset dengan benar; W11 mengajarkan cara memilih pertanyaan yang layak dieksekusi. Tiga hal menjadi fokus minggu ini:",
    bullets: [
      "**Kebiasaan riset** yang dilatih minggu ini adalah framing sebelum eksekusi, filter literatur, dan mempertahankan pilihan framing.",
      "**Kerangka Input, Middle, Output** memecah setiap masalah ML menjadi tiga pertanyaan yang konkret dan bisa dijawab.",
      "**Triage literatur** memakai keterampilan membaca paper dari W10 untuk menilai mana framing yang masih punya gap.",
    ],
    footnote: "Kerja minggu ini langsung menjadi input W12, saat framing utama dipresentasikan dan disetujui.",
  },

  // ── 4: Section Paruh depan ──
  {
    layout: "section",
    title: "Paruh Depan Riset",
    body: "W1-W10 mengajarkan paruh belakang riset: diberi masalah dan dataset yang sudah ditentukan, bagaimana membangun dan mengevaluasi model. W11 memulai paruh depan: bagaimana sampai pada pertanyaan yang layak ditanyakan.",
    footnote: "Banyak program berhenti di paruh belakang dan berasumsi paruh depan terserap sendiri - sering kali tidak.",
  },

  // ── 5: Split paruh ──
  {
    layout: "split",
    title: "Paruh Belakang vs Paruh Depan",
    body: "Kedua paruh sama-sama wajib, tetapi melatih keterampilan yang berbeda. Bootcamp menutup yang pertama; capstone menuntut yang kedua:",
    left: {
      title: "Paruh Belakang (W1-W10)",
      body: "Masalah, dataset, dan tugas sudah didefinisikan.\n\nPertanyaannya adalah bagaimana membangun model, melatihnya dengan benar, dan mengevaluasinya tanpa menutupi kelemahan model.\n\nTanpa ini, riset tidak bisa dilakukan sama sekali.",
    },
    right: {
      title: "Paruh Depan (W11)",
      body: "Situasinya terbuka: sebuah domain menarik atau dataset yang bisa diakses.\n\nPertanyaannya adalah bagaimana mendefinisikan output, memilih input, dan menemukan gap yang benar-benar ada.\n\nFraming yang salah membuat eksekusi sempurna pun sia-sia.",
    },
    footnote: "Mahasiswa bisa menghabiskan bertahun-tahun mengeksekusi dengan kompeten pertanyaan yang sejak awal salah framing.",
  },

  // ── 6: Section Konteks lab ──
  {
    layout: "section",
    title: "Konteks Lab Kecil Bisa Menjadi Keunggulan",
    body: "Metodologi minggu ini dirancang untuk lab kecil dengan sumber daya terbatas. Saat sumber daya terbatas, aktivitas berdampak tertinggi adalah memilih pertanyaan yang tepat sebelum menghabiskan waktu eksekusi.",
    footnote: "Framing baik pada dataset kecil mengalahkan framing buruk pada dataset besar.",
  },

  // ── 7: Bullets keunggulan ──
  {
    layout: "bullets",
    title: "Peluang yang Tidak Dikejar Lab Besar",
    body: "Konteks lokal membuka peluang riset spesifik yang gap literaturnya memang ada, bukan dibuat-buat:",
    bullets: [
      "**Data bahasa lokal** seperti Banjar dan dialek Indonesia lainnya belum banyak diteliti, sehingga gap-nya nyata.",
      "**Masalah pertanian dan kesehatan lokal** relevan secara langsung dan jarang menjadi fokus lab berdana besar.",
      "**Domain yang belum banyak dieksplorasi** menjadi peluang karena masalahnya tidak terlihat dari Jakarta atau Singapura.",
    ],
    footnote: "Metodologi W11 adalah cara menemukan dan mengklaim peluang-peluang ini secara sistematis.",
  },

  // ── 8: Section IMO ──
  {
    layout: "section",
    title: "Kerangka: Input, Middle, Output",
    body: "Setiap masalah ML supervised bisa digambarkan sebagai transformasi dari Input ke Output lewat Middle. Tiga pertanyaan tentang ketiga komponen ini membedah setiap masalah menjadi keputusan desain yang jelas.",
    footnote: "Gap dalam Middle adalah tempat kontribusi riset hidup.",
  },

  // ── 9: Image IMO ──
  {
    layout: "image",
    title: "Membedah Masalah Jadi Input, Middle, Output",
    imageUrl: "/figures/fig10a_input_middle_output.svg",
    caption: "Gambar ini menunjukkan kerangka dekomposisi Input, Middle, Output yang membedah setiap masalah ML menjadi tiga bagian. Input adalah tensor yang diterima model, Output adalah tensor yang dihasilkan, dan Middle adalah komponen yang memetakan keduanya dengan sebagian langkah standar dan sebagian lagi berupa gap.",
    footnote: "Kerangka ini dipakai dari W1 sampai capstone untuk menamai setiap keputusan desain.",
  },

  // ── 10: Bullets tiga komponen ──
  {
    layout: "bullets",
    title: "Tiga Komponen yang Harus Ditentukan",
    body: "Dari gambar tersebut, setiap masalah dipecah menjadi tiga komponen yang masing-masing adalah keputusan desain:",
    bullets: [
      "**Input** adalah apa yang diterima model saat prediksi, berupa satu atau beberapa tensor dengan bentuk spesifik.",
      "**Output** adalah apa yang dihasilkan model, dengan bentuk dan semantik yang sesuai dengan pertanyaan riset.",
      "**Middle** adalah yang memetakan Input ke Output, dengan sebagian langkah standar di Big Map dan sebagian berupa gap.",
    ],
    footnote: "Langkah Middle yang tidak punya jawaban standar adalah gap tempat riset baru berada.",
  },

  // ── 11: Section punya pertanyaan? ──
  {
    layout: "section",
    title: "Apakah Anda Sudah Punya Pertanyaan Riset?",
    body: "\"Saya punya gambar penyakit padi dan ingin mengklasifikasikannya\" bukan pertanyaan riset, melainkan prasyarat untuk satu pertanyaan. Ia menyebut dataset dan tugas generik tanpa pertanyaan spesifik atau kontribusi.",
    footnote: "Pertanyaan riset punya subjek, predikat, dan tipe jawaban yang jelas.",
  },

  // ── 12: Bullets satu dataset banyak framing ──
  {
    layout: "bullets",
    title: "Satu Dataset Bukan Satu Paper",
    body: "Topik yang sama bisa dipertajam menjadi pertanyaan riset berbeda dengan mengubah satu komponen kerangka:",
    bullets: [
      "**Ubah Output** dan Anda mendapat masalah keputusan berbeda, misalnya prediksi kelompok penyakit kasar untuk triase lapangan.",
      "**Ubah Input** dan Anda mendapat pertanyaan representasi berbeda, misalnya menambahkan inframerah ke RGB.",
      "**Ubah Middle atau batasan** dan Anda mendapat gap metodologis berbeda, misalnya distilasi ke model ringan untuk deployment.",
    ],
    footnote: "Ketiganya adalah pertanyaan riset berbeda dengan output, baseline, dan kontrol yang berbeda.",
  },

  // ── 13: Section Pertanyaan 1 ──
  {
    layout: "section",
    title: "Pertanyaan 1: Apa yang Diprediksi, dari Apa?",
    body: "Pertanyaan pertama mendefinisikan entitas, Output, dan Input. Salah memilih entitas adalah kesalahan framing yang paling umum, dan ia gagal secara diam-diam dengan mengukur hal yang salah.",
    footnote: "Entitas menentukan apa arti satu sampel, apa unit evaluasinya, dan siapa yang mendapat manfaatnya.",
  },

  // ── 14: Bullets entitas/output/input ──
  {
    layout: "bullets",
    title: "Entitas, Output, dan Input Perlu Diputuskan",
    body: "Ketiganya adalah pilihan yang membentuk masalah riset, bukan properti tetap dari dataset:",
    bullets: [
      "**Entitas** adalah unit yang satu prediksi mewakilinya, misalnya satu daun, satu tanaman, atau satu kunjungan lahan.",
      "**Output** adalah tensor yang bentuknya mengodekan pertanyaan, dari satu nilai kontinu sampai peta piksel atau sequence.",
      "**Input** adalah representasi yang dipilih dari beberapa opsi, masing-masing dengan biaya perolehan dan kandungan informasi berbeda.",
    ],
    footnote: "Entitas dan Input yang sama sering mendukung beberapa pilihan Output, masing-masing masalah riset berbeda.",
  },

  // ── 15: Bullets cek temporal ──
  {
    layout: "bullets",
    title: "Cek Temporal dan Kausal: Validasi Terpenting",
    body: "Sebelum melanjutkan, tanyakan apakah model yang di-deploy akan punya akses ke input saat perlu membuat prediksi:",
    bullets: [
      "**Jika jawabannya tidak**, framing-nya rusak, dan ini masalah framing yang tidak bisa diperbaiki dengan tuning atau lebih banyak data.",
      "**Contoh kegagalan** adalah memprediksi hasil panen dari pengukuran akhir musim, padahal musim sudah selesai sebelum prediksi dibuat.",
      "**Perbaikannya adalah framing ulang**, misalnya hanya memakai statistik babak pertama, bukan menambah data.",
    ],
    footnote: "Tidak melihat masalah tidak sama dengan lulus - cek ini harus dijalankan secara eksplisit dan sistematis.",
  },

  // ── 16: Section Pertanyaan 2 ──
  {
    layout: "section",
    title: "Pertanyaan 2: Seperti Apa Middle dan Letak Gap-nya",
    body: "Setelah Input dan Output terdefinisi, sketsa pipeline yang menghubungkannya lalu petakan tiap langkah ke Big Map. Empat kasus muncul dari pemetaan ini, dan batas antara dua kasus tengah paling menentukan.",
    footnote: "Banyak proyek tampak Kasus C pada awalnya tetapi ternyata Kasus B setelah diperiksa teliti.",
  },

  // ── 17: Grid 4 kasus ──
  {
    layout: "grid",
    title: "Empat Kasus Pemetaan Middle ke Big Map",
    body: "Setiap langkah Middle dipetakan ke Big Map, dan hasil pemetaannya menentukan jenis kontribusi:",
    gridItems: [
      {
        title: "Kasus A - Satu Baris Cocok",
        body: "Seluruh Middle adalah satu komponen standar, misalnya gambar ke CNN ke kelas. Pertanyaannya valid tetapi kontribusinya sederhana, kecuali domain atau bahasanya baru.",
      },
      {
        title: "Kasus B - Rangkaian Baris",
        body: "Beberapa langkah standar dirangkai berurutan pada kombinasi Input dan Output yang belum pernah dicoba. Kontribusinya adalah rangkaian itu beserta validasi empirisnya.",
      },
      {
        title: "Kasus C - Baris plus Gap",
        body: "Sebagian langkah standar, tetapi satu atau lebih tidak punya baris yang cocok. Gap inilah tempat riset baru berada dan harus dinamai dengan tepat.",
      },
      {
        title: "Kasus D - Tidak Ada Baris Cocok",
        body: "Pasangan Input dan Output tidak punya solusi ML di level manapun. Ini jarang, dan biasanya berarti pasangannya belum terdefinisi dengan baik dan perlu direvisi.",
      },
    ],
    footnote: "Kasus B yang dikenali dengan tepat adalah riset yang sah, berbeda dari mengklaim metode baru.",
  },

  // ── 18: Bullets menamai gap ──
  {
    layout: "bullets",
    title: "Menamai Gap Secara Tepat",
    body: "Menamai gap dengan tepat adalah keterampilan terpenting dalam desain riset, karena gap yang samar bukan kontribusi:",
    bullets: [
      "**Gap samar** seperti \"kami mengusulkan metode yang lebih baik\" tidak menyebutkan apa yang sebenarnya belum terselesaikan.",
      "**Gap tepat** menyebut pilihan desain spesifik, misalnya mengagregasi deteksi dari multi-sudut-pandang tanpa kalibrasi kamera.",
      "**Gap yang baik** adalah pilihan yang tidak punya jawaban mapan di literatur, bukan sekadar metode yang kebetulan berbeda.",
    ],
    footnote: "Contoh gap nyata: menyelaraskan dua modalitas beresolusi temporal berbeda, atau adaptasi ke bahasa dengan sedikit label.",
  },

  // ── 19: Section Pertanyaan 3 ──
  {
    layout: "section",
    title: "Pertanyaan 3: Apakah Gap Benar-benar Ada dan Layak Diisi",
    body: "Pemeriksaan literatur dilakukan setelah Anda menghasilkan beberapa framing, bukan sebelumnya. Mencari terlalu dini membuat Anda terjangkar pada paper acak; terlalu lambat membuat Anda melekat pada framing yang mungkin sudah jenuh.",
    footnote: "Tahap dekomposisi menghasilkan menu framing, bukan satu proyek final.",
  },

  // ── 20: Bullets loop filter ──
  {
    layout: "bullets",
    title: "Loop Filter Literatur: Bukan Tinjauan Lengkap",
    body: "Untuk setiap framing kandidat, jalankan loop filter cepat lalu klasifikasikan hasilnya menjadi tiga kategori:",
    bullets: [
      "**BARU** berarti gap tampak belum ditangani, sehingga framing dipertahankan sebagai kandidat kuat.",
      "**SEBAGIAN TERJAWAB** berarti literatur sudah dekat, sehingga arah diubah ke bagian yang belum dilakukan.",
      "**JENUH** berarti 5 paper terbaru membahas kombinasi yang sama persis, sehingga framing dihapus dengan sehat.",
    ],
    footnote: "Buat 2-4 query dan skim maksimal 5-10 abstrak per framing - ini filter, bukan tinjauan menyeluruh.",
  },

  // ── 21: Split kebaruan ──
  {
    layout: "split",
    title: "Kebaruan yang Kuat vs yang Lemah",
    body: "Tidak semua gap sama menariknya. Membedakan kebaruan kuat dari lemah mencegah klaim yang tidak akan bertahan di review:",
    left: {
      title: "Kebaruan Kuat",
      body: "Tugas baru yang belum pernah diprediksi pada jenis data ini.\n\nDomain baru untuk metode mapan, atau rakitan komponen bermotivasi baik.\n\nDesain ulang untuk batasan deployment yang benar-benar membentuk arsitektur.",
    },
    right: {
      title: "Kebaruan Lemah",
      body: "Tuning hyperparameter, yang memang diharapkan dan bukan kontribusi.\n\n\"Studi pertama di Indonesia\" untuk masalah yang sudah diselesaikan global.\n\nMenggabungkan dua metode secara acak tanpa motivasi yang jelas.",
    },
    footnote: "Jebakan \"baru bagi saya\": metode standar tampak baru bagi yang baru mempelajarinya, tetapi tidak baru bagi bidangnya.",
  },

  // ── 22: Bullets cek kebaruan + kontrol ──
  {
    layout: "bullets",
    title: "Kalimat Cek Kebaruan dan Kontrol",
    body: "Dua alat menutup tahap framing: satu kalimat yang menguji klaim kebaruan, dan kontrol yang membuat klaim bisa difalsifikasi:",
    bullets: [
      "**Kalimat cek kebaruan** berbunyi: literatur sudah melakukan X, karya kami melakukan Y yang berbeda karena Z, dan ini penting karena W.",
      "**Setiap kontribusi butuh kontrol** yang bisa memfalsifikasinya, misalnya baseline late-fusion untuk menguji klaim metode fusion baru.",
      "**Rancang kontrol sebelum eksperimen**, karena kontrol yang dibuat setelah melihat hasil hanya membangun cerita di sekitar hasil.",
    ],
    footnote: "Jika keempat slot kalimat cek kebaruan tidak bisa diisi jelas, klaim kebaruannya belum valid.",
  },

  // ── 23: Section Dua fase ──
  {
    layout: "section",
    title: "Dua Fase yang Harus Terpisah",
    body: "Minggu ini punya dua fase yang tidak boleh dicampur. Mencampurnya menghasilkan framing yang aman dan dangkal: hal pertama yang terlintas, hampir tanpa diperiksa.",
    footnote: "Hasilkan dulu, filter kemudian - 2-4 jam filter literatur bisa menghemat berminggu-minggu eksekusi.",
  },

  // ── 24: Split dua fase ──
  {
    layout: "split",
    title: "Dekomposisi lalu Filter Literatur",
    body: "Kedua fase punya mindset yang berbeda dan harus dijalankan berurutan, bukan bersamaan:",
    left: {
      title: "Fase 1 - Dekomposisi",
      body: "Hasilkan 3-5 framing kandidat yang benar-benar berbeda.\n\nJadilah kreatif dan jangan filter dulu.\n\nUbah setidaknya satu dari entitas, output, input, batasan, atau gap di antara framing.",
    },
    right: {
      title: "Fase 2 - Filter Literatur",
      body: "Bawa setiap kandidat ke literatur.\n\nCari mana yang jenuh, mana yang perlu ubah arah, dan mana yang punya gap nyata.\n\nJalankan pada setiap framing, terutama yang tampak jelas menjanjikan.",
    },
    footnote: "Menghapus framing yang jenuh itu sehat: sunk cost adalah musuhnya.",
  },

  // ── 25: Bullets lokakarya ──
  {
    layout: "bullets",
    title: "Sesi Kelas: Demo Langsung dan Tiga Lokakarya",
    body: "Sesi W11 menjalankan dekomposisi pada dataset nyata, lalu tiga lokakarya membawa mahasiswa dari menu framing menuju komitmen:",
    bullets: [
      "**Lokakarya 1** menghasilkan menu tiga framing kandidat dari dataset kelompok tanpa langsung berkomitmen.",
      "**Lokakarya 2** menjalankan filter literatur cepat pada ketiga framing dan mengklasifikasikannya.",
      "**Lokakarya 3** mengubah menu menjadi keputusan: satu framing utama, satu cadangan, dan framing yang dihapus beserta alasannya.",
    ],
    footnote: "Dataset kelas seperti Paddy Doctor dan NusaX dipilih agar hampir tidak butuh latar belakang domain.",
  },

  // ── 26: Section Pitfalls ──
  {
    layout: "section",
    title: "Pitfalls & Miskonsepsi",
    body: "Beberapa keyakinan tentang framing terdengar masuk akal tetapi sering menghasilkan proyek yang lemah. Mengenalinya menghemat berminggu-minggu eksekusi yang tidak bisa dipublikasikan.",
    footnote: "Sebagian besar berakar pada melewati pemeriksaan literatur atau terjun langsung ke satu framing.",
  },

  // ── 27: Bullets pitfalls ──
  {
    layout: "bullets",
    title: "Empat Keyakinan yang Perlu Diluruskan",
    body: "Keempat keyakinan berikut adalah penyebab paling umum framing yang lemah:",
    bullets: [
      "**\"Idenya jelas baru, tak perlu cek literatur\"** keliru karena jebakan \"baru bagi saya\" - jalankan filter pada setiap framing.",
      "**\"Satu dataset, satu proyek\"** salah karena satu dataset mendukung banyak pertanyaan riset yang sah lewat menu framing.",
      "**\"Saya susun framing sambil menulis kode\"** berbahaya karena framing buruk tidak membaik dengan eksekusi lebih banyak.",
    ],
    footnote: "Gap di Middle tidak harus metode yang benar-benar baru - Kasus B yang dinamai dengan tepat sudah cukup sebagai kontribusi.",
  },

  // ── 28: Bullets luaran ──
  {
    layout: "bullets",
    title: "Luaran W11 yang Dibawa ke W12",
    body: "Sebelum W12, kirim tiga luaran yang menjadi dasar presentasi dan pertahanan framing:",
    bullets: [
      "**Dokumen dekomposisi** berisi semua 3-5 framing memakai template Input, Middle, Output.",
      "**Tabel pemeriksaan literatur** dengan satu baris per framing beserta klasifikasi dan buktinya.",
      "**Paragraf daftar pendek** memuat framing utama dengan kalimat cek kebaruan, framing cadangan, dan framing yang dihapus.",
    ],
    footnote: "Datang ke W12 siap mempresentasikan dan mempertahankan framing utama Anda di depan kelas.",
  },

  // ── 29: Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum masuk capstone, renungkan tiga pertanyaan yang melatih kerangka framing pada topik baru:",
    bullets: [
      "Untuk topik \"deteksi emosi dari audio\", tiga framing berbeda apa yang muncul dengan entitas, input, output, dan letak gap yang berbeda?",
      "Pilih satu dataset, hasilkan tiga framing tanpa mencari literatur, lalu jalankan filter - adakah yang jenuh dan adakah yang mengarah ke gap nyata?",
      "Cari contoh paper yang mungkin punya masalah cek temporal - apa yang salah dengan framing-nya dan bagaimana memperbaikinya?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - kerangka ini langsung dipakai untuk framing capstone Anda.",
  },

  // ── 30: Lanjut Capstone ──
  {
    layout: "bullets",
    title: "Lanjut ke Capstone: Eksekusi Dimulai",
    body: "Dengan W11 selesai, menu framing siap dan daftar pendek tertulis. Empat minggu capstone W12-W15 mengubah framing menjadi riset yang dipertahankan dan dikomunikasikan:",
    bullets: [
      "**W12** mempresentasikan dan mempertahankan framing utama, lalu memulai Eksperimen 1 dengan pre-registration.",
      "**W13** melakukan rethink dan iterasi menuju Eksperimen 2, sementara W14 menyajikan research talk 20 menit.",
      "**W15** mengumpulkan laporan final, repo dengan tag versi, dan demo tanpa sesi kelas.",
    ],
    footnote: "Seluruh disiplin bootcamp dari reproduksibilitas sampai ablation kini dipakai pada pertanyaan riset Anda sendiri.",
  },

  // ── 31: CTA ──
  {
    layout: "cta",
    title: "Siapkan Framing Capstone",
    body: "Susun menu 3-5 framing dengan template dekomposisi, jalankan filter literatur, lalu isi template pre-registration sebagai dasar Eksperimen 1 di W12.\n\nEstimasi waktu: 6-8 jam termasuk dekomposisi dan filter literatur antar sesi.",
    ctaText: "Buka Template Pre-registration",
    ctaTarget: "https://github.com/muhammad-zainal-muttaqin/Module-DS/blob/master/template/docs/prereg_template.md",
  },
];

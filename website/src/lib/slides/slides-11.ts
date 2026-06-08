import type { SlideSection } from "./index";

export const slides11: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W11: Research Framing",
    subtitle: "Mengubah situasi terbuka jadi pertanyaan riset yang bisa dipertahankan, lewat kerangka Input, Middle, Output, lalu menyaringnya dengan literatur sebelum capstone.",
    footnote: "Bab 11 - Minggu 11",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Empat materi minggu ini mengikuti alur kerja merancang satu pertanyaan riset, dari situasi terbuka sampai luaran yang dibawa ke capstone:",
    gridItems: [
      {
        title: "1. Paruh Depan Riset",
        body: "Kita belajar mengubah domain atau dataset terbuka jadi pertanyaan riset yang layak ditanyakan dan bisa dipertahankan.",
      },
      {
        title: "2. Kerangka Input, Middle, Output",
        body: "Kita membedah satu masalah ML lewat tiga pertanyaan: apa yang diprediksi dan dari apa, letak gap di Middle, dan apakah gap itu ada.",
      },
      {
        title: "3. Menu Framing dan Filter Literatur",
        body: "Kita menghasilkan 3-5 framing kandidat, lalu menyaringnya ke literatur untuk menilai mana yang masih punya gap nyata.",
      },
      {
        title: "4. Dua Fase dan Luaran W11",
        body: "Kita memisahkan curah gagasan dari filter, lalu menyiapkan dokumen dekomposisi dan daftar pendek untuk W12.",
      },
    ],
  },

  // -- 3: Recap W10 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W10)",
    body: "W10 mengajarkan cara membaca paper secara terstruktur, dan kemampuan itu menjadi inti filter literatur minggu ini:",
    bullets: [
      "Kita belajar membaca paper dengan metode tiga putaran dan menerjemahkan satu metode jadi kode kecil yang bisa dijalankan.",
      "Kita melatih cara membaca abstrak dengan cepat dan menilai apa kontribusi sebuah paper.",
      "Output yang dibawa: kemampuan menilai kebaruan paper, yang dipakai untuk menyaring framing di W11.",
    ],
    footnote: "Big Map lima keluarga arsitektur dari W1-W9 juga dipakai untuk memetakan langkah-langkah Middle.",
  },

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Paruh Depan Riset",
    body: "W1-W10 melatih paruh belakang riset: diberi masalah dan dataset, bagaimana membangun dan mengevaluasi model. W11 memulai paruh depan: bagaimana sampai pada pertanyaan riset yang layak ditanyakan dari situasi yang masih terbuka.",
    footnote: "Banyak program berhenti di paruh belakang dan berasumsi paruh depan terserap sendiri, padahal sering kali tidak.",
  },

  // -- 5: Paruh belakang vs depan (split) --
  {
    layout: "split",
    title: "Dua paruh riset, dua keterampilan",
    body: "Kedua paruh sama-sama wajib, tetapi melatih keterampilan yang berbeda. Bootcamp menutup yang pertama, dan capstone menuntut yang kedua:",
    left: {
      title: "Paruh Belakang (W1-W10)",
      body: "Masalah, dataset, dan tugas sudah ditentukan.\n\nPertanyaannya adalah bagaimana membangun model, melatihnya dengan benar, dan mengevaluasinya tanpa menutupi kelemahan model.\n\nTanpa keterampilan ini, riset tidak bisa dilakukan sama sekali.",
    },
    right: {
      title: "Paruh Depan (W11)",
      body: "Situasinya terbuka: sebuah domain menarik atau dataset yang bisa diakses.\n\nPertanyaannya adalah bagaimana mendefinisikan output, memilih input, dan menemukan gap yang benar-benar ada.\n\nFraming yang salah membuat eksekusi sesempurna apa pun jadi sia-sia.",
    },
    footnote: "Mahasiswa bisa menghabiskan bertahun-tahun mengeksekusi dengan kompeten pertanyaan yang sejak awal salah framing.",
  },

  // -- 6: Lab kecil sebagai keunggulan --
  {
    layout: "bullets",
    title: "Lab kecil bisa menjadi keunggulan",
    body: "Metodologi minggu ini dirancang untuk lab kecil dengan sumber daya terbatas, dan konteks lokal membuka peluang spesifik:",
    bullets: [
      "Saat sumber daya terbatas, aktivitas berdampak tertinggi adalah memilih pertanyaan yang tepat sebelum menghabiskan waktu eksekusi.",
      "Framing baik pada dataset kecil bisa menghasilkan riset yang layak dipublikasikan, sedangkan framing buruk pada dataset besar tidak.",
      "Data bahasa lokal seperti Banjar dan masalah pertanian atau kesehatan lokal punya gap literatur yang memang ada, bukan dibuat-buat.",
    ],
    footnote: "Lab berdana besar di Jakarta atau Singapura tidak mengejar masalah ini karena tidak terlihat dari sana.",
  },

  // -- 7: Materi 2 --
  {
    layout: "section",
    title: "2. Kerangka Input, Middle, Output",
    body: "Setiap masalah ML supervised bisa digambarkan sebagai transformasi dari Input ke Output lewat Middle. Tiga pertanyaan tentang ketiga komponen ini membedah satu masalah jadi keputusan desain yang jelas.",
    footnote: "Langkah Middle yang tidak punya jawaban standar adalah gap, dan gap adalah tempat kontribusi riset berada.",
  },

  // -- 8: Gambar kerangka (image-before-text) --
  {
    layout: "image",
    title: "Membedah masalah jadi Input, Middle, Output",
    imageUrl: "/figures/fig10a_input_middle_output.svg",
    caption: "Gambar ini menunjukkan kerangka dekomposisi yang membedah satu masalah ML jadi tiga bagian. Input adalah tensor yang diterima model, Output adalah tensor yang dihasilkan, dan Middle adalah komponen yang memetakan keduanya dengan sebagian langkah standar dan sebagian lagi berupa gap.",
    footnote: "Kerangka ini dipakai dari W1 sampai capstone untuk menamai setiap keputusan desain.",
  },

  // -- 9: Tiga komponen --
  {
    layout: "bullets",
    title: "Tiga komponen, semuanya keputusan desain",
    body: "Dari gambar tersebut, setiap masalah dipecah jadi tiga komponen yang masing-masing dipilih, bukan properti tetap dataset:",
    bullets: [
      "**Input** adalah apa yang diterima model saat prediksi, berupa satu atau beberapa tensor dengan bentuk spesifik.",
      "**Output** adalah apa yang dihasilkan model, dengan bentuk dan semantik yang sesuai dengan pertanyaan riset.",
      "**Middle** adalah yang memetakan Input ke Output, dengan sebagian langkah standar di Big Map dan sebagian berupa gap.",
    ],
    footnote: "Sebelum tiga pertanyaan, ada cek awal: kalau Anda belum bisa menulis satu kalimat pertanyaan, Anda belum punya pertanyaan riset.",
  },

  // -- 10: Satu dataset tidak berarti satu paper --
  {
    layout: "bullets",
    title: "Satu dataset tidak berarti satu paper",
    body: "Topik yang sama bisa dipertajam jadi pertanyaan riset berbeda dengan mengubah satu komponen kerangka:",
    bullets: [
      "**Ubah Output** dan Anda mendapat masalah keputusan berbeda, misalnya prediksi kelompok penyakit kasar untuk triase lapangan.",
      "**Ubah Input** dan Anda mendapat pertanyaan representasi berbeda, misalnya menambahkan input inframerah ke RGB.",
      "**Ubah Middle** dan Anda mendapat gap metodologis berbeda, misalnya distilasi ke model ringan untuk deployment.",
    ],
    footnote: "Ketiganya adalah pertanyaan riset berbeda dengan output, baseline, dan kontrol yang berbeda.",
  },

  // -- 11: Pertanyaan 1 --
  {
    layout: "bullets",
    title: "Pertanyaan 1: apa yang diprediksi, dan dari apa?",
    body: "Pertanyaan pertama mendefinisikan entitas, Output, dan Input, yang semuanya pilihan yang membentuk masalah riset:",
    bullets: [
      "**Entitas** adalah unit yang satu prediksi mewakilinya, misalnya satu daun, satu tanaman, atau satu kunjungan lahan.",
      "**Output** adalah tensor yang bentuknya mengodekan pertanyaan, dari satu nilai kontinu sampai peta piksel atau sequence.",
      "**Input** adalah representasi yang dipilih dari beberapa opsi, masing-masing dengan biaya perolehan dan kandungan informasi berbeda.",
    ],
    footnote: "Salah memilih entitas gagal secara diam-diam: hasilnya tampak masuk akal tetapi mengukur hal yang salah.",
  },

  // -- 12: Cek temporal --
  {
    layout: "bullets",
    title: "Cek temporal: validasi yang menentukan",
    body: "Setelah entitas, Output, dan Input ditentukan, tanyakan apakah model yang di-deploy akan punya akses ke input saat perlu membuat prediksi:",
    bullets: [
      "**Kalau jawabannya tidak**, framing-nya rusak, dan ini masalah framing yang tidak bisa diperbaiki dengan tuning atau lebih banyak data.",
      "**Contoh kegagalan** adalah memprediksi hasil panen dari pengukuran akhir musim, padahal musim sudah selesai sebelum prediksi dibuat.",
      "**Perbaikannya adalah framing ulang**, misalnya hanya memakai statistik babak pertama, dengan entitas dan output tetap sama.",
    ],
    footnote: "Konsep kebocoran ini sudah dibahas di W6; di sini ia dipakai sebelum kode ditulis, pada tahap merancang pertanyaan.",
  },

  // -- 13: Pertanyaan 2 + empat kasus (grid) --
  {
    layout: "grid",
    title: "Pertanyaan 2: petakan Middle ke Big Map",
    body: "Sketsa pipeline yang menghubungkan Input dan Output, lalu petakan tiap langkah ke Big Map. Empat kasus muncul, dan jenis kasus menentukan jenis kontribusi:",
    gridItems: [
      {
        title: "Kasus A - satu baris cocok",
        body: "Seluruh Middle adalah satu komponen standar, misalnya gambar ke CNN ke kelas. Pertanyaannya valid, tetapi kontribusinya sederhana kecuali domain atau bahasanya baru.",
      },
      {
        title: "Kasus B - rangkaian baris",
        body: "Beberapa langkah standar dirangkai berurutan pada kombinasi Input dan Output yang belum pernah dicoba. Kontribusinya adalah rangkaian itu beserta validasi empirisnya.",
      },
      {
        title: "Kasus C - baris plus gap",
        body: "Sebagian langkah standar, tetapi satu atau lebih tidak punya baris yang cocok. Gap inilah tempat riset baru berada dan harus dinamai dengan tepat.",
      },
      {
        title: "Kasus D - tidak ada baris cocok",
        body: "Pasangan Input dan Output tidak punya solusi ML di level mana pun. Ini jarang, dan biasanya berarti pasangannya belum terdefinisi dengan baik.",
      },
    ],
    footnote: "Banyak proyek tampak Kasus C pada awalnya, tetapi setelah diperiksa teliti ternyata Kasus B yang sama-sama sah.",
  },

  // -- 14: Menamai gap --
  {
    layout: "bullets",
    title: "Menamai gap dengan tepat",
    body: "Menamai gap dengan tepat adalah keterampilan terpenting dalam desain riset, karena gap yang samar bukan kontribusi:",
    bullets: [
      "**Gap samar** seperti \"kami mengusulkan metode yang lebih baik\" tidak menyebutkan apa yang sebenarnya belum terselesaikan.",
      "**Gap tepat** menyebut pilihan desain spesifik, misalnya mengagregasi deteksi multi-sudut-pandang tanpa kalibrasi kamera.",
      "**Gap yang baik** adalah pilihan desain yang belum punya jawaban mapan di literatur, bukan metode yang kebetulan berbeda.",
    ],
    footnote: "Di sini skeptisisme terhadap klaim sendiri terpakai: periksa apakah gap Anda memang Kasus C atau sebenarnya Kasus B.",
  },

  // -- 15: Pertanyaan 3: jenis kebaruan (split) --
  {
    layout: "split",
    title: "Pertanyaan 3: apakah gap layak diisi?",
    body: "Tidak semua gap sama menariknya. Membedakan kebaruan kuat dari lemah mencegah klaim yang tidak akan bertahan di review:",
    left: {
      title: "Kebaruan kuat",
      body: "Tugas baru yang belum pernah diprediksi pada jenis data ini.\n\nDomain baru untuk metode mapan, atau rakitan komponen yang bermotivasi baik.\n\nDesain ulang untuk batasan deployment yang benar-benar membentuk arsitektur.",
    },
    right: {
      title: "Kebaruan lemah",
      body: "Tuning hyperparameter, yang memang diharapkan dan bukan kontribusi.\n\n\"Studi pertama di Indonesia\" untuk masalah yang sudah diselesaikan global.\n\nMenggabungkan dua metode tanpa motivasi yang jelas.",
    },
    footnote: "Jebakan \"baru bagi saya\": metode standar tampak baru bagi yang baru mempelajarinya, tetapi tidak baru bagi bidangnya.",
  },

  // -- 16: Kalimat cek kebaruan + kontrol --
  {
    layout: "bullets",
    title: "Kalimat cek kebaruan dan kontrol",
    body: "Dua alat menutup tahap framing: satu kalimat yang menguji klaim kebaruan, dan kontrol yang membuat klaim bisa difalsifikasi:",
    bullets: [
      "**Kalimat cek kebaruan** berbunyi: literatur sudah melakukan X, karya kami melakukan Y yang berbeda karena Z, dan ini penting karena W.",
      "**Setiap kontribusi butuh kontrol** yang bisa memfalsifikasinya, misalnya baseline late-fusion untuk menguji klaim metode fusion baru.",
      "**Rancang kontrol sebelum eksperimen**, karena kontrol yang dibuat setelah melihat hasil hanya membangun cerita di sekitar hasil.",
    ],
    footnote: "Kalau keempat slot kalimat cek kebaruan belum bisa diisi jelas, klaim kebaruannya belum valid.",
  },

  // -- 17: Materi 3 --
  {
    layout: "section",
    title: "3. Menu Framing dan Filter Literatur",
    body: "Tahap dekomposisi yang baik menghasilkan menu framing, bukan satu proyek final. Untuk satu dataset, targetkan 3-5 framing kandidat yang berbeda secara bermakna.",
    footnote: "Tiga adalah minimum yang berguna; ubah setidaknya satu dari entitas, output, input, batasan, atau gap antar framing.",
  },

  // -- 18: Template framing --
  {
    layout: "code",
    title: "Template satu framing kandidat",
    body: "Tiap kandidat ditulis cukup detail agar bisa dicari dan dibandingkan, memakai template berikut:",
    lang: "text",
    code: `Framing #N
- Pertanyaan riset (1 kalimat)
- Entitas
- Input
- Output
- Cek temporal/kausal: LULUS / GAGAL
- Middle kasar
- Gap yang diperkirakan`,
    footnote: "Pada tahap ini, framing cukup jelas untuk dicari, belum perlu rancangan eksperimen lengkap.",
  },

  // -- 19: Loop filter literatur --
  {
    layout: "code",
    title: "Loop filter literatur, bukan tinjauan lengkap",
    body: "Pemeriksaan literatur dijalankan setelah menu terbentuk, memakai keterampilan baca abstrak cepat dari W10:",
    lang: "text",
    code: `Untuk setiap framing kandidat:
  Buat 2-4 query pencarian
  Skim maksimal 5-10 abstrak
  Klasifikasikan:
    BARU              -> pertahankan
    SEBAGIAN TERJAWAB -> ubah arah
    JENUH             -> hapus`,
    footnote: "Tujuannya menyaring, bukan tinjauan literatur lengkap; alatnya Google Scholar, Semantic Scholar, Connected Papers, Papers with Code.",
  },

  // -- 20: Klasifikasi --
  {
    layout: "bullets",
    title: "Tiga hasil klasifikasi filter",
    body: "Setiap framing kandidat berakhir di salah satu dari tiga kategori, dan tiap kategori menuntut tindakan berbeda:",
    bullets: [
      "**BARU** berarti gap tampak belum ditangani, sehingga framing dipertahankan sebagai kandidat kuat.",
      "**SEBAGIAN TERJAWAB** berarti literatur sudah dekat, sehingga arah diubah ke bagian yang belum dilakukan.",
      "**JENUH** berarti 5+ paper terbaru membahas kombinasi yang sama persis, sehingga framing dihapus dengan sehat.",
    ],
    footnote: "Menghapus framing yang jenuh menandakan filternya bekerja; sunk cost adalah musuhnya.",
  },

  // -- 21: Materi 4 --
  {
    layout: "section",
    title: "4. Dua Fase dan Luaran W11",
    body: "Minggu ini punya dua fase yang tidak boleh dicampur: dekomposisi lalu filter literatur. Mencampurnya menghasilkan framing yang aman dan dangkal, yaitu hal pertama yang terlintas, hampir tanpa diperiksa.",
    footnote: "Hasilkan dulu, filter kemudian; 2-4 jam filter literatur bisa menghemat berminggu-minggu eksekusi yang terbuang.",
  },

  // -- 22: Dua fase (split) --
  {
    layout: "split",
    title: "Dekomposisi lalu filter literatur",
    body: "Kedua fase punya mindset yang berbeda dan harus dijalankan berurutan, bukan bersamaan:",
    left: {
      title: "Fase 1 - Dekomposisi",
      body: "Hasilkan 3-5 framing kandidat yang benar-benar berbeda.\n\nJadilah kreatif dan jangan konsultasikan literatur dulu.\n\nUbah setidaknya satu dari entitas, output, input, batasan, atau gap antar framing.",
    },
    right: {
      title: "Fase 2 - Filter Literatur",
      body: "Bawa setiap kandidat ke literatur.\n\nCari mana yang jenuh, mana yang perlu ubah arah, dan mana yang punya gap nyata.\n\nJalankan pada setiap framing, terutama yang tampak jelas menjanjikan.",
    },
    footnote: "Framing yang tampak menjanjikan paling sering kena jebakan \"baru bagi saya\".",
  },

  // -- 23: Luaran W11 --
  {
    layout: "bullets",
    title: "Luaran W11 yang dibawa ke W12",
    body: "Setelah kedua fase selesai, kirim tiga luaran ke RA sebelum W12 sebagai dasar presentasi dan pertahanan framing:",
    bullets: [
      "**Dokumen dekomposisi** berisi semua 3-5 framing memakai template Input, Middle, Output.",
      "**Tabel pemeriksaan literatur** dengan satu baris per framing beserta klasifikasi dan buktinya.",
      "**Paragraf daftar pendek** memuat framing utama dengan kalimat cek kebaruan, framing cadangan, dan framing yang dihapus beserta alasannya.",
    ],
    footnote: "Datang ke W12 siap mempresentasikan dan mempertahankan framing utama: framing adalah keputusan Anda, dan Anda yang menjelaskannya.",
  },

  // -- 24: Lab --
  {
    layout: "bullets",
    title: "Lab dan lokakarya W11",
    body: "Sesi kelas 120 menit menjalankan demo dekomposisi lalu tiga lokakarya, mengikuti urutan empat materi di atas:",
    bullets: [
      "**Lokakarya 1** menghasilkan menu tiga framing kandidat dari dataset kelompok tanpa langsung berkomitmen.",
      "**Lokakarya 2** menjalankan filter literatur cepat pada ketiga framing dan mengklasifikasikannya.",
      "**Lokakarya 3** mengubah menu jadi keputusan: satu framing utama, satu cadangan, dan framing yang dihapus beserta alasannya.",
    ],
    footnote: "Checklist: pertanyaan riset dinyatakan, cek temporal lulus, gap dinamai, filter dijalankan, dan kalimat cek kebaruan dilengkapi.",
  },

  // -- 25: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Tiga pertanyaan untuk dibawa ke portofolio mandiri, semuanya melatih kerangka framing pada topik baru:",
    bullets: [
      "Untuk topik \"deteksi emosi dari audio\", tiga framing berbeda apa yang muncul dengan entitas, input, output, dan letak gap yang berbeda?",
      "Pilih satu dataset, hasilkan tiga framing tanpa mencari literatur, lalu jalankan filter: adakah yang jenuh, dan adakah yang mengarah ke gap nyata?",
      "Cari satu contoh paper yang kemungkinan punya masalah cek temporal: apa yang salah dengan framing-nya dan bagaimana memperbaikinya?",
    ],
  },

  // -- 26: Lanjut ke Capstone --
  {
    layout: "bullets",
    title: "Lanjut ke Capstone",
    body: "Dengan W11 selesai, menu framing siap dan daftar pendek tertulis. Empat minggu capstone W12-W15 mengubah framing jadi riset yang dipertahankan:",
    bullets: [
      "**W12** mempresentasikan dan mempertahankan framing utama, lalu memulai Eksperimen 1 dengan pre-registration.",
      "**W13** melakukan rethink dan iterasi menuju Eksperimen 2, lalu W14 menyajikan research talk 20 menit.",
      "**W15** mengumpulkan laporan final dan repo bertag versi tanpa sesi kelas.",
    ],
    footnote: "Seluruh disiplin bootcamp dari reproduksibilitas (W4) sampai ablation (W3) kini dipakai pada pertanyaan riset Anda sendiri.",
  },

  // -- 27: CTA --
  {
    layout: "cta",
    title: "Siapkan Framing Capstone",
    body: "Susun menu 3-5 framing dengan template dekomposisi, jalankan filter literatur, lalu isi template pre-registration sebagai dasar Eksperimen 1 di W12.\n\nEstimasi waktu 6-8 jam termasuk dekomposisi dan filter literatur antar sesi.",
    ctaText: "Buka Template Pre-registration",
    ctaTarget: "https://github.com/muhammad-zainal-muttaqin/Module-DS/blob/master/template/docs/prereg_template.md",
  },
];

import type { SlideSection } from "./index";

export const slides00: SlideSection[] = [
  // ── Slide 1: Title ──
  {
    layout: "title",
    title: "Bootcamp ML/DL: Asisten Riset Dosen",
    subtitle: "11 minggu bootcamp + 4 minggu capstone. Berpikir seperti peneliti, bukan sekadar menjalankan kode.",
    body: "Orientasi, target hasil, kontrak belajar.",
    footnote: "Bab 00 - Pendahuluan",
  },

  // ── Slide 2: Skenario email PI ──
  {
    layout: "section",
    title: "Bayangkan: Kamu Baru Masuk Lab",
    body: "Bayangkan hari pertama kamu sebagai asisten riset: dosen mengirim email pendek tanpa template maupun petunjuk langkah demi langkah. Email itu hanya berisi sebuah permintaan riset, dan kamu harus memutuskan langkah berikutnya sendiri.",
    footnote: "Modul ini menyiapkan kamu untuk situasi persis seperti ini.",
  },

  // ── Slide 3: Isi email ──
  {
    layout: "bullets",
    title: "Isi Email dari Dosen Pembimbing",
    body: "Berikut adalah contoh isi email yang mungkin kamu terima dari dosen pembimbing:",
    bullets: [
      "\"Coba uji **focal loss** sebagai alternatif cross-entropy pada dataset kita\"",
      "\"Freeze blok awal backbone, bandingkan dengan yang tidak di-freeze\"",
      "\"Pastikan **perbandingan yang setara** - konfigurasi yang sama kecuali komponen yang diuji\"",
      "\"Kirim laporan singkat dalam **3 hari**\"",
      "Email berakhir di sini, dan tidak ada penjelasan lebih lanjut.",
    ],
    footnote: "Email seperti ini normal di lingkungan riset. Bukan tanda dosen tidak peduli - justru tanda kepercayaan.",
  },

  // ── Slide 4: Reaksi wajar ──
  {
    layout: "bullets",
    title: "Reaksi Pertama yang Wajar",
    body: "Ketika menerima email seperti itu, reaksi berikut adalah hal yang wajar:",
    bullets: [
      "Kamu mungkin bertanya-tanya: focal loss itu apa? Baru pertama kali dengar istilah ini.",
      "Freeze blok mana yang dimaksud? conv1? layer1? Seluruh backbone?",
      "Baseline yang 'adil' itu artinya apa - learning rate harus sama? Batch size sama? Augmentasi sama?",
      "Waktunya hanya 3 hari, dan kamu belum tahu harus mulai dari mana.",
      "Bootcamp ini menjawab semua pertanyaan itu - satu minggu per topik.",
    ],
    footnote: "Ketidaktahuan awal bukan masalah. Yang bermasalah adalah tidak tahu cara mencari jawabannya.",
  },

  // ── Slide 5: Video 3Blue1Brown ──
  {
    layout: "video",
    title: "Sebelum Lanjut: Tonton 19 Menit Ini",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk",
    caption: "3Blue1Brown - \"But what is a Neural Network?\" - fondasi visual yang dipakai sepanjang bootcamp",
    footnote: "Silakan lanjut dulu ke slide berikutnya, kembali ke video setelah membaca modul.",
  },

  // ── Slide 5b: Materi Bab Ini ──
  {
    layout: "bullets",
    title: "Materi Bab Ini",
    body: "Bab pendahuluan ini membahas empat hal utama:",
    bullets: [
      "**Konteks bootcamp** - 11 minggu inti plus 4 minggu capstone yang menyiapkan kamu menjadi asisten riset ML/DL.",
      "**Tiga pilar target hasil** - Ketajaman Teknis, Diagnosis & Kemandirian, dan Perancangan Riset.",
      "**Sepuluh kompetensi inti** yang dibagi menjadi tiga gelombang sesuai urutan minggu.",
      "**Empat sikap riset dan Kontrak Belajar** yang menjadi komitmen kamu sepanjang bootcamp.",
    ],
    footnote: "Bab ini tidak menuntut hafalan - peta orientasi yang akan dirujuk berulang sepanjang modul.",
  },

  // ── Slide 5c: Objektif Belajar ──
  {
    layout: "bullets",
    title: "Objektif Belajar",
    body: "Selama mengikuti bab pendahuluan ini, kamu akan:",
    bullets: [
      "**Mengenali tiga pilar** dan mengaitkannya dengan kompetensi yang dilatih per minggu.",
      "**Memetakan posisi diri** di sepuluh kompetensi - mana yang sudah dikenal, mana yang masih asing.",
      "**Menyetujui Kontrak Belajar** dengan tiga komitmen: ritme mingguan, akuntabilitas pemikiran, dan breadth empat dari lima keluarga arsitektur.",
      "**Menulis refleksi awal** yang akan dirujuk kembali di Minggu 14 untuk mengukur perubahan.",
    ],
    footnote: "Tujuannya bukan sekadar membaca - bab ini memberi kamu peta yang siap dipakai sebelum masuk W1.",
  },

  // ── Slide 5d: Setelah Bab Ini Kamu Paham ──
  {
    layout: "grid",
    title: "Setelah Bab Ini Kamu Paham",
    body: "Setelah membaca bab pendahuluan, kamu diharapkan mampu:",
    gridItems: [
      {
        title: "Menjawab 'Mengapa Bootcamp Ini Ada'",
        body: "Kamu bisa menjelaskan bahwa email PI dua kalimat menyimpan enam keputusan tersembunyi yang harus diambil oleh asisten riset, dan bootcamp ini melatih cara mengambil keputusan-keputusan tersebut secara sistematis.",
      },
      {
        title: "Menjelaskan Empat Sikap Riset",
        body: "Kamu bisa menyebutkan Curiosity, Rigor, Skepticism, dan Ownership beserta contoh konkret kapan tiap sikap dipakai - misalnya kapan harus mencurigai akurasi 99% di hari pertama.",
      },
      {
        title: "Menghindari Empat Kebiasaan Pemblok",
        body: "Kamu bisa mengenali empat kebiasaan yang menghambat kemajuan trainee - berhenti saat kode jalan, LLM tanpa verifikasi, catatan ditunda, dan training tanpa EDA - beserta strategi konkret untuk menghindarinya.",
      },
    ],
    footnote: "Tiga capaian ini akan diperdalam lewat kebiasaan riset minggu demi minggu mulai W1.",
  },

  // ── Slide 6: 3 Pilar target ──
  {
    layout: "section",
    title: "Target Akhir: 3 Pilar Kompetensi",
    body: "Bootcamp ini bukan tentang menguasai framework sebanyak mungkin. Tujuannya lebih sempit dan lebih dalam: kita membangun tiga pilar yang membuat seorang asisten riset bisa bekerja secara mandiri.",
    footnote: "Semua lab, breadth check, dan capstone diarahkan ke ketiga pilar ini.",
  },

  // ── Slide 6b: Big Map visual ──
  {
    layout: "image",
    title: "Big Map: Kerangka 11 Minggu",
    imageUrl: "/figures/fig00_big_map.svg",
    caption: "Gambar ini menunjukkan kerangka berpikir Input → Middle → Output yang dipakai dari W1 sampai W11 dan capstone.",
    footnote: "Tidak perlu dipahami sepenuhnya sekarang - akan diperkenalkan secara bertahap tiap minggu.",
  },

  // ── Slide 7: Pilar 1 ──
  {
    layout: "split",
    title: "Pilar 1: Ketajaman Teknis & Rigor Eksperimen",
    left: {
      title: "Artinya",
      body: "Pilar ini melatih ketajaman teknis: kamu akan membaca shape tensor terlebih dahulu sebelum membaca kode, memilih arsitektur dari bentuk data (bukan dari nama paper yang sedang tren), dan mendiagnosis training dari kurva loss (bukan dari feeling).",
    },
    right: {
      title: "Wujud Konkretnya",
      bullets: [
        "Kamu membangun peta data → arsitektur → loss yang konsisten.",
        "Kamu menjalankan eksperimen yang reproduksibel dari config + commit hash.",
        "Kamu bisa mendiagnosis overfitting/underfitting dari kurva tanpa bantuan forum.",
      ],
    },
    footnote: "Kompetensi 1-4 (W1-W4) membangun pilar ini.",
  },

  // ── Slide 8: Pilar 2 ──
  {
    layout: "split",
    title: "Pilar 2: Diagnosis & Kemandirian",
    left: {
      title: "Artinya",
      body: "Pilar ini melatih kemandirian diagnosis: kamu bisa membaca training signal dan tahu apa artinya, bisa mengaudit data untuk leakage sebelum melatih model, dan bisa mengadopsi repository baru tanpa bimbingan.",
    },
    right: {
      title: "Wujud Konkretnya",
      bullets: [
        "Kamu melakukan audit temporal leakage dalam pipeline data.",
        "Kamu melakukan debug dari log dan kurva, bukan bertanya ke internet atau LLM dulu.",
        "Kamu bisa mengadopsi repo baru dengan smoke test dalam 1 hari pertama.",
      ],
    },
    footnote: "Kompetensi 5-7 (W5-W8) membangun pilar ini.",
  },

  // ── Slide 9: Pilar 3 ──
  {
    layout: "split",
    title: "Pilar 3: Perancangan Riset",
    left: {
      title: "Artinya",
      body: "Pilar ini melatih perancangan riset: kamu akan menyusun pertanyaan riset yang bisa difalsifikasi, menemukan gap di literatur secara sistematis, dan mengkomunikasikan temuan dengan bukti (bukan kesan).",
    },
    right: {
      title: "Wujud Konkretnya",
      bullets: [
        "Kamu melakukan dekomposisi masalah dengan kerangka Input→Middle→Output.",
        "Kamu melakukan literature triage: membaca paper dengan tujuan, bukan membaca semua.",
        "Kamu membuat pre-registrasi eksperimen sebelum training dimulai.",
      ],
    },
    footnote: "Kompetensi 8-10 (W9-W11) membangun pilar ini.",
  },

  // ── Slide 10: Struktur modul ──
  {
    layout: "section",
    title: "Cara Membaca Modul: Struktur 11+4",
    body: "Modul ini tersusun dari sebelas minggu bootcamp dengan satu bab per minggu, yang diikuti oleh empat minggu capstone. Setiap minggu menyajikan satu tema besar, satu lab wajib, dan satu entri portofolio.",
    footnote: "Bab 00 ini adalah peta - bukan materi yang perlu dihafal.",
  },

  // ── Slide 10b: Peta dependensi modul ──
  {
    layout: "image",
    title: "Peta Dependensi Modul",
    imageUrl: "/figures/fig00a_module_map.svg",
    caption: "Peta ini menunjukkan bahwa W1-W4 bisa dikerjakan secara linier, sementara W5 ke atas memiliki dependensi antar bab. Pendalaman opsional bisa dilompati jika diperlukan.",
    footnote: "Jika ada minggu yang terasa berat, cek peta ini - mana yang wajib, mana yang opsional.",
  },

  // ── Slide 11: 3 Thread paralel ──
  {
    layout: "grid",
    title: "Tiga Thread Belajar yang Berjalan Paralel",
    body: "Sepanjang bootcamp, kamu akan mengikuti tiga thread belajar yang berjalan secara paralel:",
    gridItems: [
      {
        title: "Big Map (Input→Middle→Output)",
        body: "Thread ini memperkenalkan kerangka berpikir untuk setiap dataset riset: siapa entitasnya, apa outputnya, dan informasi apa yang tersedia. Konsep ini diperkenalkan di W11 dan dipakai di capstone.",
      },
      {
        title: "Kebiasaan Riset",
        body: "Thread ini menanamkan satu kebiasaan baru per minggu: smoke test (W2), matriks eksperimen (W4), pre-reg (W4), peer review (W6), dan literature triage (W11).",
      },
      {
        title: "Pilihan Representasi",
        body: "Thread ini mengangkat pertanyaan tentang representasi di setiap bab: fitur apa yang dipakai? Apakah hand-crafted, pre-trained, atau learned jointly?",
      },
    ],
    footnote: "Ketiga thread ini tidak perlu dipahami sepenuhnya sekarang. Akan semakin jelas seiring berjalannya waktu.",
  },

  // ── Slide 12: Wave 1 Kompetensi ──
  {
    layout: "grid",
    title: "10 Kompetensi Inti - Wave 1 (W1-W4)",
    body: "Wave pertama membangun fondasi teknis melalui empat kompetensi berikut:",
    gridItems: [
      {
        title: "K1: Arsitektur NN",
        body: "Kamu menguasai forward pass 4 dari 5 keluarga arsitektur: MLP, CNN, RNN/LSTM, Transformer, dan Autoencoder. Fokusnya adalah breadth, bukan depth.",
      },
      {
        title: "K2: Loss & Optimizer",
        body: "Kamu bisa memilih loss dari task yang diberikan, mendiagnosa underfitting/overfitting dari kurva, dan melakukan ablation satu variabel.",
      },
      {
        title: "K3: Reproduksibilitas",
        body: "Kamu mengunci seed, menyimpan config di YAML, dan menyertakan git hash di checkpoint sehingga eksperimen bisa direproduksi.",
      },
      {
        title: "K4: Leakage Dasar",
        body: "Kamu menghitung statistik normalisasi dari train saja, memastikan train/val/test tidak tercampur, dan melakukan split sebelum preprocessing.",
      },
    ],
    footnote: "Wave 1 selesai = kamu bisa menjalankan eksperimen ML yang benar dan terdokumentasi.",
  },

  // ── Slide 13: Wave 2-3 Kompetensi ──
  {
    layout: "grid",
    title: "10 Kompetensi Inti - Wave 2 & 3 (W5-W11)",
    body: "Wave kedua dan ketiga memperdalam kemampuan diagnosis dan perancangan riset:",
    gridItems: [
      {
        title: "K5: Representasi",
        body: "Kamu memahami tiga strategi representasi: hand-crafted, pre-trained features, dan learned jointly, serta tahu kapan harus memakai mana.",
      },
      {
        title: "K6: Temporal Leakage",
        body: "Kamu memahami bahwa data time-series punya kausalitas, sehingga chronological split wajib dilakukan. Demo menunjukkan delta dramatik (0.92 → 0.63) saat leakage diperbaiki.",
      },
      {
        title: "K7: Paper Reading",
        body: "Kamu menguasai 3-pass reading: membaca judul+abstrak, kerangka, dan detail, serta bisa menerapkan paper-to-code workflow.",
      },
      {
        title: "K8-K10: Lanjutan",
        body: "Kamu mempelajari foundation models, multimodal fusion, framing riset Input→Middle→Output, dan literature triage.",
      },
    ],
    footnote: "Wave 2-3 selesai = kamu bisa membaca paper, mengadopsi model baru, dan merancang riset sendiri.",
  },

  // ── Slide 14: 4 Sikap Riset ──
  {
    layout: "grid",
    title: "4 Sikap Riset yang Ditanamkan Sepanjang Modul",
    body: "Sepanjang modul, kamu akan menanamkan empat sikap riset berikut:",
    gridItems: [
      {
        title: "Curiosity",
        body: "Sikap Curiosity berarti kamu bertanya 'mengapa' sebelum menerima hasil, tidak puas dengan 'pokoknya jalan', dan justru mencurigai angka yang terlalu baik di hari pertama.",
      },
      {
        title: "Rigor",
        body: "Sikap Rigor berarti kamu hanya mengubah satu variabel per run, mengunci seed, menyimpan jejak eksperimen, dan mencatat observasi saat eksperimen berlangsung (bukan sesudahnya).",
      },
      {
        title: "Skepticism",
        body: "Sikap Skepticism berarti kamu tidak langsung percaya pada angka sendiri. Akurasi 99% di hari pertama adalah lampu merah, dan kamu selalu mengecek apakah ada data leakage atau kesalahan evaluasi.",
      },
      {
        title: "Ownership",
        body: "Sikap Ownership berarti tanggung jawab tetap berada di tangan kamu, walaupun kode ditulis oleh LLM. Kamu yang menjelaskan hasilnya, dan kamu yang mempertahankan keputusannya.",
      },
    ],
    footnote: "Sikap ini ditanamkan lewat pitfall, pertanyaan refleksi, dan lab - bukan ceramah.",
  },

  // ── Slide 15: Kontrak Belajar (bagian 1) ──
  {
    layout: "bullets",
    title: "Kontrak Belajar: Klausul 1–4",
    body: "Kontrak belajar berisi kesepakatan yang harus kamu ikuti selama bootcamp. Berikut adalah empat klausul pertama:",
    bullets: [
      "**Timing:** Lab harus dikerjakan di minggu yang sama dengan bacaan, karena menunda akan memutus alur pemahaman.",
      "**Akuntabilitas pikiran:** Kamu harus menulis observasi sebelum interpretasi, dan membedakan kedua hal ini dengan jelas.",
      "**Breadth Check:** Kamu wajib menguasai forward pass minimal 4 dari 5 keluarga arsitektur sebelum memasuki capstone.",
      "**Portofolio:** Kamu menyusun catatan berjalan di `portofolio_mandiri.ipynb` untuk dibaca ulang, bukan untuk dinilai akhir.",
    ],
    footnote: "Checklist klausul lengkap ada di Lampiran D.5.",
  },

  // ── Slide 15b: Kontrak Belajar (bagian 2) ──
  {
    layout: "bullets",
    title: "Kontrak Belajar: Klausul 5–8",
    body: "Berikut adalah empat klausul lanjutan dalam kontrak belajar:",
    bullets: [
      "**Komponen Mandiri:** Mulai W4, kamu akan mempresentasikan satu topik bebas selama 10 menit di setiap sesi.",
      "**Negative Results:** Kamu wajib melaporkan hasil negatif, karena itu adalah data yang berharga, bukan kegagalan.",
      "**Refleksi:** Tiap bab ditutup dengan 3 pertanyaan terbuka yang harus kamu jawab dengan jujur, bukan dengan template.",
      "**Git workflow:** Setiap eksperimen harus memiliki commit - bukan karena protokol semata, tapi karena reproduksibilitas.",
    ],
    footnote: "4 klausul ini sering dilanggar karena terlihat 'tidak teknis' - padahal menentukan keberlanjutan kompetensi.",
  },

  // ── Slide 16: 4 Perangkap ──
  {
    layout: "bullets",
    title: "4 Kebiasaan yang Memblokir Kemajuan",
    body: "Ada empat kebiasaan yang sering memblokir kemajuan belajar. Hindari kebiasaan berikut:",
    bullets: [
      "**Berhenti begitu lab sampai kode jalan** - Kamu berhenti di titik itu tanpa membaca apa yang sebenarnya terjadi di dalam kode.",
      "**Menggunakan LLM tanpa verifikasi** - Kamu menyalin kode dari AI tanpa membaca, tanpa menguji, dan tanpa memahami cara kerjanya.",
      "**Menunda catatan eksperimen** - Kalimat 'nanti saya tulis' sering berakhir dengan catatan yang tidak pernah ditulis.",
      "**Langsung training tanpa EDA** - Kamu melatih model sebelum memahami data, sehingga leakage tidak terdeteksi.",
    ],
    footnote: "Kebiasaan ini tidak membuat kamu gagal di lab - tapi membuat kamu tidak siap untuk riset nyata.",
  },

  // ── Slide 17: Refleksi awal ──
  {
    layout: "quote",
    title: "Pertanyaan Refleksi Awal (Tulis Sekarang)",
    quote: "Apa yang kamu harapkan bisa kamu lakukan setelah 15 minggu ini, yang sekarang belum bisa kamu lakukan?",
    author: "Pertanyaan refleksi Bab 00 - jawaban dibandingkan di W14",
    body: "Dua pertanyaan lain ada di akhir bab. Tulis jawaban sebelum membaca bab pertama.",
  },

  // ── Slide 18: CTA ──
  {
    layout: "cta",
    title: "Mulai dari W1",
    body: "Slide ini hanya peta. Detail, contoh angka, pitfall, dan lab ada di modul penuh.\n\nBaca Bab 00a (Prasyarat) dulu jika shape tensor dan PyTorch dasar belum lancar - cukup 20 menit.",
    ctaText: "Baca Modul 00 Penuh",
    ctaTarget: "00",
  },
];

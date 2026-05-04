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
    body: "Hari pertama jadi asisten riset. Dosen mengirim email pendek - tidak ada template, tidak ada petunjuk langkah demi langkah. Hanya sebuah permintaan riset.",
    footnote: "Modul ini menyiapkan kamu untuk situasi persis seperti ini.",
  },

  // ── Slide 3: Isi email ──
  {
    layout: "bullets",
    title: "Isi Email dari Dosen Pembimbing",
    bullets: [
      "\"Coba uji **focal loss** sebagai alternatif cross-entropy pada dataset kita\"",
      "\"Freeze blok awal backbone, bandingkan dengan yang tidak di-freeze\"",
      "\"Pastikan **perbandingan yang setara** - konfigurasi yang sama kecuali komponen yang diuji\"",
      "\"Kirim laporan singkat dalam **3 hari**\"",
      "Email selesai. Tidak ada penjelasan lebih lanjut.",
    ],
    footnote: "Email seperti ini normal di lingkungan riset. Bukan tanda dosen tidak peduli - justru tanda kepercayaan.",
  },

  // ── Slide 4: Reaksi wajar ──
  {
    layout: "bullets",
    title: "Reaksi Pertama yang Wajar",
    bullets: [
      "Focal loss? Baru pertama kali dengar istilah ini",
      "Freeze blok mana? conv1? layer1? Seluruh backbone?",
      "Baseline 'adil' artinya apa - learning rate sama? Batch size sama? Augmentasi sama?",
      "3 hari, dan tidak tahu mulai dari mana",
      "Bootcamp ini menjawab semua pertanyaan itu - satu minggu per topik",
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

  // ── Slide 6: 3 Pilar target ──
  {
    layout: "section",
    title: "Target Akhir: 3 Pilar Kompetensi",
    body: "Bootcamp ini bukan tentang menguasai framework sebanyak mungkin. Tujuannya lebih sempit dan lebih dalam: tiga pilar yang membuat seorang asisten riset bisa bekerja secara mandiri.",
    footnote: "Semua lab, breadth check, dan capstone diarahkan ke ketiga pilar ini.",
  },

  // ── Slide 6b: Big Map visual ──
  {
    layout: "image",
    title: "Big Map: Kerangka 11 Minggu",
    imageUrl: "/figures/fig00_big_map.svg",
    caption: "Input → Middle → Output. Kerangka berpikir ini dipakai dari W1 sampai W11 dan capstone.",
    footnote: "Tidak perlu dipahami sepenuhnya sekarang - akan diperkenalkan secara bertahap tiap minggu.",
  },

  // ── Slide 7: Pilar 1 ──
  {
    layout: "split",
    title: "Pilar 1: Ketajaman Teknis & Rigor Eksperimen",
    left: {
      title: "Artinya",
      body: "Membaca shape tensor sebelum membaca kode. Memilih arsitektur dari bentuk data, bukan dari nama paper yang sedang tren. Mendiagnosis training dari kurva loss, bukan dari feeling.",
    },
    right: {
      title: "Wujud Konkretnya",
      bullets: [
        "Peta data → arsitektur → loss yang konsisten",
        "Eksperimen reproduksibel dari config + commit hash",
        "Diagnosis overfitting/underfitting dari kurva tanpa bantuan forum",
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
      body: "Bisa membaca training signal dan tahu apa artinya. Bisa mengaudit data untuk leakage sebelum melatih model. Bisa mengadopsi repository baru tanpa bimbingan.",
    },
    right: {
      title: "Wujud Konkretnya",
      bullets: [
        "Audit temporal leakage dalam pipeline data",
        "Debug dari log dan kurva, bukan bertanya ke internet atau LLM dulu",
        "Adopsi repo baru: smoke test dalam 1 hari pertama",
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
      body: "Menyusun pertanyaan riset yang bisa difalsifikasi. Menemukan gap di literatur secara sistematis. Mengkomunikasikan temuan dengan bukti, bukan kesan.",
    },
    right: {
      title: "Wujud Konkretnya",
      bullets: [
        "Dekomposisi masalah dengan kerangka Input→Middle→Output",
        "Literature triage: baca paper dengan tujuan, bukan baca semua",
        "Pre-registrasi eksperimen sebelum training dimulai",
      ],
    },
    footnote: "Kompetensi 8-10 (W9-W11) membangun pilar ini.",
  },

  // ── Slide 10: Struktur modul ──
  {
    layout: "section",
    title: "Cara Membaca Modul: Struktur 11+4",
    body: "Sebelas minggu bootcamp dengan satu bab per minggu, diikuti empat minggu capstone. Setiap minggu ada satu tema besar, satu lab wajib, dan satu entri portofolio.",
    footnote: "Bab 00 ini adalah peta - bukan materi yang perlu dihafal.",
  },

  // ── Slide 10b: Peta dependensi modul ──
  {
    layout: "image",
    title: "Peta Dependensi Modul",
    imageUrl: "/figures/fig00a_module_map.svg",
    caption: "W1-W4 bisa dikerjakan linier. W5+ ada dependensi antar bab. Pendalaman opsional bisa dilompat.",
    footnote: "Jika ada minggu yang terasa berat, cek peta ini - mana yang wajib, mana yang opsional.",
  },

  // ── Slide 11: 3 Thread paralel ──
  {
    layout: "grid",
    title: "Tiga Thread Belajar yang Berjalan Paralel",
    gridItems: [
      {
        title: "Big Map (Input→Middle→Output)",
        body: "Kerangka berpikir untuk setiap dataset riset. Siapa entitasnya, apa outputnya, informasi apa yang tersedia. Diperkenalkan W11, dipakai di capstone.",
      },
      {
        title: "Kebiasaan Riset",
        body: "Satu kebiasaan baru per minggu: smoke test (W2), matriks eksperimen (W4), pre-reg (W4), peer review (W6), literature triage (W11).",
      },
      {
        title: "Pilihan Representasi",
        body: "Setiap bab mengangkat satu pertanyaan tentang representasi: fitur apa yang dipakai? hand-crafted, pre-trained, atau learned jointly?",
      },
    ],
    footnote: "Ketiga thread ini tidak perlu dipahami sepenuhnya sekarang. Akan semakin jelas seiring berjalannya waktu.",
  },

  // ── Slide 12: Wave 1 Kompetensi ──
  {
    layout: "grid",
    title: "10 Kompetensi Inti - Wave 1 (W1-W4)",
    gridItems: [
      {
        title: "K1: Arsitektur NN",
        body: "Forward pass 4 dari 5 keluarga: MLP, CNN, RNN/LSTM, Transformer, Autoencoder. Breadth, bukan depth.",
      },
      {
        title: "K2: Loss & Optimizer",
        body: "Pilih loss dari task. Diagnosa underfitting/overfitting dari kurva. Ablation satu variabel.",
      },
      {
        title: "K3: Reproduksibilitas",
        body: "Seed dikunci, config di YAML, checkpoint menyertakan git hash. Eksperimen bisa direproduksi.",
      },
      {
        title: "K4: Leakage Dasar",
        body: "Statistik normalisasi dari train saja. Train/val/test jangan dicampur. Split sebelum preprocessing.",
      },
    ],
    footnote: "Wave 1 selesai = kamu bisa menjalankan eksperimen ML yang benar dan terdokumentasi.",
  },

  // ── Slide 13: Wave 2-3 Kompetensi ──
  {
    layout: "grid",
    title: "10 Kompetensi Inti - Wave 2 & 3 (W5-W11)",
    gridItems: [
      {
        title: "K5: Representasi",
        body: "Tiga strategi: hand-crafted, pre-trained features, learned jointly. Kapan pakai mana.",
      },
      {
        title: "K6: Temporal Leakage",
        body: "Data time-series punya kausalitas. Chronological split wajib. Demo delta dramatik (0.92 → 0.63).",
      },
      {
        title: "K7: Paper Reading",
        body: "3-pass reading: judul+abstrak, kerangka, detail. Paper-to-code workflow.",
      },
      {
        title: "K8-K10: Lanjutan",
        body: "Foundation models, multimodal fusion, framing riset Input→Middle→Output, literature triage.",
      },
    ],
    footnote: "Wave 2-3 selesai = kamu bisa membaca paper, mengadopsi model baru, dan merancang riset sendiri.",
  },

  // ── Slide 14: 4 Sikap Riset ──
  {
    layout: "grid",
    title: "4 Sikap Riset yang Ditanamkan Sepanjang Modul",
    gridItems: [
      {
        title: "Curiosity",
        body: "Bertanya \"mengapa\" sebelum menerima hasil. Tidak puas dengan \"pokoknya jalan\". Angka baik di hari pertama justru mencurigakan.",
      },
      {
        title: "Rigor",
        body: "Satu variabel berubah per run. Seed dikunci. Jejak eksperimen tersimpan. Catatan dibuat saat eksperimen berlangsung, bukan sesudahnya.",
      },
      {
        title: "Skepticism",
        body: "Tidak percaya pada angka sendiri. Akurasi 99% hari pertama = lampu merah. Selalu cek apakah data leakage, apakah evaluasi sudah benar.",
      },
      {
        title: "Ownership",
        body: "Tanggung jawab tetap di tangan kamu, walaupun kode ditulis oleh LLM. Kamu yang menjelaskan, kamu yang mempertahankan.",
      },
    ],
    footnote: "Sikap ini ditanamkan lewat pitfall, pertanyaan refleksi, dan lab - bukan ceramah.",
  },

  // ── Slide 15: Kontrak Belajar (bagian 1) ──
  {
    layout: "bullets",
    title: "Kontrak Belajar: Klausul 1–4",
    bullets: [
      "**Timing:** lab dikerjakan di minggu yang sama dengan bacaan - menunda akan memutus alur pemahaman",
      "**Akuntabilitas pikiran:** tulis observasi sebelum interpretasi - bedakan dua hal ini",
      "**Breadth Check:** forward pass minimal 4 dari 5 keluarga arsitektur sebelum capstone",
      "**Portofolio:** catatan berjalan di `portofolio_mandiri.ipynb` - untuk dibaca ulang, bukan untuk dinilai akhir",
    ],
    footnote: "Checklist klausul lengkap ada di Lampiran D.5.",
  },

  // ── Slide 15b: Kontrak Belajar (bagian 2) ──
  {
    layout: "bullets",
    title: "Kontrak Belajar: Klausul 5–8",
    bullets: [
      "**Komponen Mandiri:** mulai W4, satu topik bebas dipresentasikan 10 menit per sesi",
      "**Negative Results:** hasil negatif wajib dilaporkan - itu data, bukan kegagalan",
      "**Refleksi:** tiap bab ditutup 3 pertanyaan terbuka - jawab dengan jujur, bukan dengan template",
      "**Git workflow:** setiap eksperimen punya commit - bukan karena protokol, tapi karena reproduksibilitas",
    ],
    footnote: "4 klausul ini sering dilanggar karena terlihat \"tidak teknis\" - padahal menentukan keberlanjutan kompetensi.",
  },

  // ── Slide 16: 4 Perangkap ──
  {
    layout: "bullets",
    title: "4 Kebiasaan yang Memblokir Kemajuan",
    bullets: [
      "**Lab sampai kode jalan** - berhenti di titik itu, tanpa membaca apa yang terjadi di dalam",
      "**LLM tanpa verifikasi** - copy kode dari AI, tidak membaca, tidak menguji, tidak memahami",
      "**Tunda catatan eksperimen** - \"nanti saya tulis\" berakhir dengan tidak pernah ditulis",
      "**Langsung training tanpa EDA** - model dilatih sebelum data dipahami; leakage tidak terdeteksi",
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

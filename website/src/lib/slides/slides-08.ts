import type { SlideSection } from "./index";

export const slides08: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W8: Foundation Models",
    subtitle: "Belajar memilih model pretrained yang sesuai, membaca batasan di model card, dan menentukan strategi adaptasi antara frozen, LoRA, dan full fine-tuning.",
    body: "Presentasi ini bisa dipakai mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 08 - Minggu 8",
  },

  // ── 2: Peta W8 ──
  {
    layout: "section",
    title: "Peta W8",
    body: "Foundation model bukan sekadar model yang bagus, melainkan model yang sudah mempelajari representasi dari jutaan contoh. W8 membentuk pemahaman sistematis tentang taksonomi, model card, dan pilihan adaptasi.",
    footnote: "Pertanyaan intinya bukan apakah boleh memakainya, melainkan adaptasi apa yang paling masuk akal.",
  },

  // ── 3: Dari W7 ke W8 ──
  {
    layout: "bullets",
    title: "Dari W7 ke W8: dari Satu Model ke Lanskap Penuh",
    body: "W7 memperkenalkan pretrained Transformer untuk teks; W8 memperluas pandangan ke seluruh lanskap foundation model lintas modalitas. Tiga hal menjadi fokus minggu ini:",
    bullets: [
      "**Kebiasaan riset** yang dilatih minggu ini adalah literasi model card, pemilihan adaptasi, dan menjaga perbandingan tetap setara.",
      "**Pilihan freeze vs fine-tune** dari W7 kini menjadi satu cabang dari pohon keputusan adaptasi yang lebih lengkap, termasuk LoRA.",
      "**Dataset minggu sebelumnya dipakai ulang** agar perbandingan antar strategi adaptasi berlangsung pada data yang sama.",
    ],
    footnote: "Tugas utama minggu ini adalah Foundation Model Map beserta selection memo.",
  },

  // ── 4: Section Motivasi ──
  {
    layout: "section",
    title: "Motivasi: Jangan Mulai dari Nol",
    body: "Bayangkan Anda membangun classifier untuk teks medis Bahasa Indonesia dengan hanya 5 ribu sampel. Melatih LSTM dari awal mungkin cukup untuk pola dasar, tetapi kosakata medis terlalu jarang untuk dipelajari dari nol.",
    footnote: "Foundation model menawarkan titik mulai yang sudah memahami bahasa dari jutaan kalimat.",
  },

  // ── 5: Split dari nol vs FM ──
  {
    layout: "split",
    title: "Dari Nol vs Memakai Foundation Model",
    body: "Pada dataset kecil dengan kosakata khusus, kedua pendekatan ini berbeda jauh pada kebutuhan data dan hasil akhir:",
    left: {
      title: "Latih dari Nol",
      body: "LSTM dimulai dari bobot acak pada 5 ribu sampel.\n\nMungkin cukup untuk pola dasar, tetapi kosakata medis yang jarang sulit dipelajari tanpa data besar.\n\nHasilnya rapuh dan butuh banyak data untuk stabil.",
    },
    right: {
      title: "Mulai dari Foundation Model",
      body: "IndoBERT sudah memahami tata bahasa dan konteks Indonesia dari jutaan kalimat.\n\nFine-tune cukup 3 epoch untuk mengadaptasinya ke sentimen atau domain medis.\n\nHasilnya hampir pasti lebih baik dengan lebih sedikit data dan waktu.",
    },
    footnote: "Pergeseran mindset: tanyakan apakah sudah ada representasi relevan, bukan arsitektur apa yang harus dibangun.",
  },

  // ── 6: Bullets tiga pertanyaan ──
  {
    layout: "bullets",
    title: "Tiga Pertanyaan Sebelum Memilih Model",
    body: "Sebelum memilih foundation model, tiga pertanyaan ini perlu dijawab dan menjadi kerangka seluruh minggu ini:",
    bullets: [
      "**Model mana yang paling cocok** untuk tugas dan domain ini, dari taksonomi modalitas yang tersedia?",
      "**Adaptasi apa yang paling tepat** di antara frozen features, LoRA, atau full fine-tuning untuk skenario Anda?",
      "**Batasan apa yang perlu diwaspadai**, termasuk bias, failure mode, dan kecocokan domain pretraining?",
    ],
    footnote: "W8 memberi kerangka untuk menjawab ketiganya secara sistematis, bukan dengan tebakan.",
  },

  // ── 7: Section evolusi ──
  {
    layout: "section",
    title: "Dari Pretraining ke Foundation Model",
    body: "Foundation model bukan lompatan magis, melainkan akumulasi pola selama satu dekade. Lima fase evolusi menunjukkan bagaimana paradigma bergeser dari training per tugas menjadi adaptasi representasi.",
    footnote: "Memahami sejarah ini menjelaskan mengapa pertanyaan riset hari ini berbeda dari satu dekade lalu.",
  },

  // ── 8: Bullets fase 1-3 ──
  {
    layout: "bullets",
    title: "Fase 1 sampai 3: dari Nol ke Pretraining Teks",
    body: "Tiga fase pertama menandai pergeseran dari training per tugas menuju berbagi representasi lintas tugas:",
    bullets: [
      "**Fase 1 sebelum 2012** memulai setiap tugas dari bobot acak tanpa berbagi representasi, sehingga tidak ada transfer antar tugas.",
      "**Fase 2 antara 2012-2017** memperkenalkan fine-tuning dari bobot ImageNet, karena representasi visual tingkat rendah bersifat universal.",
      "**Fase 3 antara 2018-2020** memindahkan paradigma ini ke teks lewat pretraining self-supervised BERT dan GPT pada miliaran token tanpa label.",
    ],
    footnote: "Pretraining self-supervised belajar dengan memprediksi token tersembunyi atau token berikutnya, tanpa anotasi manual.",
  },

  // ── 9: Bullets fase 4-5 ──
  {
    layout: "bullets",
    title: "Fase 4 dan 5: Multimodal dan Lahirnya Istilah",
    body: "Dua fase terakhir membawa pretraining ke banyak modalitas sekaligus dan memberi nama resmi pada fenomena ini:",
    bullets: [
      "**Fase 4 sejak 2020** menghasilkan model multimodal seperti CLIP yang melakukan zero-shot klasifikasi gambar, dan Whisper untuk audio ke teks.",
      "**Fase 5 pada 2021** memperkenalkan istilah foundation model lewat paper Bommasani et al. sebagai model skala besar yang dapat diadaptasi ke banyak tugas.",
      "**Dua properti kunci** adalah emergence, yaitu kemampuan yang muncul dari skala, dan homogenization, yaitu banyak aplikasi bertumpu pada model yang sama.",
    ],
    footnote: "Homogenization menciptakan efisiensi sekaligus risiko, karena kelemahan satu model menyebar ke banyak aplikasi.",
  },

  // ── 10: Section apa itu FM ──
  {
    layout: "section",
    title: "Apa Itu Foundation Model dalam Praktik",
    body: "Foundation model bukan definisi teknis yang ketat. Dalam riset praktis, istilah ini merujuk ke model dengan tiga ciri yang menentukan cara Anda memakainya.",
    footnote: "Ketiga ciri ini mengubah pertanyaan pertama riset dari membangun menjadi mengadaptasi.",
  },

  // ── 11: Bullets tiga properti ──
  {
    layout: "bullets",
    title: "Tiga Ciri Foundation Model",
    body: "Sebuah model disebut foundation model dalam praktik jika memenuhi tiga ciri berikut:",
    bullets: [
      "**Pretrained pada data besar** dalam skala yang tidak praktis untuk dilatih sendiri, baik teks, gambar, audio, maupun multimodal.",
      "**Representasi yang dapat ditransfer**, sehingga hidden states atau embeddings-nya berguna untuk banyak tugas hilir.",
      "**Dapat diadaptasi tanpa training penuh**, lewat frozen extraction, adapter ringan seperti LoRA, atau fine-tuning sebagian.",
    ],
    footnote: "Konsekuensinya, pertanyaan pertama saat dapat tugas adalah apakah ada foundation model yang relevan.",
  },

  // ── 12: Section Taksonomi ──
  {
    layout: "section",
    title: "Taksonomi: Modalitas x Keluarga x Adaptasi",
    body: "Memilih foundation model berarti memilih pada tiga dimensi sekaligus: modalitas data, keluarga arsitektur, dan mode adaptasi. Ketiganya membentuk peta keputusan yang sama untuk setiap proyek.",
    footnote: "Peta ini mencegah pemilihan model berdasarkan popularitas semata.",
  },

  // ── 13: Image taksonomi ──
  {
    layout: "image",
    title: "Tiga Dimensi Pilihan Foundation Model",
    imageUrl: "/figures/fig07a_foundation_taxonomy.svg",
    caption: "Gambar ini menunjukkan taksonomi foundation model pada tiga dimensi: modalitas seperti teks, vision, audio, dan time series; keluarga arsitektur seperti encoder-only, decoder-only, dan encoder-decoder; serta mode adaptasi seperti frozen, LoRA, dan full fine-tuning. Setiap pilihan model adalah satu titik dalam ruang tiga dimensi ini.",
    footnote: "Memilih model berarti menentukan posisi pada ketiga sumbu, bukan hanya menyebut satu nama.",
  },

  // ── 14: Grid tiga mode adaptasi ──
  {
    layout: "grid",
    title: "Tiga Mode Adaptasi yang Dipakai Berulang",
    body: "Dari gambar tersebut, sumbu adaptasi punya tiga mode yang muncul di hampir semua modalitas:",
    gridItems: [
      {
        title: "Frozen",
        body: "Mode ini mengunci bobot pretrained dan hanya melatih layer tambahan kecil. Ia paling cepat dan stabil, tetapi kurang optimal saat domain target jauh dari pretraining.",
      },
      {
        title: "LoRA",
        body: "Mode ini menyisipkan matriks low-rank paralel dengan W_q dan W_v lalu mengunci bobot asli. Hanya 0.5-2% parameter dilatih, dengan performa 95-99% dari full fine-tuning dan training 3-5 kali lebih cepat.",
      },
      {
        title: "Full Fine-tuning",
        body: "Mode ini membuat semua parameter trainable. Ia paling fleksibel tetapi paling mahal di memori dan waktu, serta berisiko overfitting pada dataset kecil sehingga butuh learning rate kecil.",
      },
    ],
    footnote: "LoRA menjadi jalan tengah yang sering tepat antara frozen yang murah dan full FT yang fleksibel.",
  },

  // ── 15: Bullets taksonomi teks ──
  {
    layout: "bullets",
    title: "Keluarga Model Teks dan Peruntukannya",
    body: "Pada modalitas teks, keluarga arsitektur menentukan jenis tugas yang paling cocok:",
    bullets: [
      "**Encoder-only** seperti BERT dan IndoBERT cocok untuk pemahaman: klasifikasi, NER, dan similarity.",
      "**Decoder-only** seperti GPT cocok untuk generasi teks dan penyelesaian kalimat.",
      "**Encoder-decoder** seperti T5 cocok untuk transformasi teks: question answering, summarization, dan translation.",
    ],
    footnote: "Aturan praktis: encoder untuk pemahaman, decoder untuk generasi, encoder-decoder untuk transformasi.",
  },

  // ── 16: Grid modalitas lain ──
  {
    layout: "grid",
    title: "Foundation Model di Luar Teks",
    body: "Modalitas lain punya foundation model sendiri dengan peruntukan yang berbeda:",
    gridItems: [
      {
        title: "Vision",
        body: "ResNet dan ViT untuk klasifikasi gambar, CLIP untuk zero-shot dan similarity, serta DINOv2 untuk tugas dense seperti segmentasi lewat linear probe.",
      },
      {
        title: "Audio",
        body: "Whisper untuk transkripsi multibahasa, Wav2Vec 2.0 untuk fitur suara self-supervised, dan AST untuk klasifikasi audio berbasis spektrogram.",
      },
      {
        title: "Time Series",
        body: "Chronos dan TimesFM dipakai untuk forecasting skala besar. Klaim zero-shot SOTA-nya masih area riset aktif, jadi gunakan untuk eksplorasi tambahan setelah baseline LSTM jalan.",
      },
      {
        title: "Domain-Specific",
        body: "BioBERT dan ClinicalBERT untuk teks biomedis, serta ESM-2 untuk sequence protein. Pretraining domain membuatnya unggul saat domain target cocok.",
      },
    ],
    footnote: "Untuk capstone, jangan jadikan time-series foundation model sebagai baseline tunggal yang belum tervalidasi.",
  },

  // ── 17: Section Model Card ──
  {
    layout: "section",
    title: "Mengevaluasi Model Card",
    body: "Model card adalah dokumen yang menemani sebuah model. Membacanya dengan tujuh pertanyaan wajib mencegah pemilihan model yang tampak bagus di benchmark tetapi tidak cocok untuk tugas Anda.",
    footnote: "SOTA di benchmark X tidak berarti terbaik untuk tugas Anda jika domainnya berbeda signifikan.",
  },

  // ── 18: Bullets model card 1-4 ──
  {
    layout: "bullets",
    title: "Empat Pertanyaan Pertama pada Model Card",
    body: "Empat pertanyaan pertama menyangkut asal-usul model dan kecocokannya dengan tugas Anda:",
    bullets: [
      "**Apa dataset pretraining-nya**, mencakup domain, bahasa, dan ukuran, dan seberapa relevan dengan tugas Anda?",
      "**Apa benchmark evaluasi yang dilaporkan**, dan apakah benchmark itu representatif untuk tugas yang Anda hadapi?",
      "**Apa batasan yang disebut eksplisit**, termasuk bias, failure mode, dan penggunaan di luar cakupan?",
    ],
    footnote: "Pertanyaan keempat: berapa besar modelnya, karena parameter count menentukan biaya inference dan kelayakan fine-tuning.",
  },

  // ── 19: Bullets model card 5-7 ──
  {
    layout: "bullets",
    title: "Tiga Pertanyaan Berikutnya pada Model Card",
    body: "Tiga pertanyaan terakhir menyangkut legalitas, reproduksibilitas, dan kebaruan model:",
    bullets: [
      "**Apa lisensi penggunaannya**, apakah Apache 2.0 atau restricted commercial, karena ini menentukan kelayakan publikasi.",
      "**Apakah ada artefak reproduksibilitas** berupa training code dan eval code, atau hanya bobot yang dirilis?",
      "**Kapan model dirilis dan apa data cutoff-nya**, sehingga Anda tahu apakah sudah ada model yang lebih baru.",
    ],
    footnote: "Baca bagian Limitations dengan skeptis - bagian ini sering kurang detail dibanding bagian Performance.",
  },

  // ── 20: Section Pohon keputusan ──
  {
    layout: "section",
    title: "Pohon Keputusan Pemilihan Adaptasi",
    body: "Pilihan adaptasi bergantung pada tiga faktor: compute budget, jumlah labeled data, dan seberapa jauh domain target dari pretraining. Ketiganya menyusun satu pohon keputusan yang ringkas.",
    footnote: "Menjawab ketiga faktor ini lebih dulu mencegah memilih full fine-tuning saat frozen sudah cukup.",
  },

  // ── 21: Code pohon keputusan ──
  {
    layout: "code",
    title: "Pohon Keputusan dalam Bentuk Ringkas",
    body: "Pohon berikut memandu pilihan adaptasi dari compute budget menuju ukuran data dan jarak domain:",
    lang: "text",
    code: `Compute cukup untuk fine-tuning?
├─ Tidak -> Frozen features + lightweight head
└─ Ya
   Labeled data < 1000 sampel?
   ├─ Ya -> Frozen atau LoRA (r=4-8)
   └─ Tidak
      Domain jauh dari pretraining?
      ├─ Ya -> Full FT atau LoRA (r=16-32)
      └─ Tidak -> Frozen atau LoRA (r=4-8)`,
    footnote: "Pada dataset kecil, full fine-tuning berisiko overfitting, sehingga frozen atau LoRA lebih aman.",
  },

  // ── 22: Section Teacher model ──
  {
    layout: "section",
    title: "Teacher Model dalam Training-Time Supervision",
    body: "Foundation model tidak selalu dipakai untuk inference. Salah satu pola penting memakai foundation model sebagai teacher saat training, lalu menghapusnya dari model final.",
    footnote: "Pola ini memberi manfaat foundation model tanpa menanggung biaya inference-nya.",
  },

  // ── 23: Bullets teacher patterns ──
  {
    layout: "bullets",
    title: "Tiga Pola Teacher yang Hanya Hadir saat Training",
    body: "Foundation model bisa meningkatkan pelatihan tanpa ikut di-deploy lewat tiga pola berikut:",
    bullets: [
      "**Knowledge distillation** memakai model besar untuk melatih model kecil dengan soft targets, bukan label keras.",
      "**Auxiliary supervision** memakai embedding dari CLIP sebagai target latih untuk network visual yang lebih kecil.",
      "**Pseudo-label generation** memanfaatkan foundation model untuk membuat pseudo-label pada data yang tidak berlabel.",
    ],
    footnote: "Dalam semua pola ini, foundation model tidak ada di model final yang di-deploy.",
  },

  // ── 24: Split soft vs hard target ──
  {
    layout: "split",
    title: "Soft Target dan Peran Temperature",
    body: "Knowledge distillation melatih student mereproduksi distribusi probabilitas teacher, bukan label one-hot. Temperature menentukan seberapa banyak informasi antar kelas terbuka:",
    left: {
      title: "Hard Target vs Soft Target",
      body: "Hard target adalah label one-hot [1, 0, 0] yang hanya menyebut kelas benar.\n\nSoft target adalah distribusi penuh dari teacher yang menyimpan kemiripan antar kelas, misalnya anjing lebih mirip kucing daripada kelinci.",
    },
    right: {
      title: "Pengaruh Temperature",
      body: "Pada T=1, softmax hampir one-hot dan info kelas non-mayoritas hilang.\n\nPada T=4, distribusi melembut sehingga student belajar hubungan antar kelas. Loss dikalikan T kuadrat untuk mengompensasi gradient yang menyusut.",
    },
    footnote: "Pola ini membuat DistilBERT dengan 40% parameter BERT mencapai 95% lebih performa teacher.",
  },

  // ── 25: Section Worked Example ──
  {
    layout: "section",
    title: "Worked Example: IndoBERT dengan Tiga Strategi",
    body: "Pada dataset IndoNLU SmSA yang sama dari Lab 5b, tiga strategi adaptasi dijalankan untuk memperlihatkan trade-off antara kecepatan dan performa secara langsung.",
    footnote: "Memakai satu dataset untuk ketiganya menjaga perbandingan tetap setara.",
  },

  // ── 26: Bullets tiga strategi + F1 ──
  {
    layout: "bullets",
    title: "Tiga Strategi dan Ekspektasi Hasilnya",
    body: "Pada sekitar 5 ribu sampel IndoNLU SmSA, ketiga strategi menempati titik berbeda pada trade-off efisiensi dan performa:",
    bullets: [
      "**Frozen + Linear Head** menyelesaikan training dalam menit tanpa GPU besar, dengan macro-F1 sekitar 68-73% tetapi sub-optimal.",
      "**LoRA r=8** melatih 10-20 kali lebih sedikit parameter dan 5 kali lebih cepat, dengan macro-F1 sekitar 76-81% sebagai trade-off terbaik.",
      "**Full Fine-tuning** paling fleksibel dengan macro-F1 sekitar 80-85%, tetapi paling lambat dan berisiko overfitting pada dataset kecil.",
    ],
    footnote: "LoRA memberi keseimbangan efisiensi dan performa yang paling sering tepat untuk proyek kuliah.",
  },

  // ── 27: Section Pitfalls ──
  {
    layout: "section",
    title: "Pitfalls & Miskonsepsi",
    body: "Beberapa keyakinan tentang foundation model terdengar masuk akal tetapi sering menyesatkan. Mengenalinya mencegah pemilihan model dan adaptasi yang keliru.",
    footnote: "Sebagian besar berakar pada anggapan bahwa lebih besar atau lebih baru selalu lebih baik.",
  },

  // ── 28: Bullets pitfalls ──
  {
    layout: "bullets",
    title: "Empat Keyakinan yang Perlu Diluruskan",
    body: "Keempat keyakinan berikut benar dalam kondisi sempit tetapi berbahaya jika dianggap berlaku universal:",
    bullets: [
      "**\"Foundation model selalu lebih baik\"** keliru pada dataset kecil dengan distribusi jauh dari pretraining, karena model kecil khusus kadang menang.",
      "**\"LoRA rank besar lebih baik\"** tidak benar karena hubungannya tidak linier - r=4 atau r=8 sering sudah cukup untuk dataset rata-rata.",
      "**\"Model card selalu lengkap\"** perlu diragukan, karena bagian Limitations sering kurang detail dibanding Performance.",
    ],
    footnote: "Frozen features pada domain shift besar juga bisa kalah dari fine-tuned model kecil yang lebih relevan.",
  },

  // ── 29: Bullets FM Map ──
  {
    layout: "bullets",
    title: "Tugas W8: Foundation Model Map",
    body: "Tugas utama minggu ini adalah menyusun peta foundation model untuk domain riset Anda, lengkap dengan justifikasi:",
    bullets: [
      "**Petakan 3-4 model** yang relevan dengan kolom modalitas, pretraining, downstream role, adaptasi, dan status teacher-only.",
      "**Tulis selection memo** satu paragraf per model: mengapa model ini, asumsi apa yang dibawanya, dan apa batasannya.",
      "**Simpan sebagai foundation_model_map.md** di folder eksperimen W8 sebagai dasar pemilihan model capstone nanti.",
    ],
    footnote: "Lab penunjang opsional lab_w8_remote_training.ipynb melatih menjalankan training di cloud GPU.",
  },

  // ── 30: Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum lanjut ke W9, renungkan tiga pertanyaan yang menguji pemahaman Anda tentang pemilihan dan adaptasi model:",
    bullets: [
      "Untuk deteksi emosi dari rekaman suara Indonesia, dua kandidat foundation model apa dari taksonomi, dengan dua argumen pendukung dan satu risiko masing-masing?",
      "Saat kolaborator berkata \"model X SOTA di benchmark Y, jadi kita pakai\", tiga pertanyaan apa yang Anda ajukan sebelum menyetujui?",
      "LoRA termasuk kategori mana dalam taksonomi extracted vs learned dari W3, dan mengapa perbedaan ini penting untuk keputusan adaptasi?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - ketiganya kembali relevan saat memilih model capstone.",
  },

  // ── 31: Lanjut W9 ──
  {
    layout: "bullets",
    title: "Lanjut ke W9: Multimodal Reasoning",
    body: "Dengan W8 selesai, Anda bisa memilih dan mengadaptasi foundation model untuk satu modalitas. W9 memperluas ke wilayah yang lebih kompleks:",
    bullets: [
      "**Menggabungkan dua modalitas atau lebih** lewat strategi fusion yang berbeda, melanjutkan cross-attention dari W7.",
      "**Mendeteksi apakah model benar-benar memakai semua modalitas** lewat ablation per modalitas.",
      "**Menangani situasi saat satu modalitas hilang**, yang sering terjadi di data dunia nyata.",
    ],
    footnote: "Pilihan adaptasi dari W8 tetap berlaku saat menggabungkan beberapa foundation model di W9.",
  },

  // ── 32: CTA ──
  {
    layout: "cta",
    title: "Mulai Tugas W8",
    body: "Susun Foundation Model Map untuk domain riset Anda, lalu coba tiga strategi adaptasi pada dataset yang sama lewat lab penunjang remote training di cloud GPU.\n\nEstimasi waktu: 3-5 jam termasuk menyusun peta dan menjalankan perbandingan adaptasi.",
    ctaText: "Buka Lab W8 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w8_remote_training.ipynb",
  },
];

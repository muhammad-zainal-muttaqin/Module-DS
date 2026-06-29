import type { SlideSection } from "./index";

export const slides08: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W8: Foundation Models",
    subtitle: "Memilih foundation model yang sesuai dengan tugas dan domain, membaca batasannya di model card, lalu menentukan adaptasi yang tepat antara frozen, LoRA, dan full fine-tuning.",
    footnote: "Bab 08 - Minggu 8",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Empat materi minggu ini mengikuti alur memilih dan mengadaptasi satu foundation model:",
    gridItems: [
      {
        title: "1. Lanskap Foundation Model",
        body: "Kita melihat apa yang membuat sebuah model disebut foundation model, lalu memetakan taksonomi modalitas, keluarga, dan mode adaptasi.",
      },
      {
        title: "2. Membaca Model Card",
        body: "Kita menilai satu kandidat model lewat tujuh pertanyaan sebelum memutuskan memakainya.",
      },
      {
        title: "3. Memilih Adaptasi",
        body: "Kita memilih antara frozen, LoRA, dan full fine-tuning lewat pohon keputusan, lalu mengujinya di IndoBERT.",
      },
      {
        title: "4. Teacher Model saat Training",
        body: "Kita melihat foundation model yang hanya hadir di training lalu tidak ikut di-deploy.",
      },
    ],
  },

  // -- 3: Recap W7 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W7)",
    body: "W7 memakai satu pretrained Transformer untuk teks. Pengalaman itu menjadi pijakan W8:",
    bullets: [
      "Kita memakai satu pretrained Transformer dan memutuskan freeze atau fine-tune untuk satu tugas teks.",
      "Minggu ini pandangan diperluas dari satu model teks ke banyak modalitas, dan dari dua opsi ke pohon keputusan adaptasi.",
      "Taksonomi representasi engineered, extracted, dan learned dari W3 tetap dipakai untuk menempatkan tiap mode adaptasi.",
    ],
    footnote: "Tugas utama minggu ini adalah Foundation Model Map beserta memo pemilihan model.",
  },

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Lanskap Foundation Model",
    body: "Foundation model adalah model yang dilatih pada data berskala besar dan bisa diadaptasi ke banyak tugas hilir tanpa training ulang dari nol.",
    footnote: "Istilah ini dipakai longgar di riset praktis, dengan tiga ciri yang menentukan cara memakainya.",
  },

  // -- 5: Tiga ciri --
  {
    layout: "bullets",
    title: "Tiga ciri foundation model",
    body: "Dalam riset praktis, sebuah model masuk kategori ini kalau memenuhi tiga ciri:",
    bullets: [
      "Model **pretrained pada data besar** dalam skala yang tidak praktis untuk dilatih sendiri, baik teks, gambar, audio, maupun multimodal.",
      "Model menghasilkan **representasi yang dapat ditransfer**, sehingga hidden states atau embeddings-nya berguna untuk banyak tugas hilir.",
      "Model **dapat diadaptasi tanpa training penuh** lewat frozen extraction, adapter ringan seperti LoRA, atau fine-tuning sebagian.",
    ],
    footnote: "Konsekuensinya, pertanyaan pertama saat dapat tugas adalah apakah ada foundation model yang relevan.",
  },

  // -- 6: Contoh konkret jangan mulai dari nol --
  {
    layout: "split",
    title: "Contoh: classifier teks medis Indonesia",
    body: "Pada dataset kecil dengan kosakata khusus, memilih titik mulai menentukan hasil akhir:",
    left: {
      title: "Latih LSTM dari Nol",
      body: "LSTM dimulai dari bobot acak pada 5.000 sampel.\n\nPola dasar mungkin bisa dipelajari, tetapi kosakata medis terlalu jarang untuk dipelajari dari data sekecil itu.\n\nHasilnya rapuh dan butuh banyak data untuk stabil.",
    },
    right: {
      title: "Mulai dari IndoBERT",
      body: "IndoBERT sudah memahami tata bahasa Indonesia dari jutaan kalimat.\n\nFine-tune 3 epoch cukup untuk mengadaptasinya ke domain medis.\n\nHasilnya hampir pasti lebih baik dengan data dan waktu lebih sedikit.",
    },
    footnote: "Pergeseran pertanyaan: bukan arsitektur apa yang dibangun, tetapi apakah ada representasi relevan yang bisa diadaptasi.",
  },

  // -- 7: Lima fase evolusi --
  {
    layout: "table",
    title: "Lima fase menuju foundation model",
    body: "Pergeseran ini terbentuk bertahap selama satu dekade, melewati lima fase:",
    tableHead: ["Fase", "Periode", "Pola", "Penanda"],
    tableRows: [
      ["1", "sebelum 2012", "Tiap tugas dari bobot acak", "Tidak ada transfer"],
      ["2", "2012-2017", "Fine-tune dari bobot ImageNet", "AlexNet"],
      ["3", "2018-2020", "Pretraining self-supervised pada teks", "BERT, GPT"],
      ["4", "2020-sekarang", "Pretraining multimodal, zero-shot", "CLIP, Whisper"],
      ["5", "2021", "Istilah foundation model lahir", "Bommasani et al."],
    ],
    footnote: "Self-supervised berarti model belajar tanpa label, dengan memprediksi token tersembunyi atau token berikutnya.",
  },

  // -- 8: Taksonomi image --
  {
    layout: "image",
    title: "Tiga sumbu pilihan foundation model",
    imageUrl: "/figures/fig07a_foundation_taxonomy.svg",
    caption: "Gambar ini menunjukkan taksonomi foundation model pada tiga sumbu: modalitas seperti teks, vision, audio, dan time series; keluarga arsitektur seperti encoder-only, decoder-only, dan encoder-decoder; serta mode adaptasi seperti frozen, LoRA, dan full fine-tuning. Setiap pilihan model adalah satu titik dalam ruang tiga sumbu ini.",
    footnote: "Memilih model berarti menentukan posisi pada ketiga sumbu, bukan hanya menyebut satu nama.",
  },

  // -- 9: Tiga mode adaptasi --
  {
    layout: "grid",
    title: "Tiga mode adaptasi yang dipakai berulang",
    body: "Dari gambar tersebut, sumbu adaptasi punya tiga mode yang muncul di hampir semua modalitas:",
    gridItems: [
      {
        title: "Frozen",
        body: "Mode ini mengunci bobot pretrained dan hanya melatih layer tambahan kecil. Ia paling cepat dan stabil, dan kurang optimal saat domain target jauh dari pretraining.",
      },
      {
        title: "LoRA",
        body: "Mode ini menyisipkan matriks low-rank paralel dengan W_q dan W_v lalu mengunci bobot asli. Hanya 0,5-2% parameter dilatih, dengan performa 95-99% dari full fine-tuning dan training 3-5x lebih cepat.",
      },
      {
        title: "Full Fine-tuning",
        body: "Mode ini membuat semua parameter trainable. Ia paling fleksibel tetapi paling mahal di memori dan waktu, serta berisiko overfitting pada dataset kecil sehingga butuh learning rate kecil.",
      },
    ],
    footnote: "LoRA menjadi jalan tengah antara frozen yang murah dan full FT yang fleksibel.",
  },

  // -- 10: Keluarga teks --
  {
    layout: "bullets",
    title: "Keluarga model teks dan peruntukannya",
    body: "Pada modalitas teks, keluarga arsitektur menentukan jenis tugas yang paling cocok:",
    bullets: [
      "**Encoder-only** seperti BERT dan IndoBERT cocok untuk pemahaman: klasifikasi, NER, dan similarity.",
      "**Decoder-only** seperti GPT cocok untuk generasi teks dan penyelesaian kalimat.",
      "**Encoder-decoder** seperti T5 cocok untuk transformasi teks: question answering, summarization, dan translation.",
    ],
    footnote: "Aturan praktisnya: encoder untuk pemahaman, decoder untuk generasi, encoder-decoder untuk transformasi.",
  },

  // -- 11: Modalitas di luar teks --
  {
    layout: "grid",
    title: "Foundation model di luar teks",
    body: "Modalitas lain punya foundation model sendiri dengan peruntukan yang berbeda:",
    gridItems: [
      {
        title: "Vision",
        body: "ResNet dan ViT dipakai untuk klasifikasi gambar, CLIP untuk zero-shot dan similarity, serta DINOv2 untuk tugas dense seperti segmentasi lewat linear probe.",
      },
      {
        title: "Audio",
        body: "Whisper dipakai untuk transkripsi multibahasa, Wav2Vec 2.0 untuk fitur suara self-supervised, dan AST untuk klasifikasi audio berbasis spektrogram.",
      },
      {
        title: "Time Series",
        body: "Chronos dan TimesFM dipakai untuk forecasting skala besar. Klaim zero-shot SOTA-nya masih area riset aktif, jadi pakai sebagai eksplorasi setelah baseline LSTM berjalan.",
      },
      {
        title: "Domain-Specific",
        body: "BioBERT dan ClinicalBERT dipakai untuk teks biomedis, serta ESM-2 untuk sequence protein. Pretraining domain membuatnya unggul saat domain target cocok.",
      },
    ],
    footnote: "Untuk capstone, jangan jadikan time-series foundation model sebagai baseline tunggal yang belum tervalidasi.",
  },

  // -- 12: Materi 2 --
  {
    layout: "section",
    title: "2. Membaca Model Card",
    body: "Model card adalah dokumen yang menemani sebuah model dan mencatat asal-usul, performa, lisensi, dan batasannya.",
    footnote: "Membacanya dengan tujuh pertanyaan mencegah memilih model yang bagus di benchmark tetapi tidak cocok untuk tugas Anda.",
  },

  // -- 13: Empat pertanyaan pertama --
  {
    layout: "bullets",
    title: "Model card: empat pertanyaan pertama",
    body: "Empat pertanyaan pertama menyangkut asal-usul model dan kecocokannya dengan tugas Anda:",
    bullets: [
      "**Apa dataset pretraining-nya**, mencakup domain, bahasa, dan ukuran, dan seberapa relevan dengan tugas Anda?",
      "**Apa benchmark evaluasi yang dilaporkan**, dan apakah benchmark itu representatif untuk tugas yang Anda hadapi?",
      "**Apa batasan yang disebut eksplisit**, termasuk bias, failure mode, dan penggunaan di luar cakupan?",
    ],
    footnote: "Pertanyaan keempat: berapa besar modelnya, karena parameter count menentukan biaya inference dan kelayakan fine-tuning.",
  },

  // -- 14: Tiga pertanyaan berikutnya --
  {
    layout: "bullets",
    title: "Model card: tiga pertanyaan berikutnya",
    body: "Tiga pertanyaan terakhir menyangkut legalitas, reproduksibilitas, dan kebaruan model:",
    bullets: [
      "**Apa lisensi penggunaannya**, apakah Apache 2.0 atau restricted commercial, karena ini menentukan kelayakan publikasi.",
      "**Apakah ada artefak reproduksibilitas** berupa training code dan eval code, atau hanya bobot yang dirilis?",
      "**Kapan model dirilis dan apa data cutoff-nya**, sehingga Anda tahu apakah sudah ada model yang lebih baru.",
    ],
    footnote: "Baca bagian Limitations dengan skeptis, karena bagian ini sering kurang detail dibanding bagian Performance.",
  },

  // -- 15: Materi 3 --
  {
    layout: "section",
    title: "3. Memilih Adaptasi",
    body: "Pilihan adaptasi bergantung pada tiga faktor: compute budget, jumlah labeled data, dan seberapa jauh domain target dari pretraining.",
    footnote: "Menjawab ketiganya lebih dulu mencegah memilih full fine-tuning saat frozen sudah cukup.",
  },

  // -- 16: Pohon keputusan --
  {
    layout: "code",
    title: "Pohon keputusan yang bisa disalin",
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

  // -- 17: Posisi mode dalam taksonomi W3 --
  {
    layout: "bullets",
    title: "Posisi tiap mode dalam taksonomi representasi W3",
    body: "Taksonomi engineered, extracted, dan learned dari W3 menjelaskan kenapa biaya tiap mode berbeda:",
    bullets: [
      "**Frozen features** adalah strategi extracted: representasi diambil dari model frozen tanpa diubah, sehingga paling murah.",
      "**Full fine-tuning** adalah strategi learned: representasi dipelajari ulang dari data, sehingga paling fleksibel dan paling mahal.",
      "**LoRA** berada di antara keduanya, karena melatih sebagian kecil parameter sambil membiarkan sebagian besar bobot tetap.",
    ],
    footnote: "Posisi dalam taksonomi menjelaskan trade-off biaya dan fleksibilitas tiap mode.",
  },

  // -- 18: Worked example tabel --
  {
    layout: "table",
    title: "IndoBERT: tiga strategi pada satu dataset",
    body: "Pada 5.000 sampel IndoNLU SmSA, ketiga strategi menempati titik berbeda pada trade-off kecepatan dan performa:",
    tableHead: ["Strategi", "macro-F1", "Catatan"],
    tableRows: [
      ["Frozen + Head", "68-73%", "Cepat, tanpa GPU besar, sub-optimal"],
      ["LoRA (r=8)", "76-81%", "Trade-off efisiensi-performa terbaik"],
      ["Full FT", "80-85%", "Performa tertinggi, paling lambat, butuh GPU"],
    ],
    footnote: "Memakai satu dataset untuk ketiganya menjaga perbandingan tetap setara.",
  },

  // -- 19: Miskonsepsi --
  {
    layout: "bullets",
    title: "Tiga miskonsepsi saat memilih adaptasi",
    body: "Tiga keyakinan berikut benar dalam kondisi sempit tetapi keliru jika dianggap berlaku universal:",
    bullets: [
      "Anggapan \"foundation model selalu lebih baik\" keliru pada dataset kecil dengan distribusi jauh dari pretraining, karena model kecil khusus kadang menang.",
      "Anggapan \"frozen features cukup untuk domain shift besar\" keliru, karena frozen BERT pada teks klinik bisa kalah dari fine-tuned model kecil yang relevan.",
      "Anggapan \"LoRA rank besar lebih baik\" keliru karena hubungannya tidak linier: r=4 atau r=8 sering sudah cukup untuk dataset rata-rata.",
    ],
    footnote: "Sebagian besar miskonsepsi ini berakar pada anggapan bahwa lebih besar atau lebih baru selalu lebih baik.",
  },

  // -- 20: Materi 4 --
  {
    layout: "section",
    title: "4. Teacher Model saat Training",
    body: "Foundation model tidak selalu dipakai untuk inference. Satu pola memakainya sebagai teacher saat training, lalu menghapusnya dari model yang di-deploy.",
    footnote: "Pola ini memberi manfaat foundation model tanpa menanggung biaya inference-nya.",
  },

  // -- 21: Tiga pola teacher --
  {
    layout: "bullets",
    title: "Tiga pola teacher yang hanya hadir saat training",
    body: "Foundation model bisa meningkatkan pelatihan tanpa ikut di-deploy lewat tiga pola berikut:",
    bullets: [
      "**Knowledge distillation** memakai model besar untuk melatih model kecil dengan soft targets, bukan label keras.",
      "**Auxiliary supervision** memakai embedding dari CLIP sebagai target latih untuk network visual yang lebih kecil.",
      "**Pseudo-label generation** memanfaatkan foundation model untuk membuat pseudo-label pada data yang tidak berlabel.",
    ],
    footnote: "Dalam semua pola ini, foundation model tidak ada di model final yang di-deploy.",
  },

  // -- 22: Soft target & temperature --
  {
    layout: "split",
    title: "Soft target dan peran temperature",
    body: "Knowledge distillation melatih student mereproduksi distribusi probabilitas teacher, bukan label one-hot. Temperature menentukan seberapa banyak informasi antar kelas terbuka:",
    left: {
      title: "Hard Target vs Soft Target",
      body: "Hard target adalah label one-hot [1, 0, 0] yang hanya menyebut kelas benar.\n\nSoft target adalah distribusi penuh dari teacher yang menyimpan kemiripan antar kelas, misalnya anjing lebih mirip kucing daripada kelinci.",
    },
    right: {
      title: "Pengaruh Temperature",
      body: "Pada T=1, softmax hampir one-hot dan informasi kelas non-mayoritas hilang.\n\nPada T=4, distribusi melembut sehingga student belajar hubungan antar kelas. Loss dikalikan T kuadrat untuk mengompensasi gradient yang menyusut.",
    },
    footnote: "Pola ini membuat DistilBERT, dengan parameter 40% lebih sedikit dari BERT, tetap mencapai sekitar 97% performa teacher.",
  },

  // -- 23: Lab W8 --
  {
    layout: "bullets",
    title: "Tugas W8: Foundation Model Map",
    body: "Tugas utama minggu ini menyusun peta foundation model untuk domain riset Anda, mengikuti urutan materi di atas:",
    bullets: [
      "Petakan 3-4 model ke kolom modalitas, pretraining, peran hilir, adaptasi, dan status teacher-only.",
      "Baca model card tiap model dengan tujuh pertanyaan, lalu tetapkan adaptasi lewat pohon keputusan.",
      "Tulis memo pemilihan satu paragraf per model dan simpan sebagai foundation_model_map.md di folder eksperimen W8.",
    ],
    footnote: "Lab penunjang opsional lab_w8_remote_training.ipynb melatih menjalankan training di cloud GPU.",
  },

  // -- 24: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Tiga pertanyaan untuk dibawa ke portofolio mandiri:",
    bullets: [
      "Untuk deteksi emosi dari rekaman suara Indonesia, identifikasi dua kandidat foundation model dari taksonomi, dengan dua argumen pendukung dan satu risiko masing-masing.",
      "Saat kolaborator berkata \"model X SOTA di benchmark Y, jadi kita pakai\", tulis tiga pertanyaan yang Anda ajukan sebelum menyetujui.",
      "LoRA termasuk kategori extracted atau learned dari W3, dan mengapa perbedaan ini penting untuk keputusan adaptasi?",
    ],
    footnote: "Ketiganya kembali relevan saat memilih model untuk capstone.",
  },

  // -- 25: Lanjut ke W9 --
  {
    layout: "bullets",
    title: "Lanjut ke W9: Multimodal Reasoning",
    body: "Dengan W8 selesai, Anda bisa memilih dan mengadaptasi foundation model untuk satu modalitas. W9 memperluas ke wilayah yang lebih kompleks:",
    bullets: [
      "Kita menggabungkan dua modalitas atau lebih lewat strategi fusion yang berbeda.",
      "Kita mendeteksi apakah model benar-benar memakai semua modalitas lewat ablation per modalitas.",
      "Kita menangani situasi saat satu modalitas hilang, yang sering terjadi di data dunia nyata.",
    ],
    footnote: "Taksonomi adaptasi dan literasi model card dari W8 tetap berlaku saat menggabungkan beberapa foundation model.",
  },

  // -- 26: CTA --
  {
    layout: "cta",
    title: "Mulai Tugas W8",
    body: "Susun Foundation Model Map untuk domain riset Anda, lalu coba tiga strategi adaptasi pada dataset yang sama lewat lab penunjang remote training di cloud GPU.\n\nEstimasi waktu 3-5 jam termasuk menyusun peta dan menjalankan perbandingan adaptasi.",
    ctaText: "Buka Lab W8 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w8_remote_training.ipynb",
  },
];

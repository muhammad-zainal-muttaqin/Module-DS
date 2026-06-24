import type { SlideSection } from "./index";

export const slides07: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W7: Text, Transformers & Repo Adoption",
    subtitle: "Belajar menggunakan pretrained Transformer untuk memproses teks, memverifikasi kode hasil AI, dan mengadopsi repositori riset eksternal.",
    footnote: "Bab 07 - Minggu 7",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Tiga materi minggu ini berfokus pada cara memanfaatkan hasil kerja yang sudah ada secara bertanggung jawab.",
    gridItems: [
      {
        title: "1. Pretrained Transformer",
        body: "Kita beralih dari TF-IDF ke contextual embeddings, memahami tokenisasi, mempelajari mekanisme attention, dan memilih metode freeze atau fine-tune.",
      },
      {
        title: "2. Alat AI untuk Riset",
        body: "Kita menerapkan protokol untuk memverifikasi baris kode buatan AI serta menyintesis referensi sebelum mengambil keputusan penting.",
      },
      {
        title: "3. Adopsi Repo Eksternal",
        body: "Kita belajar membaca struktur repositori asing, menjalankan tahapan smoke test, dan melakukan modifikasi minimal agar kode asli tidak rusak.",
      },
    ],
    footnote: "Ketiga topik ini saling bertemu saat kita mengadopsi repositori teks Hugging Face dengan bantuan alat LLM.",
  },

  // -- 3: Recap W6 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W6)",
    body: "Minggu lalu, kita belajar menilai representasi fitur dan menjaga kebersihan data dari kebocoran temporal. Konsep tersebut kita gunakan kembali minggu ini:",
    bullets: [
      "**Perbandingan representasi fitur** membuktikan bahwa cara model memetakan fitur sangat menentukan akurasi akhir.",
      "**Audit deteksi temporal leakage** mengingatkan kita bahwa akurasi yang terlalu tinggi sering kali disebabkan oleh kebocoran waktu.",
      "**Bottleneck memori pada RNN** menjadi alasan utama mengapa pemrosesan teks modern beralih ke arsitektur Transformer dan attention.",
    ],
    footnote: "Kebiasaan melakukan audit data dari W6 sangat berguna saat kita mendeteksi kebocoran data di repositori eksternal.",
  },

  // -- 4: Pembatas Seksi 1 --
  {
    layout: "section",
    title: "1. Teks dengan Pretrained Transformer",
    body: "Sebelum menggunakan model Transformer modern, kita perlu memahami perkembangan representasi teks dari metode statistik klasik hingga koordinat kontinu.",
    footnote: "Kita memulai perjalanan dari batas kemampuan representasi klasik menuju representasi modern.",
  },

  // -- 5: Bagaimana Komputer Membaca Teks? --
  {
    layout: "bullets",
    title: "Bagaimana Komputer Membaca Teks?",
    body: "Bahasa manusia yang berupa teks mentah bersifat diskret dan tidak bisa langsung diproses oleh neural network, sehingga memerlukan konversi:",
    bullets: [
      "**Teks bersifat diskret** karena terdiri dari karakter dan kata terpisah yang tidak memiliki nilai numerik kontinu bawaan.",
      "**Neural network bekerja di ruang kontinu** menggunakan operasi perkalian matriks bilangan pecahan berdimensi tetap (*dense space*).",
      "**Representasi teks** memetakan deretan huruf atau kata ke dalam koordinat kontinu agar maknanya dapat diproses oleh model.",
    ],
    footnote: "Proses konversi dari teks ke angka kontinu ini menjadi fondasi bagi seluruh keberhasilan model deep learning untuk bahasa.",
  },

  // -- 6: Visualisasi Diskret vs. Kontinu --
  {
    layout: "image",
    title: "Visualisasi Perbedaan Representasi",
    imageUrl: "/figures/fig07_discrete_vs_continuous.jpg",
    caption: "Bagan kiri menunjukkan One-Hot encoding di mana semua sumbu saling tegak lurus (ortogonal) sehingga jarak kata bermakna mirip sama dengan kata yang berbeda. Bagan kanan menunjukkan Dense Embeddings di mana kata-kata dengan makna mirip (kucing dan anjing) berdekatan.",
    footnote: "Kemampuan mengelompokkan kata sejenis ini membuat model memahami konteks secara geometris.",
  },

  // -- 7: Struktur Diskret vs. Angka Kontinu --
  {
    layout: "split",
    title: "Struktur Diskret vs. Struktur Angka Kontinu",
    body: "Dari visualisasi perbedaan representasi tersebut, mari kita bedah perbedaan fundamental antara struktur diskret dan kontinu:",
    left: {
      title: "Struktur Diskret",
      body: "Representasi diskret menggunakan indeks bilangan bulat atau angka biner yang kaku dan terisolasi.\n\nContoh: Kata 'kucing' (indeks 1) dan 'anjing' (indeks 2) terpisah total. Komputer tidak tahu bahwa kedua kata tersebut memiliki kemiripan arti secara semantik.",
    },
    right: {
      title: "Struktur Angka Kontinu",
      body: "Representasi kontinu menggunakan koordinat desimal pecahan (*floating-point*) dalam ruang vektor berdimensi tinggi (*embeddings*).\n\nContoh: Kata 'kucing' dipetakan ke koordinat `[0.25, -0.47, 0.81]`. Nilai angka ini dapat bergeser secara dinamis untuk mencatat kemiripan makna.",
    },
    footnote: "Model modern membutuhkan angka kontinu agar bisa menghitung kemiripan dan melakukan optimasi kalkulus.",
  },

  // -- 8: One-Hot Encoding --
  {
    layout: "split",
    title: "One-Hot Encoding: Representasi Ortogonal yang Boros",
    body: "Pendekatan paling awal adalah menganggap setiap kata sebagai dimensi sumbu tersendiri yang saling tegak lurus. Cara ini memiliki dua kelemahan utama:",
    left: {
      title: "1. Kehilangan Relasi Semantik",
      body: "Karena semua sumbu dimensi tegak lurus (*orthogonal*), jarak matematika antara kata 'kucing' dan 'anjing' sama jauhnya dengan jarak ke kata 'meja'.\n\nModel tidak dapat mendeteksi kemiripan makna antar-kata.",
    },
    right: {
      title: "2. Ledakan Dimensi Kosong",
      body: "Jika ukuran kosakata (*vocabulary*) mencapai 100 ribu kata, satu kata harus direpresentasikan oleh vektor berdimensi 100 ribu.\n\nHampir seluruh koordinat bernilai nol (*sparse vector*), sehingga sangat boros memori.",
    },
    footnote: "Representasi ini sangat terbatas karena mengabaikan keterhubungan makna antar-kata dalam bahasa.",
  },

  // -- 9: Keseimbangan Timbangan TF-IDF --
  {
    layout: "image",
    title: "Keseimbangan Timbangan TF-IDF",
    imageUrl: "/figures/fig07_tfidf_balance.jpg",
    caption: "TF-IDF menimbang keunikan lokal (TF) dengan penalti kepasaran kata secara global (IDF). Hasil kalinya mengukur signifikansi riil sebuah kata.",
    footnote: "Timbangan statistik ini menghasilkan bobot kontinu desimal yang mumpuni untuk baseline klasifikasi.",
  },

  // -- 10: TF-IDF: Peta Statistik Berbasis Kata Kunci --
  {
    layout: "bullets",
    title: "TF-IDF: Peta Statistik Berbasis Kata Kunci",
    body: "Timbangan statistik pada visualisasi tersebut menggabungkan dua nilai penting untuk menghitung signifikansi kata kunci:",
    bullets: [
      "**Term Frequency (TF)** menghitung seberapa sering sebuah kata muncul di dalam satu dokumen target.",
      "**Inverse Document Frequency (IDF)** memberikan bobot penalti untuk kata-kata umum yang terlalu sering tersebar di seluruh korpus dokumen.",
      "**TF-IDF** sangat cepat dihitung tanpa GPU, hemat memori, dan efektif sebagai *baseline* pencarian kata kunci.",
    ],
    footnote: "Meskipun berguna untuk pencarian sederhana, TF-IDF memiliki kelemahan besar dalam memahami arti kalimat.",
  },

  // -- 11: Cacat Fatal Polisemi & Bag-of-Words --
  {
    layout: "image",
    title: "Kelemahan Model Bag-of-Words",
    imageUrl: "/figures/fig07_tfidf_limitations.jpg",
    caption: "Visualisasi kegagalan TF-IDF: (1) Kata 'bank' dengan konteks berbeda dipaksa memakai satu vektor identik. (2) Representasi Bag-of-Words menghancurkan urutan kalimat sehingga efek logika negasi seperti kata 'tidak' lenyap.",
    footnote: "Dua kelemahan inilah yang mendorong perkembangan menuju era Transformer modern.",
  },

  // -- 12: Dua Kelemahan TF-IDF --
  {
    layout: "split",
    title: "Dua Kelemahan Utama TF-IDF yang Diatasi Attention",
    body: "Dua kegagalan TF-IDF pada diagram sebelumnya dapat diselesaikan oleh representasi berbasis konteks:",
    left: {
      title: "Kelemahan Utama TF-IDF",
      body: "TF-IDF tidak bisa membedakan makna ganda (polisemi), sehingga kata 'bank sungai' dan 'bank uang' mendapat representasi yang persis sama.\n\nTF-IDF juga memutus hubungan antar-kata, sehingga gagal menangkap makna negasi seperti 'tidak buruk'.",
    },
    right: {
      title: "Solusi Contextual Embeddings",
      body: "Model bahasa menghasilkan vektor angka yang berbeda untuk kata yang sama jika konteks kalimatnya berubah.\n\nSetiap kata mendapatkan embedding akhir yang dipengaruhi secara langsung oleh kata-kata di sekelilingnya melalui mekanisme self-attention.",
    },
    footnote: "Representasi yang sadar konteks ini membuat model jauh lebih akurat di berbagai tugas pemrosesan bahasa.",
  },

  // -- 13: Visualisasi Aljabar Vektor Word2Vec --
  {
    layout: "image",
    title: "Visualisasi Aljabar Vektor Word2Vec",
    imageUrl: "/figures/fig07_word_analogy.jpg",
    caption: "Pergeseran paralel di ruang vektor kontinu mewakili konsep semantis gender dan status sosial secara matematis.",
    footnote: "Inilah awal mula komputer memahami makna bahasa secara geometris.",
  },

  // -- 14: Static Word Embeddings: Era Word2Vec & GloVe --
  {
    layout: "bullets",
    title: "Static Word Embeddings: Era Word2Vec & GloVe",
    body: "Geometri aljabar vektor pada gambar sebelumnya melandasi pemetaan kata ke ruang vektor kontinu statis menggunakan prinsip distribusi linguistik:",
    bullets: [
      "**Prinsip distribusi** meletakkan kata-kata yang sering muncul bersamaan pada posisi koordinat yang saling berdekatan.",
      "**Aljabar semantik** terbentuk secara matematis, seperti persamaan logika: Vektor(Raja) - Vektor(Pria) + Vektor(Wanita) ≈ Vektor(Ratu).",
      "**Batas kemampuannya** adalah representasi masih bersifat *statis* (vektor satu kata dikunci permanen), sehingga gagal mengatasi kata bermakna ganda.",
    ],
    footnote: "Kata 'bank' dalam konteks sungai atau keuangan tetap dipaksa menggunakan satu koordinat statis yang sama.",
  },

  // -- 15: Dinamisme Vektor Berdasarkan Konteks --
  {
    layout: "image",
    title: "Dinamisme Vektor Berdasarkan Konteks",
    imageUrl: "/figures/fig07_contextual_dynamic.jpg",
    caption: "Visualisasi kata 'bisa' yang memiliki koordinat berbeda ketika diapit oleh kata penjelas yang berbeda (ular berbisa vs. bisa membaca) berkat self-attention.",
    footnote: "Vektor dinamis ini menyelesaikan masalah polisemi secara efektif.",
  },

  // -- 16: Lompatan ke Contextual Embeddings (Dinamis) --
  {
    layout: "bullets",
    title: "Lompatan ke Contextual Embeddings (Dinamis)",
    body: "Seperti yang ditunjukkan pada visualisasi pergeseran koordinat kata 'bisa' sebelumnya, model modern menghadirkan representasi dinamis:",
    bullets: [
      "**Representasi bersifat dinamis** karena dihitung secara interaktif mengikuti seluruh untaian kata di sekelilingnya.",
      "**Mekanisme self-attention** mencampur informasi dari kata-kata penjelas secara paralel dari seluruh isi dokumen.",
      "**Model modern seperti BERT dan IndoBERT** merangkum pemahaman konteks kalimat ini secara mendalam untuk diserahkan ke *head* klasifikasi.",
    ],
    footnote: "Setiap kata kini memiliki vektor angka dinamis yang luwes berubah menyesuaikan makna kalimat sebenarnya.",
  },

  // -- 17: Pembagian Tugas Adaptasi Layer --
  {
    layout: "image",
    title: "Pembagian Tugas Adaptasi Layer",
    imageUrl: "/figures/fig07_layer_hierarchy.jpg",
    caption: "Tumpukan lapisan Transformer membagi beban belajar: Lapisan bawah mengunci kaidah tata bahasa universal, sedangkan lapisan atas bebas di-fine-tune untuk beradaptasi ke tugas spesifik.",
    footnote: "Pemahaman pembagian tugas ini melandasi keputusan penting kita saat harus menentukan metode freeze vs fine-tune.",
  },

  // -- 18: Mengapa Model Umum Membantu Tugas Spesifik? --
  {
    layout: "bullets",
    title: "Mengapa Model Umum Membantu Tugas Spesifik?",
    body: "Melanjutkan pembagian tugas adaptasi layer pada diagram tersebut, model pretrained membantu tugas spesifik dengan membagi beban belajar:",
    bullets: [
      "**Lapisan awal** mempelajari pola bahasa yang paling umum, seperti aturan imbuhan kata dan struktur tata bahasa dasar.",
      "**Lapisan akhir** mempelajari logika yang lebih spesifik pada tugas target, sehingga lapisan ini beradaptasi paling drastis selama training.",
      "**Saat memakai model pretrained**, lapisan awalnya sudah memahami kaidah bahasa dasar, sehingga kita cukup melatih lapisan akhirnya saja agar memprediksi label dengan benar.",
    ],
    footnote: "Pembagian adaptasi layer inilah yang nanti menentukan apakah kita harus memakai metode freeze atau fine-tune.",
  },

  // -- 19: Komparasi Tiga Metode Tokenisasi --
  {
    layout: "image",
    title: "Komparasi Tiga Metode Tokenisasi",
    imageUrl: "/figures/fig07_tokenization_comparison.jpg",
    caption: "Uji kasus kata 'tertangkapnya' menggunakan word-level (boros kosakata), character-level (urutan terlalu panjang), dan subword (BPE/WordPiece yang paling seimbang).",
    footnote: "Hampir seluruh arsitektur Transformer modern bersandar pada metode tokenisasi subword.",
  },

  // -- 20: Tiga Gaya Utama Pemotongan Token --
  {
    layout: "bullets",
    title: "Tiga Gaya Utama Pemotongan Token",
    body: "Dari perbandingan tiga metode tokenisasi pada visualisasi sebelumnya, kita dapat merangkum tiga cara pemotongan teks oleh tokenizer:",
    bullets: [
      "**Pemotongan word-level** mengubah setiap satu kata utuh menjadi satu ID angka. Cara ini menuntut ukuran kosakata yang sangat besar dan rentan gagal mengenali kosa kata baru.",
      "**Pemotongan character-level** mengubah setiap satu huruf menjadi satu ID angka. Cara ini membuat kosakata menjadi sangat kecil tetapi urutan tokennya memanjang secara drastis.",
      "**Pemotongan subword** mempertahankan kata yang umum dan memecah kata jarang menjadi suku kata yang lebih kecil. Model seperti IndoBERT menggunakan cara yang paling seimbang ini.",
    ],
    footnote: "Kata 'tertangkap' mungkin dipecah menjadi dua token ['ter', 'tangkap'], sedangkan kata 'tidak' tetap menjadi satu token.",
  },

  // -- 21: Inspeksi Tokenizer --
  {
    layout: "code",
    title: "Inspeksi Tokenizer Sebelum Melatih Model",
    body: "Sebelum menjalankan model, kita wajib memeriksa hasil konversi tokenizer dengan mengembalikan ID angka ke dalam bentuk teks aslinya:",
    lang: "python",
    code: `from transformers import AutoTokenizer
 
tok = AutoTokenizer.from_pretrained(
    "indobenchmark/indobert-base-p1")
 
text = "Produk ini sangat bagus!"
ids = tok(text, return_tensors="pt")["input_ids"][0]
print(tok.convert_ids_to_tokens(ids))
# ['[CLS]','produk','ini','sangat','bagus','!','[SEP]']`,
    footnote: "Masalah yang paling sering terjadi adalah ketidakcocokan antara tokenizer bawaan model and format teks dataset kita.",
  },

  // -- 22: Pembatas Cara Kerja Attention --
  {
    layout: "section",
    title: "Cara Kerja Attention",
    body: "Pada W5, kita melihat RNN kesulitan memproses dokumen panjang karena adanya bottleneck memori. Mekanisme attention dirancang untuk menyelesaikan batasan tersebut.",
    footnote: "Mekanisme attention membiarkan setiap kata berinteraksi langsung dengan kata-kata lain tanpa harus mengantre dalam rantai linear.",
  },

  // -- 23: Visualisasi RNN vs Attention --
  {
    layout: "image",
    title: "Menyingkirkan Bottleneck RNN",
    imageUrl: "/figures/fig07_rnn_vs_attention.jpg",
    caption: "Bagan kiri menunjukkan rantai linear RNN yang mengompresi memori secara kaku. Bagan kanan menunjukkan paralelisme bebas Attention di mana setiap kata terhubung langsung.",
    footnote: "Paralelisme ini memungkinkan akselerasi komputasi yang sangat efisien pada GPU.",
  },

  // -- 24: Tiga Peran Vektor --
  {
    layout: "bullets",
    title: "Tiga Peran Vektor: Query, Key, Value",
    body: "Untuk menghitung seberapa relevan sebuah kata dengan kata lainnya, mekanisme attention memproyeksikan setiap kata ke dalam tiga vektor:",
    bullets: [
      "**Vektor Query** bertindak sebagai parameter pencarian yang mewakili pertanyaan 'informasi apa yang sedang saya butuhkan?' saat model mengamati satu kata.",
      "**Vektor Key** bertindak sebagai identitas kata yang mewakili pernyataan 'informasi inilah yang saya miliki' untuk dicocokkan dengan Query.",
      "**Vektor Value** berisi nilai informasi sebenarnya yang akan diberikan kepada kata lain, lalu dirata-ratakan jika terjadi kecocokan Query-Key.",
    ],
    footnote: "Ketiga proyeksi ini dihasilkan oleh perkalian matriks bobot yang dipelajari selama proses training model.",
  },

  // -- 25: Alur SDP Attention --
  {
    layout: "image",
    title: "Alur Scaled Dot-Product Attention",
    imageUrl: "/figures/fig06a_attention_sdp.png",
    caption: "Gambar ini memperlihatkan alur perhitungan inti attention. Matriks Query dan Key dikalikan untuk menghasilkan skor, dibagi oleh akar dimensinya, lalu melewati softmax agar menjadi probabilitas persentase. Setelah itu, probabilitasnya dikalikan dengan matriks Value untuk mengeluarkan hasil gabungannya.",
    footnote: "Lab W7 akan memandu Anda untuk menulis rumus scaled_dot_product_attention ini dari nol tanpa memakai library bawaan.",
  },

  // -- 26: Tiga Operasi di Balik Rumus --
  {
    layout: "bullets",
    title: "Tiga Operasi di Balik Rumus Attention",
    body: "Berdasarkan diagram alur kerja tersebut, kita dapat membedah perhitungan attention menjadi tiga langkah matematis utama:",
    bullets: [
      "**Perkalian matriks Q dan K** menghasilkan matriks kecocokan (skor kedekatan) antar-seluruh kombinasi kata di dalam kalimat.",
      "**Pembagian dengan akar dimensi** menjaga agar nilai skor tidak membengkak, sehingga pergerakan gradien tetap stabil saat backward pass.",
      "**Operasi softmax dan perkalian matriks V** mengubah skor mentah menjadi persentase bobot kecocokan, lalu mengekstrak informasi dari kata-kata yang paling relevan.",
    ],
    footnote: "Pembagian dengan akar dimensi sangat penting untuk mencegah masalah vanishing gradient saat ukuran dimensi model diperbesar.",
  },

  // -- 27: Attention dalam Kode --
  {
    layout: "code",
    title: "Menulis Attention Tanpa Abstraksi Library",
    body: "Mekanisme attention dapat ditulis menggunakan operasi perkalian matriks dasar seperti pada potongan kode berikut:",
    lang: "python",
    code: `X = torch.randn(5, 16)              # 5 kata, dimensi 16
W_Q, W_K, W_V = (torch.randn(16, 16) for _ in range(3))
 
Q, K, V = X @ W_Q, X @ W_K, X @ W_V
scores  = Q @ K.T / Q.shape[-1] ** 0.5   # Matrix 5x5
weights = F.softmax(scores, dim=-1)      # Persentase skor
output  = weights @ V                    # Output utuh 5x16`,
    footnote: "Karena dimensi input dan output sama (5x16), blok attention ini dapat ditumpuk hingga puluhan kali.",
  },

  // -- 28: Posisi Attention di Dalam Blok --
  {
    layout: "code",
    title: "Posisi Attention di Dalam Blok Transformer",
    body: "Mekanisme attention bekerja bersama subsistem lain di dalam satu tumpukan blok Transformer yang tersusun rapi:",
    lang: "text",
    code: `Input (Panjang kata T, dimensi D)
  -> LayerNorm
  -> Self-Attention   # Satu-satunya tempat interaksi antar-kata
  -> Residual Add     # Jalur pintas (skip connection) untuk aliran gradien
  -> LayerNorm
  -> Feed-Forward     # Perhitungan lokal untuk tiap token secara mandiri
  -> Residual Add
Output (Panjang kata T, dimensi D)`,
    footnote: "Mekanisme feed-forward memproses tiap kata secara lokal, sedangkan interaksi antar-kata terjadi secara eksklusif di dalam self-attention.",
  },

  // -- 29: Visualisasi Blok Transformer --
  {
    layout: "image",
    title: "Diagram Satu Blok Bangunan Transformer",
    imageUrl: "/figures/fig07_transformer_block.jpg",
    caption: "Peta komponen di dalam satu blok utuh Transformer, memperlihatkan integrasi LayerNorm, Self-Attention, Skip (Residual) Connections, dan FFN lokal.",
    footnote: "Dimensi output blok yang tetap (T, D) memungkinkan tumpukan blok ini diulang puluhan kali.",
  },

  // -- 30: Kebutuhan Positional Encoding --
  {
    layout: "bullets",
    title: "Kebutuhan Positional Encoding dan Multi-Head",
    body: "Selain perhitungan attention inti, model Transformer memerlukan dua komponen penting agar dapat memproses struktur bahasa secara alami:",
    bullets: [
      "**Multi-head attention** memecah proses atensi ke beberapa jalur paralel, sehingga model dapat fokus pada berbagai jenis hubungan kata yang berbeda secara bersamaan.",
      "**Positional encoding** menambahkan informasi posisi kata langsung ke vektor embedding, karena mekanisme attention dasar tidak mendeteksi urutan kalimat.",
      "**Tanpa positional encoding**, kalimat 'anjing menggigit orang' dan 'orang menggigit anjing' akan menghasilkan representasi vektor yang identik.",
    ],
    footnote: "Mekanisme attention yang memproses kalimat target menggunakan kalimat referensi lain disebut cross-attention, yang akan kita bahas di W9.",
  },

  // -- 31: Visualisasi MHA & Positional --
  {
    layout: "image",
    title: "Multi-Head & Gelombang Positional Encoding",
    imageUrl: "/figures/fig07_mha_positional.jpg",
    caption: "Bagan kiri menunjukkan multi-head yang memecah proses atensi ke 4 jalur paralel dengan peran spesifik. Bagan kanan menunjukkan gelombang sinus-kosinus positional encoding.",
    footnote: "Perpaduan keduanya menyisipkan kesadaran posisi dan sudut pandang linguistik yang kaya.",
  },

  // -- 32: Freeze vs Fine-tune --
  {
    layout: "bullets",
    title: "Pilihan Adaptasi: Metode Freeze vs Fine-tune",
    body: "Saat mengadaptasikan model pretrained untuk tugas klasifikasi kita, kita perlu memilih apakah parameter model boleh diubah atau tidak:",
    bullets: [
      "**Metode freeze** mengunci parameter model pretrained agar tidak berubah selama training, sehingga model hanya berfungsi sebagai pengekstraksi fitur statis.",
      "**Metode fine-tune** memperbolehkan parameter model diperbarui, sehingga model dapat menyesuaikan representasinya dengan karakteristik dataset target.",
      "**Prinsip dasar attention** tetap berjalan sama pada kedua metode; perbedaannya terletak pada apakah nilai bobot matriks diperbarui atau dikunci.",
    ],
    footnote: "Keputusan memilih freeze atau fine-tune sangat dipengaruhi oleh ukuran dataset dan kapasitas komputasi yang tersedia.",
  },

  // -- 33: Visualisasi Freeze vs Fine-tune --
  {
    layout: "image",
    title: "Peta Arsitektur Frozen vs. Fine-tuned",
    imageUrl: "/figures/fig07_freeze_vs_finetune.jpg",
    caption: "Visualisasi aliran gradien: Metode Frozen menghentikan gradien di atas backbone untuk menghemat memori, sedangkan Fine-tune membiarkan gradien mengalir penuh memperbarui seluruh parameter.",
    footnote: "Metode Frozen adalah pilihan teraman untuk dataset kecil di bawah lima ribu baris.",
  },

  // -- 34: Trade-off Biaya --
  {
    layout: "split",
    title: "Trade-off Biaya di antara Frozen dan Fine-tune",
    body: "Kita bisa melihat kontras performa antara dua pilihan adaptasi tadi dengan memakai data nyata sebanyak 12 ribu sampel sentimen pada GPU berkapasitas sedang:",
    left: {
      title: "Frozen dan Linear Head Atas",
      body: "Training hanya berjalan dalam waktu 2 sampai 3 menit saja per epochnya, dan berhasil mencatat skor rentang menengah F1 sebesar 0.80.\n\nPendekatan ini luar biasa cepat dan aman, sangat disarankan bila jumlah dataset kita masih di bawah lima ribu baris.",
    },
    right: {
      title: "Fine-tune Kapasitas Penuh",
      body: "Training menuntut waktu tunggu mencapai 25 menit secara keseluruhan, tetapi sukses mendorong skor kemampuan akhir tembus ke angka 0.89.\n\nPendekatan ini memeras alokasi memori GPU lebih deras, tetapi wajib dipilih jika jumlah kumpulan data Anda cukup melimpah.",
    },
    footnote: "Modul W8 akan mengenalkan jalan tengah bernama PEFT LoRA untuk menjembatani sisi kelemahan ekstrem dari kedua belah pihak di atas.",
  },

  // -- 35: Alternatif Pooling --
  {
    layout: "split",
    title: "Alternatif Pooling: Awalan [CLS] vs Rata-rata Mean",
    body: "Setelah arsitektur menyelesaikan proses di semua kata, kita perlu meringkas kalimatnya untuk diserahkan ke komponen klasifikasi lewat dua cara yang berbeda:",
    left: {
      title: "Penggunaan Token [CLS]",
      body: "Cara pertama adalah memungut intisari dari sebuah token sisipan spesial [CLS] yang diletakkan persis di pangkal terdepan kalimat.\n\nKarena model awalnya sudah dilatih untuk menaruh ringkasan keseluruhan di awalan kalimat tersebut, cara ini menjadi langkah yang dominan dipakai.",
    },
    right: {
      title: "Penggunaan Mean Pooling",
      body: "Cara kedua adalah menghitung nilai tengah dengan merata-ratakan vektor tiap kata di kalimat sambil membuang nilai padding kosong.\n\nCara ini jauh lebih optimal untuk menangkap hubungan kedekatan semantik kalimat tanpa mengandalkan satu beban token awal.",
    },
    footnote: "Cobalah jalankan grid kombinasi eksperimen penuh di dalam sel instruksi Lab W7 agar Anda bisa meresapi perbedaan marjinal hasil metriknya.",
  },

  // -- 36: Visualisasi CLS vs Mean Pool --
  {
    layout: "image",
    title: "Visualisasi Dua Taktik Pooling Kalimat",
    imageUrl: "/figures/fig07_pooling_comparison.jpg",
    caption: "Bagan kiri menunjukkan CLS pooling yang hanya mengambil vektor penampung barisan pertama. Bagan kanan menunjukkan Mean pooling yang menghitung nilai rata-rata geometris seluruh kata asli.",
    footnote: "CLS pooling direkomendasikan untuk klasifikasi dokumen, sedangkan Mean pooling andal untuk pencarian semantik.",
  },

  // -- 37: Pembatas Seksi 2: Alat AI untuk Riset --
  {
    layout: "section",
    title: "2. Alat AI untuk Riset",
    body: "Kita diperbolehkan menggunakan bantuan AI untuk membantu menulis kode. Namun, kita memikul tanggung jawab penuh untuk memverifikasi dan memahami setiap baris kode yang dihasilkan.",
    footnote: "Pastikan Anda dapat membongkar dan menjelaskan kode yang digunakan di dalam proyek kelompok Anda.",
  },

  // -- 38: Tiga Pos Pemeriksaan Kode AI --
  {
    layout: "image",
    title: "Tiga Pos Pemeriksaan Kode AI",
    imageUrl: "/figures/fig07_verification_checklist.jpg",
    caption: "Visualisasi SOP wajib verifikasi AI: Pos 1 (Cek Dimensi Tensor), Pos 2 (Uji Kasus Batas/Edge Case), dan Pos 3 (Bedah Logika Baris per Baris).",
    footnote: "SOP ini menjaga Anda tetap memegang kendali penuh atas kode riset kelompok.",
  },

  // -- 39: Tiga Tahap Aturan Verifikasi --
  {
    layout: "bullets",
    title: "Tiga Tahap Aturan Verifikasi Kode Hasil AI",
    body: "Tiga pos pemeriksaan pada ilustrasi tersebut wajib dilalui setiap kode dari AI sebelum digabungkan ke repositori utama:",
    bullets: [
      "**Verifikasi dimensi tensor** memastikan bahwa bentuk dan ukuran tensor yang diproses cocok dengan spesifikasi arsitektur model.",
      "**Uji kasus batas (edge case)** dilakukan dengan memberikan input tidak biasa (seperti teks kosong atau sangat panjang) untuk memastikan kode tidak error.",
      "**Analisis logika baris demi baris** memastikan kita memahami alur pemrosesan data dan tidak ada bagian kode yang redundan atau berbahaya.",
    ],
    footnote: "SOP verifikasi ini membantu kita mengontrol kode secara mandiri, bukan sekadar menyalin tanpa pemahaman.",
  },

  // -- 40: Pipa Distilasi Sintesis Dua Sumber --
  {
    layout: "image",
    title: "Pipa Distilasi Sintesis Dua Sumber",
    imageUrl: "/figures/fig07_synthesis_pipeline.jpg",
    caption: "Alur kerja penyaringan kebenaran: Menyandingkan respons dari dua obrolan AI berbeda dengan dokumentasi/paper sains resmi untuk menghasilkan paragraf sintesis argumentatif.",
    footnote: "SOP ini menghentikan bias halusinasi AI dengan tameng sains terpercaya.",
  },

  // -- 41: Aturan Sintesis Ganda Sebelum Pengambilan Eksekusi --
  {
    layout: "bullets",
    title: "Aturan Sintesis Ganda Sebelum Mengambil Keputusan",
    body: "Melalui pipa distilasi informasi pada diagram sebelumnya, kita menyaring kebenaran sebelum menentukan keputusan teknis:",
    bullets: [
      "**Gunakan dua sesi obrolan AI terpisah** dengan prompt berbeda agar kita mendapatkan perspektif teknis yang saling melengkapi.",
      "**Bandingkan jawaban AI dengan dokumentasi resmi** atau paper riset tepercaya untuk memastikan keakuratan informasi tersebut.",
      "**Susun kesimpulan satu paragraf** yang merangkum alasan pemilihan strategi teknis agar dapat dipertanggungjawabkan saat evaluasi.",
    ],
    footnote: "Catatan kesimpulan ini akan menjadi dokumentasi penting di setiap tahap keputusan riset kita.",
  },

  // -- 42: Alur Peran Integrasi LLM --
  {
    layout: "image",
    title: "Alur Peran Integrasi LLM dalam Kegiatan Riset",
    imageUrl: "/figures/fig05a_llm_workflow.jpg",
    caption: "Diagram infografis ini merepresentasikan urutan integrasi LLM yang seimbang di dalam arena riset teknis. LLM difungsikan secara proporsional untuk mengumpulkan tebaran awal ide teknis, lalu dioper kembali sepenuhnya ke pangkuan sang peneliti manusia agar diselidiki melalui verifikasi data, barulah ditutup oleh pelaporan yang beralasan kuat.",
    footnote: "Komponen mesin AI memiliki kapabilitas melampaui produksi kode, yakni mempercepat navigasi telaah riset selama ia disuguhi ruang konteks pemikiran yang solid.",
  },

  // -- 43: AI di Luar Kode --
  {
    layout: "bullets",
    title: "Pendayagunaan Kemampuan AI di Luar Penulisan Kode",
    body: "Jika kita memahami diagram alur kerja sebelumnya, kita dapat menggunakan kemampuan semantik LLM untuk memperlancar tugas riset lainnya:",
    bullets: [
      "**Membantu menelaah literatur ilmiah** dengan merangkum poin-poin utama serta memetakan keterbatasan yang ada pada paper riset.",
      "**Mematangkan hipotesis eksperimen** dengan menanyakan trade-off dari pilihan arsitektur atau parameter yang akan kita uji.",
      "**Mempercepat pemahaman repositori asing** dengan meminta AI menjelaskan alur eksekusi berdasarkan diagram folder atau skrip utama.",
    ],
    footnote: "Kunci efektivitas penggunaan AI adalah memberikan konteks masalah dan batasan data yang jelas di dalam prompt kita.",
  },

  // -- 44: Pembatas Seksi 3: Adopsi Repo --
  {
    layout: "section",
    title: "3. Adopsi Repo Eksternal",
    body: "Dalam riset Machine Learning, kita hampir selalu memulai pekerjaan dari repositori open-source yang sudah ada. Kunci keberhasilan adopsi terletak pada cara kita membaca struktur kode tersebut.",
    footnote: "Meluangkan beberapa jam untuk memahami struktur kode asing akan menghemat banyak waktu pencarian bug di kemudian hari.",
  },

  // -- 45: Dua Kecepatan Adopsi --
  {
    layout: "bullets",
    title: "Studi Kasus Perbandingan Dua Cara Adopsi",
    body: "Mari kita amati perbedaan hasil kerja antara dua cara adopsi repositori eksternal saat ditugaskan mengganti komponen model:",
    bullets: [
      "**Asisten pertama tergesa-gesa** menjalankan skrip training tanpa membaca petunjuk, sehingga menghabiskan waktu berhari-hari untuk memperbaiki error CUDA yang tidak terduga.",
      "**Asisten kedua meluangkan waktu sejenak** untuk membaca dokumentasi README, memetakan hubungan antar-file, serta memeriksa kecocokan dimensi input model.",
      "**Hasil akhirnya**, asisten kedua berhasil menjalankan smoke test pada hari kedua dan menyelesaikan modifikasi model secara terstruktur tanpa merusak kode asli.",
    ],
    footnote: "Kecepatan pengerjaan bukan ditentukan oleh bakat, melainkan oleh kebiasaan membaca kode secara cermat sebelum mulai mengetik.",
  },

  // -- 46: Urutan Membaca Repo --
  {
    layout: "image",
    title: "Protokol Hierarki Membaca Repositori: Luar ke Dalam",
    imageUrl: "/figures/fig06a_repo_navigation.jpg",
    caption: "Skema pemetaan logis di dalam bagan ini menuntut Anda untuk merintis rutinitas perburuan info repositori melalui tujuh tahap stasiun pemberhentian. Pintu awalnya meninjau target dokumen abstrak awalan, mampir sejenak ke arsitektur direktori folder skrip penjalan eksekusi pertamanya, kemudian ditutup dengan menginvestigasi parameter pengolahan matriks pemuatan file loader utamanya.",
    footnote: "Mengubah hutan skrip asing menjadi denah navigasi rasional inilah yang menjamin kenyamanan pikiran Anda saat sewaktu-waktu harus kembali ke dalam lipatan modul bersangkutan kelak.",
  },

  // -- 47: Tujuh Langkah Membaca --
  {
    layout: "bullets",
    title: "Tujuh Tahap Membaca Repositori Eksternal",
    body: "Berdasarkan diagram hierarki sebelumnya, proses membaca repositori eksternal dapat dikelompokkan ke dalam tiga kategori utama:",
    bullets: [
      "**Eksplorasi panduan dan literatur** berguna untuk memahami tujuan repositori, memeriksa prasyarat pustaka, dan melihat petunjuk instalasi di file README.",
      "**Eksplorasi struktur file dan entry point** bertujuan untuk menemukan skrip utama yang dipanggil saat menjalankan training atau evaluasi.",
      "**Analisis arsitektur model dan konfigurasi** dilakukan dengan memeriksa file konfigurasi parameter serta ukuran input-output pada model.",
    ],
    footnote: "Hasil penyelidikan struktur repositori ini nantinya akan kita dokumentasikan ke dalam file repo_map.md.",
  },

  // -- 48: Piramida Uji Coba Gradasi Smoke Test --
  {
    layout: "image",
    title: "Piramida Uji Coba Gradasi Smoke Test",
    imageUrl: "/figures/fig07_smoke_test_pyramid.jpg",
    caption: "Piramida pengujian: Level 1 (Kompilasi Impor), Level 2 (Alur Maju Tensor Dummy), dan Level 3 (Overfit 1 Batch untuk mengunci saraf optimizer).",
    footnote: "Disiplin melewati piramida ini menyunat drama bug di tengah-tengah masa training berat.",
  },

  // -- 49: Disiplin Uji Coba Smoke Test Sebelum Eksekusi Penuh --
  {
    layout: "bullets",
    title: "Disiplin Uji Coba Smoke Test Sebelum Eksekusi Penuh",
    body: "Mengikuti piramida uji coba bertahap pada diagram tersebut, kita menyaring error secara efisien sebelum memulai training penuh:",
    bullets: [
      "**Kompilasi impor** memverifikasi apakah seluruh pustaka (library) dan jalur direktori sudah termuat dengan benar di lingkungan kerja kita.",
      "**Operasi forward pass dengan data tiruan** mendeteksi apakah terjadi ketidakcocokan dimensi tensor pada arsitektur model baru kita.",
      "**Overfit satu batch data** mengonfirmasi apakah alur backpropagation, penghitungan loss, dan optimizer berjalan lancar sebelum training penuh dijalankan.",
    ],
    footnote: "Kemampuan melatih satu batch data hingga loss mendekati nol menjadi bukti awal bahwa sistem pemodelan kita sudah sehat.",
  },

  // -- 50: Pemecahan Empat Wilayah Kuadran Kesalahan Diagnosis --
  {
    layout: "image",
    title: "Pemecahan Empat Wilayah Kuadran Kesalahan Diagnosis",
    imageUrl: "/figures/fig06b_error_categories.svg",
    caption: "Peta diagonal visual ini menempatkan hambatan error sistem adopsi repositori asing ke dalam empat kategori kuadran pemicu. Kuadran setup mewakili masalah di lingkungan instalasi library, kuadran data di persoalan asupan variabel preprocessing, kuadran algoritmik dari sisi operasi jalur kerugian hitungan prediksinya, serta kuadran eksperimen akibat dari ketidaksamaan log seed awal.",
    footnote: "Keahlian membedakan akar gejala di awal permasalahan langsung menyunat belasan jam masa terbuang pada jalur investigasi yang keliru.",
  },

  // -- 51: Tanda dan Tes Tiap Kategori --
  {
    layout: "grid",
    title: "Karakteristik dan Validasi Cepat pada Keempat Kuadran",
    body: "Dengan berpedoman pada peta diagnosis sebelumnya, setiap jenis error memerlukan metode pengecekan mandiri yang spesifik:",
    gridItems: [
      {
        title: "Setup Error",
        body: "Terjadi ketika sistem memunculkan error gagal mengimpor library. Solusinya adalah menyamakan versi pustaka yang berjalan di lingkungan kerja Anda.",
      },
      {
        title: "Data Error",
        body: "Terdeteksi saat akurasi mendadak tinggi di awal. Solusinya adalah memeriksa data leakage dan memvisualisasikan data setelah preprocessing.",
      },
      {
        title: "Algorithmic Error",
        body: "Terjadi jika kurva loss mendatar atau tidak turun. Cara memeriksanya adalah dengan menguji aliran gradien pada subset data yang sangat kecil.",
      },
      {
        title: "Experiment Error",
        body: "Ditandai dengan hasil replikasi eksperimen yang berbeda dari referensi. Solusinya adalah menyamakan konfigurasi hyperparameter dan seed.",
      },
    ],
    footnote: "Akurasi yang terlalu tinggi tanpa melalui proses training yang wajar biasanya disebabkan oleh data leakage, mirip dengan bahasan di W6.",
  },

  // -- 52: Tiga Perisai Kebersihan Modifikasi Kode --
  {
    layout: "image",
    title: "Tiga Perisai Kebersihan Modifikasi Kode",
    imageUrl: "/figures/fig07_clean_modification_tactics.jpg",
    caption: "Tiga taktik pengaman modifikasi: (1) Argumen default sebagai bumper, (2) Isolasi berkas mandiri di sisi luar, (3) Kontrol fitur modular lewat command line flags.",
    footnote: "Strategi ini menjamin repositori eksternal tetap bersih dan mudah didebug.",
  },

  // -- 53: Strategi Implan Modifikasi Skrip Secara Seminimal Mungkin --
  {
    layout: "bullets",
    title: "Strategi Modifikasi Kode Repositori Secara Minimal",
    body: "Tiga taktik pengaman pada ilustrasi tersebut memagari proses modifikasi agar kode asli repositori tidak rusak:",
    bullets: [
      "**Gunakan argumen dengan nilai default** pada fungsi baru kita agar fungsi bawaan lainnya tetap berjalan normal tanpa gangguan.",
      "**Tulis fungsi kustom di file terpisah** untuk menghindari penumpukan modifikasi langsung pada file utama repositori asli.",
      "**Gunakan parameter baris perintah (CLI flags)** untuk menyalakan atau mematikan fitur modifikasi tanpa perlu mengubah isi file secara manual.",
    ],
    footnote: "Strategi modifikasi minimal ini akan sangat membantu kelancaran pengerjaan proyek Capstone Anda ke depan.",
  },

  // -- 54: Lab W7 --
  {
    layout: "bullets",
    title: "Tiga Praktikum Terstruktur di Minggu 7",
    body: "Rangkaian latihan di minggu ini dirancang untuk memberikan pengalaman praktis dalam klasifikasi teks, pembuatan model, dan adopsi kode eksternal:",
    bullets: [
      "**Lab Klasifikasi Teks (`lab_w7_text_classification`)** menguji kemampuan melatih model sentimen menggunakan pendekatan frozen dan membandingkan hasil pooling.",
      "**Lab Adopsi Repositori (`lab_w7_repo_adoption`)** melatih kita membaca dan memodifikasi repositori Hugging Face, serta melakukan smoke test 3-level.",
      "**Lab Transformer Mini (`lab_w7_transformer_mini`)** menantang kita membangun blok attention dari nol tanpa bantuan library otomatis.",
    ],
    footnote: "Menyelesaikan tantangan di Lab W7 ini menjadi salah satu penentu kesiapan Anda sebelum memasuki fase Capstone.",
  },

  // -- 55: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi Konseptual untuk Menguji Pemahaman",
    body: "Untuk menguji pemahaman Anda setelah menyelesaikan materi minggu ini, cobalah jawab tiga skenario evaluasi berikut:",
    bullets: [
      "Jika kita hanya memiliki dataset klasifikasi bahasa Indonesia yang sangat terbatas (misalnya di bawah 5.000 baris), mengapa metode freeze lebih disarankan dibanding fine-tune?",
      "Dalam kondisi apa token [CLS] kurang optimal digunakan untuk klasifikasi, sehingga kita perlu beralih menggunakan Mean Pooling?",
      "Bagaimana Anda merancang smoke test jika repositori yang diadopsi memiliki input dari dua modalitas sekaligus (misalnya gambar dan teks) di W9 nanti?",
    ],
    footnote: "Membiasakan diri menjawab skenario evaluasi ini akan melatih kemampuan analisis riset Anda menjelang sidang Capstone.",
  },

  // -- 56: Lanjut ke W8 --
  {
    layout: "bullets",
    title: "Perjalanan Selanjutnya Menuju W8: Foundation Models",
    body: "Pemahaman Anda dalam melakukan verifikasi kode, mengadopsi repositori eksternal, dan mengurai arsitektur Transformer menjadi bekal berharga untuk materi minggu depan:",
    bullets: [
      "**Pemetaan ekosistem Foundation Models** akan memperluas cakupan pemodelan kita mulai dari model bahasa besar, visi komputer, hingga multimodal.",
      "**Metode adaptasi efisien (PEFT LoRA)** akan mengajarkan kita cara memperbarui parameter model besar dengan kapasitas komputasi GPU yang minimal.",
      "**Literasi dokumen Model Card** melatih kita untuk memeriksa keterbatasan, bias, dan konfigurasi dari model pretrained sebelum menggunakannya.",
    ],
    footnote: "Pilihan parameter tuning dari W7 ini akan menjadi dasar saat kita menentukan jalur adaptasi model bahasa besar di W8.",
  },

  // -- 57: CTA --
  {
    layout: "cta",
    title: "Mulai Eksperimen Lab W7",
    body: "Teori tentang frozen fine-tuning, tokenisasi, attention, dan adopsi kode kini siap diuji langsung lewat baris-baris kode praktikum.\n\nSediakan waktu fokus sekitar 5 hingga 7 jam untuk menyelesaikan latihan ini secara mandiri.",
    ctaText: "Buka Lab Klasifikasi Teks di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w7_text_classification.ipynb",
  },
];

import type { SlideSection } from "./index";

export const slides07: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W7: Text, Transformers & Repo Adoption",
    subtitle: "Kita belajar memakai pretrained Transformer untuk memproses teks, memverifikasi kode dari alat AI, dan memodifikasi repo riset orang lain.",
    footnote: "Bab 07 - Minggu 7",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Tiga materi minggu ini berfokus pada satu hal: cara memanfaatkan hasil kerja yang sudah ada secara bertanggung jawab.",
    gridItems: [
      {
        title: "1. Teks dengan Pretrained Transformer",
        body: "Kita belajar beralih dari TF-IDF ke contextual embeddings, memahami tokenisasi, melihat cara kerja attention lewat pola Query-Key-Value, lalu memilih antara metode freeze dan fine-tune.",
      },
      {
        title: "2. Alat AI untuk Riset",
        body: "Kita menerapkan protokol wajib untuk memverifikasi baris kode AI dan menyintesis dua sumber referensi sebelum kita mengambil keputusan riset yang besar.",
      },
      {
        title: "3. Adopsi Repo Eksternal",
        body: "Kita belajar membaca repositori asing secara terstruktur, menjalankan tahapan smoke test, lalu memodifikasinya seminimal mungkin agar kode aslinya tidak rusak.",
      },
    ],
    footnote: "Ketiganya akan saling bertemu saat kita mengadopsi repo teks HuggingFace dengan bantuan alat LLM.",
  },

  // -- 3: Recap W6 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W6)",
    body: "Minggu lalu, kita belajar menilai representasi fitur dan menjaga kebersihan data dari kebocoran temporal. Konsep tersebut kita pakai lagi minggu ini:",
    bullets: [
      "**Perbandingan representasi fitur** telah membuktikan bahwa cara model melihat data sangat menentukan akurasi akhirnya.",
      "**Audit deteksi temporal leakage** menunjukkan kepada kita bahwa akurasi yang terlalu bagus hampir pasti menandakan adanya kebocoran waktu.",
      "**Konsep bottleneck memori pada arsitektur RNN** akan menjadi alasan utama mengapa model teks modern beralih menggunakan Transformer dan attention.",
    ],
    footnote: "Kebiasaan audit data dari W6 kembali kita pakai untuk mendeteksi leakage saat mengadopsi repositori orang lain.",
  },

  // -- 4: Pembatas Seksi 1 --
  {
    layout: "section",
    title: "1. Teks dengan Pretrained Transformer",
    body: "Sebelum melompat jauh ke model Transformer modern, kita harus memahami rute sejarah bagaimana komputer menerjemahkan baris teks manusia ke dalam struktur angka kontinu.",
    footnote: "Kita memulai penjelajahan dari batas kemampuan representasi klasik menuju representasi modern.",
  },

  // -- 5: Bagaimana Komputer Membaca Teks? --
  {
    layout: "bullets",
    title: "Bagaimana Komputer Membaca Teks?",
    body: "Bahasa manusia berupa teks mentah yang diskret tidak bisa langsung dimasukkan ke Neural Network, sehingga kita membutuhkan langkah konversi awal:",
    bullets: [
      "**Teks bersifat diskret** karena terdiri dari karakter dan simbol kata terpisah yang tidak memiliki nilai numerik kontinu.",
      "**Neural Network bekerja di ruang kontinu** menggunakan hitungan perkalian matriks pecahan berdimensi tetap (*dense space*).",
      "**Tugas representasi teks** adalah memetakan deretan huruf atau kata ke dalam bentuk koordinat angka kontinu yang bermakna bagi model.",
    ],
    footnote: "Langkah konversi teks ke angka ini melandasi seluruh keberhasilan model deep learning pemroses bahasa.",
  },

  // -- 6: Struktur Diskret vs. Angka Kontinu --
  {
    layout: "split",
    title: "Struktur Diskret vs. Struktur Angka Kontinu",
    body: "Pemula harus memahami perbedaan fundamental bagaimana data disimpan dan diolah oleh sistem kecerdasan buatan:",
    left: {
      title: "Struktur Diskret",
      body: "Representasi menggunakan indeks bilangan bulat atau angka biner yang kaku dan terisolasi.\n\nContoh: Kata 'kucing' (indeks 1) dan 'anjing' (indeks 2) terpisah total. Komputer tidak tahu bahwa kedua kata tersebut memiliki kemiripan arti secara semantik.",
    },
    right: {
      title: "Struktur Angka Kontinu",
      body: "Representasi menggunakan koordinat desimal pecahan (*floating-point*) dalam ruang vektor berdimensi tinggi (*embeddings*).\n\nContoh: Kata 'kucing' dipetakan ke koordinat `[0.25, -0.47, 0.81]`. Nilai angka ini dapat bergeser halus untuk mencatat kemiripan makna.",
    },
    footnote: "Komputer modern membutuhkan angka kontinu agar bisa menghitung kemiripan dan melakukan kalkulus optimasi.",
  },

  // -- 7: Visualisasi Diskret vs. Kontinu --
  {
    layout: "image",
    title: "Visualisasi Perbedaan Representasi",
    imageUrl: "/figures/fig07_discrete_vs_continuous.jpg",
    caption: "Bagan kiri menunjukkan One-Hot encoding di mana semua sumbu saling tegak lurus (ortogonal) sehingga jarak kucing-anjing sama dengan jarak kucing-meja. Bagan kanan menunjukkan Dense Embeddings di mana kata-kata bermakna mirip (kucing dan anjing) berkerumun berdekatan.",
    footnote: "Kemampuan mengelompokkan kata sejenis ini membuat model memahami konteks secara geometris.",
  },

  // -- 8: One-Hot Encoding --
  {
    layout: "split",
    title: "One-Hot Encoding: Representasi Ortogonal yang Boros",
    body: "Cara paling primitif adalah menganggap setiap kata sebagai dimensi sumbu tersendiri yang saling tegak lurus. Cara ini melahirkan dua kelemahan fatal:",
    left: {
      title: "1. Kehilangan Relasi Semantik",
      body: "Karena semua sumbu dimensi tegak lurus (*orthogonal*), jarak matematika antara kata 'kucing' dan 'anjing' sama jauhnya dengan jarak ke kata 'meja'.\n\nModel kehilangan pemahaman tentang kemiripan makna antar-kata.",
    },
    right: {
      title: "2. Ledakan Dimensi Kosong",
      body: "Jika ukuran kamus kosa kata (*vocabulary*) korpus data kita mencapai 100 ribu kata, satu kata harus direpresentasikan oleh vektor raksasa berdimensi 100 ribu.\n\nHampir seluruh isi koordinat adalah nol (*sparse vector*), sangat boros memori.",
    },
    footnote: "Representasi ini terlalu polos karena memutus seluruh keterhubungan makna alami bahasa.",
  },

  // -- 9: TF-IDF --
  {
    layout: "bullets",
    title: "TF-IDF: Peta Statistik Berbasis Kata Kunci",
    body: "TF-IDF mengukur seberapa penting sebuah kata di dalam satu dokumen tertentu dengan memadukan frekuensi lokal kata dan kelangkaannya lintas dokumen:",
    bullets: [
      "**Term Frequency (TF)** bertugas menghitung seberapa sering sebuah kata muncul di dalam satu file dokumen target.",
      "**Inverse Document Frequency (IDF)** bertugas memberikan bobot penalti untuk kata-kata pasaran yang terlalu sering tersebar di seluruh korpus dokumen.",
      "**Kekuatan utamanya** adalah sangat cepat dihitung tanpa GPU, sangat hemat memori, dan mumpuni untuk *baseline* pencarian kata kunci.",
    ],
    footnote: "Meskipun tangguh untuk pencarian sederhana, TF-IDF memiliki kelemahan besar saat harus memahami arti kalimat.",
  },

  // -- 10: Visualisasi TF-IDF --
  {
    layout: "image",
    title: "Keseimbangan Timbangan TF-IDF",
    imageUrl: "/figures/fig07_tfidf_balance.jpg",
    caption: "TF-IDF menimbang keunikan lokal (TF) dengan penalti kepasaran kata secara global (IDF). Hasil kalinya mengukur signifikansi riil sebuah kata.",
    footnote: "Timbangan statistik ini menghasilkan bobot kontinu desimal yang mumpuni untuk baseline klasifikasi.",
  },

  // -- 11: Dua Kelemahan TF-IDF --
  {
    layout: "split",
    title: "Dua Kelemahan Utama TF-IDF yang Diatasi Attention",
    body: "Kelemahan perhitungan TF-IDF muncul karena ia mengabaikan urutan dan konteks kata. Contextual embeddings memperbaiki kedua kelemahan tersebut:",
    left: {
      title: "Kelemahan Mutlak TF-IDF",
      body: "TF-IDF tidak bisa membedakan makna ganda, sehingga kata 'bank sungai' dan 'bank uang' mendapat representasi yang persis sama.\n\nTF-IDF juga memutus hubungan antar-kata, sehingga ia gagal menangkap dampak logika negasi seperti kalimat 'tidak buruk'.",
    },
    right: {
      title: "Solusi Contextual Embeddings",
      body: "Model bahasa seperti IndoBERT menghasilkan vektor angka yang berbeda untuk kata yang sama jika konteks kalimatnya berubah.\n\nSetiap kata mendapatkan embedding akhir yang dipengaruhi secara langsung oleh kata-kata di sebelahnya melalui mekanisme self-attention.",
    },
    footnote: "Inilah alasan mengapa pemahaman pola struktur bahasa secara umum membuat model teks tetap akurat di berbagai tugas.",
  },

  // -- 12: Visualisasi Dua Kelemahan TF-IDF --
  {
    layout: "image",
    title: "Cacat Fatal Polisemi & Bag-of-Words",
    imageUrl: "/figures/fig07_tfidf_limitations.jpg",
    caption: "Visualisasi kegagalan TF-IDF: (1) Kata 'bank' dengan konteks berbeda dipaksa memakai satu vektor identik. (2) Blender Bag-of-Words menghancurkan urutan kalimat sehingga efek negasi 'tidak' lenyap.",
    footnote: "Dua kelemahan inilah yang melahirkan kebutuhan rute sejarah menuju era Transformer modern.",
  },

  // -- 13: Static Word Embeddings --
  {
    layout: "bullets",
    title: "Static Word Embeddings: Era Word2Vec & GloVe",
    body: "Perkembangan awal deep learning memetakan kata ke ruang vektor padat (*dense vector*) berdimensi rendah menggunakan prinsip distribusi linguistik:",
    bullets: [
      "**Prinsip distribusi** meletakkan kata-kata yang sering muncul bersamaan pada posisi koordinat yang saling berdekatan.",
      "**Kemampuan aljabar semantik** lahir secara mengagumkan, seperti persamaan logika legendaris: Vektor(Raja) - Vektor(Pria) + Vektor(Wanita) ≈ Vektor(Ratu).",
      "**Batas kemampuannya** adalah representasi masih bersifat *statis* (vektor satu kata dikunci permanen), sehingga gagal mengatasi polisemi.",
    ],
    footnote: "Kata 'bank' dalam konteks sungai atau keuangan tetap dipaksa memakai satu vektor koordinat statis yang sama.",
  },

  // -- 14: Visualisasi Aljabar Vektor --
  {
    layout: "image",
    title: "Visualisasi Aljabar Vektor Word2Vec",
    imageUrl: "/figures/fig07_word_analogy.jpg",
    caption: "Pergeseran paralel di ruang vektor kontinu mewakili konsep semantis gender dan status sosial secara matematis.",
    footnote: "Inilah awal mula komputer memahami makna bahasa secara geometris.",
  },

  // -- 15: Lompatan ke Contextual Embeddings --
  {
    layout: "bullets",
    title: "Lompatan ke Contextual Embeddings (Dinamis)",
    body: "Contextual embeddings berhasil melompati keterbatasan metode statis dengan menghadirkan representasi dinamis yang sadar konteks kalimat:",
    bullets: [
      "**Representasi bersifat dinamis** karena dihitung ulang secara interaktif mengikuti seluruh untaian kata di sekelilingnya.",
      "**Mekanisme self-attention** bertugas mencampur bobot makna kata penjelas secara paralel dari seluruh isi dokumen.",
      "**Model modern seperti BERT dan IndoBERT** merangkum pemahaman konteks kalimat ini secara mendalam untuk diserahkan ke *head* klasifikasi.",
    ],
    footnote: "Tiap kata kini memiliki vektor angka dinamis yang luwes berubah menyesuaikan makna kalimat sebenarnya.",
  },

  // -- 16: Visualisasi Dinamis Kontekstual --
  {
    layout: "image",
    title: "Dinamisme Vektor Berdasarkan Konteks",
    imageUrl: "/figures/fig07_contextual_dynamic.jpg",
    caption: "Visualisasi kata 'bisa' yang memiliki koordinat berbeda ketika diapit oleh kata penjelas yang berbeda (Venom vs. Ability) berkat self-attention.",
    footnote: "Vektor dinamis ini menyelesaikan masalah polisemi secara mutlak.",
  },

  // -- 17: Mengapa Model Umum Membantu --
  {
    layout: "bullets",
    title: "Mengapa Model Umum Membantu Tugas Spesifik?",
    body: "Model bahasa yang dilatih pada miliaran teks acak dari internet sangat membantu klasifikasi sentimen spesifik karena model ini membagi tugas belajarnya di setiap layer:",
    bullets: [
      "**Layer arsitektur awal** bertugas mempelajari pola bahasa yang paling dasar, seperti aturan imbuhan kata dan cara subjek berhubungan dengan kata kerjanya.",
      "**Layer arsitektur akhir** bertugas mempelajari logika yang lebih spesifik pada suatu domain, sehingga lapisan ini beradaptasi paling drastis selama masa training.",
      "**Saat kita memakai model pretrained**, lapisan awalnya sudah memahami kaidah bahasa baku, sehingga kita cukup melatih lapisan akhirnya saja agar memprediksi label sentimen yang benar.",
    ],
    footnote: "Pembagian adaptasi layer inilah yang nanti menentukan apakah kita harus memakai metode freeze atau fine-tune.",
  },

  // -- 18: Visualisasi Hirarki Layer --
  {
    layout: "image",
    title: "Pembagian Tugas Adaptasi Layer",
    imageUrl: "/figures/fig07_layer_hierarchy.jpg",
    caption: "Tumpukan lapisan Transformer membagi beban belajar: Lapisan bawah mengunci kaidah tata bahasa universal, sedangkan lapisan atas bebas fine-tune beradaptasi ke domain target.",
    footnote: "Pemahaman pembagian tugas ini melandasi keputusan penting kita saat harus menentukan metode freeze vs fine-tune.",
  },

  // -- 19: Tiga Gaya Pemotongan Token --
  {
    layout: "bullets",
    title: "Tiga Gaya Utama Pemotongan Token",
    body: "Model pretrained membaca urutan angka matriks, bukan barisan teks langsung. Tokenizer bertugas mengubah teks menjadi angka lewat tiga cara pemotongan:",
    bullets: [
      "**Pemotongan word-level** mengubah setiap satu kata utuh menjadi satu ID angka. Cara ini menuntut ukuran vocab yang sangat besar dan rentan gagal mengenali kosa kata baru.",
      "**Pemotongan character-level** mengubah setiap satu huruf menjadi satu ID angka. Cara ini membuat vocab menjadi mungil tetapi urutan tokennya memanjang secara drastis.",
      "**Pemotongan subword** mempertahankan kata yang umum menjadi satu token dan memecah kata jarang menjadi suku-kata yang lebih kecil. Model seperti IndoBERT memakai cara yang paling seimbang ini.",
    ],
    footnote: "Kata 'tertangkap' mungkin dipecah menjadi dua token ['ter', 'tangkap'], sedangkan kata 'tidak' tetap menjadi satu token.",
  },

  // -- 20: Visualisasi Pemotongan Token --
  {
    layout: "image",
    title: "Komparasi Tiga Metode Tokenisasi",
    imageUrl: "/figures/fig07_tokenization_comparison.jpg",
    caption: "Uji kasus kata 'tertangkapnya' menggunakan word-level (boros kamus), character-level (urutan terlalu panjang), dan subword (BPE/WordPiece yang paling seimbang).",
    footnote: "Hampir seluruh arsitektur Transformer modern bersandar pada metode tokenisasi subword.",
  },

  // -- 21: Inspeksi Tokenizer --
  {
    layout: "code",
    title: "Inspeksi Tokenizer Sebelum Mulai Melatih",
    body: "Sebelum menjalankan arsitektur model, kita wajib memeriksa hasil konversi kata dari tokenizer dengan cara mengembalikan ID angka tersebut menjadi huruf aslinya:",
    lang: "python",
    code: `from transformers import AutoTokenizer
 
tok = AutoTokenizer.from_pretrained(
    "indobenchmark/indobert-base-p1")
 
text = "Produk ini sangat bagus!"
ids = tok(text, return_tensors="pt")["input_ids"][0]
print(tok.convert_ids_to_tokens(ids))
# ['[CLS]','produk','ini','sangat','bagus','!','[SEP]']`,
    footnote: "Bug yang paling sering membuang waktu adalah ketidakcocokan antara tokenizer bawaan model dan format teks milik kita.",
  },

  // -- 22: Pembatas Cara Kerja Attention --
  {
    layout: "section",
    title: "Cara Kerja Attention",
    body: "Pada W5, arsitektur RNN sangat kesulitan mencerna dokumen panjang karena adanya bottleneck memori: seluruh makna kata dari awal paragraf harus dikompres ke satu vektor berukuran tetap. Attention membuang batasan itu sama sekali.",
    footnote: "Mekanisme attention membiarkan setiap kata mengekstrak informasi secara langsung dari kata-kata lain tanpa harus mengantre panjang.",
  },

  // -- 23: Visualisasi RNN vs Attention --
  {
    layout: "image",
    title: "Menyingkirkan Bottleneck RNN",
    imageUrl: "/figures/fig07_rnn_vs_attention.jpg",
    caption: "Bagan kiri menunjukkan rantai linear RNN yang mengompresi ingatan secara kaku. Bagan kanan menunjukkan paralelisme bebas Attention di mana setiap kata terhubung langsung.",
    footnote: "Paralelisme inilah yang memicu akselerasi komputasi luar biasa pada GPU.",
  },

  // -- 24: Tiga Peran Vektor --
  {
    layout: "bullets",
    title: "Tiga Peran Vektor: Query, Key, Value",
    body: "Untuk menghitung seberapa relevan sebuah kata dengan kata lainnya, mekanisme attention membagi setiap kata menjadi tiga vektor yang memiliki peran spesifik:",
    bullets: [
      "**Vektor Query** bertindak sebagai parameter pencarian yang mewakili pertanyaan 'informasi apa yang sedang saya butuhkan?' saat model mengamati satu kata.",
      "**Vektor Key** bertindak sebagai identitas kata yang mewakili pernyataan 'informasi inilah yang saya miliki' saat ia dicocokkan dengan Query.",
      "**Vektor Value** berisi nilai informasi sebenarnya yang akan diberikan kepada kata lain, yang kemudian dirata-ratakan menjadi output baru jika terjadi kecocokan Query-Key.",
    ],
    footnote: "Ketiga proyeksi ini dihasilkan oleh perkalian matriks bobot yang akan dipelajari oleh model dan disimpan secara permanen di dalam checkpoint.",
  },

  // -- 25: Alur SDP Attention --
  {
    layout: "image",
    title: "Alur Scaled Dot-Product Attention",
    imageUrl: "/figures/fig06a_attention_sdp.png",
    caption: "Gambar ini memperlihatkan alur perhitungan inti attention. Matriks Query dan Key dikalikan untuk menghasilkan skor, dibagi oleh akar dimensinya, lalu melewati softmax agar menjadi probabilitas persentase. Setelah itu, probabilitasnya dikalikan dengan matriks Value untuk mengeluarkan hasil gabungannya.",
    footnote: "Lab 6b akan memandu Anda untuk menulis rumus scaled_dot_product_attention ini dari nol tanpa memakai library bawaan.",
  },

  // -- 26: Tiga Operasi di Balik Rumus --
  {
    layout: "bullets",
    title: "Tiga Operasi di Balik Rumus Attention",
    body: "Dari gambar alur kerja tersebut, kita bisa membedah perhitungan attention menjadi tiga langkah matematis yang dilakukan secara berurutan:",
    bullets: [
      "**Perkalian antara matriks Q and K** bertujuan untuk membuat matriks grid yang mencatat seluruh skor kedekatan dari seluruh kombinasi kata yang ada di kalimat.",
      "**Pembagian skor dengan nilai akar dimensi** ditujukan agar angka dot-product tidak membengkak dan mematikan pergerakan gradien, sekaligus mencegah munculnya masalah vanishing gradient seperti di W5.",
      "**Penerapan operasi softmax dan perkalian matriks V** bekerja dengan mengubah skor mentah menjadi persentase probabilitas, lalu menarik intisari informasi dari kata-kata yang nilainya paling kuat.",
    ],
    footnote: "Langkah pembagian dengan angka akar dimensi ini mutlak diperlukan supaya pelatihan model tetap stabil meski ukuran dimensinya diperbesar.",
  },

  // -- 27: Attention dalam Kode --
  {
    layout: "code",
    title: "Menulis Attention Tanpa Abstraksi Library",
    body: "Jika kita melepaskan lapisan library yang rumit, mekanisme attention hanyalah sekumpulan perkalian matriks dasar yang terlihat sesederhana baris kode ini:",
    lang: "python",
    code: `X = torch.randn(5, 16)              # 5 kata, dimensi 16
W_Q, W_K, W_V = (torch.randn(16, 16) for _ in range(3))
 
Q, K, V = X @ W_Q, X @ W_K, X @ W_V
scores  = Q @ K.T / Q.shape[-1] ** 0.5   # Matrix 5x5
weights = F.softmax(scores, dim=-1)      # Persentase skor
output  = weights @ V                    # Output utuh 5x16`,
    footnote: "Perhatikan bahwa dimensi awal dan akhirnya selalu sama, dan itulah alasan mengapa blok ini bisa saling ditumpuk hingga puluhan kali.",
  },

  // -- 28: Posisi Attention di Dalam Blok --
  {
    layout: "code",
    title: "Posisi Attention di Dalam Blok Transformer",
    body: "Perhitungan attention hanyalah salah satu subsistem di dalam sebuah tumpukan blok Transformer yang susunannya terjaga rapi:",
    lang: "text",
    code: `Input (Panjang kata T, dimensi D)
  -> LayerNorm
  -> Self-Attention   # Satu-satunya tempat antar-kata bertemu
  -> Residual Add     # Jalur pintas yang mirip dengan ResNet
  -> LayerNorm
  -> Feed-Forward     # Perhitungan lokal untuk tiap token
  -> Residual Add
Output (Panjang kata T, dimensi D)`,
    footnote: "Mekanisme feed-forward sama sekali tidak mencampur informasi antarkata, karena operasi interaksi kata hanya terjadi eksklusif di dalam self-attention.",
  },

  // -- 29: Visualisasi Blok Transformer --
  {
    layout: "image",
    title: "Diagram Satu Blok Bangunan Transformer",
    imageUrl: "/figures/fig07_transformer_block.jpg",
    caption: "Peta komponen di dalam satu blok utuh Transformer, memperlihatkan integrasi LayerNorm, Self-Attention, Skip (Residual) Connections, dan FFN lokal.",
    footnote: "Keluaran dimensi blok yang tetap (T, D) memungkinkan model ditumpuk puluhan kali.",
  },

  // -- 30: Kebutuhan Positional Encoding --
  {
    layout: "bullets",
    title: "Kebutuhan Positional Encoding dan Multi-Head",
    body: "Selain perhitungan inti attention, model Transformer sangat membutuhkan dua komponen ekstra supaya ia bisa mengingat posisi tata bahasa secara alami:",
    bullets: [
      "**Mekanisme multi-head attention** bekerja dengan cara membagi proses attention ke dalam beberapa jalur yang berjalan berbarengan, sehingga tiap jalur bisa lebih fokus mencari satu bentuk pola susunan bahasa.",
      "**Penambahan vektor positional encoding** digunakan untuk menyisipkan identitas urutan baris posisi langsung ke vektor kata, karena attention secara polos selalu buta terhadap tata letak kalimat.",
      "**Jika positional encoding dimatikan**, kalimat 'anjing menggigit orang' dan 'orang menggigit anjing' akan diolah menjadi angka representasi matriks yang sepenuhnya identik.",
    ],
    footnote: "Jika sebuah kalimat melakukan operasi attention pada kalimat sumber lain, maka prosesnya disebut sebagai cross-attention yang akan sering kita temui di W9.",
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
    title: "Pilihan Eksekusi: Matriks Freeze vs Fine-tune",
    body: "Ketika kita mendiskusikan pendekatan adaptasi freeze atau fine-tune, sebenarnya kita sedang menentukan apakah matriks attention boleh diubah nilainya:",
    bullets: [
      "**Opsi metode freeze** akan mematikan proses pembaruan parameter pada matriks bobot dasar, sehingga perhitungan attention tetap beroperasi normal namun tidak akan menyesuaikan diri dengan domain baru kita.",
      "**Opsi metode fine-tune** akan memberikan izin kepada matriks bobot untuk bebas beradaptasi, sehingga sebaran bobot attention bisa mengasah kemampuannya di tugas prediksi yang sedang kita targetkan.",
      "**Prinsip matematika dasar attention** sama sekali tidak akan berubah dari kedua sisi pendekatan ini; yang berbeda murni hanyalah pembaruan persentase matriksnya.",
    ],
    footnote: "Karena itulah, perbedaan antara dua metode adaptasi ini semata-mata adalah seberapa banyak layer dalam yang kita izinkan untuk diperbarui.",
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
    footnote: "Cobalah jalankan grid kombinasi eksperimen penuh di dalam sel instruksi Lab 5b agar Anda bisa meresapi perbedaan marjinal hasil metriknya.",
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
    body: "Modul kita mendukung kebebasan penggunaan teknologi AI untuk menyelesaikan struktur kode sintaks yang melelahkan. Sebagai gantinya, Anda memikul satu kewajiban protokol verifikasi mutlak sesaat sebelum eksekusi keputusan penting.",
    footnote: "Setiap potong kode yang belum bisa Anda bongkar dan jelaskan kepada instruktur Anda, belumlah layak untuk Anda kumpulkan di bawah naungan nama kelompok Anda.",
  },

  // -- 38: Tiga Aturan Verifikasi --
  {
    layout: "bullets",
    title: "Tiga Tahap Aturan Verifikasi Kode Hasil AI",
    body: "Setiap kode implementasi mesin AI harus lulus melewati tiga pos pemeriksaan di bawah ini sebelum Anda mengizinkannya tergabung di dalam repositori utama:",
    bullets: [
      "**Tahap verifikasi ukuran matriks tensor** mengharuskan Anda menyinkronkan apakah susunan arsitektur yang diklaim oleh sang agen cocok dengan ukuran keluarannya.",
      "**Tahap skenario kasus batasan pinggir** memaksa Anda untuk secara spesifik menyerahkan satu baris input asing guna memastikan mesin tidak mengeluarkan log eror yang cacat.",
      "**Tahap evaluasi bedah sintaks menyeluruh** mewajibkan Anda meluangkan waktu memindai deretan logikanya secara perlahan sampai Anda mengerti inti tujuan fungsi utamanya.",
    ],
    footnote: "Disiplin alur verifikasi ketat semacam inilah yang perlahan mengembalikan AI menjadi sekadar pelayan alat automasi di bawah naungan otoritas kontrol Anda.",
  },

  // -- 39: Visualisasi Checklist Verifikasi --
  {
    layout: "image",
    title: "Tiga Pos Pemeriksaan Kode AI",
    imageUrl: "/figures/fig07_verification_checklist.jpg",
    caption: "Visualisasi SOP wajib verifikasi AI: Pos 1 (Cek Dimensi Tensor), Pos 2 (Uji Kasus Batas/Edge Case), dan Pos 3 (Bedah Logika Baris per Baris).",
    footnote: "SOP ini menjaga Anda tetap memegang kendali penuh atas kode riset kelompok.",
  },

  // -- 40: Aturan Sintesis Ganda --
  {
    layout: "bullets",
    title: "Aturan Sintesis Ganda Sebelum Pengambilan Eksekusi",
    body: "Before kita mengaminkan pemilihan arsitektur, parameter, maupun strategi penyelesaian teknis yang krusial, kita diharuskan untuk mengolase minimal dua referensi sumber utama:",
    bullets: [
      "**Menyiapkan dua jendela respons obrolan AI secara terpisah** dengan sudut rumusan prompt yang berbeda agar kita memanen dua buah kacamata pandang teknis yang saling mengoreksi.",
      "**Memadukan tebakan awal mesin kecerdasan dengan satu rujukan resmi** entah itu potongan halaman dokumentasi pustaka software maupun kertas publikasi riset terpercaya.",
      "**Merumuskan sebuah kesimpulan sintesis argumentatif satu paragraf penuh** yang meringkas dasar keyakinan pemilihan strategi tersebut, agar Anda mampu mempertahankannya di sesi akhir.",
    ],
    footnote: "Tulisan sintesis dokumentatif Anda kelak otomatis menjelma menjadi sebuah catatan arsip logis di setiap langkah persimpangan keputusan sulit.",
  },

  // -- 41: Visualisasi Sintesis Ganda --
  {
    layout: "image",
    title: "Pipa Distilasi Sintesis Dua Sumber",
    imageUrl: "/figures/fig07_synthesis_pipeline.jpg",
    caption: "Alur kerja penyaringan kebenaran: Menyandingkan respons dari dua obrolan AI berbeda dengan dokumentasi/paper sains resmi untuk menghasilkan paragraf sintesis argumentatif.",
    footnote: "SOP ini menghentikan bias halusinasi AI dengan tameng sains terpercaya.",
  },

  // -- 42: Alur Peran Integrasi LLM --
  {
    layout: "image",
    title: "Alur Peran Integrasi LLM dalam Kegiatan Riset",
    imageUrl: "/figures/fig05a_llm_workflow.svg",
    caption: "Diagram infografis ini merepresentasikan urutan integrasi LLM yang seimbang di dalam arena riset teknis. LLM difungsikan secara proporsional untuk mengumpulkan tebaran awal ide teknis, lalu dioper kembali sepenuhnya ke pangkuan sang peneliti manusia agar diselidiki melalui verifikasi data, barulah ditutup oleh pelaporan yang beralasan kuat.",
    footnote: "Komponen mesin AI memiliki kapabilitas melampaui produksi kode, yakni mempercepat navigasi telaah riset selama ia disuguhi ruang konteks pemikiran yang solid.",
  },

  // -- 43: AI di Luar Kode --
  {
    layout: "bullets",
    title: "Pendayagunaan Kemampuan AI di Luar Keperluan Kode",
    body: "Jika Anda memahami arahan diagram sebelumnya, Anda bisa mengekstrak kemampuan pemahaman semantik LLM untuk memperlancar pekerjaan intelektual yang lebih menguras tenaga:",
    bullets: [
      "**Pada proses pengamatan literatur paper akademik**, kita sanggup memerintahkan agen AI untuk meringkas paragraf tertentu, lalu menyoroti asumsi cacat penulisnya yang belum disampaikan dengan jernih.",
      "**Pada momen pematangan strategi hipotesis data awal**, kita dibolehkan menginterogasi wawasan AI terkait kerugian teknis ketika memilih arsitektur kuno saat parameter kelas targetnya timpang.",
      "**Pada aktivitas eksplorasi file repositori asing**, kita bisa merangkumkan jalur urutan pemanggilan file direktori di tangkapan layar, agar sang mesin membocorkan titik alur skrip utama si penulis aslinya.",
    ],
    footnote: "Prinsip asasi penggunaan AI adalah memastikan Anda rajin memasoknya dengan porsi latar belakang kondisi data yang mencukupi agar presisinya menguat berlipat-lipat ganda.",
  },

  // -- 44: Pembatas Seksi 3: Adopsi Repo --
  {
    layout: "section",
    title: "3. Adopsi Repo Eksternal",
    body: "Jarang sekali peneliti Machine Learning memulai skrip proyek penelitian dari sebuah layar editor teks kosong yang hampa. Modul Capstone kelak sangat bertumpu pada pondasi repositori open-source milik rekan lain. Laju kepiawaian kerja Anda kelak diuji oleh runutan tahapan Anda membaca folder tersebut.",
    footnote: "Investasi emosional membedah empat jam struktur dokumen asing di muka, secara matematis akan melenyapkan potensi keputusasaan dua minggu pelacakan bug error saat deadline mendekat.",
  },

  // -- 45: Dua Kecepatan Adopsi --
  {
    layout: "bullets",
    title: "Studi Kasus Asisten dan Kontras Dua Rute Eksekusi",
    body: "Coba tinjau kisah dua tenaga asisten ini saat dieksekusi misi menukar encoder ViT di dalam repositori paper orang lain. Mereka mencetak waktu pengerjaan yang bagaikan langit dan bumi:",
    bullets: [
      "**Perilaku asisten pertama sangat tergesa-gesa**, di mana ia buta-buta menekan skrip eksekusi instalasi utamanya, sehingga ia terkapar tenggelam menyelesaikan rantaian eror sistem CUDA hingga separuh siklus minggunya lenyap begitu saja.",
      "**Tindakan asisten kedua condong menahan napas**, dengan mengalokasikan seperempat harinya tanpa menjamah papan tombol ketik kode, murni memelototi halaman README, urutan kerangka fungsi folder, serta melacak kelemahan alur masukan tensor datanya.",
      "**Asisite hasil komparasi buah akhirnya**, si asisten penahan napas tersebut kelak menembus skenario awal smoke test sistemnya di hari kedua untuk kemudian berhasil meluncurkan uji modifikasi penuh secara mulus di sore yang sama.",
    ],
    footnote: "Kemampuan memadatkan durasi pengerjaan yang lebih cepat tujuh kali lipat bukanlah privilese peninggalan bakat lahir, melainkan buah strategi pembacaan yang jernih.",
  },

  // -- 46: Urutan Membaca Repo --
  {
    layout: "image",
    title: "Protokol Hierarki Membaca Repositori: Luar ke Dalam",
    imageUrl: "/figures/fig06a_repo_navigation.svg",
    caption: "Skema pemetaan logis di dalam bagan ini menuntut Anda untuk merintis rutinitas perburuan info repositori melalui tujuh tahap stasiun pemberhentian. Pintu awalnya meninjau target dokumen abstrak awalan, mampir sejenak ke arsitektur direktori folder skrip penjalan eksekusi pertamanya, kemudian ditutup dengan menginvestigasi parameter pengolahan matriks pemuatan file loader utamanya.",
    footnote: "Mengubah hutan skrip asing menjadi denah navigasi rasional inilah yang menjamin kenyamanan pikiran Anda saat sewaktu-waktu harus kembali ke dalam lipatan modul bersangkutan kelak.",
  },

  // -- 47: Tujuh Langkah Membaca --
  {
    layout: "bullets",
    title: "Tujuh Tahap Penaklukan Arsitektur Repo Eksternal",
    body: "Berangkat dari bagan sebelumnya, keseluruhan tujuh tahapan pembacaan repo sebenarnya disatukan ke dalam rincian tiga kategori area kelompok pemahaman utama:",
    bullets: [
      "**Kelompok eksplorasi panduan dan literatur** akan menyetir arah prioritas misi modifikasinya, mencermati peringatan sistemnya, hingga menjamin kelengkapan pustaka komponen utamanya.",
      "**Kelompok eksplorasi taksonomi file dan rute titik masuknya** bertujuan mendiagnosis skrip perantara pintu peluncuran mana yang bakal diakses pertama kali saat sistem dibangkitkan.",
      "**Kelompok bedah organ model beserta file konfigurasi** bakal membongkar ukuran parameter batas matrik masuknya, seraya melacak jangkauan batas eksperimental yang diperkenankan oleh skrip bawaannya.",
    ],
    footnote: "Draf hasil temuan penyelidikan Anda dari ketujuh rute tahapan bedah arsitektur ini nantinya bakal ditulis ulang menggunakan kerangka lampiran C.12 sebagai draf pedoman repo_map.md.",
  },

  // -- 48: Smoke Test Tiga Level --
  {
    layout: "bullets",
    title: "Disiplin Uji Coba Smoke Test Sebelum Eksekusi Penuh",
    body: "Begitu konfigurasi instalasi paket modul selesai divalidasi, jangan pernah nekat menghidupkan eksekusi training skala masif seketika. Selalu lewati tahapan filter W2 smoke test yang bergradasi dari pemeriksaan awal paling efisien ini:",
    bullets: [
      "**Tahapan uji kompilasi impor yang pertama** mengonfirmasi validitas jalur library yang telah termuat. Kejatuhan di level perdana ini murni mengindikasikan kekeliruan infrastruktur persiapan lingkungan.",
      "**Tahapan operasi alur maju lewat data buatan artifisial** difungsikan khusus sebagai pendeteksi kecacatan susunan dimensi antara matriks tensor keluaran hasil perhitungan prediksinya.",
      "**Tahapan isolasi satu langkah hitungan iterasi** bekerja mengoverfit satu kelompok data untuk melatih skrip pelacak kesalahan sebelum mengorbankan siklus masa training delapan jam akibat bug bawaan file setup sederhana.",
    ],
    footnote: "Teknik validasi mengoverfit sebuah kelompok sub-data acak sampai mengikis loss menuju kisaran nol mutlak membuktikan mesin tersebut masih beroperasi secara mendasar tanpa kendala eror.",
  },

  // -- 49: Visualisasi Piramida Smoke Test --
  {
    layout: "image",
    title: "Piramida Uji Coba Gradasi Smoke Test",
    imageUrl: "/figures/fig07_smoke_test_pyramid.jpg",
    caption: "Piramida pengujian: Level 1 (Kompilasi Impor), Level 2 (Alur Maju Tensor Dummy), dan Level 3 (Overfit 1 Batch untuk mengunci saraf optimizer).",
    footnote: "Disiplin melewati piramida ini menyunat drama bug di tengah-tengah masa training berat.",
  },

  // -- 50: Empat Kategori Error --
  {
    layout: "image",
    title: "Pemecahan Empat Wilayah Kuadran Kesalahan Diagnosis",
    imageUrl: "/figures/fig06b_error_categories.svg",
    caption: "Peta diagona visual ini menempatkan hambatan error sistem adopsi repositori asing ke dalam empat kategori kuadran pemicu. Kuadran setup mewakili masalah di lingkungan instalasi library, kuadran data di persoalan asupan variabel preprocessing, kuadran algoritmik dari sisi operasi jalur kerugian hitungan prediksinya, serta kuadran eksperimen akibat dari ketidaksamaan log seed awal.",
    footnote: "Keahlian membedakan akar gejala di awal permasalahan langsung menyunat belasan jam masa terbuang pada jalur investigasi yang keliru.",
  },

  // -- 51: Tanda dan Tes Tiap Kategori --
  {
    layout: "grid",
    title: "Indikasi Ciri dan Validasi Cepat pada Keempat Kuadran",
    body: "With berpedoman pada peta diagnosis sebelumnya, tiap jenis keluarga error menuntut penanganan metode pengecekan mandiri yang spesifik:",
    gridItems: [
      {
        title: "Setup Error",
        body: "Biasa terindikasi ketika sistem melontarkan kalimat gagal impor. Solusi terbijaknya adalah menyamakan nilai dependensi versi perangkat library yang tengah beroperasi di layar terminal.",
      },
      {
        title: "Data Error",
        body: "Ditengarai kuat manakala skor ketepatan prediksi tiba-tiba tembus 90% pada percobaan awal. Siasat verifikasi awalnya bertumpu pada cetakan tangkapan isi matriks gambar ke area layar visual grafisnya.",
      },
      {
        title: "Algorithmic Error",
        body: "Dikenali saat grafik fungsi kurva kerugian model malah diam stagnan tak berkurang. Metode penelusuran eror utamanya yakni terus memompa data iterasi satu batch sub-sampel mini demi memonitor aliran nilai kerugian akhir sistem.",
      },
      {
        title: "Experiment Error",
        body: "Sering ditandai oleh ketidakcocokan nilai capaian hasil replikasi akhirnya. Jalur verifikasinya bergantung secara eksklusif ke dalam pencocokan file parameter konfigurasi eksperimen dengan draf pre-registration miliknya.",
      },
    ],
    footnote: "Temuan akurasi ekstrem yang melejit mencapai 99% tanpa melalui babak penyiksaan iterasi pelatihan dipastikan lahir dari cikal bakal bencana temporal leakage yang telah diajarkan pada sesi evaluasi modul W6 lalu.",
  },

  // -- 52: Modifikasi Minimal --
  {
    layout: "bullets",
    title: "Strategi Implan Modifikasi Skrip Secara Seminimal Mungkin",
    body: "Ketiga poin panduan esensial di bawah ini memagari proses penyisipan fitur pada mesin repositori milik kawan sejawat guna menjaga harmoni skrip aslinya:",
    bullets: [
      "**Manfaatkan argumen penahan default awal** pada pintu modifikasi fungsional untuk mengawal supaya konfigurasi mesin di luar area uji coba Anda masih berputar wajar tanpa hambatan.",
      "**Pisahkan penyusupan berkas baru Anda sepenuhnya** lewat jalur penciptaan draf file skrip terpisah demi meredam kekacauan yang bisa berserakan masuk menyusupi belasan badan struktur skrip utama aslinya.",
      "**Bangun lintasan pengaturan operasi melalui argumen baris terminal langsung** agar tiap opsi fitur sanggup dinyala-matikan bebas tanpa kewajiban membongkar bedah fisik file secara internal dari layar text editor Anda.",
    ],
    footnote: "Penjabaran lebih komprehensif merangkum langkah asimilasi waktu adopsi skrip bisa ditarik langsung sebagai referensi bekal cadangan menghadapi tantangan pengerjaan modul mandiri di Capstone ke depan.",
  },

  // -- 53: Visualisasi Taktik Modifikasi --
  {
    layout: "image",
    title: "Tiga Perisai Kebersihan Modifikasi Kode",
    imageUrl: "/figures/fig07_clean_modification_tactics.jpg",
    caption: "Tiga taktik pengaman modifikasi: (1) Argumen default sebagai bumper, (2) Isolasi berkas mandiri di sisi luar, (3) Kontrol fitur modular lewat command line flags.",
    footnote: "Strategi ini menjamin repositori eksternal tetap bersih dan mudah didebug.",
  },

  // -- 54: Lab W7 --
  {
    layout: "bullets",
    title: "Ketiga Modul Praktik Pengerjaan Hands-on Minggu 7",
    body: "Sajian rangkaian kegiatan pengerjaan aktivitas tiga lab eksekusi yang kita jalani dalam siklus W7 diformulasikan guna membungkus pilar materi teori klasifikasi maupun uji arsitekturnya secara sekaligus:",
    bullets: [
      "**Misi Lab sentimen 5b** menguji kecermatan adaptasi model lewat pengupasan dataset sentimen domestik menggunakan rentetan matriks konfigurasi skema metode frozen menyilang kombinasi fitur sistem rata-rata pollingnya.",
      "**Misi Lab repo asing 6** menjabarkan teknik adopsi direktori luar dengan mewajibkan rutinitas pencatatan draf panduan skema peta letak folder repositori bersangkutan yang dipungkasi oleh perangkaian smoke test tiga babak beruntun.",
      "**Misi Lab bongkar mesin 6b breadth** memaksa kita menyelami perakitan blok sistem inti attention dari skala titik koordinat matriks dasar perhitungan paling telanjang tanpa menumpang sandaran ke perangkat pustaka pembungkus instan mana pun.",
    ],
    footnote: "Kelulusan menyelesaikan implementasi Lab praktik 6b ini otomatis digembok menjadi persyaratan mutlak kompetensi verifikasi dasar sistem Transformer saat babak penghakiman Capstone kelak dimulai.",
  },

  // -- 55: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi Konseptual Mengasah Pisau Nalar",
    body: "Sesampainya Anda di garisan penghujung materi siklus ketujuh ini, ujilah ketahanan pendirian alasan empiris riset Anda dengan menyelesaikan deretan tiga skenario investigasi berikut:",
    bullets: [
      "Jika tangan Anda diserahi sekumpulan korpus medis bahasa domestik super terbatas yang berjumlah hanya dalam batasan kuota 10 ribu rekam rekam catatan saja, varian jenis backbone mesin bahasa manakah yang mutlak Anda daftarkan terlebih dahulu untuk menembus ambang pintu target klasifikasinya?",
      "Ketika perangkat AI pendamping koding Anda tiba-tiba menyuguhkan perombakan sistem pre-proses awalan penonaktifan identitas token [CLS] dari dalam jeroan mesin arsitekturnya secara serampangan, dalam kondisi skenario bagaimanakah blunder tersebut layak lolos toleransi?",
      "Setajam apakah kontras selisih antara pencatatan denah struktur repo asing saat ini jika kemudian Anda harus membedah masuk ke dalam repositori arsitektur penanganan multimodal yang memiliki lebih dari satu jenis sumbu sumber input visual sekaligus kata-kata di fase tugas W9 nanti?",
    ],
    footnote: "Keteguhan merangkum argumen pembelaan Anda atas deret pertanyaan refleksi evaluasi pemahaman ini otomatis akan bersinergi dalam menemani proses pematangan naskah uji coba tesis pada tahap Capstone final esok.",
  },

  // -- 56: Lanjut ke W8 --
  {
    layout: "bullets",
    title: "Pemantik Perjalanan Lanjutan Menuju Bab W8: Foundation Models",
    body: "Ketangkasan Anda mengunci disiplin verifikasi kode AI, menjinakkan perakitan repo asing tak bertuan, hingga kematangan mendiagnosis urat saraf mekanika operasional Transformer telah mendongkrak elevasi kapabilitas kelas arsitektur analitis Anda. Kita bergegas memasuki dimensi modul selanjutnya:",
    bullets: [
      "**Pemaparan pemetaan garis besar ranah Foundation Model** bakal memperluas sudut horison instrumen prediksi kita menembus batasan analisis citra gambar murni, olah deret waktu, gelombang frekuensi suara, serta penggabungan multimodalitas komprehensif gabungannya.",
      "**Struktur pertimbangan kerucut strategi uji adaptasi modelnya** akan menelaah titik tumpu jalan tengah pemecahan adaptasi PEFT melalui teknik spesifik modifikasi irit kapasitas GPU milik LoRA yang akan membelah ujung pertikaian dua kutub sisi metode komputasinya secara menawan.",
      "**Pelatihan telaah identitas kredibilitas literasi dokumen model card** bakal menajamkan pemikiran sensitivitas kritis kita atas parameter asusmi implisit, anomali keterbatasan sampel data, serta beban bias kultural yang diwariskan dari para arsitek penyusun dataset pelatihannya sebelum kelak diunduh untuk difungsikan secara massal.",
    ],
    footnote: "Deretan pilihan parameter opsi tuning dari bab W7 ini otomatis berubah menjelma sebagai salah satu percabangan titik krusial pohon penentuan jalur adopsi fondasi model bahasa berskala masif yang menanti pengerjaannya minggu depan.",
  },

  // -- 57: CTA --
  {
    layout: "cta",
    title: "Saatnya Menjawab Tantangan Eksperimen Eksekusi W7",
    body: "Intisari konseptual rumusan metode frozen fine-tuning, pembongkaran inspeksi sistem bahasa, maupun keberanian mengurai sistem Transformer dari baris sintaks tanpa pengaman, sepenuhnya menunggu sentuhan manual verifikasi tangan Anda. \n\nPersiapkan luang fokus waktu dedikasi pengerjaan Anda di kisaran 5 hingga 7 jam untuk memperlihatkan penguasaan mumpuni Anda.",
    ctaText: "Mulai Tantangan Lab W7 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w7_text_classification.ipynb",
  },
];

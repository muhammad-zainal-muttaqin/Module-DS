import type { SlideSection } from "./index";

export const slides07: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W7: Text, Transformers & Repo Adoption",
    subtitle: "Memahami cara kerja attention, memilih antara freeze dan fine-tune, serta membaca dan memodifikasi repo riset yang belum dikenal.",
    body: "Presentasi ini dirancang sebagai sumber mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 07 - Minggu 7",
  },

  // ── 2: Peta W7 ──
  {
    layout: "section",
    title: "Peta W7",
    body: "W7 menggabungkan tiga tema yang saling memperkuat: teks dengan pretrained Transformer, alat AI sebagai pendukung dengan protokol verifikasi, dan pengantar adopsi repo riset yang belum dikenal.",
    footnote: "Ketiganya bertemu saat mengadopsi repo HuggingFace dengan bantuan alat AI dan membuat repo_map.md.",
  },

  // ── 3: Tiga tema ──
  {
    layout: "grid",
    title: "Tiga Tema yang Bertemu dalam Satu Alur Kerja",
    body: "Ketiga tema W7 bukan topik terpisah, melainkan satu rangkaian keterampilan yang dipakai bersama saat mengadopsi kode riset:",
    gridItems: [
      {
        title: "Text & Transformers",
        body: "Tema ini membahas perjalanan dari TF-IDF ke contextual embeddings, cara kerja attention lewat Query-Key-Value, serta pilihan antara freeze dan fine-tune.",
      },
      {
        title: "Alat AI sebagai Pendukung",
        body: "Tema ini mewajibkan protokol verifikasi kode AI dan sintesis dua sumber sebelum eksekusi, sehingga AI mempercepat kerja tanpa menghilangkan pemahaman.",
      },
      {
        title: "Adopsi Repo",
        body: "Tema ini melatih cara membaca repo yang belum dikenal dengan urutan dari luar ke dalam, lalu memodifikasinya seminimal mungkin tanpa merusak kode orang lain.",
      },
    ],
    footnote: "Kebiasaan riset minggu ini adalah memverifikasi kode AI, memeriksa tokenisasi, dan memetakan repo eksternal.",
  },

  // ── 4: Section Contextual ──
  {
    layout: "section",
    title: "Mengapa Contextual Embeddings",
    body: "TF-IDF adalah baseline yang kuat, cepat, dan interpretable, tetapi punya dua kelemahan fundamental. Contextual embeddings hadir untuk mengatasi keduanya dengan representasi yang bergantung pada konteks.",
    footnote: "TF-IDF menunjukkan kata apa yang ada; contextual embeddings menunjukkan apa yang dimaksud kata itu.",
  },

  // ── 5: Split TF-IDF vs contextual ──
  {
    layout: "split",
    title: "Dua Kelemahan TF-IDF yang Diatasi Attention",
    body: "Kedua kelemahan TF-IDF berasal dari memperlakukan kata sebagai simbol lepas tanpa konteks. Bandingkan keduanya:",
    left: {
      title: "Kelemahan TF-IDF",
      body: "Polisemi tidak tertangani: \"bank sungai\" dan \"bank uang\" mendapat vektor identik.\n\nKetergantungan antar kata hilang: \"tidak buruk\" dan \"tidak baik\" tidak terhubung ke \"baik\" dan \"buruk\", sehingga negasi tidak dipahami.",
    },
    right: {
      title: "Contextual Embeddings",
      body: "Model seperti BERT dan IndoBERT menghasilkan representasi berbeda untuk kata sama tergantung konteksnya.\n\nSetiap token mendapat embedding yang dipengaruhi seluruh sequence di sekitarnya lewat self-attention.",
    },
    footnote: "Transformers mengubah teks bukan menjadi fitur, melainkan menjadi makna yang bisa dibandingkan.",
  },

  // ── 6: Bullets transfer ──
  {
    layout: "bullets",
    title: "Mengapa Model Teks Umum Membantu Tugas Spesifik",
    body: "Model yang dilatih pada miliaran token Wikipedia bisa membantu sentimen Indonesia karena struktur lapisannya membagi pengetahuan secara bertingkat:",
    bullets: [
      "**Layer awal** mempelajari pola umum lintas domain seperti semantik subkata, sintaksis dasar subjek-verba, dan cara negasi mengubah makna.",
      "**Layer dalam** baru mempelajari hal yang lebih spesifik domain, sehingga adaptasi terbesar terjadi di bagian akhir model.",
      "**Saat memuat bobot pretrained**, layer awal sudah paham bahasa, dan tugas Anda tinggal melatih layer akhir agar memetakan pemahaman itu ke label.",
    ],
    footnote: "Pembagian ini juga mendasari pilihan freeze vs fine-tune: seberapa banyak lapisan yang perlu beradaptasi?",
  },

  // ── 7: Section Tokenization ──
  {
    layout: "section",
    title: "Tokenization: Sebelum Pelatihan Dimulai",
    body: "Pretrained Transformer tidak melihat string mentah, melainkan urutan integer. Tokenizer adalah fungsi yang memetakan string ke urutan integer dan sebaliknya, dan setiap model punya tokenizer spesifik.",
    footnote: "Bug paling umum memakai pretrained model adalah ketidakcocokan antara tokenizer model dan cara teks diproses.",
  },

  // ── 8: Bullets tiga gaya ──
  {
    layout: "bullets",
    title: "Tiga Gaya Tokenisasi",
    body: "Ketiga gaya berbeda pada trade-off antara ukuran vocab dan panjang sequence yang dihasilkan:",
    bullets: [
      "**Word-level** memetakan satu token per kata, sederhana tetapi membuat vocab besar dan rentan out-of-vocabulary untuk kata baru.",
      "**Character-level** memetakan satu token per karakter, sehingga vocab kecil tetapi sequence menjadi sangat panjang.",
      "**Subword** mengambil jalan tengah dengan menjadikan kata umum satu token dan memecah kata jarang menjadi sub-unit - inilah yang dipakai BERT, GPT, dan IndoBERT.",
    ],
    footnote: "Kata \"tertangkap\" mungkin terpecah menjadi [\"ter\", \"tangkap\"], sedangkan \"tidak\" tetap satu token.",
  },

  // ── 9: Code tokenizer ──
  {
    layout: "code",
    title: "Menginspeksi Tokenizer Sebelum Melatih",
    body: "Sebelum pelatihan, periksa apa yang dilakukan tokenizer pada teks Anda dengan mengubah ID token kembali menjadi token:",
    lang: "python",
    code: `from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained(
    "indobenchmark/indobert-base-p1")

text = "Produk ini sangat bagus!"
ids = tok(text, return_tensors="pt")["input_ids"][0]
print(tok.convert_ids_to_tokens(ids))
# ['[CLS]','produk','ini','sangat','bagus','!','[SEP]']`,
    footnote: "Token spesial [CLS] dan [SEP] ditambahkan otomatis oleh tokenizer keluarga BERT.",
  },

  // ── 10: Bullets tugas inspeksi ──
  {
    layout: "bullets",
    title: "Tiga Hal yang Diperiksa saat Inspeksi Tokenizer",
    body: "Inspeksi 5 sampai 10 sampel dari dataset Anda sebelum pelatihan menjawab tiga pertanyaan penting:",
    bullets: [
      "**Kata domain-spesifik** perlu dicek apakah ditokenisasi dengan benar dan tidak terpecah berlebihan menjadi banyak sub-unit.",
      "**Panjang sequence** setelah tokenisasi perlu dipastikan masih masuk dalam batas max_length model.",
      "**Subword splits** perlu diperiksa apakah ada pemecahan yang berpotensi menghilangkan makna penting.",
    ],
    footnote: "Memakai tokenizer yang salah menghasilkan input yang tidak cocok dengan apa yang dilihat model saat pretraining.",
  },

  // ── 11: Section Attention ──
  {
    layout: "section",
    title: "Cara Kerja Attention",
    body: "Pada W5, RNN kesulitan dengan sequence panjang karena bottleneck informasi: seluruh makna token sebelumnya harus dipadatkan ke satu hidden state berukuran tetap. Attention menghilangkan bottleneck itu sepenuhnya.",
    footnote: "Setiap token dapat membaca dari semua token lain dalam satu langkah, dibobot berdasarkan relevansinya.",
  },

  // ── 12: Bullets QKV ──
  {
    layout: "bullets",
    title: "Query, Key, Value: Tiga Peran Setiap Token",
    body: "Untuk menghitung bobot relevansi, setiap token diproyeksikan menjadi tiga vektor dengan peran berbeda:",
    bullets: [
      "**Query** menyatakan \"apa yang saya cari?\", dan skor relevansi dihitung dari dot product Query satu token dengan Key token lain.",
      "**Key** menyatakan \"apa yang saya miliki?\", sehingga dot product yang besar antara Query dan Key berarti kecocokan yang kuat.",
      "**Value** menyatakan \"apa yang sebenarnya saya berikan?\", dan output adalah rata-rata berbobot dari semua Value.",
    ],
    footnote: "Proyeksi ini dihasilkan tiga matriks bobot W_Q, W_K, W_V yang dipelajari dan disimpan ke checkpoint.",
  },

  // ── 13: Image attention ──
  {
    layout: "image",
    title: "Scaled Dot-Product Attention",
    imageUrl: "/figures/fig06a_attention_sdp.png",
    caption: "Gambar ini menunjukkan alur perhitungan scaled dot-product attention: Query dan Key dikalikan menghasilkan matriks skor, skor dibagi akar dimensi lalu dilewatkan softmax menjadi bobot, dan bobot dikalikan Value menghasilkan output. Setiap baris matriks bobot adalah distribusi probabilitas yang menunjukkan seberapa besar satu token memperhatikan token lain.",
    footnote: "Lab 6b menugaskan Anda menerapkan scaled_dot_product_attention dari nol dan memverifikasinya.",
  },

  // ── 14: Bullets formula ──
  {
    layout: "bullets",
    title: "Membaca Rumus Attention",
    body: "Dari gambar tersebut, rumus Attention(Q,K,V) = softmax(QK^T / akar d_k) V terdiri dari tiga operasi yang berurutan:",
    bullets: [
      "**QK^T** menghasilkan matriks T kali T berisi semua skor berpasangan antar token dalam sequence sepanjang T.",
      "**Pembagian dengan akar d_k** mencegah dot product membesar dan mendorong softmax ke titik jenuh yang mematikan gradient - bentuk baru dari vanishing gradient.",
      "**Softmax lalu kali V** mengubah tiap baris menjadi distribusi probabilitas, lalu menghasilkan rata-rata berbobot dari semua vektor Value.",
    ],
    footnote: "Pembagian dengan akar d_k bersifat wajib, bukan opsional, agar gradient tetap mengalir saat dimensi besar.",
  },

  // ── 15: Code attention ──
  {
    layout: "code",
    title: "Attention Tanpa Abstraksi Library",
    body: "Tanpa abstraksi library, attention hanyalah beberapa operasi matriks yang bisa ditulis dalam beberapa baris:",
    lang: "python",
    code: `X = torch.randn(5, 16)              # 5 token, 16-dim
W_Q, W_K, W_V = (torch.randn(16, 16) for _ in range(3))

Q, K, V = X @ W_Q, X @ W_K, X @ W_V
scores  = Q @ K.T / Q.shape[-1] ** 0.5   # (5, 5)
weights = F.softmax(scores, dim=-1)      # tiap baris = 1
output  = weights @ V                    # (5, 16)`,
    footnote: "Output berdimensi sama dengan input, itulah sebabnya blok ini bisa ditumpuk berkali-kali.",
  },

  // ── 16: Code transformer block ──
  {
    layout: "code",
    title: "Posisi Attention dalam Blok Transformer",
    body: "Attention hanyalah satu komponen di dalam blok Transformer, yang menjaga dimensi input dan output tetap sama:",
    lang: "text",
    code: `Input (T, d_model)
  -> LayerNorm
  -> Self-Attention   # satu-satunya tempat token berinteraksi
  -> Residual Add     # skip connection, seperti di ResNet
  -> LayerNorm
  -> Feed-Forward     # dua linear, mandiri per token
  -> Residual Add
Output (T, d_model)`,
    footnote: "Layer feed-forward tidak mencampur token; hanya layer attention yang melakukannya.",
  },

  // ── 17: Bullets multi-head + positional ──
  {
    layout: "bullets",
    title: "Multi-Head Attention dan Positional Encoding",
    body: "Dua mekanisme melengkapi attention dasar agar model menangkap banyak pola dan mengetahui urutan:",
    bullets: [
      "**Multi-head attention** menjalankan attention paralel sebanyak h kali pada subruang berdimensi lebih rendah, sehingga tiap head dapat menangkap pola struktural berbeda.",
      "**Positional encoding** menambahkan vektor yang bergantung posisi ke setiap token embedding, karena attention sendiri tidak punya konsep urutan.",
      "**Tanpa positional encoding**, \"anjing menggigit orang\" dan \"orang menggigit anjing\" menghasilkan input attention yang identik.",
    ],
    footnote: "Saat satu sequence memperhatikan sequence lain, prosesnya disebut cross-attention dan dipakai di W9.",
  },

  // ── 18: Bullets freeze dampak ──
  {
    layout: "bullets",
    title: "Dampak Freeze dan Fine-tune pada Matriks Attention",
    body: "Pilihan freeze atau fine-tune sebenarnya adalah keputusan tentang apakah matriks proyeksi attention boleh berubah:",
    bullets: [
      "**Freeze** mengunci W_Q, W_K, dan W_V, sehingga kalkulasi attention tetap berjalan tetapi tidak bisa beradaptasi dengan domain Anda.",
      "**Fine-tune** memungkinkan matriks-matriks ini beradaptasi agar bobot attention menangkap hubungan yang dibutuhkan tugas Anda.",
      "**Matematika attention tidak pernah berubah** dalam kedua kasus - yang berubah hanya matriks proyeksinya.",
    ],
    footnote: "Karena itu, freeze vs fine-tune adalah keputusan tentang berapa banyak lapisan yang perlu beradaptasi.",
  },

  // ── 19: Section Frozen vs Fine-tune ──
  {
    layout: "section",
    title: "Frozen vs Fine-tuned: Eksperimen 2x2",
    body: "Dua keputusan perlu dibandingkan: apakah backbone di-freeze atau di-fine-tune, dan apakah pooling memakai token [CLS] atau rata-rata semua token. Lab 5b menjalankan keduanya sebagai grid 2x2.",
    footnote: "Pilihan ini menentukan biaya komputasi sekaligus performa akhir pada dataset Anda.",
  },

  // ── 20: Split frozen vs fine-tune ──
  {
    layout: "split",
    title: "Frozen vs Fine-tune: Biaya dan Performa",
    body: "Contoh konkret pada IndoBERT-base dengan dataset SmSA sekitar 12 ribu sampel di GPU T4 menunjukkan trade-off-nya:",
    left: {
      title: "Frozen + Linear Head",
      body: "Training hanya 2-3 menit untuk 1 epoch, dengan val macro-F1 sekitar 0.78-0.82.\n\nHemat komputasi dan stabil, cocok untuk dataset kecil di bawah 5 ribu sampel atau prototype cepat.",
    },
    right: {
      title: "Fine-tune Full",
      body: "Training 15-25 menit untuk 3 epoch, dengan val macro-F1 sekitar 0.85-0.89.\n\nMemori GPU 3-4 kali lebih besar, cocok untuk dataset di atas 20 ribu atau saat butuh 3-5% performa terakhir.",
    },
    footnote: "PEFT seperti LoRA yang dibahas di W8 menjadi jalan tengah antara kedua ekstrem ini.",
  },

  // ── 21: Split CLS vs mean pool ──
  {
    layout: "split",
    title: "[CLS] Pooling vs Mean Pooling",
    body: "Setelah backbone menghasilkan embedding per token, satu vektor ringkasan perlu dipilih untuk classification head. Dua cara umum bekerja berbeda:",
    left: {
      title: "[CLS] Pooling",
      body: "Memakai token [CLS] di awal sebagai representasi seluruh sequence.\n\nSelama pretraining, model belajar menaruh ringkasan global di posisi ini, sehingga [CLS] menjadi pilihan natural untuk classification.",
    },
    right: {
      title: "Mean Pooling",
      body: "Mengambil rata-rata embedding semua token kecuali padding.\n\nSering lebih robust untuk sentence similarity karena tidak berat sebelah ke satu posisi, tetapi bisa kehilangan ketegasan jika hanya sebagian token relevan.",
    },
    footnote: "Untuk klasifikasi, [CLS] dan mean pool biasanya berbeda 1-3 poin F1; pemenangnya bergantung dataset.",
  },

  // ── 22: Section AI ──
  {
    layout: "section",
    title: "Alat AI sebagai Pendukung",
    body: "Modul ini tidak melarang AI coding tools, tetapi mewajibkan protokol verifikasi dan sintesis sebelum eksekusi. Tujuannya adalah mempercepat kerja tanpa kehilangan pemahaman atas kode sendiri.",
    footnote: "Kode yang tidak bisa Anda jelaskan bukan kode yang layak dikumpulkan dengan nama Anda.",
  },

  // ── 23: Bullets verifikasi ──
  {
    layout: "bullets",
    title: "Tiga Aturan Verifikasi Kode AI",
    body: "Setiap kode yang dihasilkan AI harus melewati tiga pemeriksaan sebelum dipakai:",
    bullets: [
      "**Verifikasi bentuk tensor** memastikan input dan output shape yang diklaim benar-benar cocok dengan kode.",
      "**Uji kasus tepi** menjalankan kode dengan satu sampel lalu memeriksa hasilnya secara manual.",
      "**Baca baris per baris** memastikan Anda bisa menjelaskan fungsi setiap baris - jika tidak bisa setelah dua kali baca, kode itu belum layak dipakai.",
    ],
    footnote: "Verifikasi ini mengubah AI dari sumber jawaban menjadi alat yang tetap di bawah kendali Anda.",
  },

  // ── 24: Bullets sintesis ──
  {
    layout: "bullets",
    title: "Aturan Sintesis: Dua Sumber Sebelum Eksekusi",
    body: "Sebelum mengeksekusi pendekatan penting seperti pemilihan model atau strategi fine-tuning, kumpulkan setidaknya dua sumber berbeda:",
    bullets: [
      "**Dua respons AI dengan prompt berbeda** memberi dua sudut pandang yang bisa dibandingkan sebelum memutuskan.",
      "**Satu respons AI ditambah dokumentasi atau paper** memadukan saran cepat dengan rujukan yang lebih otoritatif.",
      "**Satu paragraf sintesis** merangkum: sumber A menyarankan X karena P, sumber B menyarankan Y karena Q, dan saya memilih Z karena R.",
    ],
    footnote: "Paragraf sintesis bukan overhead, melainkan bukti Anda berpikir sebelum eksekusi.",
  },

  // ── 25: Image LLM workflow ──
  {
    layout: "image",
    title: "Alur Kerja LLM dalam Riset",
    imageUrl: "/figures/fig05a_llm_workflow.svg",
    caption: "Gambar ini menunjukkan alur kerja memakai LLM dalam riset ML: sintesis dari beberapa sumber, verifikasi terhadap kode dan data, lalu dokumentasi keputusan beserta alasannya. Alur ini menempatkan LLM sebagai pendukung di dalam siklus yang tetap dikendalikan oleh peneliti.",
    footnote: "Alat AI juga berguna di luar kode, untuk membaca paper, mendiskusikan hipotesis, dan menavigasi repo.",
  },

  // ── 26: Bullets AI non-kode ──
  {
    layout: "bullets",
    title: "AI untuk Tugas di Luar Kode",
    body: "Dari gambar tersebut, alat AI berguna melampaui penulisan kode lewat prompt yang spesifik dan beri konteks:",
    bullets: [
      "**Saat membaca paper**, minta AI merangkum satu sub-bagian dan mengidentifikasi asumsi yang tidak diucapkan eksplisit.",
      "**Saat mendiskusikan hipotesis**, tanyakan apakah ada alasan untuk tidak memakai sebuah teknik pada kondisi data tertentu.",
      "**Saat menavigasi repo**, tanyakan alur data dari DataLoader ke model sambil memberikan struktur folder sebagai konteks.",
    ],
    footnote: "Memberi konteks yang cukup membuat jawaban AI jauh lebih akurat dan bisa diverifikasi.",
  },

  // ── 27: Section Adopsi Repo ──
  {
    layout: "section",
    title: "Adopsi Repo: Membaca Sebelum Menjalankan",
    body: "Seorang asisten menghabiskan dua minggu hanya untuk membuat repo orang lain berjalan, sementara asisten kedua menyelesaikannya dalam beberapa hari. Perbedaan tujuh kali lipat ini bukan soal bakat.",
    footnote: "Perbedaannya adalah strategi membaca repo sebelum menjalankan apapun.",
  },

  // ── 28: Bullets dua asisten ──
  {
    layout: "bullets",
    title: "Dua Pendekatan, Dua Hasil yang Sangat Berbeda",
    body: "Cerita dua asisten dengan tugas identik menunjukkan dampak strategi membaca terhadap kecepatan:",
    bullets: [
      "**Asisten pertama langsung menjalankan**, lalu menghabiskan tiga hari bergulat dengan error dependency dan dua minggu sebelum modifikasi pertama bisa dicoba.",
      "**Asisten kedua membaca empat jam dulu** tanpa menjalankan apapun: README, struktur folder, entry point, dan cara data dimuat.",
      "**Setelah peta terbentuk**, asisten kedua setup secara sistematis, menjalankan smoke test, dan mencoba modifikasi dalam dua hari.",
    ],
    footnote: "Tahan godaan untuk langsung menjalankan; baca dulu dengan urutan yang dipikirkan.",
  },

  // ── 29: Image repo navigation ──
  {
    layout: "image",
    title: "Urutan Membaca Repo: dari Luar ke Dalam",
    imageUrl: "/figures/fig06a_repo_navigation.svg",
    caption: "Gambar ini menunjukkan tujuh langkah membaca repo riset secara berurutan dari luar ke dalam: README, paper terkait, struktur folder, entry point, model dan loss, data loader, lalu config. Setiap langkah membangun pemahaman yang dipakai langkah berikutnya, dan seluruhnya selesai dalam 30-60 menit sebelum perintah install pertama.",
    footnote: "Membaca dengan urutan ini mengubah repo asing menjadi peta yang bisa dirujuk berulang.",
  },

  // ── 30: Bullets urutan baca ──
  {
    layout: "bullets",
    title: "Tujuh Langkah Membaca yang Membangun Peta",
    body: "Dari gambar tersebut, ketujuh langkah dikelompokkan menjadi tiga fase yang makin mendalam:",
    bullets: [
      "**README dan paper** memberi tujuan, cara install, dan apa yang harus ada di kode seperti arsitektur, loss, dan dataset utama.",
      "**Struktur folder dan entry point** menunjukkan tata letak kode dan file yang dijalankan user pertama kali seperti train.py.",
      "**Model, data loader, dan config** mengungkap input-output utama, format data yang diharapkan, dan rentang eksperimen yang didukung.",
    ],
    footnote: "Hasil pembacaan ini dirangkum dalam repo_map.md memakai template di Lampiran C.12.",
  },

  // ── 31: Section Smoke Test ──
  {
    layout: "section",
    title: "Smoke Test Sebelum Pelatihan Penuh",
    body: "Setelah environment terpasang, jangan langsung training dengan dataset penuh. Jalankan smoke test berjenjang yang memverifikasi seluruh pipeline berjalan tanpa error dalam hitungan detik.",
    footnote: "Training penuh 8 jam yang gagal di menit ke-10 karena bug dimensi adalah delapan jam yang hilang.",
  },

  // ── 32: Bullets tiga level ──
  {
    layout: "bullets",
    title: "Tiga Level Smoke Test",
    body: "Ketiga level naik dari pemeriksaan termurah ke yang paling menyeluruh, masing-masing menangkap kategori bug berbeda:",
    bullets: [
      "**Level 1 import test** memastikan dependency dan path benar - jika gagal di sini, masalahnya bukan logika.",
      "**Level 2 forward pass dummy** menjalankan satu batch acak dan memeriksa shape output, sehingga menangkap bug dimensi.",
      "**Level 3 satu iterasi training** menjalankan satu forward, backward, dan step, lalu keluar - menangkap sekitar 80% bug setup dalam 30 detik.",
    ],
    footnote: "Overfit one batch lebih kuat: jalankan training pada 4 sampel sampai loss mendekati nol untuk membuktikan tidak ada bug fundamental.",
  },

  // ── 33: Bullets modifikasi minimal ──
  {
    layout: "bullets",
    title: "Modifikasi Seminimal Mungkin",
    body: "Saat menambah fitur ke repo orang lain, pilih pola yang tidak mengganggu kode asli agar pekerjaan mudah dibalik dan di-review:",
    bullets: [
      "**Tambahkan opsi, jangan ubah default** dengan menambah argumen berdefault yang mempertahankan perilaku lama.",
      "**Tambahkan file baru** seperti losses.py daripada menyebar perubahan ke banyak file lama.",
      "**Expose lewat CLI dan commit kecil** sehingga fitur bisa dimatikan tanpa menyentuh kode dan tiap perubahan logis mudah ditelusuri.",
    ],
    footnote: "Modifikasi minimal memudahkan merge ulang, revert bersih, dan review pull request.",
  },

  // ── 34: Section Kategori Error ──
  {
    layout: "section",
    title: "Empat Kategori Error",
    body: "Ketika adopsi repo gagal, respons \"coba-coba sampai ketemu\" tidak efisien. Lebih cepat mengidentifikasi kategori error dulu, karena tiap kategori punya diagnosis yang berbeda.",
    footnote: "Mengenali kategori mengubah debugging acak menjadi pemeriksaan yang terarah.",
  },

  // ── 35: Image error categories ──
  {
    layout: "image",
    title: "Empat Kuadran Diagnosis Error",
    imageUrl: "/figures/fig06b_error_categories.svg",
    caption: "Gambar ini membagi error adopsi repo menjadi empat kategori dalam satu kuadran diagnosis: Setup error di environment dan dependency, Data error di dataset dan preprocessing, Algorithmic error di forward pass dan loss, serta Experiment error di konfigurasi dan reproduksibilitas. Setiap kuadran punya tanda khas dan langkah uji cepat sendiri.",
    footnote: "Mencocokkan gejala ke kuadran yang tepat memangkas waktu diagnosis secara signifikan.",
  },

  // ── 36: Grid kategori error ──
  {
    layout: "grid",
    title: "Tanda dan Tes Cepat Tiap Kategori",
    body: "Dari gambar tersebut, keempat kategori dipisahkan oleh gejala dan tes cepatnya:",
    gridItems: [
      {
        title: "Setup Error",
        body: "Ditandai ImportError, ModuleNotFoundError, atau CUDA mismatch. Tes cepatnya membandingkan output pip freeze dengan requirements.txt dan mengecek path dataset di config.",
      },
      {
        title: "Data Error",
        body: "Ditandai error di DataLoader atau akurasi terlalu tinggi sejak awal. Tes cepatnya mencetak shape dan range batch pertama lalu memvisualisasikan beberapa sampel.",
      },
      {
        title: "Algorithmic Error",
        body: "Ditandai loss tidak turun, NaN, atau prediksi selalu kelas sama. Tes cepatnya overfit one batch pada 4 sampel - jika loss tidak mendekati nol, ada bug di model atau loss.",
      },
      {
        title: "Experiment Error",
        body: "Ditandai hasil tidak bisa direproduksi atau metrik berbeda dari pre-registration. Tes cepatnya membandingkan config YAML yang dipakai dengan pre-reg dan mengecek commit hash di checkpoint.",
      },
    ],
    footnote: "Gejala \"akurasi 99% tanpa training\" hampir selalu mengarah ke Data error berupa leakage.",
  },

  // ── 37: Bullets Lab W7 ──
  {
    layout: "bullets",
    title: "Lab W7: Teks, Repo, dan Transformer dari Nol",
    body: "Tiga lab minggu ini melatih ketiga tema sekaligus, dari klasifikasi teks sampai membangun Transformer dari nol:",
    bullets: [
      "**Lab 5b** memuat dataset sentimen IndoNLU, menginspeksi tokenizer IndoBERT, dan menjalankan grid 2x2 frozen/fine-tune kali [CLS]/mean-pool.",
      "**Lab 6** mengadopsi repo eksternal: menulis repo_map.md, menjalankan smoke test tiga level, dan menambah satu fitur seminimal mungkin.",
      "**Lab 6b breadth** menulis scaled dot-product attention dari nol dan memverifikasinya terhadap nn.TransformerEncoderLayer untuk Breadth Check Transformer.",
    ],
    footnote: "Lab 6b wajib untuk memenuhi Breadth Check keluarga Transformer sebelum capstone.",
  },

  // ── 38: Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum lanjut ke W8, renungkan tiga pertanyaan yang menghubungkan minggu ini dengan keputusan riset Anda:",
    bullets: [
      "Untuk dataset teks medis Indonesia dengan 10 ribu sampel dan 5 kelas, IndoBERT atau BioBERT yang Anda coba pertama, dan apa justifikasinya?",
      "Saat AI memberi kode tokenisasi yang menghilangkan token [CLS] sebelum pooling, apakah ini selalu salah, dan kapan bisa diterima?",
      "Seberapa berbeda repo_map.md yang Anda tulis di W7 dari yang akan Anda tulis di W9 saat ada lebih dari satu modalitas?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - ketiganya kembali relevan saat mengadopsi repo capstone.",
  },

  // ── 39: Lanjut W8 ──
  {
    layout: "bullets",
    title: "Lanjut ke W8: Foundation Models",
    body: "Dengan W7 selesai, Anda bisa memakai pretrained Transformer, mengadopsi repo asing, dan memakai alat AI secara bertanggung jawab. W8 memperluas pemahaman ke lanskap foundation model:",
    bullets: [
      "**Taksonomi foundation model** mencakup bukan hanya teks, tetapi juga vision, audio, time series, dan multimodal.",
      "**Strategi adaptasi** dari freeze dan fine-tune diperluas dengan PEFT seperti LoRA sebagai jalan tengah.",
      "**Model card literacy** melatih membaca asumsi, batasan, dan bias model sebelum memakainya.",
    ],
    footnote: "Pilihan freeze vs fine-tune dari W7 menjadi satu cabang dari pohon keputusan adaptasi yang lebih lengkap di W8.",
  },

  // ── 40: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W7",
    body: "Semua konsep di presentasi ini ada dalam lab notebook lengkap: klasifikasi teks IndoNLU dengan grid 2x2, inspeksi tokenizer, adopsi repo eksternal, dan Transformer-mini dari nol.\n\nEstimasi waktu: 5-7 jam termasuk eksperimen 2x2 dan implementasi attention.",
    ctaText: "Buka Lab W7 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w7_text_classification.ipynb",
  },
];

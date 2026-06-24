import type { SlideSection } from "./index";

export const slides07: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W7: Text, Transformers & Repo Adoption",
    subtitle: "Memakai pretrained Transformer untuk teks, memverifikasi kode dari alat AI, dan membaca lalu memodifikasi repo riset orang lain.",
    footnote: "Bab 07 - Minggu 7",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Tiga materi minggu ini punya satu benang merah: memakai hasil kerja yang sudah ada, bukan membangun semuanya dari nol.",
    gridItems: [
      {
        title: "1. Teks dengan Pretrained Transformer",
        body: "Kita belajar dari TF-IDF ke contextual embeddings, tokenization, cara kerja attention lewat Query-Key-Value, lalu pilihan freeze vs fine-tune.",
      },
      {
        title: "2. Alat AI untuk Riset",
        body: "Kita memakai protokol verifikasi kode AI dan sintesis dua sumber sebelum eksekusi, supaya AI mempercepat kerja tanpa menghilangkan pemahaman.",
      },
      {
        title: "3. Adopsi Repo Eksternal",
        body: "Kita membaca repo yang belum dikenal dari luar ke dalam, menjalankan smoke test, lalu memodifikasinya seminimal mungkin tanpa merusak kode asli.",
      },
    ],
    footnote: "Ketiganya bertemu saat mengadopsi repo HuggingFace dengan bantuan alat AI dan menulis repo_map.md.",
  },

  // -- 3: Recap W6 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W6)",
    body: "W6 mengajarkan cara menilai representasi dan menjaga data tetap bersih. Outputnya dipakai lagi minggu ini:",
    bullets: [
      "Kita membandingkan tiga strategi representasi dan menilai mana yang lebih berguna untuk sebuah tugas.",
      "Kita mendeteksi temporal leakage lewat audit data, dengan akurasi turun dari 0.92 ke 0.63 setelah pipeline diperbaiki.",
      "Bottleneck RNN dan gradient flow dari W5 dipakai lagi untuk menjelaskan mengapa attention dibutuhkan.",
    ],
    footnote: "Audit data W6 kembali dipakai minggu ini untuk mendeteksi leakage di repo orang lain.",
  },

  // -- 4: Materi 1 --
  {
    layout: "section",
    title: "1. Teks dengan Pretrained Transformer",
    body: "TF-IDF cepat dan interpretable, tetapi punya dua kelemahan karena memperlakukan kata sebagai simbol lepas tanpa konteks. Contextual embeddings mengatasi keduanya dengan representasi yang bergantung pada konteks.",
    footnote: "TF-IDF menunjukkan kata apa yang ada; contextual embeddings menunjukkan apa yang dimaksud kata itu.",
  },

  // -- 5: Dua kelemahan TF-IDF --
  {
    layout: "split",
    title: "Dua Kelemahan TF-IDF yang Diatasi Attention",
    body: "Kedua kelemahan TF-IDF berasal dari mengabaikan konteks di sekitar kata. Contextual embeddings memperbaiki keduanya:",
    left: {
      title: "Kelemahan TF-IDF",
      body: "Polisemi tidak tertangani: \"bank sungai\" dan \"bank uang\" mendapat vektor yang identik.\n\nKetergantungan antar kata hilang: \"tidak buruk\" dan \"tidak baik\" tidak terhubung ke \"baik\" dan \"buruk\", sehingga negasi tidak dipahami.",
    },
    right: {
      title: "Contextual Embeddings",
      body: "Model seperti BERT dan IndoBERT menghasilkan representasi yang berbeda untuk kata yang sama tergantung konteksnya.\n\nSetiap token mendapat embedding yang dipengaruhi seluruh sequence di sekitarnya lewat self-attention.",
    },
    footnote: "Pola umum bahasa membuat model teks Wikipedia tetap membantu sentimen Indonesia.",
  },

  // -- 6: Mengapa model umum membantu tugas spesifik --
  {
    layout: "bullets",
    title: "Mengapa Model Teks Umum Membantu Tugas Spesifik",
    body: "Model yang dilatih pada miliaran token Wikipedia bisa membantu sentimen Indonesia karena lapisannya membagi pengetahuan secara bertingkat:",
    bullets: [
      "**Layer awal** mempelajari pola umum lintas domain seperti semantik subkata, sintaksis subjek-verba, dan cara negasi mengubah makna.",
      "**Layer dalam** baru mempelajari hal yang lebih spesifik domain, sehingga adaptasi terbesar terjadi di bagian akhir model.",
      "**Saat memuat bobot pretrained**, layer awal sudah menguasai struktur bahasa, dan tugas Anda tinggal melatih layer akhir agar memetakan ke label.",
    ],
    footnote: "Pembagian ini juga mendasari pilihan freeze vs fine-tune: seberapa banyak lapisan yang perlu beradaptasi.",
  },

  // -- 7: Tokenization --
  {
    layout: "bullets",
    title: "Tokenization: Tiga Gaya, Satu Trade-off",
    body: "Pretrained Transformer melihat urutan integer, bukan string mentah. Tokenizer memetakan keduanya, dan tiga gayanya berbeda pada ukuran vocab dan panjang sequence:",
    bullets: [
      "**Word-level** memetakan satu token per kata, sederhana tetapi membuat vocab besar dan rentan out-of-vocabulary untuk kata baru.",
      "**Character-level** memetakan satu token per karakter, sehingga vocab kecil tetapi sequence menjadi sangat panjang.",
      "**Subword** menjadikan kata umum satu token dan memecah kata jarang menjadi sub-unit - inilah yang dipakai BERT, GPT, dan IndoBERT.",
    ],
    footnote: "Kata \"tertangkap\" mungkin terpecah menjadi [\"ter\", \"tangkap\"], sedangkan \"tidak\" tetap satu token.",
  },

  // -- 8: Inspeksi tokenizer (code) --
  {
    layout: "code",
    title: "Inspeksi Tokenizer Sebelum Melatih",
    body: "Sebelum pelatihan, periksa apa yang dilakukan tokenizer pada teks Anda dengan mengubah ID token kembali menjadi token:",
    lang: "python",
    code: `from transformers import AutoTokenizer

tok = AutoTokenizer.from_pretrained(
    "indobenchmark/indobert-base-p1")

text = "Produk ini sangat bagus!"
ids = tok(text, return_tensors="pt")["input_ids"][0]
print(tok.convert_ids_to_tokens(ids))
# ['[CLS]','produk','ini','sangat','bagus','!','[SEP]']`,
    footnote: "Bug paling umum memakai pretrained model adalah ketidakcocokan antara tokenizer model dan cara teks diproses.",
  },

  // -- 9: Cara kerja attention (transisi dari W5) --
  {
    layout: "section",
    title: "Cara Kerja Attention",
    body: "Pada W5, RNN kesulitan dengan sequence panjang karena bottleneck informasi: seluruh makna token sebelumnya harus dipadatkan ke satu hidden state berukuran tetap. Attention menghilangkan bottleneck itu sepenuhnya.",
    footnote: "Setiap token dapat membaca dari semua token lain dalam satu langkah, dibobot berdasarkan relevansinya.",
  },

  // -- 10: Query, Key, Value --
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

  // -- 11: Image SDP attention (before its explanation) --
  {
    layout: "image",
    title: "Scaled Dot-Product Attention",
    imageUrl: "/figures/fig06a_attention_sdp.png",
    caption: "Gambar ini menunjukkan alur scaled dot-product attention: Query dan Key dikalikan menjadi matriks skor, skor dibagi akar dimensi lalu dilewatkan softmax menjadi bobot, dan bobot dikalikan Value menghasilkan output. Setiap baris matriks bobot adalah distribusi probabilitas yang menunjukkan seberapa besar satu token memperhatikan token lain.",
    footnote: "Lab 6b menugaskan Anda menerapkan scaled_dot_product_attention dari nol dan memverifikasinya.",
  },

  // -- 12: Membaca rumus attention --
  {
    layout: "bullets",
    title: "Membaca Rumus Attention",
    body: "Dari gambar tersebut, rumus Attention(Q,K,V) = softmax(QK^T / akar d_k) V terdiri dari tiga operasi berurutan:",
    bullets: [
      "**QK^T** menghasilkan matriks T kali T berisi semua skor berpasangan antar token dalam sequence sepanjang T.",
      "**Pembagian dengan akar d_k** mencegah dot product membesar dan mendorong softmax ke titik jenuh yang mematikan gradient - bentuk baru dari vanishing gradient W5.",
      "**Softmax lalu kali V** mengubah tiap baris menjadi distribusi probabilitas, lalu menghasilkan rata-rata berbobot dari semua vektor Value.",
    ],
    footnote: "Pembagian dengan akar d_k bersifat wajib agar gradient tetap stabil saat dimensi besar.",
  },

  // -- 13: Attention dalam kode --
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

  // -- 14: Blok Transformer --
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

  // -- 15: Multi-head + positional encoding --
  {
    layout: "bullets",
    title: "Multi-Head Attention dan Positional Encoding",
    body: "Dua mekanisme melengkapi attention dasar agar model menangkap banyak pola dan mengetahui urutan:",
    bullets: [
      "**Multi-head attention** menjalankan attention paralel sebanyak h kali pada subruang berdimensi lebih rendah, sehingga tiap head dapat menangkap pola struktural berbeda.",
      "**Positional encoding** menambahkan vektor yang bergantung posisi ke setiap token embedding, karena attention sendiri tidak punya konsep urutan.",
      "**Tanpa positional encoding**, \"anjing menggigit orang\" dan \"orang menggigit anjing\" menghasilkan input attention yang identik.",
    ],
    footnote: "Saat satu sequence memperhatikan sequence lain, prosesnya disebut cross-attention dan dipakai lagi di W9.",
  },

  // -- 16: Freeze vs fine-tune (dampak pada matriks) --
  {
    layout: "bullets",
    title: "Freeze vs Fine-tune: Keputusan tentang Matriks Attention",
    body: "Pilihan freeze atau fine-tune sebenarnya adalah keputusan tentang apakah matriks proyeksi attention boleh berubah:",
    bullets: [
      "**Freeze** mengunci W_Q, W_K, dan W_V, sehingga kalkulasi attention tetap berjalan tetapi tidak bisa beradaptasi dengan domain Anda.",
      "**Fine-tune** memungkinkan matriks-matriks ini beradaptasi agar bobot attention menangkap hubungan yang dibutuhkan tugas Anda.",
      "**Matematika attention tidak berubah** dalam kedua kasus; yang berubah hanya matriks proyeksinya.",
    ],
    footnote: "Karena itu, freeze vs fine-tune adalah keputusan tentang berapa banyak lapisan yang perlu beradaptasi.",
  },

  // -- 17: Biaya dan performa frozen vs fine-tune --
  {
    layout: "split",
    title: "Frozen vs Fine-tune: Biaya dan Performa",
    body: "Contoh konkret pada IndoBERT-base dengan dataset SmSA sekitar 12 ribu sampel di GPU T4 menunjukkan trade-off-nya:",
    left: {
      title: "Frozen + Linear Head",
      body: "Training hanya 2-3 menit untuk 1 epoch, dengan val macro-F1 sekitar 0.78-0.82.\n\nHemat komputasi dan stabil, cocok untuk dataset di bawah 5 ribu sampel atau prototype cepat.",
    },
    right: {
      title: "Fine-tune Full",
      body: "Training 15-25 menit untuk 3 epoch, dengan val macro-F1 sekitar 0.85-0.89.\n\nMemori GPU 3-4 kali lebih besar, cocok untuk dataset di atas 20 ribu atau saat butuh 3-5% performa terakhir.",
    },
    footnote: "PEFT seperti LoRA yang dibahas di W8 menjadi jalan tengah antara kedua ekstrem ini.",
  },

  // -- 18: CLS vs mean pool --
  {
    layout: "split",
    title: "[CLS] Pooling vs Mean Pooling",
    body: "Setelah backbone menghasilkan embedding per token, satu vektor ringkasan perlu dipilih untuk classification head. Dua cara umum bekerja berbeda:",
    left: {
      title: "[CLS] Pooling",
      body: "Memakai token [CLS] di awal untuk mewakili seluruh sequence.\n\nSelama pretraining, model belajar menaruh ringkasan global di posisi ini, sehingga [CLS] menjadi pilihan natural untuk classification.",
    },
    right: {
      title: "Mean Pooling",
      body: "Mengambil rata-rata embedding semua token kecuali padding.\n\nSering lebih robust untuk sentence similarity karena tidak berat sebelah ke satu posisi, tetapi bisa kehilangan ketegasan jika hanya sebagian token relevan.",
    },
    footnote: "Lab 5b menjalankan grid 2x2 frozen/fine-tune kali [CLS]/mean-pool agar perbedaan 1-3 poin F1 terlihat langsung.",
  },

  // -- 19: Materi 2 --
  {
    layout: "section",
    title: "2. Alat AI untuk Riset",
    body: "Modul ini tidak melarang AI coding tools. Modul ini mewajibkan protokol verifikasi sebelum kode dipakai dan sintesis dua sumber sebelum eksekusi keputusan penting.",
    footnote: "Kode yang tidak bisa Anda jelaskan belum layak dikumpulkan dengan nama Anda.",
  },

  // -- 20: Tiga aturan verifikasi --
  {
    layout: "bullets",
    title: "Tiga Aturan Verifikasi Kode AI",
    body: "Setiap kode yang dihasilkan AI melewati tiga pemeriksaan sebelum dipakai:",
    bullets: [
      "**Verifikasi bentuk tensor** memastikan input dan output shape yang diklaim cocok dengan kode.",
      "**Uji kasus tepi** menjalankan kode dengan satu sampel lalu memeriksa hasilnya secara manual.",
      "**Baca baris per baris** memastikan Anda bisa menjelaskan fungsi setiap baris setelah dua kali baca.",
    ],
    footnote: "Verifikasi ini mengubah AI dari sumber jawaban menjadi alat yang tetap di bawah kendali Anda.",
  },

  // -- 21: Aturan sintesis --
  {
    layout: "bullets",
    title: "Aturan Sintesis: Dua Sumber Sebelum Eksekusi",
    body: "Sebelum mengeksekusi pendekatan penting seperti pemilihan model atau strategi fine-tuning, kumpulkan setidaknya dua sumber berbeda:",
    bullets: [
      "**Dua respons AI dengan prompt berbeda** memberi dua sudut pandang yang bisa dibandingkan sebelum memutuskan.",
      "**Satu respons AI ditambah dokumentasi atau paper** memadukan saran cepat dengan rujukan yang lebih otoritatif.",
      "**Satu paragraf sintesis** merangkum: sumber A menyarankan X karena P, sumber B menyarankan Y karena Q, saya memilih Z karena R.",
    ],
    footnote: "Paragraf sintesis merekam alasan keputusan Anda sebelum eksekusi, dan menjadi catatan saat pilihan itu perlu dijelaskan.",
  },

  // -- 22: Image LLM workflow --
  {
    layout: "image",
    title: "Alur Kerja LLM dalam Riset",
    imageUrl: "/figures/fig05a_llm_workflow.svg",
    caption: "Gambar ini menunjukkan alur memakai LLM dalam riset: sintesis dari beberapa sumber, verifikasi terhadap kode dan data, lalu dokumentasi keputusan beserta alasannya. Peneliti tetap memegang keputusan; LLM membantu pencarian, peringkasan, dan pengecekan awal.",
    footnote: "Alat AI juga berguna di luar kode, untuk membaca paper, mendiskusikan hipotesis, dan menavigasi repo.",
  },

  // -- 23: AI di luar kode --
  {
    layout: "bullets",
    title: "AI untuk Tugas di Luar Kode",
    body: "Dari gambar tersebut, alat AI berguna melampaui penulisan kode lewat prompt yang spesifik dengan konteks cukup:",
    bullets: [
      "**Saat membaca paper**, minta AI merangkum satu sub-bagian dan mengidentifikasi asumsi yang tidak diucapkan eksplisit.",
      "**Saat mendiskusikan hipotesis**, tanyakan apakah ada alasan untuk tidak memakai sebuah teknik pada kondisi data tertentu.",
      "**Saat menavigasi repo**, tanyakan alur data dari DataLoader ke model sambil memberikan struktur folder sebagai konteks.",
    ],
    footnote: "Memberi konteks yang cukup membuat jawaban AI jauh lebih akurat dan bisa diverifikasi.",
  },

  // -- 24: Materi 3 --
  {
    layout: "section",
    title: "3. Adopsi Repo Eksternal",
    body: "Riset jarang dimulai dari nol, dan Capstone kemungkinan besar dimulai dari repo orang lain. Kecepatan adopsi ditentukan oleh urutan membaca repo sebelum menjalankannya.",
    footnote: "Empat jam membaca di awal sering memangkas berhari-hari debugging setup di tengah jalan.",
  },

  // -- 25: Dua kecepatan adopsi --
  {
    layout: "bullets",
    title: "Dua Asisten, Dua Kecepatan",
    body: "Dua asisten menerima tugas identik mengganti encoder sebuah paper, tetapi hasilnya berbeda jauh karena strategi membaca:",
    bullets: [
      "**Asisten pertama langsung menjalankan**, lalu menghabiskan tiga hari bergulat dengan error dependency dan dua minggu sebelum modifikasi pertama bisa dicoba.",
      "**Asisten kedua membaca empat jam dulu** tanpa menjalankan apa pun: README, struktur folder, entry point, dan cara data dimuat.",
      "**Setelah peta terbentuk**, asisten kedua setup secara sistematis, menjalankan smoke test, dan mencoba modifikasi dalam dua hari.",
    ],
    footnote: "Perbedaan kecepatan tujuh kali lipat ini berasal dari membaca dulu, bukan dari bakat.",
  },

  // -- 26: Image urutan membaca repo --
  {
    layout: "image",
    title: "Urutan Membaca Repo: dari Luar ke Dalam",
    imageUrl: "/figures/fig06a_repo_navigation.svg",
    caption: "Gambar ini menunjukkan tujuh langkah membaca repo secara berurutan dari luar ke dalam: README, paper terkait, struktur folder, entry point, model dan loss, data loader, lalu config. Setiap langkah membangun pemahaman yang dipakai langkah berikutnya, dan seluruhnya selesai dalam 30-60 menit sebelum perintah install pertama.",
    footnote: "Membaca dengan urutan ini mengubah repo asing menjadi peta yang bisa dirujuk berulang.",
  },

  // -- 27: Tujuh langkah membaca --
  {
    layout: "bullets",
    title: "Tujuh Langkah yang Membangun Peta",
    body: "Dari gambar tersebut, ketujuh langkah dikelompokkan menjadi tiga fase yang makin mendalam:",
    bullets: [
      "**README dan paper** memberi tujuan, cara install, dan apa yang harus ada di kode seperti arsitektur, loss, dan dataset utama.",
      "**Struktur folder dan entry point** menunjukkan tata letak kode dan file yang dijalankan user pertama kali seperti train.py.",
      "**Model, data loader, dan config** mengungkap input-output utama, format data yang diharapkan, dan rentang eksperimen yang didukung.",
    ],
    footnote: "Hasil pembacaan ini dirangkum dalam repo_map.md memakai template di Lampiran C.12.",
  },

  // -- 28: Smoke test tiga level --
  {
    layout: "bullets",
    title: "Smoke Test Sebelum Pelatihan Penuh",
    body: "Setelah environment terpasang, jangan langsung training penuh. Smoke test tiga level dari W2 dipakai lagi di sini, naik dari pemeriksaan termurah ke yang paling menyeluruh:",
    bullets: [
      "**Level 1 import test** memastikan dependency dan path benar - jika gagal di sini, masalahnya bukan logika.",
      "**Level 2 forward pass dummy** menjalankan satu batch acak dan memeriksa shape output, sehingga menangkap bug dimensi.",
      "**Level 3 satu iterasi training** menjalankan satu forward, backward, dan step, lalu keluar - menangkap sekitar 80% bug setup dalam 30 detik.",
    ],
    footnote: "Overfit one batch lebih kuat: jalankan training pada 4 sampel sampai loss mendekati nol untuk membuktikan tidak ada bug fundamental.",
  },

  // -- 29: Image empat kategori error --
  {
    layout: "image",
    title: "Empat Kuadran Diagnosis Error",
    imageUrl: "/figures/fig06b_error_categories.svg",
    caption: "Gambar ini membagi error adopsi repo menjadi empat kategori: Setup error di environment dan dependency, Data error di dataset dan preprocessing, Algorithmic error di forward pass dan loss, serta Experiment error di konfigurasi dan reproduksibilitas. Setiap kuadran punya tanda khas dan langkah uji cepat sendiri.",
    footnote: "Mencocokkan gejala ke kuadran yang tepat memangkas waktu diagnosis secara signifikan.",
  },

  // -- 30: Tanda dan tes tiap kategori --
  {
    layout: "grid",
    title: "Tanda dan Tes Cepat Tiap Kategori",
    body: "Dari gambar tersebut, keempat kategori dipisahkan oleh gejala dan tes cepatnya:",
    gridItems: [
      {
        title: "Setup Error",
        body: "Ditandai ImportError, ModuleNotFoundError, atau CUDA mismatch. Tes cepatnya membandingkan pip freeze dengan requirements.txt dan mengecek path dataset di config.",
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
    footnote: "Gejala akurasi 99% tanpa training hampir selalu mengarah ke Data error berupa leakage, dideteksi dengan audit data W6.",
  },

  // -- 31: Modifikasi minimal --
  {
    layout: "bullets",
    title: "Modifikasi Seminimal Mungkin",
    body: "Saat menambah fitur ke repo orang lain, pilih pola yang tidak mengganggu kode asli agar pekerjaan mudah dibalik dan di-review:",
    bullets: [
      "**Tambahkan opsi, jangan ubah default** dengan menambah argumen berdefault yang mempertahankan perilaku lama.",
      "**Tambahkan file baru** seperti losses.py daripada menyebar perubahan ke banyak file lama.",
      "**Expose lewat CLI dan commit kecil** sehingga fitur bisa dimatikan tanpa menyentuh kode dan tiap perubahan logis mudah ditelusuri.",
    ],
    footnote: "Bagian pendalaman D1-D7 di bab memuat worked example tiga jam mengadopsi repo, untuk dibaca saat W7 atau ditunda ke Capstone.",
  },

  // -- 32: Lab W7 --
  {
    layout: "bullets",
    title: "Lab W7: Teks, Repo, dan Transformer dari Nol",
    body: "Tiga lab minggu ini melatih ketiga materi sekaligus, dari klasifikasi teks sampai membangun Transformer dari nol:",
    bullets: [
      "**Lab 5b teks** memuat dataset sentimen IndoNLU, menginspeksi tokenizer IndoBERT, dan menjalankan grid 2x2 frozen/fine-tune kali [CLS]/mean-pool.",
      "**Lab 6 repo** mengadopsi repo eksternal: menulis repo_map.md, menjalankan smoke test tiga level, dan menambah satu fitur seminimal mungkin.",
      "**Lab 6b breadth** menulis scaled dot-product attention dari nol dan memverifikasinya terhadap nn.TransformerEncoderLayer.",
    ],
    footnote: "Lab 6b wajib untuk memenuhi Breadth Check keluarga Transformer sebelum capstone.",
  },

  // -- 33: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Sebelum lanjut ke W8, renungkan tiga pertanyaan yang menghubungkan minggu ini dengan keputusan riset Anda:",
    bullets: [
      "Untuk dataset teks medis Indonesia dengan 10 ribu sampel dan 5 kelas, IndoBERT atau BioBERT yang Anda coba pertama, dan apa justifikasinya?",
      "Saat AI memberi kode tokenisasi yang menghilangkan token [CLS] sebelum pooling, apakah ini selalu salah, dan kapan bisa diterima?",
      "Seberapa berbeda repo_map.md yang Anda tulis di W7 dari yang akan Anda tulis di W9 saat ada lebih dari satu modalitas?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri; ketiganya kembali relevan saat mengadopsi repo capstone.",
  },

  // -- 34: Lanjut ke W8 --
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

  // -- 35: CTA --
  {
    layout: "cta",
    title: "Mulai Lab W7",
    body: "Semua konsep deck ini ada dalam lab notebook lengkap: klasifikasi teks IndoNLU dengan grid 2x2, inspeksi tokenizer, adopsi repo eksternal, dan Transformer-mini dari nol.\n\nEstimasi waktu 5-7 jam termasuk eksperimen 2x2 dan implementasi attention.",
    ctaText: "Buka Lab W7 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w7_text_classification.ipynb",
  },
];

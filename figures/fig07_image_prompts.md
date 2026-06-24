# Panduan Prompt Generate Image: Materi W7 (fig07)

Dokumen ini berisi kumpulan prompt deskriptif untuk menghasilkan **gambar (generated image)** materi W7 lewat Gemini atau model image-generation lainnya. Setiap prompt hanya menjelaskan isi konten visual secara jelas, lalu model langsung membuat gambar jadi.

---

## 📋 Aturan Umum untuk Setiap Prompt

Saat menggunakan prompt di bawah, jaga konsistensi gaya visual berikut:

1. **Rasio & kanvas**: gambar lanskap rasio 2:1, latar belakang putih bersih (atau abu-abu sangat muda), sudut membulat halus.
2. **Tipografi**: font sans-serif modern dan bersih. Semua label teks dalam Bahasa Indonesia, terbaca jelas, tidak tumpang tindih, dan terpusat rapi di dalam setiap kotak.
3. **Palette warna** (kontras tinggi, gaya UI modern):
   - **Slate (utama/teks)**: abu-abu gelap untuk judul, abu-abu sedang untuk sub-judul.
   - **Biru (sains/proses)**: biru sebagai aksen, biru sangat muda sebagai isi kotak.
   - **Hijau (keunggulan/hasil)**: hijau sebagai aksen, hijau sangat muda sebagai isi kotak.
   - **Merah (kelemahan/gagal)**: merah sebagai aksen, merah sangat muda sebagai isi kotak.
   - **Amber/oranye (atensi/peringatan)**: oranye sebagai aksen, kuning sangat muda sebagai isi kotak.
4. **Gaya kotak**: kartu dengan tepi halus dan bayangan lembut, kesan bersih dan rapi.
5. **Konektor**: panah dan garis penghubung yang jelas, ujung panah menempel rapi ke tepi kotak sasaran, tidak meleset atau menumpuk teks.

---

### 1. `fig07_text_to_numbers_bridge`
**Deskripsi:** Aliran jembatan konversi teks diskret menjadi vektor float kontinu melalui 3 tahap proses.

```markdown
Buatkan sebuah gambar diagram alur yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul di atas: "Jembatan Konversi: Teks ke Angka Kontinu". Sub-judul: "Bagaimana neural network mengubah bahasa manusia yang diskret menjadi pecahan matematika".

Tampilkan tiga kotak besar berjajar horizontal dari kiri ke kanan, dihubungkan panah:

1. Kotak kiri "1. Teks Mentah (Diskret)": berisi teks besar "Saya senang belajar" dengan keterangan kecil "String terpisah, kaku".
2. Kotak tengah bertema biru "2. Mesin Konversi (NLP)": berisi tiga poin bullet rapi:
   - "Tokenizer: pecah teks jadi sub-kata"
   - "Mapping: ambil koordinat di kamus"
   - "Dense matrix: konversi ke pecahan float"
3. Kotak kanan bertema hijau "3. Vektor Desimal Kontinu": berisi angka tebal "[0.254, -0.891, 0.076]" dengan keterangan "Pecahan float desimal luwes".

Panah biru mengalir dari kotak 1 ke kotak 2, lalu dari kotak 2 ke kotak 3.

Di bagian bawah, sebuah kotak keterangan bertema hijau berjudul "Inti Pembelajaran" yang menjelaskan bahwa struktur diskret diubah jadi kontinu agar mendukung kalkulus backpropagation.
```

---

### 2. `fig07_discrete_vs_continuous`
**Deskripsi:** Komparasi visual antara ruang diskret (One-Hot) yang saling tegak lurus dengan ruang vektor semantis kontinu.

```markdown
Buatkan sebuah gambar perbandingan dua sisi yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Struktur Diskret vs. Struktur Angka Kontinu". Sub-judul: "Perbandingan bagaimana komputer memetakan makna kata".

Sisi kiri bertema merah, "STRUKTUR DISKRET (One-Hot / Indeks Kaku)":
- Gambarkan sumbu koordinat 3D (X, Y, Z) bergaris putus-putus.
- Tiga titik lingkaran merah di ujung tiap sumbu: "[0,1,0] anjing", "[0,0,1] meja", "[1,0,0] kucing".
- Garis penghubung antar titik dengan label "Jarak = √2" untuk menegaskan semua kata sama jauh (relasi buta / orthogonal).
- Kotak penjelasan bawah bertema merah: "Kelemahan fatal: relasi buta & ledakan dimensi".

Sisi kanan bertema hijau, "STRUKTUR KONTINU (Vektor Padat / Embeddings)":
- Gambarkan kisi grid 2D halus.
- Titik "meja [-0.68, -0.42]" hijau di kuadran kiri bawah, jauh dari kelompok lain.
- Sebuah kluster bergaris putus-putus berlabel "Cluster Semantis" berisi dua titik hijau berdekatan: "kucing" dan "anjing".
- Garis lengkung berlabel "Jarak Pendek" antara kucing dan anjing, dan garis lurus berlabel "Jarak Jauh" dari meja ke kucing.
- Kotak penjelasan bawah bertema hijau: "Keunggulan utama: relasi geometris & pendukung kalkulus".
```

---

### 3. `fig07_tfidf_balance`
**Deskripsi:** Timbangan neraca statistik klasik yang menyeimbangkan statistik lokal (TF) dengan penalti global (IDF).

```markdown
Buatkan sebuah gambar ilustrasi timbangan neraca yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "TF-IDF: Keseimbangan Timbangan Statistik". Sub-judul: "Bagaimana signifikansi kata dihitung dengan menyeimbangkan statistik lokal dan global".

Di bagian atas tengah, kotak kecil berisi rumus tebal "TF-IDF = TF × IDF".

Gambarkan sebuah timbangan neraca fisik: tiang penyangga segitiga abu-abu di tengah, balok horizontal di atasnya dengan poros di tengah, dan dua piringan tergantung di kiri dan kanan.
- Piringan kiri bertema biru: kotak "TF (Term Frequency)" dengan keterangan "Statistik Lokal".
- Piringan kanan bertema oranye: kotak "IDF (Inverse Doc Freq)" dengan keterangan "Statistik Global".

Keterangan di bawah masing-masing piringan:
- Di bawah TF: "Makin sering kata muncul di dokumen," lalu teks tebal biru "MAKIN TINGGI nilai lokalnya".
- Di bawah IDF: "Makin pasaran kata lintas dokumen," lalu teks tebal oranye "MAKIN JATUH nilai bobotnya".

Kotak footer di bawah berjudul "Contoh Nyata:" menjelaskan kata "yang" dan "dan" mendapat penalti IDF besar sehingga bobot akhirnya mendekati nol.
```

---

### 4. `fig07_tfidf_limitations`
**Deskripsi:** Dua kegagalan fatal TF-IDF: kegagalan polisemi dan hilangnya urutan kata (Bag of Words).

```markdown
Buatkan sebuah gambar perbandingan dua sisi yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Dua Cacat Fatal Metode TF-IDF". Sub-judul: "Mengapa klasifikasi statistik klasik tidak mampu mencerna keutuhan makna kalimat".

Sisi kiri "1. Polisemi (Gagal Membedakan Konteks)":
- Dua kotak kalimat merah lembut: "bank sungai" (konteks alam) dan "bank uang" (konteks keuangan).
- Sebuah lingkaran merah besar di kanan bertuliskan "Vektor 'bank' [0.125]".
- Panah putus-putus merah dari kedua kotak kalimat menuju lingkaran tunggal yang sama, menegaskan kedua makna dipaksa pakai angka identik.
- Teks penjelas bawah berwarna merah: "Kedua makna kata dipaksa memakai angka identik!".

Sisi kanan "2. Bag-of-Words (Gagal Paham Negasi)":
- Dua kalimat input: "tidak buruk" (👍) dan "tidak baik" (👎) masuk ke ikon mesin blender/shredder abu-abu di tengah.
- Keluaran blender berupa himpunan kata acak: {"tidak", "buruk", "baik"} di kotak merah lembut.
- Teks penjelas bawah berwarna merah: "Hubungan arti negasi 'tidak' terputus total!".

Kotak footer hijau di bawah berjudul "Solusi Modern:" memperkenalkan contextual embeddings (BERT/IndoBERT) sebagai pemecah masalah ini.
```

---

### 5. `fig07_word_analogy`
**Deskripsi:** Visualisasi geometris aljabar analogi kata pada static word embeddings.

```markdown
Buatkan sebuah gambar diagram koordinat yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Static Word Embeddings: Aljabar Vektor Semantis". Sub-judul: "Bagaimana Word2Vec dan GloVe memetakan analogi makna dalam ruang koordinat".

Di atas, kotak rumus bertema biru: "Vektor('Raja') - Vektor('Pria') + Vektor('Wanita') ≈ Vektor('Ratu')".

Gambarkan bidang koordinat Cartesius 2D:
- Sumbu X horizontal berlabel "Dimensi X (Gender)".
- Sumbu Y vertikal berlabel "Dimensi Y (Status)".
- Garis bantu grid putus-putus abu-abu halus.

Tampilkan dua pasang vektor analogi yang sejajar:
- Baris bawah: titik biru "Pria" dan "Raja", dengan panah tebal biru dari Pria ke Raja berlabel "Pergeseran Hubungan Gender".
- Baris atas: titik merah muda "Wanita" dan "Ratu", dengan panah merah muda dari Wanita ke Ratu.
- Garis putus-putus vertikal abu-abu menghubungkan Pria ke Wanita dan Raja ke Ratu, berlabel "Sumbu Status Sosial".

Pastikan kedua panah pergeseran panjang dan arahnya sama persis (paralel).

Kotak footer berjudul "Kehebatan Teoretis:" menerangkan pergeseran paralel yang konsisten lintas kosakata.
```

---

### 6. `fig07_contextual_dynamic`
**Deskripsi:** Cara kerja contextual embeddings menghasilkan vektor dinamis peka konteks untuk membedakan polisemi kata "bisa".

```markdown
Buatkan sebuah gambar diagram percabangan yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Contextual Embeddings: Angka Dinamis Berbasis Kalimat". Sub-judul: "Bagaimana model modern membedakan makna ganda (polisemi) kata yang sama".

Di tengah atas, sebuah kotak abu-abu berisi kata utama "bisa". Dari kotak ini, dua garis melengkung putus-putus bercabang turun ke kiri dan ke kanan.

Cabang kiri (kotak bertema merah) "Konteks A: Racun / Toksin":
- Kalimat contoh tebal merah: "Bisa ular itu mematikan".
- Nilai vektor: "[0.942, -0.115, 0.704]".
- Catatan: "Berada di dekat cluster 'racun', 'bisa ular'".

Cabang kanan (kotak bertema biru) "Konteks B: Kemampuan / Sanggup":
- Kalimat contoh tebal biru: "Saya bisa membaca buku".
- Nilai vektor: "[-0.081, 0.814, -0.325]".
- Catatan: "Berada di dekat cluster 'mampu', 'dapat', 'sanggup'".

Garis cabang kiri berwarna merah, cabang kanan berwarna biru.

Kotak footer hijau menjelaskan mekanisme self-attention yang menggabungkan kata-kata sekitar secara dinamis sehingga vektor "bisa" berbeda di tiap kalimat.
```

---

### 7. `fig07_layer_hierarchy`
**Deskripsi:** Hirarki pembagian tugas adaptasi layer Transformer dari lapisan bawah ke lapisan atas.

```markdown
Buatkan sebuah gambar diagram tumpukan layer vertikal yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Pembagian Tugas Adaptasi Layer Transformer". Sub-judul: "Bagaimana model bahasa membagi pemahaman di setiap kedalaman tumpukan layernya".

Gambarkan tiga kotak lebar bertumpuk vertikal (dari atas ke bawah) dengan panah aliran informasi mengarah ke atas:

1. Paling atas bertema merah "Classification Head (Lapisan Prediksi Akhir)": sub-teks "Mempelajari label target (misal: Positif / Negatif sentimen)".
2. Tengah bertema biru "Deep Layers (Lapisan Atas Pretrained)": sub-teks "Mempelajari semantik spesifik & hubungan antar-paragraf", plus tag "★ Beradaptasi drastis selama fine-tuning".
3. Bawah bertema hijau "Shallow Layers (Lapisan Bawah Pretrained)": sub-teks "Mempelajari tata bahasa dasar, awalan/akhiran, negasi", plus tag "🔒 Cukup dikunci (frozen) jika data sedikit".

Di paling bawah, label input: "Input Kalimat Teks (Token ID)".

Di sebelah kanan tumpukan, sebuah kurung siku abu-abu merangkul Deep Layers dan Shallow Layers, berlabel "Pretrained Backbone" dengan keterangan "Sudah menguasai aturan bahasa dari internet".

Kotak footer menjelaskan mengapa mengunci lapisan bawah menghemat komputasi.
```

---

### 8. `fig07_tokenization_comparison`
**Deskripsi:** Komparasi tiga gaya tokenisasi (word-level, character-level, subword) memakai kasus kata "tertangkapnya".

```markdown
Buatkan sebuah gambar diagram percabangan tiga cabang yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Tiga Gaya Pemotongan Token". Sub-judul: "Studi kasus pemotongan kata: 'tertangkapnya'".

Di tengah atas, kotak input abu-abu: "Kata Input: 'tertangkapnya'". Dari kotak ini, garis putus-putus bercabang turun ke tiga kartu di bawah:

1. Kiri "A. Word-level (Kata Utuh)": satu kotak token "tertangkapnya", dengan label peringatan oranye "⚠️ Rentan OOV (Kata Asing)".
2. Tengah "B. Character-level (Karakter)": deret karakter terpisah "t e r t a n g k a p n y a", dengan label merah "⚠️ Sequence Terlalu Panjang".
3. Kanan bertema hijau "C. Subword (Jalan Tengah)": rangkaian subkata "ter + ##tangkap + ##nya", dengan label hijau "✓ Seimbang & Tanpa OOV".

Kotak footer hijau menjelaskan konvensi simbol "##" pada tokenizer IndoBERT sebagai penanda morfem imbuhan.
```

---

### 9. `fig07_rnn_vs_attention`
**Deskripsi:** Perbandingan bottleneck linear RNN/LSTM dengan koneksi paralel self-attention.

```markdown
Buatkan sebuah gambar perbandingan dua sisi yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Revolusi Arsitektur: RNN Bottleneck vs. Attention". Sub-judul: "Bagaimana attention membebaskan pemrosesan kalimat panjang dari antrean linear".

Sisi kiri bertema merah "A. Arsitektur RNN / LSTM (Antrean Kaku)":
- Deret token berurutan "Saya → bisa → baca → buku" dengan panah horizontal merah antar token.
- Sebuah ilustrasi corong penyempitan (funnel) menjelang token terakhir untuk memvisualkan "bottleneck memori".
- Teks tebal merah: "⚠️ BOTTLENECK MEMORI: seluruh makna dipaksa dikompresi ke satu hidden state berukuran tetap".

Sisi kanan bertema hijau "B. Arsitektur Transformer (Attention Bebas)":
- Empat node kata sejajar horizontal: "Saya", "bisa", "baca" (biru), "buku" (hijau).
- Garis melengkung putus-putus hijau menghubungkan "buku" langsung ke setiap kata sebelumnya secara simultan, tanpa antrean.
- Teks tebal hijau: "✓ JALUR KOMUNIKASI PARALEL LANGSUNG: bebas hambatan, kuat untuk kalimat panjang".

Kotak footer hijau menjelaskan mengapa paralelisme di GPU ini memangkas waktu pelatihan.
```

---

### 10. `fig07_transformer_block`
**Deskripsi:** Alur kerja di dalam satu blok Transformer (LayerNorm, Self-Attention, Residual, FFN).

```markdown
Buatkan sebuah gambar diagram alur vertikal yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Alur Kerja Satu Blok Transformer". Sub-judul: "Struktur fungsional di dalam blok bangunan utama Transformer".

Dari atas ke bawah, deret kotak dihubungkan panah tipis ke bawah:
- Label atas: "Input: Matriks Token Embeddings (Panjang T, Dimensi D)".
- Kotak 1 (abu-abu): "1. Layer Normalization (LN)".
- Kotak 2 (biru): "2. Multi-Head Self-Attention (Saling Silang Kata)".
- Kotak 3 (hijau): "3. Residual Add (Skip Connection) + LN".
- Kotak 4 (oranye): "4. Position-Wise Feed-Forward (Proyeksi Lokal)".
- Kotak 5 (hijau): "5. Residual Add + Final Output".

Di sisi kiri, gambarkan garis hijau putus-putus melengkung (jalur pintas) keluar dari input paling atas, melewati LayerNorm dan Attention, lalu masuk ke kotak "Residual Add", berlabel "Jalur Pintas (Residual)".

Di sisi kanan, dua catatan dengan kurung siku kecil:
- Mengapit Self-Attention: "Satu-satunya tempat antar-token berinteraksi".
- Mengapit Feed-Forward: "Diterapkan mandiri per kata, tanpa pencampuran info".

Keterangan footer: "Karena dimensi input dan output sama (T, D), blok ini dapat ditumpuk berulang-ulang".
```

---

### 11. `fig07_mha_positional`
**Deskripsi:** Cara kerja Multi-Head Attention (paralel sudut pandang) dan Positional Encoding (gelombang identitas urutan).

```markdown
Buatkan sebuah gambar perbandingan dua sisi yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Multi-Head Attention & Positional Encoding". Sub-judul: "Dua komponen agar model memahami posisi urutan dan bermacam sudut pandang bahasa".

Sisi kiri bertema biru "1. Multi-Head (Paralel Sudut Pandang)":
- Satu kotak "Input Vektor Tunggal" bercabang lewat empat garis biru ke empat sub-kotak sejajar: "Head 1 (Subjek-Predikat)", "Head 2 (Kata Sifat)", "Head 3 (Logika Negasi)", "Head 4 (Rujukan)".
- Keempat sub-kotak mengumpul kembali lewat garis biru ke satu kotak "Concatenate & Proyeksi".
- Teks biru bawah: "Mempelajari banyak aspek hubungan bahasa secara paralel!".

Sisi kanan bertema hijau "2. Positional Encoding (Identitas Urutan)":
- Gambarkan gelombang sinus/kosinus periodik yang meliuk horizontal melintasi sumbu tengah, melambangkan sinyal posisi.
- Kotak rumus hijau: "Embedding Akhir = Embedding Kata + Positional Signal".
- Teks hijau bawah: "Mencegah kekeliruan urutan subjek-objek pada attention!".

Kotak footer menjelaskan bahaya buta urutan jika positional encoding dimatikan (contoh: "kucing memburu tikus" vs "tikus memburu kucing").
```

---

### 12. `fig07_freeze_vs_finetune`
**Deskripsi:** Perbandingan aliran gradien pada metode adaptasi Frozen (backbone dikunci) vs Fine-Tuning penuh.

```markdown
Buatkan sebuah gambar perbandingan dua sisi yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Freeze vs. Fine-tune: Dua Rute Adaptasi Model". Sub-judul: "Menentukan seberapa banyak parameter pretrained yang boleh diperbarui saat training".

Sisi kiri bertema abu-abu/merah "A. Metode Frozen (Kunci Keras)":
- Kotak atas merah terang: "🔥 Trainable Head (Dilatih Aktif)".
- Panah gradien mengalir turun dari head, lalu terblokir oleh ikon lingkaran merah bergembok bertuliskan "🔒 GRADIENT LOCKED".
- Kotak bawah abu-abu putus-putus: "Locked Pretrained Backbone (parameter dibekukan)".
- Teks bawah: "✓ Sangat cepat | Hemat VRAM | Aman untuk data sedikit".

Sisi kanan bertema biru "B. Metode Fine-tune (Kapasitas Penuh)":
- Kotak atas: "🔥 Trainable Head (Dilatih Aktif)".
- Panah gradien biru tebal mengalir bebas dari head menembus sampai kotak terbawah, bertuliskan "🌊 GRADIENT FLOWS ALL THE WAY DOWN".
- Kotak bawah biru cerah: "Trainable Pretrained Backbone (semua parameter beradaptasi)".
- Teks bawah: "✓ Akurasi maksimal | Butuh waktu lebih lama | Boros VRAM".

Kotak footer berisi rekomendasi praktis kapan memulai baseline frozen dan kapan membuka fine-tune penuh.
```

---

### 13. `fig07_pooling_comparison`
**Deskripsi:** Perbandingan CLS Pooling (token awal) vs Mean Pooling (rata-rata) untuk meringkas deretan token.

```markdown
Buatkan sebuah gambar perbandingan dua sisi yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Pooling: Bagaimana Kalimat Diringkas". Sub-judul: "Dua rute utama merangkum deretan kata menjadi satu vektor kalimat".

Di bagian atas, label "Deretan Token Input:" diikuti deret kotak sejajar: "[CLS]" (merah muda tebal), "produk", "ini", "bagus" (abu-abu), "[PAD]", "[PAD]" (abu-abu putus-putus).

Sisi kiri bertema merah "A. CLS Pooling (Satu Gerbang Awal)":
- Panah merah tebal menusuk turun hanya dari token "[CLS]" menuju kotak ringkasan "Vektor Sentimen = [CLS] Token Only".
- Teks bawah: "Hanya memungut intisari dari token di barisan terdepan".

Sisi kanan bertema biru "B. Mean Pooling (Nilai Tengah Rata-rata)":
- Tiga garis tipis biru dari kata asli "produk", "ini", "bagus" mengumpul ke kotak ringkasan "Vektor Sentimen = Mean(Semua Kata)". Token [PAD] dan [CLS] diabaikan.
- Teks bawah: "Merata-ratakan seluruh vektor kata asli sambil membuang PAD".

Kotak footer berisi saran kapan memakai CLS (klasifikasi dokumen tunggal) dan kapan Mean Pooling (kemiripan makna kalimat).
```

---

### 14. `fig07_verification_checklist`
**Deskripsi:** Prosedur tiga tahap pengujian sebelum mengadopsi kode saran AI.

```markdown
Buatkan sebuah gambar diagram alur horizontal tiga tahap yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Aturannya: Protokol Tiga Tahap Verifikasi AI". Sub-judul: "Prosedur wajib sebelum menyetujui, menggabungkan, atau menjalankan kode saran AI".

Tiga kotak pos pemeriksaan berjajar kiri ke kanan, dihubungkan panah:

1. Bertema biru "Tahap 1: Dimensi Tensor": lingkaran biru bernomor "1", teks tebal "Verifikasi Ukuran Matriks", poin kecil "Cetak shape tensor (T, B, D), pastikan cocok antar layer".
2. Bertema hijau "Tahap 2: Skenario Pinggir": lingkaran hijau bernomor "2", teks tebal "Uji Kasus Batas (Edge Cases)", poin kecil "Masukkan sequence kosong, kata asing, atau padding ekstrim".
3. Bertema oranye "Tahap 3: Bedah Logika": lingkaran oranye bernomor "3", teks tebal "Pahami Baris per Baris", poin kecil "Jangan biarkan ada baris sintaks yang tidak dipahami".

Panah horizontal menghubungkan Tahap 1 ke 2, lalu 2 ke 3.

Kotak footer bertema biru menekankan disiplin riset: peneliti wajib bisa menjelaskan fungsi tiap baris sebelum kode diakui sebagai karya mandiri.
```

---

### 15. `fig07_synthesis_pipeline`
**Deskripsi:** Pipeline distilasi informasi: membandingkan dua respons AI dengan dokumen ilmiah resmi.

```markdown
Buatkan sebuah gambar diagram pipeline penyaringan yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Aturannya: Metode Sintesis Dua Sumber Utama". Sub-judul: "Menyaring kebenaran dengan menyandingkan beberapa jawaban AI terhadap rujukan sains resmi".

Sisi kiri, tiga kotak masukan bertumpuk vertikal:
1. "Respons AI - Jendela A" (aksen biru): "Gunakan klasifikasi CLS token...".
2. "Respons AI - Jendela B" (aksen biru): "Gunakan rata-rata Mean Pooling...".
3. "Dokumentasi Resmi / Paper" (aksen hijau): "BERT pretraining masks 15%...".

Di tengah, sebuah corong penyaring (funnel) abu-abu bertuliskan tebal "DISTILASI". Tiga garis pipa putus-putus dari ketiga sumber kiri mengalir menyatu ke mulut corong.

Sisi kanan, panah hijau keluar dari ekor corong menuju kartu besar bertema hijau "Dokumentasi Sintesis Argumentatif", berisi contoh kutipan: "Meskipun AI menyarankan CLS, dokumentasi resmi HuggingFace menyatakan Mean Pooling lebih stabil...". Di bawah kartu ada badge "★ SIAP DIPERTAHANKAN DI DEPAN PENGUJI ★".

Kotak footer menyimpulkan prosedur ini meredam halusinasi AI dengan rujukan sains tepercaya.
```

---

### 16. `fig07_smoke_test_pyramid`
**Deskripsi:** Piramida tiga level Smoke Test (Level 1 Impor, Level 2 Alur Maju, Level 3 Overfit 1 Batch).

```markdown
Buatkan sebuah gambar ilustrasi piramida tiga tingkat yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Piramida Disiplin Smoke Test". Sub-judul: "Urutan pengecekan bertahap untuk mendeteksi cacat skrip sebelum membakar jam komputasi GPU".

Gambarkan piramida segitiga bertumpuk tiga tingkat (dari puncak ke dasar):

1. Puncak bertema oranye "Level 3: Overfit 1 Batch": sub-teks "Pastikan loss menyusut drastis ke arah nol", tag "✓ Uji saraf optimizer".
2. Tengah bertema biru "Level 2: Alur Maju Tensor Dummy": sub-teks "Alirkan input mainan acak melewati model", tag "✓ Uji kecocokan ukuran matriks".
3. Dasar bertema hijau "Level 1: Kompilasi Impor Library": sub-teks "Validasi file path, dependensi CUDA, driver", tag "✓ Uji kesiapan environment".

Indikator samping:
- Kiri bawah: garis penunjuk "Mulai dari sini" mengarah ke dasar (Level 1).
- Kanan atas: garis penunjuk "Misi Tercapai" mengarah ke puncak (Level 3).

Kotak footer menyimpulkan disiplin melewati piramida ini memangkas sebagian besar drama bug saat tenggat riset tiba.
```

---

### 17. `fig07_clean_modification_tactics`
**Deskripsi:** Tiga taktik disiplin memodifikasi repositori eksternal demi menjaga kebersihan kode asli.

```markdown
Buatkan sebuah gambar diagram tiga kartu sejajar yang modern dan bersih, rasio lanskap 2:1, latar belakang putih.

Judul: "Strategi Modifikasi Repositori Asing". Sub-judul: "Tiga taktik disiplin saat mengubah skrip demi menjaga kebersihan kode asli".

Tiga kartu berjajar horizontal:

1. Bertema biru "Taktik 1: Bumper Default": lingkaran biru bernomor "I", teks tebal "Gunakan Argumen Default", poin kecil "Setel parameter modifikasi jadi False sebagai bawaan agar alur luar tidak terganggu".
2. Bertema hijau "Taktik 2: Berkas Terpisah": lingkaran hijau bernomor "II", teks tebal "Isolasi Skrip Mandiri", poin kecil "Tulis kode tambahan di file baru terpisah, hindari merusak fungsi utama".
3. Bertema oranye "Taktik 3: CLI Control": lingkaran oranye bernomor "III", teks tebal "Kendalikan Lewat Terminal", poin kecil "Pakai argumen parser (CLI) untuk menyalakan fitur baru tanpa mengutak-atik file asli".

Kotak footer berjudul "Prinsip Asasi" mengingatkan untuk menghargai karya orisinal pembuat repo dengan menyusun fitur tambahan yang modular (copot-pasang).
```

---

## 🚀 Cara Penggunaan

1. **Pilih prompt**: salin salah satu blok prompt di atas yang ingin Anda buat gambarnya.
2. **Kirim ke Gemini / model image-generation lain**: kirim prompt langsung. Model akan menghasilkan gambar jadi (bukan kode).
3. **Simpan**: unduh gambar dan simpan ke folder `figures/` dengan nama file yang sesuai (lihat judul tiap bagian), format PNG.
4. **Sinkronisasi**: jalankan `npm run sync` di folder `website/` agar gambar baru ikut tersalin ke folder publik website.

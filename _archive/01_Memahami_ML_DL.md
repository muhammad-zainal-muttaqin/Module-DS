<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| ▶ 01 | Memahami ML/DL | 2–3 |
| 02 | [Ide ke Eksperimen](02_Ide_Ke_Eksperimen.md) | 4 |
| 03 | [Eksperimen Reproduksibel](03_Eksperimen_Reproduksibel.md) | 5–6 |
| 04 | [Validasi Data](04_Validasi_Data.md) | 7 |
| 05 | [AI Tools Sebagai Pendukung](05_AI_Tools_Sebagai_Pendukung.md) | 8 |
| 06 | [Adopsi Repo Riset](06_Adopsi_Repo_Riset.md) | 9 |
| 07 | [Alat Pendukung Ringan](07_Alat_Pendukung_Ringan.md) | 10 |
| 08 | [Platform & Tool Baru](08_Platform_Dan_Tool_Baru.md) | 11 |
| 09 | [Pengembangan Mandiri](09_Pengembangan_Mandiri.md) | 12 |
| 10 | [Capstone Project](10_Capstone_Project.md) | 13–14 |
| 11 | [Rubrik Penilaian](11_Rubrik_Penilaian.md) | – |
| 12 | [Lampiran](12_Lampiran.md) | – |

</details>

---

# 01 · Memahami Sistem ML/DL Secara Praktis

> *Arsitektur bukan daftar definisi untuk dihafalkan. Ia adalah keputusan desain yang berangkat dari pertanyaan: bentuk apa yang melekat pada data Anda, dan struktur apa yang paling alami mengikutinya?*

---

## 0. Peta Bab

Bab ini membekali Anda dengan kerangka pikir untuk membaca sistem ML/DL seperti seorang peneliti: membaca setiap masalah sebagai pasangan tensor input → output, menurunkan forward dan backward pass MLP sebagai mesin fondasional yang sama yang berjalan di bawah semua arsitektur modern, mengenali empat keluarga arsitektur berdasarkan bentuk data, memahami peran layer sebagai transformasi representasi beserta pilihan normalisasi dan aktivasi yang mengiringinya, membaca loss dan optimizer sebagai pilihan yang memiliki konsekuensi, mengenali tiga pilihan representasi fitur - *engineered*, *extracted*, *learned* - beserta keputusan turunannya, dan mendiagnosis masalah training dari pola loss curve. Setelah menyelesaikan bab ini, Anda dapat membuka repository riset dan menebak secara masuk akal mengapa arsitektur dan strategi representasi tertentu dipilih, bukan hanya menyebut namanya - dan ketika training bermasalah, Anda punya kerangka diagnosis untuk mencari penyebab.

**Pembagian dua minggu.** Bab ini dirancang dua minggu penuh; jangan coba memadatkan keseluruhan section 2 ke satu pekan. Sebagai peta kasar:

| Minggu | Fokus section | Deliverable akhir minggu |
|--------|---------------|--------------------------|
| Minggu 2 | 2.0 Tensor masuk-keluar, 2.0b MLP + backprop, 2.1 Empat keluarga arsitektur, 2.2 Layer sebagai transformasi (inisialisasi, normalisasi, aktivasi), 2.3 Loss sebagai pilihan | Lab 1 baseline CNN berjalan, Lab 1c MLP numpy selesai, log parser dibaca |
| Minggu 3 | 2.4 Optimizer, 2.5 Evaluasi, 2.6 Representasi fitur, 2.7 Diagnosis loss curve | Lab 1 penuh selesai; opsional Lab 1b representasi fitur |

Section 2.7 (diagnosis loss curve) memang bisa terasa seperti bab tersendiri; itu disengaja - ia berfungsi sebagai jembatan ke Bab 03 (Eksperimen Reproduksibel) dan akan dirujuk kembali saat Anda membaca tensorboard run pertama Anda.

**Lab ekstensi opsional dan wajib-fondasi.** Bab ini punya tiga lab: Lab 1 (baseline CNN, wajib), Lab 1b (`notebooks/lab1b_representasi.ipynb`, opsional - membandingkan tiga strategi representasi fitur *engineered*, *extracted*, *learned* pada dataset kecil), dan Lab 1c (`notebooks/lab1c_mlp_numpy.ipynb`, wajib - MLP dua-layer ditulis dari nol dengan numpy, menuntun Anda menulis forward pass dan backward pass manual untuk klasifikasi MNIST). Lab 1c mendampingi Section 2.0b dan sebaiknya dikerjakan di akhir Minggu 2 sebelum lanjut ke Minggu 3.

---

## 1. Motivasi: Tiga Dataset di Meja Anda

Seorang rekan baru mengirim tiga dataset sekaligus dengan pesan: "coba klasifikasi dulu, pakai arsitektur yang menurut Anda paling masuk akal". Ketiganya:

- **A**: tabel medis - 20 kolom berisi hasil lab darah pasien, target diabetes ya/tidak.
- **B**: 10.000 gambar daun sawit, label *sehat* atau *terkena penyakit*, resolusi 224×224.
- **C**: 30.000 review produk berbahasa Indonesia, target sentimen positif/negatif.

Tanpa memilih framework atau membuka paper apapun, Anda sudah bisa menebak keluarga arsitektur yang paling mungkin cocok. Dataset A punya struktur *flat* - setiap kolom adalah fitur yang relatif independen; feed-forward network klasik sudah masuk akal. Dataset B berupa grid piksel 2D dengan *translation invariance* (daun yang sama miring ke kiri atau ke kanan tetap daun yang sama); CNN alami di sini. Dataset C adalah urutan kata dengan ketergantungan jangka panjang (kata di awal kalimat memodifikasi arti kata di akhir); transformer atau RNN yang cocok.

Poinnya bukan "tiga jawaban di atas adalah jawaban tunggal yang benar". Poinnya: setiap keluarga arsitektur dibangun dengan *asumsi tertentu* tentang bentuk data. Memilih arsitektur berarti memilih asumsi mana yang paling tepat. Ketika asumsi cocok, model belajar efisien. Ketika tidak, Anda memaksanya bekerja lebih keras tanpa bayaran.

---

## 2. Konsep Inti

### 2.0 Peta Besar: Tensor Masuk, Tensor Keluar

Sebelum kita membahas keluarga arsitektur, ada satu kerangka berpikir yang menyederhanakan hampir setiap keputusan desain dalam deep learning: setiap masalah dapat dipahami hanya dengan menjawab dua pertanyaan - *bentuk tensor apa yang masuk ke dalam model*, dan *bentuk apa yang keluar*. Tensor input merangkum struktur data mentah: vektor fitur pada data tabular, grid piksel pada gambar, urutan token pada teks, matriks waktu-kali-sensor pada deret waktu. Tensor output merangkum bentuk prediksi yang diminta: satu angka pada regresi, distribusi kelas pada klasifikasi, urutan label pada *token classification*, atau grid kotak pada deteksi objek. Segala sesuatu di antara keduanya - MLP, CNN, RNN, Transformer, layer apapun yang Anda tumpuk - hanyalah mesin transformasi yang memetakan satu bentuk ke bentuk yang lain.

Kerangka ini terlihat sederhana, tetapi sangat efektif dalam praktiknya. Saat Anda membaca kode dari repositori yang belum dikenal, hal pertama yang Anda perhatikan bukanlah nama modelnya, melainkan bentuk batch di `DataLoader` dan bentuk tensor tepat sebelum fungsi loss dihitung. Dari dua angka itu saja, Anda sudah dapat menebak keluarga arsitektur yang masuk akal dan memeriksa apakah pilihan paper tersebut konsisten dengan bentuk tugasnya. Sebaliknya, ketika Anda merancang eksperimen untuk domain yang belum familiar, menuliskan pasangan tensor input → output di kertas - sebelum satu baris kode pun ditulis - sering kali mempersempit pilihan arsitektur dari "semua model di dunia" menjadi "satu atau dua keluarga yang masuk akal".

Tabel berikut merangkum pasangan tensor input → output untuk domain yang akan sering Anda temui sepanjang semester. Bacalah setiap baris sebagai sebuah cerita singkat: dari bentuk data mentah, ke bentuk yang dipakai model, ke bentuk prediksi yang diminta.


| Domain      | Contoh Data                                       | Tensor Input                            | Tensor Output   | Contoh Tugas                             |
| ----------- | ------------------------------------------------- | --------------------------------------- | --------------- | ---------------------------------------- |
| Tabular     | Umur, luas rumah, jumlah kamar, lokasi            | `(F,)` - vektor fitur                   | `(1,)`          | Prediksi harga rumah                     |
| Tabular     | Umur, tekanan darah, kolesterol, BMI              | `(F,)` - vektor fitur                   | `(N,)`          | Klasifikasi risiko penyakit              |
| Gambar      | Foto RGB 224×224                                  | `(C, H, W)` - kanal, tinggi, lebar      | `(N,)`          | Klasifikasi kucing vs anjing             |
| Gambar      | Foto makanan                                      | `(C, H, W)`                             | `(1,)`          | Prediksi jumlah kalori                   |
| Gambar      | Foto makanan                                      | `(C, H, W)`                             | `(K,)`          | Prediksi beberapa nilai gizi             |
| Gambar      | Foto kebun / jalan / ruang parkir                 | `(C, H, W)`                             | `(G, G, 5 + N)` | Deteksi objek                            |
| Teks        | Ulasan produk: "Barangnya bagus dan cepat sampai" | `(T,)` - urutan token                   | `(N,)`          | Klasifikasi sentimen                     |
| Teks        | Ulasan film atau hotel                            | `(T,)` - urutan token                   | `(1,)`          | Prediksi rating                          |
| Teks        | Kalimat berita atau artikel                       | `(T,)` - urutan token                   | `(T, N)`        | Penandaan entitas / token classification |
| Deret waktu | Detak jantung atau sinyal sensor per detik        | `(T, F)` - waktu × fitur/sensor         | `(1,)`          | Prediksi satu nilai berikutnya           |
| Deret waktu | Sinyal ECG beberapa detik                         | `(T, F)` - waktu × fitur/sensor         | `(N,)`          | Klasifikasi aritmia                      |
| Deret waktu | Data glukosa atau suhu dari waktu ke waktu        | `(T, F)` - waktu × fitur/sensor         | `(T', 1)`       | Prediksi urutan masa depan               |
| Multimodal  | Foto produk + deskripsi teks                      | dua tensor, mis. `(C, H, W)` dan `(T,)` | `(N,)`          | Klasifikasi produk                       |
| Multimodal  | Gambar + caption media sosial                     | dua tensor, mis. `(C, H, W)` dan `(T,)` | `(N,)`          | Klasifikasi hoaks / bukan hoaks          |


Perhatikan bahwa bentuk output tidak selalu sekadar `(N,)` untuk klasifikasi; deteksi objek menghasilkan tensor tiga dimensi karena setiap sel grid memprediksi beberapa kotak dan kelas, sedangkan prediksi urutan masa depan mengembalikan satu tensor waktu penuh - bukan satu angka. Transisi dari "tugas apa yang ingin saya selesaikan" menjadi "bentuk output apa yang benar" adalah keputusan yang perlu Anda selesaikan sebelum memilih arsitektur; keliru di sini akan membuat semua pilihan berikutnya terasa aneh dan sulit dijustifikasi.

Kerangka tensor masuk → tensor keluar inilah yang mendasari bagian berikutnya. Empat keluarga arsitektur yang dibahas di 2.1 pada dasarnya adalah empat asumsi berbeda tentang struktur tensor input, dan masing-masing keluarga dirancang untuk memanfaatkan asumsi itu seefisien mungkin.

### 2.0b MLP dan Backpropagation: Fondasi yang Menopang Semua

Sebelum kita masuk ke empat keluarga arsitektur di 2.1, ada satu model yang pantas mendapat pembahasan tersendiri: *Multi-Layer Perceptron* (MLP). Bukan karena MLP sering dipakai di paper riset modern - justru sebaliknya, MLP hampir selalu dikalahkan oleh CNN, RNN, atau Transformer ketika data punya struktur yang bisa dimanfaatkan. MLP pantas dibahas karena **semua keluarga arsitektur lain, pada level komputasi, adalah MLP dengan batasan tambahan**. CNN adalah MLP yang dipaksa berbagi bobot antar lokasi spasial. Transformer adalah MLP yang dipaksa memproses setiap posisi dengan bobot yang sama. RNN adalah MLP yang dipanggil berulang sepanjang urutan waktu. Memahami apa yang terjadi di MLP selama training berarti memahami mesin yang sama yang beroperasi di bawah setiap arsitektur modern.

**Forward pass dua-layer.** Ambil MLP paling minimal: satu *hidden layer*, satu *output layer*. Input `x` berdimensi `d_in`, hidden layer memiliki `d_h` neuron, output `d_out`. Dua operasi berurutan:

```
z1 = W1 x + b1         # pre-activation, bentuk (d_h,)
h  = σ(z1)             # activation, bentuk (d_h,)
z2 = W2 h + b2         # output pre-activation, bentuk (d_out,)
y_hat = z2             # untuk regresi; untuk klasifikasi tambahkan softmax di loss
```

`W1` bentuknya `(d_h, d_in)`, `W2` bentuknya `(d_out, d_h)`. `σ` adalah non-linearitas seperti ReLU atau sigmoid. Jika kita hilangkan `σ`, seluruh jaringan runtuh menjadi satu transformasi linear `W2 W1 x + (W2 b1 + b2)` - artinya kapasitas modelnya tidak lebih dari regresi linear biasa. Non-linearitas inilah yang mengizinkan penumpukan layer jadi bermakna.

**Mengapa backpropagation perlu dipahami sekali dalam hidup Anda.** Anda tidak akan pernah menulis *backward loop* secara manual di pekerjaan riset - PyTorch melakukan ini otomatis via `loss.backward()`. Tapi ketika model Anda tidak belajar, ketika gradient meledak, ketika paper menyebutkan "*we clip gradients at norm 1.0*", Anda perlu punya model mental yang benar tentang apa yang mengalir di pipa gradient. Tanpa itu, setiap bug training terasa seperti sihir. Turunan singkat berikut bukan bukti formal; ia adalah satu kali latihan yang menghubungkan "loss naik" dengan "update parameter konkret".

**Contoh terturunkan: MSE loss, satu sampel.**

Misalkan `d_in = 2`, `d_h = 2`, `d_out = 1`. Target `y`, prediksi `y_hat = z2` (tanpa aktivasi di output, regresi biasa). Loss `L = ½ (y_hat - y)²`.

Kita ingin `∂L/∂W1`, `∂L/∂W2`, `∂L/∂b1`, `∂L/∂b2`. Chain rule bekerja dari belakang ke depan:

1. `∂L/∂z2 = y_hat - y` - turunan MSE terhadap pre-activation output.
2. `∂L/∂W2 = (∂L/∂z2) · h^T` - bentuk `(d_out, d_h)`, hasil kali luar.
3. `∂L/∂b2 = ∂L/∂z2`.
4. `∂L/∂h = W2^T (∂L/∂z2)` - propagasikan gradient kembali ke hidden.
5. `∂L/∂z1 = (∂L/∂h) ⊙ σ'(z1)` - `⊙` elemen-per-elemen; untuk sigmoid `σ'(z) = σ(z)(1 - σ(z))`, untuk ReLU `σ'(z) = 1[z > 0]`.
6. `∂L/∂W1 = (∂L/∂z1) · x^T`.
7. `∂L/∂b1 = ∂L/∂z1`.

![MLP 2-layer: forward pass dengan dimensi dan backward pass chain rule 7 langkah](../figures/fig01b_mlp_forward_backward.svg)

Perhatikan pola yang sama berulang di layer manapun: gradient terhadap pre-activation berasal dari gradient layer di atasnya, lalu dikalikan turunan non-linearitas. Gradient terhadap bobot adalah hasil kali luar antara gradient pre-activation dengan aktivasi di bawahnya. Pola inilah yang diotomatisasi oleh setiap *autograd engine*, dan pola inilah yang menjelaskan tiga fenomena yang sering Anda dengar di kelas atau paper:

- **Vanishing gradient.** Jika `σ'(z1)` selalu kecil - sigmoid jauh dari nol, tanh di zona saturasi - faktor ini mengalikan gradient dengan angka kecil di setiap layer. Setelah 10 layer, gradient yang tiba di bobot paling bawah sudah mendekati nol. Inilah alasan ReLU, yang turunannya 0 atau 1 tanpa penyusutan, menjadi pilihan default.
- **Exploding gradient.** Jika bobot `W2` besar, faktor `W2^T` di langkah 4 mengalikan gradient dengan angka besar. Di RNN dalam, faktor ini muncul sekali per langkah waktu; gradient bisa meledak eksponensial. Solusi praktis: *gradient clipping*.
- **Inisialisasi Kaiming/Xavier** yang disebut di Section 2.2 berikutnya. Tujuan keduanya: menjaga variansi `∂L/∂z` kira-kira konstan saat merambat mundur melalui layer, sehingga gradient tidak menyusut atau meledak sejak iterasi pertama. Rumus `σ² = 2/fan_in` untuk ReLU persis berasal dari analisis variansi gradient ini.

Lab 1c (`notebooks/lab1c_mlp_numpy.ipynb`) menuntun Anda menulis ketujuh langkah di atas dalam numpy murni untuk MLP yang melatih klasifikasi digit MNIST. Tujuannya bukan reproduksi PyTorch - tujuannya agar saat Anda membaca `loss.backward()` di Lab 1, Anda tahu persis mesin apa yang sedang berjalan di bawah pemanggilan satu baris itu.

**Universal approximation: kenapa MLP tetap relevan secara teori.** Salah satu hasil teoretis fundamental dalam deep learning adalah *universal approximation theorem* (Cybenko 1989, Hornik 1991): MLP dengan satu hidden layer yang cukup lebar dapat mendekati fungsi kontinu apapun pada interval terbatas dengan akurasi sembarang. Secara intuitif: "ada beberapa `W1`, `b1`, `W2`, `b2` yang membuat model Anda menghitung fungsi yang Anda inginkan". Teorem ini tidak mengatakan *Anda bisa menemukan bobot tersebut dengan gradient descent*, tidak mengatakan *Anda butuh sedikit data*, dan tidak mengatakan *Anda butuh hidden layer berukuran masuk akal* - bukti konstruktif bisa butuh miliaran neuron. Dalam praktik, kedalaman (banyak layer) sering jauh lebih efisien daripada lebar (satu layer yang sangat lebar). Tapi teorem ini menetapkan satu hal penting: keterbatasan model memuat data jarang berasal dari "kapasitas teoretis MLP" - hampir selalu berasal dari (a) kualitas data, (b) loss yang tidak sesuai tugas, atau (c) prosedur optimasi yang tidak menemukan solusi baik. Mengetahui ini menghemat Anda dari perangkap "ganti arsitektur" ketika masalah sebenarnya ada di tempat lain.

**Jembatan ke arsitektur lain.** Jika MLP sudah bisa mendekati fungsi apapun, mengapa kita perlu CNN, RNN, atau Transformer? Jawabannya: *efisiensi statistik*. MLP tidak mengasumsikan apapun tentang input, sehingga harus belajar setiap pola dari nol. Jika input Anda gambar 224×224×3, hasil flattening punya 150.528 dimensi; hidden layer pertama dengan 1024 neuron memerlukan sekitar 150 juta parameter hanya di satu layer. CNN menurunkan angka ini ke kisaran ratusan ribu dengan satu asumsi kuat - *translation invariance* - yang kebetulan sangat cocok untuk gambar. Tidak ada sihir di CNN; ia adalah MLP dengan kebanyakan bobot dipaksa sama. Setiap keluarga arsitektur di 2.1 berikutnya dapat Anda baca sebagai "MLP + asumsi spesifik domain". Ketika asumsi cocok dengan data, model belajar lebih efisien; ketika tidak cocok, Anda memperjuangkan struktur yang tidak membantu.

### 2.1 Arsitektur sebagai Asumsi tentang Data

Empat keluarga yang paling sering Anda temui di paper dan kode riset.

**Feed-Forward Neural Network (FFN).** Lapisan linear berturut-turut dengan non-linearitas (ReLU, GELU) di antaranya. Asumsi: tidak ada struktur khusus pada fitur input - urutan kolom tidak bermakna, tidak ada kedekatan spasial atau temporal yang perlu dipertahankan. Cocok untuk data tabular, embedding yang sudah diproses, atau tugas klasifikasi kecil. Kelemahan utama: tidak efisien ketika data punya struktur yang bisa dimanfaatkan; jumlah parameter meledak untuk input besar.

**Convolutional Neural Network (CNN).** Inti idenya: satu *filter* (kernel) kecil digeser ke seluruh input, berbagi bobot di semua lokasi. Asumsi: pola yang relevan dapat muncul di lokasi manapun (translation invariance) dan bersifat lokal (piksel berdekatan lebih terkait daripada piksel jauh). Komponen khas: `Conv2d → BatchNorm → ReLU → MaxPool`. Kekuatan: sangat efisien parameter untuk gambar dan data grid (spektrogram, citra medis). Kelemahan: asumsi lokalitas gagal ketika pola penting justru menyebar luas.

**Recurrent Neural Network (RNN), LSTM, GRU.** Memproses urutan satu langkah waktu demi satu langkah waktu, menyimpan *hidden state* yang merangkum masa lalu. Asumsi: urutan penting, dan informasi dari langkah-langkah sebelumnya membantu memprediksi langkah berikutnya. LSTM dan GRU memperkenalkan *gate* untuk mengatasi *vanishing gradient* pada RNN polos, memungkinkan pembelajaran ketergantungan jarak menengah. Kelemahan: komputasi sekuensial (tidak bisa diparalelkan sepanjang urutan), ketergantungan yang sangat panjang tetap sulit ditangkap.

**Transformer.** Menggantikan rekursi dengan *self-attention*: setiap elemen urutan secara langsung "melihat" semua elemen lain dan memutuskan mana yang relevan. Asumsi: urutan penting, tetapi lebih efisien memodelkan relasi sebagai *set* dengan *positional encoding* daripada mengalir satu per satu. Komponen utama: `Multi-Head Attention`, `Positional Encoding`, `Feed-Forward` per posisi. Dominan di NLP modern (BERT, GPT), kini juga di visi (Vision Transformer) dan audio. Biaya utama: self-attention kuadratik terhadap panjang urutan, walaupun varian baru (linear attention, sparse attention) menguranginya.

![Lima keluarga arsitektur neural network: MLP, CNN, RNN/LSTM, Transformer, dan Autoencoder - masing-masing dengan inductive bias dan domain khasnya](../figures/fig01a_nn_families.svg)

### 2.2 Layer sebagai Transformasi Representasi

Satu cara kuat membaca model dalam: anggap setiap layer adalah *fungsi* yang mengubah representasi data menjadi bentuk yang lebih berguna bagi lapisan berikutnya. Di CNN, layer awal belajar detail kecil - tepi, sudut, tekstur - sementara layer dalam menggabungkannya menjadi konsep yang lebih tinggi seperti "bulu", "mata", "roda mobil". Di transformer, layer awal sering fokus pada hubungan sintaktik lokal, sedangkan layer dalam memodelkan relasi semantik jarak jauh.

Implikasi praktis: ketika Anda *fine-tune* model yang sudah terlatih, layer awal biasanya berisi fitur umum yang lebih aman di-freeze, sementara layer akhir perlu beradaptasi dengan domain baru. Aturan ini bukan hukum, tetapi titik awal yang masuk akal ketika Anda mendapat instruksi "freeze layer pertama".

Non-linearitas seperti ReLU atau GELU adalah mesin yang membuat semua ini bekerja. Tanpa mereka, menumpuk layer linear hanya menghasilkan satu transformasi linear besar - tidak lebih kuat dari regresi biasa. Non-linearitas memperkenalkan tekukan dalam fungsi yang dipelajari, memungkinkan model menangkap pola kompleks.

**Inisialisasi bobot: titik awal yang sering diabaikan.** Sebelum training dimulai, setiap parameter harus diinisialisasi. Memilih nol atau nilai terlalu besar menghancurkan sinyal gradient sejak iterasi pertama. Dua inisialisasi yang hampir universal dipakai:

- **Kaiming (He) initialization** - dirancang untuk layer dengan aktivasi ReLU atau variannya. Sampel dari distribusi normal/seragam dengan variansi disesuaikan berdasarkan jumlah unit input (`fan_in`): σ² = 2 / fan_in. PyTorch menerapkannya otomatis untuk `nn.Conv2d` dan `nn.Linear` sejak PyTorch 1.x via `torch.nn.init.kaiming_normal_`.
- **Xavier (Glorot) initialization** - dirancang untuk aktivasi simetris seperti Tanh atau Sigmoid. Variansi disesuaikan berdasarkan rata-rata fan_in dan fan_out: σ² = 2 / (fan_in + fan_out). Sering dipakai di transformer.

Dalam praktiknya, Anda jarang perlu menginisialisasi sendiri - PyTorch memilihkan default yang tepat per jenis layer. Tetapi mengetahui ini penting ketika Anda mendefinisikan layer kustom, mengadopsi kode yang memakai pola `model.apply(init_weights)`, atau mendebug model yang tidak mau belajar dari epoch pertama.

```python
# Contoh: inisialisasi eksplisit untuk layer kustom
def init_weights(m):
    if isinstance(m, (nn.Conv2d, nn.Linear)):
        nn.init.kaiming_normal_(m.weight, nonlinearity='relu')
        if m.bias is not None:
            nn.init.zeros_(m.bias)

model.apply(init_weights)
```

**Normalisasi: BatchNorm, LayerNorm, GroupNorm.** BatchNorm sudah muncul di konvensi `Conv → BN → ReLU` di atas, tetapi BN bukan satu-satunya pilihan normalisasi. Ketika Anda membaca paper lintas domain, Anda akan bertemu LayerNorm dan GroupNorm. Ketiganya berbeda pada sumbu yang dinormalisasi:


| Normalisasi | Normalisasi melewati...            | Butuh batch size besar? | Domain khas                       |
| ----------- | ---------------------------------- | ----------------------- | --------------------------------- |
| BatchNorm   | seluruh batch di tiap channel      | Ya (minimal 16-32)      | CNN visi                          |
| LayerNorm   | seluruh fitur di tiap sampel       | Tidak                   | Transformer, RNN                  |
| GroupNorm   | grup channel di tiap sampel        | Tidak                   | CNN batch kecil (segmentasi 3D)   |


BN menghitung statistik (*mean*, variance) dari seluruh sampel dalam batch; ketika batch kecil, statistik ini bising dan training jadi tidak stabil. Itulah alasan Transformer yang dilatih dengan batch 1-8 dokumen panjang, atau segmentasi medis 3D yang hanya muat dua volume per GPU, hampir selalu memakai LayerNorm atau GroupNorm. Alasan lebih dalam mengapa Transformer pilih LayerNorm, bukan BN: setiap token harus punya normalisasi yang tidak bergantung pada token lain di batch - kalimat "aku pergi ke pasar" tidak boleh berubah representasinya hanya karena berada di batch yang sama dengan "dia makan nasi". LayerNorm menormalisasi fitur dalam satu posisi (token) secara terpisah; BN tidak memberi jaminan ini.

![BatchNorm, LayerNorm, dan GroupNorm - perbedaan sumbu normalisasi pada tensor (N, C, H, W)](../figures/fig01f_normalization.svg)

**Aktivasi: ReLU, GELU, SiLU.** Non-linearitas yang paling sering Anda jumpai di kode riset:

- **ReLU** (`max(0, x)`): default untuk CNN dan MLP biasa. Murah, turunan 0 atau 1. Risiko: *dead ReLU* - neuron yang tidak pernah menyala bisa mati permanen jika learning rate terlalu besar di awal.
- **GELU** (`x · Φ(x)` dengan `Φ` adalah CDF Gaussian): default untuk Transformer modern (BERT, GPT). Lebih halus daripada ReLU dekat nol, sehingga gradient tidak putus mendadak.
- **SiLU / Swish** (`x · σ(x)`): dipakai di MobileNet v3, EfficientNet, dan beberapa LLM (mis. LLaMA). Kinerja mirip GELU, lebih murah dihitung.

Aturan praktisnya sederhana: pakai default yang disebut paper yang Anda replikasi. Mengganti aktivasi tanpa alasan kuat adalah variabel bonus yang harus Anda jelaskan di laporan; hampir selalu tidak sebanding dengan effort-nya.

![Kurva fungsi aktivasi ReLU, GELU, dan SiLU pada rentang [-3, 3]](../figures/fig01e_activation_functions.svg)

### 2.3 Loss sebagai Sinyal Pembelajaran

Loss menentukan *apa yang dianggap salah*. Mengganti loss berarti mengubah arah yang dianggap model sebagai "perbaikan". Dua kelas loss yang paling sering Anda temui:

**Untuk klasifikasi:** *cross-entropy* adalah pilihan default - ia mengukur jarak antara distribusi probabilitas prediksi dan label. *Focal loss* (Lin et al., 2017) memodifikasi cross-entropy dengan faktor `(1-p)^γ` yang menurunkan bobot sampel mudah dan menaikkan bobot sampel sulit; berguna pada kelas sangat tidak seimbang. *Label smoothing* mengganti label one-hot dengan distribusi sedikit kabur, membantu mencegah model terlalu percaya diri.

**Untuk regresi:** *mean squared error (MSE)* memberi hukuman kuadratik - sensitif terhadap outlier, cocok ketika residu kecil sudah sangat bermasalah. *Mean absolute error (MAE)* linear, lebih robust tetapi kurang tajam di sekitar nol. *Huber loss* menggabungkan keduanya.

Pertanyaan yang selalu relevan sebelum mengganti loss: *apa jenis kesalahan yang paling mahal di aplikasi Anda?* Jika false negative pada kelas minor lebih mahal daripada false positive, focal loss atau pembobotan kelas langsung membantu. Jika semua sampel setara, cross-entropy polos sudah cukup. Mengganti loss tanpa alasan jelas menambah satu variabel yang harus dijelaskan di laporan.

### 2.4 Optimizer: Bagaimana Langkah Diputuskan

Optimizer mengubah gradien menjadi langkah konkret pada parameter. Empat yang patut Anda kenali:

- **SGD (+ momentum).** Tertua, paling sederhana, sering paling kuat hasilnya setelah tuning yang tekun. Membutuhkan *learning rate schedule* yang dirancang dengan hati-hati. Banyak paper *state-of-the-art* di visi komputer tetap memakai SGD.
- **Adam dan AdamW.** Adaptif - setiap parameter mendapat learning rate yang disesuaikan. Sangat cepat konvergen di epoch awal, umum dipakai untuk prototyping. AdamW memperbaiki Adam dengan memisahkan *weight decay* dari gradien momentum.
- **LAMB.** Varian yang didesain untuk *batch size* besar (ribuan sampel). Relevan di training pre-training besar (BERT, GPT), jarang diperlukan di proyek kuliah.

> **Catatan: `weight_decay` di AdamW bukan L2 regularisasi.** Pada SGD, menambahkan L2 regularisasi (`λ ||w||²` ke loss) ekuivalen dengan mengurangan `λw` dari setiap parameter di setiap step - keduanya identik matematis. Pada Adam, hal ini **tidak berlaku**: karena Adam membagi gradient dengan estimasi variansi, penalti L2 yang ditambahkan ke loss mendapat efek yang tidak proporsional antar parameter. AdamW memperbaiki ini dengan mengaplikasikan pengurangan weight decay **langsung** ke parameter (bukan lewat gradient), terpisah dari adaptasi momentum. Akibat praktisnya: `weight_decay=0.01` di AdamW memberi efek regularisasi yang lebih konsisten dan lebih kuat daripada `weight_decay=0.01` di Adam. Untuk BERT/GPT family, disarankan tidak menerapkan weight decay pada parameter LayerNorm dan bias.

Dipasangkan dengan optimizer adalah *scheduler*: mekanisme menurunkan (atau menaikkan lalu menurunkan) learning rate selama training. `OneCycleLR`, `CosineAnnealingLR`, dan `ReduceLROnPlateau` adalah tiga pola yang paling sering Anda temui.

### 2.5 Evaluasi: Bukan Satu Angka

Satu kesalahan klasik pemula: membanggakan akurasi 95%, tanpa menyadari kelas positif hanya muncul 5% di data - sehingga *dummy classifier* yang selalu memprediksi "negatif" juga mencapai 95%. Evaluasi yang jujur memakai beberapa metrik, dipilih menurut tujuan.


| Metrik                  | Kapan dipakai                          | Kelemahan                                        |
| ----------------------- | -------------------------------------- | ------------------------------------------------ |
| Accuracy                | Kelas seimbang                         | Menyesatkan pada imbalance                       |
| Precision / Recall / F1 | Kelas imbalance, fokus pada satu kelas | Perlu memilih ambang batas                       |
| ROC-AUC                 | Evaluasi probabilistik binary          | Tidak mencerminkan performa pada ambang tertentu |
| PR-AUC                  | Imbalance ekstrem                      | Lebih sulit diinterpretasikan non-teknis         |
| Perplexity              | Model bahasa                           | Hanya bermakna relatif antar model               |


Di samping metrik, Anda juga perlu strategi validasi:

- **Hold-out split.** Bagi data menjadi train/val/test sekali, pakai val untuk tuning, test untuk pengukuran final. Cepat tetapi sensitif terhadap keberuntungan pembagian.
- **K-fold cross-validation.** Bagi data menjadi k bagian; training k kali dengan tiap bagian jadi validasi bergantian. Estimasi lebih stabil, biaya k kali training.
- **Stratified split/fold.** Pastikan distribusi kelas sama di setiap bagian; wajib untuk klasifikasi dengan imbalance.

### 2.6 Representasi Fitur: Tiga Pilihan Desain

Metrik evaluasi memberi tahu Anda *apakah* model bekerja, tetapi salah satu keputusan yang paling sering menentukan *seberapa baik* model bekerja adalah keputusan yang diambil jauh sebelum training dimulai: bagaimana data mentah diubah menjadi vektor yang akan masuk ke model? Pada modalitas yang sama dan tugas yang sama, pilihan representasi yang berbeda kerap menghasilkan selisih performa yang lebih besar daripada mengganti arsitektur atau loss. Karena itu, ketika seorang peneliti membandingkan dua metode, pertanyaan pertama yang pantas ditanyakan adalah "representasi apa yang dipakai", bukan "model apa yang dipakai".

Dalam praktiknya, Anda akan menjumpai tiga jenis representasi yang sering muncul di paper dan repositori riset.

**Engineered.** Fitur dirancang oleh manusia dengan pengetahuan domain - statistik agregat, transformasi matematis, atau fitur klasik yang sudah terbukti berguna. Di gambar contohnya histogram warna, HOG, atau SIFT. Di sinyal fisiologis seperti *continuous glucose monitor*, contohnya mean, koefisien variasi, atau *time-in-range*. Representasi *engineered* murah secara komputasi, mudah diinterpretasi, dan sering menjadi *baseline* yang mengejutkan kuat ketika data latih terbatas atau ketika dosen penguji meminta penjelasan "kenapa model mengambil keputusan ini".

**Extracted.** Fitur diambil dari lapisan tersembunyi model *pretrained* yang dibekukan - tidak satu parameter pun ikut dilatih ulang. Di visi, ini berarti mengambil *hidden states* dari CNN atau ViT yang di-*pretrain* pada ImageNet. Di teks, memanfaatkan token `[CLS]` atau *mean pooling* dari BERT. Di sinyal deret waktu, memakai *embedding* dari model seperti Chronos atau TimesFM. Pendekatan ini menjanjikan kompromi menarik: Anda mendapat representasi kaya dari model besar tanpa biaya training penuh, dengan syarat domain target tidak terlalu jauh dari domain *pretraining*.

**Learned.** Representasi dipelajari langsung dari data melalui training *end-to-end* atau *self-supervised*. Model tidak menerima petunjuk fitur eksplisit; ia harus menemukan sendiri mana bagian input yang berguna bagi tugas hilir. *Fine-tuning* BERT untuk klasifikasi, melatih 1D CNN dari nol pada sinyal ECG, atau me-*fine-tune* ResNet pada dataset medis semuanya termasuk kategori ini. Representasi *learned* biasanya paling kuat ketika data latih memadai, tetapi paling haus data dan paling mahal dilatih.

Tabel di bawah menunjukkan bagaimana ketiga pilihan tampak di beberapa domain yang sama. Bacalah menurun per kolom untuk memahami *gradasi kebebasan* - dari fitur yang sepenuhnya dirancang manusia, ke fitur yang diambil apa adanya dari model besar, ke fitur yang dipelajari langsung dari data target.


| Domain          | Engineered                                   | Extracted                                      | Learned                                  |
| --------------- | -------------------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| Gambar          | Histogram warna, HOG, SIFT                   | Hidden states dari CNN/ViT pretrained (frozen) | CNN di-fine-tune end-to-end              |
| Teks            | TF-IDF, n-gram, panjang kalimat              | `[CLS]` atau mean pooling dari BERT (frozen)   | BERT di-fine-tune untuk task hilir       |
| Sinyal CGM      | Mean, CV, TIR, TBR, daily pattern            | Hidden states dari Chronos / TimesFM (frozen)  | 1D CNN / transformer dilatih dari nol    |
| Audio           | MFCC, spectral centroid, ZCR                 | Embedding dari Wav2Vec2 / AST (frozen)         | CNN di atas spektrogram, end-to-end      |
| Ulasan / review | Panjang teks, rasio kata positif, skor VADER | Sentence embedding dari Sentence Transformers  | Transformer di-fine-tune untuk klasifikasi |

![Tiga strategi representasi fitur: Engineered (manual), Extracted (dari pretrained frozen), dan Learned (end-to-end)](../figures/fig01d_feature_representation.svg)

Pilihan di antara ketiganya jarang hitam-putih. Setelah Anda memutuskan jalur utama, beberapa keputusan turunan segera mengikuti. Jika memakai model *pretrained*, apakah ia sepenuhnya dibekukan atau ikut di-*fine-tune*, dan jika hanya sebagian, layer mana yang dibuka? Layer awal umumnya menyimpan fitur umum (tepi, tekstur, *part-of-speech*) yang lebih aman diwariskan, sementara layer dalam berisi fitur yang lebih spesifik domain. Jika mengambil *hidden states* sebagai representasi, bagaimana cara mereduksinya menjadi satu vektor - token `[CLS]`, *mean pooling*, *attention pooling*, atau konkatenasi beberapa layer sekaligus? Dan akhirnya, apakah satu representasi tunggal cukup, atau lebih bijak menggabungkan *engineered* dan *extracted* sebagai ansambel untuk menangkap dua sudut pandang berbeda terhadap data yang sama?

**Implikasi untuk eksperimen.** Taksonomi ini akan menjadi penting di Bab 02 ketika Anda merumuskan variabel eksperimen. Membandingkan "BERT *frozen* + *head* kecil" dengan "BERT di-*fine-tune* penuh" bukan sekadar membandingkan dua model; Anda sesungguhnya membandingkan dua strategi representasi - *extracted* vs. *learned* - dengan tingkat kebebasan yang sangat berbeda. Demikian pula, mengganti "fitur statistik CGM + XGBoost" dengan "1D CNN *end-to-end*" adalah lompatan dari *engineered* ke *learned*, bukan sekadar "pakai deep learning". Menyadari perbedaan ini sejak awal menyelamatkan Anda dari klaim yang keliru di laporan - misalnya mengaitkan peningkatan performa pada "model yang lebih canggih", padahal yang sebenarnya berubah adalah tingkat kebebasan representasi. Keputusan *freeze vs. fine-tune* yang akan Anda lakukan di Bab 02 pada dasarnya adalah keputusan geser satu kotak ke kanan di tabel di atas.

Dengan fondasi ini berdiri lengkap - pasangan tensor input → output, empat keluarga arsitektur, layer sebagai transformasi, loss sebagai sinyal, optimizer sebagai mekanisme langkah, evaluasi yang jujur, dan tiga pilihan representasi - Anda siap membangun model konkret. Bagian berikutnya menurunkan semua ini pada satu kasus *hands-on*: CNN sederhana pada CIFAR-10.

---

### 2.7 Membaca Sinyal: Diagnosis dari Loss Curve

Training selesai. Kurva loss muncul di layar. Inilah momen di mana banyak pemula berhenti karena tidak tahu harus membaca apa. Kurva loss bukan sekadar "turun = bagus, naik = buruk" - ia adalah *sinyal diagnostik* yang bisa memberi tahu apa yang salah bahkan sebelum Anda memeriksa kode.

Lima pola yang paling sering ditemui, masing-masing dengan hipotesis dan langkah test:

**Pola 1: Loss training tinggi, tidak turun dari awal.**
Model tidak belajar sama sekali. Hipotesis paling umum: (a) learning rate terlalu kecil - gradient update tidak berarti, atau (b) bug di forward pass - cek dengan *overfit one batch* (training pada 1-4 sampel saja; model seharusnya bisa mencapai loss sangat kecil dalam beberapa iterasi). Langkah test: naikkan LR 10× dan lihat apakah loss mulai turun. Jika tidak, curigai bug di kode.

**Pola 2: Loss training turun, tapi loss validasi stagnan atau lebih tinggi sejak awal.**
Overfitting terjadi sangat cepat. Hipotesis: dataset terlalu kecil relatif terhadap kapasitas model, atau ada data leakage. Langkah test: kurangi kapasitas model (lebih sedikit layer/neuron) atau tambah regularisasi (dropout, weight decay, augmentasi). Jika val loss tidak membaik sama sekali, curigai leakage.

**Pola 3: Loss training dan validasi turun sejajar, tetapi val jauh di atas train di akhir.**
Overfitting klasik - model berhasil belajar tapi terlalu hafal data training. Hipotesis: terlalu banyak kapasitas, terlalu sedikit augmentasi, atau training terlalu lama. Langkah test: identifikasi epoch terbaik dari kurva val (biasanya sebelum titik divergen) dan gunakan *early stopping*.

**Pola 4: Loss validasi turun tapi loss training stagnan di angka tinggi.**
Ini jarang terjadi tetapi mengindikasikan *underfitting* - model terlalu kecil atau LR terlalu rendah untuk muat ke distribusi training. Paradoksnya val bisa lebih baik dari train jika val set kebetulan lebih mudah. Langkah test: periksa apakah augmentasi terlalu agresif (membuat training jauh lebih sulit dari val).

**Pola 5: Loss meledak - tiba-tiba menjadi `NaN` atau naik tajam.**
Gradient explosion. Hipotesis: (a) LR terlalu besar, atau (b) tidak ada gradient clipping. Langkah test: kurangi LR 10× atau tambahkan `grad_clip = 1.0`. Untuk RNN dan Transformer, gradient clipping hampir selalu diperlukan.

Satu teknik yang wajib dikuasai untuk mendiagnosis bug (berbeda dari overfitting): **overfit satu batch**. Ambil 4-8 sampel training, jalankan ratusan iterasi hanya pada sampel itu. Jika model tidak bisa mencapai loss mendekati nol, ada bug di arsitektur atau loss function - bukan masalah data atau hiperparameter. Jika bisa, model sehat; masalahnya ada di tempat lain. Karpathy menyebut teknik ini sebagai "the most important debugging tool".

![Lima pola loss curve untuk diagnosis: underfitting, overfitting, early divergence, val lebih rendah dari train, dan konvergensi normal](../figures/fig01c_loss_curves_diagnostic.svg)

---

## 3. Worked Example: SimpleCNN pada CIFAR-10

Tujuan: membangun CNN minimal yang dapat training penuh pada CIFAR-10, menjelaskan setiap keputusan desain, dan mengevaluasi dengan metrik yang tepat.

### 3.1 Definisi Model

```python
import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    """CNN dua blok konvolusi - dibuat sederhana agar Anda bisa melacak dimensi
    dan jumlah parameter tanpa bantuan debugger."""

    def __init__(self, num_classes: int = 10):
        super().__init__()
        # Blok 1: 3 channel input (RGB) -> 32 channel; resolusi 32 -> 16 setelah pool
        self.block1 = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        # Blok 2: 32 -> 64 channel; resolusi 16 -> 8
        self.block2 = nn.Sequential(
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        # Classifier: flatten lalu dua linear
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 8 * 8, 256),
            nn.ReLU(inplace=True),
            nn.Dropout(0.3),
            nn.Linear(256, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.block1(x)
        x = self.block2(x)
        return self.classifier(x)
```

Alasan tiap pilihan, dibaca baris demi baris:

- `**Conv2d(3, 32, ...)` dengan `padding=1**`: padding mempertahankan dimensi spasial setelah konvolusi; tanpa padding resolusi menyusut dan Anda harus mengimbangi dengan kernel/pool berbeda.
- `**BatchNorm2d` sebelum ReLU**: menstabilkan distribusi input tiap layer, mempercepat konvergensi. Urutan Conv → BN → ReLU adalah konvensi yang paling umum.
- `**MaxPool2d(2)`** setelah tiap blok: menurunkan resolusi setengah, memperluas *receptive field* layer berikutnya.
- `**Dropout(0.3)*`* di classifier: regularisasi ringan; tanpa ini model mudah overfitting pada dataset kecil.
- **Classifier tidak memakai `Softmax`**: output adalah *logits* mentah. `CrossEntropyLoss` di PyTorch sudah melakukan log-softmax secara numerik stabil di dalamnya.

### 3.2 Setup Training Minimal

```python
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# Transform: normalisasi dengan statistik CIFAR-10 yang dikenal
transform_train = transforms.Compose([
    transforms.RandomCrop(32, padding=4),       # augmentasi sederhana
    transforms.RandomHorizontalFlip(),          # CIFAR-10: kelas simetris
    transforms.ToTensor(),
    transforms.Normalize((0.4914, 0.4822, 0.4465),
                         (0.2470, 0.2435, 0.2616)),
])

trainset = datasets.CIFAR10(root='./data', train=True,
                            download=True, transform=transform_train)
trainloader = DataLoader(trainset, batch_size=128, shuffle=True, num_workers=2)

device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = SimpleCNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=1e-4)
```

Lima keputusan yang perlu Anda pahami:

1. **Augmentasi hanya pada training set.** Random crop dan flip memaksa model melihat variasi yang tidak ada di data asli, mengurangi overfitting. Pada validation/test set, *jangan* dipakai - Anda ingin mengukur performa pada data apa adanya.
2. **Normalisasi dengan statistik yang tepat.** Angka di atas adalah mean dan std per channel yang dihitung dari training set CIFAR-10. Pakai statistik yang sama di validation/test.
3. **Batch size 128.** Cukup besar agar gradien tidak terlalu berisik, cukup kecil agar muat di GPU kecil. Batch size yang sangat kecil (< 16) sering membuat BatchNorm tidak stabil.
4. **AdamW dengan lr=3e-4.** Nilai "default yang sering berhasil" dari blog Karpathy. Weight decay kecil agar ada regularisasi tanpa menahan model terlalu kuat.
5. `**device` otomatis.** Kode yang sama jalan di laptop tanpa GPU dan di server; tidak ada alasan menulisnya *hard-coded*.

### 3.3 Training Loop

```python
def train_one_epoch(model, loader, criterion, optimizer, device):
    model.train()
    total_loss, correct, total = 0.0, 0, 0
    for xb, yb in loader:
        xb, yb = xb.to(device), yb.to(device)
        optimizer.zero_grad()
        logits = model(xb)
        loss = criterion(logits, yb)
        loss.backward()
        optimizer.step()
        total_loss += loss.item() * xb.size(0)
        correct += (logits.argmax(1) == yb).sum().item()
        total += xb.size(0)
    return total_loss / total, correct / total

for epoch in range(20):
    train_loss, train_acc = train_one_epoch(
        model, trainloader, criterion, optimizer, device)
    print(f"epoch {epoch+1:2d}  loss={train_loss:.4f}  acc={train_acc:.4f}")
```

Empat hal yang layak diperhatikan:

- `**model.train()` vs `model.eval()`.** Mode memengaruhi perilaku Dropout dan BatchNorm. Lupa memanggil `.eval()` saat evaluasi adalah bug yang sangat umum.
- `**optimizer.zero_grad()` di awal iterasi.** PyTorch mengakumulasi gradien secara default; jika tidak di-reset, Anda akan meng-update dengan gradien campuran beberapa batch.
- `**loss.item() * xb.size(0)`.** Kita rata-ratakan di akhir, jadi kalikan dengan ukuran batch di tengah agar hasil konsisten ketika ukuran batch tidak seragam (batch terakhir sering lebih kecil).
- **Tidak ada validasi di loop ini.** Sengaja dibuat minimal; Lab 1 akan menambah validasi set dan tracking loss/accuracy per epoch.

### 3.4 Evaluasi yang Jujur

Setelah training, jangan langsung menulis "model berhasil mencapai akurasi X%". Tiga pemeriksaan:

1. **Apakah model mengalami overfitting?** Bandingkan train accuracy dengan val accuracy. Selisih > 10% biasanya sinyal overfitting.
2. **Akurasi per kelas.** Kelas yang lebih sulit (pada CIFAR-10, biasanya `cat` vs `dog`) mengalami akurasi lebih rendah. Confusion matrix menunjukkan pola kesalahan.
3. **Sampel yang salah.** Visualisasikan 10 gambar yang paling *confident* salah. Sering kali ada pola yang bisa dijelaskan - misalnya, kucing yang berpose seperti anjing, atau gambar yang terlalu gelap.

---

## 4. Pitfalls & Miskonsepsi

**"Arsitektur yang lebih dalam selalu lebih baik."** Tidak. Tanpa data cukup banyak, model dalam cenderung overfitting. Tanpa *residual connection* atau teknik stabilisasi, training model sangat dalam juga sering gagal konvergen. Aturan praktis: mulai dari arsitektur sederhana yang konvergen, lalu tingkatkan kedalaman hanya jika bottleneck terbukti adalah kapasitas model.

**"Adam selalu lebih baik dari SGD."** Pada banyak tugas, Adam konvergen lebih cepat di epoch awal tetapi SGD (dengan momentum dan learning rate schedule yang tepat) sering menang di akhir. Keputusan bergantung pada tugas; jangan menganggap salah satunya superior tanpa data.

**"Accuracy 99% berarti model hebat."** Selalu periksa baseline naif - dummy classifier yang memprediksi kelas mayoritas. Jika akurasinya juga tinggi, Anda sedang mengukur kesamaan dengan distribusi kelas, bukan kemampuan model. Pelajaran ini akan kembali di Bab 04 dalam konteks *leakage*.

**"Loss turun berarti model membaik."** Turunnya training loss tanpa validation yang terpantau bisa berarti model menghafal, bukan belajar. Validation loss yang stagnan atau naik sementara training loss turun adalah tanda klasik overfitting.

**"Mengganti loss pasti akan meningkatkan performa jika diimplementasi benar."** Tidak ada loss yang unggul secara universal. Focal loss, misalnya, membantu pada imbalance ekstrem tetapi dapat memperburuk performa pada kelas seimbang karena menurunkan sinyal dari mayoritas sampel. Selalu uji terhadap baseline yang sama.

---

## 5. Lab 1 - Baseline CNN pada CIFAR-10

Buka [Lab 1 - Baseline CNN pada CIFAR-10](template/notebooks/lab1_baseline_cnn.ipynb). Lab ini meminta Anda menyelesaikan empat tugas:

1. Melengkapi training loop dengan evaluasi pada validation set setiap epoch.
2. Menyimpan daftar `train_loss`, `val_loss`, `train_acc`, `val_acc` per epoch ke list, lalu memplotnya.
3. Menghitung dan memplot confusion matrix pada test set.
4. Memilih 10 kesalahan paling *confident*, memvisualisasikannya, dan menulis 3-4 kalimat amatan tentang pola kesalahan.

**Checklist verifikasi** sebelum lab dianggap selesai:

- Train accuracy ≥ 75%, val accuracy ≥ 70% setelah 20 epoch.
- Selisih train - val accuracy dilaporkan; jika > 10% dijelaskan.
- Confusion matrix tersimpan sebagai gambar di `experiments/lab1/`.
- Notebook dapat dijalankan ulang dari atas ke bawah tanpa error.

### 5.1 Lab 1b - Membandingkan Tiga Strategi Representasi (opsional, sangat dianjurkan)

Section 2.6 membahas tiga strategi representasi secara konseptual. Lab ini mengubah diskusi itu menjadi perbandingan eksperimental konkret. Pada CIFAR-10 yang sama, Anda akan membandingkan:

1. **Engineered**: ekstraksi fitur HOG manual + MLP kecil (tanpa pretrained weights apapun).
2. **Extracted**: ResNet-18 pretrained pada ImageNet, *dibekukan seluruhnya* - hanya linear probe di atasnya yang dilatih.
3. **Learned**: ResNet-18 pretrained, di-*fine-tune* penuh (semua layer ikut dilatih).

Buka [Lab 1b - Representasi](template/notebooks/lab1b_representasi.ipynb).

Pertanyaan yang dijawab setelah lab: Pada dataset terbatas (500 sampel per kelas), strategi mana yang paling menguntungkan? Pada dataset penuh (5000 sampel per kelas), apakah jawabannya berubah? Apa yang membuat *extracted* lebih unggul dari *learned* di kondisi tertentu?

---

## 6. Refleksi

1. Anda diberi dataset baru: 500 sinyal EKG satu dimensi, panjang masing-masing 5000 titik, target empat kelas aritmia. Keluarga arsitektur apa yang paling masuk akal untuk Anda coba pertama kali, dan mengapa? Pilihan kedua Anda apa, dan di kondisi apa ia lebih cocok daripada pilihan pertama?
2. Bayangkan Anda sudah training SimpleCNN dan mendapat train accuracy 95% tetapi val accuracy 68%. Tanpa melihat kodenya, sebutkan tiga hipotesis paling mungkin tentang penyebabnya, lalu tiga eksperimen pendek yang bisa membedakan satu hipotesis dari yang lain.
3. Saat Anda mengganti `CrossEntropyLoss` menjadi `FocalLoss`, apa saja variabel yang *secara implisit* juga berubah, walaupun Anda tidak menyentuhnya? (Petunjuk: pikirkan learning rate efektif, tekanan pada kelas minor, stabilitas awal training.) Bagaimana ini memengaruhi cara Anda merancang perbandingan?
4. Seorang kolaborator mengirim dataset baru: rekaman suara tangisan bayi sepanjang tiga detik pada *sampling rate* 16 kHz, dilabeli empat kategori (lapar, mengantuk, tidak nyaman, kesakitan). Tuliskan pasangan tensor input → output yang paling alami menurut Anda, jelaskan mengapa bentuk tersebut paling cocok, lalu ajukan satu alternatif representasi input (misalnya mel-spektrogram 2D) yang mengubah bentuk tensor input. Diskusikan bagaimana perubahan bentuk tersebut menggeser pilihan keluarga arsitektur yang masuk akal dicoba pertama kali.
5. Anda ditugaskan membangun klasifikasi kualitas biji kopi dari foto *close-up*. Dataset tersedia hanya 300 gambar per kelas untuk empat kelas. Bandingkan tiga strategi representasi - *engineered* (misalnya histogram warna + statistik tekstur), *extracted* (misalnya *hidden states* dari ViT pretrained yang dibekukan), dan *learned* (CNN kecil dilatih dari nol). Manakah yang paling masuk akal Anda coba terlebih dahulu dan mengapa? Pada titik penambahan data sejumlah berapa Anda akan mempertimbangkan berpindah strategi, dan apa bukti yang akan mendorong perpindahan itu?
6. **Koneksi ke Capstone.** Saat Anda membuka bab 10 (Capstone), Anda akan diminta memilih topik dan membangun baseline dari repo riset nyata. Dari kerangka tensor input → output dan empat keluarga arsitektur di bab ini, bagian mana yang akan paling sering Anda pakai saat memilih baseline Capstone? Tuliskan satu kalimat yang menjawab: "Saat membaca repo Capstone nanti, pertanyaan pertama yang akan saya tanyakan ke diri sendiri adalah ...".

---

## 7. Bacaan Lanjutan

- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (2019). Menunjukkan ritme kerja seorang peneliti berpengalaman; bagian "overfit a single batch" adalah pengujian yang sangat kuat untuk mendeteksi bug di loop training Anda.
- **Christopher Olah - *Understanding LSTM Networks*** (blog, 2015). Penjelasan visual paling jelas tentang mengapa LSTM ada dan mekanisme gate-nya bekerja. Dibaca ringan sebelum Anda perlu bekerja dengan urutan panjang.
- **Lin et al. - *Focal Loss for Dense Object Detection*** (ICCV 2017). Paper asli focal loss; baca bagian 3 saja untuk intuisi, lewati eksperimen detection.
- **The Deep Learning Book (Goodfellow et al.), Bab 6 & 9**. Bab 6 untuk FFN, Bab 9 untuk CNN. Bacaan rujukan yang tidak perlu dibaca sekaligus.

---

## Lanjut ke Bab 02

Anda sudah bisa memilih arsitektur dan membangun baseline. Bab 02 mengubah fokus dari *memahami sistem* menjadi *merancang eksperimen*: bagaimana menerjemahkan instruksi seperti "uji focal loss dan freeze blok awal pada backbone" menjadi rancangan konkret dengan variabel, baseline, hipotesis, dan metrik sukses yang dapat dipertanggungjawabkan.

Buka [Bab 02 - Ide ke Eksperimen](02_Ide_Ke_Eksperimen.md) ketika siap.
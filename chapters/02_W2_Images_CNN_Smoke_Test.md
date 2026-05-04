<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 00a | [Prasyarat Modul](00a_Prasyarat.md) | – |
| 01 | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) | 1 |
| ▶ 02 | W2 - Images, CNN & Smoke Test | 2 |
| 03 | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) | 3 |
| 04 | [W4 - Reproducibility & Experiment Matrix](04_W4_Reproducibility_Experiment_Matrix.md) | 4 |
| 05 | [W5 - Sequences: RNN & LSTM](05_W5_Sequences_RNN_LSTM.md) | 5 |
| 06 | [W6 - Representations & Temporal Leakage](06_W6_Representations_Temporal_Leakage.md) | 6 |
| 07 | [W7 - Text, Transformers & Repo Adoption](07_W7_Text_Transformers_Repo_Adoption.md) | 7 |
| 08 | [W8 - Foundation Models](08_W8_Foundation_Models.md) | 8 |
| 09 | [W9 - Multimodal Reasoning](09_W9_Multimodal_Reasoning.md) | 9 |
| 10 | [W10 - Paper Reading & Implementation](10_W10_Paper_Reading.md) | 10 |
| 11 | [W11 - Research Framing](11_W11_Research_Framing.md) | 11 |
| 12 | [Capstone - Proyek Riset](12_Capstone.md) | 12-15 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | – |
| 14 | [Lampiran](14_Lampiran.md) | – |
| 15 | [Panduan Instruktur](15_Panduan_Instruktur.md) | – |

</details>

---

# 02 · W2 - Images, CNN & Smoke Test

> *Arsitektur bukan daftar definisi untuk dihafalkan. Arsitektur adalah keputusan desain yang berangkat dari pertanyaan: pola apa yang dibawa data Anda, dan struktur model apa yang paling cocok untuk pola itu?*

**Baris peta besar:** `(C, H, W) -> (N,)`
**Kebiasaan riset:** Smoke test tiga level
**Dataset:** CIFAR-10 (image classification)
**Lab utama:** Lab 1 ([lab_w2_cnn_baseline.ipynb](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w2_cnn_baseline.ipynb))

---

## 0. Peta Bab

W2 memperkenalkan tensor citra, arsitektur CNN, dan tiga kebiasaan debugging terpenting yang dipakai sepanjang bootcamp. Bab ini menampilkan contoh training yang berhasil belajar, contoh training yang gagal belajar, dan smoke test yang menangkap error sebelum training berjalan berjam-jam.

- **2.1** Peta Besar: tensor masuk dan tensor keluar
- **2.2** MLP dan Backpropagation: ide utama
- **2.3** Smoke Test Tiga Level
- **2.4** Galeri Training: sebelum membaca teori
- **2.5** Conv2d: gambaran sebelum kode (kernel, stride, padding, output shape)
- **2.6** Empat keluarga arsitektur sebagai asumsi tentang data
- **2.7** Layer sebagai transformasi representasi: inisialisasi, normalisasi, aktivasi
- **2.8** Augmentation, Dropout, dan Regularization
- **Lampiran A.1** Backpropagation derivasi manual (opsional, tersedia setelah W2)

Setelah W2, lanjut ke [W3](03_W3_Loss_Optimizer_Evaluasi.md) untuk loss, optimizer, evaluasi, dan diagnosis loss curve.

**Lab minggu ini:** Lab 1c (MLP numpy, breadth opsional) dan Lab 1 (baseline CNN, dimulai di W2, selesai di W3).

---

## 1. Motivasi: Tiga Dataset di Meja Anda

Seorang rekan mengirim tiga dataset sekaligus: *"tolong coba klasifikasikan dulu, pakai arsitektur yang menurut Anda paling masuk akal"*.

- **A**: tabel medis - 20 kolom hasil lab darah pasien, target diabetes ya/tidak.
- **B**: 10.000 gambar daun sawit berlabel *sehat* atau *terkena penyakit*, resolusi 224×224.
- **C**: 30.000 review produk berbahasa Indonesia, target sentimen positif/negatif.

Tanpa membuka paper apa pun, Anda sudah bisa menebak keluarga arsitektur yang cocok. Dataset A berupa fitur tabular datar; feed-forward network sudah masuk akal. Dataset B berupa grid piksel 2D dengan *translation invariance*; CNN cocok untuk struktur seperti ini. Dataset C berupa urutan kata dengan ketergantungan jangka panjang; Transformer atau RNN lebih masuk akal.

Poinnya: setiap keluarga arsitektur dibangun dengan *asumsi tertentu* tentang bentuk data. Memilih arsitektur berarti memilih asumsi mana yang paling tepat.

---

## 1.5 Citra sebagai Tensor: dari Pixel ke Tensor 4D

Sebelum membahas CNN dan smoke test, kita pastikan dulu titik awalnya: bagaimana sebenarnya satu foto berubah menjadi tensor yang bisa diterima `nn.Conv2d`?

### 1.5.1 Pixel sebagai Angka

Sebuah foto grayscale 4×4 hanyalah matriks 4×4 dengan nilai pixel `0..255` (atau `0..1` setelah dinormalkan ke float). Misal foto berikut menyimpan sebuah pola gelap kecil di tengah latar terang:

```
255 255 255 255
255 200  50 255
255  50 200 255
255 255 255 255
```

Tensor representasinya: `(H, W) = (4, 4)`. Sumbu pertama adalah baris (tinggi), sumbu kedua adalah kolom (lebar).

### 1.5.2 RGB: Tiga Channel yang Ditumpuk

Foto berwarna sebenarnya adalah **tiga foto grayscale yang ditumpuk**: satu untuk channel merah (R), satu hijau (G), satu biru (B). Setiap channel adalah matriks `H×W` independen. Saat ditumpuk, shape menjadi `(C, H, W)` dengan `C = 3`.

```
  R-channel        G-channel        B-channel
  4×4 angka        4×4 angka        4×4 angka
       │                │                │
       └────────────────┴────────────────┘
                        ▼
              tumpuk jadi (3, 4, 4)
```

PyTorch memakai konvensi **channel-first**: channel adalah sumbu pertama setelah batch. Beberapa library lain (TensorFlow Keras default) memakai channel-last `(H, W, C)`. Saat porting kode antar library, periksa konvensi terlebih dahulu.

### 1.5.3 Batch: Banyak Gambar Sekaligus

Training tidak memproses satu foto per langkah. Sekumpulan foto sebanyak `B` digabung dalam satu **batch**, sehingga tensor input ke model berbentuk:

```
(B, C, H, W)
 │  │  │  │
 │  │  │  └── lebar gambar
 │  │  └───── tinggi gambar
 │  └──────── jumlah channel (RGB → 3, grayscale → 1)
 └─────────── jumlah gambar dalam batch
```

Contoh konkret CIFAR-10: 32 foto RGB 32×32 dalam satu batch berbentuk `(32, 3, 32, 32)`. Inilah notasi yang muncul di seluruh bab W2 dan W3.

> [!TIP]
> Kalau Anda lupa urutan sumbu, panggil `print(x.shape)` setelah `next(iter(loader))`. Tensor dengan empat angka di shape adalah 4D dengan urutan `(B, C, H, W)` di PyTorch.

---

## 2. Konsep Inti

### 2.1 Peta Besar: Tensor Masuk, Tensor Keluar

Satu kerangka berpikir menyederhanakan hampir setiap keputusan desain dalam deep learning: setiap masalah dapat dipahami dengan menjawab dua pertanyaan - *bentuk tensor apa yang masuk*, dan *bentuk apa yang keluar*. Segala sesuatu di antaranya - MLP, CNN, RNN, Transformer - bertugas mengubah satu bentuk tensor menjadi bentuk lain.

Saat membaca kode repositori yang belum dikenal, hal pertama yang perlu Anda perhatikan adalah bentuk batch di `DataLoader` dan bentuk tensor tepat sebelum fungsi loss. Dari dua informasi itu saja, Anda sudah bisa menebak keluarga arsitektur yang masuk akal. Sebaliknya, saat merancang eksperimen untuk domain baru, tulis dulu pasangan tensor input → output di kertas sebelum menulis satu baris kode pun. Cara ini sering mempersempit pilihan dari "semua model di dunia" menjadi "satu atau dua keluarga yang masuk akal".


| Domain | Contoh Data | Tensor Input | Tensor Output | Contoh Tugas |
| --- | --- | --- | --- | --- |
| Tabular | Umur, tekanan darah, kolesterol | `(F,)` - vektor fitur | `(N,)` | Klasifikasi risiko penyakit |
| Gambar | Foto RGB 224×224 | `(C, H, W)` | `(N,)` | Klasifikasi kucing vs anjing |
| Gambar | Foto kebun / jalan | `(C, H, W)` | `(G, G, 5+N)` | Deteksi objek |
| Teks | Ulasan produk | `(T,)` - urutan token | `(N,)` | Klasifikasi sentimen |
| Teks | Kalimat berita | `(T,)` - urutan token | `(T, N)` | Token classification |
| Deret waktu | Sinyal sensor per detik | `(T, F)` - waktu × fitur | `(1,)` | Prediksi nilai berikutnya |
| Deret waktu | Data glukosa dari waktu ke waktu | `(T, F)` | `(T', 1)` | Prediksi urutan masa depan |
| Multimodal | Foto produk + deskripsi teks | `(C,H,W)` dan `(T,)` | `(N,)` | Klasifikasi produk |


Perhatikan bahwa output tidak selalu `(N,)`: deteksi objek menghasilkan tensor tiga dimensi karena setiap sel grid memprediksi beberapa kotak dan kelas. Transisi dari "tugas apa yang ingin saya selesaikan" ke "bentuk output yang benar" adalah keputusan yang perlu diselesaikan sebelum memilih arsitektur.

### 2.2 MLP dan Backpropagation: Ide Utama

Semua keluarga arsitektur neural network, pada level komputasi, adalah **MLP dengan batasan tambahan**: CNN adalah MLP yang dipaksa berbagi bobot antar lokasi spasial, Transformer adalah MLP yang memproses setiap posisi dengan bobot sama, RNN adalah MLP yang dipanggil berulang sepanjang waktu.

Model belajar lewat **backpropagation**: setelah loss dihitung di output, gradient dari loss terhadap setiap parameter dirambatkan mundur melalui chain rule, lalu optimizer memperbarui parameter ke arah penurunan loss. `loss.backward()` di PyTorch mengerjakan ini secara otomatis.

Dua fenomena penting yang sering disebut paper:

- **Vanishing gradient** - gradient melemah saat merambat mundur melewati banyak layer; ReLU adalah solusi paling umum.
- **Exploding gradient** - gradient meledak saat bobot besar; *gradient clipping* adalah solusinya.

> [!NOTE]
> Derivasi 7-langkah chain rule untuk MLP (MSE loss + sigmoid) tersedia lengkap di [Lampiran A.1](14_Lampiran.md#a1-backpropagation-derivasi-manual). Baca setelah W3, ketika Anda sudah punya beberapa run sukses untuk diinterpretasi. Lab 1c (MLP numpy from-scratch) tersedia sebagai breadth lab opsional dan menerapkan backprop secara konkret pada MNIST.

### 2.3 Smoke Test Tiga Level

Tiga level smoke test bukan formalitas; masing-masing menargetkan **tiga jenis bug paling sering** di pipeline deep learning, dari yang paling murah dideteksi ke yang paling mahal:

1. **Typo / import / path error** - terdeteksi di Level 1 (`import model`). Tidak butuh dataset, tidak butuh forward pass.
2. **Shape mismatch antar layer** - terdeteksi di Level 2 (dummy forward dengan tensor random). Butuh model dimuat tetapi tidak butuh data dari dataset.
3. **Algoritma rusak** (gradient mati, loss tidak turun, target salah-bentuk) - terdeteksi di Level 3 (overfit one batch). Butuh data dari dataset tetapi hanya 4-8 sampel.

Setiap level lebih mahal daripada level sebelumnya, dan masing-masing menangkap jenis bug yang berbeda. Jangan lompat ke Level 3 sebelum Level 1 dan 2 lulus, dan jangan mulai training 30 epoch sebelum Level 3 lulus.

Sebelum training berjam-jam, jalankan tiga tes ini berurutan. Jika satu tes gagal, hentikan dan perbaiki sebelum lanjut.

**Level 1 - Import test.** `import model; model.eval()`. Gagal berarti ada typo, missing dependency, atau shape mismatch di definisi layer.

**Level 2 - Dummy forward pass.** Buat tensor random dengan shape yang benar, umpankan ke model, periksa output shape.

```python
x = torch.randn(2, 3, 32, 32)  # batch=2, RGB, 32x32
logits = model(x)
assert logits.shape == (2, 10), f"got {logits.shape}"
```

**Level 3 - Overfit one batch.** Ambil 4-8 sampel dari dataset sebenarnya. Jalankan 50-100 iterasi hanya pada sampel itu. Jika loss tidak mendekati nol, ada bug di training loop atau loss function, bukan masalah hyperparameter.

```python
x, y = next(iter(train_loader))  # satu batch kecil
for i in range(100):
    optimizer.zero_grad()
    loss = criterion(model(x), y)
    loss.backward()
    optimizer.step()
    if i % 20 == 0:
        print(f"iter {i}: loss={loss.item():.4f}")
# Ekspektasi: loss turun dari ~2.3 menuju ~0.0 dalam 100 iterasi
```

> [!IMPORTANT]
> Overfit one batch adalah tes paling diagnostik. Jika gagal: ada bug di kode Anda, bukan di hyperparameter. Jika berhasil: model berfungsi dengan benar, masalah performa berasal dari data, augmentasi, atau regularisasi.

### 2.4 Galeri Training: Sebelum Membaca Teori

Sebelum mendalami arsitektur, lihat empat contoh training konkret dan tanyakan diri sendiri: *apa yang berbeda?*

- **Run A:** Loss training dan val turun sejajar, keduanya mencapai angka rendah di epoch 20. Ini training yang berjalan baik.
- **Run B:** Loss training turun mulus tapi loss val stagnan sejak epoch 4. Sesuatu sudah salah di sini - apa?
- **Run C:** Loss training tidak bergerak sama sekali dari epoch pertama. Apakah ini masalah learning rate atau bug?
- **Run D:** Loss meledak ke `NaN` di epoch ke-8 setelah awalnya turun normal.

Jangan baca jawabannya dulu. Tuliskan hipotesis Anda untuk setiap contoh dalam satu kalimat. Kita akan kembali ke empat contoh ini di W3 dengan kerangka diagnosis yang lengkap.

### 2.5 Conv2d: Gambaran Sebelum Kode

`nn.Conv2d` adalah komponen utama CNN. Sebelum melihat parameter di kode SimpleCNN nanti, kita pahami dulu apa yang ia lakukan secara mekanis.

#### 2.5.1 Filter yang Geser

Bayangkan satu **filter** (juga disebut **kernel**) kecil 3×3 berisi 9 angka bobot. Filter ini ditempel di pojok kiri-atas gambar, dikalikan element-wise dengan patch gambar 3×3 di bawahnya, lalu dijumlahkan. Hasilnya: satu angka di output.

Kemudian filter digeser satu pixel ke kanan, operasi yang sama diulang, dan hasilnya menjadi angka berikutnya. Proses ini berlanjut sampai sudut kanan-bawah. Hasil keseluruhannya adalah **feature map** baru.

```
Image 5×5 (1 channel):           Filter 3×3:
                                    ┌─────────┐
 1  2  3  4  5                      │ 1  0  -1│
 6  7  8  9 10                      │ 1  0  -1│
11 12 13 14 15                      │ 1  0  -1│
16 17 18 19 20                      └─────────┘
21 22 23 24 25

Filter di posisi (0,0) - ambil patch 3×3 kiri-atas:
  patch  = [[ 1, 2, 3], [ 6, 7, 8], [11, 12, 13]]
  output[0,0] = 1*1 + 2*0 + 3*(-1)
              + 6*1 + 7*0 + 8*(-1)
              + 11*1 + 12*0 + 13*(-1)
              = -6

Filter geser ke kanan satu pixel, ulangi. Total 3×3 = 9 posisi → output 3×3.
```

Filter di atas adalah **detektor tepi vertikal sederhana**: nilainya menjadi besar di lokasi yang berisi transisi terang-ke-gelap dari kiri ke kanan. Dalam praktiknya, bobot filter dipelajari otomatis lewat training; CNN belajar filter apa yang berguna untuk tugasnya.

#### 2.5.2 Kernel, Stride, Padding

Tiga parameter utama `Conv2d`:

- **Kernel size** - ukuran filter. 3×3 paling umum. Kernel 1×1 = projection per-pixel; kernel 7×7 = receptive field besar tapi parameter banyak.
- **Stride** - berapa pixel filter geser setiap langkah. `stride=1` (default) menggeser satu pixel; `stride=2` menggeser dua pixel sehingga output setengah lebih kecil di tiap dimensi spasial.
- **Padding** - berapa baris/kolom nol ditambahkan di tepi image sebelum konvolusi. `padding=1` menambah satu lapisan nol di setiap sisi; tanpa padding, output mengecil setiap layer.

#### 2.5.3 Rumus Output Shape

Untuk input dengan dimensi spasial `in`, kernel `k`, padding `p`, stride `s`, dimensi output:

```
out = (in - k + 2*p) / s + 1
```

Derivasi singkat: dari `in` pixel (ditambah padding `p` di kiri dan kanan menjadi total `in + 2p`), filter butuh ruang sebesar `k`. Jadi posisi awal filter punya `(in + 2p - k)` slot. Filter bergeser `s` per langkah, sehingga jumlah langkah = `(in + 2p - k) / s`, ditambah posisi awal = `+ 1`.

Contoh praktis dari SimpleCNN di §3.1:

```
Conv2d(3, 32, kernel_size=3, padding=1) pada input (B, 3, 32, 32):
  out = (32 - 3 + 2*1)/1 + 1 = 32          # padding=1 mempertahankan dimensi spasial

MaxPool2d(2) pada input (B, 32, 32, 32):
  out = (32 - 2 + 0)/2 + 1 = 16            # stride=2 setengahkan
```

Hafalkan rumus ini. Saat debug shape mismatch (Level 2 smoke test), ini adalah alat pertama Anda.

#### 2.5.4 Receptive Field

Satu pixel di feature map output **tidak hanya melihat satu pixel input**. Ia melihat patch input seukuran kernel. Saat layer Conv2d ditumpuk, satu pixel di feature map dalam melihat patch yang lebih besar di input asli, karena setiap layer mengakumulasi area yang dilihatnya.

```
Input image (12×12)
       │
       ▼ Conv 3×3, padding=1
Layer 1 feature map (12×12)
   satu pixel L1 melihat 3×3 patch di input
       │
       ▼ Conv 3×3, padding=1
Layer 2 feature map (12×12)
   satu pixel L2 melihat 3×3 patch di L1
   = 5×5 patch di input asli
```

Ukuran area input yang dilihat satu pixel di feature map disebut **receptive field**. Di layer akhir CNN yang dalam, receptive field bisa mencakup sebagian besar atau seluruh gambar. Dengan cara inilah CNN menangkap pola besar dari operasi lokal kecil.

> [!NOTE]
> Receptive field tumbuh kira-kira `1 + L*(k-1)` untuk `L` layer Conv `k×k` tanpa pooling, dan tumbuh berlipat saat ada pooling. Detail rumus tersedia di paper [*A guide to convolution arithmetic*](https://arxiv.org/abs/1603.07285) (Dumoulin & Visin, 2016).

### 2.6 Arsitektur sebagai Asumsi tentang Data

Empat keluarga yang paling sering muncul di paper dan repositori riset.

#### Feed-Forward Neural Network (FFN/MLP)

Lapisan linear berturut-turut dengan non-linearitas di antaranya. Asumsi: tidak ada struktur khusus pada fitur input - urutan kolom tidak bermakna, tidak ada kedekatan spasial atau temporal. Cocok untuk data tabular dan embedding yang sudah diproses. Kelemahan: tidak efisien ketika data punya struktur yang bisa dimanfaatkan.

#### Convolutional Neural Network (CNN)

Satu *filter* kecil digeser ke seluruh input, berbagi bobot di semua lokasi. Asumsi: pola relevan dapat muncul di lokasi manapun (*translation invariance*) dan bersifat lokal. Komponen khas: `Conv2d → BatchNorm → ReLU → MaxPool`. Kekuatan: sangat efisien parameter untuk gambar dan data grid. Kelemahan: asumsi lokalitas gagal ketika pola penting menyebar luas.

#### Recurrent Neural Network (RNN), LSTM, GRU

Memproses urutan satu langkah waktu demi satu, menyimpan *hidden state* yang merangkum masa lalu. Asumsi: urutan penting, informasi langkah sebelumnya membantu prediksi berikutnya. LSTM dan GRU memperkenalkan *gate* untuk mengatasi *vanishing gradient* pada RNN polos. Kelemahan: komputasi sekuensial (tidak bisa diparalelkan sepanjang urutan), ketergantungan sangat panjang tetap sulit ditangkap.

#### Transformer

Menggantikan rekursi dengan *self-attention*: setiap elemen urutan secara langsung melihat semua elemen lain. Komponen utama: `Multi-Head Attention`, `Positional Encoding`, `Feed-Forward` per posisi. Dominan di NLP modern (BERT, GPT), kini juga di visi (ViT) dan audio. Biaya utama: self-attention kuadratik terhadap panjang urutan.

![Lima keluarga arsitektur neural network: MLP, CNN, RNN/LSTM, Transformer, dan Autoencoder - masing-masing dengan inductive bias dan domain khasnya](../figures/fig01a_nn_families.svg)

Setiap keluarga di atas dapat Anda baca sebagai "MLP + asumsi spesifik domain". Ketika asumsi cocok dengan data, model belajar lebih efisien.

### 2.7 Layer sebagai Transformasi Representasi

Setiap layer adalah *fungsi* yang mengubah representasi data menjadi bentuk yang lebih berguna bagi layer berikutnya. Di CNN, layer awal belajar detail kecil (tepi, tekstur), layer dalam menggabungkannya menjadi konsep lebih tinggi. Dalam praktiknya, saat *fine-tune* model pretrained, layer awal biasanya aman di-*freeze*, sedangkan layer akhir perlu beradaptasi dengan domain baru.

**Inisialisasi bobot: titik awal yang sering diabaikan.** Memilih nol atau nilai terlalu besar menghancurkan sinyal gradient sejak iterasi pertama.

Sebelum membahas dua skema standar, perjelas notasinya:

- **σ** (sigma) adalah standar deviasi distribusi bobot saat diinisialisasi. Bobot diambil dari `Normal(mean=0, std=σ)`.
- **fan_in** adalah jumlah input ke satu neuron. Untuk `Linear(64, 32)`, fan_in dari layer ini = 64. Untuk `Conv2d(C_in=32, C_out=64, kernel=3)`, fan_in = `32 * 3 * 3 = 288`.
- **fan_out** adalah jumlah output dari satu neuron, kebalikannya.

Dua skema utama:

- **Kaiming (He) initialization** - untuk layer dengan aktivasi ReLU: `σ² = 2/fan_in`, jadi `σ = sqrt(2/fan_in)`. Kenapa angka 2? Karena ReLU mematikan kira-kira separuh aktivasi (yang negatif menjadi 0), variansi sinyal di output layer menyusut menjadi separuh. Mengompensasi dengan faktor 2 di variansi inisialisasi menjaga aliran sinyal stabil lewat banyak layer ReLU. PyTorch menerapkannya otomatis untuk `nn.Conv2d` dan `nn.Linear`.
- **Xavier (Glorot) initialization** - untuk aktivasi simetris (Tanh, Sigmoid): `σ² = 2/(fan_in + fan_out)`. Sering dipakai di Transformer (yang banyak memakai LayerNorm + GELU).

Anda jarang perlu menginisialisasi sendiri. Tapi ketika mendefinisikan layer kustom atau mendebug model yang tidak mau belajar dari epoch pertama, ini relevan:

```python
def init_weights(m):
    if isinstance(m, (nn.Conv2d, nn.Linear)):
        nn.init.kaiming_normal_(m.weight, nonlinearity='relu')
        if m.bias is not None:
            nn.init.zeros_(m.bias)

model.apply(init_weights)
```

**Normalisasi: BatchNorm, LayerNorm, GroupNorm.** Ketiganya berbeda pada sumbu yang dinormalisasi:

| Normalisasi | Normalisasi melewati... | Butuh batch size besar? | Domain khas |
| --- | --- | --- | --- |
| BatchNorm | seluruh batch di tiap channel | Ya (minimal 16-32) | CNN visi |
| LayerNorm | seluruh fitur di tiap sampel | Tidak | Transformer, RNN |
| GroupNorm | grup channel di tiap sampel | Tidak | CNN batch kecil (segmentasi 3D) |

BN menghitung statistik dari seluruh batch; batch kecil membuat statistik bising dan training tidak stabil. Itulah alasan Transformer yang dilatih dengan batch kecil hampir selalu memakai LayerNorm. Alasan lebih dalam: setiap token harus punya normalisasi yang tidak bergantung token lain di batch - LayerNorm memberi jaminan ini, BN tidak.

**Contoh konkret BatchNorm.** Anggap satu batch berisi 32 image, output dari Conv2d adalah `(32, 64, 16, 16)` (32 image × 64 channel × 16×16 spasial). `BatchNorm2d(64)` hitung mean dari semua nilai di sumbu `(N=32, H=16, W=16)` untuk **channel 1**, lalu untuk **channel 2**, dan seterusnya sampai channel 64. Hasil: 64 mean dan 64 std (satu pasang per channel). Setiap aktivasi lalu dinormalkan: `(x - mean_channel) / sqrt(var_channel + ε)`, kemudian diskalakan dengan parameter `γ` dan digeser dengan `β` yang dipelajari.

Ini berbeda dengan LayerNorm yang menormalkan **per sampel di sumbu fitur**: untuk satu image, hitung mean dari semua nilai `(C, H, W)` lalu normalkan. LayerNorm tidak butuh batch besar karena tidak mengagregasi lintas sampel.

![BatchNorm, LayerNorm, dan GroupNorm - perbedaan sumbu normalisasi pada tensor (N, C, H, W)](../figures/fig01f_normalization.svg)

**Aktivasi: ReLU, GELU, SiLU.**

- **ReLU** (`max(0, x)`): default untuk CNN dan MLP. Murah, turunan 0 atau 1. Risiko: *dead ReLU* - neuron yang tidak pernah menyala bisa mati permanen.
- **GELU** (`x · Φ(x)`): default untuk Transformer modern (BERT, GPT). Lebih halus dekat nol.
- **SiLU/Swish** (`x · σ(x)`): dipakai di MobileNet v3, EfficientNet, LLaMA. Kinerja mirip GELU, lebih murah dihitung.

Aturan praktisnya: pakai default yang disebut paper yang Anda replikasi. Mengganti aktivasi tanpa alasan kuat adalah variabel tambahan yang harus dijelaskan di laporan.

![Kurva fungsi aktivasi ReLU, GELU, dan SiLU pada rentang [-3, 3]](../figures/fig01e_activation_functions.svg)

### 2.8 Augmentation, Dropout, dan Regularization: Kosakata Sebelum Kode

Saat membaca kode SimpleCNN di §3, tiga istilah ini dipakai tanpa penjelasan. Kita definisikan dulu di sini supaya kode tidak terasa magis.

**Augmentation.** Transformasi acak yang diterapkan **hanya pada batch training** untuk memperluas variasi data. Contoh: `RandomCrop` (potong area acak), `RandomHorizontalFlip` (balik kiri-kanan dengan probabilitas 0.5), `ColorJitter` (ubah hue/brightness). Tujuannya agar model belajar fitur yang tetap stabil terhadap transformasi yang masuk akal di dunia nyata. Augmentasi tidak diterapkan di val/test; di sana kita ingin evaluasi pada data apa adanya.

**Dropout.** Layer `nn.Dropout(p)` secara acak menonaktifkan fraksi `p` aktivasi di setiap forward pass saat training (mis. `p=0.3` mematikan 30% neuron). Saat evaluasi (`model.eval()`), dropout otomatis nonaktif. Mengapa berguna? Memaksa model tidak bergantung pada satu jalur jaringan tertentu, sehingga setiap subjaringan kompeten sendiri. Efeknya mirip ensembling banyak model kecil dalam satu model besar.

**Regularization.** Istilah payung untuk segala teknik yang mengurangi overfitting. Termasuk: dropout, augmentation, weight decay (penalti L2 pada bobot di update optimizer), early stopping, dan label smoothing. Teknik-teknik ini paling sering dipakai bersamaan, bukan satu per satu. Rentang efektif (mis. dropout 0.1-0.5, weight decay 1e-5 sampai 1e-3) bergantung pada arsitektur dan ukuran dataset; aturan praktisnya: mulai dari default di paper yang Anda replikasi, lalu sesuaikan kalau ada bukti overfitting (`train acc >> val acc`).

---

## 3. Worked Example: SimpleCNN pada CIFAR-10

Tujuan bagian ini adalah membangun CNN minimal yang dapat dilatih penuh, sekaligus menjelaskan setiap keputusan desain.

### 3.1 Definisi Model

```python
import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes: int = 10):
        super().__init__()
        # Blok 1: dua Conv → 3→32→64 channel; resolusi 32 → 16 (MaxPool2d(2))
        self.block1 = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            nn.Conv2d(32, 64, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        # Blok 2: dua Conv → 64→128→128 channel; resolusi 16 → 8
        self.block2 = nn.Sequential(
            nn.Conv2d(64, 128, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.Conv2d(128, 128, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),
            nn.Flatten(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes),
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.block1(x)
        x = self.block2(x)
        return self.classifier(x)
```

Alasan tiap pilihan: `padding=1` mempertahankan dimensi spasial; dua Conv per blok memberi kapasitas nonlinier lebih tanpa mengurangi resolusi sebelum pooling; BatchNorm sebelum ReLU menstabilkan distribusi input; `bias=False` pada Conv karena BatchNorm sudah punya parameter bias sendiri; `MaxPool2d(2)` memperluas *receptive field*; `AdaptiveAvgPool2d(1)` melakukan *global average pooling* (meringkas feature map ke satu vektor per channel) sehingga classifier fleksibel terhadap resolusi input; `Dropout(0.3)` regularisasi ringan; classifier tidak memakai `Softmax` karena `CrossEntropyLoss` PyTorch sudah melakukan log-softmax secara numerik stabil.

### 3.2 Setup Training Minimal

```python
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

transform_train = transforms.Compose([
    transforms.RandomCrop(32, padding=4),
    transforms.RandomHorizontalFlip(),
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

Augmentasi hanya pada training set; normalisasi dengan statistik CIFAR-10 yang sama di val/test; batch size 128 cukup stabil untuk BatchNorm; `device` otomatis agar kode jalan di laptop dan server.

**Mengapa angka spesifik di `Normalize`?** Tuple `(0.4914, 0.4822, 0.4465)` adalah **mean per-channel CIFAR-10** (red, green, blue), dihitung sekali dari training set; tuple `(0.2470, 0.2435, 0.2616)` adalah **std per-channel**. Dengan menormalkan input ke zero-mean unit-variance per channel, optimizer punya landscape yang lebih simetris dan konvergen lebih cepat. Setiap dataset baru perlu menghitung statistik sendiri; jangan pakai angka CIFAR-10 untuk PathMNIST atau ImageNet.

---

## 4. Pitfalls & Miskonsepsi

**"Arsitektur yang lebih dalam selalu lebih baik."** Tidak. Tanpa data cukup banyak, model dalam cenderung overfitting. Mulai dari arsitektur sederhana yang konvergen, tingkatkan kedalaman hanya jika bottleneck terbukti adalah kapasitas model.

**"Adam selalu lebih baik dari SGD."** Pada banyak tugas, Adam konvergen lebih cepat di epoch awal tetapi SGD (dengan momentum dan schedule yang tepat) sering menang di akhir. Bergantung pada tugas.

**"Accuracy 99% berarti model hebat."** Selalu periksa baseline naif - *dummy classifier* yang memprediksi kelas mayoritas. Jika akurasinya juga tinggi, Anda sedang mengukur kesamaan dengan distribusi kelas.

---

## 5. Lab

### Lab 1 - Baseline CNN (Lab utama W2, selesai di W3)

Buka [lab_w2_cnn_baseline.ipynb](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w2_cnn_baseline.ipynb). Di W2:

1. Jalankan tiga level smoke test (import, dummy forward, overfit one batch).
2. Bangun SimpleCNN, latih baseline dari scratch.
3. Bangun baseline fine-tuning pretrained (ResNet-18 frozen backbone).
4. Dokumentasikan: di level mana smoke test akan menangkap setiap jenis error.

Selesaikan evaluasi dan error analysis setelah membaca [W3](03_W3_Loss_Optimizer_Evaluasi.md).

**Checklist W2:**
- [ ] Tiga level smoke test selesai dan terdokumentasi.
- [ ] SimpleCNN forward pass jalan dengan shape yang benar.
- [ ] Overfit one batch berhasil (loss turun ke <0.1 dalam 100 iterasi).
- [ ] Training loop berjalan 5 epoch tanpa error.

### Lab 1c - MLP dari Nol (breadth opsional, kapan saja)

Buka [lab_w1_mlp_numpy.ipynb](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w1_mlp_numpy.ipynb). Tersedia sebagai breadth lab untuk Breadth Check (MLP family). Implementasi backpropagation 7-langkah manual dalam numpy + finite-difference gradient check + parity check vs PyTorch.

---

## 6. Refleksi

1. Anda diberi dataset baru: 500 sinyal EKG satu dimensi, panjang masing-masing 5000 titik, target empat kelas aritmia. Keluarga arsitektur apa yang paling masuk akal untuk Anda coba pertama kali, dan mengapa? Pilihan kedua Anda apa, dan di kondisi apa ia lebih cocok?
2. Bayangkan Anda sudah training SimpleCNN dan mendapat train accuracy 95% tetapi val accuracy 68%. Tanpa melihat kodenya, sebutkan tiga hipotesis paling mungkin tentang penyebabnya, lalu tiga eksperimen pendek yang bisa membedakan satu hipotesis dari yang lain.
3. Seorang kolaborator mengirim dataset baru: rekaman suara tangisan bayi sepanjang tiga detik pada *sampling rate* 16 kHz, dilabeli empat kategori. Tuliskan pasangan tensor input → output yang paling alami, lalu ajukan satu alternatif representasi input (misalnya mel-spektrogram 2D) dan diskusikan bagaimana perubahan bentuk itu menggeser pilihan keluarga arsitektur.

---

## 7. Bacaan Lanjutan

- **Andrej Karpathy - *A Recipe for Training Neural Networks*** (2019). Ritme kerja peneliti berpengalaman; bagian "overfit a single batch" sangat berguna untuk mendebug loop training.
- **Christopher Olah - *Understanding LSTM Networks*** (blog, 2015). Penjelasan visual paling jelas tentang mekanisme gate LSTM.
- **The Deep Learning Book (Goodfellow et al.), Bab 6 & 9.** Bab 6 untuk FFN, Bab 9 untuk CNN.

---

## Lanjut ke W3

Fondasi sudah siap. Bab berikutnya (W3) menuntaskan: loss sebagai pilihan, optimizer sebagai mekanisme langkah, evaluasi yang jujur, tiga strategi representasi fitur, dan cara membaca loss curve untuk mendiagnosis masalah training. Bab itu dimulai dari galeri contoh training konkret sebelum teori.

Buka [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) ketika siap.

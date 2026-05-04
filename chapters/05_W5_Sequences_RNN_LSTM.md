<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 00a | [Prasyarat Modul](00a_Prasyarat.md) | – |
| 01 | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) | 1 |
| 02 | [W2 - Images, CNN & Smoke Test](02_W2_Images_CNN_Smoke_Test.md) | 2 |
| 03 | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) | 3 |
| 04 | [W4 - Reproducibility & Experiment Matrix](04_W4_Reproducibility_Experiment_Matrix.md) | 4 |
| ▶ 05 | W5 - Sequences: RNN & LSTM | 5 |
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

# 05 · W5 - Sequences: RNN & LSTM

> *Model yang tidak ingat masa lalu hanya bisa belajar pola saat ini. Arsitektur recurrent hadir justru karena urutan itu penting - apa yang terjadi sebelumnya mengubah makna apa yang terjadi sekarang.*

**Baris peta besar:** `(T, F) -> (1,)`, `(N,)`, `(T'', 1)`
**Kebiasaan riset:** Diagnosis sequence panjang dan justifikasi arsitektur
**Dataset:** Sequence dataset dengan dependensi panjang yang terlihat
**Lab utama:** Lab 3b ([lab_w5_lstm_sequence.ipynb](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w5_lstm_sequence.ipynb)) - **wajib di W5**

---

## 0. Peta Bab

W5 memperluas Big Map ke domain sequence. Setelah W5, Anda memahami tiga keluarga output head untuk tugas sequence, mampu membangun dan melatih RNN vanilla serta LSTM/GRU, melihat vanishing gradient secara konkret dalam satu perbandingan, memilih arsitektur sequence berdasarkan panjang dependensi, dan menulis pernyataan justifikasi arsitektur yang konkret.

---

## 1. Motivasi: Data yang Urutan Pentingnya

Bayangkan data glukosa sensor dari pasien diabetes. Nilai glukosa jam 14:00 tidak berdiri sendiri - ia dipengaruhi oleh apa yang dimakan jam 12:00, aktivitas fisik jam 13:00, dan pola tidur kemarin malam. Model yang memperlakukan setiap timestep independen kehilangan informasi ini.

Tiga pertanyaan diagnostik untuk setiap dataset sequence:

1. **Dependensi seberapa jauh?** Prediksi berikutnya butuh konteks 5 langkah atau 500 langkah?
2. **Output apa yang diinginkan?** Satu angka di akhir, satu kelas, atau seluruh sequence masa depan?
3. **Apakah urutan benar-benar bermakna?** Atau data hanya "berurutan" tapi sebenarnya bisa diacak?

Jawaban ketiga pertanyaan ini menentukan keluarga arsitektur.

---

## 1.5 BPTT dan Vanishing Gradient: Sebelum Membaca Formula RNN

W5 adalah bab paling padat secara teknis sejauh ini. Sebelum menulis rumus RNN dan LSTM dengan banyak huruf Yunani, kita kuatkan dulu pijakannya: apa sebenarnya yang membuat training sequence model berbeda dari training MLP/CNN biasa, dan kenapa "vanishing gradient" menjadi masalah serius di sini.

### 1.5.1 BPTT: Chain Rule pada Urutan Waktu

Di W1 §2.3 dan [Prasyarat Modul §4](00a_Prasyarat.md#4-kalkulus-mini-turunan-dan-chain-rule), Anda sudah kenal **chain rule** sebagai rantai turunan: kalau `y = f(g(x))`, maka `dy/dx = f'(g(x)) · g'(x)`. Backpropagation di MLP adalah chain rule yang dirantai mundur lewat layer-layer.

Pada RNN, ada **dua sumbu** tempat chain rule berjalan:

1. **Mundur ke layer dalam** (sama seperti MLP): dari output ke hidden ke input.
2. **Mundur ke timestep sebelumnya** (baru di sequence model): dari `h_t` ke `h_{t-1}`, dari `h_{t-1}` ke `h_{t-2}`, dst.

Hal ini disebut **Backpropagation Through Time (BPTT)**. Namanya tampak menakutkan; intinya: chain rule yang dirantai sepanjang T timestep, bukan hanya L layer.

**Contoh sederhana.** Untuk sequence dengan 3 timestep dan loss `L = (y_3 - h_3)²`:

```
∂L/∂W_h = ∂L/∂h_3 · ∂h_3/∂W_h
        + ∂L/∂h_3 · ∂h_3/∂h_2 · ∂h_2/∂W_h
        + ∂L/∂h_3 · ∂h_3/∂h_2 · ∂h_2/∂h_1 · ∂h_1/∂W_h
```

Setiap suku adalah satu jalur: gradient dari loss merambat mundur lewat berapa banyak timestep sebelum mencapai parameter `W_h`. Jalur paling panjang (suku ketiga) melewati T-1 timestep.

### 1.5.2 Vanishing Gradient: Contoh Angka

Setiap kali gradient melewati satu langkah waktu mundur, ia dikalikan dengan turunan `∂h_t/∂h_{t-1}`. Untuk RNN vanilla (`h_t = tanh(W_h h_{t-1} + W_x x_t + b)`), turunan ini kira-kira sebanding dengan `W_h` (modulo turunan tanh yang ≤ 1).

Anggap untuk simplikasi `W_h` adalah skalar `w_h = 0.5`. Setelah merambat mundur T langkah, gradient awal dikalikan `w_h^T`:

| T (langkah mundur) | w_h^T (w_h = 0.5) | w_h^T (w_h = 0.9) | w_h^T (w_h = 1.1) |
|---|---|---|---|
| 1 | 0.5 | 0.9 | 1.1 |
| 5 | 0.031 | 0.59 | 1.61 |
| 10 | 0.001 | 0.35 | 2.59 |
| 50 | ~ 9e-16 | 0.005 | 117 |
| 100 | ~ 8e-31 | 2.6e-5 | 13780 |

Tiga rezim:

- **|w_h| < 1 → vanishing gradient.** Setelah 50-100 langkah, gradient praktis nol. Model tidak bisa belajar dependensi panjang.
- **|w_h| > 1 → exploding gradient.** Gradient meledak. Loss tiba-tiba menjadi NaN. Solusi praktis: gradient clipping (lihat §4).
- **|w_h| ≈ 1 → titik kritis.** Stabil hanya di pinggiran, sulit dipertahankan tanpa intervensi (LSTM gate, residual connection, normalization).

Inilah "vanishing gradient problem" - bukan masalah teori abstrak, tetapi konsekuensi langsung perkalian berulang di chain rule. LSTM (§2.3) dirancang khusus untuk memutus rantai perkalian ini.

*Cell state* LSTM memutus rantai ini dengan cara yang spesifik: `c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t`. Turunan `∂c_t/∂c_{t-1} = f_t` adalah hasil elemen per elemen dengan forget gate, bukan perkalian dengan matriks rekurens `W_h` secara penuh. Gradient bisa mengalir jauh ke belakang tanpa teredam. Cara kerjanya secara rinci ada di §2.3.

Prinsip yang sama berlaku pada **residual connections** yang akan Anda jumpai di W7 dan W8: alih-alih mempelajari `H(x)` langsung, blok residual mempelajari `F(x) = H(x) - x`, sehingga output menjadi `F(x) + x`. Penambahan `x` menciptakan jalur langsung bagi gradient dari loss ke layer sebelumnya, tanpa harus melalui transformasi dalam blok. *Cell state* LSTM, residual connections di ResNet, dan skip connections di blok Transformer adalah satu prinsip yang sama: **pembaruan aditif sebagai jalan pintas gradient**. Memahami prinsip ini sekali sudah cukup untuk mengenali bentuknya di W7 dan W8.

> [!NOTE]
> Untuk vector/matrix `W_h`, ukuran yang relevan adalah **eigenvalue terbesar** (spectral radius). Kalau spectral radius < 1, gradient vanish; kalau > 1, explode. Rumus T-langkah pakai matrix power, bukan skalar power, tetapi prinsipnya sama.

### 1.5.3 Symbol ⊙ (Hadamard Product) Primer

Beberapa rumus LSTM nanti memakai simbol ⊙. Ini **element-wise multiplication** (bukan perkalian matriks):

```
[1, 2, 3] ⊙ [4, 5, 6] = [1*4, 2*5, 3*6] = [4, 10, 18]
```

Berbeda dengan `@` (matrix product) yang mengontraksi sumbu, ⊙ menjaga bentuk. Untuk dua vektor shape `(d,)`, hasil ⊙ juga shape `(d,)`. Untuk dua matriks shape `(B, d)`, hasil ⊙ juga shape `(B, d)`. Di LSTM, operasi ini dipakai sebagai "gate yang menyaring komponen-komponen vektor secara mandiri".

---

## 2. Konsep Inti

### 2.1 Big Map untuk Sequence

Tiga formulasi output yang paling umum pada sequence task:

| Tugas | Input shape | Output shape | Contoh |
|---|---|---|---|
| Sequence classification | `(T, F)` | `(N,)` | Klasifikasi aktivitas dari sensor IMU |
| Regression/forecast scalar | `(T, F)` | `(1,)` | Prediksi nilai berikutnya dari time series |
| Sequence-to-sequence forecast | `(T, F)` | `(T'', 1)` | Prediksi 12 jam ke depan dari sinyal CGM |
| Token classification | `(T,)` | `(T, N)` | NER, POS tagging per token |

Di W5 kita fokus pada tiga pertama. Token classification dibahas di W7.

### 2.2 RNN Vanilla: Arsitektur Recurrent Dasar

RNN vanilla memproses sequence satu langkah waktu demi satu. Di setiap timestep `t`, ia menggabungkan input baru `x_t` dengan hidden state sebelumnya `h_{t-1}`:

```
h_t = tanh(W_x x_t + W_h h_{t-1} + b)
```

Penjelasan simbol baris-per-baris:

- `x_t` adalah input pada timestep `t`, shape `(F,)` (atau `(B, F)` untuk batch).
- `h_{t-1}` adalah hidden state dari timestep sebelumnya, shape `(d_h,)` di mana `d_h` adalah hidden size yang Anda tentukan.
- `W_x` adalah matriks bobot input shape `(d_h, F)`; `W_h` matriks bobot hidden-to-hidden shape `(d_h, d_h)`.
- `W_h h_{t-1}` adalah perkalian matriks (bukan element-wise) yang menghasilkan vektor shape `(d_h,)`.
- `tanh` adalah aktivasi yang memastikan `h_t` berada di rentang (-1, 1) - mencegah hidden state meledak ke nilai besar.

Hidden state `h_t` berperan sebagai "memori" yang diperbarui setiap langkah. Inisialisasi `h_0 = 0` (default) atau learned. Untuk sequence classification, output diambil dari `h_T` (langkah terakhir). Untuk forecasting, output `y_t = W_o h_t` di setiap langkah.

![RNN Vanilla vs LSTM Cell: perbandingan arsitektur unrolled dan detail gate mechanism pada LSTM](../figures/fig05a_rnn_vs_lstm.svg)

**Vanishing gradient secara konkret.** Sudah dibahas di §1.5.2 dengan tabel angka: dengan `|w_h| = 0.5`, gradient setelah 10 langkah mundur ≈ 0.001; setelah 50 langkah ≈ `9e-16`. Lab 3b memvisualisasikan gejala ini dengan plot log-scale gradient norm per timestep. Penurunan eksponensial terlihat jelas pada RNN vanilla; LSTM menjaga gradient relatif flat.

### 2.3 LSTM: Gate sebagai Solusi

Long Short-Term Memory (LSTM) memperkenalkan **cell state** `c_t` yang terpisah dari hidden state, dan tiga **gate** yang mengontrol aliran informasi. Konsep gate: vektor dengan nilai antara 0 dan 1 (hasil dari `σ` = sigmoid) yang dikalikan element-wise (`⊙`, lihat §1.5.3) ke vektor lain - berfungsi seperti "keran" yang memutuskan komponen mana yang lewat dan komponen mana yang ditahan.

#### 2.3.1 Rumus Annotated

```
forget gate:  f_t = σ(W_f [h_{t-1}, x_t] + b_f)         # shape (d_h,) di [0, 1]
input gate:   i_t = σ(W_i [h_{t-1}, x_t] + b_i)         # shape (d_h,) di [0, 1]
cell update:  g_t = tanh(W_g [h_{t-1}, x_t] + b_g)      # shape (d_h,) di (-1, 1)
cell state:   c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t          # shape (d_h,)
output gate:  o_t = σ(W_o [h_{t-1}, x_t] + b_o)         # shape (d_h,) di [0, 1]
hidden state: h_t = o_t ⊙ tanh(c_t)                     # shape (d_h,)
```

Membaca baris demi baris:

1. **Forget gate `f_t`** - "berapa banyak dari cell state lama yang dipertahankan?" Nilai `f_t[i] = 0.9` artinya pertahankan 90% komponen ke-i; `f_t[i] = 0.1` artinya hampir lupa.
2. **Input gate `i_t`** - "berapa banyak dari informasi baru `g_t` yang ditulis ke cell state?" Mirip forget tetapi mengontrol *write*, bukan *retain*.
3. **Cell update `g_t`** - kandidat informasi baru, hasil dari `tanh` (rentang -1 sampai 1).
4. **Cell state `c_t`** - "memori utama" yang diperbarui dengan campuran `f_t ⊙ c_{t-1}` (yang dipertahankan) dan `i_t ⊙ g_t` (yang ditulis).
5. **Output gate `o_t`** - "berapa banyak dari cell state yang diekspos sebagai hidden state output?"
6. **Hidden state `h_t`** - hasil akhir, yang nanti dipakai sebagai output dan diteruskan ke timestep berikutnya.

Notasi `[h_{t-1}, x_t]` artinya konkatenasi vektor: kalau `h_{t-1}` shape `(d_h,)` dan `x_t` shape `(F,)`, hasil konkatenasi shape `(d_h + F,)`. Maka `W_f` shape `(d_h, d_h + F)`.

#### 2.3.2 Kenapa Ini Memutus Vanishing Gradient

Kunci di baris cell state: `c_t = f_t ⊙ c_{t-1} + i_t ⊙ g_t`. Saat backprop, turunan `∂c_t/∂c_{t-1} = f_t` (hanya gate, bukan perkalian matriks `W_h` yang berulang). Kalau forget gate `f_t ≈ 1` di sepanjang sequence, gradient cell state mengalir mundur **tanpa menyusut**. Ini jalur cepat gradient yang menjaga sinyal dari timestep awal tetap hidup walau sequence panjang.

Bandingkan dengan RNN vanilla: setiap langkah mundur, gradient dikalikan dengan `W_h` (matriks belajar, bisa kecil). Setelah 100 langkah, gradient `~ 0`. LSTM tidak punya rantai perkalian matriks ini di cell state - hanya rantai gate, dan gate bisa belajar ke nilai 1 untuk "buka jalur".

![Vanishing Gradient: RNN vs LSTM - gradient norm per timestep saat backprop](../figures/fig05b_gradient_flow.svg)

#### 2.3.3 Forget Gate: Gambaran Konkret

Bayangkan sequence sensor pasien: glukosa setiap 5 menit selama 24 jam (288 timestep). Cell state `c_t` menyimpan "kondisi pasien terakhir kali stabil". Forget gate `f_t` adalah keputusan model di tiap timestep: *apakah kondisi sebelumnya masih relevan?*

- Saat data normal mengalir → `f_t ≈ 1.0` → cell state hampir tidak berubah, sehingga gambaran kondisi stabil tetap dipertahankan.
- Saat anomali (lonjakan glukosa tiba-tiba akibat makan berat) → `f_t` turun ke ~0.3 untuk komponen yang terkait kondisi sebelum makan; cell state diperbarui dengan informasi baru.
- Saat pasien tidur dan sinyal sangat lambat → `f_t` ≈ 1.0 lagi, cell state mempertahankan gambaran kondisi tidur tanpa terganggu fluktuasi noise kecil.

Forget gate mempelajari *kapan* informasi lama harus dilupakan. Tanpa training, model tidak tahu - tetapi gradient yang merambat lewat sequence membentuk gate untuk kondisi yang relevan.

#### 2.3.4 Hidden State vs Cell State: Tabel Kontras

Dua "memori" di LSTM sering membingungkan pemula. Perbedaan ringkas:

| Aspek | Cell state `c_t` | Hidden state `h_t` |
|---|---|---|
| **Peran metafora** | "highway memori jangka panjang" | "output dan input ke timestep berikut" |
| **Update** | Lewat dua gate (forget + input) dengan jalur additive | Lewat satu gate (output) dari `tanh(c_t)` |
| **Gradient flow saat backprop** | Mengalir mundur lewat gate, bisa flat panjang | Mengalir lewat perkalian matriks (riskan vanish) |
| **Diekspos ke layer berikut?** | Tidak (internal LSTM) | Ya (jadi input ke `Linear` head atau LSTM layer berikut) |
| **Inisialisasi** | `c_0 = 0` (default) | `h_0 = 0` (default) |
| **Bentuk shape** | `(d_h,)` per timestep | `(d_h,)` per timestep |

Dalam kode `nn.LSTM` PyTorch, return value `out, (h_n, c_n)` - `out` adalah `h_t` di seluruh timestep (shape `(B, T, d_h)`), `h_n` adalah `h_t` di timestep terakhir, `c_n` adalah `c_T` di timestep terakhir.

### 2.4 GRU: Alternatif Lebih Ringkas

**GRU (Gated Recurrent Unit, Cho et al. 2014)** adalah varian LSTM yang lebih sederhana. Ia menggabungkan forget gate dan input gate menjadi satu *update gate*, dan menghilangkan cell state terpisah:

```
update gate:  z_t = σ(W_z [h_{t-1}, x_t] + b_z)
reset gate:   r_t = σ(W_r [h_{t-1}, x_t] + b_r)
candidate:    h̃_t = tanh(W_h [r_t ⊙ h_{t-1}, x_t] + b_h)
hidden state: h_t = (1 - z_t) ⊙ h_{t-1} + z_t ⊙ h̃_t
```

**Apa yang disederhanakan?**

- **Hanya 2 gate**, bukan 3 (tanpa forget gate terpisah, fungsinya diserap oleh `z_t`).
- **Tidak ada cell state** `c_t`, hanya `h_t` yang dipertahankan, sehingga GRU tidak punya mekanisme "memory" terpisah dari output.
- **Parameter ~25% lebih sedikit** daripada LSTM karena satu gate dihapus.

**Kapan memilih GRU vs LSTM:**

| Situasi | Pilih | Alasan |
|---|---|---|
| Dataset kecil (<10k sampel) | GRU | Lebih sedikit parameter, overfitting lebih rendah |
| Sequence pendek-sedang (<200 timestep) | GRU | Performa sering sebanding dengan LSTM |
| Sequence sangat panjang (>200 timestep) | LSTM | Gating terpisah membantu dependensi jauh |
| Anggaran parameter ketat | GRU | ~25% lebih ringan |
| Tidak yakin | Coba keduanya | Keduanya sebanding di banyak benchmark; bedanya sering <2% |

Aturan praktis: coba LSTM dulu sebagai default, GRU sebagai alternatif kalau training time atau parameter budget jadi concern. Di lab minggu ini, Anda akan membandingkan RNN vs LSTM vs GRU pada sequence sintetis.

### 2.5 Sequence Model dalam Bentuk Alaminya

Empat output head family untuk sequence:

| Output yang diinginkan | Head architecture | Loss |
|---|---|---|
| Regression scalar akhir | `Linear(hidden, 1)` pada `h_T` | MSE/MAE |
| Klasifikasi akhir | `Linear(hidden, N)` pada `h_T` | CrossEntropy |
| Forecast `(T'', 1)` | `Linear(hidden, 1)` pada `h_t` untuk setiap t | MSE/MAE |
| Per-token klasifikasi | `Linear(hidden, N)` pada `h_t` untuk setiap t | CrossEntropy (setiap t) |

Di PyTorch:

```python
class SequenceClassifier(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super().__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.head = nn.Linear(hidden_size, num_classes)

    def forward(self, x):  # x: (B, T, F)
        out, (h_n, _) = self.lstm(x)
        return self.head(h_n[-1])  # ambil hidden state layer terakhir, timestep terakhir
```

### 2.6 Justifikasi Arsitektur: Template Statement

Setiap pemilihan arsitektur harus bisa dijelaskan. Template minimal:

> "Saya memilih [LSTM/GRU/RNN/Transformer] karena task ini [butuh memori jangka panjang / sequence singkat / butuh paralelisasi / konteks bilateral]. Dataset punya panjang sequence [T], dan [LSTM] secara empirik lebih baik pada [tugas dengan dependensi > 20 langkah] dibandingkan [RNN vanilla yang cenderung gagal akibat vanishing gradient]."

Template ini akan dipakai kembali di W7 (Transformer) dan W9 (multimodal). Mulai sekarang, biasakan menulis satu kalimat justifikasi untuk setiap pilihan arsitektur yang Anda buat.

### 2.7 Long-Sequence Diagnosis

Ketika model sequence tidak belajar dengan baik, lima hipotesis yang paling mungkin:

1. **Vanishing gradient** - cek gradient norm per layer/timestep; jika turun eksponensial, beralih ke LSTM/GRU.
2. **Sequence terlalu panjang** - coba potong sequence menjadi lebih pendek; jika performa membaik, dependensi lokal sudah cukup.
3. **Shuffle data yang salah** - pada time series, jangan shuffle antar sequence; hanya shuffle *urutan sequence* di DataLoader, bukan urutan timestep di dalam sequence.
4. **Leakage temporal** - fitur yang dibuat dari masa depan bocor ke training. Ini dibahas mendalam di W6.
5. **Gradient clipping terlalu ketat** - RNN/LSTM sering butuh gradient clipping; terlalu ketat menghambat pembelajaran.

---

## 3. Worked Example: RNN vs LSTM pada Sine + Noise

Lab 3b menggunakan `sine_sequence` dataset: setiap sampel adalah sequence sinusoidal dengan noise, target adalah nilai berikutnya. Ini memungkinkan kita membuat sequence sepanjang apapun dan mengontrol noise level.

**Setup:**

```python
# configs/lstm_timeseries.yaml
data:
  name: sine_sequence
  seq_len: 50    # panjang 50 timestep
  noise_std: 0.1
  n_train: 4000

model:
  name: simple_lstm
  input_size: 1
  hidden_size: 32
  num_layers: 2
  dropout: 0.1
  readout: last    # ambil hidden state di timestep terakhir
```

**Perbandingan:**

1. Latih `SimpleLSTM` dengan `seq_len=50`. Catat final val MAE.
2. Latih `SimpleRNN` (ganti ke `nn.RNN`) dengan konfigurasi sama. Catat final val MAE.
3. Naikkan `seq_len=200`. Ulangi keduanya. Amati perbedaan semakin besar.
4. Plot gradient norm per timestep untuk keduanya. Tunjukkan kurva "vanishing" pada RNN.

**Yang harus terlihat:** Pada `seq_len=50`, selisih RNN vs LSTM mungkin kecil. Pada `seq_len=200`, LSTM jauh lebih baik karena gradient RNN sudah vanish sebelum mencapai awal sequence.

---

## 4. Pitfalls & Miskonsepsi

**"Sequence data selalu butuh RNN/LSTM."** Tidak. Jika dependensi hanya lokal (5-10 langkah), CNN 1D atau MLP biasa dengan windowed features kadang lebih efisien. RNN/LSTM paling bernilai ketika dependensi panjang (50+ langkah) dan urutan benar-benar penting.

**"LSTM selalu lebih baik dari GRU."** Tidak ada aturan universal. GRU lebih cepat dilatih dan sering performa sebanding. Coba keduanya sebelum memilih.

**"Hidden state terakhir mewakili seluruh sequence."** Untuk sequence sangat panjang, bahkan LSTM bisa lupa informasi awal. Solusi: bidirectional LSTM, atau attention pada hidden states semua timestep.

**"Saya bisa shuffle data time series bebas."** Berbahaya. Untuk forecasting, shuffling antar sequence boleh. Shuffling di dalam sequence atau split data secara acak (bukan temporal) menyebabkan leakage yang akan dibahas di W6.

**Gradient clipping.** RNN/LSTM tanpa gradient clipping sering mengalami exploding gradient. Satu hal yang sering disalahpahami: `clip_grad_norm_` tidak memotong setiap gradient secara independen. Fungsi ini menghitung norma global dari seluruh gradien model, lalu menurunkan skalanya secara proporsional jika norma tersebut melewati `max_norm`. Hasilnya: arah relatif antar parameter dipertahankan, hanya besarannya yang disesuaikan.

Tambahkan sebelum `optimizer.step()`:

```python
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
optimizer.step()
```

Mengapa `max_norm=1.0`? Bukan angka yang "benar" - hanya titik awal konservatif yang bisa langsung dipakai. Jika loss masih tidak stabil, naikkan ke 5.0 sebelum mengurangi learning rate. Jika gradient sudah kecil (norma rutin < 0.1), clipping tidak aktif dan tidak berpengaruh sama sekali.

`clip_grad_value_` memotong setiap elemen gradient secara independen ke rentang `[-v, v]` tanpa memperhatikan arah keseluruhan. Perubahan arah yang tidak terduga ini jarang diinginkan; untuk RNN/LSTM, `clip_grad_norm_` hampir selalu lebih tepat.

Pertanyaan diagnosis saat gradient meledak: (1) apakah `clip_grad_norm_` dipanggil sebelum `optimizer.step()`? (2) apakah learning rate terlalu besar? (3) apakah ada nilai ekstrem di data yang belum dinormalisasi?

---

## 5. Lab

### Lab 3b - RNN vs LSTM Gradient Flow (wajib W5)

Buka [lab_w5_lstm_sequence.ipynb](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w5_lstm_sequence.ipynb).

**Tugas utama:**

1. Jalankan smoke test: import, dummy forward, overfit-one-batch untuk kedua arsitektur.
2. Latih RNN vanilla vs LSTM pada `seq_len=50`, plot val MAE comparison.
3. Ulangi pada `seq_len=200`, amati divergensi performa.
4. Plot gradient norm per timestep untuk keduanya; simpan gambar ke `experiments/lab3b/`.
5. Tulis pernyataan justifikasi arsitektur menggunakan template §2.6.
6. Coba GRU sebagai alternatif ketiga; bandingkan training time vs LSTM.

**Checklist:**

- [ ] Smoke test untuk RNN dan LSTM lulus.
- [ ] Plot gradient flow menunjukkan vanishing pada RNN.
- [ ] Tabel perbandingan MAE (RNN vs LSTM vs GRU) untuk seq_len=50 dan seq_len=200.
- [ ] Pernyataan justifikasi arsitektur tertulis di notebook.
- [ ] Gradient clipping aktif di semua model.

### Lab 3b Breadth Check

Lab 3b ini juga memenuhi **Breadth Check** untuk keluarga RNN/LSTM (salah satu dari 5 keluarga arsitektur yang harus Anda tunjukkan forward pass-nya sebelum Capstone).

---

## 6. Komponen Mandiri

Pilih satu pertanyaan dari materi W5 yang ingin Anda jelajahi lebih dalam. Boleh memakai dataset lab minggu ini (sine sequence) atau dataset sequence lain.

**Beberapa pertanyaan pemantik** (tidak wajib salah satunya):
- Apakah bidirectional LSTM memberikan keuntungan yang berarti pada `seq_len=200` dibanding unidirectional?
- Pada hidden size berapa LSTM mulai "cukup" - apakah ada sweet spot antara kapasitas dan efisiensi?
- Bagaimana temporal CNN (1D Conv + MaxPool) bersaing dengan LSTM untuk forecasting jangka pendek vs panjang?
- Jika Anda harus merancang eksperimen perbandingan LSTM vs Transformer nantinya, hipotesis apa yang perlu ditest terlebih dahulu?

Kerjakan, dokumentasikan di [`notebooks/portofolio_mandiri.ipynb`](https://github.com/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/portofolio_mandiri.ipynb), dan presentasikan 10 menit di awal Pekan 6. Format: [Lampiran C.9](14_Lampiran.md#c9-template-komponen-mandiri).

---

## 7. Refleksi

1. **Skenario domain baru.** Anda mendapat dataset EKG: 5000 titik per sampel pada sampling rate 500 Hz, target klasifikasi 4 kelas aritmia. Apakah LSTM adalah arsitektur pertama yang Anda coba? Apa dua alternatif yang akan Anda pertimbangkan, dan apa trade-off masing-masing?
2. **Gradient flow.** Setelah melihat plot gradient flow di Lab 3b: pada panjang berapa RNN vanilla mulai kehilangan sinyal? Bagaimana angka ini mengubah keputusan Anda tentang kapan harus pakai LSTM vs pendekatan lain?
3. **Representasi sequence.** Di W1 Anda belajar tentang engineered vs extracted vs learned features. Bagaimana ketiga strategi ini muncul dalam konteks sequence? Berikan satu contoh konkret untuk masing-masing dalam domain time series sensor.

---

## 8. Bacaan Lanjutan

- **Christopher Olah - *Understanding LSTM Networks*** (blog, 2015). Penjelasan visual paling jelas tentang mekanisme gate LSTM dan kenapa vanishing gradient diatasi.
- **Hochreiter & Schmidhuber - *Long Short-Term Memory*** (Neural Computation, 1997). Paper asli LSTM, termasuk eksperimen yang menunjukkan kegagalan RNN vanilla pada long-range dependency.
- **Cho et al. - *Learning Phrase Representations using RNN Encoder-Decoder*** (2014). Paper yang memperkenalkan GRU; baca bagian 2 untuk perbandingan dengan LSTM.

---

## Lanjut ke W6

Peta Big Map terus tumbuh. W6 menggabungkan dua tema penting: representasi fitur (engineered vs extracted vs learned) dalam konteks sequence, dan temporal leakage - salah satu bug terbahaya yang menyebabkan angka bagus tapi hasil invalid.

Buka [W6 - Representations & Temporal Leakage](06_W6_Representations_Temporal_Leakage.md) ketika siap.

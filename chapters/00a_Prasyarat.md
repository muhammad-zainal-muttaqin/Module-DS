<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| #    | Modul                                                                                  | Minggu |
| ---- | -------------------------------------------------------------------------------------- | ------ |
| 00   | [Pendahuluan](00_Pendahuluan.md)                                                       | 1      |
| ▶ 00a | Prasyarat Modul                                                                       | –      |
| 01   | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md)                           | 1      |
| 02   | [W2 - Images, CNN & Smoke Test](02_W2_Images_CNN_Smoke_Test.md)                        | 2      |
| 03   | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md)                    | 3      |
| 04   | [W4 - Reproducibility & Experiment Matrix](04_W4_Reproducibility_Experiment_Matrix.md) | 4      |
| 05   | [W5 - Sequences: RNN & LSTM](05_W5_Sequences_RNN_LSTM.md)                              | 5      |
| 06   | [W6 - Representations & Temporal Leakage](06_W6_Representations_Temporal_Leakage.md)   | 6      |
| 07   | [W7 - Text, Transformers & Repo Adoption](07_W7_Text_Transformers_Repo_Adoption.md)    | 7      |
| 08   | [W8 - Foundation Models](08_W8_Foundation_Models.md)                                   | 8      |
| 09   | [W9 - Multimodal Reasoning](09_W9_Multimodal_Reasoning.md)                             | 9      |
| 10   | [W10 - Paper Reading & Implementation](10_W10_Paper_Reading.md)                        | 10     |
| 11   | [W11 - Research Framing](11_W11_Research_Framing.md)                                   | 11     |
| 12   | [Capstone - Proyek Riset](12_Capstone.md)                                              | 12-15  |
| 13   | [Rubrik Penilaian](13_Rubrik_Penilaian.md)                                             | –      |
| 14   | [Lampiran](14_Lampiran.md)                                                             | –      |
| 15   | [Panduan Instruktur](15_Panduan_Instruktur.md)                                         | –      |

</details>

---

# 00a · Prasyarat Modul

Halaman ini memuat kosakata dasar yang perlu dikenali sebelum membuka W1. Prasyarat ditetapkan seminimal mungkin: jika Anda sudah terbiasa dengan PyTorch, NumPy, dan kalkulus dasar, baca sekilas §6 (glosarium singkat) saja, lalu kembali ke [Pendahuluan](00_Pendahuluan.md) dan lanjut ke W1.

---

## 1. Shape Tensor: Cara Membaca Tuple

"Shape" sebuah tensor adalah daftar berapa banyak elemen di tiap sumbu, ditulis sebagai tuple Python:


| Tuple shape    | Arti                                   | Contoh data             |
| -------------- | -------------------------------------- | ----------------------- |
| `(3,)`         | satu sumbu, 3 elemen                   | satu vektor `[a, b, c]` |
| `(3, 4)`       | dua sumbu, 3 baris × 4 kolom           | matriks 3×4             |
| `(3, 4, 5)`    | tiga sumbu                             | "kubus" 3×4×5           |
| `(B, F)`       | B sampel, masing-masing F fitur        | satu batch tabular      |
| `(B, C, H, W)` | B gambar, C channel, tinggi H, lebar W | satu batch citra        |


**Koma akhir.** `(3,)` dengan koma di belakang adalah tuple dengan satu elemen; `(3)` tanpa koma adalah angka biasa di Python. Karena shape selalu tuple, koma akhir wajib saat tensor hanya punya satu sumbu.

```python
import numpy as np
np.array([1, 2, 3]).shape       # (3,)   - satu sumbu, tiga elemen
np.array([[1, 2, 3]]).shape     # (1, 3) - dua sumbu, satu baris tiga kolom
```

## 2. Konvensi Huruf di Modul

Modul memakai huruf-huruf berikut secara konsisten. Hafalkan sekali; semua bab pakai yang sama.


| Huruf    | Singkatan dari                                                     | Contoh konteks                                   |
| -------- | ------------------------------------------------------------------ | ------------------------------------------------ |
| `N`      | jumlah kelas (number of classes) atau jumlah sampel sesuai konteks | klasifikasi 10 kelas → output `(N,)` dengan N=10 |
| `F`      | jumlah fitur (features)                                            | data tabular 5 kolom → input `(F,)` dengan F=5   |
| `B`      | ukuran batch (batch size)                                          | 32 sampel sekaligus → batch `(B, F)` dengan B=32 |
| `C`      | jumlah channel (channels)                                          | RGB → C=3, grayscale → C=1                       |
| `H`, `W` | tinggi (height) dan lebar (width) gambar                           | foto 224×224 → H=W=224                           |
| `T`      | panjang sequence atau timestep                                     | kalimat 50 token → T=50                          |


## 3. Arti Panah `->` di Shape Map

Setiap kali modul menulis `(F,) -> (1,)` atau `(C, H, W) -> (N,)`, panah `->` berarti **"dari shape A menjadi shape B lewat satu model atau operasi"**. Bukan shape sebelum dan sesudah satu layer, tetapi shape input dan shape output keseluruhan model.

Contoh konkret:

- `(F,) -> (1,)` artinya: **input** vektor F fitur, **output** satu skalar (mis. prediksi harga rumah).
- `(C, H, W) -> (N,)` artinya: **input** satu gambar, **output** vektor logit/probabilitas N kelas.
- Data tabular 100 baris × 5 kolom dalam memori berbentuk `(100, 5)`. Satu sampel saja berbentuk `(5,)`. Batch 32 sampel berbentuk `(32, 5)`.

## 4. Kalkulus Mini: Turunan dan Chain Rule

Anda tidak perlu menguasai kalkulus untuk memulai. Cukup dua pemahaman dasar.

**Turunan = kemiringan.** Turunan fungsi `f(x)` di titik `x = a` mengukur seberapa cepat `f` berubah saat `x` digeser sedikit di sekitar `a`. Notasi: `df/dx`. Kalau `f(x) = x²`, maka `df/dx = 2x`. Di `x = 3`, turunan = 6, artinya saat `x` bergeser dari 3 ke 3.01, `f` bergeser kira-kira `6 × 0.01 = 0.06`.

**Chain rule = rantai turunan.** Kalau `y = f(g(x))`, maka turunannya `dy/dx = f'(g(x)) · g'(x)`. Bayangkan dua roda gigi: kalau roda dalam berputar 2× lebih cepat dari input, dan roda luar 3× lebih cepat dari roda dalam, total roda luar 6× lebih cepat dari input.

Inilah yang dilakukan **backpropagation**: mengambil rantai panjang turunan dari loss sampai ke setiap parameter, lalu merambatkannya mundur melalui chain rule. Detail derivasi 7-langkah ada di [Lampiran A.1](14_Lampiran.md#a1-backpropagation-derivasi-manual). Untuk W1-W2, cukup paham bahwa "rantai turunan" itulah cara kerjanya.

## 5. PyTorch Tensor: Primer 3 Menit

PyTorch adalah library deep learning yang dipakai sepanjang modul. Konsep paling dasar: **tensor** = array multi-dimensi dengan dukungan GPU dan autograd.

```python
import torch

x = torch.tensor([1.0, 2.0, 3.0])
x.shape          # torch.Size([3])  - sama dengan tuple (3,)
x.dtype          # torch.float32
x.float()        # konversi ke float32 (jika belum)
x.to('cuda')     # pindahkan ke GPU jika tersedia
```

Tiga hal ini dikerjakan terus-menerus:

1. **Memeriksa shape.** `print(x.shape)` adalah debug pertama saat training error.
2. **Memindahkan ke device.** `model.to(device)` dan `x.to(device)` agar perhitungan berjalan di GPU/CPU yang konsisten.
3. **Memanggil `.backward()`.** Setelah `loss = criterion(model(x), y)`, panggilan `loss.backward()` menghitung semua gradient otomatis melalui chain rule.

Broadcasting (PyTorch dan NumPy) secara singkat: jika dua tensor punya shape yang kompatibel, operasi seperti `a + b` memperluas tensor kecil agar cocok dengan tensor besar tanpa menyalin memori. Aturan kompatibilitas: dua sumbu kompatibel jika ukurannya sama atau salah satu sama dengan 1.

> [!TIP]
> Sumber belajar ringan: [NumPy quickstart](https://numpy.org/doc/stable/user/quickstart.html) (10 menit), [PyTorch 60-min Blitz](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) (panduan resmi). Tidak wajib sebelum W1, tetapi keduanya akan mempercepat W2-W3 jika Anda baru pertama kali memakai PyTorch dan NumPy.

## 6. Glosarium Singkat

Sembilan belas istilah inti yang muncul berulang sejak W1 - loss, gradient, optimizer, baseline, freeze, fine-tune, ablation, leakage, pre-registration, hyperparameter, overfitting, epoch, batch, seed, checkpoint, augmentation, dropout, batch norm, regularization - sudah tercatat lengkap dengan definisi dan contoh di [Lampiran A](14_Lampiran.md#a-glosarium-indonesia--inggris). Baca sekilas sekali sebelum W1; tidak perlu menghafal, kembali saat butuh.

---

← Kembali ke [Pendahuluan](00_Pendahuluan.md) · Lanjut ke [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) →

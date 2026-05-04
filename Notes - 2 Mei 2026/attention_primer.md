# W7

---

### 1.3 Cara Kerja Attention

Pada W5, Anda sudah melihat mengapa RNN kesulitan menangani sekuens yang panjang. Masalah utamanya adalah **bottleneck informasi**: seluruh makna dari token-token sebelumnya harus dipadatkan ke dalam satu *hidden state* berukuran tetap sebelum memproses langkah berikutnya. LSTM menambahkan *gate* untuk mengelola ini, tetapi *bottleneck* itu sendiri tidak pernah hilang. Informasi tetap harus melewati setiap langkah perantara untuk mencapai akhir.

**Attention menghilangkan bottleneck tersebut sepenuhnya.** Pertimbangkan kalimat berikut: **"Buku itu tidak muat di dalam tas karena ukurannya terlalu besar."*Untuk mengetahui benda apa yang dirujuk oleh "ukurannya" (yakni buku, bukan tas), kamu tidak membaca ulang dari awal, tetapi langsung mencari kandidat yang relevan. Attention melakukan hal yang persis sama. Setiap token dapat membaca dari semua token lain dalam satu langkah, yang dibobot berdasarkan relevansinya. Tidak ada serah terima informasi secara sekuensial.

Untuk menghitung bobot relevansi ini, setiap token diproyeksikan menjadi tiga vektor dengan peran berbeda: **Query** ("apa yang saya cari?"), **Key** ("apa yang saya miliki?"), dan **Value** ("apa yang sebenarnya saya berikan?"). Skor relevansi antara dua posisi adalah *dot product* dari Query suatu token dengan Key token lainnya. *Dot product* yang besar berarti kecocokan yang kuat. Proyeksi ini dihasilkan oleh tiga matriks bobot yang dipelajari, yaitu $W_Q$, $W_K$, dan $W_V$. Ketiga matriks ini adalah satu-satunya parameter permanen di dalam layer, dan parameter inilah yang disimpan ke dalam *checkpoint* Anda.

Jika digabungkan:

$$\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{Q K^T}{\sqrt{d_k}}\right) V$$

$QK^T$ menghasilkan matriks $(T \times T)$ yang berisi semua skor berpasangan untuk sekuens sepanjang $T$ token. Pembagian dengan $\sqrt{d_k}$ sifatnya wajib. Tanpa pembagian ini, *dot product* akan membesar seiring bertambahnya dimensi, mendorong *softmax* ke titik jenuh dan mematikan *gradient*. Ini adalah bentuk baru dari masalah *vanishing gradient* yang dibahas di W5. *Softmax* mengubah setiap baris menjadi distribusi probabilitas atas posisi (bobot attention), dan perkalian dengan $V$ menghasilkan *output*: rata-rata berbobot dari semua vektor Value, satu untuk setiap token.

Dalam kode, tanpa abstraksi *library*:

```python
import torch
import torch.nn.functional as F

X   = torch.randn(5, 16)       # 5 token, 16-dim embeddings
W_Q = torch.randn(16, 16)
W_K = torch.randn(16, 16)
W_V = torch.randn(16, 16)

Q, K, V = X @ W_Q, X @ W_K, X @ W_V

scores  = Q @ K.T / Q.shape[-1] ** 0.5  # (5, 5)
weights = F.softmax(scores, dim=-1)      # (5, 5) - jumlah tiap baris adalah 1
output  = weights @ V                   # (5, 16) - dimensi sama seperti input
```

Cetak `weights`. Baris *i* adalah distribusi probabilitas yang menunjukkan seberapa besar perhatian token *i* ke setiap posisi saat membentuk *output*-nya.

**Posisi attention dalam arsitektur penuh.** Satu layer attention adalah satu komponen di dalam blok Transformer:

```
Input (T, d_model)
      |
 [ LayerNorm ]
      |
 [ Self-Attention ]   <- satu-satunya tempat token berinteraksi satu sama lain
      |
 [ Residual Add ]     <- skip connection, perannya sama seperti di ResNet (W2)
      |
 [ LayerNorm ]
      |
 [ Feed-Forward ]     <- dua linear layer, diterapkan secara mandiri per token
      |
 [ Residual Add ]
      |
Output (T, d_model)
```

Dimensi input dan *output* selalu sama, itulah sebabnya blok ini dapat ditumpuk hingga 12 atau 24 lapis tanpa memerlukan perubahan di antaranya. Perhatikan bahwa layer *feed-forward* tidak mencampur token, hanya layer attention yang melakukannya. Dalam praktiknya, model menjalankan operasi attention paralel sebanyak $h$ kali (*multi-head attention*). Masing-masing berjalan pada subruang representasi dengan dimensi yang lebih rendah, kemudian menggabungkan dan memproyeksikan hasilnya. Setiap *head* dapat menangkap pola struktural yang berbeda, meskipun spesialisasi yang rapi tidak secara otomatis dijamin oleh rancangannya. Saat satu sekuens memperhatikan sekuens lain (misalnya Q dari satu sekuens, lalu K dan V dari sekuens lainnya), proses ini disebut *cross-attention*. Anda akan melihat penerapannya di W9 untuk fusi multimodal.

**Mengapa Transformer memerlukan *positional encoding*.** Perhatikan apa yang tidak dilakukan attention: ia tidak memiliki konsep urutan. Skor antara token *i* dan token *j* hanya bergantung pada vektor Q dan K keduanya, bukan pada posisi mereka dalam sekuens. Artinya, "anjing menggigit orang" dan "orang menggigit anjing" menghasilkan input attention yang identik - himpunan token yang sama, tanpa urutan. RNN tidak pernah menghadapi masalah ini karena ia memproses token satu langkah demi satu langkah dan secara implisit mengetahui posisi. Karena Transformer memproses semua token secara paralel, informasi posisi harus disuntikkan secara eksplisit. *Positional encoding* menambahkan vektor yang bergantung pada posisi ke setiap *token embedding* sebelum masuk ke blok pertama, sehingga model mendapatkan informasi urutan sekuens yang tidak bisa diperoleh dari attention saja.

**Dampak saat kamu melakukan freeze atau fine-tune.** Melakukan *freeze* pada model berarti mengunci $W_Q, W_K, W_V$ (beserta parameter lainnya). Proyeksi yang menghasilkan Q, K, dan V terkunci, sehingga kalkulasi attention tetap berjalan tetapi tidak bisa beradaptasi dengan domain Anda. Sebaliknya, *fine-tune* memungkinkan matriks-matriks ini beradaptasi agar bobot attention bisa menangkap hubungan yang dibutuhkan oleh tugas Anda. Matematika di balik attention tidak pernah berubah, hanya matriks proyeksinya saja yang berubah.

Lab 6b (`lab_w7_transformer_mini.ipynb`) menugaskan Anda untuk menerapkan `scaled_dot_product_attention` dari awal dan memverifikasinya terhadap `nn.TransformerEncoderLayer`. *Notebook* tersebut merupakan praktik langsung yang mendampingi bagian ini.

## Kesenjangan yang perlu dilengkapi

### 1. Mekanisme Gradient Clipping - W5

**Lokasi penggunaan tanpa penjelasan:** W2 baris 153, W3 baris 216, W5 baris 100 dan 334, Lampiran glosarium.

Setiap penyebutan hanya memberikan kode atau hasil akhirnya, tetapi tidak menjelaskan mekanismenya. Mahasiswa terbiasa menjalankan `clip_grad_norm_(model.parameters(), max_norm=1.0)`, namun tidak pernah mempelajari hal-hal berikut:

- Fungsi ini memotong *global gradient norm*, bukan masing-masing *gradient*. *Gradient* yang besar diturunkan skalanya secara proporsional, bukan dijadikan nol.
- Alasan 1.0 digunakan sebagai nilai *default* awal.
- Perbedaan antara `clip_grad_norm_` dan `clip_grad_value_`.

Pertanyaan diagnosis "mengapa *gradient* saya (*explode*), apa yang harus saya sesuaikan?" tidak akan bisa dijawab tanpa pemahaman ini.

---

### 2. Mengapa Pretraining / Transfer Learning Sangat Efektif - W7

**Lokasi penggunaan tanpa penjelasan:** W7 mempraktikkan *fine-tune* pada IndoBERT. W8 memperluas ke ranah *foundation models*. Namun, kedua minggu tersebut tidak menjawab: "mengapa proses *training* menggunakan teks Wikipedia bisa membantu penyelesaian tugas teks medis saya?"

Konsep bahwa *layer* awal mempelajari pola umum (semantik subkata, sintaksis) yang dapat ditransfer lintas domain tidak pernah dinyatakan. Tanpa penjelasan ini, keputusan untuk menggunakan *freeze* atau *fine-tune* di W7 §1.4 hanya berdasarkan tebakan praktis, bukan berdasarkan pemahaman cara kerja model.

**Saran:** Tambahkan dua paragraf di awal W7 §1.1 atau §1.3.

---

### 3. Jembatan Penghubung LSTM Gates ke Vanishing Gradient - Internal W5

**Kesenjangan konten:** W5 §1.5 menjelaskan masalah *vanishing gradient*. W5 §2.3 menjabarkan rumus-rumus LSTM. Namun, keterkaitan eksplisit antara keduanya tidak pernah dibuat. Pembaruan *cell state* `c_t = f_t * c_{t-1} + i_t * g_t` berarti *gradient* mengalir secara aditif sepanjang waktu (`∂c_t/∂c_{t-1} = f_t`), bukan secara multiplikatif melalui matriks rekurensi penuh. Mahasiswa mempelajari kedua hal tersebut secara terpisah, tetapi harus menebak sendiri hubungannya.

**Saran:** Tambahkan satu kalimat di akhir W5 §1.5, tepat setelah tabel *vanishing gradient*:

> "*Cell state* pada LSTM mengatasi masalah ini dengan menggunakan operasi aditif (bukan perkalian matriks). Kamu akan melihat secara rinci cara kerjanya di §2.3."

---

### 4. Residual Connections sebagai Prinsip yang Berulang - W5 → W7/W8 `MEDIUM`

**Kesenjangan konten:** W5 baris 101 mencantumkan "*residual connection*" sebagai salah satu solusi untuk mengatasi *vanishing gradient* bersama dengan *gate* LSTM, tetapi konsep *residual connection* sendiri tidak pernah dijelaskan. Lampiran glosarium memuat rumus `Output = F(x) + x` tanpa menjelaskan tujuan penerapannya.

Poin yang lebih mendasar—bahwa *cell state* LSTM, *residual connection*, dan *skip connection* pada blok Transformer pada intinya adalah prinsip yang sama (pembaruan aditif berfungsi sebagai jalan tol *gradient*)—tidak pernah disebutkan. Padahal, prinsip ini menyatukan arsitektur di W5, W7, dan W8.

**Saran:** Tambahkan satu paragraf di W5 yang menjelaskan prinsip dasar ini satu kali ("prinsip kerjanya sama dengan *cell state* LSTM, hanya diterapkan secara struktural"). Dengan demikian, seluruh penjelasan arsitektur pada minggu-minggu berikutnya akan memiliki fondasi pemahaman yang lebih kuat.
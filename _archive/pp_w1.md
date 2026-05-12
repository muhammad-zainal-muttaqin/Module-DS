# Panduan Presentasi W1: Menit demi Menit

## Info Sesi

- **Durasi total:** 120 menit
- **Jumlah slide:** 35 (termasuk image + code slides)
- **Live coding:** 20 menit setelah slide 30 (CTA Colab)
- **Video (slide 24 & 26):** jangan putar di kelas - tugaskan sebagai PR sebelum lab

---

## Persiapan (5 menit sebelum kelas)

1. Buka slide deck W1 di browser: `/#/slides/01`
2. Siapkan Google Colab kosong di tab terpisah (`colab.new`)
3. Buka `chapters/01_W1_Tabular_Output_Heads.md` §2.2.4 - tabel 5 konfigurasi siap sebagai backup
4. Pastikan gambar muncul semua (test `fig01g`, `fig01h`, `fig01i`)

---

## Blok 1 - Pembuka + Orientasi (Menit 0-20)

### Slide 1 - Title (1 menit)

> "W1 adalah fondasi dari seluruh bootcamp. Ada satu kalimat yang perlu kamu ingat: **tugas menentukan head, head menentukan loss**. Semua minggu ke depan bertumpu di sini."

Jangan menerangkan subtitle terlalu panjang - ini hanya judul.

---

### Slide 2 - Kuis Pembuka (4 menit)

Bilang: *"Tiga soal. Dua menit. Tulis jawaban di kertas atau di chat."*

- Diam 2 menit. Biarkan mahasiswa berpikir sendiri.
- Setelah 2 menit: *"Siapa yang yakin semua tiga benar? Angkat tangan."*

**Tujuan:** bukan menguji - memetakan titik buta sebelum masuk materi. Kalau mayoritas salah soal 2 atau 3, tandai - akan ada lebih banyak pertanyaan di bagian head-loss nanti.

---

### Slide 3 - Jawaban Kuis (3 menit)

Jalan slide ini perlahan - satu grid item per giliran:

- **Soal 1 (MSE):** tanyakan *"kenapa bukan CrossEntropy?"* - karena output bukan kelas, tapi angka kontinu.
- **Soal 2 (Dua-duanya boleh):** tekankan ini - banyak yang mengira hanya ada satu cara benar. Bilang: *"Ini akan muncul di lab. Pilih satu, konsisten."*
- **Soal 3 (int 64):** tanyakan *"apa yang terjadi kalau kamu kasih float ke CrossEntropyLoss?"* - runtime error atau silent wrong, tergantung versi PyTorch.

---

### Slide 4 - Materi Bab Ini (3 menit)

Baca lima poin cepat. Tekankan poin kelima:

> "Kebiasaan observasi sebelum kesimpulan bukan bonus - ini inti W1 yang sama pentingnya dengan teknik PyTorch."

---

### Slide 5 - Objektif Belajar (3 menit)

Baca dua poin terpenting (poin 3 + 4):

- Poin 3 - mismatch sengaja: *"Kamu akan sengaja melakukan kesalahan. Ini bukan hukuman - ini yang paling diingat."*
- Poin 4 - observasi vs interpretasi: *"Dua paragraf terpisah. Ini akan dinilai di rubrik K3."*

---

### Slide 6 - Setelah Bab Ini Kamu Paham (3 menit)

Tiga grid item = tiga indikator lulus W1. Minta mahasiswa foto/screenshot - ini checklist pribadi mereka untuk evaluasi mandiri setelah lab.

---

## Blok 2 - Fondasi MLP (Menit 20-45)

### Slide 7 - Mengapa Tabular Lebih Dulu? (3 menit)

Empat alasan di body - baca lancar, jangan terlalu lama. Satu kalimat tambahan yang efektif:

> "Kalau kamu bisa debug loss di tabular, kamu bisa debug loss di gambar dan teks juga - strukturnya sama."

---

### Slide 8 - Gambar: Satu Dataset, Tiga Tugas (2 menit)

Tunjuk gambar `fig01g_tiga_tugas.png`. Tanyakan:

> "Lihat gambar ini. Bagian mana yang sama di ketiga jalur? Bagian mana yang berbeda?"

Jawaban yang diharapkan: **badan MLP sama, head berbeda**. Kalau tidak ada yang menjawab, lanjut ke slide berikutnya - slide 14 akan memperjelas.

---

### Slide 9 - MLP sebagai Pengubah Bentuk Tensor (4 menit)

Split slide - kiri: alur shape, kanan: non-linearitas.

Alur shape kiri - baca perlahan:

> "(B, F) - (B, 64) - (B, 32) - (B, 1 atau 2 atau K). Dimensi B tidak pernah berubah. Hanya lebar hidden layer yang berubah."

Non-linearitas kanan - pertanyaan retoris:

> "Kalau kamu stack dua nn.Linear tanpa ReLU, apa hasilnya?" - Satu linear yang lebih besar. Tidak lebih ekspresif.

---

### Slide 10 - Gambar: MLP 2 Layer Alur Shape (2 menit)

Tunjuk gambar `mlp_shape_flow.png`. Tanyakan: *"Apa yang tidak berubah dari kiri ke kanan?"* - Dimensi B.

---

### Slide 11 - Linear Layer: Mekanik (4 menit)

Poin 3 (704 parameter) adalah momen anchor:

> "Satu layer kecil nn.Linear(10, 64) sudah punya 704 parameter. Ini semua akan dapat gradient setiap backward(). Bayangkan saat jaringan punya jutaan parameter."

Hitung bersama di papan: 10×64 = 640 weight + 64 bias = 704. Ini bikin konsep "parameter count" jadi konkret.

---

### Slide 12 - Gambar: Fully Connected (2 menit)

Tunjuk gambar `mlp_fully_connected.png`. Tekankan: *"Setiap x terhubung ke setiap h. Ini 'fully connected' - bedanya dengan Conv2d yang akan di W2."*

---

### Slide 13 - Kode: nn.Linear Forward Pass (4 menit)

**Jalankan kode ini langsung di Colab** (tab yang sudah disiapkan). Tunjukkan:

```python
y.shape   # torch.Size([32, 64])
z.shape   # torch.Size([32, 64])
```

Tanya: *"Kenapa shape sama setelah ReLU?"* - ReLU tidak mengubah shape, hanya mengubah nilai.

---

### Slide 14 - Body dan Head: Struktur Dua Bagian (4 menit)

Split slide - ini inti konseptual W1.

Kanan bawah - poin terakhir bullets: *"Head yang salah menyebabkan loss tidak bisa turun dengan benar."* - Beri jeda. Ini yang akan mereka alami di langkah 5 lab.

---

### Slide 15 - Gambar: Body+Head Fork (2 menit)

Tunjuk gambar `body_head_fork.png`. Kata kunci: *"Pola ini sama persis dengan pretrained model di W7-W8. Di sana namanya backbone - di sini namanya body."*

---

### Slide 16 - Kode: Body + 3 Head (3 menit)

Baca `forward()` perlahan:

> "Satu `badan_mlp(x)` dipanggil sekali - hasilnya dipakai tiga head sekaligus. Tidak ada duplikasi."

Tanyakan: *"Kalau kamu punya 10 tugas, apa yang berubah?"* - Tambah 10 head, badan tetap sama.

---

## Blok 3 - Head-Loss Matching (Menit 45-65)

### Slide 17 - Section: Harus Dipasangkan (2 menit)

Baca body perlahan - ini framing penting:

> "Bukan pilihan bebas. Tugas - head - loss. Urutan ini tidak bisa dibalik."

---

### Slide 18 - Regresi: MSE + Linear Head (3 menit)

Kanan: tekankan MSE sensitif outlier. Tanyakan: *"Kapan pakai L1 (MAE) daripada MSE?"* - Kalau distribusi target punya ekor panjang / banyak outlier. Bukan fakta yang perlu dihafal - tapi bagus untuk refleks diagnosis.

---

### Slide 19 - Klasifikasi Biner (3 menit)

Kanan - **garis bawahi ini**: *"CrossEntropyLoss sudah memasukkan softmax. Jangan tambah Softmax lagi."* Ini pitfall nomor 2 di slide 33 - foreshadow sekarang.

---

### Slide 20 - Klasifikasi Multikelas (3 menit)

Kanan: *"Target adalah integer, bukan one-hot. `torch.tensor([0,1,2], dtype=torch.long)`, bukan `[1,0,0], [0,1,0], [0,0,1]`."*

---

### Slide 21 - Gambar: 5 Konfigurasi Head-Loss (3 menit)

Gambar `fig01h_output_head_loss.png` - ini referensi paling penting di W1.

> "Screenshot gambar ini. Tempel di samping layar saat lab. Lima konfigurasi ini adalah semua yang kamu butuhkan untuk W1."

Baca lima baris bersama-sama.

---

### Slide 22 - Gambar: Benar vs Bug Umum (3 menit)

Gambar `loss_head_matching.png`. Tekankan baris ketiga kolom kanan:

> "Linear(H,K) + MSELoss tidak menghasilkan error. Loss bahkan bisa turun. Tapi model tidak belajar distribusi kelas. Ini bug yang paling berbahaya."

Beri jeda. Ini motivasi eksperimen mismatch di langkah 5 lab.

---

### Slide 23 - Sigmoid vs Softmax (3 menit)

Gambar `fig01i_sigmoid_softmax.png`. Satu kalimat inti:

> "Sigmoid: setiap output independen, total bisa > 1. Softmax: distribusi probabilitas, total = 1."

Tanyakan: *"Mana yang cocok untuk multilabel (gambar bisa punya banyak label sekaligus)?"* - Sigmoid. *"Untuk multikelas eksklusif?"* - Softmax (via CrossEntropyLoss).

---

### Slide 24 - Video StatQuest (SKIP di kelas)

> "Video ini 15 menit. Tonton sebelum lab - ada di slide. Link tersedia di modul."

Jangan putar - lanjut ke slide 25.

---

## Blok 4 - Backprop + Training Loop (Menit 65-80)

### Slide 25 - Backpropagation: Gambaran Umum (5 menit)

Baca poin 1-3 perlahan. Tekankan poin 4:

> "PyTorch mengurus semua ini lewat Autograd. Satu panggilan `loss.backward()` = gradient untuk semua 704 parameter terhitung otomatis."

Poin 5: *"Lab 1b meminta kamu mengerjakan ini manual 7 langkah. Lampiran A.1 jadi referensi. Bukan untuk dihafal - untuk dipahami sekali, pelan-pelan."*

---

### Slide 26 - Video 3Blue1Brown (SKIP di kelas)

> "Video 20 menit. Tonton setelah lab - visualisasinya sangat membantu untuk memahami Lampiran A.1."

---

### Slide 27 - Gambar: Training Loop (3 menit)

Gambar `training_loop_cycle.png`. Perhatikan: *"Node zero_grad() diberi warna merah. Alasannya: paling sering dilupakan, paling sulit didiagnosis."*

---

### Slide 28 - Kode: Training Loop 5 Langkah (4 menit)

Ini slide terpenting untuk lab praktis. Baca tiap baris dengan nomor:

1. `logits = model(batch_x)` - *forward pass, hitung output*
2. `loss = criterion(logits, batch_y)` - *hitung seberapa salah prediksi*
3. `optimizer.zero_grad()` - *hapus gradient lama SEBELUM hitung yang baru*
4. `loss.backward()` - *hitung gradient semua parameter*
5. `optimizer.step()` - *update parameter pakai gradient tadi*

Tanyakan: *"Apa yang terjadi kalau langkah 3 dilewati?"* - Gradient terakumulasi dari batch sebelumnya. Hasilnya tidak terduga.

---

### Slide 29 - Gambar: Siklus Training (2 menit)

Gambar `fig03c_training_cycle.png`. Verifikasi pemahaman visual: *"Tunjuk mana zero_grad() di gambar ini."*

---

### Slide 30 - CTA: Live Coding (1 menit transisi)

> "Tutup slide sebentar. Buka Colab kosong yang sudah disiapkan. Kita tulis 15 baris ini dari nol. Semua ikut mengetik - bukan hanya melihat."

---

## Blok 5 - Live Coding (Menit 80-100, 20 menit)

### Target: 15 baris PyTorch dari nol

**Urutan pengetikan bersama:**

```python
# Menit 80-83 (3 menit): Import + dummy data
import torch
import torch.nn as nn

x = torch.randn(32, 10)          # B=32, F=10
y = torch.randint(0, 3, (32,))   # label kelas 0-2
```

```python
# Menit 83-87 (4 menit): Model
model = nn.Sequential(
    nn.Linear(10, 64), nn.ReLU(),
    nn.Linear(64, 32), nn.ReLU(),
    nn.Linear(32, 3)
)
```

```python
# Menit 87-90 (3 menit): Loss + optimizer
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)
```

```python
# Menit 90-97 (7 menit): Training loop
for epoch in range(5):
    logits = model(x)
    loss = criterion(logits, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    print(f"epoch {epoch}: loss={loss.item():.4f}")
```

```python
# Menit 97-100 (3 menit): Diskusi output
print(logits.shape)   # torch.Size([32, 3])
```

**Pertanyaan diskusi saat live coding:**

- Setelah `logits = model(x)`: *"Shape logits berapa?"* - (32, 3)
- Setelah loop: *"Kalau loss tidak turun sama sekali, apa yang diperiksa pertama?"* - pasangan loss-head-target

**Kalau ada yang salah/error saat live coding:** Biarkan error muncul di layar. Debug bersama - ini bagian terpenting dari live coding.

---

## Blok 6 - Pipeline + Pitfalls + Briefing Lab (Menit 100-115)

### Slide 31 - Pipeline Praktis: Batch, DataLoader, Split (3 menit)

Poin paling penting - poin 3:

> "Statistik normalisasi dari train saja. Ini bukan preferensi - ini aturan. W6 akan tunjukkan demo kalau dilanggar: akurasi turun dari 0.92 ke 0.63."

---

### Slide 32 - Gambar: Train/Val/Test (2 menit)

Gambar `fig06c_train_val_leakage.png`. Foreshadow W6:

> "Kita bahas ini sekilas sekarang. W6 akan kita bedah detail - ada demo dramatis."

---

### Slide 33 - 4 Pitfalls (3 menit)

Baca semua - ini checklist debugging. Tekankan pitfall 4:

> "Akurasi 94% bukan bukti model berhasil. Lihat confusion matrix dulu. Kalau 94% itu karena kelas mayoritas, model mungkin tidak belajar sama sekali."

---

### Slide 34 - Lab W1: 6 Langkah (3 menit)

Baca 6 langkah. Tekankan:

- Langkah 1 (smoke test) wajib - jangan skip. *"Kalau smoke test gagal, jangan lanjut ke langkah 2."*
- Langkah 5 (mismatch sengaja) adalah yang paling sering dilewati mahasiswa - padahal ini bagian paling penting secara pedagogis.
- Langkah 6 (observasi vs interpretasi) dinilai di rubrik.

---

### Slide 35 - CTA: Mulai Lab W1 (1 menit)

> "Modul penuh 45 menit baca, lab 3-4 jam. Mulai dari smoke test. Kalau ada yang macet, cek pitfall slide 33 dulu sebelum tanya."

Pastikan link modul berfungsi sebelum menutup presentasi.

---

## Penutup (Menit 115-120)

Lima menit terakhir untuk:

1. Recap satu kalimat per blok:
   - *"MLP = pengubah bentuk tensor."*
   - *"Tugas - head - loss. Urutan ini tidak bisa dibalik."*
   - *"Training loop 5 langkah - zero_grad() sebelum backward()."*
   - *"Observasi dan interpretasi: dua paragraf terpisah."*

2. Beri tahu dua video PR:
   - Slide 24: StatQuest CrossEntropy (~15 menit)
   - Slide 26: 3Blue1Brown Backprop (~20 menit)

3. Pastikan semua bisa akses `colab.new` dan modul W1.

---

## Ringkasan Waktu

| Blok | Konten | Durasi |
|------|--------|--------|
| Persiapan | Setup + cek slide/gambar | 5 mnt (sebelum kelas) |
| Blok 1 | Pembuka + Orientasi (Slide 1-6) | 20 mnt |
| Blok 2 | Fondasi MLP (Slide 7-16) | 25 mnt |
| Blok 3 | Head-Loss Matching (Slide 17-23) | 20 mnt |
| Blok 4 | Backprop + Training Loop (Slide 25, 27-30) | 15 mnt |
| Blok 5 | Live Coding | 20 mnt |
| Blok 6 | Pipeline + Pitfalls + Lab Briefing (Slide 31-35) | 10 mnt |
| Penutup | Recap + PR assignment | 5 mnt |
| **Total** | | **~115 mnt** |

---

## Pertanyaan yang Sering Muncul

| Slide | Pertanyaan umum mahasiswa | Jawaban singkat |
|-------|--------------------------|-----------------|
| 3 (Kuis Soal 2) | "Kapan pilih BCEWithLogitsLoss vs CrossEntropy?" | Keduanya valid untuk biner. Pilih satu, konsisten. Modul memakai CE (2 output). |
| 19-20 (Biner/Multikelas) | "Kenapa target harus int, bukan float?" | CrossEntropyLoss pakai NLLLoss di dalamnya - perlu indeks kelas. |
| 22 (Mismatch image) | "Kok loss bisa turun padahal salah?" | Loss turun tapi mengoptimasi hal yang salah. MSE di atas kelas mengoptimasi jarak numerik kelas, bukan probabilitas. |
| 28 (Training loop) | "Kenapa zero_grad() sebelum backward(), bukan setelah step()?" | Konvensi PyTorch. Di step() gradient sudah terpakai - yang perlu dibersihkan sebelum backward() berikutnya. |
| 33 (Pitfall 2) | "Apa bedanya Softmax+CE vs CE saja?" | CE = log_softmax + NLLLoss. Tambah Softmax sebelumnya = log(softmax(softmax(x))) - distribusi jadi salah. |

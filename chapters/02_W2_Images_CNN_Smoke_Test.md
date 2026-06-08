<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 00a | [Prasyarat Modul](00a_Prasyarat.md) | – |
| 01 | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) | 1 |
| ▶ 02 | W2 - Images, CNN & Smoke Test | 2 |
| 03 | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) | 3 |
| 04 | [W4 - Reproducibility & Matriks Eksperimen](04_W4_Reproducibility_Experiment_Matrix.md) | 4 |
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

Kali ini kita akan membahas:

1. **Citra sebagai Tensor** - mengubah satu foto menjadi tensor `(B, C, H, W)`.
2. **CNN dan Conv2d** - filter lokal yang berbagi bobot, lalu merakitnya jadi SimpleCNN.
3. **Smoke Test Tiga Level** - menangkap bug sebelum training penuh berjalan berjam-jam.

Di pertemuan sebelumnya (W1) kita sudah belajar memetakan satu tugas ke pasangan tensor input dan output, lalu memilih output head dan loss yang cocok. Refleks itu ada di [W1 §2.1](01_W1_Tabular_Output_Heads.md): lihat shape yang masuk dan shape yang harus keluar, baru pilih keluarga model. W1 memakai vektor tabular `(F,)`. Minggu ini inputnya naik satu tingkat ke citra `(C, H, W)`, dan keluarga modelnya adalah CNN. Output W1 yang dipakai di sini adalah kebiasaan menulis pasangan tensor input dan output sebelum menyentuh kode.

---

## 1. Citra sebagai Tensor

Sebuah foto grayscale berukuran `H×W` adalah matriks angka. Tiap angka adalah nilai pixel `0..255`, atau `0..1` setelah dinormalkan ke float. Contoh matriks 4×4 yang menyimpan pola gelap kecil di tengah latar terang:

```
255 255 255 255
255 200  50 255
255  50 200 255
255 255 255 255
```

Shape-nya `(H, W) = (4, 4)`: sumbu pertama baris (tinggi), sumbu kedua kolom (lebar).

Foto berwarna adalah tiga matriks grayscale yang ditumpuk, satu untuk channel merah (R), satu hijau (G), satu biru (B). Tiap channel adalah matriks `H×W` sendiri. Setelah ditumpuk, shape menjadi `(C, H, W)` dengan `C = 3`. PyTorch memakai konvensi **channel-first**: channel adalah sumbu pertama setelah batch. Sebagian library lain (TensorFlow Keras default) memakai channel-last `(H, W, C)`, jadi periksa konvensi saat porting kode antar library.

Training tidak memproses satu foto per langkah. Sebanyak `B` foto digabung jadi satu **batch**, sehingga tensor input ke model berbentuk:

```
(B, C, H, W)
 │  │  │  │
 │  │  │  └── lebar gambar
 │  │  └───── tinggi gambar
 │  └──────── jumlah channel (RGB → 3, grayscale → 1)
 └─────────── jumlah gambar dalam batch
```

CIFAR-10 memberi contoh konkret: 32 foto RGB 32×32 dalam satu batch berbentuk `(32, 3, 32, 32)`. Notasi ini muncul di seluruh W2 dan W3.

![Visualisasi tensor (N, C, H, W): batch foto RGB tersusun dalam empat sumbu - jumlah gambar, channel warna, tinggi, dan lebar](../figures/fig00a_tensor_nchw.jpeg)

Cara tercepat memverifikasi format data adalah memeriksa shape satu batch langsung. Kalau lupa urutan sumbu, panggil `print(x.shape)` setelah `next(iter(loader))`. Tensor dengan empat angka di shape adalah 4D dengan urutan `(B, C, H, W)` di PyTorch.

```python
x, y = next(iter(trainloader))
print(x.shape)   # torch.Size([32, 3, 32, 32]) → B=32, C=3, H=32, W=32
print(y.shape)   # torch.Size([32]) → satu label integer per gambar
```

Pasangan tensor input dan output W2 adalah `(C, H, W) -> (N,)`: citra masuk, vektor logit kelas keluar. Penurunan pasangan ini dari tugas mengikuti refleks [W1 §2.1](01_W1_Tabular_Output_Heads.md), dan disiplin menuliskannya sebelum menulis kode tetap berlaku saat masuk domain baru di minggu-minggu berikutnya.

---

## 2. CNN dan Conv2d

`nn.Conv2d` adalah komponen utama CNN. Satu **filter** (disebut juga **kernel**) berukuran kecil, misalnya 3×3, berisi 9 angka bobot. Filter ditempel di pojok kiri-atas gambar, dikalikan element-wise dengan patch 3×3 di bawahnya, lalu hasilnya dijumlahkan menjadi satu angka di output. Filter kemudian digeser satu pixel ke kanan, operasi yang sama diulang, sampai sudut kanan-bawah. Hasil keseluruhannya adalah satu **feature map**.

![Filter 3×3 bergeser melewati gambar: ditempatkan di satu lokasi, dikalikan element-wise dengan patch di bawahnya, hasilnya dijumlahkan menjadi satu nilai di feature map, lalu filter bergeser ke posisi berikutnya](../figures/fig02c_conv_filter.png)

Diagram di atas menunjukkan satu siklus operasi filter. Contoh hitung pada satu posisi:

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

Filter di atas adalah detektor tepi vertikal: nilainya membesar di lokasi yang berisi transisi terang-ke-gelap dari kiri ke kanan. Saat training, bobot filter dipelajari otomatis, jadi CNN menemukan sendiri filter apa yang berguna untuk tugasnya. Bobot 9 angka itu tidak berubah saat filter bergeser ke posisi berikutnya. Inilah **parameter sharing**: satu filter 3×3 mendeteksi tepi di sudut kiri atas maupun sudut kanan bawah dengan bobot yang sama, sehingga CNN jauh lebih hemat parameter dibanding MLP penuh untuk data gambar. Asumsi yang tertanam adalah pola relevan bersifat lokal dan bisa muncul di lokasi mana pun (*translation invariance*).

### 2.1 Kernel, Stride, Padding

Tiga parameter `Conv2d` menentukan cara filter beroperasi:

- **Kernel size** adalah ukuran satu filter. Filter 3×3 paling umum dipakai. Filter 1×1 berfungsi sebagai proyeksi per-pixel yang mengubah jumlah channel tanpa menyentuh dimensi spasial. Filter 7×7 memberi *receptive field* lebih besar tetapi memakai lebih banyak parameter.
- **Stride** menentukan berapa pixel filter bergeser setiap langkah. `stride=1` (default) menggeser satu pixel. `stride=2` menghasilkan output yang setengah lebih kecil di tiap dimensi spasial dan sering dipakai sebagai pengganti MaxPool.
- **Padding** adalah jumlah baris dan kolom nol yang ditambahkan di tepi gambar sebelum konvolusi. `padding=1` menambah satu lapisan nol di tiap sisi. Tanpa padding, dimensi spasial output menyusut satu pixel di tiap sisi per layer.

Dimensi output satu layer dihitung dari input spasial `in`, kernel `k`, padding `p`, dan stride `s`:

```
out = (in - k + 2*p) / s + 1
```

Penurunannya singkat: dari `in` pixel ditambah padding `p` di kiri dan kanan menjadi `in + 2p`, filter butuh ruang sebesar `k`. Posisi awal filter punya `(in + 2p - k)` slot, filter bergeser `s` per langkah, jadi jumlah langkah `(in + 2p - k) / s`, ditambah posisi awal `+ 1`. Contoh pada komponen SimpleCNN di §2.3:

```
Conv2d(3, 32, kernel_size=3, padding=1) pada input (B, 3, 32, 32):
  out = (32 - 3 + 2*1)/1 + 1 = 32          # padding=1 mempertahankan dimensi spasial

MaxPool2d(2) pada input (B, 32, 32, 32):
  out = (32 - 2 + 0)/2 + 1 = 16            # stride=2 setengahkan
```

Rumus ini adalah alat pertama saat mendebug shape mismatch. Hitung shape yang diharapkan di tiap layer, lalu bandingkan dengan error message yang muncul di Level 2 smoke test (§3).

### 2.2 Receptive Field

Satu pixel di feature map output tidak hanya melihat satu pixel input. Ia melihat patch input seukuran kernel. Saat layer Conv2d ditumpuk, satu pixel di feature map yang lebih dalam melihat patch yang lebih besar di input asli, karena tiap layer mengakumulasi area yang dilihatnya.

![Receptive field tumbuh seiring kedalaman: layer Conv 1 melihat 3×3 pixel input, layer Conv 2 melihat 5×5, layer Conv 3 melihat 7×7 - setiap layer menambahkan 2 pixel di setiap sisi](../figures/fig02d_receptive_field.png)

Dari gambar tersebut, tiga aturan menjelaskan pertumbuhannya. Layer Conv2d pertama dengan kernel 3×3 menghasilkan receptive field 3×3. Layer Conv2d kedua memperluasnya menjadi 5×5 di input asli, karena tiap pixel layer pertama sudah melihat 3×3. `MaxPool2d(2)` melipatgandakan receptive field, sehingga layer Conv2d setelah pooling melihat area dua kali lebih besar di input asli.

Ukuran area input yang dilihat satu pixel di feature map disebut **receptive field**. Di layer akhir CNN yang dalam, receptive field bisa mencakup sebagian besar atau seluruh gambar. Dengan cara inilah CNN menangkap pola besar dari operasi lokal kecil yang berlapis.

> [!NOTE]
> Receptive field tumbuh kira-kira `1 + L*(k-1)` untuk `L` layer Conv `k×k` tanpa pooling, dan tumbuh berlipat saat ada pooling. Rumus lengkapnya ada di [*A guide to convolution arithmetic*](https://arxiv.org/abs/1603.07285) (Dumoulin & Visin, 2016).

### 2.3 SimpleCNN pada CIFAR-10

Komponen di atas dirakit menjadi satu CNN minimal yang bisa dilatih penuh pada CIFAR-10. SimpleCNN menumpuk dua blok Conv lalu satu classifier:

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

Tiap pilihan punya alasan teknis. `padding=1` mempertahankan dimensi spasial sesuai rumus output shape di §2.1. Dua Conv per blok menambah kapasitas nonlinier sebelum resolusi diturunkan oleh pooling. `BatchNorm2d` sebelum ReLU menstabilkan distribusi input antar layer, dan `bias=False` pada Conv dipakai karena BatchNorm sudah punya parameter bias sendiri. `MaxPool2d(2)` memperluas receptive field. `AdaptiveAvgPool2d(1)` meringkas tiap feature map menjadi satu angka per channel (*global average pooling*), sehingga classifier tidak bergantung pada resolusi input. `Dropout(0.3)` menonaktifkan 30% aktivasi per langkah training untuk mengurangi overfitting, dan otomatis mati saat `model.eval()`. Classifier tidak memakai `Softmax` karena `CrossEntropyLoss` PyTorch sudah melakukan log-softmax secara numerik stabil. Pemilihan loss dan optimizer dibahas penuh di [W3 §2.1-§2.2](03_W3_Loss_Optimizer_Evaluasi.md).

Setup training memasangkan model dengan data, loss, dan optimizer:

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

`RandomCrop` dan `RandomHorizontalFlip` adalah augmentasi yang diterapkan hanya pada training set untuk memperluas variasi data; val dan test dievaluasi apa adanya. Batch size 128 cukup stabil untuk BatchNorm, dan `device` disetel otomatis agar kode berjalan di laptop maupun server. Tuple `(0.4914, 0.4822, 0.4465)` adalah mean per-channel CIFAR-10 dan `(0.2470, 0.2435, 0.2616)` adalah std per-channel, dihitung sekali dari training set. Menormalkan input ke zero-mean unit-variance per channel membuat optimizer konvergen lebih cepat. Tiap dataset baru perlu menghitung statistiknya sendiri, jadi jangan pakai angka CIFAR-10 untuk PathMNIST atau ImageNet.

> [!CAUTION]
> Dua klaim umum yang perlu dicek skeptis sejak W2. "Arsitektur lebih dalam selalu lebih baik" tidak benar: tanpa data cukup, model dalam cenderung overfitting, jadi mulai dari arsitektur sederhana yang konvergen dan tambah kedalaman hanya kalau kapasitas terbukti jadi penyebab. "Accuracy 99% berarti model hebat" juga menyesatkan: bandingkan dulu dengan baseline naif yang memprediksi kelas mayoritas, karena kalau akurasinya juga tinggi, yang terukur adalah distribusi kelas, bukan kualitas model.

---

## 3. Smoke Test Tiga Level

Sebelum training berjam-jam, jalankan tiga tes berurutan yang menargetkan tiga jenis bug berbeda. Tiap level butuh konteks dan waktu debugging lebih banyak dari level sebelumnya. Kalau satu tes gagal, hentikan dan perbaiki sebelum lanjut.

| Level | Tes | Menangkap | Butuh |
|---|---|---|---|
| 1 | Import test | Typo, missing dependency, shape mismatch di definisi layer | Tidak butuh data atau forward pass |
| 2 | Dummy forward | Shape mismatch antar layer | Model dimuat, tensor random |
| 3 | Overfit one batch | Bug algoritma: gradient mati, loss tidak turun, target salah-bentuk | 4-8 sampel nyata, 100 iterasi |

**Level 1** menjalankan `import model; model.eval()`. Kalau gagal, ada typo, dependency yang hilang, atau shape mismatch di definisi layer.

**Level 2** membuat tensor random dengan shape yang benar, mengumpankannya ke model, dan memeriksa output shape:

```python
x = torch.randn(2, 3, 32, 32)  # batch=2, RGB, 32x32
logits = model(x)
assert logits.shape == (2, 10), f"got {logits.shape}"
```

**Level 3** mengambil 4-8 sampel dari dataset sebenarnya lalu menjalankan 100 iterasi hanya pada sampel itu. Kalau loss tidak mendekati nol, ada bug di training loop atau loss function, bukan masalah hyperparameter.

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

Loss awal `~2.3` adalah `-log(1/10) = log(10)`, nilai yang diharapkan untuk prediksi acak dari 10 kelas. Jangan lompat ke Level 3 sebelum Level 1 dan 2 lulus, dan jangan mulai training 30 epoch sebelum Level 3 lulus.

> [!IMPORTANT]
> Overfit one batch adalah tes paling diagnostik. Kalau gagal, ada bug di kode, bukan di hyperparameter. Kalau berhasil, model berfungsi dengan benar dan masalah performa berasal dari data, augmentasi, atau regularisasi. Pisahkan dua kemungkinan ini dulu sebelum melapor ke dosen, supaya laporannya menyebut penyebab yang sudah dipersempit, misalnya "loss tidak turun di overfit one batch", bukan kalimat umum "model tidak belajar".

Smoke test tiga level ini dipakai sebelum tiap run penuh sepanjang bootcamp, termasuk sebelum tiap eksperimen terkontrol di [W4](04_W4_Reproducibility_Experiment_Matrix.md).

---

## Lab

### Lab 1 - Baseline CNN (lab utama W2, selesai di W3)

Buka [lab_w2_cnn_baseline.ipynb](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w2_cnn_baseline.ipynb). Tugas mengikuti urutan materi di atas. Di W2:

1. Periksa shape satu batch dengan `print(x.shape)` dan pastikan urutannya `(B, C, H, W)`.
2. Jalankan tiga level smoke test (import, dummy forward, overfit one batch) berurutan.
3. Bangun SimpleCNN dan latih baseline dari scratch.
4. Bangun baseline fine-tuning pretrained (ResNet-18 dengan backbone frozen).
5. Catat pada level mana tiap jenis error tertangkap oleh smoke test.

Selesaikan evaluasi dan error analysis setelah membaca [W3](03_W3_Loss_Optimizer_Evaluasi.md).

Checklist W2:

- [ ] Shape satu batch diverifikasi sebagai `(B, C, H, W)`.
- [ ] Tiga level smoke test selesai dan terdokumentasi.
- [ ] SimpleCNN forward pass jalan dengan shape yang benar.
- [ ] Overfit one batch berhasil (loss turun ke < 0.1 dalam 100 iterasi).
- [ ] Training loop berjalan 5 epoch tanpa error.

### Lab 1c - MLP dari Nol (breadth opsional, kapan saja)

Buka [lab_w1_mlp_numpy.ipynb](https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w1_mlp_numpy.ipynb). Lab ini tersedia untuk Breadth Check keluarga MLP. Isinya implementasi backpropagation 7-langkah manual dalam numpy, finite-difference gradient check, dan parity check terhadap PyTorch. Derivasi 7-langkah chain rule (MSE loss + sigmoid) ada di [Lampiran A.1](14_Lampiran.md#a1-backpropagation-derivasi-manual); baca setelah W3, saat sudah punya beberapa run sukses untuk diinterpretasi.

---

## Refleksi

1. Anda diberi dataset baru: 500 sinyal EKG satu dimensi, panjang masing-masing 5000 titik, target empat kelas aritmia. Keluarga arsitektur apa yang paling masuk akal dicoba pertama, dan mengapa? Pilihan kedua Anda apa, dan di kondisi apa ia lebih cocok?
2. SimpleCNN Anda mendapat train accuracy 95% tetapi val accuracy 68%. Tanpa melihat kodenya, sebutkan tiga hipotesis paling mungkin tentang penyebabnya, lalu tiga eksperimen pendek yang bisa membedakan satu hipotesis dari yang lain.
3. Seorang kolaborator mengirim rekaman suara tangisan bayi sepanjang tiga detik pada *sampling rate* 16 kHz, dilabeli empat kategori. Tuliskan pasangan tensor input dan output yang paling alami, lalu ajukan satu alternatif representasi input (misalnya mel-spektrogram 2D) dan bahas bagaimana perubahan bentuk itu menggeser pilihan keluarga arsitektur.

---

## Lanjut ke W3

W3 melanjutkan dari baseline CIFAR-10 yang dibangun minggu ini. Bab itu membahas cara memilih loss yang sesuai, cara optimizer memperbarui parameter, evaluasi dengan metrik yang sesuai, tiga strategi representasi fitur, dan cara membaca loss curve untuk mendiagnosis hasil training. Pasangan tensor input dan output `(C, H, W) -> (N,)` serta smoke test tiga level dari W2 tetap dipakai di setiap eksperimen berikutnya.

Buka [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) ketika siap.

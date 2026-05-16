import type { SlideSection } from "./index";

export const slides00a: SlideSection[] = [
  // ── Slide 1: Title ──
  {
    layout: "title",
    title: "Prasyarat: Fondasi Sebelum W1",
    subtitle: "Shape tensor, konvensi huruf, kalkulus mini, PyTorch primer.",
    body: "Baca dalam 20 menit. Lewati jika sudah paham, pakai sebagai referensi jika ragu.",
    footnote: "Bab 00a - Prasyarat",
  },

  // ── Slide 2: Mengapa prasyarat ini ──
  {
    layout: "section",
    title: "Mengapa Prasyarat Ini?",
    body: "Prasyarat ini bukan ujian masuk, melainkan kosakata bersama yang dipakai di setiap bab - mulai dari shape tensor, konvensi huruf, hingga tiga operasi PyTorch. Tanpa kosakata ini, penjelasan di W1 akan membutuhkan banyak catatan kaki yang mengganggu alur bacaan.",
    footnote: "Jika sudah pernah memakai PyTorch dan paham shape (B, C, H, W), slide ini bisa di-skip.",
  },

  // ── Slide 2b: Materi Bab Ini ──
  {
    layout: "bullets",
    title: "Materi Bab Ini",
    body: "Halaman prasyarat ini memuat enam topik dasar yang dipakai di setiap bab modul:",
    bullets: [
      "**Shape tensor** - cara membaca tuple (B, C, H, W) dan peran koma akhir pada (3,).",
      "**Konvensi huruf modul** - N, F, B, C, H, W, T dipakai konsisten dari W1 sampai capstone.",
      "**Notasi panah `->`** - misalnya (F,) -> (1,) artinya shape input dan output keseluruhan model.",
      "**Kalkulus mini** - turunan sebagai kemiringan dan chain rule sebagai rantai turunan.",
      "**PyTorch primer** - tiga operasi inti: cek shape, pindah ke device, dan backward.",
      "**Glosarium 19 istilah** yang muncul berulang sejak W1, cukup dikenali sebagai peta kasar.",
    ],
    footnote: "Bab ini bukan ujian masuk - kosakata bersama yang dipakai sebagai rujukan cepat.",
  },

  // ── Slide 2c: Objektif Belajar ──
  {
    layout: "bullets",
    title: "Objektif Belajar",
    body: "Selama membaca bab prasyarat, kamu akan:",
    bullets: [
      "**Membaca shape tuple** dan menyebutkan arti setiap sumbu untuk data tabular dan citra.",
      "**Menerjemahkan notasi panah** seperti (C, H, W) -> (N,) ke deskripsi tugas yang konkret.",
      "**Memahami chain rule** sebagai gambaran tanpa harus menurunkan derivasi penuh - cukup paham arah aliran gradient.",
      "**Mengenali tiga operasi PyTorch** yang akan dipakai di setiap lab mulai W1.",
    ],
    footnote: "Tujuannya bukan menguasai PyTorch, cukup tidak panik saat shape dan autograd muncul di W1.",
  },

  // ── Slide 2d: Setelah Bab Ini Kamu Paham ──
  {
    layout: "grid",
    title: "Setelah Bab Ini Kamu Paham",
    body: "Setelah selesai membaca prasyarat, kamu diharapkan mampu:",
    gridItems: [
      {
        title: "Mendeskripsikan Tensor (32, 3, 224, 224)",
        body: "Kamu bisa menjawab langsung bahwa tensor ini adalah batch 32 citra RGB beresolusi 224x224 piksel - tanpa harus mencari di dokumentasi atau bertanya ke internet.",
      },
      {
        title: "Membaca Kode PyTorch Dasar",
        body: "Kamu memahami bahwa pola model(x), loss = criterion(...), loss.backward(), optimizer.step() bukan kotak hitam - sudah jelas apa yang dihitung di setiap baris.",
      },
      {
        title: "Tidak Panik dengan Istilah",
        body: "Sembilan belas istilah inti seperti loss, gradient, optimizer, baseline, freeze, fine-tune, ablation, leakage, dan seterusnya sudah kamu kenali sebagai peta kasar - definisi rinci bisa dibuka kembali saat dibutuhkan.",
      },
    ],
    footnote: "Jika tiga capaian terasa kurang, baca bab prasyarat penuh sekitar 20 menit sebelum lanjut ke W1.",
  },

  // ── Slide 3: Shape Tensor ──
  {
    layout: "bullets",
    title: "Shape Tensor: 4 Pola Paling Sering Muncul",
    body: "Berikut adalah empat pola shape tensor yang paling sering muncul dalam modul ini:",
    bullets: [
      "**(D,)** adalah vektor satu dimensi yang berisi satu baris fitur atau satu embedding.",
      "**(B, D)** adalah batch data tabular yang terdiri dari B sampel dengan D fitur per sampel.",
      "**(B, C, H, W)** adalah batch citra yang terdiri dari B gambar, C channel (RGB=3), dan H×W piksel.",
      "**(B, T, D)** adalah batch sequence yang terdiri dari B urutan, T timestep, dan D dimensi embedding.",
    ],
    footnote: "Huruf kapital = dimensi variabel. Baca shape sebelum baca kode - itu kebiasaan yang akan terus dipakai.",
  },

  // ── Slide 3d: Visualisasi Tensor 4D ──
  {
    layout: "image",
    title: "Visualisasi Tensor (B, C, H, W)",
    imageUrl: "/figures/fig00a_tensor_nchw.jpeg",
    caption: "Gambar ini menunjukkan representasi volumetrik dari satu citra dengan tiga dimensi (Channel, Height, Width); batch berarti menumpuk B volume serupa di sumbu paling depan.",
    footnote: "Sumber: Stanford CS231n (cs231n.github.io). Bayangkan (32, 3, 224, 224) sebagai 32 lembar volume RGB beresolusi 224x224.",
  },

  // ── Slide 3b: Quiz shape reading ──
  {
    layout: "bullets",
    title: "Kuis: Baca Shape Ini",
    body: "Coba baca shape tensor berikut dan pilih jawaban yang benar:",
    bullets: [
      "`x = torch.randn(32, 3, 64, 64)` - apa arti setiap angka?",
      "A) B=3, C=32, H=64, W=64",
      "B) B=32, C=3, H=64, W=64",
      "C) B=32, C=64, H=3, W=64",
      "D) Tidak bisa tahu tanpa melihat konteks kode",
    ],
    footnote: "Diskusi 1-2 menit. Jawaban di slide berikutnya.",
  },

  // ── Slide 3c: Jawaban shape ──
  {
    layout: "split",
    title: "Jawaban: Shape (32, 3, 64, 64)",
    left: {
      title: "Jawaban: B",
      body: "Jawaban yang benar adalah B: B=32 (batch), C=3 (channel RGB), H=64, W=64.\n\nDokumentasi PyTorch menyebut tata letak ini sebagai **NCHW**, sedangkan di modul kita menulis **BCHW** karena huruf B sudah dipakai untuk batch dan N kita pakai untuk jumlah kelas. Dua istilah ini mengacu pada hal yang sama - dimensi pertama selalu batch, lalu channel, lalu tinggi, lalu lebar.",
    },
    right: {
      title: "Kenapa Bukan yang Lain?",
      bullets: [
        "**A salah** karena C=32 tidak mungkin - channel citra hanya 1 (grayscale) atau 3-4 (RGB/RGBA).",
        "**C salah** karena H=3 tidak mungkin - angka 3 adalah channel, bukan ukuran piksel.",
        "**D salah** karena urutan B-C-H-W (alias NCHW di dokumentasi PyTorch) adalah standar yang konsisten di semua fungsi dan tutorial resmi.",
      ],
    },
    footnote: "Shape adalah titik awal debugging. Baca sebelum bertanya ke internet atau LLM. Catatan: NCHW di PyTorch = BCHW di modul ini, beda nama saja.",
  },

  // ── Slide 4: Video deeplizard ──
  {
    layout: "video",
    title: "Apa Itu Tensor? (Tonton 6 Menit)",
    videoUrl: "https://www.youtube.com/embed/Csa5R12jYRg",
    caption: "deeplizard - \"Tensors Explained\" - visualisasi dari skalar → vektor → matriks → tensor N-dimensi",
    footnote: "6 menit, tidak ada paywall. Sangat membantu untuk yang baru pertama kali menjumpai istilah tensor.",
  },

  // ── Slide 5: Kode NumPy/PyTorch shape ──
  {
    layout: "code",
    title: "Shape di Kode: Baca Sebelum Lanjut",
    body: "Dua cara paling umum melihat shape - NumPy dan PyTorch.",
    code: `import numpy as np
import torch

# NumPy
a = np.array([1, 2, 3])
print(a.shape)              # (3,)  ← vektor

# PyTorch
x = torch.randn(8, 3, 32, 32)
print(x.shape)              # torch.Size([8, 3, 32, 32])  ← N, C, H, W

# Ubah shape tanpa copy data
x_flat = x.view(8, -1)
print(x_flat.shape)         # torch.Size([8, 3072])`,
    lang: "python",
    footnote: "x.view() dan x.reshape() sering dipakai untuk mengubah dimensi sebelum masuk layer Linear.",
  },

  // ── Slide 6: Konvensi huruf ──
  {
    layout: "grid",
    title: "Konvensi Huruf yang Dipakai di Seluruh Modul",
    body: "Modul ini menggunakan konvensi huruf berikut secara konsisten:",
    gridItems: [
      {
        title: "B (Batch Size)",
        body: "B menyatakan jumlah sampel dalam satu mini-batch. Nilainya biasanya 16-512 tergantung memori GPU.",
      },
      {
        title: "F atau D (Fitur / Dimensi)",
        body: "F atau D menyatakan jumlah fitur per sampel (tabular) atau ukuran embedding (NLP). F lebih umum di ML klasik, sementara D lebih umum di deep learning.",
      },
      {
        title: "C (Channel)",
        body: "C menyatakan jumlah saluran citra (RGB=3, grayscale=1). Huruf ini juga dipakai untuk jumlah filter di CNN.",
      },
      {
        title: "H, W (Height, Width)",
        body: "H dan W menyatakan dimensi spasial citra dalam piksel. Contohnya: CIFAR-10 memiliki H=W=32, sedangkan ImageNet memiliki H=W=224.",
      },
      {
        title: "T (Timestep)",
        body: "T menyatakan panjang sequence input, seperti jumlah kata dalam kalimat atau jumlah langkah waktu sensor.",
      },
      {
        title: "K atau N (Kelas)",
        body: "K atau N menyatakan jumlah kelas dalam klasifikasi. K dipakai di K-means, sementara N atau num_classes dipakai di kode PyTorch.",
      },
    ],
    footnote: "Konvensi ini konsisten di semua bab. Jika ada notasi yang belum dikenal, cek Lampiran A.11.",
  },

  // ── Slide 7: Arti -> ──
  {
    layout: "bullets",
    title: "Arti `→` dalam Shape Map",
    body: "Simbol panah `→` dalam Shape Map memiliki makna khusus yang harus kamu pahami:",
    bullets: [
      "`(B, F) → (B, H)` artinya tensor **berubah bentuk** - bukan datanya yang berubah, tapi dimensinya.",
      "Satu `→` biasanya merepresentasikan satu operasi: satu Linear layer, satu Conv layer, atau satu pooling.",
      "Shape Map W1 menunjukkan alur **(B, 10) → (B, 64) → (B, 32) → (B, 1)** untuk regresi dengan dua hidden layer.",
      "Jika shape tidak cocok, PyTorch akan melemparkan `RuntimeError: mat1 and mat2 shapes cannot be multiplied`.",
      "Kamu harus membaca error tersebut dan menelusuri shape-nya, bukan langsung bertanya ke internet atau LLM.",
    ],
    footnote: "Shape Map adalah ringkasan arsitektur yang lebih cepat dibaca daripada kode model lengkap.",
  },

  // ── Slide 8: Kalkulus mini ──
  {
    layout: "split",
    title: "Kalkulus Mini: Dua Konsep yang Cukup",
    body: "Untuk mengikuti modul ini, kamu hanya perlu memahami dua konsep kalkulus berikut:",
    left: {
      title: "Turunan (Gradient)",
      body: "f'(x) adalah laju perubahan f terhadap x. Dalam deep learning, kita mencari jawaban atas pertanyaan: kalau weight naik sedikit, loss naik atau turun berapa?\n\nGradient menunjuk ke arah kenaikan tercepat, dan kita melangkah ke arah berlawanan supaya loss turun.",
    },
    right: {
      title: "Chain Rule",
      body: "Jika z = f(g(x)), maka dz/dx = (dz/dg) × (dg/dx). Konsep ini adalah dasar dari backpropagation.\n\nPada backward pass, gradient dihitung mulai dari loss, lalu dikalikan turunan lokal satu demi satu lewat aturan rantai. PyTorch menangani semua ini lewat Autograd.",
    },
    footnote: "Tidak perlu mengingat rumus di luar konteks. Cukup paham apa yang dihitung dan mengapa arahnya berlawanan.",
  },

  // ── Slide 8d: Chain Rule Visual ──
  {
    layout: "image",
    title: "Chain Rule: Gradient pada Backward Pass",
    imageUrl: "/figures/fig00a_chain_rule.svg",
    caption: "Gambar ini menunjukkan computation graph saat backward pass: gradient dihitung dari output, dikalikan turunan lokal di tiap node, lalu digunakan untuk menghitung turunan terhadap variabel input.",
    footnote: "Sumber: Dive into Deep Learning (d2l.ai), Apache 2.0. Konsep ini menjadi dasar dari `loss.backward()` di PyTorch.",
  },

  // ── Slide 8b: Quiz task→loss ──
  {
    layout: "bullets",
    title: "Kuis: Pasangkan Task dan Loss",
    body: "Coba pasangkan setiap task dengan fungsi loss yang sesuai:",
    bullets: [
      "**Task A:** Prediksi harga rumah (bilangan kontinu)",
      "**Task B:** Deteksi spam (ya/tidak)",
      "**Task C:** Klasifikasi 3 kategori cuaca: Cerah/Mendung/Hujan",
      "---",
      "1. CrossEntropyLoss &nbsp; 2. MSELoss &nbsp; 3. BCEWithLogitsLoss",
    ],
    footnote: "Satu pasangan untuk setiap task. Diskusi 2 menit.",
  },

  // ── Slide 8c: Jawaban Task A ──
  {
    layout: "split",
    title: "Jawaban Task A: Prediksi Harga Rumah → MSELoss",
    body: "Task A meminta prediksi harga rumah berupa angka kontinu (misalnya 150 juta atau 300 juta). Karena output bukan kategori, task ini adalah regresi.",
    left: {
      title: "Model dan Target",
      bullets: [
        "Output head-nya adalah `nn.Linear(D, 1)` tanpa aktivasi.",
        "Bentuk output adalah **(B, 1)** - satu angka prediksi per sampel.",
        "Target `y` bertipe float, misalnya `250.0` (juta rupiah).",
      ],
    },
    right: {
      title: "Loss: MSELoss",
      body: "MSELoss mengukur seberapa jauh angka prediksi dari angka asli, dihitung sebagai rata-rata kuadrat selisih.\n\nContoh: prediksi 200, target 250, selisih 50, lalu dikuadratkan menjadi 2500. Loss ini sensitif terhadap outlier karena selisih besar dihukum lebih berat.",
    },
    footnote: "Intinya: regresi pakai MSE. Output Linear(D,1) tanpa aktivasi, target float kontinu.",
  },

  // ── Slide 8c2: Jawaban Task B ──
  {
    layout: "split",
    title: "Jawaban Task B: Deteksi Spam → BCEWithLogitsLoss",
    body: "Task B hanya punya dua kemungkinan: spam (1) atau bukan spam (0). Ini klasifikasi biner dengan dua varian arsitektur yang sama-sama valid.",
    left: {
      title: "Varian 1 Logit (Direkomendasikan)",
      bullets: [
        "Output head-nya adalah `nn.Linear(D, 1)` yang menghasilkan satu logit.",
        "Bentuk output adalah **(B, 1)** - satu angka logit per sampel.",
        "Target `y` bertipe float dengan nilai 0 atau 1.",
        "Contoh: logit 2.0 berarti probabilitas tinggi (spam), logit -1.5 berarti probabilitas rendah (bukan spam).",
      ],
    },
    right: {
      title: "Loss: BCEWithLogitsLoss",
      body: "BCEWithLogitsLoss menggabungkan sigmoid dengan binary cross entropy dalam satu fungsi, sehingga kamu cukup memasukkan logit mentah.\n\nAlternatifnya adalah `Linear(D, 2)` plus CrossEntropyLoss - dua-duanya valid, pilih satu dan pakai konsisten sampai akhir eksperimen.",
    },
    footnote: "Intinya: biner pakai BCEWithLogits (1 output) atau CrossEntropy (2 output). Jangan campur dalam satu eksperimen.",
  },

  // ── Slide 8c3: Jawaban Task C ──
  {
    layout: "split",
    title: "Jawaban Task C: 3 Kategori Cuaca → CrossEntropyLoss",
    body: "Task C punya tiga kelas: Cerah, Mendung, Hujan. Karena lebih dari dua kelas dan saling eksklusif, ini adalah klasifikasi multikelas.",
    left: {
      title: "Model dan Target",
      bullets: [
        "Output head-nya adalah `nn.Linear(D, 3)` yang menghasilkan tiga logit.",
        "Bentuk output adalah **(B, 3)** - satu logit per kelas per sampel.",
        "Contoh output `[2.1, 0.5, -1.0]` berarti model paling yakin kelas pertama (Cerah).",
        "Target bukan one-hot, tetapi indeks integer: Cerah=0, Mendung=1, Hujan=2.",
      ],
    },
    right: {
      title: "Loss: CrossEntropyLoss",
      body: "CrossEntropyLoss mengukur apakah model memberi probabilitas tinggi ke kelas yang benar dengan menggabungkan log-softmax dan negative log likelihood.\n\nTarget bertipe `torch.long` (integer), bukan float dan bukan one-hot. Contoh: `y = torch.tensor([0, 2, 1], dtype=torch.long)` untuk batch tiga sampel dengan label Cerah, Hujan, Mendung.",
    },
    footnote: "Intinya: multikelas pakai CrossEntropy. Output Linear(D, K) logit mentah, target integer 0..K-1, jangan tambah Softmax sebelum loss.",
  },

  // ── Slide 9: PyTorch Primer ──
  {
    layout: "code",
    title: "PyTorch: 3 Operasi yang Wajib Dikuasai",
    body: "Tiga operasi berikut muncul di setiap bab. Kalau kamu sudah paham, kamu bisa lanjut ke W1.",
    code: `import torch

# 1. Cek shape
x = torch.randn(4, 3, 32, 32, requires_grad=True)
print(x.shape)               # torch.Size([4, 3, 32, 32])

# 2. Pindah ke device
device = "cuda" if torch.cuda.is_available() else "cpu"
x = x.to(device)

# 3. Gradient otomatis
y = (x ** 2).mean()
y.backward()                 # x.grad berisi gradient`,
    lang: "python",
    footnote: "requires_grad=True wajib untuk tensor bukan parameter agar .backward() bisa dijalankan.",
  },

  // ── Slide 9b: Kuis 3 operasi ──
  {
    layout: "bullets",
    title: "Kuis: 3 Operasi Wajib",
    body: "Coba jawab tiga pertanyaan berikut untuk menguji pemahamanmu:",
    bullets: [
      "**Soal 1:** `torch.randn(4, 3, 32, 32).shape` menghasilkan apa?",
      "**Soal 2:** Kapan kita menulis `device = 'cuda'` vs `device = 'cpu'`?",
      "**Soal 3:** `loss.backward()` menghitung apa, dan di mana hasilnya disimpan?",
    ],
    footnote: "Tiga soal, 2 menit. Jawaban di slide berikutnya.",
  },

  // ── Slide 9c: Jawaban 3 operasi ──
  {
    layout: "bullets",
    title: "Jawaban: 3 Operasi Wajib",
    body: "Berikut adalah jawaban untuk tiga soal sebelumnya:",
    bullets: [
      "**Soal 1:** Hasilnya adalah `torch.Size([4, 3, 32, 32])`, yang berarti N=4, C=3, H=32, W=32.",
      "**Soal 2:** Kamu menulis `'cuda'` jika `torch.cuda.is_available()` mengembalikan True, dan `'cpu'` jika tidak. Selalu cek dulu, jangan asumsi GPU selalu tersedia.",
      "**Soal 3:** `loss.backward()` menghitung gradient mundur dari loss ke semua parameter, dan hasilnya disimpan di atribut `.grad` setiap parameter. Parameter belum berubah sampai kamu memanggil `optimizer.step()`.",
    ],
    footnote: "Jika ketiganya langsung benar: lanjut ke W1. Jika ragu: baca ulang bab 00a, cukup 10 menit.",
  },

  // ── Slide 10: Glosarium 19 istilah ──
  {
    layout: "grid",
    title: "19 Istilah yang Paling Sering Muncul",
    body: "Berikut adalah glosarium singkat untuk 19 istilah yang paling sering muncul:",
    gridItems: [
      {
        title: "Model & Arsitektur",
        body: "**loss** adalah ukuran kesalahan model. **gradient** adalah arah turunan loss. **optimizer** adalah algoritma update weight. **baseline** adalah model pembanding sederhana. **freeze** berarti parameter tidak diupdate. **fine-tune** berarti melanjutkan training dari pretrained.",
      },
      {
        title: "Proses Training",
        body: "**ablation** adalah uji dengan satu komponen dimatikan. **epoch** adalah satu putaran seluruh dataset. **batch** adalah subset data per update. **seed** adalah bilangan acak awal untuk reproduksibilitas. **checkpoint** adalah snapshot model yang tersimpan. **augmentation** adalah variasi data artifisial.",
      },
      {
        title: "Evaluasi & Validasi",
        body: "**leakage** adalah kebocoran info masa depan ke training. **pre-registration** adalah pencatatan rencana eksperimen sebelum training. **hyperparameter** adalah konfigurasi training, bukan parameter model. **overfitting** adalah kondisi performa train jauh lebih tinggi dari val. **dropout** adalah regularisasi dengan mematikan neuron acak. **regularization** adalah hukuman untuk kompleksitas.",
      },
    ],
    footnote: "Definisi lengkap + worked example ada di Lampiran A.11 dan A.12.",
  },

  // ── Slide 11: Checklist ──
  {
    layout: "bullets",
    title: "Checklist: Siap ke W1?",
    body: "Cek apakah kamu sudah siap memasuki W1 dengan daftar berikut:",
    bullets: [
      "Kamu bisa membaca shape `(B, C, H, W)` dan menjelaskan arti setiap huruf.",
      "Kamu paham bedanya forward pass (input → output) dan backward pass (gradient dihitung saat backward pass).",
      "Kamu bisa membuat tensor PyTorch, mencetak shape-nya, dan menjalankan `.backward()`.",
      "Kamu tahu apa itu loss, gradient, optimizer, dan epoch.",
      "Kamu sudah membaca minimal enam istilah: loss, gradient, optimizer, seed, checkpoint, leakage.",
    ],
    footnote: "Jika semua terjawab - langsung ke W1. Jika ada yang belum - baca bab 00a penuh, cukup 20 menit.",
  },

  // ── Slide 12: CTA ──
  {
    layout: "cta",
    title: "Bekal Sudah Cukup?",
    body: "Jika shape tensor dan autograd masih belum jelas, luangkan 20 menit membaca bab 00a penuh sebelum masuk W1.\n\nJika sudah paham, langsung ke W1.",
    ctaText: "Baca Modul 00a Penuh",
    ctaTarget: "00a",
  },
];

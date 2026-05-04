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
    body: "Bukan ujian masuk. Ini kosakata bersama yang dipakai di setiap bab - shape tensor, konvensi huruf, dan tiga operasi PyTorch. Tanpa kosakata ini, penjelasan di W1 akan membutuhkan banyak catatan kaki yang mengganggu alur bacaan.",
    footnote: "Jika sudah pernah memakai PyTorch dan paham shape (B, C, H, W), slide ini bisa di-skip.",
  },

  // ── Slide 3: Shape Tensor ──
  {
    layout: "bullets",
    title: "Shape Tensor: 4 Pola Paling Sering Muncul",
    bullets: [
      "**(D,)** - vektor satu dimensi: satu baris fitur, atau satu embedding",
      "**(B, D)** - batch data tabular: B sampel, D fitur per sampel",
      "**(B, C, H, W)** - batch citra: B gambar, C channel (RGB=3), H×W piksel",
      "**(B, T, D)** - batch sequence: B urutan, T timestep, D dimensi embedding",
    ],
    footnote: "Huruf kapital = dimensi variabel. Baca shape sebelum baca kode - itu kebiasaan yang akan terus dipakai.",
  },

  // ── Slide 3b: Quiz shape reading ──
  {
    layout: "bullets",
    title: "Kuis: Baca Shape Ini",
    bullets: [
      "`x = torch.randn(32, 3, 64, 64)` — apa arti setiap angka?",
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
      body: "B=32 (batch), C=3 (channel RGB), H=64, W=64.\n\nKonvensi PyTorch: NCHW. Dimensi selalu dari kiri ke kanan: batch, channel, tinggi, lebar.",
    },
    right: {
      title: "Kenapa Bukan yang Lain?",
      bullets: [
        "**A:** C=32 tidak mungkin - channel citra hanya 1 (grayscale) atau 3-4 (RGB/RGBA)",
        "**C:** H=3 tidak mungkin - itu ukuran piksel, bukan channel",
        "**D:** urutan NCHW adalah standar PyTorch, konsisten di semua fungsi dan dokumentasi",
      ],
    },
    footnote: "Shape adalah gerbang pertama debugging. Baca sebelum bertanya ke internet atau LLM.",
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
    gridItems: [
      {
        title: "B (Batch Size)",
        body: "Jumlah sampel dalam satu mini-batch. Biasanya 16-512 tergantung memori GPU.",
      },
      {
        title: "F atau D (Fitur / Dimensi)",
        body: "Jumlah fitur per sampel (tabular) atau ukuran embedding (NLP). F lebih umum di ML klasik, D di deep learning.",
      },
      {
        title: "C (Channel)",
        body: "Jumlah saluran citra (RGB=3, grayscale=1). Juga dipakai untuk jumlah filter di CNN.",
      },
      {
        title: "H, W (Height, Width)",
        body: "Dimensi spasial citra dalam piksel. CIFAR-10: H=W=32. ImageNet: H=W=224.",
      },
      {
        title: "T (Timestep)",
        body: "Panjang sequence input: jumlah kata dalam kalimat, jumlah langkah waktu sensor, dll.",
      },
      {
        title: "K atau N (Kelas)",
        body: "Jumlah kelas dalam klasifikasi. K dipakai di K-means, N atau num_classes di kode PyTorch.",
      },
    ],
    footnote: "Konvensi ini konsisten di semua bab. Jika ada notasi asing, cek Lampiran A.11.",
  },

  // ── Slide 7: Arti -> ──
  {
    layout: "bullets",
    title: "Arti `→` dalam Shape Map",
    bullets: [
      "`(B, F) → (B, H)` artinya: **tensor berubah bentuk** - bukan data yang berubah, tapi dimensinya",
      "Satu `→` biasanya satu operasi: satu Linear layer, satu Conv layer, atau satu pooling",
      "Shape Map W1: **(B, 10) → (B, 64) → (B, 32) → (B, 1)** untuk regresi dengan dua hidden layer",
      "Jika shape tidak cocok, PyTorch lempar `RuntimeError: mat1 and mat2 shapes cannot be multiplied`",
      "Baca error-nya dan telusuri shape - jangan langsung bertanya ke internet atau LLM",
    ],
    footnote: "Shape Map adalah ringkasan arsitektur yang lebih cepat dibaca daripada kode model lengkap.",
  },

  // ── Slide 8: Kalkulus mini ──
  {
    layout: "split",
    title: "Kalkulus Mini: Dua Konsep yang Cukup",
    left: {
      title: "Turunan (Gradient)",
      body: "f'(x) adalah laju perubahan f terhadap x. Dalam deep learning, kita cari: kalau weight naik sedikit, loss naik atau turun berapa?\n\nGradient menunjuk ke arah kenaikan tercepat. Kita melangkah ke arah berlawanan supaya loss turun.",
    },
    right: {
      title: "Chain Rule",
      body: "Jika z = f(g(x)), maka dz/dx = (dz/dg) × (dg/dx). Ini dasar backpropagation.\n\nGradient mengalir mundur dari loss ke layer pertama, dikalikan satu demi satu lewat aturan rantai. PyTorch mengurus semua ini lewat Autograd.",
    },
    footnote: "Tidak perlu hafal rumus. Cukup paham apa yang dihitung dan mengapa arahnya berlawanan.",
  },

  // ── Slide 8b: Quiz task→loss ──
  {
    layout: "bullets",
    title: "Kuis: Pasangkan Task dan Loss",
    bullets: [
      "**Task A:** Prediksi harga rumah (bilangan kontinu)",
      "**Task B:** Deteksi spam (ya/tidak)",
      "**Task C:** Klasifikasi 3 kategori cuaca: Cerah/Mendung/Hujan",
      "---",
      "1. CrossEntropyLoss &nbsp; 2. MSELoss &nbsp; 3. BCEWithLogitsLoss",
    ],
    footnote: "Satu pasangan untuk setiap task. Diskusi 2 menit.",
  },

  // ── Slide 8c: Jawaban task→loss ──
  {
    layout: "grid",
    title: "Jawaban: Task → Loss",
    gridItems: [
      {
        title: "Task A → MSELoss",
        body: "Regresi. Output head: Linear(D,1) tanpa aktivasi. Target: float.",
      },
      {
        title: "Task B → BCEWithLogitsLoss",
        body: "Biner. Output head: Linear(D,1) logit. Target: float 0/1. Alternatif: Linear(D,2)+CrossEntropyLoss.",
      },
      {
        title: "Task C → CrossEntropyLoss",
        body: "Multiclass. Output head: Linear(D,3) logit. Target: int 0/1/2. Bukan one-hot.",
      },
    ],
    footnote: "Pola ini sama persis dengan Tabel 5 Konfigurasi di W1 - berlaku di semua bab.",
  },

  // ── Slide 9: PyTorch Primer ──
  {
    layout: "code",
    title: "PyTorch: 3 Operasi yang Wajib Dikuasai",
    body: "Tiga ini muncul di setiap bab. Kalau sudah paham, lanjut ke W1.",
    code: `import torch

# 1. Cek shape
x = torch.randn(4, 3, 32, 32)
print(x.shape)               # torch.Size([4, 3, 32, 32])

# 2. Pindah ke device
device = "cuda" if torch.cuda.is_available() else "cpu"
x = x.to(device)

# 3. Gradient otomatis
y = (x ** 2).mean()
y.backward()                 # x.grad berisi gradient`,
    lang: "python",
    footnote: "x.requires_grad=True biasanya tidak perlu di-set manual - nn.Parameter sudah mengaktifkannya.",
  },

  // ── Slide 9b: Kuis 3 operasi ──
  {
    layout: "bullets",
    title: "Kuis: 3 Operasi Wajib",
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
    bullets: [
      "**Soal 1:** `torch.Size([4, 3, 32, 32])` — N=4, C=3, H=32, W=32",
      "**Soal 2:** `'cuda'` jika `torch.cuda.is_available()`, `'cpu'` jika tidak. Cek dulu, jangan asumsi GPU selalu tersedia.",
      "**Soal 3:** Gradient dihitung mundur dari loss ke semua parameter — disimpan di `.grad` setiap parameter. Parameter belum berubah sampai `optimizer.step()`.",
    ],
    footnote: "Jika ketiganya langsung benar: lanjut ke W1. Jika ragu: baca ulang bab 00a, cukup 10 menit.",
  },

  // ── Slide 10: Glosarium 19 istilah ──
  {
    layout: "grid",
    title: "19 Istilah yang Paling Sering Muncul",
    gridItems: [
      {
        title: "Model & Arsitektur",
        body: "**loss** - ukuran kesalahan model. **gradient** - arah turunan loss. **optimizer** - algoritma update weight. **baseline** - model pembanding sederhana. **freeze** - parameter tidak diupdate. **fine-tune** - lanjut training dari pretrained.",
      },
      {
        title: "Proses Training",
        body: "**ablation** - uji satu komponen dimatikan. **epoch** - satu putaran seluruh dataset. **batch** - subset data per update. **seed** - bilangan acak awal untuk reproduksibilitas. **checkpoint** - snapshot model tersimpan. **augmentation** - variasi data artifisial.",
      },
      {
        title: "Evaluasi & Validasi",
        body: "**leakage** - info masa depan bocor ke training. **pre-registration** - rencana eksperimen dicatat sebelum training. **hyperparameter** - konfigurasi training, bukan parameter model. **overfitting** - performa train >> val. **dropout** - regularisasi dengan mematikan neuron acak. **regularization** - hukuman untuk kompleksitas.",
      },
    ],
    footnote: "Definisi lengkap + worked example ada di Lampiran A.11 dan A.12.",
  },

  // ── Slide 11: Checklist ──
  {
    layout: "bullets",
    title: "Checklist: Siap ke W1?",
    bullets: [
      "Bisa membaca shape `(B, C, H, W)` dan jelaskan arti setiap huruf",
      "Paham bedanya forward pass (input → output) dan backward pass (gradient mengalir mundur)",
      "Bisa buat tensor PyTorch, cetak shape-nya, dan jalankan `.backward()`",
      "Tahu apa itu loss, gradient, optimizer, dan epoch",
      "Sudah baca minimal enam istilah: loss, gradient, optimizer, seed, checkpoint, leakage",
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

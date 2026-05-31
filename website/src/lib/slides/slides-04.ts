import type { SlideSection } from "./index";

export const slides04: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W4: Reproducibility & Matriks Eksperimen",
    subtitle: "Belajar merancang eksperimen sebelum menulis kode, mengontrol variabel, dan menyimpan jejak hasil agar bisa dicek ulang.",
    body: "Presentasi ini dirancang sebagai sumber mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 04 - Minggu 4",
  },

  // ── 2: Peta W4 ──
  {
    layout: "section",
    title: "Peta W4",
    body: "W4 adalah transisi dari \"bisa training\" menuju \"bisa riset\". Minggu ini membangun tiga lapis disiplin: merancang dulu lewat matriks eksperimen dan protokol, menjalankan dengan kontrol satu variabel per waktu, lalu mengikat hasil pada infrastruktur reproduksibilitas.",
    footnote: "Setelah W4, setiap eksperimen yang Anda laporkan punya jejak yang bisa ditunjukkan kepada siapapun.",
  },

  // ── 3: Dari W3 ke W4 ──
  {
    layout: "bullets",
    title: "Dari W3 ke W4: Geser Fokus ke Merancang",
    body: "W3 mengajarkan cara membaca apa yang model lakukan saat dilatih; W4 mengajarkan cara merancang eksperimen sebelum satu baris kode ditulis. Tiga hal menjadi fokus minggu ini:",
    bullets: [
      "**Kebiasaan riset** yang ditanamkan minggu ini adalah menyusun matriks eksperimen sebelum menulis kode, sehingga tidak ada run yang dijalankan tanpa rencana tertulis.",
      "**Dataset** yang dipakai adalah dataset baru, berbeda dari W2-W3, untuk menguji disiplin alur kerja di luar data yang sudah dikenal.",
      "**Reproduksibilitas** adalah syarat utama - hasil yang tidak bisa diulang oleh orang lain belum dianggap selesai.",
    ],
    footnote: "Lab utama minggu ini adalah Lab 3 (lab_w4_experiment_tracking.ipynb).",
  },

  // ── 4: Section Motivasi ──
  {
    layout: "section",
    title: "Motivasi: Dua Cara Menjawab Email",
    body: "Seorang PI mengirim satu instruksi singkat: \"Uji focal loss dan freeze blok awal pada backbone. Bandingkan dengan baseline yang setara, lalu kirim ringkasan hasil hari Kamis.\" Ada dua cara menanggapinya, dan keduanya menghasilkan angka.",
    footnote: "Hanya satu dari keduanya menghasilkan eksperimen yang bisa dicek ulang.",
  },

  // ── 5: Split Cara A vs Cara B ──
  {
    layout: "split",
    title: "Cara A vs Cara B: Langsung Kerja atau Merancang Dulu",
    body: "Perbedaan kedua cara bukan kecerdasan, melainkan kebiasaan merancang sebelum menjalankan. Bandingkan apa yang dihasilkan masing-masing:",
    left: {
      title: "Cara A - Langsung Kerja",
      body: "Anda mengganti loss, menambah baris freeze, menjalankan 20 epoch, lalu mengirim ke Slack: \"baseline 78.4%, mod 80.1%, naik 1.7%\".\n\nKetika PI bertanya \"kenapa kenaikan ini bisa dipercaya?\", Anda tidak punya jawaban.",
    },
    right: {
      title: "Cara B - Merancang Dulu",
      body: "Anda duduk 30 menit menulis satu halaman: apa itu baseline, gamma berapa, seed sama atau tidak, blok mana yang di-freeze, metrik mana yang menentukan.\n\nSetelah semua jelas, Anda kerja tiga hari dan melapor dengan tabel, plot, dan interpretasi.",
    },
    footnote: "Kedua cara menghasilkan angka, tetapi hanya Cara B menghasilkan eksperimen.",
  },

  // ── 6: Section Tiga Istilah ──
  {
    layout: "section",
    title: "Tiga Istilah yang Dipakai Berulang",
    body: "Sebelum masuk ke detail, tiga istilah ini muncul di sepanjang bab dan perlu definisi yang jelas. Ketiganya adalah fondasi cara berpikir eksperimen yang terkontrol.",
    footnote: "Pre-registration, seed variance, dan effect size menjadi kosakata inti minggu ini.",
  },

  // ── 7: Bullets tiga istilah ──
  {
    layout: "bullets",
    title: "Pre-registration, Seed Variance, Effect Size",
    body: "Ketiga istilah berikut menjelaskan apa yang ditulis sebelum eksperimen, seberapa besar noise yang wajar, dan seberapa besar selisih yang dianggap bermakna:",
    bullets: [
      "**Pre-registration** adalah dokumen yang berisi hipotesis, variabel, metrik, dan threshold sukses yang ditulis sebelum eksperimen dijalankan, sehingga timestamp-nya menjadi bukti rencana mendahului hasil.",
      "**Seed variance** adalah selisih hasil antar run yang konfigurasinya identik kecuali RNG seed, dan pada CIFAR-10 baseline biasanya berada di kisaran ±0.5-1.5% akurasi.",
      "**Effect size** adalah selisih metrik antara dua kondisi, dan threshold-nya ditetapkan di pre-reg untuk menjawab seberapa besar selisih yang dianggap bermakna sebelum angka terlihat.",
    ],
    footnote: "Klaim \"naik 1.7%\" dengan seed variance ±1.5% bisa sekadar noise, bukan sinyal sebenarnya.",
  },

  // ── 8: Section Matriks ──
  {
    layout: "section",
    title: "Matriks Eksperimen Sebelum Coding",
    body: "Sebelum menyentuh kode, tulis matriks eksperimen - tabel yang mendaftar semua run beserta konfigurasinya. Ini bukan formalitas, melainkan alat bantu berpikir yang dipakai sebelum baris kode pertama.",
    footnote: "Matriks ditulis di protocol.md, dan timestamp file menjadi bukti perencanaan.",
  },

  // ── 9: Bullets tiga masalah ──
  {
    layout: "bullets",
    title: "Tiga Masalah yang Dicegah Matriks Eksperimen",
    body: "Matriks eksperimen mencegah tiga masalah yang sering muncul saat run dijalankan tanpa rencana tertulis:",
    bullets: [
      "**Lupa satu kondisi penting** terjadi saat run direncanakan di kepala saja, dan matriks memaksa seluruh kondisi tertulis sebelum dijalankan.",
      "**Menyadari dua kondisi tidak sebanding di tengah jalan** bisa membuang berjam-jam training, dan matriks menampakkan ketidaksetaraan itu sejak awal.",
      "**Tidak bisa menjelaskan apa yang berubah antar run** adalah kegagalan atribusi, dan matriks mencatat persis satu variabel yang berbeda per baris.",
    ],
    footnote: "Setiap eksperimen yang dilaporkan setelah W4 harus punya matriks tertulis.",
  },

  // ── 10: Code matriks ──
  {
    layout: "code",
    title: "Bentuk Minimal Matriks Eksperimen",
    body: "Berikut format minimal yang disarankan, ditulis di protocol.md sebelum kode training pertama dibuat:",
    lang: "markdown",
    code: `| Run ID       | Variabel berubah | Nilai            | Seed | Status  |
| ------------ | ---------------- | ---------------- | ---- | ------- |
| baseline_s42 | - (kontrol)      | -                | 42   | planned |
| focal_s42    | loss             | FocalLoss(g=2.0) | 42   | planned |
| freeze_s42   | freeze_until     | block1           | 42   | planned |`,
    footnote: "Kolom Seed dan Status membuat replikasi dan kemajuan terlacak dalam satu pandangan.",
  },

  // ── 11: Section Lima Pertanyaan ──
  {
    layout: "section",
    title: "Lima Pertanyaan Sebelum Menyentuh Kode",
    body: "Sebelum membuka editor, jawab lima pertanyaan ini dan tulis jawabannya di protocol.md. Lima pertanyaan ini menutup ambiguitas yang biasanya baru muncul di tengah eksperimen.",
    footnote: "Jawaban yang ditulis di awal menjadi kontrak yang menahan godaan mengubah cerita di akhir.",
  },

  // ── 12: Pertanyaan 1-3 ──
  {
    layout: "bullets",
    title: "Pertanyaan 1 sampai 3: Variabel, Baseline, Hipotesis",
    body: "Tiga pertanyaan pertama mengunci apa yang berubah, apa pembandingnya, dan prediksi apa yang sedang diuji:",
    bullets: [
      "**Variabel apa yang berubah?** Jawabannya harus spesifik, bukan \"loss\" tetapi \"CrossEntropyLoss menjadi FocalLoss(gamma=2.0)\", dengan satu eksperimen per variabel agar atribusinya jelas.",
      "**Apa baseline yang setara?** Baseline harus identik pada semua variabel lain - arsitektur, data, augmentasi, optimizer, learning rate, seed, dan jumlah epoch.",
      "**Apa hipotesis yang dapat dipalsukan?** Hipotesis yang baik berbentuk pernyataan empiris yang bisa salah, misalnya \"F1 kelas minor naik minimal 3 poin tanpa menurunkan akurasi lebih dari 1 poin\".",
    ],
    footnote: "Hipotesis buruk berbunyi \"focal loss lebih baik\" - lebih baik pada metrik apa, seberapa besar, pada kondisi apa?",
  },

  // ── 13: Pertanyaan 4-5 ──
  {
    layout: "bullets",
    title: "Pertanyaan 4 dan 5: Metrik dan Bentuk Hasil",
    body: "Dua pertanyaan terakhir menentukan apa yang diukur dan apa yang Anda bayangkan akan terlihat sebelum run berjalan:",
    bullets: [
      "**Metrik sukses apa?** Tetapkan sebelum melihat hasil dan urutkan: metrik utama, metrik sekunder, lalu metrik pengaman yang tidak boleh memburuk seperti akurasi keseluruhan dan train/val gap.",
      "**Bentuk hasil apa yang diharapkan?** Bayangkan dua kemungkinan sebelum menjalankan - hipotesis benar atau salah - dan apa yang akan terlihat di log pada masing-masing.",
      "**Jika kedua kemungkinan tidak terbayang**, rancangan eksperimen belum cukup jelas dan perlu dipertajam sebelum kode ditulis.",
    ],
    footnote: "Metrik yang dipilih setelah melihat hasil adalah bentuk bias konfirmasi yang halus.",
  },

  // ── 14: Code protokol ──
  {
    layout: "code",
    title: "Protokol Eksperimen Satu Halaman",
    body: "Kelima jawaban itu menjadi satu protokol konkret yang bisa langsung ditiru dan dijalankan orang lain tanpa tebakan:",
    lang: "markdown",
    code: `# Protocol: Focal Loss + Freeze pada CIFAR-10

## Variabel
- A (baseline): CrossEntropyLoss, semua layer trainable.
- B: FocalLoss(gamma=2.0), block1 di-freeze.
- Lain identik: SimpleCNN, AdamW lr=3e-4, 20 epoch, seed {42,43,44}.

## Hipotesis
- H1: F1 kelas minor B naik >= 3 poin dibanding A.
- H2: Akurasi keseluruhan B turun <= 1 poin dari A.

## Metrik
- Utama: F1 kelas minor (rata-rata 3 seed).
- Pengaman: train/val gap, akurasi keseluruhan.`,
    footnote: "Satu halaman ini mengubah instruksi samar menjadi rancangan yang bisa dibaca, didiskusikan, dan dijalankan.",
  },

  // ── 15: Section Mengendalikan Variabel ──
  {
    layout: "section",
    title: "Mengendalikan Variabel: Ubah Satu Hal pada Satu Waktu",
    body: "Prinsip yang terdengar klise tetapi sering dilanggar adalah mengubah satu hal pada satu waktu. Jika Anda mengganti loss dan learning rate sekaligus, ketika akurasi naik Anda tidak tahu mana yang berjasa.",
    footnote: "Tabel konfigurasi adalah alat sederhana yang membuat variabel yang berubah terbaca sekilas.",
  },

  // ── 16: Image ablation design ──
  {
    layout: "image",
    title: "Desain Ablation: Satu Variabel Berubah per Kondisi",
    imageUrl: "/figures/fig02a_ablation_design.svg",
    caption: "Gambar ini menunjukkan desain ablation study dengan satu baseline dan tiga varian, di mana tiap varian hanya mengubah satu variabel dari baseline. Susunan seperti ini membuat setiap selisih performa bisa diatribusikan ke satu perubahan yang jelas, bukan ke campuran beberapa perubahan sekaligus.",
    footnote: "Seed divariasikan sebagai replikasi untuk mengukur noise, bukan sebagai variabel eksperimen.",
  },

  // ── 17: Bullets baca tabel ──
  {
    layout: "bullets",
    title: "Membaca Tabel Konfigurasi secara Vertikal",
    body: "Dari gambar tersebut, cara membaca tabel konfigurasi adalah menelusuri tiap kolom dari atas ke bawah untuk memisahkan variabel dari kontrol:",
    bullets: [
      "**Kolom yang seragam** seperti learning rate yang sama di semua run menandakan variabel itu sedang dikontrol, bukan diuji.",
      "**Kolom yang berubah** seperti loss dan freeze menandakan variabel yang sedang diuji - inilah yang menjadi fokus eksperimen.",
      "**Kolom seed** divariasikan sebagai replikasi sehingga tiga run dengan seed berbeda mengukur seberapa besar hasil bergeser tanpa perubahan apapun.",
    ],
    footnote: "Membaca vertikal mengubah tabel angka menjadi pernyataan tentang apa yang sedang dan tidak sedang diuji.",
  },

  // ── 18: Split batch-LR ──
  {
    layout: "split",
    title: "Variabel yang Saling Bergantung: Batch Size dan LR",
    body: "Sebagian variabel tidak aman dianggap konstan karena terikat satu sama lain. Batch size dan learning rate adalah pasangan yang paling sering luput diperhatikan:",
    left: {
      title: "Jebakan yang Sering Terjadi",
      body: "Anda menggandakan batch size tetapi mempertahankan learning rate yang sama.\n\nUkuran update relatif berkurang secara efektif, sehingga training konvergen lebih lambat atau performanya lebih rendah.",
    },
    right: {
      title: "Linear Scaling Rule",
      body: "Aturan praktis Goyal et al. 2017: jika batch size naik k kali, learning rate juga naik k kali.\n\nIni bukan hukum besi, tetapi artinya saat batch size berubah, LR bukan variabel yang aman dianggap konstan.",
    },
    footnote: "Mengubah batch size diam-diam mengubah dinamika training jika LR tidak ikut disesuaikan.",
  },

  // ── 19: Bullets tiga strategi baseline ──
  {
    layout: "bullets",
    title: "Tiga Strategi Menginisialisasi Baseline Hyperparameter",
    body: "Sebelum bisa mengontrol variabel, Anda perlu baseline yang konfigurasinya masuk akal. Tiga strategi berikut diurutkan dari paling mudah ke paling teliti:",
    bullets: [
      "**Salin konfigurasi dari paper** memberi titik mulai cepat jika config asli tersedia, dengan catatan paper sering melapor setting terbaik mereka, bukan setting yang wajar untuk dataset lebih kecil.",
      "**Grid search kecil pada subset** mengambil 10-20% data dan menjalankan LR dalam {1e-3, 3e-4, 1e-4} selama 3 epoch, cukup untuk menyingkirkan nilai LR yang jelas salah.",
      "**Learning rate range test** menaikkan LR secara eksponensial tiap batch lalu memplot loss vs LR, dan titik dengan penurunan paling curam menjadi kandidat LR yang baik (Smith, 2017).",
    ],
    footnote: "Ketiganya jauh lebih cepat daripada menebak LR lalu menjalankan training penuh berkali-kali.",
  },

  // ── 20: Section Noise ──
  {
    layout: "section",
    title: "Noise, Seed, dan Kapan Perbedaan Bermakna",
    body: "Model dengan inisialisasi berbeda sering menghasilkan akurasi yang berbeda beberapa poin persen, bahkan tanpa perubahan apapun. Tanpa replikasi, Anda tidak bisa membedakan sinyal dari variasi seed.",
    footnote: "Inilah alasan satu run tidak pernah cukup untuk menarik kesimpulan.",
  },

  // ── 21: Bullets replikasi ──
  {
    layout: "bullets",
    title: "Replikasi Seed: Minimal Tiga, Idealnya Lima",
    body: "Solusi terhadap seed variance adalah menjalankan tiap kondisi beberapa kali dengan seed berbeda lalu melaporkan ringkasannya:",
    bullets: [
      "**Replikasi minimal tiga seed** per kondisi sudah jauh lebih baik daripada satu, dan hasilnya dilaporkan sebagai rata-rata beserta standar deviasi.",
      "**Sumber noise di luar seed** mencakup urutan data, kernel CUDA non-deterministik, dan optimasi compiler yang perlu diperhatikan untuk reproduksibilitas ketat.",
      "**Jika waktu terbatas** dan Anda hanya sempat satu run, akui keterbatasan itu di laporan alih-alih memperlakukan satu run sebagai kebenaran.",
    ],
    footnote: "Reproduksibilitas ketat di GPU menambah torch.backends.cudnn.deterministic = True.",
  },

  // ── 22: Split 2sigma vs effect size ──
  {
    layout: "split",
    title: "Kapan Perbedaan Cukup Besar untuk Diklaim",
    body: "Mean dan std memberi gambaran variabilitas, tetapi tidak langsung menjawab apakah selisih adalah sinyal atau noise. Dua aturan praktis membantu memutuskan:",
    left: {
      title: "Aturan 2σ",
      body: "Jika selisih antar kondisi lebih besar dari 2 kali sigma gabungan keduanya, perbedaannya lebih mungkin bermakna daripada sekadar variasi seed.\n\nIni bukan uji statistik formal, tetapi cukup untuk laporan internal.",
    },
    right: {
      title: "Effect Size Threshold",
      body: "Anda menetapkan delta minimum di pre-registration sebelum eksperimen berjalan.\n\nJika kenaikan yang dianggap penting adalah 2 poin F1, kenaikan 0.3 poin tidak bermakna meski angkanya \"naik\".",
    },
    footnote: "Untuk laporan formal dengan >= 5 seed, pertimbangkan paired t-test atau Wilcoxon signed-rank test.",
  },

  // ── 23: Section Hipotesis vs Harapan ──
  {
    layout: "section",
    title: "Hipotesis yang Dapat Dipalsukan vs Harapan",
    body: "Ada perbedaan halus antara hipotesis dan harapan. Hipotesis berisi prediksi spesifik seperti \"F1 kelas minor naik minimal 3 poin\", sedangkan harapan berisi keinginan samar seperti \"focal loss akan membantu\".",
    footnote: "Hipotesis yang spesifik melindungi Anda dari dua bahaya yang sulit disadari sendiri.",
  },

  // ── 24: Bullets dua bahaya ──
  {
    layout: "bullets",
    title: "Dua Bahaya yang Dicegah Hipotesis Spesifik",
    body: "Hipotesis dengan target konkret menutup dua celah yang membuat hasil apapun terbaca sebagai keberhasilan:",
    bullets: [
      "**Bias konfirmasi** muncul saat tidak ada target, sehingga hasil yang sedikit lebih baik mudah dibaca sebagai bukti - dengan target 3 poin, kenaikan 0.5 poin adalah tidak terkonfirmasi, bukan sukses kecil.",
      "**Cerita setelah fakta** terbentuk tanpa prediksi tertulis, sehingga hasil aktual mudah dinarasikan sebagai \"yang kita harapkan sejak awal\" - protokol tertulis mencegah ini.",
      "**Hipotesis yang ternyata salah** sering lebih berguna daripada yang benar, karena hasil itu memaksa Anda mencari penjelasan dan mencatatnya sebagai data, bukan kegagalan.",
    ],
    footnote: "Laboratorium paling produktif memperlakukan hipotesis salah sebagai bahan analisis, bukan aib.",
  },

  // ── 25: Section Hipotesis tidak terkonfirmasi ──
  {
    layout: "section",
    title: "Ketika Hipotesis Tidak Terkonfirmasi",
    body: "Ini situasi yang hampir pasti Anda alami: eksperimen sudah berjalan dan hasilnya tidak sesuai pre-registration. Ada tiga skenario yang berbeda cara penanganannya.",
    footnote: "Cara menangani hasil yang tidak sesuai prediksi adalah pembeda asisten riset yang matang.",
  },

  // ── 26: Grid tiga skenario ──
  {
    layout: "grid",
    title: "Tiga Skenario Hasil di Luar Prediksi",
    body: "Setiap skenario menuntut langkah verifikasi yang berbeda sebelum kesimpulan ditulis:",
    gridItems: [
      {
        title: "Skenario A - Hampir Mencapai Threshold",
        body: "Hasil mendekati target tetapi tidak sampai, misalnya naik 1.8 poin dari target 3 poin. Verifikasi protokol cocok persis, tambahkan 2 seed lagi, dan jika tetap 1.8 poin catat sebagai temuan negatif.",
      },
      {
        title: "Skenario B - Berlawanan Arah",
        body: "Hasil bergerak ke arah sebaliknya, misalnya F1 justru turun. Audit implementasi apakah gamma=0 mereproduksi CE, periksa distribusi loss per kelas, dan investigasi apakah baseline benar-benar setara.",
      },
      {
        title: "Skenario C - Terlalu Bagus",
        body: "Hasil jauh di atas prediksi, misalnya naik 12 poin dari target 3 poin. Skenario ini paling membutuhkan skeptisisme: jalankan ulang baseline, periksa test set tidak bocor, dan verifikasi tidak ada yang berubah tak sengaja.",
      },
    ],
    footnote: "Hasil negatif yang terdokumentasi dengan baik mencegah orang lain membuang waktu di arah yang sama.",
  },

  // ── 27: Section Infrastruktur ──
  {
    layout: "section",
    title: "Infrastruktur Reproduksibilitas",
    body: "Setelah rancangan dan kontrol siap, hasil perlu diikat pada jejak yang bisa diaudit. Reproduksibilitas bertumpu pada empat pilar yang saling mengunci.",
    footnote: "Tanpa keempatnya, sebuah hasil hanya bisa dipercaya selama Anda mengingat cara membuatnya.",
  },

  // ── 28: Image empat pilar ──
  {
    layout: "image",
    title: "Empat Pilar Reproduksibilitas",
    imageUrl: "/figures/fig03a_reproducibility_sources.svg",
    caption: "Gambar ini menunjukkan empat pilar reproduksibilitas yang saling mengunci: config YAML yang menyimpan seluruh hyperparameter, penguncian seed di awal training, checkpoint yang menyertakan metadata lengkap, dan git hash yang mengikat tiap run ke commit penghasilnya. Keempatnya bersama-sama membuat satu hasil bisa ditelusuri balik ke kondisi persis yang menghasilkannya.",
    footnote: "Implementasi keempat pilar tersedia di template/src/utils.py dan dibangun bertahap di Lab 3.",
  },

  // ── 29: Grid empat pilar ──
  {
    layout: "grid",
    title: "Apa yang Dilakukan Tiap Pilar",
    body: "Dari gambar tersebut, keempat pilar membagi tugas menjaga hasil tetap bisa diulang:",
    gridItems: [
      {
        title: "Config YAML",
        body: "Pilar ini menyimpan seluruh hyperparameter dalam file deklaratif, bukan angka hardcoded yang berserakan di kode. Config disimpan bersama checkpoint sehingga setiap hasil bisa ditelusuri ke konfigurasi persisnya.",
      },
      {
        title: "Penguncian Seed",
        body: "Pilar ini memanggil set_seed(cfg['seed']) sebelum operasi apapun, dengan satu seed per run. Variasi seed dipakai antar replikasi sebagai pengukur noise, bukan sebagai variabel eksperimen.",
      },
      {
        title: "Checkpoint Metadata",
        body: "Pilar ini menyimpan lebih dari model.state_dict() - di dalamnya ada config, git_hash, epoch, metrics, dan timestamp. Checkpoint tanpa config hanyalah setengah bukti.",
      },
      {
        title: "Git Hash",
        body: "Pilar ini mengikat tiap run ke commit penghasilnya lewat get_git_hash(). Flag \"dirty\" memperingatkan ketika ada perubahan yang belum di-commit saat run dijalankan.",
      },
    ],
    footnote: "Keempat pilar mengubah \"saya ingat menjalankan ini\" menjadi \"ini commit, config, dan seed yang menghasilkannya\".",
  },

  // ── 30: Code YAML ──
  {
    layout: "code",
    title: "Seperti Apa Bentuk YAML Config",
    body: "Berikut potongan configs/baseline.yaml dari template repo, tempat setiap hyperparameter dideklarasikan, bukan tersebar di kode Python:",
    lang: "yaml",
    code: `experiment_name: baseline
seed: 42                    # dikunci satu seed per run

model:
  name: simple_cnn
  freeze_until: null        # tidak ada yang di-freeze

loss:
  name: cross_entropy

optim:
  name: sgd
  lr: 0.05
  weight_decay: 5.0e-4`,
    footnote: "Untuk ablation, Anda membuat YAML baru yang hanya mengubah bagian relevan; arsitektur dan data tetap identik.",
  },

  // ── 31: Section Platform ──
  {
    layout: "section",
    title: "Platform: Kapan Pindah ke RunPod",
    body: "Tetap di laptop atau Colab selama training selesai di bawah 30 menit. Pindah ke cloud GPU ketika satu run melewati ambang itu dan Anda perlu menjalankan enam run atau lebih untuk replikasi.",
    footnote: "Pemicu lain adalah dataset yang tidak muat di RAM atau kebutuhan VRAM lebih dari 8 GB.",
  },

  // ── 32: Image cloud workflow ──
  {
    layout: "image",
    title: "Alur Kerja Cloud GPU: Pod Lifecycle",
    imageUrl: "/figures/fig08a_cloud_workflow.svg",
    caption: "Gambar ini menunjukkan alur kerja dasar RunPod dari awal sampai akhir: launch pod, SSH masuk, menjalankan training, menarik checkpoint, lalu mematikan pod. Tunnel SSH menghubungkan laptop Anda ke GPU di cloud, dan checkpoint dipindahkan kembali lewat rsync atau rclone sebelum pod dimatikan.",
    footnote: "Konfigurasi minimal dan cara push/pull checkpoint tersedia di Lampiran D.1.",
  },

  // ── 33: Bullets matikan pod ──
  {
    layout: "bullets",
    title: "Disiplin Cloud GPU: Matikan Pod Setelah Selesai",
    body: "Dari gambar tersebut, langkah terakhir adalah yang paling sering dilupakan dan paling mahal jika diabaikan:",
    bullets: [
      "**Tagihan GPU berjalan selama pod hidup**, termasuk saat Anda lupa mematikannya setelah berhasil menarik checkpoint.",
      "**Mematikan pod setelah training** adalah kebiasaan paling penting di W4, dan layak dipasang sebagai pengingat di kalender.",
      "**Biasakan menutup pod sebelum menutup terminal**, sehingga tidak ada GPU yang menyala tanpa pekerjaan yang berjalan.",
    ],
    footnote: "Satu pod yang terlupa semalaman bisa menghabiskan anggaran beberapa hari eksperimen.",
  },

  // ── 34: Section Worked Example ──
  {
    layout: "section",
    title: "Worked Example: Menerjemahkan Instruksi PI",
    body: "Mari kerjakan email PI langkah demi langkah, dari instruksi yang ambigu sampai laporan yang bisa dipakai untuk keputusan berikutnya. Tahap pertama adalah membaca instruksi dengan cermat.",
    footnote: "Instruksi \"uji focal loss dan freeze blok awal\" menyembunyikan empat ambiguitas yang harus dibereskan.",
  },

  // ── 35: Bullets membaca instruksi ──
  {
    layout: "bullets",
    title: "Empat Ambiguitas yang Harus Dikonfirmasi",
    body: "Sebelum menulis kode, ajukan klarifikasi atas empat hal yang belum jelas dalam instruksi PI:",
    bullets: [
      "**\"Focal loss\"** belum jelas versinya - apakah Lin et al. 2017 dengan gamma dan alpha, gamma berapa, dan apakah alpha dipakai.",
      "**\"Blok awal\"** perlu dipetakan ke kode - pada ResNet-18 bisa berarti conv1 atau layer1, sedangkan pada SimpleCNN istilah yang cocok adalah block1.",
      "**\"Bandingkan\" dan \"baseline\"** butuh kejelasan operasional - berapa seed, berapa epoch, metrik mana yang menentukan, dan konfigurasi baseline yang persis mana.",
    ],
    footnote: "Jika PI menjawab singkat \"pakai default\", tulis asumsi Anda di protokol dan kirim satu kalimat konfirmasi.",
  },

  // ── 36: Code FocalLoss ──
  {
    layout: "code",
    title: "Menulis Kode dengan Uji Minimal Bawaan",
    body: "Implementasi FocalLoss perlu menjelaskan alasan tiap bagian kode, bukan hanya menulis apa yang dilakukan. Dengan begitu, kasus gamma=0 bisa menjadi uji cepat bahwa tidak ada bug:",
    lang: "python",
    code: `class FocalLoss(nn.Module):
    """gamma=0 -> ekuivalen cross-entropy.
    gamma>0 -> menurunkan bobot sampel mudah,
               menaikkan pengaruh sampel sulit."""
    def __init__(self, gamma: float = 2.0):
        super().__init__()
        self.gamma = gamma

    def forward(self, logits, targets):
        ce = F.cross_entropy(logits, targets, reduction='none')
        pt = torch.exp(-ce)          # prob kelas benar
        return ((1 - pt) ** self.gamma * ce).mean()`,
    footnote: "Saat gamma=0, hasil harus sama persis dengan baseline - uji termurah untuk memastikan implementasi benar.",
  },

  // ── 37: Split hasil agregat ──
  {
    layout: "split",
    title: "Menjalankan dan Melaporkan: Angka plus Interpretasi",
    body: "Enam run menghasilkan tabel agregat, tetapi tabel saja tidak cukup. Tulis interpretasi sebelum PI bertanya, bukan setelah diminta:",
    left: {
      title: "Tabel Agregat (mean ± std)",
      body: "Baseline (CE): F1 minor 0.612 ± 0.018, akurasi 0.781.\n\nFocal+Freeze: F1 minor 0.672 ± 0.014, akurasi 0.774.\n\nKetiga seed konsisten dengan std yang kecil.",
    },
    right: {
      title: "Interpretasi yang Menyertai",
      body: "H1 terkonfirmasi: F1 minor naik 6 poin, melampaui ambang 3 poin.\n\nH2 terkonfirmasi: akurasi turun 0.7 poin, masih di bawah ambang 1 poin.\n\nCatatan pengaman: train/val gap naik tipis 0.09 ke 0.11, perlu dipantau.",
    },
    footnote: "Bandingkan dengan laporan Cara A: \"baseline 78.4%, mod 80.1%, naik 1.7%\" tanpa konteks apapun.",
  },

  // ── 38: Bullets komunikasi PI ──
  {
    layout: "bullets",
    title: "Tiga Alat Komunikasi dengan Dosen Pembimbing",
    body: "Riset berlangsung berminggu-minggu, bukan satu email. Tiga alat berikut membentuk kebiasaan komunikasi seorang asisten riset:",
    bullets: [
      "**Update mingguan** berisi empat bagian - progress, kendala, rencana, satu pertanyaan - dan dikirim sebelum diminta, karena konsistensi membangun kepercayaan lebih cepat daripada hasil spektakuler yang mendadak.",
      "**Kerangka SQRC** (Situation, Question, Resolution attempt, Call) memandu Anda menulis pertanyaan teknis yang menunjukkan Anda sudah berusaha sebelum meminta bantuan.",
      "**Ekspresi ketidakpastian yang baik** berarti menyebut keterbatasan dan menyertai \"saya tidak tahu\" dengan langkah konkret berikutnya.",
    ],
    footnote: "Template dan contoh lengkap tersedia di Lampiran C.11 dan D.8.",
  },

  // ── 39: Section Pitfalls ──
  {
    layout: "section",
    title: "Pitfalls & Miskonsepsi",
    body: "Enam jebakan berikut sama-sama berakar pada satu hal: menyimpulkan terlalu cepat dari perbandingan yang tidak setara. Mengenalinya lebih awal menghemat banyak waktu.",
    footnote: "Setiap pitfall punya penangkal yang sudah dibahas di bagian sebelumnya.",
  },

  // ── 40: Bullets pitfall 1-3 ──
  {
    layout: "bullets",
    title: "Tiga Jebakan Pertama saat Menarik Kesimpulan",
    body: "Tiga jebakan pertama muncul saat satu titik data atau pembanding yang berubah dianggap cukup untuk menyimpulkan:",
    bullets: [
      "**Menjalankan satu seed lalu menyimpulkan** memperlakukan satu titik data sebagai kebenaran, padahal kesimpulan valid butuh minimal tiga seed.",
      "**Mengubah baseline di tengah jalan** merusak perbandingan - jika baseline perlu diubah, ubah dulu, lalu jalankan modifikasi terhadap baseline baru itu.",
      "**Memilih metrik setelah melihat hasil** adalah bias konfirmasi, karena metrik utama harus ditetapkan di protokol sebelum run dijalankan.",
    ],
    footnote: "Metrik baru boleh ditambahkan sebagai pengamatan, tetapi metrik utama tetap yang ditulis lebih dulu.",
  },

  // ── 41: Bullets pitfall 4-6 ──
  {
    layout: "bullets",
    title: "Tiga Jebakan Berikutnya saat Membandingkan Run",
    body: "Tiga jebakan berikutnya muncul saat dua run tidak benar-benar sebanding atau saat hasil disaring sebelum dilaporkan:",
    bullets: [
      "**Membandingkan run dengan jumlah epoch berbeda** mencampur dua variabel - jika baseline 20 epoch dan modifikasi 25 epoch, yang dibandingkan adalah arsitektur sekaligus durasi training.",
      "**Tidak menulis hipotesis sama sekali** membuat setiap hasil tampak menarik, sedangkan hipotesis tertulis membagi hasil menjadi konfirmasi, sanggahan, atau kebetulan.",
      "**Menyembunyikan ablation yang gagal** menyesatkan PI dan diri sendiri, karena sembilan eksperimen gagal sering lebih berguna daripada satu yang berhasil.",
    ],
    footnote: "Laporkan semua yang Anda jalankan - ablation yang gagal adalah data, bukan aib.",
  },

  // ── 42: Image folder eksperimen ──
  {
    layout: "image",
    title: "Struktur Folder Eksperimen yang Terlacak",
    imageUrl: "/figures/fig03b_experiment_folder.svg",
    caption: "Gambar ini menunjukkan isi satu folder eksperimen yang reproduksibel: config.yaml yang menyimpan konfigurasi, train.log untuk jejak training, checkpoint dengan metadata, summary.json untuk hasil ringkas, dan folder TensorBoard untuk kurva. Struktur seragam ini membuat setiap run punya bentuk yang sama dan mudah dibandingkan.",
    footnote: "Lab W4 membangun struktur folder ini langkah demi langkah.",
  },

  // ── 43: Bullets Lab W4 ──
  {
    layout: "bullets",
    title: "Lab W4: Config, Logging, dan Reproducibility",
    body: "Dari gambar tersebut, Lab 3 membangun infrastruktur reproduksibilitas di atas struktur folder itu lewat enam langkah:",
    bullets: [
      "**Refaktor konfigurasi** dari nilai hardcoded menjadi YAML, lalu tambahkan set_seed() dan get_git_hash() ke training loop.",
      "**Logging dan checkpoint** mencatat loss, accuracy, dan LR per epoch ke TensorBoard, dengan checkpoint bermetadata lengkap yang bisa di-resume.",
      "**Tiga seed per kondisi** dijalankan dan hasilnya dirangkum sebagai rata-rata ± std di results.csv.",
    ],
    footnote: "Checklist utama: protocol.md ditulis sebelum run, dan git hash tercatat di setiap checkpoint.",
  },

  // ── 44: Bullets Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum lanjut ke W5, renungkan tiga pertanyaan yang menghubungkan disiplin minggu ini dengan riset Anda nanti:",
    bullets: [
      "Saat baseline repo memakai lr=1e-3 tetapi pengalaman Anda bilang 3e-4 lebih stabil, dua rencana eksperimen alternatif apa yang akan Anda pakai, dan kapan masing-masing lebih tepat?",
      "Saat hipotesis gagal dan akurasi justru turun, tiga pertanyaan berikutnya apa yang akan Anda kejar, diurutkan dari yang tidak perlu training baru sampai yang perlu inspeksi panjang?",
      "Saat PI meminta \"cari teknik mitigasi imbalance yang paling ampuh\", lima pertanyaan klarifikasi apa yang paling penting Anda ajukan sebelum memilih teknik apapun?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - ketiganya kembali relevan saat capstone.",
  },

  // ── 45: Bullets Lanjut W5 ──
  {
    layout: "bullets",
    title: "Lanjut ke W5: dari Alur Kerja ke Sequence",
    body: "Dengan W4 selesai, alur kerja reproduksibel kini terbangun dan setiap eksperimen punya jejak yang bisa diaudit. W5 memperluas Big Map ke domain baru:",
    bullets: [
      "**Tensor sequence** berbentuk (T, F) masuk sebagai input, berbeda dari tensor citra (C, H, W) yang dipakai sampai W4.",
      "**Arsitektur recurrent** seperti RNN dan LSTM muncul karena urutan data kini menjadi informasi yang penting.",
      "**Diagnosis gradient flow** menjadi kebiasaan baru, melanjutkan disiplin eksperimen terkontrol yang dibangun minggu ini.",
    ],
    footnote: "Disiplin matriks eksperimen dan replikasi seed dari W4 tetap berlaku di semua minggu berikutnya.",
  },

  // ── 46: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W4",
    body: "Semua konsep di presentasi ini ada dalam lab notebook lengkap: refaktor config ke YAML, penguncian seed, checkpoint bermetadata, dan multi-seed dengan tabel agregat.\n\nEstimasi waktu: 4-6 jam termasuk menulis protokol, menjalankan run, dan menyusun laporan.",
    ctaText: "Buka Lab W4 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w4_experiment_tracking.ipynb",
  },
];

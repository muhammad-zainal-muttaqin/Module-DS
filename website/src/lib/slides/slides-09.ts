import type { SlideSection } from "./index";

export const slides09: SlideSection[] = [
  // -- 1: Title --
  {
    layout: "title",
    title: "W9: Multimodal Reasoning",
    subtitle: "Menggabungkan beberapa modalitas jadi satu prediksi, lalu memakai ablation untuk memastikan model memakai semuanya.",
    footnote: "Bab 09 - Minggu 9",
  },

  // -- 2: Agenda --
  {
    layout: "grid",
    title: "Kali ini kita akan membahas",
    body: "Enam materi minggu ini mengikuti alur dari menggabungkan modalitas sampai membuktikan tiap modalitas berkontribusi:",
    gridItems: [
      {
        title: "1. Strategi Fusion",
        body: "Kita membandingkan late, early, dan cross-attention fusion serta kapan masing-masing dipakai.",
      },
      {
        title: "2. Modalitas Terabaikan",
        body: "Kita mendeteksi failure mode saat model diam-diam memakai satu modalitas saja, lalu memperbaikinya.",
      },
      {
        title: "3. Modalitas Hilang",
        body: "Kita menangani input tidak lengkap dengan modality dropout, null token, atau fallback single-modal.",
      },
      {
        title: "4. Temporal Alignment",
        body: "Kita menyinkronkan aliran data yang sampling rate dan clock-nya berbeda.",
      },
      {
        title: "5. Protokol Ablation",
        body: "Kita menyusun matriks kondisi yang membuktikan tiap modalitas berkontribusi.",
      },
      {
        title: "6. Repo Adoption Multimodal",
        body: "Kita membaca codebase dengan banyak encoder dan satu modul fusion.",
      },
    ],
  },

  // -- 3: Recap W8 --
  {
    layout: "bullets",
    title: "Di pertemuan sebelumnya (W8)",
    body: "W8 melatih memilih dan mengadaptasi satu foundation model per modalitas. Outputnya menjadi bahan W9:",
    bullets: [
      "Kita mengambil encoder pretrained per modalitas dengan keputusan frozen, LoRA, atau fine-tuning.",
      "Minggu ini beberapa encoder itu digabung menjadi satu prediksi multimodal.",
      "Cross-attention dari W7 dipakai lagi, tetapi sumber Query, Key, dan Value sekarang lintas modalitas.",
    ],
    footnote: "Disiplin ablation satu variabel dari W4 dipakai sepanjang minggu ini.",
  },

  // -- 4: Motivasi (artefak: angka ablation) --
  {
    layout: "bullets",
    title: "Apakah Model Memakai Kedua Modalitas?",
    body: "Sebuah model memprediksi skala nyeri dari ekspresi wajah dan sensor accelerometer. Angka ablation berikut menunjukkan masalahnya:",
    bullets: [
      "Validation F1 mencapai 0.79 dengan kedua modalitas.",
      "Setelah seluruh input sensor dihapus, F1 hanya turun ke 0.78, selisih 0.01.",
      "Artinya model hampir tidak memakai data sensor: hasil fusion setara satu modalitas saja.",
    ],
    footnote: "Sebelum melaporkan hasil multimodal, jalankan dulu ablation per modalitas.",
  },

  // -- 5: Materi 1 --
  {
    layout: "section",
    title: "1. Strategi Fusion",
    body: "Strategi fusion menentukan di titik mana embedding dari beberapa modalitas digabungkan, dan titik itu menentukan seberapa dalam interaksi antar modalitas bisa dipelajari.",
    footnote: "Ada tiga strategi: late, early, dan cross-attention.",
  },

  // -- 6: Fusion image (sebelum teks) --
  {
    layout: "image",
    title: "Late, Early, dan Cross-Attention Fusion",
    imageUrl: "/figures/fig08a_fusion_strategies.svg",
    caption: "Gambar ini membandingkan tiga strategi fusion dari titik penggabungan paling akhir ke paling awal: late fusion menggabungkan output encoder di ujung, early fusion menggabungkan input di awal sebelum model bersama, dan cross-attention membuat satu modalitas memperhatikan modalitas lain lewat attention.",
    footnote: "Cross-attention dipakai model vision-language modern seperti BLIP-2 dan Flamingo.",
  },

  // -- 7: Membandingkan tiga strategi --
  {
    layout: "grid",
    title: "Membandingkan Tiga Strategi Fusion",
    body: "Dari gambar tersebut, ketiga strategi menempati titik berbeda pada trade-off antara kemudahan dan kedalaman interaksi:",
    gridItems: [
      {
        title: "Late Fusion",
        body: "Tiap modalitas diproses encoder sendiri lalu output digabungkan di ujung. Mudah diimplementasikan dan tahan modalitas hilang, tetapi tidak ada interaksi antar modalitas sebelum penggabungan.",
      },
      {
        title: "Early Fusion",
        body: "Input berbagai modalitas digabungkan di level representasi awal sebelum model bersama. Interaksi bisa dipelajari sejak awal, tetapi butuh projection cermat dan sulit menangani modalitas hilang.",
      },
      {
        title: "Cross-Attention Fusion",
        body: "Satu modalitas menjadi Query dan modalitas lain menjadi Key serta Value. Model belajar bagian mana dari satu modalitas relevan untuk tiap elemen modalitas lain, dengan biaya komputasi lebih tinggi.",
      },
    ],
    footnote: "Late fusion paling sering menghasilkan modalitas terabaikan saat satu aliran data lebih mudah dioptimasi.",
  },

  // -- 8: Cross-attention code --
  {
    layout: "code",
    title: "Cross-Attention: Teks Bertanya pada Gambar",
    body: "Cross-attention memakai Query dari satu modalitas dan Key serta Value dari modalitas lain, sehingga token teks bisa memperhatikan region gambar yang relevan:",
    lang: "python",
    code: `Q = W_q @ text_embedding     # (B, T_text, d)
K = W_k @ image_features     # (B, T_image, d)
V = W_v @ image_features     # (B, T_image, d)

w = softmax(Q @ K.transpose(-2,-1) / sqrt(d), dim=-1)
out = w @ V                  # (B, T_text, d)`,
    footnote: "Rumus Q, K, V sudah dibahas di W7; di sini Query dan Key/Value berasal dari modalitas berbeda.",
  },

  // -- 9: Materi 2 --
  {
    layout: "section",
    title: "2. Modalitas Terabaikan",
    body: "Saat training multimodal, optimizer mengikuti jalur yang paling mudah. Jika satu modalitas lebih bersih atau lebih mudah dioptimasi, model bisa mengabaikan modalitas lain sambil loss tetap turun.",
    footnote: "Performa tampak bagus, padahal model hanya memakai satu modalitas.",
  },

  // -- 10: Tiga cara mendeteksi --
  {
    layout: "bullets",
    title: "Tiga Cara Mendeteksi Modalitas Terabaikan",
    body: "Failure mode ini tidak terlihat dari loss curve atau F1, jadi tiga uji berikut yang memunculkannya:",
    bullets: [
      "**Ablation per modalitas** menghapus satu modalitas. Jika F1 tidak turun signifikan, modalitas itu diabaikan.",
      "**Modalitas acak** mengganti satu modalitas dengan noise. Jika performa tidak memburuk, modalitas itu memang tidak dipakai.",
      "**Gradient magnitude check** menghitung gradient norm tiap encoder. Encoder yang norm-nya konsisten kecil tidak berkontribusi.",
    ],
    footnote: "Selisih nol berarti modalitas diabaikan; kenaikan tipis belum cukup tanpa uji modalitas acak.",
  },

  // -- 11: Tiga solusi --
  {
    layout: "bullets",
    title: "Tiga Solusi terhadap Modalitas Terabaikan",
    body: "Saat ablation memang menemukan modalitas yang diabaikan, tiga teknik memaksa model belajar dari setiap modalitas:",
    bullets: [
      "**Modality dropout** mematikan tiap modalitas secara acak saat training, sehingga model dipaksa belajar dari masing-masing secara mandiri.",
      "**Separate loss terms** menambahkan auxiliary loss per modalitas agar tiap encoder mendapat gradient yang jelas.",
      "**Gradient balancing** menyesuaikan learning rate tiap modalitas berdasarkan gradient magnitude masing-masing.",
    ],
    footnote: "Modalitas terabaikan adalah temuan yang dilaporkan ke dosen.",
  },

  // -- 12: Materi 3 --
  {
    layout: "section",
    title: "3. Modalitas Hilang",
    body: "Di produksi, satu modalitas sering tidak tersedia: sensor rusak, gambar terlalu kabur, atau teks tidak terisi. Sistem multimodal yang baik tetap memberi prediksi yang masuk akal saat itu terjadi, bukan crash atau menebak asal.",
    footnote: "Zero padding memberi sinyal ambigu, sehingga tiga strategi berikut lebih tepat.",
  },

  // -- 13: Tiga strategi modalitas hilang --
  {
    layout: "grid",
    title: "Tiga Strategi Menangani Modalitas Hilang",
    body: "Ketiga strategi berbeda pada cara mengisi tempat modalitas yang absen:",
    gridItems: [
      {
        title: "Modality Dropout",
        body: "Saat training, satu modalitas dikosongkan secara acak, sehingga model terbiasa memprediksi walau satu modalitas hilang saat inference.",
      },
      {
        title: "Learnable Null Token",
        body: "Modalitas yang hilang diganti embedding khusus yang dipelajari untuk menandai ketiadaannya, lebih informatif daripada zero padding yang ambigu.",
      },
      {
        title: "Fallback Single-Modal",
        body: "Model didesain sebagai ensemble: pakai semua modalitas saat tersedia, lalu jatuh ke model unimodal saat satu modalitas hilang. Sederhana dan andal untuk produksi.",
      },
    ],
    footnote: "Probabilitas dropout 0.10-0.25 lazim; naikkan ke 0.30-0.40 untuk modalitas yang terlalu dominan.",
  },

  // -- 14: Materi 4 --
  {
    layout: "section",
    title: "4. Temporal Alignment",
    body: "Banyak dataset multimodal nyata punya aliran data dengan sampling rate atau clock berbeda: video 25 fps versus audio 44 kHz, atau sensor IMU 100 Hz versus kamera 30 fps.",
    footnote: "Tanpa sinkronisasi, model mengasosiasikan event dari waktu yang salah dan cross-attention belajar korelasi semu.",
  },

  // -- 15: Drift image (sebelum teks) --
  {
    layout: "image",
    title: "Dua Stream dengan Clock Drift Berbeda",
    imageUrl: "/figures/fig08c_temporal_alignment.png",
    caption: "Gambar ini menunjukkan dua stream sensor yang awalnya sejajar lalu bergeser karena clock drift yang menumpuk. Drift kecil yang menumpuk membuat frame di satu stream tidak lagi sejajar dengan sample di stream lain.",
    footnote: "Model yang dilatih pada drift konsisten akan gagal pada sensor baru dengan drift berbeda.",
  },

  // -- 16: Tiga pendekatan alignment --
  {
    layout: "bullets",
    title: "Tiga Pendekatan Menyelaraskan Aliran Data",
    body: "Dari gambar tersebut, alignment yang benar bisa dicapai lewat tiga pendekatan dengan trade-off berbeda:",
    bullets: [
      "**Resampling atau interpolasi** menurunkan semua stream ke resolusi temporal terendah, mudah tetapi kehilangan detail.",
      "**Event-to-window mapping** memetakan tiap event ke window dari stream kontinu terdekat, cocok untuk data berbasis event.",
      "**Temporal position encoding** menyuntikkan waktu absolut sebagai feature eksplisit dan membiarkan model belajar alignment sendiri.",
    ],
    footnote: "Jika drift sudah terlanjur, sertakan koreksinya di preprocessing yang terdokumentasi.",
  },

  // -- 17: Contoh drift 250 ms --
  {
    layout: "bullets",
    title: "Contoh: Clock Drift 250 ms antar Sensor",
    body: "Pada robot dengan IMU 100 Hz dan kamera 30 fps yang memakai clock berbeda, drift kecil menumpuk menjadi masalah besar:",
    bullets: [
      "Setelah satu jam, clock IMU drift 250 ms dari kamera, sehingga frame kamera berkorespondensi dengan data IMU sekitar 25 sample kemudian.",
      "Tanpa koreksi, model mencocokkan visual hampir tabrakan dengan data IMU saat robot masih bergerak normal.",
      "Drift dideteksi dengan cross-correlation, dan puncak korelasi pada lag bukan nol menandakan drift yang perlu dikoreksi.",
    ],
    footnote: "Catat timestamp dari sumber waktu yang sama, idealnya tersinkronisasi lewat NTP.",
  },

  // -- 18: Materi 5 --
  {
    layout: "section",
    title: "5. Protokol Ablation Per Modalitas",
    body: "Protokol ablation per modalitas adalah matriks kondisi yang menyalakan subset modalitas berbeda untuk mengukur kontribusi tiap modalitas secara terisolasi. Setiap laporan multimodal menjalankannya sebelum klaim apa pun.",
    footnote: "Protokol penuh memakai tujuh kondisi, termasuk random image untuk mengecek modalitas terabaikan.",
  },

  // -- 19: Ablation image (sebelum teks) --
  {
    layout: "image",
    title: "Tujuh Kondisi Ablation Per Modalitas",
    imageUrl: "/figures/fig08b_multimodal_ablation.svg",
    caption: "Gambar ini memetakan modalitas yang aktif di tiap kondisi: dari full model dengan semua modalitas, lalu tiap modalitas tunggal, tiap pasangan modalitas, sampai random image sebagai pengecekan modalitas terabaikan. Tiap kondisi menyalakan subset berbeda untuk mengukur kontribusi secara terisolasi.",
    footnote: "Tiap kondisi mematikan atau mengacak tepat satu modalitas, mengikuti disiplin satu variabel dari W4.",
  },

  // -- 20: Tabel protokol --
  {
    layout: "table",
    title: "Protokol Ablation yang Bisa Disalin",
    body: "Dari gambar tersebut, tujuh kondisi disusun menjadi protokol berikut:",
    tableHead: ["Eksperimen", "Input", "Temuan yang diharapkan"],
    tableRows: [
      ["Full model", "image + text + sensor", "Performa baseline"],
      ["Image only", "image saja", "Batas single-modal"],
      ["Image + Sensor", "image + sensor", "Apakah text berkontribusi?"],
      ["Random image", "noise acak", "Pengecekan modalitas terabaikan"],
    ],
    footnote: "Untuk capstone, lima kondisi minimum cukup asalkan random image tetap disertakan. Template lengkap ada di Lampiran C.14.",
  },

  // -- 21: Worked example pain estimation --
  {
    layout: "code",
    title: "Worked Example: Late Fusion Pain Estimation",
    body: "Tugasnya memprediksi skala nyeri 0-10 dari ekspresi wajah dan sensor accelerometer. Model menggabungkan embedding kedua encoder, dengan flag ketersediaan untuk input tidak lengkap:",
    lang: "python",
    code: `def forward(self, face, sensor,
            face_available=True, sensor_available=True):
    fv = self.face_encoder(face) if face_available \\
         else torch.zeros(face.shape[0], 128)
    if sensor_available:
        _, (h, _) = self.sensor_encoder(sensor)
        sv = h[-1]
    else:
        sv = torch.zeros(sensor.shape[0], 64)
    return self.head(torch.cat([fv, sv], dim=1)).squeeze(-1)`,
    footnote: "Face encoder berupa CNN 128-dim dan sensor encoder berupa LSTM 64-dim digabung lewat concat.",
  },

  // -- 22: Membaca hasil ablation --
  {
    layout: "bullets",
    title: "Membaca Hasil Ablation Pain Estimation",
    body: "Hasil dibaca dengan membandingkan val MAE, dan nilai lebih rendah berarti lebih baik:",
    bullets: [
      "Face only 1.82 dan Sensor only 2.15 menetapkan batas performa tiap modalitas sendirian.",
      "Late fusion 1.61 lebih baik dari keduanya, sehingga pada kasus ini kedua modalitas berkontribusi.",
      "Random face 2.09 mendekati sensor only, jadi kalau fusion turun ke level itu, wajah sedang diabaikan.",
    ],
    footnote: "Tabel mean ± std multi-seed dari W4 tetap dipakai saat melaporkan angka ini ke dosen, lengkap dengan batasannya.",
  },

  // -- 23: Materi 6 --
  {
    layout: "bullets",
    title: "6. Repo Adoption Multimodal",
    body: "Codebase multimodal lebih kompleks karena memuat banyak encoder, beberapa DataLoader, dan modul fusion. Repo map dari W7 dipakai dengan tiga langkah tambahan:",
    bullets: [
      "**Identifikasi titik fusion** dengan menemukan tempat embedding berbagai modalitas digabungkan, karena titik ini menentukan arsitektur.",
      "**Telusuri satu forward pass** dengan mengikuti satu batch tiap modalitas dari DataLoader sampai prediction sambil mencatat shape.",
      "**Buat repo_map.md kedua** memakai template Lampiran C.12 dengan tambahan kolom modalitas.",
    ],
    footnote: "Kolom modalitas menandai encoder mana menangani modalitas apa.",
  },

  // -- 24: Lab W9 --
  {
    layout: "bullets",
    title: "Lab W9: Multimodal Ablation",
    body: "Lab membangun baseline fusion lalu menguji apakah model memakai semua modalitas, mengikuti urutan enam materi:",
    bullets: [
      "Implementasikan late fusion baseline dengan smoke test, lalu jalankan protokol ablation enam kondisi untuk dua modalitas, termasuk uji modalitas acak.",
      "Tulis diagnosis eksplisit apakah ada modalitas yang diabaikan dari tabel hasil.",
      "Terapkan satu solusi seperti modality dropout atau null token jika masalah ditemukan, dan buat repo_map.md kedua jika mengadopsi repo.",
    ],
    footnote: "Checklist utama: uji modalitas acak dijalankan dan diagnosis modalitas terabaikan ditulis eksplisit.",
  },

  // -- 25: Refleksi --
  {
    layout: "bullets",
    title: "Refleksi",
    body: "Tiga pertanyaan untuk dibawa ke portofolio mandiri sebelum lanjut ke W10:",
    bullets: [
      "Dengan dataset image, audio, dan text yang full fusion-nya F1 0.81, urutan ablation apa yang Anda jalankan agar yakin ketiganya berkontribusi?",
      "Saat sensor kadang hilang karena koneksi putus, dari tiga strategi modalitas hilang mana yang paling sesuai, dan apa trade-off-nya?",
      "Bagaimana pilihan representasi untuk satu modalitas bisa dipengaruhi oleh ada atau tidaknya modalitas lain?",
    ],
    footnote: "Ketiganya kembali relevan saat merancang capstone multimodal.",
  },

  // -- 26: Lanjut ke W10 --
  {
    layout: "bullets",
    title: "Lanjut ke W10",
    body: "Dengan W9 selesai, seluruh lanskap Big Map dari tabular sampai multimodal sudah dijelajahi. W10 mengikat semuanya lewat keterampilan membaca paper:",
    bullets: [
      "Membaca paper secara terstruktur dengan metode tiga-pass, dari survei cepat sampai pemahaman penuh.",
      "Menerjemahkan paper menjadi kode yang bisa dijalankan, menutup jarak antara teori dan implementasi.",
      "Disiplin ablation per modalitas dan kebiasaan mengaudit klaim dari W9 langsung berguna saat membaca paper multimodal.",
    ],
  },

  // -- 27: CTA --
  {
    layout: "cta",
    title: "Mulai Lab W9",
    body: "Semua konsep deck ini ada di lab notebook: late fusion baseline, protokol ablation enam kondisi termasuk uji modalitas acak, dan solusi modality dropout.\n\nEstimasi waktu 4-6 jam termasuk menjalankan seluruh kondisi ablation dan menulis diagnosis.",
    ctaText: "Buka Lab W9 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w9_multimodal_ablation.ipynb",
  },
];

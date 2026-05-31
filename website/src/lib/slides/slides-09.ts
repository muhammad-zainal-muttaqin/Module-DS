import type { SlideSection } from "./index";

export const slides09: SlideSection[] = [
  // ── 1: Title ──
  {
    layout: "title",
    title: "W9: Multimodal Reasoning",
    subtitle: "Menggabungkan beberapa modalitas, membuktikan model benar-benar memakai semuanya, dan menangani modalitas yang hilang.",
    body: "Presentasi ini dirancang sebagai sumber mandiri - tidak membutuhkan bacaan terpisah.",
    footnote: "Bab 09 - Minggu 9",
  },

  // ── 2: Peta W9 ──
  {
    layout: "section",
    title: "Peta W9",
    body: "Ketika dua aliran data tersedia, apakah model benar-benar memakai keduanya? Pertanyaan ini paling sering diabaikan dalam riset multimodal, dan jawabannya sering di luar dugaan.",
    footnote: "W9 melatih berpikir sistematis tentang banyak aliran data sekaligus, dari fusion sampai ablation.",
  },

  // ── 3: Dari W8 ke W9 ──
  {
    layout: "bullets",
    title: "Dari W8 ke W9: dari Satu Modalitas ke Banyak",
    body: "W8 melatih memilih dan mengadaptasi foundation model untuk satu modalitas; W9 menggabungkan beberapa modalitas sekaligus. Tiga hal menjadi fokus minggu ini:",
    bullets: [
      "**Kebiasaan riset** yang dilatih minggu ini adalah ablation per modalitas dan analisis kegagalan multimodal sebelum klaim apapun.",
      "**Cross-attention** dari W7 kini dipakai untuk menggabungkan dua modalitas, bukan menghubungkan token dalam satu modalitas.",
      "**Dataset multimodal** dengan minimal dua modalitas dipakai, misalnya sensor dengan gambar atau audio dengan teks.",
    ],
    footnote: "Lab utama minggu ini adalah lab_w9_multimodal_ablation.ipynb.",
  },

  // ── 4: Section Motivasi ──
  {
    layout: "section",
    title: "Motivasi: Apakah Model Melihat Keduanya?",
    body: "Anda membangun model prediksi nyeri dari ekspresi wajah dan sensor pergelangan tangan. Training lancar dan validation F1 mencapai 0.79. Lalu Anda menghapus seluruh input sensor.",
    footnote: "Hasilnya tetap 0.78 - hampir sama, dan ini mengungkap sesuatu yang penting.",
  },

  // ── 5: Bullets motivasi ──
  {
    layout: "bullets",
    title: "Dua Minggu Kerja yang Setara dengan Satu Modalitas",
    body: "Eksperimen menghapus sensor tadi mengungkap failure mode yang paling sering tidak terdeteksi:",
    bullets: [
      "**F1 hanya turun 0.01** saat sensor dihapus, yang berarti model pada dasarnya tidak memakai data sensor sama sekali.",
      "**Dua minggu implementasi fusion** ternyata menghasilkan performa identik dengan model satu modalitas.",
      "**Inilah failure mode modalitas terabaikan**, dan satu-satunya cara mendeteksinya adalah menjalankan ablation per modalitas.",
    ],
    footnote: "Sebelum melaporkan hasil multimodal, ablation per modalitas adalah keharusan, bukan tambahan.",
  },

  // ── 6: Section Fusion ──
  {
    layout: "section",
    title: "Strategi Fusion: Tiga Cara Menggabungkan Modalitas",
    body: "Kapan modalitas digabungkan menentukan apa yang bisa dipelajari model. Tiga strategi fusion berbeda pada titik penggabungan dan tingkat interaksi antar modalitas.",
    footnote: "Pilihan strategi menentukan apakah model bisa belajar hubungan halus antar modalitas.",
  },

  // ── 7: Image fusion ──
  {
    layout: "image",
    title: "Late, Early, dan Cross-Attention Fusion",
    imageUrl: "/figures/fig08a_fusion_strategies.svg",
    caption: "Gambar ini membandingkan tiga strategi fusion: late fusion menggabungkan output encoder di ujung, early fusion menggabungkan input di awal sebelum diproses model bersama, dan cross-attention fusion membuat satu modalitas memperhatikan modalitas lain lewat attention. Titik penggabungan yang berbeda menentukan seberapa dalam interaksi antar modalitas bisa dipelajari.",
    footnote: "Cross-attention dipakai model vision-language modern seperti BLIP-2 dan Flamingo.",
  },

  // ── 8: Grid 3 fusion ──
  {
    layout: "grid",
    title: "Membandingkan Tiga Strategi Fusion",
    body: "Dari gambar tersebut, ketiga strategi menempati titik berbeda pada trade-off antara kemudahan dan kedalaman interaksi:",
    gridItems: [
      {
        title: "Late Fusion",
        body: "Setiap modalitas diproses encoder sendiri lalu output digabungkan di ujung. Mudah diimplementasikan dan tahan modalitas hilang, tetapi tidak ada interaksi antar modalitas sebelum penggabungan.",
      },
      {
        title: "Early Fusion",
        body: "Input berbagai modalitas digabungkan di level representasi awal sebelum diproses model bersama. Bisa belajar interaksi sejak awal, tetapi butuh projection cermat dan sulit menangani modalitas hilang.",
      },
      {
        title: "Cross-Attention Fusion",
        body: "Satu modalitas menjadi query dan yang lain menjadi key dan value. Model belajar bagian mana dari satu modalitas relevan untuk tiap elemen modalitas lain, dengan biaya komputasi yang lebih tinggi.",
      },
    ],
    footnote: "Late fusion sering menghasilkan modalitas terabaikan saat satu aliran data lebih mudah dioptimasi.",
  },

  // ── 9: Code cross-attention ──
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
    footnote: "Token \"merah\" bisa memberi perhatian pada region merah di gambar lewat skor attention ini.",
  },

  // ── 10: Section Failure mode ──
  {
    layout: "section",
    title: "Failure Mode: Modalitas Terabaikan",
    body: "Saat training multimodal, optimizer menemukan jalur gradient yang paling mudah. Jika satu modalitas lebih informatif atau lebih bersih, model belajar mengabaikan modalitas lain sambil loss tetap turun.",
    footnote: "Performa tampak bagus, tetapi model sebenarnya single-modal tanpa Anda sadari.",
  },

  // ── 11: Bullets deteksi ──
  {
    layout: "bullets",
    title: "Tiga Cara Mendeteksi Modalitas Terabaikan",
    body: "Untuk membuktikan model benar-benar memakai sebuah modalitas, tiga uji berikut saling melengkapi:",
    bullets: [
      "**Ablation per modalitas** menghapus satu modalitas - jika F1 tidak turun signifikan, modalitas itu diabaikan.",
      "**Modalitas acak** mengganti satu modalitas dengan noise - jika performa tidak memburuk, modalitas itu tidak dipakai.",
      "**Gradient magnitude check** menghitung gradient norm tiap encoder - encoder dengan gradient konsisten kecil tidak berkontribusi.",
    ],
    footnote: "Ketiga uji ini murah dijalankan dibanding biaya melaporkan hasil multimodal yang ternyata palsu.",
  },

  // ── 12: Bullets solusi ──
  {
    layout: "bullets",
    title: "Tiga Solusi terhadap Modalitas Terabaikan",
    body: "Saat ablation mengungkap modalitas yang diabaikan, tiga teknik memaksa model belajar dari setiap modalitas:",
    bullets: [
      "**Modality dropout** mematikan setiap modalitas secara acak saat training, sehingga model dipaksa belajar dari tiap modalitas secara mandiri.",
      "**Separate loss terms** menambahkan auxiliary loss per modalitas agar setiap encoder mendapat gradient yang jelas.",
      "**Gradient balancing** menyesuaikan learning rate tiap modalitas berdasarkan gradient magnitude masing-masing.",
    ],
    footnote: "Probabilitas dropout 0.10-0.25 lazim; naikkan ke 0.30-0.40 untuk modalitas yang terlalu dominan.",
  },

  // ── 13: Section Modalitas hilang ──
  {
    layout: "section",
    title: "Modalitas Hilang: Saat Input Tidak Lengkap",
    body: "Dalam produksi, satu modalitas sering tidak tersedia: sensor rusak, gambar kabur, atau teks kosong. Sistem multimodal yang baik harus menangani ini secara rapi, bukan crash atau menebak.",
    footnote: "Zero padding memberi sinyal ambigu, sehingga tiga strategi berikut lebih tepat.",
  },

  // ── 14: Grid 3 strategi hilang ──
  {
    layout: "grid",
    title: "Tiga Strategi Menangani Modalitas Hilang",
    body: "Ketiga strategi berbeda pada cara mengisi tempat modalitas yang absen:",
    gridItems: [
      {
        title: "Modality Dropout",
        body: "Strategi ini mengosongkan satu modalitas secara acak saat training, sehingga model terbiasa memprediksi bahkan ketika satu modalitas hilang saat inference.",
      },
      {
        title: "Learnable Null Token",
        body: "Strategi ini mengganti modalitas hilang dengan embedding yang dipelajari untuk merepresentasikan \"tidak ada modalitas ini\", lebih baik daripada zero padding yang ambigu.",
      },
      {
        title: "Fallback Single-Modal",
        body: "Strategi ini mendesain model sebagai ensemble: pakai semua modalitas jika tersedia, lalu jatuh ke model unimodal saat satu modalitas hilang. Sederhana dan andal untuk produksi.",
      },
    ],
    footnote: "Learnable null token belajar merepresentasikan distribusi \"tidak ada\", bukan noise nol.",
  },

  // ── 15: Section Temporal alignment ──
  {
    layout: "section",
    title: "Temporal Alignment: Saat Aliran Tidak Sinkron",
    body: "Banyak dataset multimodal nyata punya masalah alignment: video 25 fps versus audio 44 kHz, atau sensor IMU 100 Hz versus kamera 30 fps. Tanpa sinkronisasi, model bisa mengasosiasikan event dari waktu yang salah.",
    footnote: "Cross-attention yang tidak ter-align akan belajar korelasi yang semu.",
  },

  // ── 16: Image temporal ──
  {
    layout: "image",
    title: "Dua Stream dengan Clock Drift Berbeda",
    imageUrl: "/figures/fig08c_temporal_alignment.png",
    caption: "Gambar ini menunjukkan dua stream sensor dengan sampling rate dan clock yang berbeda, sehingga korespondensi timestep bergeser seiring waktu. Drift kecil yang menumpuk membuat frame di satu stream tidak lagi sejajar dengan sample di stream lain, dan model yang dilatih pada drift konsisten akan gagal pada sensor baru dengan drift berbeda.",
    footnote: "Selalu catat timestamp dari sumber waktu yang sama, idealnya tersinkronisasi NTP.",
  },

  // ── 17: Bullets pendekatan alignment ──
  {
    layout: "bullets",
    title: "Tiga Pendekatan Menyelaraskan Aliran Data",
    body: "Dari gambar tersebut, alignment yang benar bisa dicapai lewat tiga pendekatan dengan trade-off berbeda:",
    bullets: [
      "**Resampling atau interpolasi** menurunkan semua stream ke resolusi temporal terendah - mudah tetapi kehilangan detail.",
      "**Event-to-window mapping** memetakan tiap event ke window dari stream kontinu terdekat, cocok untuk data berbasis event.",
      "**Temporal position encoding** menyuntikkan waktu absolut sebagai fitur eksplisit dan membiarkan model belajar alignment sendiri.",
    ],
    footnote: "Jika drift sudah terlanjur, sertakan koreksinya sebagai preprocessing terdokumentasi, bukan perbaikan diam-diam.",
  },

  // ── 18: Bullets worked drift ──
  {
    layout: "bullets",
    title: "Contoh: Clock Drift 250 ms antar Sensor",
    body: "Pada robot dengan IMU 100 Hz dan kamera 30 fps yang memakai clock berbeda, drift kecil menumpuk menjadi masalah besar:",
    bullets: [
      "**Setelah satu jam**, clock IMU drift 250 ms dari kamera, sehingga frame kamera berkorespondensi dengan data IMU 25 sample kemudian.",
      "**Tanpa koreksi**, model mencocokkan visual \"hampir tabrakan\" dengan data IMU saat robot masih bergerak normal.",
      "**Deteksi drift** dilakukan dengan cross-correlation - puncak korelasi pada lag bukan nol menandakan drift yang perlu dikoreksi.",
    ],
    footnote: "Model bisa tetap akurat di training set karena drift konsisten, tetapi gagal pada sensor dengan drift berbeda.",
  },

  // ── 19: Section Ablation protocol ──
  {
    layout: "section",
    title: "Protokol Ablation Per Modalitas",
    body: "Setiap laporan multimodal harus menjalankan ablation sebelum klaim apapun. Protokol penuh memakai tujuh kondisi yang sistematis menguji kontribusi tiap modalitas dan kombinasinya.",
    footnote: "Jika Image only hampir sama dengan Full model, Anda punya masalah modalitas terabaikan.",
  },

  // ── 20: Image ablation ──
  {
    layout: "image",
    title: "Tujuh Kondisi Ablation Per Modalitas",
    imageUrl: "/figures/fig08b_multimodal_ablation.svg",
    caption: "Gambar ini menunjukkan protokol ablation tujuh kondisi: dari full model dengan semua modalitas aktif, lalu tiap modalitas tunggal, tiap pasangan modalitas, sampai random image sebagai pengecekan modalitas terabaikan. Setiap kondisi menyalakan subset modalitas yang berbeda untuk mengukur kontribusi masing-masing secara terisolasi.",
    footnote: "Kondisi terpenting adalah random image, karena tanpanya Anda tidak bisa membuktikan model memakai gambar.",
  },

  // ── 21: Bullets ablation conditions ──
  {
    layout: "bullets",
    title: "Membaca Tujuh Kondisi Ablation",
    body: "Dari gambar tersebut, ketujuh kondisi dikelompokkan menjadi tiga jenis pengujian yang saling melengkapi:",
    bullets: [
      "**Full model dan single-modal** menetapkan baseline penuh sekaligus batas performa tiap modalitas sendirian.",
      "**Pasangan modalitas** menjawab apakah modalitas ketiga benar-benar berkontribusi di atas dua modalitas lainnya.",
      "**Random image** mengganti satu modalitas dengan noise untuk memastikan model tidak diam-diam mengabaikannya.",
    ],
    footnote: "Untuk capstone, lima kondisi minimum sudah informatif asalkan random image tetap disertakan.",
  },

  // ── 22: Section Worked Example ──
  {
    layout: "section",
    title: "Worked Example: Fusion untuk Pain Estimation",
    body: "Tugasnya memprediksi skala nyeri 0-10 dari ekspresi wajah dan sensor accelerometer tangan. Late fusion menggabungkan embedding kedua encoder lalu meneruskannya ke head prediksi.",
    footnote: "Implementasi menyertakan flag ketersediaan tiap modalitas untuk menangani input yang tidak lengkap.",
  },

  // ── 23: Code PainEstimator ──
  {
    layout: "code",
    title: "Late Fusion dengan Penanganan Modalitas Hilang",
    body: "Model berikut menggabungkan embedding wajah dan sensor, lalu mengisi nol saat satu modalitas tidak tersedia:",
    lang: "python",
    code: `def forward(self, face, sensor,
            face_ok=True, sensor_ok=True):
    fv = self.face_encoder(face) if face_ok \\
         else torch.zeros(face.shape[0], 128)
    if sensor_ok:
        _, (h, _) = self.sensor_encoder(sensor)
        sv = h[-1]
    else:
        sv = torch.zeros(sensor.shape[0], 64)
    return self.head(torch.cat([fv, sv], dim=1)).squeeze(-1)`,
    footnote: "Face encoder berupa CNN 128-dim dan sensor encoder berupa LSTM 64-dim digabung lewat concat.",
  },

  // ── 24: Bullets ablation results ──
  {
    layout: "bullets",
    title: "Membaca Hasil Ablation Pain Estimation",
    body: "Hasil ablation menunjukkan apakah kedua modalitas benar-benar berkontribusi lewat perbandingan val MAE:",
    bullets: [
      "**Face only 1.82 dan Sensor only 2.15** menetapkan batas performa tiap modalitas sendirian.",
      "**Late fusion 1.61** lebih baik dari keduanya, menandakan kedua modalitas berkontribusi pada kasus ini.",
      "**Random face 2.09 mendekati sensor only** menjadi sinyal bahaya - jika fusion turun ke level itu, wajah sedang diabaikan.",
    ],
    footnote: "MAE lebih rendah berarti lebih baik, sehingga fusion yang menang membuktikan nilai menggabungkan modalitas.",
  },

  // ── 25: Section Pitfalls ──
  {
    layout: "section",
    title: "Pitfalls & Miskonsepsi",
    body: "Beberapa keyakinan tentang multimodal terdengar masuk akal tetapi sering menyesatkan. Mengenalinya mencegah klaim multimodal yang sebenarnya single-modal.",
    footnote: "Sebagian besar berakar pada anggapan bahwa performa naik berarti semua modalitas dipakai.",
  },

  // ── 26: Bullets pitfalls ──
  {
    layout: "bullets",
    title: "Empat Keyakinan yang Perlu Diluruskan",
    body: "Keempat keyakinan berikut benar dalam kondisi sempit tetapi berbahaya jika dianggap berlaku umum:",
    bullets: [
      "**\"Late fusion cukup untuk semua kasus\"** keliru karena ia sering menghasilkan modalitas terabaikan - coba cross-attention saat tugas butuh interaksi.",
      "**\"Performa naik berarti semua modalitas dipakai\"** tidak benar, karena peningkatan bisa datang dari satu modalitas saja.",
      "**\"Modalitas hilang sama dengan zero padding\"** salah, karena nol bersifat ambigu - pakai learnable null token atau modality dropout.",
    ],
    footnote: "Temporal alignment juga bukan urusan DataLoader semata; Anda tetap wajib memverifikasi sinkronisasi timestamp.",
  },

  // ── 27: Bullets Lab W9 ──
  {
    layout: "bullets",
    title: "Lab W9: Multimodal Ablation",
    body: "Lab minggu ini membangun baseline fusion lalu membuktikan apakah model benar-benar multimodal lewat ablation lengkap:",
    bullets: [
      "**Implementasikan late fusion baseline** dengan smoke test, lalu jalankan protokol ablation tujuh kondisi plus random check.",
      "**Tulis diagnosis** apakah masalah modalitas terabaikan ditemukan dari tabel hasil ablation.",
      "**Terapkan satu solusi** seperti modality dropout atau null token jika masalah ditemukan, dan buat repo_map.md kedua jika mengadopsi repo.",
    ],
    footnote: "Checklist utama: uji modalitas acak dijalankan dan diagnosis modalitas terabaikan ditulis eksplisit.",
  },

  // ── 28: Refleksi ──
  {
    layout: "bullets",
    title: "Refleksi: Tiga Pertanyaan untuk Dibawa Pulang",
    body: "Sebelum lanjut ke W10, renungkan tiga pertanyaan yang menguji disiplin multimodal Anda:",
    bullets: [
      "Dengan dataset image, audio, dan text yang full fusion-nya F1 0.81, urutan ablation apa yang Anda jalankan agar yakin ketiganya berkontribusi?",
      "Saat sensor kadang hilang karena koneksi putus, dari tiga strategi modalitas hilang mana yang paling sesuai, dan apa trade-off-nya?",
      "Bagaimana pilihan representasi untuk satu modalitas bisa dipengaruhi oleh ada atau tidaknya modalitas lain?",
    ],
    footnote: "Tuliskan jawaban di portofolio mandiri - ketiganya kembali relevan saat merancang capstone multimodal.",
  },

  // ── 29: Lanjut W10 ──
  {
    layout: "bullets",
    title: "Lanjut ke W10: Paper Reading & Implementation",
    body: "Dengan W9 selesai, Anda telah menjelajahi seluruh lanskap Big Map dari tabular sampai multimodal. W10 mengikat semuanya lewat keterampilan membaca paper:",
    bullets: [
      "**Membaca paper secara terstruktur** dengan metode tiga-pass, dari survei cepat sampai pemahaman mendalam.",
      "**Menerjemahkan paper menjadi kode** yang bisa dijalankan, menutup jarak antara teori dan implementasi.",
      "**Disiplin ablation dan reproduksibilitas** dari minggu-minggu sebelumnya menjadi alat untuk mereplikasi klaim paper.",
    ],
    footnote: "Kemampuan mengaudit klaim multimodal dari W9 langsung berguna saat membaca paper multimodal di W10.",
  },

  // ── 30: CTA ──
  {
    layout: "cta",
    title: "Mulai Lab W9",
    body: "Semua konsep di presentasi ini ada dalam lab notebook lengkap: late fusion baseline, protokol ablation tujuh kondisi, uji modalitas acak, dan solusi modality dropout.\n\nEstimasi waktu: 4-6 jam termasuk menjalankan seluruh kondisi ablation dan menulis diagnosis.",
    ctaText: "Buka Lab W9 di Colab",
    ctaTarget: "https://colab.research.google.com/github/muhammad-zainal-muttaqin/Module-DS/blob/master/template/notebooks/lab_w9_multimodal_ablation.ipynb",
  },
];

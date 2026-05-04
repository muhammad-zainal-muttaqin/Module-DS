<details>
<summary>📂 Navigasi Modul (klik untuk buka)</summary>

| # | Modul | Minggu |
|---|-------|--------|
| 00 | [Pendahuluan](00_Pendahuluan.md) | 1 |
| 00a | [Prasyarat Modul](00a_Prasyarat.md) | – |
| 01 | [W1 - Tabular & Output Heads](01_W1_Tabular_Output_Heads.md) | 1 |
| 02 | [W2 - Images, CNN & Smoke Test](02_W2_Images_CNN_Smoke_Test.md) | 2 |
| 03 | [W3 - Loss, Optimizer & Evaluasi](03_W3_Loss_Optimizer_Evaluasi.md) | 3 |
| 04 | [W4 - Reproducibility & Experiment Matrix](04_W4_Reproducibility_Experiment_Matrix.md) | 4 |
| 05 | [W5 - Sequences: RNN & LSTM](05_W5_Sequences_RNN_LSTM.md) | 5 |
| 06 | [W6 - Representations & Temporal Leakage](06_W6_Representations_Temporal_Leakage.md) | 6 |
| 07 | [W7 - Text, Transformers & Repo Adoption](07_W7_Text_Transformers_Repo_Adoption.md) | 7 |
| 08 | [W8 - Foundation Models](08_W8_Foundation_Models.md) | 8 |
| 09 | [W9 - Multimodal Reasoning](09_W9_Multimodal_Reasoning.md) | 9 |
| 10 | [W10 - Paper Reading & Implementation](10_W10_Paper_Reading.md) | 10 |
| 11 | [W11 - Research Framing](11_W11_Research_Framing.md) | 11 |
| 12 | [Capstone - Proyek Riset](12_Capstone.md) | 12-15 |
| 13 | [Rubrik Penilaian](13_Rubrik_Penilaian.md) | - |
| ▶ 14 | Lampiran | - |
| 15 | [Panduan Instruktur](15_Panduan_Instruktur.md) | - |

</details>

---

# 14 · Lampiran

> *Lampiran yang baik adalah alat bantu, bukan hiasan. Bagian ini berisi glosarium istilah, checklist eksperimen, dan template yang dapat Anda salin-pakai langsung sepanjang semester.*

---

## A. Glosarium Indonesia ↔ Inggris

Istilah teknis ML/DL sebagian besar berasal dari Bahasa Inggris. Glosarium ini mendokumentasikan istilah baku yang dipakai modul. **Aturan utama: istilah teknis ML/DL dipertahankan dalam Bahasa Inggris** (loss, checkpoint, baseline, fine-tune, freeze, layer, confusion matrix, hidden states, dll.). Padanan Indonesia hanya dicantumkan jika benar-benar lazim dan natural dipakai (akurasi, presisi, regularisasi, augmentasi). Hindari padanan kaku seperti "matriks kebingungan", "fungsi kerugian", "garis dasar", "jaringan saraf tiruan" - di prosa modul tetap pakai istilah dalam bahasa Inggris.

**Daftar isi glosarium:** A.1 Arsitektur & Model | A.2 Pelatihan | A.3 Data | A.4 Evaluasi | A.5 Eksperimen & Reproduksibilitas | A.6 Perangkat | A.7 Sikap Riset | A.8 Aktivasi & Normalisasi | A.9 Inisialisasi, Optimizer & Scheduler | A.10 Loss Function | A.11 Indeks Pemakaian Pertama per Bab | A.12 Worked Examples Istilah Prioritas | A.13 Backpropagation Derivasi Manual

### A.1 Arsitektur & Model

| Istilah (English) | Padanan Indonesia (jika lazim) | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| adapter | - | Modul kecil yang ditambahkan ke pretrained model untuk task-specific fine-tuning. | - |
| AdaptiveAvgPooling / AdaptiveAvgPool2d | - | Pooling ke ukuran tetap. Bypass variasi ukuran input. Sering dipakai sebelum classifier. | - |
| attention | atensi | Mekanisme yang memberi bobot pada bagian input berbeda sesuai relevansi. | "Attention" / "atensi" dua-duanya lazim. |
| autoencoder (AE) | - | Encoder + decoder yang dilatih rekonstruksi. | - |
| autoregressive | - | Model memprediksi token berikutnya berdasarkan token-token sebelumnya. | - |
| bidirectional LSTM | - | LSTM yang membaca sequence dari dua arah (kiri-ke-kanan dan kanan-ke-kiri). | - |
| BLEU | - | Metrik terjemahan mesin. n-gram precision + brevity penalty. | - |
| bottleneck | - | Layer sempit di tengah AE yang memampatkan representasi. | Tidak diterjemahkan. |
| BPE (Byte Pair Encoding) | - | Subword tokenization: gabungkan pasangan token paling frekuen secara iteratif. | - |
| BPTT (Backpropagation Through Time) | - | Backprop pada RNN yang di-unroll sepanjang sequence. Secara intrinsik rawan vanishing gradient. | - |
| causal mask | - | Masking pada autoregressive decoding. Setiap token hanya bisa "melihat" token sebelumnya. | - |
| cell state | status sel | c_t: memori jangka panjang dalam LSTM. Dikontrol oleh gate mechanism. | - |
| channel | kanal | Dimensi fitur dalam tensor citra atau feature map. RGB = 3 channel. | - |
| context window | jendela konteks | Maksimum panjang sequence yang bisa diproses model dalam satu langkah. | - |
| convolution / Conv2d | - | Operasi sliding window pada input. Deteksi fitur spasial dengan weight sharing. | - |
| convolutional network (CNN) | - | Arsitektur NN yang menggunakan convolution untuk ekstraksi fitur spasial. | - |
| cross-attention | - | Query dari satu sequence, key/value dari sequence lain. Memodelkan hubungan inter-sequence. | - |
| cross-attention fusion | fusi cross-attention | Satu modalitas sebagai query, modalitas lain sebagai key/value dalam attention. | - |
| denoising autoencoder (DAE) | - | Autoencoder: input = corrupted, target = original. Belajar representasi robust terhadap noise. | - |
| diffusion model | - | Model generatif yang denoise secara bertahap dari noise ke data. | Nama diri. |
| downstream task | tugas hilir | Tugas spesifik target setelah pretraining (klasifikasi, regresi, dll.). | - |
| early fusion | fusi awal | Menggabungkan input dari modalitas berbeda di awal, sebelum encoding bersama. | - |
| ELBO (Evidence Lower Bound) | - | Batas bawah bukti dalam VAE. Loss = reconstruction term + KL divergence term. | - |
| embedding | - | Representasi vektor padat dari data diskrit (kata, token, dll). | Tidak diterjemahkan. |
| emergent abilities | kemampuan emergen | Kemampuan yang muncul tiba-tiba saat model melewati threshold skala tertentu. | - |
| encoder / decoder | - | Encoder memproses input ke representasi; decoder menghasilkan output dari representasi. | Tidak diterjemahkan. |
| feature map | peta fitur | Output dari operasi convolution. Representasi input setelah filter. | - |
| feed-forward network (FFN) | - | Jaringan yang memproses tiap posisi secara terpisah dalam Transformer. | - |
| few-shot | - | Model menyelesaikan tugas dengan beberapa contoh saja (biasanya dalam prompt). | - |
| fine-tuning | - | Adaptasi model pretrained ke tugas spesifik dengan training lanjutan. | Pakai "fine-tune" / "fine-tuning". Hindari "penyesuaian halus". |
| foundation model | - | Model pretrained pada data besar, transferable ke banyak downstream tasks. | - |
| freeze / frozen | - | Parameter model tidak diupdate saat training. | Pakai "di-freeze", bukan "dibekukan". |
| gate mechanism | mekanisme gerbang | Input / forget / output gate pada LSTM. Mengontrol aliran informasi: baca, simpan, lupa. | - |
| generalization | generalisasi | Kemampuan model berfungsi dengan baik pada data yang belum pernah dilihat. Tujuan utama ML. | - |
| generative adversarial network (GAN) | - | Dua jaringan (generator + discriminator) dilatih saling berlomba. | Nama diri. |
| GRU (Gated Recurrent Unit) | - | Varian RNN dengan gate, lebih ringkas dari LSTM. | Nama diri. |
| hidden state | status tersembunyi | h_t: output LSTM/RNN pada timestep t. Membawa informasi konteks hingga titik itu. | - |
| in-context learning | - | Perilaku model berubah berdasarkan contoh dalam prompt tanpa pembaruan bobot. | - |
| inductive bias | bias induktif | Asumsi arsitektur yang membuat model lebih efisien belajar pola tertentu. | - |
| kernel / filter | - | Matriks kecil pada convolution. Mendeteksi pola lokal: edge, tekstur, pola sederhana. | - |
| KL divergence | divergensi KL | Ukuran perbedaan dua distribusi probabilitas. Regularisasi VAE. | - |
| late fusion | fusi akhir | Menggabungkan representasi dari modalitas berbeda di akhir (setelah encoding terpisah). | - |
| latent space | ruang laten | Ruang representasi terkompresi di bottleneck. | "Ruang laten" lazim di akademik. |
| layer | - | Unit komputasi dalam NN. | Pakai "layer" sebagai pinjaman: "layer konvolusi", "layer awal". Hindari "lapisan" di konteks NN. |
| LoRA (Low-Rank Adaptation) | - | Metode adaptasi efisien dengan matriks low-rank parallel dengan weights asli. | - |
| LSTM cell | - | Varian RNN dengan gate mechanism (input, forget, output). | Nama diri. |
| maxPooling / MaxPool2d | - | Downsampling: ambil nilai maksimum dalam window. Reduksi dimensi spasial. | - |
| modalitas dropout | - | Teknik training yang secara acak mematikan satu modalitas untuk robustness. | - |
| model card | - | Dokumen yang mendeskripsikan capabilities, limitations, dan biases sebuah model. | - |
| multi-head attention (MHA) | - | Attention paralel di beberapa subspace representasi. | Nama diri. |
| multilayer perceptron (MLP) | - | Arsitektur *feed-forward* dasar. | - |
| neural network (NN) | - | Model komputasi terinspirasi jaringan neuron biologis. | Pakai "neural network" atau "NN", bukan "jaringan saraf tiruan". |
| normalizing flow | - | Model generatif dengan transformasi invertible bertumpuk. Density estimation exact. | - |
| padding | - | Penambahan tepi di sekeliling input sebelum convolution. Menjaga dimensi spasial. | - |
| per-modality ablation | ablation per modalitas | Eksperimen yang menghapus atau mengacak satu modalitas untuk mengukur kontribusinya. | - |
| perplexity (PPL) | - | exp(CrossEntropy). Metrik language model. Lower = model lebih yakin pada teks. | - |
| positional encoding | - | Informasi posisi token ditambahkan ke embedding. | Tidak diterjemahkan. |
| pretrained model | - | Model yang sudah dilatih pada data besar, siap di-fine-tune. | Pakai "pretrained" apa adanya. |
| pretraining | - | Training awal pada data sangat besar dengan tugas umum (language modeling, image classification). | - |
| query / key / value (QKV) | - | Tiga representasi dalam attention: Q = yang mencari, K = indeks, V = isi yang diambil. | - |
| receptive field | medan reseptif | Region input yang memengaruhi satu neuron di layer tertentu. Makin dalam, makin luas. | - |
| reconstruction loss | - | MSE atau BCE antara input dan output autoencoder. | - |
| recurrent network (RNN) | - | Keluarga jaringan untuk data sekuensial. LSTM dan GRU adalah varian RNN. | - |
| reparameterization trick | trik reparameterisasi | Sampling z = mu + sigma * epsilon. Membuat sampling di VAE tetap differentiable. | - |
| residual / skip connection | koneksi residu | Output = F(x) + x. Info langsung melompati layer. Cegah degradasi pada deep network. | - |
| ROUGE | - | Metrik ringkasan teks. n-gram recall-based. | - |
| scaled dot-product attention | - | Attention = softmax(QK^T / sqrt(d_k)) V. Mekanisme inti Transformer. | - |
| scaling law | hukum skala | Hubungan power-law antara performa model dan compute / data / parameter count. | - |
| self-attention | - | Attention dengan query = key = value dari sequence yang sama. Memodelkan hubungan intra-sequence. | - |
| stacked LSTM | - | LSTM dengan banyak hidden layer. Hierarki representasi temporal. | - |
| stride | langkah | Step pergeseran kernel saat convolution. Stride > 1 mereduksi dimensi spasial. | - |
| teacher forcing | - | Training sequence: ground truth dipakai sebagai input langkah berikutnya, bukan prediksi model. | - |
| temporal alignment | penyelarasan temporal | Sinkronisasi timestep dari stream data yang berbeda sampling rate. | - |
| three-pass reading | baca tiga-putaran | Metode Keshav (2007): skim -> close-read -> critical read. | - |
| tokenization | tokenisasi | Pemecahan teks menjadi unit lebih kecil: subword, kata, atau karakter. | - |
| transfer learning | - | Pengetahuan dari satu tugas dipakai untuk meningkatkan performa di tugas lain. | - |
| Transformer | - | Arsitektur NN berbasis attention, backbone LLM modern. | Nama diri, jangan diterjemahkan. |
| variational autoencoder (VAE) | - | Autoencoder generatif dengan distribusi probabilitas di latent space. | Nama diri. |
| weights / trained parameters | bobot | Parameter model yang diupdate saat training. | "Bobot model" lazim di prosa. |
| WordPiece | - | Subword tokenization: gabungkan pasangan berdasarkan likelihood gain. | - |
| zero-shot | - | Model menyelesaikan tugas tanpa satu pun contoh untuk tugas tersebut. | - |

### A.2 Pelatihan

| Istilah (English) | Padanan Indonesia (jika lazim) | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| autograd | - | Automatic differentiation PyTorch. Hitung gradient otomatis dari computational graph. | - |
| backward pass / backpropagation | propagasi balik | Hitung gradient setiap weight terhadap loss melalui chain rule. | - |
| batch size | - | Jumlah sampel per iterasi training. | Tidak diterjemahkan. |
| checkpoint | - | Snapshot model (weights + optimizer + config) yang disimpan. | Pakai "checkpoint". Hindari "titik simpan". |
| device | - | Tempat tensor diproses: CPU atau CUDA GPU. | "Pindahkan model ke device." |
| dropout | - | Regularisasi: matikan p% neuron secara acak tiap forward. Cegah ko-adaptasi. | Tidak diterjemahkan. |
| dry-run | - | Training dengan 1-2 batch untuk verifikasi pipeline sebelum training penuh. | - |
| early stopping | - | Hentikan training jika validation metric berhenti membaik. Cegah overfitting. | - |
| epoch | - | Satu putaran penuh data training. | Tidak diterjemahkan. |
| evaluation loop | siklus evaluasi | Sama seperti training loop, tanpa gradien. Hanya evaluasi di validasi / test. | - |
| forward pass | - | Input mengalir maju melalui layer: input -> compute -> output. | - |
| gradient | gradien | Turunan loss terhadap weight. Arah dan laju update. | "Gradien" lazim di prosa. |
| learning rate | - | Step size update weight per iterasi. | Pakai "learning rate". Hindari "laju pelatihan". |
| loss / loss function | - | Fungsi yang mengukur kesalahan prediksi terhadap target. | Pakai "loss". Hindari "fungsi kerugian". |
| overfitting | - | Model menghafal training data, gagal generalisasi ke data baru. | Tidak diterjemahkan. |
| regularization | regularisasi | Teknik mencegah overfitting dengan menambah constraint. | "Regularisasi" lazim sebagai serapan. |
| step / iteration | iterasi / langkah | Satu update weight setelah forward + backward satu batch. | Dua-duanya boleh. |
| stochastic gradient descent (SGD) | - | Optimizer klasik: update weight per batch. | Pakai "SGD". Hindari "penurunan gradien stokastik". |
| training | pelatihan / melatih | Proses update weight berdasarkan data. | Dua-duanya lazim. |
| training loop | siklus pelatihan | Loop standar: forward -> loss -> backward -> optimizer.step() -> zero_grad(). | - |
| underfitting | - | Model gagal belajar pola bahkan dari training data. | Tidak diterjemahkan. |
| validation | validasi | Evaluasi model pada validation set selama training. | Jangan campur dengan "validation set". |

### A.3 Data

| Istilah (English) | Padanan Indonesia (jika lazim) | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| chronological split | split kronologis | Split berdasarkan waktu: data lama -> train, data baru -> test. Untuk time series. | - |
| class | kelas | Kategori dalam masalah klasifikasi. | "Kelas" lazim sebagai serapan. |
| class imbalance | - | Distribusi kelas tidak merata. Satu kelas dominan. | - |
| data augmentation | augmentasi data | Membuat variasi data sintetis dari data asli. | "Augmentasi" lazim sebagai serapan. |
| data leakage | - | Informasi test set bocor ke training set, inflasi metrik palsu. | Pakai "leakage" apa adanya. |
| data split / splitting | - | Membagi dataset menjadi train/val/test. | Pakai "split" apa adanya. |
| DataLoader | - | Iterator PyTorch untuk data: batch, shuffle, parallel loading via num_workers. | - |
| dataset | - | Kumpulan data terstruktur untuk training/evaluasi. | "Dataset" hampir selalu dipakai. Hindari "himpunan data". |
| Dataset | - | Abstraksi data PyTorch. Wajib implement __len__ dan __getitem__. | - |
| dataset bias | bias dataset | Systematic error dalam data. Tipe: selection bias, measurement bias, label bias, historical bias. | - |
| domain shift | - | Distribusi train berbeda dari distribusi test. Tipe: covariate shift, label shift, concept drift. | - |
| fairness | keadilan | Model tidak boleh bias sistematis terhadap grup tertentu. | - |
| label | - | Target/ground truth untuk sampel. | Tidak diterjemahkan. |
| normalization (data) | normalisasi data | Standarisasi fitur: mean=0, std=1. Stabilkan training. | - |
| preprocessing | pra-pemrosesan | Transformasi data sebelum training (resize, normalize, tokenize). | Dua-duanya boleh. |
| random split | - | Acak data ke train/val/test. Cocok untuk data i.i.d., tidak untuk time series. | - |
| synthetic data | data sintetis | Data buatan untuk testing atau controlled experiment. | - |
| tensor | - | Array multi-dimensi. Struktur data inti PyTorch. Mirip NumPy array tapi GPU-compatible. | - |
| train / validation / test | - | Tiga subset data untuk training, tuning, dan evaluasi final. | Jangan diterjemahkan di tabel hasil. |

### A.4 Evaluasi

| Istilah (English) | Padanan Indonesia (jika lazim) | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| ablation study | studi ablasi | Eksperimen sistematis yang menghapus/mengubah satu komponen model untuk mengukur kontribusinya terhadap performa. | - |
| accuracy | akurasi | Proporsi prediksi benar dari total prediksi. | "Akurasi" lazim sebagai serapan. |
| AUC / ROC | - | Area Under ROC Curve. Trade-off TPR vs FPR. Threshold-independent. | Nama diri. |
| calibration | kalibrasi | Kesesuaian antara confidence model dan akurasi aktual. | - |
| confident-wrong analysis | - | Sampel dengan confidence tinggi tapi prediksi salah. Sinyal dataset issue. | - |
| confusion matrix | - | Tabel yang merinci prediksi vs aktual per kelas. | **Tidak diterjemahkan.** Hindari "matriks kebingungan". |
| effect size | ukuran efek | Ukuran besarnya perbedaan atau pengaruh (beyond p-value). Cohen's d. | - |
| error analysis | analisis kesalahan | Investigasi pola sistematis dari kesalahan model. | - |
| inference | inferensi | Proses model menghasilkan prediksi pada data baru. | "Inferensi" lazim. |
| leakage inflation | inflasi leakage | Lonjakan metrik yang disebabkan data leakage, bukan karena model benar-benar belajar. | - |
| macro-F1 | - | F1 rata-rata per kelas, tanpa bobot. Setiap kelas sama penting. | - |
| metric | metrik | Ukuran kuantitatif performa model. | "Metrik" lazim sebagai serapan. |
| per-class accuracy | akurasi per kelas | Akurasi dihitung per kelas individual. Mendeteksi kelas lemah. | - |
| pR-AUC / average precision | - | Area Under Precision-Recall Curve. Lebih informatif dari ROC-AUC untuk class imbalance. | - |
| precision / recall / F1 | presisi / recall / F1 | Precision = TP/(TP+FP). Recall = TP/(TP+FN). F1 = harmonic mean keduanya. | Di laporan biarkan English. |
| rOC-AUC | - | Area Under ROC Curve. Trade-off TPR vs FPR. Threshold-independent. | - |
| test-time evaluation | evaluasi pada data uji | Evaluasi final pada test set yang belum pernah dilihat. | - |
| weighted-F1 | - | F1 rata-rata per kelas dengan bobot support (jumlah sampel kelas). | - |

### A.5 Eksperimen & Reproduksibilitas

| Istilah (English) | Padanan Indonesia (jika lazim) | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| 5 whys | 5 Mengapa | Root cause analysis: tanya "kenapa" berulang hingga akar masalah ditemukan. | - |
| additivity | aditivitas | Asumsi bahwa efek setiap variabel bersifat independen. Dilanggar jika ada interaksi. | - |
| baseline | - | Model/metode paling sederhana sebagai pembanding intervensi. | **Tidak diterjemahkan.** Hindari "garis dasar". |
| configuration / config | konfigurasi | Kumpulan hyperparameter dan pengaturan eksperimen. | - |
| confirmation bias | bias konfirmasi | Kecenderungan mencari bukti yang cocok dengan hipotesis dan mengabaikan kontradiksi. | - |
| confirmatory vs exploratory | konfirmatif vs eksploratif | Confirmatory: uji hipotesis yang sudah dipreregister. Exploratory: cari pola baru tanpa hipotesis awal. | - |
| determinism | determinisme | Output reproducible jika seed + config sama. | - |
| deviation analysis | analisis deviasi | Bandingkan actual protocol vs pre-registration. Catat penyimpangan dan alasannya. | - |
| experiment | eksperimen | Percobaan sistematis untuk menguji hipotesis. | "Eksperimen" lazim sebagai serapan. |
| experiment matrix | matriks eksperimen | Grid hyperparameter: tiap baris = satu run. Kombinasi sistematis variabel. | - |
| falsifiable | dapat dipalsukan | Pernyataan yang bisa dibuktikan salah secara empiris. | Dari *filsafat ilmu*; kata kunci Popperian. |
| HARKing | - | Hypothesizing After Results are Known. Praktik questionable research. | - |
| hypothesis | hipotesis | Dugaan terukur yang bisa diuji. | Jamak: hipotesis-hipotesis. |
| hypothesis (directional / null) | hipotesis (search / nol) | Directional: prediksi arah efek. Null: tidak ada efek / perbedaan. | - |
| interaction effect | efek interaksi | Efek kombinasi dua variabel atau lebih yang tidak aditif. | - |
| main effect | efek utama | Efek rata-rata satu variabel di semua level variabel lain dalam matriks eksperimen. | - |
| multiple comparisons | perbandingan berganda | Makin banyak hipotesis diuji, makin tinggi false positive rate. | - |
| p-hacking | - | Menguji banyak hipotesis sampai menemukan hasil signifikan. Questionable research. | - |
| pre-registration | praregistrasi | Mendokumentasikan hipotesis dan protokol sebelum eksperimen. | Dua-duanya diterima. |
| replicated result | hasil yang direplikasi | Hasil yang dikonfirmasi dengan seed berbeda atau oleh peneliti lain. | - |
| reproducibility | reproduksibilitas | Eksperimen dapat diulang dengan hasil yang sama jika seed, config, dan komit sama. | - |
| research question | pertanyaan riset | Pertanyaan spesifik, terukur, dan falsifiable yang menjadi fokus riset. | - |
| seed | - | Nilai awal untuk random number generator. Kunci reproduksibilitas. | Tidak diterjemahkan. |
| smoke test (3-level) | - | L1: import modul. L2: forward satu batch. L3: satu epoch training. Verifikasi pipeline. | - |
| SQRC | - | Situation, Question, Resolution attempt, Call. Kerangka komunikasi riset. | - |
| variant | varian | Versi berbeda dari suatu metode dalam perbandingan. | - |

### A.6 Perangkat

| Istilah (English) | Padanan Indonesia (jika lazim) | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| best checkpoint | - | Checkpoint dengan metrik validasi terbaik selama training. | - |
| CPU | - | Prosesor umum untuk komputasi sequential. | - |
| GPU | - | Prosesor paralel untuk akselerasi training NN. | Tidak diterjemahkan. |
| HuggingFace transformers | - | Library untuk pretrained models (BERT, GPT, dll.) dan tokenizer. | - |
| memory / RAM | memori | Penyimpanan sementara untuk data dan model saat training. | - |
| pod | - | Unit komputasi cloud (biasanya 1+ GPU). | Tidak diterjemahkan. |
| rsync | - | Sinkronisasi file remote. Incremental, kompresi. | - |
| RunPod / cloud GPU | - | Platform sewa GPU on-demand. Spot instance lebih murah untuk eksperimen eksploratori. | - |
| SSH | - | Protokol koneksi remote aman ke server. | - |
| TensorBoard | - | Visualisasi training: loss curve, metrics, graph model, embedding projector. | - |
| tmux | - | Terminal multiplexer. Jaga session tetap hidup walau SSH disconnect. | - |
| tunnel | - | Koneksi terenkripsi untuk akses resource jarak jauh. | Tidak diterjemahkan. |

### A.7 Sikap Riset (dari modul)

| Istilah (English) | Padanan Indonesia | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| curiosity | keingintahuan | Dorongan untuk memahami mengapa dan bagaimana model berperilaku. | - |
| observation before conclusion | observasi sebelum simpulan | Lihat data dulu, baru simpulkan. Lawan dari "conclusion-driven analysis". | - |
| ownership | tanggung jawab | Bertanggung jawab atas hasil eksperimen sendiri, baik maupun buruk. | Konteks riset: "bertanggung jawab atas hasil sendiri". |
| reproducibility | reproduksibilitas | Eksperimen dapat diulang dengan hasil yang sama jika seed, config, dan commit hash sama. | - |
| rigor | ketelitian | Kebiasaan sistematis dan disiplin dalam menjalankan eksperimen. | - |
| rigor habit | kebiasaan ketelitian | Kebiasaan sistematis: smoke test, reproducibility, ablation, pre-registration. | - |
| skepticism | skeptisisme | Sikap kritis terhadap hasil sendiri maupun klaim orang lain. | - |

### A.8 Aktivasi & Normalisasi

| Istilah (English) | Padanan Indonesia (jika lazim) | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| batch normalization / BatchNorm | - | Normalisasi per channel dalam satu batch. Stabilkan training, percepat konvergensi. | - |
| dropout | - | Regularisasi: matikan p% neuron secara acak tiap forward. Cegah ko-adaptasi. | - |
| GELU (Gaussian Error Linear Unit) | - | Aktivasi halus mirip ReLU. Bobot nilai negatif kecil. Default Transformer modern. | - |
| group normalization / GroupNorm | - | Normalisasi per group channel. Stabil untuk batch size kecil. | - |
| layer normalization / LayerNorm | - | Normalisasi per sample. Alternatif BatchNorm untuk sequence dan Transformer. | - |
| leaky ReLU | - | ReLU dengan slope kecil (misal 0.01) untuk input negatif. Mencegah dead neuron. | - |
| ReLU (Rectified Linear Unit) | - | Aktivasi: `max(0, x)`. Sederhana, efisien, neuron mati jika selalu negatif. | - |
| sigmoid | - | Aktivasi output (0, 1). Dipakai untuk binary classification probability. | - |
| SiLU / Swish | - | Aktivasi: `x * sigmoid(x)`. Lebih halus dari ReLU. | - |
| softmax | - | Aktivasi output (0, 1) dengan total 1. Dipakai untuk multiclass probability. | - |
| tanh | - | Aktivasi output (-1, 1). Dipakai di LSTM gates dan RNN. | - |

### A.9 Inisialisasi, Optimizer & Scheduler

| Istilah (English) | Padanan Indonesia (jika lazim) | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| Adam | - | Adaptive Moment Estimation. Learning rate adaptif per parameter. | - |
| AdamW | - | Adam + weight decay terpisah. Optimizer default untuk sebagian besar model modern. | - |
| cosine annealing | - | Scheduler: learning rate turun mengikuti fungsi cosinus dari high ke near-zero. | - |
| gradient clipping | pemotongan gradien | Potong norm gradient ke threshold maksimal. Cegah exploding gradient. | - |
| Kaiming / He initialization | - | Inisialisasi weight untuk ReLU. Var = 2 / fan_in. | - |
| LAMB | - | Optimizer untuk large batch (>= 512). Layer-wise Adaptive Moments. | - |
| learning rate (LR) | laju pembelajaran | Step size update weight per iterasi. Hiperparameter paling sensitif. | - |
| momentum | - | Akumulasi arah gradien sebelumnya. Percepat konvergensi, redam osilasi. | - |
| OneCycleLR | - | Scheduler: LR naik lalu turun dalam satu siklus. Training lebih cepat. | - |
| ReduceLROnPlateau | - | Scheduler: LR turun jika metric validation berhenti membaik. Adaptif. | - |
| SGD (Stochastic Gradient Descent) | - | Optimizer klasik. Update weight = weight - lr * gradient. | - |
| StepLR | - | Scheduler: LR turun dengan faktor gamma setiap step_size epoch. Sederhana dan efektif. | - |
| warmup | - | LR naik linear dari 0 ke target selama N epoch/step pertama. Stabilkan awal training. | - |
| weight decay | - | Regularisasi L2 pada weight. Update: w -= lr * (grad + wd * w). | - |
| Xavier / Glorot initialization | - | Inisialisasi weight untuk tanh / sigmoid. Var = 2 / (fan_in + fan_out). | - |

### A.10 Loss Function

| Istilah (English) | Padanan Indonesia (jika lazim) | Pengertian | Catatan Penggunaan |
|---|---|---|---|
| BCEWithLogitsLoss | - | BCE + sigmoid dalam satu fungsi. Stabil numerik. Default binary classification. | - |
| CrossEntropyLoss | - | CE = -sum(y * log(p)). Loss default klasifikasi multiclass. | - |
| focal loss | - | CrossEntropy modifikasi: fokus pada hard sample. Atasi class imbalance. | - |
| Huber loss | - | Kombinasi MSE (dekat 0) + MAE (jauh dari 0). Robust, differentiable di mana-mana. | - |
| label smoothing | penghalusan label | Soft target: (1-eps)*onehot + eps/K. Cegah model terlalu overconfident. | - |
| MAE / L1Loss | - | Mean Absolute Error. Lebih robust terhadap outlier dibanding MSE. | - |
| MSELoss / MSE | - | Mean Squared Error. Loss default regresi. | - |
| reconstruction loss | loss rekonstruksi | MSE atau BCE antara input dan output autoencoder. Ukur kualitas rekonstruksi. | - |

### A.11 Indeks Pemakaian Pertama per Bab

Tabel ini menunjukkan di mana istilah Tingkat-1 **pertama kali muncul** dalam urutan modul. Gunakan untuk mengarahkan mahasiswa yang menemukan istilah yang belum dikenal di tengah bab ke definisi pertamanya.

| Istilah | First-use chapter | Link definisi |
|---|---|---|
| loss | W1 §2.2 | [A.10](#a10-loss-function) |
| gradient | W1 §2.4 | [A.2 Pelatihan](#a2-pelatihan) |
| optimizer | W1 §2.3 | [A.2 Pelatihan](#a2-pelatihan) |
| learning rate | W1 §2.3 | [A.9](#a9-inisialisasi-optimizer--scheduler) |
| epoch | W1 §2.3 | [A.2 Pelatihan](#a2-pelatihan) |
| batch | W1 §2.3 | [A.2 Pelatihan](#a2-pelatihan) |
| overfitting | W1 §2.5 | [A.2 Pelatihan](#a2-pelatihan) |
| baseline | W1 §2.5 | [A.5](#a5-eksperimen--reproduksibilitas) |
| sigmoid | W1 §2.2 | [A.8](#a8-aktivasi--normalisasi) |
| softmax | W1 §2.2 | [A.8](#a8-aktivasi--normalisasi) |
| ReLU | W1 §2.1 | [A.8](#a8-aktivasi--normalisasi) |
| kernel / stride / padding | W2 §2.2 | [A.1](#a1-arsitektur--model) |
| receptive field | W2 §2.2 | [A.1](#a1-arsitektur--model) |
| Kaiming init | W2 §2.4 | [A.9](#a9-inisialisasi-optimizer--scheduler) |
| regularization | W3 §2.2 | [A.2 Pelatihan](#a2-pelatihan) |
| dropout | W3 §2.2 | [A.2 Pelatihan](#a2-pelatihan) |
| batch norm | W2 §2.4 | [A.8](#a8-aktivasi--normalisasi) |
| augmentation | W2 §2.4 | [A.3 Data](#a3-data) |
| seed | W4 §2.1 | [A.5](#a5-eksperimen--reproduksibilitas) |
| checkpoint | W4 §2.7 | [A.5](#a5-eksperimen--reproduksibilitas) |
| accuracy / precision / recall | W3 §2.4 | [A.4 Evaluasi](#a4-evaluasi) |
| ablation | W3 §2.5 | [A.5](#a5-eksperimen--reproduksibilitas) |
| momentum / weight decay | W3 §2.3 | [A.9](#a9-inisialisasi-optimizer--scheduler) |
| embedding | W7 §1.1 | [A.1](#a1-arsitektur--model) |
| freeze / fine-tune | W7 §1.2 | [A.1](#a1-arsitektur--model) |
| attention | W7 §1.3 | [A.1](#a1-arsitektur--model) |
| Transformer | W7 §1.3 | [A.1](#a1-arsitektur--model) |
| leakage | W6 §2.3 | [A.3 Data](#a3-data) |

### A.12 Worked Examples untuk Istilah Prioritas

Bagian ini melengkapi definisi glosarium sebelumnya dengan satu contoh angka konkret per istilah. Cocok untuk referensi cepat saat mengerjakan lab.

**loss** - Scalar yang mengukur jarak prediksi ke target. Contoh MSE: prediksi = 0.9, target = 1.0. MSE = (0.9 - 1.0)² = 0.01. Makin kecil, makin baik.

**gradient** - Turunan parsial loss terhadap setiap parameter. Contoh: `∂L/∂w = 2.3` berarti jika `w` naik sedikit, loss naik 2.3× lipat. Optimizer akan menggerakkan `w` ke arah berlawanan.

**learning rate** - Skalar pengali gradient saat update. `w_baru = w_lama - lr × gradient`. Dengan `lr = 0.01` dan `gradient = 2.3`: `w_baru = w_lama - 0.023`. Terlalu besar → divergen; terlalu kecil → lambat konvergen.

**epoch** - Satu kali model melihat seluruh dataset training. Jika dataset 1000 sampel dan batch size 32, satu epoch = ⌈1000/32⌉ = 32 step. Setelah 10 epoch, setiap sampel sudah dilihat 10 kali.

**batch** - Subset sampel yang diproses sebelum satu update parameter. `batch_size = 32` berarti: hitung loss dari 32 sampel → rata-rata → backprop → satu step optimizer. Lebih besar → estimasi gradient lebih stabil, butuh lebih banyak memori.

**overfitting** - Model bagus di training, buruk di validasi. Cara deteksi: plot loss training vs validasi. Jika training turun tapi validasi stagnan atau naik → overfitting. Solusi pertama: regularization (dropout, weight decay) atau tambah data.

**baseline** - Model paling sederhana yang reasonable untuk perbandingan. Bukan model terlemah (seperti random) - melainkan "pendekatan terbaik yang diketahui sebelum kontribusi Anda." Baseline yang buruk merusak seluruh eksperimen.

**sigmoid** - `σ(x) = 1/(1 + e^{-x})`. Memetakan ℝ → (0, 1). Contoh: `σ(0) = 0.5`, `σ(2) = 0.88`, `σ(-2) = 0.12`. Digunakan di output head untuk binary classification (output = probabilitas kelas positif).

**softmax** - Memetakan vektor logits ke distribusi probabilitas. Contoh: logits `[2.0, 1.0, 0.1]` → softmax → `[0.659, 0.242, 0.099]`. Jumlah probabilitasnya selalu 1. Digunakan di output head untuk multiclass classification.

**ReLU** - `ReLU(x) = max(0, x)`. Contoh: `ReLU(-3) = 0`, `ReLU(2) = 2`. Sederhana, tidak vanish untuk x > 0. Default activation untuk layer tersembunyi.

**kernel / stride / padding** - Pada `Conv2d(in=1, out=1, kernel_size=3, stride=1, padding=0)` dengan input 5×5: kernel 3×3 bergeser di input; stride=1 berarti bergeser 1 pixel per langkah; padding=0 berarti tidak menambah border. Output size = (5 - 3 + 2×0)/1 + 1 = 3×3.

**receptive field** - Area input yang mempengaruhi satu neuron output. Satu Conv2d(3×3) → receptive field = 3×3. Dua Conv2d(3×3) bertumpuk → receptive field = 5×5 (setiap layer tambah 2 pixel). Semakin dalam, semakin besar area yang "dilihat" neuron.

**Kaiming init** - Inisialisasi bobot dengan `std = sqrt(2/fan_in)`. Angka 2 mengompensasi bahwa ReLU mematikan ~50% neuron. Tanpa ini, signal cenderung menyusut exponensial setiap layer yang dalam.

**regularization** - Penalti pada parameter besar untuk mencegah overfitting. L2 regularization (weight decay): loss_total = loss_task + λ × Σ(w²). Dengan λ=1e-4 dan suatu parameter w=0.5: kontribusi penalti = 1e-4 × 0.25 = 2.5×10⁻⁵.

**dropout** - Saat training, matikan setiap neuron secara acak dengan probabilitas p. `Dropout(p=0.3)` pada layer dengan 100 neuron → rata-rata 30 neuron dimatikan per forward pass. Saat inference, semua neuron aktif tetapi output dikali (1-p) untuk normalisasi ekspektasi.

**batch norm** - Normalisasi aktivasi dalam satu batch. Contoh: batch 32 gambar, channel 1. BatchNorm hitung mean dan std dari 32 nilai di channel itu → normalisasi ke mean=0, std=1 → scale dan shift dengan parameter γ, β yang dilatih. Membantu gradient flow dan memungkinkan learning rate lebih besar.

**augmentation** - Transformasi acak pada data training untuk memperluas keragaman tanpa data baru. Contoh: `RandomHorizontalFlip(p=0.5)` membalik gambar secara horizontal dengan peluang 50%. Model melihat gambar yang "berbeda" setiap epoch meski data asli sama.

**seed** - Angka untuk inisialisasi random number generator. `torch.manual_seed(42)` memastikan `torch.randn(3)` selalu menghasilkan angka yang sama di run berikutnya. Wajib set sebelum inisialisasi model, DataLoader shuffle, dan split dataset.

**checkpoint** - Snapshot model yang disimpan ke disk. Minimal berisi: `model.state_dict()`, `optimizer.state_dict()`, epoch, metrik, config, dan git hash. Tanpa git hash, Anda tidak bisa tahu kode mana yang menghasilkan checkpoint itu enam bulan kemudian.

**accuracy / precision / recall** - Pada dataset 100 sampel, 10 positif: TP=8, FP=3, FN=2, TN=87. Accuracy=(8+87)/100=0.95. Precision=8/(8+3)=0.73. Recall=8/(8+2)=0.80. Accuracy bisa menyesatkan di kelas imbalanced (kelas mayoritas mendominasi).

**ablation** - Eksperimen di mana satu komponen dihapus atau dinonaktifkan. "Ablation without focal loss": jalankan baseline yang identik kecuali ganti focal loss dengan cross-entropy biasa. Jika performa turun signifikan, komponen itu memang berkontribusi.

**momentum** - Dalam SGD dengan momentum, update weight tidak hanya dari gradient saat ini tetapi juga "kecepatan" dari langkah sebelumnya: `v = 0.9×v + lr×grad`. Seperti bola yang menggelinding - akumulasi gradien konsisten, reduksi gradien noisy.

**weight decay** - Penalti L2 yang diimplementasi langsung di optimizer (bukan di loss). Dalam AdamW: `w = w - lr × (grad + wd × w)`. Secara efektif "tarik" parameter ke arah nol setiap step. Default yang baik: `wd=1e-2` untuk AdamW.

**embedding** - Lookup table yang memetakan integer (token ID) ke vektor kontinu. `nn.Embedding(vocab_size=1000, embedding_dim=64)`: token 42 → baris ke-42 dari matriks 1000×64. Vektor inilah yang dilatih untuk mencerminkan relasi semantik antar token.

**freeze / fine-tune** - Freeze: `param.requires_grad = False` untuk semua parameter backbone. Model tidak berubah saat backward pass. Fine-tune: `requires_grad = True` untuk semua atau sebagian layer. Fine-tune penuh pada dataset kecil berisiko overfitting; freeze+head sering lebih aman.

**attention** - `Attention(Q, K, V) = softmax(Q×K^T / √d) × V`. Q/K/V adalah matriks yang di-project dari input. Softmax menghasilkan bobot "seberapa relevan K_j untuk Q_i". Output = rata-rata berbobot dari V. Cara kerjanya: setiap posisi "bertanya" (Q) dan mendapat jawaban berbobot dari semua posisi lain (K/V).

**Transformer** - Arsitektur berbasis self-attention yang tidak menggunakan recurrence. Input sequence diproses secara paralel: setiap token attend ke semua token lain secara simultan. Kunci: multi-head attention + positional encoding (karena tanpa recurrence model tidak tahu urutan).

**leakage** - Informasi dari test set (atau masa depan) yang "bocor" ke training. Contoh temporal: fit StandardScaler pada semua data sebelum split → scaler sudah "tahu" statistik test set. Konsekuensi: metrik validasi terlalu optimis; model gagal di deployment.

---

### A.13 Backpropagation Derivasi Manual {#a1-backpropagation-derivasi-manual}

*Catatan: untuk pemahaman praktis, lihat W2 §2.2. Bagian ini menyediakan derivasi lengkap 7-langkah untuk MLP 2-layer dengan MSE loss + sigmoid.*

![Backpropagation 7 Langkah: MLP 2-Layer dengan MSE Loss - chain rule dari loss mundur ke setiap parameter](../figures/fig14a_backprop_7steps.svg)

### Setup

MLP 2-layer: `d_in = 2`, `d_h = 2`, `d_out = 1`. Target `y`, prediksi `y_hat`. Aktivasi: sigmoid `σ(z) = 1/(1+e^{-z})`.

Forward pass:
```
z1 = W1 x + b1       # (d_h,)
h  = σ(z1)           # (d_h,)  
z2 = W2 h + b2       # (d_out,)
y_hat = z2           # untuk regresi; klasifikasi tambahkan sigmoid di sini
L = ½(y_hat - y)²    # MSE loss
```

### 7 Langkah Chain Rule

1. `∂L/∂z2 = y_hat - y`  <- turunan MSE terhadap output pre-activation
2. `∂L/∂W2 = (∂L/∂z2) · h^T`  <- shape `(d_out, d_h)`
3. `∂L/∂b2 = ∂L/∂z2`
4. `∂L/∂h = W2^T · (∂L/∂z2)`  <- rambat ke hidden state
5. `∂L/∂z1 = (∂L/∂h) ⊙ σ'(z1)`  <- terapkan turunan aktivasi; untuk ReLU: `σ'(z) = 1[z>0]`
6. `∂L/∂W1 = (∂L/∂z1) · x^T`  <- shape `(d_h, d_in)`
7. `∂L/∂b1 = ∂L/∂z1`

### Update Rule (SGD)

```python
W1 -= lr * dW1;  b1 -= lr * db1
W2 -= lr * dW2;  b2 -= lr * db2
```

Pola ini berulang di setiap layer. Untuk layer lebih dalam, cukup perpanjang langkah 4-6 ke layer sebelumnya. Inilah yang dikomputasi oleh `loss.backward()` dalam PyTorch secara otomatis.

Lab 1c (`lab_w1_mlp_numpy.ipynb`) mengimplementasikan ketujuh langkah ini dalam numpy dengan finite-difference gradient check untuk verifikasi.

---

## B. Checklist Eksperimen

Salin checklist ini di bagian atas setiap folder eksperimen baru (`experiments/<nama>/CHECKLIST.md`). Centang per item; eksperimen yang dilepas tanpa checklist terisi rawan kebohongan ke diri sendiri.

### B.1 Sebelum Menjalankan (Pre-flight)

- Pertanyaan riset ditulis dalam satu kalimat falsifiable.
- Baseline jelas dan adil (tanpa "kelemahan" tersembunyi).
- Satu metrik utama ditetapkan; metrik sekunder (bila ada) dicatat.
- Minimum 3 seed direncanakan per kondisi.
- Config YAML lengkap; tidak ada hyperparameter hardcoded di kode.
- Seed diset di `set_seed(...)` untuk Python, NumPy, Torch, CUDA.
- `torch.backends.cudnn.deterministic = True` (untuk reproduksi ketat).
- Split data train/val/test valid (tidak ada sampel sama; audit leakage bila relevan).
- Dry-run lulus (`--dry-run` atau `--limit_data 100`).
- Git commit bersih; commit hash terbaru yang akan dicatat.

### B.2 Selama Menjalankan (In-flight)

- Loss turun di epoch awal (sanity check).
- Akurasi train > chance level setelah 1 epoch.
- Monitoring TensorBoard / log berkala; tidak ada NaN.
- Checkpoint tersimpan per N epoch (bukan hanya terakhir).
- Progress bar / log berisi: epoch, loss, val metric, waktu per epoch.
- GPU utilization > 50% (bila <, ada bottleneck di data loader atau augmentasi).

### B.3 Setelah Selesai (Post-flight)

- Checkpoint `ckpt_best.pt` tersimpan dengan metadata: epoch, metric, git_hash, seed, config.
- Log training utuh tersimpan di `train.log`.
- `results.csv` diupdate dengan satu baris per run (seed, hyperparameter kunci, metrik).
- Plot utama di-generate (loss curve + metric curve).
- Deviasi dari pre-registration dicatat bila ada.
- GPU / pod dimatikan bila eksperimen di cloud.

### B.4 Sebelum Klaim Hasil

- Hasil direplikasi dengan minimal 3 seed; std dilaporkan.
- Test set *benar-benar* belum pernah dilihat dalam proses tuning (bukan validasi yang dinamai test).
- Perbedaan antar varian > 2× std (kalau tidak: panggil "tidak konklusif", bukan "lebih baik").
- Error analysis: minimal 20 sampel salah klasifikasi diperiksa manual.
- Bila hasil positif di luar dugaan: cari *kemungkinan bug yang menguntungkan* sebelum merayakan.

---

## C. Template dan Panduan Kerja

### C.1 Template Pre-Registration

Salin ke `docs/preregs/<YYYY-MM-DD>_<nama_eksperimen>.md` sebelum menulis kode eksperimen. Tanggal di nama file harus lebih awal dari commit pertama kode eksperimen.

```markdown
# Pre-Registration: <judul eksperimen singkat>

**Tanggal:** YYYY-MM-DD
**Peneliti:** <nama>
**Pembimbing:** <nama> (opsional)
**Commit repo saat menulis:** <hash>

## 1. Motivasi (2-3 kalimat)

<Mengapa pertanyaan ini layak dijawab sekarang. Konteks praktis atau teoretis.>

## 2. Hipotesis (satu kalimat falsifiable)

Saya memprediksi **<metode X>** akan menghasilkan **<metrik M>** yang lebih **<tinggi/rendah>**
sebesar **≥ Δ** dibandingkan dengan **<baseline B>** pada **<dataset D>**,
ketika dijalankan pada **<kondisi/protokol>**.

## 3. Protokol

- **Dataset & split:** <D, train/val/test, ukuran>
- **Baseline:** <B, kredensial: arsitektur + hyperparameter utama>
- **Intervensi (variabel yang diubah):** <X, cara penerapan>
- **Hyperparameter yang tetap:** <daftar>
- **Metrik utama:** <M, justifikasi dalam 1 kalimat mengapa ini yang paling relevan>
- **Metrik sekunder:** <daftar, hanya dicatat bukan sebagai kriteria sukses>
- **Seed:** [<s1>, <s2>, <s3>, ...] - minimum 3
- **Hardware & waktu yang diharapkan:** <GPU, estimasi jam>
- **Kriteria sukses:** Δ ≥ <nilai> dengan |σ_M_antarseed| ≤ <nilai>

## 4. Hasil yang Diharapkan (satu paragraf)

<Tebakan awal Anda sebelum melihat hasil. Menjaga kejujuran intuisi.>

## 5. Kondisi Kegagalan Hipotesis

<Kondisi konkret yang membuat Anda menyatakan H0 benar: misalnya "Δ < 1% atau σ > Δ".>

## 6. Amendments (diisi setelah eksperimen)

<Deviasi dari protokol di atas, dengan tanggal dan alasan. Kosongkan awalnya.>
```

### C.2 Template Laporan Capstone (outline)

Salin ke `docs/report.md` atau `docs/report.tex` pada awal minggu capstone. Tulis paragraf kecil setiap minggu; jangan menunda ke minggu 4.

```markdown
# <Judul Proyek>
Nama · Program Studi · Semester
Tanggal: <YYYY-MM-DD>

## Abstract
<1 paragraf (~150 kata): konteks, pertanyaan, metode, hasil utama, kontribusi.>

## 1. Introduction
- Motivasi praktis atau teoretis (1 paragraf).
- Pertanyaan penelitian eksplisit (satu kalimat).
- Ringkasan kontribusi (2-3 poin).

## 2. Related Work
- 2-4 paper inti; untuk tiap paper: apa yang mereka lakukan + bagaimana beda dengan proyek Anda.
- Hindari menulis "A did X. B did Y. C did Z." tanpa integrasi.

## 3. Method
- Deskripsikan baseline dan intervensi dengan cukup detail untuk replikasi.
- Notasi matematis jika membantu; hindari rumus yang hanya Anda sendiri mengerti.
- Sertakan gambar arsitektur bila relevan.

## 4. Experimental Setup
- Dataset: sumber, ukuran, split, pra-pemrosesan, audit leakage.
- Hyperparameter: tabel lengkap.
- Hardware: GPU, durasi training.
- Metrik: definisi dan justifikasi.
- Seeds: nilai yang digunakan.

## 5. Results
- Tabel utama: baseline vs intervensi, dengan ±σ dari ≥3 seed.
- Plot-plot pendukung (error bar, caption mandiri).
- Ablasi bila ada.
- Jujur: bila hasil tidak sesuai prediksi pre-reg, *nyatakan*.

## 6. Error Analysis
- Contoh konkret model gagal; kelompokkan polanya.
- Tautkan ke keputusan desain: apa yang dapat diperbaiki?

## 7. Discussion
- Apa yang terbukti dan tidak dari pertanyaan awal.
- Deviasi dari pre-registration.
- Keterbatasan yang jujur (dataset, hardware, interpretasi).

## 8. Conclusion & Future Work
- 1 paragraf kesimpulan.
- 1 paragraf future work - pertanyaan berikutnya yang paling menarik.

## References
<Format konsisten: APA atau IEEE; minimum 6 referensi untuk capstone.>

## Appendix
- Hyperparameter yang tidak muat di main text.
- Plot tambahan.
- Screenshot demo.
```

### C.3 Template LLM Interaction Log

Salin ke `docs/llm_log.md`. Update setiap pemakaian LLM yang non-trivial; baris pendek lebih baik daripada baris sempurna.

```markdown
# LLM Interaction Log
Proyek: <nama proyek>

| Tanggal | Alat | Tujuan | Prompt kunci | Verifikasi | Hasil |
|---------|------|--------|--------------|------------|-------|
| YYYY-MM-DD | Claude 3.5 | Parse format CSV tidak standar | "Tulis fungsi Python yang..." | Run di 3 sampel CSV | Dipakai, minor fix. |
| YYYY-MM-DD | Copilot | Auto-complete training loop | inline completion | Bandingkan dengan template/src/train.py | Ditolak 40%, diterima 60%. |
| YYYY-MM-DD | ChatGPT | Pilih learning rate | "Apa LR default untuk fine-tune BERT?" | Verifikasi dengan paper original | Disesuaikan dengan sweep sendiri. |

## Prinsip yang saya terapkan (ingatkan diri sendiri)

1. Output LLM untuk logika/reasoning **selalu** diverifikasi dengan test kecil.
2. Output LLM untuk hyperparameter **selalu** diikuti dengan sweep atau validasi.
3. Tidak pernah menyalin kode LLM tanpa membacanya per baris.
4. Jika LLM "menciptakan" fungsi/library/API: cek dokumentasi resmi SEBELUM pakai.
```

### C.4 Template Experiment Log (jurnal eksperimen)

Salin ke `docs/experiments/<YYYY-MM-DD>_<nama>.md`. Satu file per eksperimen besar.

```markdown
# Experiment Log: <nama>
**Tanggal mulai:** YYYY-MM-DD
**Pre-reg:** `docs/preregs/<file>.md`
**Config:** `configs/<file>.yaml`
**Commit:** <hash>

## Hasil utama
| Seed | <Metrik>  | Catatan |
|------|-----------|---------|
| 42   | 0.823     |         |
| 123  | 0.819     |         |
| 2024 | 0.831     |         |
| **μ ± σ** | **0.824 ± 0.006** | |

## Perbandingan dengan pre-reg
- Hipotesis: ...
- Kriteria sukses: Δ ≥ 0.03
- Δ aktual: +0.042
- Verdict: **terkonfirmasi**

## Deviasi protokol (bila ada)
- Tidak ada. / <daftar>

## Temuan tambahan
- Di kelas minoritas, metrik turun 1.2% - layak diselidiki.

## Langkah berikutnya
- Ablasi per-class coverage.
- Bandingkan dengan varian Y.
```

### C.5 Template Paper Notes

Salin ke `docs/papers/<short_title>.md`. Format Bab 9.

```markdown
# <Judul ringkas> - <Authors, Venue, Year>

**Link:** <arxiv atau doi>
**Tanggal baca:** YYYY-MM-DD

## TL;DR (1-2 kalimat)
<Klaim utama paper, dalam kalimat Anda sendiri.>

## Metode (3-5 kalimat)
<Bagaimana mereka melakukannya. Rumus penting bila relevan.>

## Bukti (2-3 kalimat)
<Dataset + metrik + hasil utama. Angka konkret.>

## Pertanyaan / Kritik (3-5 poin)
- ...
- ...

## Hubungan dengan proyek saya
<Satu kalimat: mengapa paper ini relevan (atau tidak).>
```

### C.6 Template Entri Portofolio Mandiri {#c6-template-entri-portofolio}

Salin satu blok ini ke sel markdown di `notebooks/portofolio_mandiri.ipynb` untuk setiap pekan. Isi tiap bagian dengan kalimat lengkap - hindari poin-poin kosong.

```markdown
## Entri Pekan <N> - Bab <XX>

**Tanggal:** YYYY-MM-DD
**Pertanyaan yang dijawab:** <Satu kalimat: pertanyaan atau topik konkret yang ingin Anda jelajahi minggu ini.>
**Dimensi yang dicakup:** implementasi / analisis / desain / arsitektur baru (ceklis yang relevan)

### Setup
*Apa yang dikerjakan, alat/dataset/config yang dipakai, dan berapa lama.*

### Temuan
*Apa yang ditemukan. Sertakan angka, grafik, atau output kunci. Hindari "saya berhasil" tanpa angka.*

### Kejutan
*Apa yang tidak sesuai ekspektasi. Jika semua sesuai ekspektasi, tanyakan pada diri sendiri apakah ekspektasi awalnya cukup spesifik.*

### Yang Akan Diubah
*Jika mengulang eksperimen ini minggu depan, apa satu hal yang akan dilakukan berbeda dan mengapa.*

### Koneksi ke Pekan Sebelumnya
*Bagaimana pekerjaan pekan ini terhubung atau bertentangan dengan pekerjaan pekan lalu. Untuk Pekan 4 (entri pertama): tulis motivasi awal mengapa pertanyaan ini dipilih.*
```

### C.7 Panduan Slot Presentasi Komponen Mandiri (10 Menit)

Setiap awal sesi (mulai Pekan 5), ada slot 10 menit per orang untuk mempresentasikan Komponen Mandiri pekan sebelumnya. Panduan berikut membantu Anda menggunakan waktu secara efektif.

**Struktur yang disarankan:**

| Segmen | Durasi | Isi |
| --- | --- | --- |
| Setup | 2 menit | Pertanyaan yang dijawab dan motivasinya; apa yang ingin dibuktikan atau dipahami. |
| Temuan | 5 menit | Hasil konkret (angka, grafik, kode); apa yang terkonfirmasi, apa yang tidak. |
| Tanya jawab | 3 menit | Satu pertanyaan terbuka yang Anda ajukan ke audiens; atau satu hal yang masih membingungkan. |

**Hal yang perlu disiapkan sebelum presentasi:**
- [ ] Satu angka atau output konkret yang bisa ditunjukkan (bukan hanya narasi).
- [ ] Satu pertanyaan terbuka atau satu hal yang masih belum jelas.
- [ ] Entri portofolio Pekan N sudah terisi sebelum presentasi dimulai.

**Hal yang tidak perlu disiapkan:**
- Slide formal tidak diwajibkan - notebook terbuka sudah cukup.
- Tidak perlu menampilkan seluruh kode; cukup bagian yang paling relevan dengan temuan.

### C.8 Template Lab Replikasi Arsitektur (Eksplorasi Arsitektur Baru)

Template ini dipakai saat Anda ingin mempelajari satu keluarga arsitektur NN yang *belum* dibahas di lab wajib minggu itu. Tujuan: forward pass berhasil dijalankan pada *toy task*, bukan state-of-the-art. Template di bawah mengikuti pola pelaporan yang sama dengan template entri portofolio (C.6), dengan tambahan bagian spesifik untuk replikasi arsitektur.

```markdown
## Entri Arsitektur - Pekan <N>

**Arsitektur dipilih:** <nama; mis. "GRU", "Multi-Head Attention 4-head", "VAE"> 
**Referensi utama:** <1-2 paper atau blog post; tulis DOI/arXiv ID bila ada>
**Toy task:** <deskripsi singkat dataset dan target; mis. "klasifikasi sequence biner panjang 16">

### 1. Apa yang dilakukan arsitektur ini, dalam 3 kalimat
*Jelaskan input->output dan ide inti yang membedakannya dari arsitektur terdekat yang sudah Anda kenal. Untuk GRU: jelaskan beda dengan LSTM. Untuk VAE: jelaskan beda dengan AE biasa.*

### 2. Implementasi minimal
*Cuplikan kode forward pass (20-40 baris) yang cukup untuk dibaca tanpa scrolling. Gunakan torch tensor ops atau library primitives; hindari menyalin utuh dari repo eksternal tanpa pemahaman.*

### 3. Sanity check
- [ ] Output shape sesuai yang diharapkan.
- [ ] Backward pass jalan (tidak ada tensor yang *detached*).
- [ ] Parameter yang seharusnya dilatih muncul di `.parameters()`.

### 4. Learning curve pada toy task
*Satu plot (loss vs epoch atau metrik sukses). Maksimal 10-30 epoch. Tujuan: membuktikan arsitektur bisa belajar sesuatu, bukan mengejar akurasi tinggi.*

### 5. Perbandingan dengan arsitektur yang sudah dipelajari
*1-2 paragraf. Kapan arsitektur baru ini lebih cocok? Kapan lebih boros (parameter, waktu, memori)? Apakah Anda bisa membayangkan dataset di lab yang akan memberi manfaat konkret bagi arsitektur ini?*

### 6. Pertanyaan yang muncul
*Satu pertanyaan yang Anda ingin kejar minggu depan (dapat memicu jalur Implementasi atau Analisis di entri portofolio berikutnya).*
```

**Kriteria sukses Jalur 4:**
- Arsitektur dibangun dengan kode yang Anda pahami (bukan copy-paste utuh). Diterima: menyalin struktur umum, mengetik ulang dan memodifikasi sendiri. Tidak diterima: menempel modul utuh dari Hugging Face tanpa bisa menjelaskan perannya.
- Learning curve menunjukkan loss menurun atau metrik sukses meningkat. Arsitektur yang stagnan *juga* dilaporkan - sebutkan hipotesis Anda tentang kenapa (mis. "hyperparameter tidak di-tune", "toy task terlalu mudah").
- Koneksi eksplisit ke arsitektur yang sudah dibahas di lab wajib. Tidak cukup menulis "GRU lebih ringan dari LSTM"; tulis "GRU saya kurang 1 gate dibanding LSTM, dan parameter berkurang ~25%, tapi pada toy task ini akurasi hampir sama".

### C.9 Template Komponen Mandiri

Template generik untuk semua Komponen Mandiri (W4-W11). Mulai W4, setiap minggu Anda memilih satu pertanyaan atau topik bebas dari materi minggu itu, lalu menjawabnya seperti seorang peneliti - mengimplementasikan, menganalisis, merancang, dan jika relevan menjelajahi arsitektur baru, semuanya dalam satu mini-proyek terintegrasi.

**Cara memilih topik:**
Tanyakan pada diri sendiri: *"Apa yang ingin saya buktikan, pahami, atau buat dari materi minggu ini?"* Pilih topik yang cukup spesifik untuk dikerjakan dalam beberapa jam, dan cukup menarik untuk dipresentasikan 10 menit. Boleh memakai dataset lab minggu ini atau dataset lain yang relevan.

**Empat dimensi riset** (bukan pilihan eksklusif - seorang peneliti baik mencakup keempatnya secara alami):

| Dimensi | Pertanyaan panduan |
| --- | --- |
| **Implementasi** | Apa yang saya bangun atau ubah? Apa hasilnya dibanding sebelum? |
| **Analisis** | Apa yang saya amati? Apa yang tak terduga? Hipotesis apa yang muncul? |
| **Desain** | Keputusan apa yang saya buat dan mengapa? Apa yang akan saya ubah jika mengulangi? |
| **Eksplorasi arsitektur** | Apakah ada keluarga arsitektur baru yang relevan untuk dijelajahi? (opsional) |

**Kriteria sukses per entri** (detail di Rubrik Kompetensi 10, [13_Rubrik_Penilaian.md](13_Rubrik_Penilaian.md)):
- Pertanyaan awal ditulis eksplisit - bukan hanya "saya mencoba X".
- Bukti eksekusi jelas (kode commit, plot, atau dokumen).
- Temuan dituliskan dengan skeptisisme yang wajar - apa yang *tidak* Anda yakini juga dicatat.
- Koneksi eksplisit ke konsep bab minggu itu.

**Luaran standar:** Entri portofolio di `notebooks/portofolio_mandiri.ipynb` sesuai template C.6. Siap presentasi 10 menit di awal pekan berikutnya sesuai panduan C.7.

### C.10 Template Weekly Experiment Log (Ringan)

Template ringan untuk catatan harian rutin, berbeda dari C.4 yang dirancang untuk satu eksperimen besar. Isi dalam 5-10 menit per hari; cocok untuk mencatat progres saat Anda berganti-ganti tugas kecil atau menjalankan banyak eksperimen pendek.

**Format tabel (rekomendasi):**

```markdown
# Experiment Log Ringan - Pekan <N>

**Proyek:** <nama proyek>
**Target minggu ini:** <satu kalimat>

| Hari | Kerjaan | Hasil Kunci | Kendala | Besok |
|------|---------|-------------|---------|-------|
| Senin | | | | |
| Selasa | | | | |
| Rabu | | | | |
| Kamis | | | | |
| Jumat | | | | |
```

**Format naratif (alternatif):**

```markdown
# Experiment Log Ringan - Pekan <N>

## <Hari>, <YYYY-MM-DD>
**Kerjaan:** ...
**Hasil (satu angka/plot):** ...
**Kendala:** ...
**Besok:** ...
```

**Contoh terisi (format tabel):**

| Hari | Kerjaan | Hasil Kunci | Kendala | Besok |
|------|---------|-------------|---------|-------|
| Senin | Konfigurasi focal gamma sweep: 3 config (1.0, 2.0, 3.0) | smoke test semua config lolos | - | Jalankan seed 42 untuk ketiga config |
| Selasa | Jalankan 3 eksperimen, seed 42 | gamma=2.0 F1 tertinggi (0.72) | gamma=3.0 loss NaN setelah epoch 8 -> perlu gradient clipping | Periksa log gamma=3.0; jalankan seed 43 untuk 1.0 dan 2.0 |
| Rabu | Debug gamma=3.0 NaN; tambah clip=1.0 | NaN hilang, training stabil | - | Selesaikan seed 43-44; siapkan tabel agregat |
| Kamis | 6 run selesai (3 gamma x 2 seed) | Tabel agregat selesai | gamma=3.0 lebih buruk dari 2.0 (F1 0.68 vs 0.72) | Tulis laporan 1 halaman |
| Jumat | Tulis laporan; commit semua config + hasil | Laporan selesai, commit `f41a2b3` | - | Pekan depan: ablation dengan class weighting |

**Kapan pakai C.10 vs C.4:**

| Situasi | Pakai |
| --- | --- |
| Satu eksperimen besar (>3 hari, multi-seed, ablation kompleks) | C.4 (Experiment Log) |
| Berganti-ganti tugas ringan, banyak eksperimen pendek | C.10 (Weekly Log Ringan) |
| Butuh catatan harian cepat yang tidak akan jadi laporan formal | C.10 |
| Eksperimen yang akan masuk laporan atau paper | C.4 |

Aturan praktis: jika Anda tidak yakin, mulai dengan C.10. Jika di pertengahan pekan Anda sadar eksperimennya lebih besar dari perkiraan, pindah ke C.4 - catatan C.10 bisa menjadi draft untuk C.4.

### C.11 Template Update Mingguan ke PI

Template salin-pakai untuk update rutin ke dosen pembimbing/PI, biasanya dikirim sebelum sesi mingguan atau di awal pekan. Bedanya dari C.4 dan C.10: kedua template itu *inward-facing* (catatan untuk diri sendiri), sedangkan C.11 *outward-facing* untuk komunikasi dengan supervisor. Konsistensi mingguan membangun kepercayaan PI lebih cepat daripada hasil spektakuler yang muncul mendadak.

**Format (4 bagian + 1 pertanyaan):**

```markdown
## Weekly Update: <Nama> - Pekan <X>

**Progress minggu ini:**
- [Eksperimen A]: selesai 3 seed. F1 minor 0.672 ± 0.014. Hipotesis terkonfirmasi.
- [Eksperimen B]: baru 1 seed (seed 42 berjalan; seed 43-44 dalam antrean).

**Kendala:**
- GPU time untuk B lebih lambat dari estimasi. Butuh 2 hari lagi.

**Rencana minggu depan:**
- Selesaikan 3 seed B, analisis perbandingan A vs B.
- Jika B tidak mengkonfirmasi hipotesis, tulis analisis penyebab.

**Satu pertanyaan:**
- Gamma sweep untuk focal loss: saya usul [1.0, 2.0, 3.0, 5.0]. Apakah rentang ini cukup, atau ada nilai lain yang sebaiknya diuji?
```

**Tiga prinsip update yang baik:**

1. **Spesifik dengan angka.** "Akurasi naik" tidak informatif; "F1 minor 0.612 -> 0.672, Δ = +0.06" bisa langsung dipakai PI untuk keputusan.
2. **Kendala disebut lebih awal, bukan disembunyikan di akhir.** PI tidak bisa membantu masalah yang tidak ia ketahui. Jika GPU habis, data ternyata rusak, atau hasil tidak masuk akal, sampaikan segera, bukan seminggu kemudian.
3. **Selalu ajukan satu pertanyaan.** Pertanyaan yang baik memberi PI sesuatu untuk direspon dengan cepat. Satu pertanyaan konkret lebih baik daripada tiga pertanyaan abstrak.

> [!TIP]
> Pemilihan saluran pengiriman (email, chat, tatap muka) dibahas di [W4 §3.5](04_W4_Reproducibility_Experiment_Matrix.md#35-komunikasi-efektif-dengan-dosen-pembimbing). Default untuk update rutin: email atau shared document yang bisa diarsipkan.

---

### C.12 Template Repo Map {#c12-template-repo-map}

Salin template ini ke `repo_map.md` di root folder eksperimen Anda setiap kali mengadopsi repo baru.

```markdown
# Repo Map: [nama-repo]

**URL:** [github link]  
**Paper:** [judul paper jika ada]  
**Dibaca oleh:** [nama]  
**Tanggal:** [YYYY-MM-DD]

## Entry Point

- Main script: `[file]`
- Cara menjalankan: `[command]`

## Model

- File definisi model: `[file:line]`
- Input shape: `[shape]`
- Output shape: `[shape]`
- Arsitektur ringkas: [1-2 kalimat]

## Loss

- File: `[file:line]`
- Loss function: `[nama]`
- Target shape: `[shape]`

## Config

- Format: [YAML / argparse / hardcoded]
- File utama: `[file]`
- Hyperparameter penting: [list]

## DataLoader

- File: `[file:line]`
- Dataset yang dipakai: `[nama]`
- Preprocessing: [1-2 kalimat]

## Pertanyaan Terbuka

- [ ] [pertanyaan yang belum terjawab saat membaca pertama]
- [ ] ...

## Modifikasi yang Direncanakan

- [ ] [perubahan spesifik yang Anda inginkan]
```

---

### C.13 Proposal Capstone Satu Halaman {#c13-capstone-proposal-one-pager}

Template untuk luaran wajib W11. Isi semua bagian sebelum pertahanan framing W12.

```markdown
# Capstone Proposal: [judul singkat]

**Peneliti:** [nama]  
**Tanggal:** [YYYY-MM-DD]  
**Status:** [Draft / Final / Approved]

## 1. Pertanyaan Penelitian

[Satu kalimat falsifiable. Contoh: "Apakah X lebih baik dari Y pada Z, diukur dengan M, dengan delta minimal D?"]

## 2. Baseline dan Intervensi

**Baseline:** [apa, dari mana, mengapa ini yang dipilih]  
**Intervention:** [apa yang berbeda dari baseline]  
**Relevansi:** [mengapa perubahan ini menjawab pertanyaan penelitian]

## 3. Matriks Eksperimen

| Run | Loss | Arch | Freeze | LR | Seed | Expected outcome |
|---|---|---|---|---|---|---|
| baseline | CE | ResNet | block1 | 3e-4 | 42,43,44 | F1 ~0.75 |
| intervention | Focal | ... | ... | ... | ... | F1 >0.78? |

## 4. Metrik Sukses dan Kegagalan

**Dikonfirmasi jika:** [kondisi eksplisit]  
**Disangkal jika:** [kondisi eksplisit]  
**Metrik utama:** [nama + threshold]  
**Metrik pengaman:** [yang tidak boleh memburuk]

## 5. Feasibility dan Risiko

- Data tersedia: Ya / Tidak / [catatan]
- Compute estimate: [jumlah run x waktu per run x cost per jam]
- Risiko utama: [list]
- Fallback baseline: [jika rencana utama gagal]

---
Disetujui oleh: _____________  Tanggal: _____________
```

---

### C.14 Protokol Ablasi per Modalitas {#c14-per-modalitas-ablation-protocol}

Template untuk W9 Lab 8 dan capstone multimodal. Copy ke `docs/ablation_protocol.md`.

```markdown
# Protokol Ablasi per Modalitas

**Experiment:** [nama]  
**Modalitas:** [daftar modalitas yang digunakan]

## Ablation Conditions

| ID | Image | Text | Sensor | Notes |
|---|---|---|---|---|
| full | Real | Real | Real | Baseline full model |
| img_only | Real | MASKED | MASKED | Single-modal ceiling |
| text_only | MASKED | Real | MASKED | Single-modal ceiling |
| sensor_only | MASKED | MASKED | Real | Single-modal ceiling |
| img+text | Real | Real | MASKED | Does sensor add value? |
| img+sensor | Real | MASKED | Real | Does text add value? |
| text+sensor | MASKED | Real | Real | Does image add value? |
| rand_img | RANDOM | Real | Real | Cek modalitas terabaikan |
| rand_text | Real | RANDOM | Real | Cek modalitas terabaikan |
| rand_sensor | Real | Real | RANDOM | Cek modalitas terabaikan |

## Masking Strategy

- MASKED: [zero padding / null token / completely absent]
- RANDOM: [Gaussian noise same shape / shuffled real data]

## Results Table

| Condition | Metric 1 | Metric 2 | vs Full |
|---|---|---|---|
| full | | | - |
| img_only | | | |
| ...| | | |

## Diagnosis

- Modalitas terabaikan ditemukan? [Ya/Tidak]
- Modalitas mana yang diabaikan? [atau "tidak ada yang terkonfirmasi"]
- Evidence: [gradient norms / ablation delta]
- Mitigasi yang diterapkan: [modalitas dropout / null token / tidak ada]
```

---

## D. Referensi, Peta, dan Komunikasi

### D.1 Alat Riset Ringan {#d1-alat-riset-ringan}

Alat ringan yang berguna untuk riset sehari-hari, tidak perlu bab penuh.

### Streamlit Demo Minimal

```python
import streamlit as st
import torch
from PIL import Image

st.title("Model Inspection Demo")

uploaded = st.file_uploader("Upload image", type=["png", "jpg"])
if uploaded:
    img = Image.open(uploaded)
    st.image(img, caption="Input")

    # model inference di sini
    # ...

    st.write("Prediction:", prediction)
    st.write("Confidence:", confidence)
    # Selalu tampilkan kasus gagal jika ada
```

Jalankan: `streamlit run demo/app.py`. Deploy: `streamlit cloud` (gratis untuk proyek publik).

### Gradio Quick Annotation

```python
import gradio as gr

def annotate(image):
    # Return prediction + explanation
    return "class_label", float(confidence)

iface = gr.Interface(fn=annotate, inputs="image", outputs=["text", "number"])
iface.launch()
```

### RunPod Quick Workflow

```bash
# Launch + SSH
runpodctl create pod --gpuType "NVIDIA GeForce RTX 3080" --imageName "runpod/pytorch:latest"
ssh -i key.pem root@[pod-ip]

# Transfer checkpoint
rsync -avz experiments/run1/ root@[pod-ip]:/workspace/

# Monitor + pull result
watch nvidia-smi
rsync -avz root@[pod-ip]:/workspace/experiments/ experiments/remote/

# WAJIB: matikan pod setelah selesai
runpodctl remove pod [pod-id]
```

---

### D.2 Sepuluh Kompetensi - Detail dan Pemetaan Minggu {#d2-sepuluh-kompetensi}

Daftar berikut menguraikan sepuluh kompetensi inti yang dilatih sepanjang bootcamp 11 minggu dan 4 minggu capstone. Pendahuluan §3 membahasnya dalam tiga gelombang naratif; bagian ini menyediakan pemetaan minggu per kompetensi sebagai rujukan saat Anda menyusun portofolio atau menilai progres.

| No | Kompetensi | W Dilatih |
|:---|:---|:---|
| K1 | Memahami sistem ML/DL dalam praktiknya | W1–W9 |
| K2 | Menerjemahkan ide menjadi eksperimen | W3–W4, W11, Capstone |
| K3 | Eksperimen reproduksibel | W3, W4, Capstone |
| K4 | Validasi data dan pra-pemrosesan | W3, W6, W9 |
| K5 | Alat AI sebagai pendukung | W7–W8 |
| K6 | Adopsi repository riset | W7, W10, Capstone |
| K7 | Membuat alat pendukung riset ringan | W12–W15 |
| K8 | Mengadopsi platform dan tool baru | W8, Capstone |
| K9 | Berkembang mandiri | W10, W11, Capstone |
| K10 | Eksplorasi Mandiri & Komunikasi | W4–W11 |

Catatan: satu kompetensi umumnya dilatih di beberapa minggu, bukan satu bab tunggal. K1 (pemahaman sistem) berlanjut sepanjang bootcamp karena setiap arsitektur baru menambah satu lapisan pemahaman.

> [!TIP]
> Pengelompokan tiga gelombang: **W1–W4** melatih K1–K3 (sistem, desain eksperimen, reproduksibilitas), **W6–W9** melatih K4–K6 (data, AI tools, repo, multimodal), **W10–W11 + Capstone** melatih K7–K9 (alat pendukung, platform baru, pengembangan mandiri). K10 (Eksplorasi Mandiri & Komunikasi) berjalan paralel mulai W4 sebagai kebiasaan reflektif mingguan. Bahkan dosen pun mengasah K9 sepanjang karier.

---

### D.3 Big Map Lintas Minggu {#d3-big-map}

Big Map adalah satu pertanyaan yang dikembalikan setiap minggu: *tensor shape apa yang masuk, shape apa yang keluar, dan keluarga model apa yang secara alami cocok untuk pemetaan itu?* Tabel berikut merangkum baris peta untuk W1-W11.

| Minggu  | Baris peta besar                                            |
| ------- | ----------------------------------------------------------- |
| W1      | `(F,) -> (1,)`, `(1,)`, `(N,)` (tabular)                    |
| W2-W3   | `(C, H, W) -> (N,)` (citra)                                 |
| W4      | sama seperti W2-W3, fokus alur kerja                        |
| W5      | `(T, F) -> (1,)`, `(N,)`, `(T'', 1)` (sequence)             |
| W6      | sama seperti W5, fokus representasi & leakage               |
| W7      | `(T,) -> (N,)`, `(1,)`, `(T, N)` (teks)                     |
| W8      | input apa pun yang memanfaatkan prior dari pretrained model |
| W9      | beberapa tensor -> prediksi bersama (multimodal)            |
| W10-W11 | sintesis lintas keluarga                                    |

Peta ini bertambah lengkap setiap minggu sehingga deep learning perlahan terlihat sebagai satu lanskap, bukan banyak teknik yang terputus.

---

### D.4 Kebiasaan Riset per Minggu {#d4-kebiasaan-riset}

Setiap minggu memperkenalkan satu kebiasaan riset yang tetap dipakai setelahnya. Bootcamp dibuat kumulatif, bukan mulai ulang setiap Senin. Kolom *contoh operasional* memberi gambaran konkret tentang penerapan kebiasaan itu dalam pekerjaan sehari-hari.

| Minggu | Kebiasaan riset                                            | Contoh operasional                                                                                                                                                       |
| ------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| W1     | Observasi sebelum kesimpulan                               | Sebelum bilang "model A lebih baik", tulis dulu apa yang dilihat di kurva (angka, bentuk), baru tafsirkan.                                                               |
| W2     | Smoke test tiga level                                      | Sebelum training 30 epoch, jalankan import test → dummy forward → overfit one batch. Stop kalau salah satu gagal.                                                        |
| W3     | Ubah satu hal pada satu waktu                              | Saat membandingkan focal vs CE, samakan optimizer, lr, seed, augmentasi. Hanya loss yang berubah.                                                                        |
| W4     | Reproduksibilitas, keterlacakan, matriks eksperimen        | Setiap run punya `config.yaml + git_hash + seed`; semua ablation tertulis di matriks sebelum eksekusi.                                                                   |
| W5     | Diagnosis sequence panjang dan justifikasi arsitektur      | Saat training LSTM tidak konvergen, plot gradient norm per-layer dulu sebelum tweak hyperparameter.                                                                      |
| W6     | Validasi preprocessing dan kewaspadaan leakage             | Hitung mean/std HANYA dari train; jangan pernah lihat test sebelum angka final.                                                                                          |
| W7     | Verifikasi kode AI, inspeksi tokenisasi, repo primer       | Sebelum commit kode dari LLM, baca baris demi baris dan jalankan minimal smoke test sederhana.                                                                           |
| W8     | Literasi model card, pilihan adaptasi, baseline yang adil  | Sebelum fine-tune, baca model card: dataset asal, lisensi, batas penggunaan, evaluasi yang sudah ada.                                                                    |
| W9     | Ablation per modalitas dan multimodal failure analysis     | Setelah multimodal model jalan, jalankan run dengan satu modalitas di-zero atau di-acak; jika metric tidak turun, modalitas itu diabaikan.                               |
| W10    | Membaca paper tiga putaran dan menerjemahkannya ke kode    | Putaran 1 (judul-abstrak-kesimpulan), putaran 2 (figur dan tabel), putaran 3 (rumus). Stop di putaran 1 jika tidak relevan.                                              |
| W11    | Input→Middle→Output framing, triage literatur, seleksi gap | Tulis hipotesis falsifiable (`Δ ≥ X dengan p < Y`), bukan "saya pikir model A lebih baik". Framing yang baik punya gap yang tidak bisa diisi pipeline standar apa adanya. |

---

### D.5 Kontrak Belajar - Checklist {#d5-kontrak-belajar}

Modul ini paling efektif jika Anda mengikuti delapan kesepakatan berikut. Pendahuluan §7 menjelaskan filosofinya dalam paragraf naratif; bagian ini menyediakan checklist yang bisa dicetak atau ditempel di meja kerja.

1. **Mengerjakan lab pada minggu yang sama dengan membacanya.** Menunda lab berarti menunda pemahaman, dan minggu berikutnya akan terasa seperti deretan istilah yang tidak tersambung.
2. **Menulis catatan eksperimen sendiri.** Bukan menyalin output, tetapi menjawab: apa yang aku jalankan, apa yang terjadi, apa arti hasilnya, dan apa yang akan kulakukan selanjutnya. Format catatan ada di [Lampiran C.4](#c4-template-experiment-log-jurnal-eksperimen) atau [C.10](#c10-template-weekly-experiment-log-ringan).
3. **Memakai LLM, coding copilot, dan pencarian web - dengan tanggung jawab.** Sebelum memasukkan kode yang tidak Anda mengerti, baca baris demi baris dan pastikan Anda bisa menjelaskan fungsinya tanpa bantuan. W7 membahas protokol ini lebih dalam.
4. **Mengajukan pertanyaan.** Pertanyaan yang dirumuskan dengan cermat adalah salah satu kompetensi yang dinilai di rubrik. Jika sesuatu terasa kabur setelah membaca dua kali, tulis pertanyaan seringkas mungkin dan bawa ke sesi tatap muka.
5. **Komponen Mandiri mingguan, mulai W4.** Pilih satu pertanyaan atau topik bebas dari materi minggu itu, kerjakan seperti peneliti, catat di `notebooks/portofolio_mandiri.ipynb`, presentasi 10 menit di awal sesi berikutnya. Format dan kriteria: [Lampiran C.9](#c9-template-komponen-mandiri).
6. **Breadth Check sebelum Capstone.** Tunjukkan forward pass berjalan dari **empat dari lima keluarga arsitektur**: MLP (Lab 0/1c), CNN (Lab 1), RNN/LSTM (Lab 3b), Transformer (Lab 6b/W7), Autoencoder (Lab 7b). Ini memastikan Anda lulus sebagai asisten yang bisa mengenali dan memodifikasi keluarga NN yang muncul di paper lintas domain, bukan hanya spesialis CIFAR-10.
7. **Eksperimen yang gagal tetapi didokumentasikan dengan baik dinilai setara dengan yang berhasil.** Yang dievaluasi adalah kualitas pemikiran, analisis, dan dokumentasi Anda, bukan apakah hipotesis terkonfirmasi. Hasil negatif yang dijelaskan dengan jujur lebih bernilai daripada hasil positif yang tidak bisa dipertanggungjawabkan.
8. **Mulai dari aplikasi, ditopang teori.** Modul memperkenalkan ide melalui run konkret dan perbandingan terlebih dahulu. Teori berat (derivasi backprop manual, optimizer theory long-form) tersedia di Lampiran A untuk dibaca setelah Anda punya hasil konkret untuk diinterpretasi.

---

### D.6 Indeks Lab Modul + Komponen Mandiri {#d6-indeks-lab}

Lab-lab modul memakai basis kode dan dataset yang sama, lalu bertambah kompleks dari minggu ke minggu. Daftar berikut memetakan lab inti, lab breadth (untuk Kontrak Belajar poin 6), dan panduan Komponen Mandiri berbasis pertanyaan yang dikerjakan setiap minggu mulai W4.

### Lab Inti (wajib)

- **Lab 0 (W1)** - Tabular MLP: latih MLP pada satu dataset tabular bersama dengan tiga formulasi tugas (regression, binary classification, multiclass).
- **Lab 1 (W2-W3)** - Baseline CNN: bangun classifier citra dari nol + pretrained fine-tune; jalankan smoke test tiga level.
- **Lab 2 (W3)** - 3-condition ablation: jalankan satu perbandingan terkontrol (mis. AdamW vs SGD, augmentasi on/off) dengan interpretasi kurva dan confusion matrix.
- **Lab 3 (W4)** - Reproducibility: pindahkan konfigurasi ke YAML, kunci seed, simpan checkpoint dengan metadata + git hash, refactor jadi struktur eksperimen reproduksibel.
- **Lab 3b (W5)** - RNN vs LSTM: bandingkan vanilla RNN dan LSTM/GRU pada tugas sequence dengan dependensi panjang; visualisasikan gradient flow.
- **Lab 4 (W4 ekstensi atau W6)** - EDA + leakage audit: PathMNIST atau dataset baru; audit pipeline dari leakage.
- **Lab 6 - Temporal Leakage (W6)** - Sensor/timeseries dataset; bangun causal feature, sengaja patahkan kausalitas, tunjukkan inflasi metric yang invalid.
- **Lab 5b (W7)** - Klasifikasi sentimen IndoNLU SmSA: 2x2 perbandingan frozen vs fine-tune, [CLS] vs mean pool.
- **Lab 6 - Repo Adoption (W7)** - Clone repo riset, modifikasi seminimal mungkin, tulis `repo_map.md`.
- **Lab 8 - Multimodal Ablation (W9)** - Reproduce/adopt multimodal repo, ablation per modalitas, uji modalitas hilang, repo map kedua.
- **Lab W10 - Implementasi Paper (W10)** - Pilih satu paper dari menu terkurasi, baca tiga putaran, implement metode inti, satu ablation kecil.

### Lab Breadth (memenuhi Kontrak Belajar poin 6)

- **Lab 1c** (MLP numpy from-scratch, breadth)
- **Lab 6b** (Transformer-mini from-scratch, breadth, opsional di W7)
- **Lab 7b** (Autoencoder + denoising AE + t-SNE, breadth)

### Komponen Mandiri: Eksplorasi Berbasis Pertanyaan

Mulai W4, setiap minggu Anda memilih satu pertanyaan atau topik dari materi minggu itu, mengerjakannya secara mandiri di luar sesi tatap muka, dan mempresentasikan 10 menit di awal sesi berikutnya. Portofolio berisi 8 entri (W4-W11) ditutup dengan refleksi perjalanan belajar. Template entri: [C.6](#c6-template-entri-portofolio); panduan presentasi: [C.7](#c7-panduan-slot-presentasi-komponen-mandiri-10-menit); format dan kriteria umum: [C.9](#c9-template-komponen-mandiri).

Pertanyaan yang baik untuk Komponen Mandiri bersifat spesifik, terhubung ke materi minggu itu, dan cukup terbuka untuk menghasilkan temuan tak terduga. Dalam mengerjakan, seorang peneliti secara alami akan mengimplementasikan sesuatu, menganalisis hasilnya, membuat keputusan desain, dan sesekali menjelajahi arsitektur baru - keempat dimensi ini tidak perlu dipilih salah satu, melainkan muncul sesuai kebutuhan pertanyaan.

**Empat dimensi riset dalam satu mini-proyek:**

| Dimensi | Pertanyaan panduan | Contoh artefak |
| --- | --- | --- |
| **Implementasi** | Apa yang saya bangun atau ubah? | Cuplikan kode + benchmark before/after |
| **Analisis** | Apa yang saya amati dan apa maknanya? | Plot + 2-3 temuan + hipotesis turunan |
| **Desain** | Keputusan apa yang saya buat dan mengapa? | Protokol, justifikasi, catatan trade-off |
| **Eksplorasi arsitektur** | Ada keluarga arsitektur baru yang relevan? | Forward pass + learning curve (opsional; template di [C.8](#c8-template-lab-replikasi-arsitektur-eksplorasi-arsitektur-baru)) |

---

### D.7 Peta Dependensi W1-W11 {#d7-peta-dependensi}

Modul disusun sebagai urutan linier W1 → W11. Tabel berikut menunjukkan minggu mana yang harus diselesaikan sebelum minggu tertentu. *Selesai* berarti lab utamanya sudah dijalankan dan ide utamanya bisa dijelaskan.

| Minggu                           | Prasyarat minimum | Konsep kunci                                              |
| -------------------------------- | ----------------- | --------------------------------------------------------- |
| **W1** Tabular                   | - (entry point)   | -                                                         |
| **W2** Images & CNN              | W1                | Tensor I/O, output head + loss matching                   |
| **W3** Loss/Opt/Eval             | W2                | Smoke test tiga level, baseline yang berjalan             |
| **W4** Reproducibility           | W3                | Pipeline training penuh; bisa baca loss curve             |
| **W5** Sequences                 | W4                | Disiplin alur kerja; matriks eksperimen                   |
| **W6** Representations & Leakage | W5                | Sequence model; pemikiran tentang split data              |
| **W7** Text & Repo Adoption      | W4, W6            | Reproducibility; pemahaman representasi                   |
| **W8** Foundation Models         | W7                | Pengalaman fine-tuning pretrained text/image model        |
| **W9** Multimodal                | W8                | Pemahaman foundation model dan adaptation                 |
| **W10** Paper Reading            | W4, W7            | Bisa baca repo; bisa menjalankan eksperimen reproduksibel |
| **W11** Research Framing         | W10               | Pengalaman menerjemahkan paper jadi kode                  |
| **W12-15** Capstone              | W1-W11            | Seluruh pipeline + research framing matang                |

> [!NOTE]
> Dependensi linier W1→W11 memang disengaja. Berbeda dengan modul lama yang punya bab paralel, struktur bootcamp memastikan setiap kebiasaan riset baru bertumpu pada kebiasaan minggu sebelumnya. Hindari melompat: misalnya, W7 (text + repo adoption) menuntut alur kerja reproduksibel dari W4 dan matriks eksperimen dari W5.

**Rantai lab breadth arsitektur:** Lab 0 (MLP tabular, W1) atau Lab 1c (MLP numpy, opsional) → Lab 1 (CNN, W2) → Lab 3b (RNN/LSTM, W5) → Lab 5b/Lab 6b (Transformer, W7) → Lab 7b (Autoencoder, breadth opsional). Empat dari lima keluarga sudah tercakup oleh lab wajib W1-W7; Lab 7b melengkapi keluarga Autoencoder untuk Breadth Check di Kontrak Belajar.

---

### D.8 Komunikasi dengan PI - SQRC, Saluran, Ekspresi Ketidakpastian {#d8-komunikasi-pi}

W4 §3.5 memperkenalkan tiga alat komunikasi yang membedakan asisten mandiri dari yang bergantung. Bagian ini menyimpan detail kerangka dan tabel rujukan. Untuk format update mingguan rutin, gunakan [C.11](#c11-template-update-mingguan-ke-pi).

#### D.8.1 Kerangka SQRC untuk Pertanyaan Teknis

Saat butuh masukan PI di luar update rutin, pakai empat langkah **SQRC**: Situasi, Pertanyaan (*Question*), upaya penyelesaian (*Resolution attempt*), permintaan (*Call*).

| Langkah | Singkatan | Isi | Contoh |
| --- | --- | --- | --- |
| **S** | Situasi | Apa yang terjadi? Satu kalimat fakta. | "Loss validation naik sejak epoch 8, sementara train loss terus turun." |
| **Q** | Pertanyaan | Apa yang ingin dijawab atau dicapai? | "Saya ingin tahu apakah ini overfitting atau ada bug di data split." |
| **R** | Upaya penyelesaian | Apa yang sudah dicoba? | "Saya sudah kurangi LR 10×, loss tetap naik. Saya sudah overfit satu batch - loss turun ke nol. Saya periksa distribusi label di train/val: seimbang." |
| **C** | Permintaan | Permintaan spesifik untuk PI. | "Dari ketiga kemungkinan - overfitting, bug split, atau learning rate - mana yang paling mungkin berdasarkan pola ini? Atau ada diagnosis lain yang saya lewatkan?" |

SQRC efektif karena tiga alasan: PI tahu Anda sudah berusaha sendiri (R), sehingga dia tidak perlu memulai dari nol; PI bisa langsung melompat ke inti masalah tanpa bertanya balik "learning rate-nya berapa?"; dan Anda belajar dari pola diagnosis PI - semakin sering memakai SQRC, semakin sedikit perlu bertanya.

**Contoh SQRC yang buruk:** "Model saya tidak belajar. Ada saran?" (tidak ada S, tidak ada R, C terlalu luas).

#### D.8.2 Memilih Saluran Komunikasi

Tidak semua komunikasi pantas lewat saluran yang sama. Matriks berikut membantu Anda memilih.

| Situasi | Saluran | Mengapa |
| --- | --- | --- |
| Update progress rutin | Email / shared doc | Asinkron, tidak perlu respon segera, bisa diarsipkan |
| Butuh keputusan cepat (deadline < 24 jam) | Chat langsung / Slack DM | PI bisa merespon dalam 1-2 menit |
| Pertanyaan teknis yang butuh konteks | Email dengan SQRC di subject | PI bisa menjawab saat punya waktu fokus; subject yang jelas memudahkan pencarian ulang |
| Hasil eksperimen final | Email + lampiran laporan 1 halaman | Menciptakan jejak tertulis; 3 bullet point temuan utama di badan email, detail di lampiran |
| Diskusi arah riset berikutnya | Tatap muka / video call | Percakapan dua arah lebih efisien untuk eksplorasi ide |

Aturan praktis: jika butuh jawaban < 1 menit dari PI, pakai chat. Jika butuh pemikiran > 5 menit dari PI, pakai email. Jangan kirim pertanyaan analitis via chat - PI akan merespon singkat dan Anda kehilangan kesempatan mendapat masukan mendalam.

#### D.8.3 Mengekspresikan Ketidakpastian secara Profesional

Asisten riset pemula sering merasa harus terlihat yakin. Padahal, PI yang baik lebih menghargai kejujuran tentang batas pengetahuan daripada kepercayaan diri yang rapuh. Kalimat-kalimat berikut adalah contoh mengekspresikan ketidakpastian tanpa kehilangan kredibilitas.

| Kurang tepat | Lebih tepat | Mengapa |
| --- | --- | --- |
| "Modelnya berhasil." | "Hasil preliminary dengan 1 seed menunjukkan F1 minor naik 6 poin. Saya belum mereplikasi dengan seed berbeda, jadi belum bisa memastikan kenaikan ini bukan noise." | Mengakui keterbatasan sambil tetap melaporkan hasil |
| "Focal loss tidak efektif." | "Pada konfigurasi yang saya uji (γ=2.0, 3 seed, CIFAR-10 balanced), focal loss tidak meningkatkan F1. Mungkin berbeda pada dataset dengan imbalance lebih ekstrem." | Menyatakan hasil tanpa generalisasi berlebihan |
| "Saya tidak tahu kenapa loss-nya begini." | "Saya menduga penyebabnya salah satu dari dua: LR terlalu tinggi, atau ada bug di normalisasi. Saya akan uji hipotesis pertama dulu dengan LR 10× lebih kecil." | Mengakui ketidaktahuan + langkah konkret |
| "Menurut paper X, ini solved." | "Paper X melaporkan hasil kuat pada dataset mereka. Saya belum bisa mereproduksi pada dataset kita - mungkin karena perbedaan distribusi kelas." | Menghormati temuan paper tanpa mengabaikan hasil sendiri |

Intinya: ketidakpastian yang disertai langkah konkret adalah tanda kompetensi. Ketidakpastian tanpa tindak lanjut adalah tanda kebingungan.

---

### D.9 Peta Kanal Publikasi ML {#d9-peta-kanal-publikasi-ml}

Di ML modern, ide sering beredar lebih cepat daripada proses peer-review. Tabel berikut membantu Anda mengenali empat kanal publikasi utama dan cara membacanya dengan cermat.

| Kanal | Apa itu | Kekuatan | Keterbatasan | Cara membaca |
| --- | --- | --- | --- | --- |
| **Preprint (arXiv)** | Naskah yang diunggah penulis sebelum, saat, atau setelah proses publikasi resmi. | Sangat cepat; sering menjadi tempat pertama paper penting muncul; memberi akses awal ke ide dari "dapur riset". | Tidak peer-reviewed; kualitas sangat beragam; klaim bisa berubah antar versi. | Gunakan sebagai alat akses dan radar ide, bukan sumber otoritas final. Latih skeptisisme: cek eksperimen, baseline, ablation, dan versi terbaru. |
| **Workshop** | Venue kecil yang biasanya melekat pada konferensi besar. | Bagus untuk ide awal, topik niche, dan diskusi komunitas. | Standar seleksi bervariasi; sering lebih eksploratif daripada konklusif. | Cocok untuk melihat arah baru, tetapi jangan terlalu mengandalkan klaim utama tanpa verifikasi. |
| **Conference** | Venue utama ML seperti NeurIPS, ICML, ICLR, CVPR, ACL, EMNLP. | Peer-reviewed, kompetitif, dan biasanya menjadi publikasi utama di ML. | Review tetap tidak sempurna; paper bisa overclaim; detail implementasi sering di appendix/code. | Baca sebagai kontribusi yang sudah melewati filter kuat, tetapi tetap cek bukti dan reproducibility. |
| **Journal** | Publikasi periodik dengan proses review lebih panjang. | Lebih matang; sering memuat versi extended, survei, atau validasi lebih lengkap. | Lebih lambat; di ML tidak selalu menjadi kanal utama untuk paper paling baru. | Bagus untuk fondasi, survei, dan detail metodologis yang lebih stabil. |

---

### D.10 Ringkasan Cepat Empat Sikap Riset

Tabel rujukan saat Anda kehilangan arah.


| Sikap      | Pertanyaan yang menjaga sikap                       | Tanda sikap ini hadir                                                            |
| ---------- | --------------------------------------------------- | -------------------------------------------------------------------------------- |
| Curiosity  | "Mengapa model berperilaku begini?"                 | Anda menghabiskan waktu mempertanyakan *yang aneh*, bukan hanya mengejar metrik. |
| Rigor      | "Bisakah orang lain mereproduksi ini?"              | Seed, config, git hash, pre-reg.                                                 |
| Skepticism | "Apa penjelasan paling membosankan dari hasil ini?" | Audit leakage, baseline-kuat, error analysis.                                    |
| Ownership  | "Siapa yang akan menjawab jika saya tidak?"         | Dokumen lengkap, verifikasi LLM, repositori yang bisa dijalankan.                             |


---

## E. Indeks Cepat - Di Mana Mencari Apa {#e-indeks-cepat}

- **Prasyarat Python/Kalkulus belum solid?** -> Lampiran §F
- **Self-checklist mingguan (apa yang harus saya bisa)?** -> Lampiran §G
- **Cara menulis pre-registration?** -> W12 + Lampiran §C.1
- **Template Capstone Proposal?** -> Lampiran §C.13
- **Rubrik penilaian?** -> [Rubrik Penilaian](13_Rubrik_Penilaian.md)
- **Panduan Instruktur (pacing, emphasis, grading)?** -> [Panduan Instruktur](15_Panduan_Instruktur.md)
- **Template laporan capstone?** -> Lampiran §C.2
- **Memilih framing capstone?** -> [Capstone - Proyek Riset](12_Capstone.md) §2
- **Peta kanal publikasi ML (preprint/workshop/conference/journal)?** -> Lampiran §D.9
- **Membaca paper dalam tiga putaran?** -> W10 §2.3
- **Alur paper-to-code?** -> W10 §2.5
- **Audit temporal leakage?** -> W6 §0.6 + lab_w6_temporal_leakage
- **Temporal leakage konkret?** -> W6 §0.6
- **Etika data dan bias (fairness, negative results)?** -> W6 §2.6
- **Struktur config YAML?** -> W4 §2.7
- **Alur kerja Git untuk riset (commit convention, branching)?** -> W4 §2.7
- **Adopsi repo eksternal?** -> W7 §3
- **Repo map template?** -> Lampiran §C.12
- **Verifikasi output LLM?** -> W7 §2.1
- **Synthesis rule sebelum eksekusi?** -> W7 §2.2
- **Komunikasi efektif dengan dosen pembimbing (SQRC, saluran, ketidakpastian)?** -> Lampiran §D.8
- **Sepuluh kompetensi inti modul (detail per kompetensi)?** -> Lampiran §D.2
- **Big Map lintas minggu (tabel tensor I/O)?** -> Lampiran §D.3
- **Kebiasaan riset per minggu (tabel ringkasan)?** -> Lampiran §D.4
- **Kontrak Belajar - 8 klausul checklist?** -> Lampiran §D.5
- **Indeks lengkap lab + 4 jalur Komponen Mandiri?** -> Lampiran §D.6
- **Peta dependensi W1-W11?** -> Lampiran §D.7
- **Diagnosis loss curve (decision tree)?** -> W3 §2.5
- **Smoke test tiga level?** -> W2 §2.3
- **Output head + loss matching tabel?** -> W1 §2.2
- **Backpropagation derivasi manual?** -> Lampiran §A.13
- **Template entri portofolio mandiri?** -> Lampiran §C.6
- **Panduan presentasi Komponen Mandiri?** -> Lampiran §C.7
- **Template weekly experiment log ringan?** -> Lampiran §C.10
- **Template update mingguan ke PI/supervisor?** -> Lampiran §C.11
- **Format dan kriteria Komponen Mandiri?** -> Lampiran §C.9
- **Taksonomi foundation model (modalitas x keluarga model)?** -> W8 §2.2
- **Pohon keputusan adaptasi (frozen/LoRA/full FT)?** -> W8 §2.4
- **protokol ablation per modalitas?** -> Lampiran §C.14
- **Strategi fusion multimodal?** -> W9 §2.1
- **Strategi modalitas hilang?** -> W9 §2.3
- **Timeline capstone 4 minggu (W12-W15)?** -> [Capstone - Proyek Riset](12_Capstone.md) §1
- **Sub-rubrik capstone per fase (W12-W15)?** -> [Rubrik Penilaian](13_Rubrik_Penilaian.md) §5.1
- **Alat riset ringan (Streamlit/Gradio/RunPod)?** -> Lampiran §D.1

---

## F. Prasyarat {#f-prasyarat}

Bagian ini adalah *primer* singkat untuk mahasiswa yang belum solid pada tiga prasyarat masuk modul. Kerjakan bagian yang relevan sebelum membaca [Prasyarat Modul](00a_Prasyarat.md). Jika sudah solid, lewati.

### F.1 Python Tingkat Menengah

Anda perlu nyaman dengan: fungsi (termasuk `*args`, `**kwargs`, default parameter), kelas dan pewarisan, modul dan impor relatif, virtual environment (`venv` atau `conda`), dan membaca traceback.

**Uji mandiri.** Bisa Anda menulis kelas `Dataset` sederhana dengan `__len__` dan `__getitem__`, lalu mengimpornya dari modul lain di folder yang sama tanpa error `ModuleNotFoundError`? Jika tidak, kerjakan satu tutorial Python OOP (Python docs atau Real Python) sebelum melanjutkan.

**Sumber rujukan.**
- Python Tutorial resmi - bagian *Classes* dan *Modules* (docs.python.org/3/tutorial).
- Real Python - "Object-Oriented Programming (OOP) in Python 3".
- `venv` quickstart: `python -m venv .venv && source .venv/bin/activate` (Linux/Mac) atau `.venv\Scripts\activate` (Windows).

### F.2 Kalkulus Dasar dan Aljabar Linear

Anda perlu memahami: turunan fungsi satu variabel, aturan rantai (*chain rule*), gradien (turunan parsial), dan perkalian matriks.

**Uji mandiri.** Tanpa membuka referensi, bisa Anda turunkan `d/dx [x² + 3x]` dan jelaskan mengapa gradien menunjuk ke arah kenaikan paling curam? Bisa Anda mengalikan matriks 2x3 dengan matriks 3x2 secara manual? Jika tidak, kerjakan dua modul pertama Khan Academy Calculus dan Linear Algebra.

**Sumber rujukan.**
- Khan Academy - *Derivatives* (khanacademy.org/math/calculus-1).
- Khan Academy - *Vectors and spaces*, *Matrix transformations* (khanacademy.org/math/linear-algebra).
- 3Blue1Brown - "Essence of Calculus" dan "Essence of Linear Algebra" (YouTube). Visual, 15-20 menit per video.

### F.3 Model ML Pertama

Anda perlu pernah melatih setidaknya satu model klasifikasi dengan scikit-learn: `fit`, `predict`, `score`. Anda perlu tahu apa itu train/test split dan mengapa diperlukan.

**Uji mandiri.** Bisa Anda melatih `LogisticRegression` pada Iris dataset dan mencetak akurasi test set dalam 15 baris kode? Jika tidak, kerjakan tutorial scikit-learn Getting Started sebelum membaca [Prasyarat Modul](00a_Prasyarat.md).

**Sumber rujukan.**
- scikit-learn - *Getting Started* (scikit-learn.org/stable/getting_started.html).
- Kaggle - *Intro to Machine Learning* (gratis, 3 jam, hands-on Jupyter).

---

## G. Self-Checklist Mingguan

Dua belas tabel di bawah adalah alat bantu bagi Anda untuk memeriksa pemahaman sendiri setiap akhir minggu. Centang "Sudah" hanya jika benar-benar bisa melakukannya *tanpa melihat catatan*. "Mulai" berarti bisa dengan bantuan atau referensi. Jika ada "Belum" di minggu sebelumnya, selesaikan sebelum lanjut ke minggu berikutnya - konsep di modul ini disusun bertahap.

### Minggu 1 - Orientasi (Bab 00)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Menyebutkan 10 kompetensi dan kaitannya dengan 4 sikap riset | | | |
| Menjelaskan struktur 8-section yang dipakai semua bab | | | |
| Menyebutkan 7 klausul Kontrak Belajar, terutama Breadth Check | | | |
| Memilih jalur capstone awal (masih tentatif) | | | |
| Menjalankan `python -m src.train --config configs/baseline.yaml --dry-run` tanpa error | | | |

### Minggu 2 - Fondasi Neural Network (02_W2_Images_CNN_Smoke_Test)

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Menjelaskan tensor I/O sebagai pasangan shape -> makna untuk MLP, CNN, RNN, Transformer | | | |
| Menjabarkan backprop MLP 7 langkah secara manual (chain rule, tidak lihat catatan) | | | |
| Membedakan 4 keluarga arsitektur dan asumsi data masing-masing | | | |
| Menjelaskan kapan BatchNorm vs LayerNorm vs GroupNorm | | | |
| Menggambar kurva ReLU, GELU, SiLU dan menyebutkan perbedaan utama | | | |
| Lab 1c: forward + backward MLP numpy selesai; gradient check lolos | | | |

### W3 - Loss, Optimizer & Evaluasi

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Memilih loss function untuk minimal 3 jenis tugas berbeda | | | |
| Menjelaskan perbedaan Adam vs AdamW dan kapan weight decay penting | | | |
| Menyebutkan minimal 4 metrik evaluasi dan kapan masing-masing relevan | | | |
| Membedakan 3 strategi representasi fitur (engineered / extracted / learned) | | | |
| Mendiagnosis loss curve: menyebutkan 5 pola dan tindakan untuk masing-masing | | | |
| Menjelaskan mengapa "overfit one batch" adalah alat diagnosis utama | | | |
| Lab 1: 4 checklist selesai (training loop, loss plot, confusion matrix, sample inspection) | | | |

### W4 - Reproducibility & Experiment Matrix

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Menjawab 5 pertanyaan sebelum menyentuh kode untuk instruksi baru | | | |
| Menulis protokol eksperimen satu halaman (variabel, baseline, hipotesis, metrik, waktu) | | | |
| Merumuskan hipotesis yang dapat dipalsukan (bukan "loss X lebih baik") | | | |
| Menyusun update mingguan ke PI dengan format: progress, kendala, rencana, pertanyaan ([Lampiran §C.11](#c11-template-update-mingguan-ke-pi)) | | | |
| Memakai kerangka SQRC saat mengajukan pertanyaan teknis ke PI | | | |
| Lab 2: FocalLoss + freeze + ablation selesai; `protocol.md` ditulis sebelum run | | | |

### W5 - Sequences: RNN & LSTM

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Menjelaskan perbedaan RNN vanilla vs LSTM (cell state, forget/input/output gate) | | | |
| Menjelaskan mengapa vanishing gradient terjadi di RNN dan bagaimana LSTM mengatasinya | | | |
| Membaca plot gradient flow dan mengidentifikasi vanishing/exploding gradient | | | |
| Menyebutkan peran gradient clipping dan menjalankan `clip_grad_norm_` di training loop | | | |
| Membandingkan LSTM vs GRU: parameter count, training speed, kapan memilih mana | | | |
| Menyebutkan prinsip residual connection dan kaitannya dengan LSTM cell state | | | |
| Lab W5: RNN vs LSTM gradient flow selesai; plot gradient norm + val MAE | | | |

### W6 - Representations & Temporal Leakage

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Melakukan EDA 3-lapis dengan pertanyaan pemandu (bukan daftar formalitas) | | | |
| Membedakan 5 jenis data leakage dan menyebutkan tes cepat masing-masing | | | |
| Mengaudit kualitas label: distribusi, konsistensi, sampel salah | | | |
| Memverifikasi pipeline preprocessing tidak memakai statistik test set | | | |
| Menyebutkan 4 jenis dataset bias (selection, measurement, label, historical) | | | |
| Menjelaskan mengapa hasil negatif yang terdokumentasi adalah kewajiban etis | | | |
| Lab W6: EDA + leakage audit + label inspection selesai; minimal 1 isu data ditemukan | | | |

### W7 - Text, Transformers & Repo Adoption

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Memakai LLM untuk 3 jenis tugas berbeda (boilerplate, debugging, eksplorasi) | | | |
| Memverifikasi output LLM: baca baris per baris, uji kasus batas, uji minimal | | | |
| Menjelaskan kapan LLM cocok dipakai dan kapan tidak | | | |
| Mencatat interaksi LLM di LLM Interaction Log (C.3) | | | |
| Lab W7 (LLM-assisted): LLM-assisted feature selesai; log verifikasi terisi | | | |
| Lab W7 (teks): klasifikasi sentimen IndoNLU selesai (opsional) | | | |

### W8 - Foundation Models

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Memetakan entry point -> model -> loss -> config repo yang belum dikenal dalam 30 menit | | | |
| Mengatasi error setup umum (dependency, path, CUDA version) | | | |
| Melakukan modifikasi seminimal mungkin pada repo orang lain | | | |
| Menulis kategori error analysis (minimal 3 kategori) | | | |
| Me-review kode rekan: menemukan magic number, hardcoded path, missing docs | | | |
| Lab W8: training remote di RunPod selesai; pod dimatikan | | | |
| Breadth: Transformer-mini dari nol selesai (kapan saja) | | | |

### W9 - Multimodal Reasoning

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Membuat demo Streamlit/Gradio yang bisa diakses lewat browser | | | |
| Menampilkan confusion matrix dan kasus gagal, bukan hanya akurasi | | | |
| Menjelaskan apa yang bisa disimpulkan pengguna dari alat yang Anda buat | | | |
| Lab W9: ablation per modalitas selesai; tabel 7-kondisi terisi | | | |
| Breadth: Autoencoder + denoising AE + t-SNE selesai (kapan saja) | | | |

### W10 - Paper Reading & Implementation

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Membaca paper dalam tiga putaran (pertama: ide; kedua: klaim+metode; ketiga: reproduksi) | | | |
| Membuat catatan paper dengan template C.5 (TL;DR, metode, bukti, pertanyaan, koneksi) | | | |
| Menjalankan alur paper-to-code 6 langkah (abstract → I/O → loss → boilerplate → ablation kecil → bersihkan) | | | |
| Mengidentifikasi ablation kecil yang menguji klaim spesifik paper | | | |
| Lab W10: paper-to-code selesai; ablation kecil berhasil | | | |

### W11 - Research Framing

| Saya harus bisa... | Belum | Mulai | Sudah |
|---|---|---|---|
| Menghasilkan 3-5 framing kandidat dari satu dataset | | | |
| Menentukan entitas, input, output, Middle, dan gap untuk tiap framing | | | |
| Menjalankan filter literatur cepat untuk setiap framing kandidat | | | |
| Memilah framing menjadi baru, sebagian terjawab, atau jenuh | | | |
| Menyiapkan framing utama, framing cadangan, dan alasan framing yang dihapus untuk W12 | | | |

### Cara Memakai Checklist Ini

1. **Akhir setiap minggu**, buka tabel minggu yang baru selesai.
2. **Centang dengan jujur.** "Sudah" = bisa dilakukan tanpa bantuan. "Mulai" = bisa dengan catatan atau bantuan LLM. "Belum" = belum bisa.
3. **Jika ada "Belum",** selesaikan poin itu sebelum mengerjakan Komponen Mandiri minggu berikutnya. Poin "Belum" yang menumpuk adalah sinyal bahwa Anda perlu bicara dengan dosen.
4. **Di akhir semester,** tabel-tabel ini adalah ringkasan kompetensi Anda. Bawa ke sesi evaluasi akhir sebagai bukti pendukung.

Checklist ini melengkapi - bukan menggantikan - rubrik penilaian di [13_Rubrik_Penilaian.md](13_Rubrik_Penilaian.md). Rubrik dipakai dosen untuk menilai; checklist dipakai Anda untuk memantau diri sendiri.

---

*Anda boleh menganggap modul ini selesai ketika sudah cukup percaya diri untuk memulai proyek riset sendiri - bukan ketika setiap halaman sudah dibaca. Semoga empat sikap itu tetap terbawa setelah semester ini selesai.*

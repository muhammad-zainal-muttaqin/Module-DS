Salah satu keputusan riset yang paling sering menentukan hasil adalah pilihan representasi data: bagaimana data mentah diubah menjadi vektor yang dipakai model. Pada modalitas yang sama dan task yang sama, representasi berbeda bisa memberi hasil yang sangat berbeda.

Tiga jenis representasi yang akan sering ditemui:

- **Engineered** - fitur dirancang dengan pengetahuan domain (statistik, transformasi, fitur klasik)
- **Extracted** - fitur diambil dari model pretrained yang dibekukan (hidden states, embedding)
- **Learned** - representasi dipelajari langsung dari data melalui training end-to-end atau self-supervised

Pertanyaan riset yang berulang: *representasi mana yang paling cocok untuk task ini, dan mengapa?*

---

Contoh pilihan representasi pada domain yang sama


| Domain          | Engineered                                   | Extracted                                      | Learned                                  |
| --------------- | -------------------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| Gambar          | Histogram warna, HOG, SIFT                   | Hidden states dari CNN/ViT pretrained (frozen) | CNN di-fine-tune end-to-end              |
| Teks            | TF-IDF, n-gram, panjang kalimat              | `[CLS]` atau mean pooling dari BERT (frozen)   | BERT di-fine-tune untuk task hilir       |
| Sinyal CGM      | Mean, CV, TIR, TBR, daily pattern            | Hidden states dari Chronos / TimesFM (frozen)  | 1D CNN / transformer dilatih dari nol    |
| Audio           | MFCC, spectral centroid, ZCR                 | Embedding dari Wav2Vec2 / AST (frozen)         | CNN di atas spektrogram, end-to-end      |
| Ulasan / review | Panjang teks, rasio kata positif, skor VADER | Sentence embedding dari Sentence Transformers  | Transformer fine-tuned untuk klasifikasi |


---

Keputusan riset terkait representasi

- **Engineered vs. learned** - kapan fitur rancangan domain cukup, kapan harus belajar representasi?
- **Frozen vs. fine-tuned** - apakah model pretrained dipakai apa adanya, atau ikut dilatih?
- **Layer mana yang diambil** - pada model pretrained, layer awal, tengah, atau akhir?
- **Bagaimana mereduksi** - pooling `[CLS]`, mean pooling, attention pooling, atau concat beberapa layer?
- **Representasi tunggal vs. gabungan** - satu representasi, atau ensemble dari beberapa?
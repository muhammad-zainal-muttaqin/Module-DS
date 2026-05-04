Setiap permasalahan deep learning dapat dipahami hanya dengan menjawab dua pertanyaan: bentuk tensor apa yang masuk, dan bentuk tensor apa yang keluar?
• Tensor input menggambarkan struktur data mentah
• Tensor output menggambarkan bentuk prediksi

Sedangkan Arsitektur (MLP, CNN, RNN, Transformer) hanyalah mesin yang melakukan transformasi dari bentuk input ke bentuk output.

---

Contoh pasangan tensor input → output


| Domain      | Contoh Data                                       | Tensor Input                            | Tensor Output   | Contoh Tugas                             |
| ----------- | ------------------------------------------------- | --------------------------------------- | --------------- | ---------------------------------------- |
| Tabular     | Umur, luas rumah, jumlah kamar, lokasi            | `(F,)` - vektor fitur                   | `(1,)`          | Prediksi harga rumah                     |
| Tabular     | Umur, tekanan darah, kolesterol, BMI              | `(F,)` - vektor fitur                   | `(N,)`          | Klasifikasi risiko penyakit              |
| Gambar      | Foto RGB 224×224                                  | `(C, H, W)` - kanal, tinggi, lebar      | `(N,)`          | Klasifikasi kucing vs anjing             |
| Gambar      | Foto makanan                                      | `(C, H, W)`                             | `(1,)`          | Prediksi jumlah kalori                   |
| Gambar      | Foto makanan                                      | `(C, H, W)`                             | `(K,)`          | Prediksi beberapa nilai gizi             |
| Gambar      | Foto kebun / jalan / ruang parkir                 | `(C, H, W)`                             | `(G, G, 5 + N)` | Deteksi objek                            |
| Teks        | Ulasan produk: “Barangnya bagus dan cepat sampai” | `(T,)` - urutan token                   | `(N,)`          | Klasifikasi sentimen                     |
| Teks        | Ulasan film atau hotel                            | `(T,)` - urutan token                   | `(1,)`          | Prediksi rating                          |
| Teks        | Kalimat berita atau artikel                       | `(T,)` - urutan token                   | `(T, N)`        | Penandaan entitas / token classification |
| Deret waktu | Detak jantung atau sinyal sensor per detik        | `(T, F)` - waktu × fitur/sensor         | `(1,)`          | Prediksi satu nilai berikutnya           |
| Deret waktu | Sinyal ECG beberapa detik                         | `(T, F)` - waktu × fitur/sensor         | `(N,)`          | Klasifikasi aritmia                      |
| Deret waktu | Data glukosa atau suhu dari waktu ke waktu        | `(T, F)` - waktu × fitur/sensor         | `(T', 1)`       | Prediksi urutan masa depan               |
| Multimodal  | Foto produk + deskripsi teks                      | dua tensor, mis. `(C, H, W)` dan `(T,)` | `(N,)`          | Klasifikasi produk                       |
| Multimodal  | Gambar + caption media sosial                     | dua tensor, mis. `(C, H, W)` dan `(T,)` | `(N,)`          | Klasifikasi hoaks / bukan hoaks          |

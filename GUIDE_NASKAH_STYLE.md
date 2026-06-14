# GUIDE_NASKAH_STYLE.md

Panduan menulis naskah presentasi (`_naskah_wXX.md`): teks yang tinggal dibaca lantang oleh instruktur saat memutar slide deck `slides-XX.ts`. Naskah ini bukan ringkasan bab dan bukan pengganti slide. Ia adalah skrip lisan, jadi tujuannya satu: instruktur tinggal baca, mengalir, tanpa berhenti menerjemahkan fragmen.

Baca panduan ini sebelum menulis atau merevisi naskah. Patuhi `SWEEPER.md` dan aturan diksi di `CLAUDE.md` juga, karena naskah tetap bahasa Indonesia natural.

## Prinsip Inti

1. **Satu slide = satu bagian.** Header `## Slide N - <judul slide>`, lalu blockquote berisi teks yang dibaca. Urutan dan jumlah slide harus persis sama dengan `slides-XX.ts`.
2. **Kalimat lisan yang utuh, bukan poin.** Setiap kalimat punya subjek, predikat, dan objek lengkap. Tidak ada fragmen, tidak ada label seperti "Kekuatan:" atau "Asumsi:". Naskah dibaca dengan mulut, bukan dipindai dengan mata.
3. **Mengalir, pakai penanda lisan.** Sambung antar-kalimat dengan "kemudian", "kemudian", "lalu", "nah", "jadi", "sebaliknya", "yang penting", "kabar baiknya". Ini yang membuat naskah terdengar seperti orang bicara, bukan daftar.
4. **No bluff, no AI-slop.** Tidak ada kalimat pemanis kosong, tidak ada dramatisasi ("misi", "sakti", "luar biasa"), tidak ada metafora teknis. Sebut nama operasi atau objeknya langsung.
5. **Persamaan dijelaskan di dalam kalimat, bukan dieja simbol per simbol.** Jangan tulis "h indeks t minus satu" sebagai potongan terpisah. Lebur ke kalimat: "...ditambah W_h dikali hidden state langkah sebelumnya, ditambah bias."

## Cara Membaca Persamaan

Persamaan harus terdengar seperti penjelasan, bukan pembacaan rumus. Bandingkan:

- **Salah (kaku, terpotong):** "h_t sama dengan tanh kurung buka W_x x_t plus W_h h_{t-1} plus b kurung tutup."
- **Benar (lisan, utuh):** "Hidden state di langkah sekarang, kita tulis h_t, sama dengan tanh dari, W_x dikali input sekarang, ditambah W_h dikali hidden state langkah sebelumnya, ditambah bias."

Aturan praktis:

- Beri nama tiap suku dengan maknanya, bukan cuma simbolnya. `W_h h_{t-1}` dibaca "W_h dikali hidden state langkah sebelumnya".
- Pakai "dikali", "ditambah", "dari" sebagai kata sambung, bukan "kali", "plus", "kurung buka".
- Kalau persamaan punya banyak baris (mis. enam persamaan LSTM), jangan eja tiap simbol. Jelaskan tiap baris itu **apa** dan **untuk apa**: "Persamaan keempat adalah cell state baru, dan inilah baris yang penting itu, karena di sini ada tanda tambah yang menyelamatkan gradient."
- Angka eksponen dan desimal dibaca natural: `~9e-16` jadi "praktis nol", `0.5` jadi "nol koma lima", `10^2` jadi "sepuluh pangkat dua" hanya kalau angkanya memang inti penjelasan.
- Simbol khusus dijelaskan sekali saat pertama muncul: `⊙` jadi "lingkaran kecil dengan titik di tengah, dan itu artinya perkalian element-wise".

## Pola per Tipe Layout Slide

Tiap layout di `slides-XX.ts` punya cara baca yang khas:

- **`title`** - Buka dengan sapaan ("Selamat datang di minggu kelima"), sebut posisi (sudah belajar apa), lalu sebut tujuan minggu ini dalam kalimat penuh. Akhiri catatan panggung `[...]` kalau perlu.
- **`section` (pembatas)** - Kalimat transisi: "Kita masuk ke materi pertama." Lalu satu-dua kalimat yang membingkai apa yang akan dibahas. Jangan menjanjikan gambar yang baru muncul di slide setelahnya.
- **`grid` (agenda/daftar)** - Bacakan tiap item sebagai kalimat berurutan dengan "Pertama, ... Kedua, ... Ketiga, ...". Sebutkan **konsekuensi atau sebab**, bukan cuma judulnya. Untuk agenda, pastikan sebab-akibat penting (mis. kenapa RNN gagal) ikut disebut, jangan cuma judul materi.
- **`bullets`** - Buka dengan lead sentence (kalau slide mengikuti gambar, mulai dengan "Dari gambar tadi, ..."). Lalu tiap bullet jadi satu-dua kalimat penuh, disambung penanda lisan. Jangan baca bullet sebagai frasa.
- **`table`** - Jangan baca sel mentah. Bacakan per baris sebagai kalimat: "Baris pertama adalah regression dengan satu angka di akhir, head-nya Linear pada langkah terakhir, dan loss-nya MSE atau MAE." Untuk tabel angka, tunjukkan polanya, bukan semua sel.
- **`code`** - Jangan baca kode baris demi baris secara harfiah. Jelaskan apa yang dilakukan tiap bagian: "Di bagian forward, kita ambil hidden state di langkah terakhir, kemudian mengirimnya ke head."
- **`split` (perbandingan)** - "Yang pertama adalah ... Yang kedua adalah ..." Jelaskan kedua sisi sebagai dua paragraf kontras yang utuh.
- **`image`** - Buka dengan ajakan melihat ("Lihat gambar ini", "Biar tidak abstrak, lihat contoh nyata ini"), lalu jelaskan isi gambar dalam kalimat, lalu tarik kesimpulannya. Slide teks **setelah** gambar wajib membuka dengan "Dari gambar tadi, ...".
- **`cta`** - Ajakan menutup: rangkum yang dipraktikkan di lab, sebut perkiraan waktu, lalu undang membuka lab.

## Suara dan Diksi

- Pakai "kita" untuk hal yang dikerjakan bersama, "Anda" untuk tugas yang dikerjakan peserta sendiri (lab, refleksi).
- Register: dosen yang menjelaskan dengan santai tapi runut. Boleh "nah", "jadi", "oh ya, ada satu catatan".
- Boleh menyapa peserta langsung saat lab/refleksi: "kalau model sequence Anda gagal belajar, jangan langsung ganti arsitektur."
- Hindari kalimat super panjang yang tak terbaca dalam satu napas. Kalau perlu, pecah jadi dua kalimat dengan "kemudian" atau "lalu".
- Patuhi semua larangan `CLAUDE.md`: tidak ada em dash, tidak ada metafora teknis ("data mengalir", "gerbang"), tidak ada calque ("secara praktis", "bekerja baik").

## Catatan Panggung

Pakai `[...]` untuk instruksi ke instruktur yang **tidak dibaca**: kapan memperlambat, apa yang ditekankan, kapan menggambar di papan. Contoh: `[Catatan: bilang di awal bahwa W5 ini paling padat teknisnya, supaya peserta siap.]`

## Penutup Naskah

Bagian akhir file boleh diisi catatan rujukan kalau berguna, tapi jangan ulang panduan lafal yang sudah jadi kebiasaan. Kalau ada simbol yang benar-benar baru di minggu itu, cukup jelaskan sekali di slide tempat ia muncul.

## Checklist Audit-Diri (jalankan baris demi baris sebelum naskah dinyatakan selesai)

- [ ] Jumlah dan urutan bagian sama persis dengan `slides-XX.ts`.
- [ ] Tiap header pakai format `## Slide N - <judul slide>`.
- [ ] Tidak ada fragmen. Tiap kalimat lolos cek SPOK (subjek, predikat, objek jelas).
- [ ] Tidak ada label gaya bab ("Kekuatan:", "Asumsi:", "**Term.** Definisi").
- [ ] Persamaan dijelaskan di dalam kalimat utuh dengan nama tiap suku, bukan ejaan simbol terpotong.
- [ ] Slide agenda/daftar menyebut sebab-akibat penting, bukan cuma judul materi.
- [ ] Slide teks setelah gambar dibuka dengan "Dari gambar tadi, ...".
- [ ] Tiap singkatan dijabarkan kepanjangannya saat pertama kali muncul, bukan baru di slide tengah. Contoh: pertama kali sebut BPTT, langsung "BPTT, singkatan dari Backpropagation Through Time". Cek juga kepanjangan yang sama sudah ada di chapter dan slide pada titik pertama munculnya.
- [ ] Penanda lisan ("kemudian", "nah", "jadi", "sebaliknya") dipakai untuk menyambung, naskah terdengar mengalir saat dibaca lantang.
- [ ] Tidak ada em dash, metafora teknis, dramatisasi, atau calque (cek `SWEEPER.md`).
- [ ] Catatan panggung `[...]` cuma untuk instruksi, bukan untuk dibaca.
- [ ] Coba baca lantang satu materi penuh. Kalau tersendat atau terdengar seperti daftar, perbaiki.

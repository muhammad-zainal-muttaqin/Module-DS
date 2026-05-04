# Pre-Registration: [Judul Singkat Eksperimen]

**Tanggal pre-reg:** YYYY-MM-DD  
**Commit saat pre-reg:** `git rev-parse --short HEAD`  
**Dibuat oleh:** [Nama]

> **Penting:** File ini harus di-commit SEBELUM kode eksperimen pertama ditulis.
> Verifikasi dengan: `git log --follow docs/preregs/<file>.md` - tanggal commit harus lebih awal dari commit kode.

---

## 1. Motivasi

_Mengapa eksperimen ini perlu dilakukan? Hubungkan ke masalah konkret atau instruksi PI._

Contoh:
> PI meminta membandingkan focal loss vs cross-entropy pada dataset yang sangat tidak seimbang.
> Hipotesis PI: focal loss membantu karena mengurangi bobot sampel mudah.

---

## 2. Hipotesis yang Dapat Dipalsukan

_Satu kalimat pernyataan yang jelas bisa salah. Hindari "kemungkinan besar" atau "mungkin lebih baik"._

**Hipotesis utama:**
> [Intervensi X] akan meningkatkan [metrik Y] pada [dataset Z] sebesar setidaknya [δ] poin dibandingkan baseline.

**Kondisi kegagalan hipotesis:**
> Jika [metrik Y] meningkat kurang dari [δ] poin atau menurun, hipotesis dianggap tidak terkonfirmasi.

---

## 3. Protokol Eksperimen

### 3.1 Dataset
- Dataset: [nama, versi, sumber]
- Split: [train / val / test - ukuran masing-masing]
- Preprocessing: [augmentasi, normalisasi]

### 3.2 Baseline
- Deskripsi: [arsitektur, loss, optimizer, scheduler]
- Config file: `configs/[nama].yaml`
- Perlu dijalankan ulang: [ ] Ya / [ ] Tidak (sudah ada di `experiments/`)

### 3.3 Intervensi
- Apa yang berubah dari baseline: [satu perubahan utama]
- Config file: `configs/[nama_intervensi].yaml`
- Parameter penting: [misal: gamma=2.0, freeze_until=block1]

### 3.4 Metrik
- Metrik primer: [val_acc / F1-macro / AUC / ...]
- Metrik sekunder: [per-class F1 / calibration / ...]
- Threshold δ: [misal ≥ 2 poin F1-macro]

### 3.5 Seeds dan Replikasi
- Jumlah seed: [minimal 3]
- Seed yang dipakai: [42, 123, 2024]
- Cara melaporkan: μ ± σ dari [jumlah] seed

### 3.6 Jadwal
- Estimasi waktu training: [X jam × Y run]
- Deadline laporan: [YYYY-MM-DD]

---

## 4. Hasil yang Diharapkan

_Sebelum melihat hasil: tuliskan prediksi arahnya dan alasannya._

> Saya memperkirakan [intervensi] akan [meningkatkan/menurunkan/tidak berpengaruh] karena [mekanisme].
> Jika hasilnya berlawanan arah, kemungkinan penyebab yang perlu dicek:
> 1. [penyebab 1]
> 2. [penyebab 2]

---

## 5. Kondisi Revisi Pre-Reg

_Kapan boleh mengubah pre-reg setelah melihat data / hasil parsial?_

Perubahan yang diizinkan (dengan dokumentasi):
- [ ] Bug di implementasi yang mempengaruhi baseline (catat di bagian Amandemen)
- [ ] Hyperparameter tidak comparable antar kondisi (catat justifikasi)

Perubahan yang TIDAK diizinkan:
- Mengganti metrik setelah melihat angka akhir
- Menghapus kondisi yang hasilnya buruk

---

## Amandemen

_Isi setelah pre-reg jika ada perubahan dari protokol asli. Setiap amandemen harus mencatat: tanggal, apa yang berubah, dan mengapa._

| Tanggal | Perubahan | Alasan |
| --- | --- | --- |
| | | |

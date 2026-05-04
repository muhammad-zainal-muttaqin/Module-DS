# Experiment Log - <nama eksperimen>

**Tanggal mulai:** YYYY-MM-DD
**Pre-reg:** `../preregs/<file>.md`
**Config:** `../../configs/<file>.yaml`
**Commit:** `<hash>`
**Hardware:** <GPU atau CPU yang dipakai>

---

## 1. Ringkasan Protokol

- **Dataset:** <CIFAR-10 / PathMNIST / ...>
- **Baseline:** <config file baseline>
- **Intervensi:** <apa yang diubah>
- **Metrik utama:** <val_acc / balanced_acc / F1-macro>
- **Seeds:** [42, 123, 2024]

## 2. Hasil Utama

| Seed | val_acc | test_acc | duration | catatan |
|------|---------|----------|----------|---------|
| 42   | 0.___   | 0.___    | __m      |         |
| 123  | 0.___   | 0.___    | __m      |         |
| 2024 | 0.___   | 0.___    | __m      |         |
| **μ ± σ** | **0.___ ± 0.___** | **0.___ ± 0.___** | |  |

## 3. Perbandingan dengan Pre-Registration

- Hipotesis pre-reg: <tulis ulang kalimat hipotesis>
- Kriteria sukses: Δ ≥ <nilai>, |σ| ≤ <nilai>
- Δ aktual: <+X.XX%>
- **Verdict:** terkonfirmasi / tidak terkonfirmasi / inconclusive

## 4. Deviasi dari Pre-Registration

(Kosongkan jika tidak ada. Setiap deviasi harus jujur disebut, bukan disembunyikan.)

- <deviasi>: alasan.

## 5. Error Analysis Singkat

- Kelas / kasus yang paling sering salah: <...>
- Pola yang teramati: <...>
- Apakah pola ini dapat dijelaskan oleh hipotesis? <...>

## 6. Temuan Tambahan

- <temuan menarik yang muncul di luar hipotesis>

## 7. Langkah Berikutnya

- [ ] Ablasi <komponen>
- [ ] Replikasi di <dataset kedua>
- [ ] Ekstensi <arah baru>

## 8. Artefak yang Dihasilkan

- `experiments/<name>_seed42/ckpt_best.pt`
- `experiments/<name>_seed42/config.yaml`
- `experiments/<name>_seed42/train.log`
- `experiments/results.csv` (baris ditambahkan)
- `experiments/plots/<plot>.png`

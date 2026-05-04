# Website Modul Pembelajaran

SPA untuk memperlihatkan 13 bab modul + fitur interaktif (progres, jurnal refleksi, self-assessment 10 kompetensi, generator protokol eksperimen, diff config YAML, glosarium ID-EN).

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS (design token 4-sikap: curiosity/rigor/skepticism/ownership)
- react-router-dom (hash routing, kompatibel GitHub Pages subfolder)
- react-markdown + remark-gfm + rehype-raw/slug/autolink-headings
- Shiki (core + oniguruma engine, 9 bahasa di-bundle)
- MiniSearch (full-text search client-side)
- Zustand + localStorage (persist progres + jurnal)

## Menjalankan lokal

```bash
npm install
npm run dev
```

Buka http://localhost:5173/

Skrip `sync-content.mjs` otomatis menyalin 17 `.md` dari `../chapters/` plus 7 YAML dari `../template/configs/` ke `src/content/` sebelum dev/build, serta mem-parse `14_Lampiran.md` untuk `glossary.json`.

## Build produksi

```bash
npm run build
npm run preview  # preview dist lokal
```

Output di `dist/`. Deploy otomatis via `.github/workflows/deploy-pages.yml` pada push ke `main`.

## Struktur

```
src/
├── main.tsx, App.tsx, index.css
├── content/              (gitignored, di-sync dari ../)
├── routes/               Home, ModuleList, ModuleReader, Rubric, Glossary, Capstone, Labs, Progress, NotFound
│   └── tools/            ToolsIndex, ProtocolGenerator, ConfigDiff
├── components/           Layout, EmailHero, LadderProgress, AttitudeCard, CompetencyGrid,
│                         MarkdownRenderer, CodeBlock, TableOfContents, ReflectionPrompt, SearchDialog
└── lib/                  chapters (metadata), content (raw MD loader), storage (zustand), search, highlight
```

## Routing

| Path | Isi |
|------|-----|
| `#/` | Landing: EmailHero + 4 sikap + alur 14 minggu + 10 kompetensi |
| `#/modul` | Grid 13 bab |
| `#/modul/:id` | Reader bab dengan ToC sidebar + jurnal refleksi |
| `#/rubrik` | Self-assessment 9x4 + rubrik lengkap |
| `#/glosarium` | 220+ entri ID-EN dengan pencarian |
| `#/capstone` | Bab 10 full |
| `#/lab` | Daftar 9 lab notebook + tautan Colab/nbviewer/GitHub |
| `#/progres` | Dashboard progres + jurnal export .md/.json |
| `#/alat`, `#/alat/protokol`, `#/alat/diff-config` | Tool interaktif |

Global `Ctrl+K` membuka pencarian fuzzy lintas bab.

## Konvensi

Zero em-dash, straight quotes ASCII, diksi natural Indonesia sesuai `CLAUDE.md`. Chrome UI berbahasa Indonesia (Beranda, Modul, Rubrik, Glosarium, Capstone, Lab, Cari, Progres, Alat). Istilah teknis (loss, freeze, seed, ablation, checkpoint) tetap English.

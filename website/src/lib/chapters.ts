// Metadata 17 bab week-based. Konten aktual dari src/content/chapters/*.md (di-import raw).

export type Sikap = "curiosity" | "rigor" | "skepticism" | "ownership";

export type ChapterMeta = {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  weeks: string;
  weekNumbers: number[];
  sikap: Sikap[];
  labName: string | null;
  filename: string;
};

export const CHAPTERS: ChapterMeta[] = [
  {
    id: "00",
    number: 0,
    title: "Pendahuluan",
    subtitle: "Orientasi bootcamp, target hasil, kontrak belajar",
    weeks: "1",
    weekNumbers: [1],
    sikap: ["curiosity"],
    labName: null,
    filename: "00_Pendahuluan.md",
  },
  {
    id: "00a",
    number: 0,
    title: "Prasyarat Modul",
    subtitle: "Shape tensor, konvensi huruf, kalkulus mini, PyTorch primer",
    weeks: "–",
    weekNumbers: [],
    sikap: ["curiosity"],
    labName: null,
    filename: "00a_Prasyarat.md",
  },
  {
    id: "01",
    number: 1,
    title: "W1 - Tabular Foundations & Output Heads",
    subtitle: "MLP sebagai shape transformer, output head + loss matching",
    weeks: "1",
    weekNumbers: [1],
    sikap: ["curiosity"],
    labName: "Lab W1 - Tabular Output Heads",
    filename: "01_W1_Tabular_Output_Heads.md",
  },
  {
    id: "02",
    number: 2,
    title: "W2 - Images, CNN & Smoke Test",
    subtitle: "Tensor citra, CNN, three-level smoke test ritual",
    weeks: "2",
    weekNumbers: [2],
    sikap: ["curiosity", "rigor"],
    labName: "Lab W2 - Baseline CNN",
    filename: "02_W2_Images_CNN_Smoke_Test.md",
  },
  {
    id: "03",
    number: 3,
    title: "W3 - Loss, Optimizer & Evaluasi",
    subtitle: "Example-first: galeri 5 run, loss/opt/eval theory",
    weeks: "3",
    weekNumbers: [3],
    sikap: ["curiosity", "rigor"],
    labName: "Lab W3 - Loss + Freeze Ablation",
    filename: "03_W3_Loss_Optimizer_Evaluasi.md",
  },
  {
    id: "04",
    number: 4,
    title: "W4 - Reproducibility & Experiment Matrix",
    subtitle: "Experiment matrix, YAML/seed/checkpoint, logging",
    weeks: "4",
    weekNumbers: [4],
    sikap: ["rigor"],
    labName: "Lab W4 - Config + Logging",
    filename: "04_W4_Reproducibility_Experiment_Matrix.md",
  },
  {
    id: "05",
    number: 5,
    title: "W5 - Sequences: RNN & LSTM",
    subtitle: "RNN vs LSTM, gradient flow, sequential data",
    weeks: "5",
    weekNumbers: [5],
    sikap: ["curiosity"],
    labName: "Lab W5 - LSTM Sequence",
    filename: "05_W5_Sequences_RNN_LSTM.md",
  },
  {
    id: "06",
    number: 6,
    title: "W6 - Representations & Temporal Leakage",
    subtitle: "Representasi recap, temporal leakage demo, EDA",
    weeks: "6",
    weekNumbers: [6],
    sikap: ["skepticism"],
    labName: "Lab W6 - EDA + Temporal Leakage",
    filename: "06_W6_Representations_Temporal_Leakage.md",
  },
  {
    id: "07",
    number: 7,
    title: "W7 - Text, Transformers & Repo Adoption",
    subtitle: "Text, transformers, AI tools, repo adoption workflow",
    weeks: "7",
    weekNumbers: [7],
    sikap: ["ownership", "curiosity"],
    labName: "Lab W7 - LLM-Assisted Loop",
    filename: "07_W7_Text_Transformers_Repo_Adoption.md",
  },
  {
    id: "08",
    number: 8,
    title: "W8 - Foundation Models",
    subtitle: "Taxonomi modality×family×adaptation, platform evaluation",
    weeks: "8",
    weekNumbers: [8],
    sikap: ["curiosity"],
    labName: "Lab W8 - Remote Training",
    filename: "08_W8_Foundation_Models.md",
  },
  {
    id: "09",
    number: 9,
    title: "W9 - Multimodal Reasoning",
    subtitle: "Fusion, per-modality ablation, missing modality",
    weeks: "9",
    weekNumbers: [9],
    sikap: ["curiosity"],
    labName: "Lab W9 - Multimodal Ablation",
    filename: "09_W9_Multimodal_Reasoning.md",
  },
  {
    id: "10",
    number: 10,
    title: "W10 - Paper Reading & Implementasi Paper",
    subtitle: "3-pass paper reading, paper-to-code workflow",
    weeks: "10",
    weekNumbers: [10],
    sikap: ["ownership", "curiosity"],
    labName: "Lab W10 - Paper to Code",
    filename: "10_W10_Paper_Reading.md",
  },
  {
    id: "11",
    number: 11,
    title: "W11 - Research Framing",
    subtitle: "Framework Input→Middle→Output, framing menu, literature triage",
    weeks: "11",
    weekNumbers: [11],
    sikap: ["ownership", "rigor"],
    labName: "Capstone Proposal",
    filename: "11_W11_Research_Framing.md",
  },
  {
    id: "12",
    number: 12,
    title: "Capstone - Proyek Riset",
    subtitle: "Filter+defense, rethink, final talks, pengumpulan",
    weeks: "12-15",
    weekNumbers: [12, 13, 14, 15],
    sikap: ["ownership", "rigor"],
    labName: "Capstone",
    filename: "12_Capstone.md",
  },
  {
    id: "13",
    number: 13,
    title: "Rubrik Penilaian",
    subtitle: "4-level mastery: novice, developing, proficient, masterpiece",
    weeks: "-",
    weekNumbers: [],
    sikap: ["rigor"],
    labName: null,
    filename: "13_Rubrik_Penilaian.md",
  },
  {
    id: "14",
    number: 14,
    title: "Lampiran",
    subtitle: "Glosarium ID-EN, backprop, checklist, template",
    weeks: "-",
    weekNumbers: [],
    sikap: ["rigor"],
    labName: null,
    filename: "14_Lampiran.md",
  },
  {
    id: "15",
    number: 15,
    title: "Panduan Instruktur",
    subtitle: "Filosofi, pacing, emphasis per-bab, cara nilai portofolio",
    weeks: "-",
    weekNumbers: [],
    sikap: ["ownership", "rigor"],
    labName: null,
    filename: "15_Panduan_Instruktur.md",
  },
];

export type CompetencyMeta = {
  n: number;
  title: string;
  weeks: string;
  chapters: string[];
};

export const COMPETENCIES: CompetencyMeta[] = [
  { n: 1, title: "Memahami sistem ML/DL dalam praktiknya", weeks: "W1–W9",              chapters: ["01","02","03","04","05","06","07","08","09"] },
  { n: 2, title: "Menerjemahkan ide menjadi eksperimen",   weeks: "W3–W4, W11, Capstone", chapters: ["03","04","11","12"] },
  { n: 3, title: "Eksperimen reproduksibel",               weeks: "W3, W4, Capstone",     chapters: ["03","04","12"] },
  { n: 4, title: "Validasi data dan pra-pemrosesan",       weeks: "W3, W6, W9",           chapters: ["03","06","09"] },
  { n: 5, title: "AI tools sebagai pendukung",             weeks: "W7–W8",                chapters: ["07","08"] },
  { n: 6, title: "Adopsi repository riset asing",          weeks: "W7, W10, Capstone",    chapters: ["07","10","12"] },
  { n: 7, title: "Membuat alat pendukung riset ringan",    weeks: "W12–W15",              chapters: ["12"] },
  { n: 8, title: "Mengadopsi platform dan tool baru",      weeks: "W8, Capstone",         chapters: ["08","12"] },
  { n: 9, title: "Berkembang mandiri",                     weeks: "W10, W11, Capstone",   chapters: ["10","11","12"] },
  { n: 10, title: "Eksplorasi Mandiri & Komunikasi",       weeks: "W4–W11",                chapters: ["04","05","06","07","08","09","10","11"] },
];

export const SIKAP_META: Record<Sikap, { label: string; color: string; tagline: string; essence: string }> = {
  curiosity: {
    label: "Curiosity",
    color: "curiosity",
    tagline: "Rasa ingin tahu yang gelisah",
    essence: "Bertanya 'mengapa' sebelum menerima hasil.",
  },
  rigor: {
    label: "Rigor",
    color: "rigor",
    tagline: "Disiplin dalam prosedur",
    essence: "Satu variabel berubah, semua jejak tersimpan, tiap angka bisa dilacak.",
  },
  skepticism: {
    label: "Skepticism",
    color: "skepticism",
    tagline: "Kesediaan tidak percaya angka sendiri",
    essence: "Akurasi 99% di hari pertama bukan kabar baik, itu lampu merah.",
  },
  ownership: {
    label: "Ownership",
    color: "ownership",
    tagline: "Rasa memiliki yang melampaui alat",
    essence: "LLM boleh menulis kode, tanggung jawab tetap Anda.",
  },
};

export const EXPECTED_OUTCOMES = [
  "Memahami sistem ML/DL praktis pada level penelitian.",
  "Menerjemahkan ide penelitian dan instruksi PI menjadi eksperimen konkret.",
  "Melaksanakan eksperimen dengan benar dan dapat direproduksi.",
  "Memeriksa data dan memvalidasi prapemrosesan sebelum mempercayai hasilnya.",
  "Menggunakan tools AI sebagai pendukung penelitian tanpa mengalihdayakan pemikiran.",
  "Mengadopsi dan menyesuaikan research repository yang tidak dikenal secara mandiri.",
  "Membuat alat pendukung penelitian yang ringan dengan cepat.",
  "Mengadopsi platform dan tool baru sesuai kebutuhan.",
  "Berkembang dan berkontribusi secara mandiri.",
];

export function chapterById(id: string): ChapterMeta | undefined {
  return CHAPTERS.find((c) => c.id === id);
}

export function nextChapter(id: string): ChapterMeta | undefined {
  const i = CHAPTERS.findIndex((c) => c.id === id);
  return i >= 0 && i < CHAPTERS.length - 1 ? CHAPTERS[i + 1] : undefined;
}

export function prevChapter(id: string): ChapterMeta | undefined {
  const i = CHAPTERS.findIndex((c) => c.id === id);
  return i > 0 ? CHAPTERS[i - 1] : undefined;
}

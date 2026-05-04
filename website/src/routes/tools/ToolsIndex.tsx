import { Link } from "react-router-dom";

const TOOLS = [
  {
    to: "/alat/protokol",
    title: "Generator Protokol Eksperimen",
    desc: "Isi 5 pertanyaan dari Bab 02 (tujuan, baseline, variabel, metrik, hasil harapan). Unduh sebagai .md siap commit.",
    tag: "Bab 02",
    color: "border-rigor/30 hover:border-rigor",
  },
  {
    to: "/alat/diff-config",
    title: "Viewer Diff Config YAML",
    desc: "Bandingkan baseline.yaml dan focal_freeze.yaml side-by-side. Highlight baris yang berubah.",
    tag: "Bab 03",
    color: "border-curiosity/30 hover:border-curiosity",
  },
  {
    to: "/glosarium",
    title: "Glosarium ID-EN",
    desc: "Terjemahan istilah teknis ML/DL dengan catatan nuansa. Pencarian cepat.",
    tag: "Bab 12",
    color: "border-ownership/30 hover:border-ownership",
  },
  {
    to: "/progres",
    title: "Progress Tracker",
    desc: "Tangga 14 minggu, 9 self-assessment, export jurnal ke .md.",
    tag: "Semua bab",
    color: "border-skepticism/30 hover:border-skepticism",
  },
];

export default function ToolsIndex() {
  return (
    <div className="page-narrow">
      <header className="page-header">
        <h1 className="page-title">Alat Bantu</h1>
        <p className="page-lead">
          Utilitas interaktif yang mengubah konsep di bab menjadi artefak konkret - protokol, diff, jurnal, self-assessment.
        </p>
      </header>

      <ul className="grid sm:grid-cols-2 gap-4">
        {TOOLS.map((t) => (
          <li key={t.to}>
            <Link
              to={t.to}
              className={`group block h-full rounded-xl border-2 bg-white dark:bg-white/[0.03] p-6 transition-all ${t.color}`}
            >
              <div className="text-xs font-mono text-ink/70 dark:text-parchment/60 mb-2">{t.tag}</div>
              <div className="font-serif text-xl font-semibold mb-2 group-hover:text-rigor dark:group-hover:text-curiosity">
                {t.title}
              </div>
              <p className="text-sm text-ink/70 dark:text-parchment/75 leading-relaxed">{t.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

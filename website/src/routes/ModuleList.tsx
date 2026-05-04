import { Link } from "react-router-dom";
import { CHAPTERS, SIKAP_META } from "../lib/chapters";
import { getChapterMarkdown, readingMinutes } from "../lib/content";

const SIKAP_CHIP: Record<string, string> = {
  curiosity: "bg-curiosity-soft text-curiosity-deep dark:bg-curiosity/20 dark:text-curiosity",
  rigor: "bg-rigor-soft text-rigor-deep dark:bg-rigor/20 dark:text-rigor",
  skepticism: "bg-skepticism-soft text-skepticism-deep dark:bg-skepticism/20 dark:text-skepticism",
  ownership: "bg-ownership-soft text-ownership-deep dark:bg-ownership/20 dark:text-ownership",
};

export default function ModuleList() {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Daftar Modul</h1>
        <p className="page-lead">
          14 bab, dibaca berurutan dari Bab 00. Setiap bab mengikuti urutan tetap: Peta → Motivasi → Konsep → Worked Example → Pitfalls → Lab → Refleksi → Bacaan.
        </p>
      </header>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CHAPTERS.map((ch) => {
          const mins = readingMinutes(getChapterMarkdown(ch.id));
          return (
            <li key={ch.id}>
              <Link
                to={`/modul/${ch.id}`}
                className="group card-link hover:shadow-card p-6 h-full"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="font-mono text-xs text-ink/70 dark:text-parchment/60">Bab {ch.id}</span>
                  <span className="font-mono text-xs text-ink/70 dark:text-parchment/60">Minggu {ch.weeks}</span>
                </div>
                <h2 className="font-serif text-xl font-semibold mb-1 group-hover:text-rigor dark:group-hover:text-curiosity transition-colors">
                  {ch.title}
                </h2>
                <p className="text-sm text-ink/70 dark:text-parchment/70 mb-4 leading-relaxed">
                  {ch.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 mb-3">
                  {ch.sikap.map((s) => (
                    <span key={s} className={`chip ${SIKAP_CHIP[s]}`}>
                      {SIKAP_META[s].label}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-ink/70 dark:text-parchment/60 pt-3 border-t border-black/5 dark:border-white/5">
                  <span>{mins} min baca</span>
                  {ch.labName && <span>{ch.labName}</span>}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

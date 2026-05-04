import { Link, useParams, Navigate } from "react-router-dom";
import { COMPETENCIES, CHAPTERS, SIKAP_META } from "../lib/chapters";
import { getChapterMarkdown, readingMinutes } from "../lib/content";

const SIKAP_CHIP: Record<string, string> = {
  curiosity: "bg-curiosity-soft text-curiosity-deep dark:bg-curiosity/20 dark:text-curiosity",
  rigor: "bg-rigor-soft text-rigor-deep dark:bg-rigor/20 dark:text-rigor",
  skepticism: "bg-skepticism-soft text-skepticism-deep dark:bg-skepticism/20 dark:text-skepticism",
  ownership: "bg-ownership-soft text-ownership-deep dark:bg-ownership/20 dark:text-ownership",
};

export default function CompetencyDetail() {
  const { id } = useParams<{ id: string }>();
  const n = Number(id);
  const competency = COMPETENCIES.find((c) => c.n === n);

  if (!competency) return <Navigate to="/" replace />;

  const relatedChapters = competency.chapters
    .map((cid) => CHAPTERS.find((ch) => ch.id === cid))
    .filter(Boolean) as typeof CHAPTERS;

  return (
    <div className="page">
      <nav className="mb-6 text-sm text-ink/60 dark:text-parchment/50 flex items-center gap-1.5">
        <Link to="/" className="hover:text-rigor dark:hover:text-curiosity transition-colors">
          Beranda
        </Link>
        <span>/</span>
        <span className="text-ink/40 dark:text-parchment/30">Kompetensi</span>
        <span>/</span>
        <span className="text-ink dark:text-parchment font-medium">K{competency.n}</span>
      </nav>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rigor text-white font-mono text-lg font-bold shrink-0">
            {competency.n}
          </span>
          <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-ink/70 dark:text-parchment/60">
            {competency.weeks}
          </span>
        </div>
        <h1 className="page-title mb-2">{competency.title}</h1>
        <p className="page-lead">
          Kompetensi ini dilatih di {relatedChapters.length} bab. Pilih bab yang ingin Anda buka.
        </p>
      </header>

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {relatedChapters.map((ch) => {
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
                  {ch.labName && <span className="truncate max-w-[60%]">{ch.labName}</span>}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <Link to="/" className="btn-secondary">
          ← Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}

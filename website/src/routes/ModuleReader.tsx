import { Link, useParams, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { CHAPTERS, chapterById, nextChapter, prevChapter, SIKAP_META } from "../lib/chapters";
import { extractHeadings, getChapterMarkdown, readingMinutes } from "../lib/content";
import { hasSlideDeck } from "../lib/slides";
import MarkdownRenderer from "../components/MarkdownRenderer";
import TableOfContents from "../components/TableOfContents";
import ReflectionPrompt from "../components/ReflectionPrompt";

export default function ModuleReader() {
  const { id = "00" } = useParams<{ id: string }>();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const chapter = chapterById(id);
  const markdown = useMemo(() => getChapterMarkdown(id), [id]);
  const headings = useMemo(() => extractHeadings(markdown), [markdown]);
  const prev = prevChapter(id);
  const next = nextChapter(id);
  const mins = useMemo(() => readingMinutes(markdown), [markdown]);
  const hasSlides = hasSlideDeck(id);

  useEffect(() => {
    const anchorId = searchParams.get("anchor") || location.hash?.slice(1);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } else {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [id, searchParams, location.hash]);

  if (!chapter) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="font-serif text-display font-semibold tracking-tight mb-4">Bab tidak ditemukan</h1>
        <Link to="/modul" className="btn-primary">Kembali ke daftar</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_16rem] xl:grid-cols-[minmax(0,1fr)_18rem] gap-10">
        <article className="min-w-0">
          <header className="mb-8 pb-6 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-3 text-xs font-mono text-ink/70 dark:text-parchment/60 mb-3">
              <Link to="/modul" className="hover:underline">Modul</Link>
              <span aria-hidden="true">/</span>
              <span>Bab {chapter.id}</span>
              <span aria-hidden="true">·</span>
              <span>Minggu {chapter.weeks}</span>
              <span aria-hidden="true">·</span>
              <span>{mins} min baca</span>
            </div>
            <h1 className="font-serif text-display font-semibold tracking-tight mb-2">
              {chapter.title}
            </h1>
            <p className="text-lg text-ink/70 dark:text-parchment/75 leading-relaxed">{chapter.subtitle}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {chapter.sikap.map((s) => (
                <span key={s} className="chip bg-parchment dark:bg-white/10 text-ink/80 dark:text-parchment/90">
                  {SIKAP_META[s].label}
                </span>
              ))}
              {chapter.labName && (
                <span className="chip bg-rigor/10 text-rigor dark:bg-rigor/20 dark:text-curiosity">
                  {chapter.labName}
                </span>
              )}
              {hasSlides && (
                <Link
                  to={`/slide/${id}`}
                  className="chip bg-curiosity/10 text-curiosity-deep dark:bg-curiosity/20 dark:text-curiosity hover:bg-curiosity/20 transition-colors"
                >
                  ▶ Slide Ringkasan
                </Link>
              )}
            </div>
          </header>

          <MarkdownRenderer markdown={markdown} />

          <ReflectionPrompt chapterId={chapter.id} />

          <nav className="mt-12 pt-6 border-t border-black/10 dark:border-white/10 grid grid-cols-2 gap-4" aria-label="Navigasi bab">
            <div>
              {prev ? (
                <Link to={`/modul/${prev.id}`} className="group card-link p-4">
                  <div className="text-xs font-mono text-ink/70 dark:text-parchment/60">← Bab sebelumnya</div>
                  <div className="font-serif font-semibold mt-1 group-hover:text-rigor dark:group-hover:text-curiosity">{prev.title}</div>
                </Link>
              ) : (
                <div className="rounded-xl border border-dashed border-black/10 dark:border-white/10 p-4 text-sm text-ink/70 dark:text-parchment/50">
                  Ini bab pertama.
                </div>
              )}
            </div>
            <div>
              {next ? (
                <Link to={`/modul/${next.id}`} className="group card-link p-4 text-right">
                  <div className="text-xs font-mono text-ink/70 dark:text-parchment/60">Bab berikutnya →</div>
                  <div className="font-serif font-semibold mt-1 group-hover:text-rigor dark:group-hover:text-curiosity">{next.title}</div>
                </Link>
              ) : (
                <div className="rounded-xl border border-dashed border-black/10 dark:border-white/10 p-4 text-sm text-ink/70 dark:text-parchment/50 text-right">
                  Ini bab terakhir.
                </div>
              )}
            </div>
          </nav>
        </article>

        <aside className="hidden lg:block no-print">
          <div
            className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto overscroll-contain scrollbar-hidden pb-10"
            style={{
              maskImage: "linear-gradient(to bottom, black calc(100% - 2rem), transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, black calc(100% - 2rem), transparent)",
            }}
          >
            <TableOfContents headings={headings} />
            <div className="mt-6 pt-4 border-t border-black/10 dark:border-white/10">
              <div className="text-xs font-mono text-ink/70 dark:text-parchment/60 mb-2">Semua bab</div>
              <ul className="space-y-0.5 text-sm">
                {CHAPTERS.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={`/modul/${c.id}`}
                      className={`block px-2 py-1 rounded ${
                        c.id === chapter.id
                          ? "bg-rigor/10 dark:bg-rigor/20 text-rigor dark:text-curiosity font-medium"
                          : "hover:bg-parchment dark:hover:bg-white/5 text-ink/75 dark:text-parchment/75"
                      }`}
                    >
                      <span className="font-mono text-xs mr-2">{c.id}</span>
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { COMPETENCIES } from "../lib/chapters";
import { getChapterMarkdown } from "../lib/content";
import { useStore, type MasteryLevel } from "../lib/storage";
import MarkdownRenderer from "../components/MarkdownRenderer";

const LEVELS: { key: Exclude<MasteryLevel, null>; label: string; score: number; color: string }[] = [
  { key: "novice", label: "Novice", score: 50, color: "bg-skepticism-soft text-skepticism-deep dark:bg-skepticism/20 dark:text-skepticism" },
  { key: "developing", label: "Developing", score: 70, color: "bg-curiosity-soft text-curiosity-deep dark:bg-curiosity/20 dark:text-curiosity" },
  { key: "proficient", label: "Proficient", score: 85, color: "bg-rigor-soft text-rigor-deep dark:bg-rigor/20 dark:text-rigor" },
  { key: "masterpiece", label: "Masterpiece", score: 95, color: "bg-ownership-soft text-ownership-deep dark:bg-ownership/20 dark:text-ownership" },
];

export default function Rubric() {
  const mastery = useStore((s) => s.mastery);
  const setMastery = useStore((s) => s.setMastery);
  const markdown = useMemo(() => getChapterMarkdown("11"), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const avgScore = useMemo(() => {
    const scores: number[] = [];
    for (const c of COMPETENCIES) {
      const level = mastery[c.n];
      if (level) {
        const found = LEVELS.find((l) => l.key === level);
        if (found) scores.push(found.score);
      }
    }
    if (scores.length === 0) return null;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [mastery]);

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Rubrik Penilaian</h1>
        <p className="page-lead">
          Sepuluh kompetensi, empat level. Gunakan self-assessment di bawah untuk mengukur posisi Anda minggu ini - jujur tanpa menghukum.
        </p>
      </header>

      <section className="section-gap card p-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2 className="card-title mb-1">Self-assessment 10 kompetensi</h2>
            <p className="text-sm text-ink/70 dark:text-parchment/70">
              Pilih level yang paling mencerminkan kebiasaan Anda, bukan angan-angan.
            </p>
          </div>
          {avgScore !== null && (
            <div className="text-right">
              <div className="text-xs font-mono text-ink/70 dark:text-parchment/60">Rata-rata</div>
              <div className="font-serif text-3xl font-semibold text-rigor dark:text-curiosity">{avgScore}</div>
            </div>
          )}
        </div>

        <div className="overflow-x-auto scrollbar-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-black/10 dark:border-white/10">
                <th className="py-2 pr-4 font-medium">Kompetensi</th>
                {LEVELS.map((l) => (
                  <th key={l.key} className="py-2 px-2 font-medium text-center">
                    {l.label}
                    <div className="text-xs font-mono text-ink/70 dark:text-parchment/50 font-normal">{l.score}</div>
                  </th>
                ))}
                <th className="py-2 pl-2 font-medium text-right">Reset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {COMPETENCIES.map((c) => {
                const current = mastery[c.n];
                return (
                  <tr key={c.n}>
                    <td className="py-3 pr-4 align-top">
                      <Link to={`/kompetensi/${c.n}`} className="font-medium hover:underline">
                        {c.n}. {c.title}
                      </Link>
                      <div className="text-xs font-mono text-ink/70 dark:text-parchment/50">{c.weeks}</div>
                    </td>
                    {LEVELS.map((l) => (
                      <td key={l.key} className="py-2 px-1 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => setMastery(c.n, l.key)}
                          aria-pressed={current === l.key}
                          aria-label={`Set ${c.title} ke ${l.label}`}
                          className={`w-full px-2 py-1.5 rounded text-xs font-medium transition-all ${
                            current === l.key
                              ? `${l.color} ring-2 ring-rigor`
                              : "bg-parchment/60 dark:bg-white/5 hover:bg-parchment dark:hover:bg-white/10 text-ink/70 dark:text-parchment/70"
                          }`}
                        >
                          {l.label}
                        </button>
                      </td>
                    ))}
                    <td className="py-2 pl-2 text-right">
                      <button
                        type="button"
                        onClick={() => setMastery(c.n, null)}
                        className="text-xs text-ink/70 dark:text-parchment/50 hover:text-skepticism"
                        aria-label={`Hapus nilai ${c.title}`}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="card-title mb-6">Rubrik lengkap (sumber Bab 11)</h2>
        <MarkdownRenderer markdown={markdown} />
      </section>
    </div>
  );
}

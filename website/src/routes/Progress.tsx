import { Link } from "react-router-dom";
import { useMemo } from "react";
import LadderProgress from "../components/LadderProgress";
import { CHAPTERS, COMPETENCIES, SIKAP_META, type Sikap } from "../lib/chapters";
import { exportAllAsJSON, downloadFile, useStore, type MasteryLevel } from "../lib/storage";
import { getChapterMarkdown } from "../lib/content";
import { extractReflectionQuestions } from "../components/ReflectionPrompt";

const LEVEL_LABEL: Record<Exclude<MasteryLevel, null>, string> = {
  novice: "Novice",
  developing: "Developing",
  proficient: "Proficient",
  masterpiece: "Masterpiece",
};

const SIKAP_LIST: Sikap[] = ["curiosity", "rigor", "skepticism", "ownership"];

function exportJournalAsMarkdown(journal: Record<string, Record<string, string>>): string {
  const lines: string[] = [];
  lines.push("# Jurnal Refleksi - Modul Pembelajaran Asisten Dosen AI");
  lines.push("");
  lines.push(`Diekspor: ${new Date().toLocaleString("id-ID")}`);
  lines.push("");
  for (const ch of CHAPTERS) {
    const entries = journal[ch.id];
    if (!entries) continue;
    const md = getChapterMarkdown(ch.id);
    const questions = extractReflectionQuestions(md);
    const hasAny = Object.values(entries).some((v) => v && v.trim());
    if (!hasAny) continue;
    lines.push(`## Bab ${ch.id} - ${ch.title}`);
    lines.push("");
    questions.forEach((q, idx) => {
      const ans = entries[`q${idx + 1}`];
      if (!ans || !ans.trim()) return;
      lines.push(`### ${idx + 1}. ${q}`);
      lines.push("");
      lines.push(ans.trim());
      lines.push("");
    });
    lines.push("---");
    lines.push("");
  }
  return lines.join("\n");
}

export default function ProgressPage() {
  const weeks = useStore((s) => s.weeks);
  const mastery = useStore((s) => s.mastery);
  const journal = useStore((s) => s.journal);
  const resetAll = useStore((s) => s.resetAll);

  const weekCount = Object.values(weeks).filter(Boolean).length;
  const masteryFilled = Object.values(mastery).filter(Boolean).length;
  const journalChapters = useMemo(
    () =>
      Object.keys(journal).filter((ch) =>
        Object.values(journal[ch] || {}).some((v) => v && v.trim())
      ),
    [journal]
  );

  const onExportJournal = () => {
    const md = exportJournalAsMarkdown(journal);
    downloadFile(`jurnal-refleksi-${new Date().toISOString().slice(0, 10)}.md`, md, "text/markdown");
  };

  const onExportAll = () => {
    const json = exportAllAsJSON();
    downloadFile(`modul-progres-${new Date().toISOString().slice(0, 10)}.json`, json, "application/json");
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1 className="page-title">Progres Saya</h1>
        <p className="page-lead">
          Semua data tersimpan lokal di peramban ini. Export ke JSON/Markdown untuk backup atau serahkan ke instruktur.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3 mb-12">
        <div className="card p-6">
          <div className="text-xs font-mono text-ink/70 dark:text-parchment/60 uppercase tracking-wider">Minggu</div>
          <div className="font-serif text-3xl font-semibold mt-1">{weekCount} <span className="text-base text-ink/70 dark:text-parchment/50">/ 14</span></div>
        </div>
        <div className="card p-6">
          <div className="text-xs font-mono text-ink/70 dark:text-parchment/60 uppercase tracking-wider">Kompetensi dinilai</div>
          <div className="font-serif text-3xl font-semibold mt-1">{masteryFilled} <span className="text-base text-ink/70 dark:text-parchment/50">/ 9</span></div>
        </div>
        <div className="card p-6">
          <div className="text-xs font-mono text-ink/70 dark:text-parchment/60 uppercase tracking-wider">Bab berjurnal</div>
          <div className="font-serif text-3xl font-semibold mt-1">{journalChapters.length}</div>
        </div>
      </div>

      <section className="section-gap card p-6">
        <LadderProgress interactive />
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-ink/70 dark:text-parchment/70">
          {SIKAP_LIST.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded bg-${s}`} aria-hidden="true" /> {SIKAP_META[s].label}
            </span>
          ))}
        </div>
      </section>

      <section className="section-gap card p-6">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-4">
          <h2 className="card-title">Self-assessment 10 Kompetensi</h2>
          <Link to="/rubrik" className="text-sm text-rigor dark:text-curiosity hover:underline">
            Buka rubrik lengkap →
          </Link>
        </div>
        <ul className="divide-y divide-black/5 dark:divide-white/5">
          {COMPETENCIES.map((c) => {
            const lvl = mastery[c.n];
            return (
              <li key={c.n} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-medium text-sm">{c.n}. {c.title}</div>
                  <div className="text-xs text-ink/70 dark:text-parchment/60 font-mono">{c.weeks}</div>
                </div>
                <div className="shrink-0">
                  {lvl ? (
                    <span className="chip bg-rigor-soft text-rigor-deep dark:bg-rigor/20 dark:text-rigor">
                      {LEVEL_LABEL[lvl]}
                    </span>
                  ) : (
                    <span className="chip bg-parchment dark:bg-white/5 text-ink/70 dark:text-parchment/60">Belum dinilai</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section-gap card p-6">
        <h2 className="card-title mb-4">Jurnal Refleksi</h2>
        {journalChapters.length === 0 ? (
          <p className="text-sm text-ink/70 dark:text-parchment/70">
            Belum ada jurnal. Buka sembarang bab dan isi bagian refleksi di bawah konten.
          </p>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-2">
            {journalChapters.map((chId) => {
              const ch = CHAPTERS.find((c) => c.id === chId);
              if (!ch) return null;
              const filled = Object.values(journal[chId] || {}).filter((v) => v && v.trim()).length;
              return (
                <li key={chId}>
                  <Link
                    to={`/modul/${chId}#refleksi`}
                    className="card-link px-4 py-3"
                  >
                    <div className="font-medium text-sm">Bab {ch.id} - {ch.title}</div>
                    <div className="text-xs text-ink/70 dark:text-parchment/60 mt-1">
                      {filled} jawaban tersimpan
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="card p-6">
        <h2 className="card-title mb-4">Export & Reset</h2>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={onExportJournal} className="btn-primary" disabled={journalChapters.length === 0}>
            Unduh jurnal (.md)
          </button>
          <button type="button" onClick={onExportAll} className="btn-secondary">
            Unduh semua data (.json)
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("Hapus SEMUA progres, jurnal, dan self-assessment? Tindakan ini tidak dapat di-batalkan.")) {
                resetAll();
              }
            }}
            className="btn-ghost text-skepticism hover:bg-skepticism-soft dark:hover:bg-skepticism/10"
          >
            Reset semua data
          </button>
        </div>
      </section>
    </div>
  );
}

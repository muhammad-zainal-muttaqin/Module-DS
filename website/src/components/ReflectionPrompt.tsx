import { useEffect, useState } from "react";
import { useStore } from "../lib/storage";
import { getChapterMarkdown } from "../lib/content";

type Props = { chapterId: string };

// Ekstrak pertanyaan refleksi dari markdown bab.
export function extractReflectionQuestions(md: string): string[] {
  const match = /^##\s+\d+\.\s+Refleksi\s*$([\s\S]*?)(?=^##\s|\z)/m.exec(md);
  if (!match) return [];
  const body = match[1];
  const questions: string[] = [];
  const lines = body.split(/\r?\n/);
  let current = "";
  for (const line of lines) {
    const m = /^\s*(\d+)\.\s+(.*)$/.exec(line);
    if (m) {
      if (current) questions.push(current.trim());
      current = m[2];
    } else if (current && line.trim() && !/^-+$/.test(line.trim())) {
      current += " " + line.trim();
    } else if (!line.trim() && current) {
      questions.push(current.trim());
      current = "";
    }
  }
  if (current) questions.push(current.trim());
  return questions.filter((q) => q.length > 10);
}

export default function ReflectionPrompt({ chapterId }: Props) {
  const getEntry = useStore((s) => s.getJournalEntry);
  const setEntry = useStore((s) => s.setJournalEntry);
  const clearJournal = useStore((s) => s.clearJournal);
  const [questions, setQuestions] = useState<string[]>([]);
  const [saved, setSaved] = useState<string>("");

  useEffect(() => {
    const md = getChapterMarkdown(chapterId);
    setQuestions(extractReflectionQuestions(md));
  }, [chapterId]);

  if (questions.length === 0) return null;

  const onChange = (idx: number, value: string) => {
    setEntry(chapterId, `q${idx + 1}`, value);
    setSaved("Tersimpan otomatis");
    setTimeout(() => setSaved(""), 1200);
  };

  return (
    <aside className="mt-12 rounded-xl border-2 border-curiosity/30 bg-curiosity-soft/30 dark:bg-curiosity/10 p-6">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <h3 className="font-serif text-xl font-semibold mb-1">Jurnal Refleksi</h3>
          <p className="text-sm text-ink/70 dark:text-parchment/70">
            Jawaban disimpan di peramban ini. Export semua jurnal ke berkas .md dari halaman Progres.
          </p>
        </div>
        {saved && <span className="text-xs text-ownership-deep dark:text-ownership font-mono">{saved}</span>}
      </div>

      <ol className="space-y-5">
        {questions.map((q, idx) => (
          <li key={idx}>
            <label className="block">
              <div className="flex gap-2 text-sm font-medium mb-2">
                <span className="font-mono text-curiosity-deep dark:text-curiosity shrink-0">{idx + 1}.</span>
                <span>{q}</span>
              </div>
              <textarea
                className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-white/5 p-3 text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-rigor focus:border-transparent"
                rows={4}
                defaultValue={getEntry(chapterId, `q${idx + 1}`)}
                onBlur={(e) => onChange(idx, e.target.value)}
                placeholder="Tulis refleksi Anda di sini..."
              />
            </label>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => {
            if (confirm("Hapus semua jawaban refleksi untuk bab ini?")) {
              clearJournal(chapterId);
              location.reload();
            }
          }}
          className="text-xs px-2 py-1 rounded text-ink/70 dark:text-parchment/60 hover:bg-black/5 dark:hover:bg-white/10"
        >
          Kosongkan bab ini
        </button>
      </div>
    </aside>
  );
}

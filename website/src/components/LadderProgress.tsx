import { Link } from "react-router-dom";
import { CHAPTERS, type Sikap } from "../lib/chapters";
import { useStore } from "../lib/storage";

type Props = {
  interactive?: boolean;
  compact?: boolean;
};

// Peta minggu ke bab (14 minggu total).
const WEEK_MAP: Record<number, string> = {
  1: "01",
  2: "02",
  3: "03",
  4: "04",
  5: "05",
  6: "06",
  7: "07",
  8: "08",
  9: "09",
  10: "10",
  11: "11",
  12: "12",
  13: "12",
  14: "12",
};

const SIKAP_RGB: Record<Sikap, string> = {
  curiosity: "245, 158, 11",
  rigor: "67, 56, 202",
  skepticism: "225, 29, 72",
  ownership: "5, 150, 105",
};

const accentLite: Record<Sikap, string> = {
  curiosity: "bg-curiosity/25 border-curiosity/50 text-ink dark:text-parchment",
  rigor: "bg-rigor/25 border-rigor/50 text-ink dark:text-parchment",
  skepticism: "bg-skepticism/25 border-skepticism/50 text-ink dark:text-parchment",
  ownership: "bg-ownership/25 border-ownership/50 text-ink dark:text-parchment",
};

const accentDone: Record<Sikap, string> = {
  curiosity: "bg-curiosity border-transparent text-white",
  rigor: "bg-rigor border-transparent text-white",
  skepticism: "bg-skepticism border-transparent text-white",
  ownership: "bg-ownership border-transparent text-white",
};

function getCellAppearance(sikaps: Sikap[], done: boolean) {
  if (sikaps.length < 2) {
    const key = sikaps[0] || "rigor";
    return {
      className: `w-full h-14 rounded-md border-2 transition-all flex items-center justify-center font-mono text-xs font-semibold ${
        done ? accentDone[key] : accentLite[key]
      }`,
      style: {},
    };
  }

  const [c1, c2] = sikaps;
  const alpha = done ? "1" : "0.25";
  return {
    className:
      "w-full h-14 rounded-md transition-all flex items-center justify-center font-mono text-xs font-semibold text-white split-cell",
    style: {
      background: `linear-gradient(135deg, rgba(${SIKAP_RGB[c1]}, ${alpha}) 50%, rgba(${SIKAP_RGB[c2]}, ${alpha}) 50%)`,
    },
  };
}

export default function LadderProgress({ interactive = false, compact = false }: Props) {
  const weeks = useStore((s) => s.weeks);
  const setWeek = useStore((s) => s.setWeek);

  const doneCount = Object.values(weeks).filter(Boolean).length;

  return (
    <div>
      {!compact && (
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <h3 className="font-serif text-heading-2 font-semibold">Tangga 14 Minggu</h3>
            <p className="text-sm text-ink/70 dark:text-parchment/70 mt-1">
              Tiap anak tangga adalah satu minggu. Kebiasaan baru di-bangun berlapis.
            </p>
          </div>
          {interactive && (
            <div className="text-sm text-ink/70 dark:text-parchment/70">
              <span className="font-mono text-base">{doneCount}/14</span> minggu selesai
            </div>
          )}
        </div>
      )}

      <ol className="grid grid-cols-7 md:grid-cols-14 gap-1.5">
        {Array.from({ length: 14 }, (_, i) => i + 1).map((w) => {
          const chapterId = WEEK_MAP[w];
          const chapter = CHAPTERS.find((c) => c.id === chapterId);
          const done = !!weeks[w];
          const sikaps = chapter?.sikap ?? ["rigor"];

          const { className, style } = getCellAppearance(sikaps, done);

          const cell = (
            <div className="flex flex-col items-center w-full">
              <div className={className} style={style}>
                <div className="h-full flex items-center justify-center font-mono text-xs font-semibold">
                  W{w}
                </div>
              </div>
              {!compact && chapter && (
                <span
                  className="mt-1 w-full hidden md:block text-[10px] text-ink/70 dark:text-parchment/50 text-center leading-tight truncate"
                  title={chapter.title}
                >
                  {chapter.title.replace(/^W\d+\s*-\s*/, "")}
                </span>
              )}
            </div>
          );

          if (interactive) {
            return (
              <li key={w}>
                <button
                  type="button"
                  onClick={() => setWeek(w, !done)}
                  aria-pressed={done}
                  aria-label={`Minggu ${w}${chapter ? ` - ${chapter.title}` : ""}${done ? " (selesai)" : ""}`}
                  className="w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rigor rounded-md"
                >
                  {cell}
                </button>
              </li>
            );
          }

          return (
            <li key={w}>
              {chapter ? (
                <Link
                  to={`/modul/${chapter.id}`}
                  aria-label={`Minggu ${w} - ${chapter.title}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rigor rounded-md"
                >
                  {cell}
                </Link>
              ) : (
                cell
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

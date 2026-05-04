import { Link } from "react-router-dom";
import { COMPETENCIES } from "../lib/chapters";

export default function CompetencyGrid() {
  return (
    <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {COMPETENCIES.map((c) => (
        <li key={c.n}>
          <Link
            to={`/kompetensi/${c.n}`}
            className="group card-link hover:shadow-card p-5 h-full"
          >
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rigor text-white font-mono text-sm shrink-0">
                {c.n}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm leading-snug group-hover:text-rigor dark:group-hover:text-curiosity transition-colors">
                  {c.title}
                </div>
                <div className="mt-1 text-xs text-ink/70 dark:text-parchment/60 font-mono">
                  {c.weeks}
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}

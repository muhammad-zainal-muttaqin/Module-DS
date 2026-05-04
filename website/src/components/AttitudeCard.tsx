import { SIKAP_META, type Sikap } from "../lib/chapters";

type Props = { sikap: Sikap };

const BG_MAP: Record<Sikap, string> = {
  curiosity: "bg-curiosity-soft/60 dark:bg-curiosity/15 border-curiosity/30",
  rigor: "bg-rigor-soft/60 dark:bg-rigor/15 border-rigor/30",
  skepticism: "bg-skepticism-soft/60 dark:bg-skepticism/15 border-skepticism/30",
  ownership: "bg-ownership-soft/60 dark:bg-ownership/15 border-ownership/30",
};

const DOT_MAP: Record<Sikap, string> = {
  curiosity: "bg-curiosity",
  rigor: "bg-rigor",
  skepticism: "bg-skepticism",
  ownership: "bg-ownership",
};

const LABEL_MAP: Record<Sikap, string> = {
  curiosity: "text-curiosity-deep dark:text-curiosity",
  rigor: "text-rigor-deep dark:text-rigor",
  skepticism: "text-skepticism-deep dark:text-skepticism",
  ownership: "text-ownership-deep dark:text-ownership",
};

export default function AttitudeCard({ sikap }: Props) {
  const meta = SIKAP_META[sikap];
  return (
    <article
      className={`rounded-xl border-2 p-6 transition-transform hover:-translate-y-0.5 ${BG_MAP[sikap]}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`w-2.5 h-2.5 rounded-full ${DOT_MAP[sikap]}`} aria-hidden="true" />
        <h3 className={`font-serif text-heading-2 font-semibold ${LABEL_MAP[sikap]}`}>
          {meta.label}
        </h3>
      </div>
      <div className="font-medium text-base mb-2 text-ink dark:text-parchment">{meta.tagline}</div>
      <p className="text-sm text-ink/80 dark:text-parchment/85 leading-relaxed">{meta.essence}</p>
    </article>
  );
}

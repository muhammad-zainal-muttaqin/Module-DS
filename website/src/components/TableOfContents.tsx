import { useEffect, useState } from "react";
import type { HeadingEntry } from "../lib/content";

type Props = { headings: HeadingEntry[] };

export default function TableOfContents({ headings }: Props) {
  const [activeSlug, setActiveSlug] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;
    const observers: IntersectionObserver[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top);
        if (visible[0]) {
          setActiveSlug((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    });
    observers.push(observer);
    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Daftar isi bab" className="text-sm">
      <div className="font-semibold text-ink dark:text-parchment mb-2">Daftar Isi</div>
      <ul className="space-y-1 border-l border-black/10 dark:border-white/10">
        {headings.map((h) => (
          <li key={h.slug} className={h.depth === 3 ? "ml-3" : h.depth === 4 ? "ml-6" : ""}>
            <a
              href={`#${h.slug}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(h.slug);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block -ml-px border-l-2 pl-3 py-1 transition-colors ${
                activeSlug === h.slug
                  ? "border-rigor text-rigor dark:text-curiosity font-medium"
                  : "border-transparent text-ink/70 dark:text-parchment/70 hover:text-ink dark:hover:text-parchment hover:border-black/20 dark:hover:border-white/20"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

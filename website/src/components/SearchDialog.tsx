import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchAll, snippetAround } from "../lib/search";

type Props = { open: boolean; onClose: () => void };

export default function SearchDialog({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const results = useMemo(() => (query.trim() ? searchAll(query, 25) : []), [query]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20);
      setActiveIdx(0);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIdx((i) => Math.min(results.length - 1, i + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      }
      if (e.key === "Enter" && results[activeIdx]) {
        const r = results[activeIdx];
        navigate(`/modul/${r.chapterId}${r.anchor ? `#${r.anchor}` : ""}`);
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, activeIdx, navigate, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian modul"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-cream dark:bg-charcoal rounded-xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-black/10 dark:border-white/10">
          <span aria-hidden="true" className="text-lg">⌕</span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIdx(0);
            }}
            placeholder="Cari di 14 bab modul..."
            className="flex-1 bg-transparent outline-none text-base placeholder:text-ink/55 dark:placeholder:text-parchment/40"
            aria-label="Kata kunci pencarian"
          />
          <kbd className="hidden sm:inline rounded border border-black/10 dark:border-white/20 px-1.5 text-xs font-mono">
            Esc
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto scrollbar-hidden">
          {query.trim() && results.length === 0 && (
            <div className="px-4 py-8 text-center text-ink/70 dark:text-parchment/60">
              Tidak ada hasil untuk "{query}".
            </div>
          )}
          {!query.trim() && (
            <div className="px-4 py-8 text-center text-ink/70 dark:text-parchment/60 text-sm">
              Ketik kata kunci. Navigasi dengan <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd>, buka dengan <kbd className="font-mono">Enter</kbd>.
            </div>
          )}
          {results.length > 0 && (
            <ul className="divide-y divide-black/5 dark:divide-white/5">
              {results.map((r, idx) => (
                <li key={r.id}>
                  <button
                    type="button"
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      idx === activeIdx ? "bg-rigor/10 dark:bg-rigor/20" : "hover:bg-parchment dark:hover:bg-white/5"
                    }`}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => {
                      navigate(`/modul/${r.chapterId}${r.anchor ? `#${r.anchor}` : ""}`);
                      onClose();
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs text-ink/70 dark:text-parchment/60 mb-1">
                      <span className="font-mono">Bab {r.chapterId}</span>
                      <span>·</span>
                      <span>{r.chapterTitle}</span>
                    </div>
                    <div className="font-medium text-sm mb-1">{r.section}</div>
                    <div className="text-xs text-ink/70 dark:text-parchment/70 line-clamp-2">
                      {snippetAround(r.text, query)}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

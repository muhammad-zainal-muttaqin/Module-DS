import { useMemo, useState } from "react";
import { GLOSSARY } from "../lib/content";

export default function Glossary() {
  const [query, setQuery] = useState("");

  const sorted = useMemo(
    () =>
      [...GLOSSARY].sort((a, b) =>
        a.id.toLowerCase().localeCompare(b.id.toLowerCase())
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sorted;
    return sorted.filter(
      (g) =>
        g.id.toLowerCase().includes(q) ||
        g.en.toLowerCase().includes(q) ||
        (g.note || "").toLowerCase().includes(q)
    );
  }, [query, sorted]);

  return (
    <div className="page-narrow">
      <header className="page-header">
        <h1 className="page-title">Glosarium ID - EN</h1>
        <p className="page-lead">
          Terjemahan istilah teknis ML/DL. Istilah asing yang lazim tidak diterjemahkan paksa - catatan di kolom ketiga menjelaskan nuansa.
        </p>
      </header>

      <div className="mb-6">
        <label className="sr-only" htmlFor="glossary-search">Cari istilah</label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari istilah dalam Indonesia, English, pengertian, atau catatan..."
          className="w-full rounded-md border border-black/15 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-rigor focus:border-transparent"
        />
      </div>

      <div className="text-sm text-ink/70 dark:text-parchment/60 mb-3 font-mono">
        {filtered.length} dari {GLOSSARY.length} istilah
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/10 dark:border-white/10 p-12 text-center text-ink/70 dark:text-parchment/60">
          Tidak ada yang cocok dengan "{query}".
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-parchment dark:bg-white/5 text-left text-sm">
                <th className="px-4 py-3 font-medium">Indonesia</th>
                <th className="px-4 py-3 font-medium">English</th>
                <th className="px-4 py-3 font-medium">Pengertian / Catatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filtered.map((g, i) => (
                <tr key={i} className="hover:bg-parchment/40 dark:hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-medium">{g.id}</td>
                  <td className="px-4 py-3 font-mono text-sm text-rigor dark:text-curiosity">{g.en}</td>
                  <td className="px-4 py-3 text-sm text-ink/70 dark:text-parchment/75">{g.note !== "-" ? g.note : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

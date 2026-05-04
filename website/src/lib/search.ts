import MiniSearch from "minisearch";
import { CHAPTERS } from "./chapters";
import { getAllChapters, extractHeadings } from "./content";

export type SearchDoc = {
  id: string;
  chapterId: string;
  chapterTitle: string;
  section: string;
  text: string;
  anchor: string;
};

let miniSearch: MiniSearch<SearchDoc> | null = null;
let docs: SearchDoc[] = [];

function buildDocs(): SearchDoc[] {
  const out: SearchDoc[] = [];
  const all = getAllChapters();
  for (const ch of CHAPTERS) {
    const md = all[ch.id] || "";
    const headings = extractHeadings(md);
    // Split by ## sections.
    const parts = md.split(/^## /m);
    parts.forEach((part, idx) => {
      if (!part.trim()) return;
      const lines = part.split(/\r?\n/);
      const firstLine = lines[0].trim();
      const section = idx === 0 ? ch.title : firstLine.replace(/^#+\s*/, "");
      const body = lines.slice(idx === 0 ? 0 : 1).join("\n");
      const plain = body
        .replace(/```[\s\S]*?```/g, "")
        .replace(/[#*_`>]/g, "")
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
      if (!plain) return;
      const slug = headings.find((h) => h.text.toLowerCase() === section.toLowerCase())?.slug;
      out.push({
        id: `${ch.id}-${idx}`,
        chapterId: ch.id,
        chapterTitle: ch.title,
        section: section.slice(0, 120),
        text: plain,
        anchor: slug || "",
      });
    });
  }
  return out;
}

export function getSearchIndex(): { mini: MiniSearch<SearchDoc>; docs: SearchDoc[] } {
  if (!miniSearch) {
    docs = buildDocs();
    miniSearch = new MiniSearch<SearchDoc>({
      fields: ["chapterTitle", "section", "text"],
      storeFields: ["chapterId", "chapterTitle", "section", "text", "anchor"],
      searchOptions: {
        boost: { section: 2.5, chapterTitle: 2 },
        fuzzy: 0.15,
        prefix: true,
      },
    });
    miniSearch.addAll(docs);
  }
  return { mini: miniSearch, docs };
}

export function searchAll(query: string, limit = 20) {
  if (!query.trim()) return [];
  const { mini, docs } = getSearchIndex();
  const results = mini.search(query).slice(0, limit);
  return results.map((r) => {
    const doc = docs.find((d) => d.id === r.id)!;
    return { ...doc, score: r.score, match: r.match };
  });
}

export function snippetAround(text: string, query: string, len = 160): string {
  const lower = text.toLowerCase();
  const q = query.toLowerCase().split(/\s+/)[0];
  const idx = lower.indexOf(q);
  if (idx < 0) return text.slice(0, len) + (text.length > len ? "..." : "");
  const start = Math.max(0, idx - Math.floor(len / 3));
  const end = Math.min(text.length, start + len);
  return (start > 0 ? "..." : "") + text.slice(start, end) + (end < text.length ? "..." : "");
}

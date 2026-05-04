import { useMemo } from "react";
import { getChapterMarkdown } from "../lib/content";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function Capstone() {
  const markdown = useMemo(() => getChapterMarkdown("12"), []);

  return (
    <div className="page-narrow">
      <header className="page-header">
        <div className="eyebrow">Minggu 12-15</div>
        <h1 className="page-title">Capstone - Proyek Riset</h1>
        <p className="page-lead">
          Filter+defense, rethink, final talks, pengumpulan
        </p>
      </header>

      <MarkdownRenderer markdown={markdown} />
    </div>
  );
}

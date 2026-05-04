import { useEffect, useState } from "react";
import { highlight } from "../lib/highlight";
import { useStore } from "../lib/storage";

type Props = {
  code: string;
  lang: string;
};

export default function CodeBlock({ code, lang }: Props) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const theme = useStore((s) => s.theme);

  useEffect(() => {
    let cancelled = false;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && prefersDark);
    highlight(code, lang, isDark).then((out) => {
      if (!cancelled) setHtml(out);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang, theme]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silent
    }
  };

  return (
    <div className="relative group my-5">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
        {lang && lang !== "text" && (
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/60 text-white">
            {lang}
          </span>
        )}
        <button
          type="button"
          onClick={onCopy}
          className="text-xs px-2 py-1 rounded bg-black/70 hover:bg-black text-white font-medium"
          aria-label="Salin kode"
        >
          {copied ? "Tersalin" : "Salin"}
        </button>
      </div>
      {html ? (
        <div
          className="[&>pre]:!p-4 [&>pre]:!rounded-lg [&>pre]:!border [&>pre]:!border-black/5 dark:[&>pre]:!border-white/10 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="rounded-lg p-4 text-sm overflow-x-auto scrollbar-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-black/40">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

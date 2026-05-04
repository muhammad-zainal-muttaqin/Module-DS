// Singleton highlighter Shiki, lazy-loaded dan dibatasi pada bahasa yang muncul di modul.
// Pakai `shiki/core` agar hanya grammar yang diperlukan yang di-bundle (bukan 300+ default).
import type { HighlighterCore } from "shiki/core";

let highlighterPromise: Promise<HighlighterCore> | null = null;

export async function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = (async () => {
      const { createHighlighterCore } = await import("shiki/core");
      const { createOnigurumaEngine } = await import("shiki/engine/oniguruma");
      const engine = createOnigurumaEngine(() => import("shiki/wasm"));
      return createHighlighterCore({
        themes: [
          import("shiki/themes/github-light.mjs"),
          import("shiki/themes/github-dark.mjs"),
        ],
        langs: [
          import("shiki/langs/python.mjs"),
          import("shiki/langs/yaml.mjs"),
          import("shiki/langs/bash.mjs"),
          import("shiki/langs/shell.mjs"),
          import("shiki/langs/json.mjs"),
          import("shiki/langs/markdown.mjs"),
          import("shiki/langs/diff.mjs"),
          import("shiki/langs/typescript.mjs"),
          import("shiki/langs/javascript.mjs"),
        ],
        engine,
      });
    })();
  }
  return highlighterPromise;
}

export async function highlight(code: string, lang: string, isDark: boolean): Promise<string> {
  try {
    const hl = await getHighlighter();
    const supported = hl.getLoadedLanguages() as string[];
    const target = supported.includes(lang) ? lang : "text";
    return hl.codeToHtml(code, {
      lang: target,
      theme: isDark ? "github-dark" : "github-light",
    });
  } catch {
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

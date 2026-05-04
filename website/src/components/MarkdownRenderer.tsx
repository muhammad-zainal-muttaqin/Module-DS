import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import CodeBlock from "./CodeBlock";

type Props = { markdown: string };

type AdmonitionKind = "note" | "tip" | "warning" | "important" | "caution";

const ADMONITION_LABELS: Record<AdmonitionKind, string> = {
  note: "Catatan",
  tip: "Tips",
  warning: "Peringatan",
  important: "Penting",
  caution: "Hati-hati",
};

const ADMONITION_ICONS: Record<AdmonitionKind, string> = {
  note: "i",
  tip: "★",
  warning: "!",
  important: "▲",
  caution: "✕",
};

const ADMONITION_PATTERN = /^\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i;

const HEADING_ID_PATTERN = /\s*\{#([\w-]+)\}\s*$/;

function remarkPandocHeadingId() {
  return (tree: { children?: unknown[] }) => {
    const walk = (node: Record<string, unknown>) => {
      if (node.type === "heading" && Array.isArray(node.children)) {
        const children = node.children as Array<Record<string, unknown>>;
        const last = children[children.length - 1];
        if (last && last.type === "text" && typeof last.value === "string") {
          const match = last.value.match(HEADING_ID_PATTERN);
          if (match) {
            const stripped = last.value.replace(HEADING_ID_PATTERN, "");
            if (stripped === "") {
              children.pop();
            } else {
              last.value = stripped;
            }
            const data = (node.data ??= {}) as Record<string, unknown>;
            const hProperties = (data.hProperties ??= {}) as Record<string, unknown>;
            hProperties.id = match[1];
          }
        }
      }
      const kids = (node.children as Array<Record<string, unknown>> | undefined) ?? [];
      for (const child of kids) walk(child);
    };
    walk(tree as Record<string, unknown>);
  };
}

function detectAdmonition(children: ReactNode): {
  kind: AdmonitionKind;
  rest: ReactNode[];
} | null {
  const arr = Children.toArray(children);
  const firstParaIndex = arr.findIndex(
    (n) => isValidElement(n) && (n as ReactElement).type === "p",
  );
  if (firstParaIndex === -1) return null;

  const firstPara = arr[firstParaIndex] as ReactElement<{ children?: ReactNode }>;
  const paraChildren = Children.toArray(firstPara.props.children);
  if (paraChildren.length === 0) return null;

  const firstNode = paraChildren[0];
  if (typeof firstNode !== "string") return null;

  const match = firstNode.match(ADMONITION_PATTERN);
  if (!match) return null;

  const kind = match[1].toLowerCase() as AdmonitionKind;
  const remainingText = firstNode.slice(match[0].length).replace(/^\s*\n?/, "");
  const remainingPara: ReactNode[] = [...paraChildren];
  remainingPara[0] = remainingText;
  while (
    remainingPara.length > 0 &&
    typeof remainingPara[0] === "string" &&
    (remainingPara[0] as string).trim() === ""
  ) {
    remainingPara.shift();
  }

  const rest: ReactNode[] = [...arr];
  if (remainingPara.length === 0) {
    rest.splice(firstParaIndex, 1);
  } else {
    const cleanedPara = (
      <p key={(firstPara.key as string | null | undefined) ?? "admonition-first-p"}>
        {remainingPara}
      </p>
    );
    rest[firstParaIndex] = cleanedPara;
  }

  return { kind, rest };
}

export default function MarkdownRenderer({ markdown }: Props) {
  const navigate = useNavigate();
  return (
    <div className="prose-modul">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkPandocHeadingId]}
        rehypePlugins={[
          rehypeRaw,
          rehypeKatex,
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: { className: ["anchor-link"], ariaLabel: "Tautan permanen" },
              content: { type: "text", value: "#" },
            },
          ],
        ]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const inline = !match && !String(children).includes("\n");
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            const lang = match ? match[1] : "text";
            const code = String(children).replace(/\n$/, "");
            return <CodeBlock code={code} lang={lang} />;
          },
          pre({ children }) {
            return <>{children}</>;
          },
          a({ href, children, ...props }) {
            if (href && href.startsWith("#") && !href.startsWith("#/")) {
              return (
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(href.slice(1));
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  {...props}
                >
                  {children}
                </a>
              );
            }
            if (href && href.startsWith("#/")) {
              return (
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(href.slice(1));
                  }}
                  {...props}
                >
                  {children}
                </a>
              );
            }
            const isExternal = href && /^https?:\/\//.test(href);
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          blockquote({ children, ...props }) {
            const detected = detectAdmonition(children);
            if (detected) {
              const { kind, rest } = detected;
              return (
                <aside
                  className={`admonition ${kind}`}
                  role="note"
                  aria-label={ADMONITION_LABELS[kind]}
                >
                  <div className="admonition-title">
                    <span className="admonition-icon" aria-hidden="true">
                      {ADMONITION_ICONS[kind]}
                    </span>
                    <span>{ADMONITION_LABELS[kind]}</span>
                  </div>
                  {rest}
                </aside>
              );
            }
            return <blockquote {...props}>{children}</blockquote>;
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto scrollbar-hidden">
                <table>{children}</table>
              </div>
            );
          },
          img({ src, alt, title, ...props }) {
            const safeSrc = typeof src === "string" ? src : "";
            let fallbackAlt = alt;
            if (!fallbackAlt && safeSrc) {
              const filename = safeSrc.split(/[\\/]/).pop() || "";
              fallbackAlt = filename.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ").trim();
              if (import.meta.env?.DEV) {
                console.warn(`[MarkdownRenderer] Image without alt text: ${safeSrc}`);
              }
            }
            return (
              <img
                src={safeSrc}
                alt={fallbackAlt || ""}
                title={title}
                loading="lazy"
                decoding="async"
                {...props}
              />
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

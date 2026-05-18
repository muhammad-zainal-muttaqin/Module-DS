import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import RevealDefault from "reveal.js";
import "reveal.js/reveal.css";

// Reveal types upstream only expose `new(options?)`; runtime supports `new(element, options?)`.
const Reveal = RevealDefault as unknown as new (
  el: HTMLElement,
  options?: Record<string, unknown>,
) => { destroy: () => void; initialize: (opts: Record<string, unknown>) => void };
import { getSlideDeck, hasSlideDeck, type SlideSection } from "../lib/slides";
import { chapterById } from "../lib/chapters";
import { highlight } from "../lib/highlight";
import "../styles/reveal-custom.css";

type StaggerProps = { index: number };

function staggerStyle({ index }: StaggerProps): CSSProperties {
  return { ["--frag-index" as string]: index } as CSSProperties;
}

function SlideCode({ code, lang = "python" }: { code: string; lang?: string }) {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const isDark = document.documentElement.classList.contains("dark");
    highlight(code, lang, isDark).then((h) => {
      if (!cancelled) setHtml(h);
    });
    return () => {
      cancelled = true;
    };
  }, [code, lang]);

  if (html === null) {
    return (
      <pre className="slide-code-block slide-code-fallback">
        <code>{code}</code>
      </pre>
    );
  }
  return (
    <div
      className="slide-code-block shiki-wrapper"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function SlideContent({ section }: { section: SlideSection }) {
  switch (section.layout) {
    case "title":
      return (
        <div className="slide-title-layout">
          {section.footnote && (
            <div className="slide-eyebrow">{section.footnote}</div>
          )}
          <h1 className="slide-title">{section.title}</h1>
          {section.subtitle && <p className="slide-subtitle">{section.subtitle}</p>}
          {section.body && <p className="slide-body">{section.body}</p>}
        </div>
      );

    case "section":
      return (
        <div className="slide-section-layout">
          <h2 className="slide-heading">{section.title}</h2>
          {section.body && (
            <p className="slide-body" dangerouslySetInnerHTML={{ __html: markdownish(section.body) }} />
          )}
          {section.footnote && <p className="slide-footnote">{section.footnote}</p>}
        </div>
      );

    case "bullets":
      return (
        <div className="slide-bullets-layout">
          <h2 className="slide-heading">{section.title}</h2>
          <ul className="slide-list">
            {section.bullets?.map((b, i) => (
              <li
                key={i}
                className="slide-stagger"
                style={staggerStyle({ index: i })}
                dangerouslySetInnerHTML={{ __html: markdownish(b) }}
              />
            ))}
          </ul>
          {section.footnote && <p className="slide-footnote">{section.footnote}</p>}
        </div>
      );

    case "split":
      return (
        <div className="slide-split-layout">
          <h2 className="slide-heading">{section.title}</h2>
          <div className="slide-split">
            <div
              className="slide-split-col slide-stagger"
              style={staggerStyle({ index: 0 })}
            >
              {section.left?.title && <h3 className="slide-subheading">{section.left.title}</h3>}
              {section.left?.body && <p dangerouslySetInnerHTML={{ __html: markdownish(section.left.body) }} />}
              {section.left?.bullets && (
                <ul className="slide-list">
                  {section.left.bullets.map((b, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: markdownish(b) }} />
                  ))}
                </ul>
              )}
            </div>
            <div
              className="slide-split-col slide-stagger"
              style={staggerStyle({ index: 1 })}
            >
              {section.right?.title && <h3 className="slide-subheading">{section.right.title}</h3>}
              {section.right?.body && <p dangerouslySetInnerHTML={{ __html: markdownish(section.right.body) }} />}
              {section.right?.bullets && (
                <ul className="slide-list">
                  {section.right.bullets.map((b, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: markdownish(b) }} />
                  ))}
                </ul>
              )}
            </div>
          </div>
          {section.footnote && <p className="slide-footnote">{section.footnote}</p>}
        </div>
      );

    case "grid": {
      const count = section.gridItems?.length ?? 0;
      return (
        <div className="slide-grid-layout" data-grid-count={count}>
          <h2 className="slide-heading">{section.title}</h2>
          <div className="slide-grid">
            {section.gridItems?.map((item, i) => (
              <div
                key={i}
                className="slide-grid-item slide-stagger"
                style={staggerStyle({ index: i })}
                data-grid-index={i}
              >
                <h4 className="slide-grid-title">{item.title}</h4>
                <p dangerouslySetInnerHTML={{ __html: markdownish(item.body) }} />
              </div>
            ))}
          </div>
          {section.footnote && <p className="slide-footnote">{section.footnote}</p>}
        </div>
      );
    }

    case "quote":
      return (
        <div className="slide-quote-layout">
          {section.title && <h2 className="slide-heading">{section.title}</h2>}
          <blockquote className="slide-quote">
            <p>{section.quote}</p>
            {section.author && <cite>- {section.author}</cite>}
          </blockquote>
          {section.body && (
            <p className="slide-body" dangerouslySetInnerHTML={{ __html: markdownish(section.body) }} />
          )}
        </div>
      );

    case "code":
      return (
        <div className="slide-code-layout">
          <h2 className="slide-heading">{section.title}</h2>
          {section.body && <p className="slide-body">{section.body}</p>}
          <SlideCode code={section.code ?? ""} lang={section.lang ?? "python"} />
          {section.footnote && <p className="slide-footnote">{section.footnote}</p>}
        </div>
      );

    case "cta":
      return (
        <div className="slide-cta-layout">
          <h2 className="slide-title">{section.title}</h2>
          {section.body && (
            <p className="slide-body" dangerouslySetInnerHTML={{ __html: markdownish(section.body) }} />
          )}
          {section.ctaTarget && (
            section.ctaTarget.startsWith("http") ? (
              <a href={section.ctaTarget} target="_blank" rel="noopener noreferrer" className="slide-cta-button">
                <span>{section.ctaText || "Baca Modul Penuh"}</span>
                <span className="slide-cta-arrow" aria-hidden="true">→</span>
              </a>
            ) : (
              <Link to={`/modul/${section.ctaTarget}`} className="slide-cta-button">
                <span>{section.ctaText || "Baca Modul Penuh"}</span>
                <span className="slide-cta-arrow" aria-hidden="true">→</span>
              </Link>
            )
          )}
        </div>
      );

    case "image":
      return (
        <div className="slide-image-layout">
          {section.title && <h2 className="slide-heading">{section.title}</h2>}
          <img
            src={section.imageUrl}
            alt={section.caption ?? section.title ?? ""}
            className="slide-figure"
          />
          {section.caption && <p className="slide-caption">{section.caption}</p>}
          {section.footnote && <p className="slide-footnote">{section.footnote}</p>}
        </div>
      );

    case "video":
      return (
        <div className="slide-video-layout">
          {section.title && <h2 className="slide-heading">{section.title}</h2>}
          <div className="slide-video-wrapper">
            <iframe
              src={section.videoUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="slide-video"
              title={section.title ?? "Video"}
            />
          </div>
          {section.caption && <p className="slide-caption">{section.caption}</p>}
          {section.footnote && <p className="slide-footnote">{section.footnote}</p>}
        </div>
      );

    default:
      return null;
  }
}

// Minimal inline formatting: **bold**, *italic*, \n→<br>
function markdownish(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br>");
}

export default function SlideDeck() {
  const { id = "00" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const revealInstance = useRef<InstanceType<typeof Reveal> | null>(null);
  const chapter = chapterById(id);
  const deck = getSlideDeck(id);

  useEffect(() => {
    if (!revealRef.current || !deck) return;

    const reveal = new Reveal(revealRef.current);
    revealInstance.current = reveal;

    reveal.initialize({
      hash: false,
      slideNumber: "c/t",
      controls: true,
      progress: true,
      center: true,
      // "fade" avoids the ugly 3D slide transforms that clip content
      transition: "fade",
      backgroundTransition: "fade",
      width: 1280,
      height: 720,
      margin: 0.04,
      minScale: 0.2,
      maxScale: 2.0,
      keyboard: true,
      overview: true,
      touch: true,
      // Fragments off: stagger handled via CSS on `.section.present .slide-stagger`
      fragments: false,
      help: false,
      mouseWheel: false,
    });

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigate(`/modul/${id}`);
      }
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      try {
        reveal.destroy();
      } catch {
        // ignore cleanup errors
      }
      revealInstance.current = null;
    };
  }, [id, deck, navigate]);

  // Spotlight cursor tracking on grid items - rAF-throttled.
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    let raf = 0;
    let pendingEvent: MouseEvent | null = null;

    const flush = () => {
      raf = 0;
      if (!pendingEvent) return;
      const e = pendingEvent;
      pendingEvent = null;
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>(".slide-grid-item");
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }
    };

    const handler = (e: MouseEvent) => {
      pendingEvent = e;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    root.addEventListener("mousemove", handler, { passive: true });
    return () => {
      root.removeEventListener("mousemove", handler);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [deck]);

  if (!deck || !chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-charcoal text-ink dark:text-parchment">
        <div className="text-center">
          <h1 className="font-serif text-display font-semibold mb-4">Slide tidak tersedia</h1>
          <p className="mb-6">Slide ringkasan untuk bab ini belum dibuat.</p>
          <Link to={`/modul/${id}`} className="btn-primary">Kembali ke Modul</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="slide-deck-page">
      {/* Top bar */}
      <div className="slide-top-bar">
        <Link to={`/modul/${id}`} className="slide-top-link">
          <span aria-hidden="true">←</span>
          <span>Bab {chapter.id}</span>
        </Link>
        <span className="slide-top-title">{chapter.title}</span>
        <span className="slide-top-hint">
          <kbd>←</kbd> <kbd>→</kbd> navigasi · <kbd>Esc</kbd> keluar
        </span>
      </div>

      {/* Reveal container */}
      <div ref={revealRef} className="reveal">
        <div className="slides">
          {deck.slides.map((section, idx) => (
            <section key={idx} data-transition="fade">
              <SlideContent section={section} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export { hasSlideDeck };

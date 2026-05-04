// Type definitions dan registry untuk slide deck per bab.
// Setiap bab punya file sendiri di direktori ini.

export type SlideSection = {
  layout: "title" | "section" | "bullets" | "split" | "quote" | "cta" | "grid" | "code" | "image" | "video";
  title?: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
  left?: { title?: string; bullets?: string[]; body?: string };
  right?: { title?: string; bullets?: string[]; body?: string };
  quote?: string;
  author?: string;
  footnote?: string;
  ctaText?: string;
  ctaTarget?: string;
  gridItems?: { title: string; body: string }[];
  code?: string;
  lang?: string;
  imageUrl?: string;
  videoUrl?: string;
  caption?: string;
};

export type SlideDeckData = {
  chapterId: string;
  slides: SlideSection[];
};

import { slides00 } from "./slides-00";
import { slides00a } from "./slides-00a";
import { slides01 } from "./slides-01";

export const SLIDE_DECKS: Record<string, SlideDeckData> = {
  "00": { chapterId: "00", slides: slides00 },
  "00a": { chapterId: "00a", slides: slides00a },
  "01": { chapterId: "01", slides: slides01 },
};

export function getSlideDeck(chapterId: string): SlideDeckData | undefined {
  return SLIDE_DECKS[chapterId];
}

export function hasSlideDeck(chapterId: string): boolean {
  return chapterId in SLIDE_DECKS;
}

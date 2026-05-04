// Type declaration minimal untuk reveal.js (tidak ada @types resmi yang up-to-date)
declare module "reveal.js" {
  interface RevealOptions {
    hash?: boolean;
    slideNumber?: string | boolean;
    controls?: boolean;
    progress?: boolean;
    center?: boolean;
    transition?: string;
    backgroundTransition?: string;
    width?: number;
    height?: number;
    margin?: number;
    minScale?: number;
    maxScale?: number;
    keyboard?: boolean;
    overview?: boolean;
    touch?: boolean;
    fragments?: boolean;
    embedded?: boolean;
    help?: boolean;
    showNotes?: boolean;
    autoSlide?: number;
    autoSlideStoppable?: boolean;
    mouseWheel?: boolean;
    hideAddressBar?: boolean;
    previewLinks?: boolean;
    viewDistance?: number;
    parallaxBackgroundImage?: string;
    parallaxBackgroundSize?: string;
    parallaxBackgroundHorizontal?: number;
    parallaxBackgroundVertical?: number;
  }

  class Reveal {
    constructor(options?: RevealOptions);
    initialize(options?: RevealOptions): Promise<void>;
    destroy(): void;
    slide(h: number, v?: number, f?: number): void;
    next(): void;
    prev(): void;
    left(): void;
    right(): void;
    up(): void;
    down(): void;
    toggleOverview(): void;
    isOverview(): boolean;
    sync(): void;
    setState(state: object): void;
    getState(): object;
    getSlideNotes(slide?: HTMLElement): string | null;
    getProgress(): number;
    getIndices(slide?: HTMLElement): { h: number; v: number; f?: number };
    getTotalSlides(): number;
    addEventListener(type: string, listener: (...args: any[]) => void, useCapture?: boolean): void;
    removeEventListener(type: string, listener: (...args: any[]) => void, useCapture?: boolean): void;
  }

  export default Reveal;
}

declare module "reveal.js/plugin/notes/notes.esm.js" {
  const Plugin: any;
  export default Plugin;
}

declare module "reveal.js/plugin/highlight/highlight.esm.js" {
  const Plugin: any;
  export default Plugin;
}

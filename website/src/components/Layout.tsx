import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import { useStore } from "../lib/storage";
import SearchDialog from "./SearchDialog";

type NavItem = { to: string; label: string };

const NAV: NavItem[] = [
  { to: "/", label: "Beranda" },
  { to: "/modul", label: "Modul" },
  { to: "/rubrik", label: "Rubrik" },
  { to: "/glosarium", label: "Glosarium" },
  { to: "/capstone", label: "Capstone" },
  { to: "/lab", label: "Lab" },
  { to: "/alat", label: "Alat" },
  { to: "/progres", label: "Progres" },
];

function ThemeToggle() {
  const theme = useStore((s) => s.theme);
  const setTheme = useStore((s) => s.setTheme);
  const cycle = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";
    setTheme(next);
  };
  const label = theme === "light" ? "Terang" : theme === "dark" ? "Gelap" : "Sistem";
  return (
    <button
      type="button"
      onClick={cycle}
      className="btn-ghost"
      aria-label={`Tema: ${label}. Klik untuk ganti.`}
      title={`Tema: ${label}`}
    >
      <span aria-hidden="true">
        {theme === "light" ? "☀" : theme === "dark" ? "☾" : "◐"}
      </span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function SearchButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="btn-ghost min-w-0"
      aria-label="Cari di modul (Ctrl+K)"
      title="Cari (Ctrl+K)"
    >
      <span aria-hidden="true">⌕</span>
      <span className="hidden md:inline">Cari</span>
      <kbd className="hidden md:inline rounded border border-black/10 dark:border-white/20 px-1.5 text-xs font-mono">
        Ctrl K
      </kbd>
    </button>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-rigor focus:text-white focus:px-3 focus:py-2 focus:rounded">
        Lewati ke konten
      </a>
      <header className="sticky top-0 z-40 bg-cream/90 dark:bg-charcoal/90 backdrop-blur border-b border-black/5 dark:border-white/5 no-print">
        <nav className="max-w-7xl mx-auto flex items-center gap-3 px-4 sm:px-6 py-3">
          <Link to="/" className="flex items-center gap-2 font-serif font-semibold text-lg shrink-0" aria-label="Beranda">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-rigor text-white text-sm font-mono font-bold" aria-hidden="true">
              MP
            </span>
            <span className="hidden sm:inline">Modul Pembelajaran</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1 ml-4">
            {NAV.slice(1).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-rigor text-white"
                        : "hover:bg-parchment dark:hover:bg-white/10"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-1">
            <SearchButton onOpen={() => setSearchOpen(true)} />
            <ThemeToggle />
            <button
              type="button"
              className="btn-ghost lg:hidden"
              aria-label="Buka menu navigasi"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="lg:hidden border-t border-black/5 dark:border-white/5 bg-cream dark:bg-charcoal">
            <ul className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-2">
              {NAV.slice(1).map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center min-h-[48px] px-4 rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rigor ${
                        isActive
                          ? "bg-rigor text-white"
                          : "hover:bg-parchment dark:hover:bg-white/10"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-black/5 dark:border-white/5 bg-cream dark:bg-charcoal no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 md:grid-cols-3 text-sm">
          <div>
            <div className="font-serif text-lg font-semibold mb-2">Modul Pembelajaran Asisten Dosen AI</div>
            <p className="text-ink/70 dark:text-parchment/70">
              14 minggu, 10 kompetensi, 4 sikap riset. Untuk mahasiswa S1 semester 4-6 yang menjadi asisten riset ML/DL.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-2">Navigasi cepat</div>
            <ul className="space-y-1">
              <li><Link className="hover:underline" to="/modul">Daftar modul</Link></li>
              <li><Link className="hover:underline" to="/rubrik">Rubrik 4-level</Link></li>
              <li><Link className="hover:underline" to="/progres">Progres saya</Link></li>
              <li><Link className="hover:underline" to="/alat/protokol">Generator protokol</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Sumber</div>
            <ul className="space-y-1">
              <li>
                <a
                  className="hover:underline"
                  href="https://github.com/muhammad-zainal-muttaqin/Module-DS"
                  target="_blank"
                  rel="noreferrer"
                >
                  Repository GitHub
                </a>
              </li>
              <li><Link className="hover:underline" to="/glosarium">Glosarium ID-EN</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 text-xs text-ink/70 dark:text-parchment/60 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-4">
          <span>Dibuat dengan disiplin Rigor, semangat Curiosity, kewaspadaan Skepticism, dan tanggung jawab Ownership.</span>
          <a
            href="https://github.com/muhammad-zainal-muttaqin/Module-DS"
            target="_blank"
            rel="noreferrer"
            aria-label="Repository GitHub"
            className="shrink-0 text-ink/70 dark:text-parchment/60 hover:text-ink dark:hover:text-parchment transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.77 1.06.77 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.68.8.56C20.21 21.39 23.5 17.07 23.5 12 23.5 5.73 18.27.5 12 .5Z"/>
            </svg>
          </a>
        </div>
      </footer>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

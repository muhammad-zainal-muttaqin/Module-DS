// State lokal (progres, jurnal, preferensi) - localStorage persist via zustand.
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MasteryLevel = "novice" | "developing" | "proficient" | "masterpiece" | null;

export type Progress = {
  weeks: Record<number, boolean>;
  mastery: Record<number, MasteryLevel>;
  journal: Record<string, Record<string, string>>;
  theme: "light" | "dark" | "system";
  setWeek: (w: number, done: boolean) => void;
  setMastery: (competencyN: number, level: MasteryLevel) => void;
  setJournalEntry: (chapterId: string, questionKey: string, value: string) => void;
  getJournalEntry: (chapterId: string, questionKey: string) => string;
  clearJournal: (chapterId: string) => void;
  setTheme: (t: "light" | "dark" | "system") => void;
  resetAll: () => void;
};

const STORAGE_KEY = "modul-pembelajaran-v1";

export const useStore = create<Progress>()(
  persist(
    (set, get) => ({
      weeks: {},
      mastery: {},
      journal: {},
      theme: "light",
      setWeek: (w, done) => set((s) => ({ weeks: { ...s.weeks, [w]: done } })),
      setMastery: (n, level) => set((s) => ({ mastery: { ...s.mastery, [n]: level } })),
      setJournalEntry: (chapterId, questionKey, value) =>
        set((s) => ({
          journal: {
            ...s.journal,
            [chapterId]: { ...(s.journal[chapterId] || {}), [questionKey]: value },
          },
        })),
      getJournalEntry: (chapterId, questionKey) => {
        const ch = get().journal[chapterId];
        return (ch && ch[questionKey]) || "";
      },
      clearJournal: (chapterId) =>
        set((s) => {
          const copy = { ...s.journal };
          delete copy[chapterId];
          return { journal: copy };
        }),
      setTheme: (t) => set({ theme: t }),
      resetAll: () => set({ weeks: {}, mastery: {}, journal: {} }),
    }),
    { name: STORAGE_KEY, version: 1 }
  )
);

export function exportAllAsJSON(): string {
  const { weeks, mastery, journal } = useStore.getState();
  return JSON.stringify(
    {
      version: 1,
      exportedAt: new Date().toISOString(),
      weeks,
      mastery,
      journal,
    },
    null,
    2
  );
}

export function downloadFile(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import ModuleList from "./routes/ModuleList";
import ModuleReader from "./routes/ModuleReader";
import Rubric from "./routes/Rubric";
import Glossary from "./routes/Glossary";
import Capstone from "./routes/Capstone";
import Labs from "./routes/Labs";
import ProgressPage from "./routes/Progress";
import ProtocolGenerator from "./routes/tools/ProtocolGenerator";
import ConfigDiff from "./routes/tools/ConfigDiff";
import ToolsIndex from "./routes/tools/ToolsIndex";
import CompetencyDetail from "./routes/CompetencyDetail";
import NotFound from "./routes/NotFound";
import SlideDeck from "./routes/SlideDeck";
import { useStore } from "./lib/storage";

function applyTheme(theme: "light" | "dark" | "system") {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const shouldDark = theme === "dark" || (theme === "system" && prefersDark);
  root.classList.toggle("dark", shouldDark);
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/modul" element={<ModuleList />} />
      <Route path="/modul/:id" element={<ModuleReader />} />
      <Route path="/kompetensi/:id" element={<CompetencyDetail />} />
      <Route path="/rubrik" element={<Rubric />} />
      <Route path="/glosarium" element={<Glossary />} />
      <Route path="/capstone" element={<Capstone />} />
      <Route path="/lab" element={<Labs />} />
      <Route path="/progres" element={<ProgressPage />} />
      <Route path="/alat" element={<ToolsIndex />} />
      <Route path="/alat/protokol" element={<ProtocolGenerator />} />
      <Route path="/alat/diff-config" element={<ConfigDiff />} />
      <Route path="/glossary" element={<Navigate to="/glosarium" replace />} />
      <Route path="/progress" element={<Navigate to="/progres" replace />} />
      <Route path="/tools" element={<Navigate to="/alat" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  const theme = useStore((s) => s.theme);

  useEffect(() => {
    applyTheme(theme);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme(theme);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return (
    <Routes>
      <Route path="/slide/:id" element={<SlideDeck />} />
      <Route path="/*" element={<Layout><AppRoutes /></Layout>} />
    </Routes>
  );
}

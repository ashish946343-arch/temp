import { useState } from "react";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";

export default function App() {
  const [view, setView] = useState("dashboard"); // "dashboard" | "analysis"
  const [activeScene, setActiveScene] = useState(null);

  function handleAnalyze(scene) {
    setActiveScene(scene);
    setView("analysis");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleBack() {
    setView("dashboard");
  }

  return (
    <div className="min-h-screen bg-void">
      <Header />
      {view === "dashboard" ? (
        <Dashboard onAnalyze={handleAnalyze} />
      ) : (
        <Analysis scene={activeScene} onBack={handleBack} />
      )}
    </div>
  );
}

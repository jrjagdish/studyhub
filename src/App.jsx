import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import StudyHub from "./pages/home";
import QuantumReader from "./pages/reader";
import Listen from "./pages/listen";
import QuantumChat from "./pages/chat";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
      <Routes>
        <Route path="/" element={<StudyHub />} />
        <Route path="/reader" element={<QuantumReader />} />
        <Route path="/listen" element={<Listen />} />
        <Route path="/chat" element={<QuantumChat />} />

        {/* Add other routes here */}
      </Routes>
    </Navigation>
  );
};

export default App;
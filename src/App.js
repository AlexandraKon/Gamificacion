import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Sonidos from "./components/Sonidos";
import Cards from "./components/Cards";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
  
      <div className={`App ${theme}`}>
        <div className="divCrear">
          <button className="btnToggleTheme" onClick={toggleTheme}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sonidos" element={<Sonidos />} />
          <Route path="/cards" element={<Cards />} />
        </Routes>
      </div>
    
  );
}

export default App;
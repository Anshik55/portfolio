import { useState } from "react";
import "./index.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { CursorGlow } from "./components/UI";

function AppContent() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("Home");

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <div style={{
      background: theme.bg,
      minHeight: "100vh",
      transition: "background 0.6s ease",
    }}>
      <CursorGlow />
      <Navbar activeSection={activeSection} onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <About />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { THEMES, THEME_ORDER } from "../data/themes";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      return localStorage.getItem("portfolio-theme") || "cyber";
    } catch {
      return "cyber";
    }
  });

  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("portfolio-mode") || "dark";
    } catch {
      return "dark";
    }
  });

  // Safe fallback if themeId or mode is invalid
  const activeThemeGroup = THEMES[themeId] || THEMES.cyber;
  const theme = activeThemeGroup[mode] || activeThemeGroup.dark;

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", themeId);
      localStorage.setItem("portfolio-mode", mode);
    } catch {}
    
    // Set CSS variables on root
    const root = document.documentElement;
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--scrollbar-thumb", theme.scrollbarThumb);
  }, [themeId, mode, theme]);

  const cycleTheme = useCallback(() => {
    setThemeId((prev) => {
      const idx = THEME_ORDER.indexOf(prev);
      return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    });
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeId, mode, cycleTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

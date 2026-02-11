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

  const theme = THEMES[themeId] || THEMES.cyber;

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", themeId);
    } catch {}
    // Set CSS variables on root
    const root = document.documentElement;
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--scrollbar-thumb", theme.scrollbarThumb);
  }, [themeId, theme]);

  const cycleTheme = useCallback(() => {
    setThemeId((prev) => {
      const idx = THEME_ORDER.indexOf(prev);
      return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeId, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { THEME_ORDER } from "../data/themes";
import { THEMES } from "../data/themes";

export default function ThemeSwitcher() {
  const { theme, themeId, cycleTheme, toggleMode, mode } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const nextIdx = (THEME_ORDER.indexOf(themeId) + 1) % THEME_ORDER.length;
  const nextTheme = THEMES[THEME_ORDER[nextIdx]];

  return (
    <div style={{
      position: "fixed",
      bottom: "32px",
      right: "32px",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "8px",
    }}>
      {/* Expanded theme options */}
      {expanded && (
        <>
          {/* Mode Toggle */}
          <button
            onClick={() => {
              toggleMode();
              setExpanded(false);
            }}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: `2px solid ${theme.primary}66`,
              background: theme.bg,
              color: theme.primary,
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 20px ${theme.primary}33`,
              transition: "all 0.3s",
              animation: `fadeUp 0.3s ease both`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.15)";
              e.currentTarget.style.boxShadow = `0 4px 30px ${theme.primary}55`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 4px 20px ${theme.primary}33`;
            }}
          >
            {mode === "dark" ? "☀️" : "🌙"}
          </button>

          {THEME_ORDER.filter(id => id !== themeId).map((id, i) => {
        const t = THEMES[id][mode];
        return (
          <button
            key={id}
            onClick={() => {
              const ctx = document.querySelector('[data-theme-provider]');
              setExpanded(false);
              // Cycle to specific theme
              let current = themeId;
              const clickTheme = () => {
                if (current !== id) {
                  cycleTheme();
                  current = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
                  if (current !== id) setTimeout(clickTheme, 50);
                }
              };
              clickTheme();
            }}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: `2px solid ${t.primary}66`,
              background: t.bg,
              color: t.primary,
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 20px ${t.primary}33`,
              transition: "all 0.3s",
              animation: `fadeUp 0.3s ease ${i * 0.1}s both`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.15)";
              e.currentTarget.style.boxShadow = `0 4px 30px ${t.primary}55`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = `0 4px 20px ${t.primary}33`;
            }}
          >
            {t.icon}
          </button>
        );
      })}
      </>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: `2px solid ${theme.primary}`,
          background: theme.bg,
          color: theme.primary,
          fontSize: "22px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hovered
            ? `0 0 30px ${theme.primary}66, 0 0 60px ${theme.primary}22`
            : `0 4px 20px ${theme.primary}33`,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: hovered ? "scale(1.1) rotate(15deg)" : "scale(1)",
          position: "relative",
        }}
      >
        {theme.icon}

        {/* Pulse ring */}
        <div style={{
          position: "absolute",
          inset: "-6px",
          borderRadius: "50%",
          border: `1px solid ${theme.primary}33`,
          animation: "pulse-glow 3s ease-in-out infinite",
          pointerEvents: "none",
        }} />
      </button>

      {/* Label tooltip */}
      {hovered && !expanded && (
        <div style={{
          position: "absolute",
          right: "70px",
          bottom: "12px",
          padding: "6px 14px",
          background: theme.bg,
          border: `1px solid ${theme.primary}44`,
          color: theme.primary,
          fontFamily: theme.fontMono,
          fontSize: "11px",
          letterSpacing: "2px",
          whiteSpace: "nowrap",
          borderRadius: "4px",
          boxShadow: `0 4px 20px ${theme.primary}22`,
        }}>
          {theme.label.toUpperCase()} MODE
        </div>
      )}
    </div>
  );
}

import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer style={{
      borderTop: `1px solid ${theme.border}`,
      padding: "32px 5%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: theme.bg,
      flexWrap: "wrap",
      gap: "12px",
      transition: "background 0.6s",
    }}>
      <div style={{
        fontFamily: theme.fontMono,
        fontSize: "20px", color: theme.primary,
        textShadow: `0 0 15px ${theme.primary}66`,
      }}>
        {"<AT/>"}
      </div>
      <div style={{
        fontFamily: theme.fontMono,
        fontSize: "11px", color: theme.textDimmer, letterSpacing: "2px",
      }}>
        © {new Date().getFullYear()} ANSHIK THAKUR — BUILT WITH PASSION
      </div>
      <div style={{
        fontFamily: theme.fontMono,
        fontSize: "11px", color: theme.textDimmer, letterSpacing: "2px",
      }}>
        v2.0.0
      </div>
    </footer>
  );
}

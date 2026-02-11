import { NAV_LINKS } from "../data";
import { useTheme } from "../context/ThemeContext";
import { MagneticWrap } from "./UI";

export default function Navbar({ activeSection, onNav }) {
  const { theme } = useTheme();
  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      padding: "20px 5%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: theme.navBg,
      backdropFilter: "blur(10px)",
      borderBottom: `1px solid ${theme.border}`,
    }}>
      <MagneticWrap strength={0.2}>
        <div style={{
          fontFamily: theme.fontMono,
          fontSize: "20px",
          letterSpacing: "4px",
          color: theme.primary,
          textShadow: `0 0 20px ${theme.primary}88`,
          fontWeight: "bold",
          cursor: "pointer",
          transition: "all 0.3s",
        }}
        onClick={() => onNav("Home")}
        onMouseEnter={e => {
          e.currentTarget.style.textShadow = `0 0 30px ${theme.primary}, 0 0 60px ${theme.primary}66`;
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.textShadow = `0 0 20px ${theme.primary}88`;
          e.currentTarget.style.transform = "scale(1)";
        }}
        >
          {"<AT/>"}
        </div>
      </MagneticWrap>
      <ul style={{ display: "flex", gap: "28px", listStyle: "none", margin: 0, padding: 0 }}>
        {NAV_LINKS.map(link => (
          <li key={link}>
            <MagneticWrap strength={0.15}>
              <button
                className={`nav-link ${activeSection === link ? "active" : ""}`}
                onClick={() => onNav(link)}
                style={{ color: theme.textMuted }}
              >
                {link}
              </button>
            </MagneticWrap>
          </li>
        ))}
      </ul>
    </nav>
  );
}

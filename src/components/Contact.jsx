import { CyberButton, SectionTitle, ScrollReveal, MagneticWrap } from "./UI";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  return (
    <section id="contact" style={{
      padding: "100px 5% 140px",
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center",
    }}>
      <SectionTitle label="// 005 — CONTACT" title="LET'S BUILD" />

      <ScrollReveal delay={200}>
        <p style={{
          color: theme.textMuted, fontSize: "16px", lineHeight: 1.8,
          maxWidth: "500px", margin: "0 auto 48px",
          fontFamily: theme.fontBody,
        }}>
          Have an exciting project or opportunity? I'm always open to new challenges
          and collaborations.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={400}>
        <div style={{
          display: "flex", justifyContent: "center",
          gap: "16px", marginBottom: "60px", flexWrap: "wrap",
        }}>
          <CyberButton primary onClick={() => window.open("mailto:thakuranshik5555@gmail.com")}>
            thakuranshik5555@gmail.com
          </CyberButton>
          <CyberButton onClick={() => window.open("https://www.linkedin.com/in/anshikthakur55/", "_blank")}>
            LinkedIn
          </CyberButton>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={600}>
        <MagneticWrap strength={0.15}>
          <div style={{
            display: "inline-block",
            padding: "16px 32px",
            border: `1px solid ${theme.primary}22`,
            background: `linear-gradient(135deg, ${theme.primary}08, transparent)`,
            fontFamily: theme.fontMono,
            fontSize: "12px", color: `${theme.primary}44`, letterSpacing: "3px",
            transition: "all 0.3s",
            cursor: "default",
            borderRadius: theme.borderRadius || "0",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = `${theme.primary}55`;
            e.currentTarget.style.color = `${theme.primary}88`;
            e.currentTarget.style.boxShadow = `0 0 20px ${theme.primary}22`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = `${theme.primary}22`;
            e.currentTarget.style.color = `${theme.primary}44`;
            e.currentTarget.style.boxShadow = "none";
          }}
          >
            +91-7973990693
          </div>
        </MagneticWrap>
      </ScrollReveal>
    </section>
  );
}

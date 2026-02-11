import { SectionTitle, SkillBar, ScrollReveal } from "./UI";
import { useTheme } from "../context/ThemeContext";
import { SKILLS, SECONDARY_SKILLS } from "../data";

export default function Skills() {
  const { theme } = useTheme();
  return (
    <section id="skills" style={{
      padding: "100px 5%",
      background: theme.sectionGradient,
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle label="// 002 — SKILLS" title="TECH STACK" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 60px", marginBottom: "48px" }}>
          {SKILLS.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
              <SkillBar skill={skill} delay={i * 150} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300} direction="up">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
            gap: "12px",
          }}>
            {SECONDARY_SKILLS.map((tech) => (
              <div key={tech} style={{
                padding: "12px",
                border: `1px solid ${theme.border}`,
                textAlign: "center",
                fontFamily: theme.fontMono,
                fontSize: "11px",
                color: theme.textDim,
                letterSpacing: "1px",
                transition: "all 0.3s",
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                borderRadius: theme.borderRadius || "0",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = theme.primary;
                  e.currentTarget.style.borderColor = `${theme.primary}33`;
                  e.currentTarget.style.background = `${theme.primary}0a`;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = `0 4px 15px ${theme.primary}15`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = theme.textDim;
                  e.currentTarget.style.borderColor = theme.border;
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

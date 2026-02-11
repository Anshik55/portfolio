import { SectionTitle, ScrollReveal } from "./UI";
import { useTheme } from "../context/ThemeContext";
import { EXPERIENCE } from "../data";
import { useState } from "react";

export default function About() {
  const { theme } = useTheme();
  return (
    <section id="about" style={{
      padding: "120px 5% 80px",
      maxWidth: "1200px",
      margin: "0 auto",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "flex-start" }}>

        {/* Left — Bio */}
        <ScrollReveal direction="left">
          <div>
            <SectionTitle label="// 001 — ABOUT" title="WHO AM I" />

            <p style={{ color: theme.textMuted, fontSize: "15px", lineHeight: 1.9, marginBottom: "24px", fontFamily: theme.fontBody }}>
              I'm a Full Stack Developer at Argusoft, working at the intersection of complex UI engineering and robust backend design. My day-to-day involves leading React.js features, mentoring teammates, and pushing frontend architecture further.
            </p>
            <p style={{ color: theme.textDim, fontSize: "15px", lineHeight: 1.9, marginBottom: "32px", fontFamily: theme.fontBody }}>
              I love hard problems — I built an entire drag-and-drop engine from scratch with zero external libraries. Clean, maintainable code and real-world scalability are what I'm all about.
            </p>

            <div style={{
              padding: "24px",
              border: `1px solid ${theme.primary}22`,
              background: `linear-gradient(135deg, ${theme.primary}08, transparent)`,
              clipPath: theme.clipPathLg || "none",
              borderRadius: theme.borderRadius || "0",
              transition: "all 0.3s",
              cursor: "default",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${theme.primary}55`;
              e.currentTarget.style.boxShadow = `0 0 30px ${theme.primary}22`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${theme.primary}22`;
              e.currentTarget.style.boxShadow = "none";
            }}
            >
              <div style={{
                fontFamily: theme.fontMono,
                fontSize: "12px", color: theme.primary, letterSpacing: "3px", marginBottom: "10px",
              }}>
                STATUS: OPEN TO OPPORTUNITIES
              </div>
              <div style={{ color: theme.textDim, fontSize: "13px", marginBottom: "6px" }}>
                📍 India · Remote-friendly
              </div>
              <div style={{ color: theme.textDim, fontSize: "13px" }}>
                🎓 B.Tech CSE · GNDEC Ludhiana · CGPA 8.3
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right — Experience Timeline */}
        <ScrollReveal direction="right">
          <div>
            <div style={{
              fontFamily: theme.fontMono,
              fontSize: "12px", letterSpacing: "4px",
              color: theme.primary, marginBottom: "32px", textTransform: "uppercase",
            }}>
              // Experience
            </div>

            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", left: "12px", top: 0, bottom: 0,
                width: "1px",
                background: `linear-gradient(180deg, ${theme.primary}44, ${theme.secondary}44, transparent)`,
              }} />

              {EXPERIENCE.map((exp, i) => (
                <TimelineItem key={exp.role} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TimelineItem({ exp, index }) {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 300} direction="right">
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          paddingLeft: "44px",
          paddingBottom: "40px",
          position: "relative",
          cursor: "default",
        }}
      >
        <div style={{
          position: "absolute", left: "6px", top: "6px",
          width: hovered ? "18px" : "14px",
          height: hovered ? "18px" : "14px",
          marginLeft: hovered ? "-2px" : "0",
          marginTop: hovered ? "-2px" : "0",
          borderRadius: "50%",
          background: exp.color,
          boxShadow: hovered
            ? `0 0 20px ${exp.color}, 0 0 40px ${exp.color}66`
            : `0 0 12px ${exp.color}`,
          transition: "all 0.3s",
        }} />

        <div style={{
          fontFamily: theme.fontMono,
          fontSize: "11px", letterSpacing: "2px",
          color: exp.color, marginBottom: "6px",
        }}>
          {exp.period}
        </div>
        <div style={{
          fontFamily: theme.fontMono,
          fontSize: "16px", color: hovered ? theme.textMain : "#ccc",
          marginBottom: "2px", letterSpacing: "1px",
          textShadow: hovered ? `0 0 10px ${exp.color}44` : "none",
          transition: "all 0.3s",
        }}>
          {exp.role}
        </div>
        <div style={{
          fontFamily: theme.fontMono,
          fontSize: "12px", color: theme.textDim,
          marginBottom: "16px", letterSpacing: "1px",
        }}>
          {exp.company}
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {exp.points.map((pt, j) => (
            <li key={j} style={{
              color: theme.textMuted, fontSize: "13px", lineHeight: 1.7,
              marginBottom: "8px", fontFamily: theme.fontBody,
              paddingLeft: "16px", position: "relative",
              transform: hovered ? `translateX(4px)` : "translateX(0)",
              transition: `transform 0.3s ease ${j * 0.05}s`,
            }}>
              <span style={{
                position: "absolute", left: 0, color: exp.color, fontSize: "10px",
              }}>▸</span>
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </ScrollReveal>
  );
}

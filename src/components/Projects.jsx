import { useState } from "react";
import { SectionTitle, TiltCard, ScrollReveal } from "./UI";
import { useTheme } from "../context/ThemeContext";
import { PROJECTS } from "../data";

function ProjectCard({ project, index }) {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={index * 200} direction={index % 2 === 0 ? "left" : "right"}>
      <TiltCard glareColor={project.color} style={{ height: "100%" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: "relative",
            padding: "36px",
            background: hovered
              ? theme.cardBgHover(project.color)
              : theme.cardBg,
            border: `1px solid ${hovered ? project.color : theme.border}`,
            transition: "all 0.4s ease",
            boxShadow: hovered ? `0 0 40px ${project.color}22, inset 0 0 40px ${project.color}08` : "none",
            cursor: "default",
            height: "100%",
            borderRadius: theme.borderRadius || "0",
          }}
        >
          {/* Corner accent */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "60px", height: "60px",
            background: `linear-gradient(135deg, transparent 50%, ${project.color}22 50%)`,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 0.3s",
            borderRadius: theme.borderRadius ? `0 ${theme.borderRadius} 0 0` : "0",
          }} />

          {/* Animated border line */}
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            height: "2px",
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg, ${project.color}, transparent)`,
            boxShadow: `0 0 10px ${project.color}`,
            transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }} />

          <div style={{
            display: "inline-block",
            padding: "4px 12px",
            border: `1px solid ${project.color}33`,
            color: project.color,
            fontFamily: theme.fontMono,
            fontSize: "10px", letterSpacing: "2px",
            background: `${project.color}0d`,
            marginBottom: "20px",
            borderRadius: theme.borderRadius || "0",
          }}>
            {project.subtitle}
          </div>

          <div style={{
            fontSize: "30px", marginBottom: "14px", color: project.color,
            textShadow: hovered ? `0 0 20px ${project.color}` : "none",
            transition: "text-shadow 0.3s, transform 0.3s",
            transform: hovered ? "scale(1.2) rotate(5deg)" : "scale(1)",
            display: "inline-block",
          }}>
            {project.icon}
          </div>

          <h3 style={{
            fontFamily: theme.fontHeading,
            fontSize: "20px", color: theme.textMain,
            marginBottom: "12px", letterSpacing: "2px",
          }}>
            {project.title}
          </h3>

          <p style={{
            fontSize: "14px", color: theme.textMuted, lineHeight: 1.8,
            marginBottom: "24px", fontFamily: theme.fontBody,
          }}>
            {project.description}
          </p>

          <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
            {project.highlights.map((h, i) => (
              <li key={i} style={{
                color: theme.textDim, fontSize: "13px", marginBottom: "6px",
                paddingLeft: "16px", position: "relative", fontFamily: theme.fontBody,
                transform: hovered ? `translateX(4px)` : "translateX(0)",
                transition: `transform 0.3s ease ${i * 0.05}s`,
              }}>
                <span style={{ position: "absolute", left: 0, color: project.color }}>▸</span>
                {h}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: "4px 12px",
                border: `1px solid ${project.color}44`,
                color: project.color,
                fontFamily: theme.fontMono,
                fontSize: "11px", letterSpacing: "1px",
                background: `${project.color}11`,
                transition: "all 0.3s",
                borderRadius: theme.borderRadius || "0",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${project.color}33`;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 4px 12px ${project.color}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${project.color}11`;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{
      padding: "100px 5%",
      maxWidth: "1200px",
      margin: "0 auto",
    }}>
      <SectionTitle label="// 003 — WORK" title="PROJECTS" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

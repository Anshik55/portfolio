import { useState } from "react";
import { SectionTitle, TiltCard, ScrollReveal } from "./UI";
import { useTheme } from "../context/ThemeContext";
import { ACHIEVEMENTS } from "../data";

function AchievementCard({ item, index }) {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState(false);
  return (
    <ScrollReveal delay={index * 150} direction="up">
      <TiltCard glareColor={item.color} intensity={10} style={{ height: "100%" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: "28px",
            border: `1px solid ${hovered ? item.color + "55" : theme.border}`,
            background: hovered
              ? theme.cardBgHover(item.color)
              : theme.cardBg,
            transition: "all 0.3s ease",
            boxShadow: hovered ? `0 0 28px ${item.color}18` : "none",
            cursor: "default",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: theme.borderRadius || "0",
          }}
        >
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            height: "2px",
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg, ${item.color}, transparent)`,
            boxShadow: `0 0 8px ${item.color}`,
            transition: "width 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }} />

          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", marginBottom: "16px",
          }}>
            <div style={{
              fontSize: "26px", color: item.color,
              textShadow: hovered ? `0 0 16px ${item.color}` : "none",
              transition: "text-shadow 0.3s, transform 0.4s",
              transform: hovered ? "scale(1.3) rotate(10deg)" : "scale(1)",
            }}>
              {item.icon}
            </div>
            <span style={{
              padding: "4px 10px",
              border: `1px solid ${item.color}33`,
              color: item.color,
              fontFamily: theme.fontMono,
              fontSize: "10px", letterSpacing: "2px",
              background: `${item.color}0d`,
              transition: "all 0.3s",
              transform: hovered ? "translateX(-4px)" : "none",
              borderRadius: theme.borderRadius || "0",
            }}>
              {item.label}
            </span>
          </div>

          <h3 style={{
            fontFamily: theme.fontHeading,
            fontSize: "15px", color: theme.textMain,
            marginBottom: "10px", letterSpacing: "1px",
          }}>
            {item.title}
          </h3>

          <p style={{
            fontSize: "13px", color: theme.textMuted, lineHeight: 1.7,
            fontFamily: theme.fontBody,
          }}>
            {item.description}
          </p>
        </div>
      </TiltCard>
    </ScrollReveal>
  );
}

export default function Achievements() {
  const { theme } = useTheme();
  return (
    <section id="achievements" style={{
      padding: "100px 5%",
      background: theme.sectionGradient,
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionTitle label="// 004 — HIGHLIGHTS" title="ACHIEVEMENTS" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}>
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

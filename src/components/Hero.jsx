import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { CyberButton, ParticleField, MagneticWrap, AnimatedCounter, ScrollReveal } from "./UI";
import ForestBackground from "./backgrounds/ForestBackground";
import OceanBackground from "./backgrounds/OceanBackground";

const ROLES = [
  "Full-Stack Developer",
  "React.js Specialist",
  "Solution Analyst @ Argusoft",
];

const BADGES = [
  { label: "React.js",   x: "8%",  y: "12%", colorKey: "primary" },
  { label: "Django",     x: "68%", y: "8%",  colorKey: "secondary" },
  { label: "Node.js",    x: "78%", y: "72%", colorKey: "accent" },
  { label: "PostgreSQL", x: "0%",  y: "76%", colorKey: "accent2" },
];

function ThemeBackground() {
  const { themeId } = useTheme();
  if (themeId === "forest") return <ForestBackground />;
  if (themeId === "ocean") return <OceanBackground />;
  return <ParticleField />;
}

export default function Hero({ onNav }) {
  const { theme, themeId } = useTheme();
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < current.length) {
        setTypedText(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
      } else {
        setIsDeleting(false);
        setRoleIndex(r => (r + 1) % ROLES.length);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const introTexts = {
    cyber: ">_ INITIALIZING PORTFOLIO...",
    forest: "~ discovering the path...",
    ocean: "≋ diving into the depths...",
  };

  const orbIcons = {
    cyber: "⟨/⟩",
    forest: "🌳",
    ocean: "🐚",
  };

  const orbColors = {
    cyber: [`${theme.primary}11`, `${theme.secondary}22`, `${theme.primary}33`],
    forest: [`${theme.primary}15`, `${theme.secondary}20`, `${theme.accent}18`],
    ocean: [`${theme.primary}15`, `${theme.secondary}20`, `${theme.accent2}12`],
  };

  const ringColors = [theme.primary, theme.secondary, theme.accent];

  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      padding: "0 5%",
    }}>
      <ThemeBackground />

      {/* Scan line — cyber only */}
      {theme.scanline && (
        <div style={{
          position: "absolute", left: 0, right: 0,
          height: "2px",
          background: `linear-gradient(90deg, transparent, ${theme.primary}22, transparent)`,
          animation: "scanline 6s linear infinite",
          pointerEvents: "none", zIndex: 1,
        }} />
      )}

      {/* Grid overlay — cyber only */}
      {theme.gridOverlay && (
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(${theme.primary}06 1px, transparent 1px),
            linear-gradient(90deg, ${theme.primary}06 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }} />
      )}

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>

          {/* Left — Text */}
          <ScrollReveal delay={200}>
            <div style={{
              fontFamily: theme.fontMono,
              fontSize: "12px", letterSpacing: "6px",
              color: theme.primary, marginBottom: "20px", opacity: 0.8,
            }}>
              {introTexts[themeId]}
            </div>

            <h1 style={{
              fontSize: "clamp(44px, 6vw, 80px)",
              fontFamily: theme.fontHeading,
              lineHeight: 1, letterSpacing: "-1px", marginBottom: "16px",
            }}>
              <span style={{ color: theme.textMain }}>ANSHIK</span>
              <br />
              <span style={{
                color: "transparent",
                WebkitTextStroke: `1px ${theme.primary}`,
                textShadow: `0 0 40px ${theme.primary}44`,
              }}>THAKUR</span>
            </h1>

            <div style={{
              height: "32px", marginBottom: "32px",
              fontSize: "15px", color: theme.secondary,
              fontFamily: theme.fontMono, letterSpacing: "2px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ color: `${theme.primary}88` }}>//</span>
              <span>{typedText}</span>
              <span style={{ animation: "blink 1s infinite", color: theme.primary }}>|</span>
            </div>

            <p style={{
              color: theme.textMuted, fontSize: "15px", lineHeight: 1.8,
              marginBottom: "44px", maxWidth: "480px", fontFamily: theme.fontBody,
            }}>
              Full Stack Developer specializing in React.js and Django. I build scalable
              applications, architect custom UI systems, and write clean code that lasts.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <CyberButton primary onClick={() => onNav("Projects")}>View Projects</CyberButton>
              <CyberButton onClick={() => onNav("Contact")}>Get In Touch</CyberButton>
            </div>

            {/* Stats */}
            <div style={{ marginTop: "60px", display: "flex", gap: "40px" }}>
              {[["2+", "Years Exp."], ["2", "Key Projects"], ["30%", "API Speedup"]].map(([num, label]) => (
                <MagneticWrap key={label} strength={0.15}>
                  <div style={{ cursor: "default" }}>
                    <div style={{
                      fontSize: "28px", fontFamily: theme.fontMono,
                      color: theme.primary, textShadow: `0 0 20px ${theme.primary}88`,
                    }}>
                      <AnimatedCounter target={num.replace(/[^0-9]/g, '')} suffix={num.replace(/[0-9]/g, '')} />
                    </div>
                    <div style={{ fontSize: "11px", color: theme.textDim, letterSpacing: "2px" }}>{label}</div>
                  </div>
                </MagneticWrap>
              ))}
            </div>
          </ScrollReveal>

          {/* Right — Orb */}
          <ScrollReveal delay={500} direction="scale">
            <div style={{
              display: "flex", justifyContent: "center", alignItems: "center",
              position: "relative", height: "500px",
            }}>
              <div className="hero-orb" style={{
                width: "260px", height: "260px", borderRadius: "50%",
                background: `linear-gradient(135deg, ${orbColors[themeId][0]}, ${orbColors[themeId][1]})`,
                border: `1px solid ${theme.primary}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
                cursor: "pointer",
              }}>
                {[320, 380, 440].map((size, i) => (
                  <div key={size} style={{
                    position: "absolute", width: size, height: size, borderRadius: "50%",
                    border: `1px solid ${ringColors[i]}${["22", "18", "12"][i]}`,
                    animation: `spin ${[8, 12, 16][i]}s linear infinite${i % 2 ? " reverse" : ""}`,
                  }} />
                ))}
                <div style={{ fontSize: "72px", textShadow: `0 0 40px ${theme.primary}`, zIndex: 1 }}>
                  {orbIcons[themeId]}
                </div>
              </div>

              {BADGES.map((badge, i) => {
                const badgeColor = theme[badge.colorKey];
                return (
                  <div key={badge.label} style={{
                    position: "absolute", left: badge.x, top: badge.y,
                    padding: "6px 14px",
                    border: `1px solid ${badgeColor}44`,
                    color: badgeColor, fontSize: "11px", letterSpacing: "2px",
                    background: `${badgeColor}11`,
                    clipPath: theme.clipPath,
                    borderRadius: theme.borderRadius || "0",
                    animation: `float ${3 + i * 0.8}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                    cursor: "default",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${badgeColor}33`;
                    e.currentTarget.style.boxShadow = `0 0 20px ${badgeColor}44`;
                    e.currentTarget.style.transform = "scale(1.15)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${badgeColor}11`;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  >
                    {badge.label}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

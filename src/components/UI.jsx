import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

// ─── Scroll Reveal ─────────────────────────────────────────────────────────────
export const useScrollReveal = (options = {}) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: options.threshold || 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold]);
  return [ref, isVisible];
};

export const ScrollReveal = ({ children, delay = 0, direction = "up", style = {} }) => {
  const [ref, isVisible] = useScrollReveal();
  const transforms = {
    up: "translateY(60px)",
    down: "translateY(-60px)",
    left: "translateX(60px)",
    right: "translateX(-60px)",
    scale: "scale(0.85)",
  };
  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "none" : transforms[direction],
      transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      willChange: "transform, opacity",
      ...style,
    }}>
      {children}
    </div>
  );
};

// ─── 3D Tilt Card ──────────────────────────────────────────────────────────────
export const TiltCard = ({ children, style = {}, intensity = 12, glareColor }) => {
  const { theme } = useTheme();
  const gc = glareColor || theme.primary;
  const ref = useRef();
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * intensity;
    const rotateY = (x - 0.5) * intensity;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, ${gc}${Math.floor(glare.opacity * 255).toString(16).padStart(2, "0")}, transparent 60%)`,
        pointerEvents: "none",
        transition: "opacity 0.3s",
        zIndex: 10,
      }} />
    </div>
  );
};

// ─── Magnetic Hover ────────────────────────────────────────────────────────────
export const MagneticWrap = ({ children, strength = 0.3, style = {} }) => {
  const ref = useRef();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        display: "inline-block",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─── Glitch Text ──────────────────────────────────────────────────────────────
export const GlitchText = ({ text, className = "" }) => {
  const { theme } = useTheme();
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    if (theme.id !== "cyber") return; // Only glitch in cyber mode
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3500);
    return () => clearInterval(interval);
  }, [theme.id]);
  return (
    <span className={className} style={{ position: "relative", display: "inline-block" }}>
      <span style={{ position: "relative", zIndex: 1 }}>{text}</span>
      {glitching && (
        <>
          <span style={{
            position: "absolute", top: 0, left: 0, color: theme.accent2,
            clipPath: "polygon(0 20%, 100% 20%, 100% 40%, 0 40%)",
            transform: "translate(-2px, 0)", opacity: 0.8, zIndex: 2,
          }}>{text}</span>
          <span style={{
            position: "absolute", top: 0, left: 0, color: theme.primary,
            clipPath: "polygon(0 60%, 100% 60%, 100% 80%, 0 80%)",
            transform: "translate(2px, 0)", opacity: 0.8, zIndex: 2,
          }}>{text}</span>
        </>
      )}
    </span>
  );
};

// ─── Cyber Button ─────────────────────────────────────────────────────────────
export const CyberButton = ({ children, onClick, primary = false, style = {} }) => {
  const { theme } = useTheme();
  const [ripple, setRipple] = useState(null);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y, key: Date.now() });
    setTimeout(() => setRipple(null), 600);
    onClick && onClick(e);
  };

  const clip = theme.clipPath || "none";
  const br = theme.borderRadius || "0";

  return (
    <MagneticWrap strength={0.2}>
      <button
        onClick={handleClick}
        style={{
          position: "relative",
          padding: "12px 32px",
          background: primary ? `linear-gradient(135deg, ${theme.primary}22, ${theme.secondary}22)` : "transparent",
          border: `1px solid ${primary ? theme.primary : "#ffffff33"}`,
          color: primary ? theme.primary : theme.textMain,
          fontFamily: theme.fontMono,
          fontSize: "12px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 0.3s ease",
          clipPath: clip,
          borderRadius: clip === "none" ? br : "0",
          boxShadow: primary ? `0 0 20px ${theme.primary}33, inset 0 0 20px ${theme.primary}11` : "none",
          overflow: "hidden",
          ...style,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = `0 0 30px ${primary ? theme.primary + "66" : "#ffffff22"}, inset 0 0 20px ${primary ? theme.primary + "22" : "#ffffff11"}`;
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = primary ? `0 0 20px ${theme.primary}33, inset 0 0 20px ${theme.primary}11` : "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {ripple && (
          <span style={{
            position: "absolute", left: ripple.x, top: ripple.y,
            width: "300px", height: "300px",
            marginLeft: "-150px", marginTop: "-150px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${primary ? theme.primary + "44" : "#ffffff22"}, transparent 60%)`,
            animation: "ripple-out 0.6s ease-out forwards",
            pointerEvents: "none",
          }} />
        )}
        {children}
      </button>
    </MagneticWrap>
  );
};

// ─── Section Title ────────────────────────────────────────────────────────────
export const SectionTitle = ({ label, title }) => {
  const { theme } = useTheme();
  const [ref, isVisible] = useScrollReveal();
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setLineWidth(40), 300);
    }
  }, [isVisible]);

  return (
    <div ref={ref} style={{
      marginBottom: "60px",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "none" : "translateY(30px)",
      transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div style={{
        fontFamily: theme.fontMono,
        fontSize: "12px",
        letterSpacing: "4px",
        color: theme.primary,
        marginBottom: "12px",
        textTransform: "uppercase",
      }}>
        {label}
      </div>
      <h2 style={{
        fontSize: "clamp(32px, 5vw, 52px)",
        fontFamily: theme.fontHeading,
        color: theme.textMain,
        letterSpacing: "2px",
        lineHeight: 1.1,
        position: "relative",
        display: "inline-block",
      }}>
        {title}
        <span style={{
          position: "absolute", bottom: "-8px", left: 0,
          width: `${lineWidth}%`, height: "2px",
          background: `linear-gradient(90deg, ${theme.primary}, transparent)`,
          boxShadow: `0 0 10px ${theme.primary}`,
          transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }} />
      </h2>
    </div>
  );
};

// ─── Skill Bar ────────────────────────────────────────────────────────────────
export const SkillBar = ({ skill, delay }) => {
  const { theme } = useTheme();
  const [width, setWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimeout(() => setWidth(skill.level), delay);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [skill.level, delay]);
  return (
    <div
      ref={ref}
      style={{ marginBottom: "20px", cursor: "default" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{
          fontFamily: theme.fontMono, fontSize: "13px", letterSpacing: "2px",
          color: hovered ? theme.textMain : theme.textMuted,
          textShadow: hovered ? `0 0 10px ${skill.color}66` : "none",
          transition: "all 0.3s",
        }}>
          {skill.name}
        </span>
        <span style={{
          fontFamily: theme.fontMono, fontSize: "12px", color: skill.color,
          transform: hovered ? "scale(1.2)" : "scale(1)",
          transition: "transform 0.3s",
          display: "inline-block",
        }}>
          {skill.level}%
        </span>
      </div>
      <div style={{
        height: hovered ? "6px" : "4px",
        background: theme.border,
        position: "relative",
        overflow: "hidden",
        transition: "height 0.3s",
        borderRadius: theme.borderRadius ? "3px" : "0",
      }}>
        <div style={{
          height: "100%",
          width: `${width}%`,
          background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
          boxShadow: hovered ? `0 0 20px ${skill.color}, 0 0 40px ${skill.color}44` : `0 0 10px ${skill.color}`,
          transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s",
          borderRadius: "inherit",
        }} />
        {hovered && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            background: `linear-gradient(90deg, transparent, ${skill.color}33, transparent)`,
            animation: "shimmer 1.5s infinite",
          }} />
        )}
      </div>
    </div>
  );
};

// ─── Particle Field (Cyber-only, Mouse-reactive) ──────────────────────────────
export const ParticleField = () => {
  const { theme } = useTheme();
  const canvasRef = useRef();
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    const parent = canvas.parentElement;
    if (parent) parent.style.pointerEvents = "auto";
    window.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const colors = [theme.primary, theme.secondary, theme.accent, theme.accent2];
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseVx: (Math.random() - 0.5) * 0.4,
      baseVy: (Math.random() - 0.5) * 0.4,
      vx: 0, vy: 0,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      particles.forEach(p => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 150;

        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius;
          p.vx = p.baseVx + (dx / dist) * force * 3;
          p.vy = p.baseVy + (dy / dist) * force * 3;
        } else {
          p.vx += (p.baseVx - p.vx) * 0.05;
          p.vy += (p.baseVy - p.vy) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.baseVx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.baseVy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        p.pulsePhase += 0.02;
        const pulseSize = p.size + Math.sin(p.pulsePhase) * 0.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();

        if (dist < mouseRadius) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseSize + 3, 0, Math.PI * 2);
          const glowOpacity = Math.floor((1 - dist / mouseRadius) * 80).toString(16).padStart(2, "0");
          ctx.fillStyle = p.color + glowOpacity;
          ctx.fill();
        }
      });

      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `${theme.primary}${Math.floor((1 - dist / 120) * 40).toString(16).padStart(2, "0")}`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      particles.forEach(p => {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          const alpha = Math.floor((1 - dist / 200) * 60).toString(16).padStart(2, "0");
          ctx.strokeStyle = `${theme.primary}${alpha}`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme]);
  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none",
    }} />
  );
};

// ─── Animated Counter ──────────────────────────────────────────────────────────
export const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollReveal();
  const numericTarget = parseInt(target, 10);

  useEffect(() => {
    if (!isVisible || isNaN(numericTarget)) return;
    let start = 0;
    const step = numericTarget / (duration / 16);
    const interval = setInterval(() => {
      start += step;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [isVisible, numericTarget, duration]);

  return (
    <span ref={ref}>
      {isNaN(numericTarget) ? target : count}{suffix}
    </span>
  );
};

// ─── Floating Cursor Glow ──────────────────────────────────────────────────────
export const CursorGlow = () => {
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div style={{
      position: "fixed",
      left: pos.x, top: pos.y,
      width: "400px", height: "400px",
      marginLeft: "-200px", marginTop: "-200px",
      borderRadius: "50%",
      background: `radial-gradient(circle, ${theme.cursorColors[0]}, ${theme.cursorColors[1]}, transparent 70%)`,
      pointerEvents: "none",
      zIndex: 9999,
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s",
    }} />
  );
};


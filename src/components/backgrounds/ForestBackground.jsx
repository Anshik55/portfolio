import { useRef, useEffect } from "react";

export default function ForestBackground() {
  const canvasRef = useRef();

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

    // Leaves
    const leaves = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 12 + 6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.03,
      fallSpeed: Math.random() * 0.8 + 0.3,
      drift: (Math.random() - 0.5) * 0.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      color: ["#3cb371", "#90b77d", "#d4a853", "#8b6914", "#6b8e23"][Math.floor(Math.random() * 5)],
      opacity: Math.random() * 0.4 + 0.15,
    }));

    // Fireflies
    const fireflies = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.02,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw leaves
      leaves.forEach(leaf => {
        leaf.y += leaf.fallSpeed;
        leaf.x += leaf.drift + Math.sin(leaf.wobble) * 0.5;
        leaf.wobble += leaf.wobbleSpeed;
        leaf.rotation += leaf.rotSpeed;

        if (leaf.y > canvas.height + 20) {
          leaf.y = -20;
          leaf.x = Math.random() * canvas.width;
        }
        if (leaf.x < -20) leaf.x = canvas.width + 20;
        if (leaf.x > canvas.width + 20) leaf.x = -20;

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rotation);
        ctx.globalAlpha = leaf.opacity;

        // Draw leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -leaf.size / 2);
        ctx.quadraticCurveTo(leaf.size / 2, -leaf.size / 4, leaf.size / 3, leaf.size / 2);
        ctx.quadraticCurveTo(0, leaf.size / 3, -leaf.size / 3, leaf.size / 2);
        ctx.quadraticCurveTo(-leaf.size / 2, -leaf.size / 4, 0, -leaf.size / 2);
        ctx.fillStyle = leaf.color;
        ctx.fill();

        // Leaf vein
        ctx.beginPath();
        ctx.moveTo(0, -leaf.size / 2);
        ctx.lineTo(0, leaf.size / 2);
        ctx.strokeStyle = leaf.color + "88";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      });

      // Draw fireflies
      fireflies.forEach(f => {
        f.x += f.vx;
        f.y += f.vy;
        f.phase += f.pulseSpeed;

        if (f.x < 0 || f.x > canvas.width) f.vx *= -1;
        if (f.y < 0 || f.y > canvas.height) f.vy *= -1;

        // Random direction changes
        if (Math.random() < 0.005) {
          f.vx = (Math.random() - 0.5) * 0.3;
          f.vy = (Math.random() - 0.5) * 0.3;
        }

        const pulse = (Math.sin(f.phase) + 1) / 2;
        const glow = pulse * 0.7 + 0.3;

        // Outer glow
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 83, ${glow * 0.08})`;
        ctx.fill();

        // Inner glow
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 83, ${glow * 0.2})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 230, 150, ${glow * 0.8})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none",
    }} />
  );
}

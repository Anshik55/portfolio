import { useRef, useEffect } from "react";

export default function OceanBackground() {
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

    // Bubbles
    const bubbles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * canvas.height,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 0.8 + 0.2,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      wobbleAmp: Math.random() * 20 + 5,
      opacity: Math.random() * 0.3 + 0.1,
      baseX: 0,
    }));
    bubbles.forEach(b => { b.baseX = b.x; });

    // Light rays
    const rays = Array.from({ length: 5 }, () => ({
      x: Math.random() * canvas.width,
      width: Math.random() * 80 + 40,
      opacity: Math.random() * 0.03 + 0.01,
      speed: Math.random() * 0.2 + 0.05,
      phase: Math.random() * Math.PI * 2,
    }));

    // Small fish (simple shapes)
    const fish = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6 + canvas.height * 0.2,
      speed: (Math.random() * 0.5 + 0.2) * (Math.random() < 0.5 ? 1 : -1),
      size: Math.random() * 6 + 4,
      tailPhase: Math.random() * Math.PI * 2,
      color: ["#00c9a7", "#1e90ff", "#ff6b6b", "#e0f0ff"][Math.floor(Math.random() * 4)],
      opacity: Math.random() * 0.2 + 0.1,
    }));

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw light rays from top
      rays.forEach(ray => {
        ray.phase += 0.005;
        const sway = Math.sin(ray.phase) * 30;
        const grad = ctx.createLinearGradient(ray.x + sway, 0, ray.x + sway, canvas.height);
        grad.addColorStop(0, `rgba(30, 144, 255, ${ray.opacity * (Math.sin(ray.phase * 0.5) * 0.5 + 0.5 + 0.5)})`);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(ray.x + sway - ray.width / 2, 0);
        ctx.lineTo(ray.x + sway + ray.width / 2, 0);
        ctx.lineTo(ray.x + sway + ray.width * 1.5, canvas.height);
        ctx.lineTo(ray.x + sway - ray.width * 1.5, canvas.height);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // Draw bubbles
      bubbles.forEach(b => {
        b.y -= b.speed;
        b.wobblePhase += b.wobbleSpeed;
        b.x = b.baseX + Math.sin(b.wobblePhase) * b.wobbleAmp;

        if (b.y < -20) {
          b.y = canvas.height + 20;
          b.baseX = Math.random() * canvas.width;
          b.x = b.baseX;
        }

        // Bubble body
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 201, 167, ${b.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Highlight
        ctx.beginPath();
        ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, b.size * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 240, 255, ${b.opacity * 0.8})`;
        ctx.fill();
      });

      // Draw fish
      fish.forEach(f => {
        f.x += f.speed;
        f.tailPhase += 0.1;

        if (f.x > canvas.width + 30) f.x = -30;
        if (f.x < -30) f.x = canvas.width + 30;

        ctx.save();
        ctx.translate(f.x, f.y);
        ctx.scale(f.speed > 0 ? 1 : -1, 1);
        ctx.globalAlpha = f.opacity;

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 0, f.size, f.size * 0.4, 0, 0, Math.PI * 2);
        ctx.fillStyle = f.color;
        ctx.fill();

        // Tail
        const tailWag = Math.sin(f.tailPhase) * 3;
        ctx.beginPath();
        ctx.moveTo(-f.size, 0);
        ctx.lineTo(-f.size * 1.6, -f.size * 0.4 + tailWag);
        ctx.lineTo(-f.size * 1.6, f.size * 0.4 + tailWag);
        ctx.closePath();
        ctx.fillStyle = f.color;
        ctx.fill();

        // Eye
        ctx.beginPath();
        ctx.arc(f.size * 0.4, -f.size * 0.1, f.size * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();

        ctx.restore();
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

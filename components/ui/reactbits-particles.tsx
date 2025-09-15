"use client";

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface ReactBitsParticlesProps {
  density?: number; // particles per 10,000 px^2
  connectDistance?: number; // line connect threshold in px (CSS pixels)
  speedMultiplier?: number; // base particle speed multiplier
  lineWidth?: number; // base line width in CSS pixels
  interactive?: boolean; // mouse repulsion effect
  className?: string;
}

export function ReactBitsParticles({
  density = 0.8,
  connectDistance = 160,
  speedMultiplier = 1.2,
  lineWidth = 1,
  interactive = true,
  className = ''
}: ReactBitsParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle device pixel ratio for crisp lines
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resizeCanvas = () => {
      const cssWidth = canvas.offsetWidth;
      const cssHeight = canvas.offsetHeight;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width: cssWidth, height: cssHeight };
    };

    let { width, height } = resizeCanvas();

    const handleResize = () => {
      const dims = resizeCanvas();
      width = dims.width; 
      height = dims.height;
      initializeParticles();
    };

    const isDark = resolvedTheme === 'dark';
    const particleColor = isDark ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)';
    const lineColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.35)';

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: Particle[] = [];
    let mouseX = -9999;
    let mouseY = -9999;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    const initializeParticles = () => {
      const area = (width * height) / 10000; // normalize to 10k px^2
      const count = Math.max(50, Math.floor(area * density));
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.5, 0.5) * speedMultiplier,
        vy: rand(-0.5, 0.5) * speedMultiplier,
        r: rand(1.1, 2.6),
      }));
    };

    const step = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Move and draw particles
      ctx.fillStyle = particleColor;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // simple mouse repulsion
        if (interactive && mouseX > 0 && mouseY > 0) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const d2 = dx * dx + dy * dy;
          if (d2 < 1600) { // 40px radius
            const f = 0.5 / Math.max(1, d2);
            p.vx += dx * f;
            p.vy += dy * f;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // bounce on edges
        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connections
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectDistance) {
            const alpha = 1 - dist / connectDistance;
            ctx.globalAlpha = alpha * 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationRef.current = requestAnimationFrame(step);
    };

    initializeParticles();
    animationRef.current = requestAnimationFrame(step);
    window.addEventListener('resize', handleResize);
    if (interactive) {
      window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });
      window.addEventListener('mouseleave', () => {
        mouseX = -9999; mouseY = -9999;
      });
    }

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [resolvedTheme, density, connectDistance, interactive, lineWidth, speedMultiplier]);

  return (
    <div className={`absolute inset-0 ${className}`} style={{ mixBlendMode: 'screen', pointerEvents: 'none' }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

export default ReactBitsParticles;



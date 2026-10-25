import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle setup
    const isMobile = width < 768;
    const particleCount = isMobile ? 40 : 85;
    const particles = [];

    // Mouse coordinates for subtle interactive drift
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const colors = ['#00f0ff', '#a78bfa', '#38bdf8', '#c084fc'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.6,
        baseSpeedX: (Math.random() - 0.5) * 0.4,
        baseSpeedY: (Math.random() - 0.5) * 0.4,
        speedX: 0,
        speedY: 0,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let lastTime = performance.now();

    const render = (time) => {
      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle cosmic ambient nebula spots
      const gradient = ctx.createRadialGradient(
        width * 0.8,
        height * 0.2,
        50,
        width * 0.8,
        height * 0.2,
        width * 0.6
      );
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.035)');
      gradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.02)');
      gradient.addColorStop(1, 'rgba(5, 7, 13, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const gradient2 = ctx.createRadialGradient(
        width * 0.15,
        height * 0.8,
        40,
        width * 0.15,
        height * 0.8,
        width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(167, 139, 250, 0.03)');
      gradient2.addColorStop(1, 'rgba(5, 7, 13, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);

      // Render connected constellations when particles are close
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Motion update if not reduced motion
        if (!mediaQuery.matches) {
          p1.x += p1.baseSpeedX + (mouse.x - width / 2) * 0.0003;
          p1.y += p1.baseSpeedY + (mouse.y - height / 2) * 0.0003;

          // Wrap edges
          if (p1.x < -10) p1.x = width + 10;
          if (p1.x > width + 10) p1.x = -10;
          if (p1.y < -10) p1.y = height + 10;
          if (p1.y > height + 10) p1.y = -10;

          // Alpha pulsing
          p1.alpha += Math.sin(time * p1.pulseSpeed) * 0.005;
          p1.alpha = Math.max(0.15, Math.min(0.85, p1.alpha));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.globalAlpha = p1.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p1.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isMobile ? 80 : 110;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = (1 - dist / maxDist) * 0.12;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      if (!mediaQuery.matches) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
      aria-hidden="true"
    />
  );
}

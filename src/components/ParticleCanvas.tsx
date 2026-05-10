import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    interface Particle {
      x: number;
      y: number;
      r: number;
      baseOpacity: number;
      speed: number;
      drift: number;
      phase: number;
      isGold: boolean;
      twinkleSpeed: number;
    }
    const particles: Particle[] = [];
    const numParticles = Math.floor(Math.random() * 20) + 40; // 40-60 particles
    
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.2 + 0.05,
        drift: (Math.random() - 0.5) * 0.1,
        phase: Math.random() * Math.PI * 2,
        isGold: Math.random() > 0.8, // 20% chance of gold
        twinkleSpeed: Math.random() * 0.05 + 0.01
      });
    }

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      for (const p of particles) {
        p.y -= p.speed;
        p.x += p.drift;
        p.phase += p.twinkleSpeed;
        
        if (p.y < -10) p.y = h + 10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const opacity = Math.max(0, p.baseOpacity * Math.sin(p.phase));
        
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2);
        
        if (p.isGold) {
          grad.addColorStop(0, `rgba(255, 179, 0, ${opacity})`);
          grad.addColorStop(1, 'rgba(255, 179, 0, 0)');
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animId = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    />
  );
}

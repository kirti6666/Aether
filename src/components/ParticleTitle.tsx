import { useEffect, useRef } from 'react';

export default function ParticleTitle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let w = canvas.offsetWidth;
    const h = 230;
    canvas.width = w;
    canvas.height = h;

    interface Particle {
      tx: number;
      ty: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      opacity: number;
      phase: number;
    }
    let particles: Particle[] = [];
    const REPEL_RADIUS = 90;
    const REPEL_STRENGTH = 7;
    const SPRING = 0.055;
    const FRICTION = 0.82;
    
    let mx = -9999;
    let my = -9999;

    const initParticles = async () => {
      await document.fonts.load("italic 80px 'Instrument Serif'");
      
      const offCanvas = document.createElement('canvas');
      offCanvas.width = w;
      offCanvas.height = h;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true })!;
      
      const fontSize = Math.min(w * 0.086, 90);
      offCtx.font = `italic ${fontSize}px 'Instrument Serif'`;
      offCtx.fillStyle = 'white';
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      
      const leading = fontSize * 1.08;
      offCtx.fillText("The Wardrobe Your Style", w / 2, h / 2 - leading * 0.5);
      offCtx.fillText("Demands", w / 2, h / 2 + leading * 0.5);

      const imgData = offCtx.getImageData(0, 0, w, h).data;
      particles = [];
      
      for (let y = 0; y < h; y += 3) {
        for (let x = 0; x < w; x += 3) {
          const alpha = imgData[(y * w + x) * 4 + 3];
          if (alpha > 100) {
            particles.push({
              tx: x,
              ty: y,
              x: Math.random() * w,
              y: Math.random() > 0.5 ? -50 : h + 50,
              vx: 0,
              vy: 0,
              r: Math.random() * 0.85 + 0.45,
              opacity: 0,
              phase: Math.random() * Math.PI * 2
            });
          }
        }
      }
    };

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < REPEL_RADIUS) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * REPEL_STRENGTH;
          p.vy -= Math.sin(angle) * force * REPEL_STRENGTH;
        }

        p.vx += (p.tx - p.x) * SPRING;
        p.vy += (p.ty - p.y) * SPRING;
        
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        
        p.x += p.vx;
        p.y += p.vy;

        const isSettled = Math.abs(p.tx - p.x) < 2 && Math.abs(p.ty - p.y) < 2;
        if (isSettled) {
          p.phase += 0.02;
          p.x += Math.sin(p.phase) * 0.2;
          p.y += Math.cos(p.phase) * 0.2;
        }

        if (p.opacity < 1) {
          p.opacity = Math.min(1, p.opacity + 0.022);
        }

        let nearFactor = 0;
        if (dist < REPEL_RADIUS * 1.5) {
          nearFactor = 1 - (dist / (REPEL_RADIUS * 1.5));
        }

        if (nearFactor > 0) {
          ctx.beginPath();
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          grad.addColorStop(0, `rgba(255,255,255,${p.opacity * nearFactor * 0.8})`);
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animId = requestAnimationFrame(draw);
    };

    initParticles().then(() => {
      draw();
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mx = -9999;
      my = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      canvas.width = w;
      initParticles();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '230px',
        cursor: 'none',
        background: 'transparent',
        display: 'block'
      }}
    />
  );
}

import React, { useCallback, useEffect, useRef, useState } from 'react';

interface SplashParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  alpha: number;
}

interface SplashCursorProps {
  splatRadius?: number;
  splatForce?: number;
  particleCount?: number;
  colorUpdateSpeed?: number;
  dissipationRate?: number;
}

const SplashCursor: React.FC<SplashCursorProps> = ({
  splatRadius = 60,
  splatForce = 0.5,
  particleCount = 15,
  colorUpdateSpeed = 0.02,
  dissipationRate = 0.95
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<SplashParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const timeRef = useRef(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const mouseTimeoutRef = useRef<NodeJS.Timeout>();

  // Generate rainbow colors
  const getRainbowColor = useCallback((time: number, offset: number = 0): string => {
    const hue = ((time * 50 + offset * 60) % 360);
    return `hsl(${hue}, 70%, 60%)`;
  }, []);

  // Create splash particles
  const createSplash = useCallback((x: number, y: number, velocity: number) => {
    const currentTime = timeRef.current;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const speed = (Math.random() * 0.5 + 0.5) * velocity * splatForce;
      const size = Math.random() * splatRadius * 0.3 + splatRadius * 0.2;
      
      const particle: SplashParticle = {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        life: 1.0,
        maxLife: Math.random() * 60 + 40,
        color: getRainbowColor(currentTime, i),
        alpha: 1.0
      };
      
      particlesRef.current.push(particle);
    }
    
    // Limit total particles for performance
    if (particlesRef.current.length > 300) {
      particlesRef.current = particlesRef.current.slice(-300);
    }
  }, [particleCount, splatRadius, splatForce, getRainbowColor]);

  // Update particles
  const updateParticles = useCallback(() => {
    const particles = particlesRef.current;
    
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Apply physics
      particle.vx *= dissipationRate;
      particle.vy *= dissipationRate;
      particle.vy += 0.1; // gravity
      
      // Update life
      particle.life -= 1 / particle.maxLife;
      particle.alpha = Math.max(0, particle.life);
      particle.size *= 0.99;
      
      // Remove dead particles
      if (particle.life <= 0 || particle.size < 1) {
        particles.splice(i, 1);
      }
    }
  }, [dissipationRate]);

  // Render particles
  const renderParticles = useCallback(() => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set blend mode for glowing effect
    ctx.globalCompositeOperation = 'screen';
    
    particlesRef.current.forEach((particle) => {
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      
      // Create glowing effect with rainbow colors
      gradient.addColorStop(0, `${particle.color.replace(')', `, ${particle.alpha})`).replace('hsl', 'hsla')}`);
      gradient.addColorStop(0.7, `${particle.color.replace(')', `, ${particle.alpha * 0.5})`).replace('hsl', 'hsla')}`);
      gradient.addColorStop(1, `${particle.color.replace(')', `, 0)`).replace('hsl', 'hsla')}`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Reset blend mode
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    timeRef.current += colorUpdateSpeed;
    updateParticles();
    renderParticles();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticles, renderParticles, colorUpdateSpeed]);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate velocity for splash intensity
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    
    mouseRef.current.prevX = mouseRef.current.x;
    mouseRef.current.prevY = mouseRef.current.y;
    mouseRef.current.x = x;
    mouseRef.current.y = y;
    
    // Create splash if mouse is moving fast enough
    if (velocity > 1) {
      createSplash(x, y, Math.min(velocity * 0.1, 5));
      setIsMouseMoving(true);
      
      // Reset mouse timeout
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
      mouseTimeoutRef.current = setTimeout(() => {
        setIsMouseMoving(false);
      }, 100);
    }
  }, [createSplash]);

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  // Initialize canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    ctxRef.current = ctx;
    handleResize();
    
    // Start animation
    animate();
    
    // Event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, [animate, handleMouseMove, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'normal',
        opacity: isMouseMoving ? 1.0 : 0.7
      }}
    />
  );
};

export default SplashCursor;
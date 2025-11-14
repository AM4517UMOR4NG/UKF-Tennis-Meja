import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { useThrottle } from '../../hooks/useThrottle';

const PARTICLE_POOL_SIZE = 100;
const MAX_PARTICLES = 50;

class ParticlePool {
  constructor(size) {
    this.particles = [];
    this.activeParticles = [];
    this.inactiveParticles = [];
    
    // Pre-allocate particles
    for (let i = 0; i < size; i++) {
      const particle = {
        id: i,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        life: 0,
        maxLife: 1,
        size: 2,
        color: '#60A5FA',
        active: false
      };
      this.particles.push(particle);
      this.inactiveParticles.push(particle);
    }
  }
  
  getParticle() {
    if (this.inactiveParticles.length === 0) return null;
    const particle = this.inactiveParticles.pop();
    this.activeParticles.push(particle);
    particle.active = true;
    return particle;
  }
  
  releaseParticle(particle) {
    const index = this.activeParticles.indexOf(particle);
    if (index > -1) {
      this.activeParticles.splice(index, 1);
      this.inactiveParticles.push(particle);
      particle.active = false;
    }
  }
  
  update(deltaTime) {
    for (let i = this.activeParticles.length - 1; i >= 0; i--) {
      const particle = this.activeParticles[i];
      
      // Update position
      particle.x += particle.vx * deltaTime;
      particle.y += particle.vy * deltaTime;
      
      // Update velocity (gravity and friction)
      particle.vy += 0.3 * deltaTime;
      particle.vx *= 0.98;
      particle.vy *= 0.98;
      
      // Update life
      particle.life -= deltaTime * 0.02;
      
      // Remove dead particles
      if (particle.life <= 0) {
        this.releaseParticle(particle);
      }
    }
  }
}

export default function OptimizedParticleSystem({ isActive = true }) {
  const canvasRef = useRef(null);
  const particlePoolRef = useRef(new ParticlePool(PARTICLE_POOL_SIZE));
  const animationRef = useRef(null);
  const lastTimeRef = useRef(performance.now());
  
  const colors = useMemo(() => [
    '#60A5FA', '#3B82F6', '#2563EB', '#FFFFFF', '#E5E7EB'
  ], []);
  
  const createParticle = useCallback((x, y, isExplosion = false) => {
    if (!isActive) return;
    
    const pool = particlePoolRef.current;
    const particle = pool.getParticle();
    
    if (!particle) return;
    
    particle.x = x;
    particle.y = y;
    particle.vx = (Math.random() - 0.5) * (isExplosion ? 15 : 2);
    particle.vy = (Math.random() - 0.5) * (isExplosion ? 15 : 2) - (isExplosion ? 5 : 0);
    particle.life = isExplosion ? 1.5 : 1.0;
    particle.maxLife = particle.life;
    particle.size = Math.random() * (isExplosion ? 15 : 6) + (isExplosion ? 5 : 2);
    particle.color = colors[Math.floor(Math.random() * colors.length)];
  }, [isActive, colors]);
  
  const throttledCreateParticle = useThrottle(createParticle, 16); // ~60fps
  
  const handleMouseMove = useCallback((e) => {
    if (!isActive) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    throttledCreateParticle(x, y, false);
  }, [isActive, throttledCreateParticle]);
  
  const handleClick = useCallback((e) => {
    if (!isActive) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create explosion
    for (let i = 0; i < 20; i++) {
      createParticle(x, y, true);
    }
  }, [isActive, createParticle]);
  
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const now = performance.now();
    const deltaTime = (now - lastTimeRef.current) / 16; // Normalize to 60fps
    lastTimeRef.current = now;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update particles
    const pool = particlePoolRef.current;
    pool.update(deltaTime);
    
    // Render particles
    pool.activeParticles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = particle.size * 2;
      ctx.shadowColor = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    if (isActive) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('click', handleClick);
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, handleMouseMove, handleClick, animate]);
  
  if (!isActive) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}

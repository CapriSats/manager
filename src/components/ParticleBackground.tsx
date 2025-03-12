
import React, { useEffect, useRef } from 'react';

// Particle colors
const COLORS = ['#10b981', '#22c55e', '#059669', '#16a34a'];
const WHITE = '#FFFFFF';
const BACKGROUND = 'rgba(245, 247, 250, 0.2)';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  hasPulse: boolean;
  isDataNode: boolean;
}

interface DataPacket {
  startNode: Particle;
  endNode: Particle;
  position: number; // 0 to 1 representing progress along the line
  speed: number;
  active: boolean;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Initialize particles
    const particleCount = Math.min(150, Math.floor(window.innerWidth / 10));
    const particles: Particle[] = [];
    const dataPackets: DataPacket[] = [];
    const connectionDistance = Math.min(150, window.innerWidth / 8);

    for (let i = 0; i < particleCount; i++) {
      const radius = Math.random() * 2 + 1; // 1-3px radius
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: (Math.random() - 0.5) * 0.5, // Random velocity
        vy: (Math.random() - 0.5) * 0.5,
        hasPulse: Math.random() < 0.2, // 20% of particles have pulse
        isDataNode: Math.random() < 0.1, // 10% are data nodes
      });
    }

    // Create data packets
    const createDataPacket = () => {
      if (particles.length < 2) return;
      
      // Select two random particles that are close enough
      let attempts = 0;
      let success = false;
      
      while (attempts < 10 && !success) {
        const startIndex = Math.floor(Math.random() * particles.length);
        const endIndex = Math.floor(Math.random() * particles.length);
        
        if (startIndex !== endIndex) {
          const startNode = particles[startIndex];
          const endNode = particles[endIndex];
          
          const distance = Math.hypot(endNode.x - startNode.x, endNode.y - startNode.y);
          
          if (distance < connectionDistance) {
            dataPackets.push({
              startNode,
              endNode,
              position: 0,
              speed: Math.random() * 0.01 + 0.005,
              active: true
            });
            success = true;
          }
        }
        
        attempts++;
      }
      
      // Remove old packets if we have too many
      if (dataPackets.length > 20) {
        dataPackets.shift();
      }
    };

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = BACKGROUND;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (so they appear behind particles)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const particle1 = particles[i];
          const particle2 = particles[j];
          
          const dx = particle2.x - particle1.x;
          const dy = particle2.y - particle1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Calculate opacity based on distance
            const opacity = 0.3 * (1 - distance / connectionDistance);
            
            // Create gradient
            const gradient = ctx.createLinearGradient(
              particle1.x, particle1.y, particle2.x, particle2.y
            );
            gradient.addColorStop(0, particle1.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, particle2.color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
            
            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        }
      }
      
      // Draw particles
      for (const particle of particles) {
        // Draw main particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + 'B3'; // ~70% opacity
        ctx.fill();
        
        // Draw pulse effect for some particles
        if (particle.hasPulse) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius + 2, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + '1A'; // ~10% opacity
          ctx.fill();
        }
        
        // Draw special data node effect
        if (particle.isDataNode) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = WHITE + 'CC'; // ~80% opacity
          ctx.fill();
        }
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
          particle.vx = -particle.vx;
        }
        
        if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
          particle.vy = -particle.vy;
        }
      }
      
      // Draw and update data packets
      for (let i = 0; i < dataPackets.length; i++) {
        const packet = dataPackets[i];
        
        if (packet.active) {
          // Calculate current position
          const startX = packet.startNode.x;
          const startY = packet.startNode.y;
          const endX = packet.endNode.x;
          const endY = packet.endNode.y;
          
          const currentX = startX + (endX - startX) * packet.position;
          const currentY = startY + (endY - startY) * packet.position;
          
          // Draw packet
          ctx.beginPath();
          ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
          ctx.fillStyle = WHITE;
          ctx.fill();
          
          // Update position
          packet.position += packet.speed;
          
          // Remove if it reached the end
          if (packet.position >= 1) {
            packet.active = false;
          }
        }
      }
      
      // Randomly create new data packets
      if (Math.random() < 0.02) { // 2% chance each frame
        createDataPacket();
      }
      
      // Clean up inactive data packets
      while (dataPackets.length > 0 && !dataPackets[0].active) {
        dataPackets.shift();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full opacity-80"
      style={{ backgroundColor: 'transparent' }} 
    />
  );
};

export default ParticleBackground;

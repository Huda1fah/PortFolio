import React, { useEffect, useRef } from 'react';

export default function QuantumVisualization() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Quantum-inspired mathematical elements
    const waveFunction = [];
    const quantumStates = [];
    const entangledPairs = [];
    const probabilityWaves = [];
    
    let time = 0;
    
    // Initialize wave function visualization
    for (let i = 0; i < 200; i++) {
      waveFunction.push({
        x: (canvas.width / 200) * i,
        baseY: canvas.height / 2,
        amplitude: Math.random() * 40 + 20,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
    
    // Quantum state particles
    for (let i = 0; i < 50; i++) {
      quantumStates.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 3 + 1,
        spin: Math.random() * 0.05 + 0.01,
        spinAngle: 0,
        probability: Math.random(),
        coherenceTime: Math.random() * 1000 + 500,
        age: 0,
        isEntangled: Math.random() < 0.3
      });
    }
    
    // Create entangled pairs
    for (let i = 0; i < quantumStates.length; i++) {
      if (quantumStates[i].isEntangled && Math.random() < 0.5) {
        const partner = quantumStates.find((state, index) => 
          index !== i && state.isEntangled && !state.partner
        );
        if (partner) {
          quantumStates[i].partner = partner;
          partner.partner = quantumStates[i];
          entangledPairs.push([quantumStates[i], partner]);
        }
      }
    }
    
    // Probability density waves
    for (let i = 0; i < 15; i++) {
      probabilityWaves.push({
        centerX: Math.random() * canvas.width,
        centerY: Math.random() * canvas.height,
        radius: 0,
        maxRadius: Math.random() * 150 + 100,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.15 + 0.05,
        frequency: Math.random() * 8 + 4,
        phase: Math.random() * Math.PI * 2,
        lifetime: Math.random() * 2000 + 1000,
        age: 0
      });
    }
    
    // Schrödinger equation visualization
    const drawWaveFunction = () => {
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 1.5;
      
      // Real part of wave function
      ctx.beginPath();
      for (let i = 0; i < waveFunction.length - 1; i++) {
        const point = waveFunction[i];
        const realPart = point.amplitude * Math.sin(point.frequency * time + point.phase);
        const y = point.baseY + realPart;
        
        if (i === 0) {
          ctx.moveTo(point.x, y);
        } else {
          ctx.lineTo(point.x, y);
        }
      }
      ctx.stroke();
      
      // Imaginary part (slightly offset)
      ctx.strokeStyle = '#8b5cf6';
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      for (let i = 0; i < waveFunction.length - 1; i++) {
        const point = waveFunction[i];
        const imagPart = point.amplitude * Math.cos(point.frequency * time + point.phase + Math.PI/4);
        const y = point.baseY + imagPart + 50;
        
        if (i === 0) {
          ctx.moveTo(point.x, y);
        } else {
          ctx.lineTo(point.x, y);
        }
      }
      ctx.stroke();
      
      // Probability density |ψ|²
      ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let i = 0; i < waveFunction.length; i++) {
        const point = waveFunction[i];
        const realPart = point.amplitude * Math.sin(point.frequency * time + point.phase);
        const imagPart = point.amplitude * Math.cos(point.frequency * time + point.phase + Math.PI/4);
        const probability = (realPart * realPart + imagPart * imagPart) / (point.amplitude * point.amplitude);
        const y = point.baseY - probability * 30;
        ctx.lineTo(point.x, y);
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.closePath();
      ctx.fill();
    };
    
    // Draw quantum states with spin visualization
    const drawQuantumStates = () => {
      quantumStates.forEach(state => {
        state.x += state.vx;
        state.y += state.vy;
        state.spinAngle += state.spin;
        state.age += 16; // Approximate frame time
        
        // Boundary conditions (periodic)
        if (state.x < 0) state.x = canvas.width;
        if (state.x > canvas.width) state.x = 0;
        if (state.y < 0) state.y = canvas.height;
        if (state.y > canvas.height) state.y = 0;
        
        // Quantum decoherence effect
        const coherence = Math.max(0, 1 - (state.age / state.coherenceTime));
        const alpha = state.probability * coherence * 0.8;
        
        // Draw quantum state with spin visualization
        ctx.save();
        ctx.translate(state.x, state.y);
        ctx.rotate(state.spinAngle);
        
        // Probability cloud
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, state.radius * 3);
        gradient.addColorStop(0, `hsla(${220 + Math.sin(time * 0.01) * 30}, 70%, 60%, ${alpha * 0.3})`);
        gradient.addColorStop(1, `hsla(${220 + Math.sin(time * 0.01) * 30}, 70%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, state.radius * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Quantum state core
        ctx.fillStyle = `hsla(${240 + Math.sin(state.spinAngle) * 40}, 80%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(0, 0, state.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Spin arrow
        ctx.strokeStyle = `hsla(${240 + Math.sin(state.spinAngle) * 40}, 80%, 70%, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(state.radius * 1.5, 0);
        ctx.stroke();
        
        // Uncertainty principle visualization
        if (Math.random() < 0.05) {
          ctx.strokeStyle = `hsla(${260}, 60%, 60%, ${alpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, state.radius * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.restore();
        
        // Reset state if decoherence is complete
        if (coherence <= 0) {
          state.age = 0;
          state.x = Math.random() * canvas.width;
          state.y = Math.random() * canvas.height;
          state.probability = Math.random();
        }
      });
    };
    
    // Draw quantum entanglement connections
    const drawEntanglement = () => {
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
      ctx.lineWidth = 1;
      
      entangledPairs.forEach(pair => {
        const [state1, state2] = pair;
        const dx = state2.x - state1.x;
        const dy = state2.y - state1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          // Quantum correlation strength decreases with distance
          const correlation = Math.max(0, 1 - distance / 200);
          ctx.globalAlpha = correlation * 0.4;
          
          // Draw entanglement line with quantum interference pattern
          ctx.beginPath();
          ctx.moveTo(state1.x, state1.y);
          
          const steps = 20;
          for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const x = state1.x + dx * t;
            const y = state1.y + dy * t;
            
            // Add quantum interference
            const interference = Math.sin(t * Math.PI * 4 + time * 0.05) * 5 * correlation;
            const perpX = -dy / distance * interference;
            const perpY = dx / distance * interference;
            
            ctx.lineTo(x + perpX, y + perpY);
          }
          ctx.stroke();
          
          // Draw correlation indicators
          if (correlation > 0.7) {
            ctx.fillStyle = `rgba(139, 92, 246, ${correlation * 0.3})`;
            ctx.beginPath();
            ctx.arc((state1.x + state2.x) / 2, (state1.y + state2.y) / 2, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });
    };
    
    // Draw probability waves (Born rule visualization)
    const drawProbabilityWaves = () => {
      probabilityWaves.forEach(wave => {
        wave.radius += wave.speed;
        wave.age += 16;
        
        if (wave.radius > wave.maxRadius || wave.age > wave.lifetime) {
          wave.radius = 0;
          wave.age = 0;
          wave.centerX = Math.random() * canvas.width;
          wave.centerY = Math.random() * canvas.height;
        }
        
        const progress = wave.radius / wave.maxRadius;
        const alpha = wave.opacity * (1 - progress) * Math.sin(progress * Math.PI);
        
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = `hsl(${200 + Math.sin(wave.phase + time * 0.01) * 60}, 60%, 65%)`;
        ctx.lineWidth = 1;
        
        // Draw probability wave with mathematical modulation
        ctx.beginPath();
        const segments = 64;
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2;
          const modulation = 1 + 0.3 * Math.sin(angle * wave.frequency + wave.phase + time * 0.02);
          const r = wave.radius * modulation;
          const x = wave.centerX + Math.cos(angle) * r;
          const y = wave.centerY + Math.sin(angle) * r;
          
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });
    };
    
    // Mathematical equations overlay
    const drawQuantumEquations = () => {
      ctx.font = '14px "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace';
      ctx.fillStyle = 'rgba(59, 130, 246, 0.15)';
      
      // Schrödinger equation
      ctx.fillText('iℏ ∂|ψ⟩/∂t = Ĥ|ψ⟩', 20, 30);
      
      // Uncertainty principle
      ctx.fillText('Δx·Δp ≥ ℏ/2', canvas.width - 120, 30);
      
      // Born rule
      ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.fillText('P = |⟨φ|ψ⟩|²', 20, canvas.height - 20);
      
      // Entanglement
      ctx.fillText('|Ψ⟩ = α|00⟩ + β|11⟩', canvas.width - 150, canvas.height - 20);
    };
    
    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 1;
      
      drawWaveFunction();
      drawProbabilityWaves();
      drawQuantumStates();
      drawEntanglement();
      drawQuantumEquations();
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
    />
  );
}
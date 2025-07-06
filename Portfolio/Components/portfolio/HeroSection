import React, { useEffect, useRef, useState } from 'react';
import QuantumVisualization from './QuantumVisualization';

export default function HeroSection() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Entry animation
    const timer = setTimeout(() => setHasAnimated(true), 100);

    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      
      if (scrollY < heroHeight) {
        const progress = scrollY / heroHeight;
        
        if (titleRef.current) {
          titleRef.current.style.transform = `scale(${1 - progress * 0.1}) translateY(${-scrollY * 0.4}px)`;
          titleRef.current.style.opacity = `${Math.max(0, 1 - progress * 1.5)}`;
        }
        if (subtitleRef.current) {
          subtitleRef.current.style.transform = `translateY(${-scrollY * 0.25}px)`;
          subtitleRef.current.style.opacity = `${Math.max(0, 1 - progress * 1.5)}`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="quantum-bg absolute inset-0 z-0">
        <QuantumVisualization />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 
          ref={titleRef}
          className={`text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-gray-900 mb-6 transition-all duration-1000 ease-out ${hasAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ transitionDelay: '300ms' }}
        >
          Syed Hudaifah
        </h1>
        <p 
          ref={subtitleRef}
          className={`text-xl md:text-2xl lg:text-3xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '500ms' }}
        >
          Quantum Computing Engineer
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-bounce" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
}
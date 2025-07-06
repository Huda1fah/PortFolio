import React, { useEffect, useRef } from 'react';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ContactSection from '../components/portfolio/ContactSection';

export default function Portfolio() {
  const containerRef = useRef(null);

  useEffect(() => {
    const sections = [
      { selector: '.hero-section', color: '#ffffff' },
      { selector: '.about-section', color: '#fafbff' },
      { selector: '.projects-section', color: '#f8faff' },
      { selector: '.skills-section', color: '#f5f8ff' },
      { selector: '.contact-section', color: '#ffffff' },
    ];

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4, // 40% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const newColor = sections.find(s => entry.target.matches(s.selector))?.color;
          if (newColor) {
            document.body.style.backgroundColor = newColor;
          }
        }
      });
    }, options);

    const sectionElements = containerRef.current.querySelectorAll('.hero-section, .about-section, .projects-section, .skills-section, .contact-section');
    sectionElements.forEach(sec => observer.observe(sec));

    return () => {
      sectionElements.forEach(sec => observer.unobserve(sec));
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </div>
  );
}
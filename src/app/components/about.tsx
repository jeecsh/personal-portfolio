'use client';

import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState([
    { label: 'Projects Completed', value: 50, count: 0 },
    { label: 'Years Experience', value: 5, count: 0 },
    { label: 'Technologies Used', value: 25, count: 0 },
    { label: 'Systems Scaled', value: 12, count: 0 },
  ]);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Vertical lines background animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vertical lines configuration
    const lines = [];
    const numLines = 8;
    const lineSpacing = canvas.width / (numLines + 1);
    
    for (let i = 0; i < numLines; i++) {
      lines.push({
        x: lineSpacing * (i + 1),
        speed: 0.5 + Math.random() * 0.5,
        opacity: 0.05 + Math.random() * 0.05,
        offset: Math.random() * canvas.height
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw vertical lines with downward motion
      lines.forEach(line => {
        line.offset += line.speed;
        if (line.offset > canvas.height) {
          line.offset = 0;
        }
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x, line.offset);
        ctx.lineTo(line.x, line.offset + canvas.height * 0.3);
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Fixed number counting effect
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // Animation duration in ms
    const startTime = Date.now();

    const animateCount = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          count: Math.floor(progress * stat.value)
        }))
      );

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    animateCount();
  }, [isVisible]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      {/* Vertical Lines Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        {/* Header */}
        <div 
          className={`text-center mb-32 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2
            className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tight"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            ABOUT
          </h2>
          
          <div className="h-px w-24 bg-white mx-auto mb-6 opacity-30 transform scale-x-0 animate-[scaleX_1s_ease-out_0.5s_forwards]" />
          
          <p
            className="text-sm md:text-base text-gray-400 tracking-widest uppercase"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 300,
              letterSpacing: '0.3em',
            }}
          >
            Full Stack Engineer & AI Specialist
          </p>
        </div>

        {/* Main Content */}
        <div 
          className={`transition-all duration-1000 delay-300 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
            {/* Bio Section */}
            <div className="transform transition-all duration-700 delay-500 hover:translate-x-2">
              <h3
                className="text-2xl md:text-3xl font-light mb-8 text-white"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.05em',
                }}
              >
                THE ENGINEER
              </h3>
              
              <div className="space-y-6">
                <p
                  className="text-base md:text-lg text-gray-300 leading-relaxed transition-colors duration-500 hover:text-white"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  I architect systems that bridge the gap between cutting-edge AI and production-ready applications. My approach combines rigorous engineering with creative problem-solving to deliver solutions that scale.
                </p>
                
                <p
                  className="text-base md:text-lg text-gray-300 leading-relaxed transition-colors duration-500 hover:text-white"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  From designing neural networks that understand natural language to building distributed systems that handle millions of requests, I thrive on pushing the boundaries of what's possible with technology.
                </p>
              </div>
            </div>

            {/* Stats Section */}
            <div className="transform transition-all duration-700 delay-700 hover:translate-x-2">
              <h3
                className="text-2xl md:text-3xl font-light mb-8 text-white"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.05em',
                }}
              >
                THE NUMBERS
              </h3>
              
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="border-b border-gray-800 pb-6 group cursor-pointer transform transition-all duration-500 hover:scale-105"
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <div
                      className="text-4xl md:text-5xl font-light text-white mb-2 transition-all duration-500 group-hover:text-gray-300"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        letterSpacing: '0.05em',
                      }}
                    >
                      {stat.count}+
                    </div>
                    <div
                      className="text-xs md:text-sm text-gray-400 uppercase tracking-widest transition-colors duration-500 group-hover:text-white"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        letterSpacing: '0.2em',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Divider */}
          <div 
            className={`flex justify-center mt-32 transition-all duration-1000 delay-900 transform ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
          >
            <div className="h-px w-64 bg-gradient-to-r from-transparent via-white to-transparent opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

const WelcomeToMyPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial mask animation
      gsap.fromTo(maskRef.current,
        { scaleY: 1 },
        {
          scaleY: 0,
          duration: 1.5,
          delay: 0.5,
          ease: 'power3.inOut',
          transformOrigin: 'top center'
        }
      );

      // Line animation
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          delay: 1,
          ease: 'power3.out'
        }
      );

      // Title animation - minimalist typewriter
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          text: "WELCOME TO MY PORTFOLIO",
          duration: 2,
          delay: 1.2,
          ease: 'power3.out',
          onUpdate: () => {
            if (titleRef.current) {
              titleRef.current.style.opacity = '1';
            }
          }
        });
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            filter: 'blur(5px)'
          },
          {
            opacity: 0.7,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            delay: 2.5,
            ease: 'power3.out'
          }
        );
      }

      // Grid animation
      if (gridRef.current) {
        const gridItems = gridRef.current.querySelectorAll('.grid-item');
        gsap.fromTo(gridItems,
          {
            opacity: 0,
            y: 30,
            scale: 0.9
          },
          {
            opacity: 0.3,
            y: 0,
            scale: 1,
            duration: 1.5,
            delay: 3,
            stagger: 0.1,
            ease: 'power3.out'
          }
        );
      }

      // Scroll indicator entrance animation
      if (scrollIndicatorRef.current) {
        gsap.fromTo(scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 3.5,
            ease: 'power3.out'
          }
        );

        // Subtle pulsing animation for scroll indicator
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0.3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut',
          delay: 4
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Intro mask */}
      <div 
        ref={maskRef}
        className="absolute inset-0 bg-black z-50 pointer-events-none"
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-start pt-5 h-full">
        {/* Text Content */}
        <div className="text-center mb-16">
          {/* Horizontal line */}
          <div 
            ref={lineRef}
            className="h-px w-0 bg-white mx-auto mb-8"
            style={{ maxWidth: '200px' }}
          />
          
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-light text-white tracking-tight opacity-0"
            style={{ 
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.1em',
            }}
          />
          
          <p 
            ref={subtitleRef}
            className="text-sm md:text-base text-gray-400 tracking-widest mt-4 uppercase"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 300,
              letterSpacing: '0.3em'
            }}
          >
            EXPLORE MY WORK AND CREATIONS
          </p>
        </div>

        {/* Decorative Grid */}
        <div 
          ref={gridRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Grid lines */}
          {[...Array(10)].map((_, i) => (
            <div 
              key={`h-${i}`} 
              className="grid-item absolute top-0 left-0 w-full h-px bg-white bg-opacity-10"
              style={{ top: `${(i + 1) * 10}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div 
              key={`v-${i}`} 
              className="grid-item absolute top-0 left-0 w-px h-full bg-white bg-opacity-10"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 opacity-0"
      >
        <div className="flex flex-col items-center space-y-2">
          <span 
            ref={scrollTextRef}
            className="text-xs tracking-widest transition-all duration-300"
            style={{ letterSpacing: '0.3em' }}
          >
            SCROLL
          </span>
          <div 
            ref={scrollLineRef}
            className="w-px bg-gray-500 transition-all duration-300"
            style={{ height: '32px' }}
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeToMyPortfolio;
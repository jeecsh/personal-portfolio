'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const modelContainerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const blackScreenRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const scrollTextRef = useRef<HTMLSpanElement>(null);
  const welcomeScreenRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLHeadingElement>(null);
  const welcomeButtonsRef = useRef<HTMLDivElement>(null);
  
  // Refs for Three.js
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    // Three.js initialization
    if (modelContainerRef.current) {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = null;
      sceneRef.current = scene;
      
      const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      );
      camera.position.z = 5;
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.8;
      modelContainerRef.current.appendChild(renderer.domElement);

      // Add controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      // Add subtle ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      // Add directional light with white color
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Add a geometric 3D model (icosahedron for modern look)
      const geometry = new THREE.IcosahedronGeometry(1.2, 2);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transmission: 0.2,
        ior: 1.5,
        emissive: 0x222222,
        emissiveIntensity: 0.2
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshRef.current = mesh;

      // Add wireframe version
      const wireMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      const wireMesh = new THREE.Mesh(geometry, wireMaterial);
      wireMesh.scale.set(1.05, 1.05, 1.05);
      scene.add(wireMesh);

      // Animation loop
      const clock = new THREE.Clock();
      const animate = () => {
        requestAnimationFrame(animate);
        
        const elapsedTime = clock.getElapsedTime();
        
        mesh.rotation.x = elapsedTime * 0.05;
        mesh.rotation.y = elapsedTime * 0.1;
        wireMesh.rotation.x = elapsedTime * 0.05;
        wireMesh.rotation.y = elapsedTime * 0.1;
        
        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        modelContainerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, []);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle wheel events for custom scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Get current scroll progress before updating
      let currentProgress = 0;
      setScrollProgress(prev => {
        currentProgress = prev;
        return prev;
      });

      const delta = e.deltaY;
      const scrollingUp = delta < 0;
      const scrollingDown = delta > 0;

      // Prevent default scroll and control animation in these cases:
      // 1. Scrolling down and progress < 1.4
      // 2. Scrolling up and progress > 0
      if ((scrollingDown && currentProgress < 1.4) || (scrollingUp && currentProgress > 0)) {
        e.preventDefault();
        setScrollProgress(prev => {
          const newProgress = Math.min(Math.max(prev + delta * 0.0001, 0), 1.4);
          updateAnimations(newProgress);
          return newProgress;
        });
      }
      // Natural scrolling takes over when:
      // 1. Scrolling down and progress >= 1.4
      // 2. Scrolling up and progress <= 0
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Function to handle button clicks
  const handleLetsTalk = () => {
    // Add contact functionality here
    window.location.href = 'mailto:mohamed@example.com'; // Replace with actual email
  };

  const handleContinueExploring = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to update animations based on scroll progress
  const updateAnimations = (progress: number) => {
    // Scroll indicator animation based on progress
    if (scrollIndicatorRef.current && scrollLineRef.current && scrollTextRef.current) {
      const indicatorOpacity = Math.max(0, 1 - progress * 2);
      const lineHeight = Math.min(32, progress * 80);
      
      gsap.to(scrollIndicatorRef.current, {
        opacity: indicatorOpacity,
        y: progress * 20,
        duration: 0.1
      });
      
      gsap.to(scrollLineRef.current, {
        height: lineHeight,
        duration: 0.1
      });
      
      gsap.to(scrollTextRef.current, {
        opacity: indicatorOpacity,
        letterSpacing: progress > 0.3 ? '0.5em' : '0.3em',
        duration: 0.1
      });
    }

    // First phase (0 to 0.5): Original animations
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: progress * -50,
        opacity: 1 - progress * 2,
        duration: 0.1
      });
    }

    if (subtitleRef.current) {
      gsap.to(subtitleRef.current, {
        y: progress * -30,
        opacity: 0.7 - progress * 2,
        duration: 0.1
      });
    }

    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        z: 5 - progress * 10,
        duration: 0.1
      });
    }

    if (meshRef.current) {
      gsap.to(meshRef.current.scale, {
        x: 1 + progress * 5,
        y: 1 + progress * 5,
        z: 1 + progress * 5,
        duration: 0.1
      });
    }

    if (heroRef.current) {
      gsap.to(heroRef.current, {
        backgroundColor: `rgba(30, 30, 30, ${progress})`,
        duration: 0.1
      });
    }

    // Second phase (0.5 to 0.75): Show name and role in center
    if (nextSectionRef.current) {
      if (progress > 0.5 && progress <= 0.75) {
        gsap.to(nextSectionRef.current, {
          opacity: 1,
          duration: 0.5
        });

        gsap.to(nameRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5
        });

        gsap.to(roleRef.current, {
          y: 0,
          opacity: 0.7,
          duration: 0.5
        });
      } else if (progress <= 0.5) {
        gsap.to(nextSectionRef.current, {
          opacity: 0,
          duration: 0.5
        });
      }
    }

    // Get responsive position values based on screen size
  const getResponsiveValues = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    return {
      name: {
        x: isMobile ? 0.25 : 0.35,
        y: isMobile ? 0.25 : 0.35
      },
      model: {
        x: isMobile ? 0.25 : 0.4,
        y: isMobile ? 0.25 : 0.4
      }
    };
  };

  // Third phase (0.75 to 1.1): Move elements to final positions and show about
  if (progress > 0.75 && progress <= 1.1) {
    const finalPhaseProgress = (progress - 0.75) / 0.35; // Normalize to 0-1
    const responsiveValues = getResponsiveValues();

    // Move name to top left
    if (nameRef.current) {
      gsap.to(nameRef.current, {
        x: -window.innerWidth * responsiveValues.name.x,
        y: -window.innerHeight * responsiveValues.name.y,
        scale: 0.4,
        duration: 0.8,
        ease: 'power1.inOut'
      });
    }

    // Move role to follow name (empty in final state)
    if (roleRef.current) {
      gsap.to(roleRef.current, {
        x: -window.innerWidth * responsiveValues.name.x,
        y: -window.innerHeight * (responsiveValues.name.y - 0.05),
        scale: 0.8,
        duration: 0.8,
        ease: 'power1.inOut',
        text: ''
      });
    }

    // Move 3D model to corner
    if (modelContainerRef.current) {
      gsap.to(modelContainerRef.current, {
        x: window.innerWidth * responsiveValues.model.x,
        y: window.innerHeight * responsiveValues.model.y,
        scale: 0.3,
        duration: 0.8,
        ease: 'power1.inOut'
      });
    }

      // Show about section in center
      if (aboutSectionRef.current) {
        gsap.to(aboutSectionRef.current, {
          opacity: Math.min(finalPhaseProgress * 1.2, 1),
          y: 0,
          duration: 0.8,
          ease: 'power1.inOut'
        });
      }

      // Animate about text with stagger
      if (aboutTextRef.current) {
        const paragraphs = aboutTextRef.current.querySelectorAll('p');
        gsap.to(paragraphs, {
          opacity: Math.min(finalPhaseProgress * 1.2, 1),
          y: 0,
          duration: 0.6,
          stagger: 0.3,
          ease: 'power1.inOut'
        });
      }
    }

    // Fourth phase (1.1 to 1.4): Dramatic closing with animated lines and welcome screen
    if (progress > 1.2) {
      const closingProgress = (progress - 1.1) / 0.3; // Normalize to 0-1
      
      if (blackScreenRef.current) {
        // Create dramatic closing effect with lines
        gsap.to(blackScreenRef.current, {
          opacity: closingProgress * 0.9,
          duration: 0.1,
          ease: 'power2.inOut'
        });
      }

      // Create closing lines effect
      const linesContainer = blackScreenRef.current?.querySelector('.closing-lines');
      if (linesContainer) {
        const lines = linesContainer.querySelectorAll('.closing-line');
        lines.forEach((line, index) => {
          gsap.to(line, {
            scaleX: closingProgress,
            opacity: closingProgress,
            duration: 0.2,
            delay: index * 0.1,
            ease: 'power2.inOut'
          });
        });
      }

      // Dramatic fade and distortion of all elements
      const elementsToClose = [nameRef.current, roleRef.current, modelContainerRef.current, aboutSectionRef.current];
      elementsToClose.forEach((element, index) => {
        if (element) {
          gsap.to(element, {
            opacity: Math.max(0, 1 - closingProgress * 1.5),
            scale: Math.max(0.8, 1 - closingProgress * 0.3),
            rotationZ: closingProgress * (index % 2 === 0 ? 2 : -2),
            filter: `blur(${closingProgress * 15}px) brightness(${1 - closingProgress * 0.7})`,
            duration: 0.1,
            ease: 'power2.inOut'
          });
        }
      });

      // Show welcome screen after dramatic fade
      if (closingProgress > 0.6 && welcomeScreenRef.current) {
        const welcomeProgress = Math.min((closingProgress - 0.6) / 0.4, 1);
        
        gsap.to(welcomeScreenRef.current, {
          opacity: welcomeProgress,
          duration: 0.3,
          ease: 'power2.out'
        });

        // Animate welcome text
        if (welcomeTextRef.current && welcomeProgress > 0.3) {
          gsap.to(welcomeTextRef.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.7)'
          });
        }

        // Animate buttons after text
        if (welcomeButtonsRef.current && welcomeProgress > 0.6) {
          const buttons = welcomeButtonsRef.current.querySelectorAll('button');
          gsap.to(buttons, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            delay: 0.3
          });
        }
      }

      // Final black screen at the end
      if (closingProgress > 0.8) {
        gsap.to(blackScreenRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.inOut'
        });
      }

    } else {
      // Reset black screen and welcome screen when scrolling back
      if (blackScreenRef.current) {
        gsap.to(blackScreenRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });

        // Reset closing lines
        const linesContainer = blackScreenRef.current?.querySelector('.closing-lines');
        if (linesContainer) {
          const lines = linesContainer.querySelectorAll('.closing-line');
          lines.forEach((line) => {
            gsap.to(line, {
              scaleX: 0,
              opacity: 0,
              duration: 0.2,
              ease: 'power2.out'
            });
          });
        }
      }

      // Reset welcome screen
      if (welcomeScreenRef.current) {
        gsap.to(welcomeScreenRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });

        // Reset welcome elements
        if (welcomeTextRef.current) {
          gsap.set(welcomeTextRef.current, {
            opacity: 0,
            y: 30,
            scale: 0.8
          });
        }

        if (welcomeButtonsRef.current) {
          const buttons = welcomeButtonsRef.current.querySelectorAll('button');
          gsap.set(buttons, {
            opacity: 0,
            y: 30,
            scale: 0.8
          });
        }
      }

      // Reset other elements when scrolling back from closing
      if (progress <= 1.1) {
        const elementsToReset = [nameRef.current, roleRef.current, modelContainerRef.current, aboutSectionRef.current];
        elementsToReset.forEach(element => {
          if (element) {
            gsap.to(element, {
              filter: 'blur(0px) brightness(1)',
              rotationZ: 0,
              duration: 0.3
            });
          }
        });
      }
    }

    // Reset positions when scrolling back (existing logic)
    if (progress <= 0.75) {
      const elementsToReset = [nameRef.current, roleRef.current, modelContainerRef.current];
      elementsToReset.forEach(element => {
        if (element) {
          gsap.to(element, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.3
          });
        }
      });

      if (roleRef.current) {
        gsap.to(roleRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.3
        });
      }

      if (modelContainerRef.current) {
        gsap.to(modelContainerRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.3
        });
      }

      if (aboutSectionRef.current) {
        gsap.to(aboutSectionRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.3
        });
      }
    }
  };

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
          text: "Glitched into existence.",
          duration: 3,
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

      // Model container animation
      if (modelContainerRef.current) {
        gsap.fromTo(modelContainerRef.current,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 2,
            delay: 1.8,
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

      // Initialize about section (hidden)
      if (aboutSectionRef.current) {
        gsap.set(aboutSectionRef.current, {
          opacity: 0,
          y: 20
        });
      }

      // Initialize about text paragraphs
      if (aboutTextRef.current) {
        const paragraphs = aboutTextRef.current.querySelectorAll('p');
        gsap.set(paragraphs, {
          opacity: 0,
          y: 20
        });
      }

      // Initialize black screen
      if (blackScreenRef.current) {
        gsap.set(blackScreenRef.current, {
          opacity: 0,
          scale: 1
        });
      }

      // Initialize welcome screen elements
      if (welcomeScreenRef.current) {
        gsap.set(welcomeScreenRef.current, {
          opacity: 0
        });
      }

      if (welcomeTextRef.current) {
        gsap.set(welcomeTextRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.8
        });
      }

      if (welcomeButtonsRef.current) {
        const buttons = welcomeButtonsRef.current.querySelectorAll('button');
        gsap.set(buttons, {
          opacity: 0,
          y: 30,
          scale: 0.8
        });
      }

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Intro mask */}
      <div 
        ref={maskRef}
        className="absolute inset-0 bg-black z-50 pointer-events-none"
      />

      {/* Dramatic Black Screen Ending with Closing Lines */}
      <div 
        ref={blackScreenRef}
        className="absolute inset-0 bg-black z-40 pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle at center, #000000 0%, #111111 100%)',
        }}
      >
        {/* Animated Closing Lines */}
        <div className="closing-lines absolute inset-0">
          {/* Central expanding circle */}
          <div className="closing-line absolute top-1/2 left-1/2 w-2 h-2 border rounded-full opacity-0" style={{ transform: 'translate(-50%, -50%) scale(0)' }} />
        </div>
      </div>

      {/* Welcome Screen */}
      <div 
        ref={welcomeScreenRef}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black opacity-0"
      >
        <h1 
          ref={welcomeTextRef}
          className="text-4xl md:text-6xl font-light text-white tracking-tight mb-12 text-center opacity-0"
          style={{ 
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '0.1em',
          }}
        >
          WELCOME TO MY PORTFOLIO
        </h1>
        
        <div 
          ref={welcomeButtonsRef}
          className="flex flex-col md:flex-row gap-6 items-center"
        >
          <button
            onClick={handleLetsTalk}
            className="group relative px-8 py-4 bg-transparent border border-white text-white font-light tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/20 opacity-0"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '0.2em',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
          >
            <span className="relative z-10">Let's Talk</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></div>
          </button>

          <button
            onClick={handleContinueExploring}
            className="group relative px-8 py-4 bg-transparent border border-gray-600 text-gray-300 font-light tracking-widest uppercase transition-all duration-300 hover:border-white hover:text-white hover:shadow-lg hover:shadow-gray-500/20 opacity-0"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '0.2em',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
          >
            <span className="relative z-10">Continue Exploring</span>
            <div className="absolute inset-0 border-t border-white transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-center"></div>
          </button>
        </div>
      </div>

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
            className="text-6xl md:text-8xl font-light text-white tracking-tight opacity-0"
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
        Every cycle is a new dimension.
          </p>
        </div>

        {/* 3D Model Container */}
        <div 
          ref={modelContainerRef}
          className="fixed inset-0 w-screen h-screen opacity-0"
          style={{ zIndex: 1 }}
        />
        
        {/* Next Section Content (name and role) */}
        <div 
          ref={nextSectionRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0"
        >
          <h1 
            ref={nameRef}
            className="text-6xl md:text-8xl font-light text-white tracking-tight"
            style={{ 
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.1em',
            }}
          >
            MOHAMED YOUSIF
          </h1>
          
          <p 
            ref={roleRef}
            className="text-sm md:text-base text-gray-400 tracking-widest mt-4 uppercase"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 300,
              letterSpacing: '0.3em'
            }}
          >
            FULL STACK ENGINEER
          </p>
        </div>

        {/* About Section (appears in center when name moves to top-left) */}
        <div 
          ref={aboutSectionRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <div 
            ref={aboutTextRef}
            className="max-w-2xl text-center px-8"
          >
            <p 
              className="text-base md:text-lg text-gray-400 leading-relaxed mb-6"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 300,
                letterSpacing: '0.05em'
              }}
            >
              Engineer of intelligence and behavior. I design systems that live in the background — observing patterns, making decisions, and acting with precision. From full-stack web applications to embedded robotics and AI-powered tracking, my work blends the silent logic of code with the complexity of human environments. This isn't just software — it's awareness, encoded.
            </p>
          </div>
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

export default HeroSection;

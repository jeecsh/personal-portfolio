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
      e.preventDefault();
      const delta = e.deltaY;
      setScrollProgress(prev => {
        const newProgress = Math.min(Math.max(prev + delta * 0.0003, 0), 1);
        updateAnimations(newProgress);
        return newProgress;
      });
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

  // Function to update animations based on scroll progress
  const updateAnimations = (progress: number) => {
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

    if (nextSectionRef.current) {
      if (progress > 0.5) {
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
      } else {
        gsap.to(nextSectionRef.current, {
          opacity: 0,
          duration: 0.5
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
          text: "Built in shadows",
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
         Systems that see, learn, and move — before you're aware.

          </p>
        </div>

        {/* 3D Model Container */}
        <div 
          ref={modelContainerRef}
          className="fixed inset-0 w-screen h-screen opacity-0"
          style={{ zIndex: 1 }}
        />
        
        {/* Next Section Content (hidden initially) */}
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
            FULL STACK DEVELOPER
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gray-500" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

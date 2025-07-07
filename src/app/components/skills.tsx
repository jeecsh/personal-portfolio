import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import SkillsCarousel from './skillset'; // Assuming you have a SkillsCarousel component

const AdvancedScrollCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Card refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  
  // 3D Scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const model3DRef = useRef<HTMLDivElement>(null);

  // Initialize 3D scene
  useEffect(() => {
    if (model3DRef.current) {
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.set(0, 0, 4);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      // Make renderer responsive
      const size = Math.min(window.innerWidth * 0.8, 400);
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      rendererRef.current = renderer;
      model3DRef.current.appendChild(renderer.domElement);

      // Create minimalist geometric shape
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 0.2);
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      const wireframe = new THREE.LineSegments(edges, lineMaterial);
      scene.add(wireframe);
      meshRef.current = wireframe;

      // Subtle lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Handle window resize
      const handleResize = () => {
        const size = Math.min(window.innerWidth * 0.8, 400);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
        renderer.setSize(size, size);
      };

      window.addEventListener('resize', handleResize);

      // Minimal animation
      const animate = () => {
        requestAnimationFrame(animate);
        if (wireframe) {
          wireframe.rotation.x += 0.003;
          wireframe.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        if (model3DRef.current && renderer.domElement) {
          model3DRef.current.removeChild(renderer.domElement);
        }
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      
      const startScroll = containerTop - windowHeight;
      const endScroll = containerTop + containerHeight - windowHeight;
      const totalScrollDistance = endScroll - startScroll;
      const currentProgress = Math.max(0, Math.min(1, (scrollTop - startScroll) / totalScrollDistance));
      
      setScrollProgress(currentProgress);
      updateCardAnimations(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateCardAnimations = (progress: number) => {
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
    
    cards.forEach((card, index) => {
      if (!card) return;
      
      const cardProgress = Math.max(0, Math.min(1, (progress * 3) - index));
      const nextCardProgress = Math.max(0, Math.min(1, (progress * 3) - (index + 1)));
      
      const translateY = (1 - cardProgress) * 100;
      const scale = 0.95 + (cardProgress * 0.05);
      const opacity = Math.max(0.1, cardProgress);
      
      const stackOffset = nextCardProgress * -30;
      const stackScale = 1 - (nextCardProgress * 0.03);
      const stackOpacity = 1 - (nextCardProgress * 0.4);
      
      card.style.transform = `
        translateY(${translateY + stackOffset}vh) 
        scale(${scale * stackScale})
      `;
      card.style.opacity = String(opacity * stackOpacity);
      card.style.zIndex = String(10 + index);
      
      const blur = nextCardProgress * 2;
      card.style.filter = `blur(${blur}px)`;
    });
  };

  // Architectural SVG patterns
  const ArchitecturalBG = ({ pattern }: { pattern: 'grid' | 'lines' | 'dots' }) => {
    if (pattern === 'grid') {
      return (
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      );
    }
    if (pattern === 'lines') {
      return (
        <svg className="absolute inset-0 w-full h-full opacity-3" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="lines" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,20 L20,0" stroke="white" strokeWidth="0.5" fill="none"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#lines)" />
        </svg>
      );
    }
    return (
      <svg className="absolute inset-0 w-full h-full opacity-4" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="0.5" fill="white"/>
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#dots)" />
      </svg>
    );
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Added margin from top */}
      <div className="pt-20 md:pt-32">
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden" ref={containerRef}>
          <ArchitecturalBG pattern="grid" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
          <div className="text-center mt-30 space-y-6 md:space-y-12 px-6 relative z-10 w-full">
            <div className="space-y-2 md:space-y-4">
              <div className="w-40 bg-white mx-auto"></div>
        <h1 
          className="text-5xl sm:text-3xl md:text-4xl lg:text-8xl font-light text-center mb-12 sm:mb-20 tracking-tight leading-tight text-white px-4"
          style={{ 
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '0.1em',
            opacity: 1
          }}
        >
          SKILLS <span className="text-gray-400">SET</span>
        </h1>
              <div className="w-24 h-px bg-white mx-auto"></div>
            </div>
          
            
            {/* Make SkillsCarousel responsive */}
            <div className="mt-8 md:mt-12 w-full max-w-4xl mx-auto px-4">
              <SkillsCarousel />
              
            </div>
            
          </div>
          
        </section>
        {/* Final Section */}
      </div>  
    </div>
  );
};

export default AdvancedScrollCards;
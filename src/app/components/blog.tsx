import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CreativeBlog = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const containerRef = useRef(null);
  const model3DRef = useRef(null);

  // Portfolio blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Building Modern Web Applications",
      excerpt: "Deep dive into creating scalable, performant web applications using modern frameworks and best practices.",
      date: "2024-12-15",
      readTime: "8 min read",
      category: "Development",
      tags: ["React", "TypeScript", "Performance"]
    },
    {
      id: 2,
      title: "The Art of Minimalist Design",
      excerpt: "Exploring how less can be more in creating powerful, user-focused digital experiences.",
      date: "2024-12-10",
      readTime: "6 min read",
      category: "Design",
      tags: ["UI/UX", "Minimalism", "User Experience"]
    },
    {
      id: 3,
      title: "3D Web Development Journey",
      excerpt: "My experience integrating Three.js and WebGL into modern web applications for immersive experiences.",
      date: "2024-12-05",
      readTime: "10 min read",
      category: "3D Development",
      tags: ["Three.js", "WebGL", "Animation"]
    },
    {
      id: 4,
      title: "Responsive Design Principles",
      excerpt: "Creating adaptive layouts that work seamlessly across all devices and screen sizes.",
      date: "2024-11-28",
      readTime: "7 min read",
      category: "Frontend",
      tags: ["CSS", "Responsive", "Mobile-First"]
    },
    {
      id: 5,
      title: "API Architecture & Integration",
      excerpt: "Best practices for designing and consuming APIs in modern full-stack applications.",
      date: "2024-11-20",
      readTime: "9 min read",
      category: "Backend",
      tags: ["API", "Node.js", "Database"]
    },
    {
      id: 6,
      title: "Motion Design for Web",
      excerpt: "Creating meaningful animations that enhance user experience without sacrificing performance.",
      date: "2024-11-15",
      readTime: "5 min read",
      category: "Animation",
      tags: ["CSS Animations", "JavaScript", "Performance"]
    }
  ];

  // Initialize 3D scene
  useEffect(() => {
    if (model3DRef.current) {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = null;
      
      const camera = new THREE.PerspectiveCamera(
        75, 
        model3DRef.current.clientWidth / model3DRef.current.clientHeight, 
        0.1, 
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(model3DRef.current.clientWidth, model3DRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.8;
      model3DRef.current.appendChild(renderer.domElement);

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
        if (model3DRef.current) {
            camera.aspect = model3DRef.current.clientWidth / model3DRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(model3DRef.current.clientWidth, model3DRef.current.clientHeight);
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (model3DRef.current) {
            model3DRef.current.removeChild(renderer.domElement);
        }
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
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Grid background component - only for cards
  const CardGridBackground = () => (
    <div className="absolute inset-0 opacity-30">
      <svg width="100%" height="40%" className="absolute inset-0">
        <defs>
          <pattern id="card-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#card-grid-pattern)" />
      </svg>
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white relative" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/40"></div>
        
        <div className="relative z-10 text-center space-y-12 px-6 max-w-5xl">
          <div className="flex items-center justify-center space-x-12">
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-white opacity-60"></div>
            <div ref={model3DRef} className="flex-shrink-0 w-[300px] h-[300px]"></div>
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-white opacity-60"></div>
          </div>
          
          <div className="space-y-6">
            <h1 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-none text-white"
              style={{ 
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: '0.1em',
              }}
            >
              BLOG <span className="text-gray-500">POSTS</span>
            </h1>
            
            <div className="flex items-center justify-center space-x-6">
              <div className="w-16 h-px bg-white opacity-40"></div>
              <div className="w-2 h-2 border border-white opacity-40 rotate-45"></div>
              <div className="w-16 h-px bg-white opacity-40"></div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Insights, tutorials, and thoughts on web development, design, and technology
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div 
                key={post.id}
                className="group cursor-pointer"
                onClick={() => setSelectedPost(post)}
                style={{
                  transition: 'transform 0.6s ease-out'
                }}
              >
                <div className="relative h-[500px] bg-black overflow-hidden group-hover:border-gray-600 transition-all duration-500">
                  {/* Grid background only inside cards */}
                  <CardGridBackground />
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    {/* Top border */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500 ease-out"></div>
                    
                    {/* Right border */}
                    <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white to-transparent transform -translate-y-full group-hover:translate-y-full transition-transform duration-1500 ease-out" style={{ transitionDelay: '0.2s' }}></div>
                    
                    {/* Bottom border */}
                    <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-white to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1500 ease-out" style={{ transitionDelay: '0.4s' }}></div>
                    
                    {/* Left border */}
                    <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-transparent via-white to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1500 ease-out" style={{ transitionDelay: '0.6s' }}></div>
                  </div>
                  
                  {/* Sweep effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-6 bg-white"></div>
                        <span className="text-xs text-gray-300 tracking-[0.2em] uppercase font-light">
                          {post.category}
                        </span>
                      </div>
                      <div className="w-5 h-5 border border-gray-500 rotate-45 group-hover:rotate-90 transition-transform duration-300"></div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-light mb-6 group-hover:text-gray-200 transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>
                    
                    {/* Content */}
                    <div className="flex-grow space-y-6">
                      <p className="text-gray-400 leading-relaxed text-base line-clamp-4">
                        {post.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs text-gray-200 px-3 py-1 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="pt-6 border-t border-gray-800/50 mt-auto">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="tracking-wide">{post.date}</span>
                        <span className="tracking-wide">{post.readTime}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                        <span className="tracking-[0.15em] font-light">READ ARTICLE</span>
                        <div className="ml-3 w-8 h-px bg-current transform group-hover:w-16 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for selected post */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedPost(null)}>
          <div className="bg-black border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <CardGridBackground />
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6">
                  <div className="w-1 h-8 bg-white"></div>
                  <div className="space-y-1">
                    <span className="text-sm text-gray-300 tracking-[0.2em] uppercase block">
                      {selectedPost.category}
                    </span>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <span>{selectedPost.date}</span>
                      <span>•</span>
                      <span>{selectedPost.readTime}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-300 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light mb-8 leading-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}>
                {selectedPost.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedPost.tags.map((tag, index) => (
                  <span key={index} className="text-xs text-gray-300 bg-gray-900/50 px-3 py-1 border border-gray-800 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  {selectedPost.excerpt}
                </p>
                
                <div className="text-gray-400 space-y-6 leading-relaxed">
                  <p>This is where the full blog content would be displayed. The modal provides a clean, focused reading experience that maintains the portfolio's aesthetic while ensuring optimal readability.</p>
                  
                  <p>The design emphasizes typography, proper spacing, and maintains the grid background for visual consistency with the overall portfolio theme.</p>
                  
                  <p>Each post would contain detailed technical insights, code examples, and practical knowledge sharing that demonstrates expertise and provides value to readers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativeBlog;

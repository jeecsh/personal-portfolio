import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectItem {
  id: number;
  title: string;
  subtitle: string;
  image?: string;
  category: string;
  size: 'small' | 'medium' | 'large' | 'tall';
  isSpecial?: boolean;
  buttonText?: string;
}

// Add arrow animation keyframes
const buttonArrowAnimation = `
@keyframes arrowMove {
  0% { transform: translateX(0) rotate(45deg); }
  50% { transform: translateX(4px) rotate(45deg); }
  100% { transform: translateX(0) rotate(45deg); }
}
`;

const PortfolioGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Sample project data matching the reference masonry layout
  const projects: ProjectItem[] = [
    {
      id: 1,
      title: "SPOKEN",
      subtitle: "We Unleash The Power of The Spoken Word",
      image: "/pfff.png",
      category: "Branding",
      size: 'large'
    },
    {
      id: 2,
      title: "DICE",
      subtitle: "Popular Events in San Francisco, CA",
      image: "./car.jpeg",
      category: "App Design",
      size: 'medium'
    },
    {
      id: 3,
      title: "Wiki Docs",
      subtitle: "Your wiki, docs, & projects. Together.",
      image: "./mybus.png",
      category: "Web Design",
      size: 'small'
    },
    {
      id: 4,
      title: "ELEVATED AIR",
      subtitle: "Premium Sneaker Collection",
      image: "./sh.jpeg",
      category: "E-commerce",
      size: 'tall'
    },
    {
      id: 5,
      title: "Effortless Listening",
      subtitle: "Audio Experience Platform",
      image: "hv.jpeg",
      category: "UI/UX",
      size: 'small'
    },
    {
      id: 6,
      title: "Creative Studio",
      subtitle: "Digital Design Solutions",
      image: "iee.jpeg",
      category: "Portfolio",
      size: 'medium'
    },
    {
      id: 7,
      title: "POLITICS",
      subtitle: "News & Analysis Platform",
      image: "an.avif",
      category: "Editorial",
      size: 'small'
    },
    {
      id: 8,
      title: "Dashboard",
      subtitle: "Analytics Interface",
      image: "./memat.png",
      category: "Dashboard",
      size: 'small'
    },
    {
      id: 9,
      title: "Mobile App",
      subtitle: "Social Platform Design",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=500&fit=crop",
      category: "Mobile",
      size: 'medium'
    }
  ];

  useEffect(() => {
    // Simple fade-in animations for title and grid items
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    if (gridRef.current) {
      const gridItems = gridRef.current.children;
      Array.from(gridItems).forEach((item) => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  const getGridItemClass = (size: string) => {
    const baseClasses = "relative group cursor-pointer overflow-hidden transition-all duration-700 hover:shadow-2xl ";
    
    switch (size) {
      case 'large':
        return `${baseClasses} col-span-full sm:col-span-2 row-span-1 sm:row-span-2 md:row-span-3`;
      case 'tall':
        return `${baseClasses} col-span-full sm:col-span-2 row-span-1 sm:row-span-2 md:col-span-1 md:row-span-3`;
      case 'medium':
        return `${baseClasses} col-span-1 row-span-1 sm:col-span-2 sm:row-span-1 md:col-span-1 md:row-span-2`;
      case 'small':
        return `${baseClasses} col-span-1 row-span-1`;
      default:
        return `${baseClasses} col-span-1 row-span-1 sm:row-span-2`;
    }
  };

  const getImageHeight = (size: string) => {
    switch (size) {
      case 'large':
        return 'h-40 sm:h-64 md:h-96';
      case 'tall':
        return 'h-40 sm:h-56 md:h-80';
      case 'medium':
        return 'h-32 sm:h-48 md:h-64';
      case 'small':
        return 'h-32 sm:h-40 md:h-48';
      default:
        return 'h-32 sm:h-48 md:h-64';
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-20 py-1 sm:py-16 md:py-20">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-center mb-12 sm:mb-20 tracking-tight leading-tight text-white px-4"
          style={{ 
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: '0.1em',
            opacity: 1
          }}
        >
          Real-World Solutions, Built with <span className="text-gray-400">Precision.</span>
        </h1>

        {/* Full Width Grid Container - Removed container and px padding */}
        <div className="backdrop-blur-sm relative w-full">
          {/* Bottom gradient overlay for entire grid container */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-10" />
          
         
          <div 
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6 auto-rows-[minmax(150px,auto)]"
            style={{ minHeight: 'auto', opacity: 1, marginBottom: '4rem' }}
          >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`${getGridItemClass(project.size)} group-hover:scale-[1.02] group-hover:z-20 relative`}
                >
                  {/* Background Image or Gradient */}
                  {project.isSpecial ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 via-black to-zinc-800/50 transition-all duration-700">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                        backgroundSize: '24px 24px'
                      }} />
                    </div>
                  ) : (
                    <div className="absolute inset-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:filter group-hover:brightness-110"
                      />
                    </div>
                  )}
                  
                  {/* Default subtle overlay - Always Present */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  
                  {/* Interactive Overlay on Hover - Dark overlay that appears on hover */}
     
                  {/* Navigation Arrow - Always visible on mobile, hover on desktop */}
                  <div className="absolute inset-0 z-20 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 sm:group-hover:bg-white/30 transition-colors duration-300">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Content overlay - Hidden by default, visible on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-2.5 sm:p-3 md:p-4 lg:p-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <div className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest text-gray-300 mb-1 sm:mb-1.5 md:mb-2" style={{ letterSpacing: '0.3em' }}>
                        {project.category}
                      </div>
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-1.5 md:mb-2 tracking-tight leading-tight text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}>
                        {project.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-2 sm:line-clamp-none" style={{ fontWeight: 300, letterSpacing: '0.05em' }}>
                        {project.subtitle}
                      </p>
                      {project.isSpecial && project.buttonText && (
                        <button className="mt-6 px-6 py-3 border border-white/30 text-white text-sm uppercase tracking-widest flex items-center gap-2 bg-transparent hover:bg-white/10 hover:border-white hover:shadow-lg hover:shadow-white/10 transition-all duration-300 group/btn" style={{ letterSpacing: '0.2em' }}>
                          {project.buttonText}
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:animate-[arrowMove_1s_ease-in-out_infinite]" />
                        </button>
                      )}
                      
                    </div>
                    
                  </div>
                  
                  {/* Highlight glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10" />
                  </div>
                </div>
                
              ))}
       <div className="mb-8 sm:mb-12 w-full sm:w-150">
  <h2
    className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 text-white/90"
    style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
  >
    From Spark to Systems
  </h2>
  <p
    className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 w-full sm:w-120"
    style={{
      fontFamily: "'Rajdhani', sans-serif",
      fontWeight: 300,
      letterSpacing: '0.05em',
      lineHeight: 1.8,
    }}
  >
    A curated collection of innovation, prototypes, and polished builds — each project crafted to solve, scale, and surprise.
  </p>
  
  <div className="flex justify-end">
    <a
      href="#lab"
      className="inline-flex px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest text-gray-400 bg-transparent transition-all duration-500 group hover:text-white"
      style={{ letterSpacing: '0.2em' }}
    >
      See the lab
      <ArrowUpRight className="w-5 h-5 transform transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110" />
    </a>
  </div>
</div>

            </div>

            {/* Lab Section */}
            <div className="col-span-full relative mt-24 sm:mt-32 md:mt-40 overflow-hidden opacity-0 animate-fade-in group scroll-mt-16 sm:scroll-mt-20" id="lab" style={{ margin: '0 -1.5rem', animationDelay: '0.3s' }}>
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/90 via-black to-zinc-800/70 transition-opacity duration-700 group-hover:opacity-90">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px), 
                                  linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                                  radial-gradient(circle at 50% 50%, rgba(255,255,255,0.01) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px, 48px 48px, 96px 96px'
                }} />
              </div>

              {/* Content */}
            

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
        </div>
      </div>

      <style jsx>{`
        ${buttonArrowAnimation}
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default PortfolioGrid;

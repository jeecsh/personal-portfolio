import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type CardType = 'chatbot' | 'aws' | 'landing' | 'dashboard' | 'api' | null;

const ShowcaseSection = () => {
  const orderPrices = ['127.99', '84.50', '156.75', '92.25'];
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  
  const [hoveredCard, setHoveredCard] = useState<CardType>(null);

  useEffect(() => {
    // Simulate GSAP animations with CSS transitions
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    });

    if (headerRef.current) observer.observe(headerRef.current);
    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);
    if (card3Ref.current) observer.observe(card3Ref.current);
    if (card4Ref.current) observer.observe(card4Ref.current);
    if (card5Ref.current) observer.observe(card5Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="bg-black min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 opacity-0 transform translate-y-12 transition-all duration-1000">
          <h2 
            className="text-5xl md:text-6xl font-light tracking-tight text-white mb-4"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '0.05em',
            }}
          >
            From Idea to Impact — <span className="text-gray-400">Seamlessly.</span>
          </h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto lg:h-[800px]">
          
          {/* Card 1 - Chatbot Customization */}
          <div 
            ref={card1Ref} 
            className="bg-gradient-to-b from-black to-[#111111] rounded-2xl p-8 flex flex-col relative overflow-hidden lg:row-span-2 border border-[#1a1a1a] opacity-0 transform translate-y-12 transition-all duration-1000 group cursor-pointer"
            onMouseEnter={() => setHoveredCard('chatbot')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="relative z-10 flex flex-col h-full">
              {/* Primary content */}
              <div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  </svg>
                </div>
                <h3 
                  className="text-2xl font-light text-white mb-4 tracking-wide"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: '0.05em',
                  }}
                >
                  Customize Your Chatbot
                </h3>
                <p 
                  className="text-gray-400 text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Intelligent AI-powered chatbots tailored to your business needs and customer interactions
                </p>
              </div>

              {/* Simple metrics on left and right */}
              <div className="relative flex justify-between items-center mt-8 mb-4">
                <div className={`transition-all duration-500 ease-in-out ${
                  hoveredCard === 'chatbot' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <div 
                    className="text-blue-400 text-xl"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: '0.05em',
                    }}
                  >
                    70%
                  </div>
                  <div 
                    className="text-gray-400 text-sm"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    Faster
                  </div>
                </div>
                
                <div className={`transition-all duration-500 ease-in-out ${
                  hoveredCard === 'chatbot' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <div 
                    className="text-green-400 text-xl"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: '0.05em',
                    }}
                  >
                    98%
                  </div>
                  <div 
                    className="text-gray-400 text-sm"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    Accuracy
                  </div>
                </div>
              </div>

              {/* Mobile screen mockup with slide up animation */}
              <div className={`mt-auto flex justify-center transition-all duration-500 ease-in-out transform ${
                hoveredCard === 'chatbot' ? '-translate-y-4' : 'translate-y-0'
              }`}>
                <div className="w-32 h-56 bg-[#1a1a1a] rounded-2xl border-2 border-[#333333] relative overflow-hidden">
                  <div className="w-full h-full bg-[#000000] rounded-xl p-2">
                    <div className="w-full h-4 flex justify-between items-center px-2 mb-2">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                      <div className="text-white text-xs">100%</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="bg-blue-500 text-white text-xs p-2 rounded-lg ml-4">
                        Hello! How can I help?
                      </div>
                      <div className="bg-[#333333] text-white text-xs p-2 rounded-lg mr-4">
                        Tell me about your services
                      </div>
                      <div className="bg-blue-500 text-white text-xs p-2 rounded-lg ml-4">
                        I offer custom solutions...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - AWS Solution Architect */}
          <div 
            ref={card2Ref} 
            className="bg-gradient-to-b from-black to-[#111111] rounded-2xl p-8 flex flex-col relative overflow-hidden border border-[#1a1a1a] opacity-0 transform translate-y-12 transition-all duration-1000 group cursor-pointer"
            onMouseEnter={() => setHoveredCard('aws')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Background Cloud Icon */}
            <div 
              className={`absolute inset-x-0 bottom-0 w-full z-0 transition-all duration-700 ease-in-out transform opacity-0
                ${hoveredCard === 'aws' ? 'opacity-10 translate-y-12' : 'translate-y-full'}`}
              style={{
                transitionDelay: '100ms'
              }}
            >
              <svg 
                viewBox="0 0 300 300" 
                fill="currentColor" 
                className="text-white w-full h-48"
              >
                <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z"/>
              </svg>
            </div>
            {/* AWS logo */}
            <div className={`absolute top-2 right-6 transition-all duration-500 ease-in-out ${
              hoveredCard === 'aws' ? 'transform -translate-y-2 scale-90' : ''
            }`}>
              <div className="w-16 h-16 rounded-lg overflow-hidden relative">
                <Image
                  src="/AWS.png"
                  alt="AWS Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority  
                />
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Primary content */}
              <div className={`transition-all duration-500 ease-in-out ${hoveredCard === 'aws' ? 'transform -translate-y-4' : ''}`}>
                <h3 
                  className="text-2xl font-light text-white mb-4 tracking-wide"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: '0.05em',
                  }}
                >
                  AWS Solution Architect
                </h3>
                <p 
                  className="text-gray-400 leading-relaxed"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Find custom solutions for your system on cloud with enterprise-grade architecture
                </p>
              </div>
              
              {/* Tagline */}
              <div className="mt-auto">
                <div
                  className={`bg-[#1a1a1a3f] border border-[#333333] rounded-lg p-4 text-center
                    transition-all duration-700 transform
                    ${hoveredCard === 'aws'
                      ? 'opacity-60 translate-y-0'
                      : 'opacity-0 translate-y-4'}`}
                  style={{
                    fontFamily: "'Rajdhani', sans-serif"
                  }}
                >
                  Turning cloud complexity into clean, automated infrastructure.
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - 24hr Landing Page */}
          <div 
            ref={card3Ref} 
            className="bg-gradient-to-b from-black to-[#111111] rounded-2xl p-8 flex flex-col justify-between relative overflow-hidden border border-[#1a1a1a] opacity-0 transform translate-y-12 transition-all duration-1000 cursor-pointer group"
            onMouseEnter={() => setHoveredCard('landing')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Sound wave circles - now triggered on div hover */}
            <div className="absolute -top-10 -right-10 w-32 h-32 border border-[#646464] rounded-full transition-all duration-700 pointer-events-none group-hover:scale-150 group-hover:opacity-30 opacity-20"></div>
            <div className="absolute -top-5 -right-5 w-20 h-20 border border-[#646464] rounded-full transition-all duration-500 pointer-events-none group-hover:scale-150 group-hover:opacity-40 opacity-30"></div>
            <div className="absolute top-0 -right-0 w-12 h-12 border border-[#646464] rounded-full transition-all duration-300 pointer-events-none group-hover:scale-150 group-hover:opacity-50 opacity-40"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Primary content */}
              <div>
                <h3 
                  className="text-4xl font-light text-white mb-2 tracking-wider"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: '0.05em',
                  }}
                >
                 Fast Software Lifecycle
                </h3>
                <h4 
                  className="text-xl font-light text-white mb-4 tracking-wide"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: '0.05em',
                  }}
                >
                  Get your landing page in 24hr
                </h4>
                <p 
                  className="text-gray-400 leading-relaxed"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Lightning-fast delivery of stunning, conversion-optimized landing pages
                </p>
              </div>

              {/* Simplified hover content */}
              <div className={`mt-6 transition-all duration-500 ease-in-out ${
                hoveredCard === 'landing' 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a3f] border border-[#333333] rounded-lg p-4 text-center">
                    <div 
                      className="text-white text-2xl mb-1"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        letterSpacing: '0.05em',
                      }}
                    >
                      24h
                    </div>
                    <div 
                      className="text-gray-400 text-sm"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      Delivery Time
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a3f] border border-[#333333] rounded-lg p-4 text-center">
                    <div 
                      className="text-blue-400 text-2xl mb-1"
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        letterSpacing: '0.05em',
                      }}
                    >
                      100%
                    </div>
                    <div 
                      className="text-gray-400 text-sm"
                      style={{
                        fontFamily: "'Rajdhani', sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - AI Powered Dashboard */}
          <div 
            ref={card4Ref} 
            className="bg-gradient-to-b from-black to-[#111111] rounded-2xl p-8 flex flex-col relative overflow-hidden lg:col-span-2 border border-[#1a1a1a] opacity-0 transform translate-y-12 transition-all duration-1000 group cursor-pointer"
            onMouseEnter={() => setHoveredCard('dashboard')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* AI branding */}
            <div className="absolute top-6 left-8">
              <div 
                className="text-purple-400 text-2xl tracking-wider"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: '0.05em',
                }}
              >
                AI Dashboard
              </div>
            </div>
            
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-gray-600"></div>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Primary content */}
              <div className={`mt-16 transition-all duration-500 ease-in-out ${hoveredCard === 'dashboard' ? 'transform -translate-y-6' : ''}`}>
                <h3 
                  className="text-3xl font-light text-white mb-4 tracking-wide"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: '0.05em',
                  }}
                >
                  AI Powered Dashboard
                </h3>
                <p 
                  className="text-gray-400 text-lg leading-relaxed"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Intelligent data visualization and analytics for smarter decision-making and business insights
                </p>
              </div>

              {/* Interactive Dashboard mockup - iPad style */}
              <div className="mt-auto">
                <div className={`bg-[#1a1a1a] rounded-2xl p-1 border-2 border-[#333333] transition-all duration-500 ${hoveredCard === 'dashboard' ? 'transform -translate-y-30 shadow-2xl shadow-purple-500/20' : ''}`}>
                  <div className="bg-[#000000] rounded-xl p-6 h-56">
                    <div className="flex justify-between items-center mb-6">
                      <span 
                        className="text-gray-300 tracking-wide text-lg"
                        style={{
                          fontFamily: "'Bebas Neue', sans-serif",
                          letterSpacing: '0.05em',
                        }}
                      >
                        AI Analytics
                      </span>
                      <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-light flex items-center space-x-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>Live</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Conversion Rate', value: '12.4%', trend: 'up', color: 'green' },
                        { label: 'User Engagement', value: '87.2%', trend: 'up', color: 'blue' },
                        { label: 'Bounce Rate', value: '23.1%', trend: 'down', color: 'red' },
                        { label: 'Revenue Growth', value: '156.8%', trend: 'up', color: 'purple' }
                      ].map((item, i) => (
                        <div key={i} className={`bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 transition-all duration-500 ${hoveredCard === 'dashboard' ? 'transform translate-y-0 opacity-100' : 'transform translate-y-2 opacity-90'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                          <div className="flex items-center justify-between mb-2">
                            <div className={`w-3 h-3 ${item.color === 'green' ? 'bg-green-400' : item.color === 'blue' ? 'bg-blue-400' : item.color === 'red' ? 'bg-red-400' : 'bg-purple-400'} rounded-full`}></div>
                            <span className={`text-lg font-light ${item.color === 'green' ? 'text-green-400' : item.color === 'blue' ? 'text-blue-400' : item.color === 'red' ? 'text-red-400' : 'text-purple-400'}`}>{item.value}</span>
                          </div>
                          <span className="text-gray-300 text-sm font-light">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 - Third Party API Integration */}
          <div 
            ref={card5Ref} 
            className="bg-gradient-to-b from-black to-[#111111] rounded-2xl p-8 flex flex-col relative overflow-hidden border border-[#1a1a1a] opacity-0 transform translate-y-12 transition-all duration-1000 group cursor-pointer"
            onMouseEnter={() => setHoveredCard('api')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* API connection mockup */}
            <div className="absolute top-4 right-4">
              <div className="w-24 h-24 bg-[#1a1a1a] rounded-xl border border-[#222222] flex items-center justify-center">
                <div className="w-16 h-16 bg-[#222222] rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
              {/* Primary content */}
              <div className={`transition-all duration-500 ease-in-out ${hoveredCard === 'api' ? 'transform -translate-y-4' : ''}`}>
                <h3 
                  className="text-2xl font-light text-white mb-4 tracking-wide"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    letterSpacing: '0.05em',
                  }}
                >
                  Third Party API Integration
                </h3>
                <p 
                  className="text-gray-400 leading-relaxed"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 300,
                  }}
                >
                  Seamless integration with external services and APIs to extend your application's capabilities
                </p>
              </div>
              
              {/* Simple metrics */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className={`bg-[#1a1a1a3f] border border-[#333333] rounded-lg p-4 text-center transition-all duration-500 shadow-xl ${
                  hoveredCard === 'api' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <div 
                    className="text-blue-400 text-2xl mb-1"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: '0.05em',
                    }}
                  >
                    50+
                  </div>
                  <div 
                    className="text-gray-400 text-sm"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    APIs
                  </div>
                </div>
                <div className={`bg-[#1a1a1a3f] border border-[#333333] rounded-lg p-4 text-center transition-all duration-500 shadow-xl ${
                  hoveredCard === 'api' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}>
                  <div 
                    className="text-blue-400 text-2xl mb-1"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: '0.05em',
                    }}
                  >
                    100%
                  </div>
                  <div 
                    className="text-gray-400 text-sm"
                    style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontWeight: 300,
                    }}
                  >
                    Secure
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShowcaseSection;

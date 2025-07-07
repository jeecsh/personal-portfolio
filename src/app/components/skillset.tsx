import { useEffect, useRef, useState } from 'react';
import { 
  Code, 
  Database, 
  Cloud, 
  Server, 
  GitBranch,
  Cpu,
  Brain,
  Terminal,
  Globe,
  Layers,
  Zap,
  Settings,
  Container,
  HardDrive,
  Smartphone,
  Monitor,
  Wifi,
  Box,
  Activity,
  FileCode,
  Wrench,
  CircuitBoard,
  Gamepad2,
  Eye,
  Target,
  Network,
  Flame,
  Rocket,
  Command,
  Cog
} from 'lucide-react';

const InfiniteSkillsScroll = () => {
  const [isPaused, setIsPaused] = useState(false);

  const skills = [
    { icon: Code, color: 'text-blue-400', name: 'Python' },
    { icon: FileCode, color: 'text-yellow-400', name: 'JavaScript' },
    { icon: Code, color: 'text-blue-500', name: 'TypeScript' },
    { icon: Terminal, color: 'text-gray-400', name: 'C' },
    { icon: Database, color: 'text-green-400', name: 'SQL' },
    { icon: Globe, color: 'text-cyan-400', name: 'React' },
    { icon: Server, color: 'text-green-500', name: 'Node.js' },
    { icon: Rocket, color: 'text-white', name: 'Next.js' },
    { icon: Flame, color: 'text-red-400', name: 'Flask' },
    { icon: Zap, color: 'text-yellow-500', name: 'Express' },
    { icon: Cloud, color: 'text-orange-400', name: 'AWS' },
    { icon: Container, color: 'text-blue-600', name: 'Docker' },
    { icon: Settings, color: 'text-purple-400', name: 'Kubernetes' },
    { icon: Layers, color: 'text-indigo-400', name: 'Terraform' },
    { icon: HardDrive, color: 'text-blue-300', name: 'PostgreSQL' },
    { icon: Database, color: 'text-green-600', name: 'MongoDB' },
    { icon: Flame, color: 'text-yellow-600', name: 'Firebase' },
    { icon: Brain, color: 'text-orange-500', name: 'TensorFlow' },
    { icon: Cpu, color: 'text-red-500', name: 'TensorFlow Lite' },
    { icon: CircuitBoard, color: 'text-teal-400', name: 'Coral' },
    { icon: Activity, color: 'text-red-400', name: 'Keras' },
    { icon: Flame, color: 'text-orange-600', name: 'PyTorch' },
    { icon: Eye, color: 'text-blue-400', name: 'OpenCV' },
    { icon: Target, color: 'text-purple-500', name: 'Scikit-learn' },
    { icon: Network, color: 'text-cyan-500', name: 'CST Studio Suite' },
    { icon: Box, color: 'text-green-400', name: 'TinkerCAD' },
    { icon: Wrench, color: 'text-gray-500', name: 'STIL' },
    { icon: Gamepad2, color: 'text-blue-500', name: 'QGroundControl' },
    { icon: Monitor, color: 'text-indigo-500', name: 'Gazebo' },
    { icon: GitBranch, color: 'text-orange-400', name: 'Git' },
    { icon: Wifi, color: 'text-green-500', name: 'REST APIs' },
    { icon: Command, color: 'text-gray-300', name: 'Linux' },
    { icon: Cpu, color: 'text-teal-500', name: 'Coral TPU' },
    { icon: Cog, color: 'text-blue-400', name: 'BlueOS' }
  ];

  // Triple the skills for seamless infinite loop
  const infiniteSkills = [...skills, ...skills, ...skills];

  return (
    <div className="bg-black py-20 overflow-hidden relative">
      {/* Section Header */}
 

      {/* Infinite Scroll Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
        
        {/* Scrolling Container */}
        <div 
          className={`flex items-center gap-12 ${isPaused ? 'pause-animation' : ''}`}
          style={{
            animation: 'scroll 80s linear infinite',
            width: 'fit-content'
          }}
        >
          {infiniteSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                className="flex-shrink-0 group relative transition-all duration-300 hover:scale-125"
              >
                <IconComponent 
                  className={`w-8 h-8 ${skill.color} hover:drop-shadow-lg transition-all duration-300`}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 backdrop-blur-sm text-white text-sm font-light tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap ">
                  {skill.name}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="flex justify-center mt-16">
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .pause-animation {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
};

export default InfiniteSkillsScroll;
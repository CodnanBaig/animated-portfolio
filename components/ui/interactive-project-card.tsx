"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { ArrowUpRight, ExternalLink, Github, Eye, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useMagnetic } from '@/components/ui/cursor';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface InteractiveProjectCardProps {
  project: Project;
  hoverEffect?: 'tilt' | 'lift' | 'glow' | 'parallax';
  imageReveal?: 'slide' | 'zoom' | 'blur' | 'morph';
  interaction?: 'magnetic' | 'cursor-follow' | 'ripple';
  className?: string;
}

export function InteractiveProjectCard({
  project,
  hoverEffect = 'tilt',
  imageReveal = 'zoom',
  interaction = 'magnetic',
  className = ''
}: InteractiveProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  
  // Spring animations
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  // Magnetic effect
  const magneticRef = useMagnetic(0.4);
  
  // Mouse tracking for parallax
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    x.set(mouseX * 0.1);
    y.set(mouseY * 0.1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleClick = (event: React.MouseEvent) => {
    if (interaction === 'ripple') {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const rippleX = event.clientX - rect.left;
      const rippleY = event.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x: rippleX,
        y: rippleY,
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 1000);
    }
  };

  const getHoverVariants = () => {
    switch (hoverEffect) {
      case 'lift':
        return {
          rest: { y: 0, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
          hover: { 
            y: -12, 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            transition: { type: 'spring', stiffness: 400, damping: 25 }
          }
        };
      case 'glow':
        return {
          rest: { 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            borderColor: 'transparent'
          },
          hover: { 
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            borderColor: 'rgba(168, 85, 247, 0.5)',
            transition: { duration: 0.3 }
          }
        };
      case 'parallax':
        return {
          rest: { rotateX: 0, rotateY: 0, z: 0 },
          hover: { 
            rotateX: rotateX,
            rotateY: rotateY,
            z: 100,
            transition: { type: 'spring', stiffness: 300, damping: 30 }
          }
        };
      case 'tilt':
      default:
        return {
          rest: { rotateX: 0, rotateY: 0, scale: 1 },
          hover: { 
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.02,
            transition: { type: 'spring', stiffness: 300, damping: 30 }
          }
        };
    }
  };

  const getImageVariants = () => {
    switch (imageReveal) {
      case 'slide':
        return {
          rest: { scale: 1, x: 0 },
          hover: { scale: 1.1, x: 10, transition: { duration: 0.4 } }
        };
      case 'blur':
        return {
          rest: { scale: 1, filter: 'blur(0px)' },
          hover: { scale: 1.05, filter: 'blur(2px)', transition: { duration: 0.3 } }
        };
      case 'morph':
        return {
          rest: { scale: 1, borderRadius: '0.5rem' },
          hover: { scale: 1.1, borderRadius: '1rem', transition: { duration: 0.4 } }
        };
      case 'zoom':
      default:
        return {
          rest: { scale: 1 },
          hover: { scale: 1.1, transition: { duration: 0.4 } }
        };
    }
  };

  const cardVariants = getHoverVariants();
  const imageVariants = getImageVariants();

  const cardStyle = interaction === 'magnetic' ? { ref: magneticRef } : {};

  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-xl bg-card border border-border backdrop-blur-sm ${className}`}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ 
        transformStyle: 'preserve-3d',
        ...cardStyle 
      }}
      data-cursor="magnetic"
      data-cursor-text="View Project"
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none bg-white/20 rounded-full"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
          }}
          initial={{ width: 20, height: 20, opacity: 0.6 }}
          animate={{ width: 200, height: 200, opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Image section */}
      <div className="relative aspect-video overflow-hidden">
        <motion.div
          className="relative w-full h-full"
          variants={imageVariants}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        
        {/* Overlay with actions */}
        <motion.div
          className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.liveUrl && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1 : 0.8, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <Button
                asChild
                size="sm"
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
                data-cursor="pointer"
              >
                <Link href={project.liveUrl} target="_blank">
                  <Eye className="h-4 w-4 mr-1" />
                  Live
                </Link>
              </Button>
            </motion.div>
          )}
          
          {project.githubUrl && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isHovered ? 1 : 0.8, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <Button
                asChild
                size="sm"
                variant="outline"
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20"
                data-cursor="pointer"
              >
                <Link href={project.githubUrl} target="_blank">
                  <Github className="h-4 w-4 mr-1" />
                  Code
                </Link>
              </Button>
            </motion.div>
          )}
        </motion.div>

        {/* Category badges floating */}
        <div className="absolute top-3 left-3 flex gap-1">
          {project.categories.slice(0, 2).map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white text-xs">
                {category}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-2 line-clamp-3">
            {project.description}
          </p>
        </motion.div>

        {/* Technology badges */}
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {project.technologies.slice(0, 4).map((tech, index) => (
            <motion.div
              key={tech}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge 
                variant="outline" 
                className="text-xs hover:bg-primary/10 hover:border-primary/30 transition-all duration-200 cursor-default"
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 4} more
            </Badge>
          )}
        </motion.div>

        {/* Action button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            asChild
            className="w-full group/button"
            data-cursor="magnetic"
            data-cursor-text="Learn More"
          >
            <Link href={`/projects/${project.id}`}>
              <span>View Details</span>
              <ArrowUpRight className="h-4 w-4 ml-2 group-hover/button:translate-x-1 group-hover/button:-translate-y-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)',
        }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          rotate: isHovered ? 180 : 0
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}

// Simplified version for grid usage
export function ProjectCardSimple({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <InteractiveProjectCard
      project={project}
      hoverEffect="lift"
      imageReveal="zoom"
      interaction="magnetic"
      className={className}
    />
  );
}

// Premium version with all effects
export function ProjectCardPremium({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <InteractiveProjectCard
      project={project}
      hoverEffect="tilt"
      imageReveal="morph"
      interaction="ripple"
      className={`border-2 ${className}`}
    />
  );
}
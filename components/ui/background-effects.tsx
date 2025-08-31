"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

interface BackgroundEffectsProps {
  type?: 'grid-motion' | 'dot-pattern' | 'gradient-mesh' | 'particles' | 'pixel-blast';
  intensity?: 'subtle' | 'medium' | 'high';
  responsiveToMouse?: boolean;
  scrollParallax?: boolean;
  className?: string;
}

export function BackgroundEffects({
  type = 'grid-motion',
  intensity = 'medium',
  responsiveToMouse = true,
  scrollParallax = false,
  className = ''
}: BackgroundEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const getIntensityValue = () => {
    switch (intensity) {
      case 'subtle': return 0.3;
      case 'medium': return 0.6;
      case 'high': return 1.0;
      default: return 0.6;
    }
  };

  const getThemeColors = () => {
    const isDark = theme === 'dark';
    return {
      primary: isDark ? 'rgba(168, 85, 247, 0.1)' : 'rgba(79, 70, 229, 0.08)',
      secondary: isDark ? 'rgba(20, 184, 166, 0.08)' : 'rgba(16, 185, 129, 0.06)',
      accent: isDark ? 'rgba(244, 63, 94, 0.05)' : 'rgba(239, 68, 68, 0.04)',
      grid: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.03)',
    };
  };

  useEffect(() => {
    if (!responsiveToMouse) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      mouseX.set(x * 100);
      mouseY.set(y * 100);
    };

    const handleScroll = () => {
      if (scrollParallax) {
        scrollY.set(window.scrollY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [responsiveToMouse, scrollParallax, mouseX, mouseY, scrollY]);

  const renderGridMotion = () => {
    const colors = getThemeColors();
    const intensityVal = getIntensityValue();
    
    return (
      <div className="absolute inset-0">
        {/* Animated grid lines */}
        <motion.div 
          className="absolute inset-0"
          style={{
            x: springX,
            y: springY,
          }}
        >
          {/* Vertical lines */}
          <div className="w-full h-full grid grid-cols-12 gap-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="h-full border-r"
                style={{
                  borderColor: colors.grid,
                  opacity: intensityVal,
                }}
                animate={{
                  opacity: [intensityVal, intensityVal * 1.5, intensityVal],
                }}
                transition={{
                  duration: 4 + i * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
          
          {/* Horizontal lines */}
          <div className="absolute inset-0 flex flex-col">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="flex-1 border-b"
                style={{
                  borderColor: colors.grid,
                  opacity: intensityVal,
                }}
                animate={{
                  opacity: [intensityVal, intensityVal * 1.5, intensityVal],
                }}
                transition={{
                  duration: 3 + i * 0.15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Gradient orbs */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
            x: springX,
            y: springY,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
            x: springY,
            y: springX,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>
    );
  };

  const renderDotPattern = () => {
    const colors = getThemeColors();
    const intensityVal = getIntensityValue();
    
    return (
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${colors.primary} 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
            x: springX,
            y: springY,
            opacity: intensityVal,
          }}
          animate={{
            opacity: [intensityVal * 0.5, intensityVal, intensityVal * 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${colors.secondary} 0.5px, transparent 0.5px)`,
            backgroundSize: '15px 15px',
            x: springY,
            y: springX,
            opacity: intensityVal * 0.7,
          }}
          animate={{
            opacity: [intensityVal * 0.3, intensityVal * 0.7, intensityVal * 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
        />
      </div>
    );
  };

  const renderGradientMesh = () => {
    const colors = getThemeColors();
    const intensityVal = getIntensityValue();
    
    return (
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, ${colors.primary} 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, ${colors.secondary} 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, ${colors.accent} 0%, transparent 50%),
              radial-gradient(circle at 25% 75%, ${colors.primary} 0%, transparent 50%)
            `,
            x: springX,
            y: springY,
          }}
          animate={{
            opacity: [intensityVal * 0.3, intensityVal * 0.8, intensityVal * 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    );
  };

  const renderPixelBlast = () => {
    const colors = getThemeColors();
    const intensityVal = getIntensityValue();
    const pixelCount = intensity === 'high' ? 120 : intensity === 'medium' ? 80 : 50;
    
    return (
      <div className="absolute inset-0">
        {/* Main pixel blast particles */}
        {Array.from({ length: pixelCount }).map((_, i) => {
          const delay = Math.random() * 8;
          const duration = 3 + Math.random() * 4;
          const distance = 200 + Math.random() * 400;
          const angle = (Math.PI * 2 * i) / pixelCount + Math.random() * 0.5;
          const size = 2 + Math.random() * 6;
          
          return (
            <motion.div
              key={`pixel-${i}`}
              className="absolute rounded-sm"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: '50%',
                top: '50%',
                backgroundColor: i % 4 === 0 ? colors.primary.replace(/[0-9.]+\)/, '0.8)') : 
                                i % 4 === 1 ? colors.secondary.replace(/[0-9.]+\)/, '0.6)') : 
                                i % 4 === 2 ? colors.accent.replace(/[0-9.]+\)/, '0.7)') :
                                'rgba(255, 255, 255, 0.5)',
                x: springX,
                y: springY,
              }}
              animate={{
                x: [
                  0,
                  Math.cos(angle) * distance * intensityVal,
                  Math.cos(angle) * distance * intensityVal * 0.8
                ],
                y: [
                  0,
                  Math.sin(angle) * distance * intensityVal,
                  Math.sin(angle) * distance * intensityVal * 0.8 + 50
                ],
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1, 0.8, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: "easeOut",
              }}
            />
          );
        })}
        
        {/* Secondary explosion waves */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={`wave-${i}`}
            className="absolute border rounded-full"
            style={{
              left: '50%',
              top: '50%',
              width: '20px',
              height: '20px',
              borderColor: colors.primary.replace(/[0-9.]+\)/, '0.3)'),
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              width: ['20px', '600px', '800px'],
              height: ['20px', '600px', '800px'],
              opacity: [0.8, 0.2, 0],
              borderWidth: ['2px', '1px', '0px'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
          />
        ))}
        
        {/* Central glow effect */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-32 h-32 rounded-full blur-xl"
            style={{
              background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 50%, transparent 100%)`,
            }}
          />
        </motion.div>
        
        {/* Sparkling pixels */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 0.5 + Math.random() * 1,
              repeat: Infinity,
              delay: Math.random() * 8,
              repeatDelay: 2 + Math.random() * 4,
            }}
          />
        ))}
      </div>
    );
  };

  const renderParticles = () => {
    const colors = getThemeColors();
    const intensityVal = getIntensityValue();
    const particleCount = intensity === 'high' ? 50 : intensity === 'medium' ? 30 : 20;
    
    return (
      <div className="absolute inset-0">
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: i % 3 === 0 ? colors.primary.replace('0.1', '0.4') : 
                              i % 3 === 1 ? colors.secondary.replace('0.08', '0.3') : 
                              colors.accent.replace('0.05', '0.25'),
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, intensityVal, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  const renderEffect = () => {
    switch (type) {
      case 'dot-pattern':
        return renderDotPattern();
      case 'gradient-mesh':
        return renderGradientMesh();
      case 'particles':
        return renderParticles();
      case 'pixel-blast':
        return renderPixelBlast();
      case 'grid-motion':
      default:
        return renderGridMotion();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {renderEffect()}
    </div>
  );
}

// Floating particles component for hero section
export function FloatingParticles({ count = 20 }: { count?: number }) {
  const { theme } = useTheme();
  
  const getParticleColor = (index: number) => {
    const isDark = theme === 'dark';
    const colors = [
      isDark ? 'rgba(168, 85, 247, 0.6)' : 'rgba(79, 70, 229, 0.4)',
      isDark ? 'rgba(20, 184, 166, 0.4)' : 'rgba(16, 185, 129, 0.3)',
      isDark ? 'rgba(244, 63, 94, 0.3)' : 'rgba(239, 68, 68, 0.25)',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          <div
            className="w-2 h-2 rounded-full blur-sm"
            style={{
              backgroundColor: getParticleColor(i),
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
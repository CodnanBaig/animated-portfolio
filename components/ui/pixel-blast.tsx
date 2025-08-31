"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from 'next-themes';

interface PixelBlastProps {
  intensity?: 'subtle' | 'medium' | 'high';
  fullWidth?: boolean;
  className?: string;
  particleCount?: number;
  responsiveToMouse?: boolean;
}

export function PixelBlast({
  intensity = 'high',
  fullWidth = true,
  className = '',
  particleCount,
  responsiveToMouse = true
}: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getIntensityValue = () => {
    switch (intensity) {
      case 'subtle': return 0.4;
      case 'medium': return 0.7;
      case 'high': return 1.0;
      default: return 1.0;
    }
  };

  const getThemeColors = () => {
    const isDark = theme === 'dark';
    return {
      primary: isDark ? 'rgba(168, 85, 247, 0.9)' : 'rgba(79, 70, 229, 0.8)',
      secondary: isDark ? 'rgba(20, 184, 166, 0.7)' : 'rgba(16, 185, 129, 0.6)',
      accent: isDark ? 'rgba(244, 63, 94, 0.6)' : 'rgba(239, 68, 68, 0.5)',
      white: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.9)',
      wave: isDark ? 'rgba(168, 85, 247, 0.4)' : 'rgba(79, 70, 229, 0.3)',
    };
  };

  useEffect(() => {
    if (!responsiveToMouse || !isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      mouseX.set(x * 50);
      mouseY.set(y * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [responsiveToMouse, isMounted, mouseX, mouseY]);

  if (!isMounted) return null;

  const colors = getThemeColors();
  const intensityVal = getIntensityValue();
  const totalPixels = particleCount || (intensity === 'high' ? 150 : intensity === 'medium' ? 100 : 60);

  return (
    <div 
      ref={containerRef}
      className={`
        ${fullWidth ? 'fixed inset-0' : 'absolute inset-0'} 
        overflow-hidden pointer-events-none 
        ${className}
      `}
    >
      {/* Main pixel explosion */}
      {Array.from({ length: totalPixels }).map((_, i) => {
        const delay = Math.random() * 10;
        const duration = 4 + Math.random() * 6;
        const distance = 300 + Math.random() * 500;
        const angle = (Math.PI * 2 * i) / totalPixels + Math.random() * 1;
        const size = 2 + Math.random() * 8;
        const isSquare = Math.random() > 0.3;
        
        return (
          <motion.div
            key={`pixel-${i}`}
            className={`absolute ${isSquare ? 'rounded-sm' : 'rounded-full'}`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: '50%',
              top: '50%',
              backgroundColor: i % 5 === 0 ? colors.primary : 
                              i % 5 === 1 ? colors.secondary : 
                              i % 5 === 2 ? colors.accent :
                              i % 5 === 3 ? colors.white :
                              colors.primary,
            }}
            animate={{
              x: [
                0,
                Math.cos(angle) * distance * intensityVal,
                Math.cos(angle) * distance * intensityVal * 0.9
              ],
              y: [
                0,
                Math.sin(angle) * distance * intensityVal,
                Math.sin(angle) * distance * intensityVal * 0.9 + 80
              ],
              opacity: [0, 1, 0.9, 0],
              scale: [0, 1, 0.9, 0],
              rotate: [0, 270, 360],
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
      
      {/* Explosion rings */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute border-2 rounded-full"
          style={{
            left: '50%',
            top: '50%',
            width: '30px',
            height: '30px',
            borderColor: colors.wave,
            marginLeft: '-15px',
            marginTop: '-15px',
          }}
          animate={{
            width: ['30px', '800px', '1200px'],
            height: ['30px', '800px', '1200px'],
            marginLeft: ['-15px', '-400px', '-600px'],
            marginTop: ['-15px', '-400px', '-600px'],
            opacity: [0.8, 0.2, 0],
            borderWidth: ['2px', '1px', '0px'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1.2,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Central energy core */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [0.8, 2, 0.8],
          opacity: [0.9, 0.4, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-48 h-48 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 40%, ${colors.accent} 70%, transparent 100%)`,
          }}
        />
      </motion.div>
      
      {/* Secondary energy pulses */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`pulse-${i}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.6, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.75,
            ease: "easeOut",
          }}
        >
          <div
            className="w-24 h-24 rounded-full blur-lg"
            style={{
              background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      ))}
      
      {/* Twinkling stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 2, 0],
          }}
          transition={{
            duration: 0.8 + Math.random() * 1.5,
            repeat: Infinity,
            delay: Math.random() * 12,
            repeatDelay: 3 + Math.random() * 6,
          }}
        />
      ))}
    </div>
  );
}
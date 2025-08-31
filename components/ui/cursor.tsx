"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';

interface CursorProps {
  variant?: 'default' | 'pointer' | 'text' | 'splash' | 'magnetic' | 'target';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  trailEnabled?: boolean;
}

interface TargetCursorProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  gap?: number;
  animated?: boolean;
}

// Target Cursor Component
export function TargetCursor({ 
  size = 40, 
  color = 'rgb(168, 85, 247)', 
  strokeWidth = 2, 
  gap = 8,
  animated = true 
}: TargetCursorProps) {
  const center = size / 2;
  
  return (
    <svg 
      width={size} 
      height={size} 
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: '50%', top: '50%' }}
    >
      {/* Center dot */}
      <motion.circle
        cx={center}
        cy={center}
        r="2"
        fill={color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      />
      
      {/* Top line */}
      <motion.line
        x1={center}
        y1="0"
        x2={center}
        y2={center - gap}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: animated ? 0.3 : 0, delay: 0.1 }}
      />
      
      {/* Bottom line */}
      <motion.line
        x1={center}
        y1={size}
        x2={center}
        y2={center + gap}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: animated ? 0.3 : 0, delay: 0.2 }}
      />
      
      {/* Left line */}
      <motion.line
        x1="0"
        y1={center}
        x2={center - gap}
        y2={center}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: animated ? 0.3 : 0, delay: 0.3 }}
      />
      
      {/* Right line */}
      <motion.line
        x1={size}
        y1={center}
        x2={center + gap}
        y2={center}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: animated ? 0.3 : 0, delay: 0.4 }}
      />
      
      {/* Outer circle */}
      <motion.circle
        cx={center}
        cy={center}
        r={center - strokeWidth}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth / 2}
        opacity={0.3}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: animated ? 360 : 0 }}
        transition={{ 
          scale: { duration: 0.5, delay: 0.2 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
      />
    </svg>
  );
}

export function CustomCursor({ 
  variant = 'default', 
  size = 'md', 
  color, 
  trailEnabled = true 
}: CursorProps) {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);
  
  const trailCounter = useRef(0);

  const sizeMap = {
    sm: 8,
    md: 12,
    lg: 16
  };

  const getSizeFromVariant = (variant: string) => {
    switch (variant) {
      case 'pointer':
        return sizeMap.lg;
      case 'text':
        return sizeMap.sm;
      case 'splash':
        return sizeMap.lg * 2;
      case 'magnetic':
        return sizeMap.lg;
      case 'target':
        return 40; // Fixed size for target cursor
      default:
        return sizeMap[size];
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      if (trailEnabled && variant !== 'target') {
        setTrail(prev => {
          const newTrail = [
            { x: e.clientX, y: e.clientY, id: trailCounter.current++ },
            ...prev.slice(0, 8)
          ];
          return newTrail;
        });
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, select, [data-cursor="pointer"], [data-cursor="text"], [data-cursor="magnetic"]'
      );

      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          const cursorType = element.getAttribute('data-cursor') || 'pointer';
          const text = element.getAttribute('data-cursor-text') || '';
          setIsHovering(true);
          setCursorText(text);
          // Trigger cursor variant change
          element.setAttribute('data-cursor-active', 'true');
        });

        element.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
          element.removeAttribute('data-cursor-active');
        });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Set up interactive elements
    handleInteractiveElements();

    // Re-run when DOM changes
    const observer = new MutationObserver(handleInteractiveElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [cursorX, cursorY, trailEnabled, variant]);

  const getCursorColor = () => {
    if (color) return color;
    if (theme === 'dark') return 'rgb(168, 85, 247)'; // purple-500
    return 'rgb(79, 70, 229)'; // indigo-600
  };

  const getCursorVariant = () => {
    if (isHovering && variant !== 'target') {
      return {
        scale: 1.5,
        backgroundColor: getCursorColor(),
        border: `2px solid ${getCursorColor()}`,
        mixBlendMode: 'difference' as const,
      };
    }
    
    switch (variant) {
      case 'pointer':
        return {
          scale: 1.2,
          backgroundColor: 'transparent',
          border: `2px solid ${getCursorColor()}`,
        };
      case 'text':
        return {
          scale: 0.8,
          backgroundColor: getCursorColor(),
          border: 'none',
        };
      case 'splash':
        return {
          scale: 2,
          backgroundColor: 'transparent',
          border: `1px solid ${getCursorColor()}`,
          boxShadow: `0 0 20px ${getCursorColor()}30`,
        };
      case 'magnetic':
        return {
          scale: 1.3,
          backgroundColor: getCursorColor(),
          border: `2px solid ${getCursorColor()}`,
          boxShadow: `0 0 15px ${getCursorColor()}50`,
        };
      case 'target':
        return {
          scale: isHovering ? 1.2 : 1,
          backgroundColor: 'transparent',
          border: 'none',
        };
      default:
        return {
          scale: 1,
          backgroundColor: getCursorColor(),
          border: 'none',
        };
    }
  };

  // Hide default cursor
  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Trail effect */}
      {trailEnabled && variant !== 'target' && (
        <div className="fixed inset-0 pointer-events-none z-[9998]">
          {trail.map((point, index) => (
            <motion.div
              key={point.id}
              style={{
                position: 'absolute',
                left: point.x - 2,
                top: point.y - 2,
                width: 4,
                height: 4,
                borderRadius: '50%',
                backgroundColor: getCursorColor(),
              }}
              initial={{ opacity: 0.8, scale: 1 }}
              animate={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            />
          ))}
        </div>
      )}

      {/* Main cursor */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            style={{
              position: 'fixed',
              left: x,
              top: y,
              width: getSizeFromVariant(variant),
              height: getSizeFromVariant(variant),
              pointerEvents: 'none',
              zIndex: 9999,
              mixBlendMode: variant === 'target' ? 'normal' : 'difference',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              ...getCursorVariant()
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          >
            {variant === 'target' ? (
              <TargetCursor color={getCursorColor()} animated={true} />
            ) : (
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  ...getCursorVariant()
                }}
              >
                {cursorText && (
                  <motion.span
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'white',
                      padding: '4px 8px',
                      whiteSpace: 'nowrap'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {cursorText}
                  </motion.span>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Hook for magnetic effect
export function useMagnetic(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}
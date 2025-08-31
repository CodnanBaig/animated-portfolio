"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import { BackgroundEffects, FloatingParticles } from '@/components/ui/background-effects';
import { PixelBlast } from '@/components/ui/pixel-blast';
import { useMagnetic } from '@/components/ui/cursor';

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  
  // Magnetic button refs
  const primaryButtonRef = useMagnetic(0.5);
  const secondaryButtonRef = useMagnetic(0.3);
  
  // Mouse tracking for enhanced interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        mouseX.set((e.clientX - centerX) * 0.01);
        mouseY.set((e.clientY - centerY) * 0.01);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Pixel Blast Background - Full Width */}
      <PixelBlast 
        intensity="high" 
        fullWidth={true}
        responsiveToMouse={true}
        className="z-0"
      />
      
      {/* Reduced floating particles to not compete with pixel blast */}
      <FloatingParticles count={8} />
      
      {/* Subtle gradient overlay to ensure text readability */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/20 z-[1]"
        style={{
          x: springX,
          y: springY,
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
        {isMounted && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl mb-4 font-mono text-purple-500"
            >
              Hi, I&apos;m Adnan Baig _
            </motion.p>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6 relative"
              style={{
                x: springX,
                y: springY,
              }}
            >
              I build{" "}
              <motion.span 
                className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                <Typewriter
                  words={[
                    'smart web apps',
                    'AI-powered tools',
                    'future tech',
                    'innovative solutions',
                    'modern experiences'
                  ]}
                  loop={0}
                  cursor
                  cursorBlinking
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={70}
                  delaySpeed={1500}
                />
              </motion.span>
              <br />with code and AI.
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              A passionate developer crafting intelligent web applications using cutting-edge technologies.
              Specializing in AI integration, modern web frameworks, and creating seamless user experiences.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                ref={primaryButtonRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                  data-cursor="magnetic"
                  data-cursor-text="Explore Projects"
                >
                  <Link href="/projects">
                    <span className="relative z-10 flex items-center">
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                ref={secondaryButtonRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group relative overflow-hidden border-2 hover:bg-primary/5 transition-all duration-300"
                  data-cursor="magnetic"
                  data-cursor-text="Get Resume"
                >
                  <Download className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
                  <span>Download CV</span>
                  <motion.div
                    className="absolute inset-0 border-2 border-primary/30 rounded-lg"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0, 0.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer group"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToNextSection}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor="pointer"
        data-cursor-text="Scroll Down"
      >
        <motion.div className="relative">
          <ChevronDown className="h-10 w-10 text-muted-foreground/50 group-hover:text-primary transition-colors" />
          <motion.div
            className="absolute inset-0 border-2 border-primary/30 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
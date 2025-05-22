"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';
import { ChevronDown, Download } from 'lucide-react';

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-transparent z-0" />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full grid grid-cols-6 opacity-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-full border-r border-primary/20" />
          ))}
        </div>
        <div className="w-full h-full grid grid-rows-6 opacity-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full border-b border-primary/20" />
          ))}
        </div>
      </div>
      
      {/* Glow effect */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-500/20 blur-3xl z-0"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.2, 0.3, 0.2] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl z-0"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.2, 0.3, 0.2] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1 
        }}
      />
      
      <div className="container flex flex-col items-center text-center relative z-10">
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
              Hi, I'm Adnan Baig _
            </motion.p>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              I build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500">
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
              </span>
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
              <Button asChild size="lg">
                <Link href="/projects">View My Work</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={scrollToNextSection}
      >
        <ChevronDown className="h-10 w-10 text-muted-foreground/50" />
      </motion.div>
    </section>
  );
}
"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  
  return (
    <section ref={ref} className="py-32 bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-20 bg-grid-white/5" />
        <div 
          className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
        />
        <div 
          className="absolute top-0 -right-40 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"
        />
        <div 
          className="absolute bottom-0 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"
        />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Ready to Build Something
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              {" "}Amazing?
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-muted-foreground mb-8"
          >
            Let&apos;s discuss how we can bring your ideas to life with the 
            power of AI and modern web development.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <Button asChild size="lg">
              <Link href="/contact">
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
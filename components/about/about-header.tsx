"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Github, Linkedin, Mail } from 'lucide-react';

export function AboutHeader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Me</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          I&apos;m a passionate developer focused on building AI-integrated web applications
          that solve real-world problems. With a blend of technical expertise and
          creative problem-solving, I craft digital experiences that stand out.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <Button asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Link>
          </Button>
        </div>
        
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-square rounded-lg overflow-hidden border border-border"
      >
        <Image
          src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg"
          alt="Developer portrait"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="font-mono text-sm">
            <div className="text-red-500">{/* Skills */}</div>
            <div className="text-white">const skills = [</div>
            <div className="text-green-400 pl-4">&apos;Frontend Development&apos;,</div>
            <div className="text-green-400 pl-4">&apos;AI Integration&apos;,</div>
            <div className="text-green-400 pl-4">&apos;UI/UX Design&apos;,</div>
            <div className="text-green-400 pl-4">&apos;Backend Architecture&apos;</div>
            <div className="text-white">];</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
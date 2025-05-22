"use client";

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function ProjectsHeader() {
  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Projects</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A showcase of my work in web development, AI integration, and digital solutions.
          Each project reflects my passion for combining code and artificial intelligence.
        </p>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10"
          />
        </div>
      </motion.div>
    </div>
  );
}
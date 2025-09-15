"use client";

import { motion } from 'framer-motion';

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
        <p className="text-xl text-muted-foreground">
          A showcase of my work in web development, AI integration, and digital solutions.
          Each project reflects my passion for combining code and artificial intelligence.
        </p>
      </motion.div>
    </div>
  );
}
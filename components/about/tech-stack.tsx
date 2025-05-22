"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  SiNextdotjs, SiReact, SiNodedotjs, SiTypescript, 
  SiTailwindcss, SiMongodb, SiOpenai, SiVercel
} from '@/components/icons';

// Define tech stacks
const techStacks = [
  {
    category: "Frontend",
    technologies: [
      { name: "React", icon: <SiReact className="h-8 w-8 text-blue-500" /> },
      { name: "Next.js", icon: <SiNextdotjs className="h-8 w-8" /> },
      { name: "TypeScript", icon: <SiTypescript className="h-8 w-8 text-blue-600" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="h-8 w-8 text-teal-500" /> }
    ]
  },
  {
    category: "Backend",
    technologies: [
      { name: "Node.js", icon: <SiNodedotjs className="h-8 w-8 text-green-600" /> },
      { name: "MongoDB", icon: <SiMongodb className="h-8 w-8 text-green-500" /> }
    ]
  },
  {
    category: "AI & Tools",
    technologies: [
      { name: "OpenAI", icon: <SiOpenai className="h-8 w-8" /> },
      { name: "Ollama", icon: <span className="font-mono text-xl">🦙</span> },
      { name: "Cursor AI", icon: <span className="font-mono text-xl">⌨️</span> },
      { name: "Vercel", icon: <SiVercel className="h-8 w-8" /> }
    ]
  }
];

export function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section ref={ref} className="mb-16">
      <h2 className="text-2xl font-bold mb-8">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Tech</span> Stack
      </h2>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {techStacks.map((stack, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">{stack.category}</h3>
                <div className="grid grid-cols-2 gap-6">
                  {stack.technologies.map((tech, j) => (
                    <div key={j} className="flex flex-col items-center text-center">
                      <div className="mb-2 flex justify-center items-center h-12">
                        {tech.icon}
                      </div>
                      <span className="text-sm font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
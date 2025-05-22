"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Stars, Terminal, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AboutSection() {
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

  const tools = [
    { name: "Cursor AI", icon: <Sparkles className="h-4 w-4" /> },
    { name: "Mistral", icon: <Stars className="h-4 w-4" /> },
    { name: "Ollama", icon: <Terminal className="h-4 w-4" /> },
    { name: "Next.js", icon: <Lightbulb className="h-4 w-4" /> },
  ];
  
  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="w-full h-full bg-[url('/grid.svg')] bg-repeat bg-center" />
      </div>
      
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
              About Me
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Transforming Ideas Into Reality With AI
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm a passionate web developer specializing in creating 
              modern, efficient applications with the power of AI. My journey
              has taken me from frontend development to full-stack mastery,
              and now I'm pioneering the integration of AI tools to supercharge
              the development workflow.
            </p>
            
            <div className="mb-8">
              <h4 className="font-semibold mb-3">Tools I Work With:</h4>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1">
                    <span className="flex items-center gap-1.5">
                      {tool.icon}
                      {tool.name}
                    </span>
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-1">5+</h4>
                  <p className="text-muted-foreground text-sm">Years of experience</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold mb-1">50+</h4>
                  <p className="text-muted-foreground text-sm">Projects completed</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="relative rounded-lg overflow-hidden aspect-square border border-border bg-card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-500/10" />
            
            <Image
              src="https://images.pexels.com/photos/2102416/pexels-photo-2102416.jpeg"
              alt="Developer working with code"
              fill
              className="object-cover rounded-lg"
            />
            
            {/* Code snippet overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 backdrop-blur-sm font-mono text-xs text-green-400 overflow-hidden">
              <div className="mb-2 text-white">
                <span className="text-purple-400">const</span> <span className="text-yellow-400">developer</span> = {"{"}
              </div>
              <div className="pl-4">
                <span className="text-blue-400">skills</span>: [<span className="text-orange-400">'NextJS'</span>, <span className="text-orange-400">'React'</span>, <span className="text-orange-400">'AI Integration'</span>],
              </div>
              <div className="pl-4">
                <span className="text-blue-400">passion</span>: <span className="text-orange-400">'Building the future with code and AI'</span>
              </div>
              <div>{"}"}</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
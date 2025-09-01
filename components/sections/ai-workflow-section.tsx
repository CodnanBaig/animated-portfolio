"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Lightbulb, Code, Brain, Rocket, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AIWorkflowSection() {
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
  
  const workflowSteps = [
    {
      title: "Ideation",
      description: "Transform ideas into structured plans with AI assistance for research and concept refinement.",
      icon: <Lightbulb className="h-8 w-8 text-red-500" />,
      tools: ["Cursor AI", "ChatGPT"]
    },
    {
      title: "Rapid Prototyping",
      description: "Generate UI components and baseline code structure with AI-augmented development.",
      icon: <Code className="h-8 w-8 text-foreground" />,
      tools: ["Cursor AI", "shadcn/ui", "GitHub Copilot"]
    },
    {
      title: "Backend Logic",
      description: "Build robust API endpoints and database schemas with AI-optimized code generation.",
      icon: <Brain className="h-8 w-8 text-foreground" />,
      tools: ["Mistral", "Ollama", "Next.js API Routes"]
    },
    {
      title: "Deployment",
      description: "Streamline testing, optimization, and deployment using AI-powered workflows.",
      icon: <Rocket className="h-8 w-8 text-foreground" />,
      tools: ["Vercel", "GitHub Actions", "Mistral"]
    },
  ];
  
  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Animated background accent */}
      <motion.div 
        className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-red-500/10 blur-3xl z-0"
        animate={{ 
          x: [0, 50, 0], 
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-muted-foreground/10 blur-3xl z-0"
        animate={{ 
          x: [0, -50, 0], 
          opacity: [0.1, 0.2, 0.1] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 2
        }}
      />
      
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
            AI isn&apos;t replacing devs. 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
              {" "}It&apos;s giving us superpowers.
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
            My development workflow integrates AI at every stage, dramatically 
            increasing productivity and allowing me to focus on creativity and problem-solving
            rather than repetitive tasks.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6"
        >
          {workflowSteps.map((step, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="border border-border overflow-hidden relative">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-12">
                    <div className="col-span-3 bg-card p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-border">
                      <div className="text-center">
                        <div className="mb-3 flex justify-center">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{`Step ${i + 1}`}</p>
                      </div>
                    </div>
                    
                    <div className="col-span-9 p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-3">
                          <p className="text-sm md:text-base">{step.description}</p>
                        </div>
                        
                        <div className="lg:col-span-2 flex flex-col justify-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Tools Used:</p>
                            <ul className="text-sm text-muted-foreground">
                              {step.tools.map((tool, j) => (
                                <li key={j} className="flex items-center">
                                  <ChevronRight className="h-3 w-3 mr-1 text-red-500" />
                                  {tool}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 text-center"
        >
          <p className="text-lg font-medium text-muted-foreground">
            Result: 3-5x faster development with higher quality code.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
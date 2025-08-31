"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles, Stars, Terminal, Lightbulb, Code, Zap, Brain, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BackgroundEffects } from '@/components/ui/background-effects';
import { useMagnetic } from '@/components/ui/cursor';

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const magneticRef = useMagnetic(0.3);
  
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

  const timeline = [
    {
      year: '2024',
      title: 'AI Integration Specialist',
      description: 'Leading AI-powered development workflows',
      icon: <Brain className="h-4 w-4" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      year: '2023',
      title: 'Full-Stack Mastery',
      description: 'Advanced React, Next.js, and backend technologies',
      icon: <Rocket className="h-4 w-4" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      year: '2022',
      title: 'Modern Web Development',
      description: 'Specializing in responsive and performant web apps',
      icon: <Code className="h-4 w-4" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      year: '2020',
      title: 'Development Journey Begins',
      description: 'Started with JavaScript and web fundamentals',
      icon: <Zap className="h-4 w-4" />,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const tools = [
    { 
      name: "Cursor AI", 
      icon: <Sparkles className="h-4 w-4" />,
      description: "AI-powered code editor",
      color: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    { 
      name: "Mistral", 
      icon: <Stars className="h-4 w-4" />,
      description: "Advanced language model",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    { 
      name: "Ollama", 
      icon: <Terminal className="h-4 w-4" />,
      description: "Local AI model runner",
      color: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    { 
      name: "Next.js", 
      icon: <Lightbulb className="h-4 w-4" />,
      description: "React framework",
      color: "bg-gradient-to-r from-orange-500 to-red-500"
    },
  ];
  
  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <BackgroundEffects 
        type="gradient-mesh" 
        intensity="subtle" 
        responsiveToMouse={true}
        className="opacity-20"
      />
      
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
              About Me
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-6">
              Transforming Ideas Into Reality With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
                AI
              </span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              I'm a passionate web developer specializing in creating modern, efficient applications 
              with the power of AI. My journey has taken me from frontend development to full-stack mastery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Interactive Timeline */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full" />
                Professional Journey
              </h4>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-teal-500 opacity-30" />
                
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      className="relative flex items-start gap-4 group"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: index * 0.1 }
                        }
                      }}
                      whileHover={{ x: 8 }}
                      data-cursor="pointer"
                    >
                      {/* Timeline Dot */}
                      <motion.div 
                        className={`relative z-10 w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white shadow-lg`}
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(168, 85, 247, 0.3)',
                            '0 0 0 10px rgba(168, 85, 247, 0)',
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.3
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      
                      {/* Timeline Content */}
                      <div className="flex-1 bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 group-hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 text-xs font-mono bg-gradient-to-r ${item.color} text-white rounded`}>
                            {item.year}
                          </span>
                        </div>
                        <h5 className="font-semibold mb-1">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Enhanced Tools & Stats */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Interactive Tools */}
              <div>
                <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  Tools I Master
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {tools.map((tool, i) => (
                    <motion.div
                      key={tool.name}
                      className="relative group cursor-pointer"
                      onMouseEnter={() => setHoveredTool(tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor="magnetic"
                      data-cursor-text={tool.description}
                    >
                      <div className={`absolute inset-0 ${tool.color} rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-xl`} />
                      <Badge 
                        variant="secondary" 
                        className={`
                          relative w-full h-16 flex flex-col items-center justify-center gap-1 
                          bg-card/50 backdrop-blur-sm border border-border/50 
                          group-hover:border-primary/30 transition-all duration-300
                          ${hoveredTool === tool.name ? 'shadow-lg' : ''}
                        `}
                      >
                        <motion.div
                          animate={hoveredTool === tool.name ? {
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          } : {}}
                          transition={{ duration: 0.3 }}
                        >
                          {tool.icon}
                        </motion.div>
                        <span className="text-xs font-medium">{tool.name}</span>
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  ref={magneticRef}
                  whileHover={{ scale: 1.02 }}
                  data-cursor="magnetic"
                >
                  <Card className="relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-6 relative z-10">
                      <motion.h4 
                        className="text-2xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                        style={{ backgroundSize: '200% 200%' }}
                      >
                        5+
                      </motion.h4>
                      <p className="text-muted-foreground text-sm">Years of experience</p>
                    </CardContent>
                  </Card>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  data-cursor="magnetic"
                >
                  <Card className="relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <CardContent className="p-6 relative z-10">
                      <motion.h4 
                        className="text-2xl font-bold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500"
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: 0.5
                        }}
                        style={{ backgroundSize: '200% 200%' }}
                      >
                        50+
                      </motion.h4>
                      <p className="text-muted-foreground text-sm">Projects completed</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              
              {/* Code Visualization */}
              <motion.div
                className="relative rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 p-4"
                whileHover={{ scale: 1.01 }}
              >
                <div className="font-mono text-sm space-y-1">
                  <div className="text-muted-foreground">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-yellow-400">developer</span>{" "}
                    <span className="text-white">=</span>{" "}
                    <span className="text-white">{'{'}</span>
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    <span className="text-blue-400">passion</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-green-400">'Building the future'</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="pl-4 text-muted-foreground">
                    <span className="text-blue-400">focus</span>
                    <span className="text-white">:</span>{" "}
                    <span className="text-green-400">'AI + Code'</span>
                  </div>
                  <div className="text-white">{'};'}</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
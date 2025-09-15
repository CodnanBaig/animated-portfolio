"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const journeySteps = [
  {
    year: "2021",
    title: "Introduction to Coding",
    description: "Discovered my passion for programming with Python, transitioning from my background in acting and music."
  },
  {
    year: "2022",
    title: "Frontend Developer",
    description: "Became a frontend developer specializing in Angular, building interactive user interfaces and web applications."
  },
  {
    year: "2023",
    title: "Full Stack Developer",
    description: "Completed Full Stack Development course from Masai School and grew into a comprehensive full stack developer."
  },
  {
    year: "2024",
    title: "Team Lead & Project Manager",
    description: "Started managing teams and taking ownership of entire projects, expanding beyond individual development work."
  },
  {
    year: "2025",
    title: "AI-Enhanced Development",
    description: "Began leveraging AI tools and technologies to accelerate development processes and enhance productivity."
  }
];

export function JourneyTimeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref} className="mb-16">
      <h2 className="text-2xl font-bold mb-8">
        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Journey</span>
      </h2>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] md:left-1/2 ml-[1px] md:-ml-[1px] top-0 bottom-0 w-[2px] bg-border" />
        
        <div className="space-y-12">
          {journeySteps.map((step, i) => (
            <div key={i} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex md:items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Year marker */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground z-10">
                  <span className="text-xs font-bold">{step.year}</span>
                </div>
                
                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Empty space for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
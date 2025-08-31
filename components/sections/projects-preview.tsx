"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InteractiveProjectCard } from '@/components/ui/interactive-project-card';
import { BackgroundEffects } from '@/components/ui/background-effects';

export function ProjectsPreview() {
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
  
  const featuredProjects = [
    {
      title: "ResumAI",
      description: "AI-powered resume builder that generates tailored content and formats based on job descriptions.",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
      tags: ["AI", "Next.js", "OpenAI API"],
      link: "/projects/resumai"
    },
    {
      title: "CodeBuddy",
      description: "Pair programming assistant using Ollama to provide real-time code suggestions and refactoring.",
      image: "https://images.pexels.com/photos/7367/startup-photos.jpg",
      tags: ["AI", "Ollama", "React"],
      link: "/projects/codebuddy"
    },
    {
      title: "DataViz Dashboard",
      description: "Real-time data visualization platform with AI-powered insights and trend analysis.",
      image: "https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg",
      tags: ["Data", "Charts", "Next.js"],
      link: "/projects/dataviz"
    }
  ];
  
  return (
    <section ref={ref} className="py-24 bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects 
        type="dot-pattern" 
        intensity="subtle" 
        responsiveToMouse={true}
        className="opacity-30"
      />
      
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Projects</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
            Explore some of my recent work showcasing the power of AI-integrated development.
            Each project demonstrates how innovative solutions can solve real-world problems.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuredProjects.map((project, i) => (
            <motion.div key={i} variants={itemVariants}>
              <InteractiveProjectCard
                project={{
                  id: project.title.toLowerCase().replace(/\s+/g, '-'),
                  title: project.title,
                  description: project.description,
                  image: project.image,
                  categories: project.tags,
                  technologies: project.tags,
                  liveUrl: project.link,
                  githubUrl: project.link,
                }}
                hoverEffect={i % 3 === 0 ? 'tilt' : i % 3 === 1 ? 'lift' : 'glow'}
                imageReveal={i % 3 === 0 ? 'zoom' : i % 3 === 1 ? 'slide' : 'morph'}
                interaction={i % 2 === 0 ? 'magnetic' : 'ripple'}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 text-center"
        >
          <Button 
            asChild 
            size="lg" 
            className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            data-cursor="magnetic"
            data-cursor-text="View All Projects"
          >
            <Link href="/projects">
              <span>View All Projects</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
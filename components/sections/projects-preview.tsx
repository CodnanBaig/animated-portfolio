"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCardActions } from '@/components/ui/project-card-actions';
import { projectsData } from '@/lib/projects-data';
import type { Project } from '@/types';

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
  
  // Use actual project data. If any are marked as featured, prefer them; otherwise first three.
  const featuredProjects = projectsData.filter((p: Project) => p.featured);
  const displayProjects: Project[] = featuredProjects.length > 0 ? featuredProjects.slice(0, 3) : projectsData.slice(0, 3);
  
  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background handled globally via ReactBits particles */}
      
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
          {displayProjects.map((project: Project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCardActions
                project={{
                  id: project.id,
                  title: project.title,
                  description: project.description,
                  image: project.image,
                  categories: project.categories ?? [],
                  technologies: project.technologies,
                  liveUrl: project.liveUrl,
                  githubUrl: project.githubUrl,
                }}
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
            className="group bg-red-500 hover:bg-red-600"
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
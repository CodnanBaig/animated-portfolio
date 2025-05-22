"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    <section ref={ref} className="py-24 bg-background">
      <div className="container">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProjects.map((project, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Link href={project.link} className="block h-full">
                <Card className="overflow-hidden h-full transition-transform hover:translate-y-[-4px] hover:shadow-lg">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, j) => (
                        <Badge key={j} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="text-primary font-medium inline-flex items-center">
                      View Project <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-12 text-center"
        >
          <Button asChild size="lg">
            <Link href="/projects">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
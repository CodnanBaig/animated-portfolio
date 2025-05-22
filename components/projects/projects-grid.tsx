"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/lib/projects-data';

const categories = [
  "All",
  "AI Integration",
  "Web App",
  "Mobile",
  "Data Visualization"
];

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.categories.includes(activeCategory));
  
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category, i) => (
          <Button
            key={i}
            variant={category === activeCategory ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="overflow-hidden h-full flex flex-col border-border hover:shadow-md transition-shadow">
              <div className="aspect-video relative overflow-hidden group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Link href={`/projects/${project.id}`}>
                    <Button variant="outline" size="sm" className="mr-2">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
              
              <CardContent className="flex-grow p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.categories.map((category, j) => (
                    <Badge key={j} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, k) => (
                    <Badge key={k} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0 border-t border-border mt-auto">
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
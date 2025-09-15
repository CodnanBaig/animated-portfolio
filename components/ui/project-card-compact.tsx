"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface CompactProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    categories: string[];
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
  };
  className?: string;
}

export function ProjectCardCompact({ project, className = '' }: CompactProjectCardProps) {
  const isProfessional = project.categories?.includes('Professional');

  return (
    <div className={`rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="relative aspect-video">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute top-3 left-3 flex gap-2">
          {project.categories?.slice(0, 2).map((cat) => (
            <Badge key={cat} variant="secondary" className="bg-black/50 text-white">
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">
            <Link href={`/projects/${project.id}`} className="hover:underline">
              {project.title}
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies?.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button asChild className="w-full">
            <Link href={`/projects/${project.id}`} className="cursor-pointer">
              View Details
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          <div className="flex gap-2">
            {project.liveUrl && (
              <Button asChild variant="outline" className="w-full">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer inline-flex items-center justify-center w-full">
                  <ExternalLink className="h-4 w-4 mr-2" /> Live
                </a>
              </Button>
            )}
            {!isProfessional && project.githubUrl && (
              <Button asChild variant="outline" className="w-full">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="cursor-pointer inline-flex items-center justify-center w-full">
                  <Github className="h-4 w-4 mr-2" /> Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCardCompact;



"use client";

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/lib/projects-data';
import { ProjectCardActions } from '@/components/ui/project-card-actions';

interface ProjectsMasonryProps {
  query?: string;
  columns?: 1 | 2 | 3;
}

export function ProjectsMasonry({ query = '', columns = 3 }: ProjectsMasonryProps) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projectsData;
    return projectsData.filter(p => {
      const hay = `${p.title} ${p.description} ${(p.technologies || []).join(' ')} ${(p.categories || []).join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="[column-fill:_balance] gap-6"
      style={{ columnCount: columns, columnGap: '1.5rem' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filtered.map((project) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          className="mb-6 break-inside-avoid"
          layout
          layoutId={`masonry-${project.id}`}
        >
          <ProjectCardActions project={project} />
        </motion.div>
      ))}
      {filtered.length === 0 && (
        <div className="text-center text-muted-foreground py-16">No projects match your search.</div>
      )}
    </motion.div>
  );
}

export default ProjectsMasonry;



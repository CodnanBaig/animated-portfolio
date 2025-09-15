"use client";

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '@/lib/projects-data';
import { ProjectCardActions } from '@/components/ui/project-card-actions';

interface ProjectsMasonryGroupedProps {
  query?: string;
  columns?: 1 | 2 | 3;
}

function Section({ title, items, columns }: { title: string; items: typeof projectsData; columns: 1 | 2 | 3 }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/80 py-2">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="text-sm text-muted-foreground">{items.length} project{items.length !== 1 ? 's' : ''}</div>
      </div>
      {items.length > 0 ? (
        <motion.div
          className="[column-fill:_balance] gap-6"
          style={{ columnCount: columns, columnGap: '1.5rem' }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((project, idx) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="mb-6 break-inside-avoid"
              layout
              layoutId={`gm-${title}-${project.id}`}
            >
              <ProjectCardActions project={project} aspect={idx % 5 === 0 ? 'wide' : idx % 3 === 0 ? 'square' : 'video'} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No {title.toLowerCase()} projects found</h3>
          <p className="text-muted-foreground">Nothing to show here yet.</p>
        </motion.div>
      )}
    </div>
  );
}

export function ProjectsMasonryGrouped({ query = '', columns = 3 }: ProjectsMasonryGroupedProps) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projectsData;
    return projectsData.filter(p => {
      const hay = `${p.title} ${p.description} ${(p.technologies || []).join(' ')} ${(p.categories || []).join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  const professional = filtered.filter(p => p.categories?.includes('Professional'));
  const personal = filtered.filter(p => p.categories?.includes('Personal'));

  return (
    <div className="space-y-12">
      <Section title="Professional" items={professional} columns={columns} />
      <Section title="Personal" items={personal} columns={columns} />
    </div>
  );
}

export default ProjectsMasonryGrouped;



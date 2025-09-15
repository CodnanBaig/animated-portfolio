"use client";

import { motion } from 'framer-motion';
import { ProjectCardActions } from '@/components/ui/project-card-actions';
import { projectsData } from '@/lib/projects-data';
import { useInView } from 'react-intersection-observer';

export function ProjectsGrid() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Group projects by category
  const professionalProjects = projectsData.filter(p => p.categories?.includes("Professional"));
  const personalProjects = projectsData.filter(p => p.categories?.includes("Personal"));
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  return (
    <div className="space-y-12">
      {/* Professional Projects */}
      <motion.div ref={ref} className="space-y-4">
        <motion.div
          className="flex items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-2xl font-semibold">Professional</h2>
          <div className="text-sm text-muted-foreground">{professionalProjects.length} project{professionalProjects.length !== 1 ? 's' : ''}</div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {professionalProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              layoutId={project.id}
            >
              <ProjectCardActions project={project} />
            </motion.div>
          ))}
        </motion.div>
        {/* Empty state */}
        {professionalProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No professional projects found</h3>
            <p className="text-muted-foreground">
              Nothing to show here yet.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Personal Projects */}
      <motion.div className="space-y-4">
        <motion.div
          className="flex items-center justify-between"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-2xl font-semibold">Personal</h2>
          <div className="text-sm text-muted-foreground">{personalProjects.length} project{personalProjects.length !== 1 ? 's' : ''}</div>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {personalProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              layoutId={project.id}
            >
              <ProjectCardActions project={project} />
            </motion.div>
          ))}
        </motion.div>

        {personalProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No personal projects found</h3>
            <p className="text-muted-foreground">Nothing to show here yet.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
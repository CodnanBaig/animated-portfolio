"use client";

import { motion } from 'framer-motion';
import { InteractiveProjectCard } from '@/components/ui/interactive-project-card';
import { projectsData } from '@/lib/projects-data';
import { useInView } from 'react-intersection-observer';

export function ProjectsGrid() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Show only the resumeai project
  const filteredProjects = projectsData.filter(project => project.id === "resumai");
  
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
    <div className="space-y-8">
      {/* Project Grid */}
      <motion.div ref={ref} className="space-y-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              layoutId={project.id}
            >
              <InteractiveProjectCard
                project={project}
                hoverEffect={index % 3 === 0 ? 'tilt' : index % 3 === 1 ? 'lift' : 'glow'}
                imageReveal={index % 3 === 0 ? 'zoom' : index % 3 === 1 ? 'slide' : 'morph'}
                interaction={index % 2 === 0 ? 'magnetic' : 'ripple'}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">
              No projects match the selected category. Try selecting a different filter.
            </p>
          </motion.div>
        )}
      </motion.div>
      
      {/* Stats */}
      {filteredProjects.length > 0 && (
        <motion.div
          className="flex items-center justify-center gap-6 pt-8 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-muted-foreground" />
            <span>Interactive cards with React Bits styling</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
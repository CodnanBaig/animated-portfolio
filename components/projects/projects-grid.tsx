"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InteractiveProjectCard } from '@/components/ui/interactive-project-card';
import { projectsData } from '@/lib/projects-data';
import { useInView } from 'react-intersection-observer';

const categories = [
  "All",
  "AI Integration",
  "Web App",
  "Mobile",
  "Data Visualization"
];

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  const filteredProjects = activeCategory === "All"
    ? projectsData
    : projectsData.filter(project => project.categories.includes(activeCategory));

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsAnimating(false);
    }, 150);
  };
  
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
  
  const filterVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
  };
  
  return (
    <div className="space-y-8">
      {/* Enhanced Filter Buttons */}
      <motion.div 
        className="flex flex-wrap gap-3 mb-8"
        variants={filterVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {categories.map((category, i) => {
          const isActive = category === activeCategory;
          const count = category === "All" 
            ? projectsData.length 
            : projectsData.filter(p => p.categories.includes(category)).length;
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`
                  relative group transition-all duration-300 overflow-hidden
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg' 
                    : 'hover:bg-primary/10 hover:border-primary/50'
                  }
                `}
                data-cursor="pointer"
                data-cursor-text={`Filter ${category}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {category}
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className={`
                      text-xs px-1.5 py-0 h-5
                      ${isActive ? 'bg-white/20 text-white border-white/30' : ''}
                    `}
                  >
                    {count}
                  </Badge>
                </span>
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
      {/* Enhanced Project Grid with Masonry-style Layout */}
      <motion.div ref={ref} className="space-y-4">
        <AnimatePresence mode="wait">
          {!isAnimating && (
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${activeCategory}-${project.id}`}
                  variants={itemVariants}
                  layout
                  layoutId={project.id}
                  className={`
                    ${index === 0 && filteredProjects.length > 3 ? 'md:col-span-2 lg:col-span-2' : ''}
                    ${index === 1 && filteredProjects.length > 5 ? 'lg:row-span-2' : ''}
                  `}
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
          )}
        </AnimatePresence>
        
        {/* Loading animation during category switch */}
        {isAnimating && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={`skeleton-${index}`}
                className="aspect-[4/5] bg-card border border-border rounded-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
        
        {/* Empty state */}
        {filteredProjects.length === 0 && !isAnimating && (
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
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Interactive cards with React Bits styling</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
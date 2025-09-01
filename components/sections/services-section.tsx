"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Code, Brain, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export function ServicesSection() {
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
  
  const services = [
    {
      title: "Rapid MVP Development",
      description: "From concept to functional prototype in days, not weeks. AI-assisted development for quick market validation and investor demos.",
      icon: <Rocket className="h-12 w-12 text-purple-500" />,
    },
    {
      title: "AI-Powered Web Apps",
      description: "Custom applications with integrated AI capabilities like content generation, data analysis, and personalized recommendations.",
      icon: <Brain className="h-12 w-12 text-teal-500" />,
    },
    {
      title: "Full-Stack Development",
      description: "End-to-end solutions with beautiful UIs and robust backend infrastructure. Expertise in React, Next.js, Node.js, and modern databases.",
      icon: <Code className="h-12 w-12 text-blue-500" />,
    },
    {
      title: "Cloud Integration",
      description: "Seamless deployment and scaling with modern cloud infrastructure. Optimization for performance, cost, and reliability.",
      icon: <Cloud className="h-12 w-12 text-yellow-500" />,
    },
  ];
  
  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] z-0" />
      
      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">
              Services
            </span> I Offer
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg">
            Specialized development services that leverage the latest AI technologies
            to build outstanding web applications that stand out in the market.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow border border-border">
                <CardHeader className="pb-2">
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-16 max-w-4xl mx-auto"
        >
          <motion.div 
            variants={itemVariants}
            className="p-8 rounded-lg bg-gradient-to-r from-purple-900/20 to-teal-900/20 border border-border"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Need a custom solution?</h3>
              <p className="text-muted-foreground">
                Every project is unique. Contact me to discuss your specific requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <h4 className="font-bold mb-1">Discovery</h4>
                <p className="text-sm text-muted-foreground">In-depth analysis of your needs</p>
              </div>
              <div>
                <h4 className="font-bold mb-1">Planning</h4>
                <p className="text-sm text-muted-foreground">Strategic approach and timeline</p>
              </div>
              <div>
                <h4 className="font-bold mb-1">Execution</h4>
                <p className="text-sm text-muted-foreground">Agile development with regular updates</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
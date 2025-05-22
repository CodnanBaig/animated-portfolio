"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Clock, Code, Sparkles } from 'lucide-react';

const values = [
  {
    title: "Innovation First",
    description: "Always exploring new technologies and approaches to solve problems more effectively.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />
  },
  {
    title: "Efficiency Matters",
    description: "Leveraging AI to streamline workflows and deliver results faster without sacrificing quality.",
    icon: <Clock className="h-6 w-6 text-blue-500" />
  },
  {
    title: "Clean Code",
    description: "Writing maintainable, well-documented code that stands the test of time.",
    icon: <Code className="h-6 w-6 text-green-500" />
  },
  {
    title: "Continuous Learning",
    description: "Constantly improving skills and staying at the forefront of technology trends.",
    icon: <Sparkles className="h-6 w-6 text-purple-500" />
  }
];

export function WorkValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section ref={ref}>
      <h2 className="text-2xl font-bold mb-8">
        Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-teal-500">Values</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex">
                <div className="mr-4 mt-1">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
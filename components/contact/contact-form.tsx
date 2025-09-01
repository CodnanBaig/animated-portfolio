"use client";

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Send, AlertCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-100, 100], [5, -5]);
  const rotateY = useTransform(mouseX, [-100, 100], [-5, 5]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) * 0.1);
    mouseY.set((e.clientY - centerY) * 0.1);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call with enhanced feedback
    setTimeout(() => {
      const { name, email } = values;
      
      setIsSubmitting(false);
      toast({
        title: "Message sent! ✨",
        description: `Thank you ${name}! I'll get back to you at ${email} soon.`,
      });
    }, 1500);
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative p-8 rounded-xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-teal-500/5"
        animate={{
          opacity: focusedField ? 0.3 : 0.1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full" />
          <h2 className="text-2xl font-bold">Send a Message</h2>
          <Sparkles className="h-5 w-5 text-primary" />
        </motion.div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Name
                      {focusedField === 'name' && (
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </FormLabel>
                    <FormControl>
                      <motion.div className="relative">
                        <Input 
                          placeholder="Your name" 
                          {...field}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className="transition-all duration-300 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10"
                        />
                        {focusedField === 'name' && (
                          <motion.div
                            className="absolute inset-0 border-2 border-primary/30 rounded-md pointer-events-none"
                            animate={{
                              borderColor: ['rgba(168, 85, 247, 0.3)', 'rgba(168, 85, 247, 0.6)', 'rgba(168, 85, 247, 0.3)'],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    </FormControl>
                    <AnimatePresence>
                      {form.formState.errors.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <FormMessage className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {form.formState.errors.name.message}
                          </FormMessage>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </FormItem>
                </motion.div>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Email
                      {focusedField === 'email' && (
                        <motion.div
                          className="w-2 h-2 bg-primary rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      )}
                    </FormLabel>
                    <FormControl>
                      <motion.div className="relative">
                        <Input 
                          placeholder="your.email@example.com" 
                          {...field}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className="transition-all duration-300 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10"
                        />
                        {focusedField === 'email' && (
                          <motion.div
                            className="absolute inset-0 border-2 border-primary/30 rounded-md pointer-events-none"
                            animate={{
                              borderColor: ['rgba(20, 184, 166, 0.3)', 'rgba(20, 184, 166, 0.6)', 'rgba(20, 184, 166, 0.3)'],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    </FormControl>
                    <AnimatePresence>
                      {form.formState.errors.email && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <FormMessage className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {form.formState.errors.email.message}
                          </FormMessage>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </FormItem>
                </motion.div>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Subject
                    {focusedField === 'subject' && (
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </FormLabel>
                  <FormControl>
                    <motion.div className="relative">
                      <Input 
                        placeholder="What is this regarding?" 
                        {...field}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        className="transition-all duration-300 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10"
                      />
                      {focusedField === 'subject' && (
                        <motion.div
                          className="absolute inset-0 border-2 border-primary/30 rounded-md pointer-events-none"
                          animate={{
                            borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.6)', 'rgba(59, 130, 246, 0.3)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </FormControl>
                  <AnimatePresence>
                    {form.formState.errors.subject && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <FormMessage className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {form.formState.errors.subject.message}
                        </FormMessage>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FormItem>
              </motion.div>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Message
                    {focusedField === 'message' && (
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </FormLabel>
                  <FormControl>
                    <motion.div className="relative">
                      <Textarea 
                        placeholder="Tell me about your project or inquiry..." 
                        className="min-h-32 resize-y transition-all duration-300 focus:border-primary/50 focus:shadow-lg focus:shadow-primary/10"
                        {...field}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      />
                      {focusedField === 'message' && (
                        <motion.div
                          className="absolute inset-0 border-2 border-primary/30 rounded-md pointer-events-none"
                          animate={{
                            borderColor: ['rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0.6)', 'rgba(16, 185, 129, 0.3)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </FormControl>
                  <AnimatePresence>
                    {form.formState.errors.message && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <FormMessage className="flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {form.formState.errors.message.message}
                        </FormMessage>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FormItem>
              </motion.div>
            )}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              type="submit" 
              disabled={isSubmitting || !form.formState.isValid}
              className="relative w-full group overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.span
                    key="submitting"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center"
                  >
                    <motion.div
                      whileHover={{ x: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Send className="mr-2 h-4 w-4" />
                    </motion.div>
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
              
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 bg-red-400/20 opacity-0 group-hover:opacity-100"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </Button>
          </motion.div>
        </form>
      </Form>
      </div>
    </motion.div>
  );
}
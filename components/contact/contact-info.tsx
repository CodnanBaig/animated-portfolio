"use client";

import { motion } from 'framer-motion';
import { Mail, MapPin, PhoneCall, Clock } from 'lucide-react';

export function ContactInfo() {
  const contactDetails = [
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: "Email",
      value: "hello@example.com",
      link: "mailto:hello@example.com"
    },
    {
      icon: <PhoneCall className="h-5 w-5 text-primary" />,
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: "Location",
      value: "San Francisco, CA",
      link: null
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Working Hours",
      value: "Mon-Fri: 9AM - 5PM PST",
      link: null
    }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Contact Information</h2>
        <p className="text-muted-foreground">
          Have a project in mind or want to discuss collaboration opportunities?
          Get in touch through any of the channels below.
        </p>
      </div>
      
      <div className="space-y-6">
        {contactDetails.map((detail, i) => (
          <div key={i} className="flex items-start">
            <div className="mt-1 mr-4">
              {detail.icon}
            </div>
            <div>
              <h3 className="font-medium">{detail.title}</h3>
              {detail.link ? (
                <a 
                  href={detail.link}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {detail.value}
                </a>
              ) : (
                <p className="text-muted-foreground">{detail.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10">
        <h3 className="font-medium mb-3">Prefer chatting with AI first?</h3>
        <p className="text-muted-foreground text-sm">
          I&apos;m working on a chatbot integration that can answer your initial
          questions. Coming soon!
        </p>
      </div>
    </motion.div>
  );
}
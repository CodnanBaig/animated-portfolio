import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { AIWorkflowSection } from '@/components/sections/ai-workflow-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ProjectsPreview } from '@/components/sections/projects-preview';
import { ContactCTA } from '@/components/sections/contact-cta';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <AboutSection />
        <AIWorkflowSection />
        <ProjectsPreview />
        <ServicesSection />
        <ContactCTA />
      </div>
    </div>
  );
}
import { HeroSection } from '@/components/sections/hero-section';
import { AboutSection } from '@/components/sections/about-section';
import { AIWorkflowSection } from '@/components/sections/ai-workflow-section';
import { ServicesSection } from '@/components/sections/services-section';
import { ProjectsPreview } from '@/components/sections/projects-preview';
import { ContactCTA } from '@/components/sections/contact-cta';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection />
      <AboutSection />
      <AIWorkflowSection />
      <ProjectsPreview />
      <ServicesSection />
      <ContactCTA />
    </div>
  );
}
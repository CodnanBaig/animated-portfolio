import { AboutHeader } from '@/components/about/about-header';
import { JourneyTimeline } from '@/components/about/journey-timeline';
import { TechStack } from '@/components/about/tech-stack';
import { WorkValues } from '@/components/about/work-values';

export const metadata = {
  title: 'About Me | AI-Powered Developer',
  description: 'Learn about my journey as a developer and how I integrate AI into my workflow',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
      <AboutHeader />
      <JourneyTimeline />
      <TechStack />
      <WorkValues />
    </div>
  );
}
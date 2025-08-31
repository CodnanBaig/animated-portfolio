import { ProjectsGrid } from '@/components/projects/projects-grid';
import { ProjectsHeader } from '@/components/projects/projects-header';

export const metadata = {
  title: 'Projects | AI-Powered Developer',
  description: 'Explore my portfolio of AI-integrated web applications and development projects',
};

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
      <ProjectsHeader />
      <ProjectsGrid />
    </div>
  );
}
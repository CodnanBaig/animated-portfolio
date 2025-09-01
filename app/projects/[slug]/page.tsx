import { projectsData } from '@/lib/projects-data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github, ArrowLeft, FileText, Sparkles, Code, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.find((p) => p.id === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Adnan Baig`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData.find((p) => p.id === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/projects">
          <Button variant="ghost" className="group text-red-500 hover:text-red-600 hover:bg-red-50">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Projects
          </Button>
        </Link>
      </div>

      <div className="space-y-12">
        {/* Project Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full border border-red-500/20">
            <Sparkles className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-500">Featured Project</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {project.title}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-red-500 hover:bg-red-600">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-red-500/30 hover:border-red-500 hover:bg-red-500/10">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-500"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            </Button>
          </div>
        </div>

        {/* Project Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-red-500/20">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project Info Card */}
          <Card className="lg:col-span-1 bg-red-500/5 border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-500">
                <FileText className="w-5 h-5" />
                Project Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="bg-red-500/10 text-red-500 border-red-500/20">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Technologies
                </h3>
                <div className="space-y-2">
                  {project.technologies.map((tech) => (
                    <div key={tech} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-foreground">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card className="bg-background border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-500">
                  <Users className="w-5 h-5" />
                  About This Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-base leading-relaxed text-foreground">
                    <strong>{project.title}</strong> is an innovative solution built with cutting-edge technologies. 
                    This project demonstrates expertise in <span className="font-semibold text-red-500">{project.technologies.join(', ')}</span> and showcases advanced development practices.
                  </p>
                  
                  <p className="text-base leading-relaxed text-foreground mt-4">
                    The project leverages <strong>{project.technologies[0]}</strong> as the primary framework, 
                    seamlessly integrated with {project.technologies.slice(1).join(', ')} to create a robust and 
                    feature-rich application that meets modern web standards.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Features Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-background border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <Zap className="w-5 h-5" />
                    Key Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-foreground">AI-powered functionality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-foreground">Responsive design</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-foreground">Modern UI/UX</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-foreground">Performance optimized</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-background border-red-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-500">
                    <Code className="w-5 h-5" />
                    Technical Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.technologies.map((tech) => (
                      <div key={tech} className="flex items-center gap-3 p-2 bg-red-500/5 rounded-lg">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium text-foreground">{tech}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6 p-8 bg-red-500/5 rounded-2xl border border-red-500/20">
          <h3 className="text-2xl font-bold text-foreground">
            Interested in this project?
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the live demo to see it in action, or dive into the source code to understand the implementation details.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-red-500 hover:bg-red-600 min-w-[160px]">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Live Demo
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-red-500/30 hover:border-red-500 hover:bg-red-500/10 min-w-[160px]">
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-500"
              >
                <Github className="w-4 h-4" />
                Explore Code
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
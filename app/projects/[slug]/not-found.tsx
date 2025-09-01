import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search } from 'lucide-react';

export default function ProjectNotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Project Not Found
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            The project you're looking for doesn't exist or may have been moved.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
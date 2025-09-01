import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="text-xl font-bold inline-flex items-center">
              <span className="font-mono">Adnan Baig</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md text-sm sm:text-base">
              Crafting intelligent web experiences with modern technologies and AI.
              Let&apos;s build something extraordinary together.
            </p>
          </div>
          
          <div className="">
            <h3 className="font-medium mb-3 text-sm sm:text-base">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors text-sm">Projects</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div className="">
            <h3 className="font-medium mb-3 text-sm sm:text-base">Connect</h3>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link 
                href="https://github.com/CodnanBaig" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors p-1 hover:bg-primary/10 rounded"
              >
                <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link 
                href="https://www.linkedin.com/in/adnan-baig-74b8aa21a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors p-1 hover:bg-primary/10 rounded"
              >
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs sm:text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Adnan Baig. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
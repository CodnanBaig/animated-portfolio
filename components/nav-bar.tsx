"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { NavItem, NavBarProps, NavLinkProps } from '@/types';

const navItems: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Projects', href: '/projects' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
];

export function NavBar({ className }: NavBarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.header 
      className={cn(
        "fixed top-0 w-full px-4 z-40 transition-all duration-300",
        isScrolled ? 
          "bg-background/80 backdrop-blur-lg border-b" : 
          "bg-transparent",
        className
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Terminal className="h-6 w-6 text-purple-500" />
          <span className="font-mono">adnanBaig</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* Right side actions */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex md:hidden items-center gap-4">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-background/95 backdrop-blur-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container flex flex-col py-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  href={item.href}
                  className={cn(
                    "block py-3 text-lg font-medium transition-colors",
                    pathname === item.href 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="mt-4"
            >
              <Button asChild className="w-full">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}

function NavLink({ item, pathname }: NavLinkProps) {
  const isActive = pathname === item.href;
  
  return (
    <Link 
      href={item.href}
      className={cn(
        "relative font-medium transition-colors",
        isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
      )}
    >
      {item.title}
      {isActive && (
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="navbar-indicator"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </Link>
  );
}
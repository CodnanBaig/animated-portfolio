import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { NavBar } from '@/components/nav-bar';
import { Footer } from '@/components/footer';
import { CustomCursor } from '@/components/ui/cursor';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'Adnan Baig | AI-Powered Developer',
  description: 'Adnan Baig - A developer who builds smart web applications using modern technologies and AI',
  keywords: ['Adnan Baig', 'Web Developer', 'AI Developer', 'Full Stack Developer', 'Portfolio'],
  authors: [{ name: 'Adnan Baig' }],
  creator: 'Adnan Baig',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://adnanbaig.com',
    title: 'Adnan Baig | AI-Powered Developer',
    description: 'Adnan Baig - A developer who builds smart web applications using modern technologies and AI',
    siteName: 'Adnan Baig Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adnan Baig | AI-Powered Developer',
    description: 'Adnan Baig - A developer who builds smart web applications using modern technologies and AI',
    creator: '@adnanbaig',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        inter.className, 
        'bg-background text-foreground min-h-screen',
        inter.variable,
        jetbrainsMono.variable
      )}>
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CustomCursor variant="target" trailEnabled={true} />
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
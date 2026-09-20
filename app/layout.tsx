import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ExperienceProvider } from "@/components/experience-provider";
import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adnan Baig — Full-Stack Developer",
    template: "%s — Adnan Baig",
  },
  description:
    "Adnan Baig is a full-stack developer with a frontend foundation, building web applications, developer tools and mobile-first products with reliable APIs and data.",
  keywords: [
    "Adnan Baig",
    "Full Stack Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "Product Engineer",
    "Mumbai",
  ],
  authors: [{ name: "Adnan Baig" }],
  creator: "Adnan Baig",
  openGraph: {
    title: "Adnan Baig — Full-Stack Developer",
    description:
      "I build the product. And the systems behind it. Web applications, developer tools and mobile-first products.",
    type: "website",
    url: siteUrl,
    siteName: "Adnan Baig Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adnan Baig — Full-Stack Developer",
    description:
      "I build the product. And the systems behind it. Web applications, developer tools and mobile-first products.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#101110",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <ExperienceProvider>{children}</ExperienceProvider>
      </body>
    </html>
  );
}

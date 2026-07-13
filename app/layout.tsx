import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Adnan Baig — Full Stack Product Engineer",
    template: "%s — Adnan Baig",
  },
  description:
    "Portfolio of Adnan Baig, a full-stack product engineer building modern web applications, operational dashboards, mobile products and AI-enabled tools.",
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
    title: "Adnan Baig — Full Stack Product Engineer",
    description:
      "Engineering digital products with product-owner instincts across web, mobile, AI and music-tech.",
    type: "website",
    url: siteUrl,
    siteName: "Adnan Baig Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adnan Baig — Full Stack Product Engineer",
    description:
      "Engineering digital products with product-owner instincts across web, mobile, AI and music-tech.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090a0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

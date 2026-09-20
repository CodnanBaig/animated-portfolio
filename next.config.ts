import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  outputFileTracingRoot: process.cwd(),
  distDir: process.env.NEXT_DIST_DIR || ".next",
  turbopack: { root: process.cwd() },
  async headers() {
    return [
      {
        source: "/Adnan_Baig_Resume.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Adnan_Baig_Resume.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

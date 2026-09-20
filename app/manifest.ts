import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adnan Baig — Portfolio",
    short_name: "Adnan Baig",
    description: "Full-Stack Developer portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#101110",
    theme_color: "#101110",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

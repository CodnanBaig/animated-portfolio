import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Adnan Baig — Portfolio",
    short_name: "Adnan Baig",
    description: "Full Stack Product Engineer portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#090a0c",
    theme_color: "#090a0c",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}

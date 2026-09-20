import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Adnan Baig. Full-Stack Developer. I build the product and the systems behind it.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 65,
        color: "#f4f4ef",
        background: "#101110",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>adnanbaig ✳</span>
        <span style={{ color: "#adb0a6", fontSize: 17 }}>
          Full-Stack Developer · Chiang Mai
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 72,
            lineHeight: 1.05,
            letterSpacing: "-.04em",
          }}
        >
          <span>I build the product.</span>
          <span style={{ color: "#e6b788" }}>And the systems behind it.</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #343730",
          paddingTop: 24,
          fontSize: 16,
          color: "#adb0a6",
        }}
      >
        <span>Frontend roots. Full-stack reach.</span>
        <span>Seven projects. One working collection.</span>
      </div>
    </div>,
    size,
  );
}

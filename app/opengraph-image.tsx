import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Adnan Baig — Full Stack Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#f3efe6",
          background:
            "radial-gradient(circle at 74% 36%, rgba(199,164,104,.34), transparent 28%), linear-gradient(135deg, #08090b 0%, #111217 58%, #08090b 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: "0.12em" }}>
          <span>ADNAN BAIG</span>
          <span style={{ opacity: 0.6 }}>MUMBAI · REMOTE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 26, color: "#c7a468", letterSpacing: "0.16em", textTransform: "uppercase" }}>
            Full Stack Product Engineer
          </div>
          <div style={{ maxWidth: 980, fontSize: 76, lineHeight: 0.98, letterSpacing: "-0.055em" }}>
            Engineering digital products with product-owner instincts.
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 22, opacity: 0.66 }}>
          <span>Web</span><span>·</span><span>Mobile</span><span>·</span><span>AI</span><span>·</span><span>Music-tech</span>
        </div>
      </div>
    ),
    size,
  );
}

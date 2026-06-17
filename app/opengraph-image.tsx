import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const alt = "Seattle Luxury Drive — Premier Luxury Transportation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const font = await readFile(
    path.join(process.cwd(), "public/fonts/CormorantGaramond-LightItalic.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#090909",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0 96px",
          position: "relative",
        }}
      >
        {/* Corner accent marks */}
        <div style={{ position: "absolute", top: 40, left: 40, width: 56, height: 1, background: "#B89B5E", opacity: 0.45, display: "flex" }} />
        <div style={{ position: "absolute", top: 40, left: 40, width: 1, height: 56, background: "#B89B5E", opacity: 0.45, display: "flex" }} />
        <div style={{ position: "absolute", top: 40, right: 40, width: 56, height: 1, background: "#B89B5E", opacity: 0.45, display: "flex" }} />
        <div style={{ position: "absolute", top: 40, right: 40, width: 1, height: 56, background: "#B89B5E", opacity: 0.45, display: "flex" }} />
        <div style={{ position: "absolute", bottom: 40, left: 40, width: 56, height: 1, background: "#B89B5E", opacity: 0.45, display: "flex" }} />
        <div style={{ position: "absolute", bottom: 40, left: 40, width: 1, height: 56, background: "#B89B5E", opacity: 0.45, display: "flex" }} />
        <div style={{ position: "absolute", bottom: 40, right: 40, width: 56, height: 1, background: "#B89B5E", opacity: 0.45, display: "flex" }} />
        <div style={{ position: "absolute", bottom: 40, right: 40, width: 1, height: 56, background: "#B89B5E", opacity: 0.45, display: "flex" }} />

        {/* Eyebrow */}
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: 12,
            color: "#B89B5E",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            marginBottom: 36,
            opacity: 0.85,
            display: "flex",
          }}
        >
          Luxury Transportation · Greater Seattle
        </span>

        {/* Brand name in Cormorant */}
        <span
          style={{
            fontFamily: "Cormorant",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 112,
            color: "#F5F2EA",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            marginBottom: 36,
            textAlign: "center",
            display: "flex",
          }}
        >
          Seattle Luxury Drive
        </span>

        {/* Gold rule */}
        <div
          style={{
            width: 72,
            height: 1,
            background: "#B89B5E",
            marginBottom: 36,
            opacity: 0.55,
            display: "flex",
          }}
        />

        {/* Tagline */}
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: 17,
            color: "#F5F2EA",
            letterSpacing: "0.12em",
            opacity: 0.45,
            textAlign: "center",
            display: "flex",
          }}
        >
          Chauffeur Service · Executive Transportation · Airport Transfers
        </span>

        {/* Domain */}
        <span
          style={{
            position: "absolute",
            bottom: 44,
            fontFamily: "sans-serif",
            fontSize: 12,
            letterSpacing: "0.2em",
            color: "#B89B5E",
            opacity: 0.4,
            display: "flex",
          }}
        >
          seattleluxurydrive.com
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Cormorant",
          data: font,
          style: "italic",
          weight: 300,
        },
      ],
    }
  );
}

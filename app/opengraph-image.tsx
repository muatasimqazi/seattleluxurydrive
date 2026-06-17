import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Seattle Luxury Drive — Premier Luxury Transportation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#090909",
          position: "relative",
        }}
      >
        {/* Gold top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "#B89B5E",
          }}
        />

        {/* Subtle grid pattern via border lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(184,155,94,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,155,94,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 80px",
          }}
        >
          {/* Eyebrow */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "13px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#B89B5E",
              marginBottom: "24px",
            }}
          >
            Seattle Luxury Drive
          </p>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "serif",
              fontSize: "72px",
              fontWeight: 300,
              color: "#F5F2EA",
              lineHeight: 1.1,
              margin: "0 0 28px",
            }}
          >
            Premier Luxury Transportation
          </h1>

          {/* Sub */}
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "20px",
              color: "rgba(245,242,234,0.55)",
              maxWidth: "700px",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            Chauffeur &amp; self-drive luxury vehicles serving the Greater Seattle Area
          </p>
        </div>

        {/* Phone */}
        <p
          style={{
            position: "absolute",
            bottom: "40px",
            fontFamily: "sans-serif",
            fontSize: "14px",
            letterSpacing: "3px",
            color: "rgba(245,242,234,0.3)",
          }}
        >
          (206) 669-1109 · seattleluxurydrive.com
        </p>
      </div>
    ),
    size
  );
}

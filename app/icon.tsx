import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
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
        }}
      >
        {/* Thin gold border inset */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid #B89B5E",
            opacity: 0.5,
          }}
        />
        {/* Monogram */}
        <span
          style={{
            fontFamily: "Cormorant",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 210,
            color: "#B89B5E",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: 12,
          }}
        >
          SJD
        </span>
        {/* Wordmark */}
        <span
          style={{
            fontFamily: "sans-serif",
            fontWeight: 400,
            fontSize: 36,
            color: "#B89B5E",
            letterSpacing: "0.28em",
            opacity: 0.7,
            textTransform: "uppercase",
          }}
        >
          SEATTLE LUXURY DRIVE
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

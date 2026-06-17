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
        }}
      >
        <span
          style={{
            fontFamily: "Cormorant",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 280,
            color: "#B89B5E",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          SJD
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

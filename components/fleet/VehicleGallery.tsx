"use client";

import { useState } from "react";
import Image from "next/image";
import type { VehicleImage } from "@/types/database";

export default function VehicleGallery({
  images,
  vehicleName,
}: {
  images: VehicleImage[];
  vehicleName: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-offwhite/35">
            Vehicle Photography
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Primary image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        <Image
          src={active.image_url}
          alt={active.alt_text ?? vehicleName}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={activeIndex === 0}
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-[4/3] overflow-hidden bg-charcoal transition-opacity ${
                i === activeIndex
                  ? "ring-1 ring-gold opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={img.alt_text ?? `View image ${i + 1}`}
            >
              <Image
                src={img.image_url}
                alt={img.alt_text ?? vehicleName}
                fill
                className="object-cover"
                sizes="25vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

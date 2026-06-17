"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";

export function ImageUploadForm({
  action,
  children,
  className,
}: {
  action: (formData: FormData) => Promise<void>;
  children: React.ReactNode;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "compressing" | "uploading">("idle");
  const busy = status !== "idle";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;

    const formData = new FormData(e.currentTarget);
    const file = formData.get("image") as File | null;

    if (file && file.size > 0) {
      setStatus("compressing");
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 2000,
          useWebWorker: true,
        });
        formData.set("image", compressed, file.name);
      } catch {
        setStatus("idle");
        return;
      }
    }

    setStatus("uploading");
    await action(formData);
    setStatus("idle");
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
      {busy && (
        <p className="font-sans text-[11px] text-offwhite/50 mt-2">
          {status === "compressing" ? "Compressing…" : "Uploading…"}
        </p>
      )}
    </form>
  );
}

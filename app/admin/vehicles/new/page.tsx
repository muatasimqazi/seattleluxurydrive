import type { Metadata } from "next";
import Link from "next/link";
import { NewVehicleForm } from "./form";

export const metadata: Metadata = { title: "New Vehicle" };

export default function NewVehiclePage() {
  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link
          href="/admin/vehicles"
          className="font-sans text-[11px] text-offwhite/40 hover:text-offwhite/70 transition-colors"
        >
          ← Vehicles
        </Link>
        <h1 className="font-heading text-2xl font-light text-offwhite mt-3 mb-1">
          Add Vehicle
        </h1>
        <p className="font-sans text-xs text-offwhite/40">
          New vehicle will be active by default.
        </p>
      </div>

      <NewVehicleForm />
    </div>
  );
}

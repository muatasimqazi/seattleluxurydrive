import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function phoneHref(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, "")}`
}

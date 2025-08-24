import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toFixed(1);
}

export function formatDistance(km: number): string {
  if (km >= 1e9) {
    return (km / 1e9).toFixed(2) + ' billion km';
  }
  if (km >= 1e6) {
    return (km / 1e6).toFixed(2) + ' million km';
  }
  if (km >= 1e3) {
    return (km / 1e3).toFixed(2) + ' thousand km';
  }
  return km.toFixed(2) + ' km';
}

export function auToKm(au: number): number {
  return au * 149597870.7; // 1 AU in kilometers
}

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}
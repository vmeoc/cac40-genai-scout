import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#10B981";
  if (score >= 60) return "#06B6D4";
  if (score >= 40) return "#F59E0B";
  if (score >= 20) return "#F97316";
  return "#EF4444";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Très bullish";
  if (score >= 60) return "Bullish";
  if (score >= 40) return "Modéré";
  if (score >= 20) return "Émergent";
  return "Limité";
}

export function getTrendColor(trend: number): string {
  if (trend > 0) return "#10B981";
  if (trend < 0) return "#EF4444";
  return "#94A3B8";
}

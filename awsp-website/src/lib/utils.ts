import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale: string): string {
  if (!amount || amount === 0) {
    return locale === 'ar' ? 'غير متوفر' : 'N/A';
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `$${(amount / 1_000).toFixed(0)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export function getProjectName(
  project: { name_ar: string; name_en: string },
  locale: string
): string {
  if (locale === 'en' && project.name_en && project.name_en.trim() !== '') {
    return project.name_en;
  }
  return project.name_ar;
}

export function getDistrictName(
  project: { district_ar: string; district_en: string },
  locale: string
): string {
  if (locale === 'en' && project.district_en && project.district_en.trim() !== '') {
    return project.district_en;
  }
  return project.district_ar;
}

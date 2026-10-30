import type { ImageMetadata } from 'astro';
import { business, languages, text, type Lang } from '../content';

/* Sve slike iz public/images/ prolaze kroz astro:assets (AVIF, WebP, tačne dimenzije). */
const files = import.meta.glob<{ default: ImageMetadata }>('/public/images/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

export function imageMeta(file: string): ImageMetadata {
  const found = files[`/public/images/${file}`];
  if (!found) throw new Error(`Slika "public/images/${file}" ne postoji. Proveri ime fajla u src/content.ts.`);
  return found.default;
}

/** Osnovna putanja sajta, uvek sa kosom crtom na kraju ("/" ili "/repo/"). */
export const basePath = import.meta.env.BASE_URL.replace(/\/?$/, '/');

export const pathFor = (lang: Lang) => basePath + languages[lang].path;

export const absoluteUrl = (path: string, site: URL | undefined) =>
  new URL(path, site ?? 'https://cheef30.github.io').toString();

const numberLocale: Record<Lang, string> = { sr: 'sr-Latn', en: 'en-GB', ru: 'ru' };

export const formatNumber = (value: number, lang: Lang, digits = 1) =>
  new Intl.NumberFormat(numberLocale[lang], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);

export const whatsappUrl = (lang: Lang) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text[lang].cta.whatsappMessage)}`;

export const telUrl = `tel:${business.phone}`;

export const quotes: Record<Lang, [string, string]> = { sr: ['„', '“'], en: ['“', '”'], ru: ['«', '»'] };

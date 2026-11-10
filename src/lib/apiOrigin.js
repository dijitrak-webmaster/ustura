// Base44 alanında API aynı origin'dedir (göreli /api yeterli).
// Harici hosting'de (Vercel, kendi domain vb.) API adresi Base44'nin
// üretim sunucusudur.
//
// Bu dosya, SDK dışındaki doğrudan API çağrıları için tek kaynaktır.

const BASE44_API_ORIGIN = 'https://base44.app';

export const isBase44Host =
  typeof window !== 'undefined' &&
  /(^|\.)base44\.(app|com)$/.test(window.location.hostname);

// Base44 üzerinde çalışıyorsak göreli /api kullan.
// Vercel veya kendi domainimizde çalışıyorsak Base44 API'ye git.
export const apiOrigin = isBase44Host
  ? ''
  : BASE44_API_ORIGIN;

// Göreli API yolları için tam adres.
export const apiUrl = (path) => `${apiOrigin}${path}`;
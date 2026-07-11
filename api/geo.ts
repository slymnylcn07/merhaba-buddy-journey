/**
 * Ziyaretcinin ulkesini dondurur.
 * Vercel her istege x-vercel-ip-country basligini otomatik ekler -
 * harici servis, API anahtari veya ek maliyet YOKTUR.
 */
export default function handler(req: any, res: any) {
  const country = String(req.headers["x-vercel-ip-country"] || "").toUpperCase();
  res.setHeader("Cache-Control", "private, max-age=3600");
  return res.status(200).json({ country: country || null });
}

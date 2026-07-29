/**
 * Ziyaretcinin ulkesini dondurur.
 * Vercel her istege x-vercel-ip-country basligini otomatik ekler -
 * harici servis, API anahtari veya ek maliyet YOKTUR.
 */
interface GeoRequest {
  headers: Record<string, string | string[] | undefined>;
}

interface GeoResponse {
  setHeader(name: string, value: string): void;
  status(code: number): GeoResponse;
  json(body: unknown): GeoResponse;
}

export default function handler(req: GeoRequest, res: GeoResponse) {
  const country = String(req.headers["x-vercel-ip-country"] || "").toUpperCase();
  res.setHeader("Cache-Control", "private, max-age=3600");
  return res.status(200).json({ country: country || null });
}

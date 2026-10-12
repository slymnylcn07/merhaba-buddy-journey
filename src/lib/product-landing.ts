/** Shopify feeds use numeric variant IDs; Storefront API returns GIDs. */
export function getLandingVariantId(search: string): string | null {
  const value = new URLSearchParams(search).get("variant")?.trim();
  if (!value) return null;
  return /^(?:gid:\/\/shopify\/ProductVariant\/)?([0-9]+)$/.exec(value)?.[1] || null;
}

export function selectLandingVariant<T extends { id: string; availableForSale: boolean }>(
  variants: T[],
  search: string,
): T | undefined {
  const requested = getLandingVariantId(search);
  // Preserve an explicitly requested sold-out variant, not another purchasable size.
  return (requested ? variants.find((variant) => variant.id.split("/").pop() === requested) : undefined)
    || variants.find((variant) => variant.availableForSale)
    || variants[0];
}

export function productLandingPath(path: string, search: string, hash = ""): string {
  return `${path}${search}${hash}`;
}

/** Use a real link activation so the Google tag's configured cross-domain
 * linker can decorate checkout at click time. Never build _gl by hand or
 * rewrite Shopify's checkout host, path, signature or discount parameters.
 */
export function navigateToCheckout(checkoutUrl: string): void {
  const url = new URL(checkoutUrl);
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("Invalid secure checkout URL.");
  }
  const link = document.createElement("a");
  link.href = checkoutUrl;
  link.hidden = true;
  link.textContent = "Continue to secure checkout";
  document.body.appendChild(link);
  try { link.click(); }
  finally { link.remove(); }
}

/** A local fallback is essential: a blocked tag must never strand a shopper. */
export function waitForAnalyticsDispatch(
  send: (callback: () => void) => void,
  timeoutMs = 500,
): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => { clearTimeout(timer); resolve(); };
    const timer = setTimeout(finish, timeoutMs);
    try { send(finish); } catch { finish(); }
  });
}

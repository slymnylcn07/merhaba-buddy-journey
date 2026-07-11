/**
 * İletişim formu → flexikneeofficial@gmail.com
 *
 * Resend (resend.com) üzerinden e-posta gönderir.
 *
 * KURULUM (tek seferlik, ~5 dk):
 *   1. resend.com'a flexikneeofficial@gmail.com ile ücretsiz kayıt ol
 *   2. API Keys → Create API Key → kopyala (re_... ile başlar)
 *   3. Vercel → Settings → Environment Variables → RESEND_API_KEY olarak ekle
 *   4. Redeploy
 *
 * Not: Resend'de alan adı doğrulamadan yalnızca kayıt olduğun adrese
 * gönderim yapılabilir, bu kurulumda hedef adres zaten kayıt adresi
 * olduğundan alan adı doğrulaması GEREKMEZ.
 */

const SUPPORT_EMAIL = "flexikneeofficial@gmail.com";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "CONTACT_NOT_CONFIGURED",
      message: `Contact form is not configured yet. Please email us directly at ${SUPPORT_EMAIL}.`,
    });
  }

  const name = String(req.body?.name || "").trim().slice(0, 100);
  const email = String(req.body?.email || "").trim().toLowerCase().slice(0, 255);
  const orderNumber = String(req.body?.orderNumber || "").trim().slice(0, 50);
  const topic = String(req.body?.topic || "General question").trim().slice(0, 60);
  const message = String(req.body?.message || "").trim().slice(0, 5000);
  // Basit spam tuzağı: gerçek kullanıcılar bu gizli alanı doldurmaz
  const honeypot = String(req.body?.website || "");

  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (!name || !emailOk || message.length < 10) {
    return res.status(400).json({
      error: "VALIDATION",
      message: "Please fill in your name, a valid email, and a message (at least 10 characters).",
    });
  }

  const esc = (t: string) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "FlexiKnee Contact <onboarding@resend.dev>",
        to: [SUPPORT_EMAIL],
        reply_to: email,
        subject: `[Contact] ${topic}${orderNumber ? `. Order ${orderNumber}` : ""} - ${name}`,
        html: `
          <h2>New contact form message</h2>
          <p><strong>Name:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          ${orderNumber ? `<p><strong>Order number:</strong> ${esc(orderNumber)}</p>` : ""}
          <p><strong>Topic:</strong> ${esc(topic)}</p>
          <hr />
          <p style="white-space: pre-wrap;">${esc(message)}</p>
        `,
      }),
    });

    if (!r.ok) {
      const body = await r.text().catch(() => "");
      console.error("Resend error:", r.status, body);
      return res.status(502).json({
        error: "SEND_FAILED",
        message: `Could not send your message right now. Please email us directly at ${SUPPORT_EMAIL}.`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(502).json({
      error: "SEND_FAILED",
      message: `Could not send your message right now. Please email us directly at ${SUPPORT_EMAIL}.`,
    });
  }
}

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
  "https://flexi-knee.com",
  "https://www.flexi-knee.com",
  "https://merhaba-buddy-journey.lovable.app",
  "http://localhost:5173",
  "http://localhost:4173",
]);
const MINIMUM_VIEWS_FOR_RANKING = 20;

const isAllowedOrigin = (origin: string | null) => {
  if (!origin) return true;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return true;
  return origin.includes(".lovableproject.com") || origin.includes(".lovable.app");
};

const getCorsHeaders = (origin: string | null): Record<string, string> => ({
  "Access-Control-Allow-Origin": origin && isAllowedOrigin(origin) ? origin : "https://flexi-knee.com",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

const jsonResponse = (
  body: unknown,
  status: number,
  headers: Record<string, string>,
  cacheControl = "no-store",
) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "Cache-Control": cacheControl,
    },
  });

const isValidSlug = (value: unknown): value is string =>
  typeof value === "string" &&
  value.length <= 120 &&
  /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);

const hashVisitor = async (value: string) => {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

serve(async (request) => {
  const origin = request.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== "POST" || !isAllowedOrigin(origin)) {
    return jsonResponse({ error: "Request not allowed" }, 403, corsHeaders);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Guide popularity Supabase configuration is missing");
    return jsonResponse({ error: "Service unavailable" }, 503, corsHeaders);
  }

  try {
    const body = await request.json();
    const action = body?.action;
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    if (action === "track") {
      if (!isValidSlug(body?.slug)) {
        return jsonResponse({ error: "Invalid guide" }, 400, corsHeaders);
      }

      const forwardedIp =
        request.headers.get("cf-connecting-ip") ||
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";
      const userAgent = request.headers.get("user-agent") || "unknown";
      const dateKey = new Date().toISOString().slice(0, 10);
      const salt = Deno.env.get("GUIDE_ANALYTICS_SALT") || serviceRoleKey;
      const visitorHash = await hashVisitor(`${salt}|${forwardedIp}|${userAgent}|${dateKey}`);

      const { error } = await supabase.rpc("record_guide_view", {
        p_slug: body.slug,
        p_visitor_hash: visitorHash,
      });

      if (error) {
        console.error("Guide view could not be recorded", error.message);
        return jsonResponse({ error: "View could not be recorded" }, 500, corsHeaders);
      }

      return jsonResponse({ ok: true }, 200, corsHeaders);
    }

    if (action === "rank") {
      const requestedSlugs = Array.isArray(body?.slugs)
        ? [...new Set(body.slugs.filter(isValidSlug))].slice(0, 120)
        : [];

      if (requestedSlugs.length === 0) {
        return jsonResponse({ items: [] }, 200, corsHeaders, "public, max-age=900, stale-while-revalidate=3600");
      }

      const days = Math.max(7, Math.min(Number(body?.days) || 30, 90));
      const limit = Math.max(1, Math.min(Number(body?.limit) || 120, requestedSlugs.length));
      const { data, error } = await supabase.rpc("get_popular_guides", {
        p_days: days,
        p_slugs: requestedSlugs,
        p_limit: limit,
      });

      if (error) {
        console.error("Guide ranking could not be loaded", error.message);
        return jsonResponse({ error: "Ranking unavailable" }, 500, corsHeaders);
      }

      const totalViews = (data || []).reduce(
        (total: number, item: { total_views?: unknown }) =>
          total + (Number(item.total_views) || 0),
        0,
      );
      const items = totalViews >= MINIMUM_VIEWS_FOR_RANKING
        ? (data || [])
        .map((item: { slug?: unknown }) => item.slug)
        .filter(isValidSlug)
        .map((slug: string) => ({ slug }))
        : [];

      return jsonResponse(
        { items },
        200,
        corsHeaders,
        "public, max-age=900, stale-while-revalidate=3600",
      );
    }

    return jsonResponse({ error: "Invalid action" }, 400, corsHeaders);
  } catch (error) {
    console.error("Guide popularity request failed", error);
    return jsonResponse({ error: "Invalid request" }, 400, corsHeaders);
  }
});

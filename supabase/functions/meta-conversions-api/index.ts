import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MetaEventData {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: string;
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
    em?: string[];  // Hashed emails
    ph?: string[];  // Hashed phone numbers
    external_id?: string[];
    country?: string[];
    city?: string[];
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_ids?: string[];
    content_name?: string;
    content_type?: string;
    contents?: Array<{ id: string; quantity: number }>;
    num_items?: number;
    order_id?: string;
    search_string?: string;
  };
  opt_out?: boolean;
}

interface RequestBody {
  event_name: string;
  event_id: string;
  event_source_url: string;
  user_data: {
    fbp?: string;
    fbc?: string;
    email?: string;
    phone?: string;
    external_id?: string;
    country?: string;
    city?: string;
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_ids?: string[];
    content_name?: string;
    content_type?: string;
    contents?: Array<{ id: string; quantity: number }>;
    num_items?: number;
    order_id?: string;
    search_string?: string;
  };
}

// SHA-256 hash function for user data
async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Normalize and hash email
async function normalizeAndHashEmail(email: string): Promise<string> {
  const normalized = email.toLowerCase().trim();
  return await hashData(normalized);
}

// Normalize and hash phone (remove all non-numeric except +)
async function normalizeAndHashPhone(phone: string): Promise<string> {
  const normalized = phone.replace(/[^0-9+]/g, '');
  return await hashData(normalized);
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const META_PIXEL_ID = Deno.env.get('META_PIXEL_ID');
    const META_CONVERSIONS_API_TOKEN = Deno.env.get('META_CONVERSIONS_API_TOKEN');

    if (!META_PIXEL_ID || !META_CONVERSIONS_API_TOKEN) {
      console.error('Meta Pixel ID or Conversions API Token not configured');
      return new Response(
        JSON.stringify({ error: 'Meta configuration missing' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: RequestBody = await req.json();
    console.log('Received event:', body.event_name, 'Event ID:', body.event_id);

    // Get client IP from headers
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     req.headers.get('x-real-ip') ||
                     '';

    // Get user agent
    const userAgent = req.headers.get('user-agent') || '';

    // Prepare user data with hashing
    const userData: MetaEventData['user_data'] = {
      client_ip_address: clientIp || undefined,
      client_user_agent: userAgent || undefined,
      fbp: body.user_data.fbp || undefined,
      fbc: body.user_data.fbc || undefined,
    };

    // Hash email if provided
    if (body.user_data.email) {
      userData.em = [await normalizeAndHashEmail(body.user_data.email)];
    }

    // Hash phone if provided
    if (body.user_data.phone) {
      userData.ph = [await normalizeAndHashPhone(body.user_data.phone)];
    }

    // Hash external_id if provided
    if (body.user_data.external_id) {
      userData.external_id = [await hashData(body.user_data.external_id)];
    }

    // Hash country if provided
    if (body.user_data.country) {
      userData.country = [await hashData(body.user_data.country.toLowerCase())];
    }

    // Hash city if provided
    if (body.user_data.city) {
      userData.city = [await hashData(body.user_data.city.toLowerCase())];
    }

    // Prepare the event data
    const eventData: MetaEventData = {
      event_name: body.event_name,
      event_time: Math.floor(Date.now() / 1000),
      event_id: body.event_id,
      event_source_url: body.event_source_url,
      action_source: 'website',
      user_data: userData,
      custom_data: body.custom_data,
    };

    // Send to Meta Conversions API
    const metaApiUrl = `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events`;
    
    const payload = {
      data: [eventData],
      access_token: META_CONVERSIONS_API_TOKEN,
    };

    console.log('Sending to Meta CAPI:', JSON.stringify({
      event_name: eventData.event_name,
      event_id: eventData.event_id,
      has_ip: !!userData.client_ip_address,
      has_ua: !!userData.client_user_agent,
      has_fbp: !!userData.fbp,
      has_fbc: !!userData.fbc,
    }));

    const metaResponse = await fetch(metaApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const metaResult = await metaResponse.json();
    
    if (!metaResponse.ok) {
      console.error('Meta CAPI error:', metaResult);
      return new Response(
        JSON.stringify({ error: 'Meta API error', details: metaResult }),
        { status: metaResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Meta CAPI success:', metaResult);
    
    return new Response(
      JSON.stringify({ success: true, result: metaResult }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing Meta CAPI request:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

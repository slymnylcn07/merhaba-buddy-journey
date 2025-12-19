import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Rate limiting: store submission timestamps per email (in-memory, resets on function restart)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60 * 60 * 1000; // 1 hour

interface ReturnRequestBody {
  orderNumber: string;
  email: string;
  fullName: string;
  returnReason: string;
  preferredResolution: string;
  additionalDetails: string;
  honeypot?: string;
}

function generateReturnId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "RR-";
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function sanitizeInput(input: string, maxLength: number = 500): string {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLength);
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: ReturnRequestBody = await req.json();
    
    // Honeypot check - if filled, it's a bot
    if (body.honeypot) {
      console.log('Honeypot triggered, rejecting request');
      return new Response(
        JSON.stringify({ success: true, requestId: 'RR-XXXXXX' }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize all inputs
    const orderNumber = sanitizeInput(body.orderNumber, 50);
    const email = sanitizeInput(body.email, 255).toLowerCase();
    const fullName = sanitizeInput(body.fullName, 100);
    const returnReason = sanitizeInput(body.returnReason, 100);
    const preferredResolution = sanitizeInput(body.preferredResolution, 50);
    const additionalDetails = sanitizeInput(body.additionalDetails, 2000);

    // Validate required fields
    if (!orderNumber || !email || !fullName || !returnReason || !preferredResolution || !additionalDetails) {
      return new Response(
        JSON.stringify({ error: 'All required fields must be filled' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate minimum length for additional details
    if (additionalDetails.length < 20) {
      return new Response(
        JSON.stringify({ error: 'Additional details must be at least 20 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate return reason
    const validReasons = [
      "Defective / not working",
      "Damaged packaging / box issue",
      "Arrived damaged",
      "Missing parts",
      "Wrong item received",
      "Not as described",
      "Changed my mind",
      "Other",
    ];
    if (!validReasons.includes(returnReason)) {
      return new Response(
        JSON.stringify({ error: 'Invalid return reason' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate preferred resolution
    if (!['refund', 'replacement'].includes(preferredResolution)) {
      return new Response(
        JSON.stringify({ error: 'Invalid preferred resolution' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Rate limiting by email
    const lastSubmit = rateLimitMap.get(email);
    if (lastSubmit && Date.now() - lastSubmit < RATE_LIMIT_MS) {
      const remainingMinutes = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmit)) / 60000);
      return new Response(
        JSON.stringify({ error: `Please wait ${remainingMinutes} minutes before submitting again` }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Generate unique request ID
    const requestId = generateReturnId();

    // Insert return request
    const { error: insertError } = await supabase.from('return_requests').insert({
      request_id: requestId,
      order_number: orderNumber,
      email: email,
      full_name: fullName,
      return_reason: returnReason,
      preferred_resolution: preferredResolution,
      additional_details: additionalDetails,
    });

    if (insertError) {
      console.error('Database insert error:', insertError.message);
      return new Response(
        JSON.stringify({ error: 'Failed to submit return request' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update rate limit
    rateLimitMap.set(email, Date.now());

    // Send notification email (don't block on failure)
    try {
      await supabase.functions.invoke('send-return-notification', {
        body: {
          requestId,
          orderNumber,
          email,
          fullName,
          returnReason,
          preferredResolution,
          additionalDetails,
        },
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails
    }

    console.log('Return request submitted successfully:', requestId);

    return new Response(
      JSON.stringify({ success: true, requestId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing return request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

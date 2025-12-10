import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zod schema for email validation
const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .max(255, { message: "Email must be less than 255 characters" })
    .email({ message: "Please enter a valid email address" })
    .toLowerCase(),
});

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Validate input with zod
    const validationResult = subscribeSchema.safeParse(body);
    
    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid email";
      console.error("Email validation failed:", errorMessage);
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    const { email } = validationResult.data;
    console.log("Newsletter subscription request for:", email);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if email already exists
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      console.log("Email already subscribed:", email);
      return new Response(
        JSON.stringify({ message: "Already subscribed", success: true }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Save to database
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to save subscription");
    }

    console.log("Email saved to database:", email);

    // Send welcome email
    const emailResponse = await resend.emails.send({
      from: "FlexiKnee <noreply@flexi-knee.com>",
      to: [email],
      subject: "Welcome to FlexiKnee™ Newsletter!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
            .btn { display: inline-block; background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to FlexiKnee™!</h1>
            </div>
            <div class="content">
              <h2>Thank you for subscribing!</h2>
              <p>You're now part of our community of 50,000+ people committed to better knee health.</p>
              <p>Here's what you can expect:</p>
              <ul>
                <li>🎁 Exclusive discounts and early access to sales</li>
                <li>📚 Expert tips for knee health and pain management</li>
                <li>🆕 First look at new products and features</li>
              </ul>
              <p>Stay tuned for amazing content coming your way!</p>
              <p>Best regards,<br>The FlexiKnee™ Team</p>
            </div>
            <div class="footer">
              <p>© 2024 FlexiKnee™. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ message: "Successfully subscribed!", success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in subscribe-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

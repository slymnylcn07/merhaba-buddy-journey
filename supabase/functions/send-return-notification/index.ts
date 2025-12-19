import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "support@flexiknee.com";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ReturnNotificationRequest {
  requestId: string;
  orderNumber: string;
  email: string;
  fullName: string;
  returnReason: string;
  preferredResolution: string;
  additionalDetails: string;
  type?: "new" | "approved";
}

// HTML escape function to prevent XSS/injection attacks
function escapeHtml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ReturnNotificationRequest = await req.json();
    const notificationType = data.type || "new";
    console.log(`Processing ${notificationType} notification for request:`, data.requestId);

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // For "approved" notifications, require admin authentication
    if (notificationType === "approved") {
      const authHeader = req.headers.get("Authorization");
      if (!authHeader) {
        console.error("Missing authorization header for approved notification");
        return new Response(
          JSON.stringify({ error: "Unauthorized - authentication required" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      const token = authHeader.replace("Bearer ", "");
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);
      
      if (authError || !user) {
        console.error("Invalid token or user not found:", authError?.message);
        return new Response(
          JSON.stringify({ error: "Unauthorized - invalid token" }),
          {
            status: 401,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      // Verify admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError || !roleData) {
        console.error("User does not have admin role:", user.id);
        return new Response(
          JSON.stringify({ error: "Forbidden - admin access required" }),
          {
            status: 403,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }

      console.log("Admin authentication verified for user:", user.id);
    }

    // For "new" notifications, verify the return request exists in the database
    if (notificationType === "new") {
      const { data: returnRequest, error: fetchError } = await supabase
        .from("return_requests")
        .select("id, request_id")
        .eq("request_id", data.requestId)
        .maybeSingle();

      if (fetchError || !returnRequest) {
        console.error("Return request not found:", data.requestId);
        return new Response(
          JSON.stringify({ error: "Invalid request - return request not found" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      console.log("Return request verified:", returnRequest.request_id);
    }

    // Validate email format
    if (!isValidEmail(data.email)) {
      console.error("Invalid email format:", data.email);
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize all user inputs to prevent HTML injection
    const safeFullName = escapeHtml(data.fullName);
    const safeOrderNumber = escapeHtml(data.orderNumber);
    const safeReturnReason = escapeHtml(data.returnReason);
    const safePreferredResolution = escapeHtml(data.preferredResolution);
    const safeAdditionalDetails = escapeHtml(data.additionalDetails);
    const safeRequestId = escapeHtml(data.requestId);
    const safeEmail = escapeHtml(data.email);

    let customerSubject: string;
    let customerHtml: string;

    if (notificationType === "approved") {
      customerSubject = `Return Request Approved - ${safeRequestId}`;
      customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #22c55e;">Return Request Approved! ✓</h1>
          <p>Dear ${safeFullName},</p>
          <p>Great news! Your return request has been <strong>approved</strong>.</p>
          
          <div style="background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <h3 style="margin-top: 0; color: #166534;">Request Details:</h3>
            <p><strong>Request ID:</strong> ${safeRequestId}</p>
            <p><strong>Order Number:</strong> ${safeOrderNumber}</p>
            <p><strong>Resolution:</strong> ${safePreferredResolution}</p>
          </div>
          
          <h3>Next Steps:</h3>
          <ol style="line-height: 1.8;">
            <li>Pack your item securely in its original packaging</li>
            <li>Include this confirmation email or your Request ID</li>
            <li>Ship the item to our return address (you will receive shipping instructions separately)</li>
            <li>Your ${safePreferredResolution === 'refund' ? 'refund will be processed' : 'replacement will be shipped'} once we receive and inspect the item</li>
          </ol>
          
          <p>If you have any questions, please reply to this email or contact our support team.</p>
          
          <p>Best regards,<br>FlexiKnee Support Team</p>
        </div>
      `;
    } else {
      customerSubject = `Return Request Received - ${safeRequestId}`;
      customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Return Request Received</h1>
          <p>Dear ${safeFullName},</p>
          <p>We have received your return request and it is being processed.</p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Request Details:</h3>
            <p><strong>Request ID:</strong> ${safeRequestId}</p>
            <p><strong>Order Number:</strong> ${safeOrderNumber}</p>
            <p><strong>Reason:</strong> ${safeReturnReason}</p>
            <p><strong>Preferred Resolution:</strong> ${safePreferredResolution}</p>
          </div>
          
          <p>Our team will review your request and get back to you within 1-2 business days.</p>
          <p>If you have any questions, please reply to this email or contact our support team.</p>
          
          <p>Best regards,<br>FlexiKnee Support Team</p>
        </div>
      `;
    }

    // Send email to customer
    const customerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "FlexiKnee <no-reply@flexi-knee.com>",
        to: [data.email],
        subject: customerSubject,
        html: customerHtml,
      }),
    });

    const customerResult = await customerEmailRes.json();
    console.log("Customer email sent:", customerResult);

    // Send email to admin (only for new requests)
    if (notificationType === "new") {
      const adminEmailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "FlexiKnee <no-reply@flexi-knee.com>",
          to: [ADMIN_EMAIL],
          subject: `New Return Request - ${safeRequestId}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #d32f2f;">New Return Request</h1>
              
              <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800;">
                <h3 style="margin-top: 0;">Customer Information:</h3>
                <p><strong>Name:</strong> ${safeFullName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
              </div>
              
              <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Request Details:</h3>
                <p><strong>Request ID:</strong> ${safeRequestId}</p>
                <p><strong>Order Number:</strong> ${safeOrderNumber}</p>
                <p><strong>Reason:</strong> ${safeReturnReason}</p>
                <p><strong>Preferred Resolution:</strong> ${safePreferredResolution}</p>
                <p><strong>Additional Details:</strong> ${safeAdditionalDetails || "None provided"}</p>
              </div>
              
              <p>Please review this return request in the admin panel.</p>
            </div>
          `,
        }),
      });

      const adminResult = await adminEmailRes.json();
      console.log("Admin email sent:", adminResult);

      return new Response(
        JSON.stringify({ success: true, customerEmail: customerResult, adminEmail: adminResult }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, customerEmail: customerResult }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending return notification:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "support@flexiknee.com";

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
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ReturnNotificationRequest = await req.json();
    console.log("Sending return notification for request:", data.requestId);

    // Send email to customer
    const customerEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "FlexiKnee <onboarding@resend.dev>",
        to: [data.email],
        subject: `Return Request Received - ${data.requestId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Return Request Received</h1>
            <p>Dear ${data.fullName},</p>
            <p>We have received your return request and it is being processed.</p>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Request Details:</h3>
              <p><strong>Request ID:</strong> ${data.requestId}</p>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Reason:</strong> ${data.returnReason}</p>
              <p><strong>Preferred Resolution:</strong> ${data.preferredResolution}</p>
            </div>
            
            <p>Our team will review your request and get back to you within 1-2 business days.</p>
            <p>If you have any questions, please reply to this email or contact our support team.</p>
            
            <p>Best regards,<br>FlexiKnee Support Team</p>
          </div>
        `,
      }),
    });

    const customerResult = await customerEmailRes.json();
    console.log("Customer email sent:", customerResult);

    // Send email to admin
    const adminEmailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "FlexiKnee System <onboarding@resend.dev>",
        to: [ADMIN_EMAIL],
        subject: `New Return Request - ${data.requestId}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #d32f2f;">New Return Request</h1>
            
            <div style="background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800;">
              <h3 style="margin-top: 0;">Customer Information:</h3>
              <p><strong>Name:</strong> ${data.fullName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
            </div>
            
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Request Details:</h3>
              <p><strong>Request ID:</strong> ${data.requestId}</p>
              <p><strong>Order Number:</strong> ${data.orderNumber}</p>
              <p><strong>Reason:</strong> ${data.returnReason}</p>
              <p><strong>Preferred Resolution:</strong> ${data.preferredResolution}</p>
              <p><strong>Additional Details:</strong> ${data.additionalDetails || "None provided"}</p>
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
  } catch (error: any) {
    console.error("Error sending return notification:", error);
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

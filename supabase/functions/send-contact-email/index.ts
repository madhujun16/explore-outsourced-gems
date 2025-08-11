// Deno imports for Supabase Edge Functions
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  industry?: string;
  message: string;
  consent: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const contactData: ContactRequest = await req.json();

    // Insert contact data into database
    const { data, error } = await supabaseClient
      .from("contacts")
      .insert([contactData])
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save contact information" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send email notification
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    
    const emailResponse = await resend.emails.send({
      from: "NovalSquad Outsourcing <onboarding@resend.dev>",
      to: [contactData.email],
              subject: "Thank you for contacting NovalSquad Outsourcing!",
      html: `
        <h1>Thank you for contacting us, ${contactData.name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        
        <h2>Your submission details:</h2>
        <ul>
          <li><strong>Name:</strong> ${contactData.name}</li>
          <li><strong>Email:</strong> ${contactData.email}</li>
          ${contactData.phone ? `<li><strong>Phone:</strong> ${contactData.phone}</li>` : ''}
          ${contactData.company_name ? `<li><strong>Company:</strong> ${contactData.company_name}</li>` : ''}
          ${contactData.industry ? `<li><strong>Industry:</strong> ${contactData.industry}</li>` : ''}
          <li><strong>Message:</strong> ${contactData.message}</li>
        </ul>
        
                  <p>Best regards,<br>The NovalSquad Outsourcing Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
// @ts-nocheck -- Deno environment, not Node.js
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
    console.log("Received contactData:", JSON.stringify(contactData, null, 2));
    console.log("Phone field value:", contactData.phone);
    console.log("Phone field type:", typeof contactData.phone);

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

    // Send email notifications
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    const emailResults: { customer?: any; team?: any; errors?: string[] } = {};
    const emailErrors: string[] = [];
    
    // Email to customer (confirmation)
    try {
      const customerEmailResponse = await resend.emails.send({
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
      emailResults.customer = customerEmailResponse;
      console.log("Customer email sent successfully:", customerEmailResponse);
    } catch (error) {
      const errorMsg = `Failed to send customer email: ${error instanceof Error ? error.message : 'Unknown error'}`;
      emailErrors.push(errorMsg);
      console.error(errorMsg, error);
    }

    // Email to team (lead notification)
    // Get team email from environment variable, default to a fallback email
    // Support multiple emails separated by comma
    const teamEmailEnv = Deno.env.get("TEAM_EMAIL") || "pragathi@novalsquad.com";
    const teamEmails = teamEmailEnv.split(',').map(email => email.trim()).filter(email => email.length > 0);
    
    console.log(`Attempting to send lead notification to: ${JSON.stringify(teamEmails)}`);
    
    try {
      const leadNotificationResponse = await resend.emails.send({
        from: "NovalSquad Lead Notifications <onboarding@resend.dev>",
        to: teamEmails,
        subject: `🎯 New Lead: ${contactData.name} - ${contactData.company_name || 'No Company'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">🎯 New Lead Received</h2>
            
            <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1F2937;">Contact Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td>
                  <td style="padding: 8px 0;">${contactData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${contactData.email}">${contactData.email}</a></td>
                </tr>
                ${contactData.phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0;"><a href="tel:${contactData.phone}">${contactData.phone}</a></td>
                </tr>
                ` : ''}
                ${contactData.company_name ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Company:</td>
                  <td style="padding: 8px 0;">${contactData.company_name}</td>
                </tr>
                ` : ''}
                ${contactData.industry ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Industry:</td>
                  <td style="padding: 8px 0;">${contactData.industry}</td>
                </tr>
                ` : ''}
              </table>
            </div>
            
            <div style="background-color: #FFFFFF; padding: 20px; border-left: 4px solid #4F46E5; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1F2937;">Message</h3>
              <p style="line-height: 1.6; color: #4B5563;">${contactData.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB;">
              <p style="color: #6B7280; font-size: 12px;">
                <strong>Lead ID:</strong> ${data.id}<br>
                <strong>Submitted:</strong> ${new Date().toLocaleString()}<br>
                <strong>Consent:</strong> ${contactData.consent ? 'Yes ✓' : 'No ✗'}
              </p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${contactData.email}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Reply to ${contactData.name}
              </a>
            </div>
          </div>
        `,
      });
      
      // Check if Resend returned an error in the response
      if (leadNotificationResponse.error) {
        throw new Error(`Resend API error: ${JSON.stringify(leadNotificationResponse.error)}`);
      }
      
      emailResults.team = leadNotificationResponse;
      console.log("Lead notification email sent successfully:", JSON.stringify(leadNotificationResponse, null, 2));
    } catch (error) {
      const errorDetails = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : '';
      const errorMsg = `Failed to send team notification email to ${teamEmails.join(', ')}: ${errorDetails}`;
      emailErrors.push(errorMsg);
      console.error(errorMsg, {
        error: errorDetails,
        stack: errorStack,
        teamEmails: teamEmails,
        fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
      });
    }

    // Log any email errors but don't fail the request if at least one email succeeded
    if (emailErrors.length > 0) {
      console.warn("Some emails failed to send:", emailErrors);
      emailResults.errors = emailErrors;
    }

    // Return response with email results for debugging
    return new Response(JSON.stringify({ 
      success: true, 
      data,
      emails: {
        customerSent: !!emailResults.customer,
        teamSent: !!emailResults.team,
        errors: emailResults.errors || []
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-contact-email function:", error);
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return new Response(
        JSON.stringify({ error: errorMessage }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
  }
};

serve(handler);
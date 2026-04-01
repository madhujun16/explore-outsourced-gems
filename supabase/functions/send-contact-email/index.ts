// @ts-nocheck -- Deno environment, not Node.js
//
// Secrets (never commit values): Supabase Dashboard → Project Settings → Edge Functions → Secrets
//
// SMTP (when SMTP_HOST is set — nodemailer):
//   SMTP_HOST, SMTP_PORT (default 587), SMTP_SECURE (true for port 465),
//   SMTP_USER, SMTP_PASS, SMTP_FROM (fallback From),
//   SMTP_FROM_CUSTOMER, SMTP_FROM_LEAD (optional overrides)
//
// Resend (when SMTP_HOST is unset):
//   RESEND_API_KEY, RESEND_FROM_CUSTOMER, RESEND_FROM_LEAD
//
// Lead recipients (comma-separated where noted):
//   TEAM_EMAIL, ADMIN_EMAIL
//
// Deno imports — bare specifiers resolve via ../deno.json
import { serve } from "std/http/server.ts";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";
import { Resend } from "resend";

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

/** Merge comma-separated lists from env vars; dedupe case-insensitively. No addresses hardcoded in source. */
function mergeEmailRecipients(...envKeys: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const key of envKeys) {
    const raw = Deno.env.get(key);
    if (!raw) continue;
    for (const part of raw.split(",")) {
      const email = part.trim();
      if (!email) continue;
      const lower = email.toLowerCase();
      if (seen.has(lower)) continue;
      seen.add(lower);
      out.push(email);
    }
  }
  return out;
}

type MailPayload = {
  from: string;
  to: string[];
  subject: string;
  html: string;
};

function createSmtpTransport() {
  const host = Deno.env.get("SMTP_HOST");
  if (!host) return null;
  const port = parseInt(Deno.env.get("SMTP_PORT") ?? "587", 10);
  const secure =
    Deno.env.get("SMTP_SECURE") === "true" ||
    Deno.env.get("SMTP_SECURE") === "1" ||
    port === 465;
  const user = Deno.env.get("SMTP_USER");
  const pass = Deno.env.get("SMTP_PASS") ?? "";
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && user.length > 0 ? { user, pass } : undefined,
  });
}

async function sendOutboundEmail(
  mode: "smtp" | "resend",
  smtp: ReturnType<typeof nodemailer.createTransport> | null,
  resendClient: InstanceType<typeof Resend> | null,
  payload: MailPayload,
): Promise<{ ok: boolean; via: string; response?: unknown; error?: string }> {
  if (mode === "smtp" && smtp) {
    try {
      const info = await smtp.sendMail({
        from: payload.from,
        to: payload.to.join(", "),
        subject: payload.subject,
        html: payload.html,
      });
      return { ok: true, via: "smtp", response: info };
    } catch (e) {
      return {
        ok: false,
        via: "smtp",
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }
  if (mode === "resend" && resendClient) {
    try {
      const r = await resendClient.emails.send({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      });
      if (r.error) {
        return { ok: false, via: "resend", error: JSON.stringify(r.error) };
      }
      return { ok: true, via: "resend", response: r };
    } catch (e) {
      return {
        ok: false,
        via: "resend",
        error: e instanceof Error ? e.message : String(e),
      };
    }
  }
  return {
    ok: false,
    via: mode,
    error: "No email transport configured (set SMTP_HOST or RESEND_API_KEY)",
  };
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

    // Email: SMTP if SMTP_HOST is set, otherwise Resend (RESEND_API_KEY).
    const useSmtp = Boolean(Deno.env.get("SMTP_HOST"));
    const smtp = useSmtp ? createSmtpTransport() : null;
    const resend = useSmtp ? null : new Resend(Deno.env.get("RESEND_API_KEY"));
    const mode = useSmtp ? "smtp" : "resend";

    if (useSmtp) {
      console.log(`Using SMTP transport: ${Deno.env.get("SMTP_HOST")}:${Deno.env.get("SMTP_PORT") ?? "587"}`);
    }

    const emailResults: { customer?: unknown; team?: unknown; errors?: string[] } = {};
    const emailErrors: string[] = [];

    const customerFrom = useSmtp
      ? (Deno.env.get("SMTP_FROM_CUSTOMER") ?? Deno.env.get("SMTP_FROM") ?? "")
      : (Deno.env.get("RESEND_FROM_CUSTOMER") ??
        "NovalSquad Outsourcing <onboarding@resend.dev>");

    const customerHtml = `
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
        `;

    if (!customerFrom) {
      const errorMsg =
        "Customer email skipped: set SMTP_FROM_CUSTOMER or SMTP_FROM when using SMTP.";
      emailErrors.push(errorMsg);
      console.warn(errorMsg);
    } else {
      const customerResult = await sendOutboundEmail(mode, smtp, resend, {
        from: customerFrom,
        to: [contactData.email],
        subject: "Thank you for contacting NovalSquad Outsourcing!",
        html: customerHtml,
      });
      if (customerResult.ok) {
        emailResults.customer = customerResult;
        console.log("Customer email sent successfully:", customerResult);
      } else {
        const errorMsg = `Failed to send customer email: ${customerResult.error ?? "unknown"}`;
        emailErrors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    // Lead notification recipients: set in Supabase → Edge Functions → Secrets (never commit addresses).
    // TEAM_EMAIL: comma-separated (e.g. ops@, sales@). ADMIN_EMAIL: optional extra list or single address.
    const teamEmails = mergeEmailRecipients("TEAM_EMAIL", "ADMIN_EMAIL");

    if (teamEmails.length === 0) {
      console.warn(
        "No TEAM_EMAIL or ADMIN_EMAIL secrets configured; skipping lead notification email.",
      );
    } else {
      const leadFrom = useSmtp
        ? (Deno.env.get("SMTP_FROM_LEAD") ?? Deno.env.get("SMTP_FROM") ?? "")
        : (Deno.env.get("RESEND_FROM_LEAD") ??
          "NovalSquad Lead Notifications <onboarding@resend.dev>");

      if (!leadFrom) {
        const errorMsg =
          "Lead notification skipped: set SMTP_FROM_LEAD or SMTP_FROM when using SMTP.";
        emailErrors.push(errorMsg);
        console.warn(errorMsg);
      } else {
        const leadHtml = `
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
          `;

        console.log(`Sending lead notification to: ${JSON.stringify(teamEmails)}`);
        const leadResult = await sendOutboundEmail(mode, smtp, resend, {
          from: leadFrom,
          to: teamEmails,
          subject: `🎯 New Lead: ${contactData.name} - ${contactData.company_name || "No Company"}`,
          html: leadHtml,
        });

        if (leadResult.ok) {
          emailResults.team = leadResult;
          console.log("Lead notification email sent successfully:", leadResult);
        } else {
          const errorMsg = `Failed to send team notification email to ${teamEmails.join(", ")}: ${leadResult.error ?? "unknown"}`;
          emailErrors.push(errorMsg);
          console.error(errorMsg);
        }
      }
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
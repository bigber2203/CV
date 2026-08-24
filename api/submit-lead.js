import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req, res) {
  // CORS Configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, phone, company, need, budget, description, website_source } = req.body;

    // 1. Spam Protection - Honeypot Field Check
    if (website_source && website_source.trim() !== '') {
      console.log('Honeypot trigger detected. Filtering submission.');
      // Silently return 200 success to trick bots
      return res.status(200).json({ success: true, message: 'Spam filtered' });
    }

    // 2. Server-side validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Please enter your name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!need || need.trim() === '') {
      return res.status(400).json({ error: 'Please select what service you need.' });
    }

    if (!budget || budget.trim() === '') {
      return res.status(400).json({ error: 'Please select an approximate budget.' });
    }

    if (!description || description.trim() === '') {
      return res.status(400).json({ error: 'Tell me a little about your project.' });
    }

    const submissionDate = new Date().toISOString();

    // 3. Initialize Supabase client
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      return res.status(500).json({ error: 'Database configuration missing' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 4. Save Lead record to Supabase project_leads table
    const { data: dbData, error: dbError } = await supabase
      .from('project_leads')
      .insert([
        {
          name,
          email,
          phone: phone || '',
          company_name: company || '',
          service: need,
          budget,
          project_description: description,
          submission_date: submissionDate,
          lead_status: 'New',
          notes: ''
        }
      ]);

    if (dbError) {
      console.error('Supabase DB Insert Error:', dbError);
      return res.status(500).json({ error: 'Failed to record lead details.' });
    }

    // 5. Send Notification Emails via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('Resend API key missing. Skipping email dispatches.');
      return res.status(200).json({ success: true, message: 'Stored in DB (Email skipped)' });
    }

    const resend = new Resend(resendApiKey);

    // Email to Bigyat (debbigyat@gmail.com)
    try {
      await resend.emails.send({
        from: 'Portfolio Leads <onboarding@resend.dev>',
        to: 'debbigyat@gmail.com',
        replyTo: email,
        subject: `🚀 New Project Inquiry from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
            <h2 style="color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; margin-top: 0; font-family: sans-serif;">NEW CLIENT PROJECT REQUEST</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-family: sans-serif; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569; width: 180px;">Client Name:</td>
                <td style="padding: 6px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569;">Phone:</td>
                <td style="padding: 6px 0; color: #0f172a;">${phone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569;">Business / Company:</td>
                <td style="padding: 6px 0; color: #0f172a;">${company || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569;">Service Required:</td>
                <td style="padding: 6px 0; color: #0f172a;">${need}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #475569;">Approximate Budget:</td>
                <td style="padding: 6px 0; color: #0f172a;">${budget}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border-left: 4px solid #3b82f6; border-radius: 4px; font-size: 14px;">
              <h4 style="margin-top: 0; color: #0f172a; margin-bottom: 8px;">Project Details:</h4>
              <p style="color: #334155; line-height: 1.5; margin: 0; white-space: pre-wrap;">${description}</p>
            </div>

            <p style="font-size: 11px; color: #94a3b8; margin-top: 25px;">
              Submitted On: ${new Date(submissionDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)
            </p>

            <div style="margin-top: 24px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Reply Direct to Client
              </a>
            </div>
          </div>
        `
      });
    } catch (mailError) {
      console.error('Failed to send notification email to Bigyat:', mailError);
    }

    // Confirmation Email to Client
    try {
      await resend.emails.send({
        from: 'Bigyat Deb <onboarding@resend.dev>',
        to: email,
        subject: `Bigyat Deb — I've received your project request 🚀`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; line-height: 1.6; color: #334155;">
            <p>Hi ${name},</p>
            <p>Thanks for reaching out and sharing your project idea.</p>
            <p>I've received your request and will review the details shortly.</p>
            <p>I'll get back to you as soon as possible to discuss the next steps.</p>
            <p>In the meantime, you can also contact me directly on WhatsApp to start discussing details:</p>
            
            <div style="margin: 24px 0; text-align: left;">
              <a href="https://wa.me/917002200651?text=Hi%20Bigyat!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." style="display: inline-block; background-color: #25D366; color: white; padding: 12px 24px; border-radius: 30px; text-decoration: none; font-weight: bold; font-size: 14px;">
                Chat directly on WhatsApp →
              </a>
            </div>

            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin-top: 30px; margin-bottom: 20px;" />
            
            <p style="margin: 0; font-weight: bold; color: #0f172a;">Best,</p>
            <p style="margin: 0; font-weight: bold; color: #0f172a;">Bigyat Deb</p>
            <p style="margin: 0; font-size: 12px; color: #64748b;">Creative Technologist & Full Stack Developer</p>
          </div>
        `
      });
    } catch (clientMailError) {
      // Log errors but do not fail the request (sandbox domain limits could trigger failures for non-verified emails)
      console.warn('Failed to send client confirmation email (sandbox domain limits may apply):', clientMailError.message);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Server execution error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

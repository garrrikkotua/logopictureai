import { NextApiHandler } from "next";
import { Database } from "@/lib/types/supabase";
import { UpscaleEmailTemplate } from "@/components/emails/upscale.email";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const spb = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

const resend = new Resend(process.env.RESEND_API_KEY);

const handler: NextApiHandler = async (req, res) => {
  console.log("query", req.query);
  try {
    const { userId, email, secret } = req.query;

    if (process.env.REPLICATE_WEBHOOK_SECRET) {
      // if a secret is set, verify it
      if (secret !== process.env.REPLICATE_WEBHOOK_SECRET) {
        return new Response("Invalid secret", { status: 401 });
      }
    }

    const body = req.body;
    console.log(body);

    const output = body.output as string;

    await resend.emails.send({
      from: "LogoPicture AI <igor@emails.logopictureai.com>",
      to: [email as string],
      subject: "Your image has been upscaled!",
      react: UpscaleEmailTemplate({
        email: email as string,
      }),
      html: `<p>Hi ${email},</p><p>Your upscale has been delivered! You can find the upscaled image attached.</p><p>Thank you for using LogoPicture AI!</p>`,
      attachments: [{
        filename: 'upscaled.png',
        path: output,
      }]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }

  res.status(200).json({ status: "ok" });
};

export default handler;

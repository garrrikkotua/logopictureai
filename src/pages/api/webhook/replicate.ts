import { NextApiHandler } from "next";
import { Database } from "@/lib/types/supabase";
import { ResultEmailTemplate } from "@/components/emails/result.email";
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
    const { generationId, email, secret } = req.query;

    if (process.env.REPLICATE_WEBHOOK_SECRET) {
      // if a secret is set, verify it
      if (secret !== process.env.REPLICATE_WEBHOOK_SECRET) {
        return new Response("Invalid secret", { status: 401 });
      }
    }

    const body = req.body;
    console.log(body);

    const outputs = body.output as string[];

    // mark generation as completed
    await spb
      .from("generations")
      .update({ status: "completed" })
      .eq("id", generationId as string);

    await resend.emails.send({
      from: "AIArtLogo <igor@emails.logopictureai.com>",
      to: [email as string],
      subject: "Your order has been delivered!",
      react: ResultEmailTemplate({
        email: email as string,
        numberOfPictures: body.input.num_outputs,
        prompt: body.input.prompt,
      }),
      html: `<p>Hi ${email},</p><p>Your order has been delivered! Please see your pictures attached.</p><p>Thank you for using AIArtLogo!</p>`,
      attachments: outputs.map((output, i) => ({
        filename: `image-${i}.png`,
        path: output,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }

  res.status(200).json({ status: "ok" });
};

export default handler;

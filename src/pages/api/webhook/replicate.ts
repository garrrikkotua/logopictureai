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

    const userData = await spb.rpc("get_user_id_by_email", { email: (email as string).toLowerCase() });
    const userId = userData?.data?.[0]?.id as string;

    // uploading images to supabase in parallel using Promise.all
    // first, we download the images from the provided URLs
    await Promise.all(outputs.map(async (output, i) => {
      const response = await fetch(output);
      const blob = await response.blob();
      // then, we upload the downloaded images to supabase
      await spb.storage.from("aipictures").upload(`${userId}/${generationId}/image-${i}.png`, blob, {
        contentType: "image/png",
      });
    }));

    // mark generation as completed
    await spb
      .from("generations")
      .update({ status: "completed" })
      .eq("id", generationId as string);

    await resend.emails.send({
      from: "LogoPicture AI <igor@emails.logopictureai.com>",
      to: [email as string],
      subject: "Your pictures have been generated!",
      react: ResultEmailTemplate({
        email: email as string,
        numberOfPictures: body.input.num_outputs,
        prompt: body.input.prompt,
      }),
      html: `<p>Hi ${email},</p><p>Your order has been delivered! You can find pictures in generations section in the app.</p><p>Thank you for using LogoPicture AI!</p>`,
      // attachments: outputs.map((output, i) => ({
      //   filename: `image-${i}.png`,
      //   path: output,
      // })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error sending email" });
  }

  res.status(200).json({ status: "ok" });
};

export default handler;

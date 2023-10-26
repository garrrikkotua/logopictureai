import type { NextApiRequest, NextApiResponse } from "next";
import { ResultEmailTemplate } from "@/components/emails/result.email";
import { Resend } from "resend";
import { NextApiHandler } from "next";

const resend = new Resend(process.env.RESEND_API_KEY);

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { email, prompt, numberOfPictures } = req.body;
  try {
    const data = await resend.emails.send({
      from: "AIArtLogo <igor@mail.aiartlogo.com>",
      to: [email],
      subject: "Your order has been delivered!",
      react: ResultEmailTemplate({
        email,
        numberOfPictures,
        prompt,
      }),
      text: "Your order has been delivered!",
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default handler;

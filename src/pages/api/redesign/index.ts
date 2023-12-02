import { NextApiRequest, NextApiResponse } from "next";
import { NextApiHandler } from "next";
import OpenAI from "openai";

const openai = new OpenAI();

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    const { pattern, style } = req.body;
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Describe the logo in detail. Pay attention to shapes, texts, etc.",
              },
              {
                type: "image_url",
                image_url: {
                  url: pattern,
                },
              },
            ],
          },
        ],
      });

      const description = response.choices[0].message.content as string;

      console.log(description);

      const image = await openai.images.generate({ model: "dall-e-3", prompt: `Logo of ${description} in ${style} style.` });

      res.status(200).json({
        description,
        image: image.data[0].url,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error generating image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;

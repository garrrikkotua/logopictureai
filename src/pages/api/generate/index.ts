import Replicate from "replicate";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiHandler } from 'next'
import { createClient } from "@supabase/supabase-js";
import {Database} from "@/lib/types/supabase";

const spb = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const WEBHOOK_BASE = `${process.env.WEBHOOK_URL}/api/webhook/replicate`

const createUrl = (generationId: string, email: string) => {
  if (process.env.REPLICATE_WEBHOOK_SECRET) {
    return `${WEBHOOK_BASE}?generationId=${generationId}&email=${email}&secret=${process.env.REPLICATE_WEBHOOK_SECRET}`
  }
  return `${WEBHOOK_BASE}?generationId=${generationId}&email=${email}`
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { pattern, prompt, generationId, numberOfPictures, email, userId, conditioningScale} = req.body;
    try {
      const prediction = await replicate.predictions.create({
        version: "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
        input: {
            prompt,
            image: pattern,
            num_outputs: numberOfPictures,
            controlnet_conditioning_scale: conditioningScale,
            qr_code_content: "https://logopictureai.com",
            qrcode_background: "white",
        },
        webhook: createUrl(generationId, email),
        webhook_events_filter: ["completed"],
    });
      await spb.rpc('increment_credits', {row_id: userId, num: -(numberOfPictures as number)})
      res.status(200).json(prediction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error generating image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler


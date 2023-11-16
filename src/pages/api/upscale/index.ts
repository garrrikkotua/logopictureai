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

const WEBHOOK_BASE = `${process.env.WEBHOOK_URL}/api/webhook/upscale`

const createUrl = (userId: string, email: string) => {
  if (process.env.REPLICATE_WEBHOOK_SECRET) {
    return `${WEBHOOK_BASE}?userId=${userId}&email=${email}&secret=${process.env.REPLICATE_WEBHOOK_SECRET}`
  }
  return `${WEBHOOK_BASE}?userId=${userId}&email=${email}`
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { pictureURL, scale, email, userId} = req.body;
    try {
      const prediction = await replicate.predictions.create({
        version: "42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
        input: {
            image: pictureURL,
            scale: scale,
        },
        webhook: createUrl(userId, email),
        webhook_events_filter: ["completed"],
    });
      await spb.rpc('increment_credits', {row_id: userId, num: -1})
      res.status(200).json(prediction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error Upscaling Image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default handler


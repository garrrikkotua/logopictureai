import Replicate from "replicate";
import { NextApiRequest, NextApiResponse } from 'next';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const generate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { image, prompt } = req.body;
    try {
      const prediction = await replicate.predictions.create({
        version: "75d51a73fce3c00de31ed9ab4358c73e8fc0f627dc8ce975818e653317cb919b",
        input: {
            prompt,
            image
        },
        webhook: "https://example.com/your-webhook",
        webhook_events_filter: ["completed"]
    });
      res.status(200).json(prediction);
    } catch (error) {
      res.status(500).json({ error: 'Error generating image' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

export default generate


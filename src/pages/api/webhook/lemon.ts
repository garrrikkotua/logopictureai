import { NextApiHandler } from "next";
import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const spb = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

const handler: NextApiHandler = async (req, res) => {
  const secret = process.env.LEMON_WEBHOOK_SECRET as string;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(
    hmac.update(JSON.stringify(req.body)).digest("hex"),
    "utf8"
  );
  const signature = Buffer.from(
    (req.headers["x-signature"] as string) || "",
    "utf8"
  );

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error("Invalid signature.");
  }
  try {
    const body = req.body;
    console.log("lemon", body.data.attributes.first_order_item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing LMS webhook" });
  }

  res.status(200).json({ status: "ok" });
};

export default handler;

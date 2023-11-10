import { NextApiHandler } from "next";
import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import type { Readable } from "node:stream";

export const config = {
  api: {
    bodyParser: false,
  },
};

const spb = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

// Get raw body as string
async function getRawBody(readable: Readable): Promise<Buffer> {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const handler: NextApiHandler = async (req, res) => {
  const rawBody = await getRawBody(req);
  const secret = process.env.LEMON_WEBHOOK_SECRET as string;
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");

  const signature = Buffer.from(
    (req.headers["x-signature"] as string) || "",
    "utf8"
  );

  if (!crypto.timingSafeEqual(digest, signature)) {
    throw new Error("Invalid signature.");
  }

  const body = JSON.parse(Buffer.from(rawBody).toString("utf8"));
  console.log("json data for this request is:", body);

  try {
    const variant_name: string =
      body.data.attributes.first_order_item.variant_name;
    let credits = 0;
    const isTestMode = body.meta.test_mode;
    const email = body.data.attributes.user_email as string;

    console.log("email", email);

    if (isTestMode) {
      console.log("test mode");
      res.status(200).json({ status: "ok" });
      return;
    }

    if (variant_name.includes("Starter")) {
      credits = 50;
    } else if (variant_name.includes("Growth")) {
      credits = 200;
    } else if (variant_name.includes("Scale")) {
      credits = 500;
    } else {
      // ignore
      res.status(400).json({ status: "No plan found" });
    }

    const { error } = await spb.auth.admin.createUser({
      email,
    });

    console.log("error", error);

    const userData = await spb.rpc("get_user_id_by_email", { email: email.toLowerCase() });

    const userId = userData?.data?.[0]?.id as string;
    console.log("userId", userId);

    // check if user has already a record in credits table
    const { data } = await spb
      .from("credits")
      .select("*")
      .eq("user_id", userId).single();

    if (data && data.credits) {
      // update record
      await spb.rpc("increment_credits", { row_id: userId, num: credits });
    } else {
      // create new record
      await spb.from("credits").insert([{ user_id: userId, credits }]);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing LMS webhook" });
  }

  res.status(200).json({ status: "ok" });
};

export default handler;

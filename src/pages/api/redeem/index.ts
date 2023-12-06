import { NextApiHandler } from "next";
import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";

const spb = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

const handler: NextApiHandler = async (req, res) => {
  try {
    const { code, email } = req.body;

    await spb
      .from("appsumo")
      .update({
        email: email as string,
        redeemed_at: new Date().toISOString(),
        redeemed: true,
      })
      .eq("code", code as string);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error redeeming AppSumo code" });
  }

  res.status(200).json({ status: "ok" });
};

export default handler;

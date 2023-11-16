import { DashboardLayout } from "@/layouts/dashboard.layout";
import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/types/supabase";
import { Button } from "@/components/ui/button";
import { CHECKOUT_URL_STARTER, CUSTOMER_PORTAL_URL } from "@/lib/constants";
import Link from "next/link";

const API = () => {
  const user = useUser();
  const spb = useSupabaseClient<Database>();

  const { data: credits } = useQuery({
    queryKey: ["credits", user?.id],
    queryFn: async () => {
      const { data } = await spb
        .from("credits")
        .select("credits")
        .eq("user_id", user?.id as string)
        .single();
      if (!data?.credits) return 0;
      return data?.credits;
    },
  });
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-xl">API Waitlist</h1>
      <p>
        Interested in the API? Join the{" "}
        <a
          href="https://tally.so/r/wMEakp"
          className="text-black font-bold underline"
        >
          waitlist
        </a>{" "}
        and get notified when it&apos;s ready.
      </p>
    </div>
  );
};

const APIPage = () => {
  return (
    <DashboardLayout>
      <API />
    </DashboardLayout>
  );
};

export default APIPage;

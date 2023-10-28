import { DashboardLayout } from "@/layouts/dashboard.layout";
import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/types/supabase";
import { Button } from "@/components/ui/button";

const Settings = () => {
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
      <h1 className="text-xl">Settings</h1>
      <p>
        Email: <span className="font-semibold">{user?.email}</span>
      </p>
      <p>
        Credits: <span className="font-semibold">{credits}</span>
      </p>
      <div className="pt-4">
        <Button>Buy more credits</Button>
      </div>
      <div className="pt-4">
        <h1 className="text-xl">Support</h1>
        <p className="pt-2">
          Feel free to send an email {""}
          <a href="mailto:kotuaigor@gmail.com" className="underline">
            here
          </a>{" "}
          or dm me on Twitter {""}
          <a href="https://twitter.com/garrrikkotua" className="underline">
            @garrikkotua
          </a>
        </p>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  );
};

export default SettingsPage;

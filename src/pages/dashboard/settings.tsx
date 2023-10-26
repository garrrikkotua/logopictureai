import { DashboardLayout } from "@/layouts/dashboard.layout";
import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/types/supabase";

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
    <div className="flex flex-col">
      <h1 className="text-xl">Settings</h1>
      <p>
        Email: <span className="font-semibold">{user?.email}</span>
      </p>
      <p>
        Credits: <span className="font-semibold">{credits}</span>
      </p>
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

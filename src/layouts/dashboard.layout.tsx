import { Sidebar } from "../components/dashboard/sidebar.component";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = useUser();
  const spb = useSupabaseClient<Database>();

  const { data: generation } = useQuery({
    queryKey: ["last-generation", user?.id],
    queryFn: async () => {
      const { data } = await spb
        .from("generations")
        .select()
        .eq("user_id", user?.id as string)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();
      return data;
    },
    refetchInterval: 2000,
  });
  return (
    <>
      {generation?.status == "pending" && (
        <div className="w-full flex flex-col py-2 bg-black text-center text-white">
          <div className="text-base flex flex-row gap-2 items-center justify-center">
            <Loader2 className="animate-spin" />
            Your pictures are being generated, track status in{" "}
            <Link href="/dashboard/gallery" className="underline">
              Gallery
            </Link>
          </div>
        </div>
      )}

      <div className="flex flex-row">
        <Sidebar className="w-80" />
        <div className="flex flex-col w-full py-8 px-8 overflow-y-scroll max-h-screen">
          {children}
        </div>
      </div>
    </>
  );
};

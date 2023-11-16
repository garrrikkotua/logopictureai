import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/types/supabase";
import { APP_NAME } from "@/lib/constants";
import { CHECKOUT_URL_STARTER } from "@/lib/constants";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  const spb = useSupabaseClient<Database>();
  const user = useUser();

  const {
    data: credits,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["credits", user?.id],
    queryFn: async () => {
      const { data, error } = await spb
        .from("credits")
        .select("credits")
        .eq("user_id", user?.id as string)
        .single();
      if (!data?.credits) return 0;
      return data?.credits;
    },
  });

  // Subscribe to changes
  spb
    .channel("custom-filter-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "credits",
        filter: `user_id=eq.${user?.id}`,
      },
      async () => {
        await refetch();
      }
    )
    .subscribe();

  return (
    <div className={cn("pb-12 border-r-2 h-full min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            {APP_NAME}
          </h2>
          <div className="space-y-1">
            <Button
              variant={isActive("/dashboard") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard">Generate</Link>
            </Button>
            <Button
              variant={isActive("/dashboard/gallery") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard/gallery">Gallery</Link>
            </Button>
            <Button
              variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard/settings">Settings</Link>
            </Button>
            <Button
              variant={isActive("/dashboard/api") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard/api">API</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Credits: {isLoading ? "..." : credits}
          </h2>
          <Button variant="link" asChild>
            <Link href={CHECKOUT_URL_STARTER}>Buy more credits</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

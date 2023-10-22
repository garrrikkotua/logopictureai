import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const router = useRouter();
  const isActive = (path: string) => router.pathname === path;

  return (
    <div className={cn("pb-12 border-r-2 h-full min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            AI Art Logo
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
              variant={isActive("/dashboard/browse") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard/browse">Browse</Link>
            </Button>
            <Button
              variant={isActive("/dashboard/uploads") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard/uploads">Uploads</Link>
            </Button>
            <Button
              variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard/settings">Settings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

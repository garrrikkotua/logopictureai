import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  const spb = useSupabaseClient();
  const { toast } = useToast();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const { data, error } = await spb.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });
    setError(error?.message ?? null);
    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
      });
      return;
    }

    if (data) {
      toast({
        title: "Check your email",
        description: "We sent you a magic link to sign in.",
      });
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm font-medium tracking-wide">
                {error}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In with Email
          </Button>
          {/* <div className="text-center">
            <Link href="/login/password">
              Create account with password instead
            </Link>
          </div> */}
        </div>
      </form>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/router";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  createAccount?: boolean;
}

export function UserAuthForm({
  className,
  createAccount = false,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const spb = useSupabaseClient();
  const { toast } = useToast();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    let data, error;
    if (createAccount) {
      ({ data, error } = await spb.auth.signUp({ email, password }));
    } else {
      ({ data, error } = await spb.auth.signInWithPassword({
        email,
        password,
      }));
    }
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
        title: "Success",
        description: createAccount
          ? "Signed up successfully. Check your email to verify your account."
          : "Signed in successfully.",
      });

      if (!createAccount) {
        router.push("/dashboard");
      }
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
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              disabled={isLoading}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm font-medium tracking-wide">
                {error}
              </p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {createAccount ? "Create Account" : "Sign In"}
          </Button>
          <div className="text-center">
            <Link href={createAccount ? "/signin/password" : "/login/password"}>
              {createAccount
                ? "Have an account? Sign in"
                : "Don't have an account? Sign up"}
            </Link>
          </div>
          <div className="text-center">
            <Link href="/login">Or use magic link</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

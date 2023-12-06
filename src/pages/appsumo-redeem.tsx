import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Footer } from "@/components/website/footer.component";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/router";

const font = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await fetch("/api/redeem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });
      const data = await result.json();
      setIsLoading(false);
      if (data.error) {
        setError(data.error);
      } else {
        setError(null);
        toast({
          title: "Success",
          description:
            "Your code has been redeemed. You will be redirected to login page.",
          className: "bg-green-500",
        });
        setTimeout(() => {}, 2000);
        router.push("/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        className: "bg-red-500",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NextSeo
        title="LogoPicture AI - Redeem your AppSumo code"
        description="Get AI optical illusion art with your logo in few minutes. Upload logos, pick your styles & generate 50+ pictures. One-time payment."
        openGraph={{
          url: "https://logopictureai.com",
          title: "LogoPicture AI - Redeem your AppSumo code",
          description:
            "Get AI optical illusion art with your logo in few minutes. Upload logos, pick your styles & generate 50+ pictures. One-time payment.",
          images: [
            {
              url: "https://logopictureai.com/og.png",
              width: 3100,
              height: 1624,
              alt: "LogoPicture AI - Redeem your AppSumo code",
              type: "image/png",
            },
          ],
          siteName: "LogoPicture AI",
        }}
      />
      <main
        className={`flex min-h-screen w-full pt-10 sm:pt-20 flex-col px-8 sm:px-24 ${font.className}`}
      >
        <section className="">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[65%_35%] w-full">
              <div className="w-full">
                <p className="sm:text-3xl text-lg font-semibold tracking-wider">
                  {APP_NAME}
                </p>
                <h1 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                  Redeem your AppSumo code
                </h1>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-20">
          <div className="grid grid-cols-2 gap-4">
            <form onSubmit={onSubmit}>
              <div className="grid gap-2 max-w-lg pl-10">
                <div className="grid gap-1">
                  <Label htmlFor="email">Email</Label>
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
                  <Label htmlFor="code">Code</Label>
                  <Input
                    id="code"
                    placeholder="abc123..."
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    disabled={isLoading}
                    required
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                  />
                  {error && (
                    <p className="text-red-500 text-sm font-medium tracking-wide">
                      {error}
                    </p>
                  )}
                </div>
                <Button disabled={isLoading} type="submit">
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Redeem your code
                </Button>
                {/* <div className="text-center">
            <Link href="/login/password">
              Create account with password instead
            </Link>
          </div> */}
              </div>
            </form>
            <div className="flex flex-col gap-2">
              <ul className="list-disc list-inside">
                <li className="py-1">
                  Please use your real email, created account will be connected
                  to this email.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="pt-2">
          <Footer />
        </section>
      </main>
    </>
  );
}

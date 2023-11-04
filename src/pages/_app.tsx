import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Database } from "@/lib/types/supabase";
import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from "next/font/google";
import { DefaultSeo } from "next-seo";

const font = Montserrat({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <>
          <DefaultSeo
            openGraph={{
              type: "website",
              locale: "en_IE",
              url: "https://logopictureai.com",
              siteName: "LogoPicture AI",
            }}
            twitter={{
              handle: "@garrikkotua",
              site: "@garrikkotua",
              cardType: "summary_large_image",
            }}
          />
          <style jsx global>{`
            html {
              font-family: ${font.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
          <Toaster />
          <Analytics />
        </>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

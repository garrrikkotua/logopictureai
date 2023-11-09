import { NextSeo } from "next-seo";
import { Footer } from "@/components/website/footer.component";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { CHECKOUT_URL_STARTER } from "@/lib/constants";
import Link from "next/link";
import { CTA } from "@/components/website/cta.component";

interface BlogLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function BlogLayout(props: BlogLayoutProps) {
  return (
    <>
      <NextSeo
        title={`LogoPicture AI - ${props.title}`}
        description={props.description}
      />
      <main
        className={`flex min-h-screen w-full pt-10 sm:pt-20 flex-col px-8 sm:px-24`}
      >
        <section className="">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[65%_35%] w-full">
              <div className="w-full">
                <p className="sm:text-3xl text-lg font-semibold tracking-wider">
                  <Link href="/">{APP_NAME}</Link>
                </p>
                <h1 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                  {props.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {props.children}
          </div>
        </section>
        <CTA />
        <Footer />
      </main>
    </>
  );
}

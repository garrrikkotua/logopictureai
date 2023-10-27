import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const font = Montserrat({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen w-full justify-center flex-col gap-8 px-24 ${font.className}`}
    >
      <section className="bg-[#FCF8F1] bg-opacity-30 pt-24">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 justify-center gap-12 lg:grid-cols-[65%_35%]">
            <div>
              <p className="text-3xl font-semibold tracking-wider">
                {APP_NAME}
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-12 sm:text-5xl xl:text-[64px]">
                Create content with logo in a few minutes
              </h1>
              <p className="mt-4 text-xl text-black lg:mt-8 sm:text-2xl leading-[150%]">
                You can no longer puzzle over where to get content for a
                beautiful and catchy design. You can create it in a few minutes
                right now!
                <br /> <br />
                Image ideas are limited only by your imagination. No ideas at
                all? This is not a problem, AI will offer you ideas.
                <br /> <br />
                Let’s try!
              </p>

              <Button
                asChild
                className="inline-flex items-center px-6 py-6 mt-8 font-semibold text-white bg-black transition-all duration-200 rounded-lg lg:mt-16"
                role="button"
              >
                <Link href="/login">Start Generating</Link>
              </Button>
            </div>

            <div className="pt-16 flex-shrink-0">
              <AspectRatio ratio={41 / 59}>
                <Image
                  src="/showcase.png"
                  alt="Showcase"
                  width="410"
                  height="590"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-4">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 justify-center gap-12 lg:grid-cols-[65%_35%]">
            <h2 className="mt-4 text-4xl font-bold text-black lg:mt-12 sm:text-5xl xl:text-[64px]">
              How it works
            </h2>
          </div>
        </div>
      </section>
    </main>
  );
}

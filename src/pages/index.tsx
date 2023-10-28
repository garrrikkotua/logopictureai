import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const font = Montserrat({ subsets: ["latin"] });

const Card = ({
  num,
  plan,
  price,
}: {
  num: number;
  plan: string;
  price: number;
}) => {
  return (
    <div className="w-full max-w-sm flex flex-col items-center h-48 border-2 border-black rounded-3xl mx-auto">
      <div className="flex flex-row px-4 pt-6 gap-4">
        <div className="xl:text-3xl text-2xl font-semibold my-auto">
          <span>{num} pictures</span>
          <p className="xl:text-2xl text-xl font-normal">{plan}</p>
        </div>
        <div
          className="text-3xl py-10"
          style={{ borderLeft: "1px solid black", height: "80px" }}
        ></div>
        <div className="xl:text-5xl text-4xl my-auto font-semibold">
          {price}$
        </div>
      </div>
      <div className="pt-6">
        <Button
          variant="secondary"
          className="text-xl rounded-lg border border-black hover:bg-main-grad"
        >
          Get started
        </Button>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main
      className={`flex min-h-screen w-full pt-20 flex-col px-24 ${font.className}`}
    >
      <section className="">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[65%_35%] w-full">
            <div className="w-full">
              <p className="text-3xl font-semibold tracking-wider">
                {APP_NAME}
              </p>
              <h1 className="mt-4 text-4xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                Create content with logo in a few minutes
              </h1>
              <p className="mt-4 text-xl text-black lg:mt-14 sm:text-2xl leading-[150%]">
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
                className="inline-flex items-center px-6 py-6 mt-8 font-semibold text-white bg-black transition-all duration-200 rounded-lg lg:mt-16"
                role="button"
                onClick={() => {
                  const element = document.getElementById("pricing");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Start Generating
              </Button>

              <Button asChild variant="link">
                <Link href="/login" className="underline">
                  Or Login
                </Link>
              </Button>
            </div>

            <div className="pt-14 w-full mx-auto">
              <Image
                src="/showcase.png"
                alt="Optical Illusion Art Demonstration"
                width="410"
                height="590"
                className="mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pt-48">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-3xl font-semibold tracking-wider">
              ▶︎ How it works
            </p>
            <h2 className="mt-4 text-4xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
              The easiest way to create optical illussion art with your logo
            </h2>
          </div>
          <div className="relative max-w-md mx-auto mt-12 md:max-w-none md:mt-20">
            <div className="absolute inset-x-0 hidden top-36 xl:block">
              <Image
                className="object-contain w-full h-auto max-w-xl mx-auto"
                src="https://cdn.rareblocks.xyz/collection/clarity/images/how-it-works/2/line-pattern.png"
                alt=""
                width="1036"
                height="240"
              />
            </div>

            <div className="grid grid-cols-1 text-center md:text-left md:grid-cols-3 md:gap-x-16 gap-y-12 xl:gap-x-32">
              <div className="flex flex-col justify-between">
                <div className="relative flex-shrink-0 mx-8 md:mx-0">
                  <div className="absolute -inset-1">
                    <div
                      className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter"
                      // style="background: linear-gradient(90deg, #148DFC -0.55%, #32A1FD 22.86%, #4FB5FE 48.36%, #6DC8FE 73.33%, #8ADCFF 99.34%)"
                    ></div>
                  </div>
                  <Image
                    className="relative w-full h-auto mx-auto filter drop-shadow-lg scale-110"
                    src="/upload.png"
                    alt="Upload Logo"
                    width="400"
                    height="800"
                  />
                </div>

                <div className="mt-6 md:mt-10">
                  <h3 className="text-xl font-bold text-gray-900 font-pj">
                    Upload your logo
                  </h3>
                  <p className="mt-4 text-base font-normal leading-7 text-gray-600">
                    Simply upload your logo in a png or jpeg format
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4">
                <div className="relative flex-shrink-0 mx-8 md:mx-0">
                  <div className="absolute -inset-1">
                    <div
                      className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter"
                      // style="background: linear-gradient(90deg, #148DFC -0.55%, #32A1FD 22.86%, #4FB5FE 48.36%, #6DC8FE 73.33%, #8ADCFF 99.34%)"
                    ></div>
                  </div>
                  <Image
                    className="relative w-full h-auto mx-auto filter drop-shadow-lg scale-95"
                    src="/prompts.png"
                    alt="Predefined AI prompts for logo art"
                    width="400"
                    height="400"
                  />
                </div>

                <div className="mt-6 md:mt-10">
                  <h3 className="text-xl font-bold text-gray-900 font-pj">
                    Pick a style
                  </h3>
                  <p className="mt-4 text-base font-normal leading-7 text-gray-600">
                    Select a predefined prompt, generate a random one or create
                    your own
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="relative flex-shrink-0 mx-8 md:mx-0">
                  <div className="absolute -inset-1">
                    <div
                      className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter"
                      // style="background: linear-gradient(90deg, #148DFC -0.55%, #32A1FD 22.86%, #4FB5FE 48.36%, #6DC8FE 73.33%, #8ADCFF 99.34%)"
                    ></div>
                  </div>
                  <Image
                    className="relative w-full h-auto mx-auto filter drop-shadow-lg"
                    src="/email.png"
                    alt="Optical Illusion Art Generated from Logo delivered via email"
                    width="400"
                    height="400"
                  />
                </div>

                <div className="mt-14 md:mt-10 lg:mt-6">
                  <h3 className="text-xl font-bold text-gray-900 font-pj">
                    Get pictures via email
                  </h3>
                  <p className="mt-4 text-base font-normal leading-7 text-gray-600">
                    All pictures are generated in a few minutes. You will
                    receive them in your email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-48" id="pricing">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="w-full">
            <p className="text-3xl font-semibold tracking-wider">▶︎ Pricing</p>
            <div className="flex flex-row w-full items-center">
              <h2 className="mt-4 text-4xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px] max-w-3xl">
                Start generating logo art right now
              </h2>
              <div className="ml-auto ">
                <Image
                  src="/lpanimation.gif"
                  alt="LogoPicture AI Animation"
                  width="150"
                  height="150"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-10">
            <Card num={50} plan="Starter*" price={9.9} />
            <Card num={200} plan="Growth" price={19} />
            <Card num={500} plan="Scale" price={39} />
          </div>
          <p className="pt-8 max-w-xs ml-3">
            *No questions asked, 7-day money-back guarantee for Starter plan
          </p>
        </div>
      </section>
      <section className="pt-48" id="pricing">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-3xl font-semibold tracking-wider">▶︎ FAQ</p>
            <h2 className="mt-4 text-4xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
              Answers to common questions about LogoPicture AI
            </h2>
          </div>
          <div className="pt-8 max-w-2xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if
                  you prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}

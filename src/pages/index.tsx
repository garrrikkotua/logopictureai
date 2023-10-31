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

// lemon squeezy checkout url
const CHECKOUT_URL_STARTER =
  "https://igorkotua.lemonsqueezy.com/checkout/buy/d28ba7f4-5df9-4bf2-b7f5-45274fa95679?discount=0";

const CHECKOUT_URL_GROWTH =
  "https://igorkotua.lemonsqueezy.com/checkout/buy/99d2fa16-152f-40ab-bd70-47a955200d2e?discount=0";

const CHECKOUT_URL_SCALE =
  "https://igorkotua.lemonsqueezy.com/checkout/buy/1c46bdfd-9748-4fdc-a7a9-763ba89856bd?discount=0";

const Card = ({
  num,
  plan,
  price,
  url,
}: {
  num: number;
  plan: string;
  price: number;
  url: string;
}) => {
  return (
    <div className="w-full max-w-sm flex flex-col items-center justify-between h-48 xl:h-56 border-2 border-black rounded-3xl mx-auto gap-4">
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
      <div className="pb-6">
        <Button
          variant="secondary"
          asChild
          className="text-xl rounded-lg border border-black hover:bg-main-grad"
        >
          <Link href={url}>Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main
      className={`flex min-h-screen w-full pt-20 flex-col px-8 sm:px-24 ${font.className}`}
    >
      <section className="">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[65%_35%] w-full">
            <div className="w-full">
              <p className="sm:text-3xl text-base font-semibold tracking-wider">
                {APP_NAME}
              </p>
              <h1 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                Create content with logo in a few minutes
              </h1>
              <div className="pt-14 w-full sm:hidden">
                <Image
                  src="/showcase.png"
                  alt="Optical Illusion Art Demonstration"
                  width="410"
                  height="590"
                  className="mx-auto"
                />
              </div>
              <p className="mt-4 text-[15px] text-black lg:mt-14 sm:text-2xl leading-[150%]">
                You can no longer puzzle over where to get beautiful pictures
                for your brand. You can create optical illusion art with your
                logo in a few minutes!
                <br /> <br />
                Picture ideas are limited only by your imagination. No ideas at
                all? This is not a problem, AI will offer you ideas.
                <br /> <br />
                Try it right now!
              </p>
              <Button
                className="inline-flex items-center px-4 sm:px-6 py-4 sm:py-6 mt-8 font-semibold text-white bg-black transition-all duration-200 rounded-lg lg:mt-16"
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

            <div className="pt-14 w-full mx-auto hidden sm:block">
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
      <section className="pt-20 sm:pt-48">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="sm:text-3xl text-base font-semibold tracking-wider">
              ▶︎ How it works
            </p>
            <h2 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
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

            <div className="grid grid-cols-1 text-center md:text-left md:grid-cols-3 md:gap-x-16 gap-y-6 xl:gap-x-32">
              <div className="flex flex-col justify-between gap-4">
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

                <div className="mt-6 md:mt-10 text-left sm:text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Upload your logo
                  </h3>
                  <p className="mt-4 text-base sm:text-xl font-normal leading-7 text-gray-600">
                    Simply upload your logo in a png or jpeg format, square
                    ratio is recommended
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

                <div className="mt-6 md:mt-10 text-left sm:text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 ">
                    Pick a style
                  </h3>
                  <p className="mt-4 text-base sm:text-xl font-normal leading-7 text-gray-600">
                    Select a predefined prompt, generate a random one or create
                    your own
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
                    className="relative w-full h-auto mx-auto filter drop-shadow-lg"
                    src="/email.png"
                    alt="Optical Illusion Art Generated from Logo delivered via email"
                    width="400"
                    height="400"
                  />
                </div>

                <div className="mt-6 md:mt-10 lg:mt-6 text-left sm:text-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Get pictures via email
                  </h3>
                  <p className="mt-4 text-base sm:text-xl font-normal leading-7 text-gray-600">
                    All pictures are generated in a few minutes. You will
                    receive them in your email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-20 sm:pt-48" id="pricing">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="w-full">
            <p className="sm:text-3xl text-base font-semibold tracking-wider">
              ▶︎ Pricing
            </p>
            <div className="flex flex-row w-full items-center">
              <h2 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px] max-w-3xl">
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
            <Card
              num={50}
              plan="Starter*"
              price={9.9}
              url={CHECKOUT_URL_STARTER}
            />
            <Card
              num={200}
              plan="Growth"
              price={19}
              url={CHECKOUT_URL_GROWTH}
            />
            <Card num={500} plan="Scale" price={39} url={CHECKOUT_URL_SCALE} />
          </div>
          <p className="pt-8 max-w-xs mx-auto text-center lg:mx-0 lg:ml-3 lg:text-left text-xl">
            *No questions asked, 7-day money-back guarantee for Starter plan
          </p>
        </div>
      </section>
      <section className="pt-20 sm:pt-48" id="pricing">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="sm:text-3xl text-base font-semibold tracking-wider">
              ▶︎ FAQ
            </p>
            <h2 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
              Answers to common questions about LogoPicture AI
            </h2>
          </div>
          <div className="pt-8 max-w-2xl">
            <Accordion
              type="single"
              collapsible
              className="text-xl sm:text-2xl"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                <AccordionContent className="text-xl">
                  Yes, we offer a 7-day money-back guarantee for Starter plan.
                  For other plans refunds are not available. But if you are
                  unhappy with the results, please contact us and we will help
                  you to get the best results.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What type of logo should I upload?
                </AccordionTrigger>
                <AccordionContent className="text-xl">
                  We strongly recommend to upload a logo with a transparent
                  background and with a square (1:1) ratio. The simplest
                  versions of the logo work best - black and white, without
                  text.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How long does it take to get the results?
                </AccordionTrigger>
                <AccordionContent className="text-xl">
                  Pictures are generated in a few minutes. You will receive them
                  in your email once they are ready.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  I need more pictures. Can I buy more credits?
                </AccordionTrigger>
                <AccordionContent className="text-xl">
                  Yes, you can buy any plan multiple times. For example, if you
                  need 1000 pictures, you can buy 2 plans of 500 pictures each.
                  They all will be added to your account. Please note, that your
                  account is associated with your email. So, if you buy a plan
                  with a different email, you will need to login with that email
                  to access your credits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  What output formats do you support?
                </AccordionTrigger>
                <AccordionContent className="text-xl">
                  All output pictures are in PNG format. Currently, all
                  generated pictures are in 1:1 ratio and 768x768 resolution.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  What if I don&apos;t like the results?
                </AccordionTrigger>
                <AccordionContent className="text-xl">
                  Plesase{" "}
                  <a href="mailto:kotuaigor@gmail.dom" className="underline">
                    reach out to us
                  </a>{" "}
                  and we will help you to get the best results.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>
                  What payment methods do you support?
                </AccordionTrigger>
                <AccordionContent className="text-xl">
                  We accept all major credit cards, PayPal, Apple Pay, Google
                  Pay, Alipay, WeChat Pay, and Bank debits (ACH). Everything is
                  processed by LemonSqueezy MoR.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      <section className="pt-20 sm:pt-48 sm:py-16 lg:py-20">
        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="absolute -inset-4">
            <div className="w-full h-full mx-auto opacity-30 blur-lg filter"></div>
          </div>
          <div className="relative px-8 py-10 overflow-hidden lg:px-24 md:py-20 bg-gray-50 rounded-3xl">
            <div className="max-w-lg mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                Generate logo art right now
              </h2>
            </div>

            <ul className="flex flex-col items-center justify-center mt-8 space-y-5 sm:mt-12 lg:mt-16 md:flex-row md:space-y-0 md:space-x-12">
              <li className="flex items-center text-gray-900">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="ml-3 text-xl font-bold">
                  {" "}
                  High resemblance
                </span>
              </li>

              <li className="flex items-center text-gray-900">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="ml-3 text-xl font-bold">
                  Multiple{" "}
                  <span className="hidden sm:inline-block">predefined</span>{" "}
                  styles
                </span>
              </li>

              <li className="flex items-center text-gray-900">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="ml-3 text-xl font-bold"> 3 min delivery</span>
              </li>
            </ul>

            <div className="mt-8 text-center sm:mt-12">
              <Button
                asChild
                className="inline-flex items-center px-6 py-6 mt-8 font-semibold text-white bg-black transition-all duration-200 rounded-lg lg:mt-16"
              >
                <Link href={CHECKOUT_URL_STARTER}>Start generating</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <footer className="py-12 sm:py-16 lg:py-20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="text-2xl sm:text-3xl font-semibold tracking-wider text-center">
            {APP_NAME}
          </p>

          <ul className="flex flex-row flex-wrap justify-center items-center content-center mt-14 gap-6">
            <li>
              <a
                href="/contact"
                title=""
                className="text-xl font-medium text-gray-900 transition-all duration-200 transform hover:-translate-y-1 hover:text-gray-600"
              >
                Contact us
              </a>
            </li>

            <li className="text-center">
              <a
                href="/terms-and-conditions"
                title=""
                className="text-xl font-medium text-gray-900 transition-all duration-200 transform hover:-translate-y-1 hover:text-gray-600"
              >
                Terms &amp; Conditions
              </a>
            </li>

            <li>
              <a
                href="/terms-and-conditions"
                title=""
                className="text-xl font-medium text-gray-900 transition-all duration-200 transform hover:-translate-y-1 hover:text-gray-600"
              >
                Refund Policy
              </a>
            </li>

            <li>
              <a
                href="/blog"
                title=""
                className="text-lg font-medium text-gray-900 transition-all duration-200 transform font-pj hover:-translate-y-1 hover:text-gray-600"
              >
                Blog
              </a>
            </li>
          </ul>

          <div className="mt-12">
            <svg
              className="w-auto h-4 mx-auto text-gray-300"
              viewBox="0 0 172 16"
              fill="none"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 11 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 46 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 81 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 116 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 151 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 18 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 53 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 88 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 123 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 158 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 25 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 60 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 95 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 130 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 165 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 32 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 67 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 102 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 137 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 172 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 39 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 74 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 109 1)"
              ></line>
              <line
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform="matrix(-0.5547 0.83205 0.83205 0.5547 144 1)"
              ></line>
            </svg>
          </div>

          <ul className="flex items-center justify-center mt-12 space-x-3">
            <li>
              <a
                href="https://twitter.com/garrrikkotua"
                target="_blank"
                title=""
                className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                rel="noopener"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                </svg>
              </a>
            </li>

            {/* <li>
              <a
                href="#"
                target="_blank"
                title=""
                className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                rel="noopener"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                target="_blank"
                title=""
                className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                rel="noopener"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                  <circle cx="16.806" cy="7.207" r="1.078"></circle>
                  <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                </svg>
              </a>
            </li> */}

            <li>
              <a
                href="https://github.com/garrrikkotua/logopictureai"
                target="_blank"
                title=""
                className="inline-flex items-center justify-center w-10 h-10 text-gray-900 transition-all duration-200 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                rel="noopener"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>

          <p className="text-base font-normal text-center text-gray-600 mt-7 font-pj">
            © 2023 LogoPicture AI, made by{" "}
            <a
              href="https://twitter.com/garrrikkotua"
              className="font-semibold"
            >
              @garrrikkotua
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}

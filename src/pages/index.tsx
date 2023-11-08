import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  APP_NAME,
  CHECKOUT_URL_STARTER,
  CHECKOUT_URL_GROWTH,
  CHECKOUT_URL_SCALE,
} from "@/lib/constants";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NextSeo } from "next-seo";
import { Footer } from "@/components/website/footer.component";
import { GalleryComponentGitHub } from "@/components/website/gallery.component";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const font = Montserrat({ subsets: ["latin"] });

const Ratings = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <div className="flex overflow-hidden">
        <Avatar>
          <AvatarImage src="/avt1.jpeg" />
          <AvatarFallback>LP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/avt2.jpeg" />
          <AvatarFallback>LP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/avt3.jpeg" />
          <AvatarFallback>LP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/avt4.jpeg" />
          <AvatarFallback>LP</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage src="/avt5.jpeg" />
          <AvatarFallback>LP</AvatarFallback>
        </Avatar>
      </div>
      <p className="mx-auto max-w-lg text-sm text-gray-500 lg:mx-0">
        <strong>1,000+</strong> AI pictures already created
      </p>
      <div className="flex convert-13-v1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-yellow-400"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-yellow-400"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-yellow-400"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-yellow-400"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 text-yellow-400"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      </div>
    </div>
  );
};

const Showcase = () => {
  return (
    <div className="flex flex-col justify-center gap-2 w-full">
      <div className="flex flex-row gap-2 items-center mx-auto">
        <div>
          <Image
            src="/github_simple_logo.png"
            alt="Github Logo"
            width={134}
            height={134}
            className="mx-auto"
          />
        </div>
        <span className="text-3xl font-semibold shrink-0">+ LogoPicture</span>
      </div>
      <div className="mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="51"
          viewBox="0 0 24 51"
          fill="none"
        >
          <path
            d="M10.9393 50.0607C11.5251 50.6464 12.4749 50.6464 13.0607 50.0607L22.6066 40.5147C23.1924 39.9289 23.1924 38.9792 22.6066 38.3934C22.0208 37.8076 21.0711 37.8076 20.4853 38.3934L12 46.8787L3.51472 38.3934C2.92893 37.8076 1.97919 37.8076 1.3934 38.3934C0.807611 38.9792 0.807611 39.9289 1.3934 40.5147L10.9393 50.0607ZM10.5 0L10.5 49H13.5L13.5 0L10.5 0Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-6 items-center justify-center mx-auto">
        <Image
          src="/github/mech.jpeg"
          alt="Github Mechanism Illustration"
          width={190}
          height={190}
          className="rounded-3xl"
        />

        <Image
          src="/github/roman_garden.png"
          alt="Github Roman Garden"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src="/github/ocean.png"
          alt="Github Ocean View"
          width={190}
          height={190}
          className="rounded-3xl"
        />

        <Image
          src="/github/alien_world.png"
          alt="Github Alien World"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Link
          href="/gallery"
          className="underline underline-offset-2 cols-span-2"
        >
          More Examples
        </Link>
      </div>
    </div>
  );
};

const ShowcaseMobile = () => {
  return (
    <div className="flex flex-col justify-center pt-4 sm:hidden">
      <div className="flex flex-row gap-2 items-center">
        <div>
          <Image
            src="/github_simple_logo.png"
            alt="Github Logo"
            width={90}
            height={90}
          />
        </div>
        <span className="sm:text-xl text-lg font-semibold shrink-0">
          + LogoPicture ={" "}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 mr-auto">
        <Image
          src="/github/mech.jpeg"
          alt="Github Mechanism Illustration"
          width={190}
          height={190}
          className="rounded-3xl"
        />

        <Image
          src="/github/roman_garden.png"
          alt="Github Roman Garden"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src="/github/ocean.png"
          alt="Github Ocean View"
          width={190}
          height={190}
          className="rounded-3xl"
        />

        <Image
          src="/github/alien_world.png"
          alt="Github Alien World"
          width={190}
          height={190}
          className="rounded-3xl"
        />
      </div>
    </div>
  );
};

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
    <div className="w-full max-w-sm flex flex-col items-center justify-between h-56 xl:h-60 2xl:h-56 border-2 border-black rounded-3xl mx-auto gap-4">
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
          ${price}
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
        <p className="pt-4 pb-4">One-time payment</p>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <NextSeo
        title="LogoPicture AI - Create optical illusion art with your logo"
        description="Get AI optical illusion art with your logo in few minutes. Upload logos, pick your styles & generate 50+ pictures. One-time payment."
        openGraph={{
          url: "https://logopictureai.com",
          title: "LogoPicture AI - Create optical illusion art with your logo",
          description:
            "Get AI optical illusion art with your logo in few minutes. Upload logos, pick your styles & generate 50+ pictures. One-time payment.",
          images: [
            {
              url: "https://logopictureai.com/og.png",
              width: 3100,
              height: 1624,
              alt: "LogoPicture AI - Create optical illusion art with your logo",
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
                  Create optical illusion art with your logo
                </h1>
                <ShowcaseMobile />
                <p className="mt-4 sm:mt-8 text-[15px] text-black lg:mt-14 sm:text-2xl leading-[150%]">
                  Get AI optical illusion art with your logo in few minutes.
                  Upload logos, pick your styles & generate 50+ pictures.
                </p>
                <p className="mt-4 sm:mt-8 text-[15px] text-black sm:text-2xl leading-[150%]">
                  Picture ideas are limited only by your imagination. No ideas
                  at all? This is not a problem, AI will offer you ideas.
                </p>
                <p className="mt-4 sm:mt-8 text-[15px] text-black sm:text-2xl leading-[150%]">
                  Try it right now!
                </p>
                <Button
                  className="inline-flex items-center px-4 sm:px-8 py-4 sm:py-8 mt-4 sm:text-2xl font-semibold text-white bg-black transition-all duration-200 rounded-xl lg:mt-16"
                  role="button"
                  onClick={() => {
                    const element = document.getElementById("pricing");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start Generating
                </Button>

                <Button asChild variant="link">
                  <Link
                    href="/login"
                    className="underline underline-offset-2 sm:text-2xl"
                  >
                    Or Login
                  </Link>
                </Button>

                <div className="pt-4">
                  {" "}
                  <Ratings />
                </div>
              </div>

              <div className="pt-20 w-full mx-auto hidden sm:block">
                <Showcase />
              </div>
            </div>
          </div>
        </section>
        <section className="pt-20 sm:pt-48">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="sm:text-3xl text-lg font-semibold tracking-wider">
                ▶︎ How it works
              </p>
              <h2 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                The easiest way to create optical illusion art with your logo
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
                      Simply upload your logo in either png or jpeg format. A
                      square ratio is recommended.
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
                      Select a predefined prompt, generate a random one, or
                      create your own.
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
                      All pictures are generated within a few minutes and will
                      be delivered to your email.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-20 sm:pt-48">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="w-full">
              <p className="sm:text-3xl text-lg font-semibold tracking-wider">
                ▶︎ Multiple styles
              </p>
              <h2 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px] max-w-3xl">
                Select from a variety of predefined styles
              </h2>
              <div className="xl:mt-24">
                <GalleryComponentGitHub />
                <p className="pt-8 max-w-lg mx-auto text-center lg:mx-0 lg:ml-3 lg:text-left text-xl">
                  Generate beautiful pictures with your logo in no time thanks
                  to our predefined styles. You can also create your own style
                  by entering a prompt.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-20 sm:pt-48" id="pricing">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="w-full">
              <p className="sm:text-3xl text-lg font-semibold tracking-wider">
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
              <Card
                num={500}
                plan="Scale"
                price={39}
                url={CHECKOUT_URL_SCALE}
              />
            </div>
            <p className="pt-8 max-w-xs mx-auto text-center lg:mx-0 lg:ml-3 lg:text-left text-xl">
              *7-day money-back guarantee for the Starter plan, no questions
              asked
            </p>
          </div>
        </section>
        <section className="pt-20 sm:pt-48" id="faq">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[65%_35%] w-full">
              <div className="w-full">
                <div className="max-w-3xl">
                  <p className="sm:text-3xl text-lg font-semibold tracking-wider">
                    ▶︎ FAQ
                  </p>
                  <h2 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                    Answers to common questions about LogoPicture AI
                  </h2>
                  {/* <Image
                    src="/faq.png"
                    alt="Optical Illusion FAQ"
                    width="500"
                    height="500"
                    className="pt-4 sm:hidden rounded-3xl"
                  /> */}
                </div>
                <div className="pt-8 max-w-2xl">
                  <Accordion
                    type="single"
                    collapsible
                    className="text-xl sm:text-2xl"
                  >
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        What type of logo should I upload?
                      </AccordionTrigger>
                      <AccordionContent className="text-xl">
                        We strongly recommend uploading a logo with a white
                        background and a square (1:1) ratio. The simplest
                        versions of the logo work best - black and white, or one
                        color. Background shouldnt be transparent. If you have a
                        logo with a transparent background, please add a white
                        background before uploading.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How long does it take to get the results?
                      </AccordionTrigger>
                      <AccordionContent className="text-xl">
                        Pictures are generated within a few minutes. You will
                        receive them via email once they are ready.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>
                        I need more pictures. Can I buy more credits?
                      </AccordionTrigger>
                      <AccordionContent className="text-xl">
                        Yes, you can purchase any plan multiple times. For
                        instance, if you require 1000 pictures, you can purchase
                        two 500-picture plans. All will be added to your
                        account. Please note that your account is associated
                        with your email. Therefore, if you purchase a plan using
                        a different email, you will need to log in with that
                        email to access your credits.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>
                        What output formats do you support?
                      </AccordionTrigger>
                      <AccordionContent className="text-xl">
                        All output pictures are in PNG format. Currently, all
                        the pictures generated are in a 1:1 ratio and have a
                        resolution of 768x768.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger>
                        What if I don&apos;t like the results?
                      </AccordionTrigger>
                      <AccordionContent className="text-xl">
                        Plesase{" "}
                        <a
                          href="mailto:kotuaigor@gmail.dom"
                          className="underline"
                        >
                          reach out to us
                        </a>{" "}
                        and we will help you to get the best results.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                      <AccordionContent className="text-xl">
                        Yes, we offer a 7-day money-back guarantee for the
                        Starter plan. Refunds are not available for other plans.
                        However, if you are unsatisfied with the results, please
                        contact us and we will assist you in achieving the best
                        results.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                      <AccordionTrigger>
                        What payment methods do you support?
                      </AccordionTrigger>
                      <AccordionContent className="text-xl">
                        We accept all major credit cards, PayPal, Apple Pay,
                        Google Pay, Alipay, WeChat Pay, and bank debits (ACH).
                        All transactions are processed by LemonSqueezy MoR.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
              {/* <div className="pt-20 w-full mx-auto hidden sm:block">
                <Image
                  src="/faq.png"
                  alt="Optical Illusion FAQ"
                  width="410"
                  height="590"
                  className="mx-auto rounded-3xl"
                />
              </div> */}
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
                  <span className="ml-3 text-xl font-bold">
                    {" "}
                    3 min delivery
                  </span>
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
        <Footer />
      </main>
    </>
  );
}

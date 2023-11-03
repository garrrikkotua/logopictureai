import { NextSeo } from "next-seo";
import { Footer } from "@/components/website/footer.component";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GalleryComponentGitHub,
  GalleryComponentCrowdDev,
} from "@/components/website/gallery.component";
import { CHECKOUT_URL_STARTER } from "@/lib/constants";

export default function Gallery() {
  return (
    <>
      <NextSeo
        title="LogoPicture AI - Gallery"
        description="Gallery of AI optical illusion art with your logo"
      />
      <main
        className={`flex min-h-screen w-full pt-10 sm:pt-20 flex-col px-8 sm:px-24`}
      >
        <section className="">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[65%_35%] w-full">
              <div className="w-full">
                <p className="sm:text-3xl text-lg font-semibold tracking-wider">
                  {APP_NAME}
                </p>
                <h1 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                  Gallery
                </h1>

                <p className="mt-4 sm:mt-8 text-[15px] text-black lg:mt-14 sm:text-2xl leading-[150%]">
                  Check out some of the pictures that have been generated with{" "}
                  {APP_NAME} and create your own optical illusion art with your
                  logo!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="pt-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="sm:text-3xl text-lg font-semibold tracking-wider">
                ▶︎ GitHub logo
              </p>
              <h2 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                Examples of pictures generated from the GitHub logo
              </h2>
            </div>
            <div className="xl:mt-24">
              <GalleryComponentGitHub />
            </div>
          </div>
        </section>
        <section className="pt-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <p className="sm:text-3xl text-lg font-semibold tracking-wider">
                ▶︎ crowd.dev logo
              </p>
              <h2 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                Examples of pictures generated from the crowd.dev logo
              </h2>
            </div>
            <div className="xl:mt-24">
              <GalleryComponentCrowdDev />
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

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CHECKOUT_URL_STARTER } from "@/lib/constants";

export const CTA = () => {
  return (
    <section className="pt-20 sm:pt-48 sm:py-16 lg:py-20">
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="absolute -inset-4">
          <div className="w-full h-full mx-auto opacity-30 blur-lg filter"></div>
        </div>
        <div className="relative px-8 py-10 overflow-hidden lg:px-24 md:py-20 bg-gray-50 border border-green-300 rounded-3xl">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
              Boost Your Designs with Optical Illusion Art
            </h2>
          </div>

          <ul className="flex flex-col items-center justify-center mt-8 space-y-5 sm:mt-12 lg:mt-16 lg:flex-row lg:space-y-0 lg:space-x-12">
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
              <span className="ml-3 text-xl font-bold"> 50+ pictures</span>
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
              <span className="ml-3 text-xl font-bold"> High resolution</span>
            </li>
          </ul>

          <div className="mt-8 text-center sm:mt-12">
            <Button
              asChild
              className="inline-flex items-center px-6 py-6 mt-8 font-semibold text-white bg-black transition-all duration-200 rounded-lg lg:mt-16"
            >
              <Link href={CHECKOUT_URL_STARTER}>Create Logo Art Now →</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

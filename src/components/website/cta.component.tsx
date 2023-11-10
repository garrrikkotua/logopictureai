import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Ratings = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-2 items-center justify-center space-x-4">
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
      <div className="flex">
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
              <Link href="/#pricing">Create Logo Art Now →</Link>
            </Button>
            <div className="mt-16">
              <Ratings />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

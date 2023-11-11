import { NextSeo } from "next-seo";
import { Footer } from "@/components/website/footer.component";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import {
  GalleryComponentGitHub,
  GalleryComponentCrowdDev,
} from "@/components/website/gallery.component";
import { CTA } from "@/components/website/cta.component";

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
                  <Link href="/">{APP_NAME}</Link>
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
            <div className="xl:mt-24 mt-8">
              <GalleryComponentCrowdDev />
            </div>
          </div>
        </section>
        <CTA />
        <Footer />
      </main>
    </>
  );
}

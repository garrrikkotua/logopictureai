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
import { CTA } from "@/components/website/cta.component";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { DashboardLayout } from "@/layouts/dashboard.layout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogoPicker, {
  addWhiteBackground,
} from "@/components/dashboard/logo.picker.component";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import useEnterSubmit from "@/lib/hooks/use-enter-submit";
import { Textarea } from "@/components/ui/textarea";
import { Database } from "@/lib/types/supabase";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from "lucide-react";
// @ts-ignore
import promptmaker from "promptmaker";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMemo } from "react";
import {
  STYLE_PROMPTS,
  FOOD_PROMPTS,
  HOLIDAY_PROMPTS,
  ARCHITECTURE_PROMPTS,
  LANDMARK_PROMPTS,
  SPACE_PROMPTS,
  MOVIES_TV_PROMPTS,
} from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRef } from "react";
import PhotoBooth from "@/components/dashboard/booth.component";

const font = Montserrat({ subsets: ["latin"] });

export default function Home() {
  const handleSubmit = async () => {};
  const formRef = useRef<HTMLFormElement>(null);

  const [pattern, setPattern] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [selectedStyle, setSelectedStyle] = useState<string>("xmas");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const { toast } = useToast();

  const handleClick = async () => {
    try {
      setIsGenerating(true);
      const result = await fetch("/api/redesign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pattern,
          style: selectedStyle,
        }),
      });
      setIsGenerating(false);
      const data = await result.json();
      setUrl(data.image);
      toast({
        title: "Success",
        description: "Your logo has been redesigned.",
        className: "bg-green-500",
      });
      if (typeof window !== "undefined") {
        const element = document.getElementById("generate-image");
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        className: "bg-red-500",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size / 1024 / 1024 > 5) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          className: "bg-red-500",
        });
      } else if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PNG or JPEG file.",
          className: "bg-red-500",
        });
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          addWhiteBackground(e.target?.result as string)
            .then((newDataUrl) => {
              setPattern(newDataUrl as string);
              setOpenPopover(false);
            })
            .catch((error) => {
              console.error("Error adding white background:", error);
            });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <>
      <NextSeo
        title="LogoPicture AI - Redesign your logo for free with DALL-E 3"
        description="Get AI optical illusion art with your logo in few minutes. Upload logos, pick your styles & generate 50+ pictures. One-time payment."
        openGraph={{
          url: "https://logopictureai.com",
          title: "LogoPicture AI - Redesign your logo for free with DALL-E 3",
          description:
            "Get AI optical illusion art with your logo in few minutes. Upload logos, pick your styles & generate 50+ pictures. One-time payment.",
          images: [
            {
              url: "https://logopictureai.com/og.png",
              width: 3100,
              height: 1624,
              alt: "LogoPicture AI - Redesign your logo for free with DALL-E 3",
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
                  Redesign your logo for free with DALL-E 3 and GPT Vision
                </h1>
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex flex-row gap-2 items-center">
                        <input
                          className="hidden"
                          name="patternUrl"
                          value={pattern}
                          readOnly
                          required
                        />

                        <LogoPicker
                          setPattern={setPattern}
                          setOpenPopover={setOpenPopover}
                        />
                      </div>
                      <input
                        id="patternFile"
                        name="patternFile"
                        type="file"
                        accept=".png, .jpeg, .jpg"
                        className="sr-only"
                        onChange={onChangePicture}
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div>
                {pattern && (
                  <PhotoBooth
                    image={pattern}
                    name="user-image"
                    enableUpscale={false}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="pt-2">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[65%_35%] w-full"></div>
            <h2 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px] pb-8">
              Select a style
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {["xmas", "future", "retro", "minimal"].map((style) => (
                <div key={style} onClick={() => setSelectedStyle(style)}>
                  <Image
                    src={`/redesign/${style}.png`}
                    alt={style}
                    width={400}
                    height={400}
                    className={`border-8 cursor-pointer ${
                      style === selectedStyle
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  />
                  <p className="pl-2">
                    {style === "xmas" && "Christmas"}
                    {style === "future" && "Future"}
                    {style === "retro" && "Retro"}
                    {style === "minimal" && "Minimal"}
                  </p>
                </div>
              ))}
            </div>
            <div className="pt-10">
              <Button
                className="text-4xl px-2 py-8 animate-pulse"
                disabled={!pattern || isGenerating}
                onClick={handleClick}
              >
                Redesign
                {isGenerating && (
                  <Loader2
                    className="inline-block ml-2 animate-spin"
                    size={24}
                  />
                )}
              </Button>
            </div>
          </div>
        </section>
        <section className="pt-2">
          {url && (
            <div className="flex flex-col gap-4 items-center">
              <Image
                src={url}
                alt="Redesigned logo"
                width={500}
                height={500}
                className="border-8"
              />
              <Button asChild id="generate-image">
                <Link href={url}>Download image</Link>
              </Button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

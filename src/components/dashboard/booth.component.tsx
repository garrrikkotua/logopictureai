import { Copy, Download, Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LoadingCircle from "../icons/loading-circle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/types/supabase";
import { useToast } from "@/components/ui/use-toast";

function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function PhotoBooth({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  const [copying, setCopying] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [scale, setScale] = useState(2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const spb = useSupabaseClient<Database>();
  const user = useUser();

  const { toast } = useToast();

  const handleClick = async () => {
    try {
      setIsSubmitting(true);
      const { data: creditsData } = await spb
        .from("credits")
        .select("credits")
        .eq("user_id", user?.id as string)
        .single();

      if (!creditsData?.credits || creditsData?.credits < 1) {
        toast({
          title: "Insufficient credits",
          description: "Please purchase more credits.",
          className: "bg-red-500",
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/upscale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pictureURL: image,
          scale: scale,
          email: user?.email,
          userId: user?.id,
        }),
      });
      setIsSubmitting(false);
      if (!response.ok) {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          className: "bg-red-500",
        });
        return;
      }

      toast({
        title: "Upscaling",
        description:
          "Your image is being upscaled. You will receive an email with the result shortly.",
        className: "bg-green-500",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        className: "bg-red-500",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="group relative mx-auto mt-6 aspect-square w-full max-w-xl animate-fade-up overflow-hidden rounded-2xl border border-gray-200"
      style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
    >
      {image && (
        <div className="absolute right-5 top-5 z-10 flex space-x-2">
          <button
            onClick={() => {
              setCopying(true);
              fetch(image, {
                headers: new Headers({
                  Origin: location.origin,
                }),
                mode: "cors",
              })
                .then((response) => response.blob())
                .then((blob) => {
                  let blobUrl = window.URL.createObjectURL(blob);
                  navigator.clipboard.write([
                    new ClipboardItem({
                      "image/png": blob,
                    }),
                  ]);
                  setCopying(false);
                })
                .catch((e) => console.error(e));
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {copying ? (
              <LoadingCircle />
            ) : (
              <Copy className="h-4 w-4 text-gray-500" />
            )}
          </button>
          <button
            onClick={() => {
              setDownloading(true);
              fetch(image, {
                headers: new Headers({
                  Origin: location.origin,
                }),
                mode: "cors",
              })
                .then((response) => response.blob())
                .then((blob) => {
                  let blobUrl = window.URL.createObjectURL(blob);
                  forceDownload(blobUrl, `${name}.png`);
                  setDownloading(false);
                })
                .catch((e) => console.error(e));
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {downloading ? (
              <LoadingCircle />
            ) : (
              <Download className="h-4 w-4 text-gray-500" />
            )}
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:scale-105 active:scale-95">
                <Maximize2 className="h-4 w-4 text-gray-500" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upscale</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-col gap-2">
                    Upscale or downscale your image to a higher (lower)
                    resolution
                    <div className="mt-4 flex flex-row gap-4">
                      <Slider
                        max={10}
                        step={0.1}
                        min={0.1}
                        value={[scale]}
                        onValueChange={(value) => setScale(value[0])}
                      />
                      {scale}x
                    </div>
                    You will receiive an email with the upscaled image. This
                    operation <b>costs 1 credit.</b>
                    <Button
                      disabled={isSubmitting}
                      onClick={() => handleClick()}
                    >
                      Upscale
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <Image
        alt="output image"
        src={image}
        width={768}
        height={768}
        className="h-full object-cover"
      />
    </div>
  );
}

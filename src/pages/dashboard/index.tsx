import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { DashboardLayout } from "@/layouts/dashboard.layout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogoPicker from "@/components/dashboard/logo.picker.component";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useEnterSubmit from "@/lib/hooks/use-enter-submit";
import Image from "next/image";
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

const prompts = {
  "Mystic Forest":
    "A mystical forest with towering trees, vibrant foliage, and a serene stream flowing through. The scene is bathed in soft, dappled sunlight filtering through the dense canopy above. No human presence is visible.",
  "Mountain Majesty":
    "A majestic mountain landscape under a clear sky. Snow-capped peaks rise in the distance, while a lush valley spreads out below. The scene is devoid of any human elements, focusing solely on the raw beauty of nature.",
  "Desert Dunes":
    "An expansive desert landscape with rolling sand dunes under a blazing sun. The scene is devoid of any vegetation or human presence, emphasizing the harsh yet beautiful solitude of the desert.",
  "Ocean Calm":
    "A calm ocean scene with gentle waves lapping against a sandy beach. The horizon stretches out infinitely, meeting a clear sky. The scene is devoid of any human elements, focusing on the tranquil beauty of the seascape.",
  "City Nights":
    "A bustling cityscape under the cover of night. Bright neon lights reflect off wet streets, while towering skyscrapers reach for the starless sky. The scene is devoid of any natural elements, focusing on the vibrant life of the urban jungle.",
  "Winter Wonderland":
    "A serene winter landscape blanketed in fresh snow. Bare trees stand against the stark white, their branches heavy with frost. The scene is devoid of any human elements, focusing on the quiet beauty of the winter season.",
  "Spring Awakening":
    "A vibrant spring landscape with blooming flowers and lush greenery. The scene is filled with the sounds of chirping birds and a gentle breeze rustling the leaves. No human presence is visible.",
  "Summer Solstice":
    "A bright summer landscape with a golden sun shining down on a field of sunflowers. The scene is filled with the buzz of insects and the scent of fresh earth. No human presence is visible.",
  "Autumn Harvest":
    "A rich autumn landscape with trees ablaze in hues of red and gold. The scene is filled with the crisp scent of fallen leaves and the sound of them crunching underfoot. No human presence is visible.",
  "Tropical Paradise":
    "A lush tropical landscape with palm trees swaying in the breeze and crystal clear waters lapping at the shore. The scene is filled with the sound of distant waves and the scent of salt in the air. No human presence is visible.",
  "Rainforest Retreat":
    "A dense rainforest landscape with towering trees and a diverse array of flora and fauna. The scene is filled with the sound of distant waterfalls and the calls of exotic birds. No human presence is visible.",
  "Arctic Adventure":
    "A stark arctic landscape with snow-covered plains stretching out to the horizon. The scene is filled with the sound of the wind whistling through the icy expanse and the distant call of a lone wolf. No human presence is visible.",
  "Fiery Fervor":
    "A captivating scene of a roaring bonfire under the starlit sky. The crackling flames dance passionately, casting a warm glow on the surrounding area. The scene is filled with the comforting scent of burning wood and the mesmerizing sound of fire. No human presence is visible.",
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

const Dashboard = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const spb = useSupabaseClient<Database>();
  const user = useUser();

  const [pattern, setPattern] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [numberOfPictures, setNumberOfPictures] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [randomPrompt, setRandomPrompt] = useState<string>(promptmaker());

  const { formRef } = useEnterSubmit();

  const { toast } = useToast();

  const placeholder = useMemo(() => promptmaker(), []);

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
          setPattern(e.target?.result as string);
          setOpenPopover(false);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const { data: creditsData } = await spb
        .from("credits")
        .select("credits")
        .eq("user_id", user?.id as string)
        .single();

      if (!creditsData?.credits || creditsData?.credits < numberOfPictures) {
        toast({
          title: "Insufficient credits",
          description: "Please purchase more credits.",
          className: "bg-red-500",
        });
        setIsLoading(false);
        return;
      }

      const { data, error } = await spb
        .from("generations")
        .insert({
          prompt,
          created_at: new Date().toISOString(),
          number_of_pictures: numberOfPictures,
          user_id: user?.id as string,
        })
        .select("id");

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          className: "bg-red-500",
        });
      } else {
        // starting image generation

        await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            generationId: data?.[0].id,
            pattern,
            prompt,
            numberOfPictures,
            email: user?.email,
            userId: user?.id,
          }),
        });

        toast({
          title: "Success",
          description:
            "Your logo pictures are being generated. You will receive an email with pictures shortly.",
          className: "bg-green-500",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        className: "bg-red-500",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="order-2">
        {pattern && (
          <Image src={pattern} alt="Selected Logo" width={400} height={400} />
        )}
      </div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">Generate Logo Picture</h1>
          <div>
            <div className="flex flex-row gap-2 items-center">
              <p className="mb-2">1.</p>
              <input
                className="hidden"
                name="patternUrl"
                value={pattern}
                readOnly
                required
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Upload a logo</Button>
                </PopoverTrigger>
                <PopoverContent className="relative left-14 top-0 w-[600px]">
                  <LogoPicker
                    setPattern={setPattern}
                    setOpenPopover={setOpenPopover}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <input
              id="patternFile"
              name="patternFile"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={onChangePicture}
            />
          </div>
          <div>
            <p className="mb-2">2. Image prompt</p>
            <div className="flex flex-row gap-2">
              <Textarea
                placeholder={placeholder}
                className="w-80"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger>
                  <Button variant="secondary" type="button">
                    Pick a style
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Collection of predefined prompts</SheetTitle>
                    <SheetDescription>
                      Choose a prompt from the list below
                      <div className="flex flex-col gap-2 pt-4">
                        {Object.keys(prompts).map((p, i) => (
                          <div
                            key={i}
                            className="flex flex-row justify-between items-center"
                          >
                            <p>{p}</p>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                setPrompt(prompts[p as keyof typeof prompts]);
                                setIsOpen(false);
                              }}
                            >
                              Pick
                            </Button>
                          </div>
                        ))}
                        <hr />
                        Or generate a random prompt
                        <div className="flex flex-row justify-between items-center">
                          <p className="text-sm">
                            {randomPrompt || "Click the button below"}
                          </p>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setPrompt(randomPrompt);
                              setIsOpen(false);
                            }}
                          >
                            Pick
                          </Button>
                        </div>
                        <Button
                          variant="secondary"
                          onClick={() => {
                            setRandomPrompt(promptmaker());
                          }}
                        >
                          Generate
                        </Button>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div>
            <p className="mb-2">3. Number of images to generate (variations)</p>
            <div className="mt-4 flex flex-row gap-4">
              <Slider
                defaultValue={[5]}
                max={10}
                step={1}
                min={1}
                value={[numberOfPictures]}
                onValueChange={(value) => setNumberOfPictures(value[0])}
              />
              {numberOfPictures}
            </div>
            <p className="mt-4">Note: one picture takes one credit</p>
          </div>
        </div>
        {isLoading ? (
          <Button className="mt-4" disabled variant="default">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="mt-4" type="submit" variant="default">
            Generate pictures
          </Button>
        )}
      </form>
    </div>
  );
};

const DashboardPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <DashboardLayout>
      <Dashboard {...props} />
    </DashboardLayout>
  );
};

export default DashboardPage;

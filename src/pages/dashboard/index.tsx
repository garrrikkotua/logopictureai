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
import {
  STYLE_PROMPTS,
  FOOD_PROMPTS,
  HOLIDAY_PROMPTS,
  ARCHITECTURE_PROMPTS,
  LANDMARK_PROMPTS,
  SPACE_PROMPTS,
  MOVIES_TV_PROMPTS,
} from "@/lib/constants";

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
  const [conditioningScale, setConditioningScale] = useState<number>(1.5);

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

        try {
          const response = await fetch("/api/generate", {
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
              conditioningScale,
            }),
          });

          if (!response.ok) {
            toast({
              title: "Error",
              description: "Something went wrong. Please try again later.",
              className: "bg-red-500",
            });
            setIsLoading(false);
            return;
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Something went wrong. Please try again later.",
            className: "bg-red-500",
          });
          setIsLoading(false);
          return;
        }

        toast({
          title: "Success",
          description:
            "Your logo pictures are being generated. You can track the progress in the gallery section. You will receive an email when the generation is complete.",
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
              accept=".png, .jpeg, .jpg"
              className="sr-only"
              onChange={onChangePicture}
              required
            />
          </div>
          <div>
            <p className="mb-2">2. Image style</p>
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
                <SheetContent
                  className="max-h-[80vh] overflow-y-auto"
                  side="top"
                >
                  <SheetHeader>
                    <SheetTitle>Collection of predefined prompts</SheetTitle>
                    <SheetDescription>
                      Choose a style from the list below
                      <div className="flex flex-col gap-4">
                        <div className="pt-4">
                          <h2 className="text-xl text-black font-bold">
                            Holidays 🎁
                          </h2>
                          <div className="flex flex-row gap-2 pt-4 flex-wrap">
                            {Object.keys(HOLIDAY_PROMPTS).map((p, i) => (
                              <div key={i}>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setPrompt(
                                      HOLIDAY_PROMPTS[
                                        p as keyof typeof HOLIDAY_PROMPTS
                                      ]
                                    );
                                    setIsOpen(false);
                                  }}
                                >
                                  {p}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl text-black font-bold">
                            Nature 🌳
                          </h2>
                          <div className="flex flex-row gap-2 pt-4 flex-wrap">
                            {Object.keys(STYLE_PROMPTS).map((p, i) => (
                              <div key={i}>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setPrompt(
                                      STYLE_PROMPTS[
                                        p as keyof typeof STYLE_PROMPTS
                                      ]
                                    );
                                    setIsOpen(false);
                                  }}
                                >
                                  {p}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl text-black font-bold">
                            Food 🍣
                          </h2>
                          <div className="flex flex-row gap-2 pt-4 flex-wrap">
                            {Object.keys(FOOD_PROMPTS).map((p, i) => (
                              <div key={i}>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setPrompt(
                                      FOOD_PROMPTS[
                                        p as keyof typeof FOOD_PROMPTS
                                      ]
                                    );
                                    setIsOpen(false);
                                  }}
                                >
                                  {p}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl text-black font-bold">
                            Architecture 🏛️
                          </h2>
                          <div className="flex flex-row gap-2 pt-4 flex-wrap">
                            {Object.keys(ARCHITECTURE_PROMPTS).map((p, i) => (
                              <div key={i}>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setPrompt(
                                      ARCHITECTURE_PROMPTS[
                                        p as keyof typeof ARCHITECTURE_PROMPTS
                                      ]
                                    );
                                    setIsOpen(false);
                                  }}
                                >
                                  {p}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl text-black font-bold">
                            Landmarks 🗽
                          </h2>
                          <div className="flex flex-row gap-2 pt-4 flex-wrap">
                            {Object.keys(LANDMARK_PROMPTS).map((p, i) => (
                              <div key={i}>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setPrompt(
                                      LANDMARK_PROMPTS[
                                        p as keyof typeof LANDMARK_PROMPTS
                                      ]
                                    );
                                    setIsOpen(false);
                                  }}
                                >
                                  {p}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl text-black font-bold">
                            Space 🚀
                          </h2>
                          <div className="flex flex-row gap-2 pt-4 flex-wrap">
                            {Object.keys(SPACE_PROMPTS).map((p, i) => (
                              <div key={i}>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setPrompt(
                                      SPACE_PROMPTS[
                                        p as keyof typeof SPACE_PROMPTS
                                      ]
                                    );
                                    setIsOpen(false);
                                  }}
                                >
                                  {p}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xl text-black font-bold">
                            Movies & TV 🎬
                          </h2>
                          <div className="flex flex-row gap-2 pt-4 flex-wrap">
                            {Object.keys(MOVIES_TV_PROMPTS).map((p, i) => (
                              <div key={i}>
                                <Button
                                  variant="secondary"
                                  onClick={() => {
                                    setPrompt(
                                      MOVIES_TV_PROMPTS[
                                        p as keyof typeof MOVIES_TV_PROMPTS
                                      ]
                                    );
                                    setIsOpen(false);
                                  }}
                                >
                                  {p}
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
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
                max={4}
                step={1}
                min={1}
                value={[numberOfPictures]}
                onValueChange={(value) => setNumberOfPictures(value[0])}
              />
              {numberOfPictures}
            </div>
            <p className="mt-4">Note: one picture takes one credit</p>
          </div>
          <div>
            <p className="mb-2">4. Scale for logo visibility</p>
            <div className="mt-4 flex flex-row gap-4">
              <Slider
                defaultValue={[1.5]}
                max={4}
                step={0.1}
                min={1}
                value={[conditioningScale]}
                onValueChange={(value) => setConditioningScale(value[0])}
              />
              {conditioningScale}
            </div>
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

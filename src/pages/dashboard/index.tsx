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

  const { formRef } = useEnterSubmit();

  const { toast } = useToast();

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
          <h1 className="text-xl">Generate Logo Art</h1>
          <div>
            <p className="mb-2">1. Upload a logo</p>
            <input
              className="hidden"
              name="patternUrl"
              value={pattern}
              readOnly
              required
            />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary">Select or Upload</Button>
              </PopoverTrigger>
              <PopoverContent className="relative left-14 top-0 w-[600px]">
                <LogoPicker
                  setPattern={setPattern}
                  setOpenPopover={setOpenPopover}
                />
              </PopoverContent>
            </Popover>
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
                placeholder="Your prompt goes here"
                className="w-80"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
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
          <Button className="mt-4" type="submit" variant="default"></Button>
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

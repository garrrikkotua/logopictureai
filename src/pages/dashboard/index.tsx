import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
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
  const spb = useSupabaseClient();
  const router = useRouter();

  const [pattern, setPattern] = useState<string>("");
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  const { formRef, onKeyDown } = useEnterSubmit();

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

  return (
    <div className="flex flex-row justify-between">
      <div className="order-2">
        {pattern && (
          <Image src={pattern} alt="Selected Logo" width={400} height={400} />
        )}
      </div>
      <form ref={formRef}>
        <div className="flex flex-col gap-4">
          <h1 className="text-xl">Generate Logo Art</h1>
          <div>
            <p className="mb-2">1. Upload a logo</p>
            <input
              className="hidden"
              name="patternUrl"
              value={pattern}
              readOnly
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
        </div>
        <Button className="mt-4" type="submit" variant="default">
          Generate logo picture
        </Button>
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

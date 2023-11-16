import { DashboardLayout } from "@/layouts/dashboard.layout";
import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/types/supabase";
import { Button } from "@/components/ui/button";
import PhotoBooth from "@/components/dashboard/booth.component";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const generatePicUrl = (
  userId: string,
  generationId: string,
  index: number
) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/aipictures/${userId}/${generationId}/image-${index}.png`;
};

const GalleryDetail = ({
  id,
  status,
  numberOfPictures,
  promptStr,
}: {
  id: string;
  status: string;
  numberOfPictures: number;
  promptStr: string;
}) => {
  const user = useUser();
  if (status == "pending") {
    return (
      <div>
        <p className="text-xl">Your generation is not ready yet</p>
        <div className="flex flex-row gap-8">
          {Array.from(Array(numberOfPictures).keys()).map((index) => (
            <Skeleton key={index} className="w-32 h-32" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row gap-8">
        {Array.from(Array(numberOfPictures).keys()).map((index) => (
          <PhotoBooth
            key={index}
            image={generatePicUrl(user?.id as string, id, index)}
            name={`image-${index}`}
          />
        ))}
      </div>
      <Popover>
        <PopoverTrigger className="mt-4 ml-2">Prompt</PopoverTrigger>
        <PopoverContent>
          Prompt: <span className="font-semibold">{promptStr}</span>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const Gallery = () => {
  const user = useUser();
  const spb = useSupabaseClient<Database>();

  const { data: generations } = useQuery({
    queryKey: ["generations", user?.id],
    queryFn: async () => {
      const { data } = await spb
        .from("generations")
        .select()
        .eq("user_id", user?.id as string)
        .order("created_at", { ascending: false });
      return data;
    },
    refetchInterval: 2000,
  });
  return (
    <div>
      <h1 className="text-xl pb-4">Gallery</h1>
      {generations?.map((generation) => (
        <div
          key={generation.id}
          className="flex flex-col bg-gray-200 rounded-lg p-4 mb-4"
        >
          <GalleryDetail
            id={generation.id}
            status={generation.status}
            numberOfPictures={generation.number_of_pictures}
            promptStr={generation.prompt as string}
          />
        </div>
      ))}
    </div>
  );
};

const GalleryPage = () => {
  return (
    <DashboardLayout>
      <Gallery />
    </DashboardLayout>
  );
};

export default GalleryPage;

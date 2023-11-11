import { DashboardLayout } from "@/layouts/dashboard.layout";
import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/types/supabase";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import PhotoBooth from "@/components/dashboard/booth.component";
import { CheckCircle, Clock } from "lucide-react";

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
}: {
  id: string;
  status: string;
  numberOfPictures: number;
}) => {
  const user = useUser();
  if (status == "pending") {
    return (
      <div>
        <p className="text-xl">Your generation is not ready yet</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xl">Your generation is ready</p>
      <div className="flex flex-row gap-8">
        {Array.from(Array(numberOfPictures).keys()).map((index) => (
          <PhotoBooth
            key={index}
            image={generatePicUrl(user?.id as string, id, index)}
            name={`image-${index}`}
          />
        ))}
      </div>
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
      <h1 className="text-xl">Gallery</h1>
      <div className="flex flex-row text-lg font-bold mb-4">
        <div className="w-1/4">Status</div>
        <div className="w-1/4">Created At</div>
        <div className="w-1/4">Prompt</div>
        <div className="w-1/4">Number of Pictures</div>
        <div className="w-1/4">Actions</div>
      </div>
      {generations?.map((generation) => (
        <div
          key={generation.id}
          className="flex flex-row bg-gray-200 rounded-lg p-4 mb-4"
        >
          <div className="w-1/4">
            {generation.status === "pending" ? (
              <>
                <Clock className="text-yellow-500" />
                {generation.status}
              </>
            ) : (
              <>
                <CheckCircle className="text-green-500" />
                {generation.status}
              </>
            )}
          </div>
          <div className="w-1/4">
            {new Date(generation.created_at).toLocaleString()}
          </div>
          <div className="w-1/4">{generation.prompt}</div>
          <div className="w-1/4">{generation.number_of_pictures}</div>
          <div className="w-1/4">
            <Sheet>
              <SheetTrigger>
                <Button variant="ghost">Show pictures</Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-3/4">
                <SheetHeader>
                  <SheetTitle>Generation {generation.id}</SheetTitle>
                  <SheetDescription>
                    {new Date(generation.created_at).toLocaleString()}
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <GalleryDetail
                    id={generation.id}
                    status={generation.status}
                    numberOfPictures={generation.number_of_pictures}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
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

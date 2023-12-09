import Image from "next/image";
import { cdn } from "@/lib/utils";

export const GalleryComponentGitHub = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[150px,105px,auto] items-center justify-center gap-8">
      <div>
        <Image
          src={cdn("/github_simple_logo.png")}
          alt="Github Logo"
          width={150}
          height={150}
          className="mx-auto"
        />
      </div>
      <div>
        <Image
          src={cdn("/arrow.png")}
          alt="Arrow"
          width={70}
          height={0}
          className="rotate-90 mx-auto xl:hidden"
        />
        <Image
          src={cdn("/arrow.png")}
          alt="Arrow"
          width={105}
          height={0}
          className="hidden xl:block mx-auto"
        />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 items-center justify-center mx-auto gap-8">
        <Image
          src={cdn("/github/coffee.png")}
          alt="Github Coffee Beans"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/github/soup.jpeg")}
          alt="Github Soup Bowl"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/github/taco.jpeg")}
          alt="Github Taco"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/github/city.jpeg")}
          alt="Github City Landscape"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/github/ocean.png")}
          alt="Github Ocean View"
          width={190}
          height={190}
          className="rounded-3xl"
        />

        <Image
          src={cdn("/github/roman_garden.png")}
          alt="Github Roman Garden"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/github/mech.jpeg")}
          alt="Github Mechanism Illustration"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/github/alien_world.png")}
          alt="Github Alien World"
          width={190}
          height={190}
          className="rounded-3xl"
        />
      </div>
    </div>
  );
};

export const GalleryComponentCrowdDev = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[150px,105px,auto] items-center justify-center gap-8">
      <div>
        <Image
          src={cdn("/crowd/crowd_logo.png")}
          alt="crowd.dev Logo"
          width={150}
          height={150}
          className="mx-auto rounded-3xl"
        />
      </div>
      <div>
        <Image
          src={cdn("/arrow.png")}
          alt="Arrow"
          width={70}
          height={0}
          className="rotate-90 mx-auto xl:hidden"
        />
        <Image
          src={cdn("/arrow.png")}
          alt="Arrow"
          width={105}
          height={0}
          className="hidden xl:block mx-auto"
        />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 items-center justify-center mx-auto gap-8">
        <Image
          src={cdn("/crowd/winter.png")}
          alt="crowd Coffee Beans"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/crowd/mountains.png")}
          alt="crowd Soup Bowl"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/crowd/cheesecake.png")}
          alt="crowd Taco"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/crowd/jungle.png")}
          alt="crowd City Landscape"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/crowd/cliff.png")}
          alt="crowd Ocean View"
          width={190}
          height={190}
          className="rounded-3xl"
        />

        <Image
          src={cdn("/crowd/dunes.png")}
          alt="crowd Roman Garden"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/crowd/roses.png")}
          alt="crowd Mechanism Illustration"
          width={190}
          height={190}
          className="rounded-3xl"
        />
        <Image
          src={cdn("/crowd/coffee.png")}
          alt="crowd Alien World"
          width={190}
          height={190}
          className="rounded-3xl"
        />
      </div>
    </div>
  );
};

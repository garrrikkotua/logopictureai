import { Copy, Download } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import LoadingCircle from "../icons/loading-circle";

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

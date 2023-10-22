import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-4 p-24 ${inter.className}`}
    >
      <h1 className="text-4xl font-bold text-center">
        <span className="text-blue-500">AI</span>
        <span className="text-gray-900">Art</span>
        <span className="text-red-500">Logo</span>
      </h1>
      <p className="text-center text-gray-500">
        Transform your brand logo into a work of art with AI.
      </p>
      <Button className="mt-8" asChild>
        <Link href="/login">Get Started</Link>
      </Button>
    </main>
  );
}

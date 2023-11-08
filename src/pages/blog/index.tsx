import fs from "fs";
import path from "path";
import { GetStaticProps } from "next";
import Link from "next/link";
import matter from "gray-matter";
import { NextSeo } from "next-seo";
import { APP_NAME } from "@/lib/constants";

interface Post {
  slug: string;
  title: string;
  author: string;
}

export const getStaticProps: GetStaticProps = async () => {
  const postsDirectory = path.join(process.cwd(), "src/pages/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const mdxFiles = filenames.filter((filename) => filename.endsWith(".mdx"));

  const posts = mdxFiles.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: filename.replace(".mdx", ""),
      title: data.title,
      author: data.author,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

const BlogIndex: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <>
      <NextSeo
        title={`LogoPicture AI - Blog`}
        description="Learn about LogoPicture AI and how it can help you create logos for your business."
      />
      <main
        className={`flex min-h-screen w-full pt-10 sm:pt-20 flex-col px-8 sm:px-24`}
      >
        <section className="">
          <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[65%_35%] w-full">
              <div className="w-full">
                <p className="sm:text-3xl text-lg font-semibold tracking-wider">
                  <Link href="/">{APP_NAME}</Link>
                </p>
                <h1 className="mt-4 text-2xl font-bold text-black lg:mt-14 sm:text-5xl xl:text-[64px]">
                  Blog
                </h1>

                <p className="mt-4 sm:mt-8 text-[15px] text-black lg:mt-14 sm:text-2xl leading-[150%]">
                  Learn about LogoPicture AI and how it can help you create
                  logos for your business.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogIndex;

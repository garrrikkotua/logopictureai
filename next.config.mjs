import remarkFrontmatter from "remark-frontmatter";
import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,
  images: {
    domains: ['cdn.rareblocks.xyz', process.env.NEXT_PUBLIC_SUPABASE_URL.replace('https://', ''), "oaidalleapiprodscus.blob.core.windows.net", process.env.NEXT_PUBLIC_CDN_HOST.replace('https://', '')],
  },
}

export default withMDX(nextConfig)

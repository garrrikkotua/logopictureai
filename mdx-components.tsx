import type { MDXComponents } from "mdx/types";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-4 sm:mt-8 text-black lg:mt-14">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-4 sm:mt-8 text-black lg:mt-14">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mt-4 sm:mt-8 text-[15px] text-black lg:mt-14 sm:text-2xl leading-[150%]">
        {children}
      </p>
    ),
    ol: ({ children }) => (
      <ol className="mt-4 sm:mt-8 text-[15px] text-black lg:mt-14 sm:text-2xl leading-[150%]">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 sm:mt-8 text-[15px] text-black lg:mt-14 sm:text-2xl leading-[150%]">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="mt-4 sm:mt-8 text-[15px] text-black lg:mt-14 sm:text-2xl leading-[150%]">
        {children}
      </li>
    ),
    ...components,
  };
}

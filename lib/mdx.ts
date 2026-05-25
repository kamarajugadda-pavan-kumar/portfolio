import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    [
      rehypePrettyCode,
      {
        theme: {
          dark: "github-dark",
          light: "github-light",
        },
        keepBackground: false,
      },
    ],
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        properties: {
          className: ["anchor"],
        },
      },
    ],
  ],
} as const;

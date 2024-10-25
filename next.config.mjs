import withMDX from '@next/mdx'
import rehypePrism from 'rehype-prism-plus'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true
  }
}

const mdxConfig = {
  options: {
    rehypePlugins: [rehypePrism]
  }
}

export default withMDX(mdxConfig)(nextConfig)

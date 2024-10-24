import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const config = withMDX()({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true
  }
})

export default config

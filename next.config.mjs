import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const config = withMDX()({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx']
})

export default config

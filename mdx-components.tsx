import React from 'react'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => <h1 className="font-semibold text-3xl text-black mt-1">{children}</h1>,
    h2: ({ children }) => (
      <h2 className="font-semibold text-2xl text-black mb-6 mt-12">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-semibold text-base text-black mb-5 my-4">{children}</h3>
    ),
    p: ({ children }) => <p className="mb-5">{children}</p>,
    ...components
  }
}

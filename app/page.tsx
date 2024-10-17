import Catalog from '@/components/catalog'

const data = [
  {
    title: 'SEO',
    description: 'SEO strategies and best practices for improving website visibility.',
    href: '/seo'
  },
  {
    title: 'React',
    description: '',
    href: '/react'
  },
  {
    title: 'CSS',
    description: '',
    href: '/css'
  },
  {
    title: 'Performance',
    description: '',
    href: '/performance'
  },
  {
    title: 'GithubUsedComponents',
    description: '',
    href: '/github-used-components'
  },
  {
    title: 'Vue Souece Learn',
    description: '',
    href: '/vue-source-learn'
  }
]

export default function Page() {
  return (
    <section>
      <h2 className="font-semibold">Latest Posts</h2>
      <Catalog data={data} />
    </section>
  )
}

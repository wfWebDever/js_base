import Catalog from '@/components/catalog'

const data = [
  {
    title: 'Performance',
    description: '',
    href: '/performance'
  },
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
    title: 'Algorithm',
    description: '',
    href: '/algorithm'
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
  },
  {
    title: 'Interview',
    description: '',
    href: '/interview'
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

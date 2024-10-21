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
    <>
      <h1 className="font-semibold">Reflections</h1>
      <p className="my-4">
        Many frontend features that were previously built using complex tricks can now be
        implemented with basic principles due to the development of browsers and frontend
        technologies.
      </p>
      <p className="my-4">
        For example, layouts that used to require many hacks can now be achieved simply by using
        `flex` and `grid`.
      </p>
      <p className="my-4">
        Another example is the floating header at the top, which used to require various positioning
        techniques but can now be done with `sticky`.
      </p>
      <p className="my-4">
        Sometimes I wonder if we&apos;d be better off just waiting for technological advancements
        rather than racking our brains to come up with laborious methods to create effects that look
        cool but aren&apos;t really worth the effort.{' '}
      </p>
      <p className="my-4">
        Another example is the interview questions and algorithm problems we used to compile. Now
        with the support of AI, we just need to input the questions, and it can generate answers,
        and the quality of the answers is quite good.
      </p>
      <section>
        <h2 className="font-semibold">Latest Posts</h2>
        <Catalog data={data} />
      </section>
    </>
  )
}

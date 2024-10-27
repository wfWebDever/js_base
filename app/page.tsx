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
  },
  {
    title: 'Build Dev Environment',
    description: '',
    href: '/build-dev-environment'
  },
  {
    title: 'Work Experience',
    description: '',
    href: '/work-experience'
  },
  {
    title: 'JS',
    description: '',
    href: '/js'
  }
]

export default function Page() {
  return (
    <>
      <h1 className="font-semibold">Introduction</h1>
      <p className="my-4 leading-8">
        As a front-end developer with over a decade of rich experience, I specialize in modern web
        technology stacks, with particular expertise in <strong className="px-1">React</strong> and{' '}
        <strong className="px-1">Next.js</strong> frameworks. With years of practice and a deep
        understanding, I can efficiently build complex, high-performance web applications. My work
        style emphasizes <strong className="px-1">efficiency</strong> and{' '}
        <strong className="px-1">quality</strong>, and I maintain a proactive attitude to ensure
        projects are completed on time. If you&apos;re seeking an experienced and technically
        proficient front-end expert, feel free to contact me at{' '}
        <strong className="text-blue-500 px-1">xinyilan2005@gmail.com</strong> to discuss how I can
        bring value to your project.
      </p>

      <section>
        <h2 className="font-semibold">Latest Posts</h2>
        <Catalog data={data} />
      </section>
    </>
  )
}

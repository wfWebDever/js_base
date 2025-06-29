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
    title: 'CSS',
    description: '',
    href: '/css'
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
    title: 'Build Dev Environment',
    description: '',
    href: '/build-dev-environment'
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
      <div>
        <h1 className="font-semibold mt-10">自我介绍</h1>
        <p>新的AI时代已经来临,AI也已经正在摧古拉朽般改变着我们的生活和工作方式。</p>
        <p>
          从事程序开发好多年了,最近一年接触AI编程得出的结论是:AI编程可以极大地提升开发效率,并且可以帮助我们更好地理解和学习技术。
        </p>
        <p>但同时危机也会伴随而来,AI编程会抹平大部分程序员的技术壁垒。</p>
        <p>
          世界上唯一不变的就是变化,抱残守缺没有什么未来，我想要在接下来的时间,拥抱AI,依托于现有的技术,探寻下我可以做些什么,这也算是一种重启人生吧.
        </p>
        <p>这个页面是我个人总结的技术流的目录,我也会在这里记录下我对AI学习和探索的过程。</p>
      </div>
      <section>
        <h2 className="font-semibold mt-10">技术流</h2>
        <Catalog data={data} />
      </section>
    </>
  )
}

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
    title: 'JS',
    description: '',
    href: '/js'
  }
]

const envData = [
  {
    title: 'Nextjs+Tailwind+Typescript+Eslint+Prettier',
    description: '',
    href: '/build-dev-environment/nextjs-tailwind-ts-eslint-prettier'
  },
  {
    title: 'Setting up a new computer for development',
    description: '',
    href: '/build-dev-environment/setting-up-new-computer-for-development'
  }
]

const aiData = [
  {
    title: '使用AI快速开发脚手架',
    description: '',
    href: '/ai/dev-project-scaffolding'
  },
  {
    title: '用AI写代码后，乐趣减少了吗？',
    description: '',
    href: '/ai/code-writing-fun-loss'
  }
]

export default function Page() {
  return (
    <>
      <section>
        <h2>魏峰的Blog</h2>
        <p>新的AI时代已经来临,AI也已经正在摧古拉朽般改变着我们的生活和工作方式。</p>
        <p>
          从事程序开发好多年了,最近一年接触AI编程得出的结论是:AI编程可以极大地提升开发效率,并且可以帮助我们更好地理解和学习技术。
        </p>
        <p>但同时危机也会伴随而来,AI编程会抹平大部分程序员的技术壁垒。</p>
        <p>
          世界上唯一不变的就是变化,我想要在接下来的时间,拥抱AI,依托于现有的技术，探寻下我可以做些什么,这也算是一种重启人生吧.
        </p>

        <p>这个页面是我个人总结的程序开发的文章,我也会在这里记录下我对AI学习和生活。</p>
      </section>
      <section>
        <h2>使用AI</h2>
        <Catalog data={aiData} />
      </section>
      <section>
        <h2>电脑及环境</h2>
        <Catalog data={envData} />
      </section>
      <section>
        <h2>开发</h2>
        <Catalog data={data} />
      </section>
    </>
  )
}

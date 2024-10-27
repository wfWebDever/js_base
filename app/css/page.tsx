import Catalog from '@/components/catalog'

const data = [
  {
    title: 'Sticky',
    description: 'sticky',
    href: '/css/sticky'
  },
  {
    title: 'Scroll',
    description: 'scroll',
    href: '/css/scroll'
  },
  {
    title: 'Tailwind',
    description: 'Tailwind',
    href: '/css/tailwind'
  },
  {
    title: '实现钱币入袋的效果',
    description: '实现钱币入袋的效果',
    href: '/css/money-in-bag'
  },
  {
    title: '垂直居中',
    description: '垂直居中',
    href: '/css/vertical-center'
  },
  {
    title: '自适应',
    description: '自适应',
    href: '/css/self-adaption'
  },
  {
    title: 'BFC',
    description: 'BFC',
    href: '/css/bfc'
  }
]

export default function CSSPage() {
  return (
    <section>
      <h1 className="font-semibold">CSS</h1>
      <Catalog data={data} />
    </section>
  )
}

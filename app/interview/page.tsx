import Catalog from '@/components/catalog'

const data = [
  {
    title: '闭包 作用域',
    description: '闭包 作用域',
    href: '/interview/closure'
  },
  { title: 'Bind', description: 'Bind', href: '/interview/bind' },
  { title: 'Promise', description: 'Promise', href: '/interview/promise' },
  {
    title: '知识点汇总',
    description: '知识点汇总',
    href: '/interview/knowledge-summary'
  },
  {
    title: 'Jsonp',
    description: 'Jsonp',
    href: '/interview/jsonp'
  },
  {
    title: 'TS',
    description: 'TS',
    href: '/interview/ts'
  },
  {
    title: 'event loop',
    description: 'event loop',
    href: '/interview/event-loop'
  }
]

export default function Interview() {
  return (
    <section>
      <h1 className="font-semibold">Interview</h1>
      <Catalog data={data} />
    </section>
  )
}

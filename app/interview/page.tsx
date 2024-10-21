import Catalog from '@/components/catalog'

const data = [
  {
    title: '闭包 作用域',
    description: '闭包 作用域',
    href: '/interview/closure'
  },
  { title: 'Bind', description: 'Bind', href: '/interview/bind' },
  { title: 'Promise', description: 'Promise', href: '/interview/promise' }
]

export default function Interview() {
  return (
    <section>
      <h1 className="font-semibold">Interview</h1>
      <Catalog data={data} />
    </section>
  )
}

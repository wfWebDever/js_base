import Catalog from '@/components/catalog'

const data = [
  {
    title: '多维数组',
    description: '多维数组',
    href: '/algorithm/multi-array'
  },
  {
    title: '3个连续数字',
    description: '3个连续数字',
    href: '/algorithm/three-continuous-numbers'
  },
  {
    title: '重复的字母',
    description: '重复的字母',
    href: '/algorithm/repeated-letters'
  },
  {
    title: '两个字符串的删除操作',
    description: '两个字符串的删除操作',
    href: '/algorithm/two-strings-delete-operation'
  },
  {
    title: '三数之和',
    description: '三数之和',
    href: '/algorithm/three-sum'
  }
]

export default function Algorithm() {
  return (
    <section>
      <h1 className="font-semibold">Algorithm</h1>
      <Catalog data={data} />
    </section>
  )
}

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
  },
  {
    title: '盛最多水的容器',
    description: '盛最多水的容器',
    href: '/algorithm/max-area'
  },
  {
    title: '快速排序',
    description: '快速排序',
    href: '/algorithm/quick-sort'
  },
  {
    title: '数组去重',
    description: '数组去重',
    href: '/algorithm/unique'
  },
  {
    title: '行列转数字',
    description: '行列转数字',
    href: '/algorithm/str-to-num'
  },
  {
    title: '获取对象深度',
    description: '获取对象深度',
    href: '/algorithm/get-depth'
  },
  {
    title: '是否闭合',
    description: '是否闭合',
    href: '/algorithm/is-close'
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

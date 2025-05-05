import Catalog from '@/components/catalog'

const data = [
  {
    title: 'vue2-vue3',
    description: 'vue2-vue3',
    href: '/vue-source-learn/vue2-vue3'
  },
  {
    title: 'Template',
    description: 'Template',
    href: '/vue-source-learn/template'
  },
  {
    title: 'Props',
    description: 'Props',
    href: '/vue-source-learn/props'
  },
  {
    title: 'vModel',
    description: 'v-model',
    href: '/vue-source-learn/v-model'
  },
  {
    title: 'Reactivity',
    description: 'Reactivity',
    href: '/vue-source-learn/reactivity'
  },
  {
    title: 'Diff',
    description: 'diff',
    href: '/vue-source-learn/diff'
  },
  {
    title: 'vuex',
    description: 'vuex',
    href: '/vue-source-learn/vuex'
  },
  {
    title: 'vue learn function',
    description: 'vue learn function',
    href: '/vue-source-learn/vue-learn-function'
  }
]

export default function VueSourceLearn() {
  return (
    <section>
      <h1 className="font-semibold">vue 源码学习</h1>
      <p>
        知识这东西需要不断的温故知新 下一阶段再看以前写的内容 可能又有了新的体会。
        <br />
        vue源码学习是我当初花费了大量时间去学习的，这也见证着我那些年的成长。
      </p>
      <Catalog data={data} />
    </section>
  )
}

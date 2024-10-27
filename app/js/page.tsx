import Catalog from '@/components/catalog'

const data = [
  {
    title: 'Relearn JS',
    description: 'Relearn JS',
    href: '/js/relearn-js'
  },
  {
    title: 'Countdown',
    description: 'Countdown',
    href: '/js/countdown'
  }
]

export default function Js() {
  return (
    <section>
      <h1 className="font-semibold">JS</h1>
      <p>
        每一个技术点都可以继续优化，力求达到最优解。
        <br />
        没必要每天都掌握一个新知识点，而要掌握已有的知识点，把之搞透，才能万变不离其踪。
        <br />
        学习是一种先加法再减法的过程。
      </p>
      <Catalog data={data} />
    </section>
  )
}

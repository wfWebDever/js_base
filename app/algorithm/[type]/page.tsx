import { threeSum } from '@/algorithm/三数之和'
import { minDistance } from '@/algorithm/两个字符串的删除操作'
import { arrToOne, arrToOne2, arrToOne3 } from '@/algorithm/多维数组'
import { captureThreeNumbers } from '@/algorithm/连续3个数字'
import { containsRepeatingLetter, containsRepeatingLetterUseReg } from '@/algorithm/重复的字母'

type Params = {
  type: string
}

const types: Record<string, ((...args: any[]) => any)[]> = {
  'multi-array': [arrToOne, arrToOne2, arrToOne3],
  'three-continuous-numbers': [captureThreeNumbers],
  'repeated-letters': [containsRepeatingLetter, containsRepeatingLetterUseReg],
  'two-strings-delete-operation': [minDistance],
  'three-sum': [threeSum]
}

const test: Record<string, any[]> = {
  'multi-array': [[1, 2, 3, [4], [5, 6, 7, [8, 9]]]],
  'three-continuous-numbers': ['983674 4348 '],
  'repeated-letters': ['rattler'],
  'two-strings-delete-operation': ['sea', 'eat'],
  'three-sum': [[-1, 0, 1, 2, -1, -4]]
}

export default function AlgorithmTypeContent({ params }: { params: Params }) {
  const algorithms = types[params.type] || []
  const testData = test[params.type]

  return (
    <article>
      {algorithms.map(fn => (
        <section key={fn.name}>
          <pre>
            <code>{fn.toString()}</code>
          </pre>
          <h3 className="font-semibold">result</h3>

          <pre>
            <code className="text-sm text-gray-500">{fn(...testData)}</code>
          </pre>
        </section>
      ))}
    </article>
  )
}

import { getDepth } from '@/algorithm/getDepth'
import { threeSum } from '@/algorithm/三数之和'
import { minDistance } from '@/algorithm/两个字符串的删除操作'
import { arrToOne, arrToOne2, arrToOne3 } from '@/algorithm/多维数组'
import { isClosedValid } from '@/algorithm/是否闭合'
import { maxArea } from '@/algorithm/盛最多水的容器'
import { quickSort, unique, uniqueEs6 } from '@/algorithm/算法'
import { strToNum } from '@/algorithm/行列转数字'
import { captureThreeNumbers } from '@/algorithm/连续3个数字'
import { containsRepeatingLetter, containsRepeatingLetterUseReg } from '@/algorithm/重复的字母'

const types: Record<string, ((...args: any[]) => any)[]> = {
  'multi-array': [arrToOne, arrToOne2, arrToOne3],
  'three-continuous-numbers': [captureThreeNumbers],
  'repeated-letters': [containsRepeatingLetter, containsRepeatingLetterUseReg],
  'two-strings-delete-operation': [minDistance],
  'three-sum': [threeSum],
  'max-area': [maxArea],
  'quick-sort': [quickSort],
  unique: [unique, uniqueEs6],
  'str-to-num': [strToNum],
  'get-depth': [getDepth],
  'is-close': [isClosedValid]
}

const test: Record<string, any[]> = {
  'multi-array': [[1, 2, 3, [4], [5, 6, 7, [8, 9]]]],
  'three-continuous-numbers': ['983674 4348 '],
  'repeated-letters': ['rattler'],
  'two-strings-delete-operation': ['sea', 'eat'],
  'three-sum': [[-1, 0, 1, 2, -1, -4]],
  'max-area': [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
  'quick-sort': [[1, 3, 2, 5, 6, 14, 333, 14, 6, 7, 8]],
  unique: [[1, '1', 2, 2, '3', 3, 5, 'a', 'a']],
  'str-to-num': ['AZ10'],
  'get-depth': [
    {
      a: { x: { y: { z: 1 } }, m: 2 },
      b: { o: { p: { q: 3 } } },
      c: 3
    },
    3
  ],
  'is-close': ['()[]{}'] // , '(]', '([)]', '{[]}', '(){'
}

export default async function AlgorithmTypeContent({
  params
}: {
  params: Promise<{ type: string }>
}) {
  const type = (await params).type
  const algorithms = types[type] || []
  const testData = test[type] || []

  return (
    <article>
      {algorithms.map(fn => (
        <section key={fn.name}>
          <pre>
            <code>{fn.toString()}</code>
          </pre>
          <h3 className="font-semibold">result</h3>
          <pre>
            <code className="text-sm text-gray-500">{JSON.stringify(fn(...testData))}</code>
          </pre>
        </section>
      ))}
    </article>
  )
}

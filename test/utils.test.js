import { strict as assert } from 'assert'
import art from '../lib/utils/art.js'
import consola  from 'consola'
// import { sendMsgToChannel } from '../lib/utils/bot.js'

consola.wrapAll()

export function testArt() {
  assert.equal(
    art('leetcode.art', {
    title: 'test-title',
    link: 'test-link'
    }),
    `#题解\r\ntest-title\r\n[跳转点这里](test-link)`
  )

  assert.equal(
    art('xiaohuweibo.art', {
      link: 'test-link'
    }),
    `#小胡言乱语\r\n[详细](test-link)\r\n`
  )
}

export async function testBot() {
  await assert.rejects(() => import('../lib/utils/bot.js'), /Please check if telegram environment variables are configured/)
}
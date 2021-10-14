import { strict as assert } from 'assert'
import consola  from 'consola'

consola.wrapAll()

export async function testBot() {
  await assert.rejects(() => import('../lib/utils/bot.js'), Error)
}
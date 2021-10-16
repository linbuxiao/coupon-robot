import DB from '../utils/io.js'
import consola from 'consola'
import art from '../utils/art.js'
import { sendMsgToChannel } from '../utils/bot.js'
import Letter from 'leeter'

const leet = new Letter()

const db = new DB({
  token: process.env.GIST_TOKEN,
  gistId: '54a4e79000cb255d942741d1be90f567',
  gistFile: 'data.json'
})

const data = await db.read()

export async function fetchData() {
  const res = await leet.solutionArticles(process.env.LC_USERNAME)
  let list
  try {
    consola.info(`Leetcode username: ${process.env.LC_USERNAME}.`)
    list = res.edges.map(item => {
      return {
        title: item.node.title,
        uuid: item.node.uuid,
        summary: item.node.summary,
        date: item.node.createdAt,
        link: `https://leetcode-cn.com/problems/${item.node.question.questionTitleSlug}/solution/${item.node.slug}/`
      }
    })
  } catch(e) {
    consola.error(`
    Error: ${e} \n
    respone: ${res.body}
    `)
  }
  
  list.map(async (item) => {
    if(!data.find(e => e.uuid === item.uuid)) {
      await sendMsgToChannel(art('leetcode.art', {
        ...item
      }))
    }
  })

  consola.info(`Rewrite the data.`)
  await db.write(list)
}
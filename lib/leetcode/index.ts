import 'dotenv/config'
import DB from '../utils/io.js'
import { leetMaker } from 'leeter'
import { sendMsgToChannel } from '../utils/bot.js'
import art from '../utils/art.js'

const leeter = leetMaker()

const db = new DB({
  token: process.env['GIST_TOKEN']!,
  gistId: '54a4e79000cb255d942741d1be90f567',
  gistFile: 'data.json'  
})

db.read().then(async data => {
  const res = await leeter.solutionArticles(process.env['LC_USERNAME']!)
  let list
  try {
    console.log(`Leetcode username: ${process.env['LC_USERNAME']}.`)
    list = res.edges.map((item: {
      node : Record<'title'|'uuid'|'summary'|'createdAt'|'slug', string> & {
        question: { questionTitleSlug: string }
      }
    }) => {
      return {
        title: item.node.title,
        uuid: item.node.uuid,
        summary: item.node.summary,
        date: item.node.createdAt,
        link: `https://leetcode-cn.com/problems/${item.node.question.questionTitleSlug}/solution/${item.node.slug}/`
      }
    })
  } catch(e) {
    throw Error(`
    Error: ${e} \n
    respone: ${res}
    `)
  }
  
  list&&list.map(async (item: Record<'title'|'uuid'|'summary'|'date'|'link', string>) => {
    if(!data.find((e: any) => e.uuid === item.uuid)) {
      await sendMsgToChannel(art('leetcode.art', {
        ...item
      }))
    }
  })

  console.log(`Rewrite the data.`)
  await db.write(list)  
})

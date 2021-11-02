import { config as env } from "https://deno.land/x/dotenv/mod.ts";
import DB from '../utils/io.ts'
import { leetMaker } from 'https://raw.githubusercontent.com/linbuxiao/leeter/master/lib/index.ts'
import { sendMsgToChannel } from '../utils/bot.ts'
import * as dejs from "https://deno.land/x/dejs@0.10.2/mod.ts";

const leeter = leetMaker()

const ENV = env()

const db = new DB({
  token:  ENV['GIST_TOKEN']!,
  gistId: '54a4e79000cb255d942741d1be90f567',
  gistFile: 'data.json'  
})

db.read().then(async (data: any) => {
  console.log(data);
  
  const res = await leeter.solutionArticles(ENV['LC_USERNAME']!)
  console.log(ENV['LC_USERNAME']);
  
  let list
  try {
    console.log(`Leetcode username: ${ENV['LC_USERNAME']}.`)
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
      const markdown = await dejs.renderFileToString(`${Deno.cwd()}\\lib\\views\\leetcode.ejs`, {
        ...item
      })
      await sendMsgToChannel(markdown)
    }
  })

  console.log(`Rewrite the data.`)
  await db.write(list)  
})

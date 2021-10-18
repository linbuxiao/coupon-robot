import cheerio from 'cheerio'
import got from 'got'
import DB from '../utils/io.js'
import { sendMsgToChannel } from '../utils/bot.js'
import art from '../utils/art.js'

type dataType = Record<'title'|'description'|'link', string>

const db = new DB({
  token: process.env.GIST_TOKEN!,
  gistId: 'd1fc0244e526cf6cfb157a6a3f6b4028',
  gistFile: 'data.json'
})

const res = await got({
  method: 'GET',
  url: process.env.WB_RSS
})

const $ = cheerio.load(res.body, { xmlMode: true })

const list = $('item').map((i, e) => {
  const c = cheerio.load(e, { xmlMode: true })
  return {
    title: c('title').text(),
    description: c('description').text(),
    link: c('guid').text()
  }
}).get()

const data: dataType[] = await db.read()

list.forEach(async (item) => {
  if(!data.find((e) => e.link === item.link)) {
    await sendMsgToChannel(art('xiaohuweibo.art', {
      ...item
    }))
  }
})

await db.write(list)


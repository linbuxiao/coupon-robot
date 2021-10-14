import { Bot } from 'grammy'

const bot = new Bot(process.env.TELEGRAM_TOKEN)

export function sendMsgToChannel(msg) {
  bot.api.sendMessage('@xiaoxiaopai', msg, {
    parse_mode: 'Markdown'
  })
}
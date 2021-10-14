import { Bot } from 'grammy'
import consola from 'consola'

const bot = new Bot(process.env.TELEGRAM_TOKEN)

export async function sendMsgToChannel(msg) {
  try {
    await bot.api.sendMessage('@xiaoxiaopai', msg, {
      parse_mode: 'Markdown'
    })
    consola.success(`Send message success: ${msg}`)
  } catch(e) {
    consola.error(`Send message error: ${e}`)
  }
}
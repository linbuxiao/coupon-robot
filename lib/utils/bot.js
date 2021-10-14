import { Bot } from 'grammy'
import consola from 'consola'

let bot

try {
  bot = new Bot(process.env.TELEGRAM_TOKEN)
} catch(e) {
  throw new Error('Please check if telegram environment variables are configured.')
}

export async function sendMsgToChannel(msg) {
  try {
    await bot.api.sendMessage('@xiaoxiaopai', msg, {
      parse_mode: 'Markdown'
    })
    consola.success(`Send message success: ${msg}`)
  } catch(e) {
    throw new Error(`Send message error: ${e}`) 
  }
}
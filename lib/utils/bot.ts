import { Bot } from "https://deno.land/x/grammy/mod.ts";
import { config as env } from "https://deno.land/x/dotenv/mod.ts";

const ENV = env()

let bot: Bot | null = null

try {
  bot = new Bot(ENV['TELEGRAM_TOKEN']!)
} catch(e) {
  throw new Error('Please check if telegram environment variables are configured.')
}

export async function sendMsgToChannel(msg: string) {
  if(!bot) throw 'Your bot is not init.'
  try {
    await bot.api.sendMessage('@xiaoxiaopai', msg, {
      parse_mode: 'Markdown'
    })
    console.log(`Send message success: ${msg}`)
  } catch(e) {
    throw new Error(`Send message error: ${e}`) 
  }
}
import got from 'got'
import { Bot } from 'grammy'
import dotenv from 'dotenv'
import consola from 'consola'

dotenv.config()

const { MT_URL, MT_COOKIE, MT_GUNDAM, TELEGRAM_TOKEN } = process.env

consola.info(MT_URL, MT_COOKIE, MT_GUNDAM, TELEGRAM_TOKEN)

const meituanUrl = MT_URL

const res = await got({
  method: 'POST',
  url: meituanUrl,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63040026)',
    // 'Cookie': MT_COOKIE
    'Cookie': '_lxsdk_cuid=17c74bdb921c8-0349d6b893507f-61263e23-100200-17c74bdb9217d; unpl=v1_NuqFe7fJwsTLpDwOohrDbG-feb_JcCEPuu-QaxTMui3TUFrLC0TEu_miyWP-twik; us=wandie; ut=71023.163404616411.91345217.2; ud=; iuuid=58A7540CF90EF64A2C78D71F195A7DA7CCE1C2B54B698B684AB748012B7467EF; mt_c_token=DCF2J_mm6BFstp4ywxHZPuutFeoAAAAA4g4AAEgdgKSMyoQ4UrCYOkp6fI9gW5R_iSi4ihTKVc5zfzLrKSKgEHwmEliP4UuqzNDYpQ; thirdlogin_token=DCF2J_mm6BFstp4ywxHZPuutFeoAAAAA4g4AAEgdgKSMyoQ4UrCYOkp6fI9gW5R_iSi4ihTKVc5zfzLrKSKgEHwmEliP4UuqzNDYpQ; oops=DCF2J_mm6BFstp4ywxHZPuutFeoAAAAA4g4AAEgdgKSMyoQ4UrCYOkp6fI9gW5R_iSi4ihTKVc5zfzLrKSKgEHwmEliP4UuqzNDYpQ; _lx_utm=utm_term%3D%26utm_campaign%3Dother%26utm_medium%3DMU%26utm_source%3D60413%26utm_content%3D1380426725749538828; _lxsdk=58A7540CF90EF64A2C78D71F195A7DA7CCE1C2B54B698B684AB748012B7467EF; _lxsdk_s=17c74bdb92a-29d-f9d-ea5%7C%7C30'
  },
  json: {
    "gundamId": MT_GUNDAM
  }
})

const result = JSON.parse(res.body)

if(result.msg !== '成功') consola.error(result)

const coupons = result.data.coupons.map(item => ({
  name: item.couponName,
  time: item.etime,
  price: `${item.amountLimit}, ${item.couponAmount}元`,
  limit: item.useCondition
}))

const bot = new Bot(TELEGRAM_TOKEN)

consola.success('Send to channel successfully。')

bot.api.sendMessage('@xiaoxiaopai', JSON.stringify(coupons, null, 4))


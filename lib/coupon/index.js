import got from 'got'
import consola from 'consola'
import { secrets } from './constant.js' 
import StringCrypto from 'string-crypto';
import art from '../utils/art.js'
import { sendMsgToChannel } from '../utils/bot.js';

const { decryptString } = new StringCrypto()

const { MT_PASSWORD } = process.env

const decodeSecrets = JSON.parse(decryptString(secrets, MT_PASSWORD))

const url = 'https://mediacps.meituan.com/gundam/gundamGrabV3'
const gundam = 20625

async function fetchData(env) {
  const { cookie } = env
  const res = await got({
    method: 'POST',
    url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63040026)',
      'Cookie': cookie
    },
    json: {
      "gundamId": gundam
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
  
  consola.success('Send to channel successfully。')
  
  sendMsgToChannel(art('coupon.art', coupons))
}

await Promise.all(decodeSecrets.map(env => fetchData(env))) 




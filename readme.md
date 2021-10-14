# 玩具仓库

## coupon

```bash
yarn coupon
```

**需要登录**

> 敏感信息请使用 `string-crypto` 或其他包进行加密。

> 频繁请求将导致 `cookie` 失效。

通过遍历 `cookie` 数组的方式请求接口。


## leetcode

```bash
yarn leetcode
```

储存每次的结果并与前一次进行比对，如果有新的题解则插入，并发送至频道。

考虑到增量，保留前 `10` 条数据。

## ENV:
配置 `.env` 
- `MT_PASSWORD` : 密钥。由于Cookie过长无法保存至环境变量中，所以密文保存到仓库，使用密钥解码。
- `TELEGRAM_TOKEN` : Telegram Token，发送信息至频道。
- `LC_USERNAME` : Leecode username， 获取用户题解。
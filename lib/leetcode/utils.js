import got from 'got'
import db from '../utils/io.js'
import consola from 'consola'
import art from '../utils/art.js'
import { sendMsgToChannel } from '../utils/bot.js'

const data = await db.read()

export async function fetchData() {
  const res = await got({
    method: 'POST',
    url: 'https://leetcode-cn.com/graphql/',
    json: {
      "operationName":"solutionArticles",
      "variables":{"userSlug":process.env.LC_USERNAME,"skip":0,"first":10},
      "query":"query solutionArticles($userSlug: String!, $skip: Int, $first: Int, $query: String) {\n  solutionArticles(userSlug: $userSlug, skip: $skip, first: $first, query: $query) {\n    totalNum\n    edges {\n      node {\n        ...solutionArticle\n        question {\n          questionTitle\n          questionTitleSlug\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment solutionArticle on SolutionArticleNode {\n  rewardEnabled\n  canEditReward\n  uuid\n  title\n  slug\n  sunk\n  chargeType\n  status\n  identifier\n  canEdit\n  canSee\n  reactionType\n  reactionsV2 {\n    count\n    reactionType\n    __typename\n  }\n  tags {\n    name\n    nameTranslated\n    slug\n    tagType\n    __typename\n  }\n  createdAt\n  thumbnail\n  author {\n    username\n    profile {\n      userAvatar\n      userSlug\n      realName\n      __typename\n    }\n    __typename\n  }\n  summary\n  topic {\n    id\n    commentCount\n    viewCount\n    __typename\n  }\n  byLeetcode\n  isMyFavorite\n  isMostPopular\n  isEditorsPick\n  hitCount\n  videosInfo {\n    videoId\n    coverUrl\n    duration\n    __typename\n  }\n  __typename\n}\n"}
  })
  
  let list = []

  try {
    consola.info(`Leetcode username: ${process.env.LC_USERNAME}.`)
    list = JSON.parse(res.body).data.solutionArticles.edges.map(item => {
      return {
        title: item.node.title,
        uuid: item.node.uuid,
        summary: item.node.summary,
        date: item.node.createdAt,
        link: `https://leetcode-cn.com/problems/${item.node.question.questionTitleSlug}/solution/${item.node.slug}/`
      }
    })
  } catch(e) {
    consola.error(`
    Error: ${e} \n
    respone: ${res.body}
    `)
  }
  
  consola.info(`Start sending problem solution information to @xiaoxiaopai.`)
  list.map(item => {
    if(!data.find(e => e.uuid === item.uuid)) {
      sendMsgToChannel(art('leetcode.art', {
        ...item
      }))
    }
  })

  consola.info(`Rewrite the data.`)
  await db.write(list)
}
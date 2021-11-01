import * as dejs from "https://deno.land/x/dejs@0.10.2/mod.ts";
import path from "https://deno.land/std@0.113.0/node/path.ts"

const p = `${Deno.cwd()}\\lib\\views\\leetcode.ejs`
const res = await dejs.renderFileToString(p, {
  title: "leetcode",
  link: 123
})

console.log(res)

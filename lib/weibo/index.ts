import { config as env } from "https://deno.land/x/dotenv/mod.ts";
import { cheerio } from "https://deno.land/x/cheerio@1.0.4/mod.ts";
import DB from "../utils/io.ts";
import { sendMsgToChannel } from "../utils/bot.ts";
import * as dejs from "https://deno.land/x/dejs@0.10.2/mod.ts";

type dataType = Record<"title" | "description" | "link", string>;

const ENV = env();

const db = new DB({
  token: ENV["GIST_TOKEN"]!,
  gistId: "d1fc0244e526cf6cfb157a6a3f6b4028",
  gistFile: "data.json",
});

const request = new Request(ENV["WB_RSS"], {
  method: "GET",
});

fetch(request).then(async (res) => {
  const body = await res.text();

  const $ = cheerio.load(body, { xmlMode: true });

  const list = $("item").map((_, e) => {
    const c = cheerio.load(e, { xmlMode: true });
    return {
      title: c("title").text(),
      description: c("description").text(),
      link: c("guid").text(),
    };
  }).get();

  const data: dataType[] = await db.read();

  list.forEach(async (item: any) => {
    if (!data.find((e) => e.link === item.link)) {
      const markdown = await dejs.renderFileToString(
        `${Deno.cwd()}\\lib\\views\\xiaohuweibo.ejs`,
        {
          ...item,
        },
      );
      await sendMsgToChannel(markdown);
    }
  });

  await db.write(list);
});

import Gist from "https://raw.githubusercontent.com/linbuxiao/low_gist/main/mod.ts";

class DB {
  gists: Gist;
  id: string;
  fileName: string;
  constructor(
    { token, gistId, gistFile }: Record<
      "token" | "gistId" | "gistFile",
      string
    >,
  ) {
    console.log("init gists db");
    this.gists = new Gist(token);
    this.id = gistId;
    this.fileName = gistFile;
  }

  async read() {
    console.log("fetch data from gist: ", this.id);
    const res = await this.gists.get(this.id);
    return JSON.parse(res.files[this.fileName]!.content);
  }

  async write(data: any) {
    const files = {
      [this.fileName]: {
        content: JSON.stringify(data, null, 2),
      },
    };
    console.log("updated: ", files);
    return await this.gists.set(this.id, files);
  }
}

export default DB;

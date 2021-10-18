declare module 'gists' {
  type filesType = { files : { [key in string]: { content: string } }   }

  export default class Gists {
    constructor({token}: { token: string }) {}
    async get(id: string) : Promise<{body: filesType}>
    async edit(id: string, update: filesType): Promise<{body: { files: filesType }}>
  }
}
import Gists from 'gists'
import consola from 'consola'

class DB {
  constructor(token, gistId, gistFile) {
    this.gists = new Gists({ token })
    this.id = gistId
    this.fileName = gistFile
  }

  async read() {
    consola.info('fetch data from gist: ', this.id)
    const res = await this.gists.get(this.id)
    return JSON.parse(res.body.files[this.fileName].content)
  }

  async write() {
    let update = { files: {} }
    update.files[this.fileName] = {
        content: JSON.stringify(data, null, 2)
    }
    consola.info('updated: ', update)
    return this.gists.edit(this.id, update)
  }
}

export default new DB(
  process.env.GIST_TOKEN, 
  process.env.GIST_ID, 
  process.env.GIST_FILE || 'data.json'
) 
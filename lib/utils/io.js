import Gists from 'gists'
import consola from 'consola'

const gists = new Gists({ token: process.env.GIST_TOKEN })

const gistId = process.env.GIST_ID
const gistFile = process.env.GIST_FILE || 'data.json'

export const readData = async () => {
    consola.info('fetch data from gist: ', gistId)
    const res = await gists.get(gistId)
    return JSON.parse(res.body.files[gistFile].content)
}

export const writeData = async(data) => {
    let update = { files: {} }
    update.files[gistFile] = {
        content: JSON.stringify(data, null, 2)
    }
    consola.info('updated: ', update)
    return gists.edit(gistId, update)
}
import Gist from 'gists'

const gists = new Gist({
  token: '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'
})

const res = await gists.get('54a4e79000cb255d942741d1be90f567')

const data = JSON.parse(res.body.files['data.json'].content)

const update = { files: {} }

update.files['data.json'] = {
  content: JSON.stringify({a: 3}, null, 2)
}

const edited = await gists.edit('54a4e79000cb255d942741d1be90f567', update)
console.log(edited);
// import { leetMaker } from 'https://raw.githubusercontent.com/linbuxiao/leeter/master/lib/index.ts'
import { leetMaker } from '../leeter/lib/index.ts'
const leeter = leetMaker()
const res = await leeter.solutionArticles('linbuxiao')

console.log(res);

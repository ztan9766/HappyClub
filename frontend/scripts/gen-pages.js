var fs = require('fs')
var pages = []

const pagesDir = fs.readdirSync('./src/pages')
pagesDir.forEach(item => {
    let stat = fs.lstatSync("./src/pages/" + item)
    if (stat.isDirectory() === true) {
      pages.push(item)
    }
})

var template = `const pages = ${JSON.stringify(pages,'','\t')}

export default pages
`

fs.writeFileSync('./src/pages/index.js', template)

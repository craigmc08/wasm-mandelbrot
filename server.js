// Super simple server to serve all the files here

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let file = ''
  try {
    file = fs.readFileSync(__dirname + '/' + req.url.slice(1))
  } catch (e) {
    if (e.code === 'ENOENT') {
      file = 'Uh oh! That file wasn\'t found :('
    }
  }
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(file)
  res.end()
})

server.listen(8080, () => console.log('Started'))

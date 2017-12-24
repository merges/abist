import path from 'path'
import express from 'express'

const port = process.env.PORT || 8001
const server = new express()

server.use(express.static('prod'))
server.get('*', (request, response) => {
  response.sendFile(path.resolve('prod/index.html'))
})

server.listen(port, () => console.log( // eslint-disable-line no-console
  `Server running on http://localhost:${port}`
))
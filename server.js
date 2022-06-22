const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const port = 3000

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})

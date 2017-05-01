const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan')
const PORT = 3000








app.listen(PORT, () => {
  console.log('listening on port ' + PORT)
})

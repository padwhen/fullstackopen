const express = require('express')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')

app.get('/test', (request, response) => {
    response.json('test ok')
})

const PORT = config.PORT
app.listen(PORT, function() {
    logger.info(`${PORT}`)
})
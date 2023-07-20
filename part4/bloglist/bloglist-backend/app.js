const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
<<<<<<< HEAD
const bodyParser = require('body-parser')
=======
>>>>>>> 06b54446d58c7204a26a2d6e1a3a255afd384e0d
const blogsRouter = require('./controllers/bloglist')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info(`connected to mongoDB`)
    })
    .catch((error) => {
        logger.info(`error connecting to mongodb: ${error.message}`)
    })

app.use(cors())
app.use(express.static('build'))
<<<<<<< HEAD
app.use(bodyParser.json())
=======
>>>>>>> 06b54446d58c7204a26a2d6e1a3a255afd384e0d
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
<<<<<<< HEAD

=======
>>>>>>> 06b54446d58c7204a26a2d6e1a3a255afd384e0d
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
const blogRouter = require('./controller/blogs')
const express = require('express')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const app = express()

const mongoUrl = config.MONGODB_URI

logger.info('Connecting to MongoDb....')
mongoose.connect(mongoUrl)
    .then(() => {
        logger.info('Connected to MongoDb')
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDb -', error.message)
    })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)


module.exports = app




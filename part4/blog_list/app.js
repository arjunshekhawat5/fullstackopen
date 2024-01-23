const express = require('express')
const config = require('./utils/config')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controller/blogs')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')

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
app.use('/api/users/', userRouter)
app.use('/api/login/', loginRouter)

module.exports = app




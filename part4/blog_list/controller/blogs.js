const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', (request, response, next) => {
    logger.info('getting all blogs from db')
    Blog.find({}).then(blogs => {
        response.json(blogs)
        logger.info('Got the blogs from db')
    })
        .catch((error) => {
            logger.error('error getting all blogs from db:', error)
            next(error)
        })
})

blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch((error) => {
            logger.error('error saving blog to database:', error)
            next(error)
        })
})

module.exports = blogRouter
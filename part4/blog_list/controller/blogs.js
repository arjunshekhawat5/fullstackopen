const blogRouter = require('express').Router()
const { log } = require('console')
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
require('dotenv').config()

/*const getToken = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }

    return null
}*/

blogRouter.get('/', async (request, response) => {

    logger.info('getting all blogs from db')

    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    logger.info(`getting the user with id ${request.params.id}`)

    const blog = await Blog
        .findById(request.params.id)
        .populate('user', { username: 1, name: 1 })

    response.json(blog)
})

blogRouter.post('/', async (request, response) => {

    const user = request.user
    if (!request.user) {
        return response.status(401).json({ error: 'invalid token' })
    }

    const blog = new Blog({ ...request.body, user: user.id })

    if (!blog.title || !blog.url) {
        response.status(400).end()
        return
    }

    logger.info(`creating a new blog with id ${blog.id}`)
    const savedBlog = await blog.save()
    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 });
    //console.log(populatedBlog)
    response.status(201).json(populatedBlog)

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
})

blogRouter.delete('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(204).end()
    }

    if (blog.user.toString() !== request.user.id.toString()) {
        return response.status(401).json({ error: 'invalid user token' })
    }

    logger.info(`deleting blog post with id ${request.params.id}`)

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

    logger.info(`updating blog post with id ${request.params.id}`)

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { $set: { likes: request.body.likes } },
        { new: true }).populate('user', { username: 1, name: 1 })
    if (!updatedBlog) {
        return response.status(404).end()
    }
    response.json(updatedBlog)
})

module.exports = blogRouter
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/', async (request, response) => {

    logger.info('getting all blogs from db')

    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {

    const user = await User.findOne({})

    const blog = new Blog({ ...request.body, user: user.id })

    if (!blog.title || !blog.url) {
        response.status(400).end()
        return
    }

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
})

blogRouter.delete('/:id', async (request, response) => {

    logger.info(`deleteing blog post with id ${request.params.id}`)

    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {

    logger.info(`updating blog post with is ${request.params.id}`)

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { $set: { likes: request.body.likes } },
        { new: true })

    if (!updatedBlog) {
        return response.status(404).end()
    }

    response.json(updatedBlog)
})

module.exports = blogRouter
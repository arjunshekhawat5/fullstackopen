const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./testBlogs')
const { describe } = require('node:test')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject

    for (blog of blogs) {
        blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('when some blogs are saved on database', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs/')
            .expect(200)
            .expect('Content-type', /application\/json/)
            .expect(response => {
                expect(response.body).toHaveLength(blogs.length)
            })
    })

    test('returned blogs have id property', async () => {
        const response = await api.get('/api/blogs/')
        response.body.map(blog => expect(blog.id).toBeDefined())
    })

})

describe('')

afterAll(async () => {
    await mongoose.connection.close()
})
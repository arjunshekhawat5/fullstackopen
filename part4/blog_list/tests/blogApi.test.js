const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./testBlogs')

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
    test('all the blogs are returned as json', async () => {
        const response = await api
            .get('/api/blogs/')
            .expect(200)
            .expect('Content-type', /application\/json/)

        expect(response.body.length).toBe(blogs.length)
    })

    test('returned blogs have id property', async () => {
        const response = await api.get('/api/blogs/')
        response.body.map(blog => expect(blog.id).toBeDefined())
    })

})

describe('when a blog is saved by POST method', () => {
    test('it succeeds with valid blog data', async () => {
        const newBlog = {
            title: "Test blog",
            author: "Edgar",
            url: "testURl.com",
            likes: 42069,
        }
        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs/')
        expect(response.body.length).toBe(blogs.length + 1)

        const urls = response.body.map(b => b.url)
        expect(urls).toContain(newBlog.url)

    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
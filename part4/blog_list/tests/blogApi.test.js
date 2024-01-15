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

describe('when all the blogs are requested through GET method', () => {
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
    test('without likes property,it defaults to 0 likes', async () => {
        const newBlog = {
            title: "blog with no likes given",
            author: "Me",
            url: "mistake.com"
        }

        const response = await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })
    test('without title property,api responds with 400 bad request', async () => {
        const newBlog = {
            author: 'me',
            url: 'nope.com',
            likes: 69
        }

        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(400)
    })

    test('without url property,api responds with 400 bad request', async () => {
        const newBlog = {
            title: "No url",
            author: 'me',
            likes: 69
        }

        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(400)
    })

})

describe('when a blog is deleted with DELETE method', () => {
    test('with id,the blog gets deleted and responds with 204', async () => {
        await api
            .delete(`/api/blogs/${blogs[0]._id}`)
            .expect(204)

        const response = await api.get('/api/blogs/')

        expect(response.body.length).toBe(blogs.length - 1)

        const ids = response.body.map(b => b.id)
        expect(ids).not.toContain(blogs[0]._id)

    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
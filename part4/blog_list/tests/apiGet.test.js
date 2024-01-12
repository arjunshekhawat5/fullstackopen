const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./testBlogs')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject
    
    for (blog of blogs){
        blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('tests GET and POST api requests for api/blogs.', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs/')
            .expect(200)
            .expect('Content-type', /application\/json/)
            .expect(response => {
                expect(response.body).toHaveLength(blogs.length)
            })
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })

})

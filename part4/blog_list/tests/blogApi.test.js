const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const blogs = require('./testBlogs')

const api = supertest(app)
let token;
let userId;
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject

    const user = {
        username: 'blogApiTest dummy',
        name: 'dummy user',
        password: 'secret'
    }

    const savedUserResponse = await api
        .post('/api/users/')
        .send(user)

    if (savedUserResponse.status === 201) {
        userId = savedUserResponse.body.id
    }

    const res = await api
        .post('/api/login/')
        .send({
            username: user.username,
            password: user.password
        })

    for (blog of blogs) {
        blogObject = new Blog({ ...blog, user: userId })
        await blogObject.save()
    }

    token = `Bearer ${res.body.token}`
    //console.log(savedUserResponse.body.id, userId, token)
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
            .set('authorization', token)
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
            .set('authorization', token)
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
            .set('authorization', token)
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
            .set('authorization', token)
            .expect(400)
    })

    test('without proper user token, api responds with status 401', async () => {
        const newBlog = {
            title: "Test blog",
            author: "Edgar",
            url: "testURl.com",
            likes: 42069,
        }

        await api
            .post('/api/blogs/')
            .send(newBlog)
            .expect(401)
            .expect(r => expect(r.body.error).toBe('invalid token'))

        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(blogs.length)
    })

})

describe('when a blog is deleted with DELETE method', () => {
    test('with specific id,the blog gets deleted and responds with 204', async () => {
        await api
            .delete(`/api/blogs/${blogs[0]._id}`)
            .set('authorization', token)
            .expect(204)

        const response = await api.get('/api/blogs/')
        expect(response.body.length).toBe(blogs.length - 1)

        const ids = response.body.map(b => b.id)
        expect(ids).not.toContain(blogs[0]._id)

    })
})

describe('when a blog is updated by PUT method', () => {
    test('it updates the likes for the given id', async () => {
        const updatedLikes = 42069
        const updatedBlogId = blogs[0]._id

        await api
            .put(`/api/blogs/${updatedBlogId}`)
            .send({
                likes: updatedLikes
            })

        const response = await api.get('/api/blogs/')
        expect(response.body.find(b => b.id === updatedBlogId).likes).toBe(updatedLikes)

    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
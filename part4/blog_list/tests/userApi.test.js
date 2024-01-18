const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)

describe('when an user is added', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('with invalid username, returns 400', async () => {
        const invalidUsername = {
            username: 'A',
            name: 'test',
            password: 'Passss'
        }
        await api
            .post('/api/users/')
            .send(invalidUsername)
            .expect(400)
            .expect(response => {
                expect(response.body.error).toBe('Invalid Username or Password')
            })

        const response = await api.get('/api/users/')
        expect(response.body.length).toBe(0)


    })

    test('with invalid password, returns 400', async () => {
        const invalidPassword = {
            username: 'arjunshekhawat',
            name: 'Arjun',
            password: '12'
        }

        await api
            .post('/api/users/')
            .send(invalidPassword)
            .expect(400)
            .expect(response => {
                expect(response.body.error).toBe('Invalid Username or Password')
            })

        const response = await api.get('/api/users/')
        expect(response.body.length).toBe(0)

    })

    test('with already existing username, returns 400', async () => {
        const newUser = {
            username: 'arjunshekhawat',
            name: 'Arjun',
            password: '123456'
        }

        await api.post('/api/users/').send(newUser)

        await api
            .post('/api/users/')
            .send(newUser)
            .expect(400)
            .expect(response => {
                expect(response.body.error).toBe('Username must be unique!')
            })

        const response = await api.get('/api/users/')
        expect(response.body.length).toBe(1)
    })

    test('with a valid user data, it saves the user to the db', async () => {
        const validUser = {
            username: 'arjunshekhawat',
            name: 'Arjun',
            password: '12243'
        }

        await api
            .post('/api/users/')
            .send(validUser)
            .expect(201)

        const response = await api.get('/api/users/')
        expect(response.body.length).toBe(1)
        expect(response.body[0].username).toBe('arjunshekhawat')

    })

})

afterAll(async () => {
    await mongoose.connection.close()
})
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({
        "username": "arjunshekhawat",
        "name": "Arjun",
        "passwordHash": "$2b$10$ZXdETM6B7yjFrP6UWuFDau6ywTr5jPiOA23T4RucVsxbjOO1/Tgzm",
        "notes": [],
    })

    await user.save()
})

describe('when an user is added', () => {
    test('with invalid username, returns 400', async () => {
        const invalidUsername = {
            username: 'A',
            name: 'test',
            password: 'Passss'
        }
        await api
            .post('/api/users/').send(invalidUsername)
            .expect(400)
    })

    test('with invalid password, returns 400', async () => {
        const invalidPassword = {
            username: 'arjunshekhawat',
            name: 'Arjun',
            password: '12'
        }

        await api
            .post('/api/users/')
            .expect(400)
    })

    test('with already existing username, returns 400', async () => {
        const user = new User({
            username: 'arjunshekhawat',
            name: 'Arjun',
            password: 'testing'
        })

        await user.save()

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})
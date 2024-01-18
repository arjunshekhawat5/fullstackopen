const userRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
    logger.info('getting all users from the db')
    const users = await User.find({})
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    logger.info('creating a new user')
    const { username, name, password } = request.body

    if (!username || !password || username.length < 3 || password.length < 3) {
        logger.error('invalid username or password, aborting createing new user')
        return response.status(400).json({ error: 'Invalid Username or Password' }).end()
    }

    const existingUsers = await User.findOne({ username })

    if (existingUsers) {
        logger.error('username already exists, aborting createing new user')
        return response.status(400).json({ error: 'Username must be unique!' }).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    return response.status(201).json(savedUser)

})

module.exports = userRouter

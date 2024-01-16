const userRouter = require('express').Router()
const { resolve } = require('path')
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

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)

})

module.exports = userRouter

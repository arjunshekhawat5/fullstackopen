require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    else {
        request.token = null
    }

    next()
}

const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (!(authorization && authorization.startsWith('Bearer '))) {
        request.user = null
    }
    else {
        const tokenFromRequest = authorization.replace('Bearer ', '')
        const decodedToken = jwt.verify(tokenFromRequest, process.env.SECRET_KEY)
        if (!decodedToken.id) {
            request.user = null
        }
        else {
            const user = await User.findById(decodedToken.id)
            request.user = user
        }
    }

    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}
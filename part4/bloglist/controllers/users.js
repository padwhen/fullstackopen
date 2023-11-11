const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    try {
        const {username, name, password} = request.body
        if (password === undefined || password.length < 3) {
            return response.status(400)
                .json({error: 'password is missing or too short'})
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({
            username, name, passwordHash
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)        
    } catch (exception) {
        next(exception)
    }

})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter
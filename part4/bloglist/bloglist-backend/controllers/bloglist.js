const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

<<<<<<< HEAD
blogsRouter.get('/', (request, response, next) => {
    Blog
    .find({})
    .then(blogs => {   
        response.json(blogs)
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {    
    const blog = new Blog(request.body) 
=======
blogsRouter.get('/api/blogs', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
>>>>>>> 06b54446d58c7204a26a2d6e1a3a255afd384e0d
    blog
    .save()
    .then(result => {
        response.status(201).json(result)
<<<<<<< HEAD
    }) 
    .catch(error => next(error))     
})      
=======
    })
})
>>>>>>> 06b54446d58c7204a26a2d6e1a3a255afd384e0d

module.exports = blogsRouter
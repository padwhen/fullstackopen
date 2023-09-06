const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
    Blog
    .find({})
    .then(blogs => {   
        response.json(blogs)
    })
    .catch(error => next(error))
})

blogsRouter.post('/', async (request, response, next) => {  
    const body = request.body  
    const {title, author, url, likes} = body
    if (!title || !url) {
        return response.status(404).json({error: 'Title or URL or both missing'})
    } 
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })
    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})      

module.exports = blogsRouter
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const initialBlogs = [
    {
        title: 'Introduction to JavaScript',
        author: 'John Doe',
        url: 'https://example.com/javascript-intro',
        likes: 25
    },
    {
        title: 'Web Development Best Practices',
        author: 'Jane Smith',
        url: 'https://example.com/web-dev-best-practices',
        likes: 50
    },
    {
        title: 'Node.js Fundamentals',
        author: 'Alice Johnson',
        url: 'https://example.com/nodejs-fundamentals',
        likes: 30
    }
];

const nonExistingId = async () => {
    const blog = new Blog({title: 'willremovethisone', author: 'abcxyz', url: 'abcxyz', likes: 1293})
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const getValidUser = async () => {
    const username = 'testuser'
    const password = 'testpassword'
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({ username, password })
    await user.save()
    const tokenPayload = {
        id: user._id,
        username: user.username
    }
    const token = jwt.sign(tokenPayload, process.env.SECRET)
    return { user, token }
}

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb, getValidUser }
const Blog = require('../models/blog')
const User = require('../models/user')
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

module.exports = { initialBlogs, nonExistingId, blogsInDb, usersInDb }
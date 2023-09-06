const Blog = require('../models/blog');
const initialBlogs = [
    {
        title: 'Harry Potter',
        author: 'J.K. Rowling',
        url: 'https://google.com',
        likes: 999
    },
    {
        title: 'Pachinko',
        author: 'I have no idea',
        url: 'https://facebook.com',
        likes: 1991
    },
    {
        title: 'McDonalds',
        author: 'USA',
        url: 'https://mcdonalds.com',
        likes: 1812
    }
]

// this function ahead of time, create a database object ID that does not belong to 
// any note object in the database
const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon'})
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}

// blogsInDb => used for checking notes stored in the database
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blogData of helper.initialBlogs) {
        const blogObject = new Blog(blogData);
        await blogObject.save();
    }
});

test('returns the correct amount in the JSON format', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verifying the existance of id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach((blog) => {
        expect(blog.id).toBeDefined();
    })
})

test('new blog can be added, length increment by one', async () => {
    const newBlog = {
        title: "Harry Potter",
        author: "J.K. Rowling",
        url: "harrypotter.com",
        likes: 2048
    }
    await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(b => b.title) 
    expect(titles).toContain('Harry Potter')
})

test('default like is 0 if missing', async () => {
    const newBlog = { title: "Harry Potter", author: "J.K Rowling", url: "harrypotter.com"}
    const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0) 
})

test('400 bad request if title missing', async () => {
    const newBlog = {author: "J.K Rowling", url: "harrypotter.com", likes: 999}
    await api.post('/api/blogs').send(newBlog).expect(400)
})

test('400 bad request if url missing', async () => {
    const newBlog = {title: "Harry Potter", author: "J.K Rowling", likes: 999}
    await api.post('/api/blogs').send(newBlog).expect(400)
})
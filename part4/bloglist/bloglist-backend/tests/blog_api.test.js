const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type','application\/json; charset=utf-8')
})

test('the correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('have an id uniquely', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.map((blog) => {
        expect(blog.id).toBeDefined()
    })
})

test('a new blog can be added', async () => {
    const newBlog = {
        title: 'Truyen cuoi haahaha',
        author: 'J.K. Rowling',
        url: 'https://google.com',
        likes: 999
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type','application\/json; charset=utf-8')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('like will be 0', async () => {
    const newBlog = {
        title: 'Truyen cuoi haahaha',
        author: 'J.K. Rowling',
        url: 'https://google.com',
    }
    await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[3].likes).toBe(0)
})

test('blog without title and url is not added', async () => {
    const newBlog = {
        url: 'https://google.com',
        likes: 999
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(404) 
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length)
},)
afterAll(async () => {
    await mongoose.connection.close()
})


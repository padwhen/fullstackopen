const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blogData of helper.initialBlogs) {
        const blogObject = new Blog(blogData);
        await blogObject.save();
    }
});

describe('GET /api/blogs', () => {
    test('returns the correct amount in the JSON format', async () => {
        const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('verifying the existence of id', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body
        blogs.forEach((blog) => {
            expect(blog.id).toBeDefined();
        })
    })
})

describe('POST /api/blogs', () => {
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
})

describe('DELETE /api/blogs', () => {
    test('deleting a blog post by ID', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0]; 
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
        const titles = blogsAtEnd.map(blog => blog.title);
        expect(titles).not.toContain(blogToDelete.title);
    })
})

describe('PUT /api/blogs', () => {
    test('updating likes of a blog post by ID', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0]; 
        const updatedBlogData = {
            likes: blogToUpdate.likes + 1, 
        };
        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlogData)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const updatedBlog = response.body;
        expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1);
        expect(updatedBlog.title).toBe(blogToUpdate.title);
        expect(updatedBlog.author).toBe(blogToUpdate.author);
        expect(updatedBlog.url).toBe(blogToUpdate.url);
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({username: 'root', passwordHash})
        await user.save()
    })
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'padwehn',
            name: 'Phat Nguyen',
            password: '123456'
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })
})

describe('user creation endpoint', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })
    test('creating a user with a duplicate username, 400 status code + error message', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = { username: 'root', name: 'Test', password: 'moikka'}
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
    test('creating a user with a too short password should return 400 status code + error message', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = { username: 'abcsya', name: 'Tezt', password: 'ab'}
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(result.body.error).toContain('password is missing or too short')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

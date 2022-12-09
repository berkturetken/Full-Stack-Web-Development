const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('apiTest - all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('apiTest - the unique identifier property of the blog posts is named id exists', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  for (let blog of response.body) {
    expect(blog._id).toBeDefined()
  }
})

test('apiTest - a valid blog can be added', async () => {
  const newBlog = {
    title: 'A New Book',
    author: 'Hakan Türetken',
    url: 'https://www.google.com/',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.notesInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map((n) => n.title)
  expect(contents).toContain('A New Book')
})

test('apiTest - blog without likes can be added by setting the likes to 0', async () => {
  const newBlog = {
    title: 'A New Book',
    author: 'Hakan Türetken',
    url: 'https://www.google.com/',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./test_helper')

/*
Some notes about the tests:
--> I tried to create the same test cases as in the GitHub repository (https://github.com/fullstack-hy2020/part3-notes-backend/blob/part4-6/tests/note_api.test.js)
--> I put the word "apiTest" in front of every test to able to run the tests with the following command: npm test -- -t 'apiTest'
*/

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('apiTest - notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('apiTest - all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('apiTest - a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map((b) => b.title)
    expect(titles).toContain('Test Book')
  })

  describe('viewing a specific blog', () => {
    test('apiTest - the unique identifier property of the blog posts is named id exists', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

      for (let blog of response.body) {
        expect(blog._id).toBeDefined()
      }
    })

    test('apiTest - succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

      expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('apiTest - fails with status code 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })

    test('apiTest - fails with statuscode 400 id is invalid', async () => {
      const invalidId = '000'
      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new blog', () => {
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

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((n) => n.title)
      expect(titles).toContain('A New Book')
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

    test('apiTest - blog without title can not be added', async () => {
      const newBlog = {
        author: 'Xyz',
        url: 'https://www.google.com/',
        likes: 4,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('apiTest - blog without url can not be added', async () => {
      const newBlog = {
        title: 'A totally new book',
        author: 'Berk',
        likes: 25,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('apiTest - succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogsToBeDeleted = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogsToBeDeleted._id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const contents = blogsAtEnd.map((r) => r.title)
      expect(contents).not.toContain(blogsToBeDeleted.title)
    })

    test('apiTest - succeeds with status code 404 if id is not valid', async () => {
      const validNonexistingId = await helper.nonExistingId()
      await api.delete(`/api/blogs/${validNonexistingId}`).expect(404)
    })
  })

  describe('update a blog', () => {
    test('apiTest - update the title, author, url and likes', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToBeUpdated = blogsAtStart[0]
      blogToBeUpdated.title = 'Bad title'
      blogToBeUpdated.author = 'Bad author'
      blogToBeUpdated.url = 'fixed'
      blogToBeUpdated.likes = 10

      const id = blogToBeUpdated._id.toString()

      await api
        .put(`/api/blogs/${id}`)
        .send(blogToBeUpdated)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      // expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const blog = blogsAtEnd.find((b) => b._id.toString() === id)
      expect(blog.title).toBe('Bad title')
      expect(blog.author).toBe('Bad author')
      expect(blog.url).toBe('fixed')
      expect(blog.likes).toBe(10)
    })

    test('apiTest - succeeds with status code 404 if id is not valid', async () => {
      const validNonexistingId = await helper.nonExistingId()
      await api.put(`/api/blogs/${validNonexistingId}`).expect(404)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})

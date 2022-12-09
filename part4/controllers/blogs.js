const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// Retrieve a blog
blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

// Add a new blog
blogRouter.post('/', async (request, response, next) => {
  try {
    if (request.body.title === undefined || request.body.url === undefined) {
      response.status(400).json({
        error: 'title or url is missing',
      })
    } else {
      const blog = new Blog(request.body)
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }
  } catch (exception) {
    next(exception)
  }
})

// Delete a blog
blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter

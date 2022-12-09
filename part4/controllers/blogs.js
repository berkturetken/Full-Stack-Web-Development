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

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Blog.findById(request.params.id)
    if (note) {
      response.json(note.toJSON())
    } else {
      response.status(404).end()
    }
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
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    if (deletedBlog) {
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

// Update a blog
blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    })
    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter

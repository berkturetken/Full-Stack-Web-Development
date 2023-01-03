const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

// Retrieve a blog
blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
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
blogRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    if (request.body.title === undefined || request.body.url === undefined) {
      response.status(400).json({
        error: 'title or url is missing',
      })
    } else {
      const body = request.body
      const user = request.user

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comment,
        user: user._id.toString(),
      })
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id.toString())
      await user.save()
      response.status(201).json(savedBlog)
    }
  } catch (exception) {
    next(exception)
  }
})

// Delete a blog
blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    // const user = await User.findById(decodedToken.id)
    if (blog.user.toString() !== user._id.toString()) {
      return response
        .status(401)
        .json({ error: 'you are not authorized to delete this blog' })
    }

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
    comments: body.comment,
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

// Add a comment to a blog
blogRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body

  if (body.comment === undefined) {
    response.status(400).json({
      error: 'comment is missing',
    })
  }

  try {
    const blog = await Blog.findById(request.params.id)
    const blogToBeChanged = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      comments: [...blog.comments, body.comment],
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blogToBeChanged,
      {
        new: true,
      }
    )
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

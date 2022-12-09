const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test Book',
    author: 'Berk Türetken',
    url: 'https://www.google.com/',
    likes: 10,
  },
  {
    title: 'Another Cool Book',
    author: 'Ata Metin Türetken',
    url: 'https://www.google.com/',
    likes: 16,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((note) => note.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'will be removed now',
    author: 'Will Be Removed',
    url: 'https://test.com',
    likes: -1,
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
}

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

const notesInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((note) => note.toJSON())
}

module.exports = {
  initialBlogs,
  notesInDb,
}

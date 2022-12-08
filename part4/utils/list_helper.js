const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return max.likes > blog.likes ? max : blog
  }
  const favBlog = blogs.reduce(reducer, 0)
  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  }
}

const mostBlogs = (blogs) => {
  const authorsAndBlogNumbers = lodash.countBy(blogs, 'author')
  let mostBlogNumber = Math.max(...Object.values(authorsAndBlogNumbers))
  const topAuthor = Object.keys(authorsAndBlogNumbers).find(
    (key) => authorsAndBlogNumbers[key] === mostBlogNumber
  )

  mostBlogNumber =
    mostBlogNumber === Number.NEGATIVE_INFINITY ? undefined : mostBlogNumber

  return {
    author: topAuthor,
    blogs: mostBlogNumber,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}

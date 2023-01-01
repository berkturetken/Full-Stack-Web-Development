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

  if (
    authorsAndBlogNumbers &&
    Object.keys(authorsAndBlogNumbers).length !== 0
  ) {
    let mostBlogNumber = Math.max(...Object.values(authorsAndBlogNumbers))
    const topAuthor = Object.keys(authorsAndBlogNumbers).find(
      (key) => authorsAndBlogNumbers[key] === mostBlogNumber
    )

    return {
      author: topAuthor,
      blogs: mostBlogNumber,
    }
  }
  return {}
}

const mostLikes = (blogs) => {
  let authorsAndLikes = {}
  blogs.forEach((blog) => {
    if (authorsAndLikes[blog.author]) {
      authorsAndLikes[blog.author] += blog.likes
    } else {
      authorsAndLikes[blog.author] = 0 + blog.likes
    }
  })

  if (authorsAndLikes && Object.keys(authorsAndLikes).length !== 0) {
    let mostBlogLikes = Math.max(...Object.values(authorsAndLikes))
    const topAuthor = Object.keys(authorsAndLikes).find(
      (key) => authorsAndLikes[key] === mostBlogLikes
    )

    return {
      author: topAuthor,
      likes: mostBlogLikes,
    }
  }
  return {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

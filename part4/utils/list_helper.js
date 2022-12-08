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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}

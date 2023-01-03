import { useParams } from 'react-router-dom'

const BlogDetail = ({ user, blogs, updateBlog, removeBlog }) => {
  const blogId = useParams().blogId
  const blog = blogs.find((b) => b._id === blogId)

  if (!blog) {
    return null
  }

  const handleLikes = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const handleRemove = () => {
    console.log('clicked remove')
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog._id)
    }
  }

  return (
    <div>
      <h2>
        {blog.title}, {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleLikes}>like</button>{' '}
      </p>
      <p>added by {blog.user.name} </p>
      {user.username === blog.user.username ? (
        <button id="removeButton" onClick={handleRemove}>
          remove
        </button>
      ) : (
        ''
      )}
    </div>
  )
}

export default BlogDetail

import { useState } from 'react'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)

  const [viewHideButton, setViewHideButton] = useState('view')
  const showDetails = { display: visible ? '' : 'none' }

  const toggle = () => {
    setVisible(!visible)
    setViewHideButton(viewHideButton === 'view' ? 'hide' : 'view')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleLikes = () => {
    updateBlog(blog._id, {
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
    <div style={blogStyle}>
      <div data-testid="titleAuthor">
        {blog.title}, {blog.author}
        <button onClick={toggle} data-testid="viewHideButton">
          {viewHideButton}
        </button>
      </div>

      <div style={showDetails} data-testid="urlLikes">
        <p data-testid="url">{blog.url}</p>
        <p data-testid="likes">
          likes {blog.likes}
          <button onClick={handleLikes}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username ? (
          <button onClick={handleRemove}>remove</button>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Blog

import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  // To be able to change the like number without refreshing the page
  const [likes, setLikes] = useState(blog.likes)

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

  const handleLikes = (event) => {
    event.preventDefault()
    setLikes(blog.likes + 1)
    updateBlog(blog._id, {
      ...blog,
      likes: likes,
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, {blog.author}
        <button onClick={toggle}>{viewHideButton}</button>
      </div>

      <div style={showDetails}>
        <p>{blog.url}</p>
        <p>
          likes {likes}
          <button onClick={handleLikes}>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog

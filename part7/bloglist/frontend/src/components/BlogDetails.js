import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const BlogDetails = ({ user, blogs, updateBlog, removeBlog, addComment }) => {
  const blogId = useParams().blogId
  const blog = blogs.find((b) => b._id === blogId)

  const [comment, setComment] = useState('')

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
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog._id)
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    addComment(blog._id, comment)
  }

  const padding = {
    padding: 25,
  }

  const margin = {
    marginTop: 10,
  }

  return (
    <div>
      <h2>
        {blog.title}, {blog.author}
      </h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <Button variant="success" onClick={handleLikes}>
          Like
        </Button>
      </p>
      <p>
        Added by <i>{blog.user.name}</i>
      </p>
      {user.username === blog.user.username ? (
        <>
          <Button variant="danger" id="removeButton" onClick={handleRemove}>
            Remove
          </Button>
          <br />
          <br />
        </>
      ) : (
        <br />
      )}

      <h3>Comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Control
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button style={margin} type="submit">
            Add Comment
          </Button>
        </Form.Group>
      </Form>
      <div style={padding}>
        {blog.comments === undefined || blog.comments.length === 0 ? (
          <p>No comment found :(</p>
        ) : (
          <ul>
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default BlogDetails

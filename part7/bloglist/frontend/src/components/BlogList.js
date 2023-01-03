import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import { useRef } from 'react'
import BlogForm from './BlogForm'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import {
  showNotification,
  hideNotification,
} from '../reducers/notificationReducer'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs, handleIsError }) => {
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const margin = {
    marginTop: 20,
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blogObject))
      dispatch(
        showNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      )
      handleIsError(false)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    } catch (exception) {
      dispatch(showNotification('blog could not be added'))
      handleIsError(true)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    }
  }

  const compareBlogLikes = (b1, b2) => {
    return b2.likes - b1.likes
  }

  return (
    <>
      <h2>Blogs</h2>
      <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <Table striped bordered hover variant="dark" style={margin}>
        <tbody>
          <tr>
            <th>Blog Name</th>
            <th>Author</th>
          </tr>
          {blogs.sort(compareBlogLikes) &&
            blogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <Link to={`blogs/${blog._id}`}>{blog.title}</Link>
                </td>
                <td>{blog.author}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}

export default BlogList

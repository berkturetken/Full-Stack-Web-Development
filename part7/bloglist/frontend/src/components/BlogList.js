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

const BlogList = ({ blogs, handleIsError }) => {
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
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
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <ol>
        {/* Note: sort() method returns the reference to the same array with the sorted version */}
        {blogs.sort(compareBlogLikes) &&
          blogs.map((blog) => (
            <li key={blog._id}>
              <div className="blog" style={blogStyle} data-testid="titleAuthor">
                <Link to={`blogs/${blog._id}`}>
                  {blog.title}, {blog.author}
                </Link>
              </div>
            </li>
          ))}
      </ol>
    </>
  )
}

export default BlogList

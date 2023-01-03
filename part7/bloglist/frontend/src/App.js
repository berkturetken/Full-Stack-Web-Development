import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  showNotification,
  hideNotification,
} from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  deleteBlog,
  incrementLike,
} from './reducers/blogReducer'
import Users from './components/Users'
import userService from './services/user'
import { Routes, Route } from 'react-router-dom'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.blogs)
  const blogs = [...items]

  const [isError, setIsError] = useState(false)

  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  // For retrieving all blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // For retrieving all users and logging a user
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users))
    const user = userService.getUser()
    setUser(user)
    blogService.setToken(userService.getToken())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      userService.setUser(user)
      blogService.setToken(userService.getToken())
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotification('wrong username or password'))
      setIsError(true)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    }
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
      setIsError(false)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    } catch (exception) {
      dispatch(showNotification('blog could not be added'))
      setIsError(true)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      dispatch(incrementLike(blogObject))
      dispatch(
        showNotification(
          `increased the like of blog ${blogObject.title} by ${blogObject.author}`
        )
      )
      setIsError(false)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    } catch (exception) {
      dispatch(showNotification('the like could not be increased'))
      setIsError(true)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      dispatch(deleteBlog(blogId))
      dispatch(showNotification('deleted successfully'))
      setIsError(false)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    } catch (exception) {
      dispatch(showNotification('blog could not be deleted'))
      setIsError(true)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    }
  }

  const logout = () => {
    console.log('logging out...')
    userService.clearUser()
    setUser(null)
  }

  const compareBlogLikes = (b1, b2) => {
    return b2.likes - b1.likes
  }

  const BlogList = () => {
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
                <Blog
                  key={blog._id}
                  user={user}
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                />
              </li>
            ))}
        </ol>
      </>
    )
  }

  return (
    <div>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification isError={isError} />
          <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification isError={isError} />
          <p>{user.name} logged in</p>
          <p>
            <button onClick={logout}>logout</button>
          </p>
        </div>
      )}
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:userId" element={<User users={users} />} />
      </Routes>
    </div>
  )
}

export default App

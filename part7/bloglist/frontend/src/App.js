import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  showNotification,
  hideNotification,
} from './reducers/notificationReducer'
import {
  initializeBlogs,
  deleteBlog,
  incrementLike,
  addCommentToBlog,
} from './reducers/blogReducer'
import Users from './components/Users'
import userService from './services/user'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { Nav, Navbar, Button } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.blogs)
  const blogs = [...items]

  const [isError, setIsError] = useState(false)

  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

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
      navigate('/')
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

  const addComment = async (blogId, comment) => {
    try {
      dispatch(addCommentToBlog(blogId, comment))
      dispatch(showNotification(`the comment '${comment}' is added`))
      setIsError(false)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    } catch (exception) {
      dispatch(showNotification('the comment could not be added'))
      setIsError(true)
      setTimeout(() => {
        dispatch(hideNotification())
      }, 3000)
    }
  }

  const loggedInUsernameStyle = {
    paddingRight: 15,
    color: 'white',
  }

  return (
    <div className="container">
      {user === null ? (
        <div>
          <h2>Login to Blog Application</h2>
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
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link to="/">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link to="/users">Users</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <em style={loggedInUsernameStyle}>{user.name}</em>
            <Button variant="warning" onClick={logout}>
              Logout
            </Button>
          </Navbar>
          <Notification isError={isError} />
          <Routes>
            <Route
              path="/"
              element={
                <BlogList
                  blogs={blogs}
                  handleIsError={({ val }) => setIsError(val)} // TODO: Fix here
                />
              }
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:userId" element={<User users={users} />} />
            <Route
              path="/blogs/:blogId"
              element={
                <BlogDetails
                  user={user}
                  blogs={blogs}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                  addComment={addComment}
                />
              }
            />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App

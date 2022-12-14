import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  // For retrieving all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // For logging user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
        setIsError(false)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    } catch (exception) {
      setMessage('blog could not be added')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const updateBlog = async (blogId, blogObject) => {
    try {
      await blogService.update(blogId, blogObject)
      setBlogs(
        blogs.map((currBlog) =>
          currBlog._id === blogId ? blogObject : currBlog
        )
      )
      setMessage(
        `increased the like of blog ${blogObject.title} by ${blogObject.author}`
      )
      setIsError(false)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('the like could not be increased')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const removeBlog = async (blogId) => {
    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter((currBlog) => currBlog._id !== blogId))
      setMessage('deleted successfully')
      setIsError(false)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('blog could not be deleted')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const logout = () => {
    console.log('logging out...')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const compareBlogLikes = (b1, b2) => {
    return b2.likes - b1.likes
  }

  return (
    <>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification message={message} isError={isError} />
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
          <Notification message={message} isError={isError} />
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
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
        </div>
      )}
    </>
  )
}

export default App

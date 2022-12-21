import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [isError, setIsError] = useState(false)

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

  const addBlog = (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }

      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${title} by ${author} added`)
        setIsError(false)
        setTitle('')
        setAuthor('')
        setUrl('')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    } catch (exception) {
      setMessage('blog could not be added')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }

  const logout = () => {
    console.log('logging out...')
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  return (
    <>
      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Notification message={message} isError={isError} />
          {loginForm()}
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification message={message} isError={isError} />
          <p>
            {user.name} logged in <button onClick={logout}>logout</button>
          </p>
          {blogForm()}
          <ol>
            {blogs.map((blog) => (
              <li key={blog._id}>
                <Blog key={blog._id} blog={blog} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}

export default App

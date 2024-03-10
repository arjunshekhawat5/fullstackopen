import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    const loggedInUser = window.localStorage.getItem('loggedInBlogAppUser')

    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [blogs])

  const notify = (msg) => {
    setErrorMessage(msg)
    setTimeout(() => {
      setErrorMessage('')
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage('')
    }
    catch (exception) {
      if (exception.response && exception.response.status === 401) {
        notify('Invalid username or password');
      } else {
        notify('An error occurred while logging in');
      }
    }

  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInBlogAppUser')
    notify('Logged out successfully')
  }

  const addBlog = async (newBlog) => {
    try {
      const response = await blogService.createBlog(newBlog)
      notify(`a new blog ${newBlog.title} added`)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()
    }
    catch {
      setErrorMessage('Could not create blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} is Logged In
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel='New note' ref={blogFormRef}>
        <CreateBlog addBlog={addBlog} />
      </Togglable>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      {user === null && loginForm()}
      {user !== null && blogForm()}
    </div>
  )

}

export default App
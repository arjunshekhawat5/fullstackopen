import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
    const loggenInUser = window.localStorage.getItem('loggedInBlogAppUser')

    if (loggenInUser) {
      const user = JSON.parse(loggenInUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInBlogAppUser')
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username: <input type='text' value={username} name='username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password: <input type='text' value={password} name='password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} is Logged In
        <button onClick={logout}>Logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
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
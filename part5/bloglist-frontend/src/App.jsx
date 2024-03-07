import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
  }, [])

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
      notify('Wrong Credentials')
    }

  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInBlogAppUser')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        "title": title,
        "author": author,
        "url": url
      }
      const response = await blogService.createBlog(newBlog)
      notify(`a new blog ${title} added`)
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
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
      <div>
        <CreateBlog 
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={handleCreateBlog}
        />
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
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

  const blogFormRef = useRef()

  const addSortedBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(sortedBlogs)
    return
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      addSortedBlogs(blogs)
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


  const handleLogin = async (userCredentials) => {
    try {
      const user = await loginService.login(userCredentials)
      window.localStorage.setItem(
        'loggedInBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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
      addSortedBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()
    }
    catch (exception) {
      if (exception.response && exception.response.status === 401) {
        notify('Invalid user token!');
      } else {
        notify('Error while adding a blog!');
      }
    }
  }


  const loginForm = () => (
    <LoginForm handleLogin={handleLogin} />
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
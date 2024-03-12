import { useState } from 'react'

const Blog = ({ id, blog, deleteBlog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const username = JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')).username

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    padding: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    margin: 10
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(prev => !prev)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br />
        Likes {blog.likes} <button onClick={() => likeBlog(blog)}>Like</button> <br />
        {blog.user.name} <br />
        {username === blog.user.username ? <button onClick={() => deleteBlog(blog)}>Delete</button> : ''}
      </div>
    </div>
  )
}

export default Blog
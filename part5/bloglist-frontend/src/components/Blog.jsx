import { useState } from 'react'

const Blog = ({ id, blog, deleteBlog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const user = JSON.parse(window.localStorage.getItem('loggedInBlogAppUser'))
  const username = user && user.username

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
      <div className='title-author'>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(prev => !prev)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div className='details' style={showWhenVisible}>
        {blog.url} <br />
        Likes {blog.likes} <button onClick={() => likeBlog(blog)}>Like</button> <br />
        {blog.user.name} <br />
        {username === blog.user.username ? <button onClick={() => deleteBlog(blog)}>Delete</button> : ''}
      </div>
    </div>
  )
}

export default Blog
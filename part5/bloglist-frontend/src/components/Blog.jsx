import { useState } from "react"

const Blog = ({ blog, deleteBlog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  const user = JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')).name

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    padding: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    margin: 10
  }

  const hideButton = () => {
    return (
      <button onClick={() => setVisible(prev => !prev)}>
        {visible ? 'hide' : 'view'}
      </button>
    )
  }

  const deleteButton = () => {
    return (
      user === blog.user.name
        ? <button onClick={() => deleteBlog(blog)}>Delete</button>
        : ''
    )
  }

  const likeButton = () => {
    return (
      <button onClick={() => likeBlog({ ...blog, likes: blog.likes + 1 })}>Like</button>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} {hideButton()}
      </div>
      <div style={showWhenVisible}>
        {blog.url} <br />
        Likes {blog.likes} {likeButton()}
        {blog.user.name} <br />
        {deleteButton()}
      </div>
    </div>
  )
}

export default Blog
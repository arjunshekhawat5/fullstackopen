import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    margin: 10
  }

  const showWhenVisible = { display: visible ? '' : 'none' }
  const user = JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')).name
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
        Likes {blog.likes}
        <button>Like</button> <br />
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'

test('renders blog without likes and URL', () => {
  const blog = {
    title: 'testing blog render',
    author: 'test user',
    url: 'should not render.com',
    likes: '0',
    user: {
      name: 'me',
      username: 'me'
    }
  }

  const { container } = render(<Blog blog={blog} />)

  let div = container.querySelector('.title-author')

  expect(div).toHaveTextContent(
    'testing blog render'
  )

  expect(div).toHaveTextContent(
    'test user'
  )

  div = container.querySelector('.details')

  expect(div).toHaveStyle(
    'display: none'
  )

})



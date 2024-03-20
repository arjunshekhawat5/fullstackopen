import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'


describe('<Blog />', () => {
  let blog
  beforeEach(() => {
    blog = {
      title: 'testing blog render',
      author: 'test user',
      url: 'should not render.com',
      likes: '0',
      user: {
        name: 'me',
        username: 'me'
      }
    }
  })

  test('renders blog without likes and URL', () => {
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


  test('renders likes and url after clicking button', async () => {
    const { container } = render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.details')
    expect(div).not.toHaveStyle(
      'display: none'
    )

  })

  test('clicking like button twice', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()
    render(<Blog blog={blog} likeBlog={mockHandler} />)

    const button = screen.getByText('view')
    await user.click(button)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
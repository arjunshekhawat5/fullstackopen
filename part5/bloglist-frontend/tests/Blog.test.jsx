import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'


describe('<Blog />', () => {
  let container

  beforeEach(() => {
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

    container = render(<Blog blog={blog} />).container

  })

  test('renders blog without likes and URL', () => {
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
    const user = userEvent.setup()

    const button = screen.getByText('view')

    await user.click(button)

    screen.debug()

    const div = container.querySelector('.details')
    expect(div).not.toHaveStyle(
      'display: none'
    )

  })
})
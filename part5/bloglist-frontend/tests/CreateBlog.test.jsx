import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from '../src/components/CreateBlog'

describe('<CreateBlog />', () => {
  test('creating a blog calls addblog with correct details', async () => {
    const user = userEvent.setup()
    const mockHandler = vi.fn()
    render(<CreateBlog addBlog={mockHandler} />)
    const submitButton = await screen.findByText('Create Blog')
    const titleInput = await screen.getByPlaceholderText('title')
    const authorInput = await screen.getByPlaceholderText('author')
    const urlInput = await screen.getByPlaceholderText('url')

    await user.type(titleInput, 'test title')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')

    await user.click(submitButton)

    const { title, author, url } = mockHandler.mock.calls[0][0]
    expect(title).toBe('test title')
    expect(author).toBe('test author')
    expect(url).toBe('test url')

  })
})
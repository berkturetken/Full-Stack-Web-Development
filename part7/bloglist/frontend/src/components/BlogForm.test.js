import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const component = render(<BlogForm createBlog={createBlog} />)

  const titleInput = component.getByTestId('titleInput')
  const authorInput = component.getByTestId('authorInput')
  const urlInput = component.getByTestId('urlInput')

  const sendButton = component.getByTestId('createButton')

  await user.type(titleInput, 'testing title')
  await user.type(authorInput, 'testing author')
  await user.type(urlInput, 'testing url')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  const blogObject = createBlog.mock.calls[0][0]
  expect(blogObject.title).toBe('testing title')
  expect(blogObject.author).toBe('testing author')
  expect(blogObject.url).toBe('testing url')
})

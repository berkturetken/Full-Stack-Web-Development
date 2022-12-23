import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders blog in a correct way', async () => {
  const blog = {
    title: 'automated test title',
    author: 'automated test author',
    likes: 10,
    url: 'https://www.google.com/',
    user: {
      name: 'berk türetken',
      username: 'turetkenb',
    },
  }

  const user = {
    username: 'turetkenb',
  }

  const component = render(<Blog blog={blog} user={user} />)

  // check that blog's title and author are displayed
  const titleAuthorDiv = component.getByTestId('titleAuthor')
  expect(titleAuthorDiv).toHaveTextContent('automated test title')
  expect(titleAuthorDiv).toHaveTextContent('automated test author')
  expect(titleAuthorDiv).not.toHaveStyle('display: none')

  // check that blog's url and number of likes are not displayed by default
  const urlLikesDiv = component.getByTestId('urlLikes')
  expect(urlLikesDiv).toHaveStyle('display: none')
})

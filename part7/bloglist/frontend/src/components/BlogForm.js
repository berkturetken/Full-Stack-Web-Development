import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const margin = {
    marginTop: 10,
    marginBottom: 10,
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h4>Create New Blog</h4>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            data-testid="titleInput"
          />
          <br />
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            data-testid="authorInput"
          />
          <br />
          <Form.Label>Url:</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            data-testid="urlInput"
          />
          <Button
            style={margin}
            id="createButton"
            type="submit"
            data-testid="createButton"
          >
            Create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm

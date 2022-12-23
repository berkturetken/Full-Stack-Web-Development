const BlogForm = ({
  createBlog,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
}) => {
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
            data-testid="titleInput"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
            data-testid="authorInput"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
            data-testid="urlInput"
          />
        </div>
        <button type="submit" data-testid="createButton">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm

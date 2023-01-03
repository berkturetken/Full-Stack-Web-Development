import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const userId = useParams().userId
  const user = users.find((u) => u._id === userId)
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <br />
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.length === 0 ? (
          <p>No blogs found :(</p>
        ) : (
          user.blogs.map((blog, index) => <li key={index}>{blog.title}</li>)
        )}
      </ul>
    </div>
  )
}

export default User

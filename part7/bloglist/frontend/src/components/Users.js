import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={user._id}>{user.name}</Link>{' '}
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users

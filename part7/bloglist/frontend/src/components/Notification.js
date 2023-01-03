import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Notification = ({ isError }) => {
  const notification = useSelector((state) => state.notifications)

  if (notification === null) {
    return null
  }

  return (
    <Alert variant={isError === true ? 'danger' : 'success'}>
      {notification}
    </Alert>
  )
}

export default Notification

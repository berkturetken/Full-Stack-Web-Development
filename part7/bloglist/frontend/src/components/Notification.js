import { useSelector } from 'react-redux'

const Notification = ({ isError }) => {
  const notification = useSelector((state) => state.notifications)

  if (notification === null) {
    return null
  }

  const successMessageStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorMessageStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div
      style={isError ? errorMessageStyle : successMessageStyle}
      className="error"
    >
      {notification}
    </div>
  )
}

export default Notification

const Notification = ({ message, isError }) => {
  if (message === null) {
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
      {message}
    </div>
  )
}

export default Notification

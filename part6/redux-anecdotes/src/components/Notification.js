import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notifications

  const showStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  const hideStyle = {
    display: 'none',
  }

  return (
    <div style={notification === null ? hideStyle : showStyle}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification

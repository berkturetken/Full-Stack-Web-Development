import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeoutID = 0

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification() {
      return null
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {
    clearTimeout(timeoutID)
    dispatch(showNotification(message))
    timeoutID = setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer

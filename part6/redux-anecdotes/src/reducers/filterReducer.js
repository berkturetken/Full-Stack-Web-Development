import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    search(state, action) {
      return action.payload
    },
  },
})

export const { search } = filterSlice.actions
export default filterSlice.reducer

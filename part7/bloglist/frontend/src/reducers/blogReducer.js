import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog._id !== action.payload)
    },
    incrementBlogLike(state, action) {
      const changedBlog = action.payload
      return state.map((blog) =>
        blog._id !== changedBlog._id ? blog : changedBlog
      )
    },
    addComment(state, action) {
      const blogId = action.payload.blogId
      const comment = action.payload.comment
      return state.map((blog) =>
        blog._id !== blogId
          ? blog
          : { ...blog, comments: [...blog.comments, comment] }
      )
    },
  },
})

export const {
  setBlogs,
  appendBlog,
  removeBlog,
  incrementBlogLike,
  addComment,
} = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    await blogService.remove(blogId)
    dispatch(removeBlog(blogId))
  }
}

export const incrementLike = (changedBlog) => {
  return async (dispatch) => {
    await blogService.update(changedBlog._id, changedBlog)
    dispatch(incrementBlogLike(changedBlog))
  }
}

export const addCommentToBlog = (blogId, comment) => {
  const obj = {
    blogId: blogId,
    comment: comment,
  }
  return async (dispatch) => {
    try {
      await blogService.addComment(blogId, comment)
      dispatch(addComment(obj))
    } catch (e) {
      console.log(e)
      // TODO: Propage to the next catch blog
    }
  }
}

export default blogSlice.reducer

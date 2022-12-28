import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const items = useSelector((state) => {
    const filteredAnecdotes =
      state.filters === null
        ? state.anecdotes
        : state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filters.toLowerCase())
        )
    return filteredAnecdotes
  })
  const anecdotes = [...items]
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }

  const compareAnecdoteVotes = (a1, a2) => {
    return a2.votes - a1.votes
  }

  return (
    anecdotes.sort(compareAnecdoteVotes) &&
    anecdotes.map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    ))
  )
}

export default AnecdoteList

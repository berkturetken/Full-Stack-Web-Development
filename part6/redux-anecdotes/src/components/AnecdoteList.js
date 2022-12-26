import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {
    const items = useSelector(state => state.anecdotes)
    const anecdotes = [...items]
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(incrementVote(id))
    }

    const compareAnecdoteVotes = (a1, a2) => {
        return a2.votes - a1.votes
    }

    return (
      anecdotes.sort(compareAnecdoteVotes) && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
    )
}

export default AnecdoteList
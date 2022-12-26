import { useDispatch } from 'react-redux'
import { search } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const searchValue = event.target.value
    dispatch(search(searchValue))
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter

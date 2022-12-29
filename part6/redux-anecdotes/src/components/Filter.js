import { connect } from 'react-redux'
import { search } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const searchValue = event.target.value
    props.search(searchValue)
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

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = {
  search,
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedFilter

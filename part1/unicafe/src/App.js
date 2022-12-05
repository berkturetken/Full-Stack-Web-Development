import { useState } from 'react'

const Statistics = ({ text, count }) => {
  return <p>{text} {count}</p>
} 

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const giveGoodFeedback = () => setGood(good + 1)
  const giveNeutralFeedback = () => setNeutral(neutral + 1)
  const giveBadFeedback = () => setBad(bad + 1)

  let total = good + neutral + bad

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={giveGoodFeedback} text="good" />
      <Button onClick={giveNeutralFeedback} text="neutral" />
      <Button onClick={giveBadFeedback} text="bad" />
      <h1>statistics</h1>
      <Statistics text="good" count={good} />
      <Statistics text="neutral" count={neutral} />
      <Statistics text="bad" count={bad} />
      <Statistics text="all" count={total} />
      <Statistics text="average" count={(good-bad)/total} />
      <Statistics text="positive" count={100*(good/total) + " %"} />
    </div>
  )
}

export default App
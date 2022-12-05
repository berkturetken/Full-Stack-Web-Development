import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p> 
  } else {
    return (
      <>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {(good - bad) / total}</p>
        <p>positive {100 * (good / total) + " %"}</p>
      </>
    )
  }
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

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={giveGoodFeedback} text="good" />
      <Button onClick={giveNeutralFeedback} text="neutral" />
      <Button onClick={giveBadFeedback} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
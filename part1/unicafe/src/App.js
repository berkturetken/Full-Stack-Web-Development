import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  return <p>{text} {value}</p>
}

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p> 
  } else {
    return (
      <div>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={(good - bad) / total} />
        <StatisticLine text="positive" value={100 * (good / total) + " %"} />
      </div>
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
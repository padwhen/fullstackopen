import { useState } from 'react'
const StatisTicLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  } 
    return (
      <table>
        <tbody>
      <StatisTicLine text="good" value={good} />
      <StatisTicLine text="neutral" value={neutral} />
      <StatisTicLine text="bad" value={bad} />
      <StatisTicLine text="total" value={total} />
      <StatisTicLine text="average" value={average} />
      <StatisTicLine text="positive" value={positive} />
      </tbody>
      </table>
    )
  }

const Button = ({good, neutral, bad}) => {
  return (
    <div>
    <button onClick={good}>good</button>
    <button onClick={neutral}>neutral</button>
    <button onClick={bad}>bad</button>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  }

  const average = total === 0 ? 0 : ((good-bad) / total).toFixed(2);
  const positive = total === 0 ? 0 : ((good / total)*100).toFixed(2);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button good={handleGood} neutral={handleNeutral} bad={handleBad} />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App

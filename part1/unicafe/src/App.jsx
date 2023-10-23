import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Stats = ({ rating }) => {

  let totalRating = rating.good + rating.neutral + rating.bad
  let averageRating = ((rating.good * 1 - rating.bad) / (totalRating)).toFixed(1)
  let positiveFeedback = ((rating.good / totalRating) * 100).toFixed(1) + "%"

  if (totalRating == 0) return (<h4>No Feedback Given</h4>)

  return (
    <table>
      <tbody>
        <StatLine text="Good" value={rating.good} />
        <StatLine text="Neutral" value={rating.neutral} />
        <StatLine text="Bad" value={rating.bad} />
        <StatLine text="Total Ratings" value={totalRating} />
        <StatLine text="Average Rating" value={averageRating} />
        <StatLine text="Positve Feedback" value={positiveFeedback} />
      </tbody>
    </table>
  )

}

const App = () => {
  const [rating, setRating] = useState(
    {
      good: 0,
      neutral: 0,
      bad: 0
    }
  )
  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setRating({ ...rating, good: rating.good + 1 })} text="Good" />
      <Button handleClick={() => setRating({ ...rating, neutral: rating.neutral + 1 })} text="Neutral" />
      <Button handleClick={() => setRating({ ...rating, bad: rating.bad + 1 })} text="Bad" />

      <h1>Statistics</h1>
      <Stats rating={rating} />
    </div>
  )

}
export default App

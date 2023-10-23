import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Stat = ({ name, value }) => (<p>{name} {value} </p>)

const Stats = ({ rating }) => {
  return (
    <div>
      <p>Good {rating.good} </p>
      <p>Neutral {rating.neutral} </p>
      <p>Bad {rating.bad} </p>
    </div>
  )

}

const App = () => {
  // save clicks of button on its own state

  const [rating, setRating] = useState(
    {
      good: 0,
      neutral: 0,
      bad: 0
    }
  )
  console.log(rating);



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

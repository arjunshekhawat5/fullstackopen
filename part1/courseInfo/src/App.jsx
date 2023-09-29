const Header = (props) => {
  console.log(props.course)
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props.part, props.exercises)
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Total = (props) => {
  console.log(props.total)
  return (
    <p>Total Number of exercises {props.total} </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />

    </div>
  )
}

export default App

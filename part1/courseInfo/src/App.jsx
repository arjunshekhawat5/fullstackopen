const Header = (props) => {
  //console.log(props.course)
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  //console.log(props.course.parts)
  return (
    <>
      <Part parts={props.course.parts} />
    </>
  )
}

const Part = (props) => {
  //console.log(props.parts)
  return (
    <>
      <p>{props.parts[0].name} {props.parts[0].exercises} </p>
      <p>{props.parts[1].name} {props.parts[1].exercises} </p>
      <p>{props.parts[2].name} {props.parts[2].exercises} </p>
    </>
  )
}

const Total = (props) => {
  //console.log(props.course.parts)
  return (
    <p>Total Number of exercises {props.course.parts[0].exercises
      + props.course.parts[1].exercises
      + props.course.parts[2].exercises} </p>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />

    </div>
  )
}

export default App

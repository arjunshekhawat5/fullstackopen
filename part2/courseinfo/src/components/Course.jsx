
const Course = ({course}) => {
  const courseParts = course.parts
  const courseName = course.name

  const part = part => <p key={part.id}> {part.name} {part.exercises}</p>
  const getTotalExercise = courseParts.reduce((exercisesSum, coursePart) => exercisesSum + coursePart.exercises, 0)
  
  return(
    <div>
      <h2> {courseName} </h2>
      {courseParts.map(part)}
      <h4> Total of {getTotalExercise} exercises </h4>
    </div>
  )
}

export default Course
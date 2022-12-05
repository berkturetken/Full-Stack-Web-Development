import React from "react"

const Part = ( {coursePart} ) => <p>{coursePart.name} {coursePart.exercises}</p>

const Content = ( {courseParts} ) => {
  return (
    <>
      {
        courseParts.map(coursePart => <Part key={coursePart.id} coursePart={coursePart} />)
      }
    </>
  )
}

const Header = ( {courseName} ) => <h1>{courseName}</h1>

const Course = ( {course} ) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      // {
      //   name: 'Test',
      //   exercises: 9,
      //   id: 4
      // },
    ]
  }

  return <Course course={course} />
}

export default App
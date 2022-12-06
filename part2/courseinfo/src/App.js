import React from "react";

const Part = ({ coursePart }) => (
  <p>
    {coursePart.name} {coursePart.exercises}
  </p>
);

const Content = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.id} coursePart={coursePart} />
      ))}
    </>
  );
};

const Header = ({ courseName }) => <h1>{courseName}</h1>;

const Course = ({ course }) => {
  return (
    <>
      <Header courseName={course.name} />
      <Content courseParts={course.parts} />
    </>
  );
};

const Sum = ({ course }) => {
  const initialValue = 0;
  const sum = course.parts.reduce(
    (sum, coursePart) => sum + coursePart.exercises,
    initialValue
  );
  return <b>total of {sum} exercises</b>;
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Course course={course} />
          <Sum course={course} />
        </div>
      ))}
    </>
  );
};

export default App;

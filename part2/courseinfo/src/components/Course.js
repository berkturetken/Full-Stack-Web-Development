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

export default Course;

const Sum = ({ course }) => {
  const initialValue = 0;
  const sum = course.parts.reduce(
    (sum, coursePart) => sum + coursePart.exercises,
    initialValue
  );
  return <b>total of {sum} exercises</b>;
};

export default Sum;

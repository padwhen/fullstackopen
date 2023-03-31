import React from "react";
const Parts = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
      <div>
        <b>total of {totalExercises} exercises</b>
      </div>
    );
  };
export default Parts
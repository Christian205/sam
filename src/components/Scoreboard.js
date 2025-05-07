import React from 'react';

const Scoreboard = ({ score }) => {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <p>Correct: {score.correct}</p>
      <p>Wrong: {score.wrong}</p>
    </div>
  );
};

export default Scoreboard;
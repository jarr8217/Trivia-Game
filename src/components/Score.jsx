import React from 'react';
import '../styles/Score.css'; 

function Score({ score, total, name, playAgain }) {
  return (
    <div className="quiz-container">
      <h2>Congratulations, {name}!</h2> {/* Display name */}
      <p className="score">
        Your Score: {score} / {total}
      </p>
      <button className="reset-button" onClick={playAgain}>Try Again</button>
    </div>
  );
}

export default Score;
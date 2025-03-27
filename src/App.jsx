import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Score from './components/Score';
import './App.css';

function App() {
  // State to manage the current view, game data, and score
  const [view, setView] = useState('home');
  const [gameData, setGameData] = useState(null); 
  const [score, setScore] = useState(0);

  // Function to start the quiz
  const handleStart = (data) => {
    setGameData(data);
    setView('quiz');
  };

  // Function to handle the end of the quiz
  const handleFinish = (finalScore) => {
    setScore(finalScore);
    setView('score');
  };

  // Function to handle the restart of the quiz
  const handleRestart = () => {
    setGameData(null);
    setScore(0);
    setView('home');
  };

  // Render the appropriate component based on the current view
  switch (view) {
    case 'home':
      return <Home onStart={handleStart} />;
    case 'quiz':
      return <Quiz {...gameData} onFinish={handleFinish} />;
    case 'score':
      return <Score score={score} onRestart={handleRestart} />;
    default:
      return null;
  }
}

export default App;

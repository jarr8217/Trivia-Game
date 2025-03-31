// This is the main application component for the Trivia Game.
// It manages the overall state and renders different components based on the app's state.

import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Score from './components/Score';

function App() {
  // State to store the quiz data
  const [quizData, setQuizData] = useState(null);

  // State to track whether the quiz is currently active
  const [showQuiz, setShowQuiz] = useState(false);

  // Function to start the quiz with the provided settings
  const StartQuiz = (name, category, difficulty) => {
    setQuizData({ name, category, difficulty }); // Store name, category, and difficulty
    setShowQuiz(true);
  };

  // Function to reset the quiz and return to the home screen
  const resetQuiz = () => {
    setQuizData(null);
    setShowQuiz(false);
  };

  // Render the home screen or quiz screen based on the app's state
  return (
    <div className='App'>
      {!showQuiz ? (
        <Home startQuiz={StartQuiz} />
      ) : (
        <Quiz 
          category={quizData.category}
          difficulty={quizData.difficulty}
          name={quizData.name} // Pass name to Quiz
          resetQuiz={resetQuiz}
        />
      )}
      <footer>
        <p>Trivia Game &copy; 2025</p>
        <p>Developed by Jose A. Refoyo Ron</p>
      </footer>
    </div>
  )
};

export default App;
import { useState } from 'react';
import './App.css';
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
  // State to manage quiz data and visibility
  const [quizData, setQuizData] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);

  // Start the quiz with user inputs
  const startQuiz = (name, category, difficulty) => {
    setQuizData({ name, category, difficulty });
    setShowQuiz(true);
  };

  // Reset the quiz to show the home screen
  const resetQuiz = () => {
    setQuizData(null);
    setShowQuiz(false);
  };

  return (
    <div className="App">
      {!showQuiz ? (
        <Home startQuiz={startQuiz} />
      ) : (
        <Quiz 
          category={quizData.category}
          difficulty={quizData.difficulty}
          name={quizData.name}
          resetQuiz={resetQuiz}
        />
      )}
      <footer>
        <p>Trivia Game &copy; 2025</p>
        <p>Developed by Jose A. Refoyo Ron</p>
      </footer>
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import '../styles/Quiz.css';
import Score from './Score';

function Quiz({ category, difficulty, name, resetQuiz }) {
    // State variables for quiz logic and user interaction
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');
    const [apiError, setApiError] = useState('');
    const [finished, setFinished] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    // Fetch questions from API when category or difficulty changes
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=10`);
                const data = await response.json();

                if (data.results.length > 0) {
                    setQuestions(data.results);
                    setShuffledAnswers(
                        data.results.map((question) => [
                            ...question.incorrect_answers,
                            question.correct_answer,
                        ].sort(() => Math.random() - 0.5))
                    );
                } else {
                    setApiError('No questions available.');
                }
            } catch {
                setApiError('Failed to fetch questions.');
            }
        })();
    }, [category, difficulty]);

    if (apiError) return <div className="error">{apiError}</div>;
    if (questions.length === 0) return <div>Loading...</div>;

    const activeQuestion = questions[currentQuestionIndex];
    const answers = shuffledAnswers[currentQuestionIndex] || [];

    // Handle answer submission and provide feedback
    const handleAnswerSubmit = () => {
        if (!selectedAnswer) {
            setError('Please select an answer.');
            return;
        }

        setError('');
        if (selectedAnswer === activeQuestion.correct_answer) {
            setScore(score + 1);
            setFeedback(`Good job, ${name}! You answered correctly.`);
        } else {
            setFeedback(
                `Sorry, ${name}. The correct answer was: ${activeQuestion.correct_answer}`
            );
        }
    };

    // Move to the next question or finish the quiz
    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setFeedback('');
        } else {
            setFinished(true);
        }
    };

    if (finished) {
        return <Score score={score} total={questions.length} name={name} playAgain={resetQuiz} />;
    }

    return (
        <div className="quiz-container">
            <h2 dangerouslySetInnerHTML={{ __html: activeQuestion.question }} />
            <form onSubmit={(e) => e.preventDefault()}>
                {answers.map((answer) => (
                    <div key={answer} className="answer">
                        <input
                            type="radio"
                            id={answer}
                            name="answer"
                            value={answer}
                            checked={selectedAnswer === answer}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                        />
                        <label htmlFor={answer} dangerouslySetInnerHTML={{ __html: answer }} />
                    </div>
                ))}
                {!feedback && (
                    <button type="button" onClick={handleAnswerSubmit}>
                        Submit Answer
                    </button>
                )}
                {error && <p className="error">{error}</p>}
            </form>
            {feedback && (
                <div>
                    <p className="feedback">{feedback}</p>
                    <button type="button" onClick={handleNextQuestion}>
                        Next Question
                    </button>
                </div>
            )}
        </div>
    );
}

export default Quiz;

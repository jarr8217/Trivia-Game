import { useState, useEffect } from 'react';
import '../styles/Quiz.css';
import Score from './Score';

function Quiz({ category, difficulty, name, resetQuiz }) {
    const [questions, setQuestions] = useState([]); // Holds the list of questions
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks the current question index
    const [selectedAnswer, setSelectedAnswer] = useState(''); // Holds the selected answer
    const [error, setError] = useState(''); // Holds any error messages
    const [apiError, setApiError] = useState(''); // Tracks API errors
    const [finished, setFinished] = useState(false); // Tracks if the quiz is finished
    const [shuffledAnswers, setShuffledAnswers] = useState([]); // Holds the shuffled answers for the current question
    const [score, setScore] = useState(0); // Tracks the score
    const [feedback, setFeedback] = useState(''); // Holds feedback message for the user

    useEffect(() => {
        (async () => {
            try {
                console.log('Fetching questions with:', { category, difficulty }); // Log API parameters
                const response = await fetch(
                    `https://opentdb.com/api.php?amount=10`
                );
                console.log('API response status:', response.status); // Log response status

                const data = await response.json();
                console.log('Parsed API data:', data); // Log parsed API data

                if (data.results.length > 0) {
                    setQuestions(data.results); // Set the questions state with the fetched data
                    setShuffledAnswers(
                        data.results.map((question) => [
                            ...question.incorrect_answers,
                            question.correct_answer,
                        ].sort(() => Math.random() - 0.5))
                    ); // Shuffle answers for each question once
                    console.log('Questions set:', data.results); // Log the questions state
                } else {
                    setApiError('No questions available.');
                    console.error('No questions available for the selected category and difficulty.'); // Log error
                }
            } catch (err) {
                setApiError('Failed to fetch questions.');
                console.error('Fetch error:', err); // Log the error for debugging
            }
        })();
    }, [category, difficulty]);

    if (apiError) return <div className="error">{apiError}</div>; // Display API error message
    if (questions.length === 0) return <div>Loading...</div>; // Show loading message while fetching

    const activeQuestion = questions[currentQuestionIndex]; // Get the current question
    const answers = shuffledAnswers[currentQuestionIndex] || []; // Use pre-shuffled answers

    const handleAnswerSubmit = () => {
        if (!selectedAnswer) {
            setError('Please select an answer.');
            return;
        }

        setError('');
        if (selectedAnswer === activeQuestion.correct_answer) {
            setScore(score + 1);
            setFeedback(`Good job, ${name}! You answered correctly.`); // Use name in feedback
        } else {
            setFeedback(
                `Sorry, ${name}. You answered incorrectly. The correct answer was: ${activeQuestion.correct_answer}`
            );
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setFeedback(''); // Clear feedback for the next question
        } else {
            setFinished(true); // End the quiz if it's the last question
        }
    };

    const handleRestart = () => {
        setFinished(false);
        setSelectedAnswer('');
        setCurrentQuestionIndex(0);
        setScore(0);
        resetQuiz();
    };

    if (finished) {
        return <Score score={score} total={questions.length} name={name} resetQuiz={handleRestart} />;
    }

    return (
        <div className="quiz-container">
            <div>
                <h2 dangerouslySetInnerHTML={{ __html: activeQuestion.question }} />
                <form onSubmit={(e) => e.preventDefault()}>
                    {answers.map((answer) => (
                        <div key={answer} className='answer'>
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
                    {error && <p className="error">{error}</p>} {/* Display error if no answer is selected */}
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
        </div>
    );
}

export default Quiz;

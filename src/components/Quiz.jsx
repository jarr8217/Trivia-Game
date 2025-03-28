import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Quiz.css';

function Quiz({ category, difficulty, name, onFinish }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const [error, setError] = useState('');
    const [laoding, setLaoding] = useState(true);

    // Fetch questions from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            setLaoding(true);
            setError('');

            const controller = new AbortController(); // Create an AbortController instance
            const timeout = setTimeout(() => controller.abort(), 5000); // Set a timeout of 5 seconds

            try {
                const response = await fetch(
                    `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}`,
                    { signal: controller.signal }, // Pass the signal to the fetch request
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await response.json();

                // Clear the timeout if the fetch is successful
                if (!data.results || !Array.isArray(data.results) || data.results.length === 0) {
                    throw new Error('No questions found');
                }
                setQuestions(data.results);
                setLaoding(false);
            } catch (err) {
                console.error('Error:', err);
                setError('Failed to fetch questions');
                setQuestions([]); // Prevent infinite loop by resetting questions
                setLaoding(false);
            } finally {
                clearTimeout(timeout); // Clear the timeout in the finally block
            }
        };

        fetchQuestions();
    }, [category, difficulty]); // <-- This is where the useEffect function ends

    // Handle answer submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAnswer) {
            setError('Please select an answer!');
            return;
        }

        setError('');

        // Store the user's answer
        const newUsersAnswers = [
            ...userAnswers,
            {
                questionIndex: currentQuestion, // track current question index
                answer: selectedAnswer, // Store the selected answer
            }
        ];
        setUserAnswers(newUsersAnswers);
        setSelectedAnswer('');

        // Move to the next question or finish the quiz
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate the final score
            const finalScore = userAnswers.reduce((acc, userAnswer) => {
                const question = questions[userAnswer.questionIndex];
                return userAnswer.answer === question.correct_answer ? acc + 1 : acc;
            }, 0);

            try {
                await onFinish(finalScore);
            } catch (err) {
                console.error('Error finishing quiz:', err);
                setError('Failed to finish quiz');
            }
        }
    };

    // Display loading, error or quiz content
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (questions.length === 0) {
        return <div>No questions available</div>;
    }


    // Shuffle the answers for the current question
    const answers = [
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer,
    ].sort(() => Math.random() - 0.5);

    return (
        <div className="quiz-container">
            <h2> dangeraouslySetInnerHTML= {{ __html: questions[currentQuestion].question }} </h2>

            <form onSubmit={handleSubmit}>
                {answers.map((answer) => (
                    <div key={answer} className="answer-option">
                        <input
                            type="radio"
                            id={answer}
                            name="quiz"
                            value={answer}
                            checked={selectedAnswer === answer}
                            onChange={(e) => setSelectedAnswer(e.target.value)}
                        />
                       { /* This is a dangerous function, but we trust the API to return safe HTML */}  
                        <label htmlFor={`answer-${index}`}
                            dangerouslySetInnerHTML={{ __html: answer }}
                        ></label>
                    </div>
                ))}
                <button type="submit">
                    {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

// PropTypes validation
Quiz.propTypes = {
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onFinish: PropTypes.func.isRequired,
};

export default Quiz;

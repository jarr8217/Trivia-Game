import { useState, useEffect } from 'react';
import styles from './styles/Quiz.css'; 

function Quiz({ category, difficulty, name, onFinish }) {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [userAnswers, setUserAnswers] = useState([]);
    const [error, setError] = useState('');

    // Fetch questions from the API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(
                    `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await response.json();
                setQuestions(data.results);
            } catch (err) {
                setError('Failed to fetch questions');
                console.error(err);
            }
        };

        fetchQuestions();
    }, [category, difficulty]);

    // Handle answer submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAnswer) {
            setError('Please select an answer!');
            return;
        }

        setError('');
        setUserAnswers([...userAnswers, { 
            questionIndex: currentQuestion, 
            answer: selectedAnswer 
        }]);
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

            // Finish the quiz
            try {
                await onFinish(finalScore);
            } catch (err) {
                console.error('Error finishing quiz:', err);
                setError('Failed to finish quiz');
            }
        }
    };

    // Show loading message while fetching questions
    if (!questions.length) {
        return <div>Loading...</div>;
    }

    // Shuffle the answers for the current question
    const answers = [
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer
    ].sort(() => Math.random() - 0.5);

    return (
        <div className="quiz-container">
            <h2>{questions[currentQuestion].question}</h2>
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
                        <label htmlFor={answer}>{answer}</label>
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

export default Quiz;

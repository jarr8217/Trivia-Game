import {useState, useEffect} from 'react';

function Quiz({category, difficulty, name, onFinish}) {
    // State to manage questions, current question, selected answer, users anwser and error
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [userAnswer,setUserAnswer] = useState([]);
    const [error, setError] = useState('');
}

// fetch questions from API opentdb.com

useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`);
            const data = await response.json();
            setQuestions(data.results);
        } catch (err) {
            console.error(err);
            setError('Something went wrong. Please try again.');
        }
    };
    fetchQuestions();
}, [category, difficulty]);

// Function to handle answer submission
const handleSubmit = (e) => {
    e.preventDefault();
    // Check if an answer if selected
    if (!selectedAnswer)
        setError('Please select an answer!')
        return;
}
setError('');

// Store user's answer
setUserAnswer([...userAnswer, selectedAnswer]);
setSelectedAnswer('');

// Move to next question
if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
} else {
// Calculate the final score
const finalScore = userAnswer.reduce((acc, userAnswer) => {
    const question = questions[userAnswer.questionIndex]
    return userAnswer.anwser === question.correct_answer ? acc + 1 : acc;
}, 0);

try {
    await onFinish(finalScore);
} catch (err) {
    return('Error finishing quiz', err)
    setError('Failed to finish quiz');
}};

// Show loading message if question are not yet fetched
 if (!questions.length) 
    return <div>Loading...</div>;

 // Shuffle the anwsers
 const answers = [... questions[currentQuestion].incorrect_answer, question[currentQuestion].correct_answer].sort(() => Math.random() - 0.5); 

    return (
        <div>
            <h2>{questions[currentQuesion].question}</h2>
            <form onSubmit={handleAnswer}>
                {answers.map((answer) => (
                    <label key={answer}>
                        <input type='radio' value='answer' checked={selectedAnswer === answer} onChange = {() => setSelectedAnswer(e.target.value)}/>
                        {answer}
                    </label>
                ))}
                {/* Making a next question button that also renders the next question */}
                <button type='submit'>Next</button>
                {error && <p>{error}</p>}
                
            </form>
        </div>
    )


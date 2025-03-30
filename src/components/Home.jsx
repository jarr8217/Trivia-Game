// This component renders the home screen of the Trivia Game.
// It allows users to input their name, select a category, and choose a difficulty level before starting the quiz.

import { useState } from 'react';
import '../styles/Home.css'; // Importing CSS for styling

function Home({ startQuiz }) {
    // State to store the user's name
    const [name, setName] = useState('');

    // State to store the selected quiz category
    const [category, setCategory] = useState('');

    // State to store the selected difficulty level
    const [difficulty, setDifficulty] = useState('');

    // State to store error messages for form validation
    const [error, setError] = useState('');

    // Handles the form submission, validates inputs, and starts the quiz
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !category || !difficulty) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');
        startQuiz(name, category, difficulty);
    };

    // Render the home screen form with inputs for name, category, and difficulty
    return ( 
        <div className='home-container'>
            <h1>Welcome to the Trivia Game</h1>
            <p>Enter your name, and choose your category and difficulty level</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='firstname'>First Name:</label>
                    <input
                        type='text'
                        id='firstname'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter your first name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='category'>Category:</label>
                    <select
                        id='category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value=''>Select a category</option>
                        <option value='General Knowledge'>General Knowledge</option>
                        <option value='Science'>Science</option>
                        <option value='History'>History</option>
                        <option value='Geography'>Geography</option>
                    </select>
                    
                </div>
                <div>
                    <label htmlFor='difficulty'>Difficulty:</label>
                    <select
                        id='difficulty'
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        required
                    >
                        <option value=''>Select difficulty</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>

                </div>
                {error && <p className='error'>{error}</p>}
                <button type='submit'>Start Quiz</button>
            </form>
        </div>
    );
}

export default Home;
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
        console.log('Form submitted with:', { name, category, difficulty }); // Log form submission data

        if (!name || !category || !difficulty) {
            setError('Please fill in all fields.');
            console.log('Validation error: Missing fields'); // Log validation error
            return;
        }

        setError('');
        console.log('Starting quiz with:', { name, category, difficulty }); // Log quiz start data
        startQuiz(name, category, difficulty); // Pass name to startQuiz
    };

    // Render the home screen form with inputs for name, category, and difficulty
    return ( 
        <div className='home-container'>
            <h1>Trivia Game Challenge</h1> {/* Updated title */}
            <p>Test your knowledge across various categories and difficulty levels!</p> {/* Updated description */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='firstname'>First Name:</label>
                    <input
                        type='text'
                        id='firstname'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            console.log('Name updated:', e.target.value); // Log name updates
                        }}
                        placeholder='Enter your first name'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='category'>Category:</label>
                    <select
                        id='category'
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            console.log('Category updated:', e.target.value); // Log category updates
                        }}
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
                        onChange={(e) => {
                            setDifficulty(e.target.value);
                            console.log('Difficulty updated:', e.target.value); // Log difficulty updates
                        }}
                        required
                    >
                        <option value=''>Select difficulty</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                </div>
                {error && <p className='error'>{error}</p>}
                <button type='submit' className='start-button'>Start Quiz</button> {/* Added class for styling */}
            </form>
        </div>
    );
}

export default Home;
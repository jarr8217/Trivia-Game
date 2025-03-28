import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import '../styles/Home.css';
function Home({onStart}) {
    // State to store form data and error message
    const [formData, setFormData] = useState({
        name: '', 
        category: '',
        difficulty: ''
    });
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [difficultyLevels, setDifficultyLevels] = useState([
        { id: 'easy', name: 'Easy' },
        { id: 'medium', name: 'Medium' },
        { id: 'hard', name: 'Hard' },
    ]);

    // Fetch categories from the API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://opentdb.com/api_category.php');

                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }

                const data = await response.json();
                setCategories(data.trivia_categories);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);

    //Function to update form data when input changes are made
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

        // Function to handle form submission
        const handleSubmit = async (e) => {
            e.preventDefault();

            // Required fields validation
            if (formData.name === '' || !formData.category || !formData.difficulty) {
                setError('All fields are required');
                return;
            }
            try { 
                await onStart({
                    name: formData.name,
                    category: formData.category,
                    difficulty: formData.difficulty,
                });
                } catch (err)
                {
                console.error(err);
                setError('Something went wrong. Please try again.');
                }
        };

        return (
        
            <div className='home-container'>
                <h1> Welcome to the Trivia game app!</h1>
                <p> Enter your name, select category, and choose difficulty level to start the game.</p>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='name' placeholder='Enter your name' value={formData.name} onChange={handleChange}/>

                {/* Dropdown menu to select category from API response data*/ }
                <select 
                    name='category' 
                    value={formData.category} 
                    onChange={handleChange}>
                    <option value=''>Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))};
                </select>
                {/* dropdown menu to select difficulty level from API respense data*/}
                <select name='difficulty' value={formData.difficulty} onChange={handleChange}>
                    <option value=''>Select Difficulty</option>
                    {difficultyLevels.map((level) => (
                        <option key={level.id} value={level.id}>
                            {level.name}
                        </option> 
                    ))};
                </select>

                {/* Start quiz button */}
                <button type='submit'>Start Quiz</button>
                {error && <p>{error}</p>}
                
            </form>
        </div>
    );
}


// PropTypes validation
Home.propTypes = {
    onStart: PropTypes.func.isRequired,
};

export default Home;




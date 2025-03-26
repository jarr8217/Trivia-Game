import {useState} from 'react';

function Home({onStart}) {
    // State to store form data and error message
    const [formData, setFormData] = useState({
        name: '', 
        category: ''
    });
    const [error, setError] = useState('');

    //Function to update form data when input changes are made
    const handleChange = (e) => {
        fetFormData({
            ...formData,
            [e.target.name]: e.target.value;
        });

        // Function to handle form submission
        const handleSubmit = (e) => {
            e.preventDefault();

            // Required fields validation
            if (!formData.name === '' || !formData.category || !formData.difficulty) {
                setError('All fields are required');
                return;
            }
            try { await onStart(formData);
                } catch (err)
                {
                console.error(err);
                setError('Something went wrong. Please try again.');
                }
        };

        return (
        <form>
            <div>
                <h1> Welcome to the Trivia game app!</h1>
                <p> Enter your name, select category, and choose difficulty level to start the game.</p>
                <form onSubmit={handleSubmit}/>
                    <input type='text' name='name' placeholder='Enter your name' value={formData.name} onChange={handleChange}/>

                {/* Dropdown menu to select category from API response data*/ }
                <select name='category' value={formData.category} onChange={handleChange}/>
                    <option value=''>Select Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))};
                {/* dropdown menu to select difficulty level from API respense data*/}
                <select name='difficulty' value={formData.difficulty} onChange={handleChange}/>
                    <option value=''>Select Difficulty</option>
                    {difficultyLevels.map((level) => (
                        <option key={level.id} value={level.id}>
                            {level.name}
                    </option> 
                    ))};
                    
                {/* Start quiz button */}
                <button type='submit'>Start Quiz</button>
                {error && <p>{error}</p>}
            </div>
        </form>
    );
}

export default Home;




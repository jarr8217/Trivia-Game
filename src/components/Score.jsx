import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Score.css';

function Score ({ score, name, onRestart }) {
    const message = score > 6 ? 'Congratulations!' : 'Better luck next time!';
    const messageClass = score > 6 ? 'success' : 'error';

    return (
        <section className='score-container'>
            <h2>{name}, your final score is</h2>
            <h1>{score} / 10</h1>
            <h2 className={messageClass}>{message}</h2>

            <button className='restart-btn' onClick={onRestart}>Restart</button>
        </section>
    );
}

//Proptypes validation
Score.propTypes = {
    score: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onRestart: PropTypes.func.isRequired,
}

export default Score
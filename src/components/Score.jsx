import React from 'react'

function Score ({ score, name, onRestart }) {
    return (
        <div>
            <h2>{name}, your final score is</h2>
            <h1>{score} / 10</h1>
            <h2>{score > 6 ? 'Congratulations!' :  'Better luck next time!'}</h2>

            <button onClick={onRestart}>Restart</button>
        </div>
    )
}

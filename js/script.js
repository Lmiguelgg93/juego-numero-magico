// script.js

document.addEventListener('DOMContentLoaded', () => {
    let magicNumber = Math.floor(Math.random() * 100) + 1; // Genera el número aleatorio
    let attempts = 0; // Contador de intentos
    const maxAttempts = 10; // Máximo de intentos
    const attemptsList = []; // Lista de intentos previos

    const guessInput = document.getElementById('guessInput');
    const submitGuessButton = document.getElementById('submitGuess');
    const feedback = document.getElementById('feedback');
    const attemptsDisplay = document.getElementById('attempts');
    const playAgainButton = document.getElementById('playAgain');

    // Manejar el evento de envío de numero
    submitGuessButton.addEventListener('click', () => {
        const userGuess = parseInt(guessInput.value);
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            feedback.textContent = 'Por favor, introduce un número válido entre 1 y 100.';
            return;
        }

        attempts++;
        attemptsList.push(userGuess);
        attemptsDisplay.textContent = attemptsList.join(', ');

        if (userGuess === magicNumber) {
            feedback.textContent = `¡Felicidades! Has adivinado el número en ${attempts} intentos.`;
            endGame();
        } else if (attempts >= maxAttempts) {
            feedback.textContent = `Juego terminado. El número correcto era ${magicNumber}.`;
            endGame();
        } else {
            feedback.textContent = `Incorrecto. El número es ${userGuess < magicNumber ? 'mayor' : 'menor'}.`;
        }
        
        guessInput.value = ''; // Limpiar el campo de entrada
    });

    // Manejar el evento de jugar de nuevo
    playAgainButton.addEventListener('click', () => {
        resetGame();
    });

    function endGame() {
        guessInput.disabled = true;
        submitGuessButton.disabled = true;
        playAgainButton.style.display = 'block'; // Mostrar el botón de jugar de nuevo
    }

    function resetGame() {
        magicNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        attemptsList.length = 0;
        guessInput.disabled = false;
        submitGuessButton.disabled = false;
        feedback.textContent = '';
        attemptsDisplay.textContent = '';
        guessInput.value = '';
        playAgainButton.style.display = 'none';
    }
});

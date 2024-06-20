import { generateBoard } from './board.js';
import { startTimer, stopTimer, updateElapsedTime } from './timer.js';
import { getUserPreferences, saveGame } from './api.js';

let firstCard = null;
let secondCard = null;
let pairsFound = 0;

document.getElementById('start-button').addEventListener('click', startGame);

export async function startGame() {
    const preferences = await getUserPreferences();
    console.log(preferences);
    const apiChoice = preferences.preferred_api || 'lorem-picsum';
    document.getElementById('api').value = apiChoice;
    document.getElementById('color_closed').value = preferences.color_closed || '#cccccc';
    document.getElementById('color_found').value = preferences.color_found || '#cccccc';

    resetGame();
    generateBoard(apiChoice, handleCardClick);
    startTimer(updateElapsedTime);
}

export function resetGame() {
    stopTimer();
    document.getElementById('elapsed-time').textContent = '00:00';
    document.getElementById('pairs-found').textContent = '0';
    pairsFound = 0;
    document.getElementById('game-board').innerHTML = '';
    firstCard = null;
    secondCard = null;
}

async function handleCardClick(event) {
    const card = event.target.closest('.card');

    if (card.classList.contains('open') || card.classList.contains('found')) {
        return;
    }

    if (firstCard && secondCard) {
        if (firstCard.dataset.value !== secondCard.dataset.value) {
            firstCard.classList.remove('open');
            firstCard.classList.add('closed');
            firstCard.style.backgroundColor = document.getElementById('color_closed').value;
            secondCard.classList.remove('open');
            secondCard.classList.add('closed');
            secondCard.style.backgroundColor = document.getElementById('color_closed').value;
        }
        firstCard = null;
        secondCard = null;
    }

    card.classList.remove('closed');
    card.classList.add('open');

    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add('found');
            secondCard.classList.add('found');
            firstCard.style.backgroundColor = document.getElementById('color_found').value;
            secondCard.style.backgroundColor = document.getElementById('color_found').value;
            pairsFound++;
            document.getElementById('pairs-found').textContent = pairsFound;

            if (pairsFound === (6 * 6) / 2) {
                const elapsedTime = document.getElementById('elapsed-time').textContent;
                const elapsedSeconds = parseInt(elapsedTime.split(':')[0]) * 60 + parseInt(elapsedTime.split(':')[1]);
                const score = pairsFound * 50 - elapsedSeconds;
        
                const api = document.getElementById('api').value;
                const color_found = document.getElementById('color_found').value;
                const color_closed = document.getElementById('color_closed').value;
        
                try {
                    await saveGame({ score, api, color_found, color_closed });
                    alert(`Gefeliciteerd, je hebt gewonnen in ${elapsedTime}! Je score is ${score}.`);
                } catch (error) {
                    console.error('Fout bij het opslaan van het spel:', error);
                }
            }
        }
    }
}
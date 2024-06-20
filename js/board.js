import { fetchImages } from './images.js';
import { getUserPreferences } from './api.js';

export async function generateBoard(apiChoice, handleCardClick) {
    const boardSize = 6 * 6;
    const numPairs = boardSize / 2;
    const gameBoard = document.getElementById('game-board');
    const closedColor = document.getElementById('color_closed').value;
    gameBoard.innerHTML = '';

    const cardValues = await fetchImages(apiChoice, numPairs);

    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card', 'closed');
        card.dataset.value = value;
        card.style.backgroundColor = closedColor;

        const img = document.createElement('img');
        img.src = value;
        img.alt = 'Memory Card';
        card.appendChild(img);

        card.addEventListener('click', handleCardClick);
        gameBoard.appendChild(card);
    });
}
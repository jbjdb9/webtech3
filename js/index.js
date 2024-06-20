import { startGame } from './game.js';
import { fetchTopScores, getUserPreferences } from './api.js';

document.getElementById('start-button').addEventListener('click', startGame);

async function displayTopScores() {
    const topScores = await fetchTopScores();
    const topFiveList = document.getElementById('top-five');

    topScores.slice(0, 5).forEach(score => {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.username}: ${score.score}`;
        topFiveList.appendChild(listItem);
    });
}

async function loadPlayerPreferences() {
    const apiSelect = document.getElementById('api');
    const colorFoundInput = document.getElementById('color_found');
    const colorClosedInput = document.getElementById('color_closed');

    // Load the saved preferences when the page loads
    const preferences = await getUserPreferences();
    console.log(preferences);
    if (preferences.preferred_api) {
        apiSelect.value = preferences.preferred_api;
    }
    if (preferences.color_found) {
        colorFoundInput.value = preferences.color_found;
    }
    if (preferences.color_closed) {
        colorClosedInput.value = preferences.color_closed;
    }
}

displayTopScores();
loadPlayerPreferences();
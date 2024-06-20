import { getUserPreferences, updateUserPreferences, getPlayerIdFromToken, getUserEmail, updateUserEmail } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const preferencesForm = document.getElementById('preferences-form');
    const apiSelect = document.getElementById('api');
    const colorFoundInput = document.getElementById('color_found');
    const colorClosedInput = document.getElementById('color_closed');
    const emailField = document.getElementById('email');
    const updateEmailButton = document.getElementById('update-email');

    const playerId = getPlayerIdFromToken();

    // Huidige opgeslagen voorkeuren
    const preferences = await getUserPreferences();
    if (preferences.api) {
        apiSelect.value = preferences.api;
    }
    if (preferences.color_found) {
        colorFoundInput.value = preferences.color_found;
    }
    if (preferences.color_closed) {
        colorClosedInput.value = preferences.color_closed;
    }

    // Huidige e-mail
    const currentEmail = await getUserEmail();
    emailField.value = currentEmail;

    // Update de voorkeuren 
    preferencesForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const newPreferences = {
            id: playerId, 
            api: apiSelect.value,
            color_found: colorFoundInput.value,
            color_closed: colorClosedInput.value,
        };
        await updateUserPreferences(newPreferences);

        //bijgewerkte voorkeuren
        const updatedPreferences = await getUserPreferences();
        if (updatedPreferences.api) {
            apiSelect.value = updatedPreferences.api;
        }
        if (updatedPreferences.color_found) {
            colorFoundInput.value = updatedPreferences.color_found;
        }
        if (updatedPreferences.color_closed) {
            colorClosedInput.value = updatedPreferences.color_closed;
        }
    });

    //event listener voor het bijwerken van de e-mail
    updateEmailButton.addEventListener('click', async () => {
        const newEmail = emailField.value;
        try {
            await updateUserEmail(newEmail);
            alert('E-mail bijgewerkt');
        } catch (error) {
            alert('Er is een fout opgetreden bij het bijwerken van de e-mail: ' + error.message);
        }
    });
});
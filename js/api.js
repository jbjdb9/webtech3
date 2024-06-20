const BASE_URL = 'http://localhost:8000';

async function apiFetch(url, options = {}) {
    const token = localStorage.getItem('jwt');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };
    }

    const response = await fetch(`${BASE_URL}${url}`, options);

    console.log(response);

    if (response.status === 401) {
        alert('Sessie verlopen. Opnieuw inloggen.');
        window.location.href = '/login.html';
        throw new Error('Sessie verlopen');
    }

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    // Return the raw response
    return response;
}

export async function register(userData) {
    try {
        const response = await apiFetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        return { success: true, message: 'Registratie gelukt' };
    } catch (error) {
        throw new Error('Registratie mislukt: ' + error.message);
    }
}


export async function login(credentials) {
    const response = await apiFetch('/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
    } else {
        throw new Error('Inloggen mislukt: geen token ontvangen van de server');
    }
}

export async function fetchTopScores() {
    try {
        const response = await apiFetch('/scores');
        if (response.ok) {
            const scores = await response.json();
            return scores;
        } else {
            console.error('Error fetching scores:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching scores:', error);
    }
}

export function getPlayerIdFromToken() {
    try {
        const token = localStorage.getItem('jwt');
        if (!token) {
            throw new Error('Geen token gevonden');
        }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload.sub; // playerId
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export async function updateUserPreferences(preferences) {
    const playerId = getPlayerIdFromToken();
    if (!playerId) {
        throw new Error('Niet ingelogd');
    }

    console.log(preferences);

    const response = await apiFetch(`/api/player/${playerId}/preferences`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response;
}

export async function getUserPreferences() {
    const playerId = getPlayerIdFromToken();
    if (!playerId) {
        throw new Error('Niet ingelogd');
    }

    const response = await apiFetch(`/api/player/${playerId}/preferences`);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const preferences = await response.json();
    return preferences;
}


export async function getUserEmail() {
    const playerId = getPlayerIdFromToken();
    if (!playerId) {
        throw new Error('Niet ingelogd');
    }

    const response = await apiFetch(`/api/player/${playerId}/email`);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    const email = await response.json();
    return email;
}

export async function updateUserEmail(newEmail) {
    const playerId = getPlayerIdFromToken();
    if (!playerId) {
        throw new Error('Niet ingelogd');
    }

    const response = await apiFetch(`/api/player/${playerId}/email`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newEmail }),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response;
}

export async function saveGame(gameData) {
    const playerId = getPlayerIdFromToken();
    if (!playerId) {
        throw new Error('Niet ingelogd');
    }


    // Log the gameData and playerId
    console.log('gameData:', gameData);
    console.log('gameData type:', typeof gameData);
    console.log('playerId:', playerId);
    console.log('playerId type:', typeof playerId);

    const response = await apiFetch('/game/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: playerId, ...gameData  }),
    });

    // Log the response
    console.log(response);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response;
}
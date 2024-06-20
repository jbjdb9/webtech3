export function updateCardColors() {
    const closedColorInput = document.getElementById('closed-color');
    const openColorInput = document.getElementById('open-color');
    const foundColorInput = document.getElementById('found-color');

    document.documentElement.style.setProperty('--closed-color', closedColorInput.value);

    const closedCards = document.querySelectorAll('.card.closed');
    closedCards.forEach(card => {
        card.style.backgroundColor = closedColorInput.value;
    });
}

let startTime;
let timerInterval;

export function startTimer(updateElapsedTime) {
    startTime = new Date();
    timerInterval = setInterval(updateElapsedTime, 1000);
}

export function stopTimer() {
    clearInterval(timerInterval);
}

export function updateElapsedTime() {
    const now = new Date();
    const elapsedTime = Math.floor((now - startTime) / 1000);
    const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
    const seconds = String(elapsedTime % 60).padStart(2, '0');
    document.getElementById('elapsed-time').textContent = `${minutes}:${seconds}`;
}

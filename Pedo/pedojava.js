let stepCount = 0;
let previousY = null;
let tracking = false;

const stepCounterDisplay = document.getElementById('step-counter');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');

function startTracking() {
    tracking = true;
    stepCount = 0;
    stepCounterDisplay.innerText = 'Steps: 0';
    previousY = null;

    window.addEventListener('devicemotion', handleMotion);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopTracking() {
    tracking = false;
    window.removeEventListener('devicemotion', handleMotion);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function handleMotion(event) {
    if (!tracking) return;

    const acceleration = event.accelerationIncludingGravity;

    if (previousY !== null) {
        const deltaY = Math.abs(acceleration.y - previousY);

        // Threshold to detect step-like motion
        if (deltaY > 1.2) {
            stepCount++;
            stepCounterDisplay.innerText = `Steps: ${stepCount}`;
        }
    }

    previousY = acceleration.y;
}

startButton.addEventListener('click', startTracking);
stopButton.addEventListener('click', stopTracking);

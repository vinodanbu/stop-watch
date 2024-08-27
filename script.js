let startTime, updatedTime, difference;
let interval;
let running = false;
let stopped = false;
let lapNumber = 1;

const display = document.getElementById('display');
const lapList = document.getElementById('lapList');

document.getElementById('start').addEventListener('click', function() {
    if (!running) {
        running = true;
        stopped = false;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateDisplay, 1000);
    }
});

document.getElementById('pause').addEventListener('click', function() {
    if (running) {
        running = false;
        clearInterval(interval);
    }
});

document.getElementById('stop').addEventListener('click', function() {
    if (running || stopped) {
        running = false;
        stopped = true;
        clearInterval(interval);
    }
});

document.getElementById('reset').addEventListener('click', function() {
    running = false;
    stopped = false;
    clearInterval(interval);
    difference = 0;
    display.textContent = '00:00:00';
    lapList.innerHTML = '';
    lapNumber = 1;
});

document.getElementById('lap').addEventListener('click', function() {
    if (running) {
        const lapTime = display.textContent;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapNumber}: ${lapTime}`;
        lapList.appendChild(li);
        lapNumber++;
    }
});

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

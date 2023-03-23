function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

let intervalId = null;
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

function startColorChange() {
  startBtn.disabled = true;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopColorChange() {
  startBtn.disabled = false;
  clearInterval(intervalId);
}

startBtn.addEventListener('click', startColorChange);
stopBtn.addEventListener('click', stopColorChange);

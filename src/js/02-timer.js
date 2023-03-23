import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// елементи інтерфейсу
const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

// допоміжна функція, яка додає 0, якщо число < 10
function addLeadingZero(number) {
  return number < 10 ? '0' + number : number;
}

// параметри flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();
    if (selectedDate < now) {
      window.alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// ініціалізація flatpickr
flatpickr(datePicker, options);

// обробка кліку на кнопку "Start"
startButton.addEventListener('click', () => {
  const selectedDate = new Date(datePicker.value);
  const now = new Date();
  const difference = selectedDate.getTime() - now.getTime();

  // перевірка, що вибрана дата в майбутньому
  if (selectedDate < now) {
    window.alert('Please choose a date in the future');
    return;
  }

  // відключення кнопки "Start" на час відліку
  startButton.disabled = true;

  // обновлення таймера кожну секунду
  const timerId = setInterval(() => {
    const now = new Date();
    const remainingTime = selectedDate.getTime() - now.getTime();

    if (remainingTime <= 0) {
      // відновлення кнопки "Start"
      startButton.disabled = false;

      // очищення таймера
      clearInterval(timerId);
    } else {
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      const seconds = Math.floor((remainingTime / 1000) % 60);

      // оновлення елементів інтерфейсу
      daysField.textContent = addLeadingZero(days);
      hoursField.textContent = addLeadingZero(hours);
      minutesField.textContent = addLeadingZero(minutes);
      secondsField.textContent = addLeadingZero(seconds);
    }
  }, 1000);
});

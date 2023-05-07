import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
let deadline = null;
let timerCounter = null;

//flatpickr settings
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      deadline = selectedDates[0];
    }
  },
});

startBtn.addEventListener('click', timer);

//main functions
function timer() {
  timerCounter = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = deadline - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    timerInterface(days, hours, minutes, seconds);
    stopTimer(deltaTime);
  }, 1000);
  startBtn.disabled = true;
}

function stopTimer(time) {
  if (time < 1000) {
    clearInterval(timerCounter);
  }
}

function timerInterface(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// futher functions
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

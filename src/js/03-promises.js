import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'center-top',
  timeout: 5000,
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  const delayValue = parseInt(delay.value);
  const stepValue = parseInt(step.value);
  const amountValue = parseInt(amount.value);
  for (let index = 0; index < amountValue; index += 1) {
    if (delayValue < 0 || stepValue < 0) {
      e.currentTarget.reset();
      Notiflix.Notify.failure('Введіть коректні дані');
      return;
    }
    const delay = index * stepValue + delayValue;
    createPromise(index, delay)
      .then(({ position, delay }) =>
        Notiflix.Notify.success(
          `Fulfilled promise ${position + 1} in ${delay}ms`
        )
      )
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(
          `Rejected promise ${position + 1} in ${delay}ms`
        )
      );
  }
  e.currentTarget.reset();
});

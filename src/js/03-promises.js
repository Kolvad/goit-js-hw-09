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

function createPromises(delay, step, amount) {
  const promises = [];
  for (let i = 0; i < amount; i++) {
    promises.push(createPromise(i, delay));
    delay += step;
  }
  Promise.allSettled(promises).then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log(
          `✅ Fulfilled promise ${result.value.position} in ${result.value.delay}ms`
        );
      } else {
        console.log(
          `❌ Rejected promise ${result.reason.position} in ${result.reason.delay}ms`
        );
      }
    });
  });
}

const form = document.querySelector('.form');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const delay = parseInt(form.elements.delay.value);
  const step = parseInt(form.elements.step.value);
  const amount = parseInt(form.elements.amount.value);
  createPromises(delay, step, amount);
});

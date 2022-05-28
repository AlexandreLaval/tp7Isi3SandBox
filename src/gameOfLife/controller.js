export const controller = model => {
  model.run();
};

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

startBtn.addEventListener('click', event => {
  this.run();
});

stopBtn.addEventListener('click', event => {
  this.stop();
});

resetBtn.addEventListener('click', event => {
  this.reset();
});
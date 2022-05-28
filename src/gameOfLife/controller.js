let model;
export const controller = _model => {
  model = _model;
};

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

startBtn.addEventListener('click', event => {
  model.run();
});

stopBtn.addEventListener('click', event => {
  model.stop();
});

resetBtn.addEventListener('click', event => {
  model.reset();
});
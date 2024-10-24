const startButton = document.getElementById('start')
const exerciseInput = document.getElementById('exercises')
const intervalInput = document.getElementById('interval')

startButton.addEventListener('click', () => {
  const exercises = exerciseInput.value.split('\n')
  const interval = intervalInput.value
  window.electron.start(exercises, interval)
})

const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const path = require('node:path')

let exerciseList = []
let interval

const createWindow = () => {
  const win = new BrowserWindow({
    icon: 'images/icon.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.on('start', start)
  ipcMain.on('stop', stop)

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function start(event, exercises, interval) {
  exerciseList = exercises
  clearInterval(interval)
  interval = setInterval(notify, 1000 * 60 * interval)
  notify()
}

function getExercise() {
  return exerciseList[Math.floor(Math.random() * exerciseList.length)]
}

function notify() {
  new Notification({ title: 'Time to FRENZY', body: getExercise() }).show()
}

function stop() {
  clearInterval(interval)
}

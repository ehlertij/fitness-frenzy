const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  start: (exercises, interval) => ipcRenderer.send('start', exercises, interval),
})

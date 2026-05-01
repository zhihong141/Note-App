const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronStorage', {
  get: () => ipcRenderer.invoke('storage-get'),
  set: (data) => ipcRenderer.invoke('storage-set', data),
});

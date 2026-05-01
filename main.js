const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
const dataFile = path.join(app.getPath('userData'), 'notes-data.json');

// Read data
ipcMain.handle('storage-get', () => {
  try {
    if (fs.existsSync(dataFile)) {
      return fs.readFileSync(dataFile, 'utf8');
    }
  } catch(e) {}
  return null;
});

// Write data
ipcMain.handle('storage-set', (event, data) => {
  try {
    fs.writeFileSync(dataFile, data, 'utf8');
    return true;
  } catch(e) {
    return false;
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 760,
    minWidth: 400,
    minHeight: 500,
    title: 'Notes',
    backgroundColor: '#f6f6f6',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
  });

  mainWindow.loadFile('index.html');

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

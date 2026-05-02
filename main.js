const{app,BrowserWindow,shell,ipcMain}=require('electron');
const path=require('path');
const fs=require('fs');
let win;
const dataFile=path.join(app.getPath('userData'),'notes-data.json');
ipcMain.handle('storage-get',()=>{try{if(fs.existsSync(dataFile))return fs.readFileSync(dataFile,'utf8');}catch(e){}return null;});
ipcMain.handle('storage-set',(e,d)=>{try{fs.writeFileSync(dataFile,d,'utf8');return true;}catch(e){return false;}});
function createWindow(){
  win=new BrowserWindow({width:1100,height:760,minWidth:400,minHeight:500,title:'Notes',backgroundColor:'#f6f6f6',autoHideMenuBar:true,webPreferences:{nodeIntegration:false,contextIsolation:true,preload:path.join(__dirname,'preload.js')}});
  win.loadFile('index.html');
  win.webContents.setWindowOpenHandler(({url})=>{shell.openExternal(url);return{action:'deny'};});
  win.on('closed',()=>{win=null;});
}
app.whenReady().then(createWindow);
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});

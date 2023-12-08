const {app,BrowserWindow, ipcMain}=require('electron');
const path=require('path');

const isDev=process.env.NODE_ENV !=='production';
let randi;
function createMainWindow(){
    const mainWindow=new BrowserWindow({
        title:'Bio Dwar',
        width:isDev ? 1200:600,
        height:800,
        autoHideMenuBar:true,
        icon:__dirname+"./renderer/images/header.jpg",
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
      }
    }) ;

    // if(isDev){
    //     mainWindow.webContents.openDevTools();
    // }
    mainWindow.loadFile(path.join(__dirname, './renderer/html/login.html'));
    randi=mainWindow
}

app.whenReady().then(()=>{
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createMainWindow();
        }
      });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'win32') {
      app.quit()
    }
  })

ipcMain.on("redirect",(e,data)=>{
  console.log("Redirecting to :  "+data);
  console.log(path.join(__dirname, data));

  randi.loadFile(path.join(__dirname, data)).then(() => { randi.show(); }); 

  
})
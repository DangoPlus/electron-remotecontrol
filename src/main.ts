import { app, net, BrowserWindow, globalShortcut } from 'electron';
import path from 'path';
import { APIURL } from './utils/config';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};
const handleShortCut= () => {
  const ret = globalShortcut.register('PageUp', () => {
    console.log('PageUp is pressed', Math.random())
    const body = JSON.stringify({
      "id": 2,
      "name": "emergency",
      "status": "pass"
    });
    const request = net.request({
      method: "PUT",
      url: `${APIURL}/masters/change_status/emergency_control`
    })
    request.setHeader('Content-Type', 'application/json');
    request.on('response', (response) => {
      // console.log(`STATUS: ${response.statusCode}`)
      // console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
      response.on('data', (chunk) => {
        // console.log(`BODY: ${chunk}`)
      })
      response.on('end', () => {
        // console.log('No more data in response.')
      })
    })
    request.write(body, 'utf-8');
    request.end()
  })
  const ret2 = globalShortcut.register('PageDown', () => {
    console.log('PageDown is pressed', Math.random())
    const body = JSON.stringify({
      "id": 2,
      "name": "emergency",
      "status": "block"
    });
    const request = net.request({
      method: "PUT",
      url: `${APIURL}/masters/change_status/emergency_control`
    })
    // console.log(request)
    request.setHeader('Content-Type', 'application/json');
    request.on('response', (response) => {
      // console.log(`STATUS: ${response.statusCode}`)
      // console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
      response.on('data', (chunk) => {
        // console.log(`BODY: ${chunk}`)
      })
      response.on('end', () => {
        // console.log('No more data in response.')
      })
    })
    request.write(body, 'utf-8');
    request.end()
  })
  if (!ret && !ret2) {
    console.log('registration failed')
  }
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', ()=>{
  createWindow();
  handleShortCut();
});
app.on('will-quit', () => {
  // Unregister a shortcut.
  // globalShortcut.unregister('CommandOrControl+X')

  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

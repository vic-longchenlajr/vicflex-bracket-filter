// main.js
const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      // IMPORTANT: do NOT enable sandbox if you want to use file://
      // sandbox: true, // <- remove or set false
    },
  });

  if (isDev) {
    // Dev: point Electron at Next dev server
    win.loadURL("http://localhost:3000");
    // win.webContents.openDevTools(); // optional
  } else {
    const indexPath = path.join(__dirname, "build", "index.html");
    win.loadFile(indexPath);
  }

  // Helpful diagnostics if anything ever fails to load
  win.webContents.on("did-fail-load", (_e, code, desc, url) => {
    console.error("did-fail-load", code, desc, url);
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

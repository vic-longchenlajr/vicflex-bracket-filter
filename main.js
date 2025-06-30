const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const isDev = !app.isPackaged;

  // ✅ Correct path depending on mode
  const indexPath = isDev
    ? path.join(__dirname, "out", "index.html") // dev: local folder
    : path.join(process.resourcesPath, "out", "index.html"); // prod: from extraResources

  console.log("Loading from:", indexPath); // 🧪 Debug path output

  win.loadFile(indexPath);

  // Optional: show DevTools for debugging
  // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

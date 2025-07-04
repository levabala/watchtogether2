"use strict";

// src/main.ts
var import_electron = require("electron");
function createWindow() {
  const mainWindow = new import_electron.BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    }
  });
  mainWindow.loadFile("index.html");
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
}
import_electron.app.whenReady().then(createWindow);
import_electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    import_electron.app.quit();
  }
});
import_electron.app.on("activate", () => {
  if (import_electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

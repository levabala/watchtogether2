"use strict";
const electron = require("electron");
const path = require("path");
function parseAppMode() {
  const args = process.argv.slice(2);
  if (args.includes("--host")) {
    return "host";
  } else if (args.includes("--client")) {
    return "client";
  }
  return "default";
}
function getAppModeTitle(mode) {
  if (mode === "host") {
    return "WatchTogether2 (HOST)";
  } else if (mode === "client") {
    return "WatchTogether2 (CLIENT)";
  }
  return "WatchTogether2";
}
function createWindow() {
  const appMode = parseAppMode();
  const mainWindow = new electron.BrowserWindow({
    width: 1200,
    height: 800,
    title: getAppModeTitle(appMode),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      additionalArguments: [`--app-mode=${appMode}`]
    }
  });
  if (!electron.app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
  if (process.env.NODE_ENV === "development") {
    mainWindow.webContents.openDevTools();
  }
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

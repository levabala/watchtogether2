"use strict";
const electron = require("electron");
function getAppMode() {
  const args = process.argv;
  const modeArg = args.find((arg) => arg.startsWith("--app-mode="));
  if (modeArg) {
    const mode = modeArg.split("=")[1];
    if (mode === "host" || mode === "client") {
      return mode;
    }
  }
  return "default";
}
electron.contextBridge.exposeInMainWorld("electronAPI", {
  getAppMode: () => getAppMode()
});

import { contextBridge } from 'electron'

// Parse app mode from process arguments passed by main process
function getAppMode(): 'host' | 'client' | 'default' {
  const args = process.argv;
  const modeArg = args.find(arg => arg.startsWith('--app-mode='));
  
  if (modeArg) {
    const mode = modeArg.split('=')[1];
    if (mode === 'host' || mode === 'client') {
      return mode;
    }
  }
  
  return 'default';
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getAppMode: () => getAppMode()
})
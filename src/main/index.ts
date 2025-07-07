import { app, BrowserWindow } from 'electron';
import { join } from 'path';

// Parse command line arguments
function parseAppMode(): 'host' | 'client' | 'default' {
  const args = process.argv.slice(2);
  
  if (args.includes('--host')) {
    return 'host';
  } else if (args.includes('--client')) {
    return 'client';
  }
  
  return 'default';
}

function getAppModeTitle(mode: string): string {
  if (mode === 'host') {
    return 'WatchTogether2 (HOST)';
  } else if (mode === 'client') {
    return 'WatchTogether2 (CLIENT)';
  }
  
  return 'WatchTogether2';
}

function createWindow(): void {
  const appMode = parseAppMode();
  const isTestMode = process.env.NODE_ENV === 'test';
  
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: getAppModeTitle(appMode),
    show: !isTestMode,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      additionalArguments: [`--app-mode=${appMode}`]
    }
  });

  // Load the local URL for development or the local html file for production
  if (!app.isPackaged && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
  
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
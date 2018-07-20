import * as fs from 'fs';
import * as path from 'path';
import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import { enableLiveReload } from 'electron-compile';
import Store = require('electron-store');
import registerConfiguration from './handler/configuration';
import registerEntries from './handler/entries';
import registerPicture from './handler/picture';
import registerPictures from './handler/pictures';
import registerIpa from './handler/ipa';
import registerSynthesize from './handler/synthesize';
import createMenu from './menu';
import ConfigurationState from './state/ConfigurationState';

let mainWindow: BrowserWindow | null = null;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) {
  enableLiveReload({ strategy: 'react-hmr' });
}

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: process.env.ELECTRON_FORGE_CONFIG_A,
  });

  mainWindow.webContents.on('did-finish-load', () => {
    (mainWindow as BrowserWindow).webContents.insertCSS(
      fs.readFileSync(path.resolve(__dirname, '../../node_modules/normalize.css/normalize.css'), 'utf8')
    );
    (mainWindow as BrowserWindow).webContents.insertCSS(
      fs.readFileSync(path.resolve(__dirname, '../../node_modules/@blueprintjs/core/lib/css/blueprint.css'), 'utf8')
    );
    (mainWindow as BrowserWindow).webContents.insertCSS(
      fs
        .readFileSync(
          path.resolve(__dirname, '../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css'),
          'utf8'
        )
        .replace(/\.\.\/\.\.\/resources/g, '../../../node_modules/@blueprintjs/icons/resources')
    );
    (mainWindow as BrowserWindow).webContents.insertCSS(
      fs.readFileSync(
        path.resolve(__dirname, '../../node_modules/@blueprintjs/select/lib/css/blueprint-select.css'),
        'utf8'
      )
    );
    (mainWindow as BrowserWindow).webContents.insertCSS(
      fs.readFileSync(path.resolve(__dirname, './static/noto-sans.css'), 'utf8')
    );
  });

  mainWindow.loadURL(`file://${path.resolve(__dirname, './static/index.html')}`);

  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('close', () => {
    mainWindow = null;
  });
};

app.on('ready', () => {
  const configurationState = new ConfigurationState();
  const store = new Store({
    name: 'configuration',
    defaults: configurationState.state,
  });

  configurationState.set(store.store);
  configurationState.subscribe(() => store.set(configurationState.state));

  registerEntries(ipcMain, configurationState);
  registerPicture(ipcMain);
  registerPictures(ipcMain, configurationState);
  registerIpa(ipcMain, configurationState);
  registerSynthesize(ipcMain, configurationState);
  registerConfiguration(ipcMain, configurationState);

  Menu.setApplicationMenu(createMenu());

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

import { app, Menu } from 'electron';

const createMenu = () =>
  Menu.buildFromTemplate([
    {
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [{ role: 'reload' }, { role: 'forcereload' }, { role: 'toggledevtools' }],
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
  ]);

export default createMenu;

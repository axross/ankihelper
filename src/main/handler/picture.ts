import { Event, IpcMain } from 'electron';
import getPicture from '../repository/getPicture';

const register = (ipcMain: IpcMain) =>
  ipcMain.on('picture.get', (e: Event, hash: string, url: any) => {
    if (typeof url !== 'string') return e.sender.send(`error#${hash}@picture.get`, 'param `url` must be a string.');

    getPicture(url)
      .then(file => e.sender.send(`respond#${hash}@picture.get`, file))
      .catch(err => e.sender.send(`error#${hash}@picture.get`, err.message));
  });

export default register;

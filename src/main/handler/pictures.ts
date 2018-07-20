import { Event, IpcMain } from 'electron';
import getPictures from '../repository/getPictures';
import ConfigurationState from '../state/ConfigurationState';

const register = (ipcMain: IpcMain, configurationState: ConfigurationState) =>
  ipcMain.on('pictures.get', (e: Event, hash: string, text: any) => {
    if (typeof text !== 'string') return e.sender.send(`error#${hash}@pictures.get`, 'param `text` must be a string.');

    const _text = text.trim();

    if (_text.length === 0) return e.sender.send(`error#${hash}@pictures.get`, 'param `text` must not be empty.');

    getPictures(text, { bingImageSearchApiKey: configurationState.state.bingImageSearchApi.apiKey })
      .then(pictureUrls => e.sender.send(`respond#${hash}@pictures.get`, pictureUrls))
      .catch(err => e.sender.send(`error#${hash}@pictures.get`, err.message));
  });

export default register;

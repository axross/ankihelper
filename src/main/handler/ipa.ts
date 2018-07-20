import { Event, IpcMain } from 'electron';
import getIpa from '../repository/getIpa';
import ConfigurationState from '../state/ConfigurationState';

const register = (ipcMain: IpcMain, configurationState: ConfigurationState) =>
  ipcMain.on('ipa.get', (e: Event, hash: string, text: any) => {
    if (typeof text !== 'string') {
      e.sender.send(`respond#${hash}@ipa.get`, {});

      return;
    }

    getIpa(text, { wordsApiKey: configurationState.state.wordsApi.key })
      .then(imageUrls => e.sender.send(`respond#${hash}@ipa.get`, imageUrls))
      .catch(err => e.sender.send(`error#${hash}@ipa.get`, err.message));
  });

export default register;

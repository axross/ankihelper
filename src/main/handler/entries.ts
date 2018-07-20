import { Event, IpcMain } from 'electron';
import getEntries from '../repository/getEntries';
import ConfigurationState from '../state/ConfigurationState';

const register = (ipcMain: IpcMain, configurationState: ConfigurationState) =>
  ipcMain.on('entries.get', (e: Event, hash: string, text: any) => {
    if (typeof text !== 'string') {
      e.sender.send(`respond#${hash}@entries.get`, {});

      return;
    }

    getEntries(text, {
      oxfordDictionaryApiAppId: configurationState.state.oxfordDictionaryApi.appId,
      oxfordDictionaryApiAppKey: configurationState.state.oxfordDictionaryApi.appKey,
      wordsApiKey: configurationState.state.wordsApi.key,
    })
      .then(entries => e.sender.send(`respond#${hash}@entries.get`, entries))
      .catch(err => e.sender.send(`error#${hash}@entries.get`, err.message));
  });

export default register;

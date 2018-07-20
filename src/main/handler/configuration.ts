import { Event, IpcMain } from 'electron';
import Configuration from '../../common/model/Configuration';
import ConfigurationState from '../state/ConfigurationState';

const register = (ipcMain: IpcMain, configurationState: ConfigurationState) => {
  ipcMain.on('configuration.set', (e: Event, hash: string, configuration: Configuration) => {
    configurationState.set(configuration);

    e.sender.send(`respond#${hash}@configuration.set`);
  });

  ipcMain.on('configuration.get', (e: Event, hash: string) => {
    e.sender.send(`respond#${hash}@configuration.get`, configurationState.state);
  });
};

export default register;

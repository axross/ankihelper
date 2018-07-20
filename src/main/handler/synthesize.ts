import { Event, IpcMain } from 'electron';
import synthesize from '../repository/synthesize';
import ConfigurationState from '../state/ConfigurationState';

const register = (ipcMain: IpcMain, configurationState: ConfigurationState) =>
  ipcMain.on('synthesize', (e: Event, hash: string, text: any) => {
    if (typeof text !== 'string') {
      e.sender.send(`respond#${hash}@synthesize`, {});

      return;
    }

    synthesize(
      text,
      {},
      {
        googleCloudClientEmail: configurationState.state.googleCloud.clientEmail,
        googleCloudProjectId: configurationState.state.googleCloud.projectId,
        googleCloudPrivateKey: configurationState.state.googleCloud.privateKey,
      }
    )
      .then(buffer => e.sender.send(`respond#${hash}@synthesize`, buffer.toString('base64')))
      .catch(err => e.sender.send(`error#${hash}@synthesize`, err.message));
  });

export default register;

import { Event, IpcRenderer } from 'electron';
import { v4 } from 'uuid';
import Configuration from '../../common/model/Configuration';
import Entry from '../../common/model/Entry';
import File from '../../common/model/File';

class Backend {
  private ipcRenderer: IpcRenderer;

  public async getIpa(word: string): Promise<string> {
    const trimmed = word.trim();

    if (trimmed.length === 0) {
      return '';
    }

    const words = trimmed.split(' ');

    const ipas = await Promise.all(
      words.map(
        w =>
          new Promise((resolve, reject) => {
            const hash = v4();

            const onRespond = (_: Event, ipa: string) => {
              this.ipcRenderer.removeListener(`error#${hash}@ipa.get`, onError);

              resolve(ipa);
            };

            const onError = (_: Event, errorMessage: string) => {
              this.ipcRenderer.removeListener(`respond#${hash}@ipa.get`, onRespond);

              reject(new Error(errorMessage));
            };

            this.ipcRenderer.once(`respond#${hash}@ipa.get`, onRespond);
            this.ipcRenderer.once(`error#${hash}@ipa.get`, onError);

            this.ipcRenderer.send('ipa.get', hash, w);
          })
      )
    );

    return ipas.join(' ');
  }

  public getEntries(text: string): Promise<Entry[]> {
    if (text === '') {
      return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
      const hash = v4();

      const onRespond = (_: Event, entries: Entry[]) => {
        this.ipcRenderer.removeListener(`error#${hash}@entries.get`, onError);

        resolve(entries);
      };

      const onError = (_: Event, errorMessage: string) => {
        this.ipcRenderer.removeListener(`respond#${hash}@entries.get`, onRespond);

        reject(new Error(errorMessage));
      };

      this.ipcRenderer.once(`respond#${hash}@entries.get`, onRespond);
      this.ipcRenderer.once(`error#${hash}@entries.get`, onError);

      this.ipcRenderer.send('entries.get', hash, text);
    });
  }

  public getPictures(text: string): Promise<string[]> {
    if (text === '') {
      return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
      const hash = v4();

      const onRespond = (_: Event, pictureUrls: string[]) => {
        this.ipcRenderer.removeListener(`error#${hash}@pictures.get`, onError);

        resolve(pictureUrls);
      };

      const onError = (_: Event, errorMessage: string) => {
        this.ipcRenderer.removeListener(`respond#${hash}@pictures.get`, onRespond);

        reject(new Error(errorMessage));
      };

      this.ipcRenderer.once(`respond#${hash}@pictures.get`, onRespond);
      this.ipcRenderer.once(`error#${hash}@pictures.get`, onError);

      this.ipcRenderer.send('pictures.get', hash, text);
    });
  }

  public getPicture(url: URL): Promise<File> {
    return new Promise((resolve, reject) => {
      const hash = v4();

      const onRespond = (_: Event, file: Record<string, any>) => {
        this.ipcRenderer.removeListener(`error#${hash}@picture.get`, onError);

        resolve(File.fromJSON(file));
      };

      const onError = (_: Event, errorMessage: string) => {
        this.ipcRenderer.removeListener(`respond#${hash}@picture.get`, onRespond);

        reject(new Error(errorMessage));
      };

      this.ipcRenderer.once(`respond#${hash}@picture.get`, onRespond);
      this.ipcRenderer.once(`error#${hash}@picture.get`, onError);

      this.ipcRenderer.send('picture.get', hash, url.href);
    });
  }

  public synthesize(text: string): Promise<File> {
    return new Promise((resolve, reject) => {
      const hash = v4();

      const onRespond = (_: Event, base64: string) => {
        this.ipcRenderer.removeListener(`error#${hash}@synthesize`, onError);

        resolve(new File(base64, 'audio/mp3'));
      };

      const onError = (_: Event, errorMessage: string) => {
        this.ipcRenderer.removeListener(`respond#${hash}@synthesize`, onRespond);

        reject(new Error(errorMessage));
      };

      this.ipcRenderer.once(`respond#${hash}@synthesize`, onRespond);
      this.ipcRenderer.once(`error#${hash}@synthesize`, onError);

      this.ipcRenderer.send('synthesize', hash, text);
    });
  }

  public getConfiguration(): Promise<Configuration> {
    return new Promise((resolve, reject) => {
      const hash = v4();

      const onRespond = (_: Event, configuration: Configuration) => {
        this.ipcRenderer.removeListener(`error#${hash}@configuration.get`, onError);

        resolve(configuration);
      };

      const onError = (_: Event, errorMessage: string) => {
        this.ipcRenderer.removeListener(`respond#${hash}@configuration.get`, onRespond);

        reject(new Error(errorMessage));
      };

      this.ipcRenderer.once(`respond#${hash}@configuration.get`, onRespond);
      this.ipcRenderer.once(`error#${hash}@configuration.get`, onError);

      this.ipcRenderer.send('configuration.get', hash);
    });
  }

  public setConfiguration(configuration: Configuration): Promise<void> {
    return new Promise((resolve, reject) => {
      const hash = v4();

      const onRespond = (_: Event) => {
        this.ipcRenderer.removeListener(`error#${hash}@configuration.set`, onError);

        resolve();
      };

      const onError = (_: Event, errorMessage: string) => {
        this.ipcRenderer.removeListener(`respond#${hash}@configuration.set`, onRespond);

        reject(new Error(errorMessage));
      };

      this.ipcRenderer.once(`respond#${hash}@configuration.set`, onRespond);
      this.ipcRenderer.once(`error#${hash}@configuration.set`, onError);

      this.ipcRenderer.send('configuration.set', hash, configuration);
    });
  }

  public constructor(ipcRenderer: IpcRenderer) {
    this.ipcRenderer = ipcRenderer;
  }
}

export default Backend;

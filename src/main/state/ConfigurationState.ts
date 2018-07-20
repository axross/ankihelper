import { Container } from 'unstated';
import Configuration from '../../common/model/Configuration';

export type State = Configuration;

class CardCreatingState extends Container<State> {
  public readonly state: State;

  public set(configuration: Configuration) {
    this.setState(configuration);
  }

  public constructor() {
    super();

    this.state = {
      googleCloud: {
        clientEmail: '',
        privateKey: '',
        projectId: '',
      },
      oxfordDictionaryApi: {
        appId: '',
        appKey: '',
      },
      wordsApi: {
        key: '',
      },
      bingImageSearchApi: {
        apiKey: '',
      },
    };
  }
}

export default CardCreatingState;

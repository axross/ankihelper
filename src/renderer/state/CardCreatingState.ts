import { Container } from 'unstated';
import File from '../../common/model/File';

export type State = {
  sessionId: number;
  keyword: string;
  keywordPronunciation: File | null;
  keywordPronunciationLoading: number;
  ipa: string;
  ipaLoading: number;
  partOfSpeech: string;
  definition: string;
  example: string;
  examplePronunciation: File | null;
  examplePronunciationLoading: number;
  exampleWithBlank: string;
  imageSearchQuery: string;
  picture: File | null;
  pictureLoading: number;
  keepExample: boolean;
  cardCreating: number;
};

class CardCreatingState extends Container<State> {
  private readonly defaultState: State;
  public readonly state: State;

  public setKeyword(keyword: string) {
    this.setState({ keyword });
  }

  public setKeywordPronunciation(file: File) {
    this.setState({ keywordPronunciation: file });
  }

  public setIpa(ipa: string) {
    this.setState({ ipa });
  }

  public clearIpa() {
    this.setIpa('');
  }

  public beginLoadingIpa() {
    this.setState(({ ipaLoading }) => ({ ipaLoading: ipaLoading + 1 }));
  }

  public endLoadingIpa() {
    this.setState(({ ipaLoading }) => ({ ipaLoading: ipaLoading - 1 }));
  }

  public setPartOfSpeech(partOfSpeech: string) {
    this.setState({ partOfSpeech });
  }

  public setDefinition(definition: string) {
    this.setState({ definition });
  }

  public setExample(example: string) {
    this.setState({ example });
  }

  public setExamplePronunciation(file: File) {
    this.setState({ examplePronunciation: file });
  }

  public setExampleWithBlank(exampleWithBlank: string) {
    this.setState({ exampleWithBlank });
  }

  public setImageSearchQuery(imageSearchQuery: string) {
    this.setState({ imageSearchQuery });
  }

  public beginLoadingPicture() {
    this.setState(({ pictureLoading }) => ({ pictureLoading: pictureLoading + 1 }));
  }

  public endLoadingPicture() {
    this.setState(({ pictureLoading }) => ({ pictureLoading: pictureLoading - 1 }));
  }

  public setPicture(picture: File) {
    this.setState({ picture });
  }

  public setKeepExample(keepExample: boolean) {
    this.setState({ keepExample });
  }

  public beginCreatingCard() {
    this.setState(({ cardCreating }) => ({ cardCreating: cardCreating + 1 }));
  }

  public endCreatingCard() {
    this.setState(({ cardCreating }) => ({ cardCreating: cardCreating - 1 }));
  }

  public clearAll() {
    const sessionId =
      this.state.sessionId < Number.MAX_SAFE_INTEGER ? this.state.sessionId + 1 : this.defaultState.sessionId;

    this.setState({
      ...this.defaultState,
      sessionId,
      keepExample: this.state.keepExample,
      ...(this.state.keepExample
        ? {
            example: this.state.example,
            examplePronunciation: this.state.examplePronunciation,
            exampleWithBlank: this.state.exampleWithBlank,
            imageSearchQuery: this.state.imageSearchQuery,
            picture: this.state.picture,
          }
        : {}),
    });
  }

  public isReadyToCreate(): boolean {
    if (this.state.keyword === '') return false;
    if (this.state.keywordPronunciation === null) return false;
    if (this.state.ipa === '') return false;
    if (this.state.partOfSpeech === '') return false;
    if (this.state.definition === '') return false;
    if (this.state.example === '') return false;
    if (this.state.examplePronunciation === null) return false;
    if (this.state.exampleWithBlank === '') return false;
    if (this.state.picture === null) return false;
    if (this.state.pictureLoading >= 1) return false;
    if (this.state.cardCreating >= 1) return false;

    return true;
  }

  public constructor() {
    super();

    this.defaultState = {
      sessionId: 1,
      keyword: '',
      keywordPronunciation: null,
      keywordPronunciationLoading: 0,
      ipa: '',
      ipaLoading: 0,
      partOfSpeech: '',
      definition: '',
      example: '',
      examplePronunciation: null,
      examplePronunciationLoading: 0,
      exampleWithBlank: '',
      imageSearchQuery: '',
      picture: null,
      pictureLoading: 0,
      keepExample: false,
      cardCreating: 0,
    };
    this.state = { ...this.defaultState };
  }
}

export default CardCreatingState;

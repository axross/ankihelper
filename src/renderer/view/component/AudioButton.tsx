import { Button } from '@blueprintjs/core';
import { ClassAttributes, createElement, createRef, Fragment, PureComponent, RefObject } from 'react';

type Props = ClassAttributes<HTMLElement> & {
  src: string;
  className?: string;
};

type State = {
  isAudioReady: boolean;
};

class AudioButton extends PureComponent<Props, State> {
  private audioRef: RefObject<HTMLAudioElement>;

  public componentDidMount() {
    this.audioRef.current!.addEventListener('loadeddata', () => {
      this.setState({ isAudioReady: true });
    });

    this.audioRef.current!.addEventListener('emptied', () => {
      this.setState({ isAudioReady: false });
    });
  }

  public render() {
    return (
      <Fragment>
        <Button
          icon="play"
          onClick={this.onClickButton}
          loading={!this.state.isAudioReady}
          className={this.props.className}
        >
          Speak
        </Button>

        <audio src={this.props.src} ref={this.audioRef} />
      </Fragment>
    );
  }

  private onClickButton = () => {
    this.audioRef.current!.currentTime = 0;
    this.audioRef.current!.play();
  };

  constructor(props: Props) {
    super(props);

    this.state = { isAudioReady: false };
    this.audioRef = createRef();
  }
}

export default AudioButton;

import { Intent, Toaster } from '@blueprintjs/core';
import { createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import { Consumer as BackendConsumer } from '../context/backend';
import AudioButton from './AudioButton';
import AudioButtonLoading from './AudioButtonLoading';
import Repromised from './Repromised';
import Threshold from './Threshold';

type Props = {
  className?: string;
};

const KeywordPronunciation = ({ className }: Props) => {
  return (
    <BackendConsumer>
      {backend => (
        <Subscribe to={[CardCreatingState]}>
          {(cardCreatingState: CardCreatingState) => (
            <Threshold ms={600} value={cardCreatingState.state.keyword}>
              {keyword => (
                <Repromised
                  initial={null}
                  promise={() => backend.synthesize(keyword)}
                  then={file => cardCreatingState.setKeywordPronunciation(file!)}
                  catch={err =>
                    console.error(err) || Toaster.create().show({ intent: Intent.DANGER, message: err.message })
                  }
                  key={`${keyword}`}
                >
                  {(file, isLoading) =>
                    isLoading || file === null ? (
                      <AudioButtonLoading className={className} />
                    ) : (
                      <AudioButton src={file.toURL().href} className={className} />
                    )
                  }
                </Repromised>
              )}
            </Threshold>
          )}
        </Subscribe>
      )}
    </BackendConsumer>
  );
};

export default KeywordPronunciation;

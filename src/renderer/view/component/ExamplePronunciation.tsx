import { Intent, Toaster } from '@blueprintjs/core';
import { createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import { Consumer as DependencyConsumer } from '../context/dependency';
import AudioButton from './AudioButton';
import AudioButtonLoading from './AudioButtonLoading';
import Repromised from './Repromised';
import Threshold from './Threshold';

type Props = {
  className?: string;
};

const ExamplePronunciation = ({ className }: Props) => {
  return (
    <DependencyConsumer>
      {({ backend }) => (
        <Subscribe to={[CardCreatingState]}>
          {(cardCreatingState: CardCreatingState) => (
            <Threshold ms={600} value={cardCreatingState.state.example}>
              {example => (
                <Repromised
                  initial={null}
                  promise={() => backend.synthesize(example)}
                  then={file => cardCreatingState.setExamplePronunciation(file!)}
                  catch={err =>
                    console.error(err) || Toaster.create().show({ intent: Intent.DANGER, message: err.message })
                  }
                  key={example}
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
    </DependencyConsumer>
  );
};

export default ExamplePronunciation;

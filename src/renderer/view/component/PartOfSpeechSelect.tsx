import { Intent, Toaster } from '@blueprintjs/core';
import { ClassAttributes, createElement } from 'react';
import { Subscribe } from 'unstated';
import { Consumer as DependencyConsumer } from '../context/dependency';
import CardCreatingState from '../../state/CardCreatingState';
import Do from './Do';
import InputWithOptions from './InputWithOptions';
import Repromised from './Repromised';
import Threshold from './Threshold';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const PartOfSpeechSelect = ({ className }: Props) => {
  return (
    <DependencyConsumer>
      {({ backend }) => (
        <Subscribe to={[CardCreatingState]}>
          {(cardCreatingState: CardCreatingState) => (
            <Threshold ms={600} value={cardCreatingState.state.keyword}>
              {keyword => (
                <Repromised
                  promise={() => backend.getEntries(keyword)}
                  initial={[]}
                  catch={err =>
                    console.error(err) || Toaster.create().show({ intent: Intent.DANGER, message: err.message })
                  }
                  key={`${cardCreatingState.state.sessionId}/${keyword}`}
                >
                  {(entries, isLoading) => {
                    const partOfSpeeches = entries.reduce<string[]>(
                      (arr, entry) => (arr.indexOf(entry.partOfSpeech) === -1 ? [...arr, entry.partOfSpeech] : arr),
                      []
                    );

                    return (
                      <Do
                        onMount={() => cardCreatingState.setPartOfSpeech(partOfSpeeches[0] || '')}
                        key={`${partOfSpeeches.join('-')}`}
                      >
                        <InputWithOptions
                          items={partOfSpeeches}
                          onChange={partOfSpeech => cardCreatingState.setPartOfSpeech(partOfSpeech)}
                          disabled={isLoading}
                          className={className}
                        />
                      </Do>
                    );
                  }}
                </Repromised>
              )}
            </Threshold>
          )}
        </Subscribe>
      )}
    </DependencyConsumer>
  );
};

export default PartOfSpeechSelect;

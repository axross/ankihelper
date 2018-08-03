import { Intent, Toaster } from '@blueprintjs/core';
import { ClassAttributes, createElement } from 'react';
import Redebounce from 'redebounce';
import { Subscribe } from 'unstated';
import { Consumer as BackendConsumer } from '../context/backend';
import CardCreatingState from '../../state/CardCreatingState';
import Do from './Do';
import InputWithOptions from './InputWithOptions';
import Repromised from './Repromised';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const PartOfSpeechSelect = ({ className }: Props) => {
  return (
    <BackendConsumer>
      {backend => (
        <Subscribe to={[CardCreatingState]}>
          {(cardCreatingState: CardCreatingState) => (
            <Redebounce dueTime={600} value={cardCreatingState.state.keyword}>
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
            </Redebounce>
          )}
        </Subscribe>
      )}
    </BackendConsumer>
  );
};

export default PartOfSpeechSelect;

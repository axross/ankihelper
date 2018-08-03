import { Intent, Toaster } from '@blueprintjs/core';
import { ClassAttributes, createElement } from 'react';
import Redebounce from 'redebounce';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import { Consumer as BackendConsumer } from '../context/backend';
import Do from './Do';
import InputWithOptions from './InputWithOptions';
import Repromised from './Repromised';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const DefinitionEditor = ({ className }: Props) => (
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
                key={`${keyword}`}
              >
                {(entries, isLoading) => {
                  const partOfSpeech = cardCreatingState.state.partOfSpeech;
                  const definitions = entries
                    .filter(entry => entry.partOfSpeech === partOfSpeech)
                    .map(entry => entry.definition);
                  const firstDefinition = definitions[0] || '';

                  return (
                    <Do
                      onMount={() => cardCreatingState.setDefinition(firstDefinition)}
                      key={`${keyword}/${partOfSpeech}/${isLoading}`}
                    >
                      <InputWithOptions
                        items={definitions}
                        onChange={definition => cardCreatingState.setDefinition(definition)}
                        disabled={isLoading}
                        className={className}
                        key={`${keyword}/${partOfSpeech}/${isLoading}`}
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

export default DefinitionEditor;

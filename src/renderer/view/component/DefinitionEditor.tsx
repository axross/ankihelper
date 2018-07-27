import { Intent, Toaster } from '@blueprintjs/core';
import { ClassAttributes, createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import { Consumer as BackendConsumer } from '../context/backend';
import Do from './Do';
import InputWithOptions from './InputWithOptions';
import Repromised from './Repromised';
import Threshold from './Threshold';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const DefinitionEditor = ({ className }: Props) => (
  <BackendConsumer>
    {backend => (
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
          </Threshold>
        )}
      </Subscribe>
    )}
  </BackendConsumer>
);

export default DefinitionEditor;

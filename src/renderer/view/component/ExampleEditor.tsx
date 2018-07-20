import { Intent, Toaster } from '@blueprintjs/core';
import { ClassAttributes, createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import { Consumer as DependencyConsumer } from '../context/dependency';
import Do from './Do';
import InputWithOptions from './InputWithOptions';
import Repromised from './Repromised';
import Threshold from './Threshold';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const ExampleEditor = ({ className }: Props) => (
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
                key={keyword}
              >
                {(entries, isLoading) => {
                  const partOfSpeech = cardCreatingState.state.partOfSpeech;
                  const examples = entries
                    .filter(entry => entry.partOfSpeech === partOfSpeech)
                    .reduce<string[]>((examples, entry) => [...examples, ...entry.examples], []);
                  const firstExample = examples.length >= 1 ? examples[0] : '';

                  return (
                    <Do
                      onMount={() => {
                        if (!cardCreatingState.state.keepExample) {
                          cardCreatingState.setExample(firstExample);
                        }
                      }}
                      key={`${keyword}/${partOfSpeech}/${isLoading}`}
                    >
                      <InputWithOptions
                        items={examples}
                        defaultValue={cardCreatingState.state.example}
                        onChange={example => cardCreatingState.setExample(example)}
                        itemPredicate={(query, item) => item.indexOf(query) !== -1}
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
  </DependencyConsumer>
);

export default ExampleEditor;

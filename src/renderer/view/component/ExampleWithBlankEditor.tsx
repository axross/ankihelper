import { InputGroup } from '@blueprintjs/core';
import * as compromise from 'compromise';
import { ChangeEvent, ClassAttributes, createElement } from 'react';
import Redebounce from 'redebounce';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import Do from './Do';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const ExampleWithBlankEditor = ({ className }: Props) => {
  return (
    <Subscribe to={[CardCreatingState]}>
      {(cardCreatingState: CardCreatingState) => (
        <Redebounce dueTime={600} value={cardCreatingState.state.keyword}>
          {keyword => (
            <Redebounce dueTime={600} value={cardCreatingState.state.example}>
              {example => {
                const exampleWithBlank = compromise(example)
                  .replace(keyword, '______')
                  .out();

                return (
                  <Do
                    onMount={() => cardCreatingState.setExampleWithBlank(exampleWithBlank)}
                    key={`${example}/${keyword}`}
                  >
                    <InputGroup
                      defaultValue={exampleWithBlank}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        cardCreatingState.setExampleWithBlank(e.currentTarget.value)
                      }
                      className={className}
                    />
                  </Do>
                );
              }}
            </Redebounce>
          )}
        </Redebounce>
      )}
    </Subscribe>
  );
};

export default ExampleWithBlankEditor;

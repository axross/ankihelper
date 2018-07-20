import { InputGroup } from '@blueprintjs/core';
import * as compromise from 'compromise';
import { ClassAttributes, createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import Do from './Do';
import Threshold from './Threshold';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const ExampleWithBlankEditor = ({ className }: Props) => {
  return (
    <Subscribe to={[CardCreatingState]}>
      {(cardCreatingState: CardCreatingState) => (
        <Threshold ms={600} value={cardCreatingState.state.keyword}>
          {keyword => (
            <Threshold ms={600} value={cardCreatingState.state.example}>
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
                      onChange={e => cardCreatingState.setExampleWithBlank(e.target.value)}
                      className={className}
                    />
                  </Do>
                );
              }}
            </Threshold>
          )}
        </Threshold>
      )}
    </Subscribe>
  );
};

export default ExampleWithBlankEditor;

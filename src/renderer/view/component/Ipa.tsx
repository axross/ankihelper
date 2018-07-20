import { InputGroup, Intent, Toaster } from '@blueprintjs/core';
import { createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import { Consumer as DependencyConsumer } from '../context/dependency';
import Repromised from './Repromised';
import Threshold from './Threshold';

type Props = {
  className?: string;
};

const Ipa = ({ className }: Props) => (
  <DependencyConsumer>
    {({ backend }) => (
      <Subscribe to={[CardCreatingState]}>
        {(cardCreatingState: CardCreatingState) => (
          <Threshold ms={600} value={cardCreatingState.state.keyword}>
            {keyword => (
              <Repromised
                promise={() => backend.getIpa(keyword)}
                initial=""
                then={ipa => cardCreatingState.setIpa(ipa)}
                catch={err => Toaster.create().show({ intent: Intent.DANGER, message: err.message })}
                key={keyword}
              >
                {(ipa, isLoading) => (
                  <InputGroup
                    defaultValue={ipa}
                    onChange={e => cardCreatingState.setIpa(e.target.value)}
                    disabled={isLoading}
                    className={className}
                    key={keyword}
                  />
                )}
              </Repromised>
            )}
          </Threshold>
        )}
      </Subscribe>
    )}
  </DependencyConsumer>
);

export default Ipa;

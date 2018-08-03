import { InputGroup, Intent, Toaster } from '@blueprintjs/core';
import { ChangeEvent, createElement } from 'react';
import Redebounce from 'redebounce';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import { Consumer as BackendConsumer } from '../context/backend';
import Repromised from './Repromised';

type Props = {
  className?: string;
};

const Ipa = ({ className }: Props) => (
  <BackendConsumer>
    {backend => (
      <Subscribe to={[CardCreatingState]}>
        {(cardCreatingState: CardCreatingState) => (
          <Redebounce dueTime={600} value={cardCreatingState.state.keyword}>
            {keyword => (
              <Repromised
                promise={() => backend.getIpa(keyword)}
                initial=""
                then={ipa => console.log('then', ipa) || cardCreatingState.setIpa(ipa)}
                catch={err => Toaster.create().show({ intent: Intent.DANGER, message: err.message })}
                key={keyword}
              >
                {(ipa, isLoading) => (
                  <InputGroup
                    defaultValue={ipa}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => cardCreatingState.setIpa(e.currentTarget.value)}
                    disabled={isLoading}
                    className={className}
                    key={keyword}
                  />
                )}
              </Repromised>
            )}
          </Redebounce>
        )}
      </Subscribe>
    )}
  </BackendConsumer>
);

export default Ipa;

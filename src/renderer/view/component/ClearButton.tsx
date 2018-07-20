import { Button } from '@blueprintjs/core';
import { createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';

type Props = {
  className?: string;
};

const ClearButton = ({ className }: Props) => (
  <Subscribe to={[CardCreatingState]}>
    {(cardCreatingState: CardCreatingState) => (
      <Button onClick={() => cardCreatingState.clearAll()} className={className}>
        Clear
      </Button>
    )}
  </Subscribe>
);

export default ClearButton;

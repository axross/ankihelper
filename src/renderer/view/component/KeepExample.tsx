import { Checkbox } from '@blueprintjs/core';
import { createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';

type Props = {
  className?: string;
};

const KeepExample = ({ className }: Props) => (
  <Subscribe to={[CardCreatingState]}>
    {(cardCreatingState: CardCreatingState) => (
      <Checkbox
        label="Keep"
        onChange={e => cardCreatingState.setKeepExample(e.currentTarget.checked)}
        className={className}
      />
    )}
  </Subscribe>
);

export default KeepExample;

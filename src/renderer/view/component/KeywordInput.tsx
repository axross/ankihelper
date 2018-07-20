import { InputGroup } from '@blueprintjs/core';
import { ChangeEvent, ClassAttributes, createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';

type Props = ClassAttributes<HTMLInputElement> & {
  className?: string;
};

const KeywordEditor = ({ className }: Props) => (
  <Subscribe to={[CardCreatingState]}>
    {(cardCreatingState: CardCreatingState) => (
      <InputGroup
        large
        leftIcon="search"
        defaultValue={cardCreatingState.state.keyword}
        placeholder="Search..."
        onChange={(e: ChangeEvent<HTMLInputElement>) => cardCreatingState.setKeyword(e.currentTarget.value)}
        className={className}
        key={cardCreatingState.state.sessionId}
      />
    )}
  </Subscribe>
);

export default KeywordEditor;

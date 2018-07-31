import { createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../../state/CardCreatingState';
import Do from '../Do';
import ImageSearchQuerySelector from './ImageSearchQuerySelector';

type Props = {
  className?: string;
};

const Connected = ({ className }: Props) => (
  <Subscribe to={[CardCreatingState]}>
    {(cardCreatingState: CardCreatingState) =>
      cardCreatingState.state.example.trim() === '' ? null : (
        <Do
          onMount={() => cardCreatingState.setImageSearchQuery(cardCreatingState.state.example.split(' ')[0])}
          key={cardCreatingState.state.example}
        >
          <ImageSearchQuerySelector
            text={cardCreatingState.state.example}
            defaultValue={[cardCreatingState.state.example.split(' ')[0]]}
            onChange={selected => cardCreatingState.setImageSearchQuery(selected.join(' '))}
            className={className}
          />
        </Do>
      )
    }
  </Subscribe>
);

export default Connected;

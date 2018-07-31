import { Tag } from '@blueprintjs/core';
import { createElement } from 'react';
import { Value } from 'react-powerplug';
import styled from '../../../core/styled-components';

type Props = {
  text: string;
  defaultValue?: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
};

const ImageSearchQuerySelector = ({ text, defaultValue = [], onChange, className }: Props) => {
  return (
    <Value initial={defaultValue} onChange={onChange}>
      {({ set, value: selected }) => (
        <Root className={className}>
          {text.split(' ').map(word => (
            <Word
              intent={selected.indexOf(word) === -1 ? 'none' : 'primary'}
              interactive
              onClick={() => {
                if (selected.indexOf(word) === -1) {
                  set([...selected, word]);
                } else {
                  if (selected.length === 1) return;

                  set(selected.filter(w => w !== word));
                }
              }}
              key={word}
            >
              {word}
            </Word>
          ))}
        </Root>
      )}
    </Value>
  );
};

const Root = styled.div`
  padding-right: -4px;
  padding-bottom: -4px;
`;

const Word = styled(Tag)`
  margin-right: 4px;
  margin-bottom: 4px;
`;

export default ImageSearchQuerySelector;

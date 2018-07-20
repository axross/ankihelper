import { IInputGroupProps, MenuItem, Position } from '@blueprintjs/core';
import { ItemPredicate, Suggest as _Suggest } from '@blueprintjs/select';
import { ChangeEvent, createElement } from 'react';
import { Value } from 'react-powerplug';
import styled from '../../core/emotion';

type Props = IInputGroupProps & {
  items: string[];
  defaultValue?: string;
  itemPredicate?: ItemPredicate<string>;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const InputWithOptions = ({ items, defaultValue, itemPredicate, onChange, disabled, className }: Props) => (
  <Value initial={defaultValue || items[0]} onChange={onChange}>
    {({ value, set }) => (
      <Suggest
        items={items}
        itemPredicate={itemPredicate}
        itemRenderer={(item, { handleClick }) => <MenuItem text={item} onClick={handleClick} key={item} />}
        noResults={<MenuItem disabled={true} text="No results." />}
        inputValueRenderer={item => item}
        onItemSelect={item => set(item)}
        popoverProps={{ minimal: true, position: Position.BOTTOM_LEFT }}
        inputProps={{
          value,
          placeholder: '',
          onChange: (e: ChangeEvent<HTMLInputElement>) => set(e.target.value),
          disabled,
        }}
        className={className}
      />
    )}
  </Value>
);

const Suggest = styled(_Suggest.ofType<string>())`
  width: 100%;
  & > * {
    width: 100%;
  }
`;

export default InputWithOptions;

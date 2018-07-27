import { ClassAttributes, createElement } from 'react';
import styled from '../../core/styled-components';
import Theme from '../../core/Theme';

type Props = ClassAttributes<HTMLElement> & {
  variant?: keyof Theme['text'];
  className?: string;
  children: string;
};

const Text = ({ variant = 'default', className, children }: Props) => (
  <Root variant={variant} className={className}>
    {children}
  </Root>
);

const Root = styled.span.attrs<{ variant: keyof Theme['text'] }>({})`
  display: block;
  font-family: ${({ variant, theme }) => theme.text[variant].family};
  font-size: ${({ variant, theme }) => theme.text[variant].size}px;
  font-weight: ${({ variant, theme }) => theme.text[variant].weight};
`;

export default Text;

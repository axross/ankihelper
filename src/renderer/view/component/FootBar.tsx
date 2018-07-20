import { createElement, ClassAttributes } from 'react';
import styled from '../../core/emotion';
import ClearButton from './ClearButton';
import ConfigurationButton from './ConfigurationButton';
import CreateButton from './CreateButton';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const FootBar = ({ className }: Props) => (
  <Root className={className}>
    <Configuration />

    <Clear />

    <Create />
  </Root>
);

const Root = styled('div')`
  display: grid;
  padding: ${({ theme }) => theme.spacing.small}px ${({ theme }) => theme.spacing.regular}px;
  grid-template-columns: auto 1fr auto auto;
  grid-template-rows: auto;
  grid-template-areas: 'configuration . clear create';
  justify-items: flex-end;

  & > * {
    margin-right: ${({ theme }) => theme.spacing.regular}px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Configuration = styled(ConfigurationButton)`
  grid-area: configuration;
`;

const Clear = styled(ClearButton)`
  grid-area: clear;
`;

const Create = styled(CreateButton)`
  grid-area: create;
`;

export default FootBar;

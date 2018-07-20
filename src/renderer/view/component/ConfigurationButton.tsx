import { Button } from '@blueprintjs/core';
import { createElement } from 'react';
import { Subscribe } from 'unstated';
import ConfigurationState from '../../state/ConfigurationState';

type Props = {
  className?: string;
};

const ConfigurationButton = ({ className }: Props) => (
  <Subscribe to={[ConfigurationState]}>
    {(configurationState: ConfigurationState) => (
      <Button icon="cog" onClick={() => configurationState.openDialog()} className={className} />
    )}
  </Subscribe>
);

export default ConfigurationButton;

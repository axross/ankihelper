import { Button } from '@blueprintjs/core';
import { ClassAttributes, createElement } from 'react';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const AudioButtonLoading = ({ className }: Props) => {
  return (
    <Button icon="play" loading className={className}>
      Speak
    </Button>
  );
};

export default AudioButtonLoading;

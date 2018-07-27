import { Component, createContext, createElement, ReactNode } from 'react';

type Props<Value> = {
  ms: number;
  value: Value;
  children: (value: Value) => ReactNode;
};

type State<Value> = {
  value: Value;
};

const { Provider, Consumer } = createContext(false);

export const NoThreshold = ({ children }: { children: ReactNode }) => <Provider value={true} children={children} />;

function Threshold<Value>(props: Props<Value>) {
  return (
    <Consumer>{noThreshold => (noThreshold ? props.children(props.value) : <ThresholdImpl {...props} />)}</Consumer>
  );
}

class ThresholdImpl<Value> extends Component<Props<Value>, State<Value>> {
  private timeoutId?: NodeJS.Timer;

  public componentDidUpdate(prevProps: Props<Value>) {
    if (prevProps.value !== this.props.value) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }

      this.timeoutId = setTimeout(() => {
        this.timeoutId = undefined;

        this.setState({ value: this.props.value });
      }, this.props.ms);
    }
  }

  public render() {
    return this.props.children(this.state.value);
  }

  public constructor(props: Props<Value>) {
    super(props);

    this.state = {
      value: props.value,
    };
  }
}

export default Threshold;

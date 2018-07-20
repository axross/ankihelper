import { PureComponent, ReactChild } from 'react';

type Props = {
  onMount?: () => void;
  onUnmount?: () => void;
  children?: ReactChild;
};

class Do extends PureComponent<Props, {}> {
  public componentDidMount() {
    this.props.onMount && this.props.onMount();
  }

  public componentWillUnmount() {
    this.props.onUnmount && this.props.onUnmount();
  }

  public render() {
    return this.props.children;
  }
}

export default Do;

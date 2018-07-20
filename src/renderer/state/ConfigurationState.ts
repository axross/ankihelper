import { Container } from 'unstated';

export type State = {
  isDialogOpen: boolean;
};

class CardCreatingState extends Container<State> {
  public readonly state: State;

  public openDialog() {
    this.setState({ isDialogOpen: true });
  }

  public closeDialog() {
    this.setState({ isDialogOpen: false });
  }

  public constructor() {
    super();

    this.state = { isDialogOpen: false };
  }
}

export default CardCreatingState;

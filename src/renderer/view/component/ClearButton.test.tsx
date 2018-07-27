import { Button } from '@blueprintjs/core';
import 'jest-styled-components';
import { createElement } from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Provider } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import ClearButton from './ClearButton';

describe('<ClearButton>', () => {
  test('matches with the last snapshot', () => {
    const cardCreatingState = new CardCreatingState();

    const testRenderer = TestRenderer.create(
      <Provider inject={[cardCreatingState]}>
        <ClearButton />
      </Provider>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  test("calls cardCreatingState.clearAll() when Button's props.onClick() is called", () => {
    const cardCreatingState = new CardCreatingState();
    const spy = jest.spyOn(cardCreatingState, 'clearAll');

    const testRenderer = TestRenderer.create(
      <Provider inject={[cardCreatingState]}>
        <ClearButton />
      </Provider>
    );

    testRenderer.root.findByType(Button).props['onClick'](Symbol('event'));

    expect(spy).toHaveBeenCalled();
  });
});

import { InputGroup } from '@blueprintjs/core';
import 'jest-styled-components';
import { createElement } from 'react';
import * as TestRenderer from 'react-test-renderer';
import { Provider } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import KeywordInput from './KeywordInput';

describe('<KeywordInput>', () => {
  test('matches with the last snapshot', () => {
    const cardCreatingState = new CardCreatingState();

    const testRenderer = TestRenderer.create(
      <Provider inject={[cardCreatingState]}>
        <KeywordInput />
      </Provider>
    );

    expect(testRenderer.toJSON()).toMatchSnapshot();
  });

  test("calls cardCreatingState.setKeyword() when InputGroup's props.onChange() is called", () => {
    const cardCreatingState = new CardCreatingState();
    const spy = jest.spyOn(cardCreatingState, 'setKeyword');
    const value = Symbol('value');

    const testRenderer = TestRenderer.create(
      <Provider inject={[cardCreatingState]}>
        <KeywordInput />
      </Provider>
    );

    testRenderer.root.findByType(InputGroup).props['onChange']({ currentTarget: { value } });

    expect(spy).toHaveBeenCalledWith(value);
  });
});

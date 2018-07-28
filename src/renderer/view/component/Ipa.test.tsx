import { createElement } from 'react';
import { create } from 'react-test-renderer';
import Backend from '../../service/Backend';
import CardCreatingState from '../../state/CardCreatingState';
import { Provider as BackendProvider } from '../context/backend';
import { Provider as StateProvider } from 'unstated';
import Ipa from './Ipa';
import { NoThreshold } from './Threshold';

describe('<Ipa>', () => {
  describe('calls cardCreatingState.getIpa() and backend.setIpa()', () => {
    test('when it is mounted', done => {
      const backend = new Backend(Symbol('ipcRenderer') as any);
      const cardCreatingState = new CardCreatingState();
      const getIpa = jest.spyOn(backend, 'getIpa').mockImplementation((keyword: any) => Promise.resolve(keyword));
      const setIpa = jest.spyOn(cardCreatingState, 'setIpa');

      const renderer = create(
        <BackendProvider value={backend}>
          <StateProvider inject={[cardCreatingState]}>
            <Ipa />
          </StateProvider>
        </BackendProvider>
      );

      setImmediate(() => {
        expect(getIpa).toHaveBeenCalledWith('');
        expect(setIpa).toHaveBeenCalledWith('');
        expect(renderer.toJSON()).toMatchSnapshot();

        done();
      });
    });

    test('whenever cardCreatingState.state.keyword is changed', async () => {
      const backend = new Backend(Symbol('ipcRenderer') as any);
      const cardCreatingState = new CardCreatingState();
      const getIpa = jest.spyOn(backend, 'getIpa').mockImplementation((keyword: any) => Promise.resolve(keyword));
      const setIpa = jest.spyOn(cardCreatingState, 'setIpa');

      const renderer = create(
        <NoThreshold>
          <BackendProvider value={backend}>
            <StateProvider inject={[cardCreatingState]}>
              <Ipa />
            </StateProvider>
          </BackendProvider>
        </NoThreshold>
      );

      await cardCreatingState.setState({ keyword: 'next keyword' });
      expect(renderer.toJSON()).toMatchSnapshot();

      await cardCreatingState.setState({ keyword: 'third something' });
      expect(renderer.toJSON()).toMatchSnapshot();

      expect(getIpa).toHaveBeenNthCalledWith(2, 'next keyword');
      expect(getIpa).toHaveBeenNthCalledWith(3, 'third something');

      expect(setIpa).toHaveBeenNthCalledWith(2, 'next keyword');
      expect(setIpa).toHaveBeenNthCalledWith(3, 'third something');
    });
  });
});

import { createElement } from 'react';
import { render } from 'react-testing-library';
import Repromised from './Repromised';

describe('<Repromised>', () => {
  test('is render-props resolving a promise', done => {
    const initial = Symbol('initial');
    const returnValue = Symbol('returnValue');
    const children = jest.fn(() => null);
    const promiseFunction = jest.fn(() => Promise.resolve(returnValue));

    render(
      <Repromised promise={promiseFunction} initial={initial}>
        {children}
      </Repromised>
    );

    setImmediate(() => {
      expect(promiseFunction).toHaveBeenCalled();
      expect(children).toHaveBeenNthCalledWith(1, initial, false);
      expect(children).toHaveBeenNthCalledWith(2, initial, true);
      expect(children).toHaveBeenNthCalledWith(3, returnValue, false);

      done();
    });
  });

  test('props.then() is called after the promise has been resolved', done => {
    let calledAfter: string;

    const returnValue = Symbol('returnValue');
    const promiseFunction = jest.fn(() => {
      calledAfter = 'promiseFunction';

      return Promise.resolve(returnValue);
    });
    const then = jest.fn(() => {
      calledAfter = 'then';
    });

    render(
      <Repromised promise={promiseFunction} initial={Symbol('initial')} then={then}>
        {() => null}
      </Repromised>
    );

    setImmediate(() => {
      expect(promiseFunction).toHaveBeenCalled();
      expect(then).toHaveBeenCalledWith(returnValue);
      expect(calledAfter).toBe('then');

      done();
    });
  });

  test('props.catch() is called after the promise has been rejected', done => {
    let calledAfter: string;

    const error = Symbol('error');
    const promiseFunction = jest.fn(() => {
      calledAfter = 'promiseFunction';

      return Promise.reject(error);
    });
    const catchFunction = jest.fn(() => {
      calledAfter = 'catch';
    });

    render(
      <Repromised promise={promiseFunction} initial={Symbol('initial')} catch={catchFunction}>
        {() => null}
      </Repromised>
    );

    setImmediate(() => {
      expect(promiseFunction).toHaveBeenCalled();
      expect(catchFunction).toHaveBeenCalledWith(error);
      expect(calledAfter).toBe('catch');

      done();
    });
  });

  test('props.beforeResolve() is called before the promise is called', done => {
    let calledAfter: string;

    const promiseFunction = jest.fn(() => {
      calledAfter = 'promiseFunction';

      return Promise.resolve(Symbol('returnValue'));
    });
    const beforeResolve = jest.fn(() => {
      calledAfter = 'beforeResolve';
    });

    render(
      <Repromised promise={promiseFunction} initial={Symbol('initial')} beforeResolve={beforeResolve}>
        {() => null}
      </Repromised>
    );

    setImmediate(() => {
      expect(promiseFunction).toHaveBeenCalled();
      expect(beforeResolve).toHaveBeenCalled();
      expect(calledAfter).toBe('promiseFunction');

      done();
    });
  });
});

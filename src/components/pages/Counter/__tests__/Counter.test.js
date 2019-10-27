import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../../store';
import { counterReset } from '../../../../actions/counterActions';

import Counter from '../Counter';
import { mockComponent } from '../../../../helpers/testHelpers';

jest.mock('../../../../store', () =>
  require('../../../../store/__mocks__/mockStore')
);
jest.mock('../../../../actions/counterActions');
jest.mock('../CounterHeader', () => props =>
  mockComponent('CounterHeader', props)
);
jest.mock('../CounterForm/CounterForm', () => props =>
  mockComponent('CounterForm', props)
);

describe('Counter Component', () => {
  const component = (
    <Provider store={store}>
      <Counter />
    </Provider>
  );

  beforeEach(() => {
    counterReset.mockImplementation(() => ({ type: 'counterReset' }));
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(component, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the component', () => {
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });

  it('counterReset called on component unmount', () => {
    const { unmount } = render(component);
    unmount(component);
    expect(counterReset).toHaveBeenCalledTimes(1);
  });
});

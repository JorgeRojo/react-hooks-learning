import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import App from '../App';
import { mockComponent } from '../../helpers/testHelpers';

jest.mock('../pages/Counter/CounterHeader', () => props =>
  mockComponent('CounterHeader', props)
);
jest.mock('../pages/Counter/CounterForm/CounterForm', () => props =>
  mockComponent('CounterForm', props)
);

describe('App Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the component', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});

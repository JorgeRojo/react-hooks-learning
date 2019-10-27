import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';

import Home from '../Home';

describe('Home Component', () => {
  const component = <Home />;

  afterEach(() => {
    cleanup();
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
});

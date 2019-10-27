import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';

import RouteNoMatch from '../RouteNoMatch';

describe('RouteNoMatch Component', () => {
  const component = <RouteNoMatch />;

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

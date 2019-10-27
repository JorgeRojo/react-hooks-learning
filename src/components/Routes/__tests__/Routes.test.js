import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import Routes from '../Routes';

describe('Routes Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Routes />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders the component', () => {
    const { container } = render(<Routes />);
    expect(container).toMatchSnapshot();
  });
});

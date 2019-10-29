import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../../store';
import { postsGet, postsReset } from '../../../../actions/postsActions';
import {
  selectPostsList,
  selectPostsIsLoading,
} from '../../../../reducer/posts';

import Posts from '../Posts';
import mockState from '../../../../store/__mocks__/mockState';

jest.mock('../../../../store', () =>
  require('../../../../store/__mocks__/mockStore')
);
jest.mock('../../../../actions/postsActions');
jest.mock('../../../../reducer/posts');

describe('Home Component', () => {
  const component = (
    <Provider store={store}>
      <Posts />
    </Provider>
  );

  beforeEach(() => {
    selectPostsIsLoading.mockReturnValue(false);
    selectPostsList.mockReturnValue(mockState.posts.response.data);
    postsGet.mockImplementation(() => ({ type: 'postsGet' }));
    postsReset.mockImplementation(() => ({ type: 'postsReset' }));
    postsReset.mockImplementation(() => ({ type: 'postsReset' }));
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

  it('renders the component with is loading', () => {
    selectPostsIsLoading.mockReturnValue(true);
    const { container } = render(component);
    expect(container).toMatchSnapshot();
  });
});

import ReactDOM from 'react-dom';
import '../index.js';

jest.mock('react-dom');

it('main', () => {
  expect(ReactDOM.render).toHaveBeenCalledTimes(1);
});

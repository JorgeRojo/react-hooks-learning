import { HTTP_REQUEST, POSTS_RESET, POSTS } from '../actionTypes';
import { HttpRequest } from '../../store/httpRequestReduxMiddleware';
import { postsGet, postsReset } from '../postsActions';

describe('postsActions', () => {
  it('Action: postsGet', () => {
    const expected = {
      type: HTTP_REQUEST,
      nextActionType: POSTS,
      request: new HttpRequest('https://jsonplaceholder.typicode.com/posts'),
      responseStatus: 200,
    };
    const actual = postsGet();
    expect(actual).toEqual(expected);
  });

  it('Action: postsReset', () => {
    const expected = {
      type: POSTS_RESET,
    };
    const actual = postsReset();
    expect(actual).toEqual(expected);
  });
});

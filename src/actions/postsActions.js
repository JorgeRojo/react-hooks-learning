import { HTTP_REQUEST, POSTS_RESET, POSTS } from './actionTypes';
import { HttpRequest } from '../store/httpRequestReduxMiddleware';

export const postsGet = () => ({
  type: HTTP_REQUEST,
  nextActionType: POSTS,
  request: new HttpRequest('https://jsonplaceholder.typicode.com/posts'),
  responseStatus: 200,
});

export const postsReset = () => ({
  type: POSTS_RESET,
});

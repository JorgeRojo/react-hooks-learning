import { HTTP_REQUEST, API_RESET, API } from './actionTypes';
import { HttpRequest } from '../store/httpRequestReduxMiddleware';

export const apiGet = () => ({
  type: HTTP_REQUEST,
  nextActionType: API,
  request: new HttpRequest('https://jsonplaceholder.typicode.com/posts'),
  responseStatus: 200,
});

export const apiReset = () => ({
  type: API_RESET,
});

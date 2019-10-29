import httpRequestReduxMiddleware, {
  HttpRequest,
} from '../httpRequestReduxMiddleware';
import { HTTP_REQUEST } from '../../actions/actionTypes';

describe('HttpRequest', () => {
  it('with default data', () => {
    const url = 'http://url.com?p0=v0';
    const params = {
      p1: 'v1',
      p2: 'v2',
    };
    const bodyData = { foo: 'bar' };
    const httpRequest = new HttpRequest(url, params, bodyData);

    expect(httpRequest).toMatchSnapshot();
    expect(httpRequest.url).toEqual(`${url}&p1=v1&p2=v2`);
    expect(httpRequest.body).toEqual(JSON.stringify(bodyData));
  });

  it('with url without params', () => {
    const url = 'http://url.com';
    const httpRequest = new HttpRequest(url);
    expect(httpRequest.url).toEqual(url);
  });

  it('with url without body', () => {
    const httpRequest = new HttpRequest();
    expect(httpRequest.body).toEqual(undefined);
  });

  it('with url without previous params', () => {
    const url = 'http://url.com';
    const params = {
      p1: 'v1',
      p2: 'v2',
    };
    const httpRequest = new HttpRequest(url, params);
    expect(httpRequest.url).toEqual(`${url}?p1=v1&p2=v2`);
  });
});

describe('httpRequestReduxMiddleware', () => {
  const nextActionType = 'NEX_ACTION';
  const request = new HttpRequest('http://url.com');
  const responseStatus = 200;
  const responseData = { foo: 'bar' };
  const response = {
    status: responseStatus,
    json: () => Promise.resolve(responseData),
  };

  let spyFetch;
  let store = {};
  let next;
  let onRequestError;
  let onRequestSuccess;

  beforeEach(() => {
    spyFetch = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve(response));
    store.dispatch = jest.fn();
    next = jest.fn();
    onRequestError = jest.fn();
    onRequestSuccess = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('with unknown action type', async () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    await httpRequestReduxMiddleware(store)(next)(action);
    expect(store.dispatch).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('with success data', async () => {
    const action = {
      type: HTTP_REQUEST,
      nextActionType,
      request,
      responseStatus,
      onRequestError,
      onRequestSuccess,
    };

    await httpRequestReduxMiddleware(store)(next)(action);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `${nextActionType}/REQUEST`,
    });

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      type: `${nextActionType}/SUCCESS`,
      payload: { response: { data: responseData } },
    });

    expect(onRequestError).not.toHaveBeenCalled();
    expect(onRequestSuccess).toHaveBeenCalledTimes(1);
    expect(onRequestSuccess).toHaveBeenCalledWith(responseData);
  });

  it('with success data but without success callback', async () => {
    const action = {
      type: HTTP_REQUEST,
      nextActionType,
      request,
      responseStatus,
    };

    await httpRequestReduxMiddleware(store)(next)(action);

    expect(onRequestSuccess).not.toHaveBeenCalled();
  });

  it('with error fetch call', async () => {
    const fetchError = { error: 'error' };
    spyFetch.mockImplementation(() => Promise.reject(fetchError));
    const action = {
      type: HTTP_REQUEST,
      nextActionType,
      request,
      responseStatus,
      onRequestError,
      onRequestSuccess,
    };

    await httpRequestReduxMiddleware(store)(next)(action);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `${nextActionType}/REQUEST`,
    });

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      type: `${nextActionType}/ERROR`,
      payload: fetchError,
    });

    expect(onRequestSuccess).not.toHaveBeenCalled();
    expect(onRequestError).toHaveBeenCalledTimes(1);
    expect(onRequestError).toHaveBeenCalledWith(fetchError);
  });

  it('with wrong status code', async () => {
    const status = 201;
    spyFetch.mockImplementation(() => Promise.resolve({ ...response, status }));

    const action = {
      type: HTTP_REQUEST,
      nextActionType,
      request,
      responseStatus,
    };

    await httpRequestReduxMiddleware(store)(next)(action);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `${nextActionType}/REQUEST`,
    });

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      type: `${nextActionType}/ERROR`,
      payload: { error: { unexpectedStatus: status } },
    });
  });

  it('with wrong json response function', async () => {
    const jsonError = { error: 'error' };
    spyFetch.mockImplementation(() =>
      Promise.resolve({
        ...response,
        json: () => Promise.reject(jsonError),
      })
    );

    const action = {
      type: HTTP_REQUEST,
      nextActionType,
      request,
      responseStatus,
    };

    await httpRequestReduxMiddleware(store)(next)(action);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: `${nextActionType}/REQUEST`,
    });

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      type: `${nextActionType}/ERROR`,
      payload: jsonError,
    });
  });
});

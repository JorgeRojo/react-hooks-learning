import { HTTP_REQUEST } from '../actions/actionTypes';

export class HttpRequest {
  _url = '';
  _body = {};
  headers = { 'Content-Type': 'application/json; charset=UTF-8' };
  method = 'GET';
  cache = 'default';
  mode = 'cors';

  constructor(url = '', params = {}, bodyData) {
    this.setURL(url, params);
    this._body = JSON.stringify(bodyData);
  }

  setURL(url, params) {
    const urlParams = Object.keys(params).map(
      key => `${key}=${encodeURI(params[key])}`
    );
    const queryParamsSplitter = url.includes('?') ? '&' : '?';
    this._url = urlParams.length
      ? `${url}${queryParamsSplitter}${urlParams.join('&')}`
      : url;
  }

  get url() {
    return this._url;
  }
  get body() {
    return this._body;
  }
}

const requestAction = nextActionType => {
  return {
    type: `${nextActionType}/REQUEST`,
  };
};

const successAction = (nextActionType, data, onRequestSuccess) => {
  if (typeof onRequestSuccess === 'function') {
    onRequestSuccess(data);
  }

  return {
    type: `${nextActionType}/SUCCESS`,
    payload: { response: { data } },
  };
};

const errorAction = (nextActionType, data, onRequestError) => {
  if (typeof onRequestError === 'function') {
    onRequestError(data);
  }

  return {
    type: `${nextActionType}/ERROR`,
    payload: data,
  };
};

const httpRequestReduxMiddleware = ({ dispatch }) => next => async action => {
  const {
    type,
    nextActionType,
    request,
    responseStatus,
    onRequestError,
    onRequestSuccess,
  } = action;
  if (type === HTTP_REQUEST) {
    let response;
    let data;

    dispatch(requestAction(nextActionType));

    try {
      response = await fetch(request.url, request);
    } catch (error) {
      return next(errorAction(nextActionType, error, onRequestError));
    }

    if (response.status === responseStatus) {
      try {
        data = await response.json();
      } catch (error) {
        return next(errorAction(nextActionType, error, onRequestError));
      }
    } else {
      return next(
        errorAction(
          nextActionType,
          { error: { unexpectedStatus: response.status } },
          onRequestError
        )
      );
    }

    return next(successAction(nextActionType, data, onRequestSuccess));
  }

  return next(action);
};

export default httpRequestReduxMiddleware;

import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { selectApiData, selectApiIsLoading } from '../../../reducer';

import { reduxActionsDispatchers } from '../../../store';
import { apiGet, apiReset } from '../../../actions/apiActions';
const { dispatchApiGet, dispatchApiReset } = reduxActionsDispatchers({
  apiGet,
  apiReset,
});

function Api() {
  const isLoading = useSelector(selectApiIsLoading, shallowEqual);
  const data = useSelector(selectApiData, shallowEqual);

  useEffect(() => {
    dispatchApiGet();
    return dispatchApiReset;
  }, []);

  return (
    <div className="container text-center mt-4">
      <h1 className="display-4 mb-4">Api response</h1>
      {isLoading && <p>Is Loading...</p>}
      {data.length > 0 && (
        <>
          {data.map(({ title, body }, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-header">{title}</div>
              <div className="card-body">{body}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Api;

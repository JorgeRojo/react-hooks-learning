import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { selectPostsList, selectPostsIsLoading } from '../../../reducer';

import { postsGet, postsReset } from '../../../actions/postsActions';
import useReduxAction from '../../../hooks/useReduxAction';

function Posts() {
  const dispatchPostsGet = useReduxAction(postsGet);
  const dispatchPostsReset = useReduxAction(postsReset);

  useEffect(() => {
    dispatchPostsGet();
    return dispatchPostsReset;
  }, [dispatchPostsGet, dispatchPostsReset]);

  const isLoading = useSelector(selectPostsIsLoading, shallowEqual);
  const posts = useSelector(selectPostsList, shallowEqual);

  return (
    <div className="container text-center mt-4">
      <h1 className="display-4 mb-4">Posts list async response</h1>
      {isLoading && <p>Is Loading...</p>}
      {!isLoading && posts.length > 0 && (
        <>
          {posts.map(({ title, body }, index) => (
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

export default Posts;

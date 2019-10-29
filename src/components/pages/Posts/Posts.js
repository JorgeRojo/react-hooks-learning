import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPostsList, selectPostsIsLoading } from '../../../reducer';
import { postsGet, postsReset } from '../../../actions/postsActions';

class Posts extends Component {
  componentDidMount() {
    this.props.postsGet();
  }

  componentWillUnmount() {
    this.props.postsReset();
  }

  render() {
    const { isLoading, posts } = this.props;
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
}

const mapStateToProps = state => ({
  isLoading: selectPostsIsLoading(state),
  posts: selectPostsList(state),
});

const mapDispatchToProps = {
  postsGet,
  postsReset,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);

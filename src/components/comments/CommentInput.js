/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CommentInput({ authUser, commentThread }) {
  const [content, setContent] = useState('');

  function commentThreadHandler() {
    commentThread(content);
    setContent('');
  }

  function handleContentChange({ target }) {
    setContent(target.value);
  }

  if (authUser === null) {
    return (
      <section className="no-account">
        <p>
          <Link to="/login">Login</Link> to comment.
        </p>
      </section>
    );
  }

  return (
    <section className="comment-input">
      <h3>Give a comment:</h3>
      <textarea value={content} onChange={handleContentChange} />
      <button
        className="comment-button"
        type="button"
        onClick={commentThreadHandler}
      >
        Send
      </button>
    </section>
  );
}

CommentInput.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  authUser: PropTypes.object,
  commentThread: PropTypes.func.isRequired,
};

CommentInput.defaultProps = {
  authUser: null,
};

export default CommentInput;

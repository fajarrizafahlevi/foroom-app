import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './CommentItem';

function CommentsList({
  comments,
  authUserId,
  upVote,
  downVote,
  neutralVote,
}) {
  return (
    <section className="comments-list">
      <h4 className="comments-list__total">{`Comments (${comments.length})`}</h4>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          id={comment.id}
          authUserId={authUserId}
          upVote={upVote}
          downVote={downVote}
          neutralVote={neutralVote}
        />
      ))}
    </section>
  );
}

CommentsList.propTypes = {
  authUserId: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

CommentsList.defaultProps = {
  authUserId: null,
};

export default CommentsList;

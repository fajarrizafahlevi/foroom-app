import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../../utils';
import UpVoteButton, { upVoteButtonShape } from '../buttons/UpVoteButton';
import DownVoteButton, { downVoteButtonShape } from '../buttons/DownVoteButton';

function CommentItem({
  id,
  owner,
  content,
  createdAt,
  authUserId,
  upVotesBy,
  upVote,
  downVotesBy,
  downVote,
  neutralVote,
}) {
  return (
    <div className="comment-item">
      <header className="comment-item__owner">
        <img
          className="comment-item__owner-avatar"
          alt="owner avatar"
          src={owner.avatar}
        />
        <div>
          <h3 className="comment-item__owner-name">{owner.name}</h3>
          <p className="comment-item__posted">{postedAt(createdAt)}</p>
        </div>
      </header>
      <article>
        <p
          className="comment-item__content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <footer>
        <UpVoteButton
          id={id}
          upVotesBy={upVotesBy}
          authUserId={authUserId}
          upVote={upVote}
          neutralVote={neutralVote}
        />
        <DownVoteButton
          id={id}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          downVote={downVote}
          neutralVote={neutralVote}
        />
      </footer>
    </div>
  );
}

const ownerShape = {
  name: PropTypes.string.isRequired,
};

const commentItemShape = {
  ...upVoteButtonShape,
  ...downVoteButtonShape,
  owner: PropTypes.shape(ownerShape).isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  ...commentItemShape,
};

export { commentItemShape };

export default CommentItem;

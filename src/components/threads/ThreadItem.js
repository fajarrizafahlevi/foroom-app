import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiOutlineComment } from 'react-icons/ai';
import { postedAt } from '../../utils';
import UpVoteButton, { upVoteButtonShape } from '../buttons/UpVoteButton';
import DownVoteButton, { downVoteButtonShape } from '../buttons/DownVoteButton';

function ThreadItem({
  id,
  title,
  category,
  body,
  createdAt,
  user,
  authUserId,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralVote,
  totalComments,
}) {
  return (
    <div className="thread-item">
      <header>
        <p className="thread-item__category">
          #
          {category}
        </p>
        <h3 className="thread-item__title">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h3>
      </header>
      <article>
        <p
          className="thread-item__body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </article>
      <footer>
        <div className="thread-item__votes-comments">
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
          <div className="thread-item__comments">
            <i className="comment-icon">
              <AiOutlineComment />
            </i>
            <span>{totalComments}</span>
          </div>
        </div>
        <div className="thread-item__owner">
          <p>Created by</p>
          <h4 className="thread-item__owner__name">{user.name}</h4>
        </div>
        <p className="thread-item__posted">{postedAt(createdAt)}</p>
      </footer>
    </div>
  );
}

const userShape = {
  name: PropTypes.string.isRequired,
};

const threadItemShape = {
  ...downVoteButtonShape,
  ...upVoteButtonShape,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  totalComments: PropTypes.number.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export { threadItemShape };

export default ThreadItem;

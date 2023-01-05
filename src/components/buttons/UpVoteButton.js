import React from 'react';
import PropTypes from 'prop-types';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

// eslint-disable-next-line object-curly-newline
function UpVoteButton({ id, upVotesBy, authUserId, upVote, neutralVote }) {
  const isUpVoted = upVotesBy.includes(authUserId);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    // eslint-disable-next-line no-unused-expressions
    isUpVoted ? neutralVote(id) : upVote(id);
  };

  return (
    <div className="up-votes">
      <button className="up-vote-button" type="button" onClick={onUpVoteClick}>
        {isUpVoted ? <AiFillLike /> : <AiOutlineLike />}
      </button>
      <span>{upVotesBy.length}</span>
    </div>
  );
}

const upVoteButtonShape = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

UpVoteButton.propTypes = {
  ...upVoteButtonShape,
  authUserId: PropTypes.string,
  upVote: PropTypes.func,
  neutralVote: PropTypes.func,
};

UpVoteButton.defaultProps = {
  authUserId: null,
  upVote: null,
  neutralVote: null,
};

export { upVoteButtonShape };

export default UpVoteButton;

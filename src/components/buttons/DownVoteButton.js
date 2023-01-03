import React from 'react';
import PropTypes from 'prop-types';
import { AiFillDislike, AiOutlineDislike } from 'react-icons/ai';

function DownVoteButton({
  id,
  downVotesBy,
  authUserId,
  downVote,
  neutralVote,
}) {
  const isDownVoted = downVotesBy.includes(authUserId);

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    // eslint-disable-next-line no-unused-expressions
    isDownVoted ? neutralVote(id) : downVote(id);
  };

  return (
    <div className="down-votes">
      <button
        className="down-vote-button"
        type="button"
        onClick={onDownVoteClick}
      >
        {isDownVoted ? <AiFillDislike /> : <AiOutlineDislike />}
      </button>
      <span>
        {downVotesBy.length}
      </span>
    </div>
  );
}

const downVoteButtonShape = {
  id: PropTypes.string.isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

DownVoteButton.propTypes = {
  ...downVoteButtonShape,
  authUserId: PropTypes.string,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
};

DownVoteButton.defaultProps = {
  authUserId: null,
  downVote: null,
  neutralVote: null,
};

export { downVoteButtonShape };

export default DownVoteButton;

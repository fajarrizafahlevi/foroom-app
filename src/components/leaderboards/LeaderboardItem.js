import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ name, avatar, score }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__user">
        <div className="leaderboard-item__user-info">
          <img
            className="leaderboard-item__user-info__avatar"
            alt="user avatar"
            src={avatar}
          />
          <span>{name}</span>
        </div>
        <span>{score}</span>
      </div>
    </div>
  );
}

const userShape = {
  name: PropTypes.string,
  avatar: PropTypes.string,
};

const leaderboardItemShape = {
  ...userShape,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
};

export { leaderboardItemShape };

export default LeaderboardItem;

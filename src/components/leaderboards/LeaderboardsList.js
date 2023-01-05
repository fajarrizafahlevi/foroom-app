import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem, { leaderboardItemShape } from './LeaderboardItem';

function LeaderboardsList({ leaderboards }) {
  return (
    <div className="leaderboards-list">
      <header>
        <h3>User name</h3>
        <h3>Score</h3>
      </header>
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          avatar={leaderboard.user.avatar}
          name={leaderboard.user.name}
          score={leaderboard.score}
        />
      ))}
    </div>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape))
    .isRequired,
};

export default LeaderboardsList;

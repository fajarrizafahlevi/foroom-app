import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeaderboardsList from '../components/leaderboards/LeaderboardsList';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const { leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <section className="leaderboard-page">
      <h2>Leaderboards</h2>
      <LeaderboardsList leaderboards={leaderboards} />
    </section>
  );
}

export default LeaderboardsPage;

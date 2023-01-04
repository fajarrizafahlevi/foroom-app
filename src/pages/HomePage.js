/* eslint-disable indent */
/* eslint-disable no-unused-expressions */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoAddCircle } from 'react-icons/io5';
import ThreadsList from '../components/threads/ThreadsList';
import { asyncReceiveUsersAndThreads } from '../states/shared/action';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/threads/action';
import CategoriesList from '../components/categories/CategoriesList';

function HomePage() {
  const {
    authUser,
    users = [],
    threads = [],
    categories = [],
  } = useSelector((states) => states);

  const [filteredThreads, setFilteredThreads] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveUsersAndThreads());
  }, [dispatch]);

  const onUpVoteThread = (id) => {
    authUser === null
      ? alert('You must login to vote')
      : dispatch(asyncUpVoteThread(id));
  };

  const onDownVoteThread = (id) => {
    authUser === null
      ? alert('You must login to vote')
      : dispatch(asyncDownVoteThread(id));
  };

  const onNeutralVoteThread = (id) => {
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const threadsList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const onFilterThreads = (curcat) => {
    curcat === 'all'
      ? setFilteredThreads(threadsList)
      : setFilteredThreads(
          threadsList.filter((thread) => thread.category === curcat),
        );
    return filteredThreads;
  };

  return (
    <section className="home-page">
      <header>
        <h4>Categories</h4>
        <CategoriesList filter={onFilterThreads} categories={categories} />
      </header>
      <article>
        <h2>Discussions</h2>
        {authUser === null ? (
          <ThreadsList
            threads={filteredThreads.length > 0 ? filteredThreads : threadsList}
            upVote={onUpVoteThread}
            downVote={onDownVoteThread}
            neutralVote={onNeutralVoteThread}
          />
        ) : (
          <>
            <ThreadsList
              authUserId={authUser.id}
              threads={
                filteredThreads.length > 0 ? filteredThreads : threadsList
              }
              upVote={onUpVoteThread}
              downVote={onDownVoteThread}
              neutralVote={onNeutralVoteThread}
            />
            <button
              className="new-button"
              aria-label="new thread"
              type="button"
            >
              <Link to="/new">
                <IoAddCircle />
              </Link>
            </button>
          </>
        )}
      </article>
    </section>
  );
}

export default HomePage;

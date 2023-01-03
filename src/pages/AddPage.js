import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/forms/ThreadInput';
import { asyncAddThread } from '../states/threads/action';
import { asyncReceiveUsersAndThreads } from '../states/shared/action';

function AddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveUsersAndThreads());
  }, [dispatch]);

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
    navigate('/');
  };

  return (
    <section className="add-page">
      <h2>Add new discussion</h2>
      <ThreadInput addThread={onAddThread} />
    </section>
  );
}

export default AddPage;

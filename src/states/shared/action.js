import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveCommentsActionCreator } from '../comments/action';
import {
  clearDetailThreadActionCreator,
  receiveDetailThreadActionCreator,
} from '../detailThread/action';
import { receiveCategoriesActionCreator } from '../categories/action';

function asyncReceiveUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveCategoriesActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncReceiveDetailThreadAndComments(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator());

    try {
      const detailThread = await api.getDetailThread(threadId);
      const comments = await api.getAllComments(threadId);

      dispatch(receiveDetailThreadActionCreator(detailThread));
      dispatch(receiveCommentsActionCreator(comments));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

export { asyncReceiveUsersAndThreads, asyncReceiveDetailThreadAndComments };

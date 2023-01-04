import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'detailThread/receive',
  CLEAR_DETAIL_THREAD: 'detailThread/clear',
  UP_VOTE_THREAD: 'detailThread/upVote',
  DOWN_VOTE_THREAD: 'detailThread/downVote',
  NEUTRAL_VOTE_THREAD: 'detailThread/neutralVote',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRAL_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }),
      );
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
};

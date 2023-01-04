/* eslint-disable indent */

import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.CLEAR_DETAIL_THREAD:
      return null;
    case ActionType.UP_VOTE_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.concat([action.payload.userId]),
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : detailThread.downVotesBy,
      };
    case ActionType.DOWN_VOTE_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy,
        downVotesBy: detailThread.downVotesBy.concat([action.payload.userId]),
      };
    case ActionType.NEUTRAL_VOTE_THREAD:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
          : detailThread.downVotesBy,
      };
    default:
      return detailThread;
  }
}

export default detailThreadReducer;

/**
 * testing scenario
 *
 * - asyncReceiveLeaderboards thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action and call alert correctly when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveLeaderboards,
  receiveLeaderboardsActionCreator,
} from './action';

const fakeLeaderboardsResponse = [
  {
    id: 'thread-test',
    title: 'Test Thread',
    body: 'This is test thread',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong!');

describe('asyncReceiveLeaderboards', () => {
  beforeEach(() => {
    // backup original implementation
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    // restore original implementation
    api.getLeaderboards = api._getLeaderboards;

    // delete backup
    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    // mock dispatch
    const dispatch = jest.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = jest.fn();
    // mock alert
    window.alert = jest.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

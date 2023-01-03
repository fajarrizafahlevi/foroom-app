/**
 * testing scenario
 *
 * - threadsReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the threads when given by threads/receive action
 *   - should return the threads with the new thread when given by threads/add action
 *   - should return the threads with up-voted when given by threads/upVote action
 *   - should return the threads with down-voted when given by threads/downVote action
 *   - should return the threads with not voted when given by threads/neutralVote action
 */

import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by threads/receive action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'threads/receive',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'First Thread',
            body: 'This is the first thread',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Second Thread',
            body: 'This is the second Thread',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by threads/add action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'threads/add',
      payload: {
        thread: {
          id: 'new-thread',
          title: 'New Thread',
          body: 'This is a new thread',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-1',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with toggled upvote when given by threads/upVote action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'threads/upVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: upvote thread
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);

    // arrange 2
    const action2 = {
      type: 'threads/neutralVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: neutral-vote thread
    const nextState2 = threadsReducer(initialState, action2);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the threads with toggled downvote when given by threads/downVote action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'First Thread',
        body: 'This is the first thread',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'threads/downVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: upvote thread
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);

    const action2 = {
      type: 'threads/neutralVote',
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
      },
    };

    // action: neutral-vote thread
    const nextState2 = threadsReducer(initialState, action2);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});

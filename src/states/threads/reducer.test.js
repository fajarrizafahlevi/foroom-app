/**
 * testing scenario
 *
 * - threadsReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the threads when given by threads/receive action
 *   - should return the threads with the new thread when given by threads/add action
 *   - should return the threads with up-voted when given by threads/upVote action
 *   - should return the threads with down-voted when given by threads/downVote action
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
            id: 'thread-test',
            title: 'Test Thread',
            body: 'This is the test thread',
            category: 'Test',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'user-test',
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
        id: 'thread-test',
        title: 'Test Thread',
        body: 'This is the test thread',
        category: 'Test',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-test',
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
          body: 'This is new thread',
          category: 'New',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'user-new',
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

  it('should return the threads with up-voted when given by threads/upVote action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-test',
        title: 'Test Thread',
        body: 'This is the test thread',
        category: 'Test',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-test',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'threads/upVote',
      payload: {
        threadId: 'thread-test',
        userId: 'user-test',
      },
    };

    // action: up-vote thread
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
        threadId: 'thread-test',
        userId: 'user-test',
      },
    };

    // action: neutral-vote thread
    const nextState2 = threadsReducer(initialState, action2);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the threads with down-voted when given by threads/downVote action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-test',
        title: 'Test Thread',
        body: 'This is the test thread',
        category: 'Test',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-test',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'threads/downVote',
      payload: {
        threadId: 'thread-test',
        userId: 'user-test',
      },
    };

    // action: down-vote thread
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
        threadId: 'thread-test',
        userId: 'user-test',
      },
    };

    // action: neutral-vote thread
    const nextState2 = threadsReducer(initialState, action2);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});

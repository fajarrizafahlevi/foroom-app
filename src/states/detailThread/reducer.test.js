/**
 * testing scenario
 *
 * - detailThreadReducer function
 *   - should return the initial state when given by unknown action
 *   - should clear the detailThread when given by detailThread/clear action
 *   - should return the detailThread when given by detailThread/receive action
 *   - should return the detailThread with up-voted when given by detailThread/upVote action
 *   - should return the detailThread with down-voted when given by detailThread/downVote action
 */

import detailThreadReducer from './reducer';

describe('detailThreadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the detailThread when given by detailThread/receive action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'detailThread/receive',
      payload: {
        detailThread: {
          id: 'thread-test',
          title: 'Test Thread',
          body: 'This is test thread',
          category: 'Test',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'user-test',
            name: 'Test Person',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('should return the detailThread with the new thread when given by detailThread/clear action', () => {
    // arrange
    const initialState = {
      id: 'thread-test',
      title: 'Test Thread',
      body: 'This is test thread',
      category: 'Test',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-test',
        name: 'Test Person',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'detailThread/clear',
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return the detailThread with toggled upvote when given by detailThread/upVote action', () => {
    // arrange
    const initialState = {
      id: 'thread-test',
      title: 'Test Thread',
      body: 'This is test thread',
      category: 'Test',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-test',
        name: 'Test Person',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'detailThread/upVote',
      payload: {
        threadId: 'thread-test',
        userId: 'user-test',
      },
    };

    // action: up-vote thread
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });

    // arrange 2
    const action2 = {
      type: 'detailThread/neutralVote',
      payload: {
        threadId: 'thread-test',
        userId: 'user-test',
      },
    };

    // action: neutral-vote thread
    const nextState2 = detailThreadReducer(initialState, action2);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the detailThread with toggled downvote when given by detailThread/downVote action', () => {
    // arrange
    const initialState = {
      id: 'thread-test',
      title: 'Test Thread',
      body: 'This is test thread',
      category: 'Test',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-test',
        name: 'Test Person',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'detailThread/downVote',
      payload: {
        threadId: 'thread-test',
        userId: 'user-test',
      },
    };

    // action: down-vote thread
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });

    const action2 = {
      type: 'detailThread/neutralVote',
      payload: {
        threadId: 'thread-test',
        userId: 'user-test',
      },
    };

    // action: neutral-vote thread
    const nextState2 = detailThreadReducer(initialState, action2);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});

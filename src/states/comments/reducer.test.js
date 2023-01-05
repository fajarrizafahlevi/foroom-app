/**
 * testing scenario
 *
 * - commentsReducer function
 *   - should return the initial state when given by unknown action
 *   - should return the comments when given by comments/receive action
 *   - should return the comments with the new comment when given by comments/add action
 *   - should return the comments with up-voted when given by comments/upVote action
 *   - should return the comments with down-voted when given by comments/downVote action
 */

import commentsReducer from './reducer';

describe('commentsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the comments when given by comments/receive action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'comments/receive',
      payload: {
        comments: [
          {
            id: 'comment-test',
            content: 'This is test comment',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'user-test',
              name: 'Test Person',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.comments);
  });

  it('should return the comments with the new comment when given by comments/add action', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-test',
        content: 'This is test comment',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'user-test',
          name: 'Test Person',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'comments/add',
      payload: {
        comment: {
          id: 'comment-new',
          content: 'This is new comment',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'user-new',
            name: 'New Person',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.comment, ...initialState]);
  });

  it('should return the comments with up-voted when given by comments/upVote action', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-test',
        content: 'This is test comment',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'user-test',
          name: 'Test Person',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'comments/upVote',
      payload: {
        commentId: 'comment-test',
        userId: 'user-test',
      },
    };

    // action: up-vote comment
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);

    // arrange 2
    const action2 = {
      type: 'comments/neutralVote',
      payload: {
        commentId: 'comment-test',
        userId: 'user-test',
      },
    };

    // action: neutral-vote comment
    const nextState2 = commentsReducer(initialState, action2);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it('should return the comments with down-voted when given by comments/downVote action', () => {
    // arrange
    const initialState = [
      {
        id: 'comment-test',
        content: 'This is test comment',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'user-test',
          name: 'Test Person',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'comments/downVote',
      payload: {
        commentId: 'comment-test',
        userId: 'user-test',
      },
    };

    // action: down-vote comment
    const nextState = commentsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);

    const action2 = {
      type: 'comments/neutralVote',
      payload: {
        commentId: 'comment-test',
        userId: 'user-test',
      },
    };

    // action: neutral-vote comment
    const nextState2 = commentsReducer(initialState, action2);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});

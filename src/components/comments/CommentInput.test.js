/**
 * testing scenario
 *
 * - CommentInput component
 *   - should handle comment typing correctly
 *   - should call commentThread function when send button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from './CommentInput';

import '@testing-library/jest-dom';

const userTest = {
  id: 'user-test',
  name: 'User Test',
  email: 'user@example.com',
  avatar: 'https://generated-image-url.jpg',
};

describe('CommentInput component', () => {
  it('should handle comment typing correctly', async () => {
    // arrange
    render(
      <CommentInput
        authUser={userTest}
        commentThread={() => {}}
      />,
    );
    const commentInput = await screen.getByRole('textbox');

    // action
    await userEvent.type(commentInput, 'commenttest');

    // assert
    expect(commentInput).toHaveValue('commenttest');
  });

  it('should call comment function when comment button is clicked', async () => {
    // arrange
    const mockCommentThread = jest.fn();
    render(
      <CommentInput
        authUser={userTest}
        commentThread={mockCommentThread}
      />,
    );
    const commentInput = await screen.getByRole('textbox');
    await userEvent.type(commentInput, 'commenttest');
    const addButton = await screen.getByRole('button', {
      name: 'Send',
    });

    // action
    await userEvent.click(addButton);

    // assert
    expect(mockCommentThread).toBeCalledWith('commenttest');
  });
});

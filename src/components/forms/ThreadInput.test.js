/**
 * testing scenario
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call AddThread function when Add button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadInput from './ThreadInput';

import '@testing-library/jest-dom';

describe('ThreadInput component', () => {
  it('should handle title typing correctly', async () => {
    // arrange
    render(<ThreadInput addThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Title');

    // action
    await userEvent.type(titleInput, 'titletest');

    // assert
    expect(titleInput).toHaveValue('titletest');
  });

  it('should handle category typing correctly', async () => {
    // arrange
    render(<ThreadInput addThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Category');

    // action
    await userEvent.type(categoryInput, 'categorytest');

    // assert
    expect(categoryInput).toHaveValue('categorytest');
  });

  it('should handle body typing correctly', async () => {
    // arrange
    render(<ThreadInput addThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText('Body');

    // action
    await userEvent.type(bodyInput, 'bodytest');

    // assert
    expect(bodyInput).toHaveValue('bodytest');
  });

  it('should call thread function when thread button is clicked', async () => {
    // arrange
    const mockAddThread = jest.fn();
    render(<ThreadInput addThread={mockAddThread} />);
    const titleInput = await screen.getByPlaceholderText('Title');
    await userEvent.type(titleInput, 'titletest');
    const categoryInput = await screen.getByPlaceholderText('Category');
    await userEvent.type(categoryInput, 'categorytest');
    const bodyInput = await screen.getByPlaceholderText('Body');
    await userEvent.type(bodyInput, 'bodytest');
    const addButton = await screen.getByRole('button', { name: 'Add' });

    // action
    await userEvent.click(addButton);

    // assert
    expect(mockAddThread).toBeCalledWith({
      title: 'titletest',
      category: 'categorytest',
      body: 'bodytest',
    });
  });
});

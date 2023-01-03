import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  return (
    <form
      className="thread-input"
      onSubmit={() => addThread({ title, category, body })}
    >
      <input
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="Title"
      />
      <input
        type="category"
        value={category}
        onChange={onCategoryChange}
        placeholder="Category"
      />
      <textarea
        value={body}
        onChange={onBodyChange}
      />
      <button
        className="add-button"
        type="button"
      >
        Add
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;

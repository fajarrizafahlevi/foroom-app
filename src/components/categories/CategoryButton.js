import React from 'react';
import PropTypes from 'prop-types';

function CategoryButton({ category, filter }) {
  return (
    <button
      className="category-button"
      type="button"
      onClick={() => filter(category)}
    >
      {category}
    </button>
  );
}

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  filter: PropTypes.func,
};

CategoryButton.defaultProps = {
  filter: null,
};

export default CategoryButton;

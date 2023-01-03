import React from 'react';
import PropTypes from 'prop-types';
import CategoryButton from './CategoryButton';

function CategoriesList({ categories, filter }) {
  return (
    <div className="categories-list">
      <button
        className="category-button"
        type="button"
        onClick={() => filter('all')}
      >
        all
      </button>
      {categories.map((category, id) => (
        <CategoryButton
          // eslint-disable-next-line react/no-array-index-key
          key={id}
          category={category}
          filter={filter}
        />
      ))}
    </div>
  );
}

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  filter: PropTypes.func,
};

CategoriesList.defaultProps = {
  filter: null,
};

export default CategoriesList;

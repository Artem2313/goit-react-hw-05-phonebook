import React from 'react';
import PropTypes from 'prop-types';

const Filter = ({ filter, onChange }) => (
  <div>
    <label htmlFor="filter">
      <h2>Find contacts by name</h2>
      <input name="filter" value={filter} onChange={onChange} type="text" />
    </label>
  </div>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default Filter;
